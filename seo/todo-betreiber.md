# To-do für den Betrieb — was nur ihr liefern könnt

Diese Punkte kann die Website technisch nicht selbst lösen. Sie haben den größten Hebel für die lokale Sichtbarkeit — bitte der Reihe nach abarbeiten.

## 1 · Eigene Domain (höchste Priorität)

Die aktuelle Adresse `peplauluka-oss.github.io/Fandrich-Tischlerei` ist für Local SEO ein **erheblicher Nachteil** (Subdomain eines Fremdanbieters, keine Marke, kein Vertrauen, schlechtes Ranking-Signal).

- **Empfehlung:** eigene Domain registrieren, z. B. `tischlerei-fandrich-berlin.de` oder `fandrich-tischlerei.de`.
- Kann weiterhin kostenlos über GitHub Pages ausgeliefert werden (Custom Domain + HTTPS ist eingebaut).
- Danach: alte URL per Weiterleitung auf die neue Domain, Google Search Console mit neuer Domain einrichten.

## 2 · Google Business Profile (unverzichtbar für lokale Suche)

- Profil anlegen/übernehmen: **Tischlerei Fandrich GmbH**, Kategorie „Tischler" / „Möbelrestaurierung".
- Adresse, Telefon, Öffnungszeiten (Mo–Fr 7–16 Uhr), Website-Link, echte Fotos (Werkstatt, Projekte).
- Leistungen + Einsatzgebiet „Berlin und Umgebung" eintragen.
- **Kundenbewertungen aktiv einsammeln** — der stärkste lokale Ranking- und Vertrauensfaktor.

## 3 · NAP-Konsistenz + Branchenverzeichnisse

**NAP = Name, Adresse, Telefon — überall ZEICHENGENAU identisch:**

> Tischlerei Fandrich GmbH · Treseburger Straße 30 · 13129 Berlin · 030 36 44 57 60

Eintragen/prüfen in: Handwerkskammer Berlin (Verzeichnis), Das Örtliche / Gelbe Seiten, Bing Places, Apple Maps, wlw, 11880. Uneinheitliche Schreibweisen (z. B. „Str." vs. „Straße") schwächen das Ranking.

## 4 · Offene Stammdaten (blockieren Texte & JSON-LD)

Diese Werte stehen in `src/data/site.ts` als `TODO` und werden aktuell bewusst **nicht erfunden**:

| Wert | Status | Wirkung, sobald geliefert |
|---|---|---|
| **E-Mail-Adresse** | fehlt (leer) | erscheint in Kontakt/Footer/Formular + JSON-LD `email` |
| **Gründungsjahr** | unbestätigt (Schild „seit 19??") | Manifest-Satz + JSON-LD `foundingDate` + Vertrauensanker („seit 19XX") |
| **Exakte Geo-Koordinaten** | Näherung | präziserer Map-Pin + `geo` im Schema |
| **Öffnungszeiten** | angenommen Mo–Fr 7–16 | bestätigen/anpassen (Schema nutzt es bereits) |
| **Telefon & Adresse** | angenommen | final bestätigen (NAP-Basis) |

## 5 · Rechtstexte (für Phase 5 zwingend nötig)

Für ein rechtssicheres Impressum fehlen verbindliche Angaben — bitte liefern (werden als `[[PLATZHALTER]]` geführt, nichts wird erfunden):

- Vertretungsberechtigte(r) **Geschäftsführer**
- **Registergericht + HRB-Nummer**
- **USt-IdNr.** (falls vorhanden)
- Zuständige **Handwerkskammer** (Berlin) + Eintrag Handwerksrolle
- **Kontaktformular-Backend:** Wohin gehen die Formulardaten technisch? (Dienstleister = Auftragsverarbeiter, muss in der Datenschutzerklärung benannt werden.)

## 6 · Conversion / Vertrauen (Phase 6)

- **Kostenlose Erstberatung/Besichtigung?** Ja/Nein + Bedingungen (für „Risiko-Umkehr"-CTA).
- **2–3 echte Kundenstimmen** (Name/Kürzel + O-Ton) für Social Proof.
- **Referenzen konkretisieren:** Seit wann Rahmenverträge/Zusammenarbeit mit GESOBAU, HOWOGE etc.? (Ein Satz genügt.)
- Zahlen, falls vorhanden: Mitarbeiterzahl, Projekte/Jahr.

---

*Sobald Punkt 4/5 geliefert sind, setze ich die Platzhalter live und ergänze `foundingDate`, `email` etc. im Schema.*
