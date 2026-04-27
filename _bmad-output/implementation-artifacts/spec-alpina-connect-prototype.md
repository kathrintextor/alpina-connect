---
title: 'Alpina Connect — MVP Prototyp'
type: 'feature'
created: '2026-04-13'
status: 'done'
baseline_commit: 'NO_VCS'
context:
  - _bmad-output/planning-artifacts/prd.md
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Es existiert kein lauffähiger Prototyp für das Kundenportal Alpina Connect, der die Kernflows (Registrierung, Schadenmeldung, Dokumentenupload, Statusverfolgung) für die Präsentation der Gruppenaufgabe demonstrieren kann.

**Approach:** React-SPA mit Vite, React Router für Navigation, vollständig mit Mock-Daten (kein echter Backend-Server), die alle MVP-Flows aus dem PRD abbildet.

## Boundaries & Constraints

**Always:**
- Mock-Daten in `src/data/` — kein echter Backend-Server
- Deutsch als Sprache (alle UI-Texte)
- Responsive (Desktop + Mobile) mit einfachem CSS oder Tailwind
- Alle Seiten ohne Login-Schutz navigierbar (Prototyp — kein echter Auth-Guard)
- 2FA-Schritt als UI-Mockup (SMS-Code immer "123456" akzeptiert)
- Dokumentenupload: Datei wird clientseitig ausgewählt und als Mock gespeichert (kein echter Upload)

**Ask First:**
- Soll Tailwind CSS oder plain CSS verwendet werden?
- Soll eine Schadensnummer zufällig generiert oder fest vorgegeben sein?

**Never:**
- Kein echter API-Call oder Backend
- Keine Authentifizierung mit echten Tokens/Sessions
- Keine Datenbankanbindung

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Registrierung erfolgreich | E-Mail + Passwort + 2FA "123456" | Weiterleitung zu Dashboard | Falscher 2FA-Code: Fehlermeldung "Ungültiger Code" |
| Schadenmeldung einreichen | Ausgefülltes Formular (Art, Datum, Beschreibung) | Bestätigungsseite mit Schadensnummer | Pflichtfeld fehlt: Inline-Validierungsfehler |
| Dokumentenupload | Datei ≤10 MB (JPG/PNG/PDF) | Dateiname erscheint in Liste | Datei >10 MB oder falsches Format: Fehlermeldung mit Hinweis |
| Status einsehen | Eingeloggter Nutzer, Dashboard | Liste aller Mock-Schadensfälle mit Status | — |
| Passwort vergessen | E-Mail eingegeben | Bestätigungsmeldung "E-Mail gesendet" (Mock) | — |

</frozen-after-approval>

## Code Map

- `alpina-connect/` -- Projektwurzel (Vite + React)
- `src/App.jsx` -- Routing-Setup mit React Router
- `src/pages/` -- Seitenkomponenten (Landing, Login, Register, TwoFA, Dashboard, NewClaim, ClaimDetail, Confirmation)
- `src/components/` -- Wiederverwendbare UI-Elemente (Header, FormField, FileUpload, StatusBadge)
- `src/data/mockData.js` -- Mock-Schadensfälle, Mock-User, Statuswerte
- `src/context/AuthContext.jsx` -- Einfacher React Context für Mock-Auth-State
- `src/styles/` -- CSS-Dateien (global + komponentenspezifisch)

## Tasks & Acceptance

**Execution:**
- [x] `alpina-connect/` -- Vite-React-Projekt initialisieren (`npm create vite@latest alpina-connect -- --template react`) -- Projektwurzel erstellen
- [x] `src/data/mockData.js` -- Mock-Daten definieren (3 Schadensfälle mit Status, Mock-User) -- Datenbasis für alle Seiten
- [x] `src/context/AuthContext.jsx` -- Mock-Auth-Context erstellen (isLoggedIn, login, logout, currentUser) -- globaler Auth-State
- [x] `src/App.jsx` -- React Router mit allen Routen einrichten (/, /login, /register, /register/verify, /dashboard, /claims/new, /claims/:id, /claims/:id/confirmation) -- Navigation
- [x] `src/components/Header.jsx` -- Navigationsleiste mit Logo, Links, Logout-Button -- Layout
- [x] `src/pages/LandingPage.jsx` -- Startseite mit Hero ("Schaden melden — einfach, schnell, digital") und CTA-Buttons -- Einstieg
- [x] `src/pages/LoginPage.jsx` -- Login-Formular (E-Mail, Passwort) mit Link zu Registrierung und Passwort-vergessen -- Auth
- [x] `src/pages/RegisterPage.jsx` -- Registrierungsformular (Vorname, Nachname, E-Mail, Passwort, Datenschutz-Checkbox) -- Registrierung
- [x] `src/pages/TwoFAPage.jsx` -- 2FA-Eingabe (6-stelliger Code, "123456" immer akzeptiert, falscher Code zeigt Fehler) -- Mock-2FA
- [x] `src/pages/ForgotPasswordPage.jsx` -- E-Mail-Eingabe + Mock-Bestätigung "E-Mail wurde gesendet" -- Edge Case
- [x] `src/pages/DashboardPage.jsx` -- Übersicht aller Schadensfälle aus mockData mit StatusBadge und Link zu Detail -- Hauptseite
- [x] `src/pages/NewClaimPage.jsx` -- Schadenmeldungsformular (Schadensart Dropdown, Datum, Ort, Beschreibung, FileUpload) mit Pflichtfeldvalidierung -- Kernflow
- [x] `src/components/FileUpload.jsx` -- Datei-Input mit Validierung (≤10 MB, JPG/PNG/PDF), zeigt Dateinamen nach Auswahl, Fehlermeldung bei ungültiger Datei -- Upload
- [x] `src/pages/ConfirmationPage.jsx` -- Bestätigungsseite nach Einreichung (Schadensnummer, nächste Schritte, Link zu Dashboard) -- Abschluss
- [x] `src/pages/ClaimDetailPage.jsx` -- Detailansicht eines Schadensfalls (Formularangaben, hochgeladene Dokumente, Statusverlauf) -- Status
- [x] `src/components/StatusBadge.jsx` -- Farbiger Badge für Status (Eingegangen/In Bearbeitung/Abgeschlossen) -- Wiederverwendbar
- [x] `src/styles/global.css` -- Globale Styles: Farben (Alpina-Blau #003366), Typografie, Responsive Breakpoints -- Design

**Acceptance Criteria:**
- Given ein neuer Nutzer öffnet die App, when er auf "Konto erstellen" klickt und Formular ausfüllt, then landet er nach 2FA-Bestätigung auf dem Dashboard
- Given ein eingeloggter Nutzer, when er "Schaden melden" klickt und Formular ausfüllt und absendet, then erscheint die Bestätigungsseite mit einer Schadensnummer
- Given ein Nutzer lädt eine Datei >10 MB hoch, when er die Datei auswählt, then erscheint die Meldung "Maximale Dateigrösse: 10 MB. Bitte lade ein Foto statt eines Videos hoch."
- Given ein Nutzer auf dem Dashboard, when er einen Schadensfall anklickt, then sieht er Detailansicht mit Status
- Given ein Nutzer auf dem Login, when er falschen 2FA-Code eingibt, then erscheint "Ungültiger Code. Bitte erneut versuchen."
- Given die App auf einem Smartphone (375px), when alle Seiten aufgerufen werden, then sind alle Formulare und Buttons bedienbar ohne horizontales Scrollen

## Design Notes

**Alpina Corporate Design (Mock):**
```css
:root {
  --primary: #003366;      /* Alpina-Blau */
  --primary-light: #0055a5;
  --success: #28a745;
  --warning: #ffc107;
  --danger: #dc3545;
  --text: #333333;
  --bg: #f5f7fa;
}
```

**Mock-Schadensnummer:** `ALV-${Jahr}-${4-stellige Zufallszahl}` — z.B. `ALV-2026-4872`

## Verification

**Commands:**
- `cd alpina-connect && npm install` -- expected: keine Fehler
- `npm run dev` -- expected: App läuft auf http://localhost:5173
- `npm run build` -- expected: Build erfolgreich ohne Fehler

**Manual checks:**
- Registrierungs-Flow vollständig durchklicken bis Dashboard
- Schadenmeldung mit Datei-Upload einreichen, Bestätigungsseite prüfen
- Dashboard zeigt Mock-Schadensfälle mit farbigen Status-Badges
- Auf 375px Bildschirmbreite alle Seiten prüfen
