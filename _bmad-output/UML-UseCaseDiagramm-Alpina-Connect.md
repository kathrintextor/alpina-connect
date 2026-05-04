# UML Use-Case-Diagramm — Alpina Connect

**Projekt:** Alpina Connect — Digitales Kundenportal
**Version:** 1.0
**Datum:** 2026-05-04
**Autorin:** Kathrin Textor
**Erstellt mit:** Claude Code (Mermaid-Code-Generierung) → Draw.io (Rendering)

---

## Use-Case-Diagramm (Mermaid)

> Dieses Diagramm kann in [Draw.io](https://app.diagrams.net/) importiert werden:
> Extras → Diagramm bearbeiten → Mermaid-Code einfügen

```mermaid
graph LR
    %% Akteure
    EK(["👤 Endkunde"])
    MA(["👤 Mitarbeitender"])
    MK(["👤 Makler / Admin"])
    IDP(["⚙️ Identity Provider"])

    %% System-Boundary
    subgraph SYS["🖥️ Alpina Connect Portal"]

        subgraph AUTH["Authentifizierung"]
            UC04["UC-04\nAnmelden via SSO"]
        end

        subgraph SCHADEN["Schadenmeldung"]
            UC01["UC-01\nSchaden melden"]
            UC02["UC-02\nDokumente hochladen"]
        end

        subgraph VERWALTUNG["Fallverwaltung"]
            UC03["UC-03\nSchadenstatus verfolgen"]
            UC06["UC-06\nSchadenmeldung bearbeiten"]
            UC09["UC-09\nSchadendaten exportieren"]
        end

        subgraph KOMMUNIKATION["Kommunikation & Service"]
            UC05["UC-05\nSupport-Kommunikation"]
            UC07["UC-07\nBenachrichtigung empfangen"]
            UC08["UC-08\nSprache wechseln"]
        end

        subgraph ZUKUNFT["Phase 2 (geplant)"]
            UC10["UC-10\nMaklerzugang verwalten"]
        end

    end

    %% Akteur-Verbindungen
    EK -->|"initiiert"| UC04
    MA -->|"initiiert"| UC04
    UC04 -->|"delegiert an"| IDP

    EK -->|"initiiert"| UC01
    EK -->|"initiiert"| UC03
    EK -->|"initiiert"| UC05
    EK -->|"initiiert"| UC08

    MA -->|"initiiert"| UC06
    MA -->|"initiiert"| UC09

    MK -->|"initiiert"| UC10

    %% UML-Beziehungen
    UC01 -->|"<<include>>"| UC02
    UC01 -->|"<<extend>>"| UC07
    UC03 -->|"<<extend>>"| UC05
    UC03 -->|"<<extend>>"| UC07
    UC06 -->|"<<extend>>"| UC07

    %% Styling
    classDef actor fill:#dbeafe,stroke:#3b82f6,color:#1e3a5f
    classDef usecase fill:#f0fdf4,stroke:#22c55e,color:#14532d
    classDef future fill:#fef9c3,stroke:#eab308,color:#713f12
    classDef system fill:#f8fafc,stroke:#94a3b8

    class EK,MA,MK,IDP actor
    class UC01,UC02,UC03,UC04,UC05,UC06,UC07,UC08,UC09 usecase
    class UC10 future
```

---

## Use-Case-Übersicht

| UC-ID | Use Case | Akteur | Priorität | Beziehung |
|---|---|---|---|---|
| UC-01 | Schaden melden | Endkunde | MUSS | `<<include>>` UC-02 |
| UC-02 | Dokumente hochladen | Endkunde | MUSS | — |
| UC-03 | Schadenstatus verfolgen | Endkunde | MUSS | `<<extend>>` UC-05, UC-07 |
| UC-04 | Anmelden via SSO | Endkunde / Mitarbeitender | MUSS | delegiert an Identity Provider |
| UC-05 | Support-Kommunikation | Endkunde | SOLL | — |
| UC-06 | Schadenmeldung bearbeiten | Mitarbeitender | MUSS | `<<extend>>` UC-07 |
| UC-07 | Benachrichtigung empfangen | Endkunde | SOLL | — |
| UC-08 | Sprache wechseln | Endkunde | SOLL | — |
| UC-09 | Schadendaten exportieren | Mitarbeitender | KANN | — |
| UC-10 | Maklerzugang verwalten | Makler / Admin | ZUKUNFT | Phase 2 |

---

## Legende

| Symbol | Bedeutung |
|---|---|
| `<<include>>` | Eingebundener Use Case — wird immer ausgeführt |
| `<<extend>>` | Erweiternder Use Case — wird unter bestimmten Bedingungen ausgeführt |
| 🟦 Blau | Akteure (extern) |
| 🟩 Grün | Use Cases (MVP Phase 1) |
| 🟨 Gelb | Use Cases (Phase 2 / Zukunft) |

---

## Import in Draw.io

1. [app.diagrams.net](https://app.diagrams.net/) öffnen
2. **Extras** → **Diagramm bearbeiten**
3. Mermaid-Code aus dem Codeblock oben einfügen
4. **OK** — Diagramm wird automatisch gerendert
5. Layout nach Bedarf anpassen und als SVG/PNG exportieren
