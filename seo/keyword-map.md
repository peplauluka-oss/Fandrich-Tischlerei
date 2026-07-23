# Keyword-Map — Tischlerei Fandrich GmbH

**Phase 1 · Stand:** Entwurf zur Freigabe · **Regel:** 1 Keyword → genau 1 Ziel-URL (keine Kannibalisierung).
Erst nach deiner Freigabe werden in Phase 2+ Texte/Meta geändert. Diese Datei ändert nichts am Livesystem.

## Ziel-URLs (Bestand)

| # | URL (Pfad unter `/Fandrich-Tischlerei`) | Rolle |
|---|---|---|
| S | `/` | Marke + lokale Primär-Keywords + Einstieg |
| L1 | `/leistungen/neuanfertigung` | Neuanfertigung (Möbel/Fenster/Türen nach Maß) |
| L2 | `/leistungen/restaurierung` | Restaurierung (Möbel, Schellack, Kastenfenster **sanieren**) |
| L3 | `/leistungen/reparatur` | Reparatur (Fenster/Türen/Parkett/Treppen/Küchen) |
| L4 | `/leistungen/wartung` | Wartung + **B2B Hausverwaltungen** |
| R1 | `/impressum` (existiert) | Recht, indexierbar |
| R2 | `/datenschutz` (existiert) | Recht, indexierbar |
| R3 | `/agb` (neu, Phase 5) | Recht, indexierbar |

> **Domain-Hinweis (→ `seo/todo-betreiber.md`, Phase 2):** Die Subdomain `peplauluka-oss.github.io` ist für Local SEO ein echter Nachteil. Eigene Domain (z. B. `tischlerei-fandrich-berlin.de`) dringend empfohlen — die Map bleibt gültig, nur der Host wechselt.

---

## 1 · Primär-Zuordnung (Owner je Keyword-Cluster)

### S — Startseite `/`
**Primär (H1-Umfeld/Title/Meta):**
- Tischlerei Berlin Pankow *(Haupt-Keyword)*
- Tischler Pankow
- Meistertischlerei Berlin
- Tischlerei Berlin Nordosten

**Sekundär (Body/Intro, nicht als eigene Landingpage):** Möbeltischlerei Berlin, Bautischlerei Berlin, Meisterbetrieb Tischler Berlin.
Die Startseite rankt für **Marke + Ort**, verteilt die Leistungs-Intents per interner Verlinkung an L1–L4 (kein Leistungs-Longtail auf der Home „parken").

### L1 — Neuanfertigung `/leistungen/neuanfertigung`
- Möbel nach Maß Berlin *(Primär)*
- Einbauschrank nach Maß Berlin
- Einbaumöbel Berlin Pankow
- Holzfenster nach Maß Berlin
- Türen nach Maß Berlin
- *(sekundär)* Küche nach Maß Berlin, Kücheneinbau Berlin

### L2 — Restaurierung `/leistungen/restaurierung`
- Möbelrestaurierung Berlin *(Primär)*
- Schellackpolitur Berlin
- Antikmöbel restaurieren Berlin
- Kastenfenster sanieren Berlin
- *(sekundär)* Denkmalschutz Fenster Berlin, alte Möbel aufarbeiten lassen

### L3 — Reparatur `/leistungen/reparatur`
- Fensterreparatur Berlin *(Primär)*
- Fenster einstellen Berlin
- Kastenfenster Reparatur Altbau
- Zimmertür reparieren Berlin
- Einbruchschutz Tür nachrüsten Berlin
- Parkett reparieren Berlin
- Dielen reparieren Altbau Berlin
- Treppenreparatur Berlin
- Küchenreparatur Berlin

### L4 — Wartung `/leistungen/wartung`
- Fensterwartung Berlin *(Primär B2C)*
- Fensterwartung Hausverwaltung Berlin *(Primär B2B)*
- Tischlerei für Hausverwaltungen Berlin
- *(sekundär)* Beschläge nachstellen Berlin, Fensterdichtungen erneuern Berlin, Objektbetreuung Tischler Berlin

---

## 2 · Kannibalisierungs-Sperren (bewusste Intent-Splits)

Themen, die auf mehreren Seiten auftauchen **könnten**, werden strikt nach **Suchintention** getrennt:

| Thema | nach Maß / neu → **L1** | sanieren / restaurieren → **L2** | reparieren / einstellen → **L3** | pflegen / warten → **L4** |
|---|---|---|---|---|
| **Fenster** | Holzfenster nach Maß Berlin | Kastenfenster sanieren, Denkmalschutz Fenster | Fensterreparatur, Fenster einstellen, „Fenster schließt nicht", Kastenfenster Reparatur Altbau | Fensterwartung, Dichtungen, Beschläge |
| **Türen** | Türen nach Maß Berlin | (Restaurierung hist. Türen: als Body-Erwähnung L2, kein eigenes KW) | Zimmertür reparieren, Einbruchschutz nachrüsten, „Tür klemmt" | — |
| **Möbel** | Möbel/Einbaumöbel/Einbauschrank nach Maß | Möbelrestaurierung, Antikmöbel, Schellack | — | — |
| **Küche** | Küche nach Maß / Kücheneinbau | — | Küchenreparatur | — |

**Regeln:**
- „Kastenfenster" nie mit identischem Fokus auf L2 **und** L3 — L2 = *sanieren/erhalten*, L3 = *einzelne Reparatur/einstellen*. In Titles/H1 der jeweilige Intent-Begriff, nicht beide.
- „Berlin-Pankow" ist der ehrliche Standort-Anker aller Seiten; die **Unterscheidung der Titles läuft über die Leistung**, nicht über wechselnde Ortsteile (kein Fake-Geo).

---

## 3 · Geo-Modifier — Einsatzgebiet Nordosten

**Standort-Anker (überall identisch, NAP-konsistent):** Berlin-Pankow, Treseburger Straße 30, 13129.

**Verteilung der Ortsteile** — organisch im jeweiligen „Einsatzgebiet"-Absatz, **nicht** als Footer-Liste. Pro Seite ein rotierender Schwerpunkt, damit kein dünner Duplicate-Text entsteht:

| URL | Geo-Schwerpunkt im Fließtext | Bezirk |
|---|---|---|
| S | Pankow, Prenzlauer Berg, Weißensee, Lichtenberg — „im Berliner Nordosten" (Überblick, beide Bezirke) | Pankow + Lichtenberg |
| L1 | Prenzlauer Berg, Niederschönhausen, Karlshorst (Altbau-Maßmöbel) | gemischt |
| L2 | Prenzlauer Berg, Weißensee, Alt-Hohenschönhausen (Altbau/Denkmal) | gemischt |
| L3 | Pankow, Heinersdorf, Fennpfuhl, Friedrichsfelde (Reparatur wohnungsnah) | gemischt |
| L4 | Buch, Karow, Neu-Hohenschönhausen, Marzahn (Großwohnanlagen → B2B) | Pankow + Lichtenberg |

**Ortsteil-Pool (nur ehrlich einsetzen, keine Aufzählungs-Wüste):**
- **Pankow:** Pankow, Prenzlauer Berg, Weißensee, Niederschönhausen, Heinersdorf, Blankenburg, Karow, Buch, Französisch Buchholz, Wilhelmsruh, Rosenthal, Blankenfelde
- **Lichtenberg:** Lichtenberg, Alt-Hohenschönhausen, Neu-Hohenschönhausen, Fennpfuhl, Rummelsburg, Karlshorst, Friedrichsfelde, Falkenberg, Malchow, Wartenberg
- **Sekundär (nur streifen):** Mitte, Friedrichshain, Marzahn

**Bestehender guter Ansatz** (beibehalten/ausbauen): echte Ortsbezüge in Projekt-Captions wie „Einbaubibliothek — Prenzlauer Berg", „Fensterbank mit Stauraum — Pankow".

---

## 4 · Long-Tail / Intent-Keywords → FAQ & Body

| Suchanfrage (Intent) | Ziel-URL | Platzierung |
|---|---|---|
| „Kastenfenster reparieren oder austauschen?" | L2 (Erhalt-Argument) + Querlink L3 | Mini-FAQ L2 |
| „Was kostet ein Einbauschrank nach Maß?" | L1 | Mini-FAQ L1 + Prozess-Block |
| „Fenster schließt nicht richtig" | L3 | H2/FAQ L3 |
| „alte Möbel aufarbeiten lassen" | L2 | Intro/FAQ L2 |
| „Tischler Notdienst / Tür klemmt" | L3 | FAQ L3 (ehrlich: kein 24/7-Notdienst? → mit Kunde klären, `todo-betreiber.md`) |
| „Denkmalschutz Fenster Berlin" | L2 | H2/Body L2 |
| „lohnt sich Reparatur vs. Neukauf" | L3 | FAQ L3 (Einwandbehandlung, Phase 6) |
| „Wie läuft eine Anfrage ab / wer kommt zu mir?" | alle L + S | „So läuft's ab"-Block (Phase 3) |

Bestehende zentrale FAQ-Sektion (Startseite) behält allgemeine Vertrauensfragen; leistungsspezifische Fragen wandern in die jeweilige Mini-FAQ (mit `FAQPage`-Schema, Phase 2) — so keine Doppelung.

---

## 5 · Title/Meta-Muster (Vorschau, Umsetzung Phase 2)

| URL | Title (≤ 60 Z.) | Meta-Description (140–155 Z., Nutzen + CTA) |
|---|---|---|
| S | `Tischlerei Berlin-Pankow · Meisterbetrieb | Fandrich` | Meistertischlerei im Berliner Nordosten: Möbel nach Maß, Fenster, Türen, Restaurierung & Reparatur. Aus einer Hand — Antwort binnen 24 h. |
| L1 | `Möbel & Einbauschränke nach Maß in Berlin-Pankow` | Einbaumöbel, Holzfenster und Türen nach Maß vom Meisterbetrieb in Pankow — Aufmaß, Fertigung, Montage aus einer Hand. Jetzt anfragen. |
| L2 | `Möbelrestaurierung & Kastenfenster-Sanierung Berlin` | Schellackpolitur, Antikmöbel, Kastenfenster fachgerecht saniert im Berliner Nordosten. Stücke mit Geschichte erhalten. Unverbindlich anfragen. |
| L3 | `Fenster- & Türreparatur in Berlin-Pankow | Fandrich` | Fenster einstellen, Türen, Parkett, Treppen und Küchen reparieren — schnell und sauber im Nordosten Berlins. Schaden schildern, wir melden uns. |
| L4 | `Fensterwartung Berlin — auch für Hausverwaltungen` | Wartung von Fenstern & Türen für Privat und Hausverwaltungen: Beschläge, Dichtungen, Objektbetreuung. Ein Ansprechpartner, kurze Wege. |

*(Titles sind Entwürfe; Zeichenzahl in Phase 2 final geprüft.)*

---

## 6 · Interne Verlinkung (Ankertext = Keyword)

- **S → L1–L4:** je Card-Link „Mehr erfahren" ergänzen um keyword-tragende Kontextlinks im Fließtext (z. B. „Möbel nach Maß", „Kastenfenster sanieren").
- **L1 ↔ L2/L3:** Neuanfertigung ↔ Restaurierung (Erhalt vs. Neu), Neuanfertigung → Reparatur (Ergänzung).
- **L2 → L3:** „Kastenfenster sanieren" ↔ „einzelne Fensterreparatur".
- **L3 → L4:** „Reparatur" → „regelmäßige Wartung".
- **L4 → S/Kontakt:** B2B-CTA → Kontakt.
- **Alle L → Kontaktsektion** mit keyword-nahem Ankertext, nie „hier klicken".

---

## 7 · Offene Punkte / Freigabe nötig

1. **Notdienst?** Gibt es einen (Tür klemmt / Notfall)? Wenn nein, „Notdienst"-Longtail streichen — nichts erfinden.
2. **Küche nach Maß** wirklich im Angebot (L1) oder nur Reparatur/Montage (L3)? Aktuell Annahme: beides, getrennt nach Intent.
3. **Ortsteil-Ehrlichkeit:** Ist Lichtenberg (Karlshorst, Friedrichsfelde …) tatsächlich Einsatzgebiet? Wenn Fokus enger, Pool kürzen.
4. **Title-Anker:** durchgängig „Berlin-Pankow" ok, oder sollen einzelne Seiten andere Ortsteile führen?

→ Nach deiner Freigabe (ggf. mit Korrekturen zu 1–4) starte ich **Phase 2 (technisches SEO: Titles, Meta, JSON-LD, Canonicals, Sitemap, interne Links)**.
