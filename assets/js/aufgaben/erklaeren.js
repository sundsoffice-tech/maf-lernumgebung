// Offene Erklär-Aufgabe: erst selbst formulieren (tippen oder laut sagen), dann Musterlösung aufdecken und
// die Kernpunkte abhaken. Referenz für alle selbstbewerteten Typen: am Ende api.fertig({punkte, sicher}).
import { h, mini } from '../mini.js'

export default {
  typ: 'erklaeren',
  selbstbewertung: true,

  render(host, item, api) {
    const feldId = 'antwort-' + item.id
    // Satzanfänge groß ist hier gewollt, die Autokorrektur nicht: iOS ersetzt sonst die Fachwörter,
    // während die Antwort entsteht. spellcheck="false" allein schaltet die Autokorrektur nicht ab.
    const eingabe = h('textarea', {
      id: feldId, rows: 5,
      autocapitalize: 'sentences', autocorrect: 'off', spellcheck: 'false', enterkeyhint: 'enter',
      placeholder: 'Formuliere deine Antwort in ganzen Sätzen, so wie in der Klausur. Stichpunkte reichen zur Not auch.',
    })
    const aufdecken = h('button.knopf.knopf--primaer', { type: 'button' }, 'Musterlösung aufdecken')
    const stufe1 = h('div.stapel',
      h('label.feld', { for: feldId }, h('span.feld__label', 'Deine Erklärung'), eingabe),
      h('p.leise', 'Tipp: erst schreiben oder laut erklären, dann aufdecken. Wer sofort aufdeckt, prüft nur sein Wiedererkennen.'),
      aufdecken)
    const stufe2 = h('div.stapel', { hidden: true })
    host.append(stufe1, stufe2)

    aufdecken.addEventListener('click', () => {
      eingabe.readOnly = true
      aufdecken.hidden = true
      const kaestchen = (item.checkliste || []).map((punkt, i) => {
        const box = h('input', { type: 'checkbox', id: `${feldId}-p${i}` })
        return { box, zeile: h('label.checkpunkt', { for: `${feldId}-p${i}` }, box, h('span', mini(punkt, { inline: true }))) }
      })
      const fertig = (sicher) => {
        const gesamt = kaestchen.length || 1
        const treffer = kaestchen.filter((k) => k.box.checked).length
        for (const k of kaestchen) { k.box.disabled = true; k.zeile.classList.add(k.box.checked ? 'ist-richtig' : 'ist-verpasst') }
        abschluss.hidden = true
        api.fertig({ punkte: kaestchen.length ? treffer / gesamt : (sicher === 'sicher' ? 1 : 0.5), sicher, antwort: eingabe.value.trim() })
      }
      const abschluss = h('div.aufgabe__abgabeknoepfe',
        h('button.knopf.knopf--primaer', { type: 'button', onclick: () => fertig('sicher') }, 'Übernehmen, das hätte ich sicher so geschrieben'),
        h('button.knopf', { type: 'button', onclick: () => fertig('unsicher') }, 'Übernehmen, ich war unsicher'))
      stufe2.append(
        h('div.hinweiskasten.hinweiskasten--primaer', h('div.hinweiskasten__titel', 'Musterlösung nach dem Skript'), mini(item.musterloesung || '')),
        h('fieldset.checkliste', h('legend', 'Welche Kernpunkte stecken in deiner Antwort? Sei ehrlich zu dir.'), kaestchen.map((k) => k.zeile)),
        abschluss)
      stufe2.hidden = false
      stufe2.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    })

    return {}
  },
}
