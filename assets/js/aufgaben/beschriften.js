// Abbildung beschriften: die abfragbaren Beschriftungen des Diagramms verschwinden hinter nummerierten
// Marken, darunter wählt man je Nummer aus der Wortbank. Das native Auswahlfeld ist auf dem Handy der
// bequemste Weg und braucht kein Ziehen.
import { h, mische, symbol } from '../mini.js'
import { holeDiagramm, abfragbareLabels, renderDiagramm } from '../diagramme/index.js'

// Zugriff auf den Diagrammkatalog. Im Kurs immer der echte Katalog; der Test hängt hier ein Testdiagramm ein,
// weil ein Testdiagramm nichts im Katalog des Kurses zu suchen hat.
export const diagrammZugriff = { holeDiagramm, abfragbareLabels, renderDiagramm }

const HOECHSTENS = 8

export default {
  typ: 'beschriften',
  selbstbewertung: false,

  render(host, item, api) {
    const diagramm = diagrammZugriff.holeDiagramm(item.diagramm)
    const labels = diagrammZugriff.abfragbareLabels(item.diagramm, item.gruppe)

    // Die Abbildung kann fehlen oder noch keine abfragbaren Beschriftungen tragen. Dann wird nicht gewertet.
    if (!diagramm || !diagramm.svg || !labels.length) {
      host.classList.add('beschriften-nur-hinweis')
      host.appendChild(h('div.hinweiskasten.hinweiskasten--mittel',
        h('p', 'Die Abbildung zu dieser Aufgabe steht in dieser Fassung noch nicht bereit. Die Aufgabe wird übersprungen und nicht gewertet.'),
        // nichtWerten: die Aufgabe verlässt die Schlange, ohne im Lernstand als gekonnt zu gelten
        h('button.knopf', { type: 'button', onclick: () => api.fertig({ nichtWerten: true }) }, 'Überspringen')))
      return {}
    }

    const gefragt = mische(labels).slice(0, HOECHSTENS)
    const verdeckt = new Map(gefragt.map((l, i) => [l.id, i + 1]))
    const huelle = diagrammZugriff.renderDiagramm(item.diagramm, { verdeckt })
    const bank = mische(gefragt.map((l) => l.text))

    const zeilen = gefragt.map((label, i) => {
      const nummer = i + 1
      const feldId = `beschriften-${item.id}-${nummer}`
      const auswahl = h('select.beschriftung__auswahl', { id: feldId, onchange: () => melde() },
        h('option', { value: '' }, 'bitte wählen'),
        bank.map((text) => h('option', { value: text }, text)))
      const zeile = h('div.beschriftung',
        h('label.beschriftung__nummer', { for: feldId },
          String(nummer), h('span.nur-vorleser', `. Beschriftung für Marke ${nummer} in der Abbildung`)),
        auswahl)
      return { label, nummer, auswahl, zeile }
    })

    const melde = () => api.bereit(zeilen.every((z) => z.auswahl.value !== ''))

    host.append(huelle,
      h('p.leise.lueckenhinweis', 'Jede Nummer in der Abbildung steht für eine Beschriftung. Wähle sie unten aus.'),
      h('div.beschriftungen', zeilen.map((z) => z.zeile)))
    melde()

    return {
      pruefen() {
        let treffer = 0
        for (const z of zeilen) {
          const gut = z.auswahl.value === z.label.text
          if (gut) treffer += 1
          z.auswahl.disabled = true
          z.zeile.classList.add(gut ? 'ist-richtig' : 'ist-falsch')
          z.zeile.appendChild(h('span.beschriftung__urteil', symbol(gut ? 'haken' : 'kreuz'),
            h('span.nur-vorleser', gut ? 'richtig' : 'nicht richtig')))
          // Bei jeder falschen Nummer steht die richtige Beschriftung daneben
          if (!gut) z.zeile.appendChild(h('span.marke-chip.marke-chip--gut.beschriftung__loesung', symbol('haken'), z.label.text))
          const marke = huelle.querySelector(`[data-marke="${z.nummer}"]`)
          if (marke) marke.classList.add(gut ? 'ist-richtig' : 'ist-falsch')
        }
        return {
          punkte: treffer / zeilen.length,
          antwort: zeilen.map((z) => `${z.nummer}: ${z.auswahl.value || '—'}`).join(', '),
        }
      },
    }
  },
}
