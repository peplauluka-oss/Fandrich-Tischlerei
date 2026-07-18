import type { APIRoute } from 'astro';

// Eindeutiger, cache-armer Deploy-Nachweis: /Fandrich-Tischlerei/version.txt
// gibt exakt den Build-Marker aus (Datum · Commit-Kurzhash). Klartext lässt
// sich leichter hart prüfen als die (aggressiver gecachte) HTML-Seite.
export const GET: APIRoute = () =>
  new Response(`build ${import.meta.env.PUBLIC_BUILD_STAMP}\n`, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
