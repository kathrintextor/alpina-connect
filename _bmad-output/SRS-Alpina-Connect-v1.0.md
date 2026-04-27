# Software Requirements Specification (SRS)

## Alpina Connect — Digitales Schadensmeldungsportal

**Alpina Versicherungen AG**

---

| Feld | Inhalt |
|---|---|
| Dokument-ID | SRS-ALPINA-CONNECT-v1.0 |
| Version | 1.0 |
| Status | Final (MVP) |
| Datum | 27. April 2026 |
| Autorin | Kathrin Textor |
| Auftraggeber | Alpina Versicherungen AG |
| Norm | IEEE 830-1998 |

---

## Revisionshistorie

| Version | Datum | Autorin | Änderung |
|---|---|---|---|
| 0.1 | 2026-04-20 | K. Textor | Erstentwurf nach Stakeholder-Analyse |
| 0.2 | 2026-04-24 | K. Textor | Anforderungen konsolidiert nach Team-Roundtable |
| 1.0 | 2026-04-27 | K. Textor | Finalisierung inkl. Decision Log und Assumption Log |

---

## Inhaltsverzeichnis

1. Einleitung
   - 1.1 Zweck des Dokuments
   - 1.2 Projektumfang (Scope)
   - 1.3 Definitionen, Akronyme und Abkürzungen
   - 1.4 Referenzen
   - 1.5 Übersicht über das Dokument
2. Allgemeine Beschreibung
   - 2.1 Produktperspektive
   - 2.2 Produktfunktionen (Überblick)
   - 2.3 Benutzerklassen und -merkmale
   - 2.4 Betriebliche Umgebung
   - 2.5 Randbedingungen und Einschränkungen
   - 2.6 Annahmen und Abhängigkeiten
3. Spezifische Anforderungen
   - 3.1 Externe Schnittstellen
   - 3.2 Funktionale Anforderungen
   - 3.3 Nicht-funktionale Anforderungen
   - 3.4 Logische Datenbankstruktur
   - 3.5 Entwurfseinschränkungen
   - 3.6 Qualitätsmerkmale
4. Anhang A — Decision Log
5. Anhang B — Assumption Log
6. Anhang C — Anforderungsübersicht (Traceability Matrix)

---

## 1. Einleitung

### 1.1 Zweck des Dokuments

Dieses Dokument ist die Software Requirements Specification (SRS) für das System **Alpina Connect**, ein webbasiertes Portal zur digitalen Erfassung und Verfolgung von Schadensberichten der Alpina Versicherungen AG. Es wurde gemäß dem IEEE-Standard 830-1998 erstellt.

Das Dokument richtet sich an folgende Zielgruppen:

- **Entwicklungsteam**: Als verbindliche Grundlage für Implementierungsentscheidungen
- **Projektmanagement**: Als Basis für Planung, Scope-Kontrolle und Abnahme
- **Fachbereich / Product Owner**: Zur Verifikation der fachlichen Vollständigkeit
- **Qualitätssicherung**: Als Referenz für Testfallableitung
- **Regulatorik / Compliance**: Zur Nachvollziehbarkeit datenschutzrelevanter Entscheidungen

Die in diesem Dokument spezifizierten Anforderungen beschreiben den Umfang der ersten produktiven Version (MVP — Minimum Viable Product) sowie ausdrücklich markierte Anforderungen der nachfolgenden Phase 2.

### 1.2 Projektumfang (Scope)

**Systemname:** Alpina Connect

**Kurzbeschreibung:**
Alpina Connect ist ein öffentlich zugängliches Webportal, das es Versicherungsnehmern der Alpina Versicherungen AG ermöglicht, Schadenfälle digital zu melden, Dokumente hochzuladen, den Bearbeitungsstatus zu verfolgen und mit dem Kundenservice in Kontakt zu treten. Das Portal löst die bisherige, überwiegend manuelle und papierbasierte Schadensmeldung ab.

**Im Scope (MVP):**
- Digitale Erfassung von Schadensmeldungen (Login verpflichtend, Polizennummer-Zuordnung erforderlich)
- Upload von Dokumenten und Fotos
- Statusverfolgung mit stündlicher Batch-Aktualisierung
- E-Mail-Benachrichtigung bei Statusänderungen
- E-Mail-Support-Kanal
- Mehrsprachigkeit: Deutsch, Französisch, Italienisch
- Responsive Web App (Mobile-First)
- Authentifizierung via SSO + Zwei-Faktor-Authentifizierung für alle Funktionen
- Datenhaltung ausschließlich in der Schweiz

**Ausdrücklich nicht im Scope (MVP):**
- Live-Chat / Chat-Support
- Native Mobile App (iOS / Android)
- Echtzeit-Statusupdates (< 60 Minuten)
- Direkte Integration mit Drittsystemen (z. B. externe Gutachtersoftware)
- Zahlungsfunktionen

**Phase 2 (geplant, nicht spezifiziert):**
- Live-Chat-Support
- Progressive Web App (PWA)-Erweiterungen

### 1.3 Definitionen, Akronyme und Abkürzungen

| Begriff / Akronym | Bedeutung |
|---|---|
| 2FA | Zwei-Faktor-Authentifizierung |
| API | Application Programming Interface |
| DSGVO | Datenschutz-Grundverordnung (EU) |
| HEIC | High Efficiency Image Container (Apple-Bildformat) |
| IEEE | Institute of Electrical and Electronics Engineers |
| MVP | Minimum Viable Product — erste produktive Version |
| nDSG | Neues Datenschutzgesetz der Schweiz (in Kraft seit 01.09.2023) |
| PWA | Progressive Web App |
| REST | Representational State Transfer |
| SLA | Service Level Agreement |
| SRS | Software Requirements Specification |
| SSO | Single Sign-On |
| TLS | Transport Layer Security |
| UI | User Interface — Benutzeroberfläche |
| UX | User Experience — Benutzererlebnis |

**Fachbegriffe:**

- **Schadensfall:** Ein gemeldetes Schadensereignis, dem eine eindeutige Referenznummer zugewiesen wird.
- **Schadensmeldung:** Der initiale Erfassungsvorgang eines Schadensfalles durch den Nutzer.
- **Referenznummer:** Eine systemseitig generierte, eindeutige Kennung eines Schadensfalls.
- **Polizennummer:** Die Vertragskennung des Versicherungsnehmers; verpflichtend für die Zuordnung einer Schadensmeldung.
- **Batch-Verarbeitung:** Periodische Verarbeitung und Aktualisierung von Daten in festgelegten Zeitintervallen (im MVP: stündlich).
- **Authentifizierter Bereich:** Alle Funktionalitäten des Portals — die Plattform erfordert für alle Aktionen eine aktive Nutzer-Session.

### 1.4 Referenzen

| Nr. | Referenz |
|---|---|
| [1] | IEEE Std 830-1998: *IEEE Recommended Practice for Software Requirements Specifications* |
| [2] | Schweizerisches Datenschutzgesetz (nDSG), in Kraft seit 01. September 2023 |
| [3] | Verordnung (EU) 2016/679 — Datenschutz-Grundverordnung (DSGVO) |
| [4] | OWASP Top 10 Web Application Security Risks (2021) |
| [5] | WCAG 2.1 — Web Content Accessibility Guidelines, Level AA |
| [6] | Interne Stakeholder-Interviews und Anforderungsworkshops, Alpina Versicherungen AG, April 2026 |
| [7] | IT-Infrastrukturvorgaben Alpina Versicherungen AG (intern), Version 3.2 |

### 1.5 Übersicht über das Dokument

Das Dokument ist wie folgt gegliedert:

- **Kapitel 2** vermittelt den Kontext: Einbettung des Systems, seine Hauptfunktionen, die beteiligten Nutzergruppen sowie operative und rechtliche Randbedingungen.
- **Kapitel 3** enthält die vollständige, prüfbare Anforderungsspezifikation — gegliedert in externe Schnittstellen, funktionale und nicht-funktionale Anforderungen.
- **Anhang A** dokumentiert alle Team-Entscheidungen mit vollständiger Begründung (Decision Log).
- **Anhang B** listet alle zugrunde liegenden Annahmen (Assumption Log).
- **Anhang C** bietet eine Traceability-Matrix zur Nachvollziehbarkeit aller Anforderungen.

---

## 2. Allgemeine Beschreibung

### 2.1 Produktperspektive

Alpina Connect ist ein neues, eigenständiges System, das keine direkte Ablösung einer bestehenden Software darstellt. Es ergänzt die IT-Landschaft der Alpina Versicherungen AG um einen digitalen Kundenkanal für die Schadensmeldung.

**Systemkontext:**

```
┌─────────────────────────────────────────────────────────┐
│                    Alpina Connect                       │
│                   (Web Portal MVP)                      │
│                                                         │
│  ┌──────────────┐    ┌──────────────┐                   │
│  │  Frontend    │    │  Backend     │                   │
│  │  (Web App,   │◄──►│  (REST APIs, │                   │
│  │  Responsive) │    │  Microsvcs)  │                   │
│  └──────────────┘    └──────┬───────┘                   │
└─────────────────────────────┼───────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
   ┌──────▼──────┐   ┌────────▼────┐   ┌─────────▼──────┐
   │ Dokumenten- │   │  E-Mail-    │   │  Bestandssystem │
   │ speicher    │   │  Dienst     │   │  (Schadens-     │
   │ (CH-hosted) │   │             │   │  verwaltung)    │
   └─────────────┘   └─────────────┘   └────────────────┘
```

Das System kommuniziert über REST APIs mit:
1. Einem externen, in der Schweiz gehosteten Dokumentenspeicherdienst
2. Einem E-Mail-Versanddienst für Benachrichtigungen und Support
3. Den internen Bestandssystemen der Alpina für die Schadensverwaltung

Das Portal ist über Standard-Webbrowser ohne Installation zugänglich. Eine native Mobile App ist für den MVP ausdrücklich nicht vorgesehen (siehe DEC-05).

### 2.2 Produktfunktionen (Überblick)

| Funktionsbereich | Beschreibung | Auth erforderlich |
|---|---|---|
| Schadensmeldung | Formularbasierte Erfassung mit Polizennummer-Zuordnung | **Ja (immer)** |
| Dokumenten-Upload | Hochladen von Fotos und Dokumenten zum Schadensfall | Ja |
| Statusverfolgung | Einsicht in den aktuellen Bearbeitungsstand (stündlich aktualisiert) | Ja |
| E-Mail-Benachrichtigung | Automatische Benachrichtigung bei Statusänderungen | Ja |
| E-Mail-Support | Kontaktaufnahme mit dem Kundenservice per E-Mail | Ja |
| Mehrsprachigkeit | Sprachauswahl DE / FR / IT | Ja |
| Nutzerverwaltung | SSO-Login, Registrierung, 2FA-Verwaltung | Ja |

### 2.3 Benutzerklassen und -merkmale

#### 2.3.1 Versicherungsnehmer (authentifizierter Endnutzer)

- **Beschreibung:** Privatpersonen oder Unternehmen mit Versicherungspolice bei der Alpina, die eine Schadensmeldung einreichen und verfolgen möchten.
- **Technische Kenntnisse:** Grundlegende Internetkenntnisse; keine spezifische technische Expertise erforderlich.
- **Nutzungsfrequenz:** Sehr niedrig — typischerweise einmal alle mehrere Jahre.
- **Besondere Anforderungen:** Einfache, intuitive Bedienung, da die Nutzung in Stresssituationen (nach einem Schadensereignis) erfolgt. Login-Prozess muss trotzdem niedrigschwellig sein.

#### 2.3.2 Sachbearbeiter / Interne Nutzer (Alpina-Mitarbeiter)

- **Beschreibung:** Mitarbeiter der Alpina Versicherungen AG, die Schadensfälle bearbeiten.
- **Anmerkung:** Die Backoffice-Funktionalität für Sachbearbeiter ist **nicht Bestandteil dieses SRS** und wird in einem separaten Dokument spezifiziert. Schnittstellen zu internen Bestandssystemen sind jedoch im Scope.

#### 2.3.3 Systemadministratoren

- **Beschreibung:** IT-Mitarbeiter der Alpina, zuständig für Betrieb, Monitoring und Wartung.
- **Primäre Funktionen:** Systemkonfiguration, Logging-Auswertung, Benutzerverwaltung.
- **Technische Kenntnisse:** Hoch.

### 2.4 Betriebliche Umgebung

#### 2.4.1 Client-seitige Umgebung

- **Betriebssysteme:** Windows 10+, macOS 12+, iOS 15+, Android 10+
- **Browser:** Google Chrome (aktuellste 2 Versionen), Mozilla Firefox (aktuellste 2 Versionen), Apple Safari (aktuellste 2 Versionen), Microsoft Edge (aktuellste 2 Versionen)
- **Bildschirmauflösungen:** ab 320 px Breite (Smartphone) bis 2560 px (Desktop)
- **Netzwerk:** Funktionsfähig ab einer stabilen Verbindung von 2 Mbit/s downstream

#### 2.4.2 Server-seitige Umgebung

- **Hosting:** Ausschließlich Rechenzentren in der Schweiz
- **Zertifizierte Anbieter (Beispiele):** Microsoft Azure Switzerland North (Genf/Zürich), AWS Zürich Region
- **Architektur:** Microservices mit containerbasierter Laufzeitumgebung (z. B. Docker / Kubernetes)
- **Datenbankstandort:** Schweiz (gemäß REQ-DAT-01)

### 2.5 Randbedingungen und Einschränkungen

| ID | Randbedingung | Kategorie |
|---|---|---|
| CON-01 | Datenhaltung ausschließlich in der Schweiz (nDSG, DSGVO) | Rechtlich |
| CON-02 | Maximale Dateigröße 10 MB pro Datei (IT-Infrastrukturvorgabe) | Technisch |
| CON-03 | Keine Native App im MVP (Unternehmensplanung) | Strategisch |
| CON-04 | Kein Live-Chat im MVP (personelle und technische Kapazität) | Operativ |
| CON-05 | Status-Batch stündlich (Backend-Verarbeitungsintervall MVP) | Technisch |
| CON-06 | Unterstützung von drei Landessprachen (CH: DE, FR, IT) | Regulatorisch |
| CON-07 | Barrierefreiheit gemäß WCAG 2.1 Level AA | Qualitativ |
| CON-08 | Login verpflichtend für alle Funktionen inkl. Schadensmeldung | Fachlich / Sicherheit |

### 2.6 Annahmen und Abhängigkeiten

Die vollständige Annahmedokumentation befindet sich in **Anhang B**. Kurzübersicht:

| ID | Annahme | Auswirkung bei Nichteintreten |
|---|---|---|
| A-01 | Chat ist für MVP technisch/personell nicht bereit | Verschiebung in Phase 2 entfällt |
| A-02 | Login verpflichtend ist fachlich und compliance-seitig akzeptiert; Polizennummer-Zuordnung als Pflicht | Auth-Konzept (DEC-02) muss überarbeitet werden |
| A-03 | Stündliche Batch-Verarbeitung ist technisch realisierbar (Backend-Anpassung erforderlich) | Status-Anforderungen und Backend-Architektur müssen überarbeitet werden |
| A-04 | 10 MB/Datei ist technisch verbindlich für MVP | Upload-Anforderungen und UX müssen angepasst werden |
| A-05 | Native App für Phase 1 ausgeschlossen | Entwicklungsplanung muss überarbeitet werden |
| A-06 | Datenhaltung in CH rechtlich nicht verhandelbar | Entfällt — rechtliche Grundlage ist eindeutig |

---

## 3. Spezifische Anforderungen

> **Hinweis zur Notation:**
> Jede Anforderung folgt dem Format:
> - **ID:** Eindeutiger Bezeichner
> - **Beschreibung:** Was das System tun muss
> - **Priorität:** MUSS (MVP-kritisch) / SOLL (MVP-wünschenswert) / KANN (Phase 2)
> - **Quelle:** Woher die Anforderung stammt
> - **Abnahmekriterium:** Wie die Erfüllung geprüft wird

---

### 3.1 Externe Schnittstellen

#### 3.1.1 Benutzeroberfläche (UI)

**REQ-UI-01**
- **Beschreibung:** Das System MUSS eine webbasierte Benutzeroberfläche bereitstellen, die ohne Plugin-Installation in Standard-Webbrowsern vollständig nutzbar ist.
- **Priorität:** MUSS
- **Abnahmekriterium:** Alle User Journeys sind in den aufgeführten Browser-/OS-Kombinationen ohne Fehlermeldung vollständig durchführbar.

**REQ-UI-02**
- **Beschreibung:** Das System MUSS einem Mobile-First-Designprinzip folgen. Die Benutzeroberfläche MUSS auf Bildschirmbreiten ab 320 px vollständig nutzbar sein, ohne horizontales Scrollen oder abgeschnittene Inhalte.
- **Priorität:** MUSS
- **Quelle:** DEC-05
- **Abnahmekriterium:** Responsive-Test auf iPhone SE (375 px) und Standard-Desktop (1280 px) ohne Layout-Fehler bestanden.

**REQ-UI-03**
- **Beschreibung:** Das System MUSS die Barrierefreiheitsrichtlinien WCAG 2.1 Level AA einhalten.
- **Priorität:** MUSS
- **Abnahmekriterium:** Automatisierter Accessibility-Scan (axe, Lighthouse) und manueller Screen-Reader-Test ohne Critical- oder Serious-Fehler.

#### 3.1.2 Hardware-Schnittstellen

**REQ-HW-01**
- **Beschreibung:** Das System MUSS die Kamera-API des Browsers unterstützen, sodass Nutzer auf mobilen Geräten Fotos direkt über das Upload-Formular aufnehmen können.
- **Priorität:** SOLL
- **Abnahmekriterium:** Upload via Kamera-Capture auf iOS Safari und Android Chrome ohne zusätzliche App-Installation möglich.

#### 3.1.3 Software-Schnittstellen

**REQ-SWI-01**
- **Beschreibung:** Das System MUSS eine REST-API-Schnittstelle zum internen Schadensverwaltungssystem der Alpina bereitstellen, über die Schadensmeldungen übermittelt und Statusdaten abgerufen werden.
- **Priorität:** MUSS
- **Abnahmekriterium:** Erfolgreiche Integration gemäß API-Kontrakt-Dokument.

**REQ-SWI-02**
- **Beschreibung:** Das System MUSS eine Schnittstelle zu einem externen, in der Schweiz gehosteten Dokumentenspeicherdienst nutzen. Dokumente DÜRFEN NICHT auf dem Applikationsserver selbst gespeichert werden.
- **Priorität:** MUSS
- **Quelle:** REQ-ARC-02, DEC-06
- **Abnahmekriterium:** Alle hochgeladenen Dateien sind ausschließlich im konfigurierten externen Speicherdienst nachweisbar.

**REQ-SWI-03**
- **Beschreibung:** Das System MUSS eine Schnittstelle zu einem E-Mail-Versanddienst nutzen, um automatische Benachrichtigungen und Support-E-Mails zu versenden.
- **Priorität:** MUSS
- **Abnahmekriterium:** E-Mail-Versand nach Schadensmeldung und bei Statusänderung ist im Test nachweisbar (< 5 Minuten Zustellzeit).

#### 3.1.4 Kommunikationsschnittstellen

**REQ-COM-01**
- **Beschreibung:** Alle Datenkommunikation zwischen Client und Server MUSS über TLS 1.3 oder höher verschlüsselt erfolgen. Verbindungen mit TLS-Versionen unter 1.2 MÜSSEN abgelehnt werden.
- **Priorität:** MUSS
- **Quelle:** REQ-SEC-01
- **Abnahmekriterium:** SSL-Labs-Test: Bewertung A+. TLS 1.0/1.1-Verbindungen werden abgewiesen.

---

### 3.2 Funktionale Anforderungen

#### 3.2.1 Authentifizierung und Autorisierung

**REQ-AUTH-01** *(Login verpflichtend für alle Funktionen)*
- **Beschreibung:** Das System MUSS für alle Funktionen — einschließlich der initialen Schadensmeldung — eine aktive, authentifizierte Session voraussetzen. Eine anonyme Nutzung des Portals ist NICHT zulässig. Bei jedem Zugriff ohne gültige Session wird der Nutzer auf die Login-Seite weitergeleitet.
- **Priorität:** MUSS
- **Quelle:** DEC-02 (revidiert)
- **Begründung:** Ohne Anmeldung und Zuordnung zur Polizennummer des Versicherungsnehmers ist eine korrekte Zuweisung der Schadensmeldung nicht gewährleistet. Das Risiko nicht-zugeordneter Meldungen überwiegt den Usability-Vorteil eines anonymen Zugangs.
- **Abnahmekriterium:** Direktzugriff auf jede Seite des Portals ohne gültige Session gibt HTTP 401 zurück und leitet auf Login weiter. Es existiert kein Pfad zur Schadensmeldung ohne vorherige Authentifizierung.

**REQ-AUTH-02** *(Polizennummer-Zuordnung)*
- **Beschreibung:** Das System MUSS bei der Schadensmeldung die Polizennummer des Versicherungsnehmers automatisch aus dem authentifizierten Nutzerkonto auslesen und der Schadensmeldung zuordnen. Eine manuelle Eingabe der Polizennummer durch den Nutzer MUSS ebenfalls möglich sein.
- **Priorität:** MUSS
- **Quelle:** DEC-02 (revidiert)
- **Abnahmekriterium:** Jede eingereichte Schadensmeldung hat im Backend eine zugeordnete Polizennummer. Schadensmeldungen ohne gültige Polizennummer werden abgewiesen.

**REQ-AUTH-03** *(SSO + Zwei-Faktor-Authentifizierung)*
- **Beschreibung:** Das System MUSS Authentifizierung via SSO (Single Sign-On) mit verpflichtender Zwei-Faktor-Authentifizierung (2FA) für alle Bereiche durchsetzen. Ein Login ausschließlich per Passwort DARF keinen Zugang gewähren.
- **Priorität:** MUSS
- **Quelle:** DEC-02
- **Abnahmekriterium:** Ein Login-Versuch mit korrektem Passwort, aber ohne 2FA-Bestätigung, gewährt keinen Zugang.

**REQ-AUTH-04** *(Datenschutz)*
- **Beschreibung:** Das System DARF ohne aktive, authentifizierte Session KEINE personenbezogenen Daten anzeigen oder übermitteln.
- **Priorität:** MUSS
- **Quelle:** REQ-DAT-03
- **Abnahmekriterium:** Alle API-Endpunkte mit personenbezogenen Daten geben ohne gültiges Auth-Token ausschließlich HTTP 401/403 zurück.

#### 3.2.2 Schadensmeldung

**REQ-DMG-01** *(Schadenserfassungsformular)*
- **Beschreibung:** Das System MUSS ein strukturiertes Formular zur Schadensmeldung bereitstellen. Folgende Felder MÜSSEN als Pflichtfelder vorhanden sein:
  - Schadenstyp (Auswahl aus definierten Kategorien)
  - Schadensdatum (Datum-Eingabefeld)
  - Schadensbeschreibung (Freitextfeld, min. 20 / max. 2000 Zeichen)
  - Polizennummer (automatisch befüllt aus Nutzerkonto, manuell editierbar)
- **Priorität:** MUSS
- **Abnahmekriterium:** Formular kann nicht abgesendet werden, solange ein Pflichtfeld leer oder ungültig ist. Inline-Validierungsfeedback ist sichtbar.

**REQ-DMG-02** *(Schadenstyp-Auswahl)*
- **Beschreibung:** Das System MUSS die Auswahl des Schadenstyps aus einer vordefinierten, pflegbaren Kategorienliste ermöglichen. Mindestumfang: Hausrat, Fahrzeug, Haftpflicht, Reise, Sonstiges.
- **Priorität:** MUSS
- **Abnahmekriterium:** Auswahloptionen sind vorhanden; Freitexteingabe für Schadenstyp nicht zulässig.

**REQ-DMG-03** *(Automatische Referenznummer)*
- **Beschreibung:** Das System MUSS nach erfolgreicher Einreichung automatisch eine eindeutige Referenznummer generieren und diese dem Nutzer im UI sowie per E-Mail übermitteln.
- **Priorität:** MUSS
- **Abnahmekriterium:** Innerhalb von 60 Sekunden nach Absenden ist eine eindeutige Referenznummer im UI sichtbar und eine Bestätigungs-E-Mail zugestellt.

**REQ-DMG-04** *(Bestätigungsseite)*
- **Beschreibung:** Das System MUSS nach erfolgreicher Einreichung eine Bestätigungsseite mit Referenznummer, Hinweis auf die Bestätigungs-E-Mail und Handlungsempfehlung für den nächsten Schritt anzeigen.
- **Priorität:** MUSS
- **Abnahmekriterium:** Bestätigungsseite erscheint nach jedem erfolgreichen Submit; alle Elemente sind vorhanden.

#### 3.2.3 Dokumenten-Upload

**REQ-UPL-01** *(Maximale Einzeldateigröße)*
- **Beschreibung:** Das System MUSS den Upload einzelner Dateien auf maximal 10 MB begrenzen. Überschreitungen werden mit verständlicher Fehlermeldung client-seitig abgewiesen.
- **Priorität:** MUSS
- **Quelle:** DEC-04
- **Abnahmekriterium:** Datei 10,1 MB wird abgewiesen; 9,9 MB wird akzeptiert.

**REQ-UPL-02** *(Gesamtlimit pro Schadensfall)*
- **Beschreibung:** Das System MUSS das Gesamtvolumen aller Dateien pro Schadensfall auf 50 MB begrenzen. Verbleibender Speicherplatz wird dem Nutzer angezeigt.
- **Priorität:** MUSS
- **Quelle:** DEC-04
- **Abnahmekriterium:** Nach 50 MB werden weitere Uploads abgewiesen.

**REQ-UPL-03** *(Unterstützte Dateiformate)*
- **Beschreibung:** Das System MUSS folgende Formate akzeptieren: JPG/JPEG, PNG, PDF, HEIC. Alle anderen Typen werden abgewiesen.
- **Priorität:** MUSS
- **Abnahmekriterium:** .exe, .zip, .docx werden abgewiesen; .jpg, .png, .pdf, .heic unter 10 MB werden akzeptiert.

**REQ-UPL-04** *(Mehrfach-Upload)*
- **Beschreibung:** Das System MUSS den gleichzeitigen Upload mehrerer Dateien in einem Vorgang ermöglichen.
- **Priorität:** MUSS
- **Abnahmekriterium:** Mehrere Dateien können gleichzeitig selektiert und hochgeladen werden.

#### 3.2.4 Statusverfolgung

**REQ-STA-01** *(Stündliche Batch-Aktualisierung)*
- **Beschreibung:** Das System MUSS den aktuellen Bearbeitungsstatus eines Schadensfalls anzeigen. Die angezeigte Information DARF gegenüber dem Backend-Status eine maximale Verzögerung von 60 Minuten aufweisen (stündliche Batch-Verarbeitung).
- **Priorität:** MUSS
- **Quelle:** DEC-03 (revidiert durch Kathrin Textor)
- **Begründung:** Eine tägliche Batch-Verarbeitung ist fachlich nicht vertretbar. Bei Massenanfallereignissen (Naturkatastrophen, Hagelstürme) würde ein künstlicher 24h-Datenstau die operative Schadensbearbeitung blockieren und für Kunden in Ausnahmesituationen unzumutbare Wartezeiten erzeugen.
- **Abnahmekriterium:** Eine Statusänderung im Backend ist spätestens 60 Minuten nach Erfassung im Portal sichtbar.

**REQ-STA-02** *(Anzeige des Aktualisierungszeitpunkts)*
- **Beschreibung:** Das System MUSS auf jeder Statusseite den Zeitpunkt der letzten Statusaktualisierung (Timestamp "Zuletzt aktualisiert: TT.MM.JJJJ HH:MM") deutlich sichtbar anzeigen.
- **Priorität:** MUSS
- **Quelle:** DEC-03
- **Abnahmekriterium:** Timestamp gibt den Zeitpunkt der letzten Backend-Aktualisierung korrekt wieder.

**REQ-STA-03** *(E-Mail-Benachrichtigung bei Statusänderung)*
- **Beschreibung:** Das System MUSS bei relevanten Statuswechseln automatisch eine E-Mail-Benachrichtigung versenden (z. B. "In Bearbeitung", "Abgeschlossen", "Rückfrage erforderlich").
- **Priorität:** MUSS
- **Abnahmekriterium:** Bei Statuswechsel im Backend erhält der Nutzer innerhalb von 30 Minuten eine E-Mail.

#### 3.2.5 Support-Kanal

**REQ-SUP-01** *(E-Mail-Support MVP)*
- **Beschreibung:** Das System MUSS eine E-Mail-Support-Möglichkeit bereitstellen. Die Referenznummer des Schadensfalls wird automatisch angehängt.
- **Priorität:** MUSS
- **Quelle:** DEC-01
- **Abnahmekriterium:** Support-E-Mail kann über das Portal versendet werden und ist im Kundendienst-Postfach eingegangen.

**REQ-SUP-02** *(Live-Chat Phase 2)*
- **Beschreibung:** In Phase 2 soll ein integrierter Live-Chat-Support-Kanal angeboten werden. Im MVP nicht im Scope.
- **Priorität:** KANN (Phase 2)
- **Quelle:** DEC-01

#### 3.2.6 Mehrsprachigkeit (Internationalisierung)

**REQ-I18N-01** *(Sprachverfügbarkeit)*
- **Beschreibung:** Das System MUSS in Deutsch (DE), Französisch (FR) und Italienisch (IT) vollständig nutzbar sein. Alle UI-Texte, Fehlermeldungen, E-Mails und Hilfetexte müssen in allen drei Sprachen vorliegen.
- **Priorität:** MUSS
- **Abnahmekriterium:** Alle 3 Sprachen sind im vollständigen User-Journey-Test ohne fehlende Übersetzungen nutzbar.

**REQ-I18N-02** *(Sprachauswahl)*
- **Beschreibung:** Das System MUSS beim ersten Aufruf eine Sprachauswahl präsentieren oder die Sprache aus dem Browser-Accept-Language-Header vorschlagen. Die Sprache muss jederzeit ohne Datenverlust geändert werden können.
- **Priorität:** MUSS
- **Abnahmekriterium:** Sprachwechsel während des Ausfüllens erhält alle Formulardaten.

---

### 3.3 Nicht-funktionale Anforderungen

#### 3.3.1 Sicherheitsanforderungen

**REQ-SEC-01** *(Transportverschlüsselung)*
- **Beschreibung:** Alle Kommunikation MUSS über TLS 1.3 verschlüsselt erfolgen. TLS < 1.2 MUSS abgelehnt werden.
- **Priorität:** MUSS
- **Abnahmekriterium:** SSL-Labs: A+. TLS 1.1 wird mit Handshake-Fehler abgewiesen.

**REQ-SEC-02** *(Zwei-Faktor-Authentifizierung)*
- **Beschreibung:** 2FA MUSS verpflichtend sein. Mindestens TOTP (RFC 6238) oder SMS-OTP muss unterstützt werden.
- **Priorität:** MUSS
- **Abnahmekriterium:** Login ohne 2FA-Bestätigung gewährt keinen Zugang; kein Bypass-Pfad vorhanden.

**REQ-SEC-03** *(Input-Validierung)*
- **Beschreibung:** Alle Nutzereingaben MÜSSEN server-seitig validiert und bereinigt werden (OWASP Top 10: SQL Injection, XSS).
- **Priorität:** MUSS
- **Abnahmekriterium:** OWASP ZAP Scan: keine High- oder Critical-Schwachstellen.

**REQ-SEC-04** *(Session Management)*
- **Beschreibung:** Sessions MÜSSEN nach 30 Minuten Inaktivität automatisch invalidiert werden. Nach Logout müssen Tokens server-seitig ungültig sein.
- **Priorität:** MUSS
- **Abnahmekriterium:** Token nach 31-minütiger Inaktivität nicht mehr verwendbar (HTTP 401).

#### 3.3.2 Leistungsanforderungen

**REQ-PER-01** *(Ladezeit)*
- **Beschreibung:** Seitenanfragen MÜSSEN unter normaler Last (bis 500 gleichzeitige Nutzer) in unter 3 Sekunden dargestellt werden (4G / 50 Mbit/s).
- **Priorität:** MUSS
- **Abnahmekriterium:** Lighthouse Performance Score ≥ 85; Time-to-Interactive < 3s bei 4G.

**REQ-PER-02** *(Skalierbarkeit)*
- **Beschreibung:** Das System MUSS für 500 gleichzeitige Nutzer ausgelegt sein. Skalierung auf 1.000 SOLL ohne Architekturänderung möglich sein.
- **Priorität:** MUSS (500) / SOLL (1.000)
- **Abnahmekriterium:** Lasttest 500 virtuelle Nutzer: Fehlerrate < 1%, p95-Latenz < 3s.

**REQ-PER-03** *(Upload-Performance)*
- **Beschreibung:** Upload einer 10-MB-Datei SOLL unter normaler Last in unter 30 Sekunden abgeschlossen sein (4G / 10 Mbit/s upstream).
- **Priorität:** SOLL
- **Abnahmekriterium:** 10-MB-Upload bei simulierter 4G-Verbindung in < 30s.

#### 3.3.3 Verfügbarkeitsanforderungen

**REQ-AVA-01** *(System-Uptime)*
- **Beschreibung:** Das System MUSS eine Verfügbarkeit von mindestens 99,5% pro Kalendermonat erreichen (max. ~3,6 Stunden Downtime/Monat).
- **Priorität:** MUSS
- **Abnahmekriterium:** Monitoring über 3 Monate zeigt ≥ 99,5% Uptime.

**REQ-AVA-02** *(Wartungsfenster)*
- **Beschreibung:** Geplante Wartungsfenster SOLLEN mindestens 48 Stunden im Voraus angekündigt werden.
- **Priorität:** SOLL
- **Abnahmekriterium:** Testankündigung erscheint ≥ 48h vor dem Wartungsfenster.

#### 3.3.4 Datenschutz und Datenresidenz

**REQ-DAT-01** *(Datenhaltung Schweiz)*
- **Beschreibung:** Alle Daten — inkl. Backups, Logs und Dokumentenspeicher — MÜSSEN ausschließlich in Rechenzentren in der Schweiz gespeichert werden. Übertragung in Drittländer ist VERBOTEN.
- **Priorität:** MUSS
- **Quelle:** DEC-06
- **Abnahmekriterium:** Schriftliche Bestätigung des Hosters über CH-Datenhaltung; Konfigurations-Audit ohne ausländische Regionen.

**REQ-DAT-02** *(Zertifizierte Rechenzentren)*
- **Beschreibung:** Alle Anbieter MÜSSEN über zertifizierte Schweizer Rechenzentren verfügen (ISO 27001, SOC 2 Type II) und vertraglich zur CH-Datenhaltung verpflichtet sein.
- **Priorität:** MUSS
- **Abnahmekriterium:** Verträge mit expliziter Schweiz-Klausel liegen vor.

**REQ-DAT-03** *(Gesetzeskonformität)*
- **Beschreibung:** Das System MUSS vollständig konform mit nDSG und DSGVO sein (Zweckbindung, Datensparsamkeit, Auskunftsrecht, Recht auf Löschung).
- **Priorität:** MUSS
- **Abnahmekriterium:** Datenschutz-Folgeabschätzung (DSFA) liegt vor und wurde freigegeben.

**REQ-DAT-04** *(Datenlöschung)*
- **Beschreibung:** Das System MUSS auf Anfrage personenbezogene Daten löschen können (Art. 17 DSGVO).
- **Priorität:** MUSS
- **Abnahmekriterium:** Nach Löschantrag sind alle Daten innerhalb von 30 Tagen aus allen Systemen entfernt.

#### 3.3.5 Mobile und Erreichbarkeit

**REQ-MOB-01** *(Responsive Web App)*
- **Beschreibung:** Das System MUSS als vollständig responsive Web App auf iOS Safari und Android Chrome ohne Funktionseinschränkungen nutzbar sein.
- **Priorität:** MUSS
- **Quelle:** DEC-05
- **Abnahmekriterium:** Vollständiger User-Journey-Test auf iPhone 14 / iOS Safari und Samsung Galaxy / Android Chrome ohne Fehler.

**REQ-MOB-02** *(Mobile-First-Design)*
- **Beschreibung:** Das Design MUSS nach Mobile-First-Prinzip entwickelt werden.
- **Priorität:** MUSS
- **Quelle:** DEC-05
- **Abnahmekriterium:** Mobile-Ansicht vollständig ohne Scrollfallen, abgeschnittene Buttons oder nicht erreichbare Felder.

#### 3.3.6 Architekturanforderungen

**REQ-ARC-01** *(Microservices-Architektur)*
- **Beschreibung:** Das System MUSS auf Microservices mit REST-APIs basieren. Dienste MÜSSEN unabhängig deploybar sein.
- **Priorität:** MUSS
- **Abnahmekriterium:** C4-Diagramm Level 2 liegt vor; jeder Service ist separat deploybar.

**REQ-ARC-02** *(Externer Dokumentenspeicher)*
- **Beschreibung:** Hochgeladene Dokumente MÜSSEN in einem dedizierten externen Speicherdienst abgelegt werden. Der Applikationsserver DARF keine Dokumente dauerhaft speichern.
- **Priorität:** MUSS
- **Abnahmekriterium:** Keine hochgeladenen Dateien persistent auf dem Applikationsserver nachweisbar.

**REQ-ARC-03** *(Zentrales Logging und Monitoring)*
- **Beschreibung:** Das System MUSS über ein zentrales Logging- und Monitoring-System verfügen, das alle sicherheitsrelevanten Ereignisse, Performance-Metriken und System-Health-Daten erfasst.
- **Priorität:** MUSS
- **Abnahmekriterium:** Log-Einträge für alle definierten Ereignistypen sind auffindbar; Alerting-Regeln sind konfiguriert.

---

### 3.4 Logische Datenbankstruktur

| Entität | Schlüsselattribute | Anmerkungen |
|---|---|---|
| Schadensfall | ID, Referenznummer, Polizennummer, Schadenstyp, Datum, Beschreibung, Status, ErstelltAm | Kernobjekt; immer mit Polizennummer verknüpft |
| Dokument | ID, SchadensfallID, Dateiname, Größe, Format, Speicher-URL, HochgeladenAm | Referenz auf externen Speicherdienst |
| Nutzerkonto | ID, E-Mail, SSO-Identifier, Polizennummer(n), 2FA-Konfiguration, ErstelltAm | Pflicht für Portalzugang |
| Statushistorie | ID, SchadensfallID, StatusWert, Zeitpunkt, Quelle | Audit-Trail aller Statusübergänge |
| Benachrichtigung | ID, SchadensfallID, NutzerID, Kanal, Zeitpunkt, Inhalt | Log gesendeter Benachrichtigungen |

---

### 3.5 Entwurfseinschränkungen

| ID | Einschränkung |
|---|---|
| DES-01 | Frontend MUSS in moderner Web-Framework-Technologie implementiert werden (z. B. React, Vue, Angular). |
| DES-02 | APIs MÜSSEN RESTful sein und via OpenAPI 3.0 dokumentiert sein. |
| DES-03 | Alle Secrets DÜRFEN nicht im Source Code liegen; ausschließlich Secret-Management-Dienst (z. B. Azure Key Vault). |
| DES-04 | Das Datenbankschema MUSS migrationsfähig sein (versionierte Migrationsskripte). |

---

### 3.6 Qualitätsmerkmale (nach ISO 25010)

| Merkmal | Ziel | Messgröße |
|---|---|---|
| Funktionale Eignung | Alle MUSS-Anforderungen erfüllt | 100% der Abnahmekriterien bestanden |
| Leistungseffizienz | Ladezeit < 3s, 500 User | Lasttest bestanden |
| Kompatibilität | Alle definierten Browser/OS | Kompatibilitätsmatrix vollständig grün |
| Benutzerfreundlichkeit | Mobile-First, WCAG 2.1 AA | UX-Review + Accessibility-Audit bestanden |
| Zuverlässigkeit | Uptime ≥ 99,5% | Monitoring über 3 Monate |
| Sicherheit | TLS 1.3, 2FA, OWASP Top 10 | Penetrationstest, SSL-Labs A+ |
| Wartbarkeit | Microservices, unabhängiges Deployment | Code-Coverage > 80%, CI/CD aktiv |
| Übertragbarkeit | Cloud-agnostisch (CH-Region) | Deployment auf alternativem CH-Anbieter nachgewiesen |

---

## 4. Anhang A — Decision Log

> Der Decision Log dokumentiert alle wesentlichen Entscheidungen, die während der Anforderungserhebung getroffen wurden. Er dient der Nachvollziehbarkeit für zukünftige Entwicklungsteams und Stakeholder.

---

### DEC-01 — Support-Kanal: E-Mail (MVP), Live-Chat Phase 2

| Feld | Inhalt |
|---|---|
| Entscheidungs-ID | DEC-01 |
| Datum | April 2026 |
| Entschieden von | Kathrin Textor |
| Status | Akzeptiert |
| Betroffene Anforderungen | REQ-SUP-01, REQ-SUP-02 |

**Entscheidung:**
Im MVP wird ausschließlich E-Mail als Support-Kanal angeboten. Live-Chat wird in Phase 2 evaluiert und bei verfügbarer Kapazität implementiert.

**Begründung — John (Product Owner):**
Live-Chat im MVP erzeugt sofortigen Personalplanungsdruck (SLA-Zeiten, Schichtbetrieb), technische Komplexität (Echtzeit-Infrastruktur, Eskalationsprozesse) und bindet Budget, das für Kernfunktionen benötigt wird.

**Begründung — Mary (Business Analyst):**
Die Information "Chat nicht geplant" entstammt einer IT- und Support-Quelle mit konkretem Planungshintergrund. Der Projektleiter hat im Anforderungs-Transkript explizit einen phasenweisen Ansatz vorgeschlagen.

**Verworfene Alternativen:**
- Live-Chat direkt im MVP → Abgelehnt wegen Personalaufwand und technischer Komplexität

---

### DEC-02 — Authentifizierung: Login verpflichtend für alle Funktionen inkl. Schadensmeldung

| Feld | Inhalt |
|---|---|
| Entscheidungs-ID | DEC-02 |
| Datum | April 2026 |
| Entschieden von | Kathrin Textor |
| Status | Akzeptiert (revidiert gegenüber Team-Erstvorschlag) |
| Betroffene Anforderungen | REQ-AUTH-01, REQ-AUTH-02, REQ-AUTH-03, REQ-AUTH-04 |

**Entscheidung:**
Login mit SSO + 2FA ist für alle Funktionen des Portals verpflichtend, einschließlich der initialen Schadensmeldung. Anonymer Zugang ist nicht zulässig.

**Begründung (Kathrin Textor):**
Ohne Anmeldung und Zuordnung zur Polizennummer des Versicherungsnehmers ist eine korrekte Zuweisung der Schadensmeldung nicht gewährleistet. Das Risiko nicht-zugeordneter Meldungen, die im Backend keiner Police zugeordnet werden können, überwiegt den Usability-Vorteil eines anonymen Zugangs. Versicherungsmeldungen ohne Vertragsbezug sind operativ nicht verarbeitbar.

**Abweichung vom Team-Erstvorschlag:**
Das ursprüngliche Hybridmodell (anonyme Erstmeldung möglich) wurde nach fachlicher Abwägung durch die Entscheidungsträgerin verworfen, da die Polizennummer-Zuordnung als fachliche Pflicht eingestuft wird.

**Verworfene Alternativen:**
- Hybridmodell (anonym melden, Login für Folge-Schritte) → Abgelehnt wegen Zuordnungsrisiko
- Vollständig anonymes Portal → Abgelehnt wegen Compliance und Verarbeitbarkeit

---

### DEC-03 — Status-Updates: Stündliche Batch-Verarbeitung (MVP)

| Feld | Inhalt |
|---|---|
| Entscheidungs-ID | DEC-03 |
| Datum | April 2026 |
| Entschieden von | Kathrin Textor |
| Status | Akzeptiert (revidiert gegenüber Team-Erstvorschlag) |
| Betroffene Anforderungen | REQ-STA-01, REQ-STA-02, REQ-STA-03 |

**Entscheidung:**
Statusdaten werden stündlich durch Batch-Verarbeitung aktualisiert (max. 60 Minuten Verzögerung) — bereits im MVP.

**Begründung (Kathrin Textor):**
Eine tägliche Batch-Verarbeitung ist fachlich nicht vertretbar. Bei Massenanfallereignissen (Naturkatastrophen, Hagelstürme, Überschwemmungen) würde ein künstlicher 24h-Datenstau die operative Schadensbearbeitung blockieren. Für Kunden in Ausnahmesituationen sind 24 Stunden Wartezeit auf den ersten Status inakzeptabel. Ein stündliches Intervall schafft einen zeitlich reibungslosen Ablauf sowohl für die Dokumentation als auch für die Übergabe der Unterlagen.

**Abweichung vom Team-Erstvorschlag:**
Das Team hatte 24h-Batch für MVP vorgeschlagen, mit stündlicher Verarbeitung als Phase-2-Ziel. Die Entscheidungsträgerin hat dies auf stündliche Verarbeitung ab MVP angehoben.

**Technische Anforderung:**
Die stündliche Batch-Verarbeitung setzt eine Anpassung des Backend-Systems voraus (aktuell: täglich). Dies ist Teil des MVP-Umsetzungsaufwands.

**Verworfene Alternativen:**
- 24h-Batch im MVP → Abgelehnt wegen Massenanfall-Szenario
- Echtzeit (WebSocket/Push) → Für MVP abgelehnt; setzt Backend-Architekturumbau voraus

---

### DEC-04 — Upload-Limit: 10 MB pro Datei, 50 MB pro Schadensfall

| Feld | Inhalt |
|---|---|
| Entscheidungs-ID | DEC-04 |
| Datum | April 2026 |
| Entschieden von | Kathrin Textor |
| Status | Akzeptiert |
| Betroffene Anforderungen | REQ-UPL-01, REQ-UPL-02, REQ-UPL-03 |

**Entscheidung:**
Max. 10 MB pro Datei; max. 50 MB gesamt pro Schadensfall.

**Begründung — Winston (Architekt):**
IT-Infrastruktur-Grenze von 10 MB ist technisch verbindlich. 5 MB zu restriktiv für Smartphone-Fotos (3–8 MB typisch).

**Begründung — Mary (Business Analyst):**
Gesamtlimit 50 MB ermöglicht umfangreiche Dokumentationen (mehrere Fotos eines Wasserschadens) ohne das Einzellimit zu erhöhen.

**Verworfene Alternativen:**
- 5 MB → Zu restriktiv für Smartphone-Fotos
- 50 MB pro Datei → Überschreitet IT-Infrastrukturgrenze

---

### DEC-05 — Mobile: Responsive Web App (Mobile-First), keine Native App

| Feld | Inhalt |
|---|---|
| Entscheidungs-ID | DEC-05 |
| Datum | April 2026 |
| Entschieden von | Kathrin Textor |
| Status | Akzeptiert |
| Betroffene Anforderungen | REQ-MOB-01, REQ-MOB-02 |

**Entscheidung:**
Responsive Web App mit Mobile-First-Designprinzip. Keine native App im MVP.

**Begründung — Winston (Architekt):**
Schadensmeldung ist Low-frequency, High-stakes — Nutzer öffnen das Portal typischerweise einmal alle paar Jahre. Niemand installiert eine App für eine einmalige Nutzung.

**Begründung — John (Product Owner):**
Native App = doppelter Aufwand (iOS + Android), App-Store-Approval, Wartungskosten — ohne nachgewiesenen Nutzerbedarf.

**Begründung — Mary (Business Analyst):**
Mobile-Team der Alpina hat klar kommuniziert: Native App nicht geplant.

---

### DEC-06 — Datenspeicherung: Ausschließlich Schweiz

| Feld | Inhalt |
|---|---|
| Entscheidungs-ID | DEC-06 |
| Datum | April 2026 |
| Entschieden von | Kathrin Textor |
| Status | Akzeptiert |
| Betroffene Anforderungen | REQ-DAT-01, REQ-DAT-02, REQ-DAT-03 |

**Entscheidung:**
Alle Daten (Produktivdaten, Backups, Logs, Dokumentenspeicher) ausschließlich in CH-Rechenzentren. Empfohlene Anbieter: Azure Switzerland North, AWS Zürich.

**Begründung — Winston (Architekt):**
nDSG und DSGVO sind rechtliche Rahmenbedingungen — nicht verhandelbar für sensible Versicherungsdaten.

**Begründung — John (Product Owner):**
Datenlokalisierung in der Schweiz ist strategischer Vertrauensfaktor für Schweizer Kundschaft.

**Begründung — Mary (Business Analyst):**
"Hosting abroad" wurde als nicht konform identifiziert und zurückgewiesen.

---

## 5. Anhang B — Assumption Log

| ID | Annahme | Kategorie | Konsequenz bei Nichteintreten | Status |
|---|---|---|---|---|
| A-01 | Live-Chat ist für MVP technisch und personell nicht bereit; er wird in Phase 2 evaluiert. | Technisch / Operativ | Phase-2-Planung für Chat entfällt; REQ-SUP-02 müsste als MVP-Anforderung aufgenommen werden. | Bestätigt |
| A-02 | Login ist für alle Funktionen verpflichtend; Polizennummer-Zuordnung ist fachliche Pflicht. | Fachlich / Sicherheit | Auth-Konzept (DEC-02) muss überarbeitet werden. | Bestätigt |
| A-03 | Stündliche Batch-Verarbeitung ist technisch realisierbar (Backend-Anpassung im MVP-Scope). | Technisch | Status-Anforderungen und Backend-Architektur müssen überarbeitet werden; ggf. Rückfall auf tägliche Verarbeitung als technische Einschränkung. | Zu prüfen |
| A-04 | 10 MB/Datei ist technisch verbindliche IT-Infrastrukturvorgabe für MVP. | Technisch | Upload-Grenzen und UX müssen angepasst werden. | Bestätigt |
| A-05 | Native App für Phase 1 ausgeschlossen (Mobile-Team-Entscheidung). | Strategisch | Entwicklungsplanung muss überarbeitet werden. | Bestätigt |
| A-06 | Datenhaltung in der Schweiz ist aufgrund nDSG/DSGVO rechtlich nicht verhandelbar. | Rechtlich | Entfällt — rechtliche Grundlage ist eindeutig. | Bestätigt |

---

## 6. Anhang C — Anforderungsübersicht (Traceability Matrix)

| Anforderungs-ID | Titel | Kategorie | Priorität | Entscheidung | Annahme |
|---|---|---|---|---|---|
| REQ-AUTH-01 | Login verpflichtend für alle Funktionen | Funktional | MUSS | DEC-02 | A-02 |
| REQ-AUTH-02 | Polizennummer-Zuordnung | Funktional | MUSS | DEC-02 | A-02 |
| REQ-AUTH-03 | SSO + 2FA | Funktional | MUSS | DEC-02 | — |
| REQ-AUTH-04 | Datenschutz ohne Authentifizierung | Funktional | MUSS | DEC-02 | A-02 |
| REQ-DMG-01 | Schadenserfassungsformular | Funktional | MUSS | DEC-02 | — |
| REQ-DMG-02 | Schadenstyp-Auswahl | Funktional | MUSS | — | — |
| REQ-DMG-03 | Automatische Referenznummer | Funktional | MUSS | DEC-02 | — |
| REQ-DMG-04 | Bestätigungsseite | Funktional | MUSS | — | — |
| REQ-UPL-01 | Max. 10 MB pro Datei | Funktional | MUSS | DEC-04 | A-04 |
| REQ-UPL-02 | Max. 50 MB pro Schadensfall | Funktional | MUSS | DEC-04 | A-04 |
| REQ-UPL-03 | Unterstützte Dateiformate | Funktional | MUSS | DEC-04 | — |
| REQ-UPL-04 | Mehrfach-Upload | Funktional | MUSS | — | — |
| REQ-STA-01 | Stündliche Batch-Aktualisierung (max. 60 Min.) | Funktional | MUSS | DEC-03 | A-03 |
| REQ-STA-02 | Timestamp "Zuletzt aktualisiert" | Funktional | MUSS | DEC-03 | A-03 |
| REQ-STA-03 | E-Mail-Benachrichtigung Statuswechsel | Funktional | MUSS | DEC-03 | — |
| REQ-SUP-01 | E-Mail-Support | Funktional | MUSS | DEC-01 | A-01 |
| REQ-SUP-02 | Live-Chat (Phase 2) | Funktional | KANN | DEC-01 | A-01 |
| REQ-I18N-01 | Portal in DE/FR/IT | Funktional | MUSS | — | — |
| REQ-I18N-02 | Sprachauswahl jederzeit änderbar | Funktional | MUSS | — | — |
| REQ-SEC-01 | TLS 1.3 | Nicht-funktional | MUSS | — | — |
| REQ-SEC-02 | 2FA verpflichtend | Nicht-funktional | MUSS | DEC-02 | A-02 |
| REQ-SEC-03 | Input-Validierung (OWASP) | Nicht-funktional | MUSS | — | — |
| REQ-SEC-04 | Session Management | Nicht-funktional | MUSS | — | — |
| REQ-PER-01 | Ladezeit < 3 Sekunden | Nicht-funktional | MUSS | — | — |
| REQ-PER-02 | 500 gleichzeitige Nutzer | Nicht-funktional | MUSS | — | — |
| REQ-PER-03 | Upload-Performance | Nicht-funktional | SOLL | — | — |
| REQ-AVA-01 | Uptime 99,5% | Nicht-funktional | MUSS | — | — |
| REQ-AVA-02 | Wartungsfenster-Ankündigung | Nicht-funktional | SOLL | — | — |
| REQ-DAT-01 | Datenhaltung Schweiz | Nicht-funktional | MUSS | DEC-06 | A-06 |
| REQ-DAT-02 | Zertifizierte CH-Rechenzentren | Nicht-funktional | MUSS | DEC-06 | A-06 |
| REQ-DAT-03 | nDSG und DSGVO-Konformität | Nicht-funktional | MUSS | DEC-06 | A-06 |
| REQ-DAT-04 | Datenlöschung auf Anfrage | Nicht-funktional | MUSS | DEC-06 | A-06 |
| REQ-MOB-01 | Responsive Web App | Nicht-funktional | MUSS | DEC-05 | A-05 |
| REQ-MOB-02 | Mobile-First-Design | Nicht-funktional | MUSS | DEC-05 | A-05 |
| REQ-ARC-01 | Microservices + REST APIs | Nicht-funktional | MUSS | — | — |
| REQ-ARC-02 | Externer Dokumentenspeicher | Nicht-funktional | MUSS | DEC-06 | — |
| REQ-ARC-03 | Zentrales Logging und Monitoring | Nicht-funktional | MUSS | — | — |

---

*Ende des Dokuments*

---
*SRS-ALPINA-CONNECT-v1.0 — Erstellt gemäß IEEE 830-1998 — Alpina Versicherungen AG — April 2026*
