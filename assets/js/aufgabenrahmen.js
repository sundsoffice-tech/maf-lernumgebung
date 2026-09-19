// Rahmen um jede Aufgabe: Frage, Einordnung, Abgabe mit Sicherheitsangabe, Rückmeldung mit Beleg aus dem Skript.
// Die Typ-Renderer unter aufgaben/ liefern nur den Antwortteil.
import { h, mini, symbol, folienText, leeren } from './mini.js'
import { holeRenderer } from './aufgaben/index.js'
import { oeffneSchublade } from './schublade.js'
import { renderBlock } from './bausteine/index.js'

const STUFEN_TEXT = {
  erinnern: 'Erinnern', verstehen: 'Verstehen', anwenden: 'Anwenden', abgrenzen: 'Abgrenzen', transfer: 'Transfer',
}

function rueckmeldungsKopf(punkte, sicher) {
  if (punkte >= 0.999) {
    return sicher === 'sicher'
      ? { klasse: 'gut', symbolName: 'haken', titel: 'Richtig', text: 'Sicher gewusst. Das kommt erst mit größerem Abstand wieder.' }
      : { klasse: 'gut', symbolName: 'haken', titel: 'Richtig', text: 'Richtig, aber du warst unsicher. Das kommt bald noch einmal, bis es sicher sitzt.' }
  }
  if (punkte >= 0.5) return { klasse: 'mittel', symbolName: 'frage', titel: 'Teilweise richtig', text: 'Ein Teil stimmt. Sieh dir die Lösung an, die Aufgabe kommt gleich noch einmal.' }
  return sicher === 'sicher'
    ? { klasse: 'schlecht', symbolName: 'kreuz', titel: 'Nicht richtig, obwohl du sicher warst', text: 'Genau solche Stellen kosten in der Klausur Punkte. Die Lernumgebung merkt sie sich und hebt sie auf deinem Lernzettel hervor.' }
    : { klasse: 'schlecht', symbolName: 'kreuz', titel: 'Noch nicht richtig', text: 'Kein Problem. Lies die Erklärung, die Aufgabe kommt nach ein paar anderen wieder.' }
}

function zeigeKarteInSchublade(app, kartenId) {
  const karte = app.daten.karte(kartenId)
  if (!karte) return
  const inhalt = h('div.stapel')
  for (const block of karte.bloecke || []) inhalt.appendChild(renderBlock(block, app))
  inhalt.appendChild(h('p.leise', folienText(karte.folien)))
  oeffneSchublade(karte.titel || 'Erklärung', inhalt)
}

/**
 * Eine Aufgabe anzeigen.
 * opts: { app, zaehler?: 'Aufgabe 3 von 12', weiterText?, onErgebnis({punkte, sicher, antwort}), onWeiter() }
 */
export function zeigeAufgabe(host, item, opts) {
  const { app } = opts
  leeren(host)
  const renderer = holeRenderer(item.typ, item)
  const thema = app.daten.themaVonAufgabe(item.id)

  const kopf = h('div.aufgabe__kopf.zeile',
    opts.zaehler ? h('span.leise.zahl', opts.zaehler) : null,
    h('span.marke-chip', STUFEN_TEXT[item.stufe] || 'Aufgabe'),
    item.typ === 'fall' ? h('span.marke-chip.marke-chip--neu', 'Übungsfall') : null,
    thema && thema.lernstoff ? h('span.marke-chip.marke-chip--lernstoff', 'Lernstoff laut Skript') : null,
    h('span.marke-chip.marke-chip--folie', folienText(item.folien, thema && thema.quelleText)))

  const frage = h('div.aufgabe__frage')
  if (item.szenario) frage.appendChild(h('div.aufgabe__szenario', mini(item.szenario)))
  frage.appendChild(h('div.aufgabe__fragetext', { id: 'frage-' + item.id }, mini(item.frage || '')))

  const antwort = h('div.aufgabe__antwort', { role: 'group', 'aria-labelledby': 'frage-' + item.id })
  const abgabe = h('div.aufgabe__abgabe')
  const rueckmeldung = h('div.aufgabe__rueckmeldung', { 'aria-live': 'polite' })
  const wurzel = h('article.aufgabe.karte', { dataset: { typ: item.typ } }, kopf, frage, antwort, abgabe, rueckmeldung)
  host.appendChild(wurzel)

  let abgeschlossen = false
  let steuerung = null

  function schliesseAb(ergebnis) {
    if (abgeschlossen) return
    abgeschlossen = true
    leeren(abgabe)
    const punkte = Math.max(0, Math.min(1, Number(ergebnis.punkte) || 0))
    const sicher = ergebnis.sicher === 'sicher' ? 'sicher' : 'unsicher'
    const k = rueckmeldungsKopf(punkte, sicher)

    const kasten = h('div.hinweiskasten.hinweiskasten--' + k.klasse,
      h('div.rueckmeldung__titel', symbol(k.symbolName), h('strong', k.titel)),
      h('p', k.text))
    if (item.erklaerung) kasten.appendChild(h('div.rueckmeldung__erklaerung', mini(item.erklaerung)))

    const belege = item.belege || (item.beleg ? [{ text: item.beleg, quelle: item.belegQuelle }] : [])
    if (belege.length) {
      const extern = belege.some((b) => String(b.quelle || '').startsWith('extern'))
      kasten.appendChild(h('figure.rueckmeldung__beleg',
        h('figcaption', extern ? 'So steht es in der Quelle' : 'So steht es im Skript'),
        belege.map((b) => h('blockquote', mini(b.text, { inline: true })))))
    }

    const knoepfe = h('div.zeile.rueckmeldung__knoepfe')
    if (item.karte && app.daten.karte(item.karte)) {
      knoepfe.appendChild(h('button.knopf.knopf--klein', { type: 'button', onclick: () => zeigeKarteInSchublade(app, item.karte) }, symbol('buch'), 'Erklärung nachschlagen'))
    }
    const weiter = h('button.knopf.knopf--primaer', { type: 'button', onclick: () => opts.onWeiter && opts.onWeiter() }, opts.weiterText || 'Weiter', symbol('weiter'))
    knoepfe.appendChild(weiter)

    rueckmeldung.append(kasten, knoepfe)
    wurzel.classList.add('ist-abgeschlossen')
    if (opts.onErgebnis) opts.onErgebnis({ punkte, sicher, antwort: ergebnis.antwort || '' })
    requestAnimationFrame(() => { weiter.focus({ preventScroll: true }); rueckmeldung.scrollIntoView({ block: 'nearest', behavior: 'smooth' }) })
  }

  const api = {
    bereit(ja) { for (const b of abgabe.querySelectorAll('button')) b.disabled = !ja },
    fertig(ergebnis) { schliesseAb(ergebnis) },
    app,
  }

  try {
    steuerung = renderer.render(antwort, item, api) || {}
  } catch (fehler) {
    console.error('Aufgabe konnte nicht aufgebaut werden', item.id, fehler)
    antwort.appendChild(h('div.hinweiskasten.hinweiskasten--schlecht', h('p', 'Diese Aufgabe konnte nicht angezeigt werden. Sie wird übersprungen und nicht gewertet.')))
    abgabe.appendChild(h('button.knopf', { type: 'button', onclick: () => opts.onWeiter && opts.onWeiter({ uebersprungen: true }) }, 'Weiter'))
    return { element: wurzel }
  }

  if (!renderer.selbstbewertung) {
    const pruefe = (sicher) => {
      const r = steuerung.pruefen ? steuerung.pruefen() : { punkte: 0 }
      schliesseAb({ ...r, sicher })
    }
    abgabe.append(
      h('p.leise.aufgabe__abgabehinweis', 'Wie sicher bist du? Das steuert, wann die Aufgabe wiederkommt.'),
      h('div.aufgabe__abgabeknoepfe',
        h('button.knopf.knopf--primaer', { type: 'button', disabled: true, onclick: () => pruefe('sicher') }, symbol('haken'), 'Prüfen, bin sicher'),
        h('button.knopf', { type: 'button', disabled: true, onclick: () => pruefe('unsicher') }, symbol('frage'), 'Prüfen, bin unsicher')))
  }

  return { element: wurzel }
}
