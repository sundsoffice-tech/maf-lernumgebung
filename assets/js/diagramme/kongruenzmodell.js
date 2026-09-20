// Folie 80: Kongruenzmodell nach Nadler/Tushman (1997). Eigene Zeichnung.
// Aussage der Folie: Input geht ueber die Strategie in vier miteinander verbundene Elemente,
// daraus entsteht der Output, und ein Feedback laeuft zurueck. Das rote Oval hebt die
// "Informelle Organisation" hervor, so wie auf der Folie.
export default {
  id: 'kongruenzmodell',
  titel: 'Kongruenzmodell nach Nadler/Tushman (1997)',
  folien: [80],
  viewBox: '0 0 800 578',
  minBreite: 640,
  beschreibung: 'Von links nach rechts: der Input (Umwelt, Ressourcen, Geschichte) wirkt über die Strategie auf vier wechselseitig verbundene Elemente, aus denen der Output (Individuum, Team, Organisation) entsteht. Ein Feedback-Pfeil läuft über die ganze Breite zurück.',
  svg: `
  <g>
    <text data-label="modelltitel" x="16" y="28" text-anchor="start" class="d-text-titel">Kongruenzmodell nach Nadler/Tushman (1997)</text>

    <rect class="d-flaeche-2" x="14" y="110" width="124" height="290" rx="8"/>
    <text data-label="input" x="76" y="152" text-anchor="middle" class="d-text-titel">Input</text>
    <text data-label="umwelt" x="76" y="222" text-anchor="middle" class="d-text">Umwelt</text>
    <text data-label="ressourcen" x="76" y="282" text-anchor="middle" class="d-text">Ressourcen</text>
    <text data-label="geschichte" x="76" y="342" text-anchor="middle" class="d-text">Geschichte</text>

    <polygon class="d-flaeche-3" points="142,244 206,244 206,228 238,262 206,296 206,280 142,280"/>
    <text data-label="strategie" x="174" y="267" text-anchor="middle" class="d-text-klein">Strategie</text>

    <rect class="d-flaeche-2" x="330" y="56" width="200" height="76" rx="6"/>
    <text data-label="informelle-organisation" x="430" y="88" text-anchor="middle" class="d-text-fett"><tspan x="430" y="88">Informelle </tspan><tspan x="430" y="110">Organisation</tspan></text>
    <ellipse class="d-linie-akzent" cx="430" cy="94" rx="106" ry="46"/>

    <rect class="d-flaeche-2" x="246" y="224" width="148" height="76" rx="6"/>
    <text data-label="prozesse" x="320" y="268" text-anchor="middle" class="d-text-fett">Prozesse</text>

    <rect class="d-flaeche-2" x="466" y="224" width="170" height="76" rx="6"/>
    <text data-label="formelle-organisation" x="551" y="256" text-anchor="middle" class="d-text-fett"><tspan x="551" y="256">Formelle </tspan><tspan x="551" y="278">Organisation</tspan></text>

    <rect class="d-flaeche-2" x="360" y="390" width="140" height="76" rx="6"/>
    <text data-label="menschen" x="430" y="434" text-anchor="middle" class="d-text-fett">Menschen</text>

    <line class="d-linie-duenn" x1="430" y1="160" x2="430" y2="372"/>
    <polygon class="d-pfeilspitze" points="0,-9 -6,4 6,4" transform="translate(430,146)"/>
    <polygon class="d-pfeilspitze" points="0,-9 -6,4 6,4" transform="translate(430,386) rotate(180)"/>

    <line class="d-linie-duenn" x1="412" y1="262" x2="448" y2="262"/>
    <polygon class="d-pfeilspitze" points="0,-9 -6,4 6,4" transform="translate(400,262) rotate(270)"/>
    <polygon class="d-pfeilspitze" points="0,-9 -6,4 6,4" transform="translate(460,262) rotate(90)"/>

    <line class="d-linie-duenn" x1="345" y1="157" x2="309" y2="205"/>
    <polygon class="d-pfeilspitze" points="0,-9 -6,4 6,4" transform="translate(350,150) rotate(36.6)"/>
    <polygon class="d-pfeilspitze" points="0,-9 -6,4 6,4" transform="translate(304,212) rotate(216.6)"/>

    <line class="d-linie-duenn" x1="515" y1="157" x2="551" y2="205"/>
    <polygon class="d-pfeilspitze" points="0,-9 -6,4 6,4" transform="translate(510,150) rotate(-36.6)"/>
    <polygon class="d-pfeilspitze" points="0,-9 -6,4 6,4" transform="translate(556,212) rotate(143.4)"/>

    <line class="d-linie-duenn" x1="374" y1="378" x2="340" y2="314"/>
    <polygon class="d-pfeilspitze" points="0,-9 -6,4 6,4" transform="translate(378,386) rotate(152.3)"/>
    <polygon class="d-pfeilspitze" points="0,-9 -6,4 6,4" transform="translate(336,306) rotate(-27.7)"/>

    <line class="d-linie-duenn" x1="486" y1="378" x2="520" y2="314"/>
    <polygon class="d-pfeilspitze" points="0,-9 -6,4 6,4" transform="translate(482,386) rotate(207.7)"/>
    <polygon class="d-pfeilspitze" points="0,-9 -6,4 6,4" transform="translate(524,306) rotate(27.7)"/>

    <polygon class="d-flaeche-3" points="640,244 658,244 658,232 674,262 658,292 658,280 640,280"/>

    <rect class="d-flaeche-2" x="676" y="110" width="110" height="290" rx="8"/>
    <text data-label="output" x="731" y="152" text-anchor="middle" class="d-text-titel">Output</text>
    <text data-label="individuum" x="731" y="222" text-anchor="middle" class="d-text">Individuum</text>
    <text data-label="team" x="731" y="282" text-anchor="middle" class="d-text">Team</text>
    <text data-label="organisation" x="731" y="342" text-anchor="middle" class="d-text">Organisation</text>

    <polygon class="d-flaeche-3" points="786,492 70,492 70,478 22,514 70,550 70,536 786,536"/>
    <text data-label="feedback" x="430" y="521" text-anchor="middle" class="d-text-fett" xml:space="preserve">F  E  E  D  B  A  C  K</text>
  </g>`,
  viewBoxSchmal: '0 0 360 738',
  svgSchmal: `
  <g>
    <text data-label="modelltitel" x="180" y="26" text-anchor="middle" class="d-text-titel"><tspan x="180" y="26">Kongruenzmodell nach </tspan><tspan x="180" y="48">Nadler/Tushman (1997)</tspan></text>

    <rect class="d-flaeche-2" x="10" y="62" width="340" height="84" rx="8"/>
    <text data-label="input" x="180" y="90" text-anchor="middle" class="d-text-titel">Input</text>
    <text data-label="umwelt" x="60" y="124" text-anchor="middle" class="d-text">Umwelt</text>
    <text data-label="ressourcen" x="180" y="124" text-anchor="middle" class="d-text">Ressourcen</text>
    <text data-label="geschichte" x="300" y="124" text-anchor="middle" class="d-text">Geschichte</text>

    <path class="d-flaeche-3" d="M 124 150 L 236 150 L 236 180 L 258 180 L 180 210 L 102 180 L 124 180 Z"/>
    <text data-label="strategie" x="180" y="172" text-anchor="middle" class="d-text-klein">Strategie</text>

    <rect class="d-flaeche-2" x="95" y="232" width="170" height="54" rx="6"/>
    <text data-label="informelle-organisation" x="180" y="264" text-anchor="middle" class="d-text-fett"><tspan x="180" y="253">Informelle </tspan><tspan x="180" y="275">Organisation</tspan></text>
    <ellipse class="d-linie-akzent" cx="180" cy="259" rx="96" ry="38"/>

    <rect class="d-flaeche-2" x="10" y="336" width="144" height="54" rx="6"/>
    <text data-label="prozesse" x="82" y="369" text-anchor="middle" class="d-text-fett">Prozesse</text>

    <rect class="d-flaeche-2" x="206" y="336" width="144" height="54" rx="6"/>
    <text data-label="formelle-organisation" x="278" y="367" text-anchor="middle" class="d-text-fett"><tspan x="278" y="356">Formelle </tspan><tspan x="278" y="378">Organisation</tspan></text>

    <rect class="d-flaeche-2" x="95" y="440" width="170" height="54" rx="6"/>
    <text data-label="menschen" x="180" y="473" text-anchor="middle" class="d-text-fett">Menschen</text>

    <path class="d-linie-duenn" d="M 180 310 L 180 427"/>
    <path class="d-pfeilspitze" d="M 0 -9 L -6 4 L 6 4 Z" transform="translate(180,306)"/>
    <path class="d-pfeilspitze" d="M 0 -9 L -6 4 L 6 4 Z" transform="translate(180,431) rotate(180)"/>

    <path class="d-linie-duenn" d="M 167 363 L 193 363"/>
    <path class="d-pfeilspitze" d="M 0 -9 L -6 4 L 6 4 Z" transform="translate(163,363) rotate(270)"/>
    <path class="d-pfeilspitze" d="M 0 -9 L -6 4 L 6 4 Z" transform="translate(197,363) rotate(90)"/>

    <path class="d-linie-duenn" d="M 139 303 L 115 328"/>
    <path class="d-pfeilspitze" d="M 0 -9 L -6 4 L 6 4 Z" transform="translate(140,301) rotate(43)"/>
    <path class="d-pfeilspitze" d="M 0 -9 L -6 4 L 6 4 Z" transform="translate(114,330) rotate(-137)"/>

    <path class="d-linie-duenn" d="M 221 303 L 245 328"/>
    <path class="d-pfeilspitze" d="M 0 -9 L -6 4 L 6 4 Z" transform="translate(220,301) rotate(-43)"/>
    <path class="d-pfeilspitze" d="M 0 -9 L -6 4 L 6 4 Z" transform="translate(246,330) rotate(137)"/>

    <path class="d-linie-duenn" d="M 147 435 L 115 399"/>
    <path class="d-pfeilspitze" d="M 0 -9 L -6 4 L 6 4 Z" transform="translate(148,434) rotate(137)"/>
    <path class="d-pfeilspitze" d="M 0 -9 L -6 4 L 6 4 Z" transform="translate(114,397) rotate(-43)"/>

    <path class="d-linie-duenn" d="M 213 435 L 245 399"/>
    <path class="d-pfeilspitze" d="M 0 -9 L -6 4 L 6 4 Z" transform="translate(212,434) rotate(-137)"/>
    <path class="d-pfeilspitze" d="M 0 -9 L -6 4 L 6 4 Z" transform="translate(246,397) rotate(43)"/>

    <path class="d-flaeche-3" d="M 124 502 L 236 502 L 236 532 L 258 532 L 180 562 L 102 532 L 124 532 Z"/>

    <rect class="d-flaeche-2" x="10" y="572" width="340" height="84" rx="8"/>
    <text data-label="output" x="180" y="600" text-anchor="middle" class="d-text-titel">Output</text>
    <text data-label="individuum" x="62" y="634" text-anchor="middle" class="d-text">Individuum</text>
    <text data-label="team" x="180" y="634" text-anchor="middle" class="d-text">Team</text>
    <text data-label="organisation" x="296" y="634" text-anchor="middle" class="d-text">Organisation</text>

    <path class="d-flaeche-3" d="M 348 678 L 46 678 L 46 668 L 14 696 L 46 724 L 46 714 L 348 714 Z"/>
    <text data-label="feedback" x="197" y="702" text-anchor="middle" class="d-text-fett" xml:space="preserve">F  E  E  D  B  A  C  K</text>
  </g>`,
  labels: [
    { id: 'modelltitel', text: 'Kongruenzmodell nach Nadler/Tushman (1997)', abfragbar: false, gruppe: 'rahmen' },
    { id: 'input', text: 'Input', abfragbar: false, gruppe: 'rahmen' },
    { id: 'umwelt', text: 'Umwelt', abfragbar: false, gruppe: 'rahmen' },
    { id: 'ressourcen', text: 'Ressourcen', abfragbar: false, gruppe: 'rahmen' },
    { id: 'geschichte', text: 'Geschichte', abfragbar: false, gruppe: 'rahmen' },
    { id: 'strategie', text: 'Strategie', abfragbar: false, gruppe: 'rahmen' },
    { id: 'informelle-organisation', text: 'Informelle Organisation', abfragbar: true, gruppe: 'elemente' },
    { id: 'prozesse', text: 'Prozesse', abfragbar: true, gruppe: 'elemente' },
    { id: 'formelle-organisation', text: 'Formelle Organisation', abfragbar: true, gruppe: 'elemente' },
    { id: 'menschen', text: 'Menschen', abfragbar: true, gruppe: 'elemente' },
    { id: 'output', text: 'Output', abfragbar: false, gruppe: 'rahmen' },
    { id: 'individuum', text: 'Individuum', abfragbar: false, gruppe: 'rahmen' },
    { id: 'team', text: 'Team', abfragbar: false, gruppe: 'rahmen' },
    { id: 'organisation', text: 'Organisation', abfragbar: false, gruppe: 'rahmen' },
    { id: 'feedback', text: 'F  E  E  D  B  A  C  K', abfragbar: false, gruppe: 'rahmen' },
  ],
}
