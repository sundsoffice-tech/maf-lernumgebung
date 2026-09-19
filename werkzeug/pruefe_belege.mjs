// Mechanischer Wächter der Quellenbindung: Jeder "beleg" einer Aufgabe, Person oder eines Glossareintrags
// muss wörtlich im Quellkorpus stehen (folie-NN.md oder extern-*.md). Der Korpus liegt außerhalb des Repos,
// weil er das Skript des Dozenten wörtlich enthält.
// Aufruf: node werkzeug/pruefe_belege.mjs [m1.json …]    Korpus-Pfad: Umgebungsvariable MAF_QUELLE oder ../quelle
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), '..')
const DATEN = join(WURZEL, 'daten')
const QUELLE = process.env.MAF_QUELLE || join(WURZEL, '..', 'quelle')

if (!existsSync(QUELLE)) {
  console.log(`Quellkorpus nicht gefunden: ${QUELLE}. Ohne Korpus ist diese Prüfung nicht möglich.`)
  process.exit(2)
}

// Vergleich ohne Auszeichnungszeichen, Leerraum, Anführungs- und Strichvarianten: geprüft wird der Wortlaut
function norm(s) {
  return String(s)
    .normalize('NFKC')
    .toLowerCase()
    .replace(/\*\*|==|__|`/g, '')
    .replace(/[„“”"«»‚‘’'´`]/g, '')
    .replace(/[‐‑‒–—−-]/g, '-')
    .replace(/\|/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s*([.,;:!?()/-])\s*/g, '$1')
    .trim()
}

const korpus = new Map()
for (const datei of readdirSync(QUELLE)) {
  if (!/^(folie-\d\d|extern-[a-z]+)\.md$/.test(datei)) continue
  korpus.set(datei.replace(/\.md$/, ''), norm(readFileSync(join(QUELLE, datei), 'utf8')))
}

const fehler = []
let geprueft = 0

function pruefe(wo, text, quelle) {
  geprueft += 1
  if (!korpus.has(quelle)) { fehler.push(`${wo}: belegQuelle "${quelle}" gibt es im Korpus nicht`); return }
  const gesucht = norm(text)
  if (gesucht.length < 8) { fehler.push(`${wo}: Beleg zu kurz, um etwas zu tragen: "${text}"`); return }
  // Auslassungen im Beleg sind mit … oder [...] erlaubt: jedes Teilstück muss vorkommen
  const teile = gesucht.split(/\s*(?:…|\[\.\.\.\]|\.\.\.)\s*/).filter((t) => t.length >= 4)
  const inhalt = korpus.get(quelle)
  for (const teil of teile) {
    if (!inhalt.includes(teil)) {
      const woanders = [...korpus.entries()].find(([, v]) => v.includes(teil))
      fehler.push(`${wo}: Beleg nicht in ${quelle}${woanders ? ` (steht aber in ${woanders[0]})` : ''}: "${text.slice(0, 110)}"`)
      return
    }
  }
}

function lies(datei) {
  const pfad = join(DATEN, datei)
  if (!existsSync(pfad)) return null
  return JSON.parse(readFileSync(pfad, 'utf8'))
}

const argumente = process.argv.slice(2)
const moduldateien = argumente.length ? argumente : ((lies('module.json') || { module: [] }).module.flatMap((m) => m.dateien || [m.datei]))
for (const datei of moduldateien) {
  const m = lies(datei)
  if (!m) { fehler.push(`${datei}: Datei fehlt`); continue }
  for (const th of m.themen || []) for (const a of th.aufgaben || []) {
    const belege = a.belege || (a.beleg ? [{ text: a.beleg, quelle: a.belegQuelle }] : [])
    if (!belege.length) fehler.push(`${datei} ${a.id}: kein Beleg`)
    for (const b of belege) pruefe(`${datei} ${a.id}`, b.text, b.quelle)
  }
}
if (!argumente.length) {
  for (const p of (lies('personen.json') || { personen: [] }).personen) pruefe(`personen.json ${p.name}`, p.beleg, p.belegQuelle)
  for (const b of (lies('glossar.json') || { begriffe: [] }).begriffe) if (b.beleg) pruefe(`glossar.json ${b.begriff}`, b.beleg, b.belegQuelle)
}

console.log(`Korpus: ${korpus.size} Dateien. Belege geprüft: ${geprueft}`)
for (const f of fehler) console.log('FEHLER  ' + f)
console.log(`${fehler.length} Fehler`)
process.exit(fehler.length ? 1 : 0)
