// Ansicht "Quellen und Transparenz" (#/quellen): woher jeder Inhalt stammt. Die Seite legt offen, welche
// Folie in welchem Thema steckt, welche im Skript verlinkte Quelle erreichbar war und welche Stellen das
// Skript offen lässt. Gerechnet wird hier nur an den Daten (welche Folie kommt in welchem Thema vor),
// nicht am Lernstand.
import { h, mini, symbol, folienText } from '../mini.js'

// Der Foliensatz des Repetitoriums trägt die Nummern 30 bis 84. Themen außerhalb dieses Bereichs weiten
// die Tabelle aus, statt aus ihr herauszufallen.
const ERSTE_FOLIE = 30
const LETZTE_FOLIE = 84

const STATUS = {
  ja: { text: 'vollständig ausgewertet', chip: 'marke-chip--gut', symbolName: 'haken' },
  teilweise: { text: 'teilweise ausgewertet', chip: 'marke-chip--mittel', symbolName: 'frage' },
  nein: { text: 'nicht zugänglich', chip: 'marke-chip--schlecht', symbolName: 'kreuz' },
}

function gastgeber(url) {
  try { return new URL(url).hostname.replace(/^www\./, '') } catch (e) { return url }
}

/** Welche Themen behandeln welche Folie, und welche Themen tragen gar keine Foliennummer. */
function baueAbdeckung(daten) {
  const proFolie = new Map()
  const ohneFolie = []
  for (const th of daten.alleThemen || []) {
    const folien = th.folien || []
    if (!folien.length) { ohneFolie.push(th); continue }
    for (const nummer of folien) {
      if (!proFolie.has(nummer)) proFolie.set(nummer, [])
      proFolie.get(nummer).push(th)
    }
  }
  const nummern = [...proFolie.keys()]
  const von = Math.min(ERSTE_FOLIE, ...nummern)
  const bis = Math.max(LETZTE_FOLIE, ...nummern)
  const zeilen = []
  for (let n = von; n <= bis; n++) zeilen.push({ nummer: n, themen: proFolie.get(n) || [] })
  return { zeilen, ohneFolie, von, bis, belegt: zeilen.filter((z) => z.themen.length).length }
}

/** Alle Stellen, die der Dozent im Skript leer gelassen hat, mit ihrem Thema und ihrer Lernkarte. */
function sammleLuecken(daten) {
  const aus = []
  for (const th of daten.alleThemen || []) {
    for (const karte of th.lernkarten || []) {
      for (const block of karte.bloecke || []) {
        if (block.typ === 'skriptluecke') aus.push({ thema: th, karte, block })
      }
    }
  }
  return aus
}

export default {
  titel: 'Quellen und Transparenz',
  schmal: true,

  render(host, params, app) {
    const daten = app.daten
    const quellen = (daten.quellen && daten.quellen.quellen) || []
    const nurGenannt = (daten.quellen && daten.quellen.nurGenannt) || []
    const abdeckung = baueAbdeckung(daten)
    const luecken = sammleLuecken(daten)

    host.appendChild(h('header.seitenkopf',
      h('p.seitenkopf__ueber', 'Transparenz'),
      h('h1', 'Quellen und Transparenz'),
      h('p', 'Hier steht, woher jeder Inhalt dieser Lernumgebung kommt und wo etwas fehlt.')))

    // ---------- Grundsatz ----------

    host.appendChild(h('section.karte.quellen__grundsatz', { 'aria-label': 'Grundsatz der Quellenbindung' },
      h('div.karte__ueber', 'Grundsatz'),
      h('h2.karte__titel', 'Alles kommt aus dem Skript'),
      h('p', 'Alle Fachinhalte dieser Lernumgebung stammen aus dem Vorlesungsskript zur Mitarbeiterführung und aus den Quellen, auf die das Skript ausdrücklich verweist. An jeder Aufgabe steht der wörtliche Ausschnitt, der die Lösung trägt, zusammen mit der Folie, auf der er steht. Was nicht im Skript steht, steht auch hier nicht: keine Definitionen, Jahreszahlen, Zuordnungen oder Beispiele aus anderer Fachliteratur. Schreibweisen und Formulierungen bleiben so, wie das Skript sie benutzt, auch dort, wo andere Bücher es anders schreiben.'),
      h('p.leise', 'Eigene Zutaten sind an Ort und Stelle gekennzeichnet: eine Merkhilfe als „nicht aus dem Skript“, eine konstruierte Situation als „Übungsfall“.')))

    // ---------- Abdeckung ----------

    const fehlende = abdeckung.zeilen.filter((z) => !z.themen.length)

    function themenZelle(zeile) {
      if (!zeile.themen.length) {
        return h('span.zeile.abdeckung__fehlt', symbol('kreuz'), h('span', 'keinem Thema zugeordnet'))
      }
      return h('span.zeile.abdeckung__themen',
        zeile.themen.map((th) => h('a.marke-chip.marke-chip--thema', { href: '#/thema/' + th.id }, th.titel)))
    }

    host.appendChild(h('section.quellen__abschnitt', { 'aria-label': 'Abdeckung der Folien' },
      h('h2', 'Welche Folie steckt in welchem Thema'),
      h('p', `Das Repetitorium umfasst die Folien ${abdeckung.von} bis ${abdeckung.bis}. Die Tabelle zeigt zu jeder Folie die Themen, die sie behandeln. So ist nachprüfbar, dass keine Folie unter den Tisch fällt.`),
      h('div.zeile.abdeckung__zahlen',
        h('span.marke-chip.marke-chip--gut', `${abdeckung.belegt} von ${abdeckung.zeilen.length} Folien abgedeckt`),
        fehlende.length
          ? h('span.marke-chip.marke-chip--schlecht', `${fehlende.length} ohne Thema`)
          : h('span.marke-chip', 'keine Lücke')),
      fehlende.length
        ? h('div.hinweiskasten.hinweiskasten--schlecht',
          h('div.hinweiskasten__titel', 'Zu diesen Folien gibt es noch kein Thema'),
          h('p', fehlende.map((z) => z.nummer).join(', ')))
        : null,
      h('p.leise.quellen__tabellenhinweis', 'Die Tabelle rollt in ihrem eigenen Fenster. Zum Weiterlesen der Seite neben der Tabelle wischen.'),
      h('div.tabellenhuelle.quellen__tabelle', { tabindex: '0', role: 'region', 'aria-label': 'Folien und ihre Themen, verschiebbar' },
        h('table.tabelle.abdeckung',
          h('thead', h('tr', h('th', { scope: 'col' }, 'Folie'), h('th', { scope: 'col' }, 'Themen'))),
          h('tbody', abdeckung.zeilen.map((z) => h('tr' + (z.themen.length ? '' : '.abdeckung__zeile--fehlt'),
            h('th', { scope: 'row' }, String(z.nummer)),
            h('td', themenZelle(z))))))),
      abdeckung.ohneFolie.length
        ? h('div.hinweiskasten',
          h('div.hinweiskasten__titel', 'Themen ohne Foliennummer'),
          h('p', 'Diese Themen gehören zu Seiten, die im Skript keine Nummer tragen (Titel, Leseliste, Abschluss).'),
          h('div.zeile', abdeckung.ohneFolie.map((th) => h('a.marke-chip.marke-chip--thema', { href: '#/thema/' + th.id },
            th.titel + (th.quelleText ? ' · ' + th.quelleText : '')))))
        : null))

    // ---------- Externe Quellen ----------

    function quelleEintrag(q) {
      const s = STATUS[q.status] || STATUS.nein
      return h('li.quelle.karte.karte--eng',
        h('h3.quelle__titel', q.titel),
        h('div.zeile.register__marken',
          h('span.marke-chip.' + s.chip, symbol(s.symbolName), s.text),
          q.folie ? h('span.marke-chip.marke-chip--folie', 'verlinkt auf Folie ' + q.folie) : null),
        q.hinweis ? h('p.quelle__hinweis', mini(q.hinweis, { inline: true })) : null,
        q.url
          ? h('p.quelle__url', h('a', { href: q.url, target: '_blank', rel: 'noopener noreferrer' },
            gastgeber(q.url), h('span.nur-vorleser', ', öffnet in einem neuen Tab')))
          : null)
    }

    host.appendChild(h('section.quellen__abschnitt', { 'aria-label': 'Quellen außerhalb des Skripts' },
      h('h2', 'Quellen, auf die das Skript verweist'),
      h('p', 'Das Skript verlinkt Videos und Artikel. Hier steht, was davon erreichbar war und wie es ausgewertet wurde. Was nur teilweise zugänglich war, ist auch nur teilweise verarbeitet.'),
      quellen.length
        ? h('ul.quellenliste', quellen.map(quelleEintrag))
        : h('div.hinweiskasten', h('p', 'Für diese Fassung ist keine verlinkte Quelle vermerkt.'))))

    // ---------- Nur genannt ----------

    host.appendChild(h('section.quellen__abschnitt', { 'aria-label': 'Im Skript nur genannt' },
      h('h2', 'Im Skript nur genannt, nicht erklärt'),
      h('p', 'Diese Begriffe fallen im Skript, ohne dass es sie erklärt. Die Lernumgebung erfindet dazu nichts. Sieh in deiner Mitschrift nach, was in der Vorlesung dazu gesagt wurde.'),
      nurGenannt.length
        ? h('ul.eintragsliste', nurGenannt.map((n) => h('li',
          h('div.eintrag',
            h('div.eintrag__haupt',
              h('div.eintrag__titel', n.begriff),
              n.hinweis ? h('div.eintrag__neben', mini(n.hinweis, { inline: true })) : null),
            h('div.eintrag__rechts', h('span.marke-chip.marke-chip--folie', folienText(n.folie ? [n.folie] : [])))))))
        : h('div.hinweiskasten', h('p', 'Zu dieser Fassung ist nichts vermerkt, was das Skript nur nennt, ohne es zu erklären.'))))

    // ---------- Lücken im Skript ----------

    // Diese Seite zeigt nur, WO das Skript offen bleibt, und wie viel davon schon gefüllt ist. Eingetragen
    // wird die eigene Mitschrift dort, wo sie beim Lernen gebraucht wird: auf der Lernkarte des Themas.
    // Auf dem Lernzettel steht sie danach neben dem Stoff. Eine dritte Eingabestelle hier würde niemand suchen.
    const felder = luecken.flatMap((l) => l.block.felder || [])
    const gefuellt = felder.filter((f) => String(app.speicher.zustand.notizen[f.id] || '').trim()).length

    function lueckeEintrag({ thema, karte, block }) {
      const eigene = (block.felder || []).filter((f) => String(app.speicher.zustand.notizen[f.id] || '').trim())
      const gesamt = (block.felder || []).length
      const voll = gesamt > 0 && eigene.length === gesamt
      return h('article.skriptluecke-karte',
        h('div.zeile.zeile--auseinander.skriptluecke-karte__kopf',
          h('h3.skriptluecke-karte__thema', thema.titel),
          h('span.marke-chip.marke-chip--folie', folienText(karte.folien || thema.folien, thema.quelleText))),
        mini(block.text),
        h('div.zeile.skriptluecke-karte__weg',
          gesamt
            ? h('span.marke-chip.' + (voll ? 'marke-chip--gut' : 'marke-chip--mittel'),
              symbol(voll ? 'haken' : 'frage'),
              `${eigene.length} von ${gesamt} Feldern ausgefüllt`)
            : null,
          h('a.knopf.knopf--klein', { href: '#/thema/' + thema.id },
            symbol('lernen'), 'Auf der Lernkarte eintragen')))
    }

    host.appendChild(h('section.quellen__abschnitt', { 'aria-label': 'Lücken im Skript' },
      h('h2', 'Lücken im Skript'),
      h('p', 'An diesen Stellen hat der Dozent im Skript etwas offen gelassen und es mündlich gefüllt. Die Lernumgebung erfindet dazu nichts. Eintragen kannst du deine Mitschrift auf der Lernkarte des Themas; sie steht danach auch auf deinem Lernzettel.'),
      luecken.length
        ? h('div.stapel',
          h('p.leise.zahl', `${luecken.length === 1 ? 'Eine Lücke' : luecken.length + ' Lücken'} · ${gefuellt} von ${felder.length} Feldern ausgefüllt`),
          luecken.map(lueckeEintrag))
        : h('div.hinweiskasten', h('p', 'In dieser Fassung ist keine offene Stelle im Skript vermerkt.'))))

    return null
  },
}
