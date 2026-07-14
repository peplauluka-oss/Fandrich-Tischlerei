# Bildauswahl — kuratorische Entscheidungen

Alle 22 Bilder aus `src/assets/images/` wurden einzeln gesichtet.
Wichtiger Gesamtbefund: Es liegen **keine Original-Auflösungen** vor — das größte
Bild misst 800 × 1200 px. Für gestochen scharfe Full-Width-Darstellungen auf
großen Displays sollten die Originaldateien nachgeliefert werden (siehe README).

**Bilanz: 10 verwendet / 12 verworfen.** Lieber 8 starke Stationen im Gallery
Walk als 14 gemischte.

## Verwendet

| Bild | Rolle | Begründung |
| --- | --- | --- |
| IMG_2486 | **Hero** | Einziges starkes Querformat mit warmem Licht: Holzsteg führt in die Tiefe, ruhige dunkle Bildzone unten links verträgt den Text-Overlay. 800 × 450 px — grenzwertig, aber das beste verfügbare Hero-Motiv. |
| IMG_2479 | Walk 1 (volle Breite) | Stärkstes Interieur: helle Einbauküche mit Kochinsel, Tageslicht, Gartenblick, zeitgemäße Ästhetik — der Eröffnungsakkord. |
| IMG_2480 | Walk 2 (versetzt) | Die Einbaubibliothek ist das klassische Meisterstück-Motiv: raumhoch, Glastüren, warmes Holz. Hochformat, gute Schärfe. |
| IMG_2470 | Walk 3 (versetzt) | Loftraum mit durchlaufender Fensterbank: Sonne auf Dielen, Altbau-Bogenfenster — genau die Zielgruppe. Hochformat. |
| IMG_2475 | Walk 4 (volle Breite) | Architektonisches Motiv: Einbauküche unter Stahltreppe, klare Linien, zeigt Innenausbau-Kompetenz im großen Maßstab. |
| IMG_2463 | Walk 5 (versetzt) | Schrank in der Dachschräge: maßgefertigte Fronten in schwieriger Geometrie — erzählt „nach Maß“ besser als jedes Wort. Persönliche Gegenstände im Bild toleriert (wirkt bewohnt, nicht gestellt). |
| IMG_2472 | Walk 6 (volle Breite) | Küche mit Essplatz vor bodentiefen Fenstern; kühleres Licht wird durch den globalen Warm-Filter eingefangen. Gewerke-Vielfalt. |
| IMG_2478 | Walk 7 (versetzt) | Detailaufnahme: Arbeitsplatte unter warmem Lichtband — die geforderte Nahaufnahme im Walk. Mit 360 px Breite schwach aufgelöst, wird deshalb klein gesetzt. |
| IMG_2467 | Walk 8 (versetzt, Schluss) | Zweitstärkstes Bild als Schlussakkord: Lärchenfassade mit Terrassendeck im Herbstlicht — öffnet den Blick nach draußen (Außenbereich-Gewerk). |
| IMG_2482 | **Werkstatt/Material** | Die reale Werkstattfassade mit „fandrich“-Schriftzug und „Meisterbetrieb seit 1964“: maximale Authentizität für die dunkle Werkstatt-Sektion. Das parkende Auto ist ein Kompromiss — es ist das einzige Werkstattbild. |

## Verworfen

| Bild | Begründung |
| --- | --- |
| IMG_2457 | Nur 178 × 223 px — Thumbnail, technisch unbrauchbar (Motiv Küchendetail wäre gut gewesen). |
| IMG_2460 | Nur 178 × 127 px — Thumbnail, technisch unbrauchbar. |
| IMG_2466 | Badezimmer mit WC, Kosmetik-Kleinteilen und Handtuch — kein Premium-Motiv, störende Objekte. |
| IMG_2468 | Empfangstresen vor oranger Wand: Farbklima und Objektdesign wirken 2000er, passt nicht zur ruhigen Serie. |
| IMG_2469 | Ladenbau mit großem Fremd-Logo („Berlinomat“) und harter Rot-Schwarz-Ästhetik — fremdes Branding, veraltet. |
| IMG_2474 | Rustikale Treppe mit Terracotta und karierter Tagesdecke — veraltete Einrichtungsästhetik, unruhig. |
| IMG_2477 | Küche bei stichigem Kunstlicht, wirkt unbewohnt/roh — Lichtqualität ungenügend. |
| IMG_2483 | HiFi-Möbel hinter Lautsprecher und Fernseher versteckt, graues Farbklima, Terracotta-Boden — Möbel nicht erkennbar, veraltet. |
| IMG_2484 | Klassizistisches Interieur (Hochglanz-Portal, Kronleuchter) — explizit auszusortierende Ästhetik. |
| IMG_2488 | Froschperspektive auf Glasfassade mit Gerüst: kaltes Blau, Gewerk nicht erkennbar. |
| IMG_2489 | Dreier-Collage aus der Werkstatt (Handarbeit am Werkstück!) — inhaltlich wertvoll, aber nur 484 × 200 px und als Collage montiert. Die Einzelbilder als Originale nachliefern: Sie wären die perfekten Werkstatt-Motive. |
| IMG_2507 | Dreier-Collage Glasgeländer/Treppen, 484 × 200 px — gleiche Gründe; zudem öffentliches Gebäude ohne erkennbaren Tischlerei-Bezug. |

## Serienlook

Damit Fotos aus verschiedenen Jahren wie eine Serie wirken, liegt auf allen
Galerie- und Werkstattbildern ein dezenter warmer Filter
(`sepia(0.06) saturate(1.05) brightness(1.02) contrast(1.01)`, Token
`--photo-filter` in `src/styles/global.css`).
