// Tests für das Lernmodell. Aufruf: node werkzeug/test_lernmodell.mjs
// Laufen ohne Browser: Speicher und Uhr sind Attrappen, die den echten Ablauf tragen (Zustand bleibt erhalten,
// Zeit läuft nur, wenn der Test sie vorstellt).
import assert from 'node:assert/strict'
import { erzeugeModell, FACH_ABSTAND_MIN, FACH_WERT, SCHWELLE_SITZT, RUNDE_MAX } from '../assets/js/lernmodell.js'
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

function aufbau(saatStart = 7) {
  let uhr = 1_000_000_000
  const zustand = { aufgaben: {}, karten: {}, notizen: {}, zeitSek: { gesamt: 0, module: {} }, einstellungen: { klausur: null } }
  const speicher = { zustand, aendere(fn) { fn(zustand) } }
  let saat = saatStart
  const zufall = () => { saat = (saat * 16807) % 2147483647; return saat / 2147483647 }
  const daten = kurs()
  const modell = erzeugeModell(daten, speicher, { jetzt: () => uhr, zufall })
  return { daten, modell, zustand, zufall, vor: (min) => { uhr += min * 60000 }, jetzt: () => uhr }
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

test('Der Unsicher-Deckel (Fach 3) liegt unter der Schwelle für sitzt', () => {
  assert.ok(FACH_WERT[3] < SCHWELLE_SITZT, 'Fach 3 darf allein nicht als sitzt zählen')
  assert.ok(FACH_WERT[4] >= SCHWELLE_SITZT)
  assert.equal(FACH_WERT[1], 0, 'eine falsch beantwortete Aufgabe zählt 0')
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
  const { modell, zustand, vor } = aufbau()
  modell.verbuche('a1', { punkte: 1, sicher: 'sicher' })
  vor(200)
  modell.verbuche('a1', { punkte: 1, sicher: 'sicher' })
  assert.equal(zustand.aufgaben.a1.box, 4)
  assert.equal(modell.verbuche('a1', { punkte: 0.6, sicher: 'sicher' }), 'teilweise')
  assert.equal(zustand.aufgaben.a1.box, 2)
})

test('Themenstand: ein sicherer erster Durchgang heißt noch festigen, erst die Bestätigung mit Abstand heißt sitzt', () => {
  const { modell, daten, vor } = aufbau()
  const t1 = daten.thema('m1-t1')
  assert.equal(modell.themaStand(t1).status, 'offen')
  for (const id of ['a1', 'a2', 'a3']) modell.verbuche(id, { punkte: 1, sicher: 'sicher' })
  let s = modell.themaStand(t1)
  assert.equal(s.kernFertig, true)
  assert.equal(s.status, 'mittel', 'ein einzelner Treffer je Aufgabe ist noch kein sitzt')
  vor(200)
  for (const id of ['a1', 'a2', 'a3']) modell.verbuche(id, { punkte: 1, sicher: 'sicher' })
  s = modell.themaStand(t1)
  assert.ok(s.wert >= SCHWELLE_SITZT)
  assert.equal(s.status, 'gut')
})

test('Themenstand: ohne vollständigen Kern wird ein Thema nie grün', () => {
  const { modell, daten, vor } = aufbau()
  modell.verbuche('a1', { punkte: 1, sicher: 'sicher' })
  vor(200)
  modell.verbuche('a1', { punkte: 1, sicher: 'sicher' })
  vor(800)
  modell.verbuche('a1', { punkte: 1, sicher: 'sicher' })
  const s = modell.themaStand(daten.thema('m1-t1'))
  assert.equal(s.kernFertig, false)
  assert.notEqual(s.status, 'gut')
})

test('Themenstand: Fehler im Kern machen das Thema zur Lücke', () => {
  const { modell, daten } = aufbau()
  modell.verbuche('a1', { punkte: 0, sicher: 'sicher' })
  modell.verbuche('a2', { punkte: 0, sicher: 'unsicher' })
  modell.verbuche('a3', { punkte: 1, sicher: 'unsicher' })
  const s = modell.themaStand(daten.thema('m1-t1'))
  assert.equal(s.status, 'schlecht')
  assert.equal(s.irrtuemer, 1)
})

test('Monotonie: ein Irrtum auf der letzten Kernaufgabe hebt den Themenwert nicht (Fund des Wissenschaftlers)', () => {
  const { modell, daten } = aufbau()
  const t2 = daten.thema('m1-t2')
  modell.verbuche('b1', { punkte: 1, sicher: 'sicher' })
  const vorher = modell.themaStand(t2).wert
  modell.verbuche('b2', { punkte: 0, sicher: 'sicher' })
  const nachher = modell.themaStand(t2).wert
  assert.ok(nachher <= vorher, `Wert stieg durch einen Irrtum von ${vorher} auf ${nachher}`)
})

test('Monotonie als Eigenschaft: nach keiner Antwort mit 0 Punkten steigt ein Themen-, Modul- oder Gesamtwert', () => {
  for (let lauf = 1; lauf <= 40; lauf++) {
    const { modell, daten, zufall, vor } = aufbau(lauf * 97 + 3)
    for (let schritt = 0; schritt < 60; schritt++) {
      const a = daten.alleAufgaben[Math.floor(zufall() * daten.alleAufgaben.length)]
      const th = daten.themaVonAufgabe(a.id)
      const m = daten.modulVonAufgabe(a.id)
      const w = zufall()
      const punkte = w < 0.4 ? 0 : w < 0.55 ? 0.6 : 1
      const vorher = [modell.themaStand(th).wert, modell.modulStand(m).wert, modell.gesamtStand().wert]
      modell.verbuche(a.id, { punkte, sicher: zufall() < 0.5 ? 'sicher' : 'unsicher' })
      if (punkte === 0) {
        const nachher = [modell.themaStand(th).wert, modell.modulStand(m).wert, modell.gesamtStand().wert]
        nachher.forEach((n, i) => assert.ok(n <= vorher[i] + 1e-12, `Lauf ${lauf}, Schritt ${schritt}: Wert ${i} stieg nach falscher Antwort von ${vorher[i]} auf ${n}`))
      }
      vor(zufall() * 40)
    }
  }
})

test('Fällige Aufgaben: erst nach Ablauf des Abstands (20 Min nach Fehler), wackeligste zuerst', () => {
  const { modell, vor } = aufbau()
  modell.verbuche('a1', { punkte: 1, sicher: 'sicher' })
  modell.verbuche('a2', { punkte: 0, sicher: 'unsicher' })
  vor(5)
  assert.equal(modell.faellige().length, 0, '4-Minuten-Wiedervorlage wäre massiertes Üben')
  vor(16)
  assert.deepEqual(modell.faellige().map((a) => a.id), ['a2'])
  vor(180)
  assert.deepEqual(modell.faellige().map((a) => a.id), ['a2', 'a1'])
})

test('Klausurtermin deckelt die Abstände: nichts wird erst nach der Klausur fällig', () => {
  const { modell, zustand, jetzt } = aufbau()
  zustand.einstellungen.klausur = new Date(jetzt() + 120 * 60000).toISOString()
  modell.verbuche('a1', { punkte: 1, sicher: 'sicher' })
  const abstandMin = (zustand.aufgaben.a1.faellig - jetzt()) / 60000
  assert.ok(Math.abs(abstandMin - 30) < 0.01, `erwartet 30 Min (ein Viertel von 120), ist ${abstandMin}`)
})

test('Sitzung: Falsches kommt genau einmal wieder, Nachschub erst nach dem zweiten Fehler und nur zum selben Konzept', () => {
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
  assert.equal(folge.filter((id) => id === erste.id).length, 1, 'genau eine Nachfrage erwartet')
  assert.ok(folge.includes('a4'), 'Nachschub a4 (gleiches Konzept, nicht Kern) nach dem zweiten Fehler erwartet')
  assert.ok(!folge.includes('a5'), 'a5 hat ein anderes Konzept und gehört nicht in den Nachschub')
  assert.ok(folge.indexOf('a4') > folge.indexOf(erste.id), 'Nachschub erst NACH der gescheiterten Nachfrage')
})

test('Sitzung: harte Obergrenze von 1,4 mal der Ausgangszahl, auch wenn alles falsch ist', () => {
  const { modell, daten } = aufbau()
  const alle = daten.alleAufgaben.filter((a) => a.kern)
  const sitzung = modell.erzeugeSitzung(alle)
  let antworten = 0
  while (sitzung.aktuelle && antworten < 100) { sitzung.beantworte({ punkte: 0, sicher: 'unsicher' }); antworten += 1 }
  assert.equal(antworten, Math.ceil(alle.length * 1.4))
  assert.equal(sitzung.rest, 0)
})

test('Sitzung: eine übersprungene Aufgabe wird weder verbucht noch gezählt (Fund des Programmierers)', () => {
  const { modell, daten, zustand } = aufbau()
  const sitzung = modell.erzeugeSitzung(modell.themaAufgaben(daten.thema('m1-t1')))
  const erste = sitzung.aktuelle
  assert.equal(sitzung.beantworte({ punkte: 0, sicher: 'unsicher', nichtWerten: true }), 'uebersprungen')
  assert.equal(zustand.aufgaben[erste.id], undefined, 'nicht verbucht')
  assert.equal(sitzung.ergebnisse.length, 0, 'nicht in den Ergebnissen')
  assert.notEqual(sitzung.aktuelle.id, erste.id, 'die nächste Aufgabe liegt an')
  assert.equal(modell.themaStand(daten.thema('m1-t1')).kernFertig, false)
})

test('Nächster Schritt: neuer Stoff hat Vorrang, wenige wackelige Aufgaben blockieren ihn nicht', () => {
  const { modell, vor } = aufbau()
  assert.equal(modell.naechsterSchritt().themaId, 'm1-t1')
  for (const id of ['a1', 'a2', 'a3', 'b1', 'b2']) modell.verbuche(id, { punkte: 0, sicher: 'unsicher' })
  vor(30)
  const s = modell.naechsterSchritt()
  assert.equal(s.art, 'thema', 'fünf fällige Aufgaben dürfen den neuen Stoff nicht verdrängen')
})

test('Nächster Schritt: bei viel Wackeligem EINE gedeckelte Runde, danach zurück zu neuem Stoff', () => {
  const { modell, daten, vor } = aufbau()
  const zehn = daten.alleAufgaben.slice(0, 10)
  for (const a of zehn) modell.verbuche(a.id, { punkte: 0, sicher: 'unsicher' })
  vor(30)
  const s = modell.naechsterSchritt()
  assert.equal(s.art, 'wiederholen')
  assert.ok(s.anzahl <= RUNDE_MAX)
  assert.equal(s.faelligGesamt, 10)
  assert.ok(modell.wiederholungsRunde().length <= RUNDE_MAX)
  // Eine Wiederholung später ist die letzte Tätigkeit eine Wiederholung: jetzt muss neuer Stoff kommen
  vor(1)
  modell.verbuche(zehn[0].id, { punkte: 0, sicher: 'unsicher' })
  vor(30)
  assert.equal(modell.naechsterSchritt().art, 'thema')
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

test('Restzeit: Spanne von "alles auf Anhieb" bis "Schleife ausgeschöpft", Schätzwert liegt dazwischen', () => {
  const { modell } = aufbau()
  const spanne = modell.restzeitSpanne()
  const wert = modell.restzeitMin()
  assert.ok(spanne.von > 0 && spanne.bis > spanne.von)
  assert.ok(wert >= spanne.von && wert <= spanne.bis + 1e-9, `${wert} liegt nicht in ${spanne.von} bis ${spanne.bis}`)
})

test('Lernzettel: kompakt nur, wenn der Kern bearbeitet ist und keine Stolperstelle offen ist', () => {
  const { modell, daten } = aufbau()
  const t2 = daten.thema('m1-t2')
  assert.equal(modell.lernzettelModus(t2), 'ausfuehrlich')
  modell.verbuche('b1', { punkte: 1, sicher: 'sicher' })
  assert.equal(modell.lernzettelModus(t2), 'ausfuehrlich', 'Kern noch nicht vollständig')
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
