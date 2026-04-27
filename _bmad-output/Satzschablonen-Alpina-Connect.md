# Satzschablonen — Alpina Connect

**Projekt:** Alpina Connect — Digitales Kundenportal
**Version:** 1.0
**Datum:** 27. April 2026
**Autorin:** Kathrin Textor

---

## Satzschablonen-Struktur

**Schema:** [Wer] + [muss / sollte / wird] + [Konstrukt] + [Verhalten] + [Bedingung / Attribut]

| Konstrukt | Verwendung |
|---|---|
| **die Möglichkeit bieten** | Benutzerinteraktion — Nutzer kann etwas tun |
| **fähig sein** | Systemfähigkeit — System kann etwas leisten |
| **in der Lage sein** | Technische Grenze / Constraint |

---

## Transformation 1: REQ-AUTH-01 — Authentifizierung

**Ursprüngliche Anforderung:**
> „Das System muss für alle Funktionen eine aktive, authentifizierte Session voraussetzen. Eine anonyme Nutzung ist nicht zulässig."

**Analyse:**

| Element | Inhalt |
|---|---|
| **Wer** | Das System |
| **Modalität** | muss |
| **Konstrukt** | dem Benutzer die Möglichkeit bieten |
| **Verhalten** | Funktionen zu nutzen |
| **Bedingung** | nur wenn eine aktive, authentifizierte Session vorliegt |

**Satzschablone:**
> „Das System muss dem Benutzer die Möglichkeit bieten, Funktionen zu nutzen, **sofern eine aktive, authentifizierte Session vorliegt**. Eine anonyme Nutzung ist ausgeschlossen."

---

## Transformation 2: REQ-STA-01 — Statusanzeige

**Ursprüngliche Anforderung:**
> „Das System muss den aktuellen Bearbeitungsstatus eines Schadensfalls anzeigen. Maximal 60 Minuten Verzögerung."

**Analyse:**

| Element | Inhalt |
|---|---|
| **Wer** | Das System |
| **Modalität** | muss |
| **Konstrukt** | fähig sein |
| **Verhalten** | den aktuellen Bearbeitungsstatus eines Schadensfalls anzuzeigen |
| **Bedingung** | mit einer maximalen Aktualisierungsverzögerung von 60 Minuten |

**Satzschablone:**
> „Das System muss fähig sein, dem angemeldeten Benutzer den aktuellen Bearbeitungsstatus eines Schadensfalls anzuzeigen, **mit einer maximalen Aktualisierungsverzögerung von 60 Minuten**."

---

## Transformation 3: REQ-UPL-01 — Upload-Limit

**Ursprüngliche Anforderung:**
> „Das System muss den Upload einzelner Dateien auf maximal 10 MB begrenzen."

**Analyse:**

| Element | Inhalt |
|---|---|
| **Wer** | Das System |
| **Modalität** | muss |
| **Konstrukt** | in der Lage sein |
| **Verhalten** | den Upload einzelner Dateien zu begrenzen |
| **Bedingung** | auf eine maximale Dateigröße von 10 MB pro Datei |

**Satzschablone:**
> „Das System muss in der Lage sein, den Upload einzelner Dateien **auf eine maximale Dateigröße von 10 MB pro Datei zu begrenzen** und einen Upload, der diesen Grenzwert überschreitet, abzulehnen."

---

## Wiederverwendbarer GenAI-Prompt

```
Du bist ein Experte für Requirements Engineering.
Überführe die folgende Software-Anforderung in eine
formale deutsche Satzschablone nach diesem Muster:

STRUKTUR:
[Wer: Das System / Die Komponente / Der Service]
+ [muss / sollte / wird]
+ [dem Benutzer die Möglichkeit bieten ODER fähig sein
   ODER in der Lage sein]
+ [Verhalten]
+ [Bedingungen / Attribute / Qualitätsmerkmale]

VORGEHENSWEISE:
1. Identifiziere: Wer ist das Subjekt?
2. Wähle die passende Modalität:
   - "muss"   → verbindliche Anforderung (MUST)
   - "sollte" → wünschenswert (SHOULD)
   - "wird"   → geplantes Verhalten (WILL)
3. Wähle das passende Konstrukt:
   - Benutzerinteraktion → "die Möglichkeit bieten"
   - Systemfähigkeit    → "fähig sein"
   - Technische Grenze  → "in der Lage sein"
4. Formuliere das Verhalten als Infinitiv-Phrase.
5. Ergänze alle messbaren Bedingungen/Attribute.

AUSGABE-FORMAT:
- Ursprüngliche Anforderung: [ORIGINAL]
- Analyse (Tabelle): Wer / Modalität / Konstrukt / Verhalten / Bedingung
- Satzschablone: [RESULT]

ANFORDERUNG:
[HIER DEINE ANFORDERUNG EINFÜGEN]
```

---

## Reflexion zur Qualitätsverbesserung

| Aspekt | Vorher | Nachher |
|---|---|---|
| **Eindeutigkeit** | Zwei Sätze, implizite Logik | Ein Satz, explizite Bedingung |
| **Testbarkeit** | „Session voraussetzen" — schwer prüfbar | „sofern Session vorliegt" — binär testbar |
| **Messbarkeit** | „max. 60 Minuten" als Folgesatz | Direkt in Bedingung integriert |
| **Konsistenz** | Unterschiedliche Formulierungen pro Anforderung | Einheitliches Schema über alle Anforderungen |
