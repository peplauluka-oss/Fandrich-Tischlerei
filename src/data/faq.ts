/**
 * FAQ — EINZIGE Quelle (geteilt zwischen dem Accordion-Island und dem
 * FAQPage-JSON-LD auf der Startseite). So bleiben sichtbarer Text und
 * strukturierte Daten garantiert deckungsgleich (Google-Richtlinie).
 */
export interface Qa {
  frage: string;
  antwort: string;
}

export const fragen: Qa[] = [
  {
    frage: 'Repariert ihr auch Kunststofffenster?',
    antwort:
      'Ja. Wir warten und justieren Kunststofffenster, tauschen Glas und erneuern oder ersetzen Beschläge aller gängigen Hersteller — darunter Roto, Siegenia, Winkhaus, Schüco und G+U.',
  },
  {
    frage: 'Lohnt sich die Sanierung alter Kastenfenster?',
    antwort:
      'Fast immer. Sie ist günstiger als ein Austausch, erhält ein echtes Handwerksprodukt und verbessert Schall- und Wärmeschutz — bei einer kontrollierten Undichtigkeit, die die Bausubstanz vor Feuchte schützt.',
  },
  {
    frage: 'Könnt ihr auch moderne, industriell gefertigte Möbel reparieren?',
    antwort:
      'Gerade das ist unsere Stärke. Ob Nutzungs-, Transport-, Umzugs-, Wasser- oder Brandschaden oder ein defekter Beschlag — mit Erfahrung und Fingerspitzengefühl holen wir erstaunlich viel wieder heraus.',
  },
  {
    frage: 'Macht ihr auch Arbeiten an Küchen?',
    antwort:
      'Von der Reparatur über neue Arbeitsplatten und Geräte bis zum kompletten Küchenumzug mit Ab- und Wiederaufbau. Einzelne Elemente bauen wir passgenau nach, wenn Ihre Küche wachsen soll.',
  },
  {
    frage: 'Erhöht ihr auch den Einbruchschutz an Türen?',
    antwort:
      'Ja. An Wohnungs- und Haustüren ergänzen wir Mehrfachverriegelungen, Aufdopplungen, Aushebelsicherungen und Panzerriegel — zusätzlich zu den üblichen Tischlerarbeiten.',
  },
  {
    frage: 'Für wen arbeitet ihr?',
    antwort:
      'Für Privathaushalte, Hausverwaltungen und Unternehmen im Großraum Berlin — vom einzelnen klemmenden Fenster bis zur laufenden Betreuung ganzer Objekte.',
  },
];
