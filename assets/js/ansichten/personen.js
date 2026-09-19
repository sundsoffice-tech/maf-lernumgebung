// Ansicht "Personen" (#/personen): das Register aller Personen, die im Skript vorkommen — wer wofür steht,
// auf welcher Folie und in welchem Thema. Dazu ein Schnelltraining, das die Zuordnungsrunden zur Laufzeit aus
// dem Register baut. Diese Runden sind Übung und kein Lernstand: sie werden nicht verbucht.
import { h, leeren, mini, symbol, folienText, mische } from '../mini.js'
import { zeigeAufgabe } from '../aufgabenrahmen.js'

// Herkunft laut Vertrag 4.6: aus dem Skript selbst, aus der Leseliste oder aus einer im Skript verlinkten Quelle.
const HERKUNFT = {
  skript: { text: 'Skript', quelleText: 'Skript' },
  leseliste: { text: 'Leseliste', quelleText: 'Leseliste' },
  extern: { text: 'verlinkte Quelle', quelleText: 'Verlinkte Quelle' },
}
const JE_RUNDE = 5

function herkunft(person) {
  return HERKUNFT[person.quelle] || HERKUNFT.skript
}

// Registerordnung: nach dem letzten Namensteil (Nachname), danach nach dem Rest.
function sortname(name) {
  const teile = String(name || '').trim().split(/\s+/).filter(Boolean)
  if (teile.length < 2) return teile[0] || ''
  return teile[teile.length - 1] + ' ' + teile.slice(0, -1).join(' ')
}

// Zeichen im Kreis wie im Personen-Block einer Lernkarte: erster und letzter Namensteil.
function initialen(name) {
  const teile = String(name || '').replace(/[^\p{L}\s/-]/gu, '').split(/[\s/]+/).filter(Boolean)
  if (!teile.length) return '?'
  return (teile[0][0] + (teile.length > 1 ? teile[teile.length - 1][0] : '')).toUpperCase()
}

function ersteFolie(person) {
  const f = person.folien || []
  return f.length ? Math.min(...f) : Number.MAX_SAFE_INTEGER
}

export default {
  titel: 'Personen',

  render(host, params, app) {
    const personen = app.daten.personen || []

    host.appendChild(h('header.seitenkopf',
      h('p.seitenkopf__ueber', 'Register'),
      h('h1', 'Personen im Skript'),
      h('p', 'Wer im Skript genannt wird und wofür er dort steht. Die Schreibweise ist die des Skripts.')))

    if (!personen.length) {
      host.appendChild(h('div.hinweiskasten',
        h('div.hinweiskasten__titel', 'Noch kein Eintrag'),
        h('p', 'Für diese Fassung liegt kein Personenregister vor. Die Personen stehen trotzdem auf den Lernkarten der Themen, in denen sie vorkommen.'),
        h('p', h('a.knopf.knopf--klein', { href: '#/plan' }, symbol('lernen'), 'Zum Lernplan'))))
      return null
    }

    // Module, die überhaupt Personen haben: alles andere im Filter anzubieten wäre eine leere Auswahl.
    const modulVon = (person) => (person.themen || [])
      .map((id) => app.daten.modulVonThema(id))
      .filter(Boolean)
    const modulIds = new Set()
    for (const p of personen) for (const m of modulVon(p)) modulIds.add(m.id)
    const module = (app.daten.module || []).filter((m) => modulIds.has(m.id))

    const herkuenfte = [...new Set(personen.map((p) => herkunft(p).text))]

    const filter = { suche: '', modul: '', herkunft: '', ordnung: 'name' }
    const buehne = h('div.registerbuehne')
    host.appendChild(buehne)

    // ---------- Register ----------

    function passt(person) {
      if (filter.herkunft && herkunft(person).text !== filter.herkunft) return false
      if (filter.modul && !modulVon(person).some((m) => m.id === filter.modul)) return false
      const s = filter.suche.trim().toLowerCase()
      if (!s) return true
      return [person.name, person.kurz, person.beitrag].some((t) => String(t || '').toLowerCase().includes(s))
    }

    function gefiltert() {
      const treffer = personen.filter(passt)
      return treffer.sort((a, b) => filter.ordnung === 'folie'
        ? ersteFolie(a) - ersteFolie(b) || sortname(a.name).localeCompare(sortname(b.name), 'de')
        : sortname(a.name).localeCompare(sortname(b.name), 'de'))
    }

    function themenMarken(person) {
      return (person.themen || []).map((id) => {
        const th = app.daten.thema(id)
        return th ? h('a.marke-chip.marke-chip--thema', { href: '#/thema/' + th.id }, th.titel) : null
      })
    }

    function eintrag(person) {
      const hk = herkunft(person)
      const folien = person.folien || []
      // Ohne Foliennummer wäre die Folienmarke dasselbe Wort wie die Herkunftsmarke: dann nur die Herkunft.
      const folienMarke = folien.length ? folienText(folien) : (person.quelleText || '')
      return h('li.register__eintrag.karte.karte--eng',
        h('div.person-eintrag__kopf',
          h('span.person__zeichen', { 'aria-hidden': 'true' }, initialen(person.name)),
          h('div.person-eintrag__namen',
            h('h2.person-eintrag__name', person.name),
            person.kurz ? h('p.person-eintrag__kurz', mini(person.kurz, { inline: true })) : null)),
        person.beitrag ? h('div.person-eintrag__beitrag', mini(person.beitrag)) : null,
        h('div.zeile.register__marken',
          folienMarke ? h('span.marke-chip.marke-chip--folie', folienMarke) : null,
          h('span.marke-chip' + (person.quelle === 'extern' ? '.marke-chip--extern' : person.quelle === 'leseliste' ? '.marke-chip--neu' : ''), hk.text),
          themenMarken(person)))
    }

    const liste = h('div.register__huelle')
    const zahl = h('p.leise.registerfilter__zahl', { role: 'status', 'aria-live': 'polite' })

    function zeichneListe() {
      const treffer = gefiltert()
      leeren(liste)
      if (!treffer.length) {
        liste.appendChild(h('div.hinweiskasten',
          h('p', 'Dazu steht nichts im Register. Probiere eine andere Schreibweise oder setze die Filter zurück.'),
          h('button.knopf.knopf--klein', { type: 'button', onclick: () => setzeZurueck() }, 'Filter zurücksetzen')))
      } else {
        liste.appendChild(h('ul.register', treffer.map(eintrag)))
      }
      zahl.textContent = treffer.length === personen.length
        ? `${personen.length} Personen im Register`
        : `${treffer.length} von ${personen.length} Personen`
    }

    const suche = h('input.feld__eingabe', {
      type: 'search', id: 'personen-suche', autocomplete: 'off', placeholder: 'Name oder Stichwort',
    })
    suche.addEventListener('input', () => { filter.suche = suche.value; zeichneListe() })

    const modulWahl = h('select', { id: 'personen-modul' },
      h('option', { value: '' }, 'Alle Module'),
      module.map((m) => h('option', { value: m.id }, m.titel)))
    modulWahl.addEventListener('change', () => { filter.modul = modulWahl.value; zeichneListe() })

    const herkunftWahl = h('select', { id: 'personen-herkunft' },
      h('option', { value: '' }, 'Jede Herkunft'),
      herkuenfte.map((t) => h('option', { value: t }, t)))
    herkunftWahl.addEventListener('change', () => { filter.herkunft = herkunftWahl.value; zeichneListe() })

    const ordnungWahl = h('select', { id: 'personen-ordnung' },
      h('option', { value: 'name' }, 'Alphabetisch'),
      h('option', { value: 'folie' }, 'Wie im Skript'))
    ordnungWahl.addEventListener('change', () => { filter.ordnung = ordnungWahl.value; zeichneListe() })

    function setzeZurueck() {
      filter.suche = ''; filter.modul = ''; filter.herkunft = ''
      suche.value = ''; modulWahl.value = ''; herkunftWahl.value = ''
      zeichneListe()
      suche.focus()
    }

    const registerfilter = h('div.registerfilter',
      h('label.feld.registerfilter__breit', { for: 'personen-suche' }, h('span.feld__label', 'Suchen'), suche),
      module.length > 1 ? h('label.feld', { for: 'personen-modul' }, h('span.feld__label', 'Modul'), modulWahl) : null,
      herkuenfte.length > 1 ? h('label.feld', { for: 'personen-herkunft' }, h('span.feld__label', 'Herkunft'), herkunftWahl) : null,
      h('label.feld', { for: 'personen-ordnung' }, h('span.feld__label', 'Reihenfolge'), ordnungWahl))

    // ---------- Schnelltraining ----------

    // Eine Runde ordnet Personen ihrem Kurzbeitrag zu. Zwei Personen mit demselben Kurzbeitrag wären nicht
    // eindeutig lösbar, deshalb kommt je Kurzbeitrag nur eine Person in die Runden.
    function baueRunden() {
      const gesehen = new Set()
      const tauglich = []
      for (const p of personen) {
        const k = String(p.kurz || '').trim().toLowerCase()
        if (!k || gesehen.has(k)) continue
        gesehen.add(k)
        tauglich.push(p)
      }
      if (tauglich.length < 3) return []
      const gemischt = mische(tauglich)
      const gruppen = []
      for (let i = 0; i < gemischt.length; i += JE_RUNDE) gruppen.push(gemischt.slice(i, i + JE_RUNDE))
      // Ein Rest von ein oder zwei Personen prüft nichts: er wandert in die Runde davor (höchstens 7 Paare).
      if (gruppen.length > 1 && gruppen[gruppen.length - 1].length < 3) {
        const rest = gruppen.pop()
        gruppen[gruppen.length - 1] = gruppen[gruppen.length - 1].concat(rest)
      }
      return gruppen.map((gruppe, i) => ({
        // Präfix "pers-": erzeugte Aufgaben, die nie im Lernstand landen.
        id: 'pers-runde-' + (i + 1),
        typ: 'zuordnung',
        stufe: 'erinnern',
        frage: 'Wer steht wofür? Ordne jede Person ihrem Beitrag im Skript zu.',
        linksTitel: 'Person',
        rechtsTitel: 'Steht im Skript für',
        paare: gruppe.map((p) => ({ links: p.name, rechts: p.kurz })),
        folien: [...new Set(gruppe.flatMap((p) => p.folien || []))].sort((a, b) => a - b),
        erklaerung: 'Das steht im Skript zu diesen Personen:\n'
          + gruppe.map((p) => `- **${p.name}**: ${p.kurz}`).join('\n'),
        belege: gruppe.filter((p) => p.beleg).map((p) => ({ text: p.beleg, quelle: p.belegQuelle })),
      }))
    }

    function zeigeTraining() {
      const runden = baueRunden()
      if (!runden.length) { zeigeRegister(); return }
      // ohneVerbuchen: erzeugte Runden gehören nicht in den Lernstand. Die Fehlerschleife bleibt an,
      // eine Runde mit Fehlern kommt also noch einmal; gezählt wird dann nur ihr letztes Ergebnis.
      const sitzung = app.modell.erzeugeSitzung(runden, { ohneVerbuchen: true })
      const werte = new Map()

      leeren(buehne)
      const feld = h('div')
      const beenden = h('button.knopf.knopf--klein', { type: 'button', onclick: () => zeigeRegister() },
        symbol('zurueck'), 'Training beenden')
      buehne.appendChild(h('section.persontraining', { 'aria-label': 'Schnelltraining: Wer steht wofür?' },
        h('div.zeile.zeile--auseinander.persontraining__kopf',
          h('div',
            h('h2.persontraining__titel', 'Wer steht wofür?'),
            h('p.leise', `${runden.length === 1 ? 'Eine Runde' : runden.length + ' Runden'} aus dem Register. Diese Runden zählen nicht für deinen Lernstand.`)),
          beenden),
        feld))

      function naechste() {
        const item = sitzung.aktuelle
        if (!item) { zeigeErgebnis(); return }
        zeigeAufgabe(feld, item, {
          app,
          zaehler: `Runde ${sitzung.erledigt + 1} von ${sitzung.erledigt + sitzung.rest}`,
          onErgebnis(ergebnis) {
            werte.set(item.id, { richtig: Math.round(ergebnis.punkte * item.paare.length), gesamt: item.paare.length })
            sitzung.beantworte(ergebnis)
          },
          onWeiter(info) {
            if (info && info.uebersprungen) sitzung.beantworte({ punkte: 1, sicher: 'unsicher' })
            naechste()
            window.scrollTo(0, 0)
          },
        })
      }

      function zeigeErgebnis() {
        leeren(feld)
        let richtig = 0
        let gesamt = 0
        for (const w of werte.values()) { richtig += w.richtig; gesamt += w.gesamt }
        const klasse = gesamt && richtig / gesamt >= 0.8 ? 'gut' : gesamt && richtig / gesamt >= 0.5 ? 'mittel' : 'schlecht'
        feld.appendChild(h('div.stapel',
          h('div.hinweiskasten.hinweiskasten--' + klasse,
            h('div.hinweiskasten__titel', 'Durchgang beendet'),
            h('p', `${richtig} von ${gesamt} Zuordnungen richtig.`),
            h('p.leise', 'Das Schnelltraining ist zum Aufwärmen gedacht. Gewertet werden nur die Aufgaben in den Themen, im Training und in der Generalprobe.')),
          h('div.zeile',
            h('button.knopf.knopf--primaer', { type: 'button', onclick: () => { zeigeTraining(); window.scrollTo(0, 0) } },
              symbol('wiederholen'), 'Noch ein Durchgang'),
            h('button.knopf', { type: 'button', onclick: () => zeigeRegister() }, symbol('zurueck'), 'Zurück zum Register'))))
      }

      naechste()
    }

    // ---------- Aufbau ----------

    function zeigeRegister() {
      leeren(buehne)
      const runden = baueRunden()
      buehne.append(
        runden.length
          ? h('div.karte.karte--eng.persontraining__anriss',
            h('div.persontraining__anrisstext',
              h('h2.karte__titel', 'Wer steht wofür?'),
              h('p.leise', 'Ein Schnelltraining aus diesem Register: je Runde fünf Personen zu ihrem Beitrag. Zählt nicht für den Lernstand.')),
            h('button.knopf.knopf--primaer', { type: 'button', onclick: () => { zeigeTraining(); window.scrollTo(0, 0) } },
              symbol('training'), 'Schnelltraining starten'))
          : null,
        registerfilter, zahl, liste)
      zeichneListe()
    }

    zeigeRegister()
    return null
  },
}
