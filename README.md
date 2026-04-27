# Alpina Connect — Digitales Kundenportal

**Auftraggeber:** Alpina Versicherungen AG
**Autorin:** Kathrin Textor
**Version:** v1.0.0 — 27. April 2026
**Status:** Requirements Engineering abgeschlossen

---

## Vision

> Alpina Versicherungen AG ermöglicht ihren Kundinnen und Kunden, Schadenmeldungen jederzeit, überall und ohne Medienbrüche digital einzureichen — einfach, transparent und effizient.

Alpina Connect ist ein digitales Self-Service-Portal für Privatkunden der Alpina Versicherungen AG. Es ersetzt den bisherigen Schadenmeldeprozess via Telefon und E-Mail durch einen geführten, transparenten Online-Prozess mit Dokumenten-Upload und Statusverfolgung.

---

## Kernfunktionen (MVP)

| Funktion | Beschreibung |
|---|---|
| Digitale Schadenmeldung | Geführter Prozess zur Erfassung und Einreichung von Schadenfällen |
| Dokumenten-Upload | Upload von Belegen, Fotos (inkl. HEIC), max. 50 MB gesamt |
| Statusverfolgung | Transparente Nachverfolgung laufender Schadensfälle |
| Mehrsprachigkeit | DE / FR / IT (Phase 1) |
| Sicherheit | TLS 1.3, TOTP-2FA, nDSG / DSGVO-konform |

---

## Repository-Struktur

```
alpina-connect/
│
├── _bmad-output/                        # RE-Artefakte (Hauptdokumente)
│   ├── SRS-Alpina-Connect-v1.0.md       # Software Requirements Specification
│   ├── Architektur-Alpina-Connect.md    # Systemarchitektur
│   ├── Business-Vision-Alpina-Connect.md
│   ├── Stakeholder-Alpina-Connect.md
│   ├── Use-Cases-Alpina-Connect.md
│   ├── Use-Cases-Detail-Alpina-Connect.md
│   ├── Zielbild-Alpina-Connect.md
│   ├── Satzschablonen-Alpina-Connect.md
│   │
│   └── planning-artifacts/              # Planungsartefakte
│       ├── prd.md                       # Product Requirements Document
│       ├── lastenheft.md                # Lastenheft v2.0
│       ├── widerspruchskatalog.md       # Widerspruchskatalog v2.0
│       ├── ci-konzept.md                # CI/CD-Konzept
│       ├── vorgehenskonzept.md          # Vorgehenskonzept
│       ├── architecture.md              # Architektur (Vorlage)
│       └── praesentation.md             # RE-Präsentation
│
├── .github/workflows/                   # GitHub Actions (CI/CD)
│   ├── release.yml                      # Automatische GitHub Releases bei Tag-Push
│   └── commit-check.yml                 # Conventional Commits Prüfung bei PRs
│
├── CHANGELOG.md                         # Vollständige Versionshistorie
└── README.md                            # Diese Datei
```

---

## Versionierung

Dieses Projekt verwendet [Semantic Versioning](https://semver.org/lang/de/) (`MAJOR.MINOR.PATCH`).

| Ebene | Wann |
|---|---|
| `MAJOR` | Grundlegende Neuausrichtung der Anforderungen oder Architektur |
| `MINOR` | Neues Artefakt, neue Iteration eines bestehenden Dokuments |
| `PATCH` | Korrekturen, Klarstellungen, kleine Anpassungen |

Die vollständige Änderungshistorie befindet sich in [CHANGELOG.md](CHANGELOG.md).

### Branches

| Branch | Verwendung |
|---|---|
| `master` | Stabiler Stand — nur getaggte Releases |
| `dev` | Laufende Entwicklung |
| `feature/...` | Grössere Überarbeitungen einzelner Artefakte |
| `fix/...` | Korrekturen |

### Workflow

```bash
# 1. Auf dev arbeiten
git checkout dev
# ... Dateien bearbeiten ...
git add <datei>
git commit -m "docs(srs): Anforderung R-042 ergänzt"

# 2. Meilenstein erreicht: CHANGELOG.md aktualisieren, dann nach master
git checkout master
git merge dev
git push origin master

# 3. Tag setzen → GitHub Release wird automatisch erstellt
git tag -a v1.1.0 -m "v1.1.0: Kurzbeschreibung"
git push origin v1.1.0
```

### Commit-Konvention

| Prefix | Verwendung |
|---|---|
| `feat:` | Neues Artefakt oder neue Anforderung |
| `docs:` | Änderung an bestehendem Dokument |
| `fix:` | Korrektur eines Fehlers oder Widerspruchs |
| `refactor:` | Umstrukturierung ohne inhaltliche Änderung |
| `chore:` | Infrastruktur, Konfiguration |

---

## Meilensteine

```
Q2 2026 │ MVP Go-Live: Kernprozess Schadenmeldung + Upload
Q3 2026 │ Statusverfolgung produktiv
Q4 2026 │ Optimierungen nach Nutzerfeedback; Adoption ≥ 60 %
Q1 2027 │ Evaluation Phase 2 (Chat, PWA, Brokerportal)
```

---

## Erfolgskriterien (Auszug)

| Ziel | Messgrösse | Zielwert |
|---|---|---|
| Einfache Schadenmeldung | Task-Completion-Rate (Erstnutzer) | ≥ 85 % |
| Kundenzufriedenheit | NPS nach Meldung | ≥ 40 |
| Operative Entlastung | Reduktion Telefonmeldungen | ≥ 40 % nach 12 Monaten |
| Verfügbarkeit | System-Uptime | ≥ 99,5 % |
| Nutzerbasis | Registrierte Nutzer | ≥ 5.000 in 12 Monaten |
