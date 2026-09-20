// Mehr (#/mehr): Verteiler zu allem, was nicht zum täglichen Lernweg gehört. Auf dem Handy ist das der
// fünfte Eintrag der Fußnavigation, am Rechner die Sammelseite hinter der Hauptnavigation.
import { h, symbol, minutenText } from '../mini.js'

// obenAuch: Punkte, die auf breiten Geräten schon in der Kopfleiste stehen. Dort wären sie hier eine
// Doppelung; das CSS blendet sie ab derselben Breite aus, ab der die Kopfleiste sie zeigt.
function karte(hash, symbolName, ueber, titel, text, obenAuch) {
  return h('a.karte.karte--klickbar.mehr__karte' + (obenAuch ? '.mehr__karte--oben' : ''), { href: hash },
    h('div.mehr__symbol', { 'aria-hidden': 'true' }, symbol(symbolName)),
    h('div',
      h('div.karte__ueber', ueber),
      h('h2.karte__titel', titel),
      h('p.leise.mehr__text', text)))
}

function anzahlText(n, eins, viele) {
  if (!n) return ''
  return n === 1 ? ' ' + eins : ` ${n} ${viele}`
}

export default {
  titel: 'Mehr',

  render(host, params, app) {
    const daten = app.daten
    const probeMin = (daten.kurs || {}).probeMin
    const quellen = (daten.quellen && daten.quellen.quellen) || []

    host.appendChild(h('div.seitenkopf',
      h('div.seitenkopf__ueber', 'Mehr'),
      h('h1', 'Nachschlagen und einstellen'),
      // Der Satz zählt die Kacheln bewusst nicht auf: auf breiten Geräten stehen Personen und Glossar
      // schon in der Kopfleiste und fehlen hier.
      h('p', 'Alles, was du zwischendurch brauchst, an einer Stelle.')))

    host.appendChild(h('div.raster.raster--2',
      karte('#/personen', 'person', 'Register', 'Personen',
        `Wer im Skript genannt wird und wofür er steht, mit Folienangabe.${anzahlText(daten.personen.length, 'Ein Eintrag.', 'Einträge.')}`, true),
      karte('#/glossar', 'buch', 'Register', 'Glossar',
        `Fachbegriffe aus dem Skript, kurz erklärt und mit Verweis auf das Thema.${anzahlText(daten.glossar.length, 'Ein Begriff.', 'Begriffe.')}`, true),
      karte('#/probe', 'probe', 'Prüfen', 'Generalprobe',
        `Ein gemischter Durchgang über alle Module, am Stück und ohne Hilfen.${probeMin ? ' Rund ' + minutenText(probeMin) + '.' : ''}`),
      karte('#/quellen', 'zettel', 'Transparenz', 'Quellen und Transparenz',
        `Woher jeder Inhalt stammt, welche im Skript verlinkten Quellen erreichbar waren und was das Skript nur nennt, ohne es zu erklären.${anzahlText(quellen.length, 'Eine Quelle.', 'Quellen.')}`),
      karte('#/einstellungen', 'zahnrad', 'Einstellungen', 'Erscheinungsbild und Lernstand',
        'Hell oder dunkel, Lernstand sichern, auf ein anderes Gerät bringen oder zurücksetzen.')))

    host.appendChild(h('p.leise.mehr__fuss',
      'Diese Lernumgebung läuft vollständig in deinem Browser. Sie sendet nichts, sie misst nichts und sie braucht kein Konto.'))

    return null
  },
}
