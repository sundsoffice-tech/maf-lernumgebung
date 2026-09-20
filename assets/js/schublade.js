// Schublade: etwas nachschlagen (Lernkarte, Glossar, Person), ohne die laufende Aufgabe zu verlassen.
import { h, symbol } from './mini.js'

let offen = null
let scrollStand = 0

// iOS Safari scrollt den Hintergrund trotz overflow: hidden weiter. Erst ein fest gestellter body hält ihn
// an; dafür muss der Scrollstand gemerkt und beim Schließen zurückgesetzt werden, sonst springt die Seite.
function sperreHintergrund() {
  scrollStand = window.scrollY || document.documentElement.scrollTop || 0
  const s = document.body.style
  s.position = 'fixed'
  s.top = -scrollStand + 'px'
  s.left = '0'
  s.right = '0'
  s.width = '100%'
  s.overflow = 'hidden'
}

function loeseHintergrund() {
  const s = document.body.style
  s.position = ''
  s.top = ''
  s.left = ''
  s.right = ''
  s.width = ''
  s.overflow = ''
  window.scrollTo(0, scrollStand)
}

export function schliesseSchublade() {
  if (!offen) return
  const { hintergrund, lade, vorher, tastatur } = offen
  offen = null
  document.removeEventListener('keydown', tastatur)
  hintergrund.classList.remove('ist-offen')
  lade.classList.remove('ist-offen')
  setTimeout(() => { hintergrund.remove(); lade.remove() }, 260)
  loeseHintergrund()
  if (vorher && typeof vorher.focus === 'function') vorher.focus()
}

export function oeffneSchublade(titel, inhalt) {
  schliesseSchublade()
  const vorher = document.activeElement
  const zu = h('button.knopf.knopf--still.knopf--klein', { type: 'button', 'aria-label': 'Schließen', onclick: schliesseSchublade }, symbol('kreuz'), 'Schließen')
  const hintergrund = h('div.schublade-hintergrund', { onclick: schliesseSchublade })
  const lade = h('aside.schublade', { role: 'dialog', 'aria-modal': 'true', 'aria-label': titel },
    h('div.schublade__kopf', h('h2', titel), zu),
    h('div.schublade__inhalt', inhalt))
  const tastatur = (e) => {
    if (e.key === 'Escape') { e.preventDefault(); schliesseSchublade(); return }
    if (e.key !== 'Tab') return
    // Fokus in der Schublade halten
    const ziele = lade.querySelectorAll('button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])')
    if (!ziele.length) return
    const erstes = ziele[0], letztes = ziele[ziele.length - 1]
    if (e.shiftKey && document.activeElement === erstes) { e.preventDefault(); letztes.focus() }
    else if (!e.shiftKey && document.activeElement === letztes) { e.preventDefault(); erstes.focus() }
  }
  document.body.append(hintergrund, lade)
  // Nach schliesseSchublade() oben: der Scrollstand ist bereits zurückgesetzt, hier wird der echte gemerkt
  sperreHintergrund()
  document.addEventListener('keydown', tastatur)
  offen = { hintergrund, lade, vorher, tastatur }
  requestAnimationFrame(() => { hintergrund.classList.add('ist-offen'); lade.classList.add('ist-offen'); zu.focus() })
}
