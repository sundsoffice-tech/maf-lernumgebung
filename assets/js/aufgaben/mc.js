// Einfachauswahl. Referenz für alle geprüften Typen: Eingabe melden (api.bereit), bei pruefen() die Lösung im
// eigenen DOM markieren, Eingaben sperren und {punkte, antwort} zurückgeben.
import { h, mini, mische, symbol } from '../mini.js'

export default {
  typ: 'mc',
  selbstbewertung: false,

  render(host, item, api) {
    // Reihenfolge der Optionen mischen, damit die Position nicht mitgelernt wird
    const reihenfolge = mische(item.optionen.map((_, i) => i))
    let gewaehlt = -1
    const name = 'mc-' + item.id
    const liste = h('div.optionen', { role: 'radiogroup' })

    const zeilen = reihenfolge.map((index) => {
      const eingabe = h('input.nur-vorleser', { type: 'radio', name, value: String(index) })
      const zeile = h('label.option', eingabe,
        h('span.option__marke', { 'aria-hidden': 'true' }),
        h('span.option__text', mini(item.optionen[index], { inline: true })))
      eingabe.addEventListener('change', () => {
        gewaehlt = index
        for (const z of zeilen) z.zeile.classList.toggle('ist-gewaehlt', z.index === gewaehlt)
        api.bereit(true)
      })
      liste.appendChild(zeile)
      return { index, zeile, eingabe }
    })
    host.appendChild(liste)

    return {
      pruefen() {
        for (const z of zeilen) {
          z.eingabe.disabled = true
          const richtig = z.index === item.richtig
          if (richtig) z.zeile.classList.add(z.index === gewaehlt ? 'ist-richtig' : 'ist-verpasst')
          else if (z.index === gewaehlt) z.zeile.classList.add('ist-falsch')
          if (richtig || z.index === gewaehlt) {
            z.zeile.appendChild(h('span.option__urteil', symbol(richtig ? 'haken' : 'kreuz'),
              h('span.nur-vorleser', richtig ? 'richtige Antwort' : 'deine Antwort, nicht richtig')))
          }
        }
        return { punkte: gewaehlt === item.richtig ? 1 : 0, antwort: gewaehlt > -1 ? item.optionen[gewaehlt] : '' }
      },
    }
  },
}
