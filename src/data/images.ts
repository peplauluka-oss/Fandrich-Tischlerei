/**
 * EINZIGE Quelle aller Bildzuordnungen der Website.
 * Kuratierte Auswahl — Begründungen für jede Entscheidung in AUSWAHL.md.
 *
 * rolle:
 *  - 'hero'     → Bild-Inset im typografischen Hero (Sektion 01)
 *  - 'walk'     → Gallery Walk (Sektion 04), sortiert nach `reihenfolge`
 *  - 'material' → Werkstatt & Material (Sektion 05)
 *
 * SCHÄRFE-REGEL: Kein Bild wird über seine native Auflösung hinaus skaliert.
 * Die maximale Darstellungsbreite wird aus den echten Pixelmaßen abgeleitet
 * (native Breite / RETINA_FAKTOR) — siehe maxDisplayWidth(). Der Gallery Walk
 * nimmt nur Bilder ab MIN_WALK_BREITE nativer Breite auf.
 *
 * TODO: MIN_WALK_BREITE auf 800 anheben, sobald die Original-Fotos in hoher
 * Auflösung vorliegen. Mit dem aktuellen Material (max. 800 px, die meisten
 * 426–640 px) wäre der Walk bei einem 800er-Limit leer — deshalb steht das
 * Limit vorerst auf 400. Bildtausch: nur die Imports unten ersetzen, Layout
 * und Größen passen sich automatisch an die neuen Pixelmaße an.
 *
 * Captions im Format "Werkstück, Material — Kiez".
 * TODO: Alle Kiez- und Materialangaben sind plausible Platzhalter —
 * vom Betrieb verifizieren lassen.
 */
import type { ImageMetadata } from 'astro';

import kueche from '../assets/images/IMG_2479.jpeg';
import bibliothek from '../assets/images/IMG_2480.jpeg';
import fensterbank from '../assets/images/IMG_2470.jpeg';
import loft from '../assets/images/IMG_2475.jpeg';
import schrank from '../assets/images/IMG_2463.jpeg';
import essplatz from '../assets/images/IMG_2472.jpeg';
import fassade from '../assets/images/IMG_2467.jpeg';
import werkstatt from '../assets/images/IMG_2482.jpeg';

/** Reserve für hochauflösende Displays: Anzeige = native Breite / 1.5 */
export const RETINA_FAKTOR = 1.5;

/** Mindest-Nativbreite für den Gallery Walk. TODO: auf 800 anheben, sobald Originale da sind. */
export const MIN_WALK_BREITE = 400;

export type BildRolle = 'hero' | 'walk' | 'material';

export interface Bild {
  id: string;
  src: ImageMetadata;
  rolle: BildRolle;
  reihenfolge: number;
  /** Hochformat → im Walk versetzt gesetzt */
  hochformat: boolean;
  caption: string;
  alt: string;
}

/** Maximale CSS-Darstellungsbreite, damit nichts über nativ skaliert wird. */
export const maxDisplayWidth = (bild: Bild) => Math.round(bild.src.width / RETINA_FAKTOR);

export const bilder: Bild[] = [
  {
    id: 'IMG_2479',
    src: kueche,
    rolle: 'hero',
    reihenfolge: 0,
    hochformat: false,
    caption: 'Einbauküche mit Kochinsel, Lack matt — Weißensee', // TODO: Kiez verifizieren
    alt: 'Helle Einbauküche mit freistehender Kochinsel, Eichenparkett und Blick in den Garten',
  },
  {
    id: 'IMG_2480',
    src: bibliothek,
    rolle: 'walk',
    reihenfolge: 1,
    hochformat: true,
    caption: 'Einbaubibliothek, Kirschbaum — Prenzlauer Berg', // TODO: Material/Kiez verifizieren
    alt: 'Raumhohe Einbaubibliothek aus Kirschbaumholz mit Glastüren in einem Altbauflur',
  },
  {
    id: 'IMG_2470',
    src: fensterbank,
    rolle: 'walk',
    reihenfolge: 2,
    hochformat: true,
    caption: 'Fensterbank mit Stauraum, Lack seidenmatt — Pankow', // TODO: Kiez verifizieren
    alt: 'Loftraum mit durchlaufender Fensterbank und eingebauten Regalen, Sonne auf Dielenboden',
  },
  {
    id: 'IMG_2475',
    src: loft,
    rolle: 'walk',
    reihenfolge: 3,
    hochformat: false,
    caption: 'Küchenzeile & Galerie, Lack und Stahl — Mitte', // TODO: Kiez verifizieren
    alt: 'Offenes Loft mit weißer Einbauküche unter einer Stahltreppe zur Galerie',
  },
  {
    id: 'IMG_2463',
    src: schrank,
    rolle: 'walk',
    reihenfolge: 4,
    hochformat: true,
    caption: 'Schrank in der Dachschräge, MDF lackiert — Prenzlauer Berg', // TODO: Kiez verifizieren
    alt: 'Begehbarer Einbauschrank unter einer Dachschräge mit maßgefertigten Fronten',
  },
  {
    id: 'IMG_2472',
    src: essplatz,
    rolle: 'walk',
    reihenfolge: 5,
    hochformat: false,
    caption: 'Küche mit Essplatz, Esche grau — Karow', // TODO: Material/Kiez verifizieren
    alt: 'Moderne Küche mit hoher Schrankwand und Essplatz vor bodentiefen Fenstern',
  },
  {
    id: 'IMG_2467',
    src: fassade,
    rolle: 'walk',
    reihenfolge: 6,
    hochformat: true,
    caption: 'Fassade & Terrasse, Lärche — Barnim', // TODO: Ort verifizieren
    alt: 'Holzfassade aus Lärchenleisten mit Terrassendeck, Herbstbäume im Gegenlicht',
  },
  {
    id: 'IMG_2482',
    src: werkstatt,
    rolle: 'material',
    reihenfolge: 1,
    hochformat: false,
    caption: 'Die Werkstatt, Treseburger Straße — Pankow',
    alt: 'Werkstattgebäude der Tischlerei Fandrich mit Schriftzug an der Fassade, Abendlicht',
  },
];

export const heroBild = bilder.find((b) => b.rolle === 'hero')!;
export const walkBilder = bilder
  .filter((b) => b.rolle === 'walk' && b.src.width >= MIN_WALK_BREITE)
  .sort((a, b) => a.reihenfolge - b.reihenfolge);
export const materialBilder = bilder
  .filter((b) => b.rolle === 'material')
  .sort((a, b) => a.reihenfolge - b.reihenfolge);
