// Start (#/): das Cockpit. Ganz oben genau EIN nächster Schritt, darunter Zeitbudget, Gesamtstand,
// die Module und die Stellen, an denen es noch hakt. Beim allerersten Besuch steht statt der Statistik
// eine ruhige Einführung. Alle Zahlen kommen aus app.modell; diese Ansicht rechnet nichts selbst aus.
import { h, symbol, minutenText, prozent } from '../mini.js'
import { statusText } from '../lernmodell.js'

function ampel(status) {
  return h('span.ampel.ampel--' + status, statusText(status))
}

function wiederholungen(n) {
  return n === 1 ? '1 Wiederholung fällig' : n + ' Wiederholungen fällig'
}

/**
 * Breite eines Balkenteils. Ein angefangener Wert bekommt eine Mindestbreite: bei wenigen Prozent bliebe
 * sonst ein Punkt übrig, der wie ein Staubkorn auf dem Bildschirm aussieht statt wie ein Anfang.
 */
function breite(anteil) {
  const p = prozent(anteil)
  return p > 0 ? `max(${p}%, 1.25rem)` : '0'
}

/** Balken: Beherrschung als Wert, dahinter als Streifen, wie viel vom Stoff überhaupt schon bearbeitet ist. */
function balken(wert, abdeckung, status) {
  const el = h('div.balken.balken--dick' + (status ? '.balken--' + status : ''), {
    role: 'img',
    'aria-label': `Beherrschung ${prozent(wert)} Prozent, bearbeitet ${prozent(abdeckung)} Prozent`,
  })
  const streifen = h('div.balken__schatten')
  const voll = h('div.balken__wert')
  streifen.style.width = breite(abdeckung)
  voll.style.width = breite(wert)
  el.append(streifen, voll)
  return el
}

function kurzeDauer(min) {
  if (min < 60) return Math.round(min) + ' Min'
  return String(Math.round(min / 6) / 10).replace('.', ',') + ' Std'
}

function modulFolien(modul) {
  const f = modul.folien || []
  if (f.length === 2 && f[0] !== f[1]) return `Folien ${f[0]} bis ${f[1]}`
  if (f.length) return 'Folie ' + f[0]
  return null
}

/** Der eine große Knopf oben: Ziel, Beschriftung und der Satz, warum genau das jetzt dran ist. */
function naechsterSchritt(app) {
  const s = app.modell.naechsterSchritt()
  if (s.art === 'thema') {
    const thema = app.daten.thema(s.themaId)
    const modul = app.daten.modulVonThema(s.themaId)
    const wo = modul ? ` (${modul.titel})` : ''
    return {
      hash: '#/thema/' + s.themaId,
      symbolName: 'lernen',
      text: (s.begonnen ? 'Weiterlernen: ' : 'Loslegen: ') + (thema ? thema.titel : 'nächstes Thema'),
      warum: s.begonnen
        ? `Dieses Thema hast du angefangen, aber noch nicht zu Ende gebracht${wo}. Du machst dort weiter, wo du aufgehört hast.`
        : `Dieses Thema ist noch offen${wo}. Du liest zuerst die Lernkarte und löst danach die Aufgaben dazu.`,
    }
  }
  if (s.art === 'wiederholen') {
    // Auf den Knopf gehört eine Portion, keine Bilanz: die Gesamtzahl fälliger Aufgaben wächst mit der Zeit
    // von allein und wäre als einzige angebotene Aufgabe ein Schuldenstand statt eines nächsten Schritts.
    const gesamt = s.faelligGesamt || s.anzahl
    return {
      hash: '#/training?modus=faellig',
      symbolName: 'wiederholen',
      text: 'Wiederholungsrunde starten',
      neben: `${gesamt} ${gesamt === 1 ? 'Aufgabe wartet' : 'Aufgaben warten'}`,
      warum: `${s.grund} Eine Runde nimmt sich die wackeligsten Aufgaben vor und mischt dabei die Themen; der Rest wartet.`,
    }
  }
  if (s.art === 'schwaechen') {
    return {
      hash: '#/training?modus=schwaechen',
      symbolName: 'training',
      text: 'Wackelige Stellen üben',
      warum: `${s.anzahl} ${s.anzahl === 1 ? 'Thema sitzt' : 'Themen sitzen'} noch nicht sicher. Der Durchgang nimmt sich die schwächsten zuerst vor.`,
    }
  }
  return {
    hash: '#/probe',
    symbolName: 'probe',
    text: 'Generalprobe starten',
    warum: 'Alle Themen sind durchgearbeitet und sitzen. Die Generalprobe zeigt dir an einem gemischten Durchgang, wo du stehst.',
  }
}

function schrittKarte(app) {
  const s = naechsterSchritt(app)
  return h('div.karte.cockpit__schritt',
    h('div.zeile.zeile--auseinander.cockpit__schrittkopf',
      h('div.karte__ueber', 'Dein nächster Schritt'),
      s.neben ? h('span.leise.cockpit__neben', s.neben) : null),
    h('a.knopf.knopf--primaer.knopf--gross.knopf--block.cockpit__schrittknopf', { href: s.hash },
      symbol(s.symbolName), h('span', s.text)),
    h('p.leise.cockpit__warum', s.warum),
    // Der zweite Weg steht gleichwertig darunter statt als Fußnote am Seitenende
    h('a.knopf.knopf--block.cockpit__zweiterweg', { href: '#/plan' },
      symbol('lernen'), h('span', 'Lernplan für zwei Tage ansehen')))
}

/** Klausurtermin: freiwillig, liegt im Lernstand und wird als verbleibende Stunden angezeigt. */
function klausurFeld(app) {
  const gespeichert = () => app.speicher.zustand.einstellungen.klausur || ''
  const rest = h('p.cockpit__klausur')
  const wann = h('p.leise')
  const eingabe = h('input.feld__eingabe', { type: 'datetime-local', value: gespeichert() })
  eingabe.addEventListener('change', () => {
    app.speicher.aendere((z) => { z.einstellungen.klausur = eingabe.value || null }, { sofort: true })
    aktualisiere()
  })

  function aktualisiere() {
    const roh = gespeichert()
    const termin = roh ? new Date(roh) : null
    if (!termin || Number.isNaN(termin.getTime())) {
      rest.hidden = true
      wann.textContent = 'Kein Termin eingetragen. Mit Termin siehst du hier, wie viele Stunden dir noch bleiben.'
      return
    }
    const std = Math.round((termin.getTime() - Date.now()) / 3600000)
    rest.hidden = false
    rest.textContent = std > 0 ? `noch ${std} Std bis zur Klausur` : 'Der eingetragene Termin liegt hinter dir.'
    wann.textContent = new Intl.DateTimeFormat('de-DE',
      { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }).format(termin) + ' Uhr'
  }

  aktualisiere()
  return {
    element: h('div.stapel--eng.cockpit__klausurfeld',
      // Nur die Restzeit ist eine Rückmeldung; das Eingabefeld gehört nicht in den Live-Bereich
      h('div.stapel--eng', { 'aria-live': 'polite' }, rest, wann),
      h('label.feld', h('span.feld__label', 'Klausurtermin (freiwillig)'), eingabe)),
    aktualisiere,
  }
}

function zeitKarte(app, budget) {
  const zahl = h('div.ring__zahl')
  const ring = h('div.ring', { role: 'img' }, h('div.ring__innen', zahl, h('div.ring__text', 'von ' + minutenText(budget))))
  const rest = h('p.cockpit__resttext')
  const klausur = klausurFeld(app)
  const karte = h('div.karte.stapel',
    h('div.karte__ueber', 'Zeitbudget'),
    h('div.cockpit__zeit', ring, h('div.cockpit__zeittext', rest)),
    h('p.leise', 'Gezählt wird nur die Zeit, in der du wirklich arbeitest. Ein offen liegendes Handy zählt nicht mit.'),
    klausur.element)

  function aktualisiere() {
    const min = app.zeit.gesamtMin
    const anteil = budget ? min / budget : 0
    ring.style.setProperty('--wert', String(prozent(anteil)))
    ring.style.setProperty('--farbe', anteil >= 1 ? 'var(--mittel)' : 'var(--primaer)')
    ring.setAttribute('aria-label', `${minutenText(min)} aktive Lernzeit von ${minutenText(budget)}`)
    zahl.textContent = kurzeDauer(min)
    const offen = app.modell.restzeitMin()
    rest.textContent = offen >= 1
      ? `Erster Durchgang durch alle Themen: nach heutiger Schätzung noch rund ${minutenText(offen)}.`
      : 'Der erste Durchgang durch alle Themen ist geschafft.'
    klausur.aktualisiere()
  }

  aktualisiere()
  return { element: karte, aktualisiere }
}

function gesamtKarte(gesamt) {
  const abdeckung = gesamt.gesamt ? gesamt.gesehen / gesamt.gesamt : 0
  return h('div.karte.stapel--eng',
    h('div.karte__ueber', 'Gesamtstand'),
    h('div.zeile.zeile--auseinander',
      h('div.cockpit__grosszahl.zahl', prozent(gesamt.wert) + ' %'),
      gesamt.faellig ? h('span.marke-chip.marke-chip--mittel', wiederholungen(gesamt.faellig)) : null),
    balken(gesamt.wert, abdeckung, null),
    h('p.leise', `${gesamt.gesehen} von ${gesamt.gesamt} Aufgaben bearbeitet. Der Streifen dahinter zeigt, wie viel du davon schon angefasst hast.`))
}

function modulKarte(app, modul) {
  const s = app.modell.modulStand(modul)
  const zahlen = [`${s.gesehen} von ${s.gesamt} Aufgaben`]
  if (s.faellig) zahlen.push(wiederholungen(s.faellig))
  if (modul.zeitMin) zahlen.push('Planzeit ' + minutenText(modul.zeitMin))
  return h('a.karte.karte--eng.karte--klickbar.cockpit__modul', { href: '#/modul/' + modul.id },
    h('div.zeile.zeile--auseinander',
      h('span.marke-chip', modul.vorlesung || 'Modul'),
      ampel(s.status)),
    h('h3.karte__titel', modul.titel),
    modul.kurz ? h('p.leise', modul.kurz) : null,
    // Balken und Zahlenzeile sitzen immer unten: nebeneinander liegende Karten bekommen so ein ruhiges Raster,
    // auch wenn der Kurztext unterschiedlich lang ist.
    h('div.cockpit__modulfuss',
      balken(s.wert, s.abdeckung, s.status),
      h('p.leise', zahlen.join(' · '))))
}

function haktKarte(app, staende) {
  const schwach = staende
    .filter(({ s }) => s.gesehen > 0 && s.status !== 'gut')
    .sort((a, b) => a.s.wert - b.s.wert)
    .slice(0, 6)
  const karte = h('div.karte.stapel--eng',
    h('div.karte__ueber', 'Hier hakt es noch'))
  if (!schwach.length) {
    karte.appendChild(h('p.leise', staende.some(({ s }) => s.gesehen > 0)
      ? 'Im Moment hakt nichts. Alles, was du begonnen hast, sitzt.'
      : 'Sobald du die ersten Aufgaben gelöst hast, stehen hier die Themen, die noch nicht sitzen.'))
    return karte
  }
  karte.appendChild(h('ul.eintragsliste', schwach.map(({ th, s }) => {
    const modul = app.daten.modulVonThema(th.id)
    return h('li', h('a.eintrag', { href: '#/thema/' + th.id },
      h('div',
        h('div.eintrag__titel', th.titel),
        h('div.eintrag__neben', modul ? modul.titel : '')),
      h('div.eintrag__rechts', ampel(s.status))))
  })))
  karte.appendChild(h('p.leise', 'Die schwächsten begonnenen Themen zuerst. Ein Antippen führt dich direkt hin.'))
  return karte
}

function irrtumKarte(staende) {
  const n = staende.reduce((summe, { s }) => summe + s.irrtuemer, 0)
  return h('div.karte.stapel--eng',
    h('div.karte__ueber', 'Irrtümer'),
    h('div.cockpit__grosszahl.zahl', String(n)),
    h('p.leise', n
      ? `${n === 1 ? 'Eine Aufgabe' : n + ' Aufgaben'}, bei denen du sicher warst und trotzdem falsch lagst. Genau solche Stellen kosten in der Klausur Punkte; sie stehen auch auf deinem Lernzettel.`
      : 'Bisher keine. Hier landen Aufgaben, bei denen du sicher warst und trotzdem falsch lagst.'),
    n ? h('p', h('a', { href: '#/lernzettel' }, 'Auf dem Lernzettel ansehen')) : null)
}

/** Erster Besuch: keine Zahlen, sondern vier Sätze dazu, wie hier gelernt wird. */
function einfuehrungsKarte() {
  const punkte = [
    ['Lernkarte lesen', 'Jedes Thema beginnt mit einer kurzen Lernkarte. Dort steht, was das Skript sagt, immer mit der Folie dazu.'],
    ['Aufgaben lösen', 'Danach kommen Aufgaben zum selben Thema: auswählen, zuordnen, Lücken füllen, erklären.'],
    ['Sicherheit angeben', 'Nach jeder Aufgabe sagst du, ob du sicher warst. Das steuert, wann sie wiederkommt.'],
    ['Falsches kommt wieder', 'Was nicht sitzt, taucht von allein erneut auf. Am Ende steht dein persönlicher Lernzettel mit genau deinen Stolperstellen.'],
  ]
  return h('div.karte.stapel',
    h('div.karte__ueber', 'So arbeitet diese Lernumgebung'),
    h('ol.cockpit__einfuehrung', punkte.map(([titel, text]) => h('li', h('strong', titel), h('span', text)))),
    h('div.hinweiskasten.hinweiskasten--kern',
      h('div.hinweiskasten__titel', 'Alles aus dem Skript'),
      h('p', 'Jeder Fachinhalt hier stammt aus dem Vorlesungsskript. Zu jeder Aussage steht die Folie dabei, und nach jeder Aufgabe siehst du die Stelle, die die Lösung trägt. Wo etwas nicht aus dem Skript kommt, ist es als solches gekennzeichnet.')),
    h('div.hinweiskasten',
      h('div.hinweiskasten__titel', 'Dein Lernstand bleibt bei dir'),
      h('p', 'Alles, was du hier tust, bleibt in diesem Browser auf diesem Gerät. Kein Konto, keine Anmeldung, keine Übertragung. Unter Einstellungen kannst du den Lernstand als Datei sichern und auf einem anderen Gerät wieder einlesen.')))
}

function kursUebersicht(app) {
  return h('div.karte.stapel--eng',
    h('div.karte__ueber', 'Was vor dir liegt'),
    h('ul.eintragsliste', app.daten.module.map((modul) => h('li',
      h('a.eintrag', { href: '#/modul/' + modul.id },
        h('div',
          h('div.eintrag__titel', modul.titel),
          h('div.eintrag__neben', [modul.vorlesung, modulFolien(modul)].filter(Boolean).join(' · '))),
        h('div.eintrag__rechts.leise', modul.zeitMin ? minutenText(modul.zeitMin) : ''))))))
}

export default {
  titel: 'Start',

  render(host, params, app) {
    const daten = app.daten
    const kurs = daten.kurs || {}
    const budget = kurs.zeitbudgetMin || 600

    host.appendChild(h('div.seitenkopf',
      h('div.seitenkopf__ueber', kurs.untertitel || 'Repetitorium'),
      h('h1', kurs.titel || 'Mitarbeiterführung'),
      h('p', 'Hier siehst du, wo du stehst und was als Nächstes dran ist.')))

    if (!daten.alleThemen.length) {
      host.appendChild(h('div.hinweiskasten.hinweiskasten--mittel',
        h('div.hinweiskasten__titel', 'Noch keine Inhalte'),
        h('p', 'Zu diesem Kurs sind noch keine Themen hinterlegt. Sobald die Lerninhalte da sind, steht hier dein nächster Schritt.')))
      return null
    }

    const staende = daten.alleThemen.map((th) => ({ th, s: app.modell.themaStand(th) }))
    const gesamt = app.modell.gesamtStand()
    // Erster Besuch: nichts bearbeitet und keine Lernkarte gelesen
    const erstbesuch = gesamt.gesehen === 0 && staende.every(({ th }) => app.modell.kartenStand(th).gelesen === 0)

    host.appendChild(schrittKarte(app))

    const zeit = zeitKarte(app, budget)
    if (erstbesuch) {
      host.appendChild(h('div.raster.raster--haupt.cockpit__raster',
        h('div.stapel', einfuehrungsKarte(), kursUebersicht(app)),
        h('div.stapel', zeit.element)))
    } else {
      host.appendChild(h('div.raster.raster--haupt.cockpit__raster',
        h('div.stapel',
          zeit.element,
          gesamtKarte(gesamt),
          // Bei einem einzigen Modul ist eine halbe Spalte verloren: dann volle Breite
          h('div.raster' + (daten.module.length > 1 ? '.raster--2' : ''), daten.module.map((modul) => modulKarte(app, modul)))),
        h('div.stapel', haktKarte(app, staende), irrtumKarte(staende))))
    }

    // Ring, Restzeit und Countdown im Takt der Zeitmessung nachziehen
    return app.zeit.beiTakt(() => zeit.aktualisiere())
  },
}
