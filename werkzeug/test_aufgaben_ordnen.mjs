// Zeugen für die drei Ordnen-Typen (zuordnung, sortieren, kategorien).
// Geprüft wird an den Musteraufgaben aus daten/_muster.json: Aufbau, Bedienung per Klick und Tastatur,
// die Meldung an api.bereit und die Punktzahl bei voll richtig, teilweise richtig und falsch.
// Lauf: cd lernseite && node werkzeug/test_aufgaben_ordnen.mjs
import { richteDomEin, musterAufgabe, attrappeApi, klick, kleinerTestlauf } from './dom.mjs'
import zuordnung from '../assets/js/aufgaben/zuordnung.js'
import sortieren from '../assets/js/aufgaben/sortieren.js'
import kategorien from '../assets/js/aufgaben/kategorien.js'

const fenster = richteDomEin()

function gleich(ist, soll, was) {
  if (ist !== soll) throw new Error(`${was}: ${JSON.stringify(ist)} statt ${JSON.stringify(soll)}`)
}
function nahe(ist, soll, was) {
  if (Math.abs(ist - soll) > 1e-9) throw new Error(`${was}: ${ist} statt ${soll}`)
}
function wahr(bedingung, was) {
  if (!bedingung) throw new Error(was)
}

/** Renderer mit einer Musteraufgabe aufbauen und Host, Steuerung und Attrappe zurückgeben. */
function baue(renderer, typ, aendere) {
  const item = musterAufgabe(typ)
  if (aendere) aendere(item)
  const host = document.createElement('div')
  document.body.appendChild(host)
  const api = attrappeApi()
  const steuerung = renderer.render(host, item, api)
  return { host, api, item, steuerung }
}

const alle = (host, wahl) => Array.from(host.querySelectorAll(wahl))
const text = (el) => (el ? el.textContent.trim() : '')
const zuletztBereit = (api) => api.log.bereit[api.log.bereit.length - 1]

// ---------------------------------------------------------------- zuordnung

const linksKnopf = (host, i) => host.querySelector(`.zuordnung__eintrag[data-seite="links"][data-i="${i}"]`)
const rechtsKnopf = (host, i) => host.querySelector(`.zuordnung__eintrag[data-seite="rechts"][data-i="${i}"]`)

/** Linken Eintrag i dem rechten Eintrag j zuweisen. */
function paare(host, i, j) {
  klick(linksKnopf(host, i))
  klick(rechtsKnopf(host, j))
}

const tests = [
  ['zuordnung: beide Seiten vollständig, rechte Seite gemischt, Texte stimmen', () => {
    const { host, item, api } = baue(zuordnung, 'zuordnung')
    gleich(alle(host, '.zuordnung__eintrag[data-seite="links"]').length, item.paare.length, 'Anzahl links')
    gleich(alle(host, '.zuordnung__eintrag[data-seite="rechts"]').length, item.paare.length, 'Anzahl rechts')
    item.paare.forEach((p, i) => {
      gleich(text(linksKnopf(host, i).querySelector('.zuordnung__text')), p.links, 'Text links ' + i)
      gleich(text(rechtsKnopf(host, i).querySelector('.zuordnung__text')), p.rechts, 'Text rechts ' + i)
    })
    // Die linke Seite steht in Datenreihenfolge, die rechte startet nie in der Lösungsreihenfolge
    const rechtsReihe = alle(host, '.zuordnung__eintrag[data-seite="rechts"]').map((e) => e.dataset.i).join(',')
    const loesung = item.paare.map((_, i) => String(i)).join(',')
    wahr(rechtsReihe !== loesung, 'rechte Seite startet in der Lösungsreihenfolge')
    gleich(zuletztBereit(api), false, 'bereit vor der ersten Eingabe')
  }],

  ['zuordnung: Antippen wählt aus, das zweite Antippen schließt das Paar', () => {
    const { host, api } = baue(zuordnung, 'zuordnung')
    klick(linksKnopf(host, 0))
    wahr(linksKnopf(host, 0).classList.contains('ist-gewaehlt'), 'links nicht als gewählt markiert')
    gleich(linksKnopf(host, 0).getAttribute('aria-pressed'), 'true', 'aria-pressed links')
    klick(rechtsKnopf(host, 0))
    gleich(linksKnopf(host, 0).dataset.paar, '1', 'Paarnummer links')
    gleich(rechtsKnopf(host, 0).dataset.paar, '1', 'Paarnummer rechts')
    wahr(!linksKnopf(host, 0).classList.contains('ist-gewaehlt'), 'Auswahl nicht aufgehoben')
    gleich(alle(host, '.zuordnung__paar').length, 1, 'Zahl der Paarzeilen')
    wahr(text(host.querySelector('.zuordnung__paar')).includes('gehört zu'), 'Paarzeile ohne Satz')
    gleich(zuletztBereit(api), false, 'bereit, obwohl erst ein Paar steht')
  }],

  ['zuordnung: erneutes Antippen löst das Paar wieder', () => {
    const { host } = baue(zuordnung, 'zuordnung')
    paare(host, 1, 1)
    gleich(alle(host, '.zuordnung__paar').length, 1, 'Paar nicht entstanden')
    klick(linksKnopf(host, 1))
    gleich(alle(host, '.zuordnung__paar').length, 0, 'Paar nicht gelöst')
    wahr(!linksKnopf(host, 1).dataset.paar, 'Nummer links geblieben')
    wahr(!rechtsKnopf(host, 1).dataset.paar, 'Nummer rechts geblieben')
    // dasselbe von der rechten Seite aus
    paare(host, 1, 1)
    klick(rechtsKnopf(host, 1))
    gleich(alle(host, '.zuordnung__paar').length, 0, 'Paar von rechts nicht gelöst')
  }],

  ['zuordnung: bereit erst, wenn alle zugeordnet sind', () => {
    const { host, item, api } = baue(zuordnung, 'zuordnung')
    item.paare.forEach((_, i) => paare(host, i, i))
    gleich(zuletztBereit(api), true, 'bereit nach vollständiger Zuordnung')
    klick(linksKnopf(host, 0))
    gleich(zuletztBereit(api), false, 'bereit, obwohl ein Paar wieder gelöst wurde')
  }],

  ['zuordnung: alles richtig gibt einen vollen Punkt', () => {
    const { host, item, steuerung } = baue(zuordnung, 'zuordnung')
    item.paare.forEach((_, i) => paare(host, i, i))
    const e = steuerung.pruefen()
    nahe(e.punkte, 1, 'Punkte bei allem richtig')
    gleich(alle(host, '.zuordnung__eintrag.ist-falsch').length, 0, 'falsch markiert, obwohl alles stimmt')
    gleich(alle(host, '.zuordnung__eintrag.ist-verpasst').length, 0, 'verpasst markiert, obwohl alles zugeordnet war')
    gleich(alle(host, '.zuordnung__eintrag[data-seite="links"].ist-richtig').length, item.paare.length, 'richtig markiert')
    wahr(e.antwort.includes(item.paare[0].rechts), 'Antworttext ohne die gewählte Seite')
  }],

  ['zuordnung: teilweise richtig gibt den Anteil', () => {
    // drei Paare: eines richtig, zwei vertauscht
    const { host, item, steuerung } = baue(zuordnung, 'zuordnung')
    gleich(item.paare.length, 3, 'Muster hat nicht drei Paare')
    paare(host, 0, 0)
    paare(host, 1, 2)
    paare(host, 2, 1)
    const e = steuerung.pruefen()
    nahe(e.punkte, 1 / 3, 'Punkte bei einem von drei')
    gleich(alle(host, '.zuordnung__eintrag[data-seite="links"].ist-falsch').length, 2, 'Zahl der falschen links')
  }],

  ['zuordnung: alles falsch gibt null Punkte und zeigt die Lösung je Eintrag', () => {
    const { host, item, steuerung } = baue(zuordnung, 'zuordnung')
    const n = item.paare.length
    item.paare.forEach((_, i) => paare(host, i, (i + 1) % n))
    const e = steuerung.pruefen()
    nahe(e.punkte, 0, 'Punkte bei allem falsch')
    const loesungen = alle(host, '.zuordnung__liste--links .ordnen__loesung')
    gleich(loesungen.length, n, 'Lösungszeilen je linkem Eintrag')
    item.paare.forEach((p, i) => wahr(text(loesungen[i]).includes(p.rechts), 'Lösung fehlt bei Eintrag ' + i))
    wahr(alle(host, '.zuordnung__eintrag').every((b) => b.disabled), 'Eingaben nach dem Prüfen nicht gesperrt')
  }],

  ['zuordnung: ohne jede Eingabe geprüft gibt null Punkte, ohne Absturz', () => {
    const { host, item, steuerung } = baue(zuordnung, 'zuordnung')
    const e = steuerung.pruefen()
    nahe(e.punkte, 0, 'Punkte ohne Eingabe')
    gleich(e.antwort, '', 'Antworttext ohne Eingabe')
    gleich(alle(host, '.zuordnung__liste--links .ordnen__loesung').length, item.paare.length, 'Lösungszeilen ohne Eingabe')
    gleich(alle(host, '.zuordnung__eintrag[data-seite="rechts"].ist-verpasst').length, item.paare.length, 'ungewählte rechte Einträge nicht als verpasst markiert')
    gleich(alle(host, '.zuordnung__eintrag.ist-richtig').length, 0, 'ohne Eingabe etwas als richtig markiert')
  }],

  // ---------------------------------------------------------------- sortieren

  ['sortieren: startet gemischt, nie in der richtigen Reihenfolge', () => {
    const { host, item, api } = baue(sortieren, 'sortieren')
    const zeilen = alle(host, '.sortierzeile')
    gleich(zeilen.length, item.elemente.length, 'Zahl der Zeilen')
    const start = zeilen.map((li) => Number(li.dataset.index))
    wahr(start.some((v, i) => v !== i), 'Liste startet in der richtigen Reihenfolge')
    zeilen.forEach((li, pos) => {
      gleich(text(li.querySelector('.sortierzeile__text')), item.elemente[Number(li.dataset.index)], 'Text der Zeile ' + pos)
      gleich(text(li.querySelector('.ordnen__marke')), String(pos + 1), 'Platznummer der Zeile ' + pos)
    })
    gleich(zuletztBereit(api), false, 'bereit vor der ersten Bewegung')
  }],

  ['sortieren: der Knopf "Reihenfolge stimmt so" macht sofort bereit', () => {
    const { host, api } = baue(sortieren, 'sortieren')
    const knopf = alle(host, '.sortieren__knoepfe .knopf')[0]
    wahr(!!knopf, 'Knopf fehlt')
    klick(knopf)
    gleich(zuletztBereit(api), true, 'bereit nach dem Knopf')
    // Aus dem DOM genommen, nicht nur "hidden": .knopf setzt display und schlägt das Attribut sonst
    gleich(alle(host, '.sortieren__knoepfe .knopf').length, 0, 'Knopf bleibt nach dem Drücken stehen')
  }],

  ['sortieren: ein Klick auf "nach oben" verschiebt die Zeile und macht bereit', () => {
    const { host, api } = baue(sortieren, 'sortieren')
    const vorher = alle(host, '.sortierzeile').map((li) => li.dataset.index)
    klick(alle(host, '.sortierzeile')[1].querySelector('[data-richtung="auf"]'))
    const nachher = alle(host, '.sortierzeile').map((li) => li.dataset.index)
    gleich(nachher[0], vorher[1], 'Zeile nicht nach oben gerückt')
    gleich(nachher[1], vorher[0], 'verdrängte Zeile nicht nachgerückt')
    gleich(zuletztBereit(api), true, 'bereit nach der ersten Bewegung')
    gleich(alle(host, '.sortieren__knoepfe .knopf').length, 0, '"Reihenfolge stimmt so" steht nach einer Bewegung noch da')
    gleich(text(alle(host, '.sortierzeile')[0].querySelector('.ordnen__marke')), '1', 'Platznummer nicht nachgezogen')
    wahr(alle(host, '.sortierzeile')[0].querySelector('[data-richtung="auf"]').disabled, 'oberster Aufwärtsknopf nicht gesperrt')
  }],

  ['sortieren: die Pfeiltasten verschieben die fokussierte Zeile', () => {
    const { host } = baue(sortieren, 'sortieren')
    const vorher = alle(host, '.sortierzeile').map((li) => li.dataset.index)
    const zeile = alle(host, '.sortierzeile')[2]
    zeile.focus()
    zeile.dispatchEvent(new fenster.KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, cancelable: true }))
    const nachher = alle(host, '.sortierzeile').map((li) => li.dataset.index)
    gleich(nachher[1], vorher[2], 'Zeile nicht mit ArrowUp gerückt')
    zeile.dispatchEvent(new fenster.KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }))
    gleich(alle(host, '.sortierzeile').map((li) => li.dataset.index).join(','), vorher.join(','), 'ArrowDown hebt ArrowUp nicht auf')
  }],

  ['sortieren: richtige Reihenfolge gibt einen vollen Punkt', () => {
    const { host, item, steuerung } = baue(sortieren, 'sortieren')
    bringeInReihenfolge(host, item.elemente)
    const e = steuerung.pruefen()
    nahe(e.punkte, 1, 'Punkte bei richtiger Reihenfolge')
    gleich(e.antwort, item.elemente.join(' → '), 'Antworttext')
    gleich(alle(host, '.sortierzeile.ist-falsch').length, 0, 'falsch markiert, obwohl alles stimmt')
  }],

  ['sortieren: zwei vertauschte Zeilen geben den Anteil', () => {
    const { host, item, steuerung } = baue(sortieren, 'sortieren')
    const n = item.elemente.length
    const ziel = item.elemente.slice()
    ;[ziel[0], ziel[1]] = [ziel[1], ziel[0]]
    bringeInReihenfolge(host, ziel)
    const e = steuerung.pruefen()
    nahe(e.punkte, (n - 2) / n, 'Punkte bei zwei vertauschten')
    gleich(alle(host, '.sortierzeile.ist-falsch').length, 2, 'Zahl der falschen Zeilen')
  }],

  ['sortieren: nach dem Prüfen steht an jeder Zeile der richtige Platz', () => {
    const { host, item, steuerung } = baue(sortieren, 'sortieren')
    // umgekehrte Reihenfolge: bei fünf Elementen bleibt nur die Mitte richtig
    bringeInReihenfolge(host, item.elemente.slice().reverse())
    const e = steuerung.pruefen()
    const n = item.elemente.length
    nahe(e.punkte, (n % 2 ? 1 : 0) / n, 'Punkte bei umgekehrter Reihenfolge')
    const zeilen = alle(host, '.sortierzeile')
    gleich(alle(host, '.sortierzeile__loesung').length, n, 'Lösungszeilen')
    zeilen.forEach((li) => {
      const soll = Number(li.dataset.index) + 1
      wahr(text(li.querySelector('.sortierzeile__loesung')).includes(String(soll)), 'richtiger Platz fehlt in Zeile ' + li.dataset.index)
    })
    wahr(alle(host, '.sortierzeile__knopf').every((b) => b.disabled), 'Knöpfe nach dem Prüfen nicht gesperrt')
  }],

  // ---------------------------------------------------------------- kategorien

  ['kategorien: Stapel mit allen Elementen und allen Kategorien je Element', () => {
    const { host, item, api } = baue(kategorien, 'kategorien')
    gleich(alle(host, '.kategorienkarte').length, item.elemente.length, 'Zahl der Karten')
    for (const karte of alle(host, '.kategorienkarte')) {
      const knoepfe = alle(karte, '.kategorienkarte__wahl .knopf')
      gleich(knoepfe.length, item.kategorien.length, 'Zahl der Kategorie-Knöpfe')
      knoepfe.forEach((b, k) => gleich(text(b), item.kategorien[k], 'Beschriftung der Kategorie ' + k))
      const el = item.elemente[Number(karte.dataset.index)]
      gleich(text(karte.querySelector('.kategorienkarte__text')), el.text, 'Text des Elements')
    }
    gleich(text(host.querySelector('.ordnen__stand')), `0 von ${item.elemente.length} einsortiert, noch ${item.elemente.length} offen.`, 'Fortschritt zu Beginn')
    gleich(zuletztBereit(api), false, 'bereit vor der ersten Eingabe')
  }],

  ['kategorien: Antippen sortiert ein, der Fortschritt zählt mit', () => {
    const { host, item, api } = baue(kategorien, 'kategorien')
    const karte = host.querySelector('.kategorienkarte')
    klick(alle(karte, '.kategorienkarte__wahl .knopf')[0])
    gleich(alle(karte, '.kategorienkarte__wahl .knopf')[0].getAttribute('aria-pressed'), 'true', 'aria-pressed')
    wahr(karte.classList.contains('ist-eingeordnet'), 'Karte nicht als eingeordnet markiert')
    wahr(text(host.querySelector('.ordnen__stand')).startsWith(`1 von ${item.elemente.length}`), 'Fortschritt zählt nicht mit')
    gleich(zuletztBereit(api), false, 'bereit, obwohl erst ein Element einsortiert ist')
  }],

  ['kategorien: ein anderer Knopf ändert, derselbe Knopf nimmt zurück', () => {
    const { host } = baue(kategorien, 'kategorien')
    const karte = host.querySelector('.kategorienkarte')
    const knoepfe = alle(karte, '.kategorienkarte__wahl .knopf')
    klick(knoepfe[0])
    klick(knoepfe[1])
    gleich(knoepfe[0].getAttribute('aria-pressed'), 'false', 'alte Kategorie bleibt gesetzt')
    gleich(knoepfe[1].getAttribute('aria-pressed'), 'true', 'neue Kategorie nicht gesetzt')
    klick(knoepfe[1])
    gleich(knoepfe[1].getAttribute('aria-pressed'), 'false', 'Zuordnung nicht zurückgenommen')
    wahr(!karte.classList.contains('ist-eingeordnet'), 'Karte bleibt als eingeordnet markiert')
  }],

  ['kategorien: bereit erst, wenn alle einsortiert sind', () => {
    const { host, item, api } = baue(kategorien, 'kategorien')
    for (const karte of alle(host, '.kategorienkarte')) {
      klick(alle(karte, '.kategorienkarte__wahl .knopf')[0])
    }
    gleich(zuletztBereit(api), true, 'bereit nach vollständigem Einsortieren')
    gleich(text(host.querySelector('.ordnen__stand')), `${item.elemente.length} von ${item.elemente.length} einsortiert. Du kannst prüfen.`, 'Fortschritt am Ende')
  }],

  ['kategorien: alles richtig gibt einen vollen Punkt', () => {
    const { host, item, steuerung } = baue(kategorien, 'kategorien')
    sortiereEin(host, item, () => null)
    const e = steuerung.pruefen()
    nahe(e.punkte, 1, 'Punkte bei allem richtig')
    gleich(alle(host, '.kategorienkarte.ist-falsch').length, 0, 'falsch markiert, obwohl alles stimmt')
  }],

  ['kategorien: teilweise richtig gibt den Anteil', () => {
    const { host, item, steuerung } = baue(kategorien, 'kategorien')
    // jedes zweite Element bewusst in die falsche Kategorie
    let zaehler = 0
    sortiereEin(host, item, (el) => (zaehler++ % 2 === 0 ? null : (el.kategorie + 1) % item.kategorien.length))
    const e = steuerung.pruefen()
    const falsch = alle(host, '.kategorienkarte.ist-falsch').length
    nahe(e.punkte, (item.elemente.length - falsch) / item.elemente.length, 'Punkte bei teilweise richtig')
    wahr(falsch > 0 && falsch < item.elemente.length, 'Aufbau des Falls: ' + falsch + ' falsche')
  }],

  ['kategorien: alles falsch gibt null Punkte und zeigt die richtige Kategorie', () => {
    const { host, item, steuerung } = baue(kategorien, 'kategorien')
    sortiereEin(host, item, (el) => (el.kategorie + 1) % item.kategorien.length)
    const e = steuerung.pruefen()
    nahe(e.punkte, 0, 'Punkte bei allem falsch')
    for (const karte of alle(host, '.kategorienkarte')) {
      const el = item.elemente[Number(karte.dataset.index)]
      wahr(text(karte.querySelector('.ordnen__loesung')).includes(item.kategorien[el.kategorie]), 'richtige Kategorie fehlt')
      // Richtig, aber nicht gewählt: ist-verpasst, nicht ist-richtig
      gleich(alle(karte, '.kategorienkarte__wahl .knopf.ist-richtig').length, 0, 'falsche Antwort als richtig markiert')
      const verpasst = alle(karte, '.kategorienkarte__wahl .knopf.ist-verpasst')
      gleich(verpasst.length, 1, 'genau ein Knopf als verpasst markiert')
      gleich(text(verpasst[0]), item.kategorien[el.kategorie], 'falscher Knopf als verpasst markiert')
      gleich(alle(karte, '.kategorienkarte__wahl .knopf.ist-falsch').length, 1, 'die gewählte Kategorie ist nicht als falsch markiert')
    }
    wahr(alle(host, '.kategorienkarte__wahl .knopf').every((b) => b.disabled), 'Knöpfe nach dem Prüfen nicht gesperrt')
  }],

  // ---------------------------------------------------------------- Größen aus den echten Daten
  // Gemessen am 20.09.2026 über daten/m1a…m5b.json: höchstens 7 Paare, 10 Elemente, 4 Kategorien.

  ['zuordnung: sieben Paare bekommen sieben unterscheidbare Nummern', () => {
    const { host } = baue(zuordnung, 'zuordnung', (item) => {
      item.paare = Array.from({ length: 7 }, (_, i) => ({ links: 'Person ' + (i + 1), rechts: 'Beitrag ' + (i + 1) }))
    })
    for (let i = 0; i < 7; i++) paare(host, i, i)
    const nummern = alle(host, '.zuordnung__eintrag[data-seite="links"]').map((e) => e.dataset.paar)
    gleich(nummern.join(','), '1,2,3,4,5,6,7', 'Paarnummern bei sieben Paaren')
    gleich(new Set(nummern).size, 7, 'Paarnummern nicht eindeutig')
  }],

  ['sortieren: zehn Elemente lassen sich vollständig ordnen', () => {
    const { host, item, steuerung } = baue(sortieren, 'sortieren', (item) => {
      item.elemente = Array.from({ length: 10 }, (_, i) => 'Schritt ' + (i + 1))
    })
    gleich(alle(host, '.sortierzeile').length, 10, 'Zahl der Zeilen')
    bringeInReihenfolge(host, item.elemente)
    nahe(steuerung.pruefen().punkte, 1, 'Punkte bei zehn Elementen')
  }],

  ['kategorien: vier Kategorien je Element werden richtig bewertet', () => {
    const { host, item, steuerung } = baue(kategorien, 'kategorien', (item) => {
      item.kategorien = ['A', 'B', 'C', 'D']
      item.elemente = item.elemente.map((el, i) => ({ text: el.text, kategorie: i % 4 }))
    })
    gleich(alle(host, '.kategorienkarte')[0].querySelectorAll('.kategorienkarte__wahl .knopf').length, 4, 'Zahl der Knöpfe')
    sortiereEin(host, item, () => null)
    nahe(steuerung.pruefen().punkte, 1, 'Punkte bei vier Kategorien')
  }],

  ['kategorien: ohne jede Eingabe geprüft gibt null Punkte, ohne Absturz', () => {
    const { host, item, steuerung } = baue(kategorien, 'kategorien')
    const e = steuerung.pruefen()
    nahe(e.punkte, 0, 'Punkte ohne Eingabe')
    gleich(e.antwort, '', 'Antworttext ohne Eingabe')
    gleich(alle(host, '.kategorienkarte .ordnen__loesung').length, item.elemente.length, 'Lösungszeilen ohne Eingabe')
  }],
]

/** Die Liste über die Auf-Knöpfe in die Zielreihenfolge bringen (Auswahlsortieren). */
function bringeInReihenfolge(host, ziel) {
  const liste = host.querySelector('.sortierliste')
  for (let pos = 0; pos < ziel.length; pos++) {
    let zeilen = Array.from(liste.querySelectorAll('.sortierzeile'))
    let jetzt = zeilen.findIndex((li) => text(li.querySelector('.sortierzeile__text')) === ziel[pos])
    if (jetzt < 0) throw new Error('Zeile nicht gefunden: ' + ziel[pos])
    while (jetzt > pos) {
      klick(zeilen[jetzt].querySelector('[data-richtung="auf"]'))
      zeilen = Array.from(liste.querySelectorAll('.sortierzeile'))
      jetzt -= 1
    }
  }
}

/** Jedes Element einsortieren. waehle(el) gibt den Kategorie-Index oder null für den richtigen. */
function sortiereEin(host, item, waehle) {
  for (const karte of Array.from(host.querySelectorAll('.kategorienkarte'))) {
    const el = item.elemente[Number(karte.dataset.index)]
    const k = waehle(el)
    klick(Array.from(karte.querySelectorAll('.kategorienkarte__wahl .knopf'))[k == null ? el.kategorie : k])
  }
}

kleinerTestlauf(tests)
