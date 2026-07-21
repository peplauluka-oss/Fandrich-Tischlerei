import { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import { leistungen } from '../data/leistungen';
import '../styles/leistungen-scroll.css';

const EASE_OUT = [0.23, 1, 0.32, 1] as const; // Emil: strong ease-out

interface Props {
  /** URL der Kiefer-Textur (aus der Astro-Komponente durchgereicht). */
  texUrl: string;
}

export default function LeistungenScroller({ texUrl }: Props) {
  const reduced = useReducedMotion();
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const [maxDrag, setMaxDrag] = useState(0); // negativ: linke Grenze
  const [step, setStep] = useState(320); // eine Card + Gap
  const [dragging, setDragging] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const barRef = useRef<HTMLSpanElement>(null);

  // Grenzen messen (mount + resize + font/layout-shift)
  useEffect(() => {
    const measure = () => {
      const vp = viewportRef.current;
      const track = trackRef.current;
      if (!vp || !track) return;
      const inner = vp.clientWidth - 2 * getGutter(vp);
      const max = Math.min(0, inner - track.scrollWidth);
      setMaxDrag(max);
      const card = track.querySelector<HTMLElement>('.lsc__card');
      const gap = parseFloat(getComputedStyle(track).columnGap || '16') || 16;
      if (card) setStep(card.offsetWidth + gap);
      // x in Grenzen halten
      if (x.get() < max) x.set(max);
      updateEnds(x.get(), max);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateEnds = (val: number, max: number) => {
    setAtStart(val >= -1);
    setAtEnd(val <= max + 1);
  };

  // Fortschrittsbalken + Pfeil-Zustände an x koppeln
  useMotionValueEvent(x, 'change', (val) => {
    updateEnds(val, maxDrag);
    if (barRef.current) {
      const p = maxDrag < 0 ? Math.min(1, Math.max(0, val / maxDrag)) : 0;
      barRef.current.style.transform = `scaleX(${p || 0.0001})`;
    }
  });

  const go = (dir: -1 | 1) => {
    const target = Math.max(maxDrag, Math.min(0, x.get() - dir * step));
    if (reduced) {
      x.set(target);
      return;
    }
    animate(x, target, { type: 'spring', stiffness: 260, damping: 34, restDelta: 0.5 });
  };

  return (
    <div className="lsc">
      <div
        className={`lsc__viewport${dragging ? ' is-dragging' : ''}`}
        ref={viewportRef}
      >
        <motion.div
          className="lsc__track"
          ref={trackRef}
          style={{ x }}
          drag={reduced ? false : 'x'}
          dragConstraints={{ left: maxDrag, right: 0 }}
          dragElastic={0.14}
          dragMomentum={!reduced}
          dragTransition={{ power: 0.28, timeConstant: 260, bounceStiffness: 300, bounceDamping: 40 }}
          onDragStart={() => setDragging(true)}
          onDragEnd={() => setDragging(false)}
        >
          {leistungen.map((l, i) => (
            <motion.article
              key={l.slug}
              className={`lsc__card lsc__card--${l.ton}`}
              initial={reduced ? false : { opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: i * 0.06 }}
            >
              <div
                className="lsc__bg"
                aria-hidden="true"
                style={{ backgroundImage: `url(${texUrl})` }}
              />
              <div className="lsc__scrim" aria-hidden="true" />
              <div className="lsc__body">
                <span className="lsc__nr" aria-hidden="true">
                  {l.nr}
                </span>
                <h3 className="lsc__title">{l.titel}</h3>
                <p className="lsc__kurz">{l.kurz}</p>
                <ul className="lsc__tags">
                  {l.stichworte.slice(0, 4).map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <a
                  className="lsc__more"
                  href={`${base}/leistungen/${l.slug}`}
                  data-cursor="link"
                  draggable={false}
                >
                  Mehr erfahren <span className="arrow" aria-hidden="true">→</span>
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <div className="lsc__controls">
        <span className="lsc__bar" aria-hidden="true">
          <span className="lsc__barfill" ref={barRef} />
        </span>
        <div className="lsc__arrows">
          <button
            type="button"
            className="lsc__arrow"
            aria-label="Vorherige Leistung"
            onClick={() => go(-1)}
            disabled={atStart}
          >
            ←
          </button>
          <button
            type="button"
            className="lsc__arrow"
            aria-label="Nächste Leistung"
            onClick={() => go(1)}
            disabled={atEnd}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

/** Gutter (padding-inline des Viewports) in px auslesen. */
function getGutter(vp: HTMLElement): number {
  const pl = parseFloat(getComputedStyle(vp).paddingLeft || '0');
  return Number.isFinite(pl) ? pl : 0;
}
