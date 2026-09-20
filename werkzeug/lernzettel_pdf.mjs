// Erzeugt das fertige Standard-PDF des Lernzettels (Vertrag Abschnitt 8, Regel 9) als Datei im Repo.
// Es ist der Weg am iOS-Umweg Teilen-Drucken-Vorschau-Sichern vorbei: die Lernende tippt einen Link an.
//
// Aufruf:  node werkzeug/lernzettel_pdf.mjs [--basis http://127.0.0.1:8765/] [--modus ausfuehrlich]
//          [--ziel lernzettel/MAF-Lernzettel.pdf]
// Voraussetzung: der lokale Server läuft auf --basis.
//
// Warum Chromium und nicht WebKit: Playwright kann NUR in Chromium seitenweise als PDF ausgeben
// (page.pdf ist dort allein umgesetzt). Die Datei selbst ist danach engine-unabhängig. Wie Safari den
// Zettel über seinen eigenen Druckweg umbricht, ist damit NICHT gemessen — deshalb hält das Druck-CSS
// sich an Konstrukte, die WebKit über Seitengrenzen teilen kann (mehrspaltiger Satz statt Raster).
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const arg = (name, ersatz) => { const i = process.argv.indexOf('--' + name); return i > -1 ? (process.argv[i + 1] ?? true) : ersatz }
const BASIS = arg('basis', 'http://127.0.0.1:8765/')
const MODUS = arg('modus', 'ausfuehrlich')
const REPO = join(dirname(fileURLToPath(import.meta.url)), '..')
const ZIEL = resolve(REPO, String(arg('ziel', 'lernzettel/MAF-Lernzettel.pdf')))

mkdirSync(dirname(ZIEL), { recursive: true })

// Erst der mitgelieferte Chromium, sonst das installierte Chrome: nach einem Playwright-Update fehlt
// der passende Chromium-Stand oft, und ein 150-MB-Download soll das PDF nicht aufhalten.
let browser = null
try {
  browser = await chromium.launch()
} catch (e) {
  console.log('Hinweis: mitgelieferter Chromium fehlt, nehme das installierte Chrome.')
  browser = await chromium.launch({ channel: 'chrome' })
}
const kontext = await browser.newContext({ colorScheme: 'light', locale: 'de-DE' })
const seite = await kontext.newPage()
const fehler = []
seite.on('pageerror', (e) => fehler.push('JS-Fehler: ' + e.message))
seite.on('response', (r) => { if (r.status() >= 400) fehler.push(`HTTP ${r.status()}: ${r.url().replace(BASIS, '')}`) })

// druck=1 nimmt Werkzeugleiste, Verzeichnis und „Nach oben“ schon aus dem DOM und erzwingt das helle Thema.
await seite.goto(BASIS + 'index.html#/lernzettel?modus=' + encodeURIComponent(MODUS) + '&druck=1', { waitUntil: 'networkidle' })
await seite.waitForSelector('.lz-dokument .lz-modul')
await seite.waitForTimeout(400)

// Seitenzahlen kommen aus der Fußzeile des Druckers; @bottom-right aus dem CSS kennt kein Browser.
await seite.pdf({
  path: ZIEL,
  format: 'A4',
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate: '<div style="width:100%;font-family:sans-serif;font-size:8pt;color:#6b7484;padding:0 12mm;text-align:right"><span class="pageNumber"></span> von <span class="totalPages"></span></div>',
  margin: { top: '12mm', right: '12mm', bottom: '14mm', left: '12mm' },
})

await browser.close()
console.log('PDF: ' + ZIEL + ' (Fassung ' + MODUS + ')')
for (const f of [...new Set(fehler)]) console.log('   ' + f)
process.exit(fehler.length ? 1 : 0)
