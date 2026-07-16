# STATUS — Bild-Inventur (Gesetz für jede Platzierung)

Native Pixelmaße aller Dateien in `src/assets/images/`. Kategorie nach
**nativer Breite**: GROSS ≥ 1200 · MITTEL 800–1199 · KLEIN < 800.
Darstellungs-Obergrenze (Bild-Gesetz G2): **native Breite ÷ 1.5**.

| Datei | Native B×H | Kategorie | max. Anzeige (÷1.5) | Eignung |
| --- | --- | --- | --- | --- |
| IMG_2457.jpeg | 178×223 | KLEIN | 119 px | ✗ Thumbnail unbrauchbar |
| IMG_2460.jpeg | 178×127 | KLEIN | 119 px | ✗ Thumbnail unbrauchbar |
| IMG_2463.jpeg | 426×640 | KLEIN | 284 px | ✓ Interieur (Schrank Dachschräge) |
| IMG_2466.jpeg | 426×640 | KLEIN | 284 px | ✗ Bad/WC, störende Objekte |
| IMG_2467.jpeg | 426×640 | KLEIN | 284 px | ✓ Fassade/Terrasse Lärche |
| IMG_2468.jpeg | 640×426 | KLEIN | 427 px | ✗ Tresen, 2000er-Ästhetik |
| IMG_2469.jpeg | 640×430 | KLEIN | 427 px | ✗ Fremd-Logo (Berlinomat) |
| IMG_2470.jpeg | 426×640 | KLEIN | 284 px | ✓ Loft-Fensterbank |
| IMG_2472.jpeg | 640×426 | KLEIN | 427 px | ✓ Küche mit Essplatz |
| IMG_2474.jpeg | 426×640 | KLEIN | 284 px | ✗ rustikale Treppe, veraltet |
| IMG_2475.jpeg | 640×426 | KLEIN | 427 px | ✓ Loft-Küche unter Stahltreppe |
| IMG_2477.jpeg | 558×990 | KLEIN | 372 px | ✗ stichiges Kunstlicht |
| IMG_2478.jpeg | 360×640 | KLEIN | 240 px | △ Arbeitsplatten-Detail (nur Thumbnail) |
| IMG_2479.jpeg | 640×426 | KLEIN | 427 px | ✓ Einbauküche Kochinsel (stärkstes Interieur) |
| IMG_2480.jpeg | 426×640 | KLEIN | 284 px | ✓ Einbaubibliothek |
| **IMG_2482.jpeg** | **800×533** | **MITTEL** | **533 px** | ✓ Werkstattfassade (Authentizität, S5) |
| IMG_2483.jpeg | 800×1200 | MITTEL | 533 px | ✗ HiFi hinter Lautsprecher/TV versteckt |
| IMG_2484.jpeg | 800×1200 | MITTEL | 533 px | ✗ klassizistisches Interieur (Anti-Referenz) |
| **IMG_2486.jpeg** | **800×450** | **MITTEL** | **533 px** | ✓ Seesteg (Außenprojekt) |
| IMG_2488.jpeg | 800×451 | MITTEL | 533 px | ✗ Glasfassade mit Gerüst, kein Gewerk |
| IMG_2489.jpeg | 484×200 | KLEIN | 322 px | △ Werkstatt-Collage (Handarbeit) — Original nachliefern! |
| IMG_2507.jpeg | 484×200 | KLEIN | 322 px | ✗ Collage ohne Tischlerei-Bezug |

## Bilanz & Konsequenz für den Aufbau

- **GROSS (≥1200 px): 0 Dateien.** Es gibt aktuell **kein** Bild für einen
  echten Vollbreite-/Full-Bleed-Slot. G2 (nur GROSS in Vollbreite-Slots) heißt
  damit: die „großen" Panels in **S4** werden mit dem besten verfügbaren
  Material **zentriert und auf max. native ÷ 1.5 begrenzt** gesetzt — **nicht**
  auf 1360 px gestreckt. Lieber weniger, kleinere, scharfe Panels als ein
  hochskalierter Matsch.
- **MITTEL (800 px): 5 Dateien**, davon inhaltlich brauchbar nur **IMG_2482**
  (Werkstatt) und **IMG_2486** (Außenprojekt). Max. Anzeige 533 px.
- **KLEIN (< 800 px): 17 Dateien.** Verwendbar als reguläre Interieur-Motive
  bis zu ihrer ÷1.5-Grenze (240–427 px), im Galerie-Rhythmus als versetzte
  Paare, und als Leistungs-Thumbnails (≤ 160 px, dort ausdrücklich erlaubt).

## Pflicht-TODO (Betreiber)

Für echte Vollbreite-Panels und den Hero **Original-Fotos in ≥ 1600 px Breite**
nachliefern. Austausch betrifft dann nur `src/data/images.ts` bzw.
`src/data/heroMedia.ts`; Slots und Größen ziehen automatisch nach. Ebenso: die
Werkstatt-Einzelbilder aus der Collage **IMG_2489** als Originale liefern.
