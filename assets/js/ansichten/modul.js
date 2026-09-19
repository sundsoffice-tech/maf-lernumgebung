// Ansicht "Modul": Überblick über eine Vorlesung. Zeigt, wie viel davon sitzt, wie viel Zeit sie gekostet hat
// und welche Themen offen sind. Gerechnet wird hier nichts: alle Zahlen kommen aus app.modell.
import { h, symbol, minutenText, prozent, folienText } from '../mini.js'
import { statusText } from '../lernmodell.js'

const RING_FARBE = { gut: 'var(--gut)', mittel: 'var(--mittel)', schlecht: 'var(--schlecht)', offen: 'var(--linie-stark)' }

// Der Modulkopf trägt laut Vertrag einen Folien-BEREICH ([von, bis]), keine Folienliste wie Themen und Aufgaben.
function folienbereich(folien) {
  if (!folien || !folien.length) return 'Skript'
  const von = folien[0]
  const bis = folien[folien.length - 1]
  return von === bis ? 'Folie ' + von : `Folien ${von}–${bis}`
}

// Beherrschung als Balken, dahinter blass die Abdeckung: wie viel vom Stoff überhaupt schon angefasst wurde.
function balken(stand) {
  return h('div.balken.balken--' + stand.status, { role: 'img', 'aria-label': `${prozent(stand.wert)} Prozent, ${statusText(stand.status)}` },
    h('div.balken__schatten', { style: `width:${prozent(stand.abdeckung)}%` }),
    h('div.balken__wert', { style: `width:${prozent(stand.wert)}%` }))
}

function kennzahl(titel, wert, zusatz) {
  return h('div.kennzahl',
    h('div.kennzahl__titel', titel),
    h('div.kennzahl__wert.zahl', wert),
    zusatz ? h('div.kennzahl__zusatz', zusatz) : null)
}

function themaEintrag(thema, app) {
  const stand = app.modell.themaStand(thema)
  const karten = app.modell.kartenStand(thema)
  const faelligText = stand.faellig === 1 ? '1 Wiederholung fällig' : `${stand.faellig} Wiederholungen fällig`
  return h('li',
    h('a.eintrag', { href: '#/thema/' + thema.id },
      h('div.eintrag__haupt',
        h('div.eintrag__titel', thema.titel),
        h('div.zeile.eintrag__marken',
          thema.lernstoff ? h('span.marke-chip.marke-chip--lernstoff', 'Lernstoff laut Skript') : null,
          h('span.marke-chip.marke-chip--folie', folienText(thema.folien, thema.quelleText)),
          stand.faellig ? h('span.marke-chip.marke-chip--mittel', faelligText) : null)),
      h('div.eintrag__rechts',
        h('span.ampel.ampel--' + stand.status, statusText(stand.status)),
        symbol('weiter', { class: 'eintrag__pfeil' })),
      h('div.eintrag__neben',
        `${stand.gesehen} von ${stand.gesamt} Aufgaben`,
        karten.gesamt ? ` · ${karten.gelesen} von ${karten.gesamt} ${karten.gesamt === 1 ? 'Lernkarte' : 'Lernkarten'}` : null),
      h('div.eintrag__balken', balken(stand))))
}

export default {
  titel: 'Modul',

  render(host, params, app) {
    const modul = app.daten.modul(params.id)
    if (!modul) {
      host.appendChild(h('div.hinweiskasten.hinweiskasten--mittel',
        h('div.hinweiskasten__titel', 'Modul nicht gefunden'),
        h('p', 'Dieses Modul gibt es in dieser Fassung nicht.'),
        h('p', h('a.knopf', { href: '#/plan' }, 'Zum Lernplan'))))
      return null
    }

    // Zeit, die auf dieser Seite vergeht, gehört diesem Modul (app.js setzt das vor jeder Ansicht zurück).
    app.zeit.setzeModul(modul.id)

    const themen = modul.themen || []
    const stand = app.modell.modulStand(modul)
    const rest = app.modell.restzeitMin(modul)

    host.appendChild(h('nav.brotkrumen', { 'aria-label': 'Wo du gerade bist' },
      h('a', { href: '#/plan' }, 'Lernplan'), ' › ', modul.titel))

    host.appendChild(h('header.seitenkopf',
      h('p.seitenkopf__ueber', [modul.vorlesung, folienbereich(modul.folien)].filter(Boolean).join(' · ')),
      h('h1', modul.titel),
      h('p', modul.kurz || 'Arbeite die Themen der Reihe nach durch. Jedes Thema beginnt mit den Lernkarten.')))

    // Die genutzte Zeit läuft weiter, solange die Seite offen ist, und wird im Takt der Zeitmessung nachgezogen.
    const genutzt = h('div.kennzahl__wert.zahl', minutenText(app.zeit.modulMin(modul.id)))

    host.appendChild(h('section.karte.modulstand', { 'aria-label': 'Stand dieses Moduls' },
      h('div.ring', {
        style: `--wert:${prozent(stand.wert)};--farbe:${RING_FARBE[stand.status] || 'var(--primaer)'}`,
        role: 'img', 'aria-label': `Stand ${prozent(stand.wert)} Prozent, ${statusText(stand.status)}`,
      }, h('div.ring__innen', h('span.ring__zahl', prozent(stand.wert) + '%'), h('span.ring__text', 'Stand'))),
      h('div.modulstand__zahlen',
        h('div.zeile',
          h('span.ampel.ampel--' + stand.status, statusText(stand.status)),
          stand.faellig ? h('span.marke-chip.marke-chip--mittel', `${stand.faellig} fällig`) : null),
        h('div.kennzahlen',
          kennzahl('Themen', `${stand.fertigeThemen} von ${stand.themen}`, 'durchgearbeitet'),
          kennzahl('Aufgaben', `${stand.gesehen} von ${stand.gesamt}`, 'bearbeitet'),
          kennzahl('Planzeit', minutenText(modul.zeitMin || 0),
            rest >= 1 ? 'noch rund ' + minutenText(rest) : 'erster Durchgang erledigt'),
          h('div.kennzahl',
            h('div.kennzahl__titel', 'Davon genutzt'),
            genutzt,
            h('div.kennzahl__zusatz', 'aktive Lernzeit')))),
      stand.gesamt
        ? h('a.knopf.knopf--primaer.modulstand__knopf', { href: '#/training?modul=' + modul.id },
          symbol('wiederholen'), 'Modul trainieren')
        : null))

    host.appendChild(h('h2.themenliste__titel', 'Themen'))
    if (!themen.length) {
      host.appendChild(h('div.hinweiskasten', h('p', 'Für dieses Modul liegen noch keine Themen vor.')))
    } else {
      host.appendChild(h('p.leise.themenliste__hinweis', 'Reihenfolge wie im Skript. Der Balken zeigt, wie sicher das Thema sitzt; blass dahinter, wie viel du davon schon bearbeitet hast.'))
      host.appendChild(h('ul.eintragsliste.themenliste', themen.map((th) => themaEintrag(th, app))))
    }

    const abmelden = app.zeit.beiTakt(() => { genutzt.textContent = minutenText(app.zeit.modulMin(modul.id)) })
    return () => abmelden()
  },
}
