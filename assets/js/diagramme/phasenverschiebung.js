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
  labels: [
    { id: 'achse-y', text: 'Wahrgenommene Kompetenz', abfragbar: false, gruppe: 'achsen' },
    { id: 'achse-x', text: 'Zeit', abfragbar: false, gruppe: 'achsen' },
    { id: 'top-management', text: 'Top Management', abfragbar: true, gruppe: 'ebenen' },
    { id: 'middle-management', text: 'Middle Management', abfragbar: true, gruppe: 'ebenen' },
    { id: 'mitarbeiter', text: 'Mitarbeiter', abfragbar: true, gruppe: 'ebenen' },
  ],
}
