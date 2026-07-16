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

## Deploy (GitHub Pages — automatisch)

Es gibt **eine** Deploy-Quelle: den Workflow
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Er baut mit der
offiziellen Astro-Action (`withastro/action`) und veröffentlicht über
`actions/deploy-pages`. Jeder Push auf `main` (oder den aktuellen
Entwicklungs-Branch) deployt automatisch — kein manueller Build, kein
`gh-pages`-Branch mehr.

Live: **https://peplauluka-oss.github.io/Fandrich-Tischlerei/**

### Einmalig einzustellen (2 Klicks, nur der Betreiber kann das)

Die Veröffentlichung über Actions muss einmal als Quelle gewählt werden:

1. Im Repository auf **Settings → Pages**.
2. Unter **Build and deployment → Source** den Punkt **„GitHub Actions“**
   auswählen (statt „Deploy from a branch“).

Danach genügt jeder Push; der Workflow erledigt Build und Deploy. Der Footer
zeigt einen Marker **„Stand: JJJJ-MM-TT · <commit>“**, an dem man erkennt,
welcher Stand gerade live ist (wird beim Build automatisch gesetzt).

### Eigene Domain

In `astro.config.mjs` `SITE` auf die Domain und `BASE` auf `'/'` setzen
(wichtig für Sitemap, Canonical-URLs und OG-Image), dann eine `CNAME`-Datei
im `public/`-Ordner anlegen.

## Bühne & Interaktion (Runde 3)

- **Preloader** (einmal pro Session, `sessionStorage`): „Messen. → Fügen. →
  Bleiben.", danach Vorhang-Reveal. Skip per Klick/Tap, bei reduced-motion aus.
- **Lenis Smooth-Scroll** nur auf Desktop/feinen Zeigegeräten; Touch scrollt nativ.
- **Zeilen-Reveal-System** (`.split`, vanilla): Headlines fahren zeilenweise aus
  overflow-hidden-Masken hoch (`src/scripts/stage.ts`).
- **Custom Cursor** (nur Desktop): Punkt, der über Galeriebildern zum
  „Ansehen"-Kreis wird.
- **Gallery Walk** horizontal gepinnt auf Desktop (Framer Motion `useScroll`,
  transform-only), vertikal mit Rhythmus auf Mobil, statisch bei reduced-motion.
- **Zum-Seitenanfang**-Button, feines SVG-Noise-Overlay, Marquee-Band.

Aus den Referenzen übernommen und weiterentwickelt: warmer **Oak-Akzent-Button**
(Benchmark Bräutigam) für Formular und Walk-Abschluss; nummerierte Sektionen
(Carlwood); Zum-Seitenanfang (Lüdke). Bewusst **nicht** übernommen: gefälschte
Erfahrungs-Zahlen und die Karten-Raster der Baukasten-Referenzen — Weißraum und
editoriale Ruhe positionieren die Seite oberhalb dieser Vorlagen.

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
| Gründungsjahr | `src/data/site.ts` | Nicht verifiziert (Fassadenschild „seit 19??“ unleserlich, 1964 oder 1984) — die Website nennt deshalb bewusst KEINE Jahreszahl. Nach Klärung: Manifest-Satz und JSON-LD `foundingDate` ergänzen |
| Adresse & Telefon | `src/data/site.ts` | Treseburger Straße 30 / 030 36 44 57 60 verifizieren |
| E-Mail-Adresse | `src/data/site.ts` | `email` ist leer — Kontakt, Footer und Formular-Fallback blenden E-Mail solange aus. Echte Adresse eintragen |
| Geo-Koordinaten | `src/data/site.ts` | Exakte Koordinaten für Karte + JSON-LD prüfen |
| Öffnungszeiten | `src/data/site.ts` | `openingHours` und `openingHoursSchema` ausfüllen |
| Zahlenleiste | `src/components/Manifest.astro` | Ausgeblendet (`zahlen`-Array leer), bis echte Werte für Jahre/Projekte/Gewerke vorliegen — keine Platzhalter-Zahlen live |
| Bild-Captions | `src/data/images.ts` | Alle Kiez- und Materialangaben sind plausible Platzhalter — vom Betrieb bestätigen lassen |
| Formular-Backend | `src/components/KontaktForm.tsx` | `FORM_ENDPOINT` mit Formspree-URL füllen (kostenloses Konto auf formspree.io, Form anlegen, ID eintragen). Bis dahin zeigt das Formular beim Absenden eine ehrliche Fehlermeldung mit Telefonnummer |
| Impressum | `src/pages/impressum.astro` | Geschäftsführung, Registereintrag, USt-IdNr., Handwerksrolle, Verantwortliche:r |
| Datenschutz | `src/pages/datenschutz.astro` | Hostinganbieter und ggf. Formular-Dienstleister benennen |
| Bildmaterial | `src/assets/images/` | Originalauflösungen nachliefern (aktuell max. 800 px). Danach in `src/data/images.ts` die Imports tauschen und `MIN_WALK_BREITE` auf 800 anheben — Layoutgrößen folgen automatisch den neuen Pixelmaßen |
