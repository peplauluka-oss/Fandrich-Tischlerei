// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

// TODO: Finale Domain eintragen, sobald sie feststeht.
const SITE = 'https://www.tischlerei-fandrich.de';

// Demo-Build für GitHub Pages: GH_PAGES=1 npm run build
// → https://peplauluka-oss.github.io/Fandrich-Tischlerei/
const ghPages = process.env.GH_PAGES === '1';

export default defineConfig({
  site: ghPages ? 'https://peplauluka-oss.github.io' : SITE,
  base: ghPages ? '/Fandrich-Tischlerei' : '/',
  integrations: [react(), sitemap(), robotsTxt()],
});
