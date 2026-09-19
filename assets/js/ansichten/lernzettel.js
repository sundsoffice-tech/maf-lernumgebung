// Lernzettel (#/lernzettel): ein Dokument für die letzte Wiederholung vor der Klausur, nicht die Webseite
// noch einmal. Auf dem Bildschirm steht eine Werkzeugleiste darüber, gedruckt wird nur das Dokument (A4 hoch).
// Alles, was Stand ist, kommt aus app.modell: welcher Modus je Thema passt, welche Themen am schwächsten sind
// und wo es gehakt hat. Die Ansicht rechnet nichts selbst.
//
// Parameter: modus=persoenlich|kompakt|ausfuehrlich, druck=1 (ohne Werkzeugleiste, helles Thema erzwungen).
import { h, mini, folienText, symbol } from '../mini.js'
import { statusText } from '../lernmodell.js'

const PDF_PFAD = 'lernzettel/MAF-Lernzettel.pdf'
const ZUERST_MAX = 8

const MODI = [
  { id: 'persoenlich', text: 'Persönlich' },
  { id: 'kompakt', text: 'Kompakt' },
  { id: 'ausfuehrlich', text: 'Ausführlich' },
]
const MODUS_SATZ = {
  persoenlich: 'Je Thema entscheidet dein Lernstand, wie viel hier steht.',
  kompakt: 'Alle Themen kurz, unabhängig von deinem Lernstand.',
  ausfuehrlich: 'Alle Themen ausführlich, mit Merkhilfen und deinen Stolperstellen.',
}

const ANLEITUNG = [
  ['Windows und Mac', 'Auf „Als PDF speichern oder drucken“ tippen. Im Druckfenster bei Ziel oder Drucker „Als PDF speichern“ wählen und speichern. Wenn du Seitenzahlen möchtest, schalte dort „Kopf- und Fußzeilen“ ein.'],
  ['iPhone und iPad', 'Auf „Als PDF speichern oder drucken“ tippen, dann in der Vorschau mit zwei Fingern aufziehen. Jetzt oben auf das Teilen-Zeichen tippen und „In Dateien sichern“ wählen.'],
  ['Android', 'Auf „Als PDF speichern oder drucken“ tippen. Oben beim Drucker „Als PDF speichern“ wählen und auf das Speichern-Zeichen tippen.'],
]

function datumText() {
  try {
    return new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())
  } catch (e) {
    return new Date().toLocaleDateString()
  }
}

function modusAus(params) {
  const gewuenscht = String(params.modus || 'persoenlich')
  return MODI.some((m) => m.id === gewuenscht) ? gewuenscht : 'persoenlich'
}

/** Die Zeilen eines Themas im gewünschten Modus; fehlt die Fassung, wird die andere genommen. */
function zeilenFuer(thema, modus) {
  const lz = thema.lernzettel || {}
  const eigen = Array.isArray(lz[modus]) ? lz[modus] : []
  if (eigen.length) return eigen
  const andere = modus === 'kompakt' ? lz.ausfuehrlich : lz.kompakt
  return Array.isArray(andere) ? andere : []
}

/** Eigene Einträge zu den Lücken, die der Dozent im Skript gelassen hat. */
function mitschrift(thema, speicher) {
  const notizen = (speicher && speicher.zustand.notizen) || {}
  const aus = []
  for (const karte of thema.lernkarten || []) {
    for (const block of karte.bloecke || []) {
      if (block.typ !== 'skriptluecke') continue
      for (const feld of block.felder || []) {
        const text = String(notizen[feld.id] || '').trim()
        if (text) aus.push({ label: feld.label || 'Mitschrift', text })
      }
    }
  }
  return aus
}

function stolperMarke(stelle) {
  if (stelle.irrtum) return 'Irrtum'
  if (stelle.nurUnsicher) return 'unsicher'
  return stelle.offen ? 'noch offen' : 'wackelig'
}

function themaBlock(app, thema, modus) {
  const lz = thema.lernzettel || {}
  const zeilen = zeilenFuer(thema, modus)
  const block = h('section.lz-thema.lz-thema--' + modus, { dataset: { thema: thema.id } })

  block.appendChild(h('div.lz-thema__kopf',
    h('h3.lz-thema__titel', thema.titel),
    h('span.lz-thema__rand',
      thema.lernstoff ? h('span.marke-chip.marke-chip--lernstoff', 'Lernstoff laut Skript') : null,
      h('span.lz-folie.zahl', folienText(thema.folien, thema.quelleText)))))

  if (zeilen.length) {
    for (const zeile of zeilen) block.appendChild(h('div.lz-zeile', mini(zeile)))
  } else {
    block.appendChild(h('p.leise.lz-zeile', 'Für dieses Thema ist noch kein Lernzettel hinterlegt.'))
  }

  if (modus === 'ausfuehrlich' && lz.merkhilfe) {
    block.appendChild(h('p.lz-merkhilfe',
      h('span.lz-marke', 'Merkhilfe, nicht aus dem Skript'),
      mini(lz.merkhilfe, { inline: true })))
  }

  if (modus === 'ausfuehrlich') {
    const stellen = app.modell.stolperstellen(thema)
    if (stellen.length) {
      block.appendChild(h('div.lz-stolper',
        h('h4.lz-stolper__titel', 'Deine Stolperstellen'),
        h('ul.lz-stolper__liste', stellen.map((s) => h('li.lz-stolper__eintrag' + (s.irrtum ? '.ist-irrtum' : ''),
          h('span.lz-stolper__marke', stolperMarke(s)),
          h('span.lz-stolper__text', mini(s.aufgabe.kurz || s.aufgabe.frage || '', { inline: true })))))))
    }
  }

  const eigenes = mitschrift(thema, app.speicher)
  if (eigenes.length) {
    block.appendChild(h('div.lz-mitschrift',
      h('h4.lz-mitschrift__titel', 'Aus deiner Mitschrift'),
      h('dl.lz-mitschrift__liste', eigenes.map((e) => [
        h('dt', e.label),
        h('dd', mini(e.text, { inline: true })),
      ]))))
  }

  return block
}

function modulAbschnitt(app, modul, modusWahl) {
  const themen = modul.themen || []
  if (!themen.length) return null
  const abschnitt = h('section.lz-modul')
  abschnitt.appendChild(h('h2.lz-modul__titel', modul.titel,
    modul.vorlesung ? h('span.lz-modul__vorlesung', modul.vorlesung) : null))

  // Kurze Blöcke stehen im Druck zweispaltig. Deshalb landen aufeinanderfolgende kompakte Themen
  // in einem gemeinsamen Kasten; ein ausführliches Thema beendet die Gruppe und behält die volle Breite.
  let gruppe = null
  for (const thema of themen) {
    const modus = modusWahl === 'persoenlich' ? app.modell.lernzettelModus(thema) : modusWahl
    const block = themaBlock(app, thema, modus)
    if (modus === 'kompakt') {
      if (!gruppe) { gruppe = h('div.lz-kompaktgruppe'); abschnitt.appendChild(gruppe) }
      gruppe.appendChild(block)
    } else {
      gruppe = null
      abschnitt.appendChild(block)
    }
  }
  return abschnitt
}

/** „Darauf zuerst schauen“: die schwächsten Themen laut Lernstand, bei leerem Stand die schwersten. */
function zuerstAbschnitt(app) {
  const bewertet = app.daten.alleThemen.map((thema) => ({ thema, s: app.modell.themaStand(thema) }))
  if (!bewertet.length) return null
  const gesamt = app.modell.gesamtStand()
  // Was laut Modell sitzt, gehört nicht auf diese Liste; der Rest steht mit dem schwächsten zuerst.
  const offen = bewertet.filter((x) => x.s.status !== 'gut')
  const sortiert = offen.slice().sort((a, b) => a.s.wert - b.s.wert || (b.thema.gewicht || 1) - (a.thema.gewicht || 1))
  const liste = sortiert.slice(0, ZUERST_MAX)

  return h('section.lz-abschnitt.lz-zuerst',
    h('h2', 'Darauf zuerst schauen'),
    h('p.leise.lz-zuerst__satz', !liste.length
      ? 'Nach deinem Stand wackelt gerade nichts. Geh den Zettel trotzdem einmal ganz durch.'
      : gesamt.gesehen
        ? 'Die Themen mit dem schwächsten Stand, das wackeligste zuerst.'
        : 'Du hast noch keine Aufgabe bearbeitet. Bis dahin stehen hier die Themen, die im Skript das meiste Gewicht haben.'),
    h('ol.lz-zuerst__liste', liste.map(({ thema, s }) => {
      const modul = app.daten.modulVonThema(thema.id)
      const neben = [modul ? (modul.vorlesung || modul.titel) : null, folienText(thema.folien, thema.quelleText), statusText(s.status)]
      return h('li',
        h('a.lz-zuerst__titel', { href: '#/thema/' + thema.id }, thema.titel),
        h('span.lz-zuerst__neben', neben.filter(Boolean).join(' · ')))
    })))
}

function personenAbschnitt(app) {
  const personen = app.daten.personen || []
  if (!personen.length) return null
  return h('section.lz-abschnitt.lz-personen',
    h('h2', 'Personen auf einen Blick'),
    h('ul.lz-personen__liste', personen.map((p) => h('li',
      h('strong', p.name),
      p.kurz ? h('span.lz-personen__kurz', ': ' + p.kurz) : null))))
}

function werkzeugleiste(app, modus, setzeModus) {
  const wahl = h('div.lz-modi', { role: 'group', 'aria-label': 'Wie ausführlich soll der Lernzettel sein?' },
    MODI.map((m) => h('button.knopf.knopf--klein', {
      type: 'button',
      'aria-pressed': String(m.id === modus),
      onclick: () => setzeModus(m.id),
    }, m.text)))

  const drucken = h('button.knopf.knopf--primaer', { type: 'button', onclick: () => window.print() },
    symbol('drucken'), 'Als PDF speichern oder drucken')

  const anleitung = h('details.aufklapp.lz-anleitung',
    h('summary', 'Wie das auf deinem Gerät geht'),
    h('div.aufklapp__inhalt.stapel--eng',
      ANLEITUNG.map(([geraet, text]) => [h('h4', geraet), h('p', text)])))

  const leiste = h('div.lz-werkzeuge',
    h('div.lz-werkzeuge__zeile', wahl, drucken),
    h('p.leise.lz-werkzeuge__satz', MODUS_SATZ[modus]),
    anleitung)
  return leiste
}

export default {
  titel: 'Lernzettel',
  schmal: true,

  render(host, params, app) {
    const kurs = app.daten.kurs || {}
    const modus = modusAus(params)
    const druck = params.druck != null && params.druck !== '0'
    const themaVorher = document.documentElement.getAttribute('data-thema')
    let lebt = true

    // Gedruckt wird immer hell. Für die Druckansicht gilt das schon auf dem Bildschirm, damit die Vorschau
    // zeigt, was später auf dem Papier steht. Die Navigation bleibt stehen, damit niemand in der Ansicht
    // festsitzt; im Druck blendet das CSS sie aus.
    if (druck) document.documentElement.setAttribute('data-thema', 'hell')

    const kopf = h('div.seitenkopf.lz-kopf',
      h('div.seitenkopf__ueber', 'Lernzettel'),
      h('h1', 'Lernzettel ' + (kurs.titel || 'Mitarbeiterführung (MAF)')),
      h('p.lz-nur-bildschirm', 'Deine letzte Wiederholung vor der Klausur, auf Papier oder als PDF. Was sicher sitzt, steht nur kurz da.'),
      h('p.lz-kopf__zeilen',
        kurs.rahmen ? h('span', kurs.rahmen) : null,
        h('span', 'Stand ' + datumText()),
        h('span', 'Fassung ' + (MODI.find((m) => m.id === modus) || MODI[0]).text)),
      modus === 'persoenlich'
        ? h('p.lz-kopf__legende', 'Legende: Themen, die laut deinem Lernstand sitzen, stehen kurz. Wo es gehakt hat, steht es ausführlich, mit deinen Stolperstellen.')
        : null)

    const dokument = h('article.lz-dokument', kopf)

    if (!druck) {
      host.appendChild(werkzeugleiste(app, modus, (neu) => {
        app.navigiere('#/lernzettel?modus=' + encodeURIComponent(neu) + (druck ? '&druck=1' : ''))
      }))
    }

    if (!app.daten.module.length || !app.daten.alleThemen.length) {
      dokument.appendChild(h('div.hinweiskasten.hinweiskasten--mittel',
        h('div.hinweiskasten__titel', 'Noch keine Inhalte'),
        h('p', 'Sobald die Module hinterlegt sind, steht hier dein Lernzettel.')))
      host.appendChild(dokument)
      return () => { lebt = false }
    }

    const zuerst = zuerstAbschnitt(app)
    if (zuerst) dokument.appendChild(zuerst)
    for (const modul of app.daten.module) {
      const abschnitt = modulAbschnitt(app, modul, modus)
      if (abschnitt) dokument.appendChild(abschnitt)
    }
    const personen = personenAbschnitt(app)
    if (personen) dokument.appendChild(personen)

    dokument.appendChild(h('p.lz-fuss.leise',
      'Alle Fachinhalte stammen aus dem Skript der Vorlesung. Merkhilfen sind als solche gekennzeichnet und stehen nicht im Skript.'))

    host.appendChild(dokument)

    // Das fertige Standard-PDF gibt es erst, wenn es erzeugt wurde. Der Link erscheint deshalb nur,
    // wenn die Datei wirklich ausgeliefert wird.
    if (!druck) {
      fetch(PDF_PFAD, { method: 'HEAD', cache: 'no-cache' })
        .then((antwort) => {
          if (!lebt || !antwort.ok) return
          const leiste = host.querySelector('.lz-werkzeuge')
          if (leiste) {
            leiste.insertBefore(
              h('p.lz-werkzeuge__pdf', h('a', { href: PDF_PFAD }, symbol('zettel'), 'Fertiges Standard-PDF öffnen')),
              leiste.querySelector('.lz-anleitung'))
          }
        })
        .catch(() => {})
    }

    return () => {
      lebt = false
      if (!druck) return
      if (themaVorher) document.documentElement.setAttribute('data-thema', themaVorher)
      else document.documentElement.removeAttribute('data-thema')
    }
  },
}
