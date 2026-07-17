import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import '../styles/nav.css';

// Base-aware (Astro-`base` z. B. beim GitHub-Pages-Demo-Build)
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

const LINKS = [
  { href: `${BASE}/#arbeiten-v3`, label: 'Arbeiten' },
  { href: `${BASE}/#leistungen-v3`, label: 'Leistungen' },
  { href: `${BASE}/#werkstatt`, label: 'Werkstatt' },
  { href: `${BASE}/#kontakt`, label: 'Kontakt' },
];

const EASE = [0.22, 1, 0.36, 1] as const;

interface Props {
  /** Unterseiten ohne dunklen Hero: Navigation von Anfang an auf --paper */
  solid?: boolean;
}

export default function Nav({ solid = false }: Props) {
  const [scrolled, setScrolled] = useState(solid);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (solid) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > window.innerHeight * 0.8);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [solid]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`nav ${scrolled ? 'nav--solid' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav__inner">
        <a href={`${BASE}/#top`} className="nav__logo" onClick={close}>
          <span className="nav__brand">FANDRICH</span>
          <span className="nav__claim">Tischlerei &amp; Möbelrestaurierung, Berlin</span>
        </a>

        <nav className="nav__links" aria-label="Hauptnavigation">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="link-line nav__link">
              {l.label}
            </a>
          ))}
        </nav>

        <button
          className="nav__toggle"
          aria-expanded={open}
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav__bar" />
          <span className="nav__bar" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav__overlay"
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <nav className="nav__overlay-links" aria-label="Mobilnavigation">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={close}
                  initial={reduced ? {} : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.06 }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <motion.p
              className="nav__overlay-foot"
              initial={reduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
            >
              Treseburger Straße 30, 13129 Berlin
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
