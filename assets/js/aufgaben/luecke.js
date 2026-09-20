// Lückentext. Der Text steht in den Daten und wird NIE als HTML eingesetzt: die Lücken werden vorher
// herausgelöst, alles Übrige läuft durch mini(). Zwei Wege: Wortbank (Lücke antippen, Wort antippen)
// oder Tippfelder mit toleranter Prüfung.
import { h, mini, mische, symbol, leeren, ohneAuszeichnung } from '../mini.js'

/**
 * Text in Abschnitte zerlegen. Eine Lücke ist {_Lösung|Alternative_}; die erste Schreibweise ist die
 * angezeigte Lösung, alle weiteren gelten beim Prüfen ebenfalls als richtig.
 * Rückgabe: [{art: 'text', text} | {art: 'luecke', loesungen: [...]}]
 */
export function teileLuecken(text) {
  const muster = /\{_([\s\S]*?)_\}/g
  const roh = String(text ?? '')
  const teile = []
  let pos = 0
  let treffer
  while ((treffer = muster.exec(roh)) !== null) {
    const loesungen = treffer[1].split('|').map((w) => ohneAuszeichnung(w).trim()).filter(Boolean)
    if (!loesungen.length) continue // {__} ist keine Lücke und bleibt wörtlich stehen
    if (treffer.index > pos) teile.push({ art: 'text', text: roh.slice(pos, treffer.index) })
    teile.push({ art: 'luecke', loesungen })
    pos = treffer.index + treffer[0].length
  }
  if (pos < roh.length) teile.push({ art: 'text', text: roh.slice(pos) })
  return teile
}

/**
 * Vergleichsform: Groß- und Kleinschreibung, Leerraum, Bindestrich gegen Leerzeichen, ß gegen ss und
 * Umlaute gegen ae/oe/ue spielen keine Rolle. Alles andere muss stimmen.
 */
export function normalisiere(wert) {
  return String(wert ?? '')
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[-‐‑–—_/]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function istRichtig(eingabe, loesungen) {
  const k = normalisiere(eingabe)
  return k !== '' && (loesungen || []).some((l) => normalisiere(l) === k)
}

export default {
  typ: 'luecke',
  selbstbewertung: false,

  render(host, item, api) {
    const teile = teileLuecken(item.text || '')
    const stellen = []
    const mitBank = item.bank === true
    const absatz = h('p.lueckentext' + (mitBank ? '.lueckentext--bank' : '.lueckentext--tippen'))

    for (const teil of teile) {
      if (teil.art === 'text') { absatz.appendChild(mini(teil.text, { inline: true })); continue }
      const stelle = { nummer: stellen.length + 1, loesungen: teil.loesungen, bank: null, knopf: null, feld: null }
      stelle.huelle = h('span.luecke-stelle')
      absatz.appendChild(stelle.huelle)
      stellen.push(stelle)
    }

    if (!stellen.length) {
      // Kaputte Daten sollen die Lernende weder Punkte kosten noch ihr einen schenken: nichtWerten
      // überspringt die Aufgabe, ohne sie im Lernstand als gekonnt zu vermerken.
      host.appendChild(h('div.hinweiskasten.hinweiskasten--mittel', h('p', 'In diesem Text ist keine Lücke markiert. Die Aufgabe wird nicht gewertet.')))
      api.bereit(true)
      return { pruefen: () => ({ nichtWerten: true, antwort: '' }) }
    }

    // Wortbank: die Lösungen aller Lücken plus die zusätzlichen falschen Wörter, gemischt
    const bank = !mitBank ? [] : mische(stellen.map((s) => s.loesungen[0]).concat((item.zusatzBank || []).map((w) => ohneAuszeichnung(w))))
      .map((text, index) => ({ text, index, knopf: null }))

    let gewaehlteLuecke = -1
    let gewaehltesWort = -1
    let gesperrt = false

    const melde = () => api.bereit(stellen.every((s) => (mitBank ? s.bank !== null : s.feld.value.trim() !== '')))

    function zeichneStelle(s) {
      const wort = s.bank === null ? '' : bank[s.bank].text
      leeren(s.knopf)
      s.knopf.classList.toggle('ist-gefuellt', wort !== '')
      s.knopf.append(h('span.luecke__nummer', { 'aria-hidden': 'true' }, String(s.nummer)), h('span.luecke__wort', wort))
      s.knopf.setAttribute('aria-label', wort
        ? `Lücke ${s.nummer} von ${stellen.length}: ${wort}. Noch einmal antippen nimmt das Wort zurück.`
        : `Lücke ${s.nummer} von ${stellen.length}, noch leer`)
    }

    function zeichneAuswahl() {
      stellen.forEach((s, i) => s.knopf.classList.toggle('ist-gewaehlt', i === gewaehlteLuecke))
      bank.forEach((w, i) => w.knopf.classList.toggle('ist-gewaehlt', i === gewaehltesWort))
    }

    function setze(si, bi) {
      const s = stellen[si]
      if (s.bank !== null) loese(si)
      s.bank = bi
      bank[bi].knopf.disabled = true
      zeichneStelle(s)
    }

    function loese(si) {
      const s = stellen[si]
      if (s.bank === null) return
      bank[s.bank].knopf.disabled = false
      s.bank = null
      zeichneStelle(s)
    }

    function tippeLuecke(si) {
      if (gesperrt) return
      // Liegt ein Wort bereit, kommt es hinein und löst ein schon gesetztes ab; sonst nimmt der Tipp zurück
      if (gewaehltesWort > -1) { setze(si, gewaehltesWort); gewaehlteLuecke = -1; gewaehltesWort = -1 }
      else if (stellen[si].bank !== null) { loese(si); gewaehlteLuecke = -1 }
      else gewaehlteLuecke = gewaehlteLuecke === si ? -1 : si
      zeichneAuswahl()
      melde()
    }

    function tippeWort(bi) {
      if (gesperrt) return
      if (gewaehlteLuecke > -1) { setze(gewaehlteLuecke, bi); gewaehlteLuecke = -1; gewaehltesWort = -1 }
      else gewaehltesWort = gewaehltesWort === bi ? -1 : bi
      zeichneAuswahl()
      melde()
    }

    for (const [i, s] of stellen.entries()) {
      if (mitBank) {
        s.knopf = h('button.luecke.luecke--wahl', { type: 'button', onclick: () => tippeLuecke(i) })
        zeichneStelle(s)
        s.huelle.appendChild(s.knopf)
      } else {
        const laenge = Math.max(...s.loesungen.map((l) => l.length))
        // autocorrect gehört dazu: spellcheck="false" schaltet auf iOS nur die Rechtschreibprüfung ab,
        // nicht die Autokorrektur. Ohne das ersetzt Safari getippte Fachwörter (Hygienefaktoren, Tuckman)
        // und die richtige Antwort würde als falsch gewertet.
        s.feld = h('input.luecke.luecke--feld', {
          type: 'text', autocomplete: 'off', autocapitalize: 'off', autocorrect: 'off', spellcheck: 'false',
          inputmode: 'text', enterkeyhint: i === stellen.length - 1 ? 'done' : 'next',
          size: String(Math.max(7, Math.min(26, laenge + 2))),
          'aria-label': `Lücke ${s.nummer} von ${stellen.length}`,
          oninput: melde,
        })
        s.huelle.appendChild(s.feld)
      }
    }

    host.appendChild(absatz)

    // Hinweis und Wortbank helfen nur beim Ausfüllen und verschwinden mit der Prüfung wieder
    const werkzeuge = []
    if (mitBank) {
      const wortbank = h('div.wortbank', { role: 'group', 'aria-label': 'Wortbank' })
      for (const w of bank) {
        w.knopf = h('button.knopf.bankwort', { type: 'button', onclick: () => tippeWort(w.index) }, w.text)
        wortbank.appendChild(w.knopf)
      }
      werkzeuge.push(h('p.leise.lueckenhinweis', 'Tippe eine Lücke an und danach das passende Wort. Ein gesetztes Wort nimmst du mit einem Tipp darauf zurück. Nicht jedes Wort der Bank wird gebraucht.'), wortbank)
    } else {
      werkzeuge.push(h('p.leise.lueckenhinweis', 'Groß- und Kleinschreibung ist egal, Umlaute darfst du auch als ae, oe, ue schreiben.'))
    }
    host.append(...werkzeuge)

    melde()

    return {
      pruefen() {
        gesperrt = true
        let treffer = 0
        const gegeben = []
        for (const s of stellen) {
          const wert = mitBank ? (s.bank === null ? '' : bank[s.bank].text) : s.feld.value.trim()
          const gut = istRichtig(wert, s.loesungen)
          if (gut) treffer += 1
          gegeben.push(wert)
          const ziel = s.knopf || s.feld
          ziel.classList.remove('ist-gewaehlt')
          ziel.classList.add(gut ? 'ist-richtig' : 'ist-falsch')
          if (s.knopf) s.knopf.disabled = true
          if (s.feld) s.feld.readOnly = true
          s.huelle.appendChild(h('span.luecke__urteil' + (gut ? '.ist-richtig' : '.ist-falsch'),
            symbol(gut ? 'haken' : 'kreuz'), h('span.nur-vorleser', gut ? 'richtig' : 'nicht richtig')))
          // Bei jeder falschen Lücke steht die richtige Lösung daneben
          if (!gut) s.huelle.appendChild(h('span.marke-chip.marke-chip--gut.luecke__loesung', symbol('haken'), s.loesungen[0]))
        }
        for (const w of bank) w.knopf.disabled = true
        for (const el of werkzeuge) el.hidden = true
        return { punkte: treffer / stellen.length, antwort: gegeben.join(' / ') }
      },
    }
  },
}
