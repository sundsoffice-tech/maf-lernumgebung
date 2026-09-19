# MAF Lernumgebung

Interaktive Lernumgebung zur Klausurvorbereitung im Modul Mitarbeiterführung (MAF), Repetitorium der
Vorlesungen I bis VI. Aufruf: https://sundsoffice-tech.github.io/maf-lernumgebung/

## Grundsatz: Quellenbindung

Alle Fachinhalte stammen aus dem Vorlesungsskript und aus den Quellen, auf die das Skript selbst verlinkt.
Jede Aufgabe trägt ein wörtliches Zitat als Beleg; `werkzeug/pruefe_belege.mjs` prüft mechanisch, dass jedes
dieser Zitate im Quellkorpus steht. Das Skript selbst, die Folienbilder und der Quellkorpus liegen bewusst NICHT
in diesem Repository. Abbildungen sind eigene Zeichnungen, die Aussage und Beschriftung der Folien tragen.
Merkhilfen sind als „nicht aus dem Skript" gekennzeichnet. Stellen, die der Dozent im Skript leer ließ, werden
nicht gefüllt, sondern als Eingabefeld für die eigene Mitschrift angeboten.

## Technik

Reines HTML, CSS und JavaScript-Module. Kein Build, kein Framework, keine externen Ressourcen, kein Tracking,
kein Konto. Der Lernstand liegt ausschließlich im Browser des Geräts (Export und Import unter Einstellungen).
Zielgeräte sind iPad und iPhone im Safari; geprüft wird in der Safari-Engine (`werkzeug/webkit_sicht.mjs`,
`werkzeug/webkit_modulprobe.mjs`).

## Prüfwerkzeuge

```
node werkzeug/pruefe_daten.mjs        Datenvertrag
node werkzeug/pruefe_belege.mjs       Belege gegen den Quellkorpus (Korpus liegt außerhalb, MAF_QUELLE)
node werkzeug/pruefe_personen.mjs     Vollständigkeit des Personenregisters
node werkzeug/test_lernmodell.mjs     Lernmodell
node werkzeug/test_aufgaben_*.mjs     Aufgabentypen
node werkzeug/test_alle_inhalte.mjs   baut jede Lernkarte und jede Aufgabe einmal auf
node werkzeug/zeitrechnung.mjs        Zeitbedarf gegen das 10-Stunden-Budget
```

Offene Punkte der jeweiligen Fassung stehen in `OFFEN.md`.
