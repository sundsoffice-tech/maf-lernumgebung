// Folie 55 (folie-27.md): 5 Phasen der Psychologie von Gruppen nach Tuckman's Phasenmodell.
// Eigene Darstellung: fünf Stationen untereinander, rechts je Station die Beschreibung der Folie.
export default {
  id: 'tuckman',
  titel: '5 Phasen der Psychologie von Gruppen (nach Tuckman‘s Phasenmodell)',
  folien: [55],
  viewBox: '0 0 800 590',
  minBreite: 600,
  beschreibung: 'Fünf Phasen der Gruppenentwicklung folgen von oben nach unten aufeinander: Forming, Storming, Norming, Performing und Re-Forming, jeweils mit der Kurzbeschreibung der Folie. Die Fussnote hält fest, dass das kein linearer Prozess ist.',
  svg: `<g>
  <rect class="d-flaeche-2" x="20" y="30" width="230" height="64" rx="8"/>
  <rect class="d-flaeche-2" x="20" y="134" width="230" height="64" rx="8"/>
  <rect class="d-flaeche-2" x="20" y="238" width="230" height="64" rx="8"/>
  <rect class="d-flaeche-2" x="20" y="342" width="230" height="64" rx="8"/>
  <rect class="d-flaeche-2" x="20" y="446" width="230" height="64" rx="8"/>

  <path class="d-linie" d="M 135 100 L 135 118"/>
  <path class="d-pfeilspitze" d="M 135 130 l -8 -14 l 16 0 Z"/>
  <path class="d-linie" d="M 135 204 L 135 222"/>
  <path class="d-pfeilspitze" d="M 135 234 l -8 -14 l 16 0 Z"/>
  <path class="d-linie" d="M 135 308 L 135 326"/>
  <path class="d-pfeilspitze" d="M 135 338 l -8 -14 l 16 0 Z"/>
  <path class="d-linie" d="M 135 412 L 135 430"/>
  <path class="d-pfeilspitze" d="M 135 442 l -8 -14 l 16 0 Z"/>

  <text data-label="phase-forming" x="135" y="68" text-anchor="middle" class="d-text-fett">F O R M I N G</text>
  <text data-label="phase-storming" x="135" y="172" text-anchor="middle" class="d-text-fett">S T O R M I N G</text>
  <text data-label="phase-norming" x="135" y="276" text-anchor="middle" class="d-text-fett">N O R M I N G</text>
  <text data-label="phase-performing" x="135" y="380" text-anchor="middle" class="d-text-fett">P E R F O R M I N G</text>
  <text data-label="phase-reforming" x="135" y="484" text-anchor="middle" class="d-text-fett">R E - F O R M I N G</text>

  <text data-label="besch-forming" x="272" y="67" class="d-text">Kennenlernen, Prüfen u.a. des Verhaltens, Beziehungsklärung</text>
  <text data-label="besch-storming" x="272" y="171" class="d-text">Reibungen, Rollenzuweisungen, Einüben des Funktionierens</text>
  <text data-label="besch-norming" x="272" y="275" class="d-text">Normen/Spielregeln geklärt und akzeptiert, WIR wird Routine</text>
  <text data-label="besch-performing" x="272" y="379" class="d-text">Arbeit wird geleistet, Potential entfaltet, Optimum angestrebt</text>
  <text data-label="besch-reforming" x="272" y="483" class="d-text">Neubewertung/Bilanzierung, Repositionierung, Abschluss/Auflösung</text>

  <text data-label="fussnote" x="20" y="556" class="d-text-akzent">*: kein linearer Prozess, unterliegt Sprüngen und Zyklen!</text>
</g>`,
  labels: [
    { id: 'phase-forming', text: 'F O R M I N G', abfragbar: true, gruppe: 'phasen' },
    { id: 'phase-storming', text: 'S T O R M I N G', abfragbar: true, gruppe: 'phasen' },
    { id: 'phase-norming', text: 'N O R M I N G', abfragbar: true, gruppe: 'phasen' },
    { id: 'phase-performing', text: 'P E R F O R M I N G', abfragbar: true, gruppe: 'phasen' },
    { id: 'phase-reforming', text: 'R E - F O R M I N G', abfragbar: true, gruppe: 'phasen' },
    { id: 'besch-forming', text: 'Kennenlernen, Prüfen u.a. des Verhaltens, Beziehungsklärung', abfragbar: false, gruppe: 'phasen' },
    { id: 'besch-storming', text: 'Reibungen, Rollenzuweisungen, Einüben des Funktionierens', abfragbar: false, gruppe: 'phasen' },
    { id: 'besch-norming', text: 'Normen/Spielregeln geklärt und akzeptiert, WIR wird Routine', abfragbar: false, gruppe: 'phasen' },
    { id: 'besch-performing', text: 'Arbeit wird geleistet, Potential entfaltet, Optimum angestrebt', abfragbar: false, gruppe: 'phasen' },
    { id: 'besch-reforming', text: 'Neubewertung/Bilanzierung, Repositionierung, Abschluss/Auflösung', abfragbar: false, gruppe: 'phasen' },
    { id: 'fussnote', text: '*: kein linearer Prozess, unterliegt Sprüngen und Zyklen!', abfragbar: false, gruppe: 'phasen' },
  ],
}
