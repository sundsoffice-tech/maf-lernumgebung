// Folie 47 (folie-19.md): Herzberg's Zweifaktoren-Theorie. Eigene Darstellung.
// Oben die zwei Skalen mit ihren Faktoren, darunter die Faktoren der Abbildung (Ereignisse), unten die Formel.
// Die Balkenlängen der Abbildung sind im Skript nicht beziffert und werden deshalb nicht gezeichnet.
export default {
  id: 'herzberg',
  titel: 'Herzberg‘s Zweifaktoren-Theorie',
  folien: [47],
  viewBox: '0 0 800 990',
  minBreite: 640,
  beschreibung: 'Arbeitszufriedenheit als zwei getrennte Skalen: Hygienefaktoren reichen von unzufrieden bis nicht unzufrieden, Motivatoren von nicht zufrieden bis zufrieden. Darunter stehen die Faktoren der beiden Ereignisreihen der Abbildung und die Formel aus Hygienefaktoren und Motivatoren.',
  svg: `<g>
  <text data-label="kopf" x="400" y="32" text-anchor="middle" class="d-text-titel">Arbeitszufriedenheit als zweidimensionales Konzept</text>

  <rect class="d-flaeche-leer" x="16" y="56" width="380" height="314" rx="10"/>
  <rect class="d-flaeche-leer" x="404" y="56" width="380" height="314" rx="10"/>

  <text data-label="hyg-titel" x="206" y="90" text-anchor="middle" class="d-text-fett">Hygienefaktoren</text>
  <path class="d-linie" d="M 56 124 L 356 124"/>
  <path class="d-pfeilspitze" d="M 46 124 l 11 -6 l 0 12 Z"/>
  <path class="d-pfeilspitze" d="M 366 124 l -11 -6 l 0 12 Z"/>
  <text data-label="hyg-pol-links" x="46" y="148" class="d-text-klein">unzufrieden</text>
  <text data-label="hyg-pol-rechts" x="366" y="148" text-anchor="end" class="d-text-klein">nicht unzufrieden</text>
  <text data-label="hyg-def" x="206" y="184" text-anchor="middle" class="d-text-klein">thematisieren Rahmenbedingungen des Arbeitsprozesses</text>
  <path class="d-linie-duenn" d="M 48 211 L 58 211"/>
  <text data-label="hyg-f1" x="66" y="216" class="d-text">Image</text>
  <path class="d-linie-duenn" d="M 48 237 L 58 237"/>
  <text data-label="hyg-f2" x="66" y="242" class="d-text">Arbeitsplatzausstattung</text>
  <path class="d-linie-duenn" d="M 48 263 L 58 263"/>
  <text data-label="hyg-f3" x="66" y="268" class="d-text">Arbeitsbedingungen</text>
  <path class="d-linie-duenn" d="M 48 289 L 58 289"/>
  <text data-label="hyg-f4" x="66" y="294" class="d-text">Arbeitsklima</text>
  <path class="d-linie-duenn" d="M 48 315 L 58 315"/>
  <text data-label="hyg-f5" x="66" y="320" class="d-text">Arbeitsplatzsicherheit</text>
  <path class="d-linie-duenn" d="M 48 341 L 58 341"/>
  <text data-label="hyg-f6" x="66" y="346" class="d-text">Struktur...</text>

  <text data-label="mot-titel" x="594" y="90" text-anchor="middle" class="d-text-fett">Motivatoren</text>
  <path class="d-linie" d="M 444 124 L 744 124"/>
  <path class="d-pfeilspitze" d="M 434 124 l 11 -6 l 0 12 Z"/>
  <path class="d-pfeilspitze" d="M 754 124 l -11 -6 l 0 12 Z"/>
  <text data-label="mot-pol-links" x="434" y="148" class="d-text-klein">nicht zufrieden</text>
  <text data-label="mot-pol-rechts" x="754" y="148" text-anchor="end" class="d-text-klein">zufrieden</text>
  <text data-label="mot-def" x="594" y="184" text-anchor="middle" class="d-text-klein">repräsentieren intrinsische Faktoren</text>
  <path class="d-linie-duenn" d="M 436 211 L 446 211"/>
  <text data-label="mot-f1" x="454" y="216" class="d-text">interessante Aufgaben</text>
  <path class="d-linie-duenn" d="M 436 237 L 446 237"/>
  <text data-label="mot-f2" x="454" y="242" class="d-text">Eigenverantwortung</text>
  <path class="d-linie-duenn" d="M 436 263 L 446 263"/>
  <text data-label="mot-f3" x="454" y="268" class="d-text">Anerkennung</text>
  <path class="d-linie-duenn" d="M 436 289 L 446 289"/>
  <text data-label="mot-f4" x="454" y="294" class="d-text">selbständiges Arbeiten</text>
  <path class="d-linie-duenn" d="M 436 315 L 446 315"/>
  <text data-label="mot-f5" x="454" y="320" class="d-text">Aufstiegsmöglichkeiten,...</text>

  <rect class="d-flaeche" x="16" y="402" width="380" height="66" rx="8"/>
  <rect class="d-flaeche" x="404" y="402" width="380" height="66" rx="8"/>
  <text data-label="kopf-unzufrieden" x="206" y="422" text-anchor="middle" class="d-text-klein">
    <tspan x="206" dy="0">Faktoren von 1844 Ereignissen während der Arbeit,</tspan>
    <tspan x="206" dy="16">die zu extremer Unzufriedenheit führen</tspan>
    <tspan x="206" dy="16">prozentuale Häufigkeit</tspan>
  </text>
  <text data-label="kopf-zufrieden" x="594" y="422" text-anchor="middle" class="d-text-klein">
    <tspan x="594" dy="0">Faktoren von 1763 Ereignissen während der Arbeit,</tspan>
    <tspan x="594" dy="16">die zu extremer Zufriedenheit führen</tspan>
    <tspan x="594" dy="16">prozentuale Häufigkeit</tspan>
  </text>

  <path class="d-linie" d="M 400 484 L 400 806"/>
  <rect class="d-flaeche-leer" x="176" y="530" width="48" height="34" rx="6"/>
  <path class="d-linie" d="M 188 547 L 212 547"/>
  <rect class="d-flaeche-leer" x="576" y="690" width="48" height="34" rx="6"/>
  <path class="d-linie" d="M 588 707 L 612 707"/>
  <path class="d-linie" d="M 600 695 L 600 719"/>

  <path class="d-linie-duenn" d="M 402 495 L 408 495"/>
  <path class="d-linie-duenn" d="M 402 515 L 408 515"/>
  <path class="d-linie-duenn" d="M 402 535 L 408 535"/>
  <path class="d-linie-duenn" d="M 402 555 L 408 555"/>
  <path class="d-linie-duenn" d="M 402 575 L 408 575"/>
  <path class="d-linie-duenn" d="M 402 595 L 408 595"/>
  <path class="d-linie-duenn" d="M 392 615 L 398 615"/>
  <path class="d-linie-duenn" d="M 392 635 L 398 635"/>
  <path class="d-linie-duenn" d="M 392 655 L 398 655"/>
  <path class="d-linie-duenn" d="M 392 675 L 398 675"/>
  <path class="d-linie-duenn" d="M 392 695 L 398 695"/>
  <path class="d-linie-duenn" d="M 392 715 L 398 715"/>
  <path class="d-linie-duenn" d="M 392 735 L 398 735"/>
  <path class="d-linie-duenn" d="M 392 755 L 398 755"/>
  <path class="d-linie-duenn" d="M 392 775 L 398 775"/>
  <path class="d-linie-duenn" d="M 392 795 L 398 795"/>

  <text data-label="ev-1" x="412" y="500" class="d-text-klein">Erfolgserlebnis</text>
  <text data-label="ev-2" x="412" y="520" class="d-text-klein">Anerkennung</text>
  <text data-label="ev-3" x="412" y="540" class="d-text-klein">Arbeit selbst</text>
  <text data-label="ev-4" x="412" y="560" class="d-text-klein">Verantwortungsgefühl</text>
  <text data-label="ev-5" x="412" y="580" class="d-text-klein">Fortschritt</text>
  <text data-label="ev-6" x="412" y="600" class="d-text-klein">Wachstum</text>
  <text data-label="ev-7" x="388" y="620" text-anchor="end" class="d-text-klein">Firmenpolitik und Verwaltung</text>
  <text data-label="ev-8" x="388" y="640" text-anchor="end" class="d-text-klein">Technische Kompetenz der Vorgesetzten</text>
  <text data-label="ev-9" x="388" y="660" text-anchor="end" class="d-text-klein">Persönliche Beziehung zu Vorgesetzten</text>
  <text data-label="ev-10" x="388" y="680" text-anchor="end" class="d-text-klein">Arbeitsbedingungen</text>
  <text data-label="ev-11" x="388" y="700" text-anchor="end" class="d-text-klein">Einkommen</text>
  <text data-label="ev-12" x="388" y="720" text-anchor="end" class="d-text-klein">Persönliche Beziehung zu Kollegen</text>
  <text data-label="ev-13" x="388" y="740" text-anchor="end" class="d-text-klein">Einfluß auf Privatleben</text>
  <text data-label="ev-14" x="388" y="760" text-anchor="end" class="d-text-klein">Persönliche Beziehung zu Untergebenen</text>
  <text data-label="ev-15" x="388" y="780" text-anchor="end" class="d-text-klein">Status</text>
  <text data-label="ev-16" x="388" y="800" text-anchor="end" class="d-text-klein">Sicherheit</text>

  <rect class="d-akzentflaeche" x="120" y="824" width="560" height="150" rx="10"/>
  <text data-label="formel-1" x="400" y="852" text-anchor="middle" class="d-text-akzent">zufriedenstellend gestaltete Hygienefaktoren</text>
  <text data-label="formel-plus" x="400" y="878" text-anchor="middle" class="d-text-akzent">+</text>
  <text data-label="formel-2" x="400" y="904" text-anchor="middle" class="d-text-akzent">aufgabenspezifische Motivatoren</text>
  <text data-label="formel-gleich" x="400" y="930" text-anchor="middle" class="d-text-akzent">=</text>
  <text data-label="formel-3" x="400" y="956" text-anchor="middle" class="d-text-akzent">Arbeitszufriedenheit &amp; Leistungsbereitschaft</text>
</g>`,
  labels: [
    { id: 'kopf', text: 'Arbeitszufriedenheit als zweidimensionales Konzept', abfragbar: false, gruppe: 'faktoren' },
    { id: 'hyg-titel', text: 'Hygienefaktoren', abfragbar: true, gruppe: 'faktoren' },
    { id: 'hyg-pol-links', text: 'unzufrieden', abfragbar: true, gruppe: 'faktoren' },
    { id: 'hyg-pol-rechts', text: 'nicht unzufrieden', abfragbar: true, gruppe: 'faktoren' },
    { id: 'hyg-def', text: 'thematisieren Rahmenbedingungen des Arbeitsprozesses', abfragbar: false, gruppe: 'faktoren' },
    { id: 'hyg-f1', text: 'Image', abfragbar: false, gruppe: 'faktoren' },
    { id: 'hyg-f2', text: 'Arbeitsplatzausstattung', abfragbar: false, gruppe: 'faktoren' },
    { id: 'hyg-f3', text: 'Arbeitsbedingungen', abfragbar: false, gruppe: 'faktoren' },
    { id: 'hyg-f4', text: 'Arbeitsklima', abfragbar: false, gruppe: 'faktoren' },
    { id: 'hyg-f5', text: 'Arbeitsplatzsicherheit', abfragbar: false, gruppe: 'faktoren' },
    { id: 'hyg-f6', text: 'Struktur...', abfragbar: false, gruppe: 'faktoren' },
    { id: 'mot-titel', text: 'Motivatoren', abfragbar: true, gruppe: 'faktoren' },
    { id: 'mot-pol-links', text: 'nicht zufrieden', abfragbar: true, gruppe: 'faktoren' },
    { id: 'mot-pol-rechts', text: 'zufrieden', abfragbar: true, gruppe: 'faktoren' },
    { id: 'mot-def', text: 'repräsentieren intrinsische Faktoren', abfragbar: false, gruppe: 'faktoren' },
    { id: 'mot-f1', text: 'interessante Aufgaben', abfragbar: false, gruppe: 'faktoren' },
    { id: 'mot-f2', text: 'Eigenverantwortung', abfragbar: false, gruppe: 'faktoren' },
    { id: 'mot-f3', text: 'Anerkennung', abfragbar: false, gruppe: 'faktoren' },
    { id: 'mot-f4', text: 'selbständiges Arbeiten', abfragbar: false, gruppe: 'faktoren' },
    { id: 'mot-f5', text: 'Aufstiegsmöglichkeiten,...', abfragbar: false, gruppe: 'faktoren' },
    { id: 'kopf-unzufrieden', text: 'Faktoren von 1844 Ereignissen während der Arbeit, die zu extremer Unzufriedenheit führen prozentuale Häufigkeit', abfragbar: false, gruppe: 'faktoren' },
    { id: 'kopf-zufrieden', text: 'Faktoren von 1763 Ereignissen während der Arbeit, die zu extremer Zufriedenheit führen prozentuale Häufigkeit', abfragbar: false, gruppe: 'faktoren' },
    { id: 'ev-1', text: 'Erfolgserlebnis', abfragbar: false, gruppe: 'faktoren' },
    { id: 'ev-2', text: 'Anerkennung', abfragbar: false, gruppe: 'faktoren' },
    { id: 'ev-3', text: 'Arbeit selbst', abfragbar: false, gruppe: 'faktoren' },
    { id: 'ev-4', text: 'Verantwortungsgefühl', abfragbar: false, gruppe: 'faktoren' },
    { id: 'ev-5', text: 'Fortschritt', abfragbar: false, gruppe: 'faktoren' },
    { id: 'ev-6', text: 'Wachstum', abfragbar: false, gruppe: 'faktoren' },
    { id: 'ev-7', text: 'Firmenpolitik und Verwaltung', abfragbar: false, gruppe: 'faktoren' },
    { id: 'ev-8', text: 'Technische Kompetenz der Vorgesetzten', abfragbar: false, gruppe: 'faktoren' },
    { id: 'ev-9', text: 'Persönliche Beziehung zu Vorgesetzten', abfragbar: false, gruppe: 'faktoren' },
    { id: 'ev-10', text: 'Arbeitsbedingungen', abfragbar: false, gruppe: 'faktoren' },
    { id: 'ev-11', text: 'Einkommen', abfragbar: false, gruppe: 'faktoren' },
    { id: 'ev-12', text: 'Persönliche Beziehung zu Kollegen', abfragbar: false, gruppe: 'faktoren' },
    { id: 'ev-13', text: 'Einfluß auf Privatleben', abfragbar: false, gruppe: 'faktoren' },
    { id: 'ev-14', text: 'Persönliche Beziehung zu Untergebenen', abfragbar: false, gruppe: 'faktoren' },
    { id: 'ev-15', text: 'Status', abfragbar: false, gruppe: 'faktoren' },
    { id: 'ev-16', text: 'Sicherheit', abfragbar: false, gruppe: 'faktoren' },
    { id: 'formel-1', text: 'zufriedenstellend gestaltete Hygienefaktoren', abfragbar: false, gruppe: 'faktoren' },
    { id: 'formel-plus', text: '+', abfragbar: false, gruppe: 'faktoren' },
    { id: 'formel-2', text: 'aufgabenspezifische Motivatoren', abfragbar: false, gruppe: 'faktoren' },
    { id: 'formel-gleich', text: '=', abfragbar: false, gruppe: 'faktoren' },
    { id: 'formel-3', text: 'Arbeitszufriedenheit & Leistungsbereitschaft', abfragbar: false, gruppe: 'faktoren' },
  ],
}
