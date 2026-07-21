/**
 * Partner & Auftraggeber — Trust-Sektion als Logo-Wall.
 *
 * `logoPartner` erscheinen als echte Logos in der Wall (im Ruhezustand
 * monochrom, bei Hover in Originalfarbe). Die Dateien liegen in
 * `public/partners/`. `invert: true` markiert helle Logos, die auf dem
 * hellen Kachel-Grund sonst unsichtbar wären (z. B. Korb-Jacob) — sie
 * werden per CSS zu dunklem Ink invertiert.
 *
 * `weiterePartner` sind Namen ohne (nutzbares) Logo — als schlanke,
 * gedämpfte Zeile unter der Wall, damit Reichweite/SEO erhalten bleiben,
 * ohne die Wall optisch zu brechen.
 */
export interface LogoPartner {
  name: string;
  url: string;
  /** Pfad relativ zu BASE_URL, in public/partners/ */
  logo: string;
  /** helle Logos auf transparentem Grund -> zu dunklem Ink invertieren */
  invert?: boolean;
}

/** Echte Logos — Auftraggeber zuerst (stärkerer Trust), dann Handwerkspartner. */
export const logoPartner: LogoPartner[] = [
  { name: 'GESOBAU', url: 'https://www.gesobau.de', logo: 'partners/gesobau.png' },
  { name: 'HOWOGE', url: 'https://www.howoge.de', logo: 'partners/howoge.jpeg' },
  { name: 'ADLER Group', url: 'https://www.adler-group.com', logo: 'partners/adler.png' },
  { name: 'AGEWo', url: 'https://www.agewo.de', logo: 'partners/agewo.png' },
  { name: 'Cresco Capital Group', url: 'https://www.crescocapital.com', logo: 'partners/cresco.jpeg' },
  { name: 'GA-tec', url: 'https://www.ga-tec.de', logo: 'partners/gatec.jpeg' },
  { name: 'ALPRO Metallbau', url: 'https://www.alpro-metallbau.de', logo: 'partners/alpro.png' },
  { name: 'Zeilinga', url: 'https://www.zeilinga-riedl.com', logo: 'partners/zeilinga.png' },
  { name: 'Tischlerei Jähnke', url: 'https://www.tischlerei-jaehnke.de', logo: 'partners/jaehnke.jpeg' },
  { name: 'Korb-Jacob', url: 'https://www.korb-jacob.de', logo: 'partners/korb-jacob.png', invert: true },
  { name: 'WEGO Badcenter', url: 'https://www.wego-badcenter.de', logo: 'partners/wego.png' },
];

/** Weitere Partner ohne Logo — schlanke Namenszeile. */
export const weiterePartner: string[] = [
  'Optimus Hausverwaltung',
  'Schüco',
  'Braun Raumausstattung',
  'Schlosserei Scholz',
];
