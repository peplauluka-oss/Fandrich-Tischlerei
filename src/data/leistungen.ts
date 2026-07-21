/**
 * Leistungen — EINZIGE Quelle (geteilt zwischen Landingpage-Scroller und den
 * SEO-Unterseiten /leistungen/<slug>). So steht der ausführliche Text NICHT
 * mehr auf der Landingpage (kürzer, weniger Scroll) und jede Leistung bekommt
 * eine eigene, indexierbare Seite.
 */
export interface Leistung {
  slug: string;
  nr: string;
  titel: string;
  /** Eine Zeile für die Card auf der Landingpage. */
  kurz: string;
  /** Ausführlicher Text (Unterseite). */
  text: string;
  stichworte: string[];
  /** Holzton-Variante der Card (Rhythmus/Abwechslung). */
  ton: 'hell' | 'mittel' | 'dunkel' | 'oak';
}

export const leistungen: Leistung[] = [
  {
    slug: 'neuanfertigung',
    nr: '01',
    titel: 'Neuanfertigung',
    kurz: 'Möbel, Fenster und Türen nach Maß — vom Aufmaß bis zur Montage.',
    text: 'Möbel, Fenster und Türen nach Maß — entworfen für Ihren Raum, gefertigt aus Massivholz und ausgesuchten Furnieren. Vom Einbauschrank über die Küche bis zum Holz- oder Kunststofffenster: alles entsteht in unserer eigenen Werkstatt und wird von uns montiert.',
    stichworte: ['Möbel nach Maß', 'Holzfenster', 'Türen', 'Einbauschränke', 'Küchen'],
    ton: 'oak',
  },
  {
    slug: 'restaurierung',
    nr: '02',
    titel: 'Restaurierung',
    kurz: 'Stücke mit Geschichte fachgerecht wieder instand gesetzt.',
    text: 'Ob Familienerbstück oder modernes Designmöbel — wir setzen Stücke mit Geschichte wieder instand: Schellackpolitur, traditionelle Leime, Reparatur von Nutzungs-, Wasser- oder Brandschäden. Auch alte Kastenfenster bringen wir fachgerecht zurück.',
    stichworte: ['Möbelrestaurierung', 'Schellackpolitur', 'Kastenfenster', 'Schadensreparatur'],
    ton: 'dunkel',
  },
  {
    slug: 'reparatur',
    nr: '03',
    titel: 'Reparatur',
    kurz: 'Was klemmt, zieht oder verschlissen ist — wir richten es.',
    text: 'Fenster, Türen, Treppen, Böden und Küchen — wir richten, was klemmt, zieht oder verschlissen ist. Vom Einstellen und Abdichten über den Austausch einzelner Teile bis zu neuen Beschlägen und mehr Einbruchschutz an der Haustür.',
    stichworte: ['Fenster & Türen', 'Treppen', 'Parkett & Dielen', 'Küchen', 'Sicherheit'],
    ton: 'mittel',
  },
  {
    slug: 'wartung',
    nr: '04',
    titel: 'Wartung',
    kurz: 'Fenster und Türen bleiben dicht und leichtgängig.',
    text: 'Damit Fenster und Türen lange dicht und leichtgängig bleiben: regelmäßige Wartung, Nachstellen der Beschläge, Erneuern von Dichtungen. Für Privathaushalte, Hausverwaltungen und Unternehmen im Großraum Berlin.',
    stichworte: ['Fensterwartung', 'Beschläge', 'Dichtungen', 'Hausverwaltungen'],
    ton: 'hell',
  },
];
