/**
 * Zentrale Stammdaten (NAP) der Tischlerei Fandrich GmbH.
 * Alle mit TODO markierten Werte vor dem Livegang verifizieren.
 */
export const site = {
  name: 'Fandrich GmbH',
  brand: 'FANDRICH',
  claim: 'Tischlerei & Möbelrestaurierung, Berlin',
  // TODO verifizieren: Gründungsjahr laut Fassadenschild "Meisterbetrieb seit 1964"
  // (auf dem Foto schwer lesbar — könnte auch 1984 sein).
  foundingYear: 1964,
  street: 'Treseburger Straße 30', // TODO verifizieren
  zip: '13129',
  city: 'Berlin',
  district: 'Pankow',
  phone: '030 36 44 57 60', // TODO verifizieren
  phoneHref: '+493036445760',
  email: 'kontakt@tischlerei-fandrich.de', // TODO: echte E-Mail-Adresse eintragen
  geo: { lat: 52.594, lng: 13.437 }, // TODO: exakte Koordinaten prüfen (Treseburger Str. 30)
  openingHours: 'Mo–Fr 7–16 Uhr', // TODO: Öffnungszeiten verifizieren
  openingHoursSchema: 'Mo-Fr 07:00-16:00', // TODO: an echte Zeiten anpassen
} as const;
