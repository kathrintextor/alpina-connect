# Abschlusspräsentation — Alpina Connect
## Requirements Engineering & Prototyp

**Autorin:** Kathrin | **Datum:** 17. April 2026

---

## Folie 1 — Titel

**Alpina Connect**
Digitales Kundenportal für Schadenmeldungen

Requirements Engineering & prototypische Umsetzung  
Kathrin | RE-Gruppenaufgabe | April 2026

---

## Folie 2 — Ausgangslage & Problem

**Heute:**
- Kunden melden Schäden per Telefon oder E-Mail
- Medienbrüche, manuelle Erfassung, keine Statustransparenz
- Sachbearbeiter erhalten unstrukturierte Daten

**Ziel:**
- Webportal für digitale Schadenmeldung, Dokumentenupload und Statusverfolgung
- Alpina Connect: „Kontrolle in einem unkontrollierbaren Moment"

---

## Folie 3 — Vorgehen & GenAI-Einsatz

**5-Phasen-Ansatz:**
1. Quelldokument-Analyse (4 Dokumente, 3 Perspektiven)
2. Widerspruchsidentifikation (9 Widersprüche gefunden)
3. Entscheidungsfindung & Konsolidierung
4. Lastenheft-Erstellung (48 Anforderungen)
5. Prototypische Umsetzung (React, 6 Screens)

**GenAI via BMAD-Framework:**
- Mary (Analyst) → Widerspruchskatalog
- John (PM) → Priorisierung & Phasenplan
- Amelia (Dev) → Code-Generierung
- Kritische Überprüfung & Korrekturen: **menschlich**

---

## Folie 4 — Widersprüche: Highlights

**9 identifizierte Widersprüche, z.B.:**

| Thema | Aussage A | Aussage B | Entscheidung |
|---|---|---|---|
| Upload-Limit | 5 MB | 50 MB | **10 MB** (IT) |
| Status | Echtzeit | Batch täglich | **Batch Phase 1** |
| Login | Kein Login | SSO-Pflicht | **SSO** (Security) |
| Datenschutz | DSGVO | (Schweiz!) | **DSG** ✓ |

**Wichtigste Erkenntnis:** Quelldokumente zeigen fehlende abteilungsübergreifende Abstimmung — klassisches RE-Problem.

---

## Folie 5 — Lastenheft: Struktur & Qualität

**8 Pflichtabschnitte erfüllt** | **48 Anforderungen** (FA-01–FA-29, NFA-01–NFA-19)

Jede Anforderung enthält:
- Eindeutige ID
- Messbares Akzeptanzkriterium
- Quellenangabe (Traceability)

**Highlights:**
- FA-12: Upload max. 10 MB (W-03 entschieden)
- FA-24: DSG-konforme Datenschutzerklärung (W-09 korrigiert)
- NFA-10: Verfügbarkeit ≥ 99.5%
- 7 offene Lücken dokumentiert (L-01 bis L-07)

---

## Folie 6 — Prototyp: Demo

**6 Screens implementiert:**

| Screen | Anforderungen |
|---|---|
| Login (E-Mail + Passwort) | FA-01, FA-02, FA-24 |
| 2FA (SMS-Code Mock) | FA-02, NFA-05 |
| Dashboard (Übersicht) | FA-10, FA-18, FA-05 |
| Schadenmeldungsformular | FA-06, FA-07, FA-11–FA-14 |
| Eingangsbestätigung | FA-08, FA-16, FA-09 |
| Statusübersicht | FA-10, FA-18, FA-21 |

**Tech-Stack:** React + Vite + Tailwind CSS | Responsive | Keine Backend-Abhängigkeit

---

## Folie 7 — Lastenheft → Prototyp: Traceability

**Beispiel: FA-12 (Upload-Limit)**

Lastenheft:
> „FA-12: Das System validiert Dateigrösse (max. 10 MB) und Dateiformat (JPG, PNG, PDF) client- und serverseitig."

Prototyp-Code:
```js
// FA-12, FA-13: Datei-Validierung mit konkreter Fehlermeldung
const MAX_FILE_SIZE = 10 * 1024 * 1024 // FA-12: 10 MB (W-03)
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf']
```

→ Direkter Nachweis: **Lastenheft als Implementierungsgrundlage**

---

## Folie 8 — Fazit & Learnings

**Erreichtes:**
- ✓ Vollständiges Lastenheft (8 Abschnitte, 48 Anforderungen)
- ✓ Widerspruchskatalog (9 Widersprüche, 5 entschieden)
- ✓ Funktionierender Prototyp (6 Screens, Traceability)
- ✓ Vorgehenskonzept + GenAI-Reflexion

**Wichtigstes Learning:**
> Widersprüche in Quelldokumenten sind kein Fehler — sie sind die eigentliche Aufgabe des Requirements Engineering.

**GenAI-Fazit:** Nützlich für Struktur, Analyse und Code. Unersetzlich: menschliches Urteil bei Compliance, Prioritäten und strategischen Entscheidungen.

---

*Ende der Präsentation*
