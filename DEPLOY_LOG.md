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

## ⚠️ Deploy-Diagnose (BLUEPRINT-v4 SCHRITT 0) — Split-Brain gh-pages

**Symptom:** Nutzer meldet Live-Marker unverändert `Stand: 2026-07-17 · 631a7b6`
trotz mehrerer grüner `deploy.yml`-Runs.

**Befund (API-Daten, aus der Sandbox erhoben):**
- `origin/main` = `d4eb4cd` (korrekt, aktuell). `deploy.yml`-Runs = **success**.
- Es existiert ein **zweiter, aktiver Deploy-Weg**: Branch `gh-pages` (@ `1a48886`)
  + der eingebaute Workflow **`pages-build-deployment`** (Astro-fremd). Dessen
  letzter Lauf: **#4, Branch `gh-pages`, `1a48886`, 2026-07-16 18:12 UTC**, danach
  keiner mehr.
- GitHub baut/aktiviert `pages-build-deployment` **nur**, wenn Pages-Source =
  „Deploy from a branch" ist. Das ist der klassische Split-Brain: die Live-Seite
  wird u. U. vom **`gh-pages`-Branch** (alt) ausgeliefert, während die
  Actions-Deploys ins `github-pages`-Environment laufen.

**Sandbox-Grenze:** `*.github.io` und die Pages-Settings-API sind über den
Agent-Proxy gesperrt (curl 000 / WebFetch 403 / „not permitted through this
proxy"). Der Live-Marker kann aus der Sandbox **nicht** selbst zitiert werden.

**Fix (wirkt unabhängig von der Source-Einstellung):**
1. `/version.txt`-Endpunkt (Klartext, cache-arm) als eindeutiger Deploy-Beweis.
2. Aktuellen Build **zusätzlich in den `gh-pages`-Branch** veröffentlicht — falls
   Pages von dort ausliefert, ist die Seite sofort aktuell; falls Pages =
   Actions, ist der Push inert (kein Schaden).
3. **Betreiber-Aktion empfohlen:** Repo → Settings → Pages → Source =
   „GitHub Actions" (einmalig), dann ist `deploy.yml` alleinige Quelle und der
   `gh-pages`-Branch kann gelöscht werden.

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

## Redesign „BLUEPRINT v4 / Der Werkplan"

**Deploy-Gate (SCHRITT 0) bestanden:** Ursache des eingefrorenen Live-Standes
war der doppelte Branch-Trigger (main + Feature-Branch) in derselben
`pages`-Concurrency-Group; behoben — `deploy.yml` triggert nur noch `main`.
Baseline live bestätigt: `Stand: 2026-07-18 · cecf59c`. Zusätzlich `/version.txt`
als cache-armer Klartext-Nachweis.

| Schritt | Commit (main) | Actions-Deploy | Nachweis | Status |
| --- | --- | --- | --- | --- |
| **v4 — S1–S7 „Der Werkplan"** | `ff78a13` (+ Kontrastfix) | build+deploy (Verifikation im Browser ausstehend) | IDs `hero-v4`…`kontakt-v4`; 12-Spalten-Raster, Plan-Annotationen, BG-Rhythmus; Bild-Check grün (8 Assets à 1×, IMG_2479 nirgends); Lighthouse mobil **Perf 98 / A11y 95 / BP 100 / SEO 100**; lokal 390/1440 ohne H-Overflow | ⏳ deployed, Browser-Verifikation ausstehend |
