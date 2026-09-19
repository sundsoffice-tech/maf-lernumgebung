// Lernmodell: entscheidet, was als Nächstes drankommt, und misst, wie sicher ein Thema sitzt.
//
// Grundidee (auf zwei Tage und rund 10 Stunden zugeschnitten):
// - Jede Aufgabe liegt in einem Fach 0..5. Fach 0 = nie gesehen. Richtig und sicher hebt das Fach,
//   unsicher hält es niedrig, falsch setzt auf Fach 1 zurück.
// - Wer eine Aufgabe beim ERSTEN Kontakt richtig und sicher löst, springt direkt in Fach 3: Bekanntes wird
//   nicht mit derselben Intensität wiederholt. Bestätigt wird es trotzdem einmal mit Abstand.
// - Falsch UND sicher ist ein Irrtum: das gefährlichste Ergebnis, es wird gemerkt und auf dem Lernzettel
//   eigens ausgewiesen.
// - Die Abstände sind kurz (Minuten bis anderthalb Tage), weil die Klausur in zwei Tagen ist.
//
// Das Modul ist frei von DOM und Zufall von außen steuerbar, damit es unter node testbar bleibt
// (werkzeug/test_lernmodell.mjs).

export const FACH_WERT = [0, 0.2, 0.45, 0.75, 0.9, 1]
export const FACH_ABSTAND_MIN = [0, 4, 25, 180, 720, 2160]
export const SCHWELLE_SITZT = 0.7
export const SCHWELLE_WACKELIG = 0.4
// Noch nicht gesehene Vertiefungsaufgaben erben einen Teil der gezeigten Leistung im Thema,
// aber erst, wenn der Kern des Themas vollständig bearbeitet ist.
const ERBE_FAKTOR = 0.9
const MAX_NACHFRAGEN_JE_SITZUNG = 2

const SEKUNDEN_JE_TYP = {
  mc: 35, mehrfach: 50, wahrfalsch: 60, zuordnung: 70, sortieren: 60, kategorien: 70,
  luecke: 60, karte: 25, erklaeren: 150, fall: 90, beschriften: 80,
}
const SEKUNDEN_JE_KARTE = 70
const STUFEN_RANG = { erinnern: 0, verstehen: 1, anwenden: 2, abgrenzen: 3, transfer: 4 }

function gewicht(aufgabe) {
  const s = [1, 1.4, 1.8][(aufgabe.schwierigkeit || 1) - 1] || 1
  return s * (aufgabe.kern ? 1.25 : 1)
}

export function erzeugeModell(daten, speicher, opts = {}) {
  const jetzt = opts.jetzt || (() => Date.now())
  const zufall = opts.zufall || Math.random

  const stand = (id) => speicher.zustand.aufgaben[id] || null
  const fach = (id) => (stand(id) ? stand(id).box : 0)
  const gesehen = (id) => !!(stand(id) && stand(id).versuche > 0)

  /** Ergebnis einer Aufgabe verbuchen. punkte 0..1, sicher 'sicher' | 'unsicher'. Gibt die Einordnung zurück. */
  function verbuche(id, { punkte, sicher }) {
    const t = jetzt()
    const p = Math.max(0, Math.min(1, Number(punkte) || 0))
    const istSicher = sicher === 'sicher'
    let einordnung
    speicher.aendere((z) => {
      const e = z.aufgaben[id] || (z.aufgaben[id] = { box: 0, faellig: 0, versuche: 0, richtig: 0, zuletzt: 0, verlauf: [], irrtum: false, erstSicher: false })
      const erstkontakt = e.versuche === 0
      const voll = p >= 0.999
      const teil = !voll && p >= 0.5
      if (voll && istSicher) {
        e.box = erstkontakt ? 3 : Math.min(5, Math.max(e.box, 1) + 1)
        if (erstkontakt) e.erstSicher = true
        einordnung = 'gewusst'
      } else if (voll) {
        // richtig, aber unsicher: bleibt in der Nähe, steigt ohne sichere Antwort nie über Fach 3
        e.box = erstkontakt ? 2 : Math.min(3, Math.max(2, e.box + 1))
        einordnung = 'unsicher'
      } else if (teil) {
        e.box = Math.max(1, Math.min(2, e.box - 1))
        einordnung = 'teilweise'
      } else {
        e.box = 1
        if (istSicher) e.irrtum = true
        einordnung = istSicher ? 'irrtum' : 'falsch'
      }
      e.versuche += 1
      if (voll) e.richtig += 1
      e.zuletzt = t
      e.faellig = t + FACH_ABSTAND_MIN[e.box] * 60000
      e.verlauf.push({ t, punkte: Math.round(p * 100) / 100, sicher: istSicher ? 'sicher' : 'unsicher' })
      if (e.verlauf.length > 6) e.verlauf.splice(0, e.verlauf.length - 6)
    })
    return einordnung
  }

  function karteGelesen(themaId, kartenId) {
    speicher.aendere((z) => {
      const k = z.karten[themaId] || (z.karten[themaId] = { gelesen: [] })
      if (!k.gelesen.includes(kartenId)) k.gelesen.push(kartenId)
    })
  }

  function kartenStand(thema) {
    const gelesen = (speicher.zustand.karten[thema.id] || { gelesen: [] }).gelesen
    const alle = thema.lernkarten || []
    const offen = alle.filter((k) => !gelesen.includes(k.id))
    return { gesamt: alle.length, gelesen: alle.length - offen.length, offen }
  }

  /** Beherrschung eines Themas: {wert 0..1, abdeckung 0..1, status, gesehen, gesamt, faellig, irrtuemer} */
  function themaStand(thema) {
    const aufgaben = thema.aufgaben || []
    const t = jetzt()
    const gesehene = aufgaben.filter((a) => gesehen(a.id))
    const kern = aufgaben.filter((a) => a.kern)
    const kernFertig = kern.length > 0 && kern.every((a) => gesehen(a.id))
    const mittelGesehen = gesehene.length
      ? gesehene.reduce((s, a) => s + FACH_WERT[fach(a.id)], 0) / gesehene.length
      : 0
    let summe = 0
    let gewichte = 0
    for (const a of aufgaben) {
      const w = gewicht(a)
      gewichte += w
      if (gesehen(a.id)) summe += w * FACH_WERT[fach(a.id)]
      else if (kernFertig && !a.kern) summe += w * ERBE_FAKTOR * mittelGesehen
    }
    const wert = gewichte ? summe / gewichte : 0
    const karten = kartenStand(thema)
    let status = 'offen'
    if (gesehene.length > 0) status = wert >= SCHWELLE_SITZT ? 'gut' : wert >= SCHWELLE_WACKELIG ? 'mittel' : 'schlecht'
    return {
      wert,
      status,
      abdeckung: aufgaben.length ? gesehene.length / aufgaben.length : 0,
      gesehen: gesehene.length,
      gesamt: aufgaben.length,
      kernFertig,
      kartenFertig: karten.offen.length === 0,
      faellig: gesehene.filter((a) => stand(a.id).faellig <= t && fach(a.id) < 5).length,
      irrtuemer: aufgaben.filter((a) => stand(a.id) && stand(a.id).irrtum && fach(a.id) < 4).length,
    }
  }

  function modulStand(modul) {
    const themen = modul.themen || []
    let summe = 0, gew = 0, gesehenN = 0, gesamtN = 0, faellig = 0, fertigeThemen = 0
    for (const th of themen) {
      const s = themaStand(th)
      const w = th.gewicht || 1
      summe += w * s.wert
      gew += w
      gesehenN += s.gesehen
      gesamtN += s.gesamt
      faellig += s.faellig
      if (s.kernFertig && s.kartenFertig) fertigeThemen += 1
    }
    const wert = gew ? summe / gew : 0
    let status = 'offen'
    if (gesehenN > 0) status = wert >= SCHWELLE_SITZT ? 'gut' : wert >= SCHWELLE_WACKELIG ? 'mittel' : 'schlecht'
    return { wert, status, gesehen: gesehenN, gesamt: gesamtN, faellig, fertigeThemen, themen: themen.length,
      abdeckung: gesamtN ? gesehenN / gesamtN : 0 }
  }

  function gesamtStand() {
    let summe = 0, gew = 0, faellig = 0, gesehenN = 0, gesamtN = 0
    for (const m of daten.module) {
      const s = modulStand(m)
      const w = m.zeitMin || 1
      summe += w * s.wert
      gew += w
      faellig += s.faellig
      gesehenN += s.gesehen
      gesamtN += s.gesamt
    }
    return { wert: gew ? summe / gew : 0, faellig, gesehen: gesehenN, gesamt: gesamtN }
  }

  /** Alle fälligen Aufgaben, die wackeligsten zuerst. */
  function faellige() {
    const t = jetzt()
    return daten.alleAufgaben
      .filter((a) => gesehen(a.id) && fach(a.id) < 5 && stand(a.id).faellig <= t)
      .sort((a, b) => fach(a.id) - fach(b.id) || stand(a.id).faellig - stand(b.id).faellig)
  }

  /** Reihenfolge für den ersten Durchgang eines Themas: Kernaufgaben, leichte Stufen zuerst, Typen gemischt. */
  function themaAufgaben(thema, opts2 = {}) {
    const pool = (thema.aufgaben || []).filter((a) => (opts2.alle ? true : a.kern) && (opts2.auchGesehene ? true : !gesehen(a.id)))
    const sortiert = pool.slice().sort((a, b) =>
      (STUFEN_RANG[a.stufe] ?? 1) - (STUFEN_RANG[b.stufe] ?? 1) || (a.schwierigkeit || 1) - (b.schwierigkeit || 1))
    return entzerreTypen(sortiert)
  }

  // Gleiche Aufgabentypen nicht direkt hintereinander, soweit die Stufenfolge es zulässt
  function entzerreTypen(liste) {
    const a = liste.slice()
    for (let i = 1; i < a.length; i++) {
      if (a[i].typ !== a[i - 1].typ) continue
      const j = a.findIndex((x, k) => k > i && x.typ !== a[i - 1].typ && (STUFEN_RANG[x.stufe] ?? 1) - (STUFEN_RANG[a[i].stufe] ?? 1) <= 1)
      if (j > -1) { const [x] = a.splice(j, 1); a.splice(i, 0, x) }
    }
    return a
  }

  /** Bei einem Fehler: eine noch ungesehene Aufgabe zum selben Konzept nachschieben. */
  function nachschub(aufgabe, ausgeschlossen = new Set()) {
    if (!aufgabe.konzept) return null
    const thema = daten.themaVonAufgabe(aufgabe.id)
    if (!thema) return null
    const kandidaten = (thema.aufgaben || []).filter((a) =>
      a.id !== aufgabe.id && a.konzept === aufgabe.konzept && !gesehen(a.id) && !ausgeschlossen.has(a.id))
    return kandidaten[0] || null
  }

  /** Gemischtes Training: Fälliges zuerst, dann Lücken aus schwachen Themen, dann Festigung. Themen verschränkt. */
  function trainingsAuswahl(anzahl = 15, opts2 = {}) {
    const gewaehlt = []
    const drin = new Set()
    const nimm = (a) => { if (a && !drin.has(a.id) && gewaehlt.length < anzahl) { drin.add(a.id); gewaehlt.push(a) } }
    const imBereich = (a) => !opts2.modulId || daten.modulVonAufgabe(a.id)?.id === opts2.modulId

    faellige().filter(imBereich).forEach(nimm)

    // Schwache Themen: ungesehene Aufgaben aus bereits begonnenen Themen, schwächstes Thema zuerst
    const begonnen = daten.alleThemen
      .filter((th) => !opts2.modulId || daten.modulVonThema(th.id)?.id === opts2.modulId)
      .map((th) => ({ th, s: themaStand(th) }))
      .filter((x) => x.s.gesehen > 0)
      .sort((x, y) => x.s.wert - y.s.wert)
    for (const { th } of begonnen) {
      if (gewaehlt.length >= anzahl) break
      themaAufgaben(th, { alle: true }).slice(0, 3).forEach(nimm)
    }

    // Festigung: gesehene Aufgaben mit niedrigstem Fach, auch wenn noch nicht fällig
    daten.alleAufgaben
      .filter((a) => gesehen(a.id) && fach(a.id) <= 3 && imBereich(a))
      .sort((a, b) => fach(a.id) - fach(b.id) || stand(a.id).zuletzt - stand(b.id).zuletzt)
      .forEach(nimm)

    return verschraenke(gewaehlt)
  }

  // Aufgaben desselben Themas auseinanderziehen: Wechsel zwischen Themen schärft die Unterscheidung
  function verschraenke(liste) {
    const nachThema = new Map()
    for (const a of liste) {
      const k = daten.themaVonAufgabe(a.id)?.id || '?'
      if (!nachThema.has(k)) nachThema.set(k, [])
      nachThema.get(k).push(a)
    }
    const reihen = [...nachThema.values()]
    const aus = []
    while (reihen.some((r) => r.length)) {
      for (const r of reihen) if (r.length) aus.push(r.shift())
    }
    return aus
  }

  /** Generalprobe: alle Module anteilig nach Lernzeit, offene Erklär- und Fallaufgaben bevorzugt, Schwächen stärker. */
  function probeAuswahl(anzahl = 30) {
    const gesamtMin = daten.module.reduce((s, m) => s + (m.zeitMin || 1), 0)
    const aus = []
    for (const m of daten.module) {
      const soll = Math.max(2, Math.round(anzahl * (m.zeitMin || 1) / gesamtMin))
      const pool = (m.themen || []).flatMap((th) => {
        const s = themaStand(th)
        return (th.aufgaben || []).map((a) => {
          const typBonus = a.typ === 'erklaeren' ? 3 : a.typ === 'fall' ? 2.5 : a.typ === 'karte' ? 0.4 : 1
          const schwaeche = 1 + (1 - s.wert) * 1.5
          const irrtum = stand(a.id)?.irrtum ? 1.5 : 1
          return { a, score: typBonus * schwaeche * irrtum * (0.6 + zufall() * 0.8) }
        })
      })
      pool.sort((x, y) => y.score - x.score)
      // Höchstens zwei Aufgaben je Thema, damit die Probe das ganze Modul abdeckt
      const jeThema = new Map()
      for (const { a } of pool) {
        if (aus.filter((x) => daten.modulVonAufgabe(x.id)?.id === m.id).length >= soll) break
        const k = daten.themaVonAufgabe(a.id)?.id
        const n = jeThema.get(k) || 0
        if (n >= 2) continue
        jeThema.set(k, n + 1)
        aus.push(a)
      }
    }
    return verschraenke(aus).slice(0, anzahl + 4)
  }

  /** Eine Übungssitzung mit Fehlerschleife: Falsches kommt nach wenigen anderen Aufgaben wieder. */
  function erzeugeSitzung(aufgaben, opts2 = {}) {
    const schlange = aufgaben.slice()
    const nachfragen = new Map()
    const drin = new Set(schlange.map((a) => a.id))
    const ergebnisse = []
    let erledigt = 0
    return {
      get aktuelle() { return schlange[0] || null },
      get rest() { return schlange.length },
      get erledigt() { return erledigt },
      get ergebnisse() { return ergebnisse },
      beantworte(ergebnis) {
        const a = schlange.shift()
        if (!a) return null
        erledigt += 1
        const einordnung = opts2.ohneVerbuchen ? null : verbuche(a.id, ergebnis)
        ergebnisse.push({ id: a.id, punkte: ergebnis.punkte, sicher: ergebnis.sicher, einordnung })
        const schwach = ergebnis.punkte < 0.999
        if (schwach && !opts2.ohneSchleife) {
          const n = nachfragen.get(a.id) || 0
          if (n < MAX_NACHFRAGEN_JE_SITZUNG) {
            nachfragen.set(a.id, n + 1)
            schlange.splice(Math.min(schlange.length, 4), 0, a)
          }
          if (ergebnis.punkte < 0.5) {
            const extra = nachschub(a, drin)
            if (extra) { drin.add(extra.id); schlange.splice(Math.min(schlange.length, 2), 0, extra) }
          }
        }
        return einordnung
      },
    }
  }

  /** Was die Lernumgebung als Nächstes empfiehlt. */
  function naechsterSchritt() {
    const f = faellige()
    const dringend = f.filter((a) => fach(a.id) <= 2)
    if (dringend.length >= 5) return { art: 'wiederholen', anzahl: f.length, grund: 'Wackelige Inhalte zuerst festigen' }
    for (const th of daten.alleThemen) {
      const s = themaStand(th)
      if (!s.kartenFertig || !s.kernFertig) return { art: 'thema', themaId: th.id, begonnen: s.gesehen > 0 || kartenStand(th).gelesen > 0 }
    }
    if (f.length) return { art: 'wiederholen', anzahl: f.length, grund: 'Wiederholungen sind fällig' }
    const schwach = daten.alleThemen.map((th) => ({ th, s: themaStand(th) })).filter((x) => x.s.wert < SCHWELLE_SITZT)
    if (schwach.length) return { art: 'schwaechen', anzahl: schwach.length }
    return { art: 'probe' }
  }

  /** Geschätzte Restzeit für den ersten Durchgang (ungelesene Karten, ungesehene Kernaufgaben), in Minuten. */
  function restzeitMin(bereich) {
    const themen = bereich ? (bereich.themen || [bereich]) : daten.alleThemen
    let sek = 0
    for (const th of themen) {
      sek += kartenStand(th).offen.length * SEKUNDEN_JE_KARTE
      for (const a of th.aufgaben || []) if (a.kern && !gesehen(a.id)) sek += SEKUNDEN_JE_TYP[a.typ] || 60
    }
    return sek / 60
  }

  /** Aufgaben, an denen es gehakt hat, für den persönlichen Lernzettel. */
  function stolperstellen(thema) {
    return (thema.aufgaben || [])
      .map((a) => ({ a, e: stand(a.id) }))
      .filter(({ e }) => e && (e.irrtum || e.verlauf.some((v) => v.punkte < 0.999 || v.sicher !== 'sicher')))
      .map(({ a, e }) => ({
        aufgabe: a,
        irrtum: !!e.irrtum,
        offen: e.box < 3,
        nurUnsicher: !e.irrtum && e.verlauf.every((v) => v.punkte >= 0.999),
      }))
  }

  function lernzettelModus(thema) {
    const s = themaStand(thema)
    if (s.status === 'offen') return 'ausfuehrlich'
    const haken = stolperstellen(thema).some((x) => x.offen || x.irrtum)
    return s.wert >= SCHWELLE_SITZT && !haken ? 'kompakt' : 'ausfuehrlich'
  }

  return {
    verbuche, karteGelesen, kartenStand, themaStand, modulStand, gesamtStand, faellige,
    themaAufgaben, trainingsAuswahl, probeAuswahl, erzeugeSitzung, naechsterSchritt,
    restzeitMin, stolperstellen, lernzettelModus, fach, gesehen, stand,
  }
}

export function statusText(status) {
  return { offen: 'noch offen', schlecht: 'Lücke', mittel: 'wackelig', gut: 'sitzt' }[status] || status
}
