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
  viewBoxSchmal: '0 0 360 1380',
  svgSchmal: `<g>
  <text data-label="frage" x="180" y="30" text-anchor="middle" class="d-text-titel">Welches Problem liegt vor?</text>

  <text data-label="sp-gomez" x="12" y="70" class="d-text-titel">Gomez/Probst</text>
  <path class="d-linie-duenn" d="M 12 78 L 128 78"/>

  <rect class="d-flaeche" x="10" y="88" width="340" height="106" rx="10"/>
  <text data-label="t-einfach" x="22" y="114" class="d-text-fett">einfache Probleme</text>
  <path class="d-linie-duenn" d="M 24 133 L 36 133"/>
  <text data-label="einfach-1" x="42" y="138" class="d-text">monokausale Zusammenhänge</text>
  <path class="d-linie-duenn" d="M 24 155 L 36 155"/>
  <text data-label="einfach-2" x="42" y="160" class="d-text">eine Antwort, keine Optionen</text>
  <path class="d-linie-duenn" d="M 24 177 L 36 177"/>
  <text data-label="einfach-3" x="42" y="182" class="d-text">Routinen, ggf. best practices</text>

  <rect class="d-flaeche" x="10" y="204" width="340" height="128" rx="10"/>
  <text data-label="t-kompliziert" x="22" y="230" class="d-text-fett">komplizierte Probleme</text>
  <path class="d-linie-duenn" d="M 24 249 L 36 249"/>
  <text data-label="kompliziert-1" x="42" y="254" class="d-text">häufig kausale Zusammenhänge</text>
  <path class="d-linie-duenn" d="M 24 271 L 36 271"/>
  <text data-label="kompliziert-2" x="42" y="276" class="d-text">mehrere Lösungsoptionen</text>
  <path class="d-linie-duenn" d="M 24 293 L 36 293"/>
  <text data-label="kompliziert-3" x="42" y="298" class="d-text">Analyse, Expertenwissen</text>
  <path class="d-linie-duenn" d="M 24 315 L 36 315"/>
  <text data-label="kompliziert-4" x="42" y="320" class="d-text">Gefahr: copy/paste!</text>

  <rect class="d-flaeche" x="10" y="342" width="340" height="106" rx="10"/>
  <text data-label="t-komplex" x="22" y="368" class="d-text-fett">komplexe Probleme</text>
  <path class="d-linie-duenn" d="M 24 387 L 36 387"/>
  <text data-label="komplex-1" x="42" y="392" class="d-text">dynamische vernetzte Kausalitäten</text>
  <path class="d-linie-duenn" d="M 24 409 L 36 409"/>
  <text data-label="komplex-2" x="42" y="414" class="d-text">umfassender Lösungsraum</text>
  <path class="d-linie-duenn" d="M 24 431 L 36 431"/>
  <text data-label="komplex-3" x="42" y="436" class="d-text">systemische Methoden</text>

  <rect class="d-flaeche" x="10" y="458" width="340" height="128" rx="10"/>
  <text data-label="t-chaotisch" x="22" y="484" class="d-text-fett">chaotische Probleme</text>
  <path class="d-linie-duenn" d="M 24 503 L 36 503"/>
  <text data-label="chaotisch-1" x="42" y="508" class="d-text">höchste Umweltdynamik, Stress</text>
  <path class="d-linie-duenn" d="M 24 525 L 36 525"/>
  <text data-label="chaotisch-2" x="42" y="530" class="d-text">Engpassfaktor: Zeit</text>
  <path class="d-linie-duenn" d="M 24 547 L 36 547"/>
  <text data-label="chaotisch-3" x="42" y="552" class="d-text">autoritäres Management nötig</text>
  <path class="d-linie-duenn" d="M 24 569 L 36 569"/>
  <text data-label="chaotisch-4" x="42" y="574" class="d-text">Notfallpläne vorhalten &amp; üben</text>

  <text data-label="sp-grint" x="12" y="630" class="d-text-titel">Grint</text>
  <path class="d-linie-duenn" d="M 12 638 L 68 638"/>

  <rect class="d-flaeche-2" x="10" y="648" width="340" height="128" rx="10"/>
  <text data-label="t-tame" x="22" y="674" class="d-text-fett">tame problems</text>
  <path class="d-linie-duenn" d="M 24 693 L 36 693"/>
  <text data-label="tame-1" x="42" y="698" class="d-text">wiederkehrende Probleme</text>
  <path class="d-linie-duenn" d="M 24 715 L 36 715"/>
  <text data-label="tame-2" x="42" y="720" class="d-text">operationaler Lösungsraum</text>
  <path class="d-linie-duenn" d="M 24 737 L 36 737"/>
  <text data-label="tame-3" x="42" y="742" class="d-text">Management/Prozesse/Ratio</text>
  <path class="d-linie-duenn" d="M 24 759 L 36 759"/>
  <text data-label="tame-4" x="42" y="764" class="d-text">mittelfristige Wirksamkeit</text>

  <rect class="d-flaeche-2" x="10" y="786" width="340" height="128" rx="10"/>
  <text data-label="t-wicked" x="22" y="812" class="d-text-fett">wicked problems</text>
  <path class="d-linie-duenn" d="M 24 831 L 36 831"/>
  <text data-label="wicked-1" x="42" y="836" class="d-text">komplexe, „unschöne" Probleme</text>
  <path class="d-linie-duenn" d="M 24 853 L 36 853"/>
  <text data-label="wicked-2" x="42" y="858" class="d-text">strategischer Lösungsraum</text>
  <path class="d-linie-duenn" d="M 24 875 L 36 875"/>
  <text data-label="wicked-3" x="42" y="880" class="d-text">Kollaboration, Fragen stellen</text>
  <path class="d-linie-duenn" d="M 24 897 L 36 897"/>
  <text data-label="wicked-4" x="42" y="902" class="d-text">langfristige Wirksamkeit</text>

  <rect class="d-flaeche-2" x="10" y="924" width="340" height="128" rx="10"/>
  <text data-label="t-critical" x="22" y="950" class="d-text-fett">critical problems</text>
  <path class="d-linie-duenn" d="M 24 969 L 36 969"/>
  <text data-label="critical-1" x="42" y="974" class="d-text">plötzliche Krise; Schocksituation</text>
  <path class="d-linie-duenn" d="M 24 991 L 36 991"/>
  <text data-label="critical-2" x="42" y="996" class="d-text">taktischer Lösungsraum</text>
  <path class="d-linie-duenn" d="M 24 1013 L 36 1013"/>
  <text data-label="critical-3" x="42" y="1018" class="d-text">Kommandos, Antworten geben</text>
  <path class="d-linie-duenn" d="M 24 1035 L 36 1035"/>
  <text data-label="critical-4" x="42" y="1040" class="d-text">kurzfristige Wirksamkeit</text>

  <text data-label="sp-heifetz" x="12" y="1096" class="d-text-titel">Heifetz</text>
  <path class="d-linie-duenn" d="M 12 1104 L 90 1104"/>

  <rect class="d-flaeche-3" x="10" y="1114" width="340" height="106" rx="10"/>
  <text data-label="t-technisch" x="22" y="1140" class="d-text-fett">technisches Problem</text>
  <path class="d-linie-duenn" d="M 24 1159 L 36 1159"/>
  <text data-label="technisch-1" x="42" y="1164" class="d-text">klar abgrenzbares Problem</text>
  <path class="d-linie-duenn" d="M 24 1181 L 36 1181"/>
  <text data-label="technisch-2" x="42" y="1186" class="d-text">enger, erlernbarer Lösungsraum</text>
  <path class="d-linie-duenn" d="M 24 1203 L 36 1203"/>
  <text data-label="technisch-3" x="42" y="1208" class="d-text">Expertenwissen und -können</text>

  <rect class="d-flaeche-3" x="10" y="1230" width="340" height="134" rx="10"/>
  <text data-label="t-adaptiv" x="22" y="1256" class="d-text-fett">adaptives Problem</text>
  <path class="d-linie-duenn" d="M 24 1275 L 36 1275"/>
  <text data-label="adaptiv-1" x="42" y="1280" class="d-text">Problem z.T. schwer eingrenzbar</text>
  <path class="d-linie-duenn" d="M 24 1297 L 36 1297"/>
  <text data-label="adaptiv-2" x="42" y="1302" class="d-text">Lösungsraum nicht sofort evident</text>
  <path class="d-linie-duenn" d="M 24 1319 L 36 1319"/>
  <text data-label="adaptiv-3" x="42" y="1324" class="d-text-akzent"><tspan x="42" y="1324">Änderungen in Verhalten, Werten, </tspan><tspan x="42" y="1346">Einstellungen erforderlich</tspan></text>
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
