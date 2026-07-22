/**
 * EINZIGE Quelle aller Bildzuordnungen der Website.
 *
 * OBERSTES GESETZ (Runde „De-Duplizierung"): Jedes Foto erscheint auf der
 * gesamten Seite EXAKT EINMAL. Die Zuordnung unten ist die einzige erlaubte
 * Verwendung. Ein automatischer Build-Check (`npm run check:images`,
 * `scripts/check-images.mjs`, als `prebuild` verdrahtet) bricht ab, wenn ein
 * Asset doppelt referenziert oder außerhalb dieser Datei importiert wird.
 *
 *  hero       → IMG_2479 (Kochinsel)                        — nur Hero
 *  ueber-uns  → IMG_2480 (Bibliothek) · IMG_2470 (Fensterbank)
 *  leistungen → IMG_2746 (Möbelbau) · IMG_2748 (Restaurierung)
 *               IMG_2745 (Fenster) · IMG_2743 (Servicewagen)  — Card-Scroller
 *  galerie    → IMG_2475 · IMG_2463 · IMG_2467 · IMG_2486   — nur „Aus der Werkstatt"
 *  werkstatt  → IMG_2482 (Werkstattgebäude)                 — nur Werkstatt
 *
 * IMG_2472 (Essplatz) wird nicht mehr verwendet (nicht in der Zuordnung).
 *
 * SCHÄRFE-REGEL (Bild-Gesetz G2): Kein Bild wird über native Breite ÷ 1.5
 * hinaus dargestellt — siehe maxDisplayWidth(). Captions im Format
 * „Werkstück, Material — Ort". Kiez-/Materialangaben sind plausible
 * Platzhalter (TODO: vom Betrieb verifizieren lassen).
 */
import type { ImageMetadata } from 'astro';

import kueche from '../assets/images/IMG_2479.jpeg';
import bibliothek from '../assets/images/IMG_2480.jpeg';
import fensterbank from '../assets/images/IMG_2470.jpeg';
import loft from '../assets/images/IMG_2475.jpeg';
import schrank from '../assets/images/IMG_2463.jpeg';
import fassade from '../assets/images/IMG_2467.jpeg';
import steg from '../assets/images/IMG_2486.jpeg';
import werkstatt from '../assets/images/IMG_2482.jpeg';
import lMoebelbau from '../assets/images/IMG_2746.jpeg';
import lRestaurierung from '../assets/images/IMG_2748.jpeg';
import lReparatur from '../assets/images/IMG_2745.jpeg';
import lWartung from '../assets/images/IMG_2743.jpeg';

/** Reserve für hochauflösende Displays: Anzeige = native Breite ÷ 1.5 */
export const RETINA_FAKTOR = 1.5;

/** Maximale CSS-Darstellungsbreite, damit nichts über nativ skaliert wird. */
export const maxDisplayWidth = (src: ImageMetadata) => Math.round(src.width / RETINA_FAKTOR);
export const mx = (src: ImageMetadata) => `${maxDisplayWidth(src)}px`;

export type Sektion = 'hero' | 'ueber-uns' | 'leistungen' | 'galerie' | 'werkstatt';

export interface Bild {
  id: string;
  src: ImageMetadata;
  sektion: Sektion;
  /** Hochformat → im Galerie-Rhythmus versetzt/schmaler gesetzt */
  hochformat: boolean;
  /** Galerie-Laufnummer 01–04 (nur Sektion „galerie") */
  nr?: string;
  /** „Werkstück, Material — Ort" */
  caption: string;
  alt: string;
}

/* ── Hero ─────────────────────────────────────────────────────────────── */
export const heroImage: Bild = {
  id: 'IMG_2479',
  src: kueche,
  sektion: 'hero',
  hochformat: false,
  caption: 'Einbauküche mit Kochinsel, Lack matt — Weißensee', // TODO: Kiez verifizieren
  alt: 'Helle Einbauküche mit freistehender Kochinsel, Eichenparkett und Blick in den Garten',
};

/* ── Über uns (versetztes Paar) ───────────────────────────────────────── */
export const ueberUnsImages: Bild[] = [
  {
    id: 'IMG_2480',
    src: bibliothek,
    sektion: 'ueber-uns',
    hochformat: true,
    caption: 'Einbaubibliothek, Kirschbaum — Prenzlauer Berg', // TODO: Material/Kiez verifizieren
    alt: 'Raumhohe Einbaubibliothek aus Kirschbaumholz mit Glastüren in einem Altbauflur',
  },
  {
    id: 'IMG_2470',
    src: fensterbank,
    sektion: 'ueber-uns',
    hochformat: true,
    caption: 'Fensterbank mit Stauraum, seidenmatt — Pankow', // TODO: Kiez verifizieren
    alt: 'Loftraum mit durchlaufender Fensterbank und eingebauten Regalen, Sonne auf Dielenboden',
  },
];

/* ── Leistungen (Card-Scroller, je Leistung ein Foto, slug-verschlüsselt) ─ */
export const leistungenImages: Record<string, Bild> = {
  neuanfertigung: {
    id: 'IMG_2746',
    src: lMoebelbau,
    sektion: 'leistungen',
    hochformat: false,
    caption: 'Neuanfertigung — Möbelbau in der Werkstatt',
    alt: 'Tischler sägt eine Verbindung an einem Nussbaum-Korpus in der Werkstatt',
  },
  restaurierung: {
    id: 'IMG_2748',
    src: lRestaurierung,
    sektion: 'leistungen',
    hochformat: false,
    caption: 'Restaurierung — Möbel mit Geschichte',
    alt: 'Hand prüft eine polierte Furnier-Intarsie unter Arbeitsleuchte, Poliertuch daneben',
  },
  reparatur: {
    id: 'IMG_2745',
    src: lReparatur,
    sektion: 'leistungen',
    hochformat: false,
    caption: 'Reparatur & Austausch — Fenster und Türen',
    alt: 'Zwei Tischler setzen ein neues Holzfenster in einen Altbau ein',
  },
  wartung: {
    id: 'IMG_2743',
    src: lWartung,
    sektion: 'leistungen',
    hochformat: false,
    caption: 'Wartung — Service vor Ort',
    alt: 'Zwei Mitarbeiter am Fandrich-Servicewagen mit Werkzeugkoffer auf der Straße',
  },
};

/* ── Galerie „Aus der Werkstatt" (Reihenfolge = R3-Rhythmus) ──────────── */
export const galerieImages: Bild[] = [
  {
    id: 'IMG_2475',
    src: loft,
    sektion: 'galerie',
    hochformat: false,
    nr: '01',
    caption: 'Küchenzeile & Galerie, Lack und Stahl — Mitte', // TODO: Kiez verifizieren
    alt: 'Offenes Loft mit weißer Einbauküche unter einer Stahltreppe zur Galerie',
  },
  {
    id: 'IMG_2463',
    src: schrank,
    sektion: 'galerie',
    hochformat: true,
    nr: '02',
    caption: 'Einbauschrank in der Dachschräge, MDF lackiert — Prenzlauer Berg', // TODO: Kiez verifizieren
    alt: 'Begehbarer Einbauschrank unter einer Dachschräge mit maßgefertigten Fronten',
  },
  {
    id: 'IMG_2467',
    src: fassade,
    sektion: 'galerie',
    hochformat: true,
    nr: '03',
    caption: 'Fassade & Terrasse, Lärche — Barnim', // TODO: Ort verifizieren
    alt: 'Holzfassade aus Lärchenleisten mit Terrassendeck, Herbstbäume im Gegenlicht',
  },
  {
    id: 'IMG_2486',
    src: steg,
    sektion: 'galerie',
    hochformat: false,
    nr: '04',
    caption: 'Seesteg, Lärche geriffelt — Außenprojekt Brandenburg', // TODO: Ort verifizieren
    alt: 'Holzsteg aus Lärchendielen führt in einen ruhigen See, warmes Abendlicht',
  },
];

/* ── Werkstatt ────────────────────────────────────────────────────────── */
export const werkstattImage: Bild = {
  id: 'IMG_2482',
  src: werkstatt,
  sektion: 'werkstatt',
  hochformat: false,
  caption: 'Die Werkstatt, Treseburger Straße — Pankow',
  alt: 'Werkstattgebäude der Tischlerei Fandrich mit Schriftzug an der Fassade, Abendlicht',
};

/** Flache Liste aller platzierten Bilder (für OG-Bild, Sitemap etc.). */
export const alleBilder: Bild[] = [
  heroImage,
  ...ueberUnsImages,
  ...Object.values(leistungenImages),
  ...galerieImages,
  werkstattImage,
];
