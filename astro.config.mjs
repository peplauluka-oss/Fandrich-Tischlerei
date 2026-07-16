// @ts-check
import { execSync } from 'node:child_process';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

// GitHub Pages ist die einzige Deploy-Quelle (Workflow .github/workflows/deploy.yml).
// Projektseite unter https://peplauluka-oss.github.io/Fandrich-Tischlerei/.
//
// TODO: Bei eigener Domain hier umstellen — site auf die Domain, base auf '/'.
const SITE = 'https://peplauluka-oss.github.io';
const BASE = '/Fandrich-Tischlerei';

// Sichtbarer Build-Marker (Footer): Datum + Commit-Kurzhash, automatisch beim Build.
const commit =
  process.env.GITHUB_SHA?.slice(0, 7) ??
  (() => {
    try {
      return execSync('git rev-parse --short HEAD').toString().trim();
    } catch {
      return 'dev';
    }
  })();
const buildDate = new Date().toISOString().slice(0, 10);
const buildStamp = `${buildDate} · ${commit}`;

export default defineConfig({
  site: SITE,
  base: BASE,
  integrations: [react(), sitemap(), robotsTxt()],
  vite: {
    define: {
      'import.meta.env.PUBLIC_BUILD_STAMP': JSON.stringify(buildStamp),
    },
  },
});
