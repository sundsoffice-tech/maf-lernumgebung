// Wahr oder falsch: je Aussage zwei große Schalter. Die Aussagen bleiben in der Reihenfolge der Daten,
// weil sie aufeinander aufbauen können. Abgeben ist erst möglich, wenn jede Aussage beantwortet ist.
// Nach dem Prüfen steht unter jeder unwahren oder falsch eingeschätzten Aussage die Korrektur aus den Daten.
import { h, mini, symbol } from '../mini.js'

export default {
  typ: 'wahrfalsch',
  selbstbewertung: false,

  render(host, item, api) {
    const aussagen = item.aussagen || []
    const antworten = aussagen.map(() => null)
    const liste = h('div.optionen', { role: 'group', 'aria-labelledby': 'frage-' + item.id })

    const zeilen = aussagen.map((aussage, i) => {
      const schalter = h('div.option__schalter')
      const text = h('span.option__text', { id: `aussage-${item.id}-${i}` }, mini(aussage.text, { inline: true }))
      const zeile = h('div.option.option--aussage', text, schalter)
      const knoepfe = [true, false].map((wert) => {
        const knopf = h('button.knopf', { type: 'button', 'aria-pressed': 'false', 'aria-describedby': `aussage-${item.id}-${i}` },
          wert ? 'Stimmt' : 'Stimmt nicht')
        knopf.addEventListener('click', () => {
          antworten[i] = wert
          for (const k of knoepfe) {
            const aktiv = k === knopf
            k.classList.toggle('ist-gewaehlt', aktiv)
            k.setAttribute('aria-pressed', String(aktiv))
          }
          api.bereit(antworten.every((a) => a !== null))
        })
        schalter.appendChild(knopf)
        return knopf
      })
      liste.appendChild(zeile)
      return { aussage, zeile, schalter, knoepfe, i }
    })
    host.appendChild(liste)

    return {
      pruefen() {
        let treffer = 0
        for (const z of zeilen) {
          for (const k of z.knoepfe) k.disabled = true
          const richtig = antworten[z.i] === !!z.aussage.wahr
          if (richtig) treffer += 1
          z.zeile.classList.add(richtig ? 'ist-richtig' : 'ist-falsch')
          // Urteil vor die Schalter, damit es schmal noch neben der Aussage steht
          z.zeile.insertBefore(h('span.option__urteil', symbol(richtig ? 'haken' : 'kreuz'),
            h('span.nur-vorleser', richtig ? 'richtig eingeschätzt' : 'nicht richtig eingeschätzt')), z.schalter)
          if (z.aussage.wahr && richtig) continue
          z.zeile.appendChild(h('div.option__korrektur',
            h('strong', z.aussage.wahr ? 'Die Aussage stimmt.' : 'Die Aussage stimmt nicht.'),
            z.aussage.korrektur ? mini(z.aussage.korrektur, { inline: true }) : null))
        }
        const punkte = aussagen.length ? treffer / aussagen.length : 0
        return { punkte, antwort: `${treffer} von ${aussagen.length} Aussagen richtig eingeschätzt` }
      },
    }
  },
}
