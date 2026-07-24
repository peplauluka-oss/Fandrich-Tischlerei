# Rechtstexte — offene Punkte & Platzhalter

**Wichtig:** Die Rechtstexte (Impressum, Datenschutz, AGB) sind sorgfältig als **belastbare Entwürfe** erstellt, ersetzen aber **keine anwaltliche Prüfung**. Vor dem Livegang sollten sie – insbesondere die AGB – von einer fachkundigen Stelle (Anwalt/Anwältin, Handwerkskammer-Rechtsberatung) geprüft werden. Nichts wurde erfunden; alle fehlenden verbindlichen Angaben stehen als `[[PLATZHALTER]]` im Code.

## Alle Platzhalter (im Format `[[…]]`)

### Impressum (`src/pages/impressum.astro`)
- `[[GESCHÄFTSFÜHRER]]` — vertretungsberechtigte Geschäftsführung (Vor- und Nachname)
- `[[E-MAIL]]` — offizielle Kontakt-E-Mail (steht zentral in `src/data/site.ts`, `email`)
- `[[REGISTERGERICHT]]` — z. B. Amtsgericht Charlottenburg
- `[[HRB-NUMMER]]` — Handelsregisternummer
- `[[UST-IDNR]]` — USt-IdNr. nach § 27a UStG (falls nicht vorhanden: Abschnitt entfernen)
- `[[HANDWERKSROLLE]]` — Eintragung/Betriebsnummer bei der Handwerkskammer Berlin bestätigen
- `[[VERANTWORTLICHE-PERSON]]` — Verantwortliche:r nach § 18 Abs. 2 MStV (i. d. R. Geschäftsführung)
- `[[BILDNACHWEISE]]` — falls Fremd-/KI-Material verwendet wird, Quelle/Lizenz ergänzen

### Datenschutz (`src/pages/datenschutz.astro`)
- `[[GESCHÄFTSFÜHRER]]`, `[[E-MAIL]]` — wie oben
- `[[AUFTRAGSVERARBEITUNG-HOSTING]]` — AV-Vertrag/DPA mit GitHub dokumentieren (GitHub Pages ist als Host bereits korrekt benannt)
- `[[FORMULAR-BACKEND]]` — **wichtig:** Wohin sendet das Kontaktformular technisch? Der Dienstleister (z. B. Formspree, Netlify Forms, eigener Mailserver) ist Auftragsverarbeiter und muss benannt werden. Solange kein Backend angebunden ist, bitte klären.
- `[[FORMULAR-DRITTLAND]]` — falls der Formular-Anbieter außerhalb der EU sitzt, Grundlage/DPF ergänzen

### AGB (`src/pages/agb.astro`)
- `[[E-MAIL]]` — wie oben
- `[[BINDEFRIST]]` — Bindefrist verbindlicher Angebote (z. B. 14 Tage)
- `[[STUNDENSATZ]]` — Stundensatz für Regie-/Stundenlohnarbeiten
- `[[ZAHLUNGSZIEL]]` — Zahlungsziel (z. B. 14 Tage)

## Abwägung: AGB überhaupt verwenden?

Für einen Tischlereibetrieb mit **Werkverträgen** (Maßanfertigung, Reparatur, Montage) sind AGB sinnvoll — sie regeln u. a. Abnahme (§ 640 BGB), Abschlagszahlungen (§ 632a BGB), Eigentumsvorbehalt und die **Widerrufsbelehrung für außerhalb der Geschäftsräume geschlossene Verträge** (bei Kundenterminen zu Hause praxisrelevant!). Die Entwurfs-AGB sind bewusst B2C/B2B-getrennt und enthalten die Muster-Widerrufsbelehrung inkl. Erlöschen bei Maßanfertigung (§ 312g Abs. 2 Nr. 1 BGB).

**Entscheidung durch den Betrieb nötig:** Sollen die AGB aktiv einbezogen werden (Hinweis im Angebot/Auftragsformular „Es gelten unsere AGB“)? Ohne wirksame Einbeziehung gelten sie nicht. Empfehlung: ja, aber **nach anwaltlicher Prüfung** der konkreten Sätze/Fristen.

## Umgesetzt (kein Handlungsbedarf)

- Impressum: § 5 DDG-Struktur, § 18 MStV, Berufsbezeichnung/Kammer, Verbraucherstreitbeilegung (OS-Plattform-Einstellung 2025 korrekt berücksichtigt).
- Datenschutz: GitHub-Pages-Hosting + USA/DPF, Kontaktformular, OpenStreetMap-Zwei-Klick, **self-hosted Fonts (keine Google-Übermittlung)**, kein Tracking/keine Cookies, vollständige Betroffenenrechte + Aufsichtsbehörde Berlin (mit Anschrift).
- Alle drei Seiten: gleiche Typografie, aus dem Footer verlinkt, untereinander verlinkt, **indexierbar** (kein `noindex`, gemäß Vorgabe).
- `Stand`-Datum gesetzt (Juli 2026) — beim Livegang aktualisieren.
