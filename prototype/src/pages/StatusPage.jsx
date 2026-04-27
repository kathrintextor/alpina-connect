import { useState } from 'react'

// FA-10: Statusübersicht aller eigenen Meldungen
// FA-18: Statusaktualisierung batch-basiert (täglich) — W-04 entschieden (kein Echtzeit)
// FA-21: Suche nach Schadensnummer (Support-Funktion)
const MOCK_CLAIMS = [
  {
    id: 'ALV-2026-001',
    type: 'Wasserschaden',
    date: '14.04.2026',
    ort: 'Küche, Zürich',
    status: 'In Bearbeitung',
    statusColor: 'yellow',
    lastUpdate: '16.04.2026',
    docs: 2,
  },
  {
    id: 'ALV-2025-089',
    type: 'Glasbruch',
    date: '02.11.2025',
    ort: 'Wohnzimmer, Bern',
    status: 'Abgeschlossen',
    statusColor: 'green',
    lastUpdate: '18.11.2025',
    docs: 1,
  },
  {
    id: 'ALV-2025-044',
    type: 'Einbruch/Diebstahl',
    date: '05.07.2025',
    ort: 'Keller, Basel',
    status: 'Abgeschlossen',
    statusColor: 'green',
    lastUpdate: '22.07.2025',
    docs: 3,
  },
]

const STATUS_COLORS = {
  yellow: 'bg-yellow-100 text-yellow-800',
  green: 'bg-green-100 text-green-800',
  blue: 'bg-blue-100 text-blue-800',
  gray: 'bg-gray-100 text-gray-600',
}

export default function StatusPage({ navigate, claims = MOCK_CLAIMS }) {
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(null)

  const filtered = claims.filter(c =>
    c.id.toLowerCase().includes(search.toLowerCase()) ||
    c.type.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button onClick={() => navigate('dashboard')} className="text-blue-600 hover:underline text-sm">← Dashboard</button>
          <span className="text-sm font-medium text-gray-900">Meine Schadenmeldungen</span>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">

        {/* Batch-Sync Hinweis — FA-18, W-04 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5 flex items-center gap-2">
          <span className="text-blue-500 text-sm">ℹ️</span>
          <p className="text-xs text-blue-700">
            Status wird täglich um 03:00 Uhr aktualisiert.
          </p>
        </div>

        {/* FA-21: Suche nach Schadensnummer */}
        <div>
          <label htmlFor="search" className="sr-only">Schadensnummer suchen</label>
          <input
            id="search"
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Schadensnummer oder Schadensart suchen..."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Meldungsliste */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-8 text-gray-400 text-sm">
              Keine Meldungen gefunden für „{search}"
            </div>
          )}
          {filtered.map(c => (
            <div key={c.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                aria-expanded={expanded === c.id}
              >
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{c.type}</p>
                    <p className="text-xs text-gray-400 font-mono">{c.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[c.statusColor]}`}>
                    {c.status}
                  </span>
                  <span className="text-gray-400 text-xs">{expanded === c.id ? '▲' : '▼'}</span>
                </div>
              </button>

              {/* Detail-View */}
              {expanded === c.id && (
                <div className="border-t border-gray-100 px-4 py-4 space-y-3 bg-gray-50">
                  {[
                    ['Schadensdatum', c.date],
                    ['Schadenort', c.ort],
                    ['Letztes Update', c.lastUpdate],
                    ['Dokumente', `${c.docs} Datei(en) hochgeladen`],
                  ].map(([label, val]) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="text-gray-500 text-xs">{label}</span>
                      <span className="text-gray-900 text-xs font-medium text-right ml-4">{val}</span>
                    </div>
                  ))}

                  {/* Status-Verlauf (Mock) */}
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs font-medium text-gray-500 mb-2">Status-Verlauf</p>
                    <div className="space-y-1.5">
                      {c.status === 'In Bearbeitung' && <>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                          In Bearbeitung — {c.lastUpdate}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span className="w-2 h-2 bg-blue-300 rounded-full"></span>
                          Eingegangen — {c.date}
                        </div>
                      </>}
                      {c.status === 'Abgeschlossen' && <>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                          Abgeschlossen — {c.lastUpdate}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span className="w-2 h-2 bg-blue-300 rounded-full"></span>
                          Eingegangen — {c.date}
                        </div>
                      </>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('claimForm')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors text-sm"
        >
          + Neue Schadenmeldung
        </button>

        <p className="text-xs text-center text-gray-400">
          Alpina Versicherungen AG · Daten gespeichert in der Schweiz
        </p>
      </main>
    </div>
  )
}
