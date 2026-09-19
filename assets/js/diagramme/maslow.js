// Folie 46 (folie-18.md): Maslow's Bedürfnispyramide. Eigene Darstellung, nicht die Optik der Folie.
// Fünf Stufen von unten nach oben, rechts je Stufe die Erläuterung der Folie, links die beiden
// Klammerebenen (Wachstums-/Defizitmotive aussen, idealistische/soziale/ökonomische Bedürfnisse innen).
export default {
  id: 'maslow',
  titel: 'Maslow‘s Bedürfnispyramide',
  folien: [46],
  viewBox: '0 0 800 520',
  minBreite: 640,
  beschreibung: 'Eine Pyramide aus fünf Bedürfnisstufen, unten die physiologischen Bedürfnisse, oben die Selbstverwirklichung; rechts steht je Stufe das Beispiel der Folie. Links fassen zwei Klammern die Stufen zusammen: aussen Wachstumsmotive und Defizitmotive, innen idealistische, soziale und ökonomische Bedürfnisse.',
  svg: `<g>
  <polygon class="d-flaeche-3" points="274,392 546,392 560,480 260,480"/>
  <polygon class="d-flaeche-3" points="288,304 532,304 546,392 274,392"/>
  <polygon class="d-flaeche-2" points="302,216 518,216 532,304 288,304"/>
  <polygon class="d-flaeche-2" points="316,128 504,128 518,216 302,216"/>
  <polygon class="d-flaeche" points="330,40 490,40 504,128 316,128"/>

  <text data-label="stufe-physio" x="410" y="441" text-anchor="middle" class="d-text">Physiologische Bedürfnisse</text>
  <text data-label="stufe-sicherheit" x="410" y="353" text-anchor="middle" class="d-text">Sicherheitsbedürfnisse</text>
  <text data-label="stufe-sozial" x="410" y="265" text-anchor="middle" class="d-text">Soziale Bedürfnisse</text>
  <text data-label="stufe-individual" x="410" y="177" text-anchor="middle" class="d-text">Individualbedürfnisse</text>
  <text data-label="stufe-selbst" x="410" y="89" text-anchor="middle" class="d-text">Selbstverwirklichung</text>

  <path class="d-linie-duenn" d="M 497 84 L 566 84"/>
  <path class="d-linie-duenn" d="M 511 172 L 566 172"/>
  <path class="d-linie-duenn" d="M 525 260 L 566 260"/>
  <path class="d-linie-duenn" d="M 539 348 L 566 348"/>
  <path class="d-linie-duenn" d="M 553 436 L 566 436"/>

  <text data-label="erl-selbst" x="570" y="78" class="d-text-klein">
    <tspan x="570" dy="0">-&gt; Selbstverwirklichung,</tspan>
    <tspan x="570" dy="17">Entwicklung</tspan>
  </text>
  <text data-label="erl-individual" x="570" y="166" class="d-text-klein">
    <tspan x="570" dy="0">-&gt; Ansehen, Status,</tspan>
    <tspan x="570" dy="17">Wertschätzung, Lob</tspan>
  </text>
  <text data-label="erl-sozial" x="570" y="246" class="d-text-klein">
    <tspan x="570" dy="0">-&gt; Familie,</tspan>
    <tspan x="570" dy="17">Freundschaften, Vereine,</tspan>
    <tspan x="570" dy="17">Religionsgemeinschaften</tspan>
  </text>
  <text data-label="erl-sicherheit" x="570" y="334" class="d-text-klein">
    <tspan x="570" dy="0">-&gt; finanzielle Sicherheit</tspan>
    <tspan x="570" dy="17">(Versicherungen,</tspan>
    <tspan x="570" dy="17">Sparguthaben, ...)</tspan>
  </text>
  <text data-label="erl-physio" x="570" y="428" class="d-text-klein">
    <tspan x="570" dy="0">-&gt; körperliches Wohlbefinden,</tspan>
    <tspan x="570" dy="17">Wohnung, Nahrung, Kleidung</tspan>
  </text>

  <path class="d-linie-gestrichelt" d="M 246 128 L 316 128"/>
  <path class="d-linie-gestrichelt" d="M 246 304 L 288 304"/>

  <path class="d-linie-duenn" d="M 246 50 L 246 118"/>
  <path class="d-pfeilspitze" d="M 246 42 l -5 10 l 10 0 Z"/>
  <path class="d-pfeilspitze" d="M 246 126 l -5 -10 l 10 0 Z"/>
  <path class="d-linie-duenn" d="M 246 138 L 246 294"/>
  <path class="d-pfeilspitze" d="M 246 130 l -5 10 l 10 0 Z"/>
  <path class="d-pfeilspitze" d="M 246 302 l -5 -10 l 10 0 Z"/>
  <path class="d-linie-duenn" d="M 246 314 L 246 470"/>
  <path class="d-pfeilspitze" d="M 246 306 l -5 10 l 10 0 Z"/>
  <path class="d-pfeilspitze" d="M 246 478 l -5 -10 l 10 0 Z"/>

  <text data-label="art-idealistisch" x="234" y="88" text-anchor="end" class="d-text-klein">idealistische Bedürfnisse</text>
  <text data-label="art-sozial" x="234" y="220" text-anchor="end" class="d-text-klein">soziale Bedürfnisse</text>
  <text data-label="art-oekonomisch" x="234" y="396" text-anchor="end" class="d-text-klein">ökonomische Bedürfnisse</text>

  <path class="d-linie-duenn" d="M 40 50 L 40 118"/>
  <path class="d-pfeilspitze" d="M 40 42 l -5 10 l 10 0 Z"/>
  <path class="d-pfeilspitze" d="M 40 126 l -5 -10 l 10 0 Z"/>
  <path class="d-linie-duenn" d="M 40 138 L 40 470"/>
  <path class="d-pfeilspitze" d="M 40 130 l -5 10 l 10 0 Z"/>
  <path class="d-pfeilspitze" d="M 40 478 l -5 -10 l 10 0 Z"/>

  <text data-label="motiv-wachstum" x="20" y="84" text-anchor="middle" transform="rotate(-90 20 84)" class="d-text-klein">Wachstumsmotive</text>
  <text data-label="motiv-defizit" x="20" y="304" text-anchor="middle" transform="rotate(-90 20 304)" class="d-text-klein">Defizitmotive</text>
</g>`,
  labels: [
    { id: 'stufe-physio', text: 'Physiologische Bedürfnisse', abfragbar: true, gruppe: 'stufen' },
    { id: 'stufe-sicherheit', text: 'Sicherheitsbedürfnisse', abfragbar: true, gruppe: 'stufen' },
    { id: 'stufe-sozial', text: 'Soziale Bedürfnisse', abfragbar: true, gruppe: 'stufen' },
    { id: 'stufe-individual', text: 'Individualbedürfnisse', abfragbar: true, gruppe: 'stufen' },
    { id: 'stufe-selbst', text: 'Selbstverwirklichung', abfragbar: true, gruppe: 'stufen' },
    { id: 'motiv-wachstum', text: 'Wachstumsmotive', abfragbar: true, gruppe: 'motive' },
    { id: 'motiv-defizit', text: 'Defizitmotive', abfragbar: true, gruppe: 'motive' },
    { id: 'art-idealistisch', text: 'idealistische Bedürfnisse', abfragbar: true, gruppe: 'motive' },
    { id: 'art-sozial', text: 'soziale Bedürfnisse', abfragbar: true, gruppe: 'motive' },
    { id: 'art-oekonomisch', text: 'ökonomische Bedürfnisse', abfragbar: true, gruppe: 'motive' },
    { id: 'erl-selbst', text: '-> Selbstverwirklichung, Entwicklung', abfragbar: false, gruppe: 'stufen' },
    { id: 'erl-individual', text: '-> Ansehen, Status, Wertschätzung, Lob', abfragbar: false, gruppe: 'stufen' },
    { id: 'erl-sozial', text: '-> Familie, Freundschaften, Vereine, Religionsgemeinschaften', abfragbar: false, gruppe: 'stufen' },
    { id: 'erl-sicherheit', text: '-> finanzielle Sicherheit (Versicherungen, Sparguthaben, ...)', abfragbar: false, gruppe: 'stufen' },
    { id: 'erl-physio', text: '-> körperliches Wohlbefinden, Wohnung, Nahrung, Kleidung', abfragbar: false, gruppe: 'stufen' },
  ],
}
