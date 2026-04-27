export const mockUser = {
  id: 'u1',
  vorname: 'Anna',
  nachname: 'Müller',
  email: 'anna.mueller@example.ch',
  police: 'POL-2024-00812',
};

export const statusLabels = {
  eingegangen: 'Eingegangen',
  in_bearbeitung: 'In Bearbeitung',
  abgeschlossen: 'Abgeschlossen',
};

export const schadensarten = [
  'Wasserschaden',
  'Brandschaden',
  'Sturmschaden',
  'Einbruch/Diebstahl',
  'Glasbruch',
  'Fahrzeugschaden',
  'Sonstiges',
];

export const mockClaims = [
  {
    id: 'ALV-2026-4872',
    art: 'Wasserschaden',
    datum: '2026-04-10',
    ort: 'Zürich, Musterstrasse 12',
    beschreibung: 'Waschmaschine defekt, Wasser auf Küchenboden.',
    status: 'in_bearbeitung',
    eingereichtAm: '2026-04-10T21:35:00',
    dokumente: ['schaden_foto_1.jpg', 'schaden_foto_2.jpg'],
    statusVerlauf: [
      { status: 'eingegangen', datum: '2026-04-10T21:35:00', notiz: 'Schadenmeldung eingegangen.' },
      { status: 'in_bearbeitung', datum: '2026-04-11T08:00:00', notiz: 'Sachbearbeiter zugewiesen.' },
    ],
  },
  {
    id: 'ALV-2026-3201',
    art: 'Glasbruch',
    datum: '2026-03-22',
    ort: 'Bern, Bahnhofstrasse 5',
    beschreibung: 'Fensterscheibe im Wohnzimmer durch Sturm zerbrochen.',
    status: 'abgeschlossen',
    eingereichtAm: '2026-03-22T14:10:00',
    dokumente: ['rechnung_glaser.pdf'],
    statusVerlauf: [
      { status: 'eingegangen', datum: '2026-03-22T14:10:00', notiz: 'Schadenmeldung eingegangen.' },
      { status: 'in_bearbeitung', datum: '2026-03-23T09:00:00', notiz: 'Prüfung läuft.' },
      { status: 'abgeschlossen', datum: '2026-03-28T16:00:00', notiz: 'Entschädigung ausbezahlt.' },
    ],
  },
  {
    id: 'ALV-2026-1055',
    art: 'Sturmschaden',
    datum: '2026-02-14',
    ort: 'Basel, Hauptgasse 3',
    beschreibung: 'Dachziegel durch Sturm beschädigt.',
    status: 'eingegangen',
    eingereichtAm: '2026-02-14T09:20:00',
    dokumente: [],
    statusVerlauf: [
      { status: 'eingegangen', datum: '2026-02-14T09:20:00', notiz: 'Schadenmeldung eingegangen.' },
    ],
  },
];
