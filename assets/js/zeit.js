// Misst aktive Lernzeit. Gezählt wird nur, wenn der Reiter sichtbar ist und in den letzten 90 Sekunden
// etwas getan wurde: ein offen gelassenes Handy soll das 10-Stunden-Budget nicht auffressen.

const LEERLAUF_MS = 90000
const TAKT_MS = 5000

export function erzeugeZeit(speicher) {
  let letzteAktion = Date.now()
  let letzterTakt = Date.now()
  let modulId = null
  let timer = 0
  const hoerer = new Set()

  const aktiv = () => { letzteAktion = Date.now() }
  for (const ereignis of ['pointerdown', 'keydown', 'scroll', 'touchstart']) {
    window.addEventListener(ereignis, aktiv, { passive: true, capture: true })
  }

  function takt() {
    const t = Date.now()
    const vergangen = t - letzterTakt
    letzterTakt = t
    const sichtbar = document.visibilityState === 'visible'
    const wach = t - letzteAktion < LEERLAUF_MS
    // Sprünge (Rechner war im Ruhezustand) nicht mitzählen
    if (!sichtbar || !wach || vergangen > TAKT_MS * 3) return
    const sek = vergangen / 1000
    speicher.aendere((z) => {
      z.zeitSek.gesamt += sek
      if (modulId) z.zeitSek.module[modulId] = (z.zeitSek.module[modulId] || 0) + sek
    }, { still: true })
    for (const f of hoerer) f(speicher.zustand.zeitSek)
  }

  return {
    starte() {
      if (timer) return
      letzterTakt = Date.now()
      timer = setInterval(takt, TAKT_MS)
      document.addEventListener('visibilitychange', () => { letzterTakt = Date.now(); if (document.visibilityState === 'hidden') speicher.sichereSofort() })
      window.addEventListener('pagehide', () => speicher.sichereSofort())
    },
    /** Dem laufenden Modul Zeit zuschreiben (null = nur Gesamtzeit). */
    setzeModul(id) { modulId = id || null },
    beiTakt(fn) { hoerer.add(fn); return () => hoerer.delete(fn) },
    get gesamtMin() { return speicher.zustand.zeitSek.gesamt / 60 },
    modulMin(id) { return (speicher.zustand.zeitSek.module[id] || 0) / 60 },
  }
}
