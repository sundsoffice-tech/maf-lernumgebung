// Folie 39 (Tabelle "Übersicht Führungsstile", Zeile Blake/Mouton): die fünf im Skript genannten
// Positionen mit ihren Zahlenpaaren in einem Gitter aus den beiden Dimensionen der Folie.
// Das Skript nennt nur Dimensionen, Bezeichnungen und Zahlenpaare; die Skala zeigt deshalb nur die
// Werte 1, 5 und 9, die dort vorkommen. Die Folie selbst zeichnet kein Gitter.
export default {
  id: 'blake-mouton',
  titel: 'Führungsstile nach Blake/Mouton',
  folien: [39],
  viewBox: '0 0 800 560',
  beschreibung: 'Die Führungsstile nach Blake/Mouton liegen in einem Gitter aus Aufgabenorientierung und Mitarbeiterorientierung. Fünf Positionen sind benannt, von (1,1) unten links bis (9,9) oben rechts.',
  svg: `
    <text data-label="titel" x="400" y="30" text-anchor="middle" class="d-text-titel">Blake/Mouton</text>

    <rect x="120" y="60" width="580" height="400" class="d-flaeche-leer"/>
    <path d="M 192.5 60 L 192.5 460" class="d-linie-gestrichelt"/>
    <path d="M 265 60 L 265 460" class="d-linie-gestrichelt"/>
    <path d="M 337.5 60 L 337.5 460" class="d-linie-gestrichelt"/>
    <path d="M 410 60 L 410 460" class="d-linie-gestrichelt"/>
    <path d="M 482.5 60 L 482.5 460" class="d-linie-gestrichelt"/>
    <path d="M 555 60 L 555 460" class="d-linie-gestrichelt"/>
    <path d="M 627.5 60 L 627.5 460" class="d-linie-gestrichelt"/>
    <path d="M 120 410 L 700 410" class="d-linie-gestrichelt"/>
    <path d="M 120 360 L 700 360" class="d-linie-gestrichelt"/>
    <path d="M 120 310 L 700 310" class="d-linie-gestrichelt"/>
    <path d="M 120 260 L 700 260" class="d-linie-gestrichelt"/>
    <path d="M 120 210 L 700 210" class="d-linie-gestrichelt"/>
    <path d="M 120 160 L 700 160" class="d-linie-gestrichelt"/>
    <path d="M 120 110 L 700 110" class="d-linie-gestrichelt"/>

    <circle cx="120" cy="460" r="7" class="d-punkt"/>
    <rect x="128" y="420" width="186" height="22" rx="4" class="d-flaeche-leer"/>
    <text data-label="stil-11" x="134" y="436" text-anchor="start" class="d-text-fett">laissez-faire pflegen</text>
    <text data-label="wert-11" x="134" y="456" text-anchor="start" class="d-text-leise">(1,1)</text>

    <circle cx="700" cy="460" r="7" class="d-punkt"/>
    <rect x="528" y="420" width="164" height="22" rx="4" class="d-flaeche-leer"/>
    <text data-label="stil-91" x="686" y="436" text-anchor="end" class="d-text-fett">über Leichen gehen</text>
    <text data-label="wert-91" x="686" y="456" text-anchor="end" class="d-text-leise">(9,1)</text>

    <circle cx="410" cy="260" r="7" class="d-punkt"/>
    <rect x="262" y="220" width="296" height="22" rx="4" class="d-flaeche-leer"/>
    <text data-label="stil-55" x="410" y="236" text-anchor="middle" class="d-text-fett">ausgeglichene Kombinationen suchen</text>
    <text data-label="wert-55" x="424" y="285" text-anchor="start" class="d-text-leise">(5,5)</text>

    <circle cx="120" cy="60" r="7" class="d-punkt"/>
    <rect x="128" y="64" width="210" height="22" rx="4" class="d-flaeche-leer"/>
    <text data-label="stil-19" x="134" y="80" text-anchor="start" class="d-text-fett">geselliges Beisammensein</text>
    <text data-label="wert-19" x="134" y="100" text-anchor="start" class="d-text-leise">(1,9)</text>

    <circle cx="700" cy="60" r="7" class="d-punkt"/>
    <rect x="528" y="64" width="164" height="22" rx="4" class="d-flaeche-leer"/>
    <text data-label="stil-99" x="686" y="80" text-anchor="end" class="d-text-fett">exzellente Führung</text>
    <text data-label="wert-99" x="686" y="100" text-anchor="end" class="d-text-leise">(9,9)</text>

    <path d="M 120 470 L 120 478" class="d-linie-duenn"/>
    <path d="M 410 470 L 410 478" class="d-linie-duenn"/>
    <path d="M 700 470 L 700 478" class="d-linie-duenn"/>
    <text data-label="skala-x1" x="120" y="494" text-anchor="middle" class="d-text-klein">1</text>
    <text data-label="skala-x5" x="410" y="494" text-anchor="middle" class="d-text-klein">5</text>
    <text data-label="skala-x9" x="700" y="494" text-anchor="middle" class="d-text-klein">9</text>
    <text data-label="achse-x" x="410" y="522" text-anchor="middle" class="d-text-fett">Aufgabenorientierung</text>

    <path d="M 104 460 L 112 460" class="d-linie-duenn"/>
    <path d="M 104 260 L 112 260" class="d-linie-duenn"/>
    <path d="M 104 60 L 112 60" class="d-linie-duenn"/>
    <text data-label="skala-y1" x="96" y="465" text-anchor="end" class="d-text-klein">1</text>
    <text data-label="skala-y5" x="96" y="265" text-anchor="end" class="d-text-klein">5</text>
    <text data-label="skala-y9" x="96" y="65" text-anchor="end" class="d-text-klein">9</text>
    <text data-label="achse-y" x="50" y="260" text-anchor="middle" transform="rotate(-90 50 260)" class="d-text-fett">Mitarbeiterorientierung</text>
  `,
  // Hochkant: dasselbe Gitter, quadratisch und kleiner; die Bezeichnungen stehen zweizeilig
  // an ihrer Ecke, die Zahlenpaare darunter. Lage der fuenf Positionen bleibt unveraendert.
  viewBoxSchmal: '0 0 360 464',
  svgSchmal: `
    <text data-label="titel" x="180" y="26" text-anchor="middle" class="d-text-titel">Blake/Mouton</text>

    <rect x="60" y="96" width="270" height="300" class="d-flaeche-leer"/>
    <path d="M 93.75 96 L 93.75 396" class="d-linie-gestrichelt"/>
    <path d="M 127.5 96 L 127.5 396" class="d-linie-gestrichelt"/>
    <path d="M 161.25 96 L 161.25 396" class="d-linie-gestrichelt"/>
    <path d="M 195 96 L 195 396" class="d-linie-gestrichelt"/>
    <path d="M 228.75 96 L 228.75 396" class="d-linie-gestrichelt"/>
    <path d="M 262.5 96 L 262.5 396" class="d-linie-gestrichelt"/>
    <path d="M 296.25 96 L 296.25 396" class="d-linie-gestrichelt"/>
    <path d="M 60 133.5 L 330 133.5" class="d-linie-gestrichelt"/>
    <path d="M 60 171 L 330 171" class="d-linie-gestrichelt"/>
    <path d="M 60 208.5 L 330 208.5" class="d-linie-gestrichelt"/>
    <path d="M 60 246 L 330 246" class="d-linie-gestrichelt"/>
    <path d="M 60 283.5 L 330 283.5" class="d-linie-gestrichelt"/>
    <path d="M 60 321 L 330 321" class="d-linie-gestrichelt"/>
    <path d="M 60 358.5 L 330 358.5" class="d-linie-gestrichelt"/>

    <circle cx="60" cy="396" r="7" class="d-punkt"/>
    <rect x="62" y="296" width="98" height="62" rx="4" class="d-flaeche-leer"/>
    <text data-label="stil-11" x="68" y="319" text-anchor="start" class="d-text-fett"><tspan x="68" y="310">laissez-faire </tspan><tspan x="68" y="328">pflegen</tspan></text>
    <text data-label="wert-11" x="68" y="348" text-anchor="start" class="d-text-leise">(1,1)</text>

    <circle cx="330" cy="396" r="7" class="d-punkt"/>
    <rect x="227" y="296" width="103" height="62" rx="4" class="d-flaeche-leer"/>
    <text data-label="stil-91" x="324" y="319" text-anchor="end" class="d-text-fett"><tspan x="324" y="310">über Leichen </tspan><tspan x="324" y="328">gehen</tspan></text>
    <text data-label="wert-91" x="324" y="348" text-anchor="end" class="d-text-leise">(9,1)</text>

    <circle cx="195" cy="246" r="7" class="d-punkt"/>
    <rect x="134" y="176" width="122" height="62" rx="4" class="d-flaeche-leer"/>
    <text data-label="stil-55" x="195" y="208" text-anchor="middle" class="d-text-fett"><tspan x="195" y="190">ausgeglichene </tspan><tspan x="195" y="208">Kombinationen </tspan><tspan x="195" y="226">suchen</tspan></text>
    <rect x="205" y="250" width="37" height="22" rx="4" class="d-flaeche-leer"/>
    <text data-label="wert-55" x="209" y="266" text-anchor="start" class="d-text-leise">(5,5)</text>

    <circle cx="60" cy="96" r="7" class="d-punkt"/>
    <rect x="62" y="104" width="124" height="62" rx="4" class="d-flaeche-leer"/>
    <text data-label="stil-19" x="68" y="127" text-anchor="start" class="d-text-fett"><tspan x="68" y="118">geselliges </tspan><tspan x="68" y="136">Beisammensein</tspan></text>
    <text data-label="wert-19" x="68" y="156" text-anchor="start" class="d-text-leise">(1,9)</text>

    <circle cx="330" cy="96" r="7" class="d-punkt"/>
    <rect x="244" y="104" width="86" height="62" rx="4" class="d-flaeche-leer"/>
    <text data-label="stil-99" x="324" y="127" text-anchor="end" class="d-text-fett"><tspan x="324" y="118">exzellente </tspan><tspan x="324" y="136">Führung</tspan></text>
    <text data-label="wert-99" x="324" y="156" text-anchor="end" class="d-text-leise">(9,9)</text>

    <path d="M 60 396 L 60 404" class="d-linie-duenn"/>
    <path d="M 195 396 L 195 404" class="d-linie-duenn"/>
    <path d="M 330 396 L 330 404" class="d-linie-duenn"/>
    <text data-label="skala-x1" x="60" y="420" text-anchor="middle" class="d-text-klein">1</text>
    <text data-label="skala-x5" x="195" y="420" text-anchor="middle" class="d-text-klein">5</text>
    <text data-label="skala-x9" x="330" y="420" text-anchor="middle" class="d-text-klein">9</text>
    <text data-label="achse-x" x="195" y="446" text-anchor="middle" class="d-text-fett">Aufgabenorientierung</text>

    <path d="M 52 396 L 60 396" class="d-linie-duenn"/>
    <path d="M 52 246 L 60 246" class="d-linie-duenn"/>
    <path d="M 52 96 L 60 96" class="d-linie-duenn"/>
    <text data-label="skala-y1" x="46" y="401" text-anchor="end" class="d-text-klein">1</text>
    <text data-label="skala-y5" x="46" y="251" text-anchor="end" class="d-text-klein">5</text>
    <text data-label="skala-y9" x="46" y="101" text-anchor="end" class="d-text-klein">9</text>
    <text data-label="achse-y" x="20" y="246" text-anchor="middle" transform="rotate(-90 20 246)" class="d-text-fett">Mitarbeiterorientierung</text>
  `,
  labels: [
    { id: 'titel', text: 'Blake/Mouton', abfragbar: false, gruppe: 'rahmen' },
    { id: 'stil-11', text: 'laissez-faire pflegen', abfragbar: true, gruppe: 'stile' },
    { id: 'stil-91', text: 'über Leichen gehen', abfragbar: true, gruppe: 'stile' },
    { id: 'stil-55', text: 'ausgeglichene Kombinationen suchen', abfragbar: true, gruppe: 'stile' },
    { id: 'stil-99', text: 'exzellente Führung', abfragbar: true, gruppe: 'stile' },
    { id: 'stil-19', text: 'geselliges Beisammensein', abfragbar: true, gruppe: 'stile' },
    { id: 'wert-11', text: '(1,1)', abfragbar: false, gruppe: 'werte' },
    { id: 'wert-91', text: '(9,1)', abfragbar: false, gruppe: 'werte' },
    { id: 'wert-55', text: '(5,5)', abfragbar: false, gruppe: 'werte' },
    { id: 'wert-99', text: '(9,9)', abfragbar: false, gruppe: 'werte' },
    { id: 'wert-19', text: '(1,9)', abfragbar: false, gruppe: 'werte' },
    { id: 'achse-x', text: 'Aufgabenorientierung', abfragbar: false, gruppe: 'achsen' },
    { id: 'achse-y', text: 'Mitarbeiterorientierung', abfragbar: false, gruppe: 'achsen' },
    { id: 'skala-x1', text: '1', abfragbar: false, gruppe: 'achsen' },
    { id: 'skala-x5', text: '5', abfragbar: false, gruppe: 'achsen' },
    { id: 'skala-x9', text: '9', abfragbar: false, gruppe: 'achsen' },
    { id: 'skala-y1', text: '1', abfragbar: false, gruppe: 'achsen' },
    { id: 'skala-y5', text: '5', abfragbar: false, gruppe: 'achsen' },
    { id: 'skala-y9', text: '9', abfragbar: false, gruppe: 'achsen' },
  ],
}
