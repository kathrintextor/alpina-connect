// FA-10: Statusübersicht aller Meldungen | FA-04: Session-Timeout | FA-05: Logout
// FA-18: Status batch-basiert (täglich) — kein Echtzeit (W-04 entschieden)
import { useState, useEffect, useRef } from 'react'

const SESSION_TIMEOUT_MS = 30 * 60 * 1000 // FA-04: 30 Minuten Inaktivität
const WARNING_BEFORE_MS = 60 * 1000       // Warnung 60s vor Ablauf

export default function DashboardPage({ user, navigate, claims = [] }) {
  const [sessionWarning, setSessionWarning] = useState(false)
  const timeoutRef = useRef(null)
  const warningRef = useRef(null)

  const resetTimer = () => {
    // FA-04: Timer bei jeder Nutzeraktion zurücksetzen
    clearTimeout(timeoutRef.current)
    clearTimeout(warningRef.current)
    setSessionWarning(false)
    warningRef.current = setTimeout(() => setSessionWarning(true), SESSION_TIMEOUT_MS - WARNING_BEFORE_MS)
    timeoutRef.current = setTimeout(() => navigate('login'), SESSION_TIMEOUT_MS)
  }

  useEffect(() => {
    // FA-04: Inaktivitätserkennung auf Maus, Tastatur und Touch
    const events = ['mousemove', 'keydown', 'touchstart', 'click']
    events.forEach(e => window.addEventListener(e, resetTimer))
    resetTimer()
    return () => {
      events.forEach(e => window.removeEventListener(e, resetTimer))
      clearTimeout(timeoutRef.current)
      clearTimeout(warningRef.current)
    }
  }, [])

  // FA-18: Letzte 2 Meldungen aus zentralem State
  const recentClaims = claims.slice(0, 2)

  const statusBadge = (status, color) => {
    const colors = {
      yellow: 'bg-yellow-100 text-yellow-800',
      green: 'bg-green-100 text-green-800',
      blue: 'bg-blue-100 text-blue-800',
      gray: 'bg-gray-100 text-gray-600',
    }
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[color] || colors.gray}`}>
        {status}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav — FA-05: Logout */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            <span className="font-semibold text-gray-900 text-sm">Alpina Connect</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:block">
              {user?.name || 'Anna Muster'}
            </span>
            <button
              onClick={() => navigate('login')}
              className="text-xs text-gray-500 hover:text-gray-700 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label="Abmelden"
            >
              Abmelden
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">

        {/* FA-04: Session-Timeout Warnung */}
        {sessionWarning && (
          <div role="alert" className="bg-yellow-50 border border-yellow-300 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
            <p className="text-sm text-yellow-800">
              Ihre Sitzung läuft in <strong>60 Sekunden</strong> ab. Bitte interagieren Sie, um angemeldet zu bleiben.
            </p>
            <button
              onClick={resetTimer}
              className="shrink-0 text-xs bg-yellow-200 hover:bg-yellow-300 text-yellow-900 font-medium px-3 py-1.5 rounded-lg transition-colors"
            >
              Angemeldet bleiben
            </button>
          </div>
        )}

        {/* Willkommen */}
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Guten Tag, {user?.name?.split(' ')[0] || 'Anna'}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Meine Schadenmeldungen · Alpina Versicherungen AG
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('claimForm')}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-4 text-left transition-colors"
            aria-label="Neue Schadenmeldung erstellen"
          >
            <span className="text-2xl block mb-1">📋</span>
            <span className="font-medium text-sm">Schaden melden</span>
            <p className="text-blue-200 text-xs mt-0.5">Neuen Fall erfassen</p>
          </button>
          <button
            onClick={() => navigate('status')}
            className="bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-4 text-left transition-colors"
            aria-label="Alle Meldungen anzeigen"
          >
            <span className="text-2xl block mb-1">📊</span>
            <span className="font-medium text-sm text-gray-900">Meine Meldungen</span>
            <p className="text-gray-400 text-xs mt-0.5">Status einsehen</p>
          </button>
        </div>

        {/* Letzte Meldungen — FA-10, FA-18 */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Aktuelle Meldungen</h2>
            <span className="text-xs text-gray-400">
              Stand: heute 03:00 Uhr
            </span>
          </div>
          <div className="divide-y divide-gray-100">
            {recentClaims.map(c => (
              <div key={c.id} className="px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{c.type}</p>
                  <p className="text-xs text-gray-400">{c.id} · {c.date}</p>
                </div>
                {statusBadge(c.status, c.statusColor)}
              </div>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-gray-100">
            <button
              onClick={() => navigate('status')}
              className="text-xs text-blue-600 hover:underline"
            >
              Alle Meldungen anzeigen →
            </button>
          </div>
        </div>

        {/* Hinweis */}
        <p className="text-xs text-center text-gray-400">
          Datenhaltung ausschliesslich in der Schweiz · DSG-konform
        </p>
      </main>
    </div>
  )
}
