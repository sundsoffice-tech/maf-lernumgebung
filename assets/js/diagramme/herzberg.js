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
  // Hochkant (iPhone): aus den Spalten werden Blöcke. Die beiden Skalen stehen untereinander, und die beiden
  // Ereignisreihen der Abbildung folgen in der Leserichtung der Querfassung: erst die linke Seite (extreme
  // Unzufriedenheit, Minuszeichen), dann die rechte (extreme Zufriedenheit, Pluszeichen).
  viewBoxSchmal: '0 0 360 1540',
  svgSchmal: `<g>
  <text data-label="kopf" x="180" y="26" text-anchor="middle" class="d-text-titel">
    <tspan x="180" dy="0">Arbeitszufriedenheit als</tspan>
    <tspan x="180" dy="21">zweidimensionales Konzept</tspan>
  </text>

  <rect class="d-flaeche-leer" x="6" y="66" width="348" height="306" rx="10"/>
  <text data-label="hyg-titel" x="180" y="92" text-anchor="middle" class="d-text-fett">Hygienefaktoren</text>
  <path class="d-linie" d="M 50 124 L 310 124"/>
  <path class="d-pfeilspitze" d="M 40 124 l 11 -6 l 0 12 Z"/>
  <path class="d-pfeilspitze" d="M 320 124 l -11 -6 l 0 12 Z"/>
  <text data-label="hyg-pol-links" x="20" y="148" class="d-text-klein">unzufrieden</text>
  <text data-label="hyg-pol-rechts" x="340" y="148" text-anchor="end" class="d-text-klein">nicht unzufrieden</text>
  <text data-label="hyg-def" x="180" y="178" text-anchor="middle" class="d-text-klein">
    <tspan x="180" dy="0">thematisieren Rahmenbedingungen des</tspan>
    <tspan x="180" dy="17">Arbeitsprozesses</tspan>
  </text>
  <path class="d-linie-duenn" d="M 22 217 L 32 217"/>
  <text data-label="hyg-f1" x="40" y="222" class="d-text">Image</text>
  <path class="d-linie-duenn" d="M 22 243 L 32 243"/>
  <text data-label="hyg-f2" x="40" y="248" class="d-text">Arbeitsplatzausstattung</text>
  <path class="d-linie-duenn" d="M 22 269 L 32 269"/>
  <text data-label="hyg-f3" x="40" y="274" class="d-text">Arbeitsbedingungen</text>
  <path class="d-linie-duenn" d="M 22 295 L 32 295"/>
  <text data-label="hyg-f4" x="40" y="300" class="d-text">Arbeitsklima</text>
  <path class="d-linie-duenn" d="M 22 321 L 32 321"/>
  <text data-label="hyg-f5" x="40" y="326" class="d-text">Arbeitsplatzsicherheit</text>
  <path class="d-linie-duenn" d="M 22 347 L 32 347"/>
  <text data-label="hyg-f6" x="40" y="352" class="d-text">Struktur...</text>

  <rect class="d-flaeche-leer" x="6" y="388" width="348" height="264" rx="10"/>
  <text data-label="mot-titel" x="180" y="414" text-anchor="middle" class="d-text-fett">Motivatoren</text>
  <path class="d-linie" d="M 50 446 L 310 446"/>
  <path class="d-pfeilspitze" d="M 40 446 l 11 -6 l 0 12 Z"/>
  <path class="d-pfeilspitze" d="M 320 446 l -11 -6 l 0 12 Z"/>
  <text data-label="mot-pol-links" x="20" y="470" class="d-text-klein">nicht zufrieden</text>
  <text data-label="mot-pol-rechts" x="340" y="470" text-anchor="end" class="d-text-klein">zufrieden</text>
  <text data-label="mot-def" x="180" y="500" text-anchor="middle" class="d-text-klein">repräsentieren intrinsische Faktoren</text>
  <path class="d-linie-duenn" d="M 22 523 L 32 523"/>
  <text data-label="mot-f1" x="40" y="528" class="d-text">interessante Aufgaben</text>
  <path class="d-linie-duenn" d="M 22 549 L 32 549"/>
  <text data-label="mot-f2" x="40" y="554" class="d-text">Eigenverantwortung</text>
  <path class="d-linie-duenn" d="M 22 575 L 32 575"/>
  <text data-label="mot-f3" x="40" y="580" class="d-text">Anerkennung</text>
  <path class="d-linie-duenn" d="M 22 601 L 32 601"/>
  <text data-label="mot-f4" x="40" y="606" class="d-text">selbständiges Arbeiten</text>
  <path class="d-linie-duenn" d="M 22 627 L 32 627"/>
  <text data-label="mot-f5" x="40" y="632" class="d-text">Aufstiegsmöglichkeiten,...</text>

  <rect class="d-flaeche" x="6" y="676" width="348" height="76" rx="8"/>
  <text data-label="kopf-unzufrieden" x="180" y="702" text-anchor="middle" class="d-text-klein">
    <tspan x="180" dy="0">Faktoren von 1844 Ereignissen während der Arbeit,</tspan>
    <tspan x="180" dy="16">die zu extremer Unzufriedenheit führen</tspan>
    <tspan x="180" dy="16">prozentuale Häufigkeit</tspan>
  </text>
  <rect class="d-flaeche-leer" x="156" y="762" width="48" height="30" rx="6"/>
  <path class="d-linie" d="M 168 777 L 192 777"/>

  <path class="d-linie" d="M 20 806 L 20 1024"/>
  <path class="d-linie-duenn" d="M 20 811 L 30 811"/>
  <text data-label="ev-7" x="38" y="816" class="d-text-klein">Firmenpolitik und Verwaltung</text>
  <path class="d-linie-duenn" d="M 20 833 L 30 833"/>
  <text data-label="ev-8" x="38" y="838" class="d-text-klein">Technische Kompetenz der Vorgesetzten</text>
  <path class="d-linie-duenn" d="M 20 855 L 30 855"/>
  <text data-label="ev-9" x="38" y="860" class="d-text-klein">Persönliche Beziehung zu Vorgesetzten</text>
  <path class="d-linie-duenn" d="M 20 877 L 30 877"/>
  <text data-label="ev-10" x="38" y="882" class="d-text-klein">Arbeitsbedingungen</text>
  <path class="d-linie-duenn" d="M 20 899 L 30 899"/>
  <text data-label="ev-11" x="38" y="904" class="d-text-klein">Einkommen</text>
  <path class="d-linie-duenn" d="M 20 921 L 30 921"/>
  <text data-label="ev-12" x="38" y="926" class="d-text-klein">Persönliche Beziehung zu Kollegen</text>
  <path class="d-linie-duenn" d="M 20 943 L 30 943"/>
  <text data-label="ev-13" x="38" y="948" class="d-text-klein">Einfluß auf Privatleben</text>
  <path class="d-linie-duenn" d="M 20 965 L 30 965"/>
  <text data-label="ev-14" x="38" y="970" class="d-text-klein">Persönliche Beziehung zu Untergebenen</text>
  <path class="d-linie-duenn" d="M 20 987 L 30 987"/>
  <text data-label="ev-15" x="38" y="992" class="d-text-klein">Status</text>
  <path class="d-linie-duenn" d="M 20 1009 L 30 1009"/>
  <text data-label="ev-16" x="38" y="1014" class="d-text-klein">Sicherheit</text>

  <rect class="d-flaeche" x="6" y="1044" width="348" height="76" rx="8"/>
  <text data-label="kopf-zufrieden" x="180" y="1070" text-anchor="middle" class="d-text-klein">
    <tspan x="180" dy="0">Faktoren von 1763 Ereignissen während der Arbeit,</tspan>
    <tspan x="180" dy="16">die zu extremer Zufriedenheit führen</tspan>
    <tspan x="180" dy="16">prozentuale Häufigkeit</tspan>
  </text>
  <rect class="d-flaeche-leer" x="156" y="1130" width="48" height="30" rx="6"/>
  <path class="d-linie" d="M 168 1145 L 192 1145"/>
  <path class="d-linie" d="M 180 1133 L 180 1157"/>

  <path class="d-linie" d="M 20 1174 L 20 1306"/>
  <path class="d-linie-duenn" d="M 20 1179 L 30 1179"/>
  <text data-label="ev-1" x="38" y="1184" class="d-text-klein">Erfolgserlebnis</text>
  <path class="d-linie-duenn" d="M 20 1201 L 30 1201"/>
  <text data-label="ev-2" x="38" y="1206" class="d-text-klein">Anerkennung</text>
  <path class="d-linie-duenn" d="M 20 1223 L 30 1223"/>
  <text data-label="ev-3" x="38" y="1228" class="d-text-klein">Arbeit selbst</text>
  <path class="d-linie-duenn" d="M 20 1245 L 30 1245"/>
  <text data-label="ev-4" x="38" y="1250" class="d-text-klein">Verantwortungsgefühl</text>
  <path class="d-linie-duenn" d="M 20 1267 L 30 1267"/>
  <text data-label="ev-5" x="38" y="1272" class="d-text-klein">Fortschritt</text>
  <path class="d-linie-duenn" d="M 20 1289 L 30 1289"/>
  <text data-label="ev-6" x="38" y="1294" class="d-text-klein">Wachstum</text>

  <rect class="d-akzentflaeche" x="20" y="1326" width="320" height="194" rx="10"/>
  <text data-label="formel-1" x="180" y="1356" text-anchor="middle" class="d-text-akzent">
    <tspan x="180" dy="0">zufriedenstellend gestaltete</tspan>
    <tspan x="180" dy="22">Hygienefaktoren</tspan>
  </text>
  <text data-label="formel-plus" x="180" y="1404" text-anchor="middle" class="d-text-akzent">+</text>
  <text data-label="formel-2" x="180" y="1430" text-anchor="middle" class="d-text-akzent">aufgabenspezifische Motivatoren</text>
  <text data-label="formel-gleich" x="180" y="1456" text-anchor="middle" class="d-text-akzent">=</text>
  <text data-label="formel-3" x="180" y="1482" text-anchor="middle" class="d-text-akzent">
    <tspan x="180" dy="0">Arbeitszufriedenheit &amp;</tspan>
    <tspan x="180" dy="22">Leistungsbereitschaft</tspan>
  </text>
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
