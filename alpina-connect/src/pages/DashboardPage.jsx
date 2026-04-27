import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';
import { mockClaims } from '../data/mockData';

export default function DashboardPage() {
  const { currentUser, isLoggedIn, claims } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  const allClaims = [...claims, ...mockClaims];

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
        <div>
          <h1 className="page-title">Meine Schäden</h1>
          <p style={{ color: 'var(--text-light)', marginTop: '4px' }}>
            Willkommen, {currentUser?.vorname} {currentUser?.nachname}
          </p>
        </div>
        <Link to="/schaden/neu" className="btn btn-primary">
          + Neuen Schaden melden
        </Link>
      </div>

      {allClaims.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📋</div>
          <h2 style={{ color: 'var(--text-light)', fontWeight: 400 }}>Noch keine Schäden gemeldet</h2>
          <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>Melden Sie Ihren ersten Schadensfall in wenigen Minuten.</p>
          <Link to="/schaden/neu" className="btn btn-primary">Jetzt Schaden melden</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {allClaims.map(claim => (
            <Link
              key={claim.id}
              to={`/schaden/${claim.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="card claim-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{claim.id}</span>
                      <StatusBadge status={claim.status} />
                    </div>
                    <p style={{ margin: 0, fontWeight: 500, color: 'var(--text)' }}>{claim.art}</p>
                    <p style={{ margin: '2px 0 0', fontSize: '0.85rem', color: 'var(--text-light)' }}>{claim.datum}</p>
                  </div>
                  <span style={{ color: 'var(--primary-light)', fontSize: '1.2rem' }}>›</span>
                </div>
                {claim.beschreibung && (
                  <p style={{ margin: '8px 0 0', fontSize: '0.9rem', color: 'var(--text-light)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {claim.beschreibung}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
