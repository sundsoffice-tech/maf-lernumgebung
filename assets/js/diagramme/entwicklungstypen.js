// Folie 34: Organisationsformen und Entwicklungstypen nach Gomez/Zimmermann.
// Eigene Zeichnung. Aussage, Reihenfolge, Achsen und Beschriftungen stammen aus folie-06.md.
// Die zehn Organisationsformen stehen in der Reihenfolge der Folie von links nach rechts; die Folie
// ordnet sie keinem der vier Unternehmenstypen ausdruecklich zu, deshalb tut es die Zeichnung auch nicht.
export default {
  id: 'entwicklungstypen',
  titel: 'Organisationsformen und Entwicklungstypen nach Gomez/Zimmermann',
  folien: [34],
  viewBox: '0 0 800 600',
  viewBoxSchmal: '0 0 360 870',
  minBreite: 660,
  beschreibung: 'Der Unternehmenswert steigt im Zeitverlauf als S-förmige Kurve und gabelt sich am Ende in zwei Richtungen, aufwärts und abwärts. Unter der Kurve stehen die vier Unternehmenstypen Pionier-, Wachstums-, Reife- und Wende-Unternehmen und darunter zehn Organisationsformen in ihrer Reihenfolge.',
  svg: `
    <text data-label="titel" x="400" y="30" text-anchor="middle" class="d-text-titel">Organisationsformen und Entwicklungstypen nach Gomez/Zimmermann</text>

    <rect x="20" y="58" width="170" height="32" rx="6" class="d-flaeche-leer"/>
    <text data-label="achse-wert" x="105" y="80" text-anchor="middle" class="d-text-fett">Unternehmenswert</text>

    <path d="M 60 352 L 60 114" class="d-linie-duenn"/>
    <path d="M 60 100 L 54 116 L 66 116 Z" class="d-pfeilspitze"/>
    <path d="M 240 352 L 240 114" class="d-linie-duenn"/>
    <path d="M 240 100 L 234 116 L 246 116 Z" class="d-pfeilspitze"/>
    <path d="M 420 352 L 420 114" class="d-linie-duenn"/>
    <path d="M 420 100 L 414 116 L 426 116 Z" class="d-pfeilspitze"/>
    <path d="M 600 352 L 600 114" class="d-linie-duenn"/>
    <path d="M 600 100 L 594 116 L 606 116 Z" class="d-pfeilspitze"/>

    <path d="M 75 320 C 160 318 205 300 255 268 C 310 232 395 205 495 199 C 560 195 605 197 640 200" class="d-kurve"/>
    <path d="M 640 200 C 678 196 710 178 752 155" class="d-kurve"/>
    <path d="M 766 148 L 754.4 161.1 L 748.6 148.3 Z" class="d-pfeilspitze"/>
    <path d="M 640 200 C 678 204 710 222 752 245" class="d-kurve"/>
    <path d="M 766 253 L 748.6 251.1 L 755.6 238.9 Z" class="d-pfeilspitze"/>

    <rect x="60" y="352" width="720" height="56" class="d-flaeche-leer"/>
    <path d="M 240 352 L 240 408" class="d-linie-duenn"/>
    <path d="M 420 352 L 420 408" class="d-linie-duenn"/>
    <path d="M 600 352 L 600 408" class="d-linie-duenn"/>
    <text data-label="typ-1" x="150" y="375" text-anchor="middle" class="d-text-fett"><tspan x="150" y="375">Pionier-</tspan><tspan x="150" y="394">Unternehmen</tspan></text>
    <text data-label="typ-2" x="330" y="375" text-anchor="middle" class="d-text-fett"><tspan x="330" y="375">Wachstums-</tspan><tspan x="330" y="394">Unternehmen</tspan></text>
    <text data-label="typ-3" x="510" y="375" text-anchor="middle" class="d-text-fett"><tspan x="510" y="375">Reife-</tspan><tspan x="510" y="394">Unternehmen</tspan></text>
    <text data-label="typ-4" x="690" y="375" text-anchor="middle" class="d-text-fett"><tspan x="690" y="375">Wende-</tspan><tspan x="690" y="394">Unternehmen</tspan></text>

    <path d="M 60 440 L 700 440" class="d-linie"/>
    <path d="M 716 440 L 698 447 L 698 433 Z" class="d-pfeilspitze"/>
    <text data-label="achse-zeit" x="730" y="446" text-anchor="start" class="d-text-fett">Zeit</text>

    <path d="M 92 452 L 92 474" class="d-linie-duenn"/>
    <path d="M 160 452 L 160 530" class="d-linie-duenn"/>
    <path d="M 228 452 L 228 474" class="d-linie-duenn"/>
    <path d="M 296 452 L 296 530" class="d-linie-duenn"/>
    <path d="M 364 452 L 364 474" class="d-linie-duenn"/>
    <path d="M 432 452 L 432 530" class="d-linie-duenn"/>
    <path d="M 500 452 L 500 474" class="d-linie-duenn"/>
    <path d="M 568 452 L 568 530" class="d-linie-duenn"/>
    <path d="M 636 452 L 636 474" class="d-linie-duenn"/>
    <path d="M 704 452 L 704 530" class="d-linie-duenn"/>

    <text data-label="form-1" x="92" y="490" text-anchor="middle" class="d-text-klein"><tspan x="92" y="490">Einfache Linien-</tspan><tspan x="92" y="508">Organisation</tspan></text>
    <text data-label="form-3" x="228" y="490" text-anchor="middle" class="d-text-klein"><tspan x="228" y="490">Funktionale </tspan><tspan x="228" y="508">Organisation</tspan></text>
    <text data-label="form-5" x="364" y="490" text-anchor="middle" class="d-text-klein"><tspan x="364" y="490">Matrix-</tspan><tspan x="364" y="508">Organisation</tspan></text>
    <text data-label="form-7" x="500" y="490" text-anchor="middle" class="d-text-klein"><tspan x="500" y="490">Tensor-</tspan><tspan x="500" y="508">Organisation</tspan></text>
    <text data-label="form-9" x="636" y="490" text-anchor="middle" class="d-text-klein"><tspan x="636" y="490">Allianz-</tspan><tspan x="636" y="508">Organisation</tspan></text>

    <text data-label="form-2" x="160" y="546" text-anchor="middle" class="d-text-klein"><tspan x="160" y="546">Stab-Linien-</tspan><tspan x="160" y="564">Organisation</tspan></text>
    <text data-label="form-4" x="296" y="546" text-anchor="middle" class="d-text-klein"><tspan x="296" y="546">Projekt-</tspan><tspan x="296" y="564">Organisation</tspan></text>
    <text data-label="form-6" x="432" y="546" text-anchor="middle" class="d-text-klein"><tspan x="432" y="546">Divisionale </tspan><tspan x="432" y="564">Organisation</tspan></text>
    <text data-label="form-8" x="568" y="546" text-anchor="middle" class="d-text-klein"><tspan x="568" y="546">Holding-</tspan><tspan x="568" y="564">Organisation</tspan></text>
    <text data-label="form-10" x="704" y="546" text-anchor="middle" class="d-text-klein"><tspan x="704" y="546">Cluster-</tspan><tspan x="704" y="564">Organisation</tspan></text>
  `,
  // Hochkantfassung fuer 360 px (iPhone hochkant): dieselbe Aussage, um 90 Grad gedreht. Die Zeit laeuft
  // senkrecht nach unten (eine Achse fuer Kurve, Typen und Formen), der Unternehmenswert waagerecht nach
  // rechts. Die vier Typen und die zehn Formen stehen untereinander in derselben Reihenfolge wie quer.
  svgSchmal: `
    <text data-label="titel" x="180" y="24" text-anchor="middle" class="d-text-titel"><tspan x="180" y="24">Organisationsformen und </tspan><tspan x="180" y="46">Entwicklungstypen nach </tspan><tspan x="180" y="68">Gomez/Zimmermann</tspan></text>

    <rect x="94" y="84" width="184" height="30" rx="6" class="d-flaeche-leer"/>
    <text data-label="achse-wert" x="186" y="105" text-anchor="middle" class="d-text-fett">Unternehmenswert</text>

    <path d="M 36 126 L 330 126" class="d-linie-duenn"/>
    <path d="M 344 126 L 328 132 L 328 120 Z" class="d-pfeilspitze"/>
    <path d="M 36 178 L 330 178" class="d-linie-duenn"/>
    <path d="M 344 178 L 328 184 L 328 172 Z" class="d-pfeilspitze"/>
    <path d="M 36 230 L 330 230" class="d-linie-duenn"/>
    <path d="M 344 230 L 328 236 L 328 224 Z" class="d-pfeilspitze"/>
    <path d="M 36 283 L 330 283" class="d-linie-duenn"/>
    <path d="M 344 283 L 328 289 L 328 277 Z" class="d-pfeilspitze"/>

    <path d="M 72 130 C 75 155 99 168 141 183 C 188 199 224 223 232 252 C 237 271 235 284 231 294" class="d-kurve"/>
    <path d="M 231 294 C 236 305 260 314 290 327" class="d-kurve"/>
    <path d="M 302 332 L 288.8 332.1 L 293.2 322.1 Z" class="d-pfeilspitze"/>
    <path d="M 231 294 C 225 305 202 314 171 327" class="d-kurve"/>
    <path d="M 158 332 L 167.1 322.4 L 171.1 332.6 Z" class="d-pfeilspitze"/>

    <path d="M 24 118 L 24 820" class="d-linie"/>
    <path d="M 24 836 L 17 818 L 31 818 Z" class="d-pfeilspitze"/>
    <text data-label="achse-zeit" x="24" y="858" text-anchor="middle" class="d-text-fett">Zeit</text>

    <rect x="36" y="356" width="316" height="136" class="d-flaeche-leer"/>
    <path d="M 36 390 L 352 390" class="d-linie-duenn"/>
    <path d="M 36 424 L 352 424" class="d-linie-duenn"/>
    <path d="M 36 458 L 352 458" class="d-linie-duenn"/>
    <path d="M 24 356 L 36 356" class="d-linie-duenn"/>
    <path d="M 24 492 L 36 492" class="d-linie-duenn"/>
    <text data-label="typ-1" x="194" y="379" text-anchor="middle" class="d-text-fett">Pionier-Unternehmen</text>
    <text data-label="typ-2" x="194" y="413" text-anchor="middle" class="d-text-fett">Wachstums-Unternehmen</text>
    <text data-label="typ-3" x="194" y="447" text-anchor="middle" class="d-text-fett">Reife-Unternehmen</text>
    <text data-label="typ-4" x="194" y="481" text-anchor="middle" class="d-text-fett">Wende-Unternehmen</text>

    <path d="M 24 523 L 40 523" class="d-linie-duenn"/>
    <text data-label="form-1" x="48" y="528" text-anchor="start" class="d-text-klein">Einfache Linien-Organisation</text>
    <path d="M 24 553 L 40 553" class="d-linie-duenn"/>
    <text data-label="form-2" x="48" y="558" text-anchor="start" class="d-text-klein">Stab-Linien-Organisation</text>
    <path d="M 24 583 L 40 583" class="d-linie-duenn"/>
    <text data-label="form-3" x="48" y="588" text-anchor="start" class="d-text-klein">Funktionale Organisation</text>
    <path d="M 24 613 L 40 613" class="d-linie-duenn"/>
    <text data-label="form-4" x="48" y="618" text-anchor="start" class="d-text-klein">Projekt-Organisation</text>
    <path d="M 24 643 L 40 643" class="d-linie-duenn"/>
    <text data-label="form-5" x="48" y="648" text-anchor="start" class="d-text-klein">Matrix-Organisation</text>
    <path d="M 24 673 L 40 673" class="d-linie-duenn"/>
    <text data-label="form-6" x="48" y="678" text-anchor="start" class="d-text-klein">Divisionale Organisation</text>
    <path d="M 24 703 L 40 703" class="d-linie-duenn"/>
    <text data-label="form-7" x="48" y="708" text-anchor="start" class="d-text-klein">Tensor-Organisation</text>
    <path d="M 24 733 L 40 733" class="d-linie-duenn"/>
    <text data-label="form-8" x="48" y="738" text-anchor="start" class="d-text-klein">Holding-Organisation</text>
    <path d="M 24 763 L 40 763" class="d-linie-duenn"/>
    <text data-label="form-9" x="48" y="768" text-anchor="start" class="d-text-klein">Allianz-Organisation</text>
    <path d="M 24 793 L 40 793" class="d-linie-duenn"/>
    <text data-label="form-10" x="48" y="798" text-anchor="start" class="d-text-klein">Cluster-Organisation</text>
  `,
  labels: [
    { id: 'titel', text: 'Organisationsformen und Entwicklungstypen nach Gomez/Zimmermann', abfragbar: false, gruppe: 'rahmen' },
    { id: 'achse-wert', text: 'Unternehmenswert', abfragbar: false, gruppe: 'achsen' },
    { id: 'achse-zeit', text: 'Zeit', abfragbar: false, gruppe: 'achsen' },
    { id: 'typ-1', text: 'Pionier-Unternehmen', abfragbar: true, gruppe: 'typen' },
    { id: 'typ-2', text: 'Wachstums-Unternehmen', abfragbar: true, gruppe: 'typen' },
    { id: 'typ-3', text: 'Reife-Unternehmen', abfragbar: true, gruppe: 'typen' },
    { id: 'typ-4', text: 'Wende-Unternehmen', abfragbar: true, gruppe: 'typen' },
    { id: 'form-1', text: 'Einfache Linien-Organisation', abfragbar: true, gruppe: 'formen' },
    { id: 'form-2', text: 'Stab-Linien-Organisation', abfragbar: true, gruppe: 'formen' },
    { id: 'form-3', text: 'Funktionale Organisation', abfragbar: true, gruppe: 'formen' },
    { id: 'form-4', text: 'Projekt-Organisation', abfragbar: true, gruppe: 'formen' },
    { id: 'form-5', text: 'Matrix-Organisation', abfragbar: true, gruppe: 'formen' },
    { id: 'form-6', text: 'Divisionale Organisation', abfragbar: true, gruppe: 'formen' },
    { id: 'form-7', text: 'Tensor-Organisation', abfragbar: true, gruppe: 'formen' },
    { id: 'form-8', text: 'Holding-Organisation', abfragbar: true, gruppe: 'formen' },
    { id: 'form-9', text: 'Allianz-Organisation', abfragbar: true, gruppe: 'formen' },
    { id: 'form-10', text: 'Cluster-Organisation', abfragbar: true, gruppe: 'formen' },
  ],
}
