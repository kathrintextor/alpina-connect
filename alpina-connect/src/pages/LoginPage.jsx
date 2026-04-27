import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [passwort, setPasswort] = useState('');
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!email) e.email = 'E-Mail ist erforderlich.';
    if (!passwort) e.passwort = 'Passwort ist erforderlich.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    // Mock: speichert E-Mail für 2FA-Schritt
    sessionStorage.setItem('pending_email', email);
    navigate('/register/verify?mode=login');
  };

  return (
    <div className="auth-container">
      <div className="card">
        <h1 className="page-title" style={{ fontSize: '1.5rem' }}>Anmelden</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>E-Mail-Adresse</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className={errors.email ? 'error' : ''} placeholder="ihre@email.ch" />
            {errors.email && <p className="error-msg">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>Passwort</label>
            <input type="password" value={passwort} onChange={e => setPasswort(e.target.value)}
              className={errors.passwort ? 'error' : ''} placeholder="Passwort" />
            {errors.passwort && <p className="error-msg">{errors.passwort}</p>}
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
            Weiter zur Bestätigung
          </button>
        </form>
        <hr className="divider" />
        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-light)' }}>
          <Link to="/forgot-password">Passwort vergessen?</Link>
          &nbsp;·&nbsp;
          Noch kein Konto? <Link to="/register">Registrieren</Link>
        </p>
      </div>
    </div>
  );
}
