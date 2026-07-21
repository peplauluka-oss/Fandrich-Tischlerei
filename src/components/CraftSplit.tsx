import { useRef, type ReactNode } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import '../styles/craft.css';

export interface CraftImage {
  src: string;
  alt: string;
  caption: string;
  ratio: number; // width / height, für aspect-ratio
}

interface Props {
  images: CraftImage[];
}

const EASE_DRAWER = [0.32, 0.72, 0, 1] as const; // iOS-Drawer-Kurve (Emil)
const TITLE_LINES = ['Vom Aufmaß bis', 'zur Montage.'];

/* Magnetischer Button: useSpring auf x/y, an die Cursor-Position gekoppelt.
   Kein State im Render-Pfad -> 60 fps, jederzeit unterbrechbar (Emil). */
function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.6 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, display: 'inline-block' }}
    >
      {children}
    </motion.span>
  );
}

/* Ein Bild mit Parallax: das Bild im Rahmen wandert langsamer als der Scroll. */
function ParallaxFigure({
  im,
  withBadge,
  reduced,
}: {
  im: CraftImage;
  withBadge: boolean;
  reduced: boolean | null;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-9%', '9%']);

  return (
    <figure className="cs__fig" ref={ref}>
      <div className="cs__frame" style={{ aspectRatio: String(im.ratio) }}>
        <motion.img
          src={im.src}
          alt={im.alt}
          loading="lazy"
          decoding="async"
          style={{ y: reduced ? 0 : y }}
        />
      </div>
      {withBadge && (
        <span className="cs__badge">
          <strong>Meisterbetrieb</strong>
          <span>Tischlerei · Pankow</span>
        </span>
      )}
      <figcaption className="cs__loc">{im.caption}</figcaption>
    </figure>
  );
}

export default function CraftSplit({ images }: Props) {
  const reduced = useReducedMotion();

  return (
    <div className="cs">
      <div className="cs__left">
        <h2 className="cs__title" aria-label={TITLE_LINES.join(' ')}>
          {TITLE_LINES.map((line, i) => (
            <span className="cs__line" key={line} aria-hidden="true">
              <motion.span
                initial={reduced ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: EASE_DRAWER, delay: 0.08 + i * 0.1 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>

        <p className="cs__intro">
          Wir sind eine <strong>Meistertischlerei in Berlin-Pankow</strong> — Fenster, Türen und
          Möbel entstehen vom ersten Aufmaß bis zur Montage aus einer Hand.
        </p>
        <p className="cs__body">
          Jedes Stück entsteht in unserer eigenen Werkstatt — Einbaumöbel, Restaurierungen,
          Innenausbau. Wir arbeiten mit Massivholz und ausgesuchten Furnieren, und dort, wo es das
          Möbel verlangt, mit handgeschnittenen Verbindungen.
        </p>
        <p className="cs__motto">Was wir bauen, soll bleiben.</p>

        <Magnetic>
          <a href="#werkstatt-v4" className="btn btn--oak cs__cta" data-cursor="link">
            Mehr über die Werkstatt <span className="arrow" aria-hidden="true">→</span>
          </a>
        </Magnetic>
      </div>

      <div className="cs__gallery">
        {images.map((im, i) => (
          <ParallaxFigure key={im.src} im={im} withBadge={i === 0} reduced={reduced} />
        ))}
      </div>
    </div>
  );
}
