// Einstellungen (#/einstellungen): Erscheinungsbild und alles rund um den Lernstand. Der Lernstand liegt
// nur in diesem Browser, deshalb sind Export und Import der einzige Weg auf ein zweites Gerät.
import { h, symbol, minutenText, kurzmeldung } from '../mini.js'

const THEMA_WAHL = [
  ['auto', 'Nach System', 'Folgt der Einstellung deines Geräts.'],
  ['hell', 'Hell', 'Immer heller Hintergrund.'],
  ['dunkel', 'Dunkel', 'Immer dunkler Hintergrund, angenehm am Abend.'],
]

const DATEINAME = 'maf-lernstand.json'

/** Datei zum Herunterladen anbieten, ohne Server: Blob und ein kurz eingehängter Verweis. */
function biete(text, name) {
  const url = URL.createObjectURL(new Blob([text], { type: 'application/json' }))
  const verweis = h('a', { href: url, download: name })
  document.body.appendChild(verweis)
  verweis.click()
  verweis.remove()
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}

function datumText(ms) {
  if (!ms) return 'noch nie'
  return new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }).format(new Date(ms)) + ' Uhr'
}

export default {
  titel: 'Einstellungen',
  schmal: true,

  render(host, params, app) {
    const speicher = app.speicher

    host.appendChild(h('div.seitenkopf',
      h('div.seitenkopf__ueber', 'Einstellungen'),
      h('h1', 'Erscheinungsbild und Lernstand'),
      h('p', 'Alles hier wirkt nur auf diesem Gerät.')))

    const bereich = h('div.stapel')
    host.appendChild(bereich)

    // Erscheinungsbild
    const knoepfe = THEMA_WAHL.map(([wert, beschriftung]) =>
      h('button.knopf', {
        type: 'button',
        'aria-pressed': 'false',
        onclick: () => { app.setzeThema(wert); zeigeThema() },
      }, beschriftung))

    function zeigeThema() {
      const jetzt = speicher.zustand.einstellungen.thema || 'auto'
      THEMA_WAHL.forEach(([wert], i) => knoepfe[i].setAttribute('aria-pressed', String(wert === jetzt)))
      erklaerung.textContent = (THEMA_WAHL.find(([w]) => w === jetzt) || THEMA_WAHL[0])[2]
    }
    const erklaerung = h('p.leise')

    bereich.appendChild(h('section.karte.stapel--eng',
      h('div.karte__ueber', 'Erscheinungsbild'),
      h('div.einst__wahl', { role: 'group', 'aria-label': 'Erscheinungsbild' }, knoepfe),
      erklaerung))

    // Lernstand sichern und übertragen
    const meldung = h('div.einst__meldung', { 'aria-live': 'polite' })
    const stand = h('p.leise')

    function melde(klasse, titel, text) {
      meldung.replaceChildren(h('div.hinweiskasten.hinweiskasten--' + klasse,
        h('div.hinweiskasten__titel', titel), h('p', text)))
    }

    function zeigeStand() {
      const g = app.modell.gesamtStand()
      stand.textContent = `${g.gesehen} von ${g.gesamt} Aufgaben bearbeitet · ${minutenText(app.zeit.gesamtMin)} gelernt · zuletzt gespeichert ${datumText(speicher.zustand.geaendert)}`
    }

    const datei = h('input.feld__eingabe.einst__datei', { type: 'file', accept: '.json,application/json' })
    datei.addEventListener('change', async () => {
      const gewaehlt = datei.files && datei.files[0]
      if (!gewaehlt) return
      let text = ''
      try {
        text = await gewaehlt.text()
      } catch (fehler) {
        melde('schlecht', 'Nicht eingelesen', 'Die Datei konnte nicht gelesen werden.')
        return
      }
      const ergebnis = speicher.importiere(text)
      datei.value = ''
      if (!ergebnis.ok) {
        melde('schlecht', 'Nicht eingelesen', ergebnis.grund + ' Dein bisheriger Lernstand ist unverändert.')
        return
      }
      // Das eingelesene Erscheinungsbild sofort anwenden
      app.setzeThema(speicher.zustand.einstellungen.thema || 'auto')
      zeigeThema()
      zeigeStand()
      melde('gut', 'Eingelesen', 'Der Lernstand aus der Datei ist jetzt aktiv. Der vorherige Stand auf diesem Gerät wurde dabei ersetzt.')
      kurzmeldung('Lernstand eingelesen')
    })

    bereich.appendChild(h('section.karte.stapel',
      h('div.karte__ueber', 'Lernstand sichern und übertragen'),
      h('p', `Der Lernstand liegt nur in diesem Browser. Sichere ihn als Datei, bevor du den Browser aufräumst, und lies ihn auf dem zweiten Gerät wieder ein. Die Datei heißt ${DATEINAME} und enthält nur deine Ergebnisse, Notizen und Zeiten.`),
      stand,
      h('div.zeile',
        h('button.knopf.knopf--primaer', {
          type: 'button',
          onclick: () => { biete(speicher.exportiere(), DATEINAME); kurzmeldung('Lernstand gesichert') },
        }, symbol('zettel'), 'Lernstand sichern')),
      h('label.feld',
        h('span.feld__label', 'Lernstand aus einer Datei einlesen'),
        datei),
      h('p.leise', 'Beim Einlesen wird der Stand auf diesem Gerät vollständig ersetzt. Sichere ihn vorher, wenn du ihn behalten willst.'),
      meldung))

    // Zurücksetzen, mit Rückfrage in der Seite statt im Browserdialog
    const frage = h('div.hinweiskasten.hinweiskasten--schlecht', { hidden: true })
    const loeschen = h('button.knopf.knopf--gefahr', {
      type: 'button',
      onclick: () => { frage.hidden = false; loeschen.hidden = true; frage.querySelector('button').focus() },
    }, symbol('kreuz'), 'Lernstand zurücksetzen')

    frage.append(
      h('div.hinweiskasten__titel', 'Wirklich zurücksetzen?'),
      h('p', 'Alle Ergebnisse, Wiederholungen, Notizen und Zeiten auf diesem Gerät werden gelöscht. Das lässt sich nicht rückgängig machen. Dein Erscheinungsbild bleibt erhalten.'),
      h('div.zeile',
        h('button.knopf.knopf--gefahr', {
          type: 'button',
          onclick: () => {
            speicher.setzeZurueck()
            frage.hidden = true
            loeschen.hidden = false
            zeigeStand()
            melde('mittel', 'Zurückgesetzt', 'Der Lernstand auf diesem Gerät ist leer. Du fängst wieder von vorn an.')
            kurzmeldung('Lernstand zurückgesetzt')
          },
        }, 'Ja, alles löschen'),
        h('button.knopf', {
          type: 'button',
          onclick: () => { frage.hidden = true; loeschen.hidden = false; loeschen.focus() },
        }, 'Abbrechen')))

    bereich.appendChild(h('section.karte.stapel--eng',
      h('div.karte__ueber', 'Von vorn anfangen'),
      h('p.leise', 'Setzt den Lernstand auf diesem Gerät zurück, zum Beispiel wenn jemand anderes damit lernen möchte.'),
      loeschen,
      frage))

    // Datenschutz
    bereich.appendChild(h('section.hinweiskasten',
      h('div.hinweiskasten__titel', 'Was mit deinen Daten passiert'),
      h('p', 'Nichts verlässt deinen Browser. Es gibt kein Konto, keine Anmeldung, keine Messung deines Verhaltens und keine Dienste von außen: keine Schriften, keine Skripte, keine Bilder von fremden Servern.'),
      h('p', 'Deine Ergebnisse, deine Notizen zu den Lücken im Skript und deine Lernzeiten liegen im Speicher dieses Browsers unter dem Namen maf-lernstand-v1. Löschst du die Browserdaten, ist der Lernstand weg; deshalb die Sicherung als Datei.'),
      h('p.leise', 'Die Lernumgebung ist für dich gebaut, nicht für eine Auswertung. Es sieht niemand, was du hier tust.')))

    zeigeThema()
    zeigeStand()
    return null
  },
}
