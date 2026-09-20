// Generalprobe: einmal quer durch den ganzen Stoff, unter Uhr, ohne Fehlerschleife. Sie ist nicht zum Üben
// da, sondern zum Messen — jede Aufgabe kommt genau einmal, das Ergebnis zeigt, wo du am Tag vor der
// Klausur wirklich stehst. Den Ablauf teilt sie sich mit dem Training (training.js).

import { h, leeren, mini, minutenText, prozent, symbol } from '../mini.js'
import { statusText } from '../lernmodell.js'
import { sitzungsLauf, mengenKnoepfe, stufeVonWert, balken, ampel, dauerText } from './training.js'

const MENGEN = [20, 30, 40]
const STANDARD_MENGE = 30

/** Punktzahl mit hoechstens einer Nachkommastelle, deutsch geschrieben (Komma). */
function punkteText(n) {
  return (Math.round(n * 10) / 10).toLocaleString('de-DE')
}

function datumText(t) {
  return new Date(t).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
}

function ring(anteil) {
  const el = h('div.ring',
    h('div.ring__innen',
      h('span.ring__zahl', prozent(anteil) + ' %'),
      h('span.ring__text', 'Ergebnis')))
  // Custom Properties gehen nur über setProperty, nicht über eine Zuweisung an style
  el.style.setProperty('--wert', String(prozent(anteil)))
  el.style.setProperty('--farbe', 'var(--' + stufeVonWert(anteil) + ')')
  return el
}

export default {
  titel: 'Generalprobe',
  schmal: true,

  render(host, params, app) {
    const modell = app.modell
    const probeMin = (app.daten.kurs && app.daten.kurs.probeMin) || 40
    let lauf = null

    function fruehereProben() {
      const proben = app.speicher.zustand.proben || []
      if (!proben.length) return null
      return h('section.stapel',
        h('h2', 'Frühere Proben'),
        h('ul.eintragsliste', proben.slice(-5).reverse().map((p) => {
          const anteil = p.max ? p.punkte / p.max : 0
          return h('li', h('div.eintrag',
            h('span.eintrag__titel', datumText(p.t)),
            h('span.eintrag__rechts',
              h('span.marke-chip.marke-chip--' + stufeVonWert(anteil), prozent(anteil) + ' %')),
            h('span.eintrag__neben', `${punkteText(p.punkte)} von ${p.max} Punkten · ${p.dauerSek < 60 ? 'unter 1 Min' : minutenText(p.dauerSek / 60)}`)))
        })))
    }

    function zeigeStart() {
      leeren(host)
      lauf = null
      const seite = h('div.trainingsseite')
      host.appendChild(seite)
      const bereit = modell.probeAuswahl(MENGEN[MENGEN.length - 1]).length

      seite.appendChild(h('header.seitenkopf',
        h('div.seitenkopf__ueber', 'Training'),
        h('h1', 'Generalprobe'),
        h('p', 'Einmal der ganze Stoff am Stück, so ähnlich wie in der Klausur. Hier wird nicht geübt, hier wird gemessen.')))

      seite.appendChild(h('div.karte.stapel',
        h('h2.karte__titel', 'Wie die Probe zusammengestellt wird'),
        h('ul.probe__regeln',
          h('li', `Rund ${STANDARD_MENGE} Aufgaben quer durch alle Module, jedes Modul nach seiner Lernzeit.`),
          h('li', 'Offene Erklär- und Fallaufgaben werden bevorzugt: in der Klausur musst du formulieren, nicht ankreuzen.'),
          h('li', 'Themen, die noch wackeln, kommen häufiger dran.'),
          h('li', 'Jede Aufgabe kommt genau einmal. Keine Fehlerschleife, kein zweiter Versuch.'),
          h('li', `Dauer rund ${minutenText(probeMin)}. Die Uhr läuft mit, sie zwingt dich zu nichts.`),
          h('li', 'Die Ergebnisse zählen ganz normal in deinen Lernstand.')),
        h('p.leise', 'Am besten am Ende des zweiten Lerntags, wenn du jedes Thema einmal gesehen hast.'),
        bereit
          ? mengenKnoepfe(bereit, MENGEN, (n) => starte(n), { empfohlen: true, ziel: STANDARD_MENGE, aktion: 'Probe starten' })
          : h('p.leise', 'Für eine Probe sind noch keine Aufgaben da. Arbeite zuerst ein Thema durch.')))

      const verlauf = fruehereProben()
      if (verlauf) seite.appendChild(verlauf)

      seite.appendChild(h('div.hinweiskasten',
        h('p', 'Für kurze Runden zwischendurch ist das ', h('a', { href: '#/training' }, 'Training'), ' der bessere Ort.')))
      window.scrollTo(0, 0)
    }

    function starte(n) {
      const liste = modell.probeAuswahl(n).slice(0, n)
      if (!liste.length) { zeigeStart(); return }
      // ohneSchleife: jede Aufgabe einmal. Verbucht wird trotzdem, die Probe ist Teil des Lernstands.
      const sitzung = modell.erzeugeSitzung(liste, { ohneSchleife: true })
      leeren(host)
      lauf = sitzungsLauf(host, {
        app,
        sitzung,
        titel: 'Generalprobe',
        uhr: true,
        beiEnde: ({ abgebrochen, dauerSek }) => { lauf = null; zeigeAuswertung(sitzung, dauerSek, abgebrochen) },
      })
      window.scrollTo(0, 0)
    }

    /** Ergebnis der abgeschlossenen Probe in den Lernstand legen (Vertrag: proben[]). */
    function merkeProbe(dauerSek, punkte, max, jeModul) {
      const module = {}
      for (const [id, w] of jeModul) module[id] = { punkte: Math.round(w.punkte * 100) / 100, max: w.max }
      app.speicher.aendere((z) => {
        z.proben.push({ t: Date.now(), dauerSek, punkte: Math.round(punkte * 100) / 100, max, module })
      }, { sofort: true })
    }

    function zeigeAuswertung(sitzung, dauerSek, abgebrochen) {
      const letzte = new Map(sitzung.ergebnisse.map((e) => [e.id, e]))
      if (!letzte.size) { zeigeStart(); return }
      leeren(host)
      const seite = h('div.trainingsseite')
      host.appendChild(seite)

      let punkte = 0
      const jeModul = new Map()
      for (const [id, e] of letzte) {
        punkte += e.punkte
        const mo = app.daten.modulVonAufgabe(id)
        if (!mo) continue
        if (!jeModul.has(mo.id)) jeModul.set(mo.id, { modul: mo, punkte: 0, max: 0 })
        const w = jeModul.get(mo.id)
        w.punkte += e.punkte
        w.max += 1
      }
      const max = letzte.size
      const anteil = punkte / max
      // Eine abgebrochene Probe geht nicht in den Verlauf: ein Teilergebnis wäre als Prozentzahl irreführend.
      if (!abgebrochen) merkeProbe(dauerSek, punkte, max, jeModul)

      seite.appendChild(h('header.seitenkopf',
        h('div.seitenkopf__ueber', 'Generalprobe'),
        h('h1', abgebrochen ? 'Probe abgebrochen' : 'Probe ausgewertet'),
        h('p', abgebrochen
          ? `Du hast ${max} ${max === 1 ? 'Aufgabe' : 'Aufgaben'} beantwortet. Sie sind verbucht; in den Verlauf kommt eine abgebrochene Probe nicht.`
          : `${max} Aufgaben in ${dauerText(dauerSek)}. Das Ergebnis steht in deinem Verlauf.`)))

      seite.appendChild(h('div.karte.probe__ergebnis',
        ring(anteil),
        h('div.probe__ergebnistext',
          h('p', h('strong', `${punkteText(punkte)} von ${max} Punkten`)),
          h('p.leise', 'Teilpunkte gibt es bei Aufgaben mit mehreren Angaben. Bei offenen Aufgaben zählt deine eigene Einschätzung.'))))

      seite.appendChild(h('section.stapel',
        h('h2', 'Nach Modulen'),
        h('ul.probe__module', [...jeModul.values()].map((w) => {
          const a = w.max ? w.punkte / w.max : 0
          return h('li.probe__modul',
            h('div.zeile.zeile--auseinander.probe__modulkopf',
              h('span.probe__modultitel', w.modul.titel),
              h('span.leise.zahl', `${punkteText(w.punkte)} von ${w.max}`)),
            balken(a, stufeVonWert(a)))
        }))))

      const daneben = [...letzte.entries()].filter(([, e]) => e.punkte < 0.999)
        .sort((x, y) => (Number(y[1].einordnung === 'irrtum') - Number(x[1].einordnung === 'irrtum')) || (x[1].punkte - y[1].punkte))
      // Die Liste steht bewusst VOR dem Bedingungsausdruck: Eine Pfeilfunktion mit zerlegtem Parameter im
      // Ja-Zweig von "? :" bricht in Safari mit einem Syntaxfehler ab (Chrome und node nehmen sie klaglos).
      const danebenZeilen = daneben.map((paar) => {
            const id = paar[0]
            const e = paar[1]
            const a = app.daten.aufgabe(id)
            const th = app.daten.themaVonAufgabe(id)
            return h('li', h('a.eintrag', { href: th ? '#/thema/' + th.id : '#/lernzettel' },
              h('span.eintrag__titel', mini((a && (a.kurz || a.frage)) || 'Aufgabe', { inline: true })),
              h('span.eintrag__rechts', e.einordnung === 'irrtum'
                ? h('span.marke-chip.marke-chip--schlecht', 'sicher geirrt')
                : h('span.leise.zahl', prozent(e.punkte) + ' %')),
              th ? h('span.eintrag__neben', th.titel) : null))
      })
      seite.appendChild(h('section.stapel',
        h('h2', 'Was nicht saß'),
        daneben.length
          ? h('ul.eintragsliste', danebenZeilen)
          : h('div.hinweiskasten.hinweiskasten--gut', h('p', 'Alles richtig. Mehr ist dazu nicht zu sagen.'))))

      const zuerst = empfehlung(letzte)
      seite.appendChild(h('section.stapel',
        h('h2', 'Womit du jetzt weitermachst'),
        zuerst.length
          ? h('div.stapel--eng',
            h('p', zuerst.length === 1
              ? 'Dieses Thema bringt dir in der verbleibenden Zeit am meisten:'
              : `Diese ${zuerst.length === 2 ? 'zwei' : 'drei'} Themen bringen dir in der verbleibenden Zeit am meisten:`),
            h('ul.eintragsliste', zuerst.map(({ th, s }) => {
              const mo = app.daten.modulVonThema(th.id)
              const rest = modell.restzeitMin(th)
              return h('li', h('a.eintrag', { href: '#/thema/' + th.id },
                h('span.eintrag__titel', th.titel),
                h('span.eintrag__rechts', ampel(s.status)),
                h('span.eintrag__neben', [mo && mo.titel, rest >= 1 ? 'noch etwa ' + minutenText(rest) : statusText(s.status)].filter(Boolean).join(' · '))))
            })))
          : h('div.hinweiskasten.hinweiskasten--gut', h('p', 'Es sitzt alles. Wiederhole morgen früh noch einmal die fälligen Aufgaben, mehr braucht es nicht.'))))

      seite.appendChild(h('div.zeile.abschlussknoepfe',
        h('a.knopf.knopf--primaer', { href: '#/lernzettel' }, symbol('zettel'), 'Persönlichen Lernzettel öffnen'),
        h('a.knopf', { href: '#/training' }, symbol('wiederholen'), 'Ins Training'),
        h('button.knopf.knopf--still', { type: 'button', onclick: () => zeigeStart() }, 'Noch eine Probe')))

      const verlauf = fruehereProben()
      if (verlauf) seite.appendChild(verlauf)
      window.scrollTo(0, 0)
    }

    /** Die drei Themen, die zuerst drankommen: was in der Probe Punkte gekostet hat, das schwächste zuerst. */
    function empfehlung(letzte) {
      const kandidaten = new Map()
      for (const [id, e] of letzte) {
        if (e.punkte >= 0.999) continue
        const th = app.daten.themaVonAufgabe(id)
        if (th) kandidaten.set(th.id, th)
      }
      const themen = [...kandidaten.values()]
      // Zu wenige Treffer: mit allem auffüllen, was laut Lernstand noch nicht sitzt
      for (const th of app.daten.alleThemen) {
        if (themen.length >= 3) break
        if (!kandidaten.has(th.id) && modell.themaStand(th).status !== 'gut') themen.push(th)
      }
      return themen
        .map((th) => ({ th, s: modell.themaStand(th) }))
        .sort((a, b) => a.s.wert - b.s.wert || (b.th.gewicht || 1) - (a.th.gewicht || 1))
        .slice(0, 3)
    }

    zeigeStart()

    return () => { if (lauf) lauf.stopp() }
  },
}
