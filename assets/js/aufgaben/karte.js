// Karteikarte: Vorderseite lesen, selbst antworten, umdrehen, dann ehrlich einschätzen.
// Selbstbewertung laut Vertrag 5.2: der Renderer führt selbst durch und meldet das Ergebnis über api.fertig.
// "Gewusst, aber unsicher" zählt als richtig, hält die Karte aber in einem kurzen Wiederholungsabstand.
import { h, mini, symbol } from '../mini.js'

const URTEILE = [
  { text: 'Gewusst und sicher', punkte: 1, sicher: 'sicher', klasse: '.knopf--primaer' },
  { text: 'Gewusst, aber unsicher', punkte: 1, sicher: 'unsicher', klasse: '' },
  { text: 'Nicht gewusst', punkte: 0, sicher: 'unsicher', klasse: '' },
]

export default {
  typ: 'karte',
  selbstbewertung: true,

  render(host, item, api) {
    const umdrehen = h('button.knopf.knopf--primaer', { type: 'button' }, symbol('wiederholen'), 'Umdrehen')
    const stufe1 = h('div.stapel',
      h('div.hinweiskasten.aufgabe__karteikarte', h('div.hinweiskasten__titel', 'Vorderseite'), mini(item.vorne || '')),
      h('p.leise', 'Sag die Antwort erst laut oder denk sie zu Ende. Erst dann umdrehen.'),
      umdrehen)
    const stufe2 = h('div.stapel', { hidden: true })
    host.append(stufe1, stufe2)

    umdrehen.addEventListener('click', () => {
      umdrehen.hidden = true
      const knoepfe = h('div.aufgabe__abgabeknoepfe',
        URTEILE.map((u) => h('button.knopf' + u.klasse, {
          type: 'button',
          onclick: () => { knoepfe.hidden = true; api.fertig({ punkte: u.punkte, sicher: u.sicher, antwort: u.text }) },
        }, u.text)))
      stufe2.append(
        h('div.hinweiskasten.hinweiskasten--primaer.aufgabe__karteikarte',
          h('div.hinweiskasten__titel', 'Rückseite'), mini(item.hinten || '')),
        h('p.leise.aufgabe__abgabehinweis', 'Wie sicher war das? Das steuert, wann die Karte wiederkommt.'),
        knoepfe)
      stufe2.hidden = false
      requestAnimationFrame(() => {
        knoepfe.querySelector('button').focus({ preventScroll: true })
        stufe2.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      })
    })

    return {}
  },
}
