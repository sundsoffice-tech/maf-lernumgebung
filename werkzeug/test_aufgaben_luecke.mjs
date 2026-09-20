// Tests für Lückentext (luecke.js) und Abbildung beschriften (beschriften.js).
// Aufruf: cd lernseite && node werkzeug/test_aufgaben_luecke.mjs
// Das Testdiagramm steht nur hier, nicht im Katalog des Kurses; es wird über diagrammZugriff eingehängt.
import assert from 'node:assert/strict'
import { richteDomEin, attrappeApi, klick, kleinerTestlauf } from './dom.mjs'
import luecke, { teileLuecken, normalisiere, istRichtig } from '../assets/js/aufgaben/luecke.js'
import beschriften, { diagrammZugriff } from '../assets/js/aufgaben/beschriften.js'

const fenster = richteDomEin()
const SVG_NS = 'http://www.w3.org/2000/svg'

function baue(renderer, item) {
  const host = document.createElement('div')
  const api = attrappeApi()
  const steuerung = renderer.render(host, item, api) || {}
  return { host, api, steuerung }
}

function tippe(feld, wert) {
  feld.value = wert
  feld.dispatchEvent(new fenster.Event('input', { bubbles: true }))
}

function waehle(auswahl, wert) {
  auswahl.value = wert
  auswahl.dispatchEvent(new fenster.Event('change', { bubbles: true }))
}

const wort = (host, text) => [...host.querySelectorAll('.bankwort')].find((k) => k.textContent === text)
const letztesBereit = (api) => api.log.bereit[api.log.bereit.length - 1]

const tests = []
const test = (name, fn) => tests.push([name, fn])

// --- Parser -------------------------------------------------------------------------------------

test('Parser trennt Text und Lücken und liest Alternativen nach dem Strich', () => {
  const teile = teileLuecken('zufriedenstellend gestaltete {_Hygienefaktoren|Hygiene-Faktoren_} + {_Motivatoren_} = fertig')
  assert.deepEqual(teile.map((t) => t.art), ['text', 'luecke', 'text', 'luecke', 'text'])
  assert.equal(teile[0].text, 'zufriedenstellend gestaltete ')
  assert.deepEqual(teile[1].loesungen, ['Hygienefaktoren', 'Hygiene-Faktoren'])
  assert.deepEqual(teile[3].loesungen, ['Motivatoren'])
  assert.equal(teile[4].text, ' = fertig')
})

test('Parser lässt den Personenverweis {{…}} in Ruhe', () => {
  const teile = teileLuecken('{{Frederick Herzberg}} nennt {_Motivatoren_}')
  assert.equal(teile.length, 2)
  assert.equal(teile[0].text, '{{Frederick Herzberg}} nennt ')
  assert.equal(teile[1].art, 'luecke')
})

test('Parser: leere Lücke {__} bleibt wörtlicher Text', () => {
  const teile = teileLuecken('davor {__} danach')
  assert.equal(teile.length, 1)
  assert.equal(teile[0].art, 'text')
})

test('Auszeichnung in der Lösung zählt nicht mit', () => {
  assert.deepEqual(teileLuecken('x {_**Motivatoren**_}')[1].loesungen, ['Motivatoren'])
})

test('Daten kommen nie als HTML in die Seite', () => {
  const { host } = baue(luecke, { id: 't-html', text: '<b>fett</b> {_A_}' })
  assert.equal(host.querySelector('b'), null)
  assert.ok(host.textContent.includes('<b>fett</b>'))
})

// --- Tolerante Prüfung --------------------------------------------------------------------------

test('Vergleichsform: Groß/Klein, Leerraum, Bindestrich, ß, Umlaute', () => {
  assert.equal(normalisiere('  Hygiene-Faktoren '), 'hygiene faktoren')
  assert.equal(normalisiere('Maßnahme'), 'massnahme')
  assert.equal(normalisiere('Führung'), 'fuehrung')
  assert.equal(normalisiere('Fuehrung'), 'fuehrung')
})

test('Tolerante Prüfung nimmt an, was gleich gemeint ist, und weist Falsches ab', () => {
  assert.ok(istRichtig('hygienefaktoren', ['Hygienefaktoren']))
  assert.ok(istRichtig('  Hygiene Faktoren ', ['Hygiene-Faktoren']))
  assert.ok(istRichtig('Massnahme', ['Maßnahme']))
  assert.ok(istRichtig('fuehrung', ['Führung']))
  assert.ok(istRichtig('Hygiene-Faktoren', ['Hygienefaktoren', 'Hygiene-Faktoren']))
  assert.ok(!istRichtig('Hygiene', ['Hygienefaktoren']))
  assert.ok(!istRichtig('', ['Hygienefaktoren']))
  assert.ok(!istRichtig('Motivatoren', ['Hygienefaktoren']))
})

// --- Tippfelder ---------------------------------------------------------------------------------

test('Tippfelder: bereit erst, wenn alle Lücken gefüllt sind', () => {
  const { host, api } = baue(luecke, { id: 't-tipp', text: '{_Alpha_} und {_Beta_}' })
  const felder = host.querySelectorAll('input.luecke--feld')
  assert.equal(felder.length, 2)
  assert.equal(letztesBereit(api), false)
  tippe(felder[0], 'Alpha')
  assert.equal(letztesBereit(api), false)
  tippe(felder[1], 'irgendwas')
  assert.equal(letztesBereit(api), true)
  tippe(felder[1], '   ')
  assert.equal(letztesBereit(api), false)
})

test('Tippfelder: Anteil richtiger Lücken, richtige Lösung wird nachgereicht, Eingabe gesperrt', () => {
  const { host, steuerung } = baue(luecke, { id: 't-tipp2', text: '{_Alpha_} und {_Beta_}' })
  const felder = host.querySelectorAll('input.luecke--feld')
  tippe(felder[0], ' alpha ')
  tippe(felder[1], 'Gamma')
  const ergebnis = steuerung.pruefen()
  assert.equal(ergebnis.punkte, 0.5)
  assert.equal(ergebnis.antwort, 'alpha / Gamma')
  assert.ok(felder[0].classList.contains('ist-richtig'))
  assert.ok(felder[1].classList.contains('ist-falsch'))
  assert.ok(felder[0].readOnly && felder[1].readOnly)
  const loesungen = [...host.querySelectorAll('.luecke__loesung')].map((e) => e.textContent)
  assert.deepEqual(loesungen, ['Beta'])
})

test('Tippfelder schalten die iOS-Autokorrektur ab', () => {
  // spellcheck allein genügt auf iOS nicht: ohne autocorrect ersetzt Safari getippte Fachwörter
  const { host } = baue(luecke, { id: 't-ios', text: '{_Hygienefaktoren_} und {_Motivatoren_}' })
  const felder = [...host.querySelectorAll('input.luecke--feld')]
  assert.equal(felder.length, 2)
  for (const f of felder) {
    assert.equal(f.getAttribute('autocorrect'), 'off')
    assert.equal(f.getAttribute('autocapitalize'), 'off')
    assert.equal(f.getAttribute('spellcheck'), 'false')
    assert.equal(f.getAttribute('inputmode'), 'text')
  }
  assert.equal(felder[0].getAttribute('enterkeyhint'), 'next')
  assert.equal(felder[1].getAttribute('enterkeyhint'), 'done', 'die letzte Lücke schließt ab')
})

test('Ein Text ohne Lücke wird übersprungen, nicht als gekonnt verbucht', () => {
  const { host, steuerung } = baue(luecke, { id: 't-leer', text: 'Hier fehlt jede Markierung.' })
  assert.ok(host.textContent.includes('nicht gewertet'))
  const ergebnis = steuerung.pruefen()
  assert.equal(ergebnis.nichtWerten, true)
  assert.equal(ergebnis.punkte, undefined, 'keine Punkte, sonst gälte die Aufgabe als gemeistert')
})

test('Tippfelder: alles richtig gibt einen vollen Punkt', () => {
  const { host, steuerung } = baue(luecke, { id: 't-tipp3', text: '{_Alpha_} und {_Beta_}' })
  const felder = host.querySelectorAll('input.luecke--feld')
  tippe(felder[0], 'Alpha')
  tippe(felder[1], 'BETA')
  assert.equal(steuerung.pruefen().punkte, 1)
  assert.equal(host.querySelectorAll('.luecke__loesung').length, 0)
})

// --- Wortbank -----------------------------------------------------------------------------------

const bankAufgabe = (id) => ({ id, text: '{_Alpha_} und {_Beta_}', bank: true, zusatzBank: ['Gamma'] })

test('Wortbank: Lösungen und Zusatzwörter stehen in der Bank', () => {
  const { host } = baue(luecke, bankAufgabe('t-bank1'))
  const texte = [...host.querySelectorAll('.bankwort')].map((k) => k.textContent).sort()
  assert.deepEqual(texte, ['Alpha', 'Beta', 'Gamma'])
  assert.equal(host.querySelectorAll('input.luecke--feld').length, 0)
})

test('Wortbank: erst Lücke, dann Wort; und umgekehrt; gesetztes Wort geht zurück', () => {
  const { host, api } = baue(luecke, bankAufgabe('t-bank2'))
  const luecken = host.querySelectorAll('button.luecke--wahl')
  assert.equal(luecken.length, 2)
  assert.equal(letztesBereit(api), false)

  // Lücke antippen, dann Wort
  klick(luecken[0])
  assert.ok(luecken[0].classList.contains('ist-gewaehlt'))
  klick(wort(host, 'Alpha'))
  assert.ok(luecken[0].textContent.includes('Alpha'))
  assert.ok(wort(host, 'Alpha').disabled)
  assert.ok(!luecken[0].classList.contains('ist-gewaehlt'))
  assert.equal(letztesBereit(api), false)

  // umgekehrt: erst Wort, dann Lücke
  klick(wort(host, 'Gamma'))
  assert.ok(wort(host, 'Gamma').classList.contains('ist-gewaehlt'))
  klick(luecken[1])
  assert.ok(luecken[1].textContent.includes('Gamma'))
  assert.equal(letztesBereit(api), true)

  // gesetztes Wort antippen nimmt es zurück
  klick(luecken[1])
  assert.ok(!luecken[1].textContent.includes('Gamma'))
  assert.ok(!wort(host, 'Gamma').disabled)
  assert.equal(letztesBereit(api), false)
})

test('Wortbank: ein zweites Wort in dieselbe Lücke gibt das erste frei', () => {
  const { host } = baue(luecke, bankAufgabe('t-bank3'))
  const luecken = host.querySelectorAll('button.luecke--wahl')
  klick(luecken[0]); klick(wort(host, 'Alpha'))
  klick(wort(host, 'Beta')); klick(luecken[0])
  assert.ok(luecken[0].textContent.includes('Beta'))
  assert.ok(!wort(host, 'Alpha').disabled)
  assert.ok(wort(host, 'Beta').disabled)
})

test('Wortbank: Bewertung ist der Anteil richtiger Lücken', () => {
  const { host, steuerung } = baue(luecke, bankAufgabe('t-bank4'))
  const luecken = host.querySelectorAll('button.luecke--wahl')
  klick(luecken[0]); klick(wort(host, 'Alpha'))
  klick(luecken[1]); klick(wort(host, 'Gamma'))
  const ergebnis = steuerung.pruefen()
  assert.equal(ergebnis.punkte, 0.5)
  assert.equal(ergebnis.antwort, 'Alpha / Gamma')
  assert.ok(luecken[0].classList.contains('ist-richtig'))
  assert.ok(luecken[1].classList.contains('ist-falsch'))
  assert.deepEqual([...host.querySelectorAll('.luecke__loesung')].map((e) => e.textContent), ['Beta'])
  assert.ok([...host.querySelectorAll('.bankwort')].every((k) => k.disabled))
})

test('Wortbank: nach dem Prüfen ändert kein Tippen mehr etwas', () => {
  const { host, steuerung } = baue(luecke, bankAufgabe('t-bank5'))
  const luecken = host.querySelectorAll('button.luecke--wahl')
  klick(luecken[0]); klick(wort(host, 'Alpha'))
  klick(luecken[1]); klick(wort(host, 'Beta'))
  assert.equal(steuerung.pruefen().punkte, 1)
  klick(luecken[0])
  assert.ok(luecken[0].textContent.includes('Alpha'))
})

// --- Abbildung beschriften ----------------------------------------------------------------------

const echterZugriff = { ...diagrammZugriff }

test('Fehlt die Abbildung, gibt es einen ruhigen Hinweis und einen Knopf zum Überspringen', () => {
  Object.assign(diagrammZugriff, echterZugriff) // echter Katalog, eine Kennung, die es dort nicht gibt
  const { host, api } = baue(beschriften, { id: 't-fehlt', diagramm: 'gibt-es-nicht' })
  assert.ok(host.classList.contains('beschriften-nur-hinweis'))
  assert.equal(host.querySelectorAll('select').length, 0)
  const knopf = host.querySelector('button')
  assert.equal(knopf.textContent, 'Überspringen')
  klick(knopf)
  // nichtWerten statt eines vollen Punktes: eine Aufgabe ohne Abbildung darf nicht als gekonnt gelten
  assert.deepEqual(api.log.fertig, { nichtWerten: true })
})

// Testdiagramm und ein Nachbau des Markenteils aus diagramme/index.js: jede verdeckte Beschriftung wird
// zu einem <g class="d-marke" data-marke="N">. Ohne diese Vorbedingung könnte der Test das Einfärben
// der Marken nicht prüfen.
let letzteVerdeckung = null

function testDiagramm(anzahl = 3, gruppen = ['g1', 'g1', 'g2']) {
  const labels = []
  for (let i = 0; i < anzahl; i++) {
    labels.push({ id: 'l' + (i + 1), text: 'Text ' + (i + 1), abfragbar: true, gruppe: gruppen[i] || 'g1' })
  }
  labels.push({ id: 'fest', text: 'Überschrift', abfragbar: false, gruppe: 'g1' })
  const svg = labels.map((l, i) => `<text data-label="${l.id}" x="10" y="${20 + i * 20}">${l.text}</text>`).join('')
  return { id: 'test-diagramm', titel: 'Testdiagramm', viewBox: '0 0 200 300', svg, labels }
}

function haengeEin(diagramm) {
  diagrammZugriff.holeDiagramm = (id) => (id === diagramm.id ? diagramm : null)
  diagrammZugriff.abfragbareLabels = (id, gruppe) => (id === diagramm.id
    ? diagramm.labels.filter((l) => l.abfragbar && (!gruppe || l.gruppe === gruppe)) : [])
  diagrammZugriff.renderDiagramm = (id, opts = {}) => {
    letzteVerdeckung = opts.verdeckt
    const huelle = document.createElement('div')
    huelle.className = 'diagrammhuelle'
    const svg = document.createElementNS(SVG_NS, 'svg')
    svg.innerHTML = diagramm.svg
    for (const text of svg.querySelectorAll('text[data-label]')) {
      const nummer = opts.verdeckt && opts.verdeckt.get(text.getAttribute('data-label'))
      if (nummer == null) continue
      const marke = document.createElementNS(SVG_NS, 'g')
      marke.setAttribute('class', 'd-marke')
      marke.setAttribute('data-marke', String(nummer))
      text.replaceWith(marke)
    }
    huelle.appendChild(svg)
    return huelle
  }
}

const richtigFuer = (diagramm, nummer) => {
  for (const [id, n] of letzteVerdeckung) if (n === nummer) return diagramm.labels.find((l) => l.id === id).text
  return null
}

test('Beschriften: nur abfragbare Beschriftungen werden zu Marken, die Gruppe grenzt ein', () => {
  const d = testDiagramm()
  haengeEin(d)
  const { host, api } = baue(beschriften, { id: 't-b1', diagramm: 'test-diagramm', gruppe: 'g1' })
  assert.equal(host.querySelectorAll('[data-marke]').length, 2)
  assert.equal(host.querySelectorAll('select').length, 2)
  const bank = [...host.querySelectorAll('select')[0].options].map((o) => o.value).filter(Boolean).sort()
  assert.deepEqual(bank, ['Text 1', 'Text 2'])
  assert.equal(letztesBereit(api), false)
})

test('Beschriften: höchstens acht Nummern, auch wenn das Diagramm mehr hergibt', () => {
  const d = testDiagramm(11, [])
  haengeEin(d)
  const { host } = baue(beschriften, { id: 't-b2', diagramm: 'test-diagramm' })
  assert.equal(host.querySelectorAll('select').length, 8)
  assert.equal(host.querySelectorAll('[data-marke]').length, 8)
})

test('Beschriften: bereit erst, wenn jede Nummer gewählt ist', () => {
  const d = testDiagramm()
  haengeEin(d)
  const { host, api } = baue(beschriften, { id: 't-b3', diagramm: 'test-diagramm', gruppe: 'g1' })
  const auswahlen = host.querySelectorAll('select')
  waehle(auswahlen[0], richtigFuer(d, 1))
  assert.equal(letztesBereit(api), false)
  waehle(auswahlen[1], richtigFuer(d, 2))
  assert.equal(letztesBereit(api), true)
})

test('Beschriften: Anteil richtig, Lösung je Nummer, Marken werden gekennzeichnet', () => {
  const d = testDiagramm()
  haengeEin(d)
  const { host, steuerung } = baue(beschriften, { id: 't-b4', diagramm: 'test-diagramm', gruppe: 'g1' })
  const auswahlen = host.querySelectorAll('select')
  waehle(auswahlen[0], richtigFuer(d, 1))
  waehle(auswahlen[1], richtigFuer(d, 1)) // absichtlich derselbe Text: für Nummer 2 falsch
  const ergebnis = steuerung.pruefen()
  assert.equal(ergebnis.punkte, 0.5)
  assert.ok(ergebnis.antwort.startsWith('1: '))
  const zeilen = host.querySelectorAll('.beschriftung')
  assert.ok(zeilen[0].classList.contains('ist-richtig'))
  assert.ok(zeilen[1].classList.contains('ist-falsch'))
  assert.deepEqual([...host.querySelectorAll('.beschriftung__loesung')].map((e) => e.textContent), [richtigFuer(d, 2)])
  assert.ok(host.querySelector('[data-marke="1"]').classList.contains('ist-richtig'))
  assert.ok(host.querySelector('[data-marke="2"]').classList.contains('ist-falsch'))
  assert.ok([...auswahlen].every((a) => a.disabled))
})

test('Beschriften: alles richtig gibt einen vollen Punkt', () => {
  const d = testDiagramm()
  haengeEin(d)
  const { host, steuerung } = baue(beschriften, { id: 't-b5', diagramm: 'test-diagramm', gruppe: 'g1' })
  const auswahlen = host.querySelectorAll('select')
  waehle(auswahlen[0], richtigFuer(d, 1))
  waehle(auswahlen[1], richtigFuer(d, 2))
  assert.equal(steuerung.pruefen().punkte, 1)
  assert.equal(host.querySelectorAll('.beschriftung__loesung').length, 0)
})

test('Beschriften: ein Diagramm ganz ohne abfragbare Beschriftungen wird übersprungen', () => {
  const d = testDiagramm(1)
  d.labels.forEach((l) => { l.abfragbar = false })
  haengeEin(d)
  const { host, api } = baue(beschriften, { id: 't-b6', diagramm: 'test-diagramm' })
  assert.equal(host.querySelectorAll('select').length, 0)
  klick(host.querySelector('button'))
  assert.deepEqual(api.log.fertig, { nichtWerten: true })
})

kleinerTestlauf(tests)
