/**
 * Partner & Auftraggeber — Trust-Sektion.
 *
 * Aktuell als Namens-Wortmarken dargestellt. Sobald echte Logos vorliegen:
 * Datei unter `public/partners/<name>.svg` ablegen und hier `logo` setzen
 * (Pfad relativ zu BASE_URL, z. B. 'partners/gesobau.svg'). Die Komponente
 * zeigt dann automatisch das Logo statt des Schriftzugs — ohne Layout-Änderung.
 *
 * TODO Betreiber: Firmennamen + URLs gegenprüfen (aus der Altseite abgeleitet),
 * insbesondere die abgeschnittene CRESCO-URL.
 */
export interface Partner {
  name: string;
  url: string;
  /** optional: Pfad zu einem echten Logo (SVG/PNG) in public/partners/ */
  logo?: string;
}

/** Hausverwaltungen & Auftraggeber — der stärkere Trust-Block. */
export const auftraggeber: Partner[] = [
  { name: 'GESOBAU', url: 'https://www.gesobau.de' },
  { name: 'HOWOGE', url: 'https://www.howoge.de' },
  { name: 'AGEWO', url: 'https://www.agewo.de' },
  { name: 'OPTIMUS', url: 'https://www.optimus-hv.de' },
  { name: 'ADLER Wohnen', url: 'https://www.adler-wohnen.com' },
  { name: 'CRESCO', url: 'https://www.crescocapital.com' }, // TODO URL prüfen
  { name: 'GA-tec', url: 'https://www.ga-tec.de' },
];

/** Partnerbetriebe — Handwerk, mit dem wir zusammenarbeiten. */
export const partnerBetriebe: Partner[] = [
  { name: 'Schüco Fenster', url: 'https://www.assmann-klasen.de' },
  { name: 'Alpro Metallbau', url: 'https://www.alpro-metallbau.de' },
  { name: 'Jähnke Fensterbau', url: 'https://www.tischlerei-jaehnke.de' },
  { name: 'Braun Raumausstattung', url: 'https://www.braun-raumausstattung.de' },
  { name: 'Schlosserei Scholz', url: 'https://www.schlosserei-scholz-berlin.de' },
  { name: 'Korb Jacob', url: 'https://www.korb-jacob.de' },
  { name: 'Zeilinga Hebebühnen', url: 'https://www.zeilinga-riedl.com' },
  { name: 'WEGO Badcenter', url: 'https://www.wego-badcenter.de' },
];
