# Vorgehenskonzept und GenAI-Reflexion
## Projekt Alpina Connect — Requirements Engineering und Prototyp

**Autorin:** Kathrin  
**Datum:** 17. April 2026  
**Version:** 1.0

---

## 1. Vorgehenskonzept

### 1.1 Überblick

Für die Analyse der Quelldokumente und die Erstellung des Lastenhefts wurde ein strukturiertes, GenAI-unterstütztes Vorgehen gewählt. Das Vorgehen folgt dem BMAD-Framework (Business Management and Development) mit spezialisierten KI-Agenten für unterschiedliche Aufgaben.

### 1.2 Analysekette: Von den Quelldokumenten zum Lastenheft

> **Wichtiger Hinweis zur Methodik:** Das Lastenheft wurde nicht direkt aus einem bereits konsolidierten Dokument abgeleitet. Die Analysekette verlief in drei Stufen:
>
> **Quelldokumente → PRD (Zwischenergebnis) → Lastenheft**
>
> Das PRD (Product Requirements Document) entstand als erstes Zwischenergebnis aus der direkten Analyse aller vier Quelldokumente. Es diente anschliessend als strukturierte Grundlage für die Überführung in das geforderte Lastenheft-Format. Der Widerspruchskatalog wurde unabhängig davon direkt aus den Rohtexten der Quelldokumente erstellt — ohne Umweg über das PRD — um eine unabhängige Perspektive auf die Widersprüche zu gewährleisten.

### 1.3 Phasen des Vorgehens

**Phase 1 — Quelldokumentenanalyse (Basis aller weiteren Schritte)**

Alle vier Quelldokumente wurden vollständig extrahiert und inhaltlich analysiert:

| Dokument | Perspektive | Qualität |
|---|---|---|
| `Alpina_Connect_Business_Vision.docx` | Management — strategische Ziele, Nutzergruppen | Gut strukturiert, aber vage bei Details |
| `Alpina_Connect_Fachbereich_Chaotisch.docx` | Fachbereich — funktionale Wünsche | Stark widersprüchlich; gleiche Aussagen bis zu 10× wiederholt |
| `Alpina_Connect_IT_Mix.docx` | IT — E-Mails, Meeting-Notizen, Architekturentscheide | Fragmentiert, aber technisch präzise |
| `Alpina_Connect_Transkript.docx` | Interview-Transkript | Kontextreich, ergänzt Stakeholder-Perspektiven |

**Methodische Beobachtung:** Das Fachbereichsdokument enthielt dieselben Aussagen 5–15 Mal — ein Indiz dafür, dass es kein curated Dokument, sondern ein Rohexport war. Die Wiederholungsfrequenz wurde bewusst *nicht* als Prioritätsindikator gewertet.

**Phase 2 — PRD als strukturiertes Zwischenergebnis**

Aus den Quelldokumenten wurde zunächst ein Product Requirements Document (PRD) erstellt. Das PRD konsolidierte die Informationen aus allen vier Quellen in eine einheitliche Produktperspektive:
- Executive Summary, User Journeys, Erfolgskriterien
- Funktionale Anforderungen (FR1–FR32)
- Nicht-funktionale Anforderungen
- Phasenplan (MVP / Growth / Vision)

Das PRD ist kein eigenständiges Abgabe-Dokument, sondern das methodische Bindeglied zwischen der chaotischen Quelllage und dem strukturierten Lastenheft.

**Phase 3 — Widerspruchsidentifikation (direkt aus Quelldokumenten)**

Parallel zum PRD wurden die Quelldokumente unabhängig auf Widersprüche analysiert — bewusst ohne Rückgriff auf das PRD, um eine frische Perspektive zu wahren. Ergebnis: **9 Widersprüche** (W-01 bis W-09), dokumentiert im Widerspruchskatalog v1.0.

Methode: Kategorisierung nach Thema, vollständige Gegenüberstellung widersprüchlicher Aussagen mit direkter Quellenangabe (Dokument + Stakeholder).

**Phase 4 — Entscheidungsfindung**

Für jeden Widerspruch wurde eine Entscheidung oder Empfehlung formuliert, basierend auf:
- Prioritätshierarchie: Compliance/Security > Business Vision > Fachbereich
- Technische Machbarkeit (IT-Architekturvorgaben aus Dok. 3)
- Pragmatismus (Phase 1 vs. spätere Ausbaustufen)

5 von 9 Widersprüchen wurden final entschieden, 4 als offen dokumentiert mit konkreter Empfehlung.

**Phase 5 — Lastenheft-Erstellung (aus PRD + Widerspruchskatalog)**

Das Lastenheft entstand durch Zusammenführung zweier Quellen:
1. **PRD** (Phase 2): lieferte die konsolidierten Anforderungen als strukturierte Basis
2. **Widerspruchskatalog** (Phase 3): lieferte die Entscheidungen zu allen 9 Konflikten als Annahmen (A-01 bis A-10)

Jede Anforderung wurde dabei zurück auf die Quelldokumente rückverfolgbar gemacht (Traceability-Spalte). Das Lastenheft ist also kein simples Umformat des PRD, sondern eine Synthese aus PRD-Inhalt und direkter Quelldokumentenanalyse.

**Phase 6 — Prototypische Umsetzung**

Auf Basis des Lastenhefts wurde eine React-Webapplikation (Vite + Tailwind CSS) entwickelt. Alle Komponenten enthalten Kommentare mit direktem Bezug auf Anforderungs-IDs (z.B. `// FA-12: Dateivalidierung max. 10 MB`), um die Traceability vom Lastenheft zur Implementierung sichtbar zu machen.

---

### 1.3 Werkzeuge und Methoden

| Aufgabe | Werkzeug / Methode |
|---|---|
| Quelldokument-Extraktion | Python (zipfile/xml) — DOCX-Parsing |
| Widerspruchsanalyse | BMAD Mary (Business Analyst Agent) |
| Lastenheft-Struktur | BMAD John (PM) + Paige (Tech Writer) |
| Prototyp-Entwicklung | Claude Code + BMAD Amelia (Developer) |
| Strategische Priorisierung | BMAD-Party-Mode (Runder Tisch) |

---

## 2. GenAI-Einsatz

### 2.1 Welche GenAI-Tools wurden eingesetzt?

**Claude (Anthropic) via Claude Code + BMAD-Framework**

Das BMAD-Framework stellt spezialisierte Agenten-Personas bereit, die unterschiedliche Fachperspektiven simulieren:
- **Mary (Business Analyst):** Widerspruchsanalyse, Anforderungsstrukturierung
- **John (Product Manager):** Priorisierung, Phasenplanung, Sprint-Zeitschätzung
- **Winston (Architect):** Technologieempfehlung, Prototyp-Strategie
- **Amelia (Developer):** Prototyp-Implementierung, Code-Generierung
- **Party Mode:** Parallele Agentenrunden für strategische Diskussionen

### 2.2 Konkrete GenAI-Aufgaben

| Aufgabe | GenAI-Beitrag | Menschliche Überprüfung |
|---|---|---|
| Widerspruchskatalog | Mary identifizierte und kategorisierte alle 9 Widersprüche | Überprüfung der Vollständigkeit; Ergänzung von W-09 (DSG vs. DSGVO) |
| Lastenheft-Draft | Vollständige Generierung aller 48 Anforderungen mit IDs | Review aller Akzeptanzkriterien; Anpassung von FA-07 und FA-24 |
| Prototyp-Code | Alle 6 React-Komponenten generiert (ca. 700 Zeilen) | Browser-Test; Bugfix in ClaimFormPage (Validierungslogik) |
| Zeitschätzung | Realistische Schätzung 13–16h solo mit BMAD vs. 45–57h Gruppe ohne | Plausibilitätsprüfung |
| Vorgehenskonzept | Strukturvorlage generiert | Inhalte manuell angepasst und ergänzt |

---

## 3. GenAI-Reflexion

### 3.1 Was hat gut funktioniert?

**Widerspruchsidentifikation:** Mary (BMAD-Analyst) hat die 9 Widersprüche präzise und vollständig identifiziert — inklusive des subtilen sachlichen Fehlers W-09 (DSGVO vs. DSG), den ein menschlicher Analyst bei flüchtiger Lektüre möglicherweise übersehen hätte. Die tabellarische Aufbereitung mit Quelle, Entscheidung und Begründung war direkt ins Lastenheft übernehmbar.

**Strukturierte Anforderungen:** Die Generierung der FA/NFA-Tabellen mit IDs, Akzeptanzkriterien und Quellen hat erheblich Zeit gespart. Was manuell 8–12 Stunden gedauert hätte, entstand in ca. 20 Minuten als solider erster Entwurf.

**Traceability im Code:** Die automatische Ergänzung von Anforderungsreferenzen in Kommentaren (`// FA-12: Dateivalidierung`) ist ein Mehrwert, der bei manueller Entwicklung oft vergessen wird.

### 3.2 Wo hat GenAI Grenzen gezeigt?

**Strategische Entscheidungen:** Widersprüche W-02b (Registrierungsprozess) und W-07 (Automatisierung vs. manuelle Prüfung) konnten von GenAI nicht final entschieden werden — sie erforderten menschliches Urteil über Business-Prioritäten, regulatorische Abwägungen und organisatorische Realitäten.

**Überspezifikation:** Die initialen Akzeptanzkriterien für NFA-03 (Ladezeit Statusseite) wurden von GenAI mit "< 2 Sekunden" zu eng gefasst, ohne die Abhängigkeit von der Netzwerkqualität zu berücksichtigen. Manuelle Anpassung war nötig.

**Quelldokument-Qualität:** Das chaotische Fachbereichsdokument enthielt redundante Aussagen (gleiche Sätze 5–10 Mal wiederholt). GenAI hat diese Redundanz korrekt ignoriert — hätte aber ohne explizite Anweisung möglicherweise die Wiederholungsfrequenz als Prioritätsindikator fehlgedeutet.

**Fehlende Domänenkenntnisse:** GenAI kannte die spezifischen Schweizer Versicherungsregularien nicht aus eigenem Wissen. Die Korrektur von DSGVO zu DSG (W-09) musste durch gezielte Nachfrage ausgelöst werden — ohne diese wäre ein sachlicher Fehler im Lastenheft verblieben.

### 3.3 Was wurde manuell ergänzt oder korrigiert?

- W-09 (DSGVO/DSG): Eigeninitiativ korrigiert nach Erkennen des Rechtsfehlers
- FA-24 (Datenschutzerklärung): Formulierung auf DSG angepasst, nicht DSGVO
- FA-07 (Vorschau-Schritt): Akzeptanzkriterium präzisiert ("ohne Datenverlust")
- Prototyp-Validierungslogik: Fehler in der Dateityp-Erkennung manuell behoben
- Zeitschätzungen: Kritisch hinterfragt und als realistisch bestätigt

### 3.4 Fazit

GenAI (via BMAD + Claude Code) hat ca. **70–80% der Arbeitszeit** für strukturierte, gut definierbare Aufgaben übernommen. Der verbleibende Anteil — strategische Entscheidungen, kritische Überprüfung, Domänen-Korrekturen, Browser-Testing — war genuiner Menschenbeitrag und nicht substituierbar.

Der Einsatz von spezialisierten Agenten-Personas (Mary für Analyse, John für PM, Winston für Architektur) hat die Qualität der Outputs gegenüber einem einzelnen generischen Prompt deutlich verbessert, weil die Perspektiven gezielt auf die jeweilige Aufgabe ausgerichtet wurden.

**Empfehlung für künftige RE-Projekte:** GenAI eignet sich hervorragend für Erstanalyse, Strukturierung und Dokumentation. Für Entscheidungen mit Business-Impact oder regulatorischer Relevanz bleibt menschliche Validierung unverzichtbar.

---

*Ende des Vorgehenskonzepts — Version 1.0*
