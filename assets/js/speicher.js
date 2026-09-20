// Lernstand im Browser. Alles bleibt auf dem Gerät (localStorage); Export und Import tragen ihn auf ein
// anderes Gerät. Kein Server, kein Konto.
//
// Form des Zustands (Version 1):
// {
//   version: 1,
//   erstellt: <ms>, geaendert: <ms>,
//   aufgaben: { [aufgabeId]: { box: 0..5, faellig: <ms>, versuche, richtig, zuletzt: <ms>,
//                              verlauf: [{t, punkte, sicher}] (max 6), irrtum: bool, erstSicher: bool } },
//   karten:   { [themaId]: { gelesen: [kartenId …] } },
//   notizen:  { [feldId]: 'eigene Mitschrift zu Skriptlücken' },
//   zeitSek:  { gesamt: n, module: { [modulId]: n } },
//   proben:   [ { t, dauerSek, punkte, max, module: { [modulId]: {punkte, max} } } ],
//   einstellungen: { thema: 'auto'|'hell'|'dunkel', klausur: '<ISO lokal>'|null },
//   letzteStelle: { hash, t } | null
// }

const SCHLUESSEL = 'maf-lernstand-v1'
const VERSION = 1

function leer() {
  const jetzt = Date.now()
  return {
    version: VERSION,
    erstellt: jetzt,
    geaendert: jetzt,
    aufgaben: {},
    karten: {},
    notizen: {},
    zeitSek: { gesamt: 0, module: {} },
    proben: [],
    einstellungen: { thema: 'auto', klausur: null },
    letzteStelle: null,
  }
}

function gueltig(z) {
  return z && typeof z === 'object' && z.version === VERSION && z.aufgaben && typeof z.aufgaben === 'object'
}

// Höchstes Fach des Lernmodells. Ein Stand mit einem höheren Wert gälte dort als fertig und fiele
// still aus jeder Wiederholung heraus (fach < 5), deshalb wird hier geklemmt.
const FACH_MAX = 5

// Zahlen je Aufgabe in den gültigen Bereich holen. Für jeden Stand, den diese Lernumgebung selbst
// geschrieben hat, ändert das nichts; es fängt nur von Hand bearbeitete oder fremde Dateien ab.
function klemmeAufgaben(aufgaben) {
  for (const id of Object.keys(aufgaben)) {
    const e = aufgaben[id]
    if (!e || typeof e !== 'object' || Array.isArray(e)) { delete aufgaben[id]; continue }
    const box = Math.round(Number(e.box))
    e.box = Number.isFinite(box) ? Math.max(0, Math.min(FACH_MAX, box)) : 0
    for (const feld of ['faellig', 'versuche', 'richtig', 'zuletzt']) {
      const n = Number(e[feld])
      e[feld] = Number.isFinite(n) ? n : 0
    }
    if (!Array.isArray(e.verlauf)) e.verlauf = []
  }
}

// Fehlende Zweige nachziehen, damit ältere oder von Hand bearbeitete Stände nicht abstürzen
function ergaenze(z) {
  const basis = leer()
  for (const k of Object.keys(basis)) if (z[k] == null) z[k] = basis[k]
  if (!z.zeitSek.module) z.zeitSek.module = {}
  if (!z.einstellungen.thema) z.einstellungen.thema = 'auto'
  klemmeAufgaben(z.aufgaben)
  return z
}

export function erzeugeSpeicher(ablage) {
  let zustand = leer()
  let verfuegbar = true
  let lager = null
  const hoerer = new Set()
  let schreibTimer = 0

  try {
    // Schon der LESENDE Zugriff auf window.localStorage wirft in Safari mit „Alle Cookies blockieren“
    // einen SecurityError. Er muss deshalb hier im try stehen und nicht im Standardwert des Parameters,
    // der vor dem try ausgewertet würde und die ganze Lernumgebung mitrisse.
    lager = ablage || globalThis.localStorage
    const roh = lager.getItem(SCHLUESSEL)
    if (roh) {
      const gelesen = JSON.parse(roh)
      if (gueltig(gelesen)) zustand = ergaenze(gelesen)
    }
  } catch (e) {
    // Privater Modus oder gesperrter Speicher: weiterarbeiten, aber dem Nutzer sagen, dass nichts bleibt
    verfuegbar = false
    lager = null
  }

  function schreibeJetzt() {
    schreibTimer = 0
    zustand.geaendert = Date.now()
    if (!verfuegbar || !lager) return
    try {
      lager.setItem(SCHLUESSEL, JSON.stringify(zustand))
    } catch (e) {
      verfuegbar = false
    }
  }

  function melde() {
    for (const f of hoerer) {
      try { f(zustand) } catch (e) { console.error(e) }
    }
  }

  return {
    get zustand() { return zustand },
    get verfuegbar() { return verfuegbar },

    /** Zustand ändern: aendere((z) => { z.notizen.x = '…' }). Schreibt gebündelt, meldet an Hörer. */
    aendere(fn, opts = {}) {
      fn(zustand)
      if (opts.sofort) schreibeJetzt()
      else if (!schreibTimer) schreibTimer = setTimeout(schreibeJetzt, 400)
      if (!opts.still) melde()
    },

    sichereSofort() { if (schreibTimer) { clearTimeout(schreibTimer) } schreibeJetzt() },

    beiAenderung(fn) { hoerer.add(fn); return () => hoerer.delete(fn) },

    exportiere() {
      return JSON.stringify({ art: 'maf-lernstand', ...zustand }, null, 2)
    },

    /** Gibt {ok, grund} zurück. Ersetzt den Stand vollständig. */
    importiere(text) {
      let daten
      try { daten = JSON.parse(text) } catch (e) { return { ok: false, grund: 'Die Datei ist kein gültiges JSON.' } }
      if (!daten || daten.art !== 'maf-lernstand' || !gueltig(daten)) {
        return { ok: false, grund: 'Das ist kein Lernstand dieser Lernumgebung (oder eine andere Version).' }
      }
      delete daten.art
      zustand = ergaenze(daten)
      schreibeJetzt()
      melde()
      return { ok: true }
    },

    setzeZurueck() {
      const einstellungen = zustand.einstellungen
      zustand = leer()
      zustand.einstellungen = einstellungen
      schreibeJetzt()
      melde()
    },
  }
}
