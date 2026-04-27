import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function TwoFAPage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code !== '123456') {
      setError('Ungültiger Code. Bitte erneut versuchen.');
      return;
    }
    const email = sessionStorage.getItem('pending_email') || '';
    login(email);
    sessionStorage.removeItem('pending_email');
    sessionStorage.removeItem('pending_user');
    navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <div className="card">
        <h1 className="page-title" style={{ fontSize: '1.5rem' }}>Zwei-Faktor-Bestätigung</h1>
        <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', marginBottom: '20px' }}>
          Wir haben einen 6-stelligen Code an Ihre E-Mail-Adresse gesendet. Bitte geben Sie den Code ein, um fortzufahren.
        </p>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>Bestätigungscode</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={e => { setCode(e.target.value.replace(/\D/g, '')); setError(''); }}
              className={error ? 'error' : ''}
              placeholder="123456"
              style={{ letterSpacing: '0.3em', fontSize: '1.2rem' }}
            />
            {error && <p className="error-msg">{error}</p>}
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Bestätigen
          </button>
        </form>
        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-light)', marginTop: '16px' }}>
          Keinen Code erhalten?{' '}
          <button
            type="button"
            onClick={() => setError('')}
            style={{ background: 'none', border: 'none', color: 'var(--primary-light)', cursor: 'pointer', fontSize: '0.85rem', textDecoration: 'underline' }}
          >
            Erneut senden
          </button>
        </p>
      </div>
    </div>
  );
}
