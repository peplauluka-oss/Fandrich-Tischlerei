/**
 * Hero-Medien — EINZIGE Quelle für den Hero-Hintergrund (Sektion S1).
 *
 * Später: 2–3 Werkstatt-Clips (MP4/WebM) in `public/videos/` ablegen und hier
 * als `heroVideos` eintragen. Dann spielt der Hero die Clips (muted/loop/
 * playsinline/autoplay, Crossfade ~9s; auf Mobil/Datensparmodus nur Poster).
 *
 * Solange `heroVideos` leer ist, zeigt der Hero das Poster-Bild mit Ken-Burns.
 * TODO: Es existiert KEIN GROSS-Bild (≥1200px, siehe STATUS.md). Als Poster
 * dient das stärkste verfügbare Interieur (IMG_2479, 640px) — für die
 * Full-Bleed-Fläche eigentlich zu klein. Original in ≥1600px nachliefern.
 */
import type { ImageMetadata } from 'astro';
import { heroImage } from './images';

export interface HeroVideo {
  /** Pfad relativ zu import.meta.env.BASE_URL, z. B. 'videos/werkstatt-1.webm' */
  webm?: string;
  mp4?: string;
}

/** Leer = Ken-Burns-Poster. Sobald Clips vorliegen: hier eintragen. */
export const heroVideos: HeroVideo[] = [];

/** Poster stammt aus der zentralen Bildzuordnung (images.ts) — Hero-Bild. */
export const heroPoster: ImageMetadata = heroImage.src;

export const heroAlt = heroImage.alt;
