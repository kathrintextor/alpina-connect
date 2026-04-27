# Use Cases (Detailbeschreibung) — Alpina Connect

**Projekt:** Alpina Connect — Digitales Kundenportal
**Version:** 1.0
**Datum:** 27. April 2026
**Autorin:** Kathrin Textor
**Auftraggeber:** Alpina Versicherungen AG

---

## UC-Übersicht

| UC-ID | Name | Akteur | Priorität |
|---|---|---|---|
| UC-01 | Schaden melden | Versicherungsnehmer | MUSS |
| UC-02 | Dokumente hochladen | Versicherungsnehmer | MUSS |
| UC-03 | Schadenstatus verfolgen | Versicherungsnehmer | MUSS |
| UC-04 | Am Portal anmelden (SSO) | Versicherungsnehmer / Mitarbeitender | MUSS |
| UC-05 | Support-Kommunikation führen | Versicherungsnehmer | SOLL |

---

## UC-01: Schaden melden

| Feld | Inhalt |
|---|---|
| **Name** | UC-01: Schaden melden |
| **Kurzbeschreibung** | Ein Versicherungsnehmer meldet über Alpina Connect einen neuen Schadensfall, erfasst alle relevanten Schadendaten und erhält eine Bestätigung mit eindeutiger Schadensnummer. |
| **Akteure** | Primär: Versicherungsnehmer (eingeloggter Portalnutzer) — Sekundär: Backoffice-System, Benachrichtigungsdienst |
| **Vorbedingungen** | 1. Nutzer ist angemeldet (UC-04 abgeschlossen, Session aktiv) 2. Gültige, aktive Police bei Alpina vorhanden 3. Polizennummer ist dem Nutzer bekannt |
| **Auslösendes Ereignis** | Nutzer klickt auf „Neuen Schaden melden" — z.B. noch auf der Unfallstelle oder am nächsten Morgen mit dem Schadensfoto vor sich. |
| **Hauptszenario** | 1. Nutzer navigiert zu „Schaden melden" → Formular wird angezeigt 2. Nutzer wählt Police aus Liste (Polizennummer automatisch übernommen) oder gibt sie manuell ein 3. Nutzer wählt Schadensart aus Kategorienliste (Fahrzeug, Hausrat, Haftpflicht, Reise, Sonstiges) 4. Nutzer gibt Schadensdatum und Schadensbeschreibung ein (max. 2.000 Zeichen) 5. System zeigt Zusammenfassung zur Überprüfung 6. Nutzer bestätigt → System speichert Fall, vergibt Schadensnummer (SCH-YYYY-XXXXXXXX) 7. Bestätigungs-E-Mail mit Schadensnummer wird versendet 8. Portal leitet auf Schadensdetailseite weiter, Status: „Eingegangen" |
| **Alternativszenario** | A1: Polizennummer ungültig → Fehlermeldung, Support-Link (UC-05) A2: Datum ausserhalb Meldefrist → Warnung, Einreichung möglich mit internem Flag A3: Session-Timeout → Entwurf gespeichert, nach Login fortsetzbar A4: Technischer Fehler beim Einreichen → Fehlermeldung, kein Duplikat angelegt |
| **Nachbedingungen** | 1. Schadensfall mit Status „Eingegangen" im System erfasst 2. Bestätigungs-E-Mail mit Schadensnummer erhalten 3. Fall im Backoffice zur Bearbeitung sichtbar 4. Status über UC-03 verfolgbar 5. Dokumente via UC-02 nachreichbar |

---

## UC-02: Dokumente hochladen

| Feld | Inhalt |
|---|---|
| **Name** | UC-02: Dokumente hochladen |
| **Kurzbeschreibung** | Ein Versicherungsnehmer lädt zu einem bestehenden Schadensfall Belege, Fotos oder Dokumente hoch. Das System prüft Format und Grösse, speichert sicher im DMS und verknüpft die Dateien mit dem Schadensfall. |
| **Akteure** | Primär: Versicherungsnehmer — Sekundär: Dokumentenmanagementsystem (DMS), Virenscanner, Backoffice-Sachbearbeiter |
| **Vorbedingungen** | 1. Nutzer ist angemeldet (UC-04 abgeschlossen) 2. Schadensfall mit Schadensnummer existiert (UC-01 abgeschlossen) 3. Fall befindet sich in uploadfähigem Status (nicht „Abgeschlossen" / „Storniert") 4. Datei liegt auf Endgerät bereit; erlaubte Formate: JPG, PNG, PDF, HEIC; max. 10 MB/Datei |
| **Auslösendes Ereignis** | Nutzer möchte Belege zum Schadensfall einreichen (Foto, Rechnung, Polizeibericht) und navigiert zur Dokumentenübersicht des Falls. |
| **Hauptszenario** | 1. Nutzer öffnet Schadensfall → Abschnitt „Dokumente" 2. Nutzer wählt Dateien per Dialog oder Drag & Drop 3. System prüft client-seitig: Format, Dateigrösse (max. 10 MB), Gesamtlimit (max. 50 MB/Fall) 4. Nutzer wählt Dokumententyp (Schadenfoto, Rechnung, Polizeibericht, Arztzeugnis, Sonstiges) 5. Nutzer klickt „Hochladen" → Fortschrittsbalken je Datei 6. Server validiert erneut, führt Virenscan durch, speichert verschlüsselt im DMS 7. Grüne Bestätigung je Datei; Dokumentenliste aktualisiert 8. Backoffice wird über neuen Dokumenteneingang benachrichtigt |
| **Alternativszenario** | A1: Falsches Format → Datei rot markiert, Fehlermeldung, übrige Dateien uploadbar A2: Datei > 10 MB → Abweisung mit Komprimierungshinweis A3: Gesamtlimit 50 MB erreicht → Upload blockiert, verbleibender Speicher angezeigt, Support-Link A4: Virenscan schlägt an → Datei verworfen, intern protokolliert, neutraler Fehlertext für Nutzer A5: Verbindungsabbruch → vollständige Dateien bleiben erhalten, Teilübertragungen verworfen, Wiederholung möglich |
| **Nachbedingungen** | 1. Valide Dateien im DMS gespeichert und mit Schadensfall verknüpft 2. Dokumentenliste aktualisiert und für Nutzer einsehbar 3. Backoffice über Dokumenteneingang benachrichtigt 4. Invalide / infizierte Dateien abgewiesen und nicht gespeichert |

---

## UC-03: Schadenstatus verfolgen

| Feld | Inhalt |
|---|---|
| **Name** | UC-03: Schadenstatus verfolgen |
| **Kurzbeschreibung** | Ein Versicherungsnehmer ruft den aktuellen Bearbeitungsstand eines Schadensfalls ab. Das System zeigt den Status mit maximal 60 Minuten Verzögerung (stündlicher Batch-Abgleich) sowie die vollständige Statushistorie. |
| **Akteure** | Primär: Versicherungsnehmer — Sekundär: Backend-System (stündlicher Batch-Job), Benachrichtigungsdienst |
| **Vorbedingungen** | 1. Nutzer ist angemeldet (UC-04 abgeschlossen) 2. Mindestens ein Schadensfall über UC-01 erfasst und dem Konto zugeordnet 3. Schadensnummer bekannt oder im Dashboard sichtbar |
| **Auslösendes Ereignis** | Nutzer möchte wissen, wie weit sein Schadensfall bearbeitet ist — öffnet das Portal und navigiert zur Schadensübersicht oder gibt die Schadensnummer direkt ein. |
| **Hauptszenario** | 1. Nutzer öffnet Dashboard → Übersicht aller Fälle mit letztem Status und Aktualisierungszeitstempel 2. Nutzer klickt auf Schadensfall → Schadensdetailseite 3. System zeigt aktuellen Status als Badge (Eingegangen / In Prüfung / In Bearbeitung / Abgeschlossen / Abgelehnt) 4. System zeigt Status-Timeline mit Datum/Uhrzeit je Statuswechsel 5. Erklärender Text zur aktuellen Phase wird angezeigt 6. Zeitstempel „Zuletzt aktualisiert: TT.MM.JJJJ HH:MM" + Hinweis „Status wird stündlich aktualisiert" sichtbar 7. Direkte Navigation zu UC-02 (Dokumente) und UC-05 (Support) möglich |
| **Alternativszenario** | A1: Keine Fälle vorhanden → leere Übersicht mit Link zu UC-01 A2: Backend nicht erreichbar → gecachte Daten mit Warnhinweis und „Aktualisieren"-Button A3: Status „Rückfrage ausstehend" → Aktionsbanner + Link zu UC-05, E-Mail-Benachrichtigung an Nutzer A4: Suche per Schadensnummer → Prüfung auf Kontozuordnung; kein Zugriff auf fremde Fälle A5: Fall abgelehnt → Status „Abgelehnt" mit Einspruchshinweis und Support-Link (UC-05) |
| **Nachbedingungen** | 1. Nutzer hat aktuellen Status eingesehen (max. 60 Min. Verzögerung zum Backendstand) 2. Bei Status „Rückfrage ausstehend": Nutzer aktiv auf erforderliche Aktion hingewiesen 3. Statusabfrage im Audit-Log protokolliert 4. Navigation zu UC-02 und UC-05 ist möglich |
