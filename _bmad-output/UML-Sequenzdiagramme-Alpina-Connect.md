# UML Sequenzdiagramme — Alpina Connect

**Projekt:** Alpina Connect — Digitales Kundenportal
**Version:** 1.0
**Datum:** 2026-05-04
**Autorin:** Kathrin Textor
**Erstellt mit:** Claude Code (Mermaid) → Draw.io (Rendering)

---

## UC-04: Anmelden via SSO

> Vorbedingung für alle anderen Use Cases — deshalb zuerst dargestellt.

```mermaid
sequenceDiagram
    actor EK as Endkunde
    participant P as Alpina Connect Portal
    participant IDP as Identity Provider

    EK->>P: Portal aufrufen
    P->>EK: Weiterleitung zu Identity Provider
    EK->>IDP: Anmeldedaten eingeben
    IDP->>EK: 2FA-Code anfordern
    EK->>IDP: 2FA-Code eingeben
    IDP-->>P: Identität bestätigt + Token
    P->>P: Session starten, Rolle zuweisen
    P-->>EK: Weiterleitung zur Startseite

    alt Authentifizierung fehlgeschlagen
        IDP-->>EK: Fehlermeldung anzeigen
    else Identity Provider nicht erreichbar
        P-->>EK: Kein Zugang, Fehlermeldung anzeigen
    end
```

---

## UC-01: Schaden melden

> Setzt UC-04 (Anmeldung) voraus.

```mermaid
sequenceDiagram
    actor EK as Endkunde
    participant P as Alpina Connect Portal
    participant BO as Backoffice-System
    participant BD as Benachrichtigungsdienst

    EK->>P: Neuen Schaden melden aufrufen
    P-->>EK: Formular anzeigen
    EK->>P: Police auswaehlen / Polizennummer eingeben
    EK->>P: Schadensart auswaehlen
    EK->>P: Schadensdatum und Beschreibung eingeben
    P-->>EK: Zusammenfassung zur Pruefung anzeigen
    EK->>P: Einreichung bestaetigen

    P->>P: Eingaben validieren
    P->>BO: Schadensfall speichern
    BO-->>P: Schadensnummer vergeben (SCH-YYYY-XXXXXXXX)
    P->>BD: Bestaetigung per E-Mail ausloesen
    BD-->>EK: Bestaetigung mit Schadensnummer senden
    P-->>EK: Weiterleitung zu Schadensdetailseite (Status: Eingegangen)

    alt Polizennummer ungueltig
        P-->>EK: Fehlermeldung + Support-Link anzeigen
    else Technischer Fehler
        P-->>EK: Fehlermeldung, kein Duplikat angelegt
    else Session-Timeout
        P->>P: Entwurf speichern
        P-->>EK: Nach erneutem Login fortsetzbar
    end
```

---

## UC-02: Dokumente hochladen

> Setzt UC-01 (Schadensfall vorhanden) voraus.

```mermaid
sequenceDiagram
    actor EK as Endkunde
    participant P as Alpina Connect Portal
    participant VS as Virenscanner
    participant DMS as Dokumentenmanagementsystem
    participant BO as Backoffice-System

    EK->>P: Schadensfall oeffnen, Dokumente-Abschnitt aufrufen
    EK->>P: Dateien auswaehlen oder per Drag and Drop hinzufuegen
    P->>P: Client-Validierung (Format, max. 10 MB, Gesamtlimit 50 MB)
    P-->>EK: Validierungsergebnis anzeigen
    EK->>P: Dokumententyp auswaehlen
    EK->>P: Hochladen bestaetigen
    P-->>EK: Fortschrittsbalken anzeigen

    P->>VS: Datei auf Viren pruefen
    VS-->>P: Scan-Ergebnis

    alt Datei in Ordnung
        P->>DMS: Datei verschluesselt speichern
        DMS-->>P: Speicherbestaetigung
        P->>BO: Dokumenteneingang melden
        P-->>EK: Bestaetigung und aktualisierte Dokumentenliste
    else Virus erkannt
        P-->>EK: Neutraler Fehlertext, Datei verworfen
    else Format oder Groesse ungueltig
        P-->>EK: Fehlermeldung mit Hinweis, uebrige Dateien weiter uploadbar
    else Gesamtlimit 50 MB erreicht
        P-->>EK: Upload blockiert, verbleibender Speicher angezeigt
    end
```

---

## UC-03: Schadenstatus verfolgen

> Setzt UC-01 (Schadensfall vorhanden) voraus.

```mermaid
sequenceDiagram
    actor EK as Endkunde
    participant P as Alpina Connect Portal
    participant BE as Backend-System

    EK->>P: Dashboard aufrufen
    P->>BE: Alle Faelle des Nutzers abrufen
    BE-->>P: Fallliste mit Status und Zeitstempel
    P-->>EK: Faelle mit Status und Aktualisierungszeitstempel anzeigen

    EK->>P: Schadensfall auswaehlen
    P->>BE: Detaildaten und Statushistorie abrufen
    BE-->>P: Aktueller Status und Timeline
    P-->>EK: Detailseite anzeigen mit Status-Badge und Zeitstrahl
    P-->>EK: Erklaerungstext zur aktuellen Phase
    P-->>EK: Hinweis "Status wird stuendlich aktualisiert"

    alt Keine Faelle vorhanden
        P-->>EK: Leere Uebersicht mit Link zu UC-01
    else Backend nicht erreichbar
        P-->>EK: Gecachte Daten mit Warnhinweis und Aktualisieren-Button
    else Status ist Rueckfrage ausstehend
        P-->>EK: Aktionsbanner mit Link zu UC-05
        P->>EK: E-Mail-Benachrichtigung
    end
```

---

## Legende

| Symbol | Bedeutung |
|---|---|
| `->>` | Synchrone Nachricht (Anfrage) |
| `-->>` | Antwort / Rueckgabe |
| `actor` | Menschlicher Akteur |
| `participant` | System / Dienst |
| `alt` | Alternative Ablaufpfade |
