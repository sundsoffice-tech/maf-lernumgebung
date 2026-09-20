// DOM-Helfer und die Mini-Auszeichnung für alle Texte aus den Daten.
// Texte aus JSON werden NIE als HTML eingesetzt: mini() maskiert zuerst und setzt dann nur die erlaubten Zeichen um.

const SVG_NS = 'http://www.w3.org/2000/svg'

/**
 * Element bauen: h('div.karte.karte--eng#id', {attr}, kind1, kind2 …)
 * Attribute: on<Ereignis> als Funktion, dataset als Objekt, alles andere als Attribut.
 * Kinder: Knoten, Text, Zahlen, Arrays; null/false werden übergangen.
 */
export function h(selektor, attrs, ...kinder) {
  if (attrs != null && (typeof attrs !== 'object' || attrs instanceof Node || Array.isArray(attrs))) {
    kinder.unshift(attrs)
    attrs = null
  }
  const teile = selektor.split(/(?=[.#])/)
  const el = document.createElement(teile[0] || 'div')
  for (const t of teile.slice(1)) {
    if (t[0] === '.') el.classList.add(t.slice(1))
    else el.id = t.slice(1)
  }
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue
      if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v)
      else if (k === 'dataset') Object.assign(el.dataset, v)
      else if (k === 'class') String(v).split(/\s+/).filter(Boolean).forEach((c) => el.classList.add(c))
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v)
      else if (v === true) el.setAttribute(k, '')
      else el.setAttribute(k, String(v))
    }
  }
  anhaengen(el, kinder)
  return el
}

function anhaengen(el, kinder) {
  for (const k of kinder) {
    if (k == null || k === false) continue
    if (Array.isArray(k)) anhaengen(el, k)
    else if (k instanceof Node) el.appendChild(k)
    else el.appendChild(document.createTextNode(String(k)))
  }
}

export function leeren(el) {
  while (el.firstChild) el.removeChild(el.firstChild)
  return el
}

export function maskiere(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Inline-Teil der Mini-Auszeichnung auf bereits maskiertem Text
function inline(maskiert) {
  return maskiert
    .replace(/\*\*([^*]+?)\*\*/g, '<strong>$1</strong>')
    .replace(/==([^=]+?)==/g, '<mark>$1</mark>')
    .replace(/(^|[\s(„"])\*([^*\n]+?)\*(?=[\s).,;:!?“"]|$)/g, '$1<em>$2</em>')
    .replace(/\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g, (_, ziel, anzeige) =>
      `<button type="button" class="glossarlink" data-glossar="${ziel}">${anzeige || ziel}</button>`)
    .replace(/\{\{([^}|]+?)(?:\|([^}]+?))?\}\}/g, (_, ziel, anzeige) =>
      `<button type="button" class="personlink" data-person="${ziel}">${anzeige || ziel}</button>`)
}

/**
 * Mini-Auszeichnung in ein DocumentFragment umsetzen.
 * Erlaubt: **fett**, *kursiv*, ==Kernaussage==, Zeilenumbruch, Listenzeilen "- ", [[Glossar]], {{Person}}.
 * opts.inline = true: kein Absatz, keine Liste (für Knöpfe, Tabellenzellen, Optionen).
 */
export function mini(text, opts = {}) {
  const vorlage = document.createElement('template')
  const roh = String(text ?? '').replace(/\r\n?/g, '\n')
  if (opts.inline) {
    vorlage.innerHTML = inline(maskiere(roh)).replace(/\n/g, '<br>')
    return vorlage.content
  }
  const html = []
  let absatz = []
  let liste = []
  const absatzZu = () => { if (absatz.length) { html.push('<p>' + absatz.join('<br>') + '</p>'); absatz = [] } }
  const listeZu = () => { if (liste.length) { html.push('<ul>' + liste.map((l) => '<li>' + l + '</li>').join('') + '</ul>'); liste = [] } }
  for (const zeile of roh.split('\n')) {
    const m = zeile.match(/^\s*[-•]\s+(.*)$/)
    if (m) { absatzZu(); liste.push(inline(maskiere(m[1]))); continue }
    listeZu()
    if (!zeile.trim()) { absatzZu(); continue }
    absatz.push(inline(maskiere(zeile)))
  }
  absatzZu(); listeZu()
  vorlage.innerHTML = html.join('')
  return vorlage.content
}

/** Reiner Text ohne Auszeichnungszeichen, z. B. für aria-label oder den Druck. */
export function ohneAuszeichnung(text) {
  return String(text ?? '')
    .replace(/\*\*([^*]+?)\*\*/g, '$1')
    .replace(/==([^=]+?)==/g, '$1')
    .replace(/\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g, (_, z, a) => a || z)
    .replace(/\{\{([^}|]+?)(?:\|([^}]+?))?\}\}/g, (_, z, a) => a || z)
}

/** Fisher-Yates mit eigenem Zufall, damit Tests einen festen Generator einsetzen können. */
export function mische(liste, zufall = Math.random) {
  const a = liste.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(zufall() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Mischen, aber nie in der Ausgangsreihenfolge zurückgeben (Sortier- und Zuordnungsaufgaben). */
export function mischeAnders(liste, zufall = Math.random) {
  if (liste.length < 2) return liste.slice()
  for (let versuch = 0; versuch < 8; versuch++) {
    const a = mische(liste, zufall)
    if (a.some((x, i) => x !== liste[i])) return a
  }
  return liste.slice(1).concat(liste[0])
}

export function minutenText(min) {
  const m = Math.max(0, Math.round(min))
  if (m < 60) return m + ' Min'
  const st = Math.floor(m / 60)
  const rest = m % 60
  return rest ? `${st} Std ${rest} Min` : `${st} Std`
}

/** Kurzform für enge Leisten, z. B. „3:30 Std“ auf dem iPhone im Hochformat. */
export function minutenKurz(min) {
  const m = Math.max(0, Math.round(min))
  return `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')} Std`
}

/**
 * Einzeiliges Eingabefeld für eigene Mitschrift. iOS korrigiert Fachbegriffe sonst beim Tippen um,
 * gerade dort, wo der Dozent eine Lücke gelassen hat. Jedes neue Feld nimmt diesen Helfer.
 */
export function textfeld(attrs = {}) {
  return h('input.feld__eingabe', {
    type: 'text',
    autocomplete: 'off',
    autocorrect: 'off',
    autocapitalize: 'sentences',
    spellcheck: 'false',
    ...attrs,
  })
}

export function prozent(wert) {
  return Math.round(Math.max(0, Math.min(1, wert)) * 100)
}

export function folienText(folien, quelleText) {
  if (!folien || !folien.length) return quelleText || 'Skript'
  const s = folien.slice().sort((a, b) => a - b)
  if (s.length === 1) return 'Folie ' + s[0]
  const lueckenlos = s.every((f, i) => i === 0 || f === s[i - 1] + 1)
  return lueckenlos ? `Folien ${s[0]}–${s[s.length - 1]}` : 'Folien ' + s.join(', ')
}

// Linien-Symbole, 24er Raster, erben die Textfarbe
const SYMBOLE = {
  start: 'M3 10.5 12 3l9 7.5M5 9.5V21h5v-6h4v6h5V9.5',
  lernen: 'M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20M8 7h8M8 11h6',
  training: 'M12 3v4M12 17v4M3 12h4M17 12h4M12 12l4-4M12 12a1 1 0 1 0 0 .01',
  zettel: 'M6 3h9l4 4v14H6zM14 3v5h5M9 12h7M9 16h7',
  mehr: 'M5 12h.01M12 12h.01M19 12h.01',
  weiter: 'M5 12h14M13 6l6 6-6 6',
  zurueck: 'M19 12H5M11 6l-6 6 6 6',
  haken: 'M4 12.5 9.5 18 20 6.5',
  kreuz: 'M6 6l12 12M18 6 6 18',
  frage: 'M9 9a3 3 0 1 1 4.5 2.6c-.9.6-1.5 1.2-1.5 2.4M12 18h.01',
  uhr: 'M12 7v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18',
  buch: 'M4 5.5A2.5 2.5 0 0 1 6.5 3H20v18H6.5A2.5 2.5 0 0 1 4 18.5z',
  auf: 'M6 15l6-6 6 6',
  ab: 'M6 9l6 6 6-6',
  drucken: 'M7 8V3h10v5M7 17H4v-7h16v7h-3M7 14h10v7H7z',
  person: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M4 21a8 8 0 0 1 16 0',
  probe: 'M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3M7.5 15h9',
  wiederholen: 'M4 12a8 8 0 0 1 13.7-5.7L20 8M20 3v5h-5M20 12a8 8 0 0 1-13.7 5.7L4 16M4 21v-5h5',
  zahnrad: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6M19 12l2-1-1-3-2 .3-1.4-1.4.3-2-3-1-1 2h-2l-1-2-3 1 .3 2L5 7.3 3 7 2 10l2 1v2l-2 1 1 3 2-.3 1.4 1.4-.3 2 3 1 1-2h2l1 2 3-1-.3-2 1.4-1.4 2 .3 1-3-2-1z',
}

export function symbol(name, attrs = {}) {
  const svg = document.createElementNS(SVG_NS, 'svg')
  svg.setAttribute('viewBox', '0 0 24 24')
  svg.setAttribute('fill', 'none')
  svg.setAttribute('stroke', 'currentColor')
  svg.setAttribute('stroke-width', '1.8')
  svg.setAttribute('stroke-linecap', 'round')
  svg.setAttribute('stroke-linejoin', 'round')
  svg.setAttribute('aria-hidden', 'true')
  svg.setAttribute('focusable', 'false')
  for (const [k, v] of Object.entries(attrs)) svg.setAttribute(k, v)
  const pfad = document.createElementNS(SVG_NS, 'path')
  pfad.setAttribute('d', SYMBOLE[name] || SYMBOLE.frage)
  svg.appendChild(pfad)
  return svg
}

let kurzmeldungEl = null
let kurzmeldungZeit = 0
export function kurzmeldung(text) {
  if (!kurzmeldungEl) {
    kurzmeldungEl = h('div.kurzmeldung', { role: 'status', 'aria-live': 'polite' })
    document.body.appendChild(kurzmeldungEl)
  }
  kurzmeldungEl.textContent = text
  kurzmeldungEl.classList.add('ist-sichtbar')
  clearTimeout(kurzmeldungZeit)
  kurzmeldungZeit = setTimeout(() => kurzmeldungEl.classList.remove('ist-sichtbar'), 2600)
}
