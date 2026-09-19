// Prüft die Kursdaten gegen den Datenvertrag. Aufruf: node werkzeug/pruefe_daten.mjs [m1.json …]
// Ohne Argumente: alles, was in daten/module.json steht, plus personen, glossar, quellen.
// Exit-Code 1 bei Fehlern. Warnungen brechen nicht ab.
import { readFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), '..')
const DATEN = join(WURZEL, 'daten')

const STUFEN = ['erinnern', 'verstehen', 'anwenden', 'abgrenzen', 'transfer']
const TYPEN = ['mc', 'mehrfach', 'wahrfalsch', 'zuordnung', 'sortieren', 'kategorien', 'luecke', 'karte', 'erklaeren', 'fall', 'beschriften']
const BLOCKTYPEN = ['einfach', 'text', 'definition', 'merksatz', 'zitat', 'liste', 'tabelle', 'vergleich', 'person', 'diagramm', 'extern', 'skriptluecke', 'hinweis', 'merkhilfe']
const DIAGRAMME = {
  entwicklungstypen: ['typen', 'formen'], wachstumsphasen: ['phasen', 'krisen'], persuasion: ['modi'],
  fuehrungsbeziehungen: ['beziehungen'], 'blake-mouton': ['stile'], 'motivation-quellen': ['quellen'],
  maslow: ['stufen', 'motive'], herzberg: ['faktoren'], 'verhalten-determinanten': ['faktoren'], tuckman: ['phasen'],
  problemtypen: ['typen'], 'change-kurve': ['stationen', 'kotter', 'lewin'], widerstand: ['spektrum', 'ursachen'],
  kongruenzmodell: ['elemente'], phasenverschiebung: ['ebenen'], vergessenskurve: ['kurven'],
  lencioni: ['funktionen', 'dysfunktionen'],
}

const fehler = []
const warnungen = []
const F = (wo, was) => fehler.push(`${wo}: ${was}`)
const W = (wo, was) => warnungen.push(`${wo}: ${was}`)

function lies(datei) {
  const pfad = join(DATEN, datei)
  if (!existsSync(pfad)) { F(datei, 'Datei fehlt'); return null }
  const roh = readFileSync(pfad, 'utf8')
  if (roh.charCodeAt(0) === 0xfeff) F(datei, 'BOM am Dateianfang')
  try { return JSON.parse(roh) } catch (e) { F(datei, 'kein gültiges JSON: ' + e.message); return null }
}

const istText = (x) => typeof x === 'string' && x.trim().length > 0
const istListe = (x, min = 1) => Array.isArray(x) && x.length >= min
const htmlVerdacht = (s) => /<\/?(?:b|i|p|br|div|span|strong|em|ul|li|a|h\d)\b/i.test(String(s))

function pruefeTexte(wo, obj) {
  // Kein HTML in Datenfeldern, keine unausgeglichenen Auszeichnungen
  const geh = (x, pfad) => {
    if (typeof x === 'string') {
      if (htmlVerdacht(x)) F(wo, `HTML in Textfeld ${pfad}`)
      if ((x.match(/\*\*/g) || []).length % 2) W(wo, `ungerade Zahl von ** in ${pfad}`)
      if ((x.match(/==/g) || []).length % 2) W(wo, `ungerade Zahl von == in ${pfad}`)
      if (/�/.test(x)) F(wo, `kaputtes Zeichen (U+FFFD) in ${pfad}`)
    } else if (Array.isArray(x)) x.forEach((y, i) => geh(y, `${pfad}[${i}]`))
    else if (x && typeof x === 'object') for (const [k, v] of Object.entries(x)) geh(v, pfad ? `${pfad}.${k}` : k)
  }
  geh(obj, '')
}

const alleIds = new Set()
function merkeId(wo, id) {
  if (!istText(id)) return F(wo, 'id fehlt')
  if (!/^[a-z0-9-]+$/.test(id)) F(wo, `id "${id}" nicht klein/ASCII`)
  if (alleIds.has(id)) F(wo, `id "${id}" doppelt`)
  alleIds.add(id)
}

function pruefeBlock(wo, b, kartenIds) {
  if (!b || !BLOCKTYPEN.includes(b.typ)) return F(wo, `unbekannter Blocktyp "${b && b.typ}"`)
  const braucht = {
    einfach: ['text'], text: ['text'], definition: ['begriff', 'text'], merksatz: ['text'], zitat: ['text'],
    hinweis: ['text'], merkhilfe: ['text'], person: ['name', 'beitrag'], diagramm: ['ref'], extern: ['quelle', 'titel'],
    skriptluecke: ['id', 'text'],
  }[b.typ] || []
  for (const k of braucht) if (!istText(b[k])) F(wo, `Block ${b.typ}: Feld "${k}" fehlt`)
  if (b.typ === 'liste' && !istListe(b.punkte)) F(wo, 'Block liste: punkte fehlen')
  if (b.typ === 'extern' && !istListe(b.punkte)) F(wo, 'Block extern: punkte fehlen')
  if (b.typ === 'tabelle') {
    if (!istListe(b.zeilen)) F(wo, 'Block tabelle: zeilen fehlen')
    else {
      const breite = b.kopf ? b.kopf.length : b.zeilen[0].length
      b.zeilen.forEach((z, i) => { if (!Array.isArray(z) || z.length !== breite) F(wo, `Block tabelle: Zeile ${i + 1} hat ${z && z.length} statt ${breite} Zellen`) })
    }
  }
  if (b.typ === 'vergleich') {
    if (!istListe(b.spalten, 2) || b.spalten.length > 3) F(wo, 'Block vergleich: 2 bis 3 spalten nötig')
    else b.spalten.forEach((s, i) => { if (!istText(s.titel) || !istListe(s.punkte)) F(wo, `Block vergleich: Spalte ${i + 1} unvollständig`) })
  }
  if (b.typ === 'diagramm' && !DIAGRAMME[b.ref]) F(wo, `Block diagramm: ref "${b.ref}" nicht im Katalog`)
  if (b.typ === 'skriptluecke') {
    if (!istListe(b.felder)) F(wo, 'Block skriptluecke: felder fehlen')
    else b.felder.forEach((f) => { if (!istText(f.id) || !istText(f.label)) F(wo, 'Block skriptluecke: Feld ohne id/label') })
  }
}

function pruefeAufgabe(wo, a, kartenIds) {
  merkeId(wo, a.id)
  if (!TYPEN.includes(a.typ)) return F(wo, `unbekannter Typ "${a.typ}"`)
  if (!STUFEN.includes(a.stufe)) F(wo, `stufe "${a.stufe}" ungültig`)
  if (![1, 2, 3].includes(a.schwierigkeit)) F(wo, 'schwierigkeit muss 1, 2 oder 3 sein')
  if (typeof a.kern !== 'boolean') F(wo, 'kern muss true/false sein')
  if (!istText(a.konzept)) F(wo, 'konzept fehlt')
  if (!Array.isArray(a.folien)) F(wo, 'folien muss eine Liste sein')
  else a.folien.forEach((f) => { if (!Number.isInteger(f) || f < 30 || f > 84) F(wo, `Foliennummer ${f} außerhalb 30 bis 84`) })
  if (a.typ !== 'karte' && !istText(a.frage)) F(wo, 'frage fehlt')
  if (!istText(a.erklaerung)) F(wo, 'erklaerung fehlt')
  if (!istText(a.kurz)) F(wo, 'kurz fehlt (Zeile für den Lernzettel)')
  const belege = a.belege || (a.beleg ? [{ text: a.beleg, quelle: a.belegQuelle }] : [])
  if (!belege.length) F(wo, 'beleg fehlt')
  belege.forEach((b) => { if (!istText(b.text) || !/^(folie-\d\d|extern-[a-z]+)$/.test(b.quelle || '')) F(wo, `beleg unvollständig oder belegQuelle "${b.quelle}" ungültig`) })
  if (a.karte && !kartenIds.has(a.karte)) F(wo, `karte "${a.karte}" existiert nicht`)
  if (!a.karte) W(wo, 'keine karte verknüpft (Erklärung nachschlagen fehlt)')

  const t = a.typ === 'fall' ? (a.modus === 'offen' ? 'erklaeren' : 'mc') : a.typ
  if (a.typ === 'fall') {
    if (!istText(a.szenario)) F(wo, 'fall: szenario fehlt')
    if (!['mc', 'offen'].includes(a.modus)) F(wo, 'fall: modus muss "mc" oder "offen" sein')
  }
  if (t === 'mc') {
    if (!istListe(a.optionen, 3)) F(wo, 'mc: mindestens 3 optionen')
    else if (!Number.isInteger(a.richtig) || a.richtig < 0 || a.richtig >= a.optionen.length) F(wo, 'mc: richtig ist kein gültiger Index')
    if (istListe(a.optionen) && new Set(a.optionen).size !== a.optionen.length) F(wo, 'mc: doppelte optionen')
  }
  if (t === 'mehrfach') {
    if (!istListe(a.optionen, 4)) F(wo, 'mehrfach: mindestens 4 optionen')
    if (!istListe(a.richtig, 1)) F(wo, 'mehrfach: richtig[] fehlt')
    else {
      a.richtig.forEach((i) => { if (!Number.isInteger(i) || i < 0 || i >= (a.optionen || []).length) F(wo, `mehrfach: Index ${i} ungültig`) })
      if (a.richtig.length === (a.optionen || []).length) W(wo, 'mehrfach: alle Optionen richtig')
    }
  }
  if (t === 'wahrfalsch') {
    if (!istListe(a.aussagen, 3)) F(wo, 'wahrfalsch: mindestens 3 aussagen')
    else a.aussagen.forEach((s, i) => {
      if (!istText(s.text) || typeof s.wahr !== 'boolean') F(wo, `wahrfalsch: Aussage ${i + 1} unvollständig`)
      if (s.wahr === false && !istText(s.korrektur)) F(wo, `wahrfalsch: falsche Aussage ${i + 1} braucht korrektur`)
    })
  }
  if (t === 'zuordnung') {
    if (!istListe(a.paare, 3) || a.paare.length > 7) F(wo, 'zuordnung: 3 bis 7 paare')
    else {
      a.paare.forEach((p, i) => { if (!istText(p.links) || !istText(p.rechts)) F(wo, `zuordnung: Paar ${i + 1} unvollständig`) })
      if (new Set(a.paare.map((p) => p.rechts)).size !== a.paare.length) F(wo, 'zuordnung: rechte Seiten nicht eindeutig')
      if (new Set(a.paare.map((p) => p.links)).size !== a.paare.length) F(wo, 'zuordnung: linke Seiten nicht eindeutig')
    }
  }
  if (t === 'sortieren' && (!istListe(a.elemente, 3) || a.elemente.length > 10)) F(wo, 'sortieren: 3 bis 10 elemente')
  if (t === 'kategorien') {
    if (!istListe(a.kategorien, 2) || a.kategorien.length > 4) F(wo, 'kategorien: 2 bis 4 kategorien')
    if (!istListe(a.elemente, 4)) F(wo, 'kategorien: mindestens 4 elemente')
    else a.elemente.forEach((e, i) => { if (!istText(e.text) || !Number.isInteger(e.kategorie) || e.kategorie < 0 || e.kategorie >= (a.kategorien || []).length) F(wo, `kategorien: Element ${i + 1} ungültig`) })
  }
  if (t === 'luecke') {
    // Lücken stehen als {_Lösung|Alternative_}; {{…}} ist der Personenverweis und wäre hier ein Versehen
    const luecken = String(a.text || '').match(/\{_.+?_\}/g) || []
    if (!luecken.length) F(wo, 'luecke: text ohne {_Lösung_}')
    if (/\{\{/.test(String(a.text || ''))) F(wo, 'luecke: {{…}} im Lückentext, gemeint ist vermutlich {_…_}')
    if (luecken.length > 6) W(wo, `luecke: ${luecken.length} Lücken sind viel`)
    if (!a.bank) luecken.forEach((l) => { if (l.length > 34) W(wo, `luecke: "${l}" ist zum Tippen lang, besser bank: true`) })
  }
  if (t === 'karte' && (!istText(a.vorne) || !istText(a.hinten))) F(wo, 'karte: vorne/hinten fehlt')
  if (t === 'erklaeren') {
    if (!istText(a.musterloesung)) F(wo, 'erklaeren: musterloesung fehlt')
    if (!istListe(a.checkliste, 3) || a.checkliste.length > 6) F(wo, 'erklaeren: checkliste braucht 3 bis 6 Punkte')
  }
  if (t === 'beschriften') {
    if (!DIAGRAMME[a.diagramm]) F(wo, `beschriften: diagramm "${a.diagramm}" nicht im Katalog`)
    else if (a.gruppe && !DIAGRAMME[a.diagramm].includes(a.gruppe)) F(wo, `beschriften: gruppe "${a.gruppe}" gibt es bei ${a.diagramm} nicht`)
  }
}

function pruefeModul(datei, kopf) {
  const m = lies(datei)
  if (!m) return null
  if (kopf && m.id !== kopf.id) F(datei, `id "${m.id}" passt nicht zu module.json "${kopf.id}"`)
  if (!istListe(m.themen)) { F(datei, 'themen fehlen'); return m }
  pruefeTexte(datei, m)
  const kartenIds = new Set()
  for (const th of m.themen) for (const k of th.lernkarten || []) kartenIds.add(k.id)
  for (const th of m.themen) {
    const wo = `${datei} ${th.id}`
    merkeId(wo, th.id)
    if (!istText(th.titel)) F(wo, 'titel fehlt')
    if (![1, 2, 3].includes(th.gewicht)) F(wo, 'gewicht muss 1, 2 oder 3 sein')
    if (typeof th.lernstoff !== 'boolean') F(wo, 'lernstoff muss true/false sein')
    if (th.lernstoff && th.gewicht !== 3) F(wo, 'lernstoff: true verlangt gewicht 3')
    if (!Array.isArray(th.folien)) F(wo, 'folien muss eine Liste sein')
    if (Array.isArray(th.folien) && !th.folien.length && !istText(th.quelleText)) F(wo, 'ohne Foliennummer braucht das Thema quelleText')
    if (!istListe(th.lernkarten)) F(wo, 'lernkarten fehlen')
    for (const k of th.lernkarten || []) {
      merkeId(`${wo} ${k.id}`, k.id)
      if (!istText(k.titel)) F(`${wo} ${k.id}`, 'titel fehlt')
      if (!istListe(k.bloecke)) F(`${wo} ${k.id}`, 'bloecke fehlen')
      for (const b of k.bloecke || []) pruefeBlock(`${wo} ${k.id}`, b, kartenIds)
    }
    if (!istListe(th.aufgaben, 3)) F(wo, 'mindestens 3 aufgaben je Thema')
    const typen = new Set()
    let kern = 0
    for (const a of th.aufgaben || []) {
      pruefeAufgabe(`${wo} ${a.id}`, a, kartenIds)
      typen.add(a.typ)
      if (a.kern) kern += 1
    }
    if (typen.size < 3 && (th.aufgaben || []).length >= 3) W(wo, `nur ${typen.size} Aufgabentypen (Vertrag: mindestens 3)`)
    if ((th.aufgaben || []).length && kern === 0) F(wo, 'keine Kernaufgabe (kern: true)')
    if (!(th.aufgaben || []).some((a) => a.stufe !== 'erinnern')) W(wo, 'nur Aufgaben der Stufe erinnern')
    const lz = th.lernzettel
    if (!lz || !istListe(lz.kompakt) || !istListe(lz.ausfuehrlich)) F(wo, 'lernzettel.kompakt/ausfuehrlich fehlt')
  }
  return m
}

const argumente = process.argv.slice(2)
let module = []
if (argumente.length) {
  for (const d of argumente) { const m = pruefeModul(d, null); if (m) module.push(m) }
} else {
  const index = lies('module.json')
  if (index) {
    if (!index.kurs || !Number.isFinite(index.kurs.zeitbudgetMin)) F('module.json', 'kurs.zeitbudgetMin fehlt')
    const summe = (index.module || []).reduce((s, m) => s + (m.zeitMin || 0), 0) + (index.kurs.probeMin || 0)
    if (index.kurs && summe !== index.kurs.zeitbudgetMin) W('module.json', `Summe zeitMin plus probeMin ${summe} ungleich Zeitbudget ${index.kurs.zeitbudgetMin}`)
    for (const kopf of index.module || []) {
      // Teildateien eines Moduls zu einem Modul zusammenziehen
      const teile = (kopf.dateien || [kopf.datei]).map((d) => pruefeModul(d, null)).filter(Boolean)
      for (const t of teile) if (t.id !== kopf.id) F(`module.json ${kopf.id}`, `Teildatei trägt id "${t.id}"`)
      if (teile.length) module.push({ id: kopf.id, themen: teile.flatMap((t) => t.themen || []) })
    }
  }
  const themenIds = new Set(module.flatMap((m) => (m.themen || []).map((t) => t.id)))
  const personen = lies('personen.json')
  if (personen) {
    pruefeTexte('personen.json', personen)
    const namen = new Set()
    for (const p of personen.personen || []) {
      const wo = `personen.json ${p.name}`
      if (!istText(p.name) || !istText(p.beitrag) || !istText(p.kurz)) F(wo, 'name/kurz/beitrag fehlt')
      if (namen.has(p.name)) F(wo, 'doppelt'); namen.add(p.name)
      if (!['skript', 'leseliste', 'extern'].includes(p.quelle)) F(wo, 'quelle muss skript, leseliste oder extern sein')
      if (!istText(p.beleg) || !istText(p.belegQuelle)) F(wo, 'beleg/belegQuelle fehlt')
      for (const t of p.themen || []) if (!themenIds.has(t)) F(wo, `thema "${t}" existiert nicht`)
    }
    // {{Person}}-Verweise in den Modulen müssen auflösbar sein
    const roh = JSON.stringify(module)
    for (const m of roh.matchAll(/\{\{([^}|]+?)(?:\|[^}]+?)?\}\}/g)) {
      if (!namen.has(m[1])) F('personenverweis', `{{${m[1]}}} nicht im Personenregister`)
    }
  }
  const glossar = lies('glossar.json')
  if (glossar) {
    pruefeTexte('glossar.json', glossar)
    const begriffe = new Set((glossar.begriffe || []).map((b) => String(b.begriff).toLowerCase()))
    for (const b of glossar.begriffe || []) if (!istText(b.begriff) || !istText(b.text)) F('glossar.json', 'Eintrag ohne begriff/text')
    const roh = JSON.stringify(module)
    for (const m of roh.matchAll(/\[\[([^\]|]+?)(?:\|[^\]]+?)?\]\]/g)) if (!begriffe.has(m[1].toLowerCase())) W('glossarverweis', `[[${m[1]}]] nicht im Glossar`)
  }
  const quellen = lies('quellen.json')
  if (quellen) {
    const ids = new Set((quellen.quellen || []).map((q) => q.id))
    for (const m of module) for (const th of m.themen || []) for (const k of th.lernkarten || []) for (const b of k.bloecke || []) {
      if (b.typ === 'extern' && !ids.has(b.quelle)) F(`${m.id} ${k.id}`, `extern: quelle "${b.quelle}" nicht in quellen.json`)
    }
  }
}

const aufgabenZahl = module.reduce((s, m) => s + (m.themen || []).reduce((t, th) => t + (th.aufgaben || []).length, 0), 0)
const themenZahl = module.reduce((s, m) => s + (m.themen || []).length, 0)
console.log(`Geprüft: ${module.length} Module, ${themenZahl} Themen, ${aufgabenZahl} Aufgaben`)
for (const w of warnungen) console.log('WARNUNG ' + w)
for (const f of fehler) console.log('FEHLER  ' + f)
console.log(`${fehler.length} Fehler, ${warnungen.length} Warnungen`)
process.exit(fehler.length ? 1 : 0)
