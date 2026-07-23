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

## 3 · Geo-Strategie — „Berlin und Umgebung" (Betreiber-Angabe)

**Zwei Ebenen bewusst getrennt:**

1. **Standort-Anker (NAP, identisch überall):** Meisterbetrieb / Niederlassung **Berlin-Pankow**, Treseburger Straße 30, 13129. → Adresse in Impressum, Footer, `LocalBusiness`-Schema, Google Business Profile. Dieser feste Ort ist der Hebel für den lokalen „Map-Pack" rund um Pankow.
2. **Einsatzgebiet (`areaServed`):** **ganz Berlin (alle Bezirke) + naher Brandenburg-Rand** — offiziell „**Berlin und Umgebung**". Aufträge werden stadtweit aufgenommen; gerade bei Möbelanfertigung lohnen größere Wege (hoher Auftragswert).

**Konsequenz für Keywords/Texte:**
- **Citywide** statt Nordosten-Verengung: Leistungs-Keywords tragen „**Berlin**" (nicht „Berlin-Pankow"), z. B. *Möbel nach Maß Berlin*, *Fensterreparatur Berlin*. Das erweitert die Reichweite auf das reale Einsatzgebiet.
- **Pankow** erscheint als **Standort/Herkunft** im Body + Schema (Vertrauens-/Local-Anker), nicht als Reichweiten-Begrenzung.
- **Ortsteile** nur noch als **ehrliche Beispiele** einstreuen (nahe HQ hohe Altbau-Dichte = ideale Kundschaft), plus die Klammer „**im gesamten Stadtgebiet und im Berliner Umland**":
  - Nahe HQ (Beispiele, organisch): Pankow, Prenzlauer Berg, Weißensee, Niederschönhausen.
  - Citywide-Framing: „in ganz Berlin — von Charlottenburg bis Köpenick" o. ä. (2–3 Beispiele, keine Bezirks-Wüste).
  - Umland (streifen): „und im angrenzenden Brandenburger Umland".
- **Kein** Ausschütten aller ~40 Ortsteile — Google wertet Ortsteil-Listen als thin/spam. Stattdessen: „Berlin und Umgebung" + wenige echte Beispiele + Projekt-Captions mit echtem Ortsbezug (bereits gut: „Einbaubibliothek — Prenzlauer Berg").

**`areaServed` (JSON-LD, Phase 2):** `City: Berlin` + Text „Berlin und Umgebung / Berliner Umland". Keine erfundenen Landkreis-Polygone.

---

## 4 · Long-Tail / Intent-Keywords → FAQ & Body

| Suchanfrage (Intent) | Ziel-URL | Platzierung |
|---|---|---|
| „Kastenfenster reparieren oder austauschen?" | L2 (Erhalt-Argument) + Querlink L3 | Mini-FAQ L2 |
| „Was kostet ein Einbauschrank nach Maß?" | L1 | Mini-FAQ L1 + Prozess-Block |
| „Fenster schließt nicht richtig" | L3 | H2/FAQ L3 |
| „alte Möbel aufarbeiten lassen" | L2 | Intro/FAQ L2 |
| ~~„Tischler Notdienst / Tür klemmt"~~ | — | **entfällt** — kein Notdienst (Betreiber bestätigt), nicht bewerben |
| „Denkmalschutz Fenster Berlin" | L2 | H2/Body L2 |
| „lohnt sich Reparatur vs. Neukauf" | L3 | FAQ L3 (Einwandbehandlung, Phase 6) |
| „Wie läuft eine Anfrage ab / wer kommt zu mir?" | alle L + S | „So läuft's ab"-Block (Phase 3) |

Bestehende zentrale FAQ-Sektion (Startseite) behält allgemeine Vertrauensfragen; leistungsspezifische Fragen wandern in die jeweilige Mini-FAQ (mit `FAQPage`-Schema, Phase 2) — so keine Doppelung.

---

## 5 · Title/Meta-Muster (Vorschau, Umsetzung Phase 2)

| URL | Title (≤ 60 Z.) | Meta-Description (140–155 Z., Nutzen + CTA) |
|---|---|---|
| S | `Tischlerei Berlin-Pankow · Meisterbetrieb | Fandrich` | Meistertischlerei in Berlin und Umgebung: Möbel nach Maß, Fenster, Türen, Restaurierung & Reparatur. Aus einer Hand — Antwort binnen 24 h. |
| L1 | `Möbel & Einbauschränke nach Maß in Berlin | Fandrich` | Einbaumöbel, Küchen, Holzfenster und Türen nach Maß vom Meisterbetrieb aus Berlin-Pankow — Aufmaß, Fertigung, Montage aus einer Hand. Jetzt anfragen. |
| L2 | `Möbelrestaurierung & Kastenfenster-Sanierung Berlin` | Schellackpolitur, Antikmöbel, Kastenfenster fachgerecht saniert — in ganz Berlin. Stücke mit Geschichte erhalten. Unverbindlich anfragen. |
| L3 | `Fenster- & Türreparatur in Berlin | Tischlerei Fandrich` | Fenster einstellen, Türen, Parkett, Treppen und Küchen reparieren — schnell und sauber in ganz Berlin. Schaden schildern, wir melden uns. |
| L4 | `Fensterwartung Berlin — auch für Hausverwaltungen` | Wartung von Fenstern & Türen für Privat und Hausverwaltungen in Berlin: Beschläge, Dichtungen, Objektbetreuung. Ein Ansprechpartner, kurze Wege. |

*Standort-Anker „Berlin-Pankow" bleibt auf der Startseite (Marke + Local-Pack); Leistungsseiten führen citywide „Berlin", Pankow im Body/Schema. Zeichenzahl in Phase 2 final geprüft.*

---

## 6 · Interne Verlinkung (Ankertext = Keyword)

- **S → L1–L4:** je Card-Link „Mehr erfahren" ergänzen um keyword-tragende Kontextlinks im Fließtext (z. B. „Möbel nach Maß", „Kastenfenster sanieren").
- **L1 ↔ L2/L3:** Neuanfertigung ↔ Restaurierung (Erhalt vs. Neu), Neuanfertigung → Reparatur (Ergänzung).
- **L2 → L3:** „Kastenfenster sanieren" ↔ „einzelne Fensterreparatur".
- **L3 → L4:** „Reparatur" → „regelmäßige Wartung".
- **L4 → S/Kontakt:** B2B-CTA → Kontakt.
- **Alle L → Kontaktsektion** mit keyword-nahem Ankertext, nie „hier klicken".

---

## 7 · Offene Punkte — vom Betreiber geklärt ✓

1. **Notdienst?** → **Nein.** „Notdienst/Tür klemmt"-Longtail entfällt, wird nicht beworben.
2. **Küche nach Maß?** → **Ja, im Angebot.** Bleibt auf L1 (Neuanfertigung); Küchenreparatur separat auf L3.
3. **Einsatzgebiet?** → **Ganz Berlin + naher Brandenburg-Rand** („Berlin und Umgebung"). Nordosten-Verengung aufgehoben (siehe §3). Pankow nur noch Standort-Anker.
4. **Title-Anker?** → **Startseite „Berlin-Pankow"** (Marke/Local-Pack), **Leistungsseiten citywide „Berlin"**, Pankow im Body/Schema.

→ Damit ist Phase 1 freigegeben. Nächster Schritt: **Phase 2 (technisches SEO: Titles, Meta, JSON-LD, Canonicals, Sitemap, interne Links)**.
