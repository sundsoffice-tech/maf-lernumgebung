// Mehrfachauswahl mit Kästchen. Aufbau wie mc.js, nur dass mehrere Antworten richtig sein können.
// Bewertung laut Vertrag 4.5: (richtig gesetzte minus falsch gesetzte) geteilt durch die Zahl der richtigen,
// mindestens 0. Wer alles ankreuzt, gewinnt dadurch nichts.
import { h, mini, mische, symbol } from '../mini.js'

export default {
  typ: 'mehrfach',
  selbstbewertung: false,

  render(host, item, api) {
    const richtige = new Set(item.richtig || [])
    const reihenfolge = mische(item.optionen.map((_, i) => i))
    const gewaehlt = new Set()
    const liste = h('div.optionen.optionen--mehrfach', { role: 'group', 'aria-labelledby': 'frage-' + item.id })

    const zeilen = reihenfolge.map((index) => {
      const eingabe = h('input.nur-vorleser', { type: 'checkbox', value: String(index) })
      const zeile = h('label.option', eingabe,
        h('span.option__marke', { 'aria-hidden': 'true' }),
        h('span.option__text', mini(item.optionen[index], { inline: true })))
      eingabe.addEventListener('change', () => {
        if (eingabe.checked) gewaehlt.add(index)
        else gewaehlt.delete(index)
        zeile.classList.toggle('ist-gewaehlt', eingabe.checked)
        api.bereit(gewaehlt.size > 0)
      })
      liste.appendChild(zeile)
      return { index, zeile, eingabe }
    })
    host.append(h('p.leise.optionen__hinweis', 'Mehrere Antworten können richtig sein.'), liste)

    return {
      pruefen() {
        let treffer = 0
        let daneben = 0
        for (const z of zeilen) {
          z.eingabe.disabled = true
          const istRichtig = richtige.has(z.index)
          const istGewaehlt = gewaehlt.has(z.index)
          if (istRichtig && istGewaehlt) { treffer += 1; z.zeile.classList.add('ist-richtig') }
          else if (istRichtig) z.zeile.classList.add('ist-verpasst')
          else if (istGewaehlt) { daneben += 1; z.zeile.classList.add('ist-falsch') }
          if (!istRichtig && !istGewaehlt) continue
          z.zeile.appendChild(h('span.option__urteil', symbol(istRichtig ? 'haken' : 'kreuz'),
            h('span.nur-vorleser', istRichtig && istGewaehlt ? 'richtig und von dir gewählt'
              : istRichtig ? 'richtig, aber von dir nicht gewählt' : 'deine Antwort, nicht richtig')))
        }
        const punkte = Math.max(0, (treffer - daneben) / (richtige.size || 1))
        const antwort = [...gewaehlt].sort((a, b) => a - b).map((i) => item.optionen[i]).join('; ')
        return { punkte, antwort }
      },
    }
  },
}
