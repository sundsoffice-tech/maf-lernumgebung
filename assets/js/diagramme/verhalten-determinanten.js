// Folie 49 (folie-21.md): Determinanten unseres Verhaltens. Eigene Darstellung.
// Vier Felder in Kreuzform um den Mittelbegriff Verhalten; links akteursbezogen, rechts kontextbezogen.
export default {
  id: 'verhalten-determinanten',
  titel: 'Determinanten unseres Verhaltens',
  folien: [49],
  viewBox: '0 0 800 520',
  minBreite: 600,
  beschreibung: 'Vier Felder liegen kreuzförmig um den Mittelbegriff Verhalten: Können führt zu persönlicher Qualifikation, Dürfen zu sozialen Normen, Wollen zu individueller Motivation und Werten, Sollen zu formalen Mechanismen. Die beiden linken Felder sind akteursbezogen, die beiden rechten kontextbezogen.',
  svg: `<g>
  <path class="d-linie-duenn" d="M 350 170 L 330 220"/>
  <path class="d-linie-duenn" d="M 450 170 L 470 220"/>
  <path class="d-linie-duenn" d="M 350 350 L 330 300"/>
  <path class="d-linie-duenn" d="M 450 350 L 470 300"/>

  <rect class="d-flaeche-leer" x="70" y="40" width="280" height="130" rx="14"/>
  <rect class="d-flaeche-leer" x="450" y="40" width="280" height="130" rx="14"/>
  <rect class="d-flaeche-leer" x="70" y="350" width="280" height="130" rx="14"/>
  <rect class="d-flaeche-leer" x="450" y="350" width="280" height="130" rx="14"/>
  <rect class="d-dunkel" x="330" y="220" width="140" height="80" rx="14"/>

  <text data-label="koennen" x="210" y="76" text-anchor="middle" class="d-text-fett">Können</text>
  <path class="d-linie-duenn" d="M 210 88 L 210 102"/>
  <path class="d-pfeilspitze" d="M 210 112 l -6 -10 l 12 0 Z"/>
  <text data-label="z-koennen" x="210" y="140" text-anchor="middle" class="d-text">persönliche Qualifikation</text>

  <text data-label="duerfen" x="590" y="76" text-anchor="middle" class="d-text-fett">Dürfen</text>
  <path class="d-linie-duenn" d="M 590 88 L 590 102"/>
  <path class="d-pfeilspitze" d="M 590 112 l -6 -10 l 12 0 Z"/>
  <text data-label="z-duerfen" x="590" y="140" text-anchor="middle" class="d-text">soziale Normen</text>

  <text data-label="wollen" x="210" y="386" text-anchor="middle" class="d-text-fett">Wollen</text>
  <path class="d-linie-duenn" d="M 210 398 L 210 412"/>
  <path class="d-pfeilspitze" d="M 210 422 l -6 -10 l 12 0 Z"/>
  <text data-label="z-wollen" x="210" y="450" text-anchor="middle" class="d-text">individuelle Motivation/Werte</text>

  <text data-label="sollen" x="590" y="386" text-anchor="middle" class="d-text-fett">Sollen</text>
  <path class="d-linie-duenn" d="M 590 398 L 590 412"/>
  <path class="d-pfeilspitze" d="M 590 422 l -6 -10 l 12 0 Z"/>
  <text data-label="z-sollen" x="590" y="450" text-anchor="middle" class="d-text">formale Mechanismen</text>

  <text data-label="verhalten" x="400" y="266" text-anchor="middle" class="d-text-invers">Verhalten</text>

  <text data-label="akteursbezogen" x="34" y="260" text-anchor="middle" transform="rotate(-90 34 260)" class="d-text-fett">akteursbezogen</text>
  <text data-label="kontextbezogen" x="766" y="260" text-anchor="middle" transform="rotate(-90 766 260)" class="d-text-fett">kontextbezogen</text>
</g>`,
  // Hochkant (iPhone): dasselbe Kreuz, nur schmaler. Die beiden senkrechten Schienen werden zu Überschriften
  // über den Spalten, damit links und rechts weiterhin akteurs- und kontextbezogen bleiben.
  viewBoxSchmal: '0 0 360 436',
  svgSchmal: `<g>
  <text data-label="akteursbezogen" x="88" y="16" text-anchor="middle" class="d-text-fett">akteursbezogen</text>
  <text data-label="kontextbezogen" x="272" y="16" text-anchor="middle" class="d-text-fett">kontextbezogen</text>

  <path class="d-linie-duenn" d="M 146 146 L 130 190"/>
  <path class="d-linie-duenn" d="M 214 146 L 230 190"/>
  <path class="d-linie-duenn" d="M 146 298 L 130 254"/>
  <path class="d-linie-duenn" d="M 214 298 L 230 254"/>

  <rect class="d-flaeche-leer" x="2" y="28" width="172" height="118" rx="14"/>
  <rect class="d-flaeche-leer" x="186" y="28" width="172" height="118" rx="14"/>
  <rect class="d-flaeche-leer" x="2" y="298" width="172" height="118" rx="14"/>
  <rect class="d-flaeche-leer" x="186" y="298" width="172" height="118" rx="14"/>
  <rect class="d-dunkel" x="130" y="186" width="100" height="72" rx="14"/>

  <text data-label="koennen" x="88" y="56" text-anchor="middle" class="d-text-fett">Können</text>
  <path class="d-linie-duenn" d="M 88 68 L 88 82"/>
  <path class="d-pfeilspitze" d="M 88 92 l -6 -10 l 12 0 Z"/>
  <text data-label="z-koennen" x="88" y="116" text-anchor="middle" class="d-text">
    <tspan x="88" dy="0">persönliche</tspan>
    <tspan x="88" dy="17">Qualifikation</tspan>
  </text>

  <text data-label="duerfen" x="272" y="56" text-anchor="middle" class="d-text-fett">Dürfen</text>
  <path class="d-linie-duenn" d="M 272 68 L 272 82"/>
  <path class="d-pfeilspitze" d="M 272 92 l -6 -10 l 12 0 Z"/>
  <text data-label="z-duerfen" x="272" y="116" text-anchor="middle" class="d-text">soziale Normen</text>

  <text data-label="wollen" x="88" y="326" text-anchor="middle" class="d-text-fett">Wollen</text>
  <path class="d-linie-duenn" d="M 88 338 L 88 352"/>
  <path class="d-pfeilspitze" d="M 88 362 l -6 -10 l 12 0 Z"/>
  <text data-label="z-wollen" x="88" y="386" text-anchor="middle" class="d-text">
    <tspan x="88" dy="0">individuelle</tspan>
    <tspan x="88" dy="17">Motivation/Werte</tspan>
  </text>

  <text data-label="sollen" x="272" y="326" text-anchor="middle" class="d-text-fett">Sollen</text>
  <path class="d-linie-duenn" d="M 272 338 L 272 352"/>
  <path class="d-pfeilspitze" d="M 272 362 l -6 -10 l 12 0 Z"/>
  <text data-label="z-sollen" x="272" y="386" text-anchor="middle" class="d-text">formale Mechanismen</text>

  <text data-label="verhalten" x="180" y="228" text-anchor="middle" class="d-text-invers">Verhalten</text>
</g>`,
  labels: [
    { id: 'koennen', text: 'Können', abfragbar: true, gruppe: 'faktoren' },
    { id: 'z-koennen', text: 'persönliche Qualifikation', abfragbar: true, gruppe: 'faktoren' },
    { id: 'duerfen', text: 'Dürfen', abfragbar: true, gruppe: 'faktoren' },
    { id: 'z-duerfen', text: 'soziale Normen', abfragbar: true, gruppe: 'faktoren' },
    { id: 'wollen', text: 'Wollen', abfragbar: true, gruppe: 'faktoren' },
    { id: 'z-wollen', text: 'individuelle Motivation/Werte', abfragbar: true, gruppe: 'faktoren' },
    { id: 'sollen', text: 'Sollen', abfragbar: true, gruppe: 'faktoren' },
    { id: 'z-sollen', text: 'formale Mechanismen', abfragbar: true, gruppe: 'faktoren' },
    { id: 'verhalten', text: 'Verhalten', abfragbar: false, gruppe: 'faktoren' },
    { id: 'akteursbezogen', text: 'akteursbezogen', abfragbar: false, gruppe: 'faktoren' },
    { id: 'kontextbezogen', text: 'kontextbezogen', abfragbar: false, gruppe: 'faktoren' },
  ],
}
