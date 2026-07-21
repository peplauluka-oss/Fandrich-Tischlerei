import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import '../styles/faq.css';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const EASE_DRAWER = [0.32, 0.72, 0, 1] as const; // iOS-Drawer-Kurve (Emil)

interface Qa {
  frage: string;
  antwort: string;
}

const FRAGEN: Qa[] = [
  {
    frage: 'Repariert ihr auch Kunststofffenster?',
    antwort:
      'Ja. Wir warten und justieren Kunststofffenster, tauschen Glas und erneuern oder ersetzen Beschläge aller gängigen Hersteller — darunter Roto, Siegenia, Winkhaus, Schüco und G+U.',
  },
  {
    frage: 'Lohnt sich die Sanierung alter Kastenfenster?',
    antwort:
      'Fast immer. Sie ist günstiger als ein Austausch, erhält ein echtes Handwerksprodukt und verbessert Schall- und Wärmeschutz — bei einer kontrollierten Undichtigkeit, die die Bausubstanz vor Feuchte schützt.',
  },
  {
    frage: 'Könnt ihr auch moderne, industriell gefertigte Möbel reparieren?',
    antwort:
      'Gerade das ist unsere Stärke. Ob Nutzungs-, Transport-, Umzugs-, Wasser- oder Brandschaden oder ein defekter Beschlag — mit Erfahrung und Fingerspitzengefühl holen wir erstaunlich viel wieder heraus.',
  },
  {
    frage: 'Macht ihr auch Arbeiten an Küchen?',
    antwort:
      'Von der Reparatur über neue Arbeitsplatten und Geräte bis zum kompletten Küchenumzug mit Ab- und Wiederaufbau. Einzelne Elemente bauen wir passgenau nach, wenn Ihre Küche wachsen soll.',
  },
  {
    frage: 'Erhöht ihr auch den Einbruchschutz an Türen?',
    antwort:
      'Ja. An Wohnungs- und Haustüren ergänzen wir Mehrfachverriegelungen, Aufdopplungen, Aushebelsicherungen und Panzerriegel — zusätzlich zu den üblichen Tischlerarbeiten.',
  },
  {
    frage: 'Für wen arbeitet ihr?',
    antwort:
      'Für Privathaushalte, Hausverwaltungen und Unternehmen im Großraum Berlin — vom einzelnen klemmenden Fenster bis zur laufenden Betreuung ganzer Objekte.',
  },
];

interface Props {
  /** URL der Kiefer-Textur — Grundmaserung jeder Diele. */
  texUrl: string;
}

export default function FaqAccordion({ texUrl }: Props) {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <ul className="faq" style={{ ['--tex' as string]: `url(${texUrl})` }}>
      {FRAGEN.map((q, i) => {
        const isOpen = open === i;
        const ton = i % 4;
        return (
          <motion.li
            className={`faq__plank faq__plank--t${ton} ${isOpen ? 'is-open' : ''}`}
            key={q.frage}
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE_OUT, delay: i * 0.06 }}
          >
            <button
              type="button"
              className="faq__head"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="faq__frage">{q.frage}</span>
              <motion.span
                className="faq__toggle"
                aria-hidden="true"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.22, ease: EASE_OUT }}
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="faq__panelwrap"
                  initial={reduced ? { opacity: 1 } : { height: 0, opacity: 0 }}
                  animate={reduced ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                  exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.34, ease: EASE_DRAWER }}
                >
                  <p className="faq__antwort">{q.antwort}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        );
      })}
    </ul>
  );
}
