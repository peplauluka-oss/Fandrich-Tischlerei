import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';
import { galerieImages, type Bild } from '../data/images';
import '../styles/showcase.css';

/**
 * Galerie als immersive Full-Bleed-Bühne: jedes Werk bekommt ein eigenes
 * Panel mit unscharfem Bildfeld (macht kleine Originale groß, ohne sie
 * hochzuskalieren), scharfem Werk-Bild mit Scroll-Parallax und riesiger
 * Outline-Nummer, die gegenläufig wandert (Tiefe). Alles transform-only.
 */

function Panel({ bild, flip }: { bild: Bild; flip: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const y = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const yNr = useTransform(scrollYProgress, [0, 1], [-60, 90]);
  const scale = useTransform(scrollYProgress, [0, 0.35], [0.93, 1]);

  const motionStyle = reduced ? {} : { y, scale };
  const nrStyle = reduced ? {} : ({ y: yNr } as { y: MotionValue<number> });

  return (
    <div ref={ref} className={`shc__panel ${flip ? 'shc__panel--flip' : ''}`}>
      {/* Unscharfes Bildfeld: volle Breite, Blur kaschiert die Auflösung */}
      <div className="shc__bg" aria-hidden="true">
        <img src={bild.src.src} alt="" loading="lazy" decoding="async" />
      </div>

      <motion.span className="shc__nr" aria-hidden="true" style={nrStyle}>
        {bild.nr}
      </motion.span>

      <motion.figure className="shc__fig" style={motionStyle}>
        <img
          className="shc__img"
          src={bild.src.src}
          alt={bild.alt}
          width={bild.src.width}
          height={bild.src.height}
          style={{ maxWidth: `min(86vw, ${bild.src.width}px)` }}
          loading="lazy"
          decoding="async"
        />
        <figcaption className="shc__cap">
          <span className="shc__capmark" aria-hidden="true" />
          <span>
            <span className="shc__capnr">Abb. {bild.nr}</span> — {bild.caption}
          </span>
        </figcaption>
      </motion.figure>
    </div>
  );
}

const ZITAT = 'Ein Möbel ist gut, wenn man nach zwanzig Jahren nichts daran ändern möchte.';

export default function ShowcaseGallery() {
  const [p1, p2, p3, p4] = galerieImages;
  return (
    <div className="shc">
      <Panel bild={p1} flip={false} />
      <Panel bild={p2} flip={true} />

      <div className="shc__quote">
        <blockquote className="shc__quotetext">{ZITAT}</blockquote>
      </div>

      <Panel bild={p3} flip={false} />
      <Panel bild={p4} flip={true} />

      <div className="shc__cta">
        <a href="#kontakt-v4" className="btn btn--oak" data-cursor="link">
          Projekt anfragen <span className="arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
