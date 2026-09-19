// Einsortieren ohne Ziehen: jedes Element steht als eigene Karte im Stapel, die Kategorien stehen als
// Knöpfe direkt darunter. Antippen ordnet ein, ein anderer Knopf ändert die Zuordnung, derselbe Knopf
// nimmt sie zurück. Der Fortschritt steht als Satz darüber ("3 von 6 einsortiert").
import { h, mini, mische, symbol, ohneAuszeichnung } from '../mini.js'

export default {
  typ: 'kategorien',
  selbstbewertung: false,

  render(host, item, api) {
    const kategorien = item.kategorien || []
    // Reihenfolge der Elemente mischen, damit der Wechsel der Kategorien in den Daten nicht mitgelernt wird.
    // Die Kategorie-Knöpfe bleiben in jeder Karte in derselben Reihenfolge.
    const reihe = mische((item.elemente || []).map((_, i) => i))
    const wahl = new Map() // Index des Elements -> Index der Kategorie
    let gesperrt = false

    const standText = h('p.ordnen__stand', { role: 'status', 'aria-live': 'polite' })
    const liste = h('ul.kategorienliste')

    const karten = new Map()
    reihe.forEach((index, pos) => {
      const el = item.elemente[index]
      const feldId = `kat-${item.id}-${index}`
      const knoepfe = kategorien.map((name, k) => h('button.knopf',
        { type: 'button', 'aria-pressed': 'false', dataset: { kategorie: String(k) }, onclick: () => tippe(index, k) },
        mini(name, { inline: true })))
      const karte = h('li.kategorienkarte', { dataset: { index: String(index) } },
        h('div.kategorienkarte__kopf',
          h('span.ordnen__marke', { 'aria-hidden': 'true' }, String(pos + 1)),
          h('span.kategorienkarte__text', { id: feldId }, mini(el.text, { inline: true }))),
        h('div.kategorienkarte__wahl', { role: 'group', 'aria-labelledby': feldId }, knoepfe))
      karten.set(index, { karte, knoepfe })
      liste.appendChild(karte)
    })

    host.append(standText, liste)

    function tippe(index, k) {
      if (gesperrt) return
      if (wahl.get(index) === k) wahl.delete(index)
      else wahl.set(index, k)
      zeichne()
    }

    function zeichne() {
      for (const [index, k] of karten) {
        const gewaehlt = wahl.has(index) ? wahl.get(index) : -1
        k.karte.classList.toggle('ist-eingeordnet', gewaehlt > -1)
        k.knoepfe.forEach((knopf, i) => {
          knopf.setAttribute('aria-pressed', i === gewaehlt ? 'true' : 'false')
          knopf.classList.toggle('ist-gewaehlt', i === gewaehlt)
        })
      }
      const gesamt = item.elemente.length
      const offen = gesamt - wahl.size
      standText.textContent = offen
        ? `${wahl.size} von ${gesamt} einsortiert, noch ${offen} offen.`
        : `${gesamt} von ${gesamt} einsortiert. Du kannst prüfen.`
      api.bereit(offen === 0)
    }

    zeichne()

    return {
      pruefen() {
        gesperrt = true
        let richtig = 0
        const gewaehlteTexte = []
        for (const [index, k] of karten) {
          const el = item.elemente[index]
          const gewaehlt = wahl.has(index) ? wahl.get(index) : -1
          const stimmt = gewaehlt === el.kategorie
          if (stimmt) richtig += 1
          if (gewaehlt > -1) gewaehlteTexte.push(`${ohneAuszeichnung(el.text)}: ${ohneAuszeichnung(kategorien[gewaehlt])}`)
          k.karte.classList.remove('ist-eingeordnet')
          k.karte.classList.add(stimmt ? 'ist-richtig' : 'ist-falsch')
          k.knoepfe.forEach((knopf, i) => {
            knopf.disabled = true
            knopf.classList.remove('ist-gewaehlt')
            // Richtig UND gewählt ist etwas anderes als richtig, aber nicht gewählt (verpasst)
            if (i === el.kategorie) knopf.classList.add(stimmt ? 'ist-richtig' : 'ist-verpasst')
            else if (i === gewaehlt) knopf.classList.add('ist-falsch')
          })
          k.karte.appendChild(h('p.ordnen__loesung' + (stimmt ? '.ordnen__loesung--gut' : '.ordnen__loesung--schlecht'),
            symbol(stimmt ? 'haken' : 'kreuz'),
            h('span', stimmt ? 'Richtig: ' : (gewaehlt > -1 ? 'Falsch. Richtig ist: ' : 'Nicht einsortiert. Richtig ist: '),
              h('b', mini(kategorien[el.kategorie] || '', { inline: true })))))
        }
        const gesamt = item.elemente.length
        standText.textContent = `${richtig} von ${gesamt} richtig einsortiert.`
        return {
          punkte: gesamt ? richtig / gesamt : 0,
          antwort: gewaehlteTexte.join('; '),
        }
      },
    }
  },
}
