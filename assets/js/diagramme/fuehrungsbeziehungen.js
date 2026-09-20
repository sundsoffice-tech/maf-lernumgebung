// Folie 37: 5 Führungsbeziehungen direkter, personal-interaktiver (Menschen)Führung.
// Eigene Zeichnung; Wortlaut und Anordnung (Kreuzform mit Doppelpfeilen) aus folie-09.md.
export default {
  id: 'fuehrungsbeziehungen',
  titel: '5 Führungsbeziehungen direkter, personal-interaktiver (Menschen)Führung',
  folien: [37],
  viewBox: '0 0 800 560',
  beschreibung: 'Fünf Führungsbeziehungen sind kreuzförmig um die Führungskraft angeordnet: in der Mitte die Selbst-Führung, darüber die Vorgesetzten-Führung, links die laterale Führung, rechts die Kunden-/Partner-Führung, darunter die MA-Führung. Alle sind mit der Mitte durch Doppelpfeile verbunden.',
  svg: `
    <text data-label="titel" x="400" y="32" text-anchor="middle" class="d-text-titel">5 Führungsbeziehungen direkter, personal-interaktiver (Menschen)Führung</text>

    <rect x="545" y="62" width="245" height="42" rx="6" class="d-akzentflaeche"/>
    <text data-label="strukturen" x="667" y="89" text-anchor="middle" class="d-text-akzent">Und dazu Strukturen!</text>

    <rect x="250" y="145" width="180" height="84" rx="10" class="d-flaeche-2"/>
    <text data-label="bez-oben" x="340" y="181" text-anchor="middle" class="d-text-fett">Vorgesetzten-Führung</text>
    <text data-label="engl-oben" x="340" y="205" text-anchor="middle" class="d-text-klein">(„leading upwards")</text>

    <rect x="30" y="288" width="160" height="84" rx="10" class="d-flaeche-2"/>
    <text data-label="bez-links" x="110" y="324" text-anchor="middle" class="d-text-fett">laterale Führung</text>
    <text data-label="engl-links" x="110" y="348" text-anchor="middle" class="d-text-klein">(„leading sideways")</text>

    <rect x="250" y="288" width="180" height="84" rx="10" class="d-akzentflaeche"/>
    <text data-label="bez-mitte" x="340" y="324" text-anchor="middle" class="d-text-fett">Selbst-Führung</text>
    <text data-label="engl-mitte" x="340" y="348" text-anchor="middle" class="d-text-klein">(„leading yourself")</text>

    <rect x="490" y="282" width="200" height="96" rx="10" class="d-flaeche-2"/>
    <text data-label="bez-rechts" x="590" y="312" text-anchor="middle" class="d-text-fett"><tspan x="590" y="312">Kunden-</tspan><tspan x="590" y="332">/Partner-Führung</tspan></text>
    <text data-label="engl-rechts" x="590" y="358" text-anchor="middle" class="d-text-klein">(„leading sideways")</text>

    <rect x="250" y="431" width="180" height="84" rx="10" class="d-flaeche-2"/>
    <text data-label="bez-unten" x="340" y="467" text-anchor="middle" class="d-text-fett">MA-Führung</text>
    <text data-label="engl-unten" x="340" y="491" text-anchor="middle" class="d-text-klein">(„leading downwards")</text>

    <path d="M 340 249 L 340 268" class="d-linie"/>
    <path d="M 340 235 L 333 250 L 347 250 Z" class="d-pfeilspitze"/>
    <path d="M 340 282 L 333 267 L 347 267 Z" class="d-pfeilspitze"/>

    <path d="M 340 392 L 340 411" class="d-linie"/>
    <path d="M 340 378 L 333 393 L 347 393 Z" class="d-pfeilspitze"/>
    <path d="M 340 425 L 333 410 L 347 410 Z" class="d-pfeilspitze"/>

    <path d="M 210 330 L 230 330" class="d-linie"/>
    <path d="M 196 330 L 211 323 L 211 337 Z" class="d-pfeilspitze"/>
    <path d="M 244 330 L 229 323 L 229 337 Z" class="d-pfeilspitze"/>

    <path d="M 450 330 L 470 330" class="d-linie"/>
    <path d="M 436 330 L 451 323 L 451 337 Z" class="d-pfeilspitze"/>
    <path d="M 484 330 L 469 323 L 469 337 Z" class="d-pfeilspitze"/>

    <rect x="520" y="452" width="270" height="42" rx="6" class="d-akzentflaeche"/>
    <text data-label="zentrum" x="655" y="479" text-anchor="middle" class="d-text-akzent">im Zentrum stehen SIE, die FK!</text>
  `,
  // Hochkant: die Kreuzform bleibt (oben Vorgesetzten-, unten MA-Führung, in der Mitte die
  // Selbst-Führung zwischen den beiden seitlichen Beziehungen), nur schmaler und mit umbrochenen
  // Beschriftungen. Die beiden Merksaetze der Folie stehen als Zeilen darueber und darunter.
  viewBoxSchmal: '0 0 360 512',
  svgSchmal: `
    <text data-label="titel" x="180" y="24" text-anchor="middle" class="d-text-titel"><tspan x="180" y="24">5 Führungsbeziehungen </tspan><tspan x="180" y="46">direkter, personal-interaktiver </tspan><tspan x="180" y="68">(Menschen)Führung</tspan></text>

    <rect x="64" y="84" width="232" height="36" rx="6" class="d-akzentflaeche"/>
    <text data-label="strukturen" x="180" y="108" text-anchor="middle" class="d-text-akzent">Und dazu Strukturen!</text>

    <rect x="90" y="136" width="180" height="62" rx="10" class="d-flaeche-2"/>
    <text data-label="bez-oben" x="180" y="162" text-anchor="middle" class="d-text-fett">Vorgesetzten-Führung</text>
    <text data-label="engl-oben" x="180" y="184" text-anchor="middle" class="d-text-klein">(„leading upwards")</text>

    <path d="M 180 209 L 180 223" class="d-linie"/>
    <path d="M 180 196 L 173 210 L 187 210 Z" class="d-pfeilspitze"/>
    <path d="M 180 236 L 173 222 L 187 222 Z" class="d-pfeilspitze"/>

    <rect x="9" y="236" width="90" height="106" rx="10" class="d-flaeche-2"/>
    <text data-label="bez-links" x="54" y="274" text-anchor="middle" class="d-text-fett"><tspan x="54" y="264">laterale </tspan><tspan x="54" y="284">Führung</tspan></text>
    <text data-label="engl-links" x="54" y="306" text-anchor="middle" class="d-text-klein"><tspan x="54" y="306">(„leading </tspan><tspan x="54" y="324">sideways")</tspan></text>

    <rect x="135" y="236" width="90" height="106" rx="10" class="d-akzentflaeche"/>
    <text data-label="bez-mitte" x="180" y="274" text-anchor="middle" class="d-text-fett"><tspan x="180" y="264">Selbst-</tspan><tspan x="180" y="284">Führung</tspan></text>
    <text data-label="engl-mitte" x="180" y="306" text-anchor="middle" class="d-text-klein"><tspan x="180" y="306">(„leading </tspan><tspan x="180" y="324">yourself")</tspan></text>

    <rect x="261" y="236" width="90" height="106" rx="10" class="d-flaeche-2"/>
    <text data-label="bez-rechts" x="306" y="276" text-anchor="middle" class="d-text-fett"><tspan x="306" y="256">Kunden-</tspan><tspan x="306" y="276">/Partner-</tspan><tspan x="306" y="296">Führung</tspan></text>
    <text data-label="engl-rechts" x="306" y="318" text-anchor="middle" class="d-text-klein"><tspan x="306" y="318">(„leading </tspan><tspan x="306" y="336">sideways")</tspan></text>

    <path d="M 109 289 L 125 289" class="d-linie"/>
    <path d="M 99 289 L 110 282 L 110 296 Z" class="d-pfeilspitze"/>
    <path d="M 135 289 L 124 282 L 124 296 Z" class="d-pfeilspitze"/>

    <path d="M 235 289 L 251 289" class="d-linie"/>
    <path d="M 225 289 L 236 282 L 236 296 Z" class="d-pfeilspitze"/>
    <path d="M 261 289 L 250 282 L 250 296 Z" class="d-pfeilspitze"/>

    <path d="M 180 353 L 180 367" class="d-linie"/>
    <path d="M 180 340 L 173 354 L 187 354 Z" class="d-pfeilspitze"/>
    <path d="M 180 380 L 173 366 L 187 366 Z" class="d-pfeilspitze"/>

    <rect x="90" y="380" width="180" height="62" rx="10" class="d-flaeche-2"/>
    <text data-label="bez-unten" x="180" y="406" text-anchor="middle" class="d-text-fett">MA-Führung</text>
    <text data-label="engl-unten" x="180" y="428" text-anchor="middle" class="d-text-klein">(„leading downwards")</text>

    <rect x="48" y="462" width="264" height="36" rx="6" class="d-akzentflaeche"/>
    <text data-label="zentrum" x="180" y="486" text-anchor="middle" class="d-text-akzent">im Zentrum stehen SIE, die FK!</text>
  `,
  labels: [
    { id: 'titel', text: '5 Führungsbeziehungen direkter, personal-interaktiver (Menschen)Führung', abfragbar: false, gruppe: 'rahmen' },
    { id: 'bez-oben', text: 'Vorgesetzten-Führung', abfragbar: true, gruppe: 'beziehungen' },
    { id: 'bez-links', text: 'laterale Führung', abfragbar: true, gruppe: 'beziehungen' },
    { id: 'bez-mitte', text: 'Selbst-Führung', abfragbar: true, gruppe: 'beziehungen' },
    { id: 'bez-rechts', text: 'Kunden-/Partner-Führung', abfragbar: true, gruppe: 'beziehungen' },
    { id: 'bez-unten', text: 'MA-Führung', abfragbar: true, gruppe: 'beziehungen' },
    { id: 'engl-oben', text: '(„leading upwards")', abfragbar: false, gruppe: 'beziehungen' },
    { id: 'engl-links', text: '(„leading sideways")', abfragbar: false, gruppe: 'beziehungen' },
    { id: 'engl-mitte', text: '(„leading yourself")', abfragbar: false, gruppe: 'beziehungen' },
    { id: 'engl-rechts', text: '(„leading sideways")', abfragbar: false, gruppe: 'beziehungen' },
    { id: 'engl-unten', text: '(„leading downwards")', abfragbar: false, gruppe: 'beziehungen' },
    { id: 'strukturen', text: 'Und dazu Strukturen!', abfragbar: false, gruppe: 'rahmen' },
    { id: 'zentrum', text: 'im Zentrum stehen SIE, die FK!', abfragbar: false, gruppe: 'rahmen' },
  ],
}
