/**
 * Scroll-Reveals für den statischen Astro-Teil.
 * IntersectionObserver + CSS-Klassen, einmalig (once), kein Scroll-Handler.
 */
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initReveals() {
  const els = document.querySelectorAll<HTMLElement>('.reveal');
  if (reduced) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -5% 0px' },
  );
  els.forEach((el) => io.observe(el));
}

/**
 * Zahlen-Countup (Manifest): zählt einmalig hoch, wenn sichtbar.
 * Elemente: [data-countup="ZIEL"], Dauer 1.2s, easeOut.
 */
function initCountups() {
  const els = document.querySelectorAll<HTMLElement>('[data-countup]');
  if (els.length === 0) return;

  const run = (el: HTMLElement) => {
    const target = Number(el.dataset.countup ?? '0');
    const suffix = el.dataset.countupSuffix ?? '';
    if (reduced) {
      el.textContent = `${target}${suffix}`;
      return;
    }
    const dur = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          run(entry.target as HTMLElement);
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.5 },
  );
  els.forEach((el) => io.observe(el));
}

/**
 * Manifest: Wort-für-Wort-Reveal gebunden an den Scrollfortschritt.
 * Kein Scroll-Jacking — die Deckkraft folgt der normalen Scrollposition.
 */
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
    // Fortschritt: 0 wenn Sektion unten einläuft, 1 wenn sie 35 % Höhe erreicht
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

/**
 * Prozess: vertikale Linie füllt sich mit Scrollfortschritt (transform only).
 */
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

initReveals();
initCountups();
initManifest();
initProcessLine();
