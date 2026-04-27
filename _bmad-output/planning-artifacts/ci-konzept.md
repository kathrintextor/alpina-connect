# CI/CD-Konzept — Alpina Connect
## Continuous Integration & Deployment Pipeline

**Autorin:** Kathrin  
**Datum:** 17. April 2026  
**Version:** 1.0  
**Datei:** `.github/workflows/ci.yml`

---

## 1. Übersicht

Die CI/CD-Pipeline für Alpina Connect besteht aus **3 Jobs**, die auf GitHub Actions laufen:

```
Push / PR auf main
        │
   ┌────┴────┐
   ▼         ▼
[Job 1]   [Job 2]        ← parallel
Prototyp  Präsentation
Build     Validierung
   │         │
   └────┬────┘
        ▼
     [Job 3]             ← nur auf main (nicht bei PRs)
      Deploy
   GitHub Pages
```

**Plattform:** GitHub Actions  
**Trigger:** Push auf `main` · Pull Requests auf `main`  
**Parallelität:** Jobs 1 und 2 laufen gleichzeitig → kürzere Gesamtlaufzeit

---

## 2. Job 1 — Prototyp Build & Validate

**Ziel:** Sicherstellen, dass der React-Prototyp jederzeit sauber baut.

| Schritt | Was wird geprüft |
|---|---|
| `npm ci` | Reproduzierbarer Install (locked versions) |
| `npm run build` | Vite-Build ohne Fehler |
| Build-Ausgabe | `dist/index.html`, `dist/assets/*.js`, `dist/assets/*.css` vorhanden |
| Bundle-Grösse | JS-Bundle > 10 KB (kein leerer Build) |
| Relative Pfade | Kein `/assets/...` — muss `./assets/...` sein (für file://) |
| FA-Traceability | ≥ 10 `FA-`-Kommentare im Quellcode |

**Artifact:** `prototype-dist-{sha}` · 30 Tage Aufbewahrung

**Design-Entscheid:** `npm ci` statt `npm install` — stellt sicher, dass `package-lock.json` nicht verändert wird und der Build reproduzierbar ist.

---

## 3. Job 2 — Präsentation Validate & Archive

**Ziel:** Sicherstellen, dass die Präsentation vollständig und strukturell korrekt ist.

| Schritt | Was wird geprüft |
|---|---|
| Datei vorhanden | `praesentation.html` existiert |
| Mindestgrösse | > 50 KB (vollständige Datei, nicht leer/abgeschnitten) |
| HTML-Grundstruktur | `<!DOCTYPE html>`, `lang="de"`, geschlossendes `</html>` |
| 4 Panels | `panel-slides`, `panel-lastenheft`, `panel-widerspruch`, `panel-prototype` |
| Slides | ≥ 8 Slides vorhanden |
| Navigation | `switchPanel`-Funktion vorhanden |
| FA-Abdeckung | ≥ 20 eindeutige FA-IDs im Dokument |

**Artifact:** `presentation-{sha}` · 90 Tage Aufbewahrung (länger, da Abgabedokument)

**Design-Entscheid:** Keine externe HTML-Validator-Dependency — stattdessen projektspezifische `grep`-Checks, die genau das prüfen was für dieses Dokument relevant ist (Panels, FA-IDs, Navigation).

---

## 4. Job 3 — Deploy zu GitHub Pages

**Ziel:** Automatisches Deployment der Präsentation und des Prototyps auf eine öffentliche URL.

**Trigger:** Nur bei Push auf `main` (nicht bei PRs — kein ungeprüfter Code auf Produktion).  
**Dependency:** Beide vorherigen Jobs müssen erfolgreich sein (`needs: [prototype-build, presentation]`).

### Deployment-Struktur

```
GitHub Pages (https://{user}.github.io/{repo}/)
│
├── index.html              ← Präsentation (Startseite)
│     (Prototyp-Link automatisch auf ./prototype/index.html angepasst)
│
└── prototype/
      ├── index.html        ← React-App (Einstiegspunkt)
      └── assets/
            ├── index-xxx.js
            └── index-xxx.css
```

**Automatische Pfad-Anpassung:** Der `sed`-Befehl im Deploy-Job passt den Prototyp-Link in der Präsentation automatisch von `../../prototype/dist/index.html` auf `./prototype/index.html` an — kein manuelles Anpassen nötig.

---

## 5. Qualitäts-Gates

| Gate | Job | Konsequenz bei Fehler |
|---|---|---|
| Build schlägt fehl | prototype-build | Pipeline stoppt, kein Deploy |
| Relative Pfade fehlen | prototype-build | Pipeline stoppt |
| Panel fehlt | presentation | Pipeline stoppt, kein Deploy |
| < 8 Slides | presentation | Pipeline stoppt |
| FA-Abdeckung < 20 | presentation | Warnung (kein Fehler) |
| FA-Traceability < 10 | prototype-build | Warnung (kein Fehler) |

---

## 6. Concurrency-Schutz

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

Verhindert, dass zwei gleichzeitige Pushes auf denselben Branch zu einem Race Condition beim Deployment führen. Neuer Push bricht laufende Pipeline ab.

---

## 7. Artifact-Versionierung

Beide Artifacts enthalten den Git-SHA im Namen (`-${{ github.sha }}`):
- `prototype-dist-abc1234`
- `presentation-abc1234`

Das ermöglicht:
- Jederzeit nachvollziehen, welcher Stand zu welchem Commit gehört
- Ältere Builds wiederherstellen (innerhalb der Aufbewahrungsfrist)
- Traceability: Lastenheft-Anforderungen → Code → Build-Artifact

---

## 8. Lokale Ausführung (ohne GitHub)

Die einzelnen CI-Schritte können lokal reproduziert werden:

```bash
# Job 1: Prototyp bauen
cd prototype
npm ci
npm run build

# Job 2: Präsentation validieren
FILE="_bmad-output/planning-artifacts/praesentation.html"
grep -q "panel-slides" "$FILE" && echo "OK" || echo "FEHLER"

# Job 3: Deployment-Struktur aufbauen (lokal)
mkdir -p _site/prototype
cp _bmad-output/planning-artifacts/praesentation.html _site/index.html
cp -r prototype/dist/. _site/prototype/
```

---

## 9. Aktivierung

Die Pipeline wird automatisch aktiv, sobald das Repository auf GitHub gepusht wird:

```bash
git init
git add .
git commit -m "Initial commit — Alpina Connect RE-Projekt"
git remote add origin https://github.com/{user}/{repo}.git
git push -u origin main
```

GitHub Actions erkennt `.github/workflows/ci.yml` automatisch und startet die Pipeline.

---

*CI/CD-Konzept Version 1.0 · Alpina Connect · 17. April 2026*
