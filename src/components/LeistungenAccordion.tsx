import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { REVEAL_EASE, DURATION, STAGGER } from '../tokens/motion';
import '../styles/leistungen4.css';

interface Item {
  nr: string;
  titel: string;
  text: string;
  stichworte: string[];
}

const LEISTUNGEN: Item[] = [
  {
    nr: '01',
    titel: 'Neuanfertigung',
    text: 'Einbauschränke, Küchen und Bibliotheken, entworfen für Ihren Raum. Gefertigt aus Massivholz und ausgesuchten Furnieren — vom Aufmaß bis zur letzten Fuge.',
    stichworte: ['Einbauschränke', 'Küchen', 'Bibliotheken', 'Massivholz'],
  },
  {
    nr: '02',
    titel: 'Restaurierung',
    text: 'Wir setzen Möbel mit Geschichte instand — mit Schellackpolitur, traditionellen Leimen und Respekt vor der Substanz. Was Ihre Familie geprägt hat, bleibt erhalten.',
    stichworte: ['Schellackpolitur', 'traditionelle Leime', 'Furnierbild'],
  },
  {
    nr: '03',
    titel: 'Innenausbau & Reparatur',
    text: 'Türen, Dielung, Fensterinstandsetzung und Balkonverglasung im Berliner Altbau. Präzise Reparaturen, die man am Ende nicht mehr sieht.',
    stichworte: ['Türen', 'Dielung', 'Fensterinstandsetzung', 'Balkonverglasung'],
  },
];

export default function LeistungenAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <ul className="lst4">
      {LEISTUNGEN.map((l, i) => {
        const isOpen = open === i;
        return (
          <motion.li
            className={`lst4__row ${isOpen ? 'is-open' : ''}`}
            key={l.nr}
            initial={reduced ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: DURATION.reveal, ease: REVEAL_EASE, delay: i * STAGGER }}
          >
            <button
              type="button"
              className="lst4__head"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="lst4__nr" aria-hidden="true">
                {l.nr}
              </span>
              <span className="lst4__titel">{l.titel}</span>
              <motion.span
                className="lst4__toggle"
                aria-hidden="true"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: DURATION.hover, ease: REVEAL_EASE }}
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="lst4__panelwrap"
                  initial={reduced ? { opacity: 1 } : { height: 0, opacity: 0 }}
                  animate={reduced ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                  exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: REVEAL_EASE }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="lst4__panel">
                    <p className="lst4__text">{l.text}</p>
                    <p className="lst4__tags">
                      {l.stichworte.map((s, k) => (
                        <span key={s}>
                          {k > 0 && (
                            <span className="lst4__dot" aria-hidden="true">
                              ·
                            </span>
                          )}
                          {s}
                        </span>
                      ))}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        );
      })}
    </ul>
  );
}
