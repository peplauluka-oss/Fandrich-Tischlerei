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
| **S3 — Leistungen (`#leistungen-v3`)** | s. u. | build+deploy **success** | Sektion `id="leistungen-v3"`, 3 Zeilen + Oak-Nummern + 160px-Thumbnails, Hover-Dimming 0.4; lokal 390/1440 ok | ✅ PASS |

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
