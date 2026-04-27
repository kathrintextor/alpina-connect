import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';
import { mockClaims } from '../data/mockData';

const statusSteps = ['eingegangen', 'in_bearbeitung', 'abgeschlossen'];
const statusLabels = { eingegangen: 'Eingegangen', in_bearbeitung: 'In Bearbeitung', abgeschlossen: 'Abgeschlossen' };

export default function ClaimDetailPage() {
  const { id } = useParams();
  const { isLoggedIn, claims } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  const allClaims = [...claims, ...mockClaims];
  const claim = allClaims.find(c => c.id === id);

  if (!claim) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '64px 16px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
        <h1 className="page-title">Schaden nicht gefunden</h1>
        <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>Der gesuchte Schadensfall existiert nicht oder wurde entfernt.</p>
        <Link to="/dashboard" className="btn btn-primary">Zum Dashboard</Link>
      </div>
    );
  }

  const currentStep = statusSteps.indexOf(claim.status);

  return (
    <div className="page-container" style={{ maxWidth: '680px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/dashboard" style={{ color: 'var(--primary-light)', fontSize: '0.9rem', textDecoration: 'none' }}>
          ← Zurück zum Dashboard
        </Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h1 className="page-title" style={{ marginBottom: '4px' }}>{claim.art}</h1>
          <span style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>{claim.id}</span>
        </div>
        <StatusBadge status={claim.status} />
      </div>

      {/* Status-Tracker */}
      <div className="card" style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '1rem', marginBottom: '20px', color: 'var(--text)' }}>Bearbeitungsstatus</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {statusSteps.map((step, idx) => (
            <div key={step} style={{ display: 'flex', alignItems: 'center', flex: idx < statusSteps.length - 1 ? 1 : 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: idx <= currentStep ? 'var(--primary)' : 'var(--border)',
                  color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.85rem', fontWeight: 600, flexShrink: 0
                }}>
                  {idx < currentStep ? '✓' : idx + 1}
                </div>
                <span style={{ fontSize: '0.75rem', color: idx <= currentStep ? 'var(--primary)' : 'var(--text-light)', whiteSpace: 'nowrap', textAlign: 'center' }}>
                  {statusLabels[step]}
                </span>
              </div>
              {idx < statusSteps.length - 1 && (
                <div style={{
                  flex: 1, height: '2px', margin: '0 4px', marginBottom: '18px',
                  background: idx < currentStep ? 'var(--primary)' : 'var(--border)'
                }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="card" style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '1rem', marginBottom: '16px' }}>Schadendetails</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-light)' }}>Schadensart</p>
            <p style={{ margin: '2px 0 0', fontWeight: 500 }}>{claim.art}</p>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-light)' }}>Datum</p>
            <p style={{ margin: '2px 0 0' }}>{claim.datum}</p>
          </div>
          {claim.ort && (
            <div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-light)' }}>Schadenort</p>
              <p style={{ margin: '2px 0 0' }}>{claim.ort}</p>
            </div>
          )}
          {claim.betrag && (
            <div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-light)' }}>Schadensbetrag</p>
              <p style={{ margin: '2px 0 0' }}>{claim.betrag}</p>
            </div>
          )}
        </div>
        {claim.beschreibung && (
          <div style={{ marginTop: '16px' }}>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-light)' }}>Beschreibung</p>
            <p style={{ margin: '4px 0 0' }}>{claim.beschreibung}</p>
          </div>
        )}
      </div>

      {/* Dokumente */}
      {claim.dokumente && claim.dokumente.length > 0 && (
        <div className="card">
          <h2 style={{ fontSize: '1rem', marginBottom: '12px' }}>Hochgeladene Dokumente</h2>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {claim.dokumente.map((doc, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'var(--bg)', borderRadius: '6px', fontSize: '0.9rem' }}>
                <span>📎</span>
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
