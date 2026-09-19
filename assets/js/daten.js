// Lädt die Kursdaten und baut die Nachschlage-Indizes. Alle Pfade relativ, damit die Seite unter einem
// Unterpfad (GitHub Pages) genauso läuft wie lokal.

const BASIS = new URL('../../daten/', import.meta.url)

async function hole(datei) {
  const antwort = await fetch(new URL(datei, BASIS), { cache: 'no-cache' })
  if (!antwort.ok) throw new Error(`${datei}: HTTP ${antwort.status}`)
  return antwort.json()
}

async function holeOptional(datei, ersatz) {
  try { return await hole(datei) } catch (e) { console.warn('Optionale Datei fehlt:', datei, e.message); return ersatz }
}

export async function ladeDaten() {
  const index = await hole('module.json')
  // Ein Modul kann aus mehreren Teildateien bestehen (dateien: []); ihre Themen werden hintereinandergehängt
  const module = await Promise.all(index.module.map(async (kopf) => {
    const dateien = kopf.dateien || [kopf.datei]
    const teile = await Promise.all(dateien.map((d) => hole(d)))
    return { ...kopf, themen: teile.flatMap((t) => t.themen || []) }
  }))
  const [personen, glossar, quellen] = await Promise.all([
    holeOptional('personen.json', { personen: [] }),
    holeOptional('glossar.json', { begriffe: [] }),
    holeOptional('quellen.json', { quellen: [], nurGenannt: [] }),
  ])
  return baueIndex({ kurs: index.kurs, module, personen: personen.personen, glossar: glossar.begriffe, quellen })
}

export function baueIndex({ kurs, module, personen, glossar, quellen }) {
  const themaNachId = new Map()
  const aufgabeNachId = new Map()
  const karteNachId = new Map()
  const themaVonAufgabeMap = new Map()
  const modulVonThemaMap = new Map()
  const themaVonKarteMap = new Map()
  const alleThemen = []
  const alleAufgaben = []

  for (const m of module) {
    for (const th of m.themen) {
      themaNachId.set(th.id, th)
      modulVonThemaMap.set(th.id, m)
      alleThemen.push(th)
      for (const k of th.lernkarten || []) { karteNachId.set(k.id, k); themaVonKarteMap.set(k.id, th) }
      for (const a of th.aufgaben || []) {
        aufgabeNachId.set(a.id, a)
        themaVonAufgabeMap.set(a.id, th)
        alleAufgaben.push(a)
      }
    }
  }

  const schluessel = (s) => String(s || '').trim().toLowerCase()
  const personNachName = new Map(personen.map((p) => [schluessel(p.name), p]))
  const begriffNachName = new Map(glossar.map((b) => [schluessel(b.begriff), b]))

  return {
    kurs, module, personen, glossar, quellen, alleThemen, alleAufgaben,
    modul: (id) => module.find((m) => m.id === id) || null,
    thema: (id) => themaNachId.get(id) || null,
    aufgabe: (id) => aufgabeNachId.get(id) || null,
    karte: (id) => karteNachId.get(id) || null,
    themaVonAufgabe: (id) => themaVonAufgabeMap.get(id) || null,
    themaVonKarte: (id) => themaVonKarteMap.get(id) || null,
    modulVonThema: (id) => modulVonThemaMap.get(id) || null,
    modulVonAufgabe: (id) => { const th = themaVonAufgabeMap.get(id); return th ? modulVonThemaMap.get(th.id) : null },
    person: (name) => personNachName.get(schluessel(name)) || null,
    begriff: (name) => begriffNachName.get(schluessel(name)) || null,
    quelle: (id) => (quellen.quellen || []).find((q) => q.id === id) || null,
    /** Nachbarn eines Themas in Kursreihenfolge, für "Nächstes Thema". */
    nachbarn(themaId) {
      const i = alleThemen.findIndex((t) => t.id === themaId)
      return { vor: i > 0 ? alleThemen[i - 1] : null, nach: i > -1 && i < alleThemen.length - 1 ? alleThemen[i + 1] : null }
    },
  }
}
