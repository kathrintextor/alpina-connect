import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ vorname: '', nachname: '', email: '', passwort: '', datenschutz: false });
  const [errors, setErrors] = useState({});

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const validate = () => {
    const e = {};
    if (!form.vorname) e.vorname = 'Vorname ist erforderlich.';
    if (!form.nachname) e.nachname = 'Nachname ist erforderlich.';
    if (!form.email) e.email = 'E-Mail ist erforderlich.';
    if (!form.passwort || form.passwort.length < 8) e.passwort = 'Passwort muss mindestens 8 Zeichen haben.';
    if (!form.datenschutz) e.datenschutz = 'Bitte stimmen Sie der Datenschutzerklärung zu.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    sessionStorage.setItem('pending_email', form.email);
    sessionStorage.setItem('pending_user', JSON.stringify({ vorname: form.vorname, nachname: form.nachname, email: form.email }));
    navigate('/register/verify');
  };

  return (
    <div className="auth-container">
      <div className="card">
        <h1 className="page-title" style={{ fontSize: '1.5rem' }}>Konto erstellen</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
            <div className="form-group">
              <label>Vorname</label>
              <input value={form.vorname} onChange={e => set('vorname', e.target.value)}
                className={errors.vorname ? 'error' : ''} placeholder="Anna" />
              {errors.vorname && <p className="error-msg">{errors.vorname}</p>}
            </div>
            <div className="form-group">
              <label>Nachname</label>
              <input value={form.nachname} onChange={e => set('nachname', e.target.value)}
                className={errors.nachname ? 'error' : ''} placeholder="Müller" />
              {errors.nachname && <p className="error-msg">{errors.nachname}</p>}
            </div>
          </div>
          <div className="form-group">
            <label>E-Mail-Adresse</label>
            <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
              className={errors.email ? 'error' : ''} placeholder="ihre@email.ch" />
            {errors.email && <p className="error-msg">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>Passwort <span style={{ fontWeight: 400, color: 'var(--text-light)', fontSize: '0.85rem' }}>(min. 8 Zeichen)</span></label>
            <input type="password" value={form.passwort} onChange={e => set('passwort', e.target.value)}
              className={errors.passwort ? 'error' : ''} placeholder="Passwort wählen" />
            {errors.passwort && <p className="error-msg">{errors.passwort}</p>}
          </div>
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontWeight: 400, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.datenschutz} onChange={e => set('datenschutz', e.target.checked)}
                style={{ width: 'auto', marginTop: '3px' }} />
              <span>Ich stimme der <Link to="#">Datenschutzerklärung</Link> zu.</span>
            </label>
            {errors.datenschutz && <p className="error-msg">{errors.datenschutz}</p>}
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Weiter
          </button>
        </form>
        <hr className="divider" />
        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-light)' }}>
          Bereits ein Konto? <Link to="/login">Anmelden</Link>
        </p>
      </div>
    </div>
  );
}
