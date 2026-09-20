// Verzeichnis der Aufgabentypen. Ein Übungsfall (typ "fall") nutzt je nach Modus den Renderer für
// Einfachauswahl oder für offene Erklärungen.
import { h } from '../mini.js'
import mc from './mc.js'
import mehrfach from './mehrfach.js'
import wahrfalsch from './wahrfalsch.js'
import zuordnung from './zuordnung.js'
import sortieren from './sortieren.js'
import kategorien from './kategorien.js'
import luecke from './luecke.js'
import karte from './karte.js'
import erklaeren from './erklaeren.js'
import beschriften from './beschriften.js'

const RENDERER = { mc, mehrfach, wahrfalsch, zuordnung, sortieren, kategorien, luecke, karte, erklaeren, beschriften }

const UNBEKANNT = {
  typ: 'unbekannt',
  selbstbewertung: true,
  render(host, item, api) {
    host.appendChild(h('div.hinweiskasten.hinweiskasten--mittel',
      h('p', `Der Aufgabentyp „${item.typ}“ ist in dieser Fassung nicht verfügbar. Die Aufgabe wird nicht gewertet.`),
      // nichtWerten statt eines vollen Punktes: eine Aufgabe, die niemand lösen konnte, darf nicht als
      // gemeistert im Lernstand landen und aus den Wiederholungen fallen.
      h('button.knopf', { type: 'button', onclick: () => api.fertig({ nichtWerten: true }) }, 'Überspringen')))
    return {}
  },
}

export function holeRenderer(typ, item) {
  if (typ === 'fall') return item && item.modus === 'offen' ? erklaeren : mc
  return RENDERER[typ] || UNBEKANNT
}
