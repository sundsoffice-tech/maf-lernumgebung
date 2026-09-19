// Lädt jedes JS-Modul einzeln in WebKit und meldet, welches dort nicht parst oder beim Import scheitert.
// Aufruf: node werkzeug/webkit_modulprobe.mjs [--basis http://127.0.0.1:8765/]
import { webkit } from 'playwright'
import { readdirSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), '..')
const i = process.argv.indexOf('--basis')
const BASIS = i > -1 ? process.argv[i + 1] : 'http://127.0.0.1:8765/'

function alleJs(ordner) {
  return readdirSync(ordner).flatMap((n) => {
    const p = join(ordner, n)
    return statSync(p).isDirectory() ? alleJs(p) : n.endsWith('.js') ? [p] : []
  })
}
const dateien = alleJs(join(WURZEL, 'assets', 'js')).map((p) => relative(WURZEL, p).replace(/\\/g, '/'))

const browser = await webkit.launch()
const seite = await (await browser.newContext()).newPage()
await seite.goto(BASIS + 'robots.txt')
let rot = 0
for (const d of dateien) {
  // app.js startet die ganze App; hier zählt nur, ob das Modul selbst lädt
  const ergebnis = await seite.evaluate(async (url) => {
    try { await import(url); return 'ok' } catch (e) { return (e && (e.name + ': ' + e.message + (e.line ? ' (Zeile ' + e.line + ')' : ''))) || 'Fehler' }
  }, BASIS + d + '?probe=' + Date.now())
  if (ergebnis !== 'ok') { rot += 1; console.log('ROT  ' + d + '\n     ' + ergebnis) }
}
await browser.close()
console.log(`${dateien.length - rot} von ${dateien.length} Modulen laden in WebKit`)
process.exit(rot ? 1 : 0)
