// Tests für die Auswahl-Aufgabentypen: mc (Referenz), mehrfach, wahrfalsch, karte.
// Aufruf: cd lernseite && node werkzeug/test_aufgaben_auswahl.mjs
// Gerendert wird gegen jsdom, Eingaben werden geklickt wie von Hand. Geprüft werden die Punktzahl
// (voll richtig, teilweise, falsch) und die Meldungen an den Rahmen (api.bereit, api.fertig).
import assert from 'node:assert/strict'
import { richteDomEin, musterAufgabe, attrappeApi, klick, kleinerTestlauf } from './dom.mjs'

richteDomEin()

const { holeRenderer } = await import('../assets/js/aufgaben/index.js')
const { zeigeAufgabe } = await import('../assets/js/aufgabenrahmen.js')

/** Eine Musteraufgabe im leeren Wirt aufbauen, so wie es der Rahmen tut. */
function baue(typ) {
  const item = musterAufgabe(typ)
  const host = document.createElement('div')
  document.body.appendChild(host)
  const api = attrappeApi()
  const steuerung = holeRenderer(typ, item).render(host, item, api) || {}
  return { item, host, api, steuerung }
}

const zeilen = (host) => [...host.querySelectorAll('.option')]
const zeileMit = (host, wert) => host.querySelector(`.option input[value="${wert}"]`).closest('.option')
const knopfMit = (host, text) => [...host.querySelectorAll('button')].find((b) => b.textContent.trim() === text)
const letzte = (liste) => liste[liste.length - 1]

const tests = []
const test = (name, fn) => tests.push([name, fn])

// ---------- Verdrahtung ----------

test('Die drei Typen hängen im Verzeichnis und melden die richtige Betriebsart', () => {
  assert.equal(holeRenderer('mehrfach').typ, 'mehrfach')
  assert.equal(holeRenderer('mehrfach').selbstbewertung, false)
  assert.equal(holeRenderer('wahrfalsch').typ, 'wahrfalsch')
  assert.equal(holeRenderer('wahrfalsch').selbstbewertung, false)
  assert.equal(holeRenderer('karte').typ, 'karte')
  assert.equal(holeRenderer('karte').selbstbewertung, true)
})

// ---------- Einfachauswahl (Referenz, prüft die gemeinsamen Optionsstile mit) ----------

test('mc: eine Option wählen macht bereit, die richtige gibt einen Punkt', () => {
  const { item, host, api, steuerung } = baue('mc')
  assert.equal(zeilen(host).length, item.optionen.length)
  assert.deepEqual(api.log.bereit, [], 'ohne Eingabe darf nichts gemeldet werden')
  klick(zeileMit(host, item.richtig).querySelector('input'))
  assert.equal(letzte(api.log.bereit), true)
  const e = steuerung.pruefen()
  assert.equal(e.punkte, 1)
  assert.equal(e.antwort, item.optionen[item.richtig])
  assert.ok(zeileMit(host, item.richtig).classList.contains('ist-richtig'))
})

test('mc: die falsche Option gibt null Punkte, die richtige wird als verpasst gezeigt', () => {
  const { item, host, steuerung } = baue('mc')
  const falsch = item.optionen.findIndex((_, i) => i !== item.richtig)
  klick(zeileMit(host, falsch).querySelector('input'))
  assert.equal(steuerung.pruefen().punkte, 0)
  assert.ok(zeileMit(host, falsch).classList.contains('ist-falsch'))
  assert.ok(zeileMit(host, item.richtig).classList.contains('ist-verpasst'))
})

// ---------- Mehrfachauswahl ----------

test('mehrfach: Hinweis, Kästchenform und bereit erst ab einem Kreuz', () => {
  const { host, api } = baue('mehrfach')
  assert.ok(host.textContent.includes('Mehrere Antworten können richtig sein.'))
  assert.ok(host.querySelector('.optionen--mehrfach'), 'eigene Klasse für die Kästchenform erwartet')
  assert.equal(host.querySelectorAll('.option input[type="checkbox"]').length, zeilen(host).length)
  assert.deepEqual(api.log.bereit, [])
  const eingabe = zeileMit(host, 0).querySelector('input')
  klick(eingabe)
  assert.equal(letzte(api.log.bereit), true)
  klick(eingabe)
  assert.equal(letzte(api.log.bereit), false, 'ohne Kreuz darf nicht abgegeben werden')
  assert.equal(zeileMit(host, 0).classList.contains('ist-gewaehlt'), false)
})

test('mehrfach: alle richtigen und nichts sonst gibt den vollen Punkt', () => {
  const { item, host, steuerung } = baue('mehrfach')
  for (const i of item.richtig) klick(zeileMit(host, i).querySelector('input'))
  const e = steuerung.pruefen()
  assert.equal(e.punkte, 1)
  assert.equal(e.antwort, item.richtig.map((i) => item.optionen[i]).join('; '))
  for (const i of item.richtig) assert.ok(zeileMit(host, i).classList.contains('ist-richtig'))
})

test('mehrfach: ein Kreuz zu viel zieht ab, ein fehlendes zählt als verpasst', () => {
  const { item, host, steuerung } = baue('mehrfach')
  const falsch = item.optionen.findIndex((_, i) => !item.richtig.includes(i))
  // zwei von drei richtigen plus eine falsche: (2 - 1) / 3
  klick(zeileMit(host, item.richtig[0]).querySelector('input'))
  klick(zeileMit(host, item.richtig[1]).querySelector('input'))
  klick(zeileMit(host, falsch).querySelector('input'))
  const e = steuerung.pruefen()
  assert.ok(Math.abs(e.punkte - (2 - 1) / item.richtig.length) < 1e-9, 'Punkte ' + e.punkte)
  assert.ok(zeileMit(host, falsch).classList.contains('ist-falsch'))
  assert.ok(zeileMit(host, item.richtig[2]).classList.contains('ist-verpasst'))
})

test('mehrfach: nur falsche Kreuze geben null, nie weniger', () => {
  const { item, host, steuerung } = baue('mehrfach')
  for (let i = 0; i < item.optionen.length; i++) {
    if (!item.richtig.includes(i)) klick(zeileMit(host, i).querySelector('input'))
  }
  assert.equal(steuerung.pruefen().punkte, 0)
})

// ---------- Wahr oder falsch ----------

test('wahrfalsch: je Aussage zwei Schalter, bereit erst wenn alle beantwortet sind', () => {
  const { item, host, api } = baue('wahrfalsch')
  const reihen = zeilen(host)
  assert.equal(reihen.length, item.aussagen.length)
  for (const r of reihen) {
    const s = [...r.querySelectorAll('.option__schalter .knopf')]
    assert.deepEqual(s.map((b) => b.textContent.trim()), ['Stimmt', 'Stimmt nicht'])
  }
  klick(knopfMit(reihen[0], 'Stimmt'))
  assert.equal(letzte(api.log.bereit), false, 'eine offene Aussage bleibt gesperrt')
  klick(knopfMit(reihen[1], 'Stimmt nicht'))
  assert.equal(letzte(api.log.bereit), false)
  klick(knopfMit(reihen[2], 'Stimmt'))
  assert.equal(letzte(api.log.bereit), true)
  assert.equal(knopfMit(reihen[0], 'Stimmt').getAttribute('aria-pressed'), 'true')
  assert.equal(knopfMit(reihen[0], 'Stimmt nicht').getAttribute('aria-pressed'), 'false')
})

test('wahrfalsch: alle Aussagen richtig eingeschätzt gibt den vollen Punkt', () => {
  const { item, host, steuerung } = baue('wahrfalsch')
  const reihen = zeilen(host)
  item.aussagen.forEach((a, i) => klick(knopfMit(reihen[i], a.wahr ? 'Stimmt' : 'Stimmt nicht')))
  const e = steuerung.pruefen()
  assert.equal(e.punkte, 1)
  assert.equal(e.antwort, `${item.aussagen.length} von ${item.aussagen.length} Aussagen richtig eingeschätzt`)
  assert.ok(reihen.every((r) => r.classList.contains('ist-richtig')))
})

test('wahrfalsch: eine Fehleinschätzung kostet anteilig, die Korrektur wird gezeigt', () => {
  const { item, host, steuerung } = baue('wahrfalsch')
  const reihen = zeilen(host)
  const unwahr = item.aussagen.findIndex((a) => !a.wahr)
  assert.ok(unwahr > -1 && item.aussagen[unwahr].korrektur, 'Musteraufgabe braucht eine unwahre Aussage mit Korrektur')
  item.aussagen.forEach((a, i) => klick(knopfMit(reihen[i], i === unwahr ? 'Stimmt' : (a.wahr ? 'Stimmt' : 'Stimmt nicht'))))
  const n = item.aussagen.length
  const e = steuerung.pruefen()
  assert.ok(Math.abs(e.punkte - (n - 1) / n) < 1e-9, 'Punkte ' + e.punkte)
  assert.ok(reihen[unwahr].classList.contains('ist-falsch'))
  const korrektur = reihen[unwahr].querySelector('.option__korrektur')
  assert.ok(korrektur, 'Korrektur unter der Aussage erwartet')
  assert.ok(korrektur.textContent.includes('Die Aussage stimmt nicht.'))
  assert.ok(korrektur.textContent.includes(item.aussagen[unwahr].korrektur.slice(0, 30)))
  assert.ok([...host.querySelectorAll('.option__schalter .knopf')].every((b) => b.disabled), 'Eingaben müssen gesperrt sein')
})

test('wahrfalsch: alles falsch eingeschätzt gibt null Punkte', () => {
  const { item, host, steuerung } = baue('wahrfalsch')
  const reihen = zeilen(host)
  item.aussagen.forEach((a, i) => klick(knopfMit(reihen[i], a.wahr ? 'Stimmt nicht' : 'Stimmt')))
  assert.equal(steuerung.pruefen().punkte, 0)
})

// ---------- Karteikarte ----------

test('karte: die Rückseite erscheint erst nach dem Umdrehen', () => {
  const { item, host } = baue('karte')
  assert.ok(host.textContent.includes('Vorderseite'))
  assert.equal(host.textContent.includes('Rückseite'), false)
  const kaesten = [...host.querySelectorAll('.aufgabe__karteikarte')]
  assert.equal(kaesten.length, 1)
  assert.ok(kaesten[0].textContent.includes(item.vorne))
  klick(knopfMit(host, 'Umdrehen'))
  assert.ok(host.textContent.includes('Rückseite'))
  assert.ok(host.textContent.includes(item.hinten.replace(/\*\*/g, '')))
  assert.equal(knopfMit(host, 'Umdrehen').hidden, true)
})

test('karte: drei Selbsteinschätzungen melden Punkte und Sicherheit', () => {
  const faelle = [
    ['Gewusst und sicher', 1, 'sicher'],
    ['Gewusst, aber unsicher', 1, 'unsicher'],
    ['Nicht gewusst', 0, 'unsicher'],
  ]
  for (const [text, punkte, sicher] of faelle) {
    const { host, api } = baue('karte')
    klick(knopfMit(host, 'Umdrehen'))
    const knoepfe = [...host.querySelectorAll('.aufgabe__abgabeknoepfe .knopf')]
    assert.deepEqual(knoepfe.map((b) => b.textContent.trim()), faelle.map((f) => f[0]))
    assert.equal(api.log.fertig, null)
    klick(knopfMit(host, text))
    assert.deepEqual(api.log.fertig, { punkte, sicher, antwort: text })
    assert.deepEqual(api.log.bereit, [], 'selbstbewertete Typen melden nie api.bereit')
  }
})

// ---------- Zusammenspiel mit dem Rahmen ----------

test('Rahmen: Abgabeknöpfe bleiben gesperrt, bis der Renderer bereit meldet, und liefern das Ergebnis', () => {
  const item = musterAufgabe('mehrfach')
  const host = document.createElement('div')
  document.body.appendChild(host)
  const app = { daten: { themaVonAufgabe: () => null, karte: () => null } }
  let ergebnis = null
  zeigeAufgabe(host, item, { app, zaehler: 'Aufgabe 1 von 3', onErgebnis: (e) => { ergebnis = e }, onWeiter: () => {} })

  const abgabe = [...host.querySelectorAll('.aufgabe__abgabeknoepfe .knopf')]
  assert.deepEqual(abgabe.map((b) => b.textContent.trim()), ['Prüfen, bin sicher', 'Prüfen, bin unsicher'])
  assert.ok(abgabe.every((b) => b.disabled), 'ohne Eingabe gesperrt')

  for (const i of item.richtig) klick(host.querySelector(`.option input[value="${i}"]`))
  assert.ok(abgabe.every((b) => !b.disabled), 'nach der Eingabe frei')

  klick(abgabe[1])
  assert.deepEqual(ergebnis && { punkte: ergebnis.punkte, sicher: ergebnis.sicher }, { punkte: 1, sicher: 'unsicher' })
  const rueck = host.querySelector('.aufgabe__rueckmeldung')
  assert.ok(rueck.querySelector('.rueckmeldung__titel'))
  assert.ok(rueck.querySelector('.rueckmeldung__erklaerung'))
  assert.ok(rueck.querySelector('.rueckmeldung__beleg blockquote'), 'Beleg aus dem Skript erwartet')
  assert.ok(rueck.textContent.includes('So steht es im Skript'))
})

kleinerTestlauf(tests)
