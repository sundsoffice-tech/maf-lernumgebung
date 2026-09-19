// Folien 76 und 77 (folie-48.md, folie-49.md): drei Einteilungen von Problemen. Eigene Darstellung.
// Hochkant: die drei Spalten der Folie stehen als drei Abschnitte untereinander, damit sie schmal lesbar sind.
export default {
  id: 'problemtypen',
  titel: 'Problemtypen nach Gomez/Probst, Grint und Heifetz',
  folien: [76, 77],
  viewBox: '0 0 800 1350',
  minBreite: 600,
  beschreibung: 'Drei Einteilungen beantworten die Frage, welches Problem vorliegt: Gomez/Probst unterscheiden einfache, komplizierte, komplexe und chaotische Probleme, Grint tame, wicked und critical problems, Heifetz das technische und das adaptive Problem. Zu jedem Typ stehen die Merkmale der Folie.',
  svg: `<g>
  <text data-label="frage" x="400" y="36" text-anchor="middle" class="d-text-titel">Welches Problem liegt vor?</text>

  <text data-label="sp-gomez" x="20" y="82" class="d-text-titel">Gomez/Probst</text>
  <path class="d-linie-duenn" d="M 20 90 L 130 90"/>

  <rect class="d-flaeche" x="20" y="100" width="760" height="102" rx="10"/>
  <text data-label="t-einfach" x="36" y="126" class="d-text-fett">einfache Probleme</text>
  <path class="d-linie-duenn" d="M 40 147 L 52 147"/>
  <text data-label="einfach-1" x="60" y="152" class="d-text">monokausale Zusammenhänge</text>
  <path class="d-linie-duenn" d="M 40 167 L 52 167"/>
  <text data-label="einfach-2" x="60" y="172" class="d-text">eine Antwort, keine Optionen</text>
  <path class="d-linie-duenn" d="M 40 187 L 52 187"/>
  <text data-label="einfach-3" x="60" y="192" class="d-text">Routinen, ggf. best practices</text>

  <rect class="d-flaeche" x="20" y="212" width="760" height="122" rx="10"/>
  <text data-label="t-kompliziert" x="36" y="238" class="d-text-fett">komplizierte Probleme</text>
  <path class="d-linie-duenn" d="M 40 259 L 52 259"/>
  <text data-label="kompliziert-1" x="60" y="264" class="d-text">häufig kausale Zusammenhänge</text>
  <path class="d-linie-duenn" d="M 40 279 L 52 279"/>
  <text data-label="kompliziert-2" x="60" y="284" class="d-text">mehrere Lösungsoptionen</text>
  <path class="d-linie-duenn" d="M 40 299 L 52 299"/>
  <text data-label="kompliziert-3" x="60" y="304" class="d-text">Analyse, Expertenwissen</text>
  <path class="d-linie-duenn" d="M 40 319 L 52 319"/>
  <text data-label="kompliziert-4" x="60" y="324" class="d-text">Gefahr: copy/paste!</text>

  <rect class="d-flaeche" x="20" y="344" width="760" height="102" rx="10"/>
  <text data-label="t-komplex" x="36" y="370" class="d-text-fett">komplexe Probleme</text>
  <path class="d-linie-duenn" d="M 40 391 L 52 391"/>
  <text data-label="komplex-1" x="60" y="396" class="d-text">dynamische vernetzte Kausalitäten</text>
  <path class="d-linie-duenn" d="M 40 411 L 52 411"/>
  <text data-label="komplex-2" x="60" y="416" class="d-text">umfassender Lösungsraum</text>
  <path class="d-linie-duenn" d="M 40 431 L 52 431"/>
  <text data-label="komplex-3" x="60" y="436" class="d-text">systemische Methoden</text>

  <rect class="d-flaeche" x="20" y="456" width="760" height="122" rx="10"/>
  <text data-label="t-chaotisch" x="36" y="482" class="d-text-fett">chaotische Probleme</text>
  <path class="d-linie-duenn" d="M 40 503 L 52 503"/>
  <text data-label="chaotisch-1" x="60" y="508" class="d-text">höchste Umweltdynamik, Stress</text>
  <path class="d-linie-duenn" d="M 40 523 L 52 523"/>
  <text data-label="chaotisch-2" x="60" y="528" class="d-text">Engpassfaktor: Zeit</text>
  <path class="d-linie-duenn" d="M 40 543 L 52 543"/>
  <text data-label="chaotisch-3" x="60" y="548" class="d-text">autoritäres Management nötig</text>
  <path class="d-linie-duenn" d="M 40 563 L 52 563"/>
  <text data-label="chaotisch-4" x="60" y="568" class="d-text">Notfallpläne vorhalten &amp; üben</text>

  <text data-label="sp-grint" x="20" y="626" class="d-text-titel">Grint</text>
  <path class="d-linie-duenn" d="M 20 634 L 66 634"/>

  <rect class="d-flaeche-2" x="20" y="644" width="760" height="122" rx="10"/>
  <text data-label="t-tame" x="36" y="670" class="d-text-fett">tame problems</text>
  <path class="d-linie-duenn" d="M 40 691 L 52 691"/>
  <text data-label="tame-1" x="60" y="696" class="d-text">wiederkehrende Probleme</text>
  <path class="d-linie-duenn" d="M 40 711 L 52 711"/>
  <text data-label="tame-2" x="60" y="716" class="d-text">operationaler Lösungsraum</text>
  <path class="d-linie-duenn" d="M 40 731 L 52 731"/>
  <text data-label="tame-3" x="60" y="736" class="d-text">Management/Prozesse/Ratio</text>
  <path class="d-linie-duenn" d="M 40 751 L 52 751"/>
  <text data-label="tame-4" x="60" y="756" class="d-text">mittelfristige Wirksamkeit</text>

  <rect class="d-flaeche-2" x="20" y="776" width="760" height="122" rx="10"/>
  <text data-label="t-wicked" x="36" y="802" class="d-text-fett">wicked problems</text>
  <path class="d-linie-duenn" d="M 40 823 L 52 823"/>
  <text data-label="wicked-1" x="60" y="828" class="d-text">komplexe, „unschöne" Probleme</text>
  <path class="d-linie-duenn" d="M 40 843 L 52 843"/>
  <text data-label="wicked-2" x="60" y="848" class="d-text">strategischer Lösungsraum</text>
  <path class="d-linie-duenn" d="M 40 863 L 52 863"/>
  <text data-label="wicked-3" x="60" y="868" class="d-text">Kollaboration, Fragen stellen</text>
  <path class="d-linie-duenn" d="M 40 883 L 52 883"/>
  <text data-label="wicked-4" x="60" y="888" class="d-text">langfristige Wirksamkeit</text>

  <rect class="d-flaeche-2" x="20" y="908" width="760" height="122" rx="10"/>
  <text data-label="t-critical" x="36" y="934" class="d-text-fett">critical problems</text>
  <path class="d-linie-duenn" d="M 40 955 L 52 955"/>
  <text data-label="critical-1" x="60" y="960" class="d-text">plötzliche Krise; Schocksituation</text>
  <path class="d-linie-duenn" d="M 40 975 L 52 975"/>
  <text data-label="critical-2" x="60" y="980" class="d-text">taktischer Lösungsraum</text>
  <path class="d-linie-duenn" d="M 40 995 L 52 995"/>
  <text data-label="critical-3" x="60" y="1000" class="d-text">Kommandos, Antworten geben</text>
  <path class="d-linie-duenn" d="M 40 1015 L 52 1015"/>
  <text data-label="critical-4" x="60" y="1020" class="d-text">kurzfristige Wirksamkeit</text>

  <text data-label="sp-heifetz" x="20" y="1090" class="d-text-titel">Heifetz</text>
  <path class="d-linie-duenn" d="M 20 1098 L 88 1098"/>

  <rect class="d-flaeche-3" x="20" y="1108" width="760" height="102" rx="10"/>
  <text data-label="t-technisch" x="36" y="1134" class="d-text-fett">technisches Problem</text>
  <path class="d-linie-duenn" d="M 40 1155 L 52 1155"/>
  <text data-label="technisch-1" x="60" y="1160" class="d-text">klar abgrenzbares Problem</text>
  <path class="d-linie-duenn" d="M 40 1175 L 52 1175"/>
  <text data-label="technisch-2" x="60" y="1180" class="d-text">enger, erlernbarer Lösungsraum</text>
  <path class="d-linie-duenn" d="M 40 1195 L 52 1195"/>
  <text data-label="technisch-3" x="60" y="1200" class="d-text">Expertenwissen und -können</text>

  <rect class="d-flaeche-3" x="20" y="1220" width="760" height="102" rx="10"/>
  <text data-label="t-adaptiv" x="36" y="1246" class="d-text-fett">adaptives Problem</text>
  <path class="d-linie-duenn" d="M 40 1267 L 52 1267"/>
  <text data-label="adaptiv-1" x="60" y="1272" class="d-text">Problem z.T. schwer eingrenzbar</text>
  <path class="d-linie-duenn" d="M 40 1287 L 52 1287"/>
  <text data-label="adaptiv-2" x="60" y="1292" class="d-text">Lösungsraum nicht sofort evident</text>
  <path class="d-linie-duenn" d="M 40 1307 L 52 1307"/>
  <text data-label="adaptiv-3" x="60" y="1312" class="d-text-akzent">Änderungen in Verhalten, Werten, Einstellungen erforderlich</text>
</g>`,
  labels: [
    { id: 'frage', text: 'Welches Problem liegt vor?', abfragbar: false, gruppe: 'typen' },
    { id: 'sp-gomez', text: 'Gomez/Probst', abfragbar: false, gruppe: 'typen' },
    { id: 'sp-grint', text: 'Grint', abfragbar: false, gruppe: 'typen' },
    { id: 'sp-heifetz', text: 'Heifetz', abfragbar: false, gruppe: 'typen' },
    { id: 't-einfach', text: 'einfache Probleme', abfragbar: false, gruppe: 'typen' },
    { id: 'einfach-1', text: 'monokausale Zusammenhänge', abfragbar: false, gruppe: 'typen' },
    { id: 'einfach-2', text: 'eine Antwort, keine Optionen', abfragbar: false, gruppe: 'typen' },
    { id: 'einfach-3', text: 'Routinen, ggf. best practices', abfragbar: false, gruppe: 'typen' },
    { id: 't-kompliziert', text: 'komplizierte Probleme', abfragbar: true, gruppe: 'typen' },
    { id: 'kompliziert-1', text: 'häufig kausale Zusammenhänge', abfragbar: false, gruppe: 'typen' },
    { id: 'kompliziert-2', text: 'mehrere Lösungsoptionen', abfragbar: false, gruppe: 'typen' },
    { id: 'kompliziert-3', text: 'Analyse, Expertenwissen', abfragbar: false, gruppe: 'typen' },
    { id: 'kompliziert-4', text: 'Gefahr: copy/paste!', abfragbar: false, gruppe: 'typen' },
    { id: 't-komplex', text: 'komplexe Probleme', abfragbar: true, gruppe: 'typen' },
    { id: 'komplex-1', text: 'dynamische vernetzte Kausalitäten', abfragbar: false, gruppe: 'typen' },
    { id: 'komplex-2', text: 'umfassender Lösungsraum', abfragbar: false, gruppe: 'typen' },
    { id: 'komplex-3', text: 'systemische Methoden', abfragbar: false, gruppe: 'typen' },
    { id: 't-chaotisch', text: 'chaotische Probleme', abfragbar: true, gruppe: 'typen' },
    { id: 'chaotisch-1', text: 'höchste Umweltdynamik, Stress', abfragbar: false, gruppe: 'typen' },
    { id: 'chaotisch-2', text: 'Engpassfaktor: Zeit', abfragbar: false, gruppe: 'typen' },
    { id: 'chaotisch-3', text: 'autoritäres Management nötig', abfragbar: false, gruppe: 'typen' },
    { id: 'chaotisch-4', text: 'Notfallpläne vorhalten & üben', abfragbar: false, gruppe: 'typen' },
    { id: 't-tame', text: 'tame problems', abfragbar: true, gruppe: 'typen' },
    { id: 'tame-1', text: 'wiederkehrende Probleme', abfragbar: false, gruppe: 'typen' },
    { id: 'tame-2', text: 'operationaler Lösungsraum', abfragbar: false, gruppe: 'typen' },
    { id: 'tame-3', text: 'Management/Prozesse/Ratio', abfragbar: false, gruppe: 'typen' },
    { id: 'tame-4', text: 'mittelfristige Wirksamkeit', abfragbar: false, gruppe: 'typen' },
    { id: 't-wicked', text: 'wicked problems', abfragbar: true, gruppe: 'typen' },
    { id: 'wicked-1', text: 'komplexe, „unschöne" Probleme', abfragbar: false, gruppe: 'typen' },
    { id: 'wicked-2', text: 'strategischer Lösungsraum', abfragbar: false, gruppe: 'typen' },
    { id: 'wicked-3', text: 'Kollaboration, Fragen stellen', abfragbar: false, gruppe: 'typen' },
    { id: 'wicked-4', text: 'langfristige Wirksamkeit', abfragbar: false, gruppe: 'typen' },
    { id: 't-critical', text: 'critical problems', abfragbar: true, gruppe: 'typen' },
    { id: 'critical-1', text: 'plötzliche Krise; Schocksituation', abfragbar: false, gruppe: 'typen' },
    { id: 'critical-2', text: 'taktischer Lösungsraum', abfragbar: false, gruppe: 'typen' },
    { id: 'critical-3', text: 'Kommandos, Antworten geben', abfragbar: false, gruppe: 'typen' },
    { id: 'critical-4', text: 'kurzfristige Wirksamkeit', abfragbar: false, gruppe: 'typen' },
    { id: 't-technisch', text: 'technisches Problem', abfragbar: true, gruppe: 'typen' },
    { id: 'technisch-1', text: 'klar abgrenzbares Problem', abfragbar: false, gruppe: 'typen' },
    { id: 'technisch-2', text: 'enger, erlernbarer Lösungsraum', abfragbar: false, gruppe: 'typen' },
    { id: 'technisch-3', text: 'Expertenwissen und -können', abfragbar: false, gruppe: 'typen' },
    { id: 't-adaptiv', text: 'adaptives Problem', abfragbar: true, gruppe: 'typen' },
    { id: 'adaptiv-1', text: 'Problem z.T. schwer eingrenzbar', abfragbar: false, gruppe: 'typen' },
    { id: 'adaptiv-2', text: 'Lösungsraum nicht sofort evident', abfragbar: false, gruppe: 'typen' },
    { id: 'adaptiv-3', text: 'Änderungen in Verhalten, Werten, Einstellungen erforderlich', abfragbar: false, gruppe: 'typen' },
  ],
}
