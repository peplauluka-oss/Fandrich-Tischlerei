#!/usr/bin/env node
/**
 * Build-Check — OBERSTES GESETZ: jedes Foto erscheint genau einmal.
 *
 * Prüft zwei Regeln und bricht (exit 1) bei Verstoß ab:
 *   1) Nur src/data/images.ts darf Bild-Assets (assets/images/IMG_*) importieren.
 *      Jede direkte Referenz in einer anderen Datei ist ein Verstoß.
 *   2) In images.ts wird jedes Asset genau einmal importiert UND jede so
 *      erzeugte Bindung genau einmal weiterverwendet (= genau eine Platzierung).
 *
 * Läuft als `npm run check:images` und automatisch als `prebuild`.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const srcDir = join(root, 'src');
const centralRel = 'src/data/images.ts';
const centralAbs = join(root, 'src/data/images.ts');

const ASSET_RE = /assets\/images\/(IMG_\d+)\.(?:jpe?g|png|webp)/gi;

/** Alle Dateien unter src/ rekursiv einsammeln. */
function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const errors = [];

// ── Regel 1: keine Asset-Referenz außerhalb von images.ts ────────────────
for (const file of walk(srcDir)) {
  if (file === centralAbs) continue;
  const text = readFileSync(file, 'utf8');
  const hits = [...text.matchAll(ASSET_RE)].map((m) => m[1]);
  if (hits.length) {
    errors.push(
      `Bild-Asset(s) außerhalb von ${centralRel} referenziert in ${relative(root, file)}: ${[...new Set(hits)].join(', ')}`,
    );
  }
}

// ── Regel 2: in images.ts jedes Asset 1× importiert und 1× platziert ─────
const central = readFileSync(centralAbs, 'utf8');

// Importzeilen: import <bind> from '../assets/images/IMG_XXXX.jpeg'
const importRe = /import\s+(\w+)\s+from\s+['"][^'"]*assets\/images\/(IMG_\d+)\.(?:jpe?g|png|webp)['"]/g;
const bindings = new Map(); // bind -> file id
const fileCount = new Map(); // file id -> count
let m;
while ((m = importRe.exec(central))) {
  const [, bind, fileId] = m;
  bindings.set(bind, fileId);
  fileCount.set(fileId, (fileCount.get(fileId) ?? 0) + 1);
}

for (const [fileId, n] of fileCount) {
  if (n > 1) errors.push(`Asset ${fileId} wird in ${centralRel} ${n}× importiert (erlaubt: 1×).`);
}

// Platzierung jeder Bindung zählen. Ein Bild wird ausschließlich über
// `src: <bindung>` in ein Bild-Objekt gesetzt — das ist das präzise
// Platzierungssignal (keine Kollision mit Kommentaren/Section-Literalen).
const body = central.replace(importRe, '');
for (const [bind, fileId] of bindings) {
  const placements = (body.match(new RegExp(`\\bsrc:\\s*${bind}\\b`, 'g')) ?? []).length;
  if (placements > 1) {
    errors.push(
      `Bild ${fileId} (Bindung „${bind}") wird ${placements}× platziert — jedes Foto darf genau 1× erscheinen.`,
    );
  } else if (placements === 0) {
    errors.push(`Import „${bind}" (${fileId}) in ${centralRel} ist ungenutzt — bitte entfernen.`);
  }
}

if (errors.length) {
  console.error('\n✗ Bild-De-Duplizierung fehlgeschlagen:\n');
  for (const e of errors) console.error('  • ' + e);
  console.error(`\n${errors.length} Verstoß/Verstöße. Build abgebrochen.\n`);
  process.exit(1);
}

console.log(
  `✓ Bild-Check bestanden: ${bindings.size} Assets, jedes genau 1× importiert und platziert.`,
);
