# Bildauswahl — kuratorische Entscheidungen (Stand: Korrekturrunde 1)

Alle 22 Bilder aus `src/assets/images/` wurden einzeln gesichtet.
Wichtiger Gesamtbefund: Es liegen **keine Original-Auflösungen** vor — das größte
Bild misst 800 × 1200 px, die meisten 426–640 px.

## Schärfe-Regel (seit Korrekturrunde 1)

Kein Bild wird über seine native Auflösung hinaus dargestellt:
**maximale CSS-Breite = native Breite ÷ 1.5** (Retina-Reserve). Die Regel ist
in `src/data/images.ts` implementiert (`maxDisplayWidth`, `RETINA_FAKTOR`) und
gilt für Hero-Inset, Gallery Walk und Werkstattbild. Der frühere
Full-Bleed-Hero und die 100vw-Stationen sind damit Geschichte — der Walk ist
jetzt eine Folge kleiner, scharfer Abzüge auf großzügigem Weißraum.

**Zur 800px-Mindestbreite:** Die Vorgabe „Bilder unter 800 px Breite fliegen
aus dem Walk“ ist als Konstante `MIN_WALK_BREITE` implementiert — steht aber
vorerst auf **400**, denn nur fünf Dateien erreichen 800 px Breite (2482, 2483,
2484, 2486, 2488), und vier davon sind aus inhaltlichen Gründen aussortiert.
Ein 800er-Limit ergäbe einen leeren Walk. **TODO: `MIN_WALK_BREITE` auf 800
anheben, sobald die Original-Fotos vorliegen** — der Austausch betrifft nur
die Imports in `images.ts`, Layout und Größen folgen automatisch den neuen
Pixelmaßen.

## Verwendet (8)

| Bild | Native Größe | max. Darstellung | Rolle | Begründung |
| --- | --- | --- | --- | --- |
| IMG_2479 | 640×426 | 427 px | **Hero-Inset** | Stärkstes Interieur: helle Einbauküche mit Kochinsel, Tageslicht, Gartenblick. Für 100svh zu klein → typografischer Hero mit eingerücktem Bild in nativer Größe. |
| IMG_2480 | 426×640 | 284 px | Walk 1 | Einbaubibliothek: das klassische Meisterstück-Motiv, raumhoch, Glastüren, warmes Holz. Eröffnet den Walk. |
| IMG_2470 | 426×640 | 284 px | Walk 2 | Loft mit durchlaufender Fensterbank: Sonne auf Dielen, Altbau-Bogenfenster — genau die Zielgruppe. |
| IMG_2475 | 640×426 | 427 px | Walk 3 | Einbauküche unter Stahltreppe: Innenausbau im großen Maßstab, klare Linien. |
| IMG_2463 | 426×640 | 284 px | Walk 4 | Schrank in der Dachschräge: Maßarbeit in schwieriger Geometrie. Persönliche Gegenstände toleriert (wirkt bewohnt). |
| IMG_2472 | 640×426 | 427 px | Walk 5 | Küche mit Essplatz vor bodentiefen Fenstern; Gewerke-Vielfalt. |
| IMG_2467 | 426×640 | 284 px | Walk 6 (Schluss) | Lärchenfassade mit Terrassendeck im Herbstlicht — öffnet den Blick nach draußen, Schlussakkord. |
| IMG_2482 | 800×533 | 533 px | **Werkstatt** | Reale Werkstattfassade mit „fandrich“-Schriftzug: maximale Authentizität für die dunkle Sektion. Das parkende Auto ist ein Kompromiss — es ist das einzige Werkstattbild. |

## Verworfen (14)

| Bild | Begründung |
| --- | --- |
| IMG_2486 | 800×450, Holzsteg am See. War Hero — **in Korrekturrunde 1 entfernt: wirkt wie Hotel/Resort, nicht wie Tischlerei.** Auch als Walk-Station nicht aufgenommen, weil das Motiv eher Urlaub als Handwerk erzählt. |
| IMG_2478 | 360×640, Arbeitsplatten-Detail. **In Korrekturrunde 1 aus dem Walk entfernt: mit 360 px nativer Breite die schwächste Auflösung** — unter jeder sinnvollen Schärfegrenze. |
| IMG_2457 | Nur 178×223 px — Thumbnail, technisch unbrauchbar (Motiv Küchendetail wäre gut gewesen). |
| IMG_2460 | Nur 178×127 px — Thumbnail, technisch unbrauchbar. |
| IMG_2466 | Badezimmer mit WC, Kosmetik-Kleinteilen und Handtuch — kein Premium-Motiv, störende Objekte. |
| IMG_2468 | Empfangstresen vor oranger Wand: Farbklima und Objektdesign wirken 2000er. |
| IMG_2469 | Ladenbau mit großem Fremd-Logo („Berlinomat“) — fremdes Branding, veraltet. |
| IMG_2474 | Rustikale Treppe mit Terracotta und karierter Tagesdecke — veraltete Einrichtungsästhetik. |
| IMG_2477 | 558×990, Küche bei stichigem Kunstlicht, wirkt roh — Lichtqualität ungenügend. |
| IMG_2483 | 800×1200, aber HiFi-Möbel hinter Lautsprechern und Fernseher versteckt — Möbel nicht erkennbar. |
| IMG_2484 | 800×1200, aber klassizistisches Interieur (Hochglanz-Portal, Kronleuchter) — laut Briefing auszusortierende Ästhetik. |
| IMG_2488 | Froschperspektive auf Glasfassade mit Gerüst: kaltes Blau, Gewerk nicht erkennbar. |
| IMG_2489 | Dreier-Collage aus der Werkstatt (Handarbeit am Werkstück!) — inhaltlich wertvoll, aber nur 484×200 px. **Die Einzelbilder als Originale nachliefern: perfekte Werkstatt-Motive.** |
| IMG_2507 | Dreier-Collage Glasgeländer, 484×200 px — zudem ohne erkennbaren Tischlerei-Bezug. |

## Serienlook

Damit Fotos aus verschiedenen Jahren wie eine Serie wirken, liegt auf allen
Projektfotos ein dezenter warmer Filter
(`sepia(0.06) saturate(1.05) brightness(1.02) contrast(1.01)`, Token
`--photo-filter` in `src/styles/global.css`).
