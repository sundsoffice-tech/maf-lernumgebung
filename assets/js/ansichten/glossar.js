// Ansicht "Glossar" (#/glossar): alle Fachbegriffe des Skripts von A bis Z, jeder mit der Erklärung laut
// Skript, der Folie und den Themen, in denen er vorkommt.
import { h, leeren, mini, symbol, folienText } from '../mini.js'

// Ä, Ö, Ü und ß stehen im Register bei A, O, U und S; alles ohne Buchstaben am Anfang sammelt sich unter #.
function anfangsbuchstabe(begriff) {
  const erstes = String(begriff || '').trim().charAt(0).toUpperCase()
  const ersatz = { 'Ä': 'A', 'Ö': 'O', 'Ü': 'U', 'ß': 'S' }[erstes] || erstes
  return /^[A-Z]$/.test(ersatz) ? ersatz : '#'
}

function vergleiche(a, b) {
  return String(a.begriff || '').localeCompare(String(b.begriff || ''), 'de', { sensitivity: 'base' })
}

export default {
  titel: 'Glossar',
  schmal: true,

  render(host, params, app) {
    const begriffe = (app.daten.glossar || []).slice().sort(vergleiche)

    host.appendChild(h('header.seitenkopf',
      h('p.seitenkopf__ueber', 'Register'),
      h('h1', 'Glossar'),
      h('p', 'Die Fachbegriffe aus dem Skript, kurz erklärt. Jeder Eintrag nennt die Folie und führt zu dem Thema, in dem er vorkommt.')))

    if (!begriffe.length) {
      host.appendChild(h('div.hinweiskasten',
        h('div.hinweiskasten__titel', 'Noch kein Eintrag'),
        h('p', 'Für diese Fassung liegt kein Glossar vor. Die Begriffe werden auf den Lernkarten der Themen erklärt, in denen sie vorkommen.'),
        h('p', h('a.knopf.knopf--klein', { href: '#/plan' }, symbol('lernen'), 'Zum Lernplan'))))
      return null
    }

    let suchtext = String(params.begriff || '')

    function passt(eintrag) {
      const s = suchtext.trim().toLowerCase()
      if (!s) return true
      return [eintrag.begriff, eintrag.text].some((t) => String(t || '').toLowerCase().includes(s))
    }

    function themenMarken(eintrag) {
      return (eintrag.themen || []).map((id) => {
        const th = app.daten.thema(id)
        return th ? h('a.marke-chip.marke-chip--thema', { href: '#/thema/' + th.id }, th.titel) : null
      })
    }

    function eintragEl(eintrag) {
      return h('div.glossar__eintrag',
        h('h3.glossar__begriff', eintrag.begriff),
        h('div.glossar__text', mini(eintrag.text)),
        h('div.zeile.register__marken',
          h('span.marke-chip.marke-chip--folie', folienText(eintrag.folien, eintrag.quelleText)),
          themenMarken(eintrag)))
    }

    const liste = h('div.glossar__liste')
    const zahl = h('p.leise.registerfilter__zahl', { role: 'status', 'aria-live': 'polite' })
    const leiste = h('nav.glossar__buchstaben', { 'aria-label': 'Zu einem Buchstaben springen' })

    // Jeder Buchstabe kennt seinen Abschnitt; ein Sprung ist reines Rollen, kein Wechsel der Adresse
    // (die Adresse trägt hier die Route).
    const buchstabenKnopf = new Map()
    const abschnitt = new Map()

    function zeichne() {
      const treffer = begriffe.filter(passt)
      const gruppen = new Map()
      for (const e of treffer) {
        const b = anfangsbuchstabe(e.begriff)
        if (!gruppen.has(b)) gruppen.set(b, [])
        gruppen.get(b).push(e)
      }
      const buchstaben = [...gruppen.keys()].sort((a, b) => (a === '#' ? 1 : b === '#' ? -1 : a.localeCompare(b, 'de')))

      leeren(liste)
      abschnitt.clear()
      if (!treffer.length) {
        liste.appendChild(h('div.hinweiskasten',
          h('p', 'Zu dieser Suche gibt es keinen Eintrag. Probiere ein kürzeres Wort oder sieh im Personenregister nach.'),
          h('div.zeile',
            h('button.knopf.knopf--klein', { type: 'button', onclick: () => leeresFeld() }, 'Suche zurücksetzen'),
            h('a.knopf.knopf--klein', { href: '#/personen' }, symbol('person'), 'Zum Personenregister'))))
      } else {
        for (const b of buchstaben) {
          const teil = h('section.glossar__gruppe', { 'aria-label': 'Begriffe mit ' + b },
            h('h2.glossar__buchstabe', { 'aria-hidden': 'true' }, b),
            h('div.glossar__gruppeninhalt', gruppen.get(b).map(eintragEl)))
          abschnitt.set(b, teil)
          liste.appendChild(teil)
        }
      }

      for (const [b, knopf] of buchstabenKnopf) {
        const da = gruppen.has(b)
        knopf.disabled = !da
        knopf.setAttribute('aria-disabled', da ? 'false' : 'true')
      }

      zahl.textContent = treffer.length === begriffe.length
        ? `${begriffe.length} Begriffe im Glossar`
        : `${treffer.length} von ${begriffe.length} Begriffen`
    }

    const suche = h('input.feld__eingabe', {
      type: 'search', id: 'glossar-suche', autocomplete: 'off', placeholder: 'Begriff oder Stichwort', value: suchtext,
    })
    suche.addEventListener('input', () => { suchtext = suche.value; zeichne() })

    function leeresFeld() {
      suchtext = ''
      suche.value = ''
      zeichne()
      suche.focus()
    }

    // Die Leiste zeigt alle Buchstaben, auch die ohne Eintrag: so bleibt sie beim Tippen an derselben Stelle.
    const alleBuchstaben = [...new Set(begriffe.map((e) => anfangsbuchstabe(e.begriff)))]
    const raster = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').concat(alleBuchstaben.includes('#') ? ['#'] : [])
    for (const b of raster) {
      const knopf = h('button.glossar__buchstaben-knopf', {
        type: 'button',
        onclick: () => {
          const ziel = abschnitt.get(b)
          if (ziel) ziel.scrollIntoView({ block: 'start', behavior: 'smooth' })
        },
      }, b)
      buchstabenKnopf.set(b, knopf)
      leiste.appendChild(knopf)
    }

    host.appendChild(h('div.registerfilter.registerfilter--eins',
      h('label.feld', { for: 'glossar-suche' }, h('span.feld__label', 'Suchen'), suche)))
    host.appendChild(leiste)
    host.appendChild(zahl)
    host.appendChild(liste)

    zeichne()
    return null
  },
}
