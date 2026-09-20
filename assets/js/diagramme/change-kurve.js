// Folie 78: Change-Modelle und Change-Kurve. Eigene Zeichnung, zweiteilig untereinander.
// Teil 1: Lewins drei Schritte und Kotters acht Schritte (auf der Folie waagerechte Baender,
//   hier senkrecht untereinander, damit die langen Schrittnamen auf schmalen Geraeten lesbar bleiben;
//   die Reihenfolge bleibt dieselbe, der Pfeil links zeigt die Richtung).
// Teil 2: die Kurve des Leistungsniveaus mit den acht Stationen, der 100-Prozent-Linie,
//   den Projekt-Phasen und den Management-Aufgaben.
// Der rote Stern im ansteigenden Ast der Folie traegt dort keine Beschriftung und wird auf der
// Folie nicht erklaert; er ist deshalb nicht uebernommen.
export default {
  id: 'change-kurve',
  titel: 'Change-Modelle und Change-Kurve',
  folien: [78],
  viewBox: '0 0 800 1472',
  viewBoxSchmal: '0 0 360 1610',
  minBreite: 660,
  beschreibung: 'Oben die drei Schritte von Kurt Lewin und die acht Schritte von John Kotter in ihrer Reihenfolge. Darunter die Change-Kurve: das Leistungsniveau fällt von 100 Prozent bis zum Tiefpunkt bei der emotionalen Akzeptanz und steigt danach wieder über den Ausgangswert, begleitet von den Projekt-Phasen und den Management-Aufgaben.',
  svg: `
  <g>
    <text data-label="t-modelle" x="16" y="26" text-anchor="start" class="d-text-titel">Change-Modelle</text>

    <text data-label="lewin-titel" x="16" y="58" text-anchor="start" class="d-text-fett">Kurt Lewins 3-Schritt-Modell (1951)</text>
    <rect class="d-flaeche" x="16" y="70" width="768" height="44" rx="6"/>
    <text data-label="lewin-1" x="34" y="98" text-anchor="start" class="d-text-fett">Auftauen</text>
    <text data-label="lewin-2" x="400" y="98" text-anchor="middle" class="d-text-fett">Verändern</text>
    <text data-label="lewin-3" x="766" y="98" text-anchor="end" class="d-text-fett">Einfrieren</text>

    <text data-label="kotter-titel" x="16" y="148" text-anchor="start" class="d-text-fett">John Kotters 8-Schritt-Modell (1995)</text>
    <line class="d-linie" x1="30" y1="162" x2="30" y2="430"/>
    <polygon class="d-pfeilspitze" points="0,-9 -6,4 6,4" transform="translate(30,442) rotate(180)"/>
    <rect class="d-flaeche" x="46" y="160" width="738" height="30" rx="6"/>
    <text data-label="kotter-1" x="62" y="180" text-anchor="start" class="d-text">Dringlichkeit erzeugen</text>
    <rect class="d-flaeche" x="46" y="196" width="738" height="30" rx="6"/>
    <text data-label="kotter-2" x="62" y="216" text-anchor="start" class="d-text">Etablierung Führungsteam</text>
    <rect class="d-flaeche" x="46" y="232" width="738" height="30" rx="6"/>
    <text data-label="kotter-3" x="62" y="252" text-anchor="start" class="d-text">Vision entwickeln</text>
    <rect class="d-flaeche" x="46" y="268" width="738" height="30" rx="6"/>
    <text data-label="kotter-4" x="62" y="288" text-anchor="start" class="d-text">Vision kommunizieren</text>
    <rect class="d-flaeche" x="46" y="304" width="738" height="30" rx="6"/>
    <text data-label="kotter-5" x="62" y="324" text-anchor="start" class="d-text">Befähigung/ Bevollmächtigung</text>
    <rect class="d-flaeche" x="46" y="340" width="738" height="30" rx="6"/>
    <text data-label="kotter-6" x="62" y="360" text-anchor="start" class="d-text">kfr. Ziele erreichen/ Erfolge erzielen</text>
    <rect class="d-flaeche" x="46" y="376" width="738" height="30" rx="6"/>
    <text data-label="kotter-7" x="62" y="396" text-anchor="start" class="d-text">erreichte Ziele/ Erfolge sichern</text>
    <rect class="d-flaeche" x="46" y="412" width="738" height="30" rx="6"/>
    <text data-label="kotter-8" x="62" y="432" text-anchor="start" class="d-text">Konsolidierung/ Change kultivieren</text>

    <text data-label="t-kurve" x="16" y="500" text-anchor="start" class="d-text-titel">Change-Kurve</text>

    <text data-label="leistungsniveau" x="16" y="524" text-anchor="start" class="d-text-klein">Leistungsniveau</text>
    <line class="d-linie-duenn" x1="110" y1="1010" x2="110" y2="548"/>
    <polygon class="d-pfeilspitze" points="0,-9 -6,4 6,4" transform="translate(110,536)"/>
    <line class="d-linie-duenn" x1="110" y1="1010" x2="778" y2="1010"/>
    <polygon class="d-pfeilspitze" points="0,-9 -6,4 6,4" transform="translate(790,1010) rotate(90)"/>
    <text data-label="zeit" x="772" y="1000" text-anchor="end" class="d-text-fett">Zeit</text>

    <line class="d-linie-duenn" x1="110" y1="616" x2="778" y2="616"/>
    <text data-label="hundert-ist" x="118" y="606" text-anchor="start" class="d-text-akzent">100% bzw. IST</text>

    <path class="d-kurve" d="M 128 628 C 142 618 158 614 172 616 C 194 619 214 684 244 700 C 274 716 306 672 322 652 C 344 626 372 706 402 776 C 430 842 450 880 474 900 C 506 926 556 830 586 772 C 614 718 640 710 668 686 C 700 658 724 604 748 586 C 760 578 770 576 778 576"/>

    <circle class="d-punkt" cx="172" cy="616" r="5"/>
    <circle class="d-punkt" cx="244" cy="700" r="5"/>
    <circle class="d-punkt" cx="322" cy="652" r="5"/>
    <circle class="d-punkt" cx="402" cy="776" r="5"/>
    <circle class="d-punkt" cx="474" cy="900" r="5"/>
    <circle class="d-punkt" cx="586" cy="772" r="5"/>
    <circle class="d-punkt" cx="668" cy="686" r="5"/>
    <circle class="d-punkt" cx="748" cy="586" r="5"/>

    <line class="d-linie-akzent" x1="474" y1="630" x2="474" y2="886"/>
    <polygon class="d-pfeilspitze-akzent" points="0,-11 -7,5 7,5" transform="translate(474,616)"/>
    <polygon class="d-pfeilspitze-akzent" points="0,-11 -7,5 7,5" transform="translate(474,900) rotate(180)"/>

    <text data-label="st-1" x="182" y="562" text-anchor="start" class="d-text-fett"><tspan x="182" y="562">Vorahnung/ </tspan><tspan x="182" y="580">Gerüchte</tspan></text>
    <text data-label="st-2" x="250" y="734" text-anchor="start" class="d-text-fett"><tspan x="250" y="734">Irritation/ </tspan><tspan x="250" y="752">Schock</tspan></text>
    <text data-label="st-3" x="330" y="562" text-anchor="start" class="d-text-fett"><tspan x="330" y="562">Verneinung/ </tspan><tspan x="330" y="580">Abwehr</tspan></text>
    <text data-label="st-4" x="390" y="778" text-anchor="end" class="d-text-fett"><tspan x="390" y="778">rationale </tspan><tspan x="390" y="796">Akzeptanz</tspan></text>
    <text data-label="st-5" x="474" y="944" text-anchor="middle" class="d-text-fett"><tspan x="474" y="944">emotionale </tspan><tspan x="474" y="962">Akzeptanz</tspan></text>
    <text data-label="ausrufezeichen" x="524" y="962" text-anchor="start" class="d-text-akzent">!</text>
    <text data-label="st-6" x="596" y="808" text-anchor="start" class="d-text-fett"><tspan x="596" y="808">Anpassung, </tspan><tspan x="596" y="826">Lernen</tspan></text>
    <text data-label="st-7" x="690" y="718" text-anchor="start" class="d-text-fett"><tspan x="690" y="718">Erkenntnis, </tspan><tspan x="690" y="736">Aha-Effekt!</tspan></text>
    <text data-label="st-8" x="776" y="540" text-anchor="end" class="d-text-fett"><tspan x="776" y="540">Integration/ </tspan><tspan x="776" y="558">Manifestation</tspan></text>

    <text data-label="projekt-phasen" x="16" y="1046" text-anchor="start" class="d-text">Projekt-Phasen:</text>
    <line class="d-linie-duenn" x1="16" y1="1053" x2="126" y2="1053"/>

    <line class="d-linie-gestrichelt" x1="150" y1="1012" x2="150" y2="1056"/>
    <polygon class="d-pfeilspitze" points="0,-8 -5,3 5,3" transform="translate(150,1066) rotate(180)"/>
    <text data-label="ph-1" x="150" y="1090" text-anchor="middle" class="d-text-klein">Entscheidung</text>
    <line class="d-linie-gestrichelt" x1="265" y1="1012" x2="265" y2="1056"/>
    <polygon class="d-pfeilspitze" points="0,-8 -5,3 5,3" transform="translate(265,1066) rotate(180)"/>
    <text data-label="ph-2" x="265" y="1090" text-anchor="middle" class="d-text-klein">Ankündigung</text>
    <line class="d-linie-gestrichelt" x1="375" y1="1012" x2="375" y2="1056"/>
    <polygon class="d-pfeilspitze" points="0,-8 -5,3 5,3" transform="translate(375,1066) rotate(180)"/>
    <text data-label="ph-3" x="375" y="1090" text-anchor="middle" class="d-text-klein">Konzeption</text>
    <line class="d-linie-gestrichelt" x1="585" y1="1012" x2="585" y2="1056"/>
    <polygon class="d-pfeilspitze" points="0,-8 -5,3 5,3" transform="translate(585,1066) rotate(180)"/>
    <text data-label="ph-4" x="585" y="1090" text-anchor="middle" class="d-text-klein">Umsetzung</text>
    <line class="d-linie-gestrichelt" x1="720" y1="1012" x2="720" y2="1056"/>
    <polygon class="d-pfeilspitze" points="0,-8 -5,3 5,3" transform="translate(720,1066) rotate(180)"/>
    <text data-label="ph-5" x="720" y="1090" text-anchor="middle" class="d-text-klein">Roll-out</text>

    <rect class="d-akzentflaeche" x="16" y="1112" width="768" height="66" rx="8"/>
    <text data-label="hinweis-strukturen" x="36" y="1140" text-anchor="start" class="d-text-akzent"><tspan x="36" y="1140">STRUKTUREN/PROZESSE -&gt; </tspan><tspan x="36" y="1162">Changes greif-/erlebbar machen!</tspan></text>

    <rect class="d-flaeche-leer" x="16" y="1190" width="768" height="48" rx="8"/>
    <text data-label="hinweis-evidenz" x="36" y="1220" text-anchor="start" class="d-text-mittel">ABER: nicht evidenzbasiert, nicht empirisch belegt!</text>

    <text data-label="management-aufgaben" x="16" y="1280" text-anchor="start" class="d-text-fett">Management-Aufgaben</text>
    <rect class="d-flaeche" x="16" y="1292" width="768" height="160" rx="8"/>

    <text data-label="ma-1" x="40" y="1316" text-anchor="start" class="d-text-klein">Information/Kommunikation/Einbinden</text>
    <line class="d-linie-duenn" x1="52" y1="1326" x2="328" y2="1326"/>
    <polygon class="d-pfeilspitze" points="0,-8 -5,3 5,3" transform="translate(40,1326) rotate(270)"/>
    <polygon class="d-pfeilspitze" points="0,-8 -5,3 5,3" transform="translate(340,1326) rotate(90)"/>

    <text data-label="ma-2" x="130" y="1354" text-anchor="start" class="d-text-klein">Aufbau Fähigkeiten/Tools/Durchbruchsthemen</text>
    <line class="d-linie-duenn" x1="142" y1="1364" x2="548" y2="1364"/>
    <polygon class="d-pfeilspitze" points="0,-8 -5,3 5,3" transform="translate(130,1364) rotate(270)"/>
    <polygon class="d-pfeilspitze" points="0,-8 -5,3 5,3" transform="translate(560,1364) rotate(90)"/>

    <text data-label="ma-3" x="320" y="1392" text-anchor="start" class="d-text-klein">Coaching</text>
    <line class="d-linie-duenn" x1="332" y1="1402" x2="678" y2="1402"/>
    <polygon class="d-pfeilspitze" points="0,-8 -5,3 5,3" transform="translate(320,1402) rotate(270)"/>
    <polygon class="d-pfeilspitze" points="0,-8 -5,3 5,3" transform="translate(690,1402) rotate(90)"/>

    <text data-label="ma-4" x="450" y="1430" text-anchor="start" class="d-text-klein">Controlling/Monitoring</text>
    <line class="d-linie-duenn" x1="462" y1="1440" x2="750" y2="1440"/>
    <polygon class="d-pfeilspitze" points="0,-8 -5,3 5,3" transform="translate(450,1440) rotate(270)"/>
    <polygon class="d-pfeilspitze" points="0,-8 -5,3 5,3" transform="translate(762,1440) rotate(90)"/>
  </g>`,
  // Hochkantfassung fuer 360 px (iPhone hochkant). Lewins drei Schritte werden zu drei Kaesten untereinander,
  // Kotters acht bleiben senkrecht. Die Change-Kurve ist um 90 Grad gedreht: die Zeit laeuft nach unten, das
  // Leistungsniveau nach rechts, die 100-Prozent-Linie steht senkrecht. Die acht Stationen behalten ihre Lage
  // und Reihenfolge und stehen links neben ihrem Punkt. Projekt-Phasen und Management-Aufgaben stehen als
  // Bloecke darunter, in derselben Reihenfolge und mit denselben Zeitspannen wie quer.
  svgSchmal: `
  <g>
    <text data-label="t-modelle" x="16" y="26" text-anchor="start" class="d-text-titel">Change-Modelle</text>

    <text data-label="lewin-titel" x="16" y="56" text-anchor="start" class="d-text-fett">Kurt Lewins 3-Schritt-Modell (1951)</text>
    <rect class="d-flaeche" x="16" y="68" width="328" height="32" rx="6"/>
    <text data-label="lewin-1" x="180" y="89" text-anchor="middle" class="d-text-fett">Auftauen</text>
    <rect class="d-flaeche" x="16" y="106" width="328" height="32" rx="6"/>
    <text data-label="lewin-2" x="180" y="127" text-anchor="middle" class="d-text-fett">Verändern</text>
    <rect class="d-flaeche" x="16" y="144" width="328" height="32" rx="6"/>
    <text data-label="lewin-3" x="180" y="165" text-anchor="middle" class="d-text-fett">Einfrieren</text>

    <text data-label="kotter-titel" x="16" y="206" text-anchor="start" class="d-text-fett">John Kotters 8-Schritt-Modell (1995)</text>
    <line class="d-linie" x1="24" y1="220" x2="24" y2="480"/>
    <polygon class="d-pfeilspitze" points="0,-9 -6,4 6,4" transform="translate(24,492) rotate(180)"/>
    <rect class="d-flaeche" x="40" y="218" width="304" height="28" rx="6"/>
    <text data-label="kotter-1" x="52" y="237" text-anchor="start" class="d-text-klein">Dringlichkeit erzeugen</text>
    <rect class="d-flaeche" x="40" y="251" width="304" height="28" rx="6"/>
    <text data-label="kotter-2" x="52" y="270" text-anchor="start" class="d-text-klein">Etablierung Führungsteam</text>
    <rect class="d-flaeche" x="40" y="284" width="304" height="28" rx="6"/>
    <text data-label="kotter-3" x="52" y="303" text-anchor="start" class="d-text-klein">Vision entwickeln</text>
    <rect class="d-flaeche" x="40" y="317" width="304" height="28" rx="6"/>
    <text data-label="kotter-4" x="52" y="336" text-anchor="start" class="d-text-klein">Vision kommunizieren</text>
    <rect class="d-flaeche" x="40" y="350" width="304" height="28" rx="6"/>
    <text data-label="kotter-5" x="52" y="369" text-anchor="start" class="d-text-klein">Befähigung/ Bevollmächtigung</text>
    <rect class="d-flaeche" x="40" y="383" width="304" height="28" rx="6"/>
    <text data-label="kotter-6" x="52" y="402" text-anchor="start" class="d-text-klein">kfr. Ziele erreichen/ Erfolge erzielen</text>
    <rect class="d-flaeche" x="40" y="416" width="304" height="28" rx="6"/>
    <text data-label="kotter-7" x="52" y="435" text-anchor="start" class="d-text-klein">erreichte Ziele/ Erfolge sichern</text>
    <rect class="d-flaeche" x="40" y="449" width="304" height="28" rx="6"/>
    <text data-label="kotter-8" x="52" y="468" text-anchor="start" class="d-text-klein">Konsolidierung/ Change kultivieren</text>

    <text data-label="t-kurve" x="16" y="536" text-anchor="start" class="d-text-titel">Change-Kurve</text>

    <text data-label="leistungsniveau" x="180" y="562" text-anchor="start" class="d-text-klein">Leistungsniveau</text>
    <line class="d-linie-duenn" x1="176" y1="574" x2="336" y2="574"/>
    <polygon class="d-pfeilspitze" points="0,-9 -6,4 6,4" transform="translate(348,574) rotate(90)"/>
    <line class="d-linie-duenn" x1="16" y1="580" x2="16" y2="1006"/>
    <polygon class="d-pfeilspitze" points="0,-9 -6,4 6,4" transform="translate(16,1018) rotate(180)"/>
    <text data-label="zeit" x="30" y="1016" text-anchor="start" class="d-text-fett">Zeit</text>

    <line class="d-linie-duenn" x1="316" y1="580" x2="316" y2="1000"/>
    <text data-label="hundert-ist" x="352" y="1020" text-anchor="end" class="d-text-akzent">100% bzw. IST</text>

    <path class="d-linie-gestrichelt" d="M 176 619 L 304 619"/>
    <path class="d-linie-gestrichelt" d="M 176 664 L 267 664"/>
    <path class="d-linie-gestrichelt" d="M 176 712 L 288 712"/>
    <path class="d-linie-gestrichelt" d="M 176 762 L 234 762"/>
    <path class="d-linie-gestrichelt" d="M 176 876 L 235 876"/>
    <path class="d-linie-gestrichelt" d="M 176 927 L 273 927"/>
    <path class="d-linie-gestrichelt" d="M 176 976 L 317 976"/>

    <path class="d-kurve" d="M 311 592 C 315 601 317 611 316 619 C 315 633 286 645 279 664 C 272 683 291 702 300 712 C 312 726 276 743 246 762 C 217 779 200 792 191 807 C 180 826 222 857 247 876 C 271 893 275 909 285 927 C 298 947 321 962 329 976 C 333 984 334 990 334 995"/>

    <circle class="d-punkt" cx="316" cy="619" r="5"/>
    <circle class="d-punkt" cx="279" cy="664" r="5"/>
    <circle class="d-punkt" cx="300" cy="712" r="5"/>
    <circle class="d-punkt" cx="246" cy="762" r="5"/>
    <circle class="d-punkt" cx="191" cy="807" r="5"/>
    <circle class="d-punkt" cx="247" cy="876" r="5"/>
    <circle class="d-punkt" cx="285" cy="927" r="5"/>
    <circle class="d-punkt" cx="329" cy="976" r="5"/>

    <line class="d-linie-akzent" x1="205" y1="807" x2="302" y2="807"/>
    <polygon class="d-pfeilspitze-akzent" points="0,-11 -7,5 7,5" transform="translate(191,807) rotate(-90)"/>
    <polygon class="d-pfeilspitze-akzent" points="0,-11 -7,5 7,5" transform="translate(316,807) rotate(90)"/>

    <text data-label="st-1" x="170" y="614" text-anchor="end" class="d-text-fett"><tspan x="170" y="614">Vorahnung/ </tspan><tspan x="170" y="631">Gerüchte</tspan></text>
    <text data-label="st-2" x="170" y="659" text-anchor="end" class="d-text-fett"><tspan x="170" y="659">Irritation/ </tspan><tspan x="170" y="676">Schock</tspan></text>
    <text data-label="st-3" x="170" y="707" text-anchor="end" class="d-text-fett"><tspan x="170" y="707">Verneinung/ </tspan><tspan x="170" y="724">Abwehr</tspan></text>
    <text data-label="st-4" x="170" y="757" text-anchor="end" class="d-text-fett"><tspan x="170" y="757">rationale </tspan><tspan x="170" y="774">Akzeptanz</tspan></text>
    <text data-label="st-5" x="170" y="802" text-anchor="end" class="d-text-fett"><tspan x="170" y="802">emotionale </tspan><tspan x="170" y="819">Akzeptanz</tspan></text>
    <text data-label="ausrufezeichen" x="176" y="796" text-anchor="start" class="d-text-akzent">!</text>
    <text data-label="st-6" x="170" y="871" text-anchor="end" class="d-text-fett"><tspan x="170" y="871">Anpassung, </tspan><tspan x="170" y="888">Lernen</tspan></text>
    <text data-label="st-7" x="170" y="922" text-anchor="end" class="d-text-fett"><tspan x="170" y="922">Erkenntnis, </tspan><tspan x="170" y="939">Aha-Effekt!</tspan></text>
    <text data-label="st-8" x="170" y="971" text-anchor="end" class="d-text-fett"><tspan x="170" y="971">Integration/ </tspan><tspan x="170" y="988">Manifestation</tspan></text>

    <text data-label="projekt-phasen" x="16" y="1066" text-anchor="start" class="d-text">Projekt-Phasen:</text>
    <line class="d-linie-duenn" x1="16" y1="1073" x2="134" y2="1073"/>

    <line class="d-linie-gestrichelt" x1="24" y1="1084" x2="24" y2="1212"/>
    <polygon class="d-pfeilspitze" points="0,-8 -5,3 5,3" transform="translate(24,1089) rotate(90)"/>
    <text data-label="ph-1" x="40" y="1094" text-anchor="start" class="d-text-klein">Entscheidung</text>
    <polygon class="d-pfeilspitze" points="0,-8 -5,3 5,3" transform="translate(24,1119) rotate(90)"/>
    <text data-label="ph-2" x="40" y="1124" text-anchor="start" class="d-text-klein">Ankündigung</text>
    <polygon class="d-pfeilspitze" points="0,-8 -5,3 5,3" transform="translate(24,1149) rotate(90)"/>
    <text data-label="ph-3" x="40" y="1154" text-anchor="start" class="d-text-klein">Konzeption</text>
    <polygon class="d-pfeilspitze" points="0,-8 -5,3 5,3" transform="translate(24,1179) rotate(90)"/>
    <text data-label="ph-4" x="40" y="1184" text-anchor="start" class="d-text-klein">Umsetzung</text>
    <polygon class="d-pfeilspitze" points="0,-8 -5,3 5,3" transform="translate(24,1209) rotate(90)"/>
    <text data-label="ph-5" x="40" y="1214" text-anchor="start" class="d-text-klein">Roll-out</text>

    <rect class="d-akzentflaeche" x="16" y="1244" width="328" height="62" rx="8"/>
    <text data-label="hinweis-strukturen" x="32" y="1272" text-anchor="start" class="d-text-akzent"><tspan x="32" y="1272">STRUKTUREN/PROZESSE -&gt; </tspan><tspan x="32" y="1293">Changes greif-/erlebbar machen!</tspan></text>

    <rect class="d-flaeche-leer" x="16" y="1320" width="328" height="58" rx="8"/>
    <text data-label="hinweis-evidenz" x="32" y="1346" text-anchor="start" class="d-text-mittel"><tspan x="32" y="1346">ABER: nicht evidenzbasiert, </tspan><tspan x="32" y="1366">nicht empirisch belegt!</tspan></text>

    <text data-label="management-aufgaben" x="16" y="1406" text-anchor="start" class="d-text-fett">Management-Aufgaben</text>
    <rect class="d-flaeche" x="16" y="1418" width="328" height="178" rx="8"/>

    <text data-label="ma-1" x="32" y="1442" text-anchor="start" class="d-text-klein">Information/Kommunikation/Einbinden</text>
    <line class="d-linie-duenn" x1="40" y1="1452" x2="138" y2="1452"/>
    <polygon class="d-pfeilspitze" points="0,-8 -5,3 5,3" transform="translate(32,1452) rotate(270)"/>
    <polygon class="d-pfeilspitze" points="0,-8 -5,3 5,3" transform="translate(146,1452) rotate(90)"/>

    <text data-label="ma-2" x="66" y="1476" text-anchor="start" class="d-text-klein"><tspan x="66" y="1476">Aufbau Fähigkeiten/Tools/</tspan><tspan x="66" y="1493">Durchbruchsthemen</tspan></text>
    <line class="d-linie-duenn" x1="74" y1="1503" x2="222" y2="1503"/>
    <polygon class="d-pfeilspitze" points="0,-8 -5,3 5,3" transform="translate(66,1503) rotate(270)"/>
    <polygon class="d-pfeilspitze" points="0,-8 -5,3 5,3" transform="translate(230,1503) rotate(90)"/>

    <text data-label="ma-3" x="138" y="1527" text-anchor="start" class="d-text-klein">Coaching</text>
    <line class="d-linie-duenn" x1="146" y1="1537" x2="271" y2="1537"/>
    <polygon class="d-pfeilspitze" points="0,-8 -5,3 5,3" transform="translate(138,1537) rotate(270)"/>
    <polygon class="d-pfeilspitze" points="0,-8 -5,3 5,3" transform="translate(279,1537) rotate(90)"/>

    <text data-label="ma-4" x="188" y="1561" text-anchor="start" class="d-text-klein">Controlling/Monitoring</text>
    <line class="d-linie-duenn" x1="196" y1="1571" x2="298" y2="1571"/>
    <polygon class="d-pfeilspitze" points="0,-8 -5,3 5,3" transform="translate(188,1571) rotate(270)"/>
    <polygon class="d-pfeilspitze" points="0,-8 -5,3 5,3" transform="translate(306,1571) rotate(90)"/>
  </g>`,
  labels: [
    { id: 't-modelle', text: 'Change-Modelle', abfragbar: false, gruppe: 'gliederung' },
    { id: 'lewin-titel', text: 'Kurt Lewins 3-Schritt-Modell (1951)', abfragbar: false, gruppe: 'gliederung' },
    { id: 'lewin-1', text: 'Auftauen', abfragbar: true, gruppe: 'lewin' },
    { id: 'lewin-2', text: 'Verändern', abfragbar: true, gruppe: 'lewin' },
    { id: 'lewin-3', text: 'Einfrieren', abfragbar: true, gruppe: 'lewin' },
    { id: 'kotter-titel', text: 'John Kotters 8-Schritt-Modell (1995)', abfragbar: false, gruppe: 'gliederung' },
    { id: 'kotter-1', text: 'Dringlichkeit erzeugen', abfragbar: true, gruppe: 'kotter' },
    { id: 'kotter-2', text: 'Etablierung Führungsteam', abfragbar: true, gruppe: 'kotter' },
    { id: 'kotter-3', text: 'Vision entwickeln', abfragbar: true, gruppe: 'kotter' },
    { id: 'kotter-4', text: 'Vision kommunizieren', abfragbar: true, gruppe: 'kotter' },
    { id: 'kotter-5', text: 'Befähigung/ Bevollmächtigung', abfragbar: true, gruppe: 'kotter' },
    { id: 'kotter-6', text: 'kfr. Ziele erreichen/ Erfolge erzielen', abfragbar: true, gruppe: 'kotter' },
    { id: 'kotter-7', text: 'erreichte Ziele/ Erfolge sichern', abfragbar: true, gruppe: 'kotter' },
    { id: 'kotter-8', text: 'Konsolidierung/ Change kultivieren', abfragbar: true, gruppe: 'kotter' },
    { id: 't-kurve', text: 'Change-Kurve', abfragbar: false, gruppe: 'gliederung' },
    { id: 'leistungsniveau', text: 'Leistungsniveau', abfragbar: false, gruppe: 'achsen' },
    { id: 'zeit', text: 'Zeit', abfragbar: false, gruppe: 'achsen' },
    { id: 'hundert-ist', text: '100% bzw. IST', abfragbar: false, gruppe: 'achsen' },
    { id: 'st-1', text: 'Vorahnung/ Gerüchte', abfragbar: true, gruppe: 'stationen' },
    { id: 'st-2', text: 'Irritation/ Schock', abfragbar: true, gruppe: 'stationen' },
    { id: 'st-3', text: 'Verneinung/ Abwehr', abfragbar: true, gruppe: 'stationen' },
    { id: 'st-4', text: 'rationale Akzeptanz', abfragbar: true, gruppe: 'stationen' },
    { id: 'st-5', text: 'emotionale Akzeptanz', abfragbar: true, gruppe: 'stationen' },
    { id: 'st-6', text: 'Anpassung, Lernen', abfragbar: true, gruppe: 'stationen' },
    { id: 'st-7', text: 'Erkenntnis, Aha-Effekt!', abfragbar: true, gruppe: 'stationen' },
    { id: 'st-8', text: 'Integration/ Manifestation', abfragbar: true, gruppe: 'stationen' },
    { id: 'ausrufezeichen', text: '!', abfragbar: false, gruppe: 'stationen' },
    { id: 'projekt-phasen', text: 'Projekt-Phasen:', abfragbar: false, gruppe: 'phasen' },
    { id: 'ph-1', text: 'Entscheidung', abfragbar: false, gruppe: 'phasen' },
    { id: 'ph-2', text: 'Ankündigung', abfragbar: false, gruppe: 'phasen' },
    { id: 'ph-3', text: 'Konzeption', abfragbar: false, gruppe: 'phasen' },
    { id: 'ph-4', text: 'Umsetzung', abfragbar: false, gruppe: 'phasen' },
    { id: 'ph-5', text: 'Roll-out', abfragbar: false, gruppe: 'phasen' },
    { id: 'hinweis-strukturen', text: 'STRUKTUREN/PROZESSE -> Changes greif-/erlebbar machen!', abfragbar: false, gruppe: 'hinweise' },
    { id: 'hinweis-evidenz', text: 'ABER: nicht evidenzbasiert, nicht empirisch belegt!', abfragbar: false, gruppe: 'hinweise' },
    { id: 'management-aufgaben', text: 'Management-Aufgaben', abfragbar: false, gruppe: 'aufgaben' },
    { id: 'ma-1', text: 'Information/Kommunikation/Einbinden', abfragbar: false, gruppe: 'aufgaben' },
    { id: 'ma-2', text: 'Aufbau Fähigkeiten/Tools/Durchbruchsthemen', abfragbar: false, gruppe: 'aufgaben' },
    { id: 'ma-3', text: 'Coaching', abfragbar: false, gruppe: 'aufgaben' },
    { id: 'ma-4', text: 'Controlling/Monitoring', abfragbar: false, gruppe: 'aufgaben' },
  ],
}
