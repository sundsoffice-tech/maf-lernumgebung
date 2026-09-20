// Start der Lernumgebung: Daten laden, Lernstand öffnen, Routen bedienen.
import { h, leeren, symbol, minutenText, minutenKurz, mini, folienText } from './mini.js'
import { ladeDaten } from './daten.js'
import { erzeugeSpeicher } from './speicher.js'
import { erzeugeModell } from './lernmodell.js'
import { erzeugeZeit } from './zeit.js'
import { oeffneSchublade, schliesseSchublade } from './schublade.js'

import start from './ansichten/start.js'
import modul from './ansichten/modul.js'
import thema from './ansichten/thema.js'
import training from './ansichten/training.js'
import probe from './ansichten/probe.js'
import personen from './ansichten/personen.js'
import glossar from './ansichten/glossar.js'
import lernzettel from './ansichten/lernzettel.js'
import quellen from './ansichten/quellen.js'
import plan from './ansichten/plan.js'
import einstellungen from './ansichten/einstellungen.js'
import mehr from './ansichten/mehr.js'

const ROUTEN = { '': start, modul, thema, training, probe, personen, glossar, lernzettel, quellen, plan, einstellungen, mehr }

const NAV = [
  { hash: '#/', text: 'Start', symbolName: 'start', routen: [''] },
  { hash: '#/plan', text: 'Lernplan', symbolName: 'lernen', routen: ['plan', 'modul', 'thema'] },
  { hash: '#/training', text: 'Training', symbolName: 'wiederholen', routen: ['training', 'probe'] },
  { hash: '#/lernzettel', text: 'Lernzettel', symbolName: 'zettel', routen: ['lernzettel'] },
  { hash: '#/mehr', text: 'Mehr', symbolName: 'mehr', routen: ['mehr', 'personen', 'glossar', 'quellen', 'einstellungen'] },
]
const NAV_BREIT_ZUSATZ = [
  { hash: '#/personen', text: 'Personen', routen: ['personen'] },
  { hash: '#/glossar', text: 'Glossar', routen: ['glossar'] },
]

const inhalt = document.getElementById('inhalt')
let aufraeumen = null
let app = null
// Einmalige Hinweise, die erst gezeigt werden, wenn wirklich eine Ansicht steht
let verirrt = null
let speicherHinweis = null

function zerlegeHash() {
  const roh = (location.hash || '#/').replace(/^#\/?/, '')
  const [pfad, abfrage = ''] = roh.split('?')
  const teile = pfad.split('/').filter(Boolean).map(decodeURIComponent)
  const params = Object.fromEntries(new URLSearchParams(abfrage))
  return { route: teile[0] || '', id: teile[1] || null, params }
}

function zeichneNavigation(route) {
  const haupt = document.getElementById('hauptnav')
  const fuss = document.getElementById('fussnav')
  leeren(haupt); leeren(fuss)
  const breit = [NAV[0], NAV[1], NAV[2], NAV[3], ...NAV_BREIT_ZUSATZ, { hash: '#/mehr', text: 'Mehr', routen: ['mehr', 'quellen', 'einstellungen'] }]
  for (const n of breit) {
    haupt.appendChild(h('a', { href: n.hash, 'aria-current': n.routen.includes(route) ? 'page' : null }, n.text))
  }
  for (const n of NAV) {
    fuss.appendChild(h('a', { href: n.hash, 'aria-current': n.routen.includes(route) ? 'page' : null }, symbol(n.symbolName), h('span', n.text)))
  }
}

function zeichneZeit() {
  const el = document.getElementById('kopf-zeit')
  if (!app) return
  const budget = app.daten.kurs.zeitbudgetMin || 600
  const lang = `${minutenText(app.zeit.gesamtMin)} von ${minutenText(budget)}`
  el.hidden = false
  leeren(el)
  // Beide Formen stehen im Text, das CSS blendet die zur Breite unpassende aus. Der erste Teil ist nur
  // für Vorleser da: auf dem iPhone und iPad gibt es kein title-Tooltip, das die Marke erklären könnte.
  el.append(
    h('span.nur-vorleser', 'Aktive Lernzeit: ' + lang),
    h('span.kopf__zeit-lang', { 'aria-hidden': 'true' }, lang),
    h('span.kopf__zeit-kurz', { 'aria-hidden': 'true' }, minutenKurz(app.zeit.gesamtMin)))
}

function zeigeRoute() {
  const { route, id, params } = zerlegeHash()
  // Tippfehler oder altes Lesezeichen: zurück an den Anfang, aber OHNE einen Eintrag im Verlauf zu
  // hinterlassen — sonst landet das Zurückwischen in Safari sofort wieder auf derselben toten Adresse.
  if (!ROUTEN[route]) {
    verirrt = location.hash || ''
    location.replace('#/')
    return
  }
  const ansicht = ROUTEN[route]
  if (typeof aufraeumen === 'function') { try { aufraeumen() } catch (e) { console.error(e) } }
  aufraeumen = null
  schliesseSchublade()
  leeren(inhalt)
  inhalt.className = 'seite' + (ansicht.schmal ? ' seite--schmal' : '')
  zeichneNavigation(route)
  app.zeit.setzeModul(null)
  try {
    aufraeumen = ansicht.render(inhalt, { id, ...params }, app) || null
  } catch (fehler) {
    console.error(fehler)
    inhalt.appendChild(h('div.fehlerseite', h('h1', 'Hier ist etwas schiefgegangen'),
      h('p', 'Die Ansicht konnte nicht aufgebaut werden. Dein Lernstand ist davon nicht betroffen.'),
      h('p', h('a.knopf', { href: '#/' }, 'Zur Startseite'))))
  }
  if (speicherHinweis) {
    inhalt.prepend(h('div.hinweiskasten.hinweiskasten--mittel', h('p', speicherHinweis)))
    speicherHinweis = null
  }
  if (verirrt) {
    inhalt.prepend(h('div.hinweiskasten.hinweiskasten--mittel',
      h('p', 'Die Stelle ' + verirrt + ' gibt es hier nicht. Das ist der Anfang.')))
    verirrt = null
  }
  document.title = (ansicht.titel ? ansicht.titel + ' · ' : '') + 'MAF Lernumgebung'
  if (!params.druck) window.scrollTo(0, 0)
  app.speicher.aendere((z) => { z.letzteStelle = { hash: location.hash || '#/', t: Date.now() } }, { still: true })
}

// Glossar- und Personenverweise aus der Mini-Auszeichnung öffnen die Schublade, egal in welcher Ansicht
function verweisKlick(ereignis) {
  const ziel = ereignis.target.closest('[data-glossar], [data-person]')
  if (!ziel || !app) return
  ereignis.preventDefault()
  if (ziel.dataset.glossar) {
    const b = app.daten.begriff(ziel.dataset.glossar)
    oeffneSchublade(b ? b.begriff : ziel.dataset.glossar, b
      ? h('div.stapel', h('div', mini(b.text)), h('p.leise', folienText(b.folien)), h('p', h('a', { href: '#/glossar' }, 'Zum ganzen Glossar')))
      : h('p', 'Zu diesem Begriff gibt es keinen Glossareintrag.'))
  } else {
    const p = app.daten.person(ziel.dataset.person)
    oeffneSchublade(p ? p.name : ziel.dataset.person, p
      ? h('div.stapel', h('p', h('strong', p.kurz || '')), h('div', mini(p.beitrag)), h('p.leise', folienText(p.folien, p.quelle === 'leseliste' ? 'Leseliste' : 'Skript')), h('p', h('a', { href: '#/personen' }, 'Zum Personenregister')))
      : h('p', 'Zu dieser Person gibt es keinen Eintrag.'))
  }
}

// Safari färbt seine Leiste nach <meta name="theme-color">. Die beiden Einträge folgen dem System;
// erzwingt die Lernende ein Thema, müssen beide auf dessen Farbe zeigen.
const LEISTENFARBE = { hell: '#f8f6f1', dunkel: '#11151b' }
function setzeLeistenfarbe(thema) {
  for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
    const system = /dark/.test(meta.getAttribute('media') || '') ? LEISTENFARBE.dunkel : LEISTENFARBE.hell
    meta.setAttribute('content', LEISTENFARBE[thema] || system)
  }
}

async function starte() {
  try {
    const daten = await ladeDaten()
    const speicher = erzeugeSpeicher()
    const modell = erzeugeModell(daten, speicher)
    const zeit = erzeugeZeit(speicher)
    app = {
      daten, speicher, modell, zeit,
      navigiere(hash) { if (location.hash === hash) zeigeRoute(); else location.hash = hash },
      setzeThema(wert) {
        speicher.aendere((z) => { z.einstellungen.thema = wert }, { sofort: true })
        if (wert === 'hell' || wert === 'dunkel') document.documentElement.setAttribute('data-thema', wert)
        else document.documentElement.removeAttribute('data-thema')
        setzeLeistenfarbe(wert)
      },
    }
    setzeLeistenfarbe(speicher.zustand.einstellungen.thema)
    zeit.starte()
    zeit.beiTakt(zeichneZeit)
    zeichneZeit()
    document.addEventListener('click', verweisKlick)
    window.addEventListener('hashchange', zeigeRoute)
    // Vor dem ersten Zeichnen setzen: zeigeRoute kann bei einer unbekannten Adresse umleiten, und dann
    // würde ein danach eingehängter Hinweis vom zweiten Durchlauf wieder weggewischt.
    if (!speicher.verfuegbar) {
      speicherHinweis = 'Dein Browser erlaubt gerade kein Speichern (privater Modus oder blockierte Cookies?). Du kannst lernen, aber der Lernstand geht beim Schließen verloren.'
    }
    zeigeRoute()
  } catch (fehler) {
    console.error(fehler)
    leeren(inhalt)
    inhalt.appendChild(h('div.fehlerseite', h('h1', 'Die Lernumgebung konnte nicht geladen werden'),
      h('p', 'Bitte lade die Seite neu. Wenn das nicht hilft, prüfe deine Internetverbindung.'),
      h('p.leise', String(fehler && fehler.message || fehler))))
  }
}

starte()
