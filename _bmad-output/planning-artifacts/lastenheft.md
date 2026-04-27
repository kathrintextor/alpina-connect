# Lastenheft — Alpina Connect
## Kundenportal für digitale Schadenmeldung

**Auftraggeber:** Alpina Versicherungen AG  
**Autorin:** Kathrin  
**Datum:** 27. April 2026  
**Version:** 2.0  
**Status:** Final v2.0 — aktualisiert gemäss SRS v1.0 (27. April 2026)

---

## Revisionshistorie

| Version | Datum | Änderung |
|---|---|---|
| 1.0 | 17. April 2026 | Erstversion nach Quelldokument-Analyse |
| 2.0 | 27. April 2026 | Abgleich mit SRS v1.0: Batch stündlich (DEC-03), DE/FR/IT Phase 1 (REQ-I18N-01), HEIC-Format, 50 MB Gesamtlimit, TLS 1.3, TOTP-2FA |

---

## Inhaltsverzeichnis

1. [Einleitung und Zielsetzung](#1-einleitung-und-zielsetzung)
2. [Stakeholder und Kontext](#2-stakeholder-und-kontext)
3. [Ist-Situation](#3-ist-situation)
4. [Funktionale Anforderungen](#4-funktionale-anforderungen)
5. [Nicht-funktionale Anforderungen](#5-nicht-funktionale-anforderungen)
6. [Rahmenbedingungen](#6-rahmenbedingungen)
7. [Annahmen und Abgrenzungen](#7-annahmen-und-abgrenzungen)
8. [Offene Punkte und identifizierte Lücken](#8-offene-punkte-und-identifizierte-lücken)

---

## 1. Einleitung und Zielsetzung

### 1.1 Ausgangslage

Die Alpina Versicherungen AG ist ein mittelgrosser Schweizer Versicherer mit Fokus auf Kranken- und Zusatzversicherungen. Schadensfälle werden aktuell überwiegend telefonisch oder per E-Mail gemeldet. Dies führt zu:

- **Medienbrüchen** zwischen Eingang und Verarbeitung
- **Langen Bearbeitungszeiten** durch manuelle Dateneingabe
- **Fehlender Transparenz** für Kunden über den Bearbeitungsstatus
- **Hohem manuellem Aufwand** für Sachbearbeiter

### 1.2 Zielsetzung

Mit dem Kundenportal **Alpina Connect** soll eine responsive Webapplikation entwickelt werden, die Privatkunden ermöglicht:

- Schadensfälle eigenständig online zu erfassen
- Dokumente digital hochzuladen
- Den Bearbeitungsstatus jederzeit einzusehen

**Strategisches Ziel:** Alpina Connect soll langfristig als zentrale Plattform für die digitale Interaktion zwischen Kunden und der Alpina Versicherungen AG dienen.

### 1.3 Erfolgskriterien

| Kriterium | Zielwert | Messzeitpunkt |
|---|---|---|
| Schadenmeldung abschliessen | 80% der Kunden in < 5 Min | 6 Monate nach Launch |
| Eingangsbestätigung | Innerhalb 5 Min nach Einreichung | Ab Tag 1 |
| Digitale Meldungsquote | ≥ 60% aller Meldungen | 6 Monate nach Launch |
| Reduktion Telefonmeldungen | ≥ 40% | 6 Monate nach Launch |
| Systemverfügbarkeit | ≥ 99.5% | Laufend |

---

## 2. Stakeholder und Kontext

### 2.1 Stakeholder-Übersicht

| Rolle | Typ | Interesse / Erwartung |
|---|---|---|
| **Privatkunden** | Primärer Nutzer | Einfache, schnelle Schadenmeldung; Statustransparenz; kein Telefonieren |
| **Sachbearbeiter (intern)** | Sekundärer Nutzer | Strukturierte Eingangsdaten; keine Rückfragen; Systemintegration |
| **Support-Mitarbeitende** | Sekundärer Nutzer | Schneller Zugriff auf Fälle nach Schadensnummer |
| **Management** | Auftraggeber | Effizienzsteigerung; Kostenreduktion; Digitalisierungsstrategie |
| **IT / Architektur** | Technischer Stakeholder | Microservice-Architektur; Schweizer Hosting; Bestandssystem-Integration |
| **Security Team** | Regulatorischer Stakeholder | SSO-Login; kein anonymer Zugriff; Datensicherheit |
| **Compliance / Rechtsabteilung** | Regulatorischer Stakeholder | DSG-Konformität; Datenhaltung Schweiz |
| **Makler** (langfristig) | Zukünftiger Nutzer | Eingeschränkter Portalzugang — nicht in Phase 1 |

### 2.2 Persona: Anna (Privatkunde)

Berufstätig, 38 Jahre, zwei Kinder. Meldet samstags um 21:30 Uhr einen Wasserschaden. Erwartet eine Lösung ohne Warteschleife, verständliche Rückmeldung, sofortige Bestätigung.

### 2.3 Persona: Thomas (Sachbearbeiter)

52 Jahre, 15 Jahre Berufserfahrung bei Alpina. Bearbeitet 20–30 Fälle täglich über das interne System. Erwartet vollständige, strukturierte Eingangs­daten ohne Nacherfassung.

---

## 3. Ist-Situation

### 3.1 Aktueller Prozess

Kunden melden Schadensfälle heute ausschliesslich per **Telefon** oder **E-Mail**. Der aktuelle Ablauf:

1. Kunde ruft an oder sendet E-Mail mit Schadensbeschreibung
2. Support nimmt Meldung entgegen und erfasst sie manuell im internen System
3. Sachbearbeiter erhält unstrukturierte Daten, stellt häufig Rückfragen
4. Status wird intern verfolgt — Kunde erhält keine automatischen Updates
5. Kunde ruft erneut an, um Statusauskunft zu erhalten

### 3.2 Identifizierte Probleme der Ist-Situation

| Problem | Auswirkung |
|---|---|
| Medienbruch Telefon/E-Mail → internes System | Manueller Aufwand, Fehlerrisiko |
| Unstrukturierte Eingangsdaten | Häufige Rückfragen, längere Bearbeitungszeit |
| Keine Statustransparenz für Kunden | Hohe Anrufquote für Statusauskünfte |
| Keine digitale Dokumenteneinreichung | Dokumente per Post oder als E-Mail-Anhang; schwer handhabbar |
| Telefonzeiten eingeschränkt | Kunden können nachts/am Wochenende nicht melden |

### 3.3 Bestandssysteme

- **Internes Schadensverwaltungssystem:** Bestehend; Schnittstellen komplex und noch nicht vollständig dokumentiert
- **Datenbankinfrastruktur:** Relationale Datenbank; Erweiterung für Portal-Daten nötig
- **E-Mail-Infrastruktur:** Bestehend; wird für Benachrichtigungen weitergenutzt

---

## 4. Funktionale Anforderungen

> **Legende:** Pflicht = muss in Phase 1 umgesetzt werden | Phase 2 = geplant für spätere Ausbaustufe

### 4.1 Nutzerverwaltung

| ID | Anforderung | Priorität | Quelle | Akzeptanzkriterium |
|---|---|---|---|---|
| **FA-01** | Das System ermöglicht einem Kunden die Registrierung mit E-Mail-Adresse und Passwort. | Pflicht | Business Vision, Fachbereich | Registrierung ist in ≤ 3 Schritten abgeschlossen. Bestätigungs-E-Mail wird innerhalb von 2 Min zugestellt. |
| **FA-02** | Das System ermöglicht dem Kunden die Anmeldung via SSO mit verpflichtender Zwei-Faktor-Authentifizierung (TOTP oder SMS-OTP). | Pflicht | Security Team, Fachbereich (W-02c) | Login schlägt ohne korrekte 2FA-Bestätigung fehl. Fehlgeschlagene Versuche werden nach 5 Fehlversuchen gesperrt (15 Min). |
| **FA-03** | Das System ermöglicht dem Kunden das Zurücksetzen seines Passworts über einen per E-Mail zugestellten Link. | Pflicht | PRD FR3 | Reset-Link ist nach 30 Min abgelaufen. Neues Passwort muss Mindestanforderungen erfüllen (≥ 8 Zeichen, 1 Ziffer). |
| **FA-04** | Das System beendet eine aktive Session nach 30 Minuten Inaktivität automatisch. | Pflicht | Security Team | Session-Token ist nach 30 Min ungültig. Beim nächsten Aufruf wird der Nutzer zur Login-Seite weitergeleitet. |
| **FA-05** | Der Kunde kann sich manuell ausloggen. | Pflicht | PRD FR5 | Nach Logout ist der Session-Token invalidiert. Zurück-Navigation zeigt Login-Seite. |

> **Hinweis zu FA-01 (W-02b):** Dok. 2 enthält gleichzeitig „Registrierung nur über Support" und „Kunde soll sich jederzeit selbst registrieren können" — direkter Widerspruch. Entscheidung für Selbstregistrierung: Skalierbarkeit und UX überwiegen. Finale Bestätigung durch Fachbereich ausstehend (→ L-02).

### 4.2 Schadenmeldung

| ID | Anforderung | Priorität | Quelle | Akzeptanzkriterium |
|---|---|---|---|---|
| **FA-06** | Der Kunde kann eine Schadenmeldung mit den Feldern Schadensart, Datum, Ort und Beschreibung erfassen. | Pflicht | PRD FR6, Fachbereich | Alle Pflichtfelder sind validiert. Formular ist ohne Fehler einreichbar, wenn alle Pflichtfelder korrekt ausgefüllt sind. |
| **FA-07** | Der Kunde kann eine begonnene Meldung vor dem Absenden prüfen und korrigieren (Vorschau-Schritt). | Pflicht | PRD FR7 | Vorschau-Screen zeigt alle eingegebenen Daten. Bearbeitung einzelner Felder ist möglich ohne Datenverlust. |
| **FA-08** | Nach Einreichung erhält der Kunde eine eindeutige Schadensnummer und eine Eingangsbestätigung. | Pflicht | PRD FR8 | Schadensnummer wird auf Bestätigungsseite angezeigt. E-Mail-Bestätigung trifft innerhalb von 5 Min ein. |
| **FA-09** | Das System verknüpft die eingereichte Meldung automatisch mit der Versicherungspolice des eingeloggten Kunden. | Pflicht | PRD FR9 | Police-Nummer ist in der Meldungsdetailansicht sichtbar und korrekt zugeordnet. |
| **FA-10** | Der Kunde kann den aktuellen Status aller eigenen Meldungen in einer Übersicht einsehen. | Pflicht | PRD FR10, FR18 | Statusübersicht zeigt alle Meldungen mit Status (Eingegangen / In Prüfung / In Bearbeitung / Abgeschlossen / Abgelehnt). Status ist maximal 60 Minuten veraltet. |

### 4.3 Dokumentenverwaltung

| ID | Anforderung | Priorität | Quelle | Akzeptanzkriterium |
|---|---|---|---|---|
| **FA-11** | Der Kunde kann Dokumente (JPG, PNG, PDF, HEIC) zu einer Schadenmeldung hochladen. | Pflicht | PRD FR11 | Upload erfolgreich bei gültigem Dateiformat und -grösse. Datei ist danach in der Meldungsansicht sichtbar. |
| **FA-12** | Das System validiert Dateigrösse (max. 10 MB) und Dateiformat (JPG, PNG, PDF, HEIC) vor dem Upload client- und serverseitig. | Pflicht | IT Infrastruktur (W-03 entschieden: 10 MB) | Upload wird mit verständlicher Fehlermeldung abgelehnt bei > 10 MB oder ungültigem Format. |
| **FA-12a** | Das System begrenzt das Gesamtvolumen aller hochgeladenen Dateien pro Schadensfall auf maximal 50 MB. Der verbleibende Speicher wird dem Nutzer angezeigt. | Pflicht | SRS REQ-UPL-02 (DEC-04) | Nach Erreichen von 50 MB werden weitere Uploads mit Fehlermeldung und Support-Link abgewiesen. |
| **FA-13** | Bei ungültigem Upload zeigt das System eine Fehlermeldung mit konkreter Handlungsanweisung. | Pflicht | PRD FR15 | Fehlermeldung enthält Dateiname, Grund und konkrete Handlungsanweisung (z.B. „Bitte lade ein JPG, PNG, PDF oder HEIC hoch"). |
| **FA-14** | Der Kunde kann Dokumente direkt per Gerätekamera (Browser-API) aufnehmen und hochladen. | Pflicht | PRD FR14 | Kamera-Upload funktioniert auf Chrome Mobile (Android) und Safari Mobile (iOS). |
| **FA-15** | Das System prüft hochgeladene Dateien serverseitig auf Schadsoftware vor der Speicherung. | Pflicht | PRD (Security) | Infizierte Dateien werden abgelehnt und nicht gespeichert. Kunde erhält Fehlermeldung. |

### 4.4 Statusverfolgung und Benachrichtigungen

| ID | Anforderung | Priorität | Quelle | Akzeptanzkriterium |
|---|---|---|---|---|
| **FA-16** | Der Kunde erhält nach Einreichung einer Schadenmeldung automatisch eine E-Mail mit Schadensnummer und Zusammenfassung. | Pflicht | PRD FR16 | E-Mail enthält: Schadensnummer, Schadensart, Datum der Einreichung, Hinweis auf erwartete Bearbeitungszeit. |
| **FA-17** | Der Kunde erhält eine E-Mail-Benachrichtigung bei jeder Statusänderung seiner Meldung. | Pflicht | PRD FR17 | E-Mail wird innerhalb von 30 Min nach Statusänderung zugestellt. E-Mail enthält neuen Status und Schadensnummer. |
| **FA-18** | Das System synchronisiert Statusänderungen aus dem internen Backendsystem **stündlich** ins Kundenportal (max. 60 Minuten Verzögerung). | Pflicht | DEC-03 (Kathrin Textor, revidiert) | Batch-Sync läuft stündlich. Statusänderung im Backend ist spätestens 60 Minuten nach Erfassung im Portal sichtbar. Fehler werden geloggt und alarmiert. |

### 4.5 Interne Nutzung

| ID | Anforderung | Priorität | Quelle | Akzeptanzkriterium |
|---|---|---|---|---|
| **FA-19** | Sachbearbeiter können Portal-Meldungen mit allen Formularfeldern und Dokumenten im internen System einsehen. | Pflicht | PRD FR20 | Alle Felder und Dokumente sind im internen System ohne Medienbruch abrufbar. |
| **FA-20** | Sachbearbeiter können den Status einer Meldung im internen System aktualisieren. | Pflicht | PRD FR21 | Statusänderung wird im Portal nach der nächsten stündlichen Batch-Synchronisation sichtbar. |
| **FA-21** | Support-Mitarbeitende können eine Meldung anhand der Schadensnummer direkt abrufen. | Pflicht | PRD FR23 (Sandra-Journey) ⚙️ Annahme | Suche nach Schadensnummer liefert Ergebnis in < 3 Sekunden. |

> **Hinweis W-07 (offen — kritisch):** Dok. 2 fordert gleichzeitig vollständige Automatisierung *und* manuelle Prüfung aller Schadensfälle — direkter Widerspruch. Empfehlung: Hybridmodell (automatisierte Vorprüfung + manuelle Freigabe für Grenzfälle). Eine detaillierte Anforderung (FA-30) kann erst nach Entscheid durch Fachbereich und Compliance formuliert werden (→ A-06, L-01).

### 4.6 Sicherheit und Datenschutz

| ID | Anforderung | Priorität | Quelle | Akzeptanzkriterium |
|---|---|---|---|---|
| **FA-22** | Das System speichert alle Kundendaten und Dokumente ausschliesslich auf Servern in der Schweiz. | Pflicht | Compliance (W-08 entschieden) | Vertraglich verankertes Hosting in der Schweiz. Kein Daten-Routing über ausländische Dienste. |
| **FA-23** | Zugriff auf personenbezogene Daten ist nur nach erfolgreicher Authentifizierung möglich. | Pflicht | Security Team (W-02a entschieden) | Direktaufruf von geschützten URLs ohne Login gibt HTTP 401 zurück. |
| **FA-24** | Der Kunde stimmt der Datenschutzerklärung (DSG-konform) bei der Registrierung explizit zu. | Pflicht | Compliance (W-09 korrigiert: DSG statt DSGVO) | Registrierung ist ohne aktives Setzen der Checkbox nicht abschliessbar. Zustimmung wird mit Timestamp gespeichert. |
| **FA-25** | Das System schützt alle Formulare gegen CSRF-Angriffe. | Pflicht | PRD FR27 | Formular-Submit ohne gültiges CSRF-Token gibt HTTP 403 zurück. |

> **Hinweis zu FA-24 (W-09):** Quelldokumente nennen fälschlicherweise „DSGVO" als anwendbares Datenschutzrecht. Massgebend ist das Schweizer DSG (revidiert 2023), da Alpina Versicherungen AG in der Schweiz domiziliert ist. Die Datenschutzerklärung muss zwingend auf DSG-Basis formuliert sein. Die Anwendbarkeit der DSGVO für Kunden aus EU-Mitgliedstaaten (Art. 3 DSGVO) ist von der Rechtsabteilung separat zu prüfen (→ L-04).

### 4.7 Barrierefreiheit und Usability

| ID | Anforderung | Priorität | Quelle | Akzeptanzkriterium |
|---|---|---|---|---|
| **FA-26** | Alle Seiten erfüllen WCAG 2.1 Level AA. | Pflicht | PRD FR29 | Automatisierter WCAG-Check (axe) ohne kritische Fehler. Manueller Test mit Screen Reader (VoiceOver / NVDA) erfolgreich. |
| **FA-27** | Alle Funktionen sind vollständig per Tastatur bedienbar. | Pflicht | PRD FR30 | Vollständige Tab-Navigation durch alle Formulare ohne Maus möglich. |
| **FA-28** | Die Anwendung ist auf Desktop und Mobilgeräten nutzbar (responsive Design). | Pflicht | PRD FR31 | Layout bricht nicht bei Breiten zwischen 320px und 1920px. Touch-Targets ≥ 44×44px. |
| **FA-29** | Alle Fehlermeldungen enthalten eine konkrete Handlungsanweisung. | Pflicht | PRD FR32 | Kein generisches „Ein Fehler ist aufgetreten". Jede Fehlermeldung nennt Ursache und Lösung. |

---

## 5. Nicht-Funktionale Anforderungen

### 5.1 Performance

| ID | Anforderung | Messgrösse | Quelle |
|---|---|---|---|
| **NFA-01** | Initiale Seitenladezeit (LCP) | ≤ 3 Sekunden auf mobilem 4G-Netz | PRD Performance ⚙️ Annahme |
| **NFA-02** | Reaktionszeit bei Formular-Submit und Upload-Start | ≤ 1 Sekunde | PRD Performance ⚙️ Annahme |
| **NFA-03** | Ladezeit Statusseite nach Login | ≤ 2 Sekunden (netzwerkabhängig) | PRD Performance ⚙️ Annahme |
| **NFA-04** | Systemstabilität unter Last | Stabil bei 500 gleichzeitigen aktiven Nutzern | PRD Performance ⚙️ Annahme |

### 5.2 Sicherheit

| ID | Anforderung | Messgrösse | Quelle |
|---|---|---|---|
| **NFA-05** | Transportverschlüsselung | TLS 1.3 für alle Verbindungen; TLS < 1.2 wird abgewiesen | Security Team ✅ |
| **NFA-06** | Datenverschlüsselung at-rest | Alle Dokumente und Personendaten verschlüsselt gespeichert | Security Team ✅ |
| **NFA-07** | Passwortspeicherung | Gesalzene Hashes (bcrypt, min. Cost Factor 12) | Security Team ⚙️ Annahme |
| **NFA-08** | Audit Logging | Alle Zugriffsversuche auf geschützte Ressourcen protokolliert; Aufbewahrung 7 Jahre (OR) | Security Team ✅ |
| **NFA-09** | Malware-Scan | Alle Uploads vor Speicherung gescannt | Security Team ✅ |

### 5.3 Verfügbarkeit und Zuverlässigkeit

| ID | Anforderung | Messgrösse | Quelle |
|---|---|---|---|
| **NFA-10** | Systemverfügbarkeit | ≥ 99.5% (exkl. geplante Wartungsfenster) | Business Vision ✅ |
| **NFA-11** | Batch-Sync Zuverlässigkeit | Stündliche Ausführung; Fehler werden innerhalb von 30 Min alarmiert; manuelle Nachverarbeitung möglich | IT Architektur ✅ |

### 5.4 Skalierbarkeit

| ID | Anforderung | Messgrösse | Quelle |
|---|---|---|---|
| **NFA-12** | Initiale Auslegung | 1'000 registrierte Nutzer, 100 gleichzeitige Sessions | PRD ⚙️ Annahme |
| **NFA-13** | Skalierungsziel | Architektur skalierbar auf 50'000 Nutzer ohne strukturelle Änderungen | PRD ⚙️ Annahme |

### 5.5 Datenschutz und Compliance

| ID | Anforderung | Messgrösse | Quelle |
|---|---|---|---|
| **NFA-14** | Gesetzliche Konformität | Schweizer Datenschutzgesetz (DSG, revidiert 2023) — nicht DSGVO (W-09 korrigiert) | Compliance ✅ |
| **NFA-15** | Datenlokalisierung | 100% der Kundendaten auf Servern mit Standort Schweiz | Compliance (W-08) ✅ |
| **NFA-16** | Datenlöschung | Personenbezogene Daten auf begründeten Antrag hin löschbar (DSG Art. 32) | Compliance ✅ |

### 5.6 Wartbarkeit und Integration

| ID | Anforderung | Messgrösse | Quelle |
|---|---|---|---|
| **NFA-17** | API-Versionierung | REST-Endpunkte versioniert (/api/v1/); Breaking Changes nur mit Versionswechsel | IT Architektur ✅ |
| **NFA-18** | Browser-Kompatibilität | Letzte 2 Hauptversionen von Chrome, Firefox, Safari, Edge; kein IE | PRD ⚙️ Annahme |
| **NFA-19** | Logging und Monitoring | Zentrales Logging-System; Monitoring-Dashboard für Betrieb | IT Architektur ✅ |

---

## 6. Rahmenbedingungen

### 6.1 Technische Rahmenbedingungen

| Bedingung | Beschreibung |
|---|---|
| **Projekttyp** | Responsive Webapplikation (SPA oder MPA — Entscheid beim Architekten) |
| **Architektur** | Microservice-Architektur mit REST APIs; Cloud-native |
| **Hosting** | Ausschliesslich Schweizer Rechenzentren (vertraglich) |
| **Authentifizierung** | Zentrales SSO-System; 2FA: TOTP (Authenticator App) oder SMS-OTP |
| **Dokumentenspeicher** | Externer Storage-Service (Schweizer Rechenzentrum) |
| **Datenbanktyp** | Relationale Datenbank |
| **Statusaktualisierung** | Batch-basiert, **stündlich** (max. 60 Minuten Verzögerung; keine Echtzeit im MVP) |
| **Upload-Limit** | Max. 10 MB pro Datei; max. 50 MB pro Schadensfall (JPG, PNG, PDF, HEIC) |
| **Sprache Phase 1** | Deutsch, Französisch, Italienisch — alle drei Landessprachen der Schweiz |

### 6.2 Organisatorische Rahmenbedingungen

| Bedingung | Beschreibung |
|---|---|
| **Auftraggeber** | Management Alpina Versicherungen AG |
| **Zielgruppe Phase 1** | Privatkunden; interne Sachbearbeiter und Support |
| **Projekt-Kontext** | Greenfield-Produkt mit Brownfield-Integration (Bestandssysteme) |
| **Regulatorisch** | Schweizer DSG (revidiert 2023); interne Sicherheitsrichtlinien |
| **Barrierefreiheit** | WCAG 2.1 Level AA verpflichtend |

### 6.3 Phasenabgrenzung

| Phase | Inhalt |
|---|---|
| **Phase 1 (MVP)** | Schadenmeldung, Upload, Statusverfolgung (stündlich), 2FA-Login, Batch-Sync, DSG-Konformität, DE/FR/IT |
| **Phase 2** | Echtzeit-Status (< 60 Min.), Chat-Support, erweiterte Dokumentenverwaltung |
| **Phase 3 (Vision)** | Native Mobile App, KI-Schadenseinschätzung, Self-Service Portal, Maklerzugang |

---

## 7. Annahmen und Abgrenzungen

### 7.1 Getroffene Annahmen

| ID | Annahme | Begründung |
|---|---|---|
| **A-01** | Login ist für alle Zugriffe auf personenbezogene Daten verpflichtend. Kein anonymer Zugang. | Security Team: SSO zwingend (W-02a). Datenschutz hat höchste Priorität (Business Vision). |
| **A-02** | Upload-Limit beträgt 10 MB pro Datei; max. 50 MB pro Schadensfall. | Technisch begründete Vorgabe (IT Infrastruktur, W-03). Gesamtlimit ermöglicht umfangreiche Dokumentation. |
| **A-03** | Statusaktualisierung erfolgt batch-basiert, **stündlich** (max. 60 Minuten Verzögerung). | DEC-03: Tägliche Verarbeitung ist bei Massenanfallereignissen (Naturkatastrophen) operativ nicht vertretbar. Stündliches Intervall gewährleistet zeitlich reibungslosen Ablauf. |
| **A-04** | Phase 1 umfasst Deutsch, Französisch und Italienisch. Die Architektur ist i18n-fähig ausgelegt. | Alpina ist in der ganzen Schweiz tätig. Alle drei Landessprachen sind regulatorisch und kundenrelevant (SRS REQ-I18N-01). |
| **A-05** | Native App (iOS/Android) wird in Phase 1 nicht entwickelt. Responsive Web genügt. | Mobile Team bestätigt: keine native App geplant. Responsive Web deckt mobile Nutzung ab (W-05). |
| **A-06** | Verarbeitung der Schadensfälle erfolgt im Hybridmodell: automatisierte Vorprüfung + manuelle Freigabe für komplexe Fälle. | Vollautomatisierung regulatorisch riskant; rein manuelle Prüfung nicht skalierbar (W-07, Entscheidung ausstehend — Hybridmodell als Empfehlung). |
| **A-07** | Alle Kundendaten werden ausschliesslich in der Schweiz gespeichert. Cloud-Dienste ausserhalb der Schweiz sind ausgeschlossen. | Compliance-Anforderung (W-08). Verstoss gegen DSG nicht akzeptabel. |
| **A-08** | Anwendbares Datenschutzrecht ist das Schweizer DSG (revidiert 2023), nicht die EU-DSGVO. | Sachlicher Fehler in Quelldokumenten korrigiert (W-09). Rechtsabteilung muss DSGVO-Anwendbarkeit für EU-Kunden gesondert prüfen. |
| **A-09** | Kundenregistrierung ist eigenständig über das Portal möglich (ohne Support). | Kompromisspfad: Selbstregistrierung mit automatisierter Verifizierung (W-02b, Entscheidung ausstehend). |
| **A-10** | Support erfolgt über E-Mail. Chat-Support ist Phase 2. | Fachbereichs-Widerspruch aufgelöst: E-Mail als realistischer MVP-Kanal (W-01). |

### 7.2 Abgrenzungen (nicht in Phase 1)

- Chat-Support zwischen Kunden und Mitarbeitenden
- Native Mobile App (iOS / Android)
- Echtzeit-Statusaktualisierung (< 60 Minuten)
- KI-gestützte Schadenseinschätzung
- Self-Service Portal (Vertragsverwaltung, Adressänderung)
- Maklerzugang
- Zahlungsabwicklung oder Auszahlungsprozesse

---

## 8. Offene Punkte und identifizierte Lücken

> Dieser Abschnitt dokumentiert alle identifizierten Widersprüche aus den Quelldokumenten sowie noch nicht final entschiedene Punkte. Die vollständige Analyse ist im **Widerspruchskatalog v2.0** (separates Dokument) festgehalten.

### 8.1 Widersprüche aus Quelldokumenten (Zusammenfassung)

| ID | Thema | Status | Entscheidung |
|---|---|---|---|
| W-01 | Support-Kanal: Chat vs. E-Mail | Empfehlung | E-Mail MVP, Chat Phase 2 |
| W-02a | Login: Ohne Login vs. SSO-Pflicht | **Entschieden** | SSO verpflichtend (Security) |
| W-02b | Registrierung: Selbst vs. nur über Support | Offen | Selbstregistrierung + Verifizierung empfohlen |
| W-02c | 2FA vs. einfacher Zugang | **Entschieden** | TOTP oder SMS-OTP verpflichtend |
| W-03 | Upload-Limit: 5 MB / 10 MB / 50 MB | **Entschieden** | 10 MB/Datei; 50 MB/Schadensfall |
| W-04 | Status: Echtzeit vs. Batch täglich | **Entschieden (revidiert)** | Batch **stündlich** Phase 1, Echtzeit Phase 2 |
| W-05 | Mobile: Native App vs. Desktop-Fokus | **Entschieden** | Responsive Web Phase 1, App Phase 3 |
| W-06 | Mehrsprachigkeit: sofort vs. initial DE | **Entschieden (revidiert)** | DE/FR/IT alle in Phase 1 (SRS REQ-I18N-01) |
| W-07 | Verarbeitung: automatisiert vs. manuell | Offen (kritisch) | Hybridmodell empfohlen — Entscheid fehlt |
| W-08 | Hosting: Schweiz vs. Ausland | **Entschieden** | Ausschliesslich Schweiz |
| W-09 | Datenschutzrecht: DSGVO vs. DSG | **Korrigiert** | DSG massgebend; DSGVO durch Rechtsabteilung prüfen |

### 8.2 Identifizierte Lücken

| ID | Lücke | Handlungsbedarf |
|---|---|---|
| **L-01** | Schadensfallverarbeitung (Hybridmodell) nicht final entschieden | Fachbereich und Compliance müssen Kriterien für automatisierte vs. manuelle Fälle definieren |
| **L-02** | Registrierungsprozess nicht final geklärt (Selbst vs. Support) | Fachbereich muss entscheiden; hat direkte Auswirkung auf FA-01 und Prozessdesign |
| **L-03** | Bestandssystem-API nicht dokumentiert | IT muss API-Spezifikation erstellen; kritisch für FA-09, FA-18, FA-19, FA-20 |
| **L-04** | Datenschutzprüfung für EU-Kunden ausstehend | Rechtsabteilung muss DSGVO-Anwendbarkeit prüfen (Art. 3 DSGVO) |
| **L-05** | SLA für Bestandssystem-Integration nicht definiert | IT muss Verfügbarkeits- und Latenz-SLA für Batch-Sync definieren |
| **L-06** | Konkrete Schadensarten nicht spezifiziert | Fachbereich muss Liste der unterstützten Schadensarten (FA-06) liefern |
| **L-07** | Authentifizierungsanbieter (SSO-System) nicht bestimmt | IT Architektur muss SSO-Provider festlegen |

### 8.3 Anforderungen mit erhöhtem Risiko

| Anforderung | Risiko | Mitigation |
|---|---|---|
| FA-09 (Police-Verknüpfung) | Bestandssystem-API unbekannt; könnte MVP-Scope sprengen | Frühzeitige API-Analyse; Fallback: manuelle Verknüpfung |
| FA-15 (Malware-Scan) | Externer Service nötig; Latenz kann Upload-UX beeinflussen | Asynchroner Scan; Datei erst nach Scan freigeben |
| FA-18 (Batch-Sync stündlich) | Stündliche Ausführung erfordert Backend-Anpassung (aktuell: täglich) | Anpassung im MVP-Scope; Retry-Mechanismus; Alert bei Batch-Fehler |

---

*Lastenheft Version 2.0 — Aktualisiert: 27. April 2026 | Autorin: Kathrin*  
*Offene Punkte L-01, L-02, L-03 sind dokumentiert und bedürfen Klärung vor Entwicklungsstart*
