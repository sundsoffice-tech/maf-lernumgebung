// Folie 79: Spektrum von Commitment bis Aggressive resistance und die drei Ursachen des Widerstands.
// Eigene Zeichnung. Die Kette steht auf der Folie waagerecht; hier senkrecht, damit die langen
// englischen Begriffe auf schmalen Geraeten lesbar bleiben. Reihenfolge und Wortlaut bleiben gleich.
export default {
  id: 'widerstand',
  titel: 'Umgang mit Widerstand: Spektrum und Ursachen',
  folien: [79],
  viewBox: '0 0 800 800',
  minBreite: 560,
  beschreibung: 'Oben eine Kette von sieben Stufen, die von Commitment ueber Apathy bis Aggressive resistance reicht. Darunter die drei Ursachen Nicht-Wissen, Nicht-Koennen und Nicht-Wollen mit den Folgen, die das Skript ihnen zuordnet.',
  svg: `
  <g>
    <polygon class="d-flaeche" points="140,18 660,18 660,48 400,62 140,48"/>
    <text data-label="sp-1" x="400" y="41" text-anchor="middle" class="d-text-fett">Commitment</text>

    <polygon class="d-flaeche" points="140,70 660,70 660,100 400,114 140,100"/>
    <text data-label="sp-2" x="400" y="93" text-anchor="middle" class="d-text-fett">Involvement</text>

    <polygon class="d-flaeche" points="140,122 660,122 660,152 400,166 140,152"/>
    <text data-label="sp-3" x="400" y="145" text-anchor="middle" class="d-text-fett">Support</text>

    <polygon class="d-flaeche" points="140,174 660,174 660,204 400,218 140,204"/>
    <text data-label="sp-4" x="400" y="197" text-anchor="middle" class="d-text-fett">Apathy</text>

    <polygon class="d-flaeche" points="140,226 660,226 660,256 400,270 140,256"/>
    <text data-label="sp-5" x="400" y="249" text-anchor="middle" class="d-text-fett">Passive resistance</text>

    <polygon class="d-flaeche" points="140,278 660,278 660,308 400,322 140,308"/>
    <text data-label="sp-6" x="400" y="301" text-anchor="middle" class="d-text-fett">Active resistance</text>

    <polygon class="d-flaeche" points="140,330 660,330 660,360 400,374 140,360"/>
    <text data-label="sp-7" x="400" y="353" text-anchor="middle" class="d-text-fett">Aggressive resistance</text>

    <text data-label="ueberschrift-ursachen" x="20" y="424" text-anchor="start" class="d-text-titel">Ursachen</text>
    <line class="d-linie-duenn" x1="20" y1="432" x2="104" y2="432"/>

    <polygon class="d-flaeche" points="20,450 600,450 644,494 600,538 20,538"/>
    <text data-label="ur-1" x="44" y="480" text-anchor="start" class="d-text-fett">Nicht-Wissen</text>
    <text data-label="fo-1a" x="64" y="504" text-anchor="start" class="d-text">-&gt; Orientierungslosigkeit</text>
    <text data-label="fo-1b" x="64" y="526" text-anchor="start" class="d-text">-&gt; Unsicherheit</text>

    <polygon class="d-flaeche-2" points="20,566 600,566 644,610 600,654 20,654"/>
    <text data-label="ur-2" x="44" y="596" text-anchor="start" class="d-text-fett">Nicht-Können</text>
    <text data-label="fo-2a" x="64" y="620" text-anchor="start" class="d-text">-&gt; Versagensängste</text>
    <text data-label="fo-2b" x="64" y="642" text-anchor="start" class="d-text">-&gt; soziale Scham</text>

    <polygon class="d-flaeche-3" points="20,682 600,682 644,726 600,770 20,770"/>
    <text data-label="ur-3" x="44" y="712" text-anchor="start" class="d-text-fett">Nicht-Wollen</text>
    <text data-label="fo-3a" x="64" y="740" text-anchor="start" class="d-text">-&gt; grds. Ablehnung von Neuem, Change, Innovation</text>
  </g>`,
  labels: [
    { id: 'sp-1', text: 'Commitment', abfragbar: true, gruppe: 'spektrum' },
    { id: 'sp-2', text: 'Involvement', abfragbar: true, gruppe: 'spektrum' },
    { id: 'sp-3', text: 'Support', abfragbar: true, gruppe: 'spektrum' },
    { id: 'sp-4', text: 'Apathy', abfragbar: true, gruppe: 'spektrum' },
    { id: 'sp-5', text: 'Passive resistance', abfragbar: true, gruppe: 'spektrum' },
    { id: 'sp-6', text: 'Active resistance', abfragbar: true, gruppe: 'spektrum' },
    { id: 'sp-7', text: 'Aggressive resistance', abfragbar: true, gruppe: 'spektrum' },
    { id: 'ueberschrift-ursachen', text: 'Ursachen', abfragbar: false, gruppe: 'ursachen' },
    { id: 'ur-1', text: 'Nicht-Wissen', abfragbar: true, gruppe: 'ursachen' },
    { id: 'ur-2', text: 'Nicht-Können', abfragbar: true, gruppe: 'ursachen' },
    { id: 'ur-3', text: 'Nicht-Wollen', abfragbar: true, gruppe: 'ursachen' },
    { id: 'fo-1a', text: '-> Orientierungslosigkeit', abfragbar: false, gruppe: 'folgen' },
    { id: 'fo-1b', text: '-> Unsicherheit', abfragbar: false, gruppe: 'folgen' },
    { id: 'fo-2a', text: '-> Versagensängste', abfragbar: false, gruppe: 'folgen' },
    { id: 'fo-2b', text: '-> soziale Scham', abfragbar: false, gruppe: 'folgen' },
    { id: 'fo-3a', text: '-> grds. Ablehnung von Neuem, Change, Innovation', abfragbar: false, gruppe: 'folgen' },
  ],
}
