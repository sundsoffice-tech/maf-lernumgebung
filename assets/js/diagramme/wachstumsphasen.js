// Folie 35: sechs Phasen "Wachstum durch ..." mit den Krisen dazwischen, Evolution und Revolution.
// Eigene Zeichnung; Wortlaut, Reihenfolge und Achsen aus folie-07.md. Phase 6 traegt nur "??", so wie im Skript.
export default {
  id: 'wachstumsphasen',
  titel: 'Sechs Wachstumsphasen und ihre Krisen',
  folien: [35],
  viewBox: '0 0 800 620',
  minBreite: 660,
  beschreibung: 'Die Organisation wächst mit dem Alter in sechs Phasen von klein nach gross; zwischen den Phasen liegt jeweils eine Krise. Die Wachstumsphase heisst Evolution, die Krise Revolution.',
  svg: `
    <rect x="76" y="170" width="118" height="350" class="d-flaeche"/>
    <rect x="194" y="170" width="118" height="350" class="d-flaeche"/>
    <rect x="312" y="170" width="118" height="350" class="d-flaeche-2"/>
    <rect x="430" y="170" width="118" height="350" class="d-flaeche-2"/>
    <rect x="548" y="170" width="118" height="350" class="d-flaeche-3"/>
    <rect x="666" y="170" width="118" height="350" class="d-flaeche-3"/>

    <rect x="76" y="40" width="708" height="30" class="d-dunkel"/>
    <text data-label="kopf-1" x="135" y="61" text-anchor="middle" class="d-text-invers">Phase 1</text>
    <text data-label="kopf-2" x="253" y="61" text-anchor="middle" class="d-text-invers">Phase 2</text>
    <text data-label="kopf-3" x="371" y="61" text-anchor="middle" class="d-text-invers">Phase 3</text>
    <text data-label="kopf-4" x="489" y="61" text-anchor="middle" class="d-text-invers">Phase 4</text>
    <text data-label="kopf-5" x="607" y="61" text-anchor="middle" class="d-text-invers">Phase 5</text>
    <text data-label="kopf-6" x="725" y="61" text-anchor="middle" class="d-text-invers">Phase 6</text>

    <rect x="76" y="70" width="708" height="100" class="d-flaeche-leer"/>
    <path d="M 194 70 L 194 170" class="d-linie-duenn"/>
    <path d="M 312 70 L 312 170" class="d-linie-duenn"/>
    <path d="M 430 70 L 430 170" class="d-linie-duenn"/>
    <path d="M 548 70 L 548 170" class="d-linie-duenn"/>
    <path d="M 666 70 L 666 170" class="d-linie-duenn"/>
    <text data-label="phase-1" x="135" y="90" text-anchor="middle" class="d-text-klein"><tspan x="135" y="90">Wachstum durch </tspan><tspan x="135" y="106">‚Kreativität'</tspan></text>
    <text data-label="phase-2" x="253" y="90" text-anchor="middle" class="d-text-klein"><tspan x="253" y="90">Wachstum durch </tspan><tspan x="253" y="106">‚Direktion'</tspan></text>
    <text data-label="phase-3" x="371" y="90" text-anchor="middle" class="d-text-klein"><tspan x="371" y="90">Wachstum durch </tspan><tspan x="371" y="106">‚Delegation, </tspan><tspan x="371" y="122">Selbstorga-</tspan><tspan x="371" y="138">nisation</tspan></text>
    <text data-label="phase-4" x="489" y="90" text-anchor="middle" class="d-text-klein"><tspan x="489" y="90">Wachstum durch </tspan><tspan x="489" y="106">‚Koalition, </tspan><tspan x="489" y="122">gesteuerte </tspan><tspan x="489" y="138">Dynamik, </tspan><tspan x="489" y="154">Koordination'</tspan></text>
    <text data-label="phase-5" x="607" y="90" text-anchor="middle" class="d-text-klein"><tspan x="607" y="90">Wachstum durch </tspan><tspan x="607" y="106">‚Kollaboration, </tspan><tspan x="607" y="122">Akquisition, </tspan><tspan x="607" y="138">Innovation'</tspan></text>
    <text data-label="phase-6" x="725" y="90" text-anchor="middle" class="d-text-klein"><tspan x="725" y="90">Wachstum durch </tspan><tspan x="725" y="106">‚Strategische </tspan><tspan x="725" y="122">Allianzen'</tspan></text>

    <path d="M 76 505 L 763 247" class="d-linie"/>
    <path d="M 778 241 L 765.5 253.2 L 760.5 240.1 Z" class="d-pfeilspitze"/>

    <path d="M 178 470 L 186 450 L 192 468 L 199 448 L 206 466 L 212 452" class="d-linie-akzent"/>
    <path d="M 296 426 L 304 406 L 310 424 L 317 404 L 324 422 L 330 408" class="d-linie-akzent"/>
    <path d="M 414 381 L 422 361 L 428 379 L 435 359 L 442 377 L 448 363" class="d-linie-akzent"/>
    <path d="M 532 337 L 540 317 L 546 335 L 553 315 L 560 333 L 566 319" class="d-linie-akzent"/>
    <path d="M 719 267 L 727 247 L 733 265 L 740 245 L 747 263 L 753 249" class="d-linie-akzent"/>

    <rect x="67" y="423" width="136" height="32" rx="4" class="d-flaeche-leer"/>
    <text data-label="krise-1" x="135" y="444" text-anchor="middle" class="d-text-fett">Führungskrise</text>
    <rect x="185" y="379" width="136" height="32" rx="4" class="d-flaeche-leer"/>
    <text data-label="krise-2" x="253" y="400" text-anchor="middle" class="d-text-fett">Autonomiekrise</text>
    <rect x="303" y="335" width="136" height="32" rx="4" class="d-flaeche-leer"/>
    <text data-label="krise-3" x="371" y="356" text-anchor="middle" class="d-text-fett">Kontrollkrise</text>
    <rect x="421" y="290" width="136" height="32" rx="4" class="d-flaeche-leer"/>
    <text data-label="krise-4" x="489" y="311" text-anchor="middle" class="d-text-fett">Bürokratiekrise</text>

    <rect x="80" y="200" width="110" height="32" rx="4" class="d-flaeche-leer"/>
    <text data-label="stufe-1" x="135" y="221" text-anchor="middle" class="d-text-fett">Start-up</text>
    <rect x="309" y="195" width="124" height="48" rx="4" class="d-flaeche-leer"/>
    <text data-label="stufe-2" x="371" y="213" text-anchor="middle" class="d-text-fett"><tspan x="371" y="213">Sekundäres</tspan><tspan x="371" y="231"> Wachstum</tspan></text>
    <rect x="543" y="178" width="128" height="48" rx="4" class="d-flaeche-leer"/>
    <text data-label="stufe-3" x="607" y="196" text-anchor="middle" class="d-text-fett"><tspan x="607" y="196">Ausgereiftes</tspan><tspan x="607" y="214"> Wachstum</tspan></text>
    <rect x="543" y="230" width="128" height="46" rx="4" class="d-flaeche-leer"/>
    <text data-label="krise-5" x="607" y="248" text-anchor="middle" class="d-text-klein"><tspan x="607" y="248">Wachstumskrise,</tspan><tspan x="607" y="265"> Visionskrise</tspan></text>
    <rect x="690" y="190" width="70" height="32" rx="4" class="d-flaeche-leer"/>
    <text data-label="stufe-4" x="725" y="212" text-anchor="middle" class="d-text-fett">??</text>

    <rect x="560" y="400" width="224" height="100" rx="4" class="d-flaeche-leer"/>
    <path d="M 576 432 L 602 414" class="d-linie-duenn"/>
    <path d="M 610 409 L 601 421 L 597 412 Z" class="d-pfeilspitze"/>
    <text data-label="legende-1" x="620" y="420" text-anchor="start" class="d-text-klein">Evolution:</text>
    <text data-label="legende-2" x="620" y="438" text-anchor="start" class="d-text-klein">Wachstumsphase</text>
    <path d="M 574 476 L 581 462 L 586 474 L 592 460 L 598 472 L 604 462" class="d-linie-akzent"/>
    <text data-label="legende-3" x="620" y="466" text-anchor="start" class="d-text-klein">Revolution:</text>
    <text data-label="legende-4" x="620" y="484" text-anchor="start" class="d-text-klein">Phase der Krise</text>

    <path d="M 62 515 L 62 186" class="d-linie-duenn"/>
    <path d="M 62 172 L 56 188 L 68 188 Z" class="d-pfeilspitze"/>
    <text data-label="achse-gross" x="54" y="196" text-anchor="end" class="d-text-klein">gross</text>
    <text data-label="achse-klein" x="54" y="512" text-anchor="end" class="d-text-klein">klein</text>
    <text data-label="achse-groesse" x="26" y="350" text-anchor="middle" transform="rotate(-90 26 350)" class="d-text-klein">Größe der Organisation</text>

    <path d="M 112 545 L 690 545" class="d-linie-duenn"/>
    <path d="M 706 545 L 688 551 L 688 539 Z" class="d-pfeilspitze"/>
    <text data-label="achse-jung" x="100" y="550" text-anchor="end" class="d-text-klein">jung</text>
    <text data-label="achse-alt" x="720" y="550" text-anchor="start" class="d-text-klein">alt</text>
    <text data-label="achse-alter" x="400" y="578" text-anchor="middle" class="d-text-klein">Alter der Organisation</text>
  `,
  labels: [
    { id: 'kopf-1', text: 'Phase 1', abfragbar: false, gruppe: 'rahmen' },
    { id: 'kopf-2', text: 'Phase 2', abfragbar: false, gruppe: 'rahmen' },
    { id: 'kopf-3', text: 'Phase 3', abfragbar: false, gruppe: 'rahmen' },
    { id: 'kopf-4', text: 'Phase 4', abfragbar: false, gruppe: 'rahmen' },
    { id: 'kopf-5', text: 'Phase 5', abfragbar: false, gruppe: 'rahmen' },
    { id: 'kopf-6', text: 'Phase 6', abfragbar: false, gruppe: 'rahmen' },
    { id: 'phase-1', text: "Wachstum durch ‚Kreativität'", abfragbar: true, gruppe: 'phasen' },
    { id: 'phase-2', text: "Wachstum durch ‚Direktion'", abfragbar: true, gruppe: 'phasen' },
    { id: 'phase-3', text: 'Wachstum durch ‚Delegation, Selbstorga-nisation', abfragbar: true, gruppe: 'phasen' },
    { id: 'phase-4', text: "Wachstum durch ‚Koalition, gesteuerte Dynamik, Koordination'", abfragbar: true, gruppe: 'phasen' },
    { id: 'phase-5', text: "Wachstum durch ‚Kollaboration, Akquisition, Innovation'", abfragbar: true, gruppe: 'phasen' },
    { id: 'phase-6', text: "Wachstum durch ‚Strategische Allianzen'", abfragbar: true, gruppe: 'phasen' },
    { id: 'krise-1', text: 'Führungskrise', abfragbar: true, gruppe: 'krisen' },
    { id: 'krise-2', text: 'Autonomiekrise', abfragbar: true, gruppe: 'krisen' },
    { id: 'krise-3', text: 'Kontrollkrise', abfragbar: true, gruppe: 'krisen' },
    { id: 'krise-4', text: 'Bürokratiekrise', abfragbar: true, gruppe: 'krisen' },
    { id: 'krise-5', text: 'Wachstumskrise, Visionskrise', abfragbar: true, gruppe: 'krisen' },
    { id: 'stufe-1', text: 'Start-up', abfragbar: false, gruppe: 'stufen' },
    { id: 'stufe-2', text: 'Sekundäres Wachstum', abfragbar: false, gruppe: 'stufen' },
    { id: 'stufe-3', text: 'Ausgereiftes Wachstum', abfragbar: false, gruppe: 'stufen' },
    { id: 'stufe-4', text: '??', abfragbar: false, gruppe: 'stufen' },
    { id: 'legende-1', text: 'Evolution:', abfragbar: false, gruppe: 'legende' },
    { id: 'legende-2', text: 'Wachstumsphase', abfragbar: false, gruppe: 'legende' },
    { id: 'legende-3', text: 'Revolution:', abfragbar: false, gruppe: 'legende' },
    { id: 'legende-4', text: 'Phase der Krise', abfragbar: false, gruppe: 'legende' },
    { id: 'achse-groesse', text: 'Größe der Organisation', abfragbar: false, gruppe: 'achsen' },
    { id: 'achse-gross', text: 'gross', abfragbar: false, gruppe: 'achsen' },
    { id: 'achse-klein', text: 'klein', abfragbar: false, gruppe: 'achsen' },
    { id: 'achse-alter', text: 'Alter der Organisation', abfragbar: false, gruppe: 'achsen' },
    { id: 'achse-jung', text: 'jung', abfragbar: false, gruppe: 'achsen' },
    { id: 'achse-alt', text: 'alt', abfragbar: false, gruppe: 'achsen' },
  ],
}
