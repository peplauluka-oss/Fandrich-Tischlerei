/**
 * Google-Rezensionen (Auswahl für Conversion). Echte, öffentliche Bewertungen
 * — bitte nur mit unverändertem Sinn kürzen.
 *
 * Gesamtbewertung/Anzahl stehen als [[PLATZHALTER]], bis die exakten Werte aus
 * dem Google-Business-Profil vorliegen — nichts erfinden.
 */
export interface Review {
  autor: string;
  /** relativer Zeitraum wie bei Google */
  wann: string;
  /** zugeordnete Leistung (kleiner Kontext-Tag) */
  leistung: string;
  text: string;
}

/** Gesamtbewertung — vom Betrieb aus dem Google-Profil eintragen. */
export const bewertung = {
  schnitt: '[[GESAMTBEWERTUNG]]', // z. B. "4,9"
  anzahl: '[[ANZAHL]]', // z. B. "27"
};

export const reviews: Review[] = [
  {
    autor: 'Stefan Appelhoff',
    wann: 'vor 8 Monaten',
    leistung: 'Reparatur',
    text: 'Die Tischlerei Fandrich hat bei uns einen morschen Holzbalken unter einer Außentür fachgerecht und sauber ausgetauscht und repariert. Sehr freundliches, zuverlässiges und kompetentes Personal. Gute Kommunikation via E-Mail und Telefon. Faire Preise.',
  },
  {
    autor: 'Mr. Ed',
    wann: 'vor 4 Jahren',
    leistung: 'Neuanfertigung',
    text: 'Anfertigung und Montage einer Nischenrückwand aus Corian. Wir waren mit der Beratung und den ausgeführten Arbeiten sehr zufrieden. Alle vereinbarten Termine wurden eingehalten.',
  },
  {
    autor: 'Grauer Zausel',
    wann: 'vor 3 Jahren',
    leistung: 'Reparatur · Hausverwaltung',
    text: 'Herzlichen Dank für die schnelle Reparatur des defekten Schließgestänges. Der Kollege kam pünktlich, arbeitete sauber und routiniert.',
  },
];
