// Renderer für die Blöcke einer Lernkarte (Vertrag 4.4). Jeder Block bekommt seine Herkunft sichtbar mit:
// Skript, verlinkte Quelle, eigene Merkhilfe oder Lücke im Skript. So bleibt die Quellenbindung für die
// Lernende jederzeit nachprüfbar.
import { h, mini, folienText } from '../mini.js'
import { renderDiagramm } from '../diagramme/index.js'

function kasten(klasse, titel, ...inhalt) {
  return h('div.hinweiskasten' + (klasse ? '.hinweiskasten--' + klasse : ''),
    titel ? h('div.hinweiskasten__titel', titel) : null, ...inhalt)
}

function liste(punkte, geordnet) {
  return h(geordnet ? 'ol' : 'ul', (punkte || []).map((p) => h('li', mini(p, { inline: true }))))
}

function initialen(name) {
  const teile = String(name || '').replace(/[^\p{L}\s/-]/gu, '').split(/[\s/]+/).filter(Boolean)
  if (!teile.length) return '?'
  return (teile[0][0] + (teile.length > 1 ? teile[teile.length - 1][0] : '')).toUpperCase()
}

const BAUER = {
  einfach: (b) => h('div.block.block--einfach', mini(b.text)),

  text: (b) => h('div.block.block--text', mini(b.text)),

  definition: (b) => h('dl.block.block--definition', h('dt', b.begriff), h('dd', mini(b.text))),

  merksatz: (b) => h('div.block.block--merksatz',
    kasten('kern', 'Kernaussage des Skripts' + (b.folie ? ' · Folie ' + b.folie : ''), h('div.merksatz__text', mini(b.text)))),

  zitat: (b) => h('div.block.block--zitat', h('figure',
    h('blockquote', mini(b.text, { inline: true })),
    (b.person || b.kontext) ? h('figcaption', [b.person, b.kontext].filter(Boolean).join(' · ')) : null)),

  liste: (b) => h('div.block.block--liste', b.titel ? h('h4', b.titel) : null, liste(b.punkte, b.geordnet)),

  tabelle: (b) => h('div.block.block--tabelle',
    h('div.tabellenhuelle', { tabindex: '0', role: 'region', 'aria-label': 'Tabelle, seitlich verschiebbar' },
      h('table.tabelle',
        b.kopf ? h('thead', h('tr', b.kopf.map((z) => h('th', { scope: 'col' }, mini(z, { inline: true }))))) : null,
        h('tbody', (b.zeilen || []).map((zeile) => h('tr', zeile.map((z) => h('td', mini(z, { inline: true })))))))),
    b.hinweis ? h('p.leise', mini(b.hinweis, { inline: true })) : null),

  vergleich: (b) => {
    const spalten = b.spalten || []
    return h('div.block.block--vergleich', { style: { '--spalten': String(Math.min(3, spalten.length || 2)) } },
      spalten.map((s) => h('div.vergleich__spalte', h('h4', mini(s.titel, { inline: true })), liste(s.punkte))))
  },

  person: (b) => h('div.block.block--person',
    h('div.person__zeichen', { 'aria-hidden': 'true' }, initialen(b.name)),
    h('div', h('div.person__name', b.name, b.folie ? h('span.leise', ' · Folie ' + b.folie) : null), h('div', mini(b.beitrag, { inline: true })))),

  diagramm: (b) => h('div.block.block--diagramm', h('figure',
    renderDiagramm(b.ref),
    b.unterschrift ? h('figcaption', mini(b.unterschrift, { inline: true })) : null)),

  extern: (b, kontext) => {
    const q = kontext && kontext.daten ? kontext.daten.quelle(b.quelle) : null
    return h('div.block.block--extern', kasten('extern', 'Aus der im Skript verlinkten Quelle',
      h('p', h('strong', b.titel || (q && q.titel) || 'Externe Quelle'), q && q.folie ? h('span.leise', ' · verlinkt auf Folie ' + q.folie) : null),
      liste(b.punkte),
      q && q.status !== 'ja' ? h('p.leise', 'Zugänglichkeit: ' + (q.hinweis || q.status)) : null))
  },

  skriptluecke: (b, kontext) => {
    const speicher = kontext && kontext.speicher
    const felder = (b.felder || []).map((f) => {
      const eingabe = h('input.feld__eingabe', { type: 'text', autocomplete: 'off', value: (speicher && speicher.zustand.notizen[f.id]) || '', placeholder: 'aus deiner Mitschrift' })
      eingabe.addEventListener('input', () => { if (speicher) speicher.aendere((z) => { z.notizen[f.id] = eingabe.value }, { still: true }) })
      return h('label.feld', h('span.feld__label', f.label), eingabe)
    })
    return h('div.block.block--skriptluecke', kasten('mittel', 'Lücke im Skript',
      mini(b.text),
      h('p.leise', 'Der Dozent hat diese Stelle im Skript leer gelassen und mündlich gefüllt. Die Lernumgebung erfindet hier nichts. Trag ein, was in deiner Mitschrift steht; es erscheint dann auch auf deinem Lernzettel.'),
      felder))
  },

  hinweis: (b) => h('div.block.block--hinweis', kasten('', 'Hinweis zur Quelle', mini(b.text))),

  merkhilfe: (b) => h('div.block.block--merkhilfe', kasten('gut', 'Merkhilfe · nicht aus dem Skript', mini(b.text))),
}

export function renderBlock(block, kontext) {
  const bauer = BAUER[block && block.typ]
  if (!bauer) return h('div.block', kasten('mittel', 'Unbekannter Block', h('p', `Blocktyp „${block && block.typ}“ kann nicht angezeigt werden.`)))
  try {
    return bauer(block, kontext)
  } catch (fehler) {
    console.error('Block fehlerhaft', block, fehler)
    return h('div.block', kasten('schlecht', 'Fehler', h('p', 'Dieser Abschnitt konnte nicht angezeigt werden.')))
  }
}

export function renderKarte(karte, kontext) {
  const el = h('section.lernkarte.stapel', { dataset: { karte: karte.id } })
  for (const block of karte.bloecke || []) el.appendChild(renderBlock(block, kontext))
  el.appendChild(h('p.leise.lernkarte__quelle', 'Quelle: ' + folienText(karte.folien, karte.quelleText)))
  return el
}
