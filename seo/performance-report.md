# Performance-Report — Phase 4

**Ziel:** Lighthouse Mobile ≥ 95, LCP < 2,0 s, CLS < 0,05.
**Ehrliche Einschränkung:** In der Build-/Agent-Umgebung lässt sich **kein echter Lighthouse-Lauf** durchführen (kein Headless-Chrome-Audit mit Netzdrosselung). Dieser Report dokumentiert die umgesetzten Optimierungen und die Architektur-Fakten; **die finalen Scores misst du/dein Mentor live** (Chrome DevTools → Lighthouse, Mobil) — idealerweise erst nach dem Umzug auf die eigene Domain.

## Umgesetzt / bereits erfüllt

| Kriterium | Status | Detail |
|---|---|---|
| **Self-hosted Fonts** | ✅ | `@fontsource-variable/inter` + `fraunces` — lokal gebündelt, **kein** fonts.googleapis/gstatic-Request. `font-display: swap` gesetzt. |
| **Keine externen Requests im initialen Load** | ✅ | Partnerlogos entlinkt, OSM-Karte lädt erst nach Klick (Zwei-Klick). Im finalen HTML kein externer Host außer den ruhenden OSM-URLs im Click-Handler. |
| **Kein Preloader** | ✅ | `stage.ts` startet direkt im Hero, kein blockierender Overlay-Loader. |
| **LCP** | ✅ günstig | Hero ist **textbasiert** (kein großes Hero-Bild). LCP-Kandidat ist die H1 bzw. die Holztextur — kein schweres Bild im kritischen Pfad. |
| **Bilder** | ✅ | Alle über Astro `<Image>` → WebP, `srcset`/`sizes`, automatische `width`/`height` (CLS-sicher). Unterhalb des Folds `loading="lazy"` + `decoding="async"`. |
| **Vollflächen-Holztextur** | ✅ optimiert | War 77 kB JPEG auf **jeder** Seite → jetzt als **WebP** via `getImage` (~⅓ der Größe). |
| **CLS** | ✅ erwartet gering | Bild-Dimensionen gesetzt; Font-Swap auf Variable-Fonts mit ähnlichen Metriken. |
| **JS nur wo nötig** | ✅ | Statische Sektionen sind reines HTML/CSS; interaktive Teile sind Astro-Islands (`client:visible`/`client:load`) — Nav, Leistungs-Scroller, FAQ, Karate-Chop, Craft/Philosophy. |
| **Sitemap / robots / Canonicals** | ✅ | `@astrojs/sitemap`, `astro-robots-txt`, Canonical je Seite. |

## Bewusste Trade-offs

- **Framer-Motion-Bundle (~JS):** Die physik-basierten Animationen (Karate-Chop, Magnetik, Sticky-Stack, Scroller) bringen JS-Gewicht mit (React + framer-motion, gzip deutlich kleiner als die Rohgröße). Das ist der Preis für das „Awwwards"-Interaktionsniveau. Da das Design **final** ist, bleibt es — Islands laden bereits verzögert (`client:visible`), sodass der Erst-Load der statischen Inhalte nicht blockiert wird.
- **Reduced-Motion:** Alle Effekte sind bei `prefers-reduced-motion` deaktiviert — gut für Barrierefreiheit und schwächere Geräte.

## Optionale weitere Schritte (nicht umgesetzt, dokumentiert)

1. **Font-Preload** der Above-the-fold-Schnitte: mit `@fontsource` sind die Dateinamen erst nach dem Build gehasht — ein robustes `<link rel="preload">` bräuchte Astros experimentelle Fonts-API oder ein manuelles Self-Hosting nach `/public/fonts/`. Wegen `font-display: swap` ist der Nutzen gering; bewusst zurückgestellt.
2. **Island-Diät:** Falls der Lighthouse-JS-Wert live drückt, ließen sich einzelne Islands zusammenlegen — nur nach Rücksprache, da es das Verhalten berührt.
3. **Eigene Domain + HTTP/2/3-Caching** (siehe `todo-betreiber.md`): bringt neben SEO auch Performance-Vorteile.

## Nächster Messschritt (für den Betreiber)

1. Chrome → Seite öffnen → DevTools → **Lighthouse** → „Mobile" → „Analyze page load".
2. Werte für Performance / LCP / CLS / TBT notieren.
3. Bei Auffälligkeiten hier zurückmelden — gezielte Optimierung ist dann möglich.
