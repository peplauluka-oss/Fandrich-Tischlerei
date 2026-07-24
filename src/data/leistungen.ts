/**
 * Leistungen — EINZIGE Quelle (Landingpage-Scroller + SEO-Unterseiten
 * /leistungen/<slug>). Der ausführliche, indexierbare Inhalt lebt hier,
 * die Startseite bleibt kurz. Keine erfundenen Fakten/Preise — Prozess-
 * und Leistungsbeschreibungen sind sachlich und ehrlich haltbar.
 */
export interface Unterleistung {
  titel: string;
  text: string;
}

export interface LeistungFaq {
  frage: string;
  antwort: string;
}

export interface B2bBlock {
  titel: string;
  text: string;
  punkte: string[];
}

export interface Leistung {
  slug: string;
  nr: string;
  titel: string;
  /** Eine Zeile für die Card auf der Landingpage. */
  kurz: string;
  /** Ausführlicher Einleitungstext (Unterseite). */
  text: string;
  stichworte: string[];
  /** Holzton-Variante der Card (Rhythmus/Abwechslung). */
  ton: 'hell' | 'mittel' | 'dunkel' | 'oak';
  /** SEO-Title (≤ 60 Z.) für die Unterseite. */
  seoTitle: string;
  /** SEO-Meta-Description (140–155 Z.) für die Unterseite. */
  seoDescription: string;
  /** H2-Unterleistungen mit je 60–100 Wörtern Fließtext. */
  unterleistungen: Unterleistung[];
  /** Mini-FAQ (2–3 Fragen) → FAQPage-Schema. */
  faq: LeistungFaq[];
  /** Einsatzgebiet-Absatz (Geo, „Berlin und Umgebung"). */
  einsatzgebiet: string;
  /** Slugs 2–3 verwandter Leistungen für die interne Verlinkung. */
  verwandt: string[];
  /** Optionaler B2B-Abschnitt (nur Wartung). */
  b2b?: B2bBlock;
}

/** „So läuft's ab" — für alle Leistungen gleich, baut Vertrauen + Prozess-SEO. */
export const ablauf: { titel: string; text: string }[] = [
  { titel: 'Anfrage', text: 'Sie schildern Ihr Vorhaben — telefonisch oder über das Kontaktformular. Wir melden uns zeitnah zurück.' },
  { titel: 'Aufmaß & Besichtigung', text: 'Wir kommen zu Ihnen, nehmen genau Maß und besprechen Materialien, Details und den zeitlichen Rahmen.' },
  { titel: 'Angebot', text: 'Sie erhalten ein nachvollziehbares, schriftliches Angebot — ohne versteckte Posten.' },
  { titel: 'Ausführung', text: 'Gefertigt wird in unserer eigenen Werkstatt in Berlin-Pankow, montiert bzw. ausgeführt sauber bei Ihnen vor Ort.' },
  { titel: 'Abnahme', text: 'Gemeinsame Abnahme, bis alles sitzt. Auf unsere Arbeit ist Verlass — auch danach.' },
];

export const leistungen: Leistung[] = [
  {
    slug: 'neuanfertigung',
    nr: '01',
    titel: 'Neuanfertigung',
    kurz: 'Möbel, Fenster und Türen nach Maß — vom Aufmaß bis zur Montage.',
    text: 'Möbel, Fenster und Türen nach Maß — entworfen für Ihren Raum, gefertigt aus Massivholz und ausgesuchten Furnieren. Vom Einbauschrank über die Küche bis zum Holz- oder Kunststofffenster: alles entsteht in unserer eigenen Werkstatt und wird von uns montiert.',
    stichworte: ['Möbel nach Maß', 'Holzfenster', 'Türen', 'Einbauschränke', 'Küchen'],
    ton: 'oak',
    seoTitle: 'Möbel & Einbauschränke nach Maß in Berlin | Fandrich',
    seoDescription:
      'Einbaumöbel, Küchen, Holzfenster und Türen nach Maß vom Meisterbetrieb aus Berlin-Pankow — Aufmaß, Fertigung und Montage aus einer Hand. Jetzt anfragen.',
    unterleistungen: [
      {
        titel: 'Einbaumöbel & Einbauschränke nach Maß',
        text: 'Ob Schrank in der Dachschräge, raumhohe Bibliothek oder das Sideboard für die schwierige Nische — wir planen und fertigen Einbaumöbel millimetergenau für Ihren Raum. Gerade im Berliner Altbau mit schiefen Wänden und hohen Decken spielt Maßarbeit ihre Stärke aus: Jeder Zentimeter wird genutzt, jede Front sitzt bündig. Massivholz oder ausgesuchtes Furnier, mit Griff oder grifflos — die Ausführung richtet sich nach Ihrem Zuhause.',
      },
      {
        titel: 'Küchen nach Maß',
        text: 'Eine Küche, die sich dem Raum anpasst statt umgekehrt: Wir fertigen Küchen und einzelne Elemente passgenau, integrieren Geräte und lösen genau die Ecken, an denen Standardmodule scheitern. Auch wenn eine bestehende Küche wachsen oder umziehen soll, bauen wir passende Teile nach.',
      },
      {
        titel: 'Holzfenster & Türen nach Maß',
        text: 'Neue Holzfenster und Zimmertüren nach Maß — für Neubau wie Altbau, auf Wunsch in Anlehnung an den historischen Bestand. Wir beraten zu Holzart, Beschlag und Verglasung und montieren fachgerecht. So bekommen Sie Fenster und Türen, die passen, dicht schließen und lange halten.',
      },
    ],
    faq: [
      {
        frage: 'Was kostet ein Einbauschrank nach Maß?',
        antwort:
          'Das hängt von Größe, Material und Ausführung ab — ein Maßmöbel ist kein Katalogprodukt. Nach einem Aufmaß vor Ort erhalten Sie ein konkretes, schriftliches Angebot ohne versteckte Posten. So wissen Sie vorab genau, woran Sie sind.',
      },
      {
        frage: 'Massivholz oder Furnier — was ist besser?',
        antwort:
          'Beides hat seine Berechtigung. Massivholz ist robust und lässt sich später aufarbeiten; hochwertiges Furnier erlaubt große, ruhige Flächen und ein durchgehendes Maserbild. Wir beraten ehrlich, was zu Möbel, Nutzung und Budget passt.',
      },
    ],
    einsatzgebiet:
      'Wir fertigen Maßmöbel für Kunden in ganz Berlin und Umgebung — der Werkstattstandort ist Berlin-Pankow, gearbeitet wird aber im gesamten Stadtgebiet, vom Altbau in Prenzlauer Berg über Weißensee bis ins Berliner Umland. Gerade bei Einzelanfertigungen lohnen sich auch längere Wege.',
    verwandt: ['restaurierung', 'reparatur'],
  },
  {
    slug: 'restaurierung',
    nr: '02',
    titel: 'Restaurierung',
    kurz: 'Stücke mit Geschichte fachgerecht wieder instand gesetzt.',
    text: 'Ob Familienerbstück oder modernes Designmöbel — wir setzen Stücke mit Geschichte wieder instand: Schellackpolitur, traditionelle Leime, Reparatur von Nutzungs-, Wasser- oder Brandschäden. Auch alte Kastenfenster bringen wir fachgerecht zurück.',
    stichworte: ['Möbelrestaurierung', 'Schellackpolitur', 'Kastenfenster', 'Schadensreparatur'],
    ton: 'dunkel',
    seoTitle: 'Möbelrestaurierung & Kastenfenster-Sanierung Berlin',
    seoDescription:
      'Schellackpolitur, Antikmöbel und Kastenfenster fachgerecht restauriert — in ganz Berlin und Umgebung. Stücke mit Geschichte erhalten. Unverbindlich anfragen.',
    unterleistungen: [
      {
        titel: 'Möbelrestaurierung & Schellackpolitur',
        text: 'Antike und alte Möbel verlieren ihren Wert, wenn sie unsachgemäß „aufgehübscht" werden. Wir arbeiten mit den Techniken, für die sie gebaut wurden: Schellackpolitur, traditionelle Leime, ergänzte Furniere und Schnitzteile, die zum Original passen. So bleibt die Patina erhalten und das Stück wird wieder benutzbar, statt nur überstrichen — vom Biedermeier-Sekretär bis zur Kommode vom Flohmarkt.',
      },
      {
        titel: 'Antikmöbel & Schadensreparatur',
        text: 'Wasserränder, Brandflecken, Blessuren vom Umzug oder ein gebrochener Beschlag: Mit Erfahrung und Fingerspitzengefühl holen wir erstaunlich viel wieder heraus. Wir prüfen ehrlich, was sich lohnt, und sagen es Ihnen, bevor wir anfangen.',
      },
      {
        titel: 'Kastenfenster sanieren',
        text: 'Alte Kastenfenster sind ein echtes Handwerksprodukt — und fast immer erhaltenswert. Wir machen sie gängig, dichten kontrolliert ab, ergänzen Gläser und Beschläge und verbessern Schall- und Wärmeschutz, ohne den historischen Charakter zu zerstören. Auch für denkmalgeschützte Berliner Altbauten.',
      },
    ],
    faq: [
      {
        frage: 'Lohnt sich eine Restaurierung überhaupt — oder lieber neu kaufen?',
        antwort:
          'Bei Stücken mit Substanz oder ideellem Wert fast immer. Eine fachgerechte Aufarbeitung erhält Material und Charakter, die ein Neukauf nicht bietet — und ist oft günstiger, als man denkt. Wir schauen uns das Stück an und sagen ehrlich, ob sich der Aufwand lohnt.',
      },
      {
        frage: 'Kastenfenster sanieren oder austauschen?',
        antwort:
          'Meist ist die Sanierung die bessere Wahl: Sie ist günstiger als ein Austausch, erhält ein hochwertiges Bauteil und verbessert Schall- und Wärmeschutz. Bei einem Vor-Ort-Termin klären wir den Zustand und die sinnvollste Lösung.',
      },
    ],
    einsatzgebiet:
      'Restaurierungen führen wir für Kunden in ganz Berlin und Umgebung aus — von der Werkstatt in Berlin-Pankow bis in die Altbauviertel in Prenzlauer Berg und Weißensee sowie ins nähere Brandenburger Umland. Empfindliche Stücke holen und bringen wir auf Wunsch selbst.',
    verwandt: ['neuanfertigung', 'reparatur'],
  },
  {
    slug: 'reparatur',
    nr: '03',
    titel: 'Reparatur',
    kurz: 'Was klemmt, zieht oder verschlissen ist — wir richten es.',
    text: 'Fenster, Türen, Treppen, Böden und Küchen — wir richten, was klemmt, zieht oder verschlissen ist. Vom Einstellen und Abdichten über den Austausch einzelner Teile bis zu neuen Beschlägen und mehr Einbruchschutz an der Haustür.',
    stichworte: ['Fenster & Türen', 'Treppen', 'Parkett & Dielen', 'Küchen', 'Sicherheit'],
    ton: 'mittel',
    seoTitle: 'Fenster- & Türreparatur in Berlin | Tischlerei Fandrich',
    seoDescription:
      'Fenster einstellen, Türen, Parkett, Treppen und Küchen reparieren — schnell und sauber in ganz Berlin. Schaden schildern, wir melden uns umgehend.',
    unterleistungen: [
      {
        titel: 'Fenster einstellen & reparieren',
        text: 'Ein Fenster, das klemmt, zieht oder nicht mehr richtig schließt, kostet Wärme und Nerven. Wir stellen Holz- und Kunststofffenster neu ein, erneuern Dichtungen, tauschen Glas und ersetzen Beschläge aller gängigen Hersteller — darunter Roto, Siegenia, Winkhaus, Schüco und G+U. Oft genügt eine Justage, statt gleich das ganze Fenster zu tauschen.',
      },
      {
        titel: 'Türen & Einbruchschutz',
        text: 'Wir richten klemmende Zimmer- und Haustüren, tauschen Zargen und Beschläge und rüsten den Einbruchschutz nach: Mehrfachverriegelungen, Aufdopplungen, Aushebelsicherungen und Panzerriegel für Wohnungs- und Haustüren — ein spürbares Plus an Sicherheit ohne kompletten Türtausch.',
      },
      {
        titel: 'Parkett, Dielen & Treppen',
        text: 'Knarrende Dielen, lose Parkettstäbe, ausgetretene Stufen: Im Altbau gehört das dazu — und lässt sich meist gezielt reparieren, statt alles zu erneuern. Wir bessern schadhafte Stellen aus, ziehen Böden nach und bringen Holztreppen wieder in Form.',
      },
      {
        titel: 'Küchenreparatur',
        text: 'Defekte Scharniere, ausgerissene Auszüge, beschädigte Arbeitsplatten oder ein nötiger Gerätetausch — wir reparieren Küchen aller Hersteller und bauen einzelne Elemente passgenau nach, wenn Ersatzteile fehlen.',
      },
    ],
    faq: [
      {
        frage: 'Mein Fenster schließt nicht mehr richtig — muss es raus?',
        antwort:
          'Meistens nicht. In vielen Fällen lässt sich ein Fenster durch Nachstellen der Beschläge und neue Dichtungen wieder dicht und leichtgängig machen. Erst wenn die Substanz nicht mehr mitmacht, wird ein Austausch sinnvoll — das klären wir vor Ort.',
      },
      {
        frage: 'Lohnt sich die Reparatur oder besser gleich Neukauf?',
        antwort:
          'Wir bewerten das ehrlich nach Zustand und Kosten. Häufig ist eine gezielte Reparatur deutlich günstiger und nachhaltiger als ein Neukauf — besonders bei hochwertigen Fenstern, Türen und Möbeln.',
      },
      {
        frage: 'Erhöht ihr auch den Einbruchschutz an Türen?',
        antwort:
          'Ja. An Wohnungs- und Haustüren ergänzen wir Mehrfachverriegelungen, Aufdopplungen, Aushebelsicherungen und Panzerriegel — zusätzlich zu den üblichen Tischlerarbeiten.',
      },
    ],
    einsatzgebiet:
      'Reparaturen erledigen wir wohnungsnah in ganz Berlin und Umgebung — von Pankow und Heinersdorf über die östlichen Bezirke bis ins nahe Brandenburger Umland. Schildern Sie den Schaden kurz, wir melden uns umgehend mit dem nächsten Schritt.',
    verwandt: ['wartung', 'restaurierung'],
  },
  {
    slug: 'wartung',
    nr: '04',
    titel: 'Wartung',
    kurz: 'Fenster und Türen bleiben dicht und leichtgängig.',
    text: 'Damit Fenster und Türen lange dicht und leichtgängig bleiben: regelmäßige Wartung, Nachstellen der Beschläge, Erneuern von Dichtungen. Für Privathaushalte, Hausverwaltungen und Unternehmen in Berlin und Umgebung.',
    stichworte: ['Fensterwartung', 'Beschläge', 'Dichtungen', 'Hausverwaltungen'],
    ton: 'hell',
    seoTitle: 'Fensterwartung Berlin — auch für Hausverwaltungen',
    seoDescription:
      'Wartung von Fenstern & Türen für Privat und Hausverwaltungen in Berlin: Beschläge nachstellen, Dichtungen erneuern, laufende Objektbetreuung. Ein Ansprechpartner.',
    unterleistungen: [
      {
        titel: 'Fensterwartung & Beschläge',
        text: 'Fenster sind Verschleißteile — regelmäßig gewartet halten sie deutlich länger dicht und leichtgängig. Wir stellen Beschläge nach, fetten bewegliche Teile, prüfen den Anpressdruck und erkennen kleine Mängel, bevor daraus teure Schäden werden. Das spart Heizkosten und erspart den vorzeitigen Austausch.',
      },
      {
        titel: 'Dichtungen erneuern',
        text: 'Poröse, zusammengedrückte Dichtungen lassen Zugluft und Lärm herein. Wir erneuern Fenster- und Türdichtungen fachgerecht — ein kleiner Eingriff mit großer Wirkung auf Komfort und Energieverbrauch.',
      },
    ],
    faq: [
      {
        frage: 'Wie oft sollten Fenster gewartet werden?',
        antwort:
          'Als Faustregel: alle zwei bis drei Jahre, bei stark genutzten oder älteren Fenstern häufiger. Eine regelmäßige Wartung ist deutlich günstiger als die Folgen aus Undichtigkeit und Verschleiß.',
      },
      {
        frage: 'Bietet ihr Rahmenverträge für Hausverwaltungen?',
        antwort:
          'Ja. Für Hausverwaltungen und Wohnungsunternehmen übernehmen wir die laufende Betreuung ganzer Objekte — mit einem festen Ansprechpartner, planbaren Wartungszyklen und dokumentierter Ausführung. Sprechen Sie uns auf einen Rahmenvertrag an.',
      },
    ],
    einsatzgebiet:
      'Wartung übernehmen wir für Privathaushalte und für Objekte von Hausverwaltungen in ganz Berlin und Umgebung — vom einzelnen Fenster bis zur Großwohnanlage, vom Werkstattstandort Pankow bis ins Berliner Umland.',
    verwandt: ['reparatur', 'neuanfertigung'],
    b2b: {
      titel: 'Für Hausverwaltungen & Wohnungsunternehmen',
      text: 'Für die technische Objektbetreuung sind wir ein verlässlicher Partner: ein fester Ansprechpartner statt wechselnder Subunternehmer, kurze Reaktionszeiten und dokumentierte Ausführung. Von der einmaligen Mängelbeseitigung bis zur laufenden Wartung ganzer Bestände — planbar und nachvollziehbar abgerechnet.',
      punkte: [
        'Ein Ansprechpartner für Fenster, Türen und Tischlerarbeiten',
        'Planbare Wartungszyklen und dokumentierte Leistung',
        'Kurze Reaktionszeiten bei Mängeln und Schäden',
        'Rahmenverträge für laufende Objektbetreuung möglich',
      ],
    },
  },
];
