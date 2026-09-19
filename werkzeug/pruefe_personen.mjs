// Vollständigkeit des Personenregisters: Jede Person, die der Quellkorpus im Abschnitt "## Personen" einer
// Folie nennt, muss in daten/personen.json stehen UND in mindestens einer Lernkarte oder Aufgabe vorkommen.
// Aufruf: node werkzeug/pruefe_personen.mjs     Korpus-Pfad: MAF_QUELLE oder ../quelle
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), '..')
const QUELLE = process.env.MAF_QUELLE || join(WURZEL, '..', 'quelle')
if (!existsSync(QUELLE)) { console.log('Quellkorpus nicht gefunden: ' + QUELLE); process.exit(2) }

const norm = (s) => String(s).normalize('NFKC').toLowerCase().replace(/[^\p{L}]+/gu, ' ').trim()
// Nachname als Anker: "Kurt Lewin", "Lewin et al.", "Lewin`s" sollen dieselbe Person treffen
// Die Leseliste schreibt "Nachname, Vorname": dann steht der Nachname VOR dem Komma
const nachname = (s) => {
  const roh = String(s).includes(',') ? String(s).split(',')[0] : String(s)
  const t = norm(roh).split(' ').filter((w) => w.length > 1 && !['et', 'al', 'von', 'van', 'der', 'de', 'v', 'd'].includes(w))
  return t[t.length - 1] || ''
}

const korpusPersonen = new Map()
for (const datei of readdirSync(QUELLE).filter((d) => /^folie-\d\d\.md$/.test(d)).sort()) {
  const text = readFileSync(join(QUELLE, datei), 'utf8')
  const m = text.match(/## Personen\s*\n([\s\S]*?)(?=\n## |$)/)
  if (!m) continue
  for (const zeile of m[1].split('\n')) {
    const z = zeile.replace(/^[-*\s]+/, '').trim()
    if (!z || /^keine\b/i.test(z)) continue
    const name = z.split(/\s+[—–-]\s+|:\s/)[0].replace(/\*\*/g, '').replace(/\(.*?\)/g, '').trim()
    if (!name || name.length > 60) continue
    // "Gomez/Zimmermann", "Comelli/v. Rosenstiel/Nerdinger" und "Deci/Ryan" sind mehrere Personen
    for (const teil of name.split(/\s*\/\s*|\s+und\s+|\s+and\s+/)) {
      const n = teil.trim()
      if (n.length < 3) continue
      if (!korpusPersonen.has(nachname(n))) korpusPersonen.set(nachname(n), { name: n, dateien: [] })
      korpusPersonen.get(nachname(n)).dateien.push(datei.replace('.md', ''))
    }
  }
}

const register = JSON.parse(readFileSync(join(WURZEL, 'daten', 'personen.json'), 'utf8')).personen
const registerNachnamen = new Set(register.flatMap((p) => p.name.split(/\s*\/\s*/).map(nachname)))

const index = JSON.parse(readFileSync(join(WURZEL, 'daten', 'module.json'), 'utf8'))
const kursText = norm(index.module.flatMap((m) => m.dateien || [m.datei]).filter((d) => !d.startsWith('_'))
  .map((d) => readFileSync(join(WURZEL, 'daten', d), 'utf8')).join(' '))

// Bildnachweise sind laut Vertrag keine Inhaltspersonen: "Von Grap - Grap, CC BY-SA 3.0" unter dem
// Herzberg-Diagramm (Folie 47) ist der Urheber der Wikipedia-Grafik.
const BILDNACHWEISE = new Set(['grap'])

let fehler = 0
for (const [k, v] of [...korpusPersonen.entries()].sort()) {
  if (BILDNACHWEISE.has(k)) continue
  const imRegister = registerNachnamen.has(k)
  const imKurs = kursText.includes(k)
  if (!imRegister || !imKurs) {
    fehler += 1
    console.log(`FEHLER  ${v.name} (${[...new Set(v.dateien)].join(', ')}): ${imRegister ? '' : 'fehlt im Personenregister '}${imKurs ? '' : 'kommt in keinem Modul vor'}`)
  }
}
console.log(`Korpus nennt ${korpusPersonen.size} Personen, Register hat ${register.length}. ${fehler} Fehler`)
process.exit(fehler ? 1 : 0)
