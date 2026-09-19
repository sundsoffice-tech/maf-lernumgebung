// DOM-Umgebung für Tests unter node (jsdom). Trägt die Vorbedingungen, die die Renderer brauchen:
// document, Node, Ereignisse, requestAnimationFrame, scrollIntoView. Installation einmalig:
//   cd werkzeug && npm install --no-save jsdom
import { JSDOM } from 'jsdom'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const HIER = dirname(fileURLToPath(import.meta.url))

export function richteDomEin() {
  const dom = new JSDOM('<!doctype html><html lang="de"><body><main id="inhalt"></main></body></html>', { url: 'http://localhost/', pretendToBeVisual: true })
  const { window } = dom
  for (const name of ['window', 'document', 'Node', 'HTMLElement', 'Element', 'Event', 'KeyboardEvent', 'MouseEvent', 'DocumentFragment', 'localStorage', 'location', 'URLSearchParams']) {
    if (!(name in globalThis) || name === 'document' || name === 'window') {
      try { globalThis[name] = window[name] } catch (e) { /* schreibgeschützt in neuen node-Versionen */ }
    }
  }
  globalThis.requestAnimationFrame = (f) => setTimeout(f, 0)
  window.Element.prototype.scrollIntoView = function () {}
  window.scrollTo = () => {}
  return window
}

export function musterAufgabe(typ) {
  const muster = JSON.parse(readFileSync(join(HIER, '..', 'daten', '_muster.json'), 'utf8'))
  const a = muster.themen[0].aufgaben.find((x) => x.typ === typ)
  if (!a) throw new Error('Keine Musteraufgabe vom Typ ' + typ)
  return structuredClone(a)
}

/** Attrappe der Rahmen-API: merkt sich, was der Renderer meldet. */
export function attrappeApi() {
  const log = { bereit: [], fertig: null }
  return { log, bereit: (ja) => log.bereit.push(!!ja), fertig: (e) => { log.fertig = e }, app: { daten: null, speicher: null } }
}

export function klick(el) {
  el.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true }))
}

export function kleinerTestlauf(tests) {
  let rot = 0
  return (async () => {
    for (const [name, fn] of tests) {
      try { await fn(); console.log('ok    ' + name) } catch (e) { rot += 1; console.log('ROT   ' + name + '\n      ' + String(e && e.message).split('\n')[0]) }
    }
    console.log(`${tests.length - rot} von ${tests.length} grün`)
    process.exit(rot ? 1 : 0)
  })()
}
