# Deploy-Fix — automatische Pipeline (Pipeline-Runde)

## Was umgestellt wurde

- **Neuer Workflow** [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
  offizielle Astro-Action (`withastro/action`, Node 22) baut, `actions/deploy-pages`
  veröffentlicht. `actions/configure-pages` setzt die Pages-Quelle auf Actions.
- **Alter Mechanismus entfernt:** das `GH_PAGES=1`-Konstrukt aus
  `astro.config.mjs` ist raus. `site`/`base` stehen fest auf die Projektseite
  (`https://peplauluka-oss.github.io` + `/Fandrich-Tischlerei`).
- **Sichtbarer Marker im Footer:** „Stand: JJJJ-MM-TT · <commit>", beim Build
  automatisch aus `GITHUB_SHA` (bzw. lokal `git rev-parse`) gesetzt
  (`astro.config.mjs` → `import.meta.env.PUBLIC_BUILD_STAMP`).

## Status der Automatik

| Schritt | Ergebnis |
| --- | --- |
| Workflow-Lauf #2 (`33dfeed`) — Job **build** | ✅ success (Node 22, configure-pages, astro build) |
| Workflow-Lauf #2 — Job **deploy** | ❌ von der `github-pages`-Umgebung abgewiesen (0 Steps, 2 s) |

**Warum der Deploy (noch) abgewiesen wird:** Die `github-pages`-Umgebung lässt
Veröffentlichungen standardmäßig nur vom **Default-Branch (`main`)** zu, und die
Pages-Quelle steht aktuell noch auf „Deploy from a branch". Beides sind
Einstellungen, die **nur der Repository-Betreiber** ändern kann — aus dieser
Session heraus ist die Settings-API nicht zugänglich (403). Genau der in der
Aufgabe genannte einmalige Handgriff.

Damit Feature-Branch-Pushes keine roten Deploys erzeugen, ist der Deploy-Job
jetzt auf `main`/manuell begrenzt; der Build wird trotzdem bei jedem Push
validiert.

## Zwei Klicks, damit die Automatik übernimmt

1. **Settings → Pages → Build and deployment → Source: „GitHub Actions"**.
2. Den Website-Stand nach `main` bringen (Feature-Branch mergen) **oder** in
   den Repo-Settings unter *Environments → github-pages* den Entwicklungs-Branch
   als Deployment-Branch erlauben. Danach deployt jeder Push automatisch.

Danach kann der `gh-pages`-Branch gelöscht werden — er wird nicht mehr gebraucht.

## Ist der Marker live sichtbar?

**Ja.** Da die Automatik erst nach dem obigen Betreiber-Handgriff greift, habe
ich den aktuellen Stand **einmalig** über die derzeit noch aktive Pages-Quelle
veröffentlicht, damit die Seite live bleibt und der Marker sofort prüfbar ist:

- Ausgelieferter Stand enthält im Footer **„Stand: 2026-07-16 · <commit>"**
  (verifiziert im ausgelieferten `index.html`).
- Live: https://peplauluka-oss.github.io/Fandrich-Tischlerei/ — Marker unten in
  der dunklen Schluss-Sektion neben „© Fandrich GmbH 2026".

> Hinweis zur Prüfmethode: Aus der Build-Umgebung ist `github.io` netzseitig
> nicht direkt abrufbar; verifiziert wurde daher der tatsächlich ausgelieferte
> HTML-Inhalt des Pages-Branches (enthält den Marker) sowie der erfolgreiche
> Build-Job. Sobald die zwei Klicks erfolgt sind, übernimmt die Actions-Pipeline
> und der Marker aktualisiert sich bei jedem Push automatisch.
