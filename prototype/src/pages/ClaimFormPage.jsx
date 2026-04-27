import { useState, useRef } from 'react'

// FA-06: Schadenmeldung erfassen (Schadensart, Datum, Ort, Beschreibung)
// FA-07: Vorschau vor Absenden
// FA-08: Schadensnummer nach Einreichung
// FA-11, FA-12, FA-13: Dokumentenupload mit Validierung (max. 10 MB, JPG/PNG/PDF) — W-03 entschieden
// FA-14: Kamera-Upload via Browser-API
// FA-29: Verständliche Fehlermeldungen mit Handlungsanweisung
const SCHADENSARTEN = [
  'Wasserschaden', 'Brandschaden', 'Glasbruch', 'Einbruch/Diebstahl',
  'Sturmschaden', 'Hagelschaden', 'Fahrzeugschaden', 'Andere',
]

const MAX_FILE_SIZE = 10 * 1024 * 1024 // FA-12: 10 MB (W-03)
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'] // FA-12

export default function ClaimFormPage({ navigate, addClaim }) {
  const [step, setStep] = useState(1) // 1=Formular, 2=Vorschau
  const [form, setForm] = useState({
    schadensart: '',
    datum: '',
    ort: '',
    beschreibung: '',
  })
  const [files, setFiles] = useState([])
  const [errors, setErrors] = useState({})
  const [fileError, setFileError] = useState('')
  const fileInputRef = useRef()
  const cameraInputRef = useRef()

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }))
    setErrors(e => ({ ...e, [key]: '' }))
  }

  // FA-12, FA-13: Datei-Validierung mit konkreter Fehlermeldung
  const validateFile = (file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return `„${file.name}": Ungültiges Dateiformat. Bitte lade eine JPG-, PNG- oder PDF-Datei hoch.`
    }
    if (file.size > MAX_FILE_SIZE) {
      const sizeMB = (file.size / 1024 / 1024).toFixed(1)
      return `„${file.name}": Datei ist ${sizeMB} MB gross. Maximale Dateigrösse: 10 MB. Bitte komprimiere die Datei und versuche es erneut.`
    }
    return null
  }

  const handleFiles = (newFiles) => {
    setFileError('')
    const valid = []
    for (const f of newFiles) {
      const err = validateFile(f)
      if (err) { setFileError(err); return }
      valid.push({ file: f, name: f.name, size: (f.size / 1024).toFixed(0) + ' KB' })
    }
    setFiles(prev => [...prev, ...valid])
  }

  const removeFile = (i) => setFiles(f => f.filter((_, idx) => idx !== i))

  // FA-06: Formularvalidierung
  const validate = () => {
    const e = {}
    if (!form.schadensart) e.schadensart = 'Bitte wählen Sie eine Schadensart aus.'
    if (!form.datum) e.datum = 'Bitte geben Sie das Schadensdatum an.'
    if (!form.ort.trim()) e.ort = 'Bitte geben Sie den Schadenort an (z.B. „Küche, Zürich").'
    if (form.beschreibung.trim().length < 20) e.beschreibung = 'Bitte beschreiben Sie den Schaden mit mindestens 20 Zeichen.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = (e) => {
    e.preventDefault()
    if (validate()) setStep(2)
  }

  // FA-08: Einreichung → Schadensnummer generieren + in zentralen State eintragen
  const handleSubmit = () => {
    const claimId = 'ALV-2026-' + String(Math.floor(Math.random() * 900) + 100)
    const today = new Date().toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' })
    addClaim({
      id: claimId,
      type: form.schadensart,
      date: form.datum,
      ort: form.ort,
      status: 'Eingegangen',
      statusColor: 'blue',
      lastUpdate: today,
      docs: files.length,
    })
    navigate('confirm', { ...form, files: files.map(f => f.name), claimId })
  }

  const inputClass = (key) =>
    `w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[key] ? 'border-red-400 bg-red-50' : 'border-gray-300'}`

  if (step === 2) {
    // FA-07: Vorschau vor Absenden
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <button onClick={() => setStep(1)} className="text-blue-600 hover:underline text-sm">← Zurück</button>
            <span className="text-sm font-medium text-gray-900">Vorschau &amp; Bestätigung</span>
          </div>
        </nav>
        <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
            <h2 className="font-semibold text-gray-900">Angaben prüfen</h2>
            {[
              ['Schadensart', form.schadensart],
              ['Schadensdatum', form.datum],
              ['Schadenort', form.ort],
              ['Beschreibung', form.beschreibung],
            ].map(([label, val]) => (
              <div key={label} className="flex gap-3">
                <span className="text-xs text-gray-400 w-28 shrink-0 pt-0.5">{label}</span>
                <span className="text-sm text-gray-900">{val}</span>
              </div>
            ))}
            {files.length > 0 && (
              <div className="flex gap-3">
                <span className="text-xs text-gray-400 w-28 shrink-0 pt-0.5">Dokumente</span>
                <div className="text-sm text-gray-900 space-y-0.5">
                  {files.map((f, i) => <div key={i}>📎 {f.name} ({f.size})</div>)}
                </div>
              </div>
            )}
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
            Mit dem Absenden bestätigen Sie, dass alle Angaben korrekt und vollständig sind.
            Sie erhalten eine E-Mail-Bestätigung mit Ihrer Schadensnummer.
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors"
          >
            Schadenmeldung einreichen →
          </button>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button onClick={() => navigate('dashboard')} className="text-blue-600 hover:underline text-sm">← Dashboard</button>
          <span className="text-sm font-medium text-gray-900">Neue Schadenmeldung</span>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <form onSubmit={handleNext} className="space-y-5" noValidate>

          {/* FA-06: Schadensart */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
            <h2 className="font-semibold text-gray-900 text-sm">Schadensdetails</h2>

            <div>
              <label htmlFor="schadensart" className="block text-sm font-medium text-gray-700 mb-1">
                Schadensart <span className="text-red-500">*</span>
              </label>
              <select
                id="schadensart"
                value={form.schadensart}
                onChange={e => set('schadensart', e.target.value)}
                className={inputClass('schadensart')}
                aria-required="true"
                aria-describedby={errors.schadensart ? 'err-schadensart' : undefined}
              >
                <option value="">Bitte wählen...</option>
                {SCHADENSARTEN.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.schadensart && <p id="err-schadensart" role="alert" className="mt-1 text-xs text-red-600">{errors.schadensart}</p>}
            </div>

            <div>
              <label htmlFor="datum" className="block text-sm font-medium text-gray-700 mb-1">
                Schadensdatum <span className="text-red-500">*</span>
              </label>
              <input
                id="datum"
                type="date"
                value={form.datum}
                max={new Date().toISOString().split('T')[0]}
                onChange={e => set('datum', e.target.value)}
                className={inputClass('datum')}
                aria-required="true"
              />
              {errors.datum && <p role="alert" className="mt-1 text-xs text-red-600">{errors.datum}</p>}
            </div>

            <div>
              <label htmlFor="ort" className="block text-sm font-medium text-gray-700 mb-1">
                Schadenort <span className="text-red-500">*</span>
              </label>
              <input
                id="ort"
                type="text"
                value={form.ort}
                onChange={e => set('ort', e.target.value)}
                className={inputClass('ort')}
                placeholder="z.B. Wohnzimmer, Musterstrasse 1, Zürich"
                aria-required="true"
              />
              {errors.ort && <p role="alert" className="mt-1 text-xs text-red-600">{errors.ort}</p>}
            </div>

            <div>
              <label htmlFor="beschreibung" className="block text-sm font-medium text-gray-700 mb-1">
                Schadensbeschreibung <span className="text-red-500">*</span>
              </label>
              <textarea
                id="beschreibung"
                value={form.beschreibung}
                onChange={e => set('beschreibung', e.target.value)}
                className={`${inputClass('beschreibung')} resize-none`}
                rows={4}
                placeholder="Beschreiben Sie den Schaden so genau wie möglich (was, wie, wann, Ausmass)..."
                aria-required="true"
              />
              <p className="text-xs text-gray-400 mt-0.5">{form.beschreibung.length} Zeichen (mind. 20)</p>
              {errors.beschreibung && <p role="alert" className="mt-1 text-xs text-red-600">{errors.beschreibung}</p>}
            </div>
          </div>

          {/* FA-11, FA-12, FA-14: Dokumentenupload */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
            <h2 className="font-semibold text-gray-900 text-sm">Dokumente hochladen (optional)</h2>
            <p className="text-xs text-gray-500">JPG, PNG oder PDF · Max. 10 MB pro Datei</p>

            <div className="flex gap-2">
              {/* FA-11: Datei-Upload */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-lg py-3 text-sm text-gray-500 hover:text-blue-600 transition-colors"
              >
                📁 Datei auswählen
              </button>
              {/* FA-14: Kamera-Upload (Browser-API) */}
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="flex-1 border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-lg py-3 text-sm text-gray-500 hover:text-blue-600 transition-colors"
              >
                📷 Foto aufnehmen
              </button>
            </div>

            <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.pdf" multiple className="hidden"
              onChange={e => handleFiles(Array.from(e.target.files))} />
            {/* FA-14: capture="environment" für direkte Kameranutzung auf Mobilgeräten */}
            <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden"
              onChange={e => handleFiles(Array.from(e.target.files))} />

            {/* FA-13: Fehlermeldung mit konkreter Handlungsanweisung */}
            {fileError && (
              <div role="alert" className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs">
                {fileError}
              </div>
            )}

            {files.length > 0 && (
              <ul className="space-y-1.5">
                {files.map((f, i) => (
                  <li key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                    <span className="text-xs text-gray-700">📎 {f.name} <span className="text-gray-400">({f.size})</span></span>
                    <button type="button" onClick={() => removeFile(i)} className="text-xs text-red-400 hover:text-red-600 ml-2">
                      Entfernen
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors"
          >
            Weiter zur Vorschau →
          </button>
        </form>
      </main>
    </div>
  )
}
