// FA-08: Eingangsbestätigung mit Schadensnummer nach Einreichung
// FA-16: E-Mail-Bestätigung (simuliert)
// FA-09: Verknüpfung mit Versicherungspolice (Mock)
export default function ClaimConfirmPage({ claim, navigate }) {
  const { claimId, schadensart, datum, ort, files } = claim || {}

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4 pt-12">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">

        {/* Erfolgs-Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <span className="text-3xl">✓</span>
        </div>

        <h1 className="text-xl font-semibold text-gray-900 mb-1">Schadenmeldung eingereicht</h1>
        <p className="text-gray-500 text-sm mb-6">
          Ihre Meldung wurde erfolgreich erfasst. Sie erhalten in Kürze eine Bestätigung per E-Mail.
        </p>

        {/* Schadensnummer — FA-08 */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-xs text-blue-600 font-medium mb-1">Ihre Schadensnummer</p>
          <p className="text-2xl font-bold font-mono text-blue-900 tracking-wider">{claimId}</p>
          <p className="text-xs text-blue-500 mt-1">Bitte notieren Sie diese Nummer für Rückfragen.</p>
        </div>

        {/* Zusammenfassung */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-2">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Zusammenfassung</h2>
          {[
            ['Schadensart', schadensart],
            ['Schadensdatum', datum],
            ['Schadenort', ort],
            ['Police', 'POL-2019-445821'],
            ['Dokumente', files?.length > 0 ? `${files.length} Datei(en) hochgeladen` : 'Keine'],
          ].map(([label, val]) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-gray-500">{label}</span>
              <span className="text-gray-900 font-medium text-right ml-4">{val}</span>
            </div>
          ))}
        </div>

        {/* Nächste Schritte */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-left">
          <h2 className="text-xs font-semibold text-yellow-700 mb-2">Nächste Schritte</h2>
          <ul className="text-xs text-yellow-800 space-y-1">
            <li>✉️ E-Mail-Bestätigung folgt innerhalb von 5 Minuten</li>
            <li>🔍 Ihr Fall wird innerhalb von 2 Werktagen geprüft</li>
            <li>📊 Status täglich aktualisiert unter „Meine Meldungen"</li>
            <li>📧 Sie werden per E-Mail über Statusänderungen informiert</li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => navigate('status')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition-colors text-sm"
          >
            Meine Meldungen anzeigen
          </button>
          <button
            onClick={() => navigate('dashboard')}
            className="w-full border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-xl transition-colors text-sm"
          >
            Zurück zum Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
