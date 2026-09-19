// Gesamttest: baut JEDE Lernkarte und JEDE Aufgabe des Kurses im echten Rahmen auf (jsdom) und prüft,
// dass nichts abstürzt, kein Platzhalter und kein Fehlerkasten erscheint und jede Aufgabe abschließbar ist.
// Aufruf: node werkzeug/test_alle_inhalte.mjs
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { richteDomEin } from './dom.mjs'

const window = richteDomEin()
const WURZEL = join(dirname(fileURLToPath(import.meta.url)), '..')
const lies = (d) => JSON.parse(readFileSync(join(WURZEL, 'daten', d), 'utf8'))

const { baueIndex } = await import('../assets/js/daten.js')
const { zeigeAufgabe } = await import('../assets/js/aufgabenrahmen.js')
const { renderKarte } = await import('../assets/js/bausteine/index.js')
const { holeRenderer } = await import('../assets/js/aufgaben/index.js')
const { holeDiagramm, abfragbareLabels, DIAGRAMM_IDS } = await import('../assets/js/diagramme/index.js')

const index = lies('module.json')
const module = index.module.map((kopf) => ({ ...kopf, themen: (kopf.dateien || [kopf.datei]).flatMap((d) => lies(d).themen || []) }))
const daten = baueIndex({ kurs: index.kurs, module, personen: lies('personen.json').personen, glossar: lies('glossar.json').begriffe, quellen: lies('quellen.json') })
const app = { daten, speicher: { zustand: { notizen: {} }, aendere(fn) { fn(this.zustand) } }, modell: null }

const fehler = []
const F = (wo, was) => fehler.push(`${wo}: ${was}`)
let karten = 0, aufgaben = 0

// Fehlermeldungen der Renderer abfangen, damit ein verschluckter Fehler nicht als grün durchgeht
const konsolenFehler = []
const alt = console.error
console.error = (...a) => { konsolenFehler.push(a.map(String).join(' ')) }

for (const id of DIAGRAMM_IDS) {
  const d = holeDiagramm(id)
  if (!d || !d.svg || d.svg.length < 50) { F('diagramm ' + id, 'leer oder Platzhalter'); continue }
  // Quer- und Hochkantfassung (iPhone) müssen dieselben Beschriftungen tragen: Wer auf dem Handy lernt,
  // darf keine andere Abbildung sehen als auf dem iPad.
  const fassungen = [['quer', d.svg]]
  if (d.svgSchmal) {
    fassungen.push(['hochkant', d.svgSchmal])
    if (!/^0 0 \d+ \d+$/.test(d.viewBoxSchmal || '')) F('diagramm ' + id, 'svgSchmal ohne gültige viewBoxSchmal')
  }
  for (const [name, inhalt] of fassungen) {
    if (/#[0-9a-fA-F]{3,8}\b|rgb\(|hsl\(/.test(inhalt)) F('diagramm ' + id, `feste Farbe im SVG (${name}), nur Klassen aus diagramme.css erlaubt`)
    const probe = window.document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    probe.innerHTML = inhalt
    for (const l of d.labels || []) {
      const el = probe.querySelector(`text[data-label="${l.id}"]`)
      if (!el) { F('diagramm ' + id, `Label ${l.id} fehlt in der Fassung ${name}`); continue }
      // Umbrüche per tspan dürfen ein Leerzeichen einfügen oder weglassen (Trennung am Schrägstrich, Bindestrich)
      const kompakt = (s) => String(s).replace(/\s+/g, '')
      if (kompakt(el.textContent) !== kompakt(l.text)) F('diagramm ' + id, `Label ${l.id} (${name}): SVG-Text "${el.textContent.replace(/\s+/g, ' ').trim()}" ungleich labels.text "${l.text}"`)
    }
  }
}

for (const m of module) {
  for (const th of m.themen) {
    for (const k of th.lernkarten || []) {
      karten += 1
      const vorher = konsolenFehler.length
      let el
      try { el = renderKarte(k, app) } catch (e) { F(k.id, 'Lernkarte stürzt ab: ' + e.message); continue }
      if (konsolenFehler.length > vorher) F(k.id, 'Blockfehler: ' + konsolenFehler[konsolenFehler.length - 1].slice(0, 140))
      if (/Unbekannter Block|nicht verfügbar|konnte nicht angezeigt/.test(el.textContent)) F(k.id, 'Platzhalter- oder Fehlerkasten in der Lernkarte')
      if (el.textContent.trim().length < 40) F(k.id, 'Lernkarte fast leer')
    }
    for (const a of th.aufgaben || []) {
      aufgaben += 1
      const renderer = holeRenderer(a.typ, a)
      if (renderer.typ === 'unbekannt') { F(a.id, `kein Renderer für Typ ${a.typ}`); continue }
      const host = window.document.createElement('div')
      window.document.body.appendChild(host)
      const vorher = konsolenFehler.length
      let ergebnis = null
      try {
        zeigeAufgabe(host, a, { app, onErgebnis: (e) => { ergebnis = e }, onWeiter: () => {} })
      } catch (e) { F(a.id, 'Aufbau stürzt ab: ' + e.message); host.remove(); continue }
      if (konsolenFehler.length > vorher) F(a.id, 'Fehler beim Aufbau: ' + konsolenFehler[konsolenFehler.length - 1].slice(0, 140))
      const text = host.textContent
      if (/noch nicht gebaut|konnte nicht angezeigt werden|nicht verfügbar/.test(text)) F(a.id, `Platzhalter oder Fehlerkasten (Typ ${a.typ})`)
      if (a.typ === 'beschriften') {
        const n = abfragbareLabels(a.diagramm, a.gruppe).length
        if (n < 2) F(a.id, `Diagramm ${a.diagramm}${a.gruppe ? '/' + a.gruppe : ''} hat nur ${n} abfragbare Beschriftungen`)
      }
      if (!renderer.selbstbewertung) {
        // Abschließbar: Abgabe erzwingen (ohne Eingabe) und prüfen, dass ein Ergebnis mit gültiger Punktzahl kommt
        const knopf = host.querySelectorAll('.aufgabe__abgabeknoepfe button')[1]
        if (!knopf) F(a.id, 'Abgabe-Knöpfe fehlen')
        else {
          knopf.disabled = false
          try { knopf.click() } catch (e) { F(a.id, 'pruefen() stürzt ab: ' + e.message) }
          if (!ergebnis || !(ergebnis.punkte >= 0 && ergebnis.punkte <= 1)) F(a.id, 'pruefen() liefert keine gültige Punktzahl')
          else if (ergebnis.punkte > 0.34 && !['sortieren'].includes(a.typ)) F(a.id, `leere Abgabe bringt ${ergebnis.punkte} Punkte`)
          if (!/So steht es im Skript|So steht es in der Quelle/.test(host.textContent)) F(a.id, 'Rückmeldung zeigt keinen Beleg')
        }
      }
      host.remove()
    }
  }
}

console.error = alt
console.log(`Aufgebaut: ${karten} Lernkarten, ${aufgaben} Aufgaben, ${DIAGRAMM_IDS.length} Diagramme`)
for (const f of fehler.slice(0, 60)) console.log('FEHLER  ' + f)
if (fehler.length > 60) console.log(`… und ${fehler.length - 60} weitere`)
console.log(`${fehler.length} Fehler`)
process.exit(fehler.length ? 1 : 0)
