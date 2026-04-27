import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import TwoFAPage from './pages/TwoFAPage'
import DashboardPage from './pages/DashboardPage'
import ClaimFormPage from './pages/ClaimFormPage'
import ClaimConfirmPage from './pages/ClaimConfirmPage'
import StatusPage from './pages/StatusPage'

// FA-02: Zentrales Routing — alle Seiten über Auth-State gesteuert
// FA-10, FA-18: Zentraler Claims-State — neue Meldungen erscheinen sofort in der Liste
const INITIAL_CLAIMS = [
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

export default function App() {
  const [page, setPage] = useState('login')
  const [user, setUser] = useState(null)
  const [submittedClaim, setSubmittedClaim] = useState(null)
  const [claims, setClaims] = useState(INITIAL_CLAIMS)

  const addClaim = (newClaim) => {
    setClaims(prev => [newClaim, ...prev])
  }

  const navigate = (target, data = null) => {
    if (target === 'confirm' && data) setSubmittedClaim(data)
    setPage(target)
  }

  if (page === 'login') return <LoginPage onSuccess={() => setPage('2fa')} />
  if (page === '2fa') return <TwoFAPage onSuccess={(u) => { setUser(u); setPage('dashboard') }} />
  if (page === 'dashboard') return <DashboardPage user={user} navigate={navigate} claims={claims} />
  if (page === 'claimForm') return <ClaimFormPage navigate={navigate} addClaim={addClaim} />
  if (page === 'confirm') return <ClaimConfirmPage claim={submittedClaim} navigate={navigate} />
  if (page === 'status') return <StatusPage navigate={navigate} claims={claims} />
  return null
}
