// Rechnet an den echten Kursdaten nach, ob der erste Durchgang ins Zeitbudget passt.
// Last: alle Lernkarten (je 70 s) plus alle Kernaufgaben (Sekunden je Typ wie im Lernmodell).
// Aufruf: node werkzeug/zeitrechnung.mjs
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const DATEN = join(dirname(fileURLToPath(import.meta.url)), '..', 'daten')
const SEK = { mc: 35, mehrfach: 50, wahrfalsch: 60, zuordnung: 70, sortieren: 60, kategorien: 70, luecke: 60, karte: 25, erklaeren: 150, fall: 90, beschriften: 80 }
const KARTE_SEK = 70

const dateien = readdirSync(DATEN).filter((d) => /^m\d[ab]?\.json$/.test(d)).sort()
let gKarten = 0, gKern = 0, gAlle = 0, gSekKern = 0, gSekAlle = 0
const typen = {}
console.log('Teil   Themen Karten Aufg. Kern  Kernanteil  Min(Karten+Kern)  Min(alles)')
for (const d of dateien) {
  const m = JSON.parse(readFileSync(join(DATEN, d), 'utf8'))
  let karten = 0, kern = 0, alle = 0, sekKern = 0, sekAlle = 0
  for (const th of m.themen || []) {
    karten += (th.lernkarten || []).length
    for (const a of th.aufgaben || []) {
      const s = SEK[a.typ === 'fall' ? (a.modus === 'offen' ? 'erklaeren' : 'fall') : a.typ] || 60
      alle += 1; sekAlle += s
      typen[a.typ] = (typen[a.typ] || 0) + 1
      if (a.kern) { kern += 1; sekKern += s }
    }
  }
  const minKern = (karten * KARTE_SEK + sekKern) / 60
  const minAlle = (karten * KARTE_SEK + sekAlle) / 60
  console.log(`${d.replace('.json', '').padEnd(6)} ${String((m.themen || []).length).padStart(6)} ${String(karten).padStart(6)} ${String(alle).padStart(5)} ${String(kern).padStart(4)}  ${(alle ? Math.round(100 * kern / alle) : 0 + '').toString().padStart(8)}%  ${minKern.toFixed(0).padStart(16)}  ${minAlle.toFixed(0).padStart(10)}`)
  gKarten += karten; gKern += kern; gAlle += alle; gSekKern += sekKern; gSekAlle += sekAlle
}
const erster = (gKarten * KARTE_SEK + gSekKern) / 60
console.log(`\nGesamt: ${gKarten} Lernkarten, ${gAlle} Aufgaben, davon ${gKern} Kern (${Math.round(100 * gKern / Math.max(1, gAlle))} %)`)
console.log(`Erster Durchgang (Karten + Kern): ${erster.toFixed(0)} Min = ${(erster / 60).toFixed(1)} Std`)
console.log(`Alles einmal: ${((gKarten * KARTE_SEK + gSekAlle) / 60 / 60).toFixed(1)} Std`)
console.log(`Budget 600 Min, davon 40 Min Generalprobe: für Wiederholung bleiben ${(600 - 40 - erster).toFixed(0)} Min`)
console.log('Typen:', Object.entries(typen).sort((a, b) => b[1] - a[1]).map(([t, n]) => `${t} ${n}`).join(', '))
