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
