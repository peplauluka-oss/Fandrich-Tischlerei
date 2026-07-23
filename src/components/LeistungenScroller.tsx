import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame, useReducedMotion } from 'framer-motion';
import { leistungen } from '../data/leistungen';
import '../styles/leistungen-scroll.css';

interface Props {
  /** slug → optimierte WebP-URL des Card-Hintergrunds. */
  bg: Record<string, string>;
}

// Automatischer Drift nach rechts (px pro ms) — sanftes „Schweben".
const AUTO = 0.026;

export default function LeistungenScroller({ bg }: Props) {
  const reduced = useReducedMotion();
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Für den nahtlosen Loop wird das Set verdoppelt; setW = Breite EINES Sets.
  const setW = useRef(1);
  const dragging = useRef(false);
  const pointerStart = useRef(0);
  const xStart = useRef(0);
  const lastX = useRef(0);
  const lastT = useRef(0);
  const inertia = useRef(0); // px/ms Restschwung aus Flick/Nudge
  const moved = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const items = [...leistungen, ...leistungen]; // Duplikat für Endlos-Loop

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setW.current = track.scrollWidth / 2 || 1;
      x.set(wrap(x.get()));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // x immer im Bereich (-setW, 0] halten -> Sprung 0 ↔ -setW ist unsichtbar,
  // weil an beiden Stellen dasselbe (verdoppelte) Set beginnt.
  const wrap = (v: number) => {
    const w = setW.current;
    let r = v % w;
    if (r > 0) r -= w;
    return r;
  };

  useAnimationFrame((_, delta) => {
    if (dragging.current) return;
    const d = Math.min(delta, 50); // große Frame-Lücken (Tab-Wechsel) kappen
    let v = reduced ? 0 : AUTO;
    v += inertia.current;
    inertia.current *= 0.92;
    if (Math.abs(inertia.current) < 0.0005) inertia.current = 0;
    if (v === 0) return;
    x.set(wrap(x.get() + v * d));
  });

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    moved.current = false;
    setIsDragging(true);
    pointerStart.current = e.clientX;
    xStart.current = x.get();
    lastX.current = e.clientX;
    lastT.current = performance.now();
    inertia.current = 0;
    viewportRef.current?.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - pointerStart.current;
    if (Math.abs(dx) > 6) moved.current = true;
    x.set(wrap(xStart.current + dx));
    const now = performance.now();
    const dt = now - lastT.current || 16;
    inertia.current = (e.clientX - lastX.current) / dt;
    lastX.current = e.clientX;
    lastT.current = now;
  };
  const endDrag = () => {
    if (!dragging.current) return;
    dragging.current = false;
    setIsDragging(false);
  };

  // Klick unterdrücken, wenn zuvor gezogen wurde (sonst ungewollte Navigation).
  const onCardClickCapture = (e: React.MouseEvent) => {
    if (moved.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className="lsc">
      <div
        className={`lsc__viewport${isDragging ? ' is-dragging' : ''}`}
        ref={viewportRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onCardClickCapture}
      >
        <motion.div className="lsc__track" ref={trackRef} style={{ x }}>
          {items.map((l, i) => {
            const clone = i >= leistungen.length;
            return (
              <motion.article
                key={`${l.slug}-${i}`}
                className={`lsc__card lsc__card--${l.ton}`}
                aria-hidden={clone ? true : undefined}
                whileHover={reduced ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="lsc__bg"
                  aria-hidden="true"
                  style={{ backgroundImage: `url(${bg[l.slug]})` }}
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
                    tabIndex={clone ? -1 : undefined}
                  >
                    Mehr erfahren <span className="arrow" aria-hidden="true">→</span>
                  </a>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
