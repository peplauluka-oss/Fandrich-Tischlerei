/**
 * Zentrale Motion-Tokens — EIN Easing-System für die ganze Seite.
 *
 * Spiegelbild der CSS-Custom-Properties in global.css:
 *   --ease-out     → REVEAL_EASE   (Reveals, Hover-Rückkehr, Bildfahrten)
 *   --ease-curtain → CURTAIN_EASE  (Vorhang/Clip-Übergänge)
 *
 * Regeln (Emil Kowalski / Taste):
 *  - Reveals einmalig (useInView { once: true }), Dauer 0.6–0.9 s.
 *  - Hover/Tap kurz, 0.2–0.3 s.
 *  - Nur transform / opacity / clip-path animieren (GPU) — nie width/height/top.
 *  - prefers-reduced-motion: keine Reveals, Scroll nativ.
 */

/** cubic-bezier(0.22, 1, 0.36, 1) — Standard-Ease für Reveals. */
export const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

/** cubic-bezier(0.76, 0, 0.24, 1) — symmetrisch, für Vorhang/Clip. */
export const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

export const DURATION = {
  /** Reveals (Text/Bild fahren ein) */
  reveal: 0.7,
  /** Längere Clip-/Bildfahrten */
  revealLong: 0.85,
  /** Hover / Tap */
  hover: 0.25,
} as const;

/** Fertige Framer-Motion-Transition für Standard-Reveals. */
export const revealTransition = {
  duration: DURATION.reveal,
  ease: REVEAL_EASE,
} as const;

/** Standard-Stagger für Listen (Sekunden zwischen Kindern). */
export const STAGGER = 0.08;
