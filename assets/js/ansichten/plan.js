// Lernplan (#/plan): die rund zehn Stunden auf zwei Tage verteilt. Der Plan ist ein Vorschlag und liest
// den Stand aus app.modell: Module, die sitzen, klappen zu; wo es hakt, steht, dass mehr Zeit nötig ist.
import { h, symbol, minutenText, prozent } from '../mini.js'
import { statusText } from '../lernmodell.js'

// Tag 1 nimmt die ersten vier Module, Tag 2 den Rest plus Generalprobe und Lernzettel
const MODULE_TAG_1 = 4

function ampel(status) {
  return h('span.ampel.ampel--' + status, statusText(status))
}

function balken(wert, abdeckung, status) {
  const el = h('div.balken.balken--dick.balken--' + status, {
    role: 'img',
    'aria-label': `Beherrschung ${prozent(wert)} Prozent, bearbeitet ${prozent(abdeckung)} Prozent`,
  })
  const streifen = h('div.balken__schatten')
  const voll = h('div.balken__wert')
  streifen.style.width = prozent(abdeckung) + '%'
  voll.style.width = prozent(wert) + '%'
  el.append(streifen, voll)
  return el
}

function summe(module, wert) {
  return module.reduce((s, m) => s + wert(m), 0)
}

function themenListe(app, modul) {
  return h('ul.eintragsliste', (modul.themen || []).map((th) => {
    const s = app.modell.themaStand(th)
    const neben = []
    if (th.lernstoff) neben.push(h('span.marke-chip.marke-chip--lernstoff', 'Lernstoff laut Skript'))
    neben.push(h('span.leise', `${s.gesehen} von ${s.gesamt} Aufgaben`))
    if (s.faellig) neben.push(h('span.marke-chip.marke-chip--mittel', s.faellig === 1 ? '1 Wiederholung fällig' : s.faellig + ' Wiederholungen fällig'))
    return h('li', h('a.eintrag', { href: '#/thema/' + th.id },
      h('div',
        h('div.eintrag__titel', th.titel),
        h('div.eintrag__neben.zeile.plan__themazeile', neben)),
      h('div.eintrag__rechts', ampel(s.status))))
  }))
}

function modulBlock(app, modul, offen) {
  const s = app.modell.modulStand(modul)
  const verbraucht = app.zeit.modulMin(modul.id)
  const plan = modul.zeitMin || 0
  const knapp = plan > 0 && verbraucht > plan && s.status !== 'gut'
  const mehrZeit = s.status === 'schlecht' || knapp
  const zeiten = [plan ? 'Planzeit ' + minutenText(plan) : null, 'gelernt ' + minutenText(verbraucht)]
    .filter(Boolean).join(' · ')

  const block = h('details.aufklapp.plan__modul', { open: offen },
    h('summary',
      h('span.plan__modulkopf',
        h('span.plan__modultitel', modul.titel),
        h('span.zeile.plan__modulneben',
          h('span.marke-chip', modul.vorlesung || 'Modul'),
          ampel(s.status),
          // Der Hinweis muss auch im zugeklappten Zustand zu sehen sein
          mehrZeit ? h('span.marke-chip.marke-chip--mittel', 'mehr Zeit einplanen') : null)),
      h('span.leise.plan__modulzeit.zahl', zeiten)),
    h('div.aufklapp__inhalt.stapel--eng',
      modul.kurz ? h('p.leise', modul.kurz) : null,
      balken(s.wert, s.abdeckung, s.status),
      h('p.leise', `${s.gesehen} von ${s.gesamt} Aufgaben bearbeitet, ${s.fertigeThemen} von ${s.themen} Themen durchgearbeitet.`),
      mehrZeit
        ? h('div.hinweiskasten.hinweiskasten--mittel',
          h('p', s.status === 'schlecht'
            ? `Hier hakt es. Plane für dieses Modul mehr Zeit ein als die ${minutenText(plan)} aus dem Vorschlag.`
            : `Du bist über der Planzeit und das Modul sitzt noch nicht. Plane hier mehr Zeit ein und kürze dafür an einer Stelle, die schon sitzt.`))
        : null,
      themenListe(app, modul),
      h('p', h('a.knopf.knopf--klein', { href: '#/modul/' + modul.id }, 'Modul öffnen', symbol('weiter')))))
  return block
}

// Beschriftung eines Lerntags aus den Daten, nicht aus einer Annahme über den Stoff
function tagBeschriftung(module, ersatz) {
  if (!module.length) return ersatz
  const vorlesungen = [...new Set(module.map((m) => m.vorlesung).filter(Boolean))]
  const spanne = vorlesungen.length > 1 ? `${vorlesungen[0]} bis ${vorlesungen[vorlesungen.length - 1]}` : vorlesungen[0]
  return [module.length === 1 ? '1 Modul' : module.length + ' Module', spanne].filter(Boolean).join(' · ')
}

function tagKopf(nummer, titel, module, app) {
  const plan = summe(module, (m) => m.zeitMin || 0)
  const gelernt = summe(module, (m) => app.zeit.modulMin(m.id))
  return h('div.plan__tagkopf',
    h('h2', `Tag ${nummer}`),
    h('p.leise', [titel, plan ? 'Planzeit ' + minutenText(plan) : null, 'gelernt ' + minutenText(gelernt)]
      .filter(Boolean).join(' · ')))
}

function probeBlock(app) {
  const min = (app.daten.kurs || {}).probeMin
  return h('div.karte.stapel--eng',
    h('div.karte__ueber', 'Generalprobe' + (min ? ' · ' + minutenText(min) : '')),
    h('h3.karte__titel', 'Einmal quer durch den ganzen Stoff'),
    h('p', 'Ein gemischter Durchgang über alle Module, ohne Hilfen und am Stück. Danach weißt du, welche Themen unter Zeitdruck wirklich sitzen und welche nur bekannt vorkommen.'),
    h('p', h('a.knopf.knopf--primaer', { href: '#/probe' }, symbol('probe'), 'Generalprobe starten')))
}

function zettelBlock() {
  return h('div.karte.stapel--eng',
    h('div.karte__ueber', 'Zum Schluss'),
    h('h3.karte__titel', 'Dein Lernzettel'),
    h('p', 'Der Lernzettel fasst den Stoff zusammen und hebt genau die Stellen hervor, an denen es bei dir gehakt hat. Was sicher sitzt, steht nur noch in einer Zeile da.'),
    h('p', h('a.knopf', { href: '#/lernzettel' }, symbol('zettel'), 'Lernzettel ansehen')))
}

export default {
  titel: 'Lernplan',

  render(host, params, app) {
    const daten = app.daten
    const kurs = daten.kurs || {}
    const budget = kurs.zeitbudgetMin || 600

    host.appendChild(h('div.seitenkopf',
      h('div.seitenkopf__ueber', 'Lernplan'),
      h('h1', 'Zwei Tage, zehn Stunden'),
      h('p', 'Ein Vorschlag, wie du die Zeit verteilst. Der Plan richtet sich nach deinem Stand: Offen steht das Modul, an dem du gerade dran bist, und wo es hakt, steht es dabei.')))

    if (!daten.module.length) {
      host.appendChild(h('div.hinweiskasten.hinweiskasten--mittel',
        h('div.hinweiskasten__titel', 'Noch keine Inhalte'),
        h('p', 'Sobald die Module hinterlegt sind, steht hier dein Lernplan.')))
      return null
    }

    const tag1 = daten.module.slice(0, MODULE_TAG_1)
    const tag2 = daten.module.slice(MODULE_TAG_1)
    const planGesamt = summe(daten.module, (m) => m.zeitMin || 0) + (kurs.probeMin || 0)

    host.appendChild(h('div.karte.stapel--eng',
      h('div.karte__ueber', 'Überblick'),
      h('p', `Der Vorschlag verplant ${minutenText(planGesamt)} von deinem Budget von ${minutenText(budget)}. Bisher gelernt: ${minutenText(app.zeit.gesamtMin)}. Für den ersten Durchgang durch alle Themen sind es nach heutiger Schätzung noch rund ${minutenText(app.modell.restzeitMin())}.`),
      h('p.leise', 'Die Reihenfolge ist ein Vorschlag, keine Vorschrift. Wenn dir ein Modul schwerfällt, nimm ihm die Zeit von einem, das schon sitzt.')))

    // Aufgeklappt ist das erste Modul, das noch Arbeit hat: der Plan bleibt überschaubar,
    // alles andere ist einen Antipp entfernt.
    let offenVergeben = false
    const istDran = (modul) => {
      const s = app.modell.modulStand(modul)
      const fertig = s.status === 'gut' && s.fertigeThemen === s.themen
      if (fertig || offenVergeben) return false
      offenVergeben = true
      return true
    }

    const abschnitt1 = h('section.plan__tag.stapel', tagKopf(1, tagBeschriftung(tag1, 'Noch keine Module'), tag1, app))
    for (const modul of tag1) abschnitt1.appendChild(modulBlock(app, modul, istDran(modul)))
    host.appendChild(abschnitt1)

    const abschnitt2 = h('section.plan__tag.stapel',
      tagKopf(2, tagBeschriftung(tag2, 'Generalprobe und Lernzettel'), tag2, app))
    for (const modul of tag2) abschnitt2.appendChild(modulBlock(app, modul, istDran(modul)))
    abschnitt2.append(probeBlock(app), zettelBlock())
    host.appendChild(abschnitt2)

    return null
  },
}
