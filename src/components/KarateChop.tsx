import { useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import '../styles/karate.css';

interface Props {
  /** WebP-URL des Holzbretts (füllt beide Hälften identisch). */
  woodSrc: string;
  /** Das darunterliegende Werk (Foto). */
  children: ReactNode;
  /** Hinweistext auf dem Brett. */
  hint?: string;
}

// Kräftige, „explosive" Feder wie in der Vorgabe.
const SPRING = { type: 'spring' as const, stiffness: 200, damping: 15 };

export default function KarateChop({ woodSrc, children, hint = 'Zum Aufbrechen tippen' }: Props) {
  const reduced = useReducedMotion();
  const [broken, setBroken] = useState(false);

  // Reduced-Motion: kein Brett, Werk direkt sichtbar.
  if (reduced) return <div className="kc" data-broken="true">{children}</div>;

  const wood = { backgroundImage: `url(${woodSrc})` };
  const brk = () => setBroken(true);

  return (
    <div
      className="kc"
      data-broken={broken}
      role={broken ? undefined : 'button'}
      tabIndex={broken ? undefined : 0}
      aria-label={broken ? undefined : 'Werk aufdecken'}
      onClick={broken ? undefined : brk}
      onKeyDown={
        broken
          ? undefined
          : (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                brk();
              }
            }
      }
    >
      <motion.div
        className="kc__content"
        initial={false}
        animate={{ scale: broken ? 1 : 0.9 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>

      <motion.div
        className="kc__half kc__half--l"
        style={wood}
        initial={false}
        animate={broken ? { x: '-108%', rotate: -15, opacity: 0 } : { x: 0, rotate: 0, opacity: 1 }}
        transition={SPRING}
      />
      <motion.div
        className="kc__half kc__half--r"
        style={wood}
        initial={false}
        animate={broken ? { x: '108%', rotate: 15, opacity: 0 } : { x: 0, rotate: 0, opacity: 1 }}
        transition={SPRING}
      />

      {!broken && (
        <motion.span
          className="kc__hint"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {hint}
        </motion.span>
      )}
    </div>
  );
}
