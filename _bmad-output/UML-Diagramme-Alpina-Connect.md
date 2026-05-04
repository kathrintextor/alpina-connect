# UML-Diagramme — Alpina Connect

**Projekt:** Alpina Connect — Digitales Kundenportal
**Version:** 1.0
**Datum:** 2026-05-04
**Autorin:** Kathrin Textor
**Notation:** UML 2.x Standard (PlantUML)

> **Rendering:** Diagramme unter [plantuml.com/plantuml](https://www.plantuml.com/plantuml/uml/) einfügen
> oder in Draw.io: Extras → Diagramm bearbeiten → Format "PlantUML"

---

## 1. Use-Case-Diagramm (Übersicht)

```plantuml
@startuml UC-Uebersicht Alpina Connect

left to right direction
skinparam packageStyle rectangle

actor "Endkunde" as EK
actor "Mitarbeitender" as MA
actor "Makler / Admin" as MK
actor "Identity Provider" as IDP

rectangle "Alpina Connect Portal" {
    usecase "UC-01: Schaden melden" as UC01
    usecase "UC-02: Dokumente hochladen" as UC02
    usecase "UC-03: Schadenstatus verfolgen" as UC03
    usecase "UC-04: Anmelden via SSO" as UC04
    usecase "UC-05: Support-Kommunikation" as UC05
    usecase "UC-06: Schadenmeldung bearbeiten" as UC06
    usecase "UC-07: Benachrichtigung empfangen" as UC07
    usecase "UC-08: Sprache wechseln" as UC08
    usecase "UC-09: Schadendaten exportieren" as UC09
    usecase "UC-10: Maklerzugang verwalten\n(Phase 2)" as UC10
}

EK --> UC04
EK --> UC01
EK --> UC03
EK --> UC05
EK --> UC08
EK --> UC07

MA --> UC04
MA --> UC06
MA --> UC09

MK --> UC10

UC04 --> IDP

UC01 .> UC02 : <<include>>
UC01 .> UC07 : <<extend>>
UC03 .> UC05 : <<extend>>
UC03 .> UC07 : <<extend>>
UC06 .> UC07 : <<extend>>

@enduml
```

---

## 2. Aktivitätsdiagramm — UC-04: Anmelden via SSO

```plantuml
@startuml UC-04 Anmelden via SSO

|Endkunde|
start
:Portal aufrufen;

|System|
:Anmeldeseite anzeigen;
:Weiterleitung zu Identity Provider;

|Endkunde|
:Anmeldedaten eingeben;

|Identity Provider|
:Anmeldedaten pruefen;

if (Anmeldedaten gueltig?) then (nein)
    |Identity Provider|
    :Fehlermeldung senden;
    |Endkunde|
    :Fehlermeldung anzeigen;
    stop
else (ja)
endif

|Identity Provider|
:2FA-Code generieren und senden;

|Endkunde|
:2FA-Code eingeben;

|Identity Provider|
if (2FA-Code korrekt?) then (nein)
    :Fehlermeldung senden;
    |Endkunde|
    :Fehlermeldung anzeigen;
    stop
else (ja)
    :Identitaet bestaetigen, Token ausstellen;
endif

|System|
:Session starten;
:Rolle und Berechtigungen setzen;
:Startseite laden;

|Endkunde|
:Startseite angezeigt;
stop

@enduml
```

---

## 3. Aktivitätsdiagramm — UC-01: Schaden melden

```plantuml
@startuml UC-01 Schaden melden

|Endkunde|
start
:Neuen Schaden melden aufrufen;

|System|
:Meldeformular anzeigen;

|Endkunde|
:Police auswaehlen oder Polizennummer eingeben;
:Schadensart auswaehlen;
:Schadensdatum eingeben;
:Schadensbeschreibung eingeben (max. 2000 Zeichen);

fork
    :Dokumente hochladen (UC-02, optional);
fork again
    :Ohne Dokumente fortfahren;
end fork

:Zusammenfassung pruefen;
:Einreichung bestaetigen;

|System|
:Pflichtfelder validieren;

if (Validierung erfolgreich?) then (nein)
    :Fehlermeldung mit Hinweis anzeigen;
    |Endkunde|
    :Formular korrigieren;
    stop
else (ja)
endif

|System|
:Schadensfall in Datenbank speichern;
:Schadensnummer vergeben (SCH-YYYY-XXXXXXXX);
:Bestaetigung per E-Mail versenden;
:Schadensdetailseite laden (Status: Eingegangen);

|Endkunde|
:Schadensdetailseite mit Schadensnummer angezeigt;
stop

@enduml
```

---

## 4. Aktivitätsdiagramm — UC-02: Dokumente hochladen

```plantuml
@startuml UC-02 Dokumente hochladen

|Endkunde|
start
:Schadensfall oeffnen;
:Dokumente-Abschnitt aufrufen;
:Dateien auswaehlen (Dialog oder Drag and Drop);
:Dokumententyp auswaehlen;
:Hochladen bestaetigen;

|System|
:Client-seitige Validierung durchfuehren;

if (Format gueltig?\n(JPG, PNG, PDF, HEIC)) then (nein)
    :Fehlermeldung: unguelltiges Format;
    |Endkunde|
    :Fehlermeldung anzeigen;
    stop
else (ja)
endif

|System|
if (Dateigroesse <= 10 MB?) then (nein)
    :Fehlermeldung: Datei zu gross;
    |Endkunde|
    :Fehlermeldung anzeigen;
    stop
else (ja)
endif

if (Gesamtlimit 50 MB nicht ueberschritten?) then (nein)
    :Fehlermeldung: Gesamtlimit erreicht;
    |Endkunde|
    :Fehlermeldung mit Support-Link anzeigen;
    stop
else (ja)
endif

|System|
:Datei zum Server uebertragen;
:Virenscan durchfuehren;

if (Virenscan bestanden?) then (nein)
    :Datei verwerfen und protokollieren;
    |Endkunde|
    :Neutraler Fehlertext anzeigen;
    stop
else (ja)
endif

|System|
:Datei verschluesselt im DMS speichern;
:Datei mit Schadensfall verknuepfen;
:Backoffice benachrichtigen;

|Endkunde|
:Bestaetigung und aktualisierte Dokumentenliste anzeigen;
stop

@enduml
```

---

## 5. Aktivitätsdiagramm — UC-03: Schadenstatus verfolgen

```plantuml
@startuml UC-03 Schadenstatus verfolgen

|Endkunde|
start
:Dashboard aufrufen;

|System|
:Alle Schadensfaelle des Nutzers laden;

if (Schadensfaelle vorhanden?) then (nein)
    :Leere Uebersicht mit Link zu UC-01 anzeigen;
    |Endkunde|
    :Hinweis lesen;
    stop
else (ja)
endif

|System|
:Fallliste mit Status und Zeitstempel anzeigen;

|Endkunde|
:Schadensfall auswaehlen;

|System|
:Schadensdetaildaten und Statushistorie laden;

if (Backend erreichbar?) then (nein)
    :Gecachte Daten mit Warnhinweis anzeigen;
else (ja)
endif

:Detailseite anzeigen mit Status-Badge;
:Statushistorie als Zeitstrahl anzeigen;
:Erklaerungstext zur aktuellen Phase anzeigen;
:Hinweis auf stuendliche Aktualisierung anzeigen;

if (Status = Rueckfrage ausstehend?) then (ja)
    :Aktionsbanner anzeigen;
    :E-Mail-Benachrichtigung senden;
    |Endkunde|
    :Support kontaktieren (UC-05);
else (nein)
endif

|Endkunde|
:Status eingesehen;
stop

@enduml
```

---

## 6. Sequenzdiagramm — UC-01: Schaden melden

> Sequenzdiagramme zeigen die zeitliche Abfolge der Nachrichten zwischen Beteiligten.

```plantuml
@startuml Sequenz UC-01 Schaden melden

actor "Endkunde" as EK
participant "Alpina Connect\nPortal" as P
participant "Backoffice-\nSystem" as BO
participant "Benachrichtigungs-\ndienst" as BD

EK -> P : Neuen Schaden melden aufrufen
P --> EK : Formular anzeigen

EK -> P : Police auswaehlen
EK -> P : Schadensart, Datum, Beschreibung eingeben
P --> EK : Zusammenfassung zur Pruefung anzeigen
EK -> P : Einreichung bestaetigen

activate P
P -> P : Validierung
P -> BO : Schadensfall speichern
activate BO
BO --> P : Schadensnummer (SCH-YYYY-XXXXXXXX)
deactivate BO
P -> BD : E-Mail-Bestaetigung ausloesen
activate BD
BD --> EK : Bestaetigung mit Schadensnummer
deactivate BD
P --> EK : Schadensdetailseite (Status: Eingegangen)
deactivate P

alt Polizennummer ungueltig
    P --> EK : Fehlermeldung + Support-Link
else Technischer Fehler
    P --> EK : Fehlermeldung, kein Duplikat
end

@enduml
```

---

## 7. Sequenzdiagramm — UC-02: Dokumente hochladen

```plantuml
@startuml Sequenz UC-02 Dokumente hochladen

actor "Endkunde" as EK
participant "Portal" as P
participant "Virenscanner" as VS
participant "DMS" as DMS
participant "Backoffice" as BO

EK -> P : Dokumente-Abschnitt oeffnen
EK -> P : Dateien auswaehlen, Typ bestimmen

activate P
P -> P : Client-Validierung\n(Format, Groesse, Limit)
P --> EK : Fortschrittsanzeige

P -> VS : Datei pruefen
activate VS
VS --> P : Scan-Ergebnis
deactivate VS

alt Datei in Ordnung
    P -> DMS : Datei verschluesselt speichern
    activate DMS
    DMS --> P : Bestaetigung
    deactivate DMS
    P -> BO : Dokumenteneingang melden
    P --> EK : Bestaetigung + Dokumentenliste aktualisiert
else Virus erkannt
    P --> EK : Fehlertext (neutral)
else Format / Groesse ungueltig
    P --> EK : Fehlermeldung, uebrige Dateien uploadbar
end
deactivate P

@enduml
```

---

## Rendering-Optionen

| Methode | Anleitung |
|---|---|
| **Online (PlantUML)** | [plantuml.com/plantuml](https://www.plantuml.com/plantuml/uml/) — Code einfügen, direkt gerendert |
| **Draw.io** | Extras → Diagramm bearbeiten → Format "PlantUML" → Code einfügen → OK |
| **VS Code** | Extension "PlantUML" installieren → `.puml`-Datei → Vorschau mit `Alt+D` |
