// Erzeugt das Home-Bildschirm-Symbol für iPhone und iPad (180 x 180, PNG) aus einer kleinen HTML-Vorlage.
// iOS nimmt dafür kein SVG. Aufruf: node werkzeug/baue_symbol.mjs
import { webkit } from 'playwright'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ZIEL = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets', 'apple-touch-icon.png')
const html = `<!doctype html><html><body style="margin:0">
<div style="width:180px;height:180px;background:#1f3a5f;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Georgia,'Times New Roman',serif;color:#fff">
  <div style="font-size:62px;font-weight:700;letter-spacing:1px;line-height:1">MAF</div>
  <div style="font-family:Helvetica,Arial,sans-serif;font-size:17px;font-weight:600;letter-spacing:3px;margin-top:10px;opacity:.85">LERNEN</div>
</div></body></html>`

const browser = await webkit.launch()
const seite = await (await browser.newContext({ viewport: { width: 180, height: 180 }, deviceScaleFactor: 1 })).newPage()
await seite.setContent(html)
await seite.screenshot({ path: ZIEL, clip: { x: 0, y: 0, width: 180, height: 180 } })
await browser.close()
console.log('geschrieben:', ZIEL)
