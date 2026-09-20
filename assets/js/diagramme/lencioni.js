// Abschlussfolie (folie-58.md): Teamperformance-Pyramide nach Patrick Lencioni. Eigene Darstellung.
// Links die fünf Funktionen (Spitze oben), rechts die fünf Dysfunktionen (Spitze unten); gleiche Höhe = Paar.
export default {
  id: 'lencioni',
  titel: 'Die Kehrseite: Dysfunktionen eines Teams',
  folien: [],
  quelleText: 'Abschlussfolie',
  viewBox: '0 0 800 590',
  minBreite: 600,
  beschreibung: 'Zwei ineinandergeschobene Dreiecke: links die fünf Funktionen eines Teams von Vertrauen unten bis Ziel-Orientierung oben, rechts die fünf Dysfunktionen von fehlender Offenheit unten bis Dominanz von Status und Ego oben. Was auf gleicher Höhe steht, gehört als Paar zusammen.',
  svg: `<g>
  <text data-label="titel" x="400" y="32" text-anchor="middle" class="d-text-titel">Teamperformance-Pyramide</text>
  <text data-label="kopf-funktionen" x="205" y="68" text-anchor="middle" class="d-text-fett">5 Funktionen – to do</text>
  <text data-label="kopf-dysfunktionen" x="595" y="68" text-anchor="middle" class="d-text-fett">5 Dysfunktionen – to kill</text>

  <polygon class="d-dunkel" points="144,82 266,82 291,162 119,162"/>
  <polygon class="d-dunkel" points="117,166 293,166 318,246 92,246"/>
  <polygon class="d-dunkel" points="90,250 320,250 345,330 65,330"/>
  <polygon class="d-dunkel" points="63,334 347,334 372,414 38,414"/>
  <polygon class="d-dunkel" points="36,418 374,418 399,498 11,498"/>

  <polygon class="d-flaeche-leer" points="400,80 790,80 655,500 535,500"/>
  <path class="d-linie-duenn" d="M 427 164 L 763 164"/>
  <path class="d-linie-duenn" d="M 454 248 L 736 248"/>
  <path class="d-linie-duenn" d="M 481 332 L 709 332"/>
  <path class="d-linie-duenn" d="M 508 416 L 682 416"/>

  <text data-label="f-ziel" x="205" y="127" text-anchor="middle" class="d-text-invers">Ziel-Orientierung</text>
  <text data-label="f-verantwortung" x="205" y="200" text-anchor="middle" class="d-text-invers">
    <tspan x="205" dy="0">Gegenseitige</tspan>
    <tspan x="205" dy="19">Verantwortlichkeit</tspan>
  </text>
  <text data-label="f-selbstverpflichtung" x="205" y="295" text-anchor="middle" class="d-text-invers">Selbstverpflichtung</text>
  <text data-label="f-konflikt" x="205" y="379" text-anchor="middle" class="d-text-invers">Konfliktbereitschaft</text>
  <text data-label="f-vertrauen" x="205" y="463" text-anchor="middle" class="d-text-invers">Vertrauen</text>

  <text data-label="d-status" x="595" y="127" text-anchor="middle" class="d-text">Dominanz von Status und Ego</text>
  <text data-label="d-standards" x="595" y="211" text-anchor="middle" class="d-text">Niedrige Standards</text>
  <text data-label="d-zweideutigkeit" x="595" y="295" text-anchor="middle" class="d-text">Zweideutigkeit</text>
  <text data-label="d-harmonie" x="595" y="379" text-anchor="middle" class="d-text">Künstliche Harmonie</text>
  <text data-label="d-offenheit" x="595" y="463" text-anchor="middle" class="d-text">Fehlende Offenheit</text>

  <text data-label="quelle" x="400" y="556" text-anchor="middle" class="d-text-leise">Patrick Lencioni: Die 5 Dysfunktionen eines Teams, Wiley-VCH, 2014</text>
</g>`,
  // Hochkant (iPhone): beide Dreiecke bleiben nebeneinander, nur schmaler — sonst ginge die Aussage verloren,
  // dass auf gleicher Höhe ein Paar steht. Die Pyramide läuft weiter nach unten breiter, die Dysfunktionen
  // schmaler.
  viewBoxSchmal: '0 0 360 500',
  svgSchmal: `<g>
  <text data-label="titel" x="180" y="28" text-anchor="middle" class="d-text-titel">Teamperformance-Pyramide</text>
  <text data-label="kopf-funktionen" x="92" y="66" text-anchor="middle" class="d-text-fett">5 Funktionen – to do</text>
  <text data-label="kopf-dysfunktionen" x="268" y="66" text-anchor="middle" class="d-text-fett">5 Dysfunktionen – to kill</text>

  <polygon class="d-dunkel" points="19,86 165,86 168,150 16,150"/>
  <polygon class="d-dunkel" points="16,156 168,156 171,220 13,220"/>
  <polygon class="d-dunkel" points="12,226 172,226 175,290 9,290"/>
  <polygon class="d-dunkel" points="9,296 175,296 178,360 6,360"/>
  <polygon class="d-dunkel" points="6,366 178,366 181,430 3,430"/>

  <polygon class="d-flaeche-leer" points="179,86 357,86 331,430 205,430"/>
  <path class="d-linie-duenn" d="M 184 153 L 352 153"/>
  <path class="d-linie-duenn" d="M 189 223 L 347 223"/>
  <path class="d-linie-duenn" d="M 195 293 L 341 293"/>
  <path class="d-linie-duenn" d="M 200 363 L 336 363"/>

  <text data-label="f-ziel" x="92" y="123" text-anchor="middle" class="d-text-invers">Ziel-Orientierung</text>
  <text data-label="f-verantwortung" x="92" y="189" text-anchor="middle" class="d-text-invers">
    <tspan x="92" dy="0">Gegenseitige</tspan>
    <tspan x="92" dy="19">Verantwortlichkeit</tspan>
  </text>
  <text data-label="f-selbstverpflichtung" x="92" y="263" text-anchor="middle" class="d-text-invers">Selbstverpflichtung</text>
  <text data-label="f-konflikt" x="92" y="333" text-anchor="middle" class="d-text-invers">Konfliktbereitschaft</text>
  <text data-label="f-vertrauen" x="92" y="403" text-anchor="middle" class="d-text-invers">Vertrauen</text>

  <text data-label="d-status" x="268" y="119" text-anchor="middle" class="d-text">
    <tspan x="268" dy="0">Dominanz von</tspan>
    <tspan x="268" dy="19">Status und Ego</tspan>
  </text>
  <text data-label="d-standards" x="268" y="193" text-anchor="middle" class="d-text">Niedrige Standards</text>
  <text data-label="d-zweideutigkeit" x="268" y="263" text-anchor="middle" class="d-text">Zweideutigkeit</text>
  <text data-label="d-harmonie" x="268" y="329" text-anchor="middle" class="d-text">
    <tspan x="268" dy="0">Künstliche</tspan>
    <tspan x="268" dy="19">Harmonie</tspan>
  </text>
  <text data-label="d-offenheit" x="268" y="399" text-anchor="middle" class="d-text">
    <tspan x="268" dy="0">Fehlende</tspan>
    <tspan x="268" dy="19">Offenheit</tspan>
  </text>

  <text data-label="quelle" x="180" y="466" text-anchor="middle" class="d-text-leise">
    <tspan x="180" dy="0">Patrick Lencioni: Die 5 Dysfunktionen</tspan>
    <tspan x="180" dy="17">eines Teams, Wiley-VCH, 2014</tspan>
  </text>
</g>`,
  labels: [
    { id: 'f-ziel', text: 'Ziel-Orientierung', abfragbar: true, gruppe: 'funktionen' },
    { id: 'f-verantwortung', text: 'Gegenseitige Verantwortlichkeit', abfragbar: true, gruppe: 'funktionen' },
    { id: 'f-selbstverpflichtung', text: 'Selbstverpflichtung', abfragbar: true, gruppe: 'funktionen' },
    { id: 'f-konflikt', text: 'Konfliktbereitschaft', abfragbar: true, gruppe: 'funktionen' },
    { id: 'f-vertrauen', text: 'Vertrauen', abfragbar: true, gruppe: 'funktionen' },
    { id: 'd-status', text: 'Dominanz von Status und Ego', abfragbar: true, gruppe: 'dysfunktionen' },
    { id: 'd-standards', text: 'Niedrige Standards', abfragbar: true, gruppe: 'dysfunktionen' },
    { id: 'd-zweideutigkeit', text: 'Zweideutigkeit', abfragbar: true, gruppe: 'dysfunktionen' },
    { id: 'd-harmonie', text: 'Künstliche Harmonie', abfragbar: true, gruppe: 'dysfunktionen' },
    { id: 'd-offenheit', text: 'Fehlende Offenheit', abfragbar: true, gruppe: 'dysfunktionen' },
    { id: 'titel', text: 'Teamperformance-Pyramide', abfragbar: false, gruppe: 'funktionen' },
    { id: 'kopf-funktionen', text: '5 Funktionen – to do', abfragbar: false, gruppe: 'funktionen' },
    { id: 'kopf-dysfunktionen', text: '5 Dysfunktionen – to kill', abfragbar: false, gruppe: 'dysfunktionen' },
    { id: 'quelle', text: 'Patrick Lencioni: Die 5 Dysfunktionen eines Teams, Wiley-VCH, 2014', abfragbar: false, gruppe: 'funktionen' },
  ],
}
