# UML Use-Case-Diagramm — Alpina Connect

**Projekt:** Alpina Connect — Digitales Kundenportal
**Version:** 1.1
**Datum:** 2026-05-04
**Autorin:** Kathrin Textor
**Erstellt mit:** Claude Code (Mermaid-Code-Generierung) → Draw.io (Rendering)

---

## Use-Case-Diagramm (Mermaid)

> Dieses Diagramm kann in [Draw.io](https://app.diagrams.net/) importiert werden:
> Extras → Diagramm bearbeiten → Format "Mermaid" wählen → Code einfügen

```mermaid
graph LR
    EK["Endkunde"]
    MA["Mitarbeitender"]
    MK["Makler / Admin"]
    IDP["Identity Provider"]

    subgraph Portal["Alpina Connect Portal"]

        subgraph Auth["Authentifizierung"]
            UC04("UC-04: Anmelden via SSO")
        end

        subgraph Schaden["Schadenmeldung"]
            UC01("UC-01: Schaden melden")
            UC02("UC-02: Dokumente hochladen")
        end

        subgraph Verwaltung["Fallverwaltung"]
            UC03("UC-03: Schadenstatus verfolgen")
            UC06("UC-06: Schadenmeldung bearbeiten")
            UC09("UC-09: Schadendaten exportieren")
        end

        subgraph Kommunikation["Kommunikation"]
            UC05("UC-05: Support-Kommunikation")
            UC07("UC-07: Benachrichtigung empfangen")
            UC08("UC-08: Sprache wechseln")
        end

        subgraph Zukunft["Phase 2 - geplant"]
            UC10("UC-10: Maklerzugang verwalten")
        end

    end

    EK --> UC04
    MA --> UC04
    UC04 --> IDP

    EK --> UC01
    EK --> UC03
    EK --> UC05
    EK --> UC08

    MA --> UC06
    MA --> UC09

    MK --> UC10

    UC01 -->|include| UC02
    UC01 -->|extend| UC07
    UC03 -->|extend| UC05
    UC03 -->|extend| UC07
    UC06 -->|extend| UC07

    classDef actor fill:#dbeafe,stroke:#3b82f6
    classDef usecase fill:#f0fdf4,stroke:#22c55e
    classDef future fill:#fef9c3,stroke:#eab308

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
| `include` | Eingebundener Use Case — wird immer ausgeführt |
| `extend` | Erweiternder Use Case — wird unter bestimmten Bedingungen ausgeführt |
| Blau | Akteure (extern) |
| Grün | Use Cases (MVP Phase 1) |
| Gelb | Use Cases (Phase 2 / Zukunft) |

---

## Import in Draw.io

1. [app.diagrams.net](https://app.diagrams.net/) öffnen
2. **Extras** → **Diagramm bearbeiten**
3. Oben links Format **"Mermaid"** wählen
4. Mermaid-Code aus dem Codeblock oben einfügen
5. **OK** — Diagramm wird automatisch gerendert
6. Layout nach Bedarf anpassen und als SVG/PNG exportieren
