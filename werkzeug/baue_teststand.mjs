// Erzeugt einen realistischen Lernstand (mittendrin im Lernen) für Screenshots und Prüfrollen: ein Teil der
// Themen bearbeitet, mit sicheren, unsicheren, falschen Antworten und Irrtümern, einige Wiederholungen fällig.
// Nutzt das echte Lernmodell, damit der Stand genau die Form hat, die die App selbst schreibt.
// Aufruf: node werkzeug/baue_teststand.mjs [ziel.json] [anteil 0..1]
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { erzeugeModell } from '../assets/js/lernmodell.js'
import { baueIndex } from '../assets/js/daten.js'

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), '..')
const lies = (d) => JSON.parse(readFileSync(join(WURZEL, 'daten', d), 'utf8'))
const ziel = process.argv[2] || join(WURZEL, '..', 'arbeit', 'teststand.json')
const anteil = Number(process.argv[3] || 0.45)

const index = lies('module.json')
const module = index.module.map((k) => ({ ...k, themen: (k.dateien || [k.datei]).flatMap((d) => lies(d).themen || []) }))
const daten = baueIndex({ kurs: index.kurs, module, personen: [], glossar: [], quellen: { quellen: [] } })

let uhr = Date.now() - 5 * 3600 * 1000
const zustand = {
  version: 1, erstellt: uhr, geaendert: uhr, aufgaben: {}, karten: {}, notizen: {},
  zeitSek: { gesamt: 0, module: {} }, proben: [], einstellungen: { thema: 'auto', klausur: null }, letzteStelle: null,
}
const speicher = { zustand, aendere(fn) { fn(zustand) } }
let saat = 11
const zufall = () => { saat = (saat * 16807) % 2147483647; return saat / 2147483647 }
const modell = erzeugeModell(daten, speicher, { jetzt: () => uhr, zufall })

const themen = daten.alleThemen.slice(0, Math.max(3, Math.round(daten.alleThemen.length * anteil)))
themen.forEach((th, nr) => {
  const m = daten.modulVonThema(th.id)
  for (const k of th.lernkarten || []) { modell.karteGelesen(th.id, k.id); uhr += 70000; zustand.zeitSek.gesamt += 70; zustand.zeitSek.module[m.id] = (zustand.zeitSek.module[m.id] || 0) + 70 }
  // Jedes dritte Thema läuft schlecht, damit Lücken, Irrtümer und Stolperstellen sichtbar werden
  const schwach = nr % 3 === 1
  for (const a of modell.themaAufgaben(th)) {
    const w = zufall()
    const ergebnis = schwach
      ? (w < 0.35 ? { punkte: 0, sicher: 'sicher' } : w < 0.6 ? { punkte: 0.5, sicher: 'unsicher' } : w < 0.8 ? { punkte: 1, sicher: 'unsicher' } : { punkte: 1, sicher: 'sicher' })
      : (w < 0.08 ? { punkte: 0, sicher: 'unsicher' } : w < 0.25 ? { punkte: 1, sicher: 'unsicher' } : { punkte: 1, sicher: 'sicher' })
    modell.verbuche(a.id, ergebnis)
    uhr += 60000; zustand.zeitSek.gesamt += 60; zustand.zeitSek.module[m.id] = (zustand.zeitSek.module[m.id] || 0) + 60
  }
})
zustand.geaendert = uhr
writeFileSync(ziel, JSON.stringify({ art: 'maf-lernstand', ...zustand }, null, 2))
const g = modell.gesamtStand()
console.log(`Teststand: ${themen.length} von ${daten.alleThemen.length} Themen, ${Object.keys(zustand.aufgaben).length} Aufgaben beantwortet, ${Math.round(zustand.zeitSek.gesamt / 60)} Min, ${modell.faellige().length} fällig, Gesamtstand ${Math.round(g.wert * 100)} %`)
console.log('geschrieben: ' + ziel)
