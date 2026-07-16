/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Build-Marker (Datum · Commit-Kurzhash), gesetzt in astro.config.mjs */
  readonly PUBLIC_BUILD_STAMP: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
