// Folie 43: Quellen der Motivation. Blütenförmiges Schaubild - sechs Kreise um die Mitte "Motivation".
// Eigene Zeichnung; Beschriftungen, Anordnung im Uhrzeigersinn und Überlappung aus folie-15.md.
// Die Folie nennt die sechs Quellen nur, sie erklärt sie nicht; keine Pfeile, keine Legende.
export default {
  id: 'motivation-quellen',
  titel: 'Quellen der Motivation',
  folien: [43],
  viewBox: '0 0 800 560',
  beschreibung: 'Sechs Quellen liegen wie Blütenblätter um die Motivation in der Mitte: Aufgabe, Führung, Team/Gruppe, Organisation, Gesellschaft und Ich /Selbst.',
  svg: `
    <text data-label="titel" x="400" y="30" text-anchor="middle" class="d-text-titel">Quellen der Motivation</text>

    <circle cx="400" cy="150" r="105" class="d-flaeche-leer"/>
    <circle cx="529.9" cy="225" r="105" class="d-flaeche-leer"/>
    <circle cx="529.9" cy="375" r="105" class="d-flaeche-leer"/>
    <circle cx="400" cy="450" r="105" class="d-flaeche-leer"/>
    <circle cx="270.1" cy="375" r="105" class="d-flaeche-leer"/>
    <circle cx="270.1" cy="225" r="105" class="d-flaeche-leer"/>

    <circle cx="400" cy="300" r="82" class="d-flaeche"/>
    <text data-label="mitte" x="400" y="306" text-anchor="middle" class="d-text-fett">Motivation</text>

    <text data-label="quelle-1" x="400" y="172" text-anchor="middle" class="d-text-fett">Aufgabe</text>
    <text data-label="quelle-2" x="511" y="236" text-anchor="middle" class="d-text-fett">Führung</text>
    <text data-label="quelle-3" x="523" y="364" text-anchor="middle" class="d-text-fett">Team/Gruppe</text>
    <text data-label="quelle-4" x="400" y="428" text-anchor="middle" class="d-text-fett">Organisation</text>
    <text data-label="quelle-5" x="285" y="364" text-anchor="middle" class="d-text-fett">Gesellschaft</text>
    <text data-label="quelle-6" x="285" y="236" text-anchor="middle" class="d-text-fett">Ich /Selbst</text>
  `,
  // Hochkant: dieselbe Bluete, nur kleiner gezeichnet; Anordnung und Reihenfolge der sechs Quellen
  // bleiben unveraendert, damit die Lage im Uhrzeigersinn erhalten bleibt.
  viewBoxSchmal: '0 0 360 456',
  svgSchmal: `
    <text data-label="titel" x="180" y="26" text-anchor="middle" class="d-text-titel">Quellen der Motivation</text>

    <circle cx="180" cy="156" r="74" class="d-flaeche-leer"/>
    <circle cx="272" cy="209" r="74" class="d-flaeche-leer"/>
    <circle cx="272" cy="315" r="74" class="d-flaeche-leer"/>
    <circle cx="180" cy="368" r="74" class="d-flaeche-leer"/>
    <circle cx="88" cy="315" r="74" class="d-flaeche-leer"/>
    <circle cx="88" cy="209" r="74" class="d-flaeche-leer"/>

    <circle cx="180" cy="262" r="58" class="d-flaeche"/>
    <text data-label="mitte" x="180" y="268" text-anchor="middle" class="d-text-fett">Motivation</text>

    <text data-label="quelle-1" x="180" y="174" text-anchor="middle" class="d-text-fett">Aufgabe</text>
    <text data-label="quelle-2" x="266" y="217" text-anchor="middle" class="d-text-fett">Führung</text>
    <text data-label="quelle-3" x="278" y="307" text-anchor="middle" class="d-text-fett">Team/Gruppe</text>
    <text data-label="quelle-4" x="180" y="352" text-anchor="middle" class="d-text-fett">Organisation</text>
    <text data-label="quelle-5" x="86" y="307" text-anchor="middle" class="d-text-fett">Gesellschaft</text>
    <text data-label="quelle-6" x="94" y="217" text-anchor="middle" class="d-text-fett">Ich /Selbst</text>
  `,
  labels: [
    { id: 'titel', text: 'Quellen der Motivation', abfragbar: false, gruppe: 'rahmen' },
    { id: 'mitte', text: 'Motivation', abfragbar: false, gruppe: 'zentrum' },
    { id: 'quelle-1', text: 'Aufgabe', abfragbar: true, gruppe: 'quellen' },
    { id: 'quelle-2', text: 'Führung', abfragbar: true, gruppe: 'quellen' },
    { id: 'quelle-3', text: 'Team/Gruppe', abfragbar: true, gruppe: 'quellen' },
    { id: 'quelle-4', text: 'Organisation', abfragbar: true, gruppe: 'quellen' },
    { id: 'quelle-5', text: 'Gesellschaft', abfragbar: true, gruppe: 'quellen' },
    { id: 'quelle-6', text: 'Ich /Selbst', abfragbar: true, gruppe: 'quellen' },
  ],
}
