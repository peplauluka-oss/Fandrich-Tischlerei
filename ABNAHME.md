# ABNAHME — Fandrich Website-Relaunch

**Live:** https://peplauluka-oss.github.io/Fandrich-Tischlerei/
**Stand der Abnahme:** 2026-07-17
**Deploy:** GitHub Actions (`withastro/action` + `actions/deploy-pages`), veröffentlicht
vom Default-Branch `main`. Vollständige Deploy-Historie in `DEPLOY_LOG.md`.

> **Prüf-Hinweis:** Aus der Build-Sandbox ist `*.github.io` netzseitig gesperrt
> (curl → 000, WebFetch → 403). „Live nachweisbar" = Actions-**Deploy-Job success**
> UND Sektions-Anker/Build-Marker im ausgelieferten Artefakt (identisch mit lokalem
> Build desselben Commits). Screenshots stammen aus dem lokalen Production-Preview
> (`npm run preview`) desselben Commits.

---

## Globale Gesetze (G1–G5)

| Gesetz | Anforderung | Umsetzung | Status |
| --- | --- | --- | --- |
| **G1** | Preloader ersatzlos gelöscht, Seite öffnet direkt im Hero | Preloader-Markup/CSS/`initPreloader` entfernt; `stage.ts` setzt `intro-done` sofort | ✅ |
| **G2 (Bild-Gesetz)** | Anzeige-Breite ≤ native ÷ 1.5; KLEIN nur als Thumbnail ≤ 320 px; Vollbreite nur für GROSS | Alle Slots gemäß `STATUS.md`; `mx = w/1.5`; KLEIN-Hochformate als ≤ 284 px-Thumbnails; keine echten Full-Bleed-Panels, da **kein GROSS-Bild** vorhanden (kein Upscaling) | ✅ |
| **G3 (Dichte-Gesetz)** | Sektionsabstand 96–140 px, Leere mit Dichte füllen | Abstände im Rahmen; versetzte Bildpaare, Zweispalter, große Typografie statt Weißraum | ✅ |
| **G4** | Tokens `--paper #FAF7F2`, `--ink #2B2523`, `--oak #B8895A`; Fraunces + Inter | In `global.css` gesetzt; Headlines Fraunces, Fließtext Inter | ✅ |
| **G5** | Jede Bewegung mit Zweck; Reveals 0.7 s, `cubic-bezier(0.22,1,0.36,1)`, einmalig; `prefers-reduced-motion` → statisch | IntersectionObserver-Reveals, Hero-Line-Stagger, interner Parallax; Reduced-Motion-Zweige vorhanden | ✅ |

---

## Sektionen

### S1 — Nav + Hero (`#hero-v3`) — Commit `010dfe6`
- **Spec erfüllt:** ✅ Nav fixed (--paper 90 % + Blur, 1px Oak-Linie); Hero 100 svh
  VideoSlot; bis Clips vorliegen bestes Bild mit Ken-Burns (1.0→1.08, 14 s, einmalig);
  Verlauf unten; Text unten-links (Oak-Eyebrow, weiße Fraunces-Headline
  „Handwerk, das bleibt.", Subline, Oak-CTA); Zeilen-Reveal-Stagger.
- **Live-Nachweis:** `id="hero-v3"` im Artefakt; Deploy success.
- **Offen (TODO):** Video-Clips (MP4/WebM) nachliefern → `src/data/heroMedia.ts`
  (`heroVideos` befüllen, dann Crossfade automatisch). Aktuell Ken-Burns-Poster.

### S2 — Über uns (`#ueber-uns-v3`) — Commit `234c6b7`
- **Spec erfüllt:** ✅ Eyebrow „ÜBER UNS", große Headline, 1 Absatz (4 Sätze, kein
  erfundenes Jahr), Sekundär-Link; versetztes Bildpaar (2 Spalten, rechts 64 px tiefer,
  Formate 4:5 + 3:4), Versalien-Captions, sequenzielle Clip-Path-Reveals.
- **Live-Nachweis:** `id="ueber-uns-v3"` im Artefakt; Deploy success.
- **Bugfix dokumentiert:** `clip-path` auf beobachtetem Element kollabiert
  `intersectionRatio` → Clip auf inneren Rahmen verlegt.
- **Offen (TODO):** Original-Hochformate ≥ 1200 px → dann größere Darstellung möglich
  (aktuell KLEIN-Hochformate als G2-konforme ≤ 284 px-Thumbnails).

### S3 — Leistungen (`#leistungen-v3`) — Commit `4c9942a`
- **Spec erfüllt:** ✅ Eyebrow „UNSERE LEISTUNGEN", Headline „Wie wir Ihnen helfen.";
  3 Zeilen (Neuanfertigung / Restaurierung / Innenausbau & Reparatur) mit Oak-Nummer,
  Fraunces-Titel ≥ 2 rem, 2 Sätzen, 1px-Trennern, Thumbnail ≤ 160 px (KLEIN erlaubt);
  Hover dimmt inaktive Zeilen auf 0.4.
- **Live-Nachweis:** `id="leistungen-v3"` im Artefakt; Deploy success.

### S4 — Arbeiten (`#arbeiten-v3`) — Commit `6d7f040`
- **Spec erfüllt:** ⚠️ **teilweise, spec-konformer Ausweichpfad.** Kein Grid/Filter;
  editoriale Sequenz aus Feature-Zeilen, versetzten Paaren, dunklem Typo-Panel
  (Zitat) und Schluss-Feature + CTA; interner Parallax; Versalien-Captions.
- **Abweichung (spec-gedeckt):** **Kein GROSS-Bild vorhanden** → keine echten
  Full-Bleed-Panels. Statt Hochskalieren (verboten) editoriale Feature-Zeilen bei
  max. nativer Breite ÷ 1.5 mit großer Oak-Index/Caption für Dichte. Der Spec-Escape
  („bei zu wenig GROSS: weniger Panels, niemals upscalen") ist damit erfüllt.
- **Live-Nachweis:** `id="arbeiten-v3"` im Artefakt; Deploy success.
- **Offen (TODO):** Originale ≥ 1600 px liefern → echte Vollbreite-Panels
  (nur Imports in `ArbeitenV3.astro` tauschen, kein Umbau nötig).

### S5 — Werkstatt + Prozess (`#werkstatt-v3`) — Commit `a16fc63`
- **Spec erfüllt:** ✅ Werkstatt --ink, Text --paper, 5/7-Spalten, Bild ragt 64 px
  über die obere Sektionsgrenze; Material-Text erhalten; Prozess mit 4 Desktop-Spalten,
  1px-Linien, riesigen Oak-Nummern (10 % hinter den Titeln), mobil vertikal.
- **Live-Nachweis:** `id="werkstatt-v3"` im Artefakt; Deploy success.

### S6 — Kontakt + Footer (`#kontakt-v3`) — Commit `9768410` (+ `closing__stamp`-Kontrastfix)
- **Spec erfüllt:** ✅ Formular im Unterstrich-Stil (Fokus --oak); Two-Click-OSM-Karte
  (DSGVO); **E-Mail nur falls verifiziert — hier leer → Oak-Telefon-CTA**; Footer-Finale
  „FANDRICH" Fraunces volle Breite, Deckkraft 0.1; darunter NAP + Links + Build-Marker
  („Stand: <Datum> · <Kurzhash>").
- **Live-Nachweis:** `id="kontakt-v3"` + Build-Marker im Artefakt; Deploy success.
- **Offen (TODO):** Verifizierte E-Mail-Adresse → `src/data/site.ts` (`email`) füllen,
  dann erscheint automatisch ein Mailto-Link statt/zusätzlich zum Telefon-CTA.

---

## Lighthouse (Mobile) — Anforderung ≥ 90

Gemessen mit Lighthouse 11, `--form-factor=mobile`, gegen den lokalen
Production-Preview (`npm run preview`) des Commits `9768410`:

| Kategorie | Score | Ziel |
| --- | --- | --- |
| **Performance** | **94** | ≥ 90 ✅ |
| **Accessibility** | **95** | ≥ 90 ✅ |
| **Best Practices** | **100** | ≥ 90 ✅ |
| **SEO** | **100** | ≥ 90 ✅ |

**Kernmetriken:** FCP 1.3 s · LCP 2.9 s · TBT 140 ms · CLS 0 · Speed-Index 1.6 s.

**Accessibility 95 (nicht 100) — Begründung:** Der einzige offene Punkt ist
`color-contrast`. Von 5 gemeldeten Knoten sind **4 dekorativ und `aria-hidden="true"`**
und laut Design-Gesetz bewusst kontrastarm:
- 3× `.arb__idx` — große Oak-Index-Zahlen (Dichte-Element hinter/neben Titeln),
- 1× `.closing__wordmark` — Riesen-Schriftzug „FANDRICH" bei Deckkraft 0.1 (Spec-Vorgabe).

Diese sind vom Screenreader ausgeblendet und rein grafisch; eine Kontrast­anhebung
würde die gestalterische Vorgabe (G3/S4/S6) verletzen. Der **eine echte Textknoten**
(`.closing__stamp`, Build-Marker) wurde von 3.5:1 auf ~6:1 korrigiert
(`rgba(250,247,242,0.6)`) und erfüllt jetzt WCAG AA.

---

## Offene TODOs (Zusammenfassung für den Betreiber)

1. **Video-Clips** für den Hero (2–3 kurze Werkstatt-Clips, MP4 + WebM, stumm/loop) →
   `src/data/heroMedia.ts` (`heroVideos`). Solange leer: Ken-Burns-Poster.
2. **Echte Bilder in GROSS** (≥ 1200 px, ideal ≥ 1600 px) → aktiviert größere
   Darstellungen in S2 und echte Vollbreite-Panels in S4 (nur Import-Tausch).
3. **Verifizierte E-Mail-Adresse** → `src/data/site.ts` (`email`); Kontakt zeigt dann
   den Mailto-Link. Bis dahin bleibt der Telefon-CTA aktiv.
4. **Echte Prozess-/Firmen-Zahlen** (Gründungsjahr etc.) wurden bewusst **nicht erfunden**;
   bei Bedarf ergänzen.

---

## Ergebnis

Alle Sektionen S1–S6 live deployt (Actions build+deploy = success), Bild-Gesetze
eingehalten (kein Upscaling), Lighthouse Mobile in allen vier Kategorien ≥ 90.
**Abnahme: bestanden** — mit den oben gelisteten inhaltlichen TODOs (Video, GROSS-Bilder,
E-Mail), die reine Content-Nachlieferungen ohne Code-Umbau sind.

---

# Nachtrag — Runde „De-Duplizierung & Editorial-Dichte" (R1–R6)

**Stand:** 2026-07-17 · Commits `6659ad1` → `5f14a24` (+ R6). Deploy-Historie
in `DEPLOY_LOG.md`.

## Oberstes Gesetz erfüllt: jedes Foto genau 1×
- Alle Bildzuweisungen zentral in `src/data/images.ts`. Zuordnung (einzige
  erlaubte Verwendung): **Hero** IMG_2479 · **Über uns** IMG_2480 + IMG_2470 ·
  **Galerie** IMG_2475/2463/2467/2486 · **Werkstatt** IMG_2482. **Leistungen
  und Prozess sind bildlos.** IMG_2472 entfernt.
- Build-Check `scripts/check-images.mjs` (npm `prebuild`): bricht ab, wenn ein
  Asset doppelt platziert oder außerhalb `images.ts` referenziert wird.
  Ergebnis: **8 Assets, jedes genau 1× — 0 Dubletten.**

## Runden
| Runde | Ergebnis | Status |
| --- | --- | --- |
| **R1** | Prozess: genau eine Oak-Nummer je Schritt (Doppel-Knoten entfernt). Hero-h1 `aria-label="Handwerk, das bleibt."` + echtes Leerzeichen. Galerie-Captions vereinheitlicht (mit R3). | ✅ |
| **R2** | Leistungen bildlos: Editorial-Liste, riesige Fraunces-Oak-Nummern, Titel, Text, Stichwort-Zeile, 1px-Trenner, Hover Nummer --ink/20→--oak. Texte unverändert. | ✅ |
| **R3** | Galerie 4 Panels, kein Grid: 01 zentriert + Overlay-Caption (Scrim, Clip von unten) · 02 Bild rechts + sticky Caption · Pull-Quote auf --paper (Oak-Anführung) · 03 Bild links versetzt/überlappend · 04 sachlicher Abschluss + CTA. Einheitliche Caption (Oak-Laufnummer + Versalien, nicht kursiv). | ✅ |
| **R4** | „(0X) Name"-Kennungen statt dekorativer Riesen-Zahlen (Anti-Template). Material-Index-Band zwischen Werkstatt und Prozess (Fraunces, --ink/--paper, sehr langsames Marquee, reduced-motion statisch). Abstände 96–140px. | ✅ |
| **R5** | Werkstatt als dunkler Full-Bleed-Break: --ink volle Breite, Bild rechts (mobil oben), Faktenzeile nur Verifiziertes (Meisterbetrieb · Eigene Werkstatt in Pankow · Treseburger Straße 30), VideoSlot vorbereitet (`werkstattMedia.ts`). | ✅ |
| **R6** | QA-Screenshots `/qa/` (1440 + 390, je 0 H-Overflow), Bild-Check grün, Lighthouse Mobile 95/95/100/100, Fakten-Regeln geprüft. | ✅ |

## Stack & Motion
- Astro + React-Islands (Nav) + Framer Motion **installiert und genutzt**;
  Lenis-Smooth-Scroll (Desktop, lerp 0.1) in `src/scripts/stage.ts`.
- Zentrale Motion-Tokens: `src/tokens/motion.ts` (ein Reveal-Ease
  `cubic-bezier(0.22,1,0.36,1)`, ein Hover-Ease, Dauern 0.6–0.9 s / 0.25 s).
- **Engineering-Entscheidung (dokumentiert):** Reveals/Clip-Path/Parallax der
  Galerie und die Leistungen-/Werkstatt-Interaktion laufen als **CSS +
  IntersectionObserver**, nicht als hydrierte Framer-Motion-Inseln. Grund:
  identische Optik bei transform/opacity/clip-path, aber ohne React-Hydration
  (bessere Performance, funktioniert ohne JS, `prefers-reduced-motion`
  vollständig respektiert). Framer Motion bleibt für echte Orchestrierung
  (Nav-Overlay) im Einsatz. GPU-only: nie width/height/top animiert.

## Lighthouse (Mobile) — Anforderung ≥ 90
| Kategorie | Score |
| --- | --- |
| Performance | **95** |
| Accessibility | **95** |
| Best Practices | **100** |
| SEO | **100** |
FCP 1,0 s · LCP 2,9 s · TBT 0 ms · CLS 0.

**Accessibility 95 — Begründung:** zwei `color-contrast`-Hinweise, beide
gestalterisch gewollt und spec-konform: (1) die **Oak-Laufnummern** der Galerie
(R1.3 verlangt ausdrücklich `--oak`) und (2) die **dekorative FANDRICH-Wortmarke**
(Deckkraft 0.1, `aria-hidden`). Der eigentliche Caption-Text ist `--ink-soft`
und erfüllt AA. Score liegt über der Schwelle.

## Fakten-Regeln (final gegengeprüft)
- **Kein Gründungsjahr** sichtbar (1964/1984 nur in Quellcode-Kommentaren als
  offener TODO, nicht im Markup).
- **Keine erfundene E-Mail:** `site.email = ''`; Kontakt und Footer blenden
  Mailto aus und zeigen stattdessen den Telefon-CTA (`site.email && …`).
- **Sie-Ansprache** durchgängig; keine „0+"-Statistiken, keine Floskeln.

## Offene TODOs (Betreiber, reine Content-Nachlieferung)
1. Hero- und Werkstatt-Clips → `heroMedia.ts` / `werkstattMedia.ts`.
2. Original-Fotos ≥ 1200 px (ideal ≥ 1600 px) → größere Darstellungen und echte
   Vollbreite-Panels (nur `images.ts` tauschen).
3. Verifizierte E-Mail → `src/data/site.ts` (`email`).
4. Kiez-/Material-/Ortangaben der Captions vom Betrieb bestätigen lassen;
   Gründungsjahr bei Klärung gezielt wieder einsetzen.

**Runde bestanden:** oberstes Gesetz (jedes Foto 1×) technisch abgesichert,
Editorial-Dichte umgesetzt, Lighthouse Mobile in allen Kategorien ≥ 90.

---

# Nachtrag — Redesign „BLUEPRINT v4 / Der Werkplan" (S1–S7)

**Stand:** 2026-07-18 · Commit `ff78a13` (+ Kontrastfix `ecbb70f`).
IDs `hero-v4` … `kontakt-v4`. Deploy-Historie in `DEPLOY_LOG.md`.

**SCHRITT-0-Fix (Deploy-Gate):** Der eingefrorene Live-Stand kam vom doppelten
Branch-Trigger (`main` + Feature-Branch) in derselben `pages`-Concurrency-Group.
`deploy.yml` triggert jetzt nur noch `main`. Baseline `cecf59c` bestätigt.
`/version.txt` als cache-armer Klartext-Nachweis ergänzt.

| Bereich | Umsetzung | Status |
| --- | --- | --- |
| Sichtbares 12-Spalten-Raster | `GridLines.astro` (Desktop ≥1024px) in Hero/Leistungen/Prozess | ✅ |
| Plan-Annotationen | `.wp-anno` (Mono „Abb. NN — …" + Oak-Markierungslinie) | ✅ |
| Hintergrund-Rhythmus | ink → paper → warm → paper → ink → warm → ink | ✅ |
| Typo-Skalierung | `.headline--v4` clamp(2.8rem,6vw,4.5rem), enge Zeilen | ✅ |
| S1 Hero | dunkel, ohne Bild, Wort-Stagger (clip-path), Ghost-CTA, Anker-Hairline, VideoSlot vorbereitet | ✅ |
| S2 Über uns | 7/5 asymmetrisch, Key-Terms --oak, Lead-Satz, versetztes Plattenpaar | ✅ |
| S3 Leistungen | React-Island-Akkordeon (Framer-Motion height), --paper-warm | ✅ |
| S4 Galerie | 4 Panels, Zeitleisten-Hairline + Stationspunkte, Riesennummer, Pull-Quote, CTA | ✅ |
| S5 Werkstatt | dunkel, Faktenzeile, Outline-Marquee (--paper Stroke) | ✅ |
| S6 Prozess | Desktop-Zeitachse (Karten über/unter), Mobil Scroll-Snap; eine Nummer/Schritt | ✅ |
| S7 Kontakt | dunkles Split-Panel, Underline-Formular, Telefon-CTA, Two-Click-Karte | ✅ |

**Verbote eingehalten:** kein Preloader, keine Stock-/KI-Bilder, keine erfundenen
Fakten/Jahre, **IMG_2479 nirgends** (auch nicht als OG-Bild), kein Framework-Wechsel.

**Lighthouse Mobile:** Performance **98** · Accessibility **95** · Best Practices
**100** · SEO **100**. Verbleibender A11y-Punkt: dekorative FANDRICH-Wortmarke
(Deckkraft 0.1, `aria-hidden`) — gewollt.

**Verifikation:** deployt (Actions build+deploy = success, Run #36 `ff78a13`).
Live-Marker-Bestätigung im Browser durch Betreiber ausstehend
(`/version.txt` bzw. Footer „Stand: …").

---

# Nachtrag — Über uns v5 „Das Manifest"

**Stand:** 2026-07-19 · Branch `claude/fandrich-ueber-uns-redesign-em36ha`.

**Befund (Betreiber-Feedback):** zu viel Fließtext auf Weiß, Bildplatzierung
schwach, und das versetzte Plattenpaar doppelte funktional die inzwischen
vorhandene Referenz-Sektion „Aus der Werkstatt".

**Konzept:** Die Sektion ist kein Zwei-Spalter mehr, sondern eine typografische
Selbstauskunft — ein großer Fraunces-Satzblock, der sich **Wort für Wort mit dem
Scroll aufhellt** (reaktiviert `initManifest` aus `stage.ts`, bisher ungenutzt).
Die beiden Fotos (IMG_2480, IMG_2470) sind als kleine **Inline-Fenster direkt in
den Satz eingewoben**: Sie falten sich beim Eintritt in den Viewport von Breite 0
auf (Curtain-Easing, gestaffelt), der Text gleitet auseinander; Hover zoomt das
Motiv im Fenster. Oak-Schlüsselwörter: „Meistertischlerei", „eigenen Werkstatt",
„bleiben." (Echo auf den Hero-Claim). Darunter eine Werkplan-Legende mit
selbstzeichnender Hairline (`initRails`) und den Annotationen Abb. 01/02 sowie
dem Link zur Werkstatt-Sektion.

| Punkt | Umsetzung | Status |
| --- | --- | --- |
| Text-auf-Weiß entschärft | Typo ist das Gestaltungselement; `GridLines` (Werkzeichnungs-Raster) als Textur | ✅ |
| Bilder mit Text verwoben | Inline-Fenster 2.3em (mobil 2.7em) im Satzfluss, Nummern-Tags 01/02 in Oak | ✅ |
| Keine Galerie-Doppelung | Plattenpaar entfernt; Referenzen bleiben allein bei „Aus der Werkstatt" | ✅ |
| Motion | Wort-Aufhellung (Scroll-gelinkt), Auffalten der Fenster (IO, 1s Curtain), Rail-Hairline, Wasserzeichen-Drift | ✅ |
| Bild-Gesetze | De-Dup-Check grün (8 Assets je 1×); Anzeige ~136px « 284px-Grenze (÷1.5) | ✅ |
| Reduced Motion / a11y | alle Effekte deaktiviert, Inhalte sofort sichtbar; sichtbare `h2` durch versteckte ersetzt, Alt-Texte erhalten | ✅ |

**Fix in `stage.ts` (initManifest):** Stagger-Überschuss `eff = progress ×
(1 + 1.5·perWord)`, damit auch das letzte Wort bei `progress = 1` volle
Deckkraft erreicht (vorher blieb der Schlusssatz dauerhaft gedimmt).

**Verifikation:** Build + Bild-Check grün; Screenshot-QA 1440/390 px inkl.
Hover-Zustand (`qa/ueber-manifest-1440.png`, `qa/ueber-manifest-390.png`).

---

# Korrektur — Über uns v6 „Zwei Werke, ein Anspruch"

**Stand:** 2026-07-19 (Fortsetzung) · Branch `claude/fandrich-ueber-uns-redesign-em36ha`.

**Warum diese Korrektur:** v5 „Das Manifest" hat das Problem verfehlt. Befund
des Betreibers: ein durchgehender Fließsatz mit glyphgroßen Inline-Bildern
(~2.3em, faktisch Mini-Thumbnails) und einer kaum wahrnehmbaren
Wort-für-Wort-Opacity liest sich weiterhin wie ein Fließtext-Dokument, nicht
wie eine agenturreife, moderne Tischlerei-Seite. Zusätzlich wurde eine
Zwischenversion versehentlich mit Systemschrift und nochmals verkleinerten
Bildern ausgeliefert (Hosting-Payload-Kompromiss) — eine echte Verschlechterung
gegenüber dem bereits gezeigten Stand.

**Technische Realität, die beide Anläufe verkannt hatten:** Beide Fotos
(IMG_2480, IMG_2470) sind nativ nur 426×640 px → nach Bild-Gesetz G2 hart
begrenzt auf **284 px Anzeigebreite**. Das lässt sich nicht wegdesignen —
also nicht kaschieren (glyphgroß verstecken), sondern **bewusst als
Exponate inszenieren**: Passepartout (Papierton-Mat + weicher Schatten),
großzügiger Weißraum, echte Bewegung.

**Neues Konzept:** Klare Hierarchie zurück (Headline `.headline--v4` +
Lead-Satz + zwei kurze Absätze statt eines Manifest-Blocks), Bilder als
gerahmte Diptychon-Komposition (versetzt, Mat + Schatten, große Oak-Ordnungs-
zahlen 01/02 statt Mono-„Abb."-Legende). Bewegung, die man tatsächlich sieht:

| Element | Wirkung |
| --- | --- |
| Duoton→Farb-Enthüllung (`grayscale(1)` → `--photo-filter`, 1.1s) | Das Foto „kommt in Farbe an" beim Scroll-Eintritt — klar sichtbar, nicht nur Opacity |
| Curtain-Clip (`clip-path inset`, gestaffelt 0s/0.18s) | zusätzliche Eintritts-Dramatik |
| Scale 1.1→1 beim Reveal + Hover-Scale 1.045 | Tiefe, taktiles Feedback |
| Je Bild eigener Parallax-Faktor (`data-drift` 22 / −30) | sichtbarer Versatz beim Scrollen, echte Kontinuität statt Einmal-Trigger |
| Fortschritts-Spindel zwischen den Spalten (`data-rail axis=y`) | funktional (zeigt Lesefortschritt), zugleich starkes grafisches Element |
| Keyword-Unterstriche zeichnen sich mit dem Absatz-Reveal ein | Premium-Detail, an bestehendes `.reveal`-System gekoppelt, kein Zusatz-Observer nötig |

**Bewusst entfernt:** die Mono-„Abb. NN"-Legende und der Riesen-Ghost-
Wasserzeichen („01") dieser Sektion — genau diese Elemente erzeugten den
„technische Zeichnung/PDF"-Eindruck. Ersetzt durch fette Oak-Ordnungszahlen
im Bildunterschriften-Stil einer Galerie-Wandbeschriftung.

**initManifest entfernt** (`stage.ts`): totes Coderad, da v6 keine
Wort-Opacity mehr nutzt.

**Verifikation:** Build + Bild-Check grün (weiterhin 8 Assets à 1×, keine
Größenüberschreitung). QA-Screenshots 1440 px (Ruhezustand + weiter
gescrollt, zeigt Parallax-Versatz + gefüllte Spindel) und 390 px mit den
echten Fonts (Fraunces/Inter) aus dem tatsächlichen Build — keine
Ersatzschrift, kein verkleinertes Hosting-Artefakt diesmal.

---

# Über uns v7 — kuratierte Synthese aus Referenz-Screenshots

**Stand:** 2026-07-20 · Branch `claude/fandrich-ueber-uns-redesign-em36ha`.

**Input:** Betreiber lieferte 9 Screenshots moderner Construction-/
Möbelhersteller-/Service-Websites als Stil-Inspiration (kein 1:1-Nachbau
verlangt — ausdrücklich als Muster-Fundus zum Filtern gemeint). Umfang
bewusst auf Über-uns begrenzt: Hero bleibt unverändert (wartet auf
4–8s-Video-Clip für transparenten Hintergrund lt. Betreiber).

**Übernommen (gefiltert, nicht kopiert):**
- Große, weich gerundete Foto-Karten (1.75rem Radius) statt schmalem
  Passepartout.
- Schwebende Fakten-Tags direkt auf den Fotos, an der unteren Kartenkante
  überlappend (Referenz-Pattern: Material-/Service-Badges auf dem Bild) —
  Inhalt ausschließlich bereits belegte Aussagen (Massivholz, Handarbeit,
  Maßanfertigung), keine neuen Behauptungen.
- CTA „Mehr über die Werkstatt" von Ghost- auf satten `.btn--oak` umgestellt
  (Referenzen setzen durchgehend auf volle Farbflächen).
- Neue Vertrauens-Chip-Reihe (Meisterbetrieb, Eigene Werkstatt) als
  Outline-Pills — bewusstes Pendant zu den Bewertungs-/Kundenzahl-Badges
  der Referenzen, aber **ohne erfundene Zahlen/Sterne** (Projektverbot).

**Bewusst nicht übernommen:** Video-Hero, Social-Icon-Rail, Testimonial-
Karte, Bewertungssterne/Kundenzahlen (nicht verifizierbar).

**Bugfix während QA:** Frame B überlappte bei 1440px die Caption von
Frame A (Bounding-Box-Kollision zweier absolut positionierter Elemente,
sichtbar per Screenshot). Behoben durch kürzere Caption (Material steht
jetzt im Foto-Tag, nicht mehr doppelt) + `max-width`-Sicherheitsabstand.

**Verifikation:** Build grün, QA-Screenshots 1440/390 px (echter Build,
echte Fonts). Motion (Duoton-Enthüllung, Parallax, Fortschritts-Spindel)
unverändert aus v6 übernommen.

**Noch nicht gemergt** — liegt auf dem Feature-Branch, Merge nach `main`
erst nach Freigabe.

---

# Über uns v14 — Umbau nach Archi-Carpenter-Template

**Stand:** 2026-07-20 · Branch `claude/fandrich-ueber-uns-redesign-em36ha`.

**Feedback:** Der bisherige Aufbau war strukturell tot; Betreiber wünscht
Umsetzung im Stil des Archi-Carpenter-Templates (echte Tischler-Referenz):
dunkles Holz-Band, klare Foto-Komposition, Feature-Karten, kräftiger
Kontrast, „das Maximum aus der Conversion".

**Umgesetzt (aus dem Template extrahiert, nicht 1:1 kopiert):**
- Kopf hell: Eyebrow + fette Sans-Headline (Inter 800, Template-Duktus).
- **Dunkles Walnuss-Panel** als Herzstück (Referenz: „Custom Woodwork"-Band):
  prozedurale Maserung bei DUNKLEM Ton — dort wirkt Holz premium, die hellen
  Kiefer-Versuche (v10–v12) zeigten jeden Fehler und wurden verworfen.
  Dielenfugen + weiches Oberlicht für Tiefe. Kein Stockfoto (Projektregel).
- Foto-Diptychon links (beide ueber-uns-Fotos, de-dup-konform je 1×) +
  Fließtext/CTA rechts (hell auf dunkel).
- Ehrlicher „Meisterbetrieb"-Badge, überlappt das Foto unten links (Pendant
  zum „20 Years"-Badge — ohne erfundenes Gründungsjahr).
- **Feature-Karten-Reihe** (Referenz: Archis 4er-Grid) mit belegten Fandrich-
  Fakten: Meisterbetrieb · Eigene Werkstatt · Massivholz & Furniere · Handarbeit.

**Verworfen aus v7–v13:** Fraunces/Lora-Headline, Keyword-Einfärbung, helle
Textur-Flächen, dünne Outline-Chips.

**Motion:** .reveal/.split, Duoton→Farb-Enthüllung + Curtain-Clip pro Foto,
Badge-Pop, Karten-Stagger, data-drift-Parallax. Reduced-Motion vollständig
abgefangen (verifiziert).

**Verifiziert:** Build + Bild-Check grün, Screenshots 1440/390 + reduced-motion.
Noch nicht gemergt — Merge nach `main` erst nach Freigabe.
