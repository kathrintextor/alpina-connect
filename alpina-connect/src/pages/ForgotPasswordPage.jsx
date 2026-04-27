import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) { setError('E-Mail ist erforderlich.'); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="auth-container">
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📧</div>
          <h1 className="page-title" style={{ fontSize: '1.5rem' }}>E-Mail gesendet</h1>
          <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>
            Falls ein Konto mit <strong>{email}</strong> existiert, haben wir einen Link zum Zurücksetzen des Passworts gesendet.
          </p>
          <Link to="/login" className="btn btn-primary" style={{ display: 'inline-block' }}>
            Zurück zur Anmeldung
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="card">
        <h1 className="page-title" style={{ fontSize: '1.5rem' }}>Passwort zurücksetzen</h1>
        <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', marginBottom: '20px' }}>
          Geben Sie Ihre E-Mail-Adresse ein. Wir senden Ihnen einen Link zum Zurücksetzen Ihres Passworts.
        </p>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>E-Mail-Adresse</label>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              className={error ? 'error' : ''}
              placeholder="ihre@email.ch"
            />
            {error && <p className="error-msg">{error}</p>}
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Link senden
          </button>
        </form>
        <hr className="divider" />
        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-light)' }}>
          <Link to="/login">Zurück zur Anmeldung</Link>
        </p>
      </div>
    </div>
  );
}
