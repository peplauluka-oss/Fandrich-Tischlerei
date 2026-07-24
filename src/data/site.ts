/**
 * Zentrale Stammdaten (NAP) der Tischlerei Fandrich GmbH.
 * Alle mit TODO markierten Werte vor dem Livegang verifizieren.
 */
export const site = {
  name: 'Fandrich GmbH',
  /** Vollständige Firmierung laut Handelsregister (für Impressum/Recht). */
  legalName: 'Tischlerei und Möbelrestaurierung Fandrich GmbH',
  /** Geschäftsführer (verifiziert). */
  geschaeftsfuehrer: 'D. Debski und S. Winkler',
  registergericht: 'Amtsgericht Charlottenburg',
  hrb: 'HRB 80705',
  brand: 'FANDRICH',
  claim: 'Tischlerei & Möbelrestaurierung, Berlin',
  // Hinweis: Das Fassadenschild zeigt "Meisterbetrieb seit 19??" (schwer
  // lesbar, 1964 oder 1984). Solange unverifiziert, verwendet die Website
  // KEINE Jahreszahl. TODO: Gründungsjahr beim Betrieb erfragen und dann
  // gezielt wieder einsetzen (Manifest-Satz, JSON-LD foundingDate).
  street: 'Treseburger Straße 30', // TODO verifizieren
  zip: '13129',
  city: 'Berlin',
  district: 'Pankow',
  phone: '030 36 44 57 60', // TODO verifizieren
  phoneHref: '+493036445760',
  email: 'anfrage@tischlerei-fandrich.de', // verifiziert

  geo: { lat: 52.594, lng: 13.437 }, // TODO: exakte Koordinaten prüfen (Treseburger Str. 30)
  openingHours: 'Mo–Fr 7–16 Uhr', // TODO: Öffnungszeiten verifizieren
  openingHoursSchema: 'Mo-Fr 07:00-16:00', // TODO: an echte Zeiten anpassen
} as const;
