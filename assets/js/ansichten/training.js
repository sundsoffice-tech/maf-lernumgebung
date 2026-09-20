// Training: kurze Runden gegen das Vergessen. Drei Wege in den Stoff (Fälliges, Schwächen, Gemischt),
// danach immer dieselbe Schleife: eine Aufgabe, Rückmeldung, weiter. Jede Antwort ist sofort verbucht,
// Abbrechen kostet deshalb nichts.
// Sitzungskopf, Uhr und die kleinen Anzeigehelfer nutzt die Generalprobe (probe.js) mit: beide Ansichten
// sollen sich gleich anfühlen und dieselben Wörter benutzen.

import { h, leeren, mini, minutenText, prozent, symbol } from '../mini.js'
import { zeigeAufgabe } from '../aufgabenrahmen.js'
import { statusText, SCHWELLE_SITZT, SCHWELLE_WACKELIG } from '../lernmodell.js'

const MENGEN = [10, 20, 30]
const STANDARD_MENGE = 20
const TITEL = { faellig: 'Fällige Wiederholungen', schwaechen: 'An Schwächen arbeiten', gemischt: 'Gemischt trainieren' }

/** Grobe Zeitangabe. Genauer wäre falsche Sicherheit: die Abstände des Lernmodells sind Richtwerte. */
export function inEtwa(ms) {
  const min = Math.round(ms / 60000)
  if (min <= 1) return 'gleich'
  if (min < 60) return `in etwa ${min} Minuten`
  const std = Math.round(min / 60)
  if (std < 24) return std === 1 ? 'in etwa einer Stunde' : `in etwa ${std} Stunden`
  const tage = Math.round(std / 24)
  return tage <= 1 ? 'morgen' : `in etwa ${tage} Tagen`
}

/** Dieselbe Angabe für enge Spalten. Die ausgeschriebene Form steht dort im title. */
export function inEtwaKurz(ms) {
  const min = Math.round(ms / 60000)
  if (min <= 1) return 'gleich'
  if (min < 60) return `in ${min} Min`
  const std = Math.round(min / 60)
  if (std < 24) return `in ${std} Std`
  const tage = Math.round(std / 24)
  return tage <= 1 ? 'morgen' : `in ${tage} Tagen`
}

/** Dauer einer Runde. Unter einer Minute sähe "0 Min" nach einem Fehler aus. */
export function dauerText(sek) {
  return sek < 60 ? 'weniger als einer Minute' : minutenText(sek / 60)
}

/** Dieselben Schwellen wie im Lernmodell, damit Balken und Ampeln überall dasselbe bedeuten. */
export function stufeVonWert(wert) {
  return wert >= SCHWELLE_SITZT ? 'gut' : wert >= SCHWELLE_WACKELIG ? 'mittel' : 'schlecht'
}

export function balken(wert, stufe) {
  return h('div.balken' + (stufe ? '.balken--' + stufe : ''),
    { role: 'img', 'aria-label': prozent(wert) + ' Prozent' },
    h('div.balken__wert', { style: { width: prozent(wert) + '%' } }))
}

export function ampel(status) {
  return h('span.ampel.ampel--' + status, statusText(status))
}

export function uhrzeit(ms) {
  const s = Math.max(0, Math.round(ms / 1000))
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0')
}

/**
 * Rundenlänge wählen und starten. Die Zahlen sind nur die Auswahl, ausgelöst wird mit dem Knopf darunter:
 * Vorher startete ein Tipp auf eine Zahl sofort die Runde, während die hervorgehobene Zahl wie eine bereits
 * getroffene Wahl aussah — nichts Sichtbares sagte, dass es danach nicht weitergeht.
 * Steht weniger bereit als die größte Stufe, endet die Reihe mit dem, was wirklich da ist — lieber eine
 * ehrliche Zahl als ein Knopf, der sein Versprechen nicht hält.
 * opts: { ziel?, empfohlen?, aktion? } — `aktion` ist die Aufschrift des Startknopfes ohne die Zahl.
 */
export function mengenKnoepfe(verfuegbar, mengen, starte, opts = {}) {
  const stufen = mengen.filter((n) => n < verfuegbar)
  if (verfuegbar <= mengen[mengen.length - 1]) stufen.push(verfuegbar)
  const ziel = opts.ziel || mengen[1]
  const aktion = opts.aktion || 'Runde starten'
  let gewaehlt = stufen.includes(ziel) ? ziel : stufen[stufen.length - 1]

  const aufgabenText = (n) => `${n} ${n === 1 ? 'Aufgabe' : 'Aufgaben'}`
  const startText = h('span.mengenwahl__starttext')
  const knoepfe = stufen.map((n) => {
    const alles = n === verfuegbar && n < mengen[mengen.length - 1]
    return h('button.knopf.mengenwahl__knopf',
      { type: 'button', 'aria-label': aufgabenText(n) + ' wählen', onclick: () => waehle(n) },
      alles ? (n === 1 ? 'Die eine' : 'Alle ' + n) : String(n))
  })

  // Die gewählte Zahl steht auch im Startknopf: der Zustand hängt nicht allein an der Farbe.
  function waehle(n) {
    gewaehlt = n
    stufen.forEach((m, i) => knoepfe[i].setAttribute('aria-pressed', m === n ? 'true' : 'false'))
    startText.textContent = `${aktion} (${aufgabenText(n)})`
  }
  waehle(gewaehlt)

  return h('div.mengenwahl',
    h('div.mengenwahl__zeile', { role: 'group', 'aria-label': 'Wie viele Aufgaben?' },
      h('span.leise.mengenwahl__label', 'Wie viele Aufgaben?'),
      h('div.mengenwahl__knoepfe', knoepfe)),
    h('button.knopf.mengenwahl__start' + (opts.empfohlen ? '.knopf--primaer' : ''),
      { type: 'button', onclick: () => starte(gewaehlt) }, symbol('weiter'), startText))
}

/**
 * Der gemeinsame Ablauf einer Übungssitzung: Kopf mit Fortschritt, eine Aufgabe nach der anderen,
 * Abbrechen jederzeit. opts: { app, sitzung, titel, uhr?, beiEnde({abgebrochen, dauerSek}) }.
 * Rückgabe: { stopp() } — hält die Uhr an, wenn die Ansicht verlassen wird.
 */
export function sitzungsLauf(host, opts) {
  const { app, sitzung } = opts
  const beginn = Date.now()
  let gesamt = Math.max(1, sitzung.rest)
  let uhrTimer = 0
  let beendet = false
  let erste = true

  const zahl = h('span.sitzungskopf__zahl.zahl')
  const wert = h('div.balken__wert')
  const leiste = h('div.balken.balken--dick',
    { role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': '0', 'aria-label': 'Fortschritt in dieser Runde' }, wert)
  const ort = h('span.leise.sitzungskopf__ort')
  const uhrWert = h('span.uhr__wert.zahl', '0:00')
  const uhr = opts.uhr ? h('span.uhr', { title: 'Verstrichene Zeit, nur zur Orientierung' }, symbol('uhr'), uhrWert) : null
  const abbrechen = h('button.knopf.knopf--still.knopf--klein', { type: 'button', onclick: () => ende(true) }, 'Abbrechen')
  const buehne = h('div.sitzungsbuehne')

  host.append(
    h('div.sitzungskopf',
      h('div.zeile.zeile--auseinander',
        h('h1.sitzungskopf__titel', opts.titel),
        h('span.zeile.sitzungskopf__werkzeuge', uhr, abbrechen)),
      leiste,
      h('div.zeile.zeile--auseinander.sitzungskopf__unten', zahl, ort)),
    buehne)

  if (uhr) {
    const takt = () => { uhrWert.textContent = uhrzeit(Date.now() - beginn) }
    uhrTimer = setInterval(takt, 1000)
  }

  function stopp() {
    if (uhrTimer) { clearInterval(uhrTimer); uhrTimer = 0 }
  }

  function ende(abgebrochen) {
    if (beendet) return
    beendet = true
    stopp()
    app.zeit.setzeModul(null)
    opts.beiEnde({ abgebrochen: !!abgebrochen, dauerSek: Math.round((Date.now() - beginn) / 1000) })
  }

  function setzeFortschritt() {
    // Die Fehlerschleife kann die Runde verlängern; der Nenner wächst dann mit, statt zu schwindeln.
    gesamt = Math.max(gesamt, sitzung.erledigt + sitzung.rest)
    const anteil = sitzung.erledigt / gesamt
    wert.style.width = prozent(anteil) + '%'
    leiste.setAttribute('aria-valuenow', String(prozent(anteil)))
    zahl.textContent = sitzung.rest
      ? `Aufgabe ${sitzung.erledigt + 1} von ${gesamt}`
      : `${sitzung.erledigt} von ${gesamt} bearbeitet`
  }

  function zeichne() {
    const item = sitzung.aktuelle
    if (!item) { setzeFortschritt(); ende(false); return }
    const thema = app.daten.themaVonAufgabe(item.id)
    const modul = app.daten.modulVonAufgabe(item.id)
    app.zeit.setzeModul(modul ? modul.id : null) // Lernzeit dem Modul der laufenden Aufgabe zuschreiben
    setzeFortschritt()
    ort.textContent = [modul && modul.titel, thema && thema.titel].filter(Boolean).join(' · ')

    let verbucht = false
    const { element } = zeigeAufgabe(buehne, item, {
      app,
      onErgebnis: (e) => { verbucht = true; sitzung.beantworte(e); setzeFortschritt() },
      // Konnte der Renderer die Aufgabe nicht aufbauen oder wurde sie übersprungen, kommt "Weiter" ohne
      // Ergebnis. Dann nimmt die Sitzung sie aus der Schlange, ohne sie zu verbuchen (nichtWerten): Eine
      // Aufgabe, die niemand lösen konnte, darf nicht als gekonnt im Lernstand landen.
      onWeiter: () => { if (!verbucht) sitzung.beantworte({ nichtWerten: true }); zeichne() },
    })
    if (!erste) { element.tabIndex = -1; element.focus({ preventScroll: true }) }
    erste = false
  }

  zeichne()
  return { stopp }
}

export default {
  titel: 'Training',
  schmal: true,

  render(host, params, app) {
    const modell = app.modell
    const modulId = params.modul && app.daten.modul(params.modul) ? params.modul : null
    const modul = modulId ? app.daten.modul(modulId) : null
    let lauf = null

    const imBereich = (a) => !modulId || (app.daten.modulVonAufgabe(a.id) || {}).id === modulId

    // Das Lernmodell kennt keine eigene Schwächen-Auswahl, aber je Thema die Stolperstellen.
    // Hier werden sie nur eingesammelt und geordnet: Irrtümer zuerst, dann was noch offen ist.
    function stolperAufgaben() {
      const gesammelt = []
      for (const th of app.daten.alleThemen) {
        if (modulId && (app.daten.modulVonThema(th.id) || {}).id !== modulId) continue
        for (const s of modell.stolperstellen(th)) gesammelt.push(s)
      }
      gesammelt.sort((a, b) => (Number(b.irrtum) - Number(a.irrtum)) || (Number(b.offen) - Number(a.offen)))
      return gesammelt.map((s) => s.aufgabe)
    }

    function auswahlFuer(modus, n) {
      if (modus === 'faellig') return modell.faellige().filter(imBereich).slice(0, n)
      if (modus === 'schwaechen') return stolperAufgaben().slice(0, n)
      return modell.trainingsAuswahl(n, { modulId })
    }

    /** Wann wird die nächste Wiederholung fällig? Für den Fall, dass gerade nichts ansteht. */
    function naechsteFaellig() {
      const jetzt = Date.now()
      let frueheste = 0
      for (const a of app.daten.alleAufgaben) {
        if (!imBereich(a)) continue
        const s = modell.stand(a.id)
        if (!s || !s.versuche || s.box >= 5) continue
        if (s.faellig > jetzt && (!frueheste || s.faellig < frueheste)) frueheste = s.faellig
      }
      return frueheste
    }

    function bereichsWahl() {
      if (app.daten.module.length < 2) return null
      const auswahl = h('select.feld__eingabe', {
        onchange: () => app.navigiere('#/training' + (auswahl.value ? '?modul=' + encodeURIComponent(auswahl.value) : '')),
      },
        h('option', { value: '' }, 'Ganzer Kurs'),
        app.daten.module.map((mo) => h('option', { value: mo.id, selected: mo.id === modulId }, mo.titel)))
      return h('label.feld.bereichswahl', h('span.feld__label', 'Bereich'), auswahl)
    }

    function weg({ modus, zahlText, zahlStufe, text, verfuegbar, hinweis, empfohlen }) {
      const karte = h('section.karte.weg',
        h('div.zeile.zeile--auseinander.weg__kopf',
          h('h2.karte__titel.weg__titel', TITEL[modus]),
          h('span.marke-chip' + (zahlStufe ? '.marke-chip--' + zahlStufe : ''), zahlText)),
        h('p.weg__text', text))
      if (empfohlen) karte.classList.add('weg--empfohlen')
      if (verfuegbar > 0) karte.appendChild(mengenKnoepfe(verfuegbar, MENGEN, (n) => starte(modus, n), { empfohlen }))
      else karte.appendChild(h('p.leise.weg__hinweis', hinweis))
      return karte
    }

    function zeigeStart() {
      leeren(host)
      lauf = null
      const seite = h('div.trainingsseite')
      host.appendChild(seite)
      const faellig = modell.faellige().filter(imBereich)
      const stolper = stolperAufgaben()
      const gemischt = modell.trainingsAuswahl(MENGEN[MENGEN.length - 1], { modulId })
      const nichts = !faellig.length && !stolper.length && !gemischt.length
      const empfohlen = faellig.length ? 'faellig' : stolper.length ? 'schwaechen' : 'gemischt'
      const naechste = naechsteFaellig()

      seite.appendChild(h('header.seitenkopf',
        h('div.seitenkopf__ueber', 'Training'),
        h('h1', 'Üben und wiederholen'),
        h('p', modul
          ? `Kurze Runden aus ${modul.titel}. Du wählst den Weg und die Länge, alles andere sucht die Lernumgebung aus.`
          : 'Kurze Runden quer durch den Stoff. Du wählst den Weg und die Länge, alles andere sucht die Lernumgebung aus.')))

      const wahl = bereichsWahl()
      if (wahl) seite.appendChild(wahl)

      if (nichts) {
        seite.appendChild(h('div.hinweiskasten.hinweiskasten--primaer',
          h('div.hinweiskasten__titel', 'Noch nichts zum Wiederholen'),
          h('p', 'Das Training lebt von dem, was du schon bearbeitet hast. Arbeite zuerst ein Thema durch, danach sammeln sich hier die Wiederholungen von selbst.'),
          h('p', h('a.knopf.knopf--primaer', { href: '#/plan' }, symbol('lernen'), 'Zum Lernplan'))))
      }

      seite.appendChild(h('div.wege',
        weg({
          modus: 'faellig',
          zahlText: faellig.length ? `${faellig.length} fällig` : 'nichts fällig',
          zahlStufe: faellig.length ? 'mittel' : null,
          text: 'Aufgaben, deren Abstand abgelaufen ist. Sie zuerst zu machen hält am meisten Stoff wach.',
          verfuegbar: faellig.length,
          empfohlen: empfohlen === 'faellig' && faellig.length > 0,
          hinweis: naechste
            ? `Gerade ist nichts fällig. Die nächste Wiederholung steht ${inEtwa(naechste - Date.now())} an.`
            : 'Gerade ist nichts fällig. Sobald du Aufgaben bearbeitet hast, sammeln sie sich hier.',
        }),
        weg({
          modus: 'schwaechen',
          zahlText: stolper.length ? `${stolper.length} haken` : 'nichts hakt',
          zahlStufe: stolper.length ? 'schlecht' : null,
          text: 'Genau die Aufgaben, bei denen es schon einmal geklemmt hat. Irrtümer zuerst: falsch und sicher ist das, was in der Klausur wehtut.',
          verfuegbar: stolper.length,
          empfohlen: empfohlen === 'schwaechen' && stolper.length > 0,
          hinweis: 'Im Moment hakt nichts. Jede Aufgabe, die dir danebengeht, sammelt sich hier.',
        }),
        weg({
          modus: 'gemischt',
          zahlText: gemischt.length ? `${gemischt.length} bereit` : 'nichts bereit',
          zahlStufe: gemischt.length ? 'neu' : null,
          text: 'Fälliges, Lücken und Festigung in einer Runde, die Themen dabei verschränkt. Der Wechsel zwischen Themen schärft die Unterscheidung.',
          verfuegbar: gemischt.length,
          empfohlen: empfohlen === 'gemischt' && gemischt.length > 0,
          hinweis: 'Dafür fehlen noch bearbeitete Aufgaben. Fang mit einem Thema an.',
        })))

      seite.appendChild(h('div.hinweiskasten',
        h('p', 'Willst du den ganzen Stoff am Stück messen, statt zu üben: ',
          h('a', { href: '#/probe' }, 'Generalprobe'), '.')))
      window.scrollTo(0, 0)
    }

    function starte(modus, n) {
      const liste = auswahlFuer(modus, n)
      if (!liste.length) { zeigeStart(); return }
      const sitzung = modell.erzeugeSitzung(liste)
      leeren(host)
      lauf = sitzungsLauf(host, {
        app,
        sitzung,
        titel: TITEL[modus],
        beiEnde: ({ abgebrochen, dauerSek }) => { lauf = null; zeigeBilanz(sitzung, modus, n, dauerSek, abgebrochen) },
      })
      window.scrollTo(0, 0)
    }

    function zeigeBilanz(sitzung, modus, n, dauerSek, abgebrochen) {
      // Nur das letzte Ergebnis je Aufgabe zählt: in der Fehlerschleife kommt dieselbe Aufgabe wieder.
      const letzte = new Map(sitzung.ergebnisse.map((e) => [e.id, e]))
      if (!letzte.size) { zeigeStart(); return }
      leeren(host)
      const seite = h('div.trainingsseite')
      host.appendChild(seite)
      const gewusst = [...letzte.values()].filter((e) => e.einordnung === 'gewusst').length
      const wieder = [...letzte.keys()].filter((id) => modell.fach(id) < 3)
        .sort((a, b) => (modell.stand(a).faellig || 0) - (modell.stand(b).faellig || 0))

      seite.appendChild(h('header.seitenkopf',
        h('div.seitenkopf__ueber', TITEL[modus]),
        h('h1', abgebrochen ? 'Runde abgebrochen' : 'Runde geschafft'),
        h('p', `${letzte.size} ${letzte.size === 1 ? 'Aufgabe' : 'Aufgaben'} in ${dauerText(dauerSek)}. `
          + (abgebrochen ? 'Alles, was du beantwortet hast, ist verbucht.' : 'Alles davon ist in deinem Lernstand verbucht.'))))

      seite.appendChild(h('div.bilanzzahlen',
        h('div.karte.karte--eng.bilanzkachel', h('div.bilanzkachel__zahl.zahl', String(letzte.size)), h('div.bilanzkachel__text', 'bearbeitet')),
        h('div.karte.karte--eng.bilanzkachel', h('div.bilanzkachel__zahl.zahl', String(gewusst)), h('div.bilanzkachel__text', 'sicher gewusst')),
        h('div.karte.karte--eng.bilanzkachel', h('div.bilanzkachel__zahl.zahl', String(wieder.length)), h('div.bilanzkachel__text', 'kommen wieder'))))

      // Bilanz nach Themen: was hat die Runde am Stand der einzelnen Themen geändert?
      const nachThema = new Map()
      for (const [id, e] of letzte) {
        const th = app.daten.themaVonAufgabe(id)
        if (!th) continue
        if (!nachThema.has(th.id)) nachThema.set(th.id, { thema: th, ids: [], gewusst: 0 })
        const eintrag = nachThema.get(th.id)
        eintrag.ids.push(id)
        if (e.einordnung === 'gewusst') eintrag.gewusst += 1
      }
      seite.appendChild(h('section.stapel',
        h('h2', 'Nach Themen'),
        h('ul.eintragsliste', [...nachThema.values()].map(({ thema, ids, gewusst: g }) => {
          const s = modell.themaStand(thema)
          return h('li', h('a.eintrag', { href: '#/thema/' + thema.id },
            h('span.eintrag__titel', thema.titel),
            h('span.eintrag__rechts', ampel(s.status)),
            h('span.eintrag__neben', `${ids.length} ${ids.length === 1 ? 'Aufgabe' : 'Aufgaben'} · ${g} sicher gewusst`)))
        }))))

      seite.appendChild(h('section.stapel',
        h('h2', 'Das kommt wieder'),
        wieder.length
          ? h('div.stapel--eng',
            h('ul.eintragsliste', wieder.slice(0, 8).map((id) => {
              const a = app.daten.aufgabe(id)
              const th = app.daten.themaVonAufgabe(id)
              const s = modell.stand(id)
              return h('li', h('a.eintrag', { href: th ? '#/thema/' + th.id : '#/lernzettel' },
                h('span.eintrag__titel', mini((a && (a.kurz || a.frage)) || 'Aufgabe', { inline: true })),
                h('span.eintrag__rechts', h('span.leise.zahl', { title: inEtwa((s.faellig || 0) - Date.now()) }, inEtwaKurz((s.faellig || 0) - Date.now()))),
                th ? h('span.eintrag__neben', th.titel) : null))
            })),
            wieder.length > 8 ? h('p.leise', `und ${wieder.length - 8} weitere. Alles davon steht auf deinem Lernzettel.`) : null)
          : h('div.hinweiskasten.hinweiskasten--gut',
            h('p', 'Nichts davon kommt so bald wieder. Das sitzt.'))))

      seite.appendChild(h('div.zeile.abschlussknoepfe',
        h('button.knopf.knopf--primaer', { type: 'button', onclick: () => starte(modus, n) }, symbol('wiederholen'), 'Noch eine Runde'),
        h('a.knopf', { href: '#/lernzettel' }, symbol('zettel'), 'Lernzettel öffnen'),
        h('a.knopf.knopf--still', { href: '#/' }, 'Zur Startseite')))
      window.scrollTo(0, 0)
    }

    if (TITEL[params.modus]) starte(params.modus, STANDARD_MENGE)
    else zeigeStart()

    return () => { if (lauf) lauf.stopp() }
  },
}
