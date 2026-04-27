import { useState } from 'react'

// FA-01: Registrierung | FA-02: Login mit E-Mail + Passwort | FA-25: CSRF-Schutz (simuliert)
// FA-23: Kein Zugriff auf personenbezogene Daten ohne Authentifizierung
export default function LoginPage({ onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [mode, setMode] = useState('login') // 'login' | 'register' | 'reset'
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [resetSent, setResetSent] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    // FA-02: Mock-Authentifizierung — in Produktion: SSO-Endpunkt
    if (!email || !password) {
      setError('Bitte E-Mail und Passwort eingeben.') // FA-29: Verständliche Fehlermeldung
      return
    }
    if (!email.includes('@')) {
      setError('Bitte eine gültige E-Mail-Adresse eingeben.')
      return
    }
    if (password.length < 8) {
      setError('Passwort muss mindestens 8 Zeichen lang sein.')
      return
    }
    onSuccess()
  }

  const handleRegister = (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Bitte alle Felder ausfüllen.')
      return
    }
    if (!email.includes('@')) {
      setError('Bitte eine gültige E-Mail-Adresse eingeben.')
      return
    }
    if (password.length < 8) {
      setError('Passwort muss mindestens 8 Zeichen enthalten.')
      return
    }
    // FA-01: Registrierung erfolgreich (Mock)
    setRegisterSuccess(true)
    setTimeout(() => { setMode('login'); setRegisterSuccess(false) }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl mb-4">
            <span className="text-white text-2xl font-bold">A</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Alpina Connect</h1>
          <p className="text-gray-500 text-sm mt-1">Kundenportal · Digitale Schadenmeldung</p>
        </div>

        {/* Tab Switch — hidden in reset mode */}
        {mode !== 'reset' && (
          <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
            <button
              onClick={() => { setMode('login'); setError(''); setResetSent(false) }}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'login' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Anmelden
            </button>
            <button
              onClick={() => { setMode('register'); setError('') }}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'register' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Registrieren
            </button>
          </div>
        )}

        {/* FA-03: Passwort-Reset UI */}
        {mode === 'reset' && (
          <div className="mb-2">
            <button
              onClick={() => { setMode('login'); setError(''); setResetSent(false) }}
              className="text-xs text-blue-600 hover:underline mb-4 block"
            >
              ← Zurück zum Login
            </button>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Passwort zurücksetzen</h2>
            <p className="text-sm text-gray-500 mb-4">
              Geben Sie Ihre E-Mail-Adresse ein. Sie erhalten einen Link, der 30 Minuten gültig ist.
            </p>
            {resetSent ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm">
                ✓ Reset-Link wurde an <strong>{email}</strong> gesendet (simuliert). Bitte prüfen Sie Ihren Posteingang.
                <br /><span className="text-xs text-green-600 mt-1 block">Link läuft nach 30 Minuten ab.</span>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (email && email.includes('@')) setResetSent(true); else setError('Bitte eine gültige E-Mail-Adresse eingeben.') }} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError('') }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="anna.muster@example.ch"
                  aria-required="true"
                />
                {error && <div role="alert" className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
                  Reset-Link senden
                </button>
              </form>
            )}
          </div>
        )}

        {registerSuccess && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            ✓ Registrierung erfolgreich! Sie können sich jetzt anmelden.
          </div>
        )}

        {mode !== 'reset' && <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-Mail-Adresse
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="anna.muster@example.ch"
              autoComplete="email"
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Passwort
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Mindestens 8 Zeichen"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              aria-required="true"
            />
          </div>

          {/* FA-24: Datenschutzerklärung bei Registrierung — DSG-konform (W-09) */}
          {mode === 'register' && (
            <div className="flex items-start gap-2">
              <input
                id="dsg"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded"
                aria-required="true"
              />
              <label htmlFor="dsg" className="text-xs text-gray-600">
                Ich habe die{' '}
                <span className="text-blue-600 underline cursor-pointer">Datenschutzerklärung</span>{' '}
                gelesen und stimme der Verarbeitung meiner Daten gemäss{' '}
                <strong>Schweizer DSG (rev. 2023)</strong> zu.
              </label>
            </div>
          )}

          {error && (
            // FA-29: Fehlermeldung mit konkreter Handlungsanweisung
            <div role="alert" className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors text-sm mt-2"
          >
            {mode === 'login' ? 'Anmelden' : 'Konto erstellen'}
          </button>
        </form>}

        {mode === 'login' && (
          <p className="text-center text-xs text-gray-400 mt-4">
            {/* FA-03: Passwort-Reset per E-Mail */}
            <button onClick={() => { setMode('reset'); setError(''); setResetSent(false) }} className="text-blue-600 hover:underline">
              Passwort vergessen?
            </button>
          </p>
        )}

        <p className="text-center text-xs text-gray-400 mt-6">
          Alpina Versicherungen AG · Daten gespeichert in der Schweiz
        </p>
      </div>
    </div>
  )
}
