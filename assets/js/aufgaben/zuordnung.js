// Zuordnen ohne Ziehen: einen Eintrag antippen, dann den Partner auf der anderen Seite. Das Paar bekommt
// dieselbe Nummer und dieselbe Farbe, und darunter steht es noch einmal als Satz ("A gehört zu B").
// Ein gepaarter Eintrag löst beim erneuten Antippen sein Paar wieder.
// Die linke Seite steht fest, die rechte startet gemischt und nie in der Lösungsreihenfolge.
import { h, mini, mischeAnders, symbol, ohneAuszeichnung, leeren } from '../mini.js'

export default {
  typ: 'zuordnung',
  selbstbewertung: false,

  render(host, item, api) {
    const paare = item.paare || []
    const rechtsReihe = mischeAnders(paare.map((_, i) => i))
    const zuordnung = new Map() // Index links -> Index rechts
    const rueck = new Map() // Index rechts -> Index links
    let aktiv = null // { seite: 'links' | 'rechts', i } oder null
    let gesperrt = false

    const eintraege = { links: new Map(), rechts: new Map() }

    function baueEintrag(seite, i, text) {
      const marke = h('span.ordnen__marke', { 'aria-hidden': 'true' })
      const stand = h('span.nur-vorleser')
      const knopf = h('button.zuordnung__eintrag',
        { type: 'button', dataset: { seite, i: String(i) }, onclick: () => tippe(seite, i) },
        marke, h('span.zuordnung__text', mini(text, { inline: true })), stand)
      const zeile = h('li', knopf)
      eintraege[seite].set(i, { knopf, marke, stand, zeile })
      return zeile
    }

    const linksListe = h('ul.zuordnung__liste.zuordnung__liste--links',
      paare.map((p, i) => baueEintrag('links', i, p.links)))
    const rechtsListe = h('ul.zuordnung__liste.zuordnung__liste--bank',
      rechtsReihe.map((i) => baueEintrag('rechts', i, paare[i].rechts)))

    const standText = h('p.ordnen__stand', { role: 'status', 'aria-live': 'polite' })
    const paarListe = h('ul.zuordnung__paare')

    host.append(
      h('div.zuordnung',
        h('div.zuordnung__spalte',
          h('p.zuordnung__titel', item.linksTitel || 'Diese Einträge'), linksListe),
        h('div.zuordnung__spalte',
          h('p.zuordnung__titel', item.rechtsTitel || 'Passt dazu'), rechtsListe)),
      h('div.zuordnung__ergebnis', standText, paarListe))

    /** Ein Eintrag wurde angetippt: Paar lösen, auswählen oder Paar schließen. */
    function tippe(seite, i) {
      if (gesperrt) return
      const istGepaart = seite === 'links' ? zuordnung.has(i) : rueck.has(i)
      if (istGepaart) {
        loese(seite, i)
        aktiv = null
      } else if (!aktiv) {
        aktiv = { seite, i }
      } else if (aktiv.seite === seite) {
        // Auf derselben Seite: die Auswahl wechselt (oder wird zurückgenommen)
        aktiv = aktiv.i === i ? null : { seite, i }
      } else {
        const links = aktiv.seite === 'links' ? aktiv.i : i
        const rechts = aktiv.seite === 'links' ? i : aktiv.i
        zuordnung.set(links, rechts)
        rueck.set(rechts, links)
        aktiv = null
      }
      zeichne()
    }

    function loese(seite, i) {
      const links = seite === 'links' ? i : rueck.get(i)
      const rechts = zuordnung.get(links)
      zuordnung.delete(links)
      rueck.delete(rechts)
    }

    // Die Paarnummer hängt am linken Eintrag und bleibt dadurch stabil, auch wenn Paare gelöst werden
    const nummerVon = (linksIndex) => ((linksIndex % 7) + 1)

    function schmuecke(seite, i) {
      const e = eintraege[seite].get(i)
      const linksIndex = seite === 'links' ? (zuordnung.has(i) ? i : -1) : (rueck.has(i) ? rueck.get(i) : -1)
      const gewaehlt = !!aktiv && aktiv.seite === seite && aktiv.i === i
      e.knopf.classList.toggle('ist-gewaehlt', gewaehlt)
      e.knopf.setAttribute('aria-pressed', gewaehlt ? 'true' : 'false')
      if (linksIndex > -1) {
        const nr = nummerVon(linksIndex)
        e.knopf.dataset.paar = String(nr)
        e.marke.textContent = String(nr)
        e.stand.textContent = ` – Paar ${nr}`
      } else {
        delete e.knopf.dataset.paar
        e.marke.textContent = ''
        e.stand.textContent = gewaehlt ? ' – ausgewählt, jetzt den Partner antippen' : ' – noch nicht zugeordnet'
      }
    }

    function zeichne() {
      for (const i of eintraege.links.keys()) schmuecke('links', i)
      for (const i of eintraege.rechts.keys()) schmuecke('rechts', i)

      leeren(paarListe)
      for (let i = 0; i < paare.length; i++) {
        if (!zuordnung.has(i)) continue
        paarListe.appendChild(h('li.zuordnung__paar', { dataset: { paar: String(nummerVon(i)) } },
          h('span.ordnen__marke', { 'aria-hidden': 'true' }, String(nummerVon(i))),
          h('span', mini(paare[i].links, { inline: true }), ' gehört zu ',
            mini(paare[zuordnung.get(i)].rechts, { inline: true }))))
      }

      const offen = paare.length - zuordnung.size
      standText.textContent = offen
        ? `${zuordnung.size} von ${paare.length} zugeordnet, noch ${offen} offen.`
        : `Alle ${paare.length} zugeordnet. Du kannst prüfen.`
      api.bereit(offen === 0)
    }

    zeichne()

    return {
      pruefen() {
        gesperrt = true
        aktiv = null
        let richtig = 0
        const gewaehlteTexte = []

        for (let i = 0; i < paare.length; i++) {
          const gewaehlt = zuordnung.has(i) ? zuordnung.get(i) : -1
          const stimmt = gewaehlt === i
          if (stimmt) richtig += 1
          if (gewaehlt > -1) {
            gewaehlteTexte.push(`${ohneAuszeichnung(paare[i].links)} → ${ohneAuszeichnung(paare[gewaehlt].rechts)}`)
          }
          const e = eintraege.links.get(i)
          e.knopf.classList.remove('ist-gewaehlt')
          e.knopf.classList.add(stimmt ? 'ist-richtig' : 'ist-falsch')
          e.zeile.appendChild(h('p.ordnen__loesung' + (stimmt ? '.ordnen__loesung--gut' : '.ordnen__loesung--schlecht'),
            symbol(stimmt ? 'haken' : 'kreuz'),
            h('span', stimmt ? 'Richtig: ' : (gewaehlt > -1 ? 'Falsch. Richtig ist: ' : 'Nicht zugeordnet. Richtig ist: '),
              h('b', mini(paare[i].rechts, { inline: true })))))
        }

        // Rechts: gewählt und richtig, gewählt und falsch, oder gar nicht gewählt, obwohl es gepasst hätte
        for (const [i, e] of eintraege.rechts) {
          e.knopf.classList.remove('ist-gewaehlt')
          if (rueck.has(i)) e.knopf.classList.add(rueck.get(i) === i ? 'ist-richtig' : 'ist-falsch')
          else e.knopf.classList.add('ist-verpasst')
        }
        for (const seite of ['links', 'rechts']) {
          for (const e of eintraege[seite].values()) e.knopf.disabled = true
        }

        standText.textContent = `${richtig} von ${paare.length} Paaren richtig.`
        return {
          punkte: paare.length ? richtig / paare.length : 0,
          antwort: gewaehlteTexte.join('; '),
        }
      },
    }
  },
}
