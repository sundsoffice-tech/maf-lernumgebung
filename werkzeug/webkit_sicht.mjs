// Hinsehen in der Safari-Engine (WebKit über Playwright) mit echten Geräteprofilen: iPhone und iPad, hoch und
// quer, hell und dunkel, Touch. Fängt außerdem JavaScript-Fehler ab, die nur WebKit wirft. Ein Syntaxfehler
// in EINEM Modul (z. B. ein RegExp-Lookbehind auf älteren iPads) legt in Safari die ganze App lahm, obwohl
// Chrome sie klaglos lädt.
//
// Aufruf:  node werkzeug/webkit_sicht.mjs [--basis http://127.0.0.1:8765/] [--ziel <ordner>] [--nur iphone]
//          [--routen "#/,#/plan"] [--stand <datei.json>] [--spiel]
//   --stand  Lernstand (Export-Format oder roher Zustand), wird vor dem Laden in localStorage gelegt
//   --spiel  spielt zusätzlich einen Lernablauf per Touch durch (Thema öffnen, Karte weiter, Aufgabe lösen)
// Installation einmalig: cd werkzeug && npm install --no-save playwright jsdom && npx playwright install webkit
import { webkit, devices } from 'playwright'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const arg = (name, ersatz) => { const i = process.argv.indexOf('--' + name); return i > -1 ? (process.argv[i + 1] ?? true) : ersatz }
const BASIS = arg('basis', 'http://127.0.0.1:8765/')
// Screenshots gehören NICHT ins Repo: Standardziel ist der Arbeitsordner neben dem Repo, unabhängig vom Aufrufort
const ZIEL = arg('ziel', join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'arbeit', 'sicht', 'webkit'))
const NUR = arg('nur', '')
const SPIEL = process.argv.includes('--spiel')
// Routen OHNE führendes "#/" angeben ("start,plan,thema/m1-t1"): Git Bash schreibt Argumente, die wie ein
// Pfad aussehen, sonst in "C:/Program Files/Git/…" um, und geprüft wird still eine falsche Adresse.
// Einträge mit ".html" sind Seiten relativ zur Basis (z. B. die Vorschauseite).
const ROUTEN = String(arg('routen', 'start,plan,training,lernzettel,personen,glossar,quellen,mehr,einstellungen,probe')).split(',')
  .map((r) => r.trim()).filter(Boolean)
  .map((r) => (r.includes('.html') ? r : r === 'start' ? '#/' : '#/' + r.replace(/^#?\/?/, '')))
for (const r of ROUTEN) if (/Program Files|^[A-Za-z]:[\\/]/.test(r)) { console.log('ABBRUCH: Route wurde von der Shell umgeschrieben: ' + r); process.exit(2) }
const standDatei = arg('stand', '')
let stand = null
if (standDatei) { stand = JSON.parse(readFileSync(standDatei, 'utf8')); delete stand.art }

mkdirSync(ZIEL, { recursive: true })

const PROFILE = [
  { name: 'iphone-hoch', geraet: 'iPhone 14', schema: 'light' },
  { name: 'iphone-hoch-dunkel', geraet: 'iPhone 14', schema: 'dark' },
  { name: 'iphone-klein', geraet: 'iPhone SE', schema: 'light' },
  { name: 'iphone-quer', geraet: 'iPhone 14 landscape', schema: 'light' },
  { name: 'ipad-hoch', geraet: 'iPad (gen 7)', schema: 'light' },
  { name: 'ipad-hoch-dunkel', geraet: 'iPad (gen 7)', schema: 'dark' },
  { name: 'ipad-quer', geraet: 'iPad Pro 11 landscape', schema: 'light' },
  { name: 'ipad-quer-dunkel', geraet: 'iPad Pro 11 landscape', schema: 'dark' },
].filter((p) => !NUR || String(NUR).split(',').some((n) => p.name.includes(n.trim())))
if (!PROFILE.length) { console.log('ABBRUCH: kein Profil passt zu --nur ' + NUR); process.exit(2) }

// Ganze Seite, solange sie unter die Bildgrenze von WebKit passt (32767 Gerätepixel), sonst der obere Teil
async function bild(seite, pfad, geraet) {
  const faktor = geraet.deviceScaleFactor || 1
  const hoehe = await seite.evaluate(() => document.documentElement.scrollHeight)
  const maxCss = Math.floor(30000 / faktor)
  if (hoehe <= maxCss) return seite.screenshot({ path: pfad, fullPage: true })
  return seite.screenshot({ path: pfad, fullPage: true, clip: { x: 0, y: 0, width: geraet.viewport.width, height: maxCss } })
}

const bericht = []
const browser = await webkit.launch()

for (const profil of PROFILE) {
  const geraet = devices[profil.geraet]
  if (!geraet) { bericht.push({ profil: profil.name, fehler: ['Geräteprofil unbekannt: ' + profil.geraet] }); continue }
  const kontext = await browser.newContext({ ...geraet, colorScheme: profil.schema, locale: 'de-DE' })
  if (stand) await kontext.addInitScript((z) => { try { localStorage.setItem('maf-lernstand-v1', JSON.stringify(z)) } catch (e) {} }, stand)
  const seite = await kontext.newPage()
  const fehler = []
  seite.on('pageerror', (e) => fehler.push('JS-Fehler: ' + e.message))
  seite.on('console', (m) => { if (m.type() === 'error') fehler.push('Konsole: ' + m.text().slice(0, 200)) })
  seite.on('requestfailed', (r) => fehler.push('Abruf fehlgeschlagen: ' + r.url()))
  seite.on('response', (r) => { if (r.status() >= 400) fehler.push(`HTTP ${r.status()}: ${r.url().replace(BASIS, '')}`) })

  for (const route of ROUTEN) {
    const name = route.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'start'
    // Eine Route der App beginnt mit "#"; alles andere ist eine Seite relativ zur Basis (z. B. die Vorschauseite)
    await seite.goto(BASIS + (route.startsWith('#') ? 'index.html' + route : route), { waitUntil: 'networkidle' })
    await seite.waitForTimeout(350)
    // Waagerechter Überlauf ist auf dem Handy der häufigste sichtbare Fehler
    const ueberlauf = await seite.evaluate(() => {
      const breite = document.documentElement.clientWidth
      const zuBreit = []
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect()
        if (r.width > 0 && r.right > breite + 1 && !el.closest('.tabellenhuelle, .diagrammhuelle, .reiter')) {
          zuBreit.push((el.tagName + '.' + String(el.className).slice(0, 50)).toLowerCase())
          if (zuBreit.length >= 4) break
        }
      }
      return { scroll: document.documentElement.scrollWidth - breite, zuBreit }
    })
    if (ueberlauf.scroll > 1) fehler.push(`${route}: waagerechter Überlauf ${ueberlauf.scroll}px (${ueberlauf.zuBreit.join(', ')})`)
    // Trefferflächen: Knöpfe und Links unter 40 px Höhe sind auf Touch zu klein
    const klein = await seite.evaluate(() => {
      const aus = []
      for (const el of document.querySelectorAll('main button:not(.glossarlink):not(.personlink), main a.knopf, main .option, main select, main input[type="checkbox"] + span')) {
        const r = el.getBoundingClientRect()
        if (r.width > 0 && r.height > 0 && r.height < 40) { aus.push((el.textContent || el.tagName).trim().slice(0, 30) + ' ' + Math.round(r.height) + 'px'); if (aus.length >= 4) break }
      }
      return aus
    })
    if (klein.length) fehler.push(`${route}: Trefferflächen unter 40px: ${klein.join(' | ')}`)
    await bild(seite, join(ZIEL, `${profil.name}_${name}.png`), geraet)
  }

  if (SPIEL) {
    try {
      await seite.goto(BASIS + 'index.html#/plan', { waitUntil: 'networkidle' })
      const erstesThema = seite.locator('a[href^="#/thema/"]').first()
      await erstesThema.tap()
      await seite.waitForTimeout(400)
      await bild(seite, join(ZIEL, `${profil.name}_spiel-1-lernkarte.png`), geraet)
      // Lernkarten durchblättern, bis eine Aufgabe erscheint (höchstens 12 Schritte)
      for (let i = 0; i < 12; i++) {
        if (await seite.locator('.aufgabe').count()) break
        const weiter = seite.locator('main button:has-text("Weiter"), main button:has-text("Zu den Aufgaben"), main button:has-text("Aufgaben")').first()
        if (!(await weiter.count())) break
        await weiter.tap()
        await seite.waitForTimeout(250)
      }
      if (await seite.locator('.aufgabe').count()) {
        await bild(seite, join(ZIEL, `${profil.name}_spiel-2-aufgabe.png`), geraet)
        const option = seite.locator('.aufgabe .option, .aufgabe [data-wahl], .aufgabe button').first()
        if (await option.count()) await option.tap()
        const pruefen = seite.locator('.aufgabe__abgabeknoepfe button').last()
        if (await pruefen.count() && await pruefen.isEnabled()) {
          await pruefen.tap()
          await seite.waitForTimeout(300)
          await bild(seite, join(ZIEL, `${profil.name}_spiel-3-rueckmeldung.png`), geraet)
        } else fehler.push('Spiel: Abgabe-Knopf nach erstem Antippen nicht frei (Typ braucht mehr Eingaben, kein Fehler an sich)')
      } else fehler.push('Spiel: keine Aufgabe erreicht')
    } catch (e) { fehler.push('Spiel abgebrochen: ' + String(e.message).split('\n')[0]) }
  }

  bericht.push({ profil: profil.name, geraet: profil.geraet, fenster: geraet.viewport, fehler })
  await kontext.close()
}
await browser.close()

writeFileSync(join(ZIEL, 'bericht.json'), JSON.stringify(bericht, null, 2))
let summe = 0
for (const b of bericht) {
  summe += b.fehler.length
  console.log(`${b.profil.padEnd(20)} ${b.fehler.length ? b.fehler.length + ' Auffälligkeiten' : 'sauber'}`)
  for (const f of [...new Set(b.fehler)].slice(0, 8)) console.log('   ' + f)
}
console.log(`Screenshots: ${ZIEL}\n${summe} Auffälligkeiten in ${bericht.length} Profilen`)
process.exit(summe ? 1 : 0)
