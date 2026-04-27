# Setup-Anleitung — Alpina Connect Showcase

> **Kurs:** AI Business Specialist (eidg. FA) | Modul: Requirements Engineering | HSO
>
> Diese Anleitung erklärt, wie du alle Tools installierst, die in diesem Showcase-Projekt verwendet wurden:
> **Claude Code · VS Code · BMAD · Git · GitHub · Node.js**

---

## Übersicht: Was wird benötigt?

| Tool | Zweck | Kosten |
|---|---|---|
| [Node.js](#1-nodejs) | Laufzeitumgebung für den React-Prototyp | kostenlos |
| [Git](#2-git) | Versionskontrolle lokal | kostenlos |
| [GitHub-Account](#3-github) | Remote-Repository, Releases, Actions | kostenlos |
| [VS Code](#4-visual-studio-code) | Code-Editor | kostenlos |
| [Claude Code Extension](#5-claude-code-vs-code-extension) | Claude direkt in VS Code | kostenlos (Extension) |
| [Claude-Abo](#6-claude-abo--welcher-plan-wird-benötigt) | KI-Assistent (Claude Code CLI) | kostenpflichtig |
| [BMAD](#7-bmad-framework) | KI-Agenten-Framework für RE-Workflows | kostenlos |

---

## 1. Node.js

Node.js wird benötigt, um den React-Prototyp lokal zu starten.

**Download:** https://nodejs.org → Version **LTS** (Long Term Support) wählen

**Installation prüfen:**
```bash
node --version   # sollte v18 oder höher zeigen
npm --version
```

---

## 2. Git

Git ermöglicht die lokale Versionskontrolle und das Hochladen auf GitHub.

**Download:** https://git-scm.com/downloads → Betriebssystem wählen

**Nach der Installation einmalig konfigurieren:**
```bash
git config --global user.name "Dein Name"
git config --global user.email "deine@email.com"
```

**Installation prüfen:**
```bash
git --version
```

---

## 3. GitHub

GitHub ist die Plattform, auf der das Repository öffentlich gehostet wird.

1. Account erstellen: https://github.com → *Sign up*
2. Dieses Repository forken oder klonen:
```bash
git clone https://github.com/kathrintextor/alpina-connect.git
cd alpina-connect
```

---

## 4. Visual Studio Code

VS Code ist der empfohlene Code-Editor für dieses Projekt.

**Download:** https://code.visualstudio.com → Betriebssystem wählen

**Empfohlene Extensions (im VS Code Marketplace suchen):**
- `Claude Code` (von Anthropic) — KI-Assistent direkt im Editor
- `GitLens` — erweiterte Git-Übersicht
- `Markdown Preview Enhanced` — Markdown-Vorschau für RE-Dokumente

---

## 5. Claude Code (VS Code Extension)

Die Claude Code Extension verbindet VS Code mit Claude und ermöglicht KI-unterstütztes Arbeiten direkt im Editor.

**Installation:**
1. VS Code öffnen
2. Extensions-Tab öffnen (`Ctrl+Shift+X`)
3. Suche nach `Claude Code`
4. *Install* klicken

**Alternativ — Claude Code als CLI:**
```bash
npm install -g @anthropic-ai/claude-code
```

Danach in einem Projektordner starten:
```bash
claude
```

---

## 6. Claude-Abo — Welcher Plan wird benötigt?

Claude Code ist an ein kostenpflichtiges Claude-Abonnement gebunden.

| Plan | Preis | Für Claude Code geeignet? |
|---|---|---|
| **Claude Free** | kostenlos | Nein — kein Claude Code Zugriff |
| **Claude Pro** | ca. $20 / Monat | Ja — für Einzelpersonen und Kurse empfohlen |
| **Claude Max** | ab $100 / Monat | Ja — für intensiven täglichen Einsatz |

**Empfehlung für den Kurs:** Claude Pro ($20/Monat) ist ausreichend.

Account & Abo: https://claude.ai → *Upgrade to Pro*

---

## 7. BMAD Framework

BMAD stellt strukturierte KI-Agenten-Workflows bereit (Analyst, PM, Architect, Developer etc.).
In diesem Projekt übernimmt BMAD die Rollen im Requirements-Engineering-Prozess.

BMAD ist bereits in diesem Repository vorkonfiguriert (`_bmad/`-Ordner).
Für eigene Projekte: https://github.com/bmadcode/bmad-method

---

## Projekt lokal starten

Nach der Installation aller Tools:

```bash
# Repository klonen (falls noch nicht gemacht)
git clone https://github.com/kathrintextor/alpina-connect.git
cd alpina-connect

# Abhängigkeiten installieren
npm install

# Prototyp starten
npm run dev
```

Der Prototyp öffnet sich unter `http://localhost:5173`

---

## Was dieses Projekt zeigt

| Bereich | Eingesetztes Tool | Ergebnis |
|---|---|---|
| Requirements Engineering | Claude Code + BMAD | SRS, Lastenheft, Widerspruchskatalog, Use Cases |
| KI-Agenten-Kollaboration | BMAD (Mary, John, Winston, Sally, Amelia) | Rollenbasierte RE-Artefakte |
| Versionskontrolle | Git + GitHub | Nachvollziehbare Dokumentenhistorie, Releases |
| Prototyp | React + Vite + Tailwind CSS | 6 funktionale Screens mit Traceability zum Lastenheft |
| Automatisierung | GitHub Actions | Automatische Releases bei Tag-Push |

---

## Fragen?

Dieses Repository ist ein Lernprojekt im Kurs **AI Business Specialist (eidg. FA)**, Modul Requirements Engineering, HSO.
Autorin: Kathrin Textor
