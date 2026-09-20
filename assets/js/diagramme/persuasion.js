// Folie 36: Aristoteles' "modes of persuasion" - Ethos, Pathos, Logos, dazu "-> Rhetorik!".
// Eigene Zeichnung; Wortlaut aus folie-08.md. Die Folie nennt die drei Begriffe, erklaert sie nicht.
export default {
  id: 'persuasion',
  titel: 'Aristoteles: modes of persuasion',
  folien: [36],
  viewBox: '0 0 800 420',
  beschreibung: 'Andere davon überzeugen, mir zu folgen, geschieht nach Aristoteles über drei Wege: Ethos, Pathos und Logos. Die Folie fasst sie unter Rhetorik zusammen.',
  svg: `
    <text data-label="titel" x="400" y="34" text-anchor="middle" class="d-text-titel">Wie alt ist die Idee von Führung/Leadership?</text>

    <rect x="130" y="58" width="540" height="62" rx="6" class="d-akzentflaeche"/>
    <text data-label="einleitung-1" x="400" y="83" text-anchor="middle" class="d-text">Aristoteles' „modes of persuasion" -></text>
    <text data-label="einleitung-2" x="400" y="105" text-anchor="middle" class="d-text">Andere überzeugen mir zu folgen durch....</text>

    <ellipse cx="470" cy="270" rx="150" ry="115" class="d-flaeche-leer"/>
    <text data-label="modus-1" x="470" y="225" text-anchor="middle" class="d-text-titel">ETHOS</text>
    <text data-label="modus-2" x="470" y="277" text-anchor="middle" class="d-text-titel">PATHOS</text>
    <text data-label="modus-3" x="470" y="329" text-anchor="middle" class="d-text-titel">LOGOS</text>

    <text data-label="rhetorik" x="190" y="277" text-anchor="middle" class="d-text-fett">-> Rhetorik!</text>
  `,
  // Hochkant: Titel und Einleitung stehen untereinander, das Oval rueckt nach rechts,
  // "-> Rhetorik!" bleibt wie auf der Folie links daneben.
  viewBoxSchmal: '0 0 360 396',
  svgSchmal: `
    <text data-label="titel" x="180" y="26" text-anchor="middle" class="d-text-titel"><tspan x="180" y="26">Wie alt ist die Idee von </tspan><tspan x="180" y="48">Führung/Leadership?</tspan></text>

    <rect x="10" y="64" width="340" height="88" rx="6" class="d-akzentflaeche"/>
    <text data-label="einleitung-1" x="180" y="96" text-anchor="middle" class="d-text">Aristoteles' „modes of persuasion" -></text>
    <text data-label="einleitung-2" x="180" y="126" text-anchor="middle" class="d-text">Andere überzeugen mir zu folgen durch....</text>

    <ellipse cx="230" cy="286" rx="110" ry="96" class="d-flaeche-leer"/>
    <text data-label="modus-1" x="230" y="246" text-anchor="middle" class="d-text-titel">ETHOS</text>
    <text data-label="modus-2" x="230" y="290" text-anchor="middle" class="d-text-titel">PATHOS</text>
    <text data-label="modus-3" x="230" y="334" text-anchor="middle" class="d-text-titel">LOGOS</text>

    <text data-label="rhetorik" x="12" y="292" text-anchor="start" class="d-text-fett">-> Rhetorik!</text>
  `,
  labels: [
    { id: 'titel', text: 'Wie alt ist die Idee von Führung/Leadership?', abfragbar: false, gruppe: 'rahmen' },
    { id: 'einleitung-1', text: `Aristoteles' „modes of persuasion" ->`, abfragbar: false, gruppe: 'rahmen' },
    { id: 'einleitung-2', text: 'Andere überzeugen mir zu folgen durch....', abfragbar: false, gruppe: 'rahmen' },
    { id: 'rhetorik', text: '-> Rhetorik!', abfragbar: false, gruppe: 'rahmen' },
    { id: 'modus-1', text: 'ETHOS', abfragbar: true, gruppe: 'modi' },
    { id: 'modus-2', text: 'PATHOS', abfragbar: true, gruppe: 'modi' },
    { id: 'modus-3', text: 'LOGOS', abfragbar: true, gruppe: 'modi' },
  ],
}
