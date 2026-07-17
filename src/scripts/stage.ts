/**
 * Globale Bühne: Lenis-Smooth-Scroll (nur Desktop), Zeilen-Reveal,
 * Block-Reveals, Custom-Cursor, Prozess-Linie, Manifest-Wort-Reveal.
 * KEIN Preloader — die Seite öffnet direkt im Hero.
 *
 * Animationsprinzipien (Emil Kowalski): jede Bewegung hat einen Zweck,
 * ein einziges Easing-System, Origin-aware (Zeilen von unten),
 * unterbrechbar (rAF-Lerp), bei reduced-motion vollständig deaktiviert.
 */
import Lenis from 'lenis';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const isDesktop = window.matchMedia('(min-width: 1025px)').matches;

/* ------------------------------------------------------------------ *
 * Lenis Smooth-Scroll (nur Desktop, kein Touch/reduced-motion)
 * ------------------------------------------------------------------ */
function initLenis() {
  if (reduced || !isDesktop || !finePointer) return null;

  const lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 1,
    smoothWheel: true,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Anker-Links über Lenis scrollen (respektiert scroll-margin nicht, daher Offset)
  document.querySelectorAll<HTMLAnchorElement>('a[href*="#"]').forEach((a) => {
    const url = new URL(a.href, location.href);
    if (url.pathname !== location.pathname) return;
    const hash = url.hash;
    if (!hash || hash === '#') return;
    a.addEventListener('click', (e) => {
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80 });
      history.replaceState(null, '', hash);
    });
  });

  return lenis;
}

/* ------------------------------------------------------------------ *
 * 3 — Zeilen-Reveal: Text in Zeilenmasken splitten, von unten einfahren
 * ------------------------------------------------------------------ */
function splitIntoLines(el: HTMLElement) {
  if (el.classList.contains('is-split')) return;
  const text = el.textContent ?? '';
  const words = text.trim().split(/\s+/);

  // Wörter einzeln wrappen, um Zeilenumbrüche zu messen
  el.textContent = '';
  const spans = words.map((w) => {
    const s = document.createElement('span');
    s.textContent = w;
    s.style.display = 'inline-block';
    el.append(s, document.createTextNode(' '));
    return s;
  });

  // Nach offsetTop gruppieren → Zeilen
  const lines: string[][] = [];
  let top: number | null = null;
  spans.forEach((s, idx) => {
    const t = s.offsetTop;
    if (top === null || Math.abs(t - top) > 2) {
      lines.push([]);
      top = t;
    }
    lines[lines.length - 1].push(words[idx]);
  });

  // In Masken neu aufbauen
  el.textContent = '';
  lines.forEach((line, idx) => {
    const mask = document.createElement('span');
    mask.className = 'line-mask';
    const inner = document.createElement('span');
    inner.className = 'line-inner';
    inner.textContent = line.join(' ');
    inner.style.setProperty('--line-delay', `${idx * 0.09}s`);
    mask.append(inner);
    el.append(mask);
  });
  el.classList.add('is-split');
}

function initReveals() {
  const splits = [...document.querySelectorAll<HTMLElement>('.split')];
  const blocks = [...document.querySelectorAll<HTMLElement>('.reveal')];

  if (reduced) {
    splits.forEach((el) => el.classList.add('is-visible'));
    blocks.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  // Splitten vor dem Beobachten (Layout ist nach Font-Load stabil)
  splits.forEach(splitIntoLines);

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -12% 0px' },
  );
  [...splits, ...blocks].forEach((el) => io.observe(el));
}

/* ------------------------------------------------------------------ *
 * 4 — Manifest: Wort-für-Wort-Opacity an Scrollprogress (kein Pinning)
 * ------------------------------------------------------------------ */
function initManifest() {
  const container = document.querySelector<HTMLElement>('[data-manifest]');
  if (!container) return;
  const words = container.querySelectorAll<HTMLElement>('.manifest-word');
  if (reduced) {
    words.forEach((w) => (w.style.opacity = '1'));
    return;
  }

  let ticking = false;
  const update = () => {
    ticking = false;
    const rect = container.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = Math.min(Math.max((vh * 0.85 - rect.top) / (vh * 0.5), 0), 1);
    const perWord = 1 / words.length;
    words.forEach((w, i) => {
      const local = Math.min(Math.max((progress - i * perWord) / (perWord * 2.5), 0), 1);
      w.style.opacity = String(0.15 + 0.85 * local);
    });
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  update();
}

/* ------------------------------------------------------------------ *
 * 5 — Prozess-Linie füllt sich mit Scrollfortschritt (transform only)
 * ------------------------------------------------------------------ */
function initProcessLine() {
  const line = document.querySelector<HTMLElement>('[data-process-line]');
  const track = document.querySelector<HTMLElement>('[data-process-track]');
  if (!line || !track) return;
  if (reduced) {
    line.style.transform = 'scaleY(1)';
    return;
  }

  let ticking = false;
  const update = () => {
    ticking = false;
    const rect = track.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = Math.min(Math.max((vh * 0.75 - rect.top) / rect.height, 0), 1);
    line.style.transform = `scaleY(${progress})`;
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  update();
}

/* ------------------------------------------------------------------ *
 * 6 — Custom Cursor (nur Desktop / pointer:fine), lerp-gedämpft
 * ------------------------------------------------------------------ */
function initCursor() {
  if (reduced || !finePointer) return;
  const cursor = document.querySelector<HTMLElement>('.cursor');
  if (!cursor) return;
  document.documentElement.classList.add('has-cursor');

  const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const pos = { ...target };
  let visible = false;

  window.addEventListener(
    'mousemove',
    (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        cursor.style.opacity = '1';
      }
    },
    { passive: true },
  );

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    visible = false;
  });

  // Zustände: Galeriebilder → "Ansehen"-Kreis, Links → dezent groß
  const bindHovers = () => {
    document.querySelectorAll<HTMLElement>('[data-cursor="view"]').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-view'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-view'));
    });
    document
      .querySelectorAll<HTMLElement>('a, button, [data-cursor="link"]')
      .forEach((el) => {
        el.addEventListener('mouseenter', () => cursor.classList.add('is-link'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('is-link'));
      });
  };
  bindHovers();

  const render = () => {
    pos.x += (target.x - pos.x) * 0.18;
    pos.y += (target.y - pos.y) * 0.18;
    cursor.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
}

/* ------------------------------------------------------------------ *
 * 7 — Zum Seitenanfang: erscheint nach dem ersten Viewport
 * ------------------------------------------------------------------ */
function initToTop(lenis: Lenis | null) {
  const btn = document.querySelector<HTMLButtonElement>('[data-totop]');
  if (!btn) return;
  btn.removeAttribute('hidden');

  let ticking = false;
  const update = () => {
    ticking = false;
    btn.classList.toggle('is-on', window.scrollY > window.innerHeight * 0.9);
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();

  btn.addEventListener('click', () => {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  });
}

/* ------------------------------------------------------------------ *
 * Boot
 * ------------------------------------------------------------------ */
function boot() {
  const lenis = initLenis();
  initReveals();
  initManifest();
  initProcessLine();
  initCursor();
  initToTop(lenis);
}

// Kein Preloader: Hero-Choreografie startet sofort beim Laden.
const start = () => {
  document.documentElement.classList.add('intro-done');
  if ('fonts' in document) {
    document.fonts.ready.then(boot);
  } else {
    boot();
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
