// Legt regelbasiert fest, welche Aufgaben zum ERSTEN Durchgang eines Themas gehören (kern: true).
// Anlass (gemessen 20.09.2026): Bei 62 % Kernanteil braucht der erste Durchgang allein 9,6 Stunden, das
// Zeitbudget von 10 Stunden ließe keine Wiederholung zu. Es wird KEIN Stoff gestrichen: Alle Aufgaben bleiben
// im Pool und kommen bei Fehlern (Nachschub zum selben Konzept), im Training und in der Generalprobe.
//
// Regel je Thema, nach Gewicht:
//   Gewicht 3 (auch "Lernstoff laut Skript"): 4 Kernaufgaben = 1 Erklären + 1 Abgrenzen/Transfer + 2 Abruf
//   Gewicht 2:                                3 Kernaufgaben = 1 Erklären + 1 Abgrenzen/Transfer + 1 Abruf
//   Gewicht 1:                                2 Kernaufgaben = 1 Abruf + 1 Verstehen (ohne offene Erklärung)
// Abrufaufgaben werden so gewählt, dass sie verschiedene Konzepte abdecken; Karteikarten sind nie Kern.
// Aufruf: node werkzeug/setze_kern.mjs [--trocken]
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const DATEN = join(dirname(fileURLToPath(import.meta.url)), '..', 'daten')
const TROCKEN = process.argv.includes('--trocken')

const istOffen = (a) => a.typ === 'erklaeren' || (a.typ === 'fall' && a.modus === 'offen')
const istAbgrenzung = (a) => !istOffen(a) && (['abgrenzen', 'transfer', 'anwenden'].includes(a.stufe) || ['kategorien'].includes(a.typ))
const istAbruf = (a) => !istOffen(a) && a.typ !== 'karte'
// Offene Erklärung: die verständnisnahe zuerst (Klausurform), nicht die schwerste Transferaufgabe
const rangOffen = (a) => (a.typ === 'erklaeren' ? 0 : 1) * 10 + ({ verstehen: 0, erinnern: 1, anwenden: 2, abgrenzen: 3, transfer: 4 }[a.stufe] ?? 5)
const rangAbgrenzung = (a) => ({ kategorien: 0, wahrfalsch: 1, fall: 2, zuordnung: 3, mc: 4, mehrfach: 5 }[a.typ] ?? 6) + (a.schwierigkeit || 1) * 0.1
const rangAbruf = (a) => ({ zuordnung: 0, luecke: 1, mc: 2, sortieren: 3, beschriften: 4, mehrfach: 5, wahrfalsch: 6, kategorien: 7, fall: 8 }[a.typ] ?? 9)
  + ({ erinnern: 0, verstehen: 0.3, anwenden: 0.6 }[a.stufe] ?? 0.9)

function waehle(thema) {
  const alle = thema.aufgaben || []
  const g = thema.gewicht || 2
  const plan = g >= 3 ? { offen: 1, abgrenzung: 1, abruf: 2 } : g === 2 ? { offen: 1, abgrenzung: 1, abruf: 1 } : { offen: 0, abgrenzung: 1, abruf: 1 }
  const gewaehlt = []
  const konzepte = new Set()
  const nimm = (kandidaten, n, rang) => {
    const sortiert = kandidaten.filter((a) => !gewaehlt.includes(a)).sort((x, y) => rang(x) - rang(y))
    // Erst Aufgaben zu noch nicht abgedeckten Konzepten, dann der Rest
    const frisch = sortiert.filter((a) => !konzepte.has(a.konzept))
    for (const a of [...frisch, ...sortiert]) {
      if (n <= 0) break
      if (gewaehlt.includes(a)) continue
      gewaehlt.push(a); konzepte.add(a.konzept); n -= 1
    }
    return n
  }
  let rest = nimm(alle.filter(istOffen), plan.offen, rangOffen)
  rest += nimm(alle.filter(istAbgrenzung), plan.abgrenzung, rangAbgrenzung)
  // Was in einer Gruppe fehlte, füllt der Abruf auf, damit jedes Thema seine Zahl erreicht
  nimm(alle.filter(istAbruf), plan.abruf + rest, rangAbruf)
  if (!gewaehlt.length && alle.length) gewaehlt.push(alle[0])
  return gewaehlt
}

let vorher = 0, nachher = 0, gesamt = 0
for (const datei of readdirSync(DATEN).filter((d) => /^m\d[ab]?\.json$/.test(d)).sort()) {
  const pfad = join(DATEN, datei)
  const m = JSON.parse(readFileSync(pfad, 'utf8'))
  for (const th of m.themen || []) {
    const kern = new Set(waehle(th).map((a) => a.id))
    for (const a of th.aufgaben || []) {
      gesamt += 1
      if (a.kern) vorher += 1
      a.kern = kern.has(a.id)
      if (a.kern) nachher += 1
    }
  }
  if (!TROCKEN) writeFileSync(pfad, JSON.stringify(m, null, 2) + '\n')
}
console.log(`${TROCKEN ? 'TROCKENLAUF: ' : ''}Kernaufgaben vorher ${vorher}, nachher ${nachher} von ${gesamt} (${Math.round(100 * nachher / Math.max(1, gesamt))} %)`)
