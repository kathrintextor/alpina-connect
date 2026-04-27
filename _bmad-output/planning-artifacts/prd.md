---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish']
inputDocuments:
  - docs/Alpina_Connect_Business_Vision.docx
  - docs/Alpina_Connect_Fachbereich_Chaotisch.docx
  - docs/Alpina_Connect_IT_Mix.docx
  - docs/Alpina_Connect_Transkript.docx
workflowType: 'prd'
classification:
  projectType: web_app
  domain: insuretech
  complexity: high
  projectContext: greenfield_with_brownfield_integration
---

# Product Requirements Document — Alpina Connect

**Autor:** Kathrin
**Datum:** 2026-04-13

## Executive Summary

Alpina Versicherungen AG digitalisiert den Schadenmeldeprozess mit dem Kundenportal **Alpina Connect** — einer responsiven Webapplikation, die Privatkunden ermöglicht, Schadensfälle eigenständig zu erfassen, Dokumente hochzuladen und den Bearbeitungsstatus einzusehen. Kunden melden Schäden heute per Telefon oder E-Mail, was zu Medienbrüchen, langen Bearbeitungszeiten und fehlender Transparenz führt. Alpina Connect adressiert dieses Problem am emotionalen Kernmoment: Die Schadenmeldung ist kein administrativer Akt, sondern ein Stressmoment — Kunden brauchen Kontrolle und Klarheit, nicht Warteschleifen.

**Zielgruppe:** Primär Privatkunden der Alpina Versicherungen AG; sekundär interne Mitarbeitende über bestehende Backendsysteme.

**Was dieses Produkt besonders macht:** Alpina Connect gibt Kunden in einem unkontrollierbaren Moment das Steuer zurück — Schadenmeldung in unter 3 Minuten, sofortiger Eingang bestätigt, Status jederzeit einsehbar. Der Differenziator ist das Gefühl von Kontrolle und Würde; wer diesen Moment richtig löst, schafft Kundenloyalität, nicht nur Effizienz.

| Attribut | Wert |
|---|---|
| **Projekttyp** | Web App (responsive, browser-basiert) |
| **Domäne** | Insuretech — Schadenmanagement, Kundenkommunikation |
| **Komplexität** | Hoch — Schweizer Datenschutz, Bestandssystem-Integration, regulatorische Anforderungen |
| **Projektkontext** | Greenfield-Produkt mit Brownfield-Integration (bestehende Backend-Systeme) |

## Erfolgskriterien

### Nutzer-Erfolg

- 80% der Kunden schliessen eine Schadenmeldung in unter 5 Minuten ab
- Kunden erhalten innerhalb von 5 Minuten nach Einreichung eine digitale Eingangsbestätigung
- Mindestens 60% aller Schadenmeldungen erfolgen digital statt per Telefon oder E-Mail (nach 6 Monaten)

### Geschäftserfolg

- **Effizienz:** Reduktion telefonischer Schadenmeldungen um mindestens 40% nach 6 Monaten
- **Adoption:** Mindestens 50% der Neukunden nutzen das Portal für ihre erste Schadenmeldung innerhalb von 12 Monaten
- **Kundenzufriedenheit:** NPS oder CSAT steigt um mindestens 10 Punkte nach Einführung (Benchmark vor Launch etablieren)

### Technischer Erfolg

- Systemverfügbarkeit ≥ 99.5% (exkl. geplante Wartungsfenster)
- Datenhaltung ausschliesslich in der Schweiz
- 2FA für alle Aktionen mit personenbezogenen Daten
- Durchschnittliche Bearbeitungszeit sinkt um 30% gegenüber aktuellem E-Mail/Telefon-Prozess

## Produktumfang & Phasenplan

### MVP-Strategie

**Ansatz:** Experience MVP — der vollständige Kern-Journey (Schadenmeldung → Upload → Status → Bestätigung) muss funktionieren. Ein unvollständiger Flow liefert keinen Mehrwert gegenüber Telefon/E-Mail.

**Ressourcen:** Fullstack-Entwickler (Frontend + Backend), UX/UI Designer, Projektleitung; Zugang zu internen Backend-Teams für API-Abstimmung zwingend.

### Phase 1 — MVP

- Benutzerregistrierung und Login mit 2FA (SMS)
- Strukturiertes Schadensmeldungsformular (Schadensart, Datum, Ort, Beschreibung)
- Dokumentenupload (JPG, PNG, PDF; max. 10 MB; client- und serverseitig validiert)
- Statusverfolgung (Batch-basiert, täglich aktualisiert)
- E-Mail-Bestätigung bei Einreichung + E-Mail bei Statusänderung
- Responsive Webapplikation (Desktop + Mobile, WCAG 2.1 AA)
- Datenhaltung Schweiz, Schweizer DSG-konform
- Sprache: Deutsch

### Phase 2 — Growth (Post-MVP)

- Mehrsprachigkeit (Französisch, Italienisch)
- Echtzeit-Statusaktualisierung (abhängig von Backend-Readiness)
- Chat-Support mit Versicherungsmitarbeitenden
- Erweiterte Dokumentenverwaltung (Kategorisierung, Versionierung)
- Support-Tool: direkter Link zu Kundenfall (Sandra-Journey)

### Phase 3 — Vision

- Native Mobile App (iOS / Android)
- KI-gestützte Schadenseinschätzung und automatisierte Vorverarbeitung
- Self-Service Portal (Vertragsverwaltung, Adressänderung)
- Maklerzugang mit eingeschränkten Berechtigungen

### Risiko-Mitigation

| Risiko | Typ | Mitigation |
|---|---|---|
| Bestandssystem-API unbekannt / komplex | Technisch | Frühzeitige API-Analyse als erstes Projektmeilenstein; Fallback: manuelle Statusverarbeitung im MVP |
| Registrierungs-Friction treibt Kunden weg | Markt | SMS-basierte 2FA (niedrigschwellig); Onboarding-Flow max. 3 Schritte; A/B-Test nach Launch |
| Datenpanne durch falsche Cloud-Konfiguration | Compliance | Architektur-Review vor Go-Live; Schweizer Hosting vertraglich festlegen |
| Ressourcenengpass | Ressourcen | Kürzungsreihenfolge: 1. E-Mail-Benachrichtigungen vereinfachen, 2. Status-Detail reduzieren, 3. Upload-Formate einschränken — Kern-Schadenmeldungsflow bleibt unantastbar |

## User Journeys

### Journey 1 — Anna, 38, Privatkunde (Erfolgs-Pfad)

**Persona:** Berufstätig, zwei Kinder. Samstagabend, 21:30 Uhr. Wasserschaden durch defekte Waschmaschine. Gestresst, will keine Warteschleife.

**Opening:** Anna sucht auf dem Smartphone nach „Alpina Versicherung Schaden melden" und landet auf dem Portal-Login. Sie hat noch kein Konto.

**Rising Action:** Registrierung dauert 2 Minuten — E-Mail, Passwort, 2FA per SMS. Sie wählt Schadensart „Wasserschaden", füllt das Formular aus (wann, wo, was), fotografiert den Schaden direkt per Browser-Kamera und lädt 3 Bilder hoch.

**Climax:** Klick auf „Absenden" — sofortige Bestätigungsseite mit Schadensnummer, nächsten Schritten, erwarteter Rückmeldung innert 2 Werktagen. *(⚙️ Annahme: „2 Werktage" ist nicht in den Quelldokumenten belegt — muss vom Fachbereich bestätigt werden)*

**Resolution:** E-Mail-Bestätigung im Posteingang. Montagmorgen: Status auf „In Bearbeitung". Anna hat den Schaden gemeldet — ohne einmal zu telefonieren.

---

### Journey 2 — Anna (Edge Cases)

**Upload-Fehler:** Anna lädt ein 25-MB-Video hoch. Portal: „Maximale Dateigrösse: 10 MB. Bitte lade ein Foto statt eines Videos hoch." Sie macht einen Screenshot, lädt diesen hoch — erfolgreich.

**Passwort vergessen:** Eine Woche später hat Anna das Passwort vergessen. „Passwort vergessen"-Flow per E-Mail, neues Passwort in 2 Minuten gesetzt, Status eingesehen.

**Resolution:** Klare Fehlermeldungen mit Handlungsanweisungen führen Anna durch jeden Fehlerfall — sie fühlt sich nie verlassen.

---

### Journey 3 — Thomas, 52, Sachbearbeiter (interner Nutzer)

**Persona:** 15 Jahre bei Alpina, bearbeitet täglich 20–30 Schadensfälle über das interne System.

**Opening:** Montagmorgen, 8:00 Uhr. Im internen System erscheinen die Wochenend-Meldungen — strukturiert, mit Schadensnummer, Fotos, automatisch mit Versicherungspolice verknüpft.

**Rising Action:** Thomas öffnet Annas Meldung. Alle Angaben vollständig, keine Rückfragen nötig. Er aktualisiert den Status auf „In Bearbeitung" — das Portal benachrichtigt Anna automatisch.

**Resolution:** Thomas bearbeitet 40% mehr Fälle als üblich; Qualität der Portal-Meldungen deutlich besser als bei Telefon/E-Mail-Eingang.

---

### Journey 4 — Sandra, Support-Mitarbeiterin *(⚙️ Annahme: Diese Persona ist nicht in den Quelldokumenten beschrieben. Sie wurde als repräsentatives Beispiel für die interne Support-Nutzung ergänzt, da Dok. 3 / Transkript die Support-Nutzung impliziert aber nicht personifiziert.)*

**Persona:** First-Level-Support. Anruf von älterem Kunden: „Ich habe eine Meldung gemacht, aber ich weiss nicht was jetzt passiert."

**Rising Action:** Sandra sucht im internen System nach der Schadensnummer — findet den Fall in 10 Sekunden, sieht Status und letzte Aktion. Sie erklärt dem Kunden den Status und schickt ihm einen direkten Link per E-Mail.

**Resolution:** Gespräch dauert 3 Minuten statt 15. Kein Durchsuchen von E-Mail-Threads.

## Domänen-spezifische Anforderungen

### Compliance & Regulatorisch

- **Datenhaltung Schweiz:** Alle Kundendaten und Dokumente ausschliesslich auf Servern in der Schweiz; Cloud-Dienste im Ausland nicht zulässig
- **Schweizer DSG (rev. 2023):** Personenbezogene Daten nur mit expliziter Einwilligung verarbeitbar; Datenschutzerklärung bei Registrierung zwingend. *(Hinweis: Quelldokumente nennen fälschlicherweise „DSGVO" — massgebend ist das Schweizer DSG. DSGVO-Anwendbarkeit für allfällige EU-Kundendaten ist durch die Rechtsabteilung zu prüfen; W-09)*
- **Zugriffsschutz:** Sensible Kundendaten nicht ohne Authentifizierung zugänglich
- **2FA-Pflicht:** Zwei-Faktor-Authentifizierung für alle Aktionen mit personenbezogenen Daten

### Technische Constraints

- **Keine Echtzeit-Verarbeitung (MVP):** Statusaktualisierungen batch-basiert (einmal täglich) — bedingt durch bestehende Backend-Systeme
- **Upload-Limit:** Max. 10 MB pro Datei; Formate: JPG, PNG, PDF
- **Bestandssystem-Integration:** Komplexe Schnittstellen; API-Design setzt auf Microservice-Architektur mit REST APIs auf
- **Keine native App:** Responsive Webapplikation; native App ist Vision
- **Schadensfallverarbeitung (W-07, offen):** Fachbereich fordert gleichzeitig vollständige Automatisierung *und* manuelle Prüfung aller Schadensfälle (Dok. 2 — direkte Widerspruch). Entscheidung steht aus. Empfehlung: Hybridmodell — automatisierte Vollständigkeits- und Plausibilitätsprüfung bei Eingang, manuelle Freigabe für komplexe oder auffällige Fälle. Endentscheid durch Fachbereich und Compliance vor Lastenheft-Freigabe erforderlich.

## Web App Spezifische Anforderungen

### Architektur & Browser

- **SPA vs. MPA:** Entscheid liegt beim Architekten (Kriterien: Performance, SEO-Anforderungen Login-Seite, Bestandssystem-Komplexität)
- **Browser-Support:** Letzte 2 Hauptversionen von Chrome, Firefox, Safari, Edge; kein IE/Legacy
- **Keine Echtzeit-Verbindungen im MVP:** Kein WebSocket, kein SSE; Status via Batch + E-Mail

### Responsive Design & Mobile

- Smartphone-First bei Formular-Flows; Touch-Targets ≥ 44×44px
- Kameraintegration über Browser-API für direkten Foto-Upload
- Responsive für Desktop und Mobile ohne native App

### SEO

> ⚙️ *Annahme: SEO-Anforderungen sind nicht in den Quelldokumenten enthalten. Sie wurden als Best Practice für öffentlich zugängliche Seiten ergänzt.*

- SEO für öffentliche Seiten (Landing, Login, Registrierung); robots.txt noindex für eingeloggten Bereich
- Grundlegende Meta-Tags und strukturierte Daten für öffentliche Seiten

### Implementation Considerations

> ⚙️ *Annahme: Die nachfolgenden technischen Massnahmen sind nicht in den Quelldokumenten spezifiziert. Sie wurden als Security Best Practices ergänzt, die für eine Webanwendung mit personenbezogenen Daten als Standard gelten.*

- Clientseitige Formularvalidierung vor Server-Submit
- Upload-Validierung clientseitig (Grösse, Format) + serverseitig (Sicherheit, Malware)
- Session-Tokens nicht in Local Storage (sicheres Token-Handling)
- CSRF-Schutz für alle Formulare

## Funktionale Anforderungen

### Nutzerverwaltung

- **FR1:** Kunde kann ein neues Konto mit E-Mail und Passwort registrieren *(Widerspruch W-02b: Dok. 2 enthält gleichzeitig „Registrierung nur über Support" und „Kunde soll sich jederzeit selbst registrieren können". Entscheidung für Selbstregistrierung getroffen — Begründung: Skalierbarkeit, UX, Rund-um-die-Uhr-Verfügbarkeit. Support-gestützte Registrierung als optionaler Alternativweg für eingeschränkte Nutzer bleibt offen.)*
- **FR2:** Kunde kann sich mit E-Mail, Passwort und 2FA (SMS) anmelden
- **FR3:** Kunde kann sein Passwort über einen E-Mail-Link zurücksetzen
- **FR4:** Kunde kann seine persönlichen Kontaktdaten einsehen
- **FR5:** System beendet eine aktive Session sicher (Logout)

### Schadenmeldung

- **FR6:** Kunde kann eine Schadenmeldung mit Schadensart, Datum, Ort und Beschreibung erfassen
- **FR7:** Kunde kann eine begonnene Meldung vor dem Absenden überprüfen
- **FR8:** Kunde reicht eine Schadenmeldung ein und erhält eine Schadensnummer
- **FR9:** System verknüpft die eingereichte Meldung automatisch mit der Versicherungspolice des Kunden
- **FR10:** Kunde kann den aktuellen Status einer eingereichten Meldung einsehen

### Dokumentenverwaltung

- **FR11:** Kunde kann Dokumente (JPG, PNG, PDF) zu einer Schadenmeldung hochladen
- **FR12:** System validiert Dateigrösse (max. 10 MB) und -format vor dem Upload
- **FR13:** Kunde kann hochgeladene Dokumente einer Meldung einsehen
- **FR14:** Kunde kann Dokumente direkt per Kamera (Browser-API) aufnehmen und hochladen
- **FR15:** System gibt bei ungültigem Upload eine Fehlermeldung mit konkreter Handlungsanweisung aus

### Statusverfolgung & Benachrichtigungen

- **FR16:** Kunde erhält nach Einreichung eine E-Mail-Bestätigung mit Schadensnummer
- **FR17:** Kunde erhält eine E-Mail-Benachrichtigung bei jeder Statusänderung
- **FR18:** Kunde sieht alle eigenen Schadenmeldungen und deren Status in einer Übersicht
- **FR19:** System aktualisiert den Status von Meldungen mindestens einmal täglich aus dem Backend

### Interne Systemnutzung

- **FR20:** Sachbearbeiter kann Portal-Meldungen mit Formularinhalten und Dokumenten im internen System einsehen
- **FR21:** Sachbearbeiter kann den Status einer Meldung im internen System aktualisieren
- **FR22:** System überträgt Statusänderungen aus dem internen System ans Kundenportal (Batch-Sync)
- **FR23:** Support-Mitarbeitende können eine Meldung anhand der Schadensnummer abrufen

### Sicherheit & Datenschutz

- **FR24:** System speichert alle Kundendaten und Dokumente ausschliesslich auf Servern in der Schweiz
- **FR25:** Zugriff auf personenbezogene Daten nur nach erfolgreicher Authentifizierung
- **FR26:** Kunde stimmt der Datenschutzerklärung bei der Registrierung explizit zu
- **FR27:** System schützt alle Formulare gegen CSRF-Angriffe
- **FR28:** System invalidiert Sessions nach definierter Inaktivitätsdauer (30 Minuten)

### Barrierefreiheit & Usability

- **FR29:** Alle Seiten und Formulare erfüllen WCAG 2.1 Level AA
- **FR30:** Alle Funktionen sind vollständig per Tastatur bedienbar
- **FR31:** Alle Seiten sind auf modernen Desktop- und Mobilgeräten nutzbar (responsive)
- **FR32:** Alle Fehlermeldungen sind verständlich formuliert und enthalten eine konkrete Handlungsanweisung

## Nicht-Funktionale Anforderungen

> **Hinweis zur Quelllage:** Die Quelldokumente enthalten keine konkreten Messgrössen für Performance, Security-Details oder Skalierungszahlen. Die nachfolgenden NFAs sind teils aus Quelldokumenten abgeleitet (✅), teils als begründete Best-Practice-Ergänzungen hinzugefügt (⚙️ Annahme). Alle Annahmen sind im Lastenheft (NFA-Tabellen) als solche gekennzeichnet.

### Performance

- ⚙️ Initiale Seitenladezeit (LCP) unter 3 Sekunden auf mobilem 4G-Netz *(Annahme: Branchenstandard; nicht in Quelldokumenten spezifiziert)*
- ⚙️ Formular-Submit und Upload-Start reagieren innerhalb von 1 Sekunde auf Nutzereingabe *(Annahme)*
- ⚙️ Statusseite lädt unter 2 Sekunden nach Login *(Annahme)*
- ⚙️ System bleibt unter 500 gleichzeitigen aktiven Nutzern stabil *(Annahme)*

### Security

- ✅ Alle Daten verschlüsselt übertragen (TLS 1.2 oder höher) *(Dok. 3: Security Team — Datensicherheit)*
- ✅ Alle gespeicherten Daten (Dokumente, Personendaten) at-rest verschlüsselt *(Dok. 1: „Datenschutz höchste Priorität")*
- ⚙️ Passwörter als gesalzene Hashes gespeichert (bcrypt oder gleichwertig) *(Annahme: Security Best Practice; nicht in Quellen)*
- ⚙️ Alle Zugriffsversuche auf geschützte Ressourcen im Audit Log erfasst *(Annahme: Security Best Practice)*
- ⚙️ Upload-Dateien serverseitig auf Malware geprüft vor Speicherung *(Annahme: Security Best Practice)*

### Skalierbarkeit

- ✅ Horizontale Skalierung durch Microservice-Architektur *(Dok. 3: IT Architektur)*
- ⚙️ Initiale Auslegung: 1'000 registrierte Nutzer, 100 gleichzeitige Sessions *(Annahme: geschätzte Anfangsgrösse; nicht in Quellen belegt)*
- ⚙️ Architektur skalierbar auf 50'000 Nutzer ohne strukturelle Änderungen *(Annahme: strategisches Ziel; nicht in Quellen belegt)*

### Barrierefreiheit

- ✅ WCAG 2.1 Level AA für alle Seiten *(Dok. 1: Business Vision — „einfache Bedienbarkeit")*
- ⚙️ Screen-Reader-Kompatibilität (NVDA, VoiceOver) *(Annahme: WCAG-Konformität impliziert Screen-Reader-Support; nicht explizit in Quellen)*
- ⚙️ Vollständige Tastaturnavigation *(Annahme: WCAG AA-Anforderung)*
- ⚙️ Keine zeitkritischen Elemente ohne Verlängerungsoption *(Annahme: WCAG AA-Anforderung)*

### Integration

- ✅ REST API zur Bestandssystem-Anbindung (Status-Sync, Policenverknüpfung); Endpunkte versioniert (/api/v1/) *(Dok. 3: IT Architektur — Microservices mit REST APIs)*
- ✅ Batch-Synchronisation einmal täglich; Fehler geloggt und alarmiert *(Dok. 3: Dev Team, IT Architektur)*
- ✅ Dokumenten-Storage über externen Service (Schweizer Rechenzentrum) *(Dok. 3: „Dokumente werden in externem Storage-Service gespeichert")*
- ⚙️ E-Mail-Versand über konfigurierbaren SMTP/API-Service mit Retry-Logik *(Annahme: technisches Implementierungsdetail; E-Mail-Benachrichtigung als Anforderung in Quellen belegt, Mechanismus nicht)*
