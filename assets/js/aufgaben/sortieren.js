// Reihenfolge ohne Ziehen: je Zeile ein Knopf nach oben und nach unten, dazu verschieben die Pfeiltasten
// die Zeile, auf der der Fokus steht. Die Liste startet gemischt und nie in der richtigen Reihenfolge.
// item.elemente steht bereits in der richtigen Reihenfolge; der Index eines Elements ist also sein Sollplatz.
import { h, mini, mischeAnders, symbol, ohneAuszeichnung } from '../mini.js'

export default {
  typ: 'sortieren',
  selbstbewertung: false,

  render(host, item, api) {
    const elemente = item.elemente || []
    const reihenfolge = mischeAnders(elemente.map((_, i) => i))
    let bewegt = false
    let gesperrt = false

    const zeilen = elemente.map((text, i) => {
      const marke = h('span.ordnen__marke', { 'aria-hidden': 'true' })
      const hoch = h('button.knopf.sortierzeile__knopf', {
        type: 'button', dataset: { richtung: 'auf' },
        'aria-label': `${ohneAuszeichnung(text)} nach oben`,
        onclick: () => verschiebe(i, -1),
      }, symbol('auf'))
      const runter = h('button.knopf.sortierzeile__knopf', {
        type: 'button', dataset: { richtung: 'ab' },
        'aria-label': `${ohneAuszeichnung(text)} nach unten`,
        onclick: () => verschiebe(i, 1),
      }, symbol('ab'))
      const li = h('li.sortierzeile', { dataset: { index: String(i) }, tabindex: '0' },
        marke,
        h('span.sortierzeile__text', mini(text, { inline: true })),
        h('span.sortierzeile__knoepfe', hoch, runter))
      return { li, marke, hoch, runter }
    })

    const liste = h('ol.sortierliste', { 'aria-label': 'Reihenfolge, mit den Pfeiltasten verschiebbar' })
    const standText = h('p.ordnen__stand', { role: 'status', 'aria-live': 'polite' })
    // Wird aus dem DOM genommen, sobald er überflüssig ist: das Attribut "hidden" setzt sich nicht gegen
    // die eigene display-Regel der Klasse .knopf durch.
    const stimmtSo = h('button.knopf', { type: 'button', onclick: () => bestaetige() },
      symbol('haken'), 'Reihenfolge stimmt so')

    host.append(
      h('p.leise.sortieren__hinweis', 'Tippe die Pfeile an oder nutze die Pfeiltasten auf der Zeile, bis die Reihenfolge stimmt.'),
      liste,
      h('div.sortieren__knoepfe', stimmtSo),
      standText)

    // Pfeiltasten auf der Zeile (das Ereignis steigt auch von den Knöpfen in der Zeile auf)
    liste.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return
      const li = e.target.closest ? e.target.closest('li.sortierzeile') : null
      if (!li) return
      e.preventDefault()
      verschiebe(Number(li.dataset.index), e.key === 'ArrowUp' ? -1 : 1)
    })

    function verschiebe(index, richtung) {
      if (gesperrt) return
      const pos = reihenfolge.indexOf(index)
      const ziel = pos + richtung
      if (ziel < 0 || ziel >= reihenfolge.length) return
      reihenfolge.splice(pos, 1)
      reihenfolge.splice(ziel, 0, index)
      if (!bewegt) { bewegt = true; stimmtSo.remove() }
      ordneNeu(index)
      standText.textContent = `${ohneAuszeichnung(elemente[index])} steht jetzt auf Platz ${ziel + 1} von ${reihenfolge.length}.`
      api.bereit(true)
    }

    function bestaetige() {
      if (gesperrt) return
      stimmtSo.remove()
      standText.textContent = 'Die angezeigte Reihenfolge gilt als deine Antwort. Du kannst prüfen.'
      api.bereit(true)
    }

    /** Zeilen in die neue Reihenfolge bringen. Der Fokus bleibt dort, wo er war. */
    function ordneNeu(zuletzt) {
      const vorher = typeof document !== 'undefined' ? document.activeElement : null
      for (const index of reihenfolge) liste.appendChild(zeilen[index].li)
      reihenfolge.forEach((index, pos) => {
        const z = zeilen[index]
        z.marke.textContent = String(pos + 1)
        z.hoch.disabled = gesperrt || pos === 0
        z.runter.disabled = gesperrt || pos === reihenfolge.length - 1
        z.li.classList.toggle('ist-bewegt', !gesperrt && index === zuletzt)
      })
      if (vorher && liste.contains(vorher)) {
        // Am Rand wird der gedrückte Knopf gesperrt; dann übernimmt die Zeile selbst den Fokus
        const ziel = vorher.disabled ? vorher.closest('li.sortierzeile') : vorher
        if (ziel && typeof ziel.focus === 'function') ziel.focus()
      }
    }

    ordneNeu(-1)
    standText.textContent = `${elemente.length} Schritte in zufälliger Reihenfolge.`
    api.bereit(false)

    return {
      pruefen() {
        gesperrt = true
        stimmtSo.remove()
        let richtig = 0
        reihenfolge.forEach((index, pos) => {
          const stimmt = index === pos
          if (stimmt) richtig += 1
          const z = zeilen[index]
          z.hoch.disabled = true
          z.runter.disabled = true
          z.li.classList.remove('ist-bewegt')
          z.li.classList.add(stimmt ? 'ist-richtig' : 'ist-falsch')
          z.li.appendChild(h('p.ordnen__loesung.sortierzeile__loesung' + (stimmt ? '.ordnen__loesung--gut' : '.ordnen__loesung--schlecht'),
            symbol(stimmt ? 'haken' : 'kreuz'),
            h('span', stimmt ? 'Richtig auf Platz ' : 'Richtig wäre Platz ', h('b', String(index + 1)))))
        })
        standText.textContent = `${richtig} von ${elemente.length} an der richtigen Stelle.`
        return {
          punkte: elemente.length ? richtig / elemente.length : 0,
          antwort: reihenfolge.map((i) => ohneAuszeichnung(elemente[i])).join(' → '),
        }
      },
    }
  },
}
