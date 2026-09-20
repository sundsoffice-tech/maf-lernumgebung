// Verzeichnis der Diagramme (Katalog im Bauvertrag, Abschnitt 7) und ihr Renderer.
// Ein Diagramm ist eine eigene Zeichnung mit den Beschriftungen der Folie. Im Modus "beschriften" werden
// abfragbare Beschriftungen durch nummerierte Marken ersetzt.
import { h } from '../mini.js'
import entwicklungstypen from './entwicklungstypen.js'
import wachstumsphasen from './wachstumsphasen.js'
import persuasion from './persuasion.js'
import fuehrungsbeziehungen from './fuehrungsbeziehungen.js'
import blakeMouton from './blake-mouton.js'
import motivationQuellen from './motivation-quellen.js'
import maslow from './maslow.js'
import herzberg from './herzberg.js'
import verhaltenDeterminanten from './verhalten-determinanten.js'
import tuckman from './tuckman.js'
import problemtypen from './problemtypen.js'
import changeKurve from './change-kurve.js'
import widerstand from './widerstand.js'
import kongruenzmodell from './kongruenzmodell.js'
import phasenverschiebung from './phasenverschiebung.js'
import vergessenskurve from './vergessenskurve.js'
import lencioni from './lencioni.js'

const ALLE = [entwicklungstypen, wachstumsphasen, persuasion, fuehrungsbeziehungen, blakeMouton, motivationQuellen,
  maslow, herzberg, verhaltenDeterminanten, tuckman, problemtypen, changeKurve, widerstand, kongruenzmodell,
  phasenverschiebung, vergessenskurve, lencioni]
const NACH_ID = new Map(ALLE.map((d) => [d.id, d]))

const SVG_NS = 'http://www.w3.org/2000/svg'

export function holeDiagramm(id) { return NACH_ID.get(id) || null }

export function abfragbareLabels(id, gruppe) {
  const d = NACH_ID.get(id)
  if (!d) return []
  return (d.labels || []).filter((l) => l.abfragbar && (!gruppe || l.gruppe === gruppe))
}

/**
 * Diagramm als Element. opts.verdeckt: Map labelId -> Nummer; diese Beschriftungen erscheinen als Marke.
 * Rückgabe: div.diagrammrahmen (darin div.diagrammhuelle mit dem SVG und ggf. die Hinweiszeile).
 *
 * Ein Diagramm kann neben der Querfassung (svg, viewBox) eine Hochkantfassung mitbringen (svgSchmal,
 * viewBoxSchmal, dieselben Label-IDs). Auf schmalen Bildschirmen (iPhone hochkant) wird sie genommen und passt
 * ohne seitliches Wischen. Beim Drehen des Geräts wechselt die Fassung mit.
 */
const SCHMAL = '(max-width: 40rem)'

function zeichne(svg, d, schmal, verdeckt) {
  svg.setAttribute('viewBox', (schmal && d.viewBoxSchmal) || d.viewBox || '0 0 800 450')
  // Das SVG-Innere stammt aus unserem eigenen Code (nicht aus Kursdaten), darf also direkt gesetzt werden
  svg.innerHTML = (schmal && d.svgSchmal) || d.svg
  if (!verdeckt) return
  for (const text of svg.querySelectorAll('text[data-label]')) {
    const nummer = verdeckt.get(text.getAttribute('data-label'))
    if (nummer == null) continue
    const x = Number(text.getAttribute('x')) || 0
    const y = Number(text.getAttribute('y')) || 0
    const anker = text.getAttribute('text-anchor') || 'start'
    const marke = document.createElementNS(SVG_NS, 'g')
    marke.setAttribute('class', 'd-marke')
    marke.setAttribute('data-marke', String(nummer))
    const r = 13
    const mx = anker === 'middle' ? x : anker === 'end' ? x - r : x + r
    const kreis = document.createElementNS(SVG_NS, 'circle')
    kreis.setAttribute('cx', mx); kreis.setAttribute('cy', y - 5); kreis.setAttribute('r', r)
    const zahl = document.createElementNS(SVG_NS, 'text')
    zahl.setAttribute('x', mx); zahl.setAttribute('y', y); zahl.setAttribute('text-anchor', 'middle')
    zahl.textContent = String(nummer)
    marke.append(kreis, zahl)
    text.replaceWith(marke)
  }
}

export function renderDiagramm(id, opts = {}) {
  const d = NACH_ID.get(id)
  if (!d || !d.svg) {
    return h('div.hinweiskasten.hinweiskasten--mittel', h('p', `Die Abbildung „${id}“ ist in dieser Fassung nicht verfügbar.`))
  }
  const svg = document.createElementNS(SVG_NS, 'svg')
  svg.setAttribute('role', 'img')
  svg.setAttribute('aria-label', d.titel + (d.beschreibung ? '. ' + d.beschreibung : ''))
  const huelle = h('div.diagrammhuelle', { tabindex: '0', role: 'group', 'aria-label': 'Abbildung: ' + d.titel })

  const medium = d.svgSchmal && typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(SCHMAL) : null
  const stelleEin = () => {
    const schmal = !!(medium && medium.matches)
    zeichne(svg, d, schmal, opts.verdeckt)
    // Die Hochkantfassung ist für die Handybreite gezeichnet und braucht keine Mindestbreite
    if (d.minBreite && !schmal) huelle.style.setProperty('--d-minbreite', d.minBreite + 'px')
    else huelle.style.removeProperty('--d-minbreite')
  }
  stelleEin()
  huelle.appendChild(svg)
  // Drehen des Geräts: Fassung wechseln, solange niemand gerade beschriftet (Marken tragen dann Zustände).
  // Der Hörer meldet sich selbst ab, sobald das Diagramm nicht mehr im Dokument hängt: Über eine lange
  // Lernsitzung mit vielen Kartenwechseln bliebe sonst je Abbildung ein Hörer samt Element im Speicher.
  if (medium && !opts.verdeckt) {
    let warImDokument = false
    const beimDrehen = () => {
      if (svg.isConnected) { warImDokument = true; stelleEin(); return }
      if (!warImDokument) return
      if (medium.removeEventListener) medium.removeEventListener('change', beimDrehen)
      else if (medium.removeListener) medium.removeListener(beimDrehen)
    }
    if (medium.addEventListener) medium.addEventListener('change', beimDrehen)
    else if (medium.addListener) medium.addListener(beimDrehen)
  }

  // Bleibt eine Abbildung breiter als der Bildschirm, merkt ohne Hinweis niemand, dass rechts etwas fehlt:
  // Randverlauf plus Textzeile, solange etwas verborgen ist.
  const fenster = h('div.diagrammfenster', huelle)
  const hinweis = h('p.diagrammhinweis', { hidden: true }, 'Zur Seite wischen oder das Gerät quer halten, um die ganze Abbildung zu sehen.')
  const rahmen = h('div.diagrammrahmen', fenster, hinweis)
  const pruefeUeberlauf = () => {
    const ueber = huelle.scrollWidth - huelle.clientWidth > 4
    const amEnde = huelle.scrollLeft + huelle.clientWidth >= huelle.scrollWidth - 4
    hinweis.hidden = !ueber
    fenster.classList.toggle('hat-ueberlauf', ueber && !amEnde)
  }
  huelle.addEventListener('scroll', pruefeUeberlauf, { passive: true })
  if (typeof ResizeObserver !== 'undefined') {
    // Wird die Abbildung aus dem Dokument genommen, schrumpft sie auf 0 und der Beobachter feuert ein letztes
    // Mal: Das ist der Moment, ihn abzumelden, damit er das entfernte Element nicht festhält.
    let warImDokument = false
    const beobachter = new ResizeObserver(() => {
      if (huelle.isConnected) { warImDokument = true; pruefeUeberlauf(); return }
      if (warImDokument) beobachter.disconnect()
    })
    beobachter.observe(huelle)
  }
  return rahmen
}

export const DIAGRAMM_IDS = ALLE.map((d) => d.id)
