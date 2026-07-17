# DEPLOY_LOG — vertikaler Aufbau

Deploy-Quelle: **GitHub Actions** (`.github/workflows/deploy.yml`,
`withastro/action` + `actions/deploy-pages`). Veröffentlicht vom **Default-Branch
`main`** (die `github-pages`-Umgebung lässt keine Feature-Branches zu). Ablauf je
Sektion: auf dem Entwicklungs-Branch bauen → `main` per Fast-Forward
nachziehen → Actions-Deploy → Live.

Live: **https://peplauluka-oss.github.io/Fandrich-Tischlerei/**

> Prüf-Hinweis: Aus der Build-Sandbox ist `*.github.io` netzseitig gesperrt
> (curl → 000, WebFetch → 403). „Live nachweisbar" heißt hier deshalb:
> Actions-**Deploy-Job = success** UND der Build-Marker/Sektions-Anker im
> ausgelieferten Artefakt (lokaler Build desselben Commits identisch). Im
> Browser ist die Seite normal erreichbar.

| Schritt | Commit (main) | Actions-Deploy | Live-Nachweis | Status |
| --- | --- | --- | --- | --- |
| **S0 — Deploy-Gate** | `d25ea17` | Run #6 build+deploy **success** (2026-07-16 19:12 UTC) | Footer-Marker **„Stand: 2026-07-16 · d25ea17"** im ausgelieferten `index.html` | ✅ PASS |
| **S1 — Nav + Hero (`#hero-v3`)** | `010dfe6` | Run #8 build+deploy **success** (2026-07-17 11:07 UTC) | Sektion `id="hero-v3"` + Marker im Artefakt; lokal 390/1440 ohne H-Overflow | ✅ PASS |
| **S2 — Über uns (`#ueber-uns-v3`)** | `234c6b7` | build+deploy **success** | Sektion `id="ueber-uns-v3"`, versetztes Bildpaar + Clip-Reveal; lokal 390/1440 ok | ✅ PASS |
| **S3 — Leistungen (`#leistungen-v3`)** | `4c9942a` | build+deploy **success** | Sektion `id="leistungen-v3"`, 3 Zeilen + Oak-Nummern + 160px-Thumbnails, Hover-Dimming 0.4; lokal 390/1440 ok | ✅ PASS |
| **S4 — Arbeiten (`#arbeiten-v3`)** | `6d7f040` | build+deploy **success** | Sektion `id="arbeiten-v3"`, Feature-Zeilen + versetzte Paare + dunkles Typo-Panel + CTA, interner Parallax; lokal 390/1440 ok | ✅ PASS |
| **S5 — Werkstatt + Prozess (`#werkstatt-v3`)** | s. u. | build+deploy **success** | `id="werkstatt-v3"` (--ink, 5/7, Bild ragt 64px über obere Grenze) + Prozess (4 Spalten, Oak-Riesennummern 10 %); lokal 390/1440 ok | ✅ PASS |
| **S6 — Kontakt + Footer (`#kontakt-v3`)** | `9768410` | Run #18 build+deploy **success** (2026-07-17 11:44 UTC) | Sektion `id="kontakt-v3"`, Unterstrich-Formular (Fokus --oak), Two-Click-OSM-Karte, Telefon-CTA statt E-Mail (unverifiziert), FANDRICH-Schlusswortmarke Deckkraft 0.1, Footer NAP + Links + Build-Marker „Stand: 2026-07-17 · a16fc63"; lokal 390/1440 ohne H-Overflow, keine JS-Fehler | ✅ PASS |
| **Abschluss — ABNAHME + Kontrastfix** | `5e88b39` | Run #20 build+deploy **success** (2026-07-17 11:49 UTC) | `ABNAHME.md` (Sektionsabnahme + Lighthouse Mobile Perf 95 / A11y 95 / BP 100 / SEO 100); Build-Marker-Kontrast 3.5→6:1 (WCAG AA) | ✅ PASS |

## Runde „De-Duplizierung & Editorial-Dichte" (R1–R6)

Oberstes Gesetz: **jedes Foto genau 1×** — abgesichert durch
`scripts/check-images.mjs` (npm `prebuild`-Hook; Build failt bei Doppel-src).

| Schritt | Commit (main) | Actions-Deploy | Live-Nachweis | Status |
| --- | --- | --- | --- | --- |
| **R1 — Bugfixes (Prozess/Hero)** | `6659ad1` | build+deploy **success** | Genau eine Oak-Nummer je Prozess-Schritt; Hero-h1 `aria-label` + Leerzeichen; lokal 390/1440 ok | ✅ PASS |
| **De-Dup + R2 + R3** | `a551330` | build+deploy **success** | `images.ts` als einzige Quelle, Check grün (8 Assets à 1×); Leistungen bildlos (Editorial-Liste); Galerie 4 Panels + Pull-Quote + einheitliche Captions | ✅ PASS |
| **R4 — Sektions-Rhythmus** | `54a9682` | build+deploy **success** | „(0X) Name"-Kennungen statt Riesen-Zahlen; Material-Index-Band (Marquee); Abstände 96–140px | ✅ PASS |
| **R5 — Werkstatt Full-Bleed** | `5f14a24` | build+deploy **success** | `id="werkstatt-v3"` dunkel volle Breite, Bild rechts/mobil oben, Faktenzeile (nur Verifiziertes), VideoSlot vorbereitet | ✅ PASS |
| **R6 — QA & Abschluss** | s. u. | build+deploy **success** | QA-Screenshots `/qa/` (1440+390, 0 H-Overflow), Bild-Check 0 Dubletten, Lighthouse Mobile **95 / 95 / 100 / 100**; DEPLOY_LOG + ABNAHME aktualisiert | ✅ PASS |

**S4-Notiz:** Kein GROSS-Bild vorhanden → keine echten Full-Bleed-Panels. Statt
Hochskalieren: editoriale Feature-Zeilen bei max. nativer Breite ÷ 1.5 (Bild +
große Oak-Index/Caption für Dichte), versetzte KLEIN-Paare, dunkles Zitat-Panel,
Schluss-Feature + CTA. TODO: Originale ≥1600px → echte Vollbreite-Panels
(nur Imports in ArbeitenV3.astro tauschen).

**S2-Notiz (Bugfix):** `clip-path` auf einem vom IntersectionObserver
beobachteten Element kollabiert dessen `intersectionRatio` auf 0 → Reveal und
native Lazy-Load feuern nie. Lösung: Clip auf einen **inneren** Rahmen legen,
die Figur selbst unbeschnitten beobachten; die zwei kleinen Über-uns-Bilder
`loading="eager"`. Bildpaar nutzt KLEIN-Hochformate ≤ 284 px (Thumbnailgröße,
G2-konform) — Original-Hochformate laut STATUS.md nachliefern.

## S0 — Deploy-Beweis (Gate) — PASS

- Pipeline umgestellt: alter `GH_PAGES=1`-/`gh-pages`-Branch-Mechanismus außer
  Betrieb (Pages-Source = Actions; der `gh-pages`-Branch wird ignoriert und kann
  vom Betreiber gelöscht werden — die Löschung ist über den Git-Proxy dieser
  Session gesperrt).
- Deploy vom Feature-Branch scheiterte reproduzierbar (github-pages-Umgebung
  erlaubt nur den Default-Branch); Freigabe „nach main mergen" erteilt →
  Deploy vom `main` läuft grün (Build **und** Deploy).
- Build-Marker im Footer wird automatisch aus `GITHUB_SHA` gesetzt
  (`astro.config.mjs` → `import.meta.env.PUBLIC_BUILD_STAMP`).

**Gate bestanden — Design-Aufbau S1–S6 freigegeben.**
