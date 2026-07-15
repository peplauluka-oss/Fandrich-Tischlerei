import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import '../styles/gallery.css';

export interface WalkImage {
  id: string;
  src: string;
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
  displayWidth: number;
  alt: string;
  caption: string;
  hochformat: boolean;
}

interface Props {
  images: WalkImage[];
  interlude: string;
  interludeAfter?: number;
  ctaHref?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/* Panels aus Bildern + Zwischen-Zitat + Schluss-CTA bauen */
type Panel =
  | { kind: 'image'; img: WalkImage; variant: 'lg' | 'sm' }
  | { kind: 'quote'; text: string }
  | { kind: 'end' };

function buildPanels(images: WalkImage[], interlude: string, after: number): Panel[] {
  const panels: Panel[] = [];
  images.forEach((img, i) => {
    panels.push({ kind: 'image', img, variant: i % 2 === 0 ? 'lg' : 'sm' });
    if (i === after - 1) panels.push({ kind: 'quote', text: interlude });
  });
  panels.push({ kind: 'end' });
  return panels;
}

/* ---------- Horizontale, gepinnte Variante (Desktop) ---------- */
function HorizontalWalk({ panels, ctaHref }: { panels: Panel[]; ctaHref: string }) {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const imgX = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const d = Math.max(0, track.scrollWidth - window.innerWidth);
      setDistance(d);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [panels.length]);

  return (
    <section
      className="walkpin"
      ref={pinRef}
      style={{ height: `${distance + (typeof window !== 'undefined' ? window.innerHeight : 800)}px` }}
      aria-label="Ausgewählte Arbeiten"
    >
      <div className="walkpin__sticky">
        <motion.div className="walkpin__track" ref={trackRef} style={{ x }}>
          {panels.map((p, i) => {
            if (p.kind === 'quote') {
              return (
                <blockquote className="panel panel--quote" key={`q-${i}`}>
                  {p.text}
                </blockquote>
              );
            }
            if (p.kind === 'end') {
              return (
                <div className="panel panel--end" key="end">
                  <p className="panel__endLabel">Ausgewählte Arbeiten</p>
                  <p className="panel__endTitle">Alle Projekte zeigen wir beim Beratungstermin.</p>
                  <a href={ctaHref} className="btn btn--oak" data-cursor="link">
                    Termin anfragen <span className="arrow" aria-hidden="true">→</span>
                  </a>
                </div>
              );
            }
            const { img, variant } = p;
            return (
              <figure className={`panel panel--${variant}`} key={img.id}>
                <div className="panel__frame photo" data-cursor="view">
                  <motion.img
                    src={img.src}
                    srcSet={img.srcSet}
                    sizes={img.sizes}
                    width={img.width}
                    height={img.height}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    style={{ x: imgX }}
                  />
                </div>
                <figcaption className="panel__caption">{img.caption}</figcaption>
              </figure>
            );
          })}
        </motion.div>

        <div className="walkpin__progress" aria-hidden="true">
          <motion.span style={{ scaleX: progressScale }} />
        </div>
      </div>
    </section>
  );
}

/* ---------- Vertikale Variante (Mobil / reduced-motion) ---------- */
function VerticalStation({ img, side }: { img: WalkImage; side: 'full' | 'left' | 'right' }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  return (
    <motion.figure
      ref={ref}
      className={`vstation vstation--${side}`}
      style={{ maxWidth: img.displayWidth }}
      initial={reduced ? { clipPath: 'inset(0 0 0 0)' } : { clipPath: 'inset(10% 0 10% 0)' }}
      whileInView={{ clipPath: 'inset(0% 0 0% 0)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <div className="vstation__frame photo" style={{ aspectRatio: `${img.width} / ${img.height}` }}>
        <img
          src={img.src}
          srcSet={img.srcSet}
          sizes={img.sizes}
          width={img.width}
          height={img.height}
          alt={img.alt}
          loading="lazy"
          decoding="async"
        />
      </div>
      <figcaption className="vstation__caption">{img.caption}</figcaption>
    </motion.figure>
  );
}

function VerticalWalk({ images, interlude, after }: { images: WalkImage[]; interlude: string; after: number }) {
  const reduced = useReducedMotion();
  let portrait = 0;
  return (
    <div className="vwalk wrap">
      {images.map((img, i) => {
        let side: 'full' | 'left' | 'right' = 'full';
        if (img.hochformat) {
          side = portrait % 2 === 0 ? 'right' : 'left';
          portrait += 1;
        }
        return (
          <div key={img.id}>
            <VerticalStation img={img} side={side} />
            {i === after - 1 && (
              <motion.blockquote
                className="vwalk__quote"
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                {interlude}
              </motion.blockquote>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function GalleryWalk({ images, interlude, interludeAfter = 4, ctaHref = '#kontakt' }: Props) {
  const [horizontal, setHorizontal] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1025px)');
    const update = () => setHorizontal(mq.matches && !reduced);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [reduced]);

  if (horizontal) {
    const panels = buildPanels(images, interlude, interludeAfter);
    return <HorizontalWalk panels={panels} ctaHref={ctaHref} />;
  }
  return <VerticalWalk images={images} interlude={interlude} after={interludeAfter} />;
}
