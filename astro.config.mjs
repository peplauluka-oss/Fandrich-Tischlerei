// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

// TODO: Finale Domain eintragen, sobald sie feststeht.
const SITE = 'https://www.tischlerei-fandrich.de';

export default defineConfig({
  site: SITE,
  integrations: [react(), sitemap(), robotsTxt()],
});
