import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { galerieImages, type Bild } from '../data/images';
import '../styles/showcase.css';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const ZITAT = 'Ein Möbel ist gut, wenn man nach zwanzig Jahren nichts daran ändern möchte.';

/** Kurzform der Caption (Werkstück vor „ — Ort"). */
function work(caption: string): string {
  return caption.split(' — ')[0] ?? caption;
}

export default function ShowcaseGallery() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);
  const active: Bild | null = open === null ? null : galerieImages[open]!;

  // ESC schließt; Scroll sperren solange offen
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    document.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="ref">
      <div className="ref__grid">
        {galerieImages.map((b, i) => (
          <motion.button
            type="button"
            className="ref__card"
            key={b.id}
            onClick={() => setOpen(i)}
            aria-label={`Referenz ansehen: ${b.caption}`}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: i * 0.07 }}
          >
            <span className="ref__frame">
              <img
                src={b.src.src}
                alt={b.alt}
                width={b.src.width}
                height={b.src.height}
                loading="lazy"
                decoding="async"
              />
              <span className="ref__view" aria-hidden="true">
                Ansehen
              </span>
            </span>
            <span className="ref__cap">
              <span className="ref__nr" aria-hidden="true">
                {b.nr}
              </span>
              <span className="ref__captext">{work(b.caption)}</span>
            </span>
          </motion.button>
        ))}
      </div>

      <figure className="ref__quote">
        <span className="ref__quotemark" aria-hidden="true" />
        <blockquote className="ref__quotetext">{ZITAT}</blockquote>
      </figure>

      <div className="ref__cta">
        <a href="#kontakt-v4" className="btn btn--oak" data-cursor="link">
          Projekt anfragen <span className="arrow" aria-hidden="true">→</span>
        </a>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="ref__lb"
            role="dialog"
            aria-modal="true"
            aria-label={active.caption}
            initial={{ opacity: reduced ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
          >
            <button
              type="button"
              className="ref__lb-backdrop"
              aria-label="Schließen"
              onClick={() => setOpen(null)}
            />
            <motion.div
              className="ref__lb-panel"
              initial={reduced ? { scale: 1 } : { scale: 0.96, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { scale: 0.97, opacity: 0, y: 6 }}
              transition={{ duration: 0.24, ease: EASE_OUT }}
            >
              <button
                type="button"
                className="ref__lb-close"
                aria-label="Schließen"
                onClick={() => setOpen(null)}
              >
                ✕
              </button>
              <figure className="ref__lb-figure">
                <img
                  src={active.src.src}
                  alt={active.alt}
                  width={active.src.width}
                  height={active.src.height}
                  decoding="async"
                />
              </figure>
              <figcaption className="ref__lb-cap">
                <span className="ref__nr" aria-hidden="true">
                  {active.nr}
                </span>
                <span>{active.caption}</span>
              </figcaption>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
