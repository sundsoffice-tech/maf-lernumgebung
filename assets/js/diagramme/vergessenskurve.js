// Folie 81, eingebettete Grafik unten rechts: Vergessenskurve (nach Maddox).
// Eigene Zeichnung mit den Achsenwerten und den vier Kurven der Folie. Die beiden roten Pfeile
// der Folie markieren die oberste und die unterste Kurve; sie werden auf der Folie nicht erklaert.
export default {
  id: 'vergessenskurve',
  titel: 'Vergessenskurve (nach Maddox)',
  folien: [81],
  viewBox: '0 0 800 478',
  minBreite: 640,
  beschreibung: 'Vier Behaltenskurven fallen über 15 Tage unterschiedlich stark ab: Gesetzmäßigkeit und Prinzipien bleiben nahe 100, Gedichte laufen knapp unter 50 aus, Prosatext knapp unter 20, sinnlos Gelerntes darunter. Zwei Pfeile markieren die oberste und die unterste Kurve.',
  svg: `
  <g>
    <text data-label="bildtitel" x="100" y="34" text-anchor="start" class="d-text-titel">Vergessenskurve</text>

    <line class="d-linie-duenn" x1="96" y1="420" x2="96" y2="72"/>
    <polygon class="d-pfeilspitze" points="0,-9 -6,4 6,4" transform="translate(96,60)"/>
    <line class="d-linie-duenn" x1="96" y1="420" x2="660" y2="420"/>
    <polygon class="d-pfeilspitze" points="0,-9 -6,4 6,4" transform="translate(672,420) rotate(90)"/>

    <line class="d-linie-duenn" x1="89" y1="420" x2="96" y2="420"/>
    <line class="d-linie-duenn" x1="89" y1="356" x2="96" y2="356"/>
    <line class="d-linie-duenn" x1="89" y1="260" x2="96" y2="260"/>
    <line class="d-linie-duenn" x1="89" y1="100" x2="96" y2="100"/>
    <text data-label="y-0" x="82" y="425" text-anchor="end" class="d-text-klein">0</text>
    <text data-label="y-20" x="82" y="361" text-anchor="end" class="d-text-klein">20</text>
    <text data-label="y-50" x="82" y="265" text-anchor="end" class="d-text-klein">50</text>
    <text data-label="y-100" x="82" y="105" text-anchor="end" class="d-text-klein">100</text>

    <line class="d-linie-duenn" x1="150" y1="420" x2="150" y2="427"/>
    <line class="d-linie-duenn" x1="186" y1="420" x2="186" y2="427"/>
    <line class="d-linie-duenn" x1="222" y1="420" x2="222" y2="427"/>
    <line class="d-linie-duenn" x1="258" y1="420" x2="258" y2="427"/>
    <line class="d-linie-duenn" x1="294" y1="420" x2="294" y2="427"/>
    <text data-label="x-2" x="150" y="442" text-anchor="middle" class="d-text-klein">2</text>
    <text data-label="x-3" x="186" y="442" text-anchor="middle" class="d-text-klein">3</text>
    <text data-label="x-4" x="222" y="442" text-anchor="middle" class="d-text-klein">4</text>
    <text data-label="x-5" x="258" y="442" text-anchor="middle" class="d-text-klein">5</text>
    <text data-label="x-6" x="294" y="442" text-anchor="middle" class="d-text-klein">6</text>
    <text data-label="x-15" x="652" y="442" text-anchor="end" class="d-text-klein">15 Tage</text>

    <path class="d-kurve" d="M 100 100 C 140 108 220 112 340 114 C 460 116 560 117 656 118"/>
    <path class="d-kurve" d="M 100 100 C 110 180 126 230 150 250 C 210 268 330 264 450 266 C 520 267 590 267 656 268"/>
    <path class="d-kurve" d="M 100 100 C 106 212 116 306 134 338 C 170 360 260 358 360 360 C 460 361 560 361 656 362"/>
    <path class="d-kurve" d="M 100 100 C 104 236 110 344 126 378 C 160 398 250 398 350 398 C 450 399 560 399 656 400"/>

    <text data-label="k-1" x="650" y="94" text-anchor="end" class="d-text">Gesetzmäßigkeit, Prinzipien</text>
    <text data-label="k-2" x="650" y="252" text-anchor="end" class="d-text">Gedichte</text>
    <text data-label="k-3" x="650" y="346" text-anchor="end" class="d-text">Prosatext</text>
    <text data-label="k-4" x="650" y="388" text-anchor="end" class="d-text">sinnlos Gelerntes</text>

    <line class="d-linie-akzent" x1="778" y1="118" x2="690" y2="118"/>
    <polygon class="d-pfeilspitze-akzent" points="0,-11 -7,5 7,5" transform="translate(670,118) rotate(270)"/>
    <line class="d-linie-akzent" x1="778" y1="400" x2="690" y2="400"/>
    <polygon class="d-pfeilspitze-akzent" points="0,-11 -7,5 7,5" transform="translate(670,400) rotate(270)"/>

    <text data-label="quelle-maddox" x="96" y="464" text-anchor="start" class="d-text-klein">(nach Maddox)</text>
  </g>`,
  // Hochkant: dieselben vier Kurven, schmaler und hoeher; die Kurvennamen stehen unmittelbar an
  // ihrer Kurve statt am rechten Rand, die beiden Akzentpfeile bleiben an oberster und unterster Kurve.
  viewBoxSchmal: '0 0 360 528',
  svgSchmal: `
  <g>
    <text data-label="bildtitel" x="14" y="26" text-anchor="start" class="d-text-titel">Vergessenskurve</text>

    <line class="d-linie-duenn" x1="48" y1="470" x2="48" y2="58"/>
    <path class="d-pfeilspitze" d="M 0 -9 L -6 4 L 6 4 Z" transform="translate(48,54)"/>
    <line class="d-linie-duenn" x1="48" y1="470" x2="308" y2="470"/>
    <path class="d-pfeilspitze" d="M 0 -9 L -6 4 L 6 4 Z" transform="translate(312,470) rotate(90)"/>

    <line class="d-linie-duenn" x1="41" y1="470" x2="48" y2="470"/>
    <line class="d-linie-duenn" x1="41" y1="392" x2="48" y2="392"/>
    <line class="d-linie-duenn" x1="41" y1="275" x2="48" y2="275"/>
    <line class="d-linie-duenn" x1="41" y1="80" x2="48" y2="80"/>
    <text data-label="y-0" x="36" y="475" text-anchor="end" class="d-text-klein">0</text>
    <text data-label="y-20" x="36" y="397" text-anchor="end" class="d-text-klein">20</text>
    <text data-label="y-50" x="36" y="280" text-anchor="end" class="d-text-klein">50</text>
    <text data-label="y-100" x="36" y="85" text-anchor="end" class="d-text-klein">100</text>

    <line class="d-linie-duenn" x1="72" y1="470" x2="72" y2="477"/>
    <line class="d-linie-duenn" x1="89" y1="470" x2="89" y2="477"/>
    <line class="d-linie-duenn" x1="105" y1="470" x2="105" y2="477"/>
    <line class="d-linie-duenn" x1="121" y1="470" x2="121" y2="477"/>
    <line class="d-linie-duenn" x1="137" y1="470" x2="137" y2="477"/>
    <text data-label="x-2" x="72" y="487" text-anchor="middle" class="d-text-klein">2</text>
    <text data-label="x-3" x="89" y="487" text-anchor="middle" class="d-text-klein">3</text>
    <text data-label="x-4" x="105" y="487" text-anchor="middle" class="d-text-klein">4</text>
    <text data-label="x-5" x="121" y="487" text-anchor="middle" class="d-text-klein">5</text>
    <text data-label="x-6" x="137" y="487" text-anchor="middle" class="d-text-klein">6</text>
    <text data-label="x-15" x="300" y="487" text-anchor="end" class="d-text-klein">15 Tage</text>

    <path class="d-kurve" d="M 50 80 C 68 90 104 95 158 97 C 212 99 257 101 300 102"/>
    <path class="d-kurve" d="M 50 80 C 54 178 62 238 72 263 C 99 285 153 280 207 282 C 239 284 270 284 300 285"/>
    <path class="d-kurve" d="M 50 80 C 53 217 57 331 65 370 C 81 397 122 394 167 397 C 212 398 257 398 300 399"/>
    <path class="d-kurve" d="M 50 80 C 52 246 54 377 62 419 C 77 443 117 443 162 443 C 207 444 257 444 300 446"/>

    <text data-label="k-1" x="300" y="126" text-anchor="end" class="d-text">Gesetzmäßigkeit, Prinzipien</text>
    <text data-label="k-2" x="228" y="272" text-anchor="start" class="d-text">Gedichte</text>
    <text data-label="k-3" x="228" y="388" text-anchor="start" class="d-text">Prosatext</text>
    <text data-label="k-4" x="175" y="434" text-anchor="start" class="d-text">sinnlos Gelerntes</text>

    <line class="d-linie-akzent" x1="352" y1="102" x2="322" y2="102"/>
    <path class="d-pfeilspitze-akzent" d="M 0 -11 L -7 5 L 7 5 Z" transform="translate(312,102) rotate(270)"/>
    <line class="d-linie-akzent" x1="352" y1="446" x2="322" y2="446"/>
    <path class="d-pfeilspitze-akzent" d="M 0 -11 L -7 5 L 7 5 Z" transform="translate(312,446) rotate(270)"/>

    <text data-label="quelle-maddox" x="48" y="512" text-anchor="start" class="d-text-klein">(nach Maddox)</text>
  </g>`,
  labels: [
    { id: 'bildtitel', text: 'Vergessenskurve', abfragbar: false, gruppe: 'titel' },
    { id: 'y-0', text: '0', abfragbar: false, gruppe: 'achsen' },
    { id: 'y-20', text: '20', abfragbar: false, gruppe: 'achsen' },
    { id: 'y-50', text: '50', abfragbar: false, gruppe: 'achsen' },
    { id: 'y-100', text: '100', abfragbar: false, gruppe: 'achsen' },
    { id: 'x-2', text: '2', abfragbar: false, gruppe: 'achsen' },
    { id: 'x-3', text: '3', abfragbar: false, gruppe: 'achsen' },
    { id: 'x-4', text: '4', abfragbar: false, gruppe: 'achsen' },
    { id: 'x-5', text: '5', abfragbar: false, gruppe: 'achsen' },
    { id: 'x-6', text: '6', abfragbar: false, gruppe: 'achsen' },
    { id: 'x-15', text: '15 Tage', abfragbar: false, gruppe: 'achsen' },
    { id: 'k-1', text: 'Gesetzmäßigkeit, Prinzipien', abfragbar: true, gruppe: 'kurven' },
    { id: 'k-2', text: 'Gedichte', abfragbar: true, gruppe: 'kurven' },
    { id: 'k-3', text: 'Prosatext', abfragbar: true, gruppe: 'kurven' },
    { id: 'k-4', text: 'sinnlos Gelerntes', abfragbar: true, gruppe: 'kurven' },
    { id: 'quelle-maddox', text: '(nach Maddox)', abfragbar: false, gruppe: 'titel' },
  ],
}
