import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import '../styles/gallery.css';

export interface WalkImage {
  id: string;
  src: string;
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  hochformat: boolean;
}

interface Props {
  images: WalkImage[];
  /** Text der Zwischenstation (nach Station 4) */
  interlude: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return mobile;
}

function Station({ img, side }: { img: WalkImage; side: 'left' | 'right' | 'full' }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // Innerer Container ist 115 % hoch (top −7.5 %) → ±6.5 % Spielraum ohne Lücken.
  // Mobil reduziert auf ±20 px.
  const range = mobile ? ['-20px', '20px'] : ['-6.5%', '6.5%'];
  const desktop = useTransform(scrollYProgress, [0, 1], range);
  const y = reduced ? '0%' : desktop;

  const isFull = side === 'full';

  return (
    <figure className={`walk__station walk__station--${side}`}>
      <motion.div
        ref={ref}
        className="walk__frame photo"
        style={isFull ? undefined : { aspectRatio: `${img.width} / ${img.height}` }}
        initial={reduced ? { clipPath: 'inset(0 0 0 0)' } : { clipPath: 'inset(12% 0 12% 0)' }}
        whileInView={{ clipPath: 'inset(0% 0 0% 0)' }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <motion.div className="walk__parallax" style={{ y }}>
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
        </motion.div>
      </motion.div>
      <motion.figcaption
        className="walk__caption"
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
      >
        {img.caption}
      </motion.figcaption>
    </figure>
  );
}

function Interlude({ text }: { text: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.blockquote
      className="walk__interlude"
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      {text}
    </motion.blockquote>
  );
}

export default function GalleryWalk({ images, interlude }: Props) {
  // Hochformate versetzt (abwechselnd links/rechts), Querformate volle Breite.
  let portraitCount = 0;
  const stations = images.map((img) => {
    let side: 'left' | 'right' | 'full' = 'full';
    if (img.hochformat) {
      side = portraitCount % 2 === 0 ? 'right' : 'left';
      portraitCount += 1;
    }
    return { img, side };
  });

  return (
    <div className="walk">
      {stations.map(({ img, side }, i) => (
        <div key={img.id}>
          <Station img={img} side={side} />
          {i === 3 && <Interlude text={interlude} />}
        </div>
      ))}
    </div>
  );
}
