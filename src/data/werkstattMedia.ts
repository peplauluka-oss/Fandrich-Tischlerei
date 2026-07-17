/**
 * Werkstatt-Medien — VideoSlot der Werkstatt-Sektion (R5).
 *
 * Später: bis zu 4 kurze Werkstatt-Clips (MP4/WebM) in `public/videos/`
 * ablegen und hier als `werkstattVideos` eintragen. Dann spielt die
 * Werkstatt-Sektion die Clips (muted/loop/playsinline/autoplay, Crossfade);
 * auf Mobil/Datensparmodus nur das Poster.
 *
 * Solange `werkstattVideos` leer ist, zeigt die Sektion das Poster-Bild
 * (IMG_2482 aus der zentralen Zuordnung images.ts).
 */
import type { ImageMetadata } from 'astro';
import { werkstattImage } from './images';

export interface WerkstattVideo {
  /** Pfad relativ zu import.meta.env.BASE_URL, z. B. 'videos/werkstatt-1.webm' */
  webm?: string;
  mp4?: string;
}

/** Leer = Poster-Bild. Sobald Clips vorliegen: hier eintragen (max. 4). */
export const werkstattVideos: WerkstattVideo[] = [];

/** Poster stammt aus der zentralen Bildzuordnung — Werkstatt-Bild. */
export const werkstattPoster: ImageMetadata = werkstattImage.src;
export const werkstattAlt = werkstattImage.alt;
export const werkstattCaption = werkstattImage.caption;
