// Führt die Teil-Register der Inhalts-Autoren (daten/teile/personen-*.json, glossar-*.json) zu
// daten/personen.json und daten/glossar.json zusammen. Dieselbe Person kommt in mehreren Skriptteilen vor
// (Kurt Lewin: Führungsstile, 3-Schritt-Modell, Leseliste): Die Beiträge bleiben alle erhalten und tragen
// ihren Folienbezug, nichts wird zugunsten eines "besten" Eintrags verworfen.
// Aufruf: node werkzeug/baue_register.mjs
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), '..')
const TEILE = join(WURZEL, 'daten', 'teile')

const schluessel = (s) => String(s || '').normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
const eindeutig = (liste) => [...new Set(liste)]
const teilRang = (datei) => { const m = datei.match(/-(m\d)([ab]?)\.json$/); return m ? m[1] + (m[2] || 'a') : 'z' }

function liesTeile(praefix, feld) {
  if (!existsSync(TEILE)) return []
  return readdirSync(TEILE)
    .filter((d) => d.startsWith(praefix) && d.endsWith('.json'))
    .sort((a, b) => teilRang(a).localeCompare(teilRang(b)))
    .flatMap((d) => {
      try { return (JSON.parse(readFileSync(join(TEILE, d), 'utf8'))[feld] || []).map((e) => ({ ...e, _teil: d })) }
      catch (e) { console.log(`FEHLER  ${d}: ${e.message}`); process.exitCode = 1; return [] }
    })
}

const RANG_QUELLE = { skript: 0, extern: 1, leseliste: 2 }

// Personen
const personen = new Map()
for (const p of liesTeile('personen-', 'personen')) {
  const k = schluessel(p.name)
  if (!k) continue
  const folienText = (p.folien || []).length ? 'Folie ' + p.folien.join(', ') : (p.quelle === 'leseliste' ? 'Leseliste' : 'Skript')
  const eintrag = { text: String(p.beitrag || '').trim(), wo: folienText, quelle: p.quelle || 'skript' }
  if (!personen.has(k)) {
    personen.set(k, { name: p.name, kurze: [p.kurz], eintraege: [eintrag], folien: [...(p.folien || [])], themen: [...(p.themen || [])], quelle: p.quelle || 'skript', beleg: p.beleg, belegQuelle: p.belegQuelle })
  } else {
    const v = personen.get(k)
    if (p.kurz && !v.kurze.some((x) => schluessel(x) === schluessel(p.kurz))) v.kurze.push(p.kurz)
    if (eintrag.text && !v.eintraege.some((x) => schluessel(x.text) === schluessel(eintrag.text))) v.eintraege.push(eintrag)
    v.folien.push(...(p.folien || []))
    v.themen.push(...(p.themen || []))
    // Die stärkste Herkunft gewinnt: im Skript behandelt schlägt nur in der Leseliste genannt
    if ((RANG_QUELLE[p.quelle] ?? 9) < (RANG_QUELLE[v.quelle] ?? 9)) { v.quelle = p.quelle; v.beleg = p.beleg; v.belegQuelle = p.belegQuelle }
  }
}
const personenAus = [...personen.values()].map((v) => ({
  name: v.name,
  kurz: v.kurze.filter(Boolean).join(' · '),
  beitrag: v.eintraege.length === 1 ? v.eintraege[0].text : v.eintraege.map((e) => `- **${e.wo}:** ${e.text}`).join('\n'),
  folien: eindeutig(v.folien).sort((a, b) => a - b),
  themen: eindeutig(v.themen),
  quelle: v.quelle,
  beleg: v.beleg,
  belegQuelle: v.belegQuelle,
})).sort((a, b) => (a.folien[0] ?? 999) - (b.folien[0] ?? 999) || a.name.localeCompare(b.name, 'de'))

// Glossar
const begriffe = new Map()
for (const b of liesTeile('glossar-', 'begriffe')) {
  const k = schluessel(b.begriff)
  if (!k) continue
  if (!begriffe.has(k)) begriffe.set(k, { begriff: b.begriff, texte: [String(b.text || '').trim()], folien: [...(b.folien || [])], themen: [...(b.themen || [])], beleg: b.beleg, belegQuelle: b.belegQuelle })
  else {
    const v = begriffe.get(k)
    if (b.text && !v.texte.some((x) => schluessel(x) === schluessel(b.text))) v.texte.push(String(b.text).trim())
    v.folien.push(...(b.folien || []))
    v.themen.push(...(b.themen || []))
  }
}
const begriffeAus = [...begriffe.values()].map((v) => ({
  begriff: v.begriff,
  text: v.texte.join('\n\n'),
  folien: eindeutig(v.folien).sort((a, b) => a - b),
  themen: eindeutig(v.themen),
  beleg: v.beleg,
  belegQuelle: v.belegQuelle,
})).sort((a, b) => a.begriff.localeCompare(b.begriff, 'de'))

writeFileSync(join(WURZEL, 'daten', 'personen.json'), JSON.stringify({ personen: personenAus }, null, 2) + '\n')
writeFileSync(join(WURZEL, 'daten', 'glossar.json'), JSON.stringify({ begriffe: begriffeAus }, null, 2) + '\n')
console.log(`personen.json: ${personenAus.length} Personen (aus ${[...personen.values()].reduce((s, v) => s + v.eintraege.length, 0)} Einträgen)`)
console.log(`glossar.json: ${begriffeAus.length} Begriffe`)
