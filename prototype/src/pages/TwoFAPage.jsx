import { useState } from 'react'

// FA-02: Zwei-Faktor-Authentifizierung (SMS-Code) — Mock: Code 123456
// NFA-05: Alle Daten über TLS übertragen (in Produktion)
export default function TwoFAPage({ onSuccess }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [locked, setLocked] = useState(false)

  const MOCK_CODE = '123456' // FA-02: In Produktion: echter SMS-Code

  const handleSubmit = (e) => {
    e.preventDefault()
    if (locked) return

    // FA-02: Nach 5 Fehlversuchen sperren (15 Min)
    if (attempts >= 4) {
      setLocked(true)
      setError('Konto vorübergehend gesperrt (5 Fehlversuche). Bitte versuchen Sie es in 15 Minuten erneut.')
      return
    }

    if (code !== MOCK_CODE) {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      setError(`Ungültiger Code. Noch ${5 - newAttempts} Versuche.`) // FA-29
      return
    }

    onSuccess({ email: 'anna.muster@example.ch', name: 'Anna Muster' })
  }

  const handleCodeChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6)
    setCode(val)
    setError('')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl mb-4">
            <span className="text-white text-2xl">🔐</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Zwei-Faktor-Authentifizierung</h1>
          <p className="text-gray-500 text-sm mt-2">
            Wir haben einen 6-stelligen Code per SMS an Ihre hinterlegte Nummer gesendet.
          </p>
          <p className="text-xs text-blue-600 mt-1 font-mono bg-blue-50 px-2 py-1 rounded">
            Demo-Code: <strong>123456</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="tfa-code" className="block text-sm font-medium text-gray-700 mb-1">
              SMS-Code
            </label>
            <input
              id="tfa-code"
              type="text"
              inputMode="numeric"
              value={code}
              onChange={handleCodeChange}
              disabled={locked}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg text-center text-2xl font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              placeholder="_ _ _ _ _ _"
              maxLength={6}
              aria-label="6-stelliger SMS-Code"
              aria-required="true"
            />
          </div>

          {error && (
            <div role="alert" className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={code.length !== 6 || locked}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
          >
            Code bestätigen
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
          Keinen Code erhalten?{' '}
          <button className="text-blue-600 hover:underline">Erneut senden</button>
        </p>
      </div>
    </div>
  )
}
