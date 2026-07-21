import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';
import '../styles/philosophy.css';

export interface Wert {
  t: string;
  d: string;
}

interface Props {
  werte: Wert[];
}

/** Desktop ab 900px -> Sticky-Stack, darunter -> Swipe-Karussell. */
function useIsDesktop(): boolean {
  // Default true: SSR/erste Rendern nimmt Desktop an (Desktop-first, kein Layout-Sprung dort).
  const [desktop, setDesktop] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)');
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return desktop;
}

function CardInner({ w, i }: { w: Wert; i: number }) {
  return (
    <>
      <span className="ps__num" aria-hidden="true">
        {String(i + 1).padStart(2, '0')}
      </span>
      <span className="ps__eyebrow" aria-hidden="true">
        Grundsatz
      </span>
      <h4 className="ps__t">{w.t}</h4>
      <p className="ps__d">{w.d}</p>
    </>
  );
}

/* ---------- Desktop: Sticky-Scroll-Stack ---------- */
function StackCard({
  w,
  i,
  n,
  progress,
}: {
  w: Wert;
  i: number;
  n: number;
  progress: MotionValue<number>;
}) {
  // Tiefer liegende (frühere) Karten werden beim Weiterscrollen leicht kleiner
  // -> physische Deck-Tiefe. Nur transform (60 fps). Ease über die Scroll-Range.
  const targetScale = 1 - (n - 1 - i) * 0.035;
  const scale = useTransform(progress, [i / n, 1], [1, targetScale]);
  return (
    <div className="ps__lane">
      <motion.article
        className="ps__card ps__stackcard"
        style={{ scale, ['--i' as string]: i }}
      >
        <CardInner w={w} i={i} />
      </motion.article>
    </div>
  );
}

function Stack({ werte }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  return (
    <div className="ps__track" ref={ref}>
      {werte.map((w, i) => (
        <StackCard key={w.t} w={w} i={i} n={werte.length} progress={scrollYProgress} />
      ))}
    </div>
  );
}

/* ---------- Mobil: Snap-Swipe-Karussell ---------- */
function Carousel({ werte }: Props) {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [swiped, setSwiped] = useState(false);

  const onScroll = () => {
    const rail = railRef.current;
    if (!rail) return;
    if (!swiped) setSwiped(true);
    // aktive Karte = welche liegt der Mitte am nächsten
    const mid = rail.scrollLeft + rail.clientWidth / 2;
    const kids = Array.from(rail.children) as HTMLElement[];
    let best = 0;
    let bestDist = Infinity;
    kids.forEach((el, idx) => {
      const c = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(c - mid);
      if (dist < bestDist) {
        bestDist = dist;
        best = idx;
      }
    });
    setActive(best);
  };

  return (
    <div className="ps__carousel">
      <div className="ps__rail" ref={railRef} onScroll={onScroll}>
        {werte.map((w, i) => (
          <article className="ps__card ps__slide" key={w.t}>
            <CardInner w={w} i={i} />
          </article>
        ))}
      </div>

      <div className="ps__dots" aria-hidden="true">
        {werte.map((w, i) => (
          <span key={w.t} className={`ps__dot${i === active ? ' is-on' : ''}`} />
        ))}
      </div>

      <div className={`ps__hint${swiped ? ' is-hidden' : ''}`} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
          <path d="M4 12h16M4 12l4-4M4 12l4 4M20 12l-4-4M20 12l-4 4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        wischen
      </div>
    </div>
  );
}

export default function PhilosophyStack({ werte }: Props) {
  const isDesktop = useIsDesktop();
  const reduced = useReducedMotion();

  // Reduced-Motion oder Mobil: das ruhige Karussell (kein Scroll-Hijack).
  if (!isDesktop || reduced) return <Carousel werte={werte} />;
  return <Stack werte={werte} />;
}
