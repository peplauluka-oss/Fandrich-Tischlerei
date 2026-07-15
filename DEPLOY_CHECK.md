# Deploy-Check — Runde 3

Ziel: sicherstellen, dass der neue Stand auch **live** ankommt (der vorherige
Run war offenbar nie sichtbar geworden).

## Deployment-Pfad

- **Entwicklungs-Branch:** `claude/fandrich-website-relaunch-mdt6zy`
- **Live (GitHub Pages):** Branch `gh-pages` liefert den Produktions-Build
  (`GH_PAGES=1 npm run build` → `dist/`, plus `.nojekyll`).
- **URL:** https://peplauluka-oss.github.io/Fandrich-Tischlerei/

Warum ein separater `gh-pages`-Branch: Astro-Assets liegen unter `_astro/`.
Ohne `.nojekyll` verwirft GitHubs Jekyll-Schritt diesen Ordner — dann fehlen
alle Skripte/Styles und nichts hydratisiert (genau das Symptom „Count-up zeigt
0+, keine Animation"). Der `gh-pages`-Branch enthält `.nojekyll`.

## Diesmal deployt

- **Quell-Commit (Code):** `2884f0f` auf `claude/fandrich-website-relaunch-mdt6zy`
- **gh-pages-Commit:** `4f9ef77`
- **GitHub-Actions-Run „pages build and deployment":** Run #3
  (`29443399533`) — **conclusion: success** (15.07.2026, ~19:09 UTC)

## 3 Merkmale, an denen man den neuen Stand auf der LIVE-URL erkennt

Wenn diese drei sichtbar sind, ist Runde 3 online (und nicht ein alter Cache):

1. **Preloader beim ersten Besuch** — dunkle Vollfläche mit den nacheinander
   erscheinenden Wörtern **„Messen." → „Fügen." → „Bleiben."**, danach zieht
   sich die Fläche als Vorhang nach oben weg. (Erscheint einmal pro Session;
   für einen erneuten Test: neuer Tab / Session, oder `sessionStorage` leeren.)

2. **Typografischer Hero auf hellem Grund** — die riesige Headline
   **„Handwerk, das bleibt."** (Wort „bleibt." in Oak) mit einem **liegenden
   Bild-Fenster (21:9) zwischen den beiden Zeilen**. NICHT mehr das frühere
   dunkle Steg-/See-Foto als Vollbild-Hero.

3. **Horizontaler, gepinnter „Gang durch unsere Projekte"** (Desktop ≥ 1025 px):
   Beim Scrollen bleibt die Sektion stehen und die Projekt-Panels wandern
   **seitwärts** (unterschiedliche Größen/Höhen, Oak-Fortschrittslinie unten).
   Auf dem Handy stattdessen: die **riesige FANDRICH-Wortmarke** als
   Schlussbild und der **Oak-„Karte laden"-Button** in der Kontakt-Sektion.

## Reproduktion des Deploys

```bash
# 1. Produktions-Build mit Base-Pfad für GitHub Pages
GH_PAGES=1 npm run build

# 2. dist/ auf den gh-pages-Branch bringen (inkl. .nojekyll)
#    (siehe Verlauf; force-push auf gh-pages ist ok, der Branch ist reiner Build)

# 3. GitHub-Actions-Run "pages build and deployment" abwarten → success
# 4. Live-URL öffnen, hart neu laden (CDN-Cache ~10 min)
```

## Ergebnis dieses Deploys

- gh-pages-Commit: `4f9ef77`
- Actions-Run: `29443399533` — **success**
- Live-URL bestätigt ausgeliefert: der Server liefert `index.html` mit
  Asset-Pfaden unter `/Fandrich-Tischlerei/_astro/…` (Base-Pfad korrekt),
  `.nojekyll` vorhanden, alle Island-Skripte referenziert.
