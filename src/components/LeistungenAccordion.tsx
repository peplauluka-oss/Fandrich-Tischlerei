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
    text: 'Möbel, Fenster und Türen nach Maß — entworfen für Ihren Raum, gefertigt aus Massivholz und ausgesuchten Furnieren. Vom Einbauschrank über die Küche bis zum Holz- oder Kunststofffenster, alles vom Aufmaß bis zur Montage.',
    stichworte: ['Möbel nach Maß', 'Holzfenster', 'Türen', 'Einbauschränke', 'Küchen'],
  },
  {
    nr: '02',
    titel: 'Restaurierung',
    text: 'Ob Familienerbstück oder modernes Designmöbel — wir setzen Stücke mit Geschichte wieder instand: Schellackpolitur, traditionelle Leime, Reparatur von Nutzungs-, Wasser- oder Brandschäden. Auch alte Kastenfenster bringen wir fachgerecht zurück.',
    stichworte: ['Möbelrestaurierung', 'Schellackpolitur', 'Kastenfenster', 'Schadensreparatur'],
  },
  {
    nr: '03',
    titel: 'Reparatur',
    text: 'Fenster, Türen, Treppen, Böden und Küchen — wir richten, was klemmt, zieht oder verschlissen ist. Vom Einstellen und Abdichten über den Austausch einzelner Teile bis zu neuen Beschlägen und mehr Einbruchschutz an der Haustür.',
    stichworte: ['Fenster & Türen', 'Treppen', 'Parkett & Dielen', 'Küchen', 'Sicherheit'],
  },
  {
    nr: '04',
    titel: 'Wartung',
    text: 'Damit Fenster und Türen lange dicht und leichtgängig bleiben: regelmäßige Wartung, Nachstellen der Beschläge, Erneuern von Dichtungen. Für Privathaushalte, Hausverwaltungen und Unternehmen im Großraum Berlin.',
    stichworte: ['Fensterwartung', 'Beschläge', 'Dichtungen', 'Hausverwaltungen'],
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
