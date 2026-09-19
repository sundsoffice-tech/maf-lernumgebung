// Tests für das Lernmodell. Aufruf: node werkzeug/test_lernmodell.mjs
// Laufen ohne Browser: Speicher und Uhr sind Attrappen, die den echten Ablauf tragen (Zustand bleibt erhalten,
// Zeit läuft nur, wenn der Test sie vorstellt).
import assert from 'node:assert/strict'
import { erzeugeModell, FACH_ABSTAND_MIN, SCHWELLE_SITZT } from '../assets/js/lernmodell.js'
import { baueIndex } from '../assets/js/daten.js'

function aufgabe(id, extra = {}) {
  return { id, typ: 'mc', stufe: 'erinnern', schwierigkeit: 1, kern: true, konzept: 'k', folien: [30], ...extra }
}

function kurs() {
  const t1 = { id: 'm1-t1', titel: 'T1', gewicht: 2, lernkarten: [{ id: 'm1-t1-k1' }],
    aufgaben: [aufgabe('a1'), aufgabe('a2', { typ: 'zuordnung' }), aufgabe('a3', { typ: 'erklaeren', stufe: 'verstehen' }),
      aufgabe('a4', { kern: false }), aufgabe('a5', { kern: false, konzept: 'anders' })] }
  const t2 = { id: 'm1-t2', titel: 'T2', gewicht: 1, lernkarten: [{ id: 'm1-t2-k1' }],
    aufgaben: [aufgabe('b1'), aufgabe('b2'), aufgabe('b3', { kern: false })] }
  const t3 = { id: 'm2-t1', titel: 'T3', gewicht: 3, lernkarten: [{ id: 'm2-t1-k1' }],
    aufgaben: [aufgabe('c1'), aufgabe('c2', { typ: 'erklaeren' }), aufgabe('c3', { kern: false })] }
  return baueIndex({ kurs: { zeitbudgetMin: 600 }, personen: [], glossar: [], quellen: { quellen: [] },
    module: [{ id: 'm1', zeitMin: 300, themen: [t1, t2] }, { id: 'm2', zeitMin: 300, themen: [t3] }] })
}

function aufbau() {
  let uhr = 1_000_000
  const zustand = { aufgaben: {}, karten: {}, notizen: {}, zeitSek: { gesamt: 0, module: {} } }
  const speicher = { zustand, aendere(fn) { fn(zustand) } }
  let saat = 7
  const zufall = () => { saat = (saat * 16807) % 2147483647; return saat / 2147483647 }
  const daten = kurs()
  const modell = erzeugeModell(daten, speicher, { jetzt: () => uhr, zufall })
  return { daten, modell, zustand, vor: (min) => { uhr += min * 60000 }, jetzt: () => uhr }
}

const tests = []
const test = (name, fn) => tests.push({ name, fn })

test('Erstkontakt richtig und sicher springt in Fach 3, Abstand 3 Stunden', () => {
  const { modell, zustand, jetzt } = aufbau()
  assert.equal(modell.verbuche('a1', { punkte: 1, sicher: 'sicher' }), 'gewusst')
  assert.equal(zustand.aufgaben.a1.box, 3)
  assert.equal(zustand.aufgaben.a1.faellig, jetzt() + FACH_ABSTAND_MIN[3] * 60000)
})

test('Richtig, aber unsicher bleibt niedrig und steigt ohne sichere Antwort nie über Fach 3', () => {
  const { modell, zustand } = aufbau()
  modell.verbuche('a1', { punkte: 1, sicher: 'unsicher' })
  assert.equal(zustand.aufgaben.a1.box, 2)
  for (let i = 0; i < 5; i++) modell.verbuche('a1', { punkte: 1, sicher: 'unsicher' })
  assert.equal(zustand.aufgaben.a1.box, 3)
  modell.verbuche('a1', { punkte: 1, sicher: 'sicher' })
  assert.equal(zustand.aufgaben.a1.box, 4)
})

test('Falsch und sicher ist ein Irrtum und setzt auf Fach 1 zurück', () => {
  const { modell, zustand } = aufbau()
  modell.verbuche('a1', { punkte: 1, sicher: 'sicher' })
  assert.equal(modell.verbuche('a1', { punkte: 0, sicher: 'sicher' }), 'irrtum')
  assert.equal(zustand.aufgaben.a1.box, 1)
  assert.equal(zustand.aufgaben.a1.irrtum, true)
  assert.equal(modell.verbuche('a2', { punkte: 0.2, sicher: 'unsicher' }), 'falsch')
  assert.equal(zustand.aufgaben.a2.irrtum, false)
})

test('Teilweise richtig landet höchstens in Fach 2', () => {
  const { modell, zustand } = aufbau()
  modell.verbuche('a1', { punkte: 1, sicher: 'sicher' })
  modell.verbuche('a1', { punkte: 1, sicher: 'sicher' })
  assert.equal(zustand.aufgaben.a1.box, 4)
  assert.equal(modell.verbuche('a1', { punkte: 0.6, sicher: 'sicher' }), 'teilweise')
  assert.equal(zustand.aufgaben.a1.box, 2)
})

test('Themenstand: offen ohne Antworten, sitzt nach sicherem ersten Durchgang des Kerns', () => {
  const { modell, daten } = aufbau()
  const t1 = daten.thema('m1-t1')
  assert.equal(modell.themaStand(t1).status, 'offen')
  for (const id of ['a1', 'a2', 'a3']) modell.verbuche(id, { punkte: 1, sicher: 'sicher' })
  const s = modell.themaStand(t1)
  assert.equal(s.kernFertig, true)
  assert.ok(s.wert >= SCHWELLE_SITZT, `Wert ${s.wert} sollte mindestens ${SCHWELLE_SITZT} sein`)
  assert.equal(s.status, 'gut')
})

test('Themenstand: Fehler im Kern machen das Thema wackelig oder zur Lücke', () => {
  const { modell, daten } = aufbau()
  modell.verbuche('a1', { punkte: 0, sicher: 'sicher' })
  modell.verbuche('a2', { punkte: 0, sicher: 'unsicher' })
  modell.verbuche('a3', { punkte: 1, sicher: 'unsicher' })
  const s = modell.themaStand(daten.thema('m1-t1'))
  assert.equal(s.status, 'schlecht')
  assert.equal(s.irrtuemer, 1)
})

test('Ungesehene Vertiefung erbt erst, wenn der Kern vollständig bearbeitet ist', () => {
  const { modell, daten } = aufbau()
  modell.verbuche('a1', { punkte: 1, sicher: 'sicher' })
  const vorher = modell.themaStand(daten.thema('m1-t1')).wert
  modell.verbuche('a2', { punkte: 1, sicher: 'sicher' })
  modell.verbuche('a3', { punkte: 1, sicher: 'sicher' })
  const nachher = modell.themaStand(daten.thema('m1-t1')).wert
  assert.ok(nachher > vorher * 2, 'Sprung durch Erbe nach vollständigem Kern erwartet')
})

test('Fällige Aufgaben: erst nach Ablauf des Abstands, wackeligste zuerst', () => {
  const { modell, vor } = aufbau()
  modell.verbuche('a1', { punkte: 1, sicher: 'sicher' })
  modell.verbuche('a2', { punkte: 0, sicher: 'unsicher' })
  assert.equal(modell.faellige().length, 0)
  vor(5)
  assert.deepEqual(modell.faellige().map((a) => a.id), ['a2'])
  vor(180)
  assert.deepEqual(modell.faellige().map((a) => a.id), ['a2', 'a1'])
})

test('Sitzung: Falsches kommt nach wenigen Aufgaben wieder, höchstens zweimal, plus Nachschub zum selben Konzept', () => {
  const { modell, daten } = aufbau()
  const t1 = daten.thema('m1-t1')
  const sitzung = modell.erzeugeSitzung(modell.themaAufgaben(t1))
  const erste = sitzung.aktuelle
  sitzung.beantworte({ punkte: 0, sicher: 'unsicher' })
  const folge = []
  let schutz = 0
  while (sitzung.aktuelle && schutz++ < 30) {
    folge.push(sitzung.aktuelle.id)
    sitzung.beantworte({ punkte: sitzung.aktuelle.id === erste.id ? 0 : 1, sicher: 'sicher' })
  }
  assert.equal(folge.filter((id) => id === erste.id).length, 2, 'zwei Nachfragen erwartet')
  assert.ok(folge.includes('a4'), 'Nachschub a4 (gleiches Konzept, nicht Kern) erwartet')
  assert.ok(!folge.includes('a5'), 'a5 hat ein anderes Konzept und gehört nicht in den Nachschub')
})

test('Nächster Schritt: erst Themen in Kursreihenfolge, bei vielen wackeligen Aufgaben zuerst wiederholen', () => {
  const { modell, vor } = aufbau()
  assert.deepEqual(modell.naechsterSchritt().themaId, 'm1-t1')
  for (const id of ['a1', 'a2', 'a3', 'b1', 'b2']) modell.verbuche(id, { punkte: 0, sicher: 'unsicher' })
  vor(10)
  assert.equal(modell.naechsterSchritt().art, 'wiederholen')
})

test('Nächster Schritt: Thema gilt erst als bearbeitet, wenn Karten gelesen UND Kern gesehen', () => {
  const { modell } = aufbau()
  for (const id of ['a1', 'a2', 'a3']) modell.verbuche(id, { punkte: 1, sicher: 'sicher' })
  assert.equal(modell.naechsterSchritt().themaId, 'm1-t1')
  modell.karteGelesen('m1-t1', 'm1-t1-k1')
  assert.equal(modell.naechsterSchritt().themaId, 'm1-t2')
})

test('Generalprobe deckt alle Module ab und bevorzugt offene Erklär-Aufgaben', () => {
  const { modell, daten } = aufbau()
  const auswahl = modell.probeAuswahl(6)
  const module = new Set(auswahl.map((a) => daten.modulVonAufgabe(a.id).id))
  assert.deepEqual([...module].sort(), ['m1', 'm2'])
  assert.ok(auswahl.some((a) => a.typ === 'erklaeren'))
  assert.equal(new Set(auswahl.map((a) => a.id)).size, auswahl.length, 'keine Doppelten')
})

test('Lernzettel: kompakt nur, wenn das Thema sitzt und keine Stolperstelle offen ist', () => {
  const { modell, daten } = aufbau()
  const t2 = daten.thema('m1-t2')
  assert.equal(modell.lernzettelModus(t2), 'ausfuehrlich')
  modell.verbuche('b1', { punkte: 1, sicher: 'sicher' })
  modell.verbuche('b2', { punkte: 1, sicher: 'sicher' })
  assert.equal(modell.lernzettelModus(t2), 'kompakt')
  modell.verbuche('b2', { punkte: 0, sicher: 'sicher' })
  assert.equal(modell.lernzettelModus(t2), 'ausfuehrlich')
  assert.equal(modell.stolperstellen(t2).length, 1)
  assert.equal(modell.stolperstellen(t2)[0].irrtum, true)
})

let rot = 0
for (const t of tests) {
  try { t.fn(); console.log('ok    ' + t.name) } catch (e) { rot += 1; console.log('ROT   ' + t.name + '\n      ' + String(e.message).split('\n')[0]) }
}
console.log(`${tests.length - rot} von ${tests.length} grün`)
process.exit(rot ? 1 : 0)
