# Widerspruchskatalog — Alpina Connect
## Identifizierte Widersprüche in den Quelldokumenten

**Autorin:** Kathrin  
**Datum:** 27. April 2026  
**Version:** 2.0  
**Methode:** Direkte Analyse der vier Quelldokumente (ohne Umweg über PRD)

---

## Revisionshistorie

| Version | Datum | Änderung |
|---|---|---|
| 1.0 | 17. April 2026 | Erstversion |
| 2.0 | 27. April 2026 | W-03 um 50 MB Gesamtlimit ergänzt; W-04 revidiert (stündlich statt täglich, DEC-03); W-06 revidiert (DE/FR/IT Phase 1, SRS REQ-I18N-01) |

---

## Legende

| Symbol | Bedeutung |
|---|---|
| ✅ Entschieden | Widerspruch final aufgelöst, Entscheidung in Lastenheft übernommen |
| 📋 Empfehlung | Empfehlung formuliert, Entscheid durch Stakeholder ausstehend |
| ❗ Kritisch | Blockiert Implementierung — Entscheid vor Entwicklungsstart nötig |

**Prioritätshierarchie für Entscheidungen:**  
Compliance / Security → Business Vision → Fachbereich → Pragmatismus

---

## Quelldokumente

| Kürzel | Dokument | Perspektive |
|---|---|---|
| Dok. 1 | `Alpina_Connect_Business_Vision.docx` | Management — strategische Ziele |
| Dok. 2 | `Alpina_Connect_Fachbereich_Chaotisch.docx` | Fachbereich — funktionale Wünsche |
| Dok. 3 | `Alpina_Connect_IT_Mix.docx` | IT — Architektur, E-Mails, Meeting-Notizen |
| Dok. 4 | `Alpina_Connect_Transkript.docx` | Interview-Transkript — Stakeholder-Perspektiven |

> **Methodische Notiz:** Dok. 2 enthält dieselben Aussagen stellenweise 5–15 Mal wiederholt. Die Wiederholungsfrequenz wurde bewusst nicht als Prioritätsindikator gewertet.

---

## W-01 — Support-Kanal: Chat vs. E-Mail

| | |
|---|---|
| **Status** | 📋 Empfehlung |
| **Kategorie** | UX / Betrieb |

| Aussage A | Aussage B |
|---|---|
| Dok. 2 (Fachbereich): „Kunden sollen jederzeit per Live-Chat mit einem Mitarbeitenden kommunizieren können." | Dok. 3 (IT): „Chat-Integration ist technisch aufwendig und nicht für Phase 1 geplant." |

**Entscheidung:** E-Mail-Support als MVP-Kanal. Chat-Support in Phase 2.

**Begründung:** Technische Machbarkeit (IT-Einschränkung) und Ressourcen. E-Mail deckt den Supportbedarf im MVP ausreichend ab. Chat ist als strategisches Feature wertvoll, aber nicht kritisch für den Launch.

**Auswirkung im Lastenheft:** A-10, FA-Abgrenzung (kein Chat-FA in Phase 1)

---

## W-02a — Login: Anonymer Zugang vs. SSO-Pflicht

| | |
|---|---|
| **Status** | ✅ Entschieden |
| **Kategorie** | Security / Authentifizierung |

| Aussage A | Aussage B |
|---|---|
| Dok. 2 (Fachbereich): „Kunden sollen ohne Login eine Schadenmeldung einreichen können — kein Registrierungszwang." | Dok. 3 (IT/Security): „Zugriff auf personenbezogene Daten ist nur nach SSO-Authentifizierung erlaubt. Kein anonymer Zugang zu Schadensdaten." |

**Entscheidung:** SSO-Login ist verpflichtend für alle Funktionen, einschliesslich der initialen Schadensmeldung. Kein anonymer Zugang.

**Begründung:** Security-Anforderung hat Vorrang (Compliance/DSG). Anonyme Meldungen ohne Authentifizierung würden Police-Verknüpfung (FA-09), Statustransparenz (FA-10) und Datenschutz (FA-23) unmöglich machen. Das Risiko nicht-zugeordneter Meldungen überwiegt den Usability-Vorteil (DEC-02, Kathrin Textor).

**Auswirkung im Lastenheft:** FA-02, FA-23, A-01

---

## W-02b — Registrierung: Selbst vs. nur über Support

| | |
|---|---|
| **Status** | 📋 Empfehlung ❗ Kritisch |
| **Kategorie** | Nutzerverwaltung / UX |

| Aussage A | Aussage B |
|---|---|
| Dok. 2 (Fachbereich, Passage 1): „Registrierung erfolgt ausschliesslich über den Kundendienst — kein Self-Service." | Dok. 2 (Fachbereich, Passage 2): „Kunde soll sich jederzeit selbst registrieren und sofort loslegen können." |

> **Besonderheit:** Beide widersprüchlichen Aussagen stammen aus demselben Dokument (Dok. 2). Dies ist ein Indiz für fehlende interne Abstimmung im Fachbereich.

**Empfehlung:** Selbstregistrierung mit automatisierter E-Mail-Verifizierung. Kein manueller Support-Eingriff nötig.

**Begründung:** Skalierbarkeit (Support-Prozess nicht skalierbar), UX (24/7-Verfügbarkeit), Analogie zu Marktstandard.

**Entscheid ausstehend:** Fachbereich und Management müssen bestätigen.

**Auswirkung im Lastenheft:** FA-01, L-02

---

## W-02c — 2FA vs. einfacher Zugang

| | |
|---|---|
| **Status** | ✅ Entschieden |
| **Kategorie** | Security / Authentifizierung |

| Aussage A | Aussage B |
|---|---|
| Dok. 2 (Fachbereich): „Login soll so einfach wie möglich sein — kein aufwendiger Prozess." | Dok. 3 (IT/Security): „Zwei-Faktor-Authentifizierung (2FA) ist für den Zugriff auf Versicherungsdaten verpflichtend." |

**Entscheidung:** 2FA ist verpflichtend. Unterstützte Methoden: TOTP (Authenticator App, RFC 6238) oder SMS-OTP.

**Begründung:** Security-Anforderung hat Vorrang. Versicherungsdaten sind sensible Personendaten (DSG). UX-Optimierung ist möglich (z.B. „vertrauenswürdiges Gerät merken" in Phase 2), aber 2FA selbst nicht verhandelbar. TOTP als präferierte Methode (sicherer als SMS, kein Carrier-Abhängigkeit).

**Auswirkung im Lastenheft:** FA-02, NFA-05

---

## W-03 — Upload-Limit: 5 MB / 10 MB / 50 MB

| | |
|---|---|
| **Status** | ✅ Entschieden |
| **Kategorie** | Dokumentenverwaltung / Infrastruktur |

| Aussage A | Aussage B | Aussage C |
|---|---|---|
| Dok. 2 (Fachbereich): „Maximale Dateigrösse: 5 MB pro Dokument." | Dok. 3 (IT): „Infrastruktur unterstützt bis zu 10 MB pro Datei. Mehr würde Speicher-SLA sprengen." | Dok. 2 (Fachbereich, andere Passage): „Kunden brauchen 50 MB für hochauflösende Schadensfotos." |

**Entscheidung:** 10 MB pro Datei (IT-Infrastrukturvorgabe); 50 MB Gesamtlimit pro Schadensfall; erlaubte Formate: JPG, PNG, PDF, HEIC.

**Begründung:**
- 10 MB/Datei ist die einzige technisch begründete Zahl (IT-Infrastruktur). 5 MB zu restriktiv für Smartphone-Fotos (3–8 MB typisch). 50 MB pro Datei überschreitet die Infrastrukturgrenze.
- Das Gesamtlimit von 50 MB pro Schadensfall ermöglicht umfangreiche Dokumentation (mehrere Fotos eines Wasserschadens) ohne das Einzellimit zu erhöhen (DEC-04).
- HEIC ergänzt als verbreitetes Apple-Kameraformat, das für iPhone-Nutzer relevant ist.

**Auswirkung im Lastenheft:** FA-11, FA-12, FA-12a, A-02, Rahmenbedingungen 6.1

---

## W-04 — Status: Echtzeit-Updates vs. Batch täglich

| | |
|---|---|
| **Status** | ✅ Entschieden (revidiert — 27. April 2026) |
| **Kategorie** | Statusverfolgung / Architektur |

| Aussage A | Aussage B |
|---|---|
| Dok. 1 (Business Vision): „Kunden sollen ihren Status jederzeit in Echtzeit einsehen können." | Dok. 3 (IT/Dev): „Echtzeit-Synchronisation ist technisch nicht möglich. Batch-Verarbeitung einmal täglich." |

**Entscheidung (revidiert):** Batch-Synchronisation **stündlich** (max. 60 Minuten Verzögerung) bereits in Phase 1. Echtzeit-Updates (< 60 Min.) in Phase 2.

**Begründung (Kathrin Textor, DEC-03):** Eine tägliche Batch-Verarbeitung ist fachlich nicht vertretbar. Bei Massenanfallereignissen (Naturkatastrophen, Hagelstürme, Überschwemmungen) würde ein künstlicher 24h-Datenstau die operative Schadensbearbeitung blockieren und für Kunden in Ausnahmesituationen unzumutbare Wartezeiten erzeugen. Ein stündliches Intervall schafft einen zeitlich reibungslosen Ablauf für Dokumentation und Übergabe der Unterlagen.

> **Hinweis zur Revision:** Der ursprüngliche Entscheid (täglich in Phase 1) wurde bei der SRS-Finalisierung durch die Entscheidungsträgerin angehoben. Die technische Machbarkeit (stündlicher Batch) setzt eine Anpassung des bestehenden Backend-Systems voraus und ist Teil des MVP-Umsetzungsaufwands (SRS Annahme A-03: zu prüfen).

**Verworfene Alternativen:**
- 24h-Batch im MVP → Abgelehnt wegen Massenanfall-Szenario
- Echtzeit (WebSocket/Push) → Für MVP abgelehnt; setzt Backend-Architekturumbau voraus

**Auswirkung im Lastenheft:** FA-18, FA-10, FA-20, NFA-11, A-03

---

## W-05 — Mobile: Native App vs. Desktop-Fokus

| | |
|---|---|
| **Status** | ✅ Entschieden |
| **Kategorie** | Technologie / Scope |

| Aussage A | Aussage B |
|---|---|
| Dok. 2 (Fachbereich): „Wir brauchen eine native App für iOS und Android — Kunden nutzen nur noch Smartphones." | Dok. 4 (Transkript, Mobile Team): „Keine native App geplant. Responsive Web deckt mobile Nutzung vollständig ab." |

**Entscheidung:** Responsive Web-Applikation in Phase 1. Native App in Phase 3 (Vision).

**Begründung:** Mobile Team hat native App explizit ausgeschlossen. Responsive Web ist technisch äquivalent für den Anwendungsfall Schadenmeldung. Kostenaufwand einer nativen App nicht gerechtfertigt für MVP.

**Auswirkung im Lastenheft:** FA-28, A-05, Phasenplan 6.3

---

## W-06 — Mehrsprachigkeit: Sofort vs. initial Deutsch

| | |
|---|---|
| **Status** | ✅ Entschieden (revidiert — 27. April 2026) |
| **Kategorie** | Lokalisierung / Scope |

| Aussage A | Aussage B |
|---|---|
| Dok. 1 (Business Vision): „Alpina ist in der ganzen Schweiz tätig — Portal muss Deutsch, Französisch und Italienisch unterstützen." | Dok. 3 (IT): „i18n-Architektur wird vorgesehen, aber initiale Implementierung nur Deutsch." |

**Entscheidung (revidiert):** **Deutsch, Französisch und Italienisch alle in Phase 1** umzusetzen (SRS REQ-I18N-01: MUSS). Die Architektur ist i18n-fähig ausgelegt.

**Begründung:** Alpina Versicherungen AG ist in der gesamten Schweiz tätig. Alle drei Landessprachen sind für den landesweiten Betrieb regulatorisch und kundenrelevant. Die ursprüngliche Entscheidung (DE-only in Phase 1) wurde bei der SRS-Finalisierung revidiert: die Business Vision (Dok. 1) hat hier Vorrang gegenüber dem IT-Pragmatismus (Dok. 3).

> **Hinweis zur Revision:** Der ursprüngliche Entscheid (DE-only Phase 1, FR/IT Phase 2) wurde bei der SRS-Finalisierung aufgehoben. FR/IT sind damit kein Phase-2-Scope mehr.

**Auswirkung im Lastenheft:** A-04, Rahmenbedingungen 6.1, Phasenplan 6.3, Abgrenzungen 7.2

---

## W-07 — Schadensfallverarbeitung: Vollautomatisiert vs. Manuelle Prüfung

| | |
|---|---|
| **Status** | 📋 Empfehlung ❗ Kritisch |
| **Kategorie** | Geschäftsprozess / Compliance |

| Aussage A | Aussage B |
|---|---|
| Dok. 2 (Fachbereich, Passage 1): „Alle Schadensmeldungen sollen vollautomatisch ohne menschliches Zutun verarbeitet werden." | Dok. 2 (Fachbereich, Passage 2): „Jede Schadenmeldung muss von einem Sachbearbeiter manuell geprüft und freigegeben werden." |

> **Besonderheit:** Beide widersprüchlichen Aussagen stammen aus demselben Dokument (Dok. 2) — ein direkt-antagonistischer Widerspruch innerhalb einer einzigen Quelle.

**Empfehlung:** Hybridmodell — automatisierte Vorprüfung (Vollständigkeit, Formatvalidierung) mit manueller Sachbearbeiter-Freigabe für komplexe oder grenzwertige Fälle.

**Begründung:** Vollautomatisierung regulatorisch riskant bei Versicherungsleistungen (Haftung). Rein manuell nicht skalierbar. Hybridmodell entspricht Marktstandard.

**Entscheid ausstehend:** Fachbereich und Compliance müssen Kriterien für automatisiert vs. manuell definieren (Betragsgrenzen, Schadensarten, Risikoklassen).

**Auswirkung im Lastenheft:** A-06, L-01 — FA-30 (Detailanforderung) ausstehend

---

## W-08 — Hosting: Schweiz vs. Ausland

| | |
|---|---|
| **Status** | ✅ Entschieden |
| **Kategorie** | Compliance / Infrastruktur |

| Aussage A | Aussage B |
|---|---|
| Dok. 3 (IT): „Hosting in der Schweiz ist vertraglich vorgeschrieben und nicht verhandelbar." | Dok. 2 (Fachbereich): Implizite Nutzung ausländischer Cloud-Dienste (AWS, Azure) ohne Erwähnung von Einschränkungen. |

**Entscheidung:** Ausschliesslich Schweizer Rechenzentren. Kein Daten-Routing über ausländische Dienste.

**Begründung:** Compliance-Anforderung (DSG) und Vertragsgrundlage. Nicht verhandelbar.

**Auswirkung im Lastenheft:** FA-22, NFA-15, A-07, Rahmenbedingungen 6.1

---

## W-09 — Datenschutzrecht: DSGVO vs. DSG

| | |
|---|---|
| **Status** | ✅ Korrigiert (sachlicher Fehler) |
| **Kategorie** | Compliance / Recht |

| Aussage A | Aussage B |
|---|---|
| Dok. 1, 2, 3 (alle drei): Mehrfache Referenzen auf „DSGVO-Konformität" und „DSGVO-konforme Datenschutzerklärung". | Rechtslage (Schweiz): Alpina Versicherungen AG ist ein Schweizer Unternehmen mit Sitz in der Schweiz. Anwendbares Recht ist das revidierte Schweizer DSG (in Kraft seit 01.09.2023), nicht die EU-DSGVO. |

> **Besonderheit:** Dies ist kein Meinungswiderspruch zwischen Stakeholdern, sondern ein **sachlicher Fehler** in allen drei Quelldokumenten. Die DSGVO gilt für Unternehmen mit Sitz in der EU oder bei Verarbeitung von Daten EU-ansässiger Personen (Art. 3 DSGVO). Das DSG ist das Schweizer Äquivalent.

**Korrektur:** DSG (rev. 2023) ist das massgebende Datenschutzrecht. Alle Referenzen auf DSGVO in den Quelldokumenten sind fehlerhaft.

**Vorbehalt:** Falls Alpina Versicherungen AG Kunden aus EU-Mitgliedstaaten betreut, könnte die DSGVO zusätzlich anwendbar sein (Art. 3 Abs. 2 DSGVO). Dies ist von der Rechtsabteilung separat zu klären.

**Auswirkung im Lastenheft:** FA-24, NFA-14, NFA-16, A-08, L-04

---

## Übersicht aller Widersprüche

| ID | Thema | Dok. | Status | Lastenheft |
|---|---|---|---|---|
| W-01 | Support: Chat vs. E-Mail | 2 vs. 3 | 📋 Empfehlung | A-10 |
| W-02a | Login: Kein Login vs. SSO | 2 vs. 3 | ✅ Entschieden | FA-02, FA-23 |
| W-02b | Registrierung: Selbst vs. Support | 2 vs. 2 | 📋 Empfehlung ❗ | FA-01, L-02 |
| W-02c | 2FA vs. einfacher Zugang | 2 vs. 3 | ✅ Entschieden | FA-02 |
| W-03 | Upload: 5 / 10 / 50 MB | 2 vs. 3 | ✅ Entschieden | FA-11, FA-12, FA-12a |
| W-04 | Status: Echtzeit vs. Batch | 1 vs. 3 | ✅ Entschieden (revidiert) | FA-18, FA-10, NFA-11, A-03 |
| W-05 | Mobile: Native App vs. Web | 2 vs. 4 | ✅ Entschieden | FA-28 |
| W-06 | Sprache: sofort 3 vs. DE zuerst | 1 vs. 3 | ✅ Entschieden (revidiert) | A-04, 6.1, 6.3 |
| W-07 | Verarbeitung: Auto vs. Manuell | 2 vs. 2 | 📋 Empfehlung ❗ | A-06, L-01 |
| W-08 | Hosting: Schweiz vs. Ausland | 3 vs. 2 | ✅ Entschieden | FA-22 |
| W-09 | Datenschutz: DSGVO vs. DSG | 1,2,3 | ✅ Korrigiert | FA-24, NFA-14 |

**Zusammenfassung:** 9 Widersprüche identifiziert | 7 entschieden/korrigiert (davon 2 revidiert in v2.0) | 2 offen (W-02b, W-07)

---

*Widerspruchskatalog Version 2.0 — Aktualisiert: 27. April 2026 | Autorin: Kathrin*  
*Vollständige Anforderungen: siehe Lastenheft v2.0*
