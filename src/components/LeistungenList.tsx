import { useEffect, useRef, useState } from 'react';
import '../styles/leistungen.css';

export interface Leistung {
  nr: string;
  titel: string;
  text: string;
  img: string;
  alt: string;
}

interface Props {
  items: Leistung[];
}

export default function LeistungenList({ items }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Cursor-folgendes Bild-Preview (nur Desktop / feine Zeigegeräte), lerp 0.08.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1025px)').matches;
    if (reduced || !fine) return;

    const el = previewRef.current;
    const list = listRef.current;
    if (!el || !list) return;

    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let lastX = 0;
    let rot = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    list.addEventListener('mousemove', onMove);

    const render = () => {
      pos.x += (target.x - pos.x) * 0.08;
      pos.y += (target.y - pos.y) * 0.08;
      // Rotation ±2° je nach Bewegungsrichtung, gedämpft
      const dx = pos.x - lastX;
      lastX = pos.x;
      rot += (Math.max(-2, Math.min(2, dx * 0.4)) - rot) * 0.1;
      el.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) rotate(${rot}deg)`;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      list.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="leist" data-dimmed={active !== null}>
      <ul className="leist__rows" ref={listRef}>
        {items.map((l, i) => (
          <li
            key={l.nr}
            className="leist__row reveal"
            style={{ ['--reveal-delay' as string]: `${i * 0.09}s` }}
            data-active={active === i}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <span className="leist__nr" aria-hidden="true">
              {l.nr}
            </span>
            <div className="leist__body">
              <h3 className="leist__titel">{l.titel}</h3>
              <p className="leist__text">{l.text}</p>
            </div>
            {/* Statisches Thumbnail nur auf Touch/Mobil */}
            <img className="leist__thumb photo-img" src={l.img} alt={l.alt} loading="lazy" />
          </li>
        ))}
      </ul>

      {/* Cursor-folgendes Preview (Desktop) */}
      <div className="leist__preview" ref={previewRef} aria-hidden="true" data-show={active !== null}>
        {items.map((l, i) => (
          <img
            key={l.nr}
            src={l.img}
            alt=""
            className="photo-img"
            style={{ opacity: active === i ? 1 : 0 }}
          />
        ))}
      </div>
    </div>
  );
}
