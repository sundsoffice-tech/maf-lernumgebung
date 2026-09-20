// Lernzettel (#/lernzettel): ein Dokument für die letzte Wiederholung vor der Klausur, nicht die Webseite
// noch einmal. Auf dem Bildschirm steht der Titel zuerst, darunter die Werkzeuge und ein Inhaltsverzeichnis
// mit Sprungmarken; jedes Modul lässt sich zuklappen, ein mitlaufender Knopf führt zurück nach oben.
// Gedruckt wird nur das Dokument (A4 hoch), ohne Werkzeuge, Verzeichnis und Knopf.
// Alles, was Stand ist, kommt aus app.modell: welcher Modus je Thema passt, welche Themen am schwächsten sind
// und wo es gehakt hat. Die Ansicht rechnet nichts selbst.
//
// Parameter: modus=persoenlich|kompakt|ausfuehrlich, druck=1 (ohne Werkzeugleiste, helles Thema erzwungen).
import { h, mini, folienText, symbol } from '../mini.js'
import { statusText } from '../lernmodell.js'

const PDF_PFAD = 'lernzettel/MAF-Lernzettel.pdf'
const ZUERST_MAX = 8
// Ab hier ist der Bildschirm breit genug, dass die Werkzeuge offen stehen können, ohne den Titel zu verdrängen.
// Auf dem iPhone (390 px) bleiben sie zugeklappt, auf dem iPad (ab 768 px) stehen sie offen.
const WERKZEUGE_OFFEN_AB = '(min-width: 40rem)'
// Erst nach rund einer Bildschirmhöhe erscheint „Nach oben“; davor verdeckt er nur Inhalt.
const NACH_OBEN_AB = 700

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

/**
 * Sprung zu einem Abschnitt des Zettels. Kein Anker im href: die App hängt ihre Route an den Hash,
 * ein „#lz-m1“ würde die Ansicht neu laden statt zu scrollen.
 */
function springeZu(id) {
  const ziel = document.getElementById(id)
  if (!ziel) return
  // Ein zugeklapptes Modul öffnet sich beim Sprung wieder, sonst führt die Marke auf eine leere Überschrift.
  const zu = ziel.querySelector('.lz-modul__klapp[aria-expanded="false"]')
  if (zu) zu.click()
  ziel.scrollIntoView()
  // Tastatur und Vorlesefunktion springen mit, ohne dass der Fokus noch einmal scrollt.
  const marke = ziel.querySelector('.lz-modul__klapp') || ziel.querySelector('h2') || ziel
  if (marke.tagName !== 'BUTTON' && !marke.hasAttribute('tabindex')) marke.setAttribute('tabindex', '-1')
  try { marke.focus({ preventScroll: true }) } catch (e) { /* ältere Safari-Fassungen kennen die Option nicht */ }
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
  const abschnitt = h('section.lz-modul', { id: 'lz-' + modul.id })
  const inhalt = h('div.lz-modul__inhalt', { id: 'lz-' + modul.id + '-inhalt' })

  // Zuklappen ist eine Lesehilfe am Bildschirm: sechs Module hintereinander sind auf dem iPhone ein
  // Endlosband. Der Knopf trägt den Überschriftstext (übliches Aufklapp-Muster) und ist damit breit
  // genug für einen Finger. Auf dem Papier steht jedes Modul offen, das erzwingt das Druck-CSS.
  const knopf = h('button.lz-modul__klapp', {
    type: 'button',
    'aria-expanded': 'true',
    'aria-controls': inhalt.id,
  }, h('span.lz-modul__name', modul.titel),
    modul.vorlesung ? h('span.lz-modul__vorlesung', modul.vorlesung) : null,
    symbol('ab', { class: 'lz-modul__pfeil' }))
  knopf.addEventListener('click', () => {
    const zu = abschnitt.classList.toggle('ist-zu')
    knopf.setAttribute('aria-expanded', String(!zu))
  })
  abschnitt.appendChild(h('h2.lz-modul__titel', knopf))

  // Kurze Blöcke stehen im Druck zweispaltig. Deshalb landen aufeinanderfolgende kompakte Themen
  // in einem gemeinsamen Kasten; ein ausführliches Thema beendet die Gruppe und behält die volle Breite.
  let gruppe = null
  for (const thema of themen) {
    const modus = modusWahl === 'persoenlich' ? app.modell.lernzettelModus(thema) : modusWahl
    const block = themaBlock(app, thema, modus)
    if (modus === 'kompakt') {
      if (!gruppe) { gruppe = h('div.lz-kompaktgruppe'); inhalt.appendChild(gruppe) }
      gruppe.appendChild(block)
    } else {
      gruppe = null
      inhalt.appendChild(block)
    }
  }
  abschnitt.appendChild(inhalt)
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

  return h('section.lz-abschnitt.lz-zuerst', { id: 'lz-zuerst' },
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
  return h('section.lz-abschnitt.lz-personen', { id: 'lz-personen' },
    h('h2', 'Personen auf einen Blick'),
    h('ul.lz-personen__liste', personen.map((p) => h('li',
      h('strong', p.name),
      p.kurz ? h('span.lz-personen__kurz', ': ' + p.kurz) : null))))
}

/** Verzeichnis mit Sprungmarken: der Weg zu MAF V, ohne Minuten zu scrollen. */
function inhaltAbschnitt(ziele) {
  return h('nav.lz-inhalt', { 'aria-label': 'Inhalt des Lernzettels' },
    h('h2.lz-inhalt__titel', 'Inhalt'),
    h('ul.lz-inhalt__liste', ziele.map((z) => h('li',
      h('button.lz-inhalt__ziel', { type: 'button', onclick: () => springeZu(z.id) },
        h('span.lz-inhalt__name', z.titel),
        z.neben ? h('span.lz-inhalt__neben', z.neben) : null)))))
}

function werkzeugleiste(modus, setzeModus, offen) {
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

  // Auf dem iPhone zugeklappt: vorher füllten drei Fassungsknöpfe, der Druckknopf und ein Aufklapper
  // den ganzen ersten Bildschirm, bevor der Titel kam.
  return h('details.aufklapp.lz-werkzeuge', { open: offen },
    h('summary', 'Fassung und Druck'),
    h('div.aufklapp__inhalt.lz-werkzeuge__inhalt',
      h('div.lz-werkzeuge__zeile', wahl, drucken),
      h('p.leise.lz-werkzeuge__satz', MODUS_SATZ[modus]),
      anleitung))
}

export default {
  titel: 'Lernzettel',
  // Bewusst nicht „schmal“: das Dokument begrenzt seine Zeilenlänge selbst und darf auf dem iPad quer
  // zweispaltig über die volle Breite stehen (lernzettel.css, ab 64rem).

  render(host, params, app) {
    const kurs = app.daten.kurs || {}
    const modus = modusAus(params)
    const druck = params.druck != null && params.druck !== '0'
    const themaVorher = document.documentElement.getAttribute('data-thema')
    let lebt = true
    let loeseScroll = null

    // Gedruckt wird immer hell. Für die Druckansicht gilt das schon auf dem Bildschirm, damit die Vorschau
    // zeigt, was später auf dem Papier steht. Die Navigation bleibt stehen, damit niemand in der Ansicht
    // festsitzt; im Druck blendet das CSS sie aus.
    if (druck) document.documentElement.setAttribute('data-thema', 'hell')

    const kopf = h('div.seitenkopf.lz-kopf',
      h('div.seitenkopf__ueber', 'Lernzettel'),
      h('h1', { tabindex: '-1' }, 'Lernzettel ' + (kurs.titel || 'Mitarbeiterführung (MAF)')),
      h('p.lz-nur-bildschirm', 'Deine letzte Wiederholung vor der Klausur, auf Papier oder als PDF. Was sicher sitzt, steht nur kurz da.'),
      // Zwei eigene Zeilen statt einer Reihe mit Trennpunkten: beim Umbruch blieb sonst ein „·“ am Zeilenende hängen.
      h('p.lz-kopf__zeilen',
        kurs.rahmen ? h('span', kurs.rahmen) : null,
        h('span', 'Stand ' + datumText() + ', Fassung ' + (MODI.find((m) => m.id === modus) || MODI[0]).text)),
      modus === 'persoenlich'
        ? h('p.lz-kopf__legende', 'Legende: Themen, die laut deinem Lernstand sitzen, stehen kurz. Wo es gehakt hat, steht es ausführlich, mit deinen Stolperstellen.')
        : null)

    const dokument = h('article.lz-dokument', kopf)
    host.appendChild(dokument)

    // Titel zuerst, Werkzeuge darunter. Sie stehen im Dokument, weil sie mit ihm mitlaufen sollen;
    // auf dem Papier nimmt das Druck-CSS sie heraus.
    if (!druck) {
      let breit = true
      try { breit = window.matchMedia(WERKZEUGE_OFFEN_AB).matches } catch (e) { breit = true }
      dokument.appendChild(werkzeugleiste(modus, (neu) => {
        app.navigiere('#/lernzettel?modus=' + encodeURIComponent(neu))
      }, breit))
    }

    if (!app.daten.module.length || !app.daten.alleThemen.length) {
      dokument.appendChild(h('div.hinweiskasten.hinweiskasten--mittel',
        h('div.hinweiskasten__titel', 'Noch keine Inhalte'),
        h('p', 'Sobald die Module hinterlegt sind, steht hier dein Lernzettel.')))
      return () => { lebt = false }
    }

    // Erst alle Abschnitte bauen, dann das Verzeichnis davor hängen: es kennt seine Marken erst danach.
    const abschnitte = []
    const ziele = []
    const zuerst = zuerstAbschnitt(app)
    if (zuerst) { abschnitte.push(zuerst); ziele.push({ id: zuerst.id, titel: 'Darauf zuerst schauen' }) }
    for (const modul of app.daten.module) {
      const abschnitt = modulAbschnitt(app, modul, modus)
      if (!abschnitt) continue
      abschnitte.push(abschnitt)
      ziele.push({ id: abschnitt.id, titel: modul.titel, neben: modul.vorlesung || '' })
    }
    const personen = personenAbschnitt(app)
    if (personen) { abschnitte.push(personen); ziele.push({ id: personen.id, titel: 'Personen auf einen Blick' }) }

    if (!druck && ziele.length > 1) dokument.appendChild(inhaltAbschnitt(ziele))
    for (const abschnitt of abschnitte) dokument.appendChild(abschnitt)

    dokument.appendChild(h('p.lz-fuss.leise',
      'Alle Fachinhalte stammen aus dem Skript der Vorlesung. Merkhilfen sind als solche gekennzeichnet und stehen nicht im Skript.'))

    // Der Zettel ist auch zugeklappt lang. Der Knopf steht über der Fußnavigation und kommt erst,
    // wenn wirklich gescrollt wurde.
    if (!druck) {
      const nachOben = h('button.lz-nachoben', {
        type: 'button',
        hidden: true,
        'aria-label': 'Zurück zum Anfang des Lernzettels',
        onclick: () => {
          window.scrollTo(0, 0)
          const titel = dokument.querySelector('h1')
          if (titel) { try { titel.focus({ preventScroll: true }) } catch (e) { titel.focus() } }
        },
      }, symbol('auf'), h('span.lz-nachoben__text', 'Oben'))
      host.appendChild(nachOben)
      const pruefe = () => { nachOben.hidden = window.scrollY < NACH_OBEN_AB }
      window.addEventListener('scroll', pruefe, { passive: true })
      loeseScroll = () => window.removeEventListener('scroll', pruefe)
      pruefe()
    }

    // Das fertige Standard-PDF gibt es erst, wenn es erzeugt wurde. Der Link erscheint deshalb nur,
    // wenn die Datei wirklich ausgeliefert wird.
    if (!druck) {
      fetch(PDF_PFAD, { method: 'HEAD', cache: 'no-cache' })
        .then((antwort) => {
          if (!lebt || !antwort.ok) return
          const inhalt = host.querySelector('.lz-werkzeuge__inhalt')
          if (!inhalt) return
          inhalt.insertBefore(
            h('p.lz-werkzeuge__pdf', h('a', { href: PDF_PFAD }, symbol('zettel'), 'Fertiges Standard-PDF öffnen')),
            inhalt.querySelector('.lz-anleitung'))
        })
        .catch(() => {})
    }

    return () => {
      lebt = false
      if (loeseScroll) loeseScroll()
      if (!druck) return
      if (themaVorher) document.documentElement.setAttribute('data-thema', themaVorher)
      else document.documentElement.removeAttribute('data-thema')
    }
  },
}
