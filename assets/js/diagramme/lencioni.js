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
