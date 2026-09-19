// Ansicht "Thema": der Lernweg durch ein Thema. Erst Verstehen (die Lernkarten einzeln als Seiten), dann
// Anwenden (die Aufgaben als Sitzung mit Fehlerschleife), zum Schluss der Abschluss mit Stand und
// Stolperstellen. Die Ansicht rechnet nichts selbst: Auswahl, Reihenfolge, Bewertung und Stand kommen
// aus app.modell; der Aufgabenrahmen bringt Frage, Abgabe, Rückmeldung und Beleg mit.
import { h, leeren, symbol, folienText, prozent } from '../mini.js'
import { statusText } from '../lernmodell.js'
import { renderKarte } from '../bausteine/index.js'
import { zeigeAufgabe } from '../aufgabenrahmen.js'

function fokussiere(el) {
  if (!el) return
  // preventScroll: der Blick soll oben am neuen Inhalt bleiben, nicht zum Knopf springen.
  requestAnimationFrame(() => { try { el.focus({ preventScroll: true }) } catch (e) { el.focus() } })
}

export default {
  titel: 'Thema',
  schmal: true,

  render(host, params, app) {
    const thema = app.daten.thema(params.id)
    if (!thema) {
      host.appendChild(h('div.hinweiskasten.hinweiskasten--mittel',
        h('div.hinweiskasten__titel', 'Thema nicht gefunden'),
        h('p', 'Dieses Thema gibt es in dieser Fassung nicht.'),
        h('p', h('a.knopf', { href: '#/plan' }, 'Zum Lernplan'))))
      return null
    }

    const modul = app.daten.modulVonThema(thema.id)
    // Die Zeit auf dieser Seite gehört zum Modul des Themas (app.js setzt das vor jeder Ansicht zurück).
    if (modul) app.zeit.setzeModul(modul.id)

    const karten = thema.lernkarten || []
    const schritte = karten.length ? ['karten', 'aufgaben'] : ['aufgaben']
    const nachbarn = app.daten.nachbarn(thema.id)
    // Wie viele Aufgaben der erste Durchgang bringt. Nur für den Zähler, solange noch keine Sitzung läuft.
    const geplanteAufgaben = app.modell.themaAufgaben(thema).length

    let phase = 'karten'
    let karteIndex = 0
    let sitzung = null
    let nachschlagen = false // Karten mitten in der Aufgabenphase noch einmal angesehen
    let bewegt = false // erst nach einer Bedienung Fokus setzen und nach oben rollen

    // Wiedereinstieg: ungelesene Karten zuerst, sonst gleich zu den Aufgaben.
    const offeneKarten = app.modell.kartenStand(thema).offen
    if (!karten.length || !offeneKarten.length) phase = 'aufgaben'
    else karteIndex = Math.max(0, karten.indexOf(offeneKarten[0]))

    // ---------- Kopf: wo bin ich, woher kommt der Stoff ----------

    host.appendChild(h('nav.brotkrumen', { 'aria-label': 'Wo du gerade bist' },
      modul ? h('a', { href: '#/modul/' + modul.id }, modul.titel) : h('a', { href: '#/plan' }, 'Lernplan'),
      ' › ', thema.titel))

    host.appendChild(h('header.seitenkopf',
      h('p.seitenkopf__ueber', (modul && modul.vorlesung) || 'Lernstoff'),
      h('h1', thema.titel),
      h('p', 'Erst die Lernkarten lesen, dann die Aufgaben dazu. Am Ende siehst du, was sitzt und was noch wackelt.'),
      h('div.zeile.themakopf__marken',
        thema.lernstoff ? h('span.marke-chip.marke-chip--lernstoff', 'Lernstoff laut Skript') : null,
        h('span.marke-chip.marke-chip--folie', folienText(thema.folien, thema.quelleText)))))

    // ---------- Fortschritt: zwei Abschnitte, ein Zähler ----------

    const nummerEls = schritte.map(() => h('span.fortschritt__nummer'))
    const schrittEls = schritte.map((id, i) => h('li.fortschritt__schritt',
      nummerEls[i], id === 'karten' ? 'Verstehen' : 'Anwenden'))
    const balkenWert = h('div.balken__wert', { style: 'width:0%' })
    const fortschrittText = h('p.leise.fortschritt__text', { 'aria-live': 'polite' })
    host.appendChild(h('div.fortschritt',
      h('ol.fortschritt__schritte', schrittEls),
      h('div.balken', balkenWert),
      fortschrittText))

    const buehne = h('div.themabuehne')
    host.appendChild(buehne)

    function zeichneFortschritt() {
      const aufgabenGesamt = sitzung ? sitzung.erledigt + sitzung.rest : geplanteAufgaben
      const gesamt = karten.length + aufgabenGesamt
      let getan = 0
      let neben = ''
      if (phase === 'karten') {
        getan = karteIndex
        neben = `Lernkarte ${karteIndex + 1} von ${karten.length}`
        if (nachschlagen) neben += ' · du blätterst nach, deine Aufgabe wartet'
      } else if (phase === 'aufgaben' && sitzung) {
        // Die Nummer der Aufgabe steht schon im Aufgabenkopf; hier genügt der Schritt.
        getan = karten.length + sitzung.erledigt
      } else {
        getan = gesamt
        neben = 'Thema durchgearbeitet'
      }
      balkenWert.style.width = prozent(gesamt ? getan / gesamt : 1) + '%'
      fortschrittText.textContent = gesamt
        ? `Schritt ${Math.min(getan + 1, gesamt)} von ${gesamt}` + (neben ? ' · ' + neben : '')
        : neben
      schrittEls.forEach((el, i) => {
        const zustand = phase === 'abschluss' ? 'erledigt'
          : schritte[i] === phase ? 'aktiv'
            : schritte.indexOf(phase) > i ? 'erledigt' : 'offen'
        el.classList.toggle('ist-aktiv', zustand === 'aktiv')
        el.classList.toggle('ist-erledigt', zustand === 'erledigt')
        if (zustand === 'aktiv') el.setAttribute('aria-current', 'step')
        else el.removeAttribute('aria-current')
        leeren(nummerEls[i])
        // Zustand nie nur über die Farbe: erledigt trägt einen Haken, offen die Nummer.
        if (zustand === 'erledigt') nummerEls[i].appendChild(symbol('haken'))
        else nummerEls[i].textContent = String(i + 1)
      })
    }

    function nachOben() {
      if (bewegt) window.scrollTo(0, 0)
    }

    // ---------- Abschnitt 1: Verstehen ----------

    function zeigeKarten() {
      phase = 'karten'
      leeren(buehne)
      const karte = karten[karteIndex]
      const letzte = karteIndex === karten.length - 1
      const offen = new Set(app.modell.kartenStand(thema).offen.map((k) => k.id))

      const reiter = h('div.reiter.kartenreiter', { role: 'tablist', 'aria-label': 'Lernkarten dieses Themas' },
        karten.map((k, i) => h('button.kartenreiter__knopf', {
          type: 'button', role: 'tab', 'aria-selected': i === karteIndex ? 'true' : 'false',
          onclick: () => { karteIndex = i; bewegt = true; zeigeKarten() },
        }, offen.has(k.id) ? null : symbol('haken'), h('span', k.titel || 'Lernkarte ' + (i + 1)))))

      const zurueck = h('button.knopf', {
        type: 'button', disabled: karteIndex === 0,
        onclick: () => { karteIndex -= 1; bewegt = true; zeigeKarten() },
      }, symbol('zurueck'), 'Zurück')

      // Weiterblättern heißt: diese Karte ist gelesen. Das Modell führt darüber den Stand des Themas.
      const weiter = h(nachschlagen ? 'button.knopf' : 'button.knopf.knopf--primaer', {
        type: 'button', disabled: nachschlagen && letzte,
        onclick: () => {
          app.modell.karteGelesen(thema.id, karte.id)
          bewegt = true
          if (!letzte) { karteIndex += 1; zeigeKarten() } else zeigeAufgaben()
        },
      }, letzte && !nachschlagen ? 'Zu den Aufgaben' : 'Weiter', symbol('weiter'))

      const zurueckZurAufgabe = nachschlagen
        ? h('button.knopf.knopf--primaer.knopf--block', {
          type: 'button',
          onclick: () => { nachschlagen = false; bewegt = true; zeigeAufgaben() },
        }, symbol('zurueck'), 'Zurück zur Aufgabe')
        : null

      buehne.appendChild(h('section.kartenlauf', { 'aria-label': 'Verstehen: die Lernkarten des Themas' },
        zurueckZurAufgabe,
        karten.length > 1 ? reiter : null,
        h('h2.kartenlauf__titel', karte.titel || 'Lernkarte ' + (karteIndex + 1)),
        h('div.karte', renderKarte(karte, app)),
        h('div.zeile.zeile--auseinander.lauf__navi', zurueck, weiter)))

      zeichneFortschritt()
      nachOben()
      if (bewegt) fokussiere(weiter.disabled ? zurueckZurAufgabe : weiter)
    }

    // ---------- Abschnitt 2: Anwenden ----------

    function starteSitzung(opts) {
      sitzung = app.modell.erzeugeSitzung(app.modell.themaAufgaben(thema, opts))
      bewegt = true
      zeigeAufgaben()
    }

    function zeigeAufgaben() {
      phase = 'aufgaben'
      if (!sitzung) sitzung = app.modell.erzeugeSitzung(app.modell.themaAufgaben(thema))
      const item = sitzung.aktuelle
      if (!item) { zeigeAbschluss(); return }

      leeren(buehne)
      const feld = h('div')
      const nachschlagenZeile = h('div.zeile.lauf__nachschlagen',
        karten.length
          ? h('button.knopf.knopf--still.knopf--klein', {
            type: 'button',
            onclick: () => { nachschlagen = true; bewegt = true; zeigeKarten() },
          }, symbol('buch'), 'Lernkarten noch einmal ansehen')
          : null)
      buehne.appendChild(h('section.aufgabenlauf', { 'aria-label': 'Anwenden: die Aufgaben des Themas' },
        feld, nachschlagenZeile))

      zeigeAufgabe(feld, item, {
        app,
        zaehler: `Aufgabe ${sitzung.erledigt + 1} von ${sitzung.erledigt + sitzung.rest}`,
        onErgebnis(ergebnis) {
          sitzung.beantworte(ergebnis)
          // Nach der Antwort nicht mehr wegblättern: die Rückmeldung gehört zu dieser Aufgabe.
          nachschlagenZeile.remove()
          zeichneFortschritt()
        },
        onWeiter(info) {
          // Konnte der Rahmen die Aufgabe nicht aufbauen, wird sie übersprungen. Sie muss trotzdem aus der
          // Schlange, sonst käme sie sofort wieder; verbucht wird sie als gesehen und unsicher.
          if (info && info.uebersprungen) sitzung.beantworte({ punkte: 1, sicher: 'unsicher' })
          bewegt = true
          zeigeAufgaben()
        },
      })

      zeichneFortschritt()
      nachOben()
    }

    // ---------- Abschluss ----------

    function ergebnisZahl(art, wert, text, symbolName) {
      return h('div.ergebniszahl.ergebniszahl--' + art,
        h('div.ergebniszahl__wert.zahl', String(wert)),
        h('div.ergebniszahl__text', symbol(symbolName), h('span', text)))
    }

    function stolperEintrag(stelle) {
      const a = stelle.aufgabe
      return h('li.stolperstelle',
        h('div.zeile.stolperstelle__marken',
          stelle.irrtum ? h('span.marke-chip.marke-chip--schlecht', 'sicher, aber falsch') : null,
          stelle.offen ? h('span.marke-chip.marke-chip--mittel', 'noch offen') : null,
          stelle.nurUnsicher && !stelle.offen ? h('span.marke-chip', 'war unsicher') : null,
          h('span.marke-chip.marke-chip--folie', folienText(a.folien, thema.quelleText))),
        h('p.stolperstelle__kurz', a.kurz || a.frage || ''))
    }

    function zeigeAbschluss() {
      phase = 'abschluss'
      nachschlagen = false
      leeren(buehne)

      const stand = app.modell.themaStand(thema)
      const stolper = app.modell.stolperstellen(thema)
      const gelaufen = sitzung ? sitzung.ergebnisse : []
      // Eine Aufgabe, die in der Fehlerschleife mehrfach drankam, zählt einmal: mit der letzten Antwort.
      const letzte = new Map()
      for (const e of gelaufen) letzte.set(e.id, e.einordnung)
      let gewusst = 0
      let unsicher = 0
      let falsch = 0
      for (const einordnung of letzte.values()) {
        if (einordnung === 'gewusst') gewusst += 1
        else if (einordnung === 'falsch' || einordnung === 'irrtum') falsch += 1
        else unsicher += 1
      }

      const vertiefung = app.modell.themaAufgaben(thema, { alle: true })
      const alleNochmal = app.modell.themaAufgaben(thema, { alle: true, auchGesehene: true })

      const kopf = h('section.karte.abschluss__ergebnis',
        h('h2', letzte.size ? 'Thema durchgearbeitet' : 'Dieses Thema hast du schon bearbeitet'),
        letzte.size
          ? h('div.ergebniszahlen',
            ergebnisZahl('gut', gewusst, 'gewusst', 'haken'),
            ergebnisZahl('mittel', unsicher, 'unsicher', 'frage'),
            ergebnisZahl('schlecht', falsch, 'falsch', 'kreuz'))
          : h('p', 'Alle Kernaufgaben dieses Themas hast du schon einmal gesehen. Du kannst vertiefen oder alles noch einmal durchgehen.'),
        letzte.size ? h('p.leise', 'Aufgaben, die noch einmal drankamen, zählen einmal, mit deiner letzten Antwort.') : null,
        h('div.zeile.abschluss__stand',
          h('span.ampel.ampel--' + stand.status, 'Stand: ' + statusText(stand.status)),
          h('span.leise', `${stand.gesehen} von ${stand.gesamt} Aufgaben bearbeitet`)),
        h('div.balken.balken--' + stand.status,
          h('div.balken__schatten', { style: `width:${prozent(stand.abdeckung)}%` }),
          h('div.balken__wert', { style: `width:${prozent(stand.wert)}%` })))

      const stolperTeil = stolper.length
        ? h('section.abschluss__stolper',
          h('h3', 'Deine Stolperstellen in diesem Thema'),
          h('p.leise', 'Diese Aussagen haben gehakt. Sie stehen auch auf deinem Lernzettel.'),
          h('ul.stolperliste', stolper.map(stolperEintrag)))
        : h('div.hinweiskasten.hinweiskasten--gut',
          h('p', letzte.size
            ? 'Keine Stolperstellen in diesem Thema. Alles, was du bearbeitet hast, saß auf Anhieb.'
            : 'Für dieses Thema ist nichts als Stolperstelle vermerkt.'))

      const weiterUeben = h('div.zeile.abschluss__ueben',
        vertiefung.length
          ? h('button.knopf', { type: 'button', onclick: () => starteSitzung({ alle: true }) },
            symbol('lernen'), vertiefung.length === 1 ? 'Vertiefung (1 neue Aufgabe)' : `Vertiefung (${vertiefung.length} neue Aufgaben)`)
          : null,
        alleNochmal.length
          ? h('button.knopf', { type: 'button', onclick: () => starteSitzung({ alle: true, auchGesehene: true }) },
            symbol('wiederholen'), `Noch einmal alle Aufgaben (${alleNochmal.length})`)
          : null)

      const nach = nachbarn.nach
      const nachModul = nach ? app.daten.modulVonThema(nach.id) : null
      const weiter = h('div.abschluss__weiter',
        nach
          ? h('a.knopf.knopf--primaer.knopf--gross', { href: '#/thema/' + nach.id },
            'Nächstes Thema: ' + nach.titel, symbol('weiter'))
          : h('a.knopf.knopf--primaer.knopf--gross', { href: '#/training' },
            'Zum gemischten Training', symbol('weiter')),
        nach && nachModul && modul && nachModul.id !== modul.id
          ? h('p.leise', 'Das nächste Thema gehört schon zu ' + nachModul.titel + '.')
          : null,
        h('div.zeile.abschluss__zurueck',
          modul ? h('a.knopf', { href: '#/modul/' + modul.id }, symbol('zurueck'), 'Zurück zum Modul') : null,
          h('a.knopf', { href: '#/lernzettel' }, symbol('zettel'), 'Zum Lernzettel')))

      buehne.appendChild(h('section.stapel', { 'aria-label': 'Abschluss des Themas' },
        kopf, stolperTeil,
        (vertiefung.length || alleNochmal.length) ? weiterUeben : null,
        weiter))

      zeichneFortschritt()
      nachOben()
      if (bewegt) fokussiere(weiter.querySelector('a.knopf'))
    }

    if (phase === 'karten') zeigeKarten()
    else zeigeAufgaben()

    // Beim Verlassen den Lernstand sofort schreiben, damit nichts verloren geht, wenn der Reiter zugeht.
    return () => app.speicher.sichereSofort()
  },
}
