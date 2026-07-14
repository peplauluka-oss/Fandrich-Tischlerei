# Tischlerei Fandrich GmbH — Website

Premium-One-Pager für die Meistertischlerei Fandrich in Berlin-Pankow.
Gebaut mit [Astro](https://astro.build), React-Islands (Navigation, Galerie,
Formular) und Framer Motion.

## Entwicklung

```bash
npm install
npm run dev       # Entwicklungsserver auf http://localhost:4321
npm run build     # Produktions-Build nach dist/
npm run preview   # Build lokal testen
```

## Projektstruktur

```
src/
├── assets/images/       # Alle Projektfotos (Original-Dateinamen)
├── components/
│   ├── Nav.tsx          # Fixe Navigation + Mobil-Overlay (React)
│   ├── Hero.astro       # 01 — Vollbild-Hero mit Parallax
│   ├── Manifest.astro   # 02 — Statement + Zahlenleiste
│   ├── Leistungen.astro # 03 — Drei editoriale Leistungszeilen
│   ├── GalleryWalk.tsx  # 04 — Kuratierter Bild-Spaziergang (React)
│   ├── Werkstatt.astro  # 05 — Dunkle Material-Sektion
│   ├── Prozess.astro    # 06 — Vier Schritte mit Scroll-Linie
│   ├── Kontakt.astro    # 07 — Adresse, Formular, Two-Click-Karte
│   ├── KontaktForm.tsx  # Formular mit Client-Validierung (React)
│   └── Footer.astro
├── data/
│   ├── images.ts        # EINZIGE Quelle aller Bildzuordnungen
│   └── site.ts          # NAP-Stammdaten (Adresse, Telefon, Zeiten)
├── layouts/Base.astro   # <head>, SEO, OG, JSON-LD (LocalBusiness/Carpenter)
├── pages/               # index, impressum, datenschutz
├── scripts/reveal.ts    # Scroll-Reveals, Countup, Prozess-Linie
└── styles/              # global.css (Design-Tokens) + Komponenten-CSS
```

Die kuratorische Bildauswahl mit Begründung für jedes Bild: [AUSWAHL.md](./AUSWAHL.md)

## Bild austauschen in 1 Minute

1. Neue Datei nach `src/assets/images/` legen (JPEG/PNG, möglichst > 1600 px breit).
2. In `src/data/images.ts` oben einen Import ergänzen bzw. den bestehenden
   Import auf die neue Datei zeigen lassen:
   ```ts
   import kueche from '../assets/images/MEIN_NEUES_BILD.jpeg';
   ```
3. Im Eintrag darunter `caption` (Format „Werkstück, Material — Kiez“) und
   `alt` (beschreibender deutscher Satz) anpassen. Bei Hochformaten
   `hochformat: true` setzen.
4. `npm run build` — fertig. Astro erzeugt WebP-Varianten und `srcset`
   automatisch; nichts weiter anzufassen.

Die Reihenfolge im Gallery Walk steuert das Feld `reihenfolge`.

## Deploy (Vercel oder Netlify)

Statischer Build ohne Server-Funktionen — beide Anbieter erkennen Astro automatisch:

- **Vercel:** Repo importieren → Framework „Astro“ → Build `npm run build`, Output `dist/`.
- **Netlify:** Repo verbinden → Build `npm run build`, Publish directory `dist/`.

Danach in `astro.config.mjs` die finale Domain in `SITE` eintragen
(wichtig für Sitemap, Canonical-URLs und OG-Image).

## Qualität

Geprüft mit Lighthouse (mobil, Preview-Build): **Performance 95–97,
Accessibility 96, Best Practices 100, SEO 100.** Viewports 375/768/1440 px
ohne horizontale Scrollbalken, Touch-Ziele ≥ 44 px,
`prefers-reduced-motion` deaktiviert alle Animationen.

Bekannter Audit-Hinweis: Die Manifest-Sektion startet ihre Wörter bewusst bei
Opacity 0.15 (Wort-für-Wort-Reveal beim Scrollen) — axe meldet dafür einen
Kontrast-Befund. Das ist der Startzustand einer Animation; im Endzustand steht
der Text in vollem `--ink`-Kontrast.

## Offene TODOs vor dem Livegang

| Stelle | Datei | Was fehlt |
| --- | --- | --- |
| Domain | `astro.config.mjs` | Finale Domain in `SITE` eintragen |
| Gründungsjahr | `src/data/site.ts` | Fassadenschild sagt „Meisterbetrieb seit 1964“ — auf dem Foto schwer lesbar (evtl. 1984), verifizieren |
| Adresse & Telefon | `src/data/site.ts` | Treseburger Straße 30 / 030 36 44 57 60 verifizieren |
| E-Mail-Adresse | `src/data/site.ts` | Echte E-Mail eintragen (aktuell Platzhalter) |
| Geo-Koordinaten | `src/data/site.ts` | Exakte Koordinaten für Karte + JSON-LD prüfen |
| Öffnungszeiten | `src/data/site.ts` | `openingHours` und `openingHoursSchema` ausfüllen |
| Zahlenleiste | `src/components/Manifest.astro` | Jahre / Projekte / Gewerke: echte Werte eintragen |
| Bild-Captions | `src/data/images.ts` | Alle Kiez- und Materialangaben sind plausible Platzhalter — vom Betrieb bestätigen lassen |
| Formular-Backend | `src/components/KontaktForm.tsx` | `FORM_ENDPOINT` mit Formspree-URL füllen (kostenloses Konto auf formspree.io, Form anlegen, ID eintragen). Bis dahin zeigt das Formular beim Absenden eine ehrliche Fehlermeldung mit Ausweich-Kontakt |
| Impressum | `src/pages/impressum.astro` | Geschäftsführung, Registereintrag, USt-IdNr., Handwerksrolle, Verantwortliche:r |
| Datenschutz | `src/pages/datenschutz.astro` | Hostinganbieter und ggf. Formular-Dienstleister benennen |
| Bildmaterial | `src/assets/images/` | Originalauflösungen nachliefern (aktuell max. 800 px) — insbesondere Hero (IMG_2486) und die Werkstatt-Einzelbilder aus der Collage IMG_2489 |
