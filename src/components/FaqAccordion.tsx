import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { REVEAL_EASE, DURATION, STAGGER } from '../tokens/motion';
import '../styles/faq.css';

interface Qa {
  frage: string;
  antwort: string;
}

// Verdichtete Q&A aus dem detaillierten Leistungs-Content der Altseite —
// je eine gängige Kundenfrage, knapp und modern beantwortet.
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

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <ul className="faq">
      {FRAGEN.map((q, i) => {
        const isOpen = open === i;
        return (
          <motion.li
            className={`faq__row ${isOpen ? 'is-open' : ''}`}
            key={q.frage}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: DURATION.reveal, ease: REVEAL_EASE, delay: i * STAGGER }}
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
                transition={{ duration: DURATION.hover, ease: REVEAL_EASE }}
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
                  transition={{ duration: 0.5, ease: REVEAL_EASE }}
                  style={{ overflow: 'hidden' }}
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
