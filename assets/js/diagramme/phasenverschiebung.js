// Folie 81, Abbildung oben rechts: drei zeitversetzte Kurven der wahrgenommenen Kompetenz.
// Eigene Zeichnung. Die Folie unterscheidet die Kurven nur durch Farbe; hier zusaetzlich durch
// Strichart, damit die Zuordnung auch ohne Farbunterscheidung moeglich bleibt.
export default {
  id: 'phasenverschiebung',
  titel: 'Phasenverschiebung Kompetenz',
  folien: [81],
  viewBox: '0 0 800 472',
  minBreite: 600,
  beschreibung: 'Drei gleich geformte Kurven der wahrgenommenen Kompetenz über die Zeit, gegeneinander zeitversetzt: das Top Management durchläuft den Einbruch zuerst, das Middle Management danach, die Mitarbeiter zuletzt.',
  svg: `
  <g>
    <text data-label="achse-y" x="116" y="28" text-anchor="start" class="d-text-fett">Wahrgenommene Kompetenz</text>

    <line class="d-kurve" x1="120" y1="53" x2="152" y2="53"/>
    <text data-label="top-management" x="160" y="58" text-anchor="start" class="d-text-fett">Top Management</text>
    <line class="d-linie-gut" x1="310" y1="53" x2="342" y2="53" stroke-dasharray="9 6"/>
    <text data-label="middle-management" x="350" y="58" text-anchor="start" class="d-text-fett">Middle Management</text>
    <line class="d-linie-akzent" x1="528" y1="53" x2="560" y2="53" stroke-dasharray="2 5"/>
    <text data-label="mitarbeiter" x="568" y="58" text-anchor="start" class="d-text-fett">Mitarbeiter</text>

    <line class="d-linie-duenn" x1="120" y1="440" x2="120" y2="92"/>
    <polygon class="d-pfeilspitze" points="0,-9 -6,4 6,4" transform="translate(120,80)"/>
    <line class="d-linie-duenn" x1="120" y1="440" x2="778" y2="440"/>
    <polygon class="d-pfeilspitze" points="0,-9 -6,4 6,4" transform="translate(790,440) rotate(90)"/>
    <text data-label="achse-x" x="772" y="428" text-anchor="end" class="d-text-fett">Zeit</text>

    <path class="d-kurve" d="M 130 262 C 152 292 168 336 188 348 C 206 358 220 328 234 296 C 250 262 260 298 270 330 C 282 362 294 378 310 378 C 338 378 356 326 382 256 C 404 198 428 170 452 160 C 490 147 550 145 600 144"/>
    <path class="d-linie-gut" d="M 196 262 C 218 292 234 336 254 348 C 272 358 286 328 300 296 C 316 262 326 298 336 330 C 348 362 360 378 376 378 C 404 378 422 326 448 256 C 470 198 494 170 518 160 C 556 147 616 145 666 144" stroke-dasharray="9 6"/>
    <path class="d-linie-akzent" d="M 262 262 C 284 292 300 336 320 348 C 338 358 352 328 366 296 C 382 262 392 298 402 330 C 414 362 426 378 442 378 C 470 378 488 326 514 256 C 536 198 560 170 584 160 C 622 147 682 145 732 144" stroke-dasharray="2 5"/>
  </g>`,
  // Hochkant laeuft die Zeit senkrecht nach unten und die Kompetenz waagerecht nach rechts.
  // Die drei Kurven sind dieselbe Form, um denselben Betrag zeitversetzt (translate in Zeitrichtung).
  viewBoxSchmal: '0 0 360 644',
  svgSchmal: `
  <g>
    <line class="d-kurve" x1="14" y1="30" x2="46" y2="30"/>
    <text data-label="top-management" x="54" y="35" text-anchor="start" class="d-text-fett">Top Management</text>
    <line class="d-linie-gut" x1="14" y1="58" x2="46" y2="58" stroke-dasharray="9 6"/>
    <text data-label="middle-management" x="54" y="63" text-anchor="start" class="d-text-fett">Middle Management</text>
    <line class="d-linie-akzent" x1="14" y1="86" x2="46" y2="86" stroke-dasharray="2 5"/>
    <text data-label="mitarbeiter" x="54" y="91" text-anchor="start" class="d-text-fett">Mitarbeiter</text>

    <text data-label="achse-y" x="180" y="120" text-anchor="middle" class="d-text-fett">Wahrgenommene Kompetenz</text>

    <line class="d-linie-duenn" x1="36" y1="134" x2="332" y2="134"/>
    <path class="d-pfeilspitze" d="M 0 -9 L -6 4 L 6 4 Z" transform="translate(344,134) rotate(90)"/>
    <line class="d-linie-duenn" x1="36" y1="134" x2="36" y2="610"/>
    <path class="d-pfeilspitze" d="M 0 -9 L -6 4 L 6 4 Z" transform="translate(36,622) rotate(180)"/>
    <text data-label="achse-x" x="52" y="627" text-anchor="start" class="d-text-fett">Zeit</text>

    <path class="d-kurve" d="M 194 150 C 159 169 109 183 95 201 C 83 216 118 229 155 241 C 194 255 152 263 115 272 C 79 283 60 293 60 307 C 60 331 120 347 201 370 C 268 389 300 410 312 431 C 326 450 329 464 330 478"/>
    <path class="d-linie-gut" transform="translate(0,58)" stroke-dasharray="9 6" d="M 194 150 C 159 169 109 183 95 201 C 83 216 118 229 155 241 C 194 255 152 263 115 272 C 79 283 60 293 60 307 C 60 331 120 347 201 370 C 268 389 300 410 312 431 C 326 450 329 464 330 478"/>
    <path class="d-linie-akzent" transform="translate(0,115)" stroke-dasharray="2 5" d="M 194 150 C 159 169 109 183 95 201 C 83 216 118 229 155 241 C 194 255 152 263 115 272 C 79 283 60 293 60 307 C 60 331 120 347 201 370 C 268 389 300 410 312 431 C 326 450 329 464 330 478"/>
  </g>`,
  labels: [
    { id: 'achse-y', text: 'Wahrgenommene Kompetenz', abfragbar: false, gruppe: 'achsen' },
    { id: 'achse-x', text: 'Zeit', abfragbar: false, gruppe: 'achsen' },
    { id: 'top-management', text: 'Top Management', abfragbar: true, gruppe: 'ebenen' },
    { id: 'middle-management', text: 'Middle Management', abfragbar: true, gruppe: 'ebenen' },
    { id: 'mitarbeiter', text: 'Mitarbeiter', abfragbar: true, gruppe: 'ebenen' },
  ],
}
