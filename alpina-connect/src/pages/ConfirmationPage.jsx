import { useLocation, Link } from 'react-router-dom';

export default function ConfirmationPage() {
  const { state } = useLocation();
  const claim = state?.claim;

  return (
    <div className="page-container" style={{ maxWidth: '600px' }}>
      <div className="card" style={{ textAlign: 'center', padding: '48px 32px' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>✅</div>
        <h1 className="page-title" style={{ color: 'var(--success)' }}>Schaden erfolgreich gemeldet</h1>
        <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>
          Ihr Schadensfall wurde eingereicht und wird von unserem Team bearbeitet.
        </p>

        {claim && (
          <div style={{
            background: 'var(--bg)',
            borderRadius: 'var(--radius)',
            padding: '20px',
            marginBottom: '28px',
            textAlign: 'left'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-light)' }}>Schadennummer</p>
                <p style={{ margin: '2px 0 0', fontWeight: 600, color: 'var(--primary)' }}>{claim.id}</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-light)' }}>Schadensart</p>
                <p style={{ margin: '2px 0 0', fontWeight: 500 }}>{claim.art}</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-light)' }}>Datum</p>
                <p style={{ margin: '2px 0 0' }}>{claim.datum}</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-light)' }}>Status</p>
                <p style={{ margin: '2px 0 0', color: 'var(--warning)', fontWeight: 500 }}>Eingegangen</p>
              </div>
            </div>
          </div>
        )}

        <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '28px' }}>
          Sie erhalten eine Bestätigung per E-Mail. Den aktuellen Status können Sie jederzeit in Ihrem Dashboard einsehen.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {claim && (
            <Link to={`/schaden/${claim.id}`} className="btn btn-secondary">
              Details ansehen
            </Link>
          )}
          <Link to="/dashboard" className="btn btn-primary">
            Zum Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
