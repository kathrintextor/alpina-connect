# Changelog — Alpina Connect

Alle bedeutenden Änderungen an diesem Projekt werden in dieser Datei dokumentiert.
Format orientiert sich an [Keep a Changelog](https://keepachangelog.com/de/1.0.0/).
Versionierung nach [Semantic Versioning](https://semver.org/lang/de/).

---

## [v1.0.0] — 2026-04-27

**Meilenstein: Finale RE-Artefakte — vollständiger Abschluss aller Anforderungsdokumente**

### Hinzugefügt
- `SRS-Alpina-Connect-v1.0.md` — Finalisierung inkl. Decision Log (DEC-01 bis DEC-06) und Assumption Log (A-01 bis A-06)
- `Architektur-Alpina-Connect.md` v1.0 — Systemarchitektur Alpina Connect
- `Business-Vision-Alpina-Connect.md` v1.0 — Business Vision und strategische Ausrichtung
- `Stakeholder-Alpina-Connect.md` v1.0 — Stakeholder-Analyse und Registereinträge
- `Use-Cases-Alpina-Connect.md` v1.0 — Use-Case-Übersicht
- `Use-Cases-Detail-Alpina-Connect.md` v1.0 — Detaillierte Use-Case-Beschreibungen
- `Zielbild-Alpina-Connect.md` v1.0 — Zielbild und Erfolgskriterien
- `Satzschablonen-Alpina-Connect.md` v1.0 — Anforderungsschablonen (MASTeR/SOPHIST)

### Geändert
- `lastenheft.md` → v2.0 — Abgleich mit SRS v1.0:
  - Batch-Verarbeitung: stündlich (DEC-03)
  - Mehrsprachigkeit: DE/FR/IT in Phase 1 (REQ-I18N-01)
  - Dateiformat HEIC ergänzt
  - 50 MB Gesamtlimit festgelegt
  - TLS 1.3 als Mindestanforderung
  - TOTP-2FA spezifiziert
- `widerspruchskatalog.md` → v2.0:
  - W-03 um 50 MB Gesamtlimit ergänzt
  - W-04 revidiert (Batch stündlich statt täglich, DEC-03)
  - W-06 revidiert (DE/FR/IT Phase 1, SRS REQ-I18N-01)

---

## [v0.2.0] — 2026-04-24

**Meilenstein: SRS-Konsolidierung nach Team-Roundtable**

### Geändert
- `SRS-Alpina-Connect` → v0.2 — Anforderungen konsolidiert nach Team-Roundtable; widersprüchliche Anforderungen aufgelöst

---

## [v0.1.0] — 2026-04-20

**Meilenstein: SRS-Erstentwurf nach Stakeholder-Analyse**

### Hinzugefügt
- `SRS-Alpina-Connect` → v0.1 — Erstentwurf der Software Requirements Specification nach Stakeholder-Analyse

---

## [v0.0.2] — 2026-04-17

**Meilenstein: Erste vollständige Dokumentensets**

### Hinzugefügt
- `lastenheft.md` v1.0 — Erstversion nach Quelldokument-Analyse
- `widerspruchskatalog.md` v1.0 — Erstversion Widerspruchskatalog (W-01 bis W-09 identifiziert)
- `ci-konzept.md` v1.0 — CI/CD-Konzept für Alpina Connect
- `vorgehenskonzept.md` v1.0 — Vorgehenskonzept und Entwicklungsmethodik
- `praesentation.md` — Präsentation des Requirements-Engineering-Ansatzes

---

## [v0.0.1] — 2026-04-13

**Meilenstein: Projektinitialisierung**

### Hinzugefügt
- `prd.md` — Product Requirements Document (initiale Fassung)
- `spec-alpina-connect-prototype.md` — MVP-Prototyp-Spezifikation
- `planning-artifacts/architecture.md` — Architektur-Platzhalter (Vorlage)
- Grundlegende Projektstruktur und BMAD-Konfiguration

---

## Hinweis zur Git-Historie

Die Versionen v0.0.1 bis v0.0.2 und v0.1.0 bis v0.2.0 entstanden vor der Git-Initialisierung
und sind als Pre-Baseline dokumentiert. Der initiale Git-Commit (7a85b57) entspricht
dem Stand v1.0.0.

Ab v1.0.0 wird jede Änderung einzeln in Git committet und mit Tags versehen.
