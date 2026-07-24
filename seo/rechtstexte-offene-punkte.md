# Rechtstexte — Stand & offene Punkte

**Wichtig:** Die Rechtstexte sind sorgfältige, belastbare Entwürfe, ersetzen aber **keine anwaltliche Prüfung** (insbesondere die AGB). Nichts wurde erfunden; noch fehlende verbindliche Angaben stehen als `[[PLATZHALTER]]` im Code.

## ✅ Vom Betrieb geliefert und eingepflegt (Juli 2026)

Zentral in `src/data/site.ts`, wirkt automatisch in Impressum, Datenschutz, AGB, Footer, Kontakt und JSON-LD:

- **Firmierung:** Tischlerei und Möbelrestaurierung Fandrich GmbH
- **Geschäftsführer:** D. Debski und S. Winkler (zugleich Verantwortliche § 18 Abs. 2 MStV)
- **E-Mail:** anfrage@tischlerei-fandrich.de
- **Register:** Amtsgericht Charlottenburg, HRB 80705
- Anschrift/Telefon: bestätigt

## ⚠️ Wichtige Abweichungen von der gelieferten Datenschutz-Vorlage — bitte lesen

Die von dir geschickte Datenschutzerklärung stammt erkennbar von einer **anders gebauten Website**. Mehrere Abschnitte hätten hier **falsche Angaben** erzeugt. Eine Datenschutzerklärung muss die *tatsächliche* Verarbeitung beschreiben — deshalb habe ich diese Punkte **bewusst korrigiert statt kopiert:**

| Vorlage sagte … | Diese Website macht tatsächlich … | Ergebnis im Text |
|---|---|---|
| „Cookies (transient/persistent)" werden gesetzt | **keine Cookies** | „Diese Website verwendet keine Cookies …" |
| „Nutzungsstatistik" (anonymisiert, Cookies 7 Tage) | **keine Statistik/Analyse** | keine Reichweitenmessung |
| „Google Fonts" von externen Servern | **self-hosted Fonts** | „keine Verbindung zu Google Fonts" |
| „Routenplaner **Bing Maps** (Microsoft, USA)" | **OpenStreetMap, Zwei-Klick** | OSM-Abschnitt; ausdrücklich „kein Bing/Google Maps" |
| Hosting nicht genannt | **GitHub Pages (USA, EU-US-DPF)** | Hosting + Drittland offengelegt |
| Log-Löschung „nach 4 Tagen" (eigener Server) | Host = GitHub (Retention nicht durch uns steuerbar) | allgemein formuliert, keine falsche Frist |

→ **Falls die Website später doch Cookies/Statistik/Bing Maps einsetzt**, müssen diese Abschnitte wieder aufgenommen werden. Solange nicht, wäre ihre Nennung falsch.

**EU-OS-Plattform:** Deine Vorlage verlinkt die ODR-Plattform. Diese wurde von der EU **zum 20. Juli 2025 eingestellt** — ein Link darauf ist überholt. Ich habe stattdessen den korrekten Hinweis + deine § 36-VSBG-Erklärung („nicht bereit/verpflichtet") übernommen. Bitte kurz bestätigen, dass das so passt.

## 🔲 Noch offen (Platzhalter im Code)

**Impressum:**
- `[[UST-IDNR]]` — USt-IdNr. nach § 27a UStG (falls vorhanden; sonst Abschnitt streichen)
- `[[HANDWERKSROLLE]]` — Eintragung/Betriebsnummer Handwerkskammer Berlin bestätigen
- `[[BILDNACHWEISE]]` — einige Motive sind gestaltete/generierte Bilder; Quelle/Lizenz klären

**Datenschutz:**
- `[[FORMULAR-BACKEND]]` / `[[FORMULAR-DRITTLAND]]` — **wichtig:** Wohin sendet das Kontaktformular technisch? Anbieter = Auftragsverarbeiter, muss benannt werden.
- `[[AUFTRAGSVERARBEITUNG-HOSTING]]` — AV-Vereinbarung/DPA mit GitHub dokumentieren

**AGB:**
- `[[BINDEFRIST]]`, `[[STUNDENSATZ]]`, `[[ZAHLUNGSZIEL]]` — geschäftliche Eckwerte
- **Abwägung:** AGB nur wirksam, wenn aktiv einbezogen (Hinweis im Angebot). Vor Einsatz anwaltlich prüfen lassen.

## Umgesetzt (kein Handlungsbedarf)

Impressum § 5 DDG / § 18 MStV vollständig; Datenschutz DS-GVO-konform an die **echte** Technik angepasst (GitHub-Hosting, self-hosted Fonts, OSM-Zwei-Klick, keine Cookies/kein Tracking, Betroffenenrechte, Aufsichtsbehörde Berlin); AGB B2C/B2B inkl. Widerrufsbelehrung + Erlöschen bei Maßanfertigung. Alle Seiten indexierbar, im Footer und untereinander verlinkt. Stand: Juli 2026.
