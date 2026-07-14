/**
 * EINZIGE Quelle aller Bildzuordnungen der Website.
 * Kuratierte Auswahl — Begründungen für jede Entscheidung in AUSWAHL.md.
 *
 * rolle:
 *  - 'hero'     → Startbild (Sektion 01)
 *  - 'walk'     → Gallery Walk (Sektion 04), sortiert nach `reihenfolge`
 *  - 'material' → Werkstatt & Material (Sektion 05)
 *
 * Captions im Format "Werkstück, Material — Kiez".
 * TODO: Alle Kiez-Angaben und Materialangaben sind plausible Platzhalter —
 * vom Betrieb verifizieren lassen.
 */
import type { ImageMetadata } from 'astro';

import hero from '../assets/images/IMG_2486.jpeg';
import kueche from '../assets/images/IMG_2479.jpeg';
import bibliothek from '../assets/images/IMG_2480.jpeg';
import fensterbank from '../assets/images/IMG_2470.jpeg';
import loft from '../assets/images/IMG_2475.jpeg';
import schrank from '../assets/images/IMG_2463.jpeg';
import essplatz from '../assets/images/IMG_2472.jpeg';
import kuechendetail from '../assets/images/IMG_2478.jpeg';
import fassade from '../assets/images/IMG_2467.jpeg';
import werkstatt from '../assets/images/IMG_2482.jpeg';

export type BildRolle = 'hero' | 'walk' | 'material';

export interface Bild {
  id: string;
  src: ImageMetadata;
  rolle: BildRolle;
  reihenfolge: number;
  /** Hochformat → im Walk als versetzte Station gesetzt */
  hochformat: boolean;
  caption: string;
  alt: string;
}

export const bilder: Bild[] = [
  {
    id: 'IMG_2486',
    src: hero,
    rolle: 'hero',
    reihenfolge: 0,
    hochformat: false,
    caption: 'Seesteg, Lärche geriffelt — Brandenburg', // TODO: Ort verifizieren
    alt: 'Holzsteg aus Lärchendielen führt in einen ruhigen See, warmes Abendlicht',
  },
  {
    id: 'IMG_2479',
    src: kueche,
    rolle: 'walk',
    reihenfolge: 1,
    hochformat: false,
    caption: 'Einbauküche mit Kochinsel, Lack matt — Weißensee', // TODO: Kiez verifizieren
    alt: 'Helle Einbauküche mit freistehender Kochinsel, Eichenparkett und Blick in den Garten',
  },
  {
    id: 'IMG_2480',
    src: bibliothek,
    rolle: 'walk',
    reihenfolge: 2,
    hochformat: true,
    caption: 'Einbaubibliothek, Kirschbaum — Prenzlauer Berg', // TODO: Material/Kiez verifizieren
    alt: 'Raumhohe Einbaubibliothek aus Kirschbaumholz mit Glastüren in einem Altbauflur',
  },
  {
    id: 'IMG_2470',
    src: fensterbank,
    rolle: 'walk',
    reihenfolge: 3,
    hochformat: true,
    caption: 'Fensterbank mit Stauraum, Lack seidenmatt — Pankow', // TODO: Kiez verifizieren
    alt: 'Loftraum mit durchlaufender Fensterbank und eingebauten Regalen, Sonne auf Dielenboden',
  },
  {
    id: 'IMG_2475',
    src: loft,
    rolle: 'walk',
    reihenfolge: 4,
    hochformat: false,
    caption: 'Küchenzeile & Galerie, Lack und Stahl — Mitte', // TODO: Kiez verifizieren
    alt: 'Offenes Loft mit weißer Einbauküche unter einer Stahltreppe zur Galerie',
  },
  {
    id: 'IMG_2463',
    src: schrank,
    rolle: 'walk',
    reihenfolge: 5,
    hochformat: true,
    caption: 'Schrank in der Dachschräge, MDF lackiert — Prenzlauer Berg', // TODO: Kiez verifizieren
    alt: 'Begehbarer Einbauschrank unter einer Dachschräge mit maßgefertigten Fronten',
  },
  {
    id: 'IMG_2472',
    src: essplatz,
    rolle: 'walk',
    reihenfolge: 6,
    hochformat: false,
    caption: 'Küche mit Essplatz, Esche grau — Karow', // TODO: Material/Kiez verifizieren
    alt: 'Moderne Küche mit hoher Schrankwand und Essplatz vor bodentiefen Fenstern',
  },
  {
    id: 'IMG_2478',
    src: kuechendetail,
    rolle: 'walk',
    reihenfolge: 7,
    hochformat: true,
    caption: 'Arbeitsplatte, Quarzkomposit — Niederschönhausen', // TODO: Material/Kiez verifizieren
    alt: 'Nahaufnahme einer Küchenarbeitsplatte mit Kochfeld unter warmem Lichtband',
  },
  {
    id: 'IMG_2467',
    src: fassade,
    rolle: 'walk',
    reihenfolge: 8,
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
  .filter((b) => b.rolle === 'walk')
  .sort((a, b) => a.reihenfolge - b.reihenfolge);
export const materialBilder = bilder
  .filter((b) => b.rolle === 'material')
  .sort((a, b) => a.reihenfolge - b.reihenfolge);
