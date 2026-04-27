import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FileUpload from '../components/FileUpload';
import { schadensarten } from '../data/mockData';

export default function NewClaimPage() {
  const { isLoggedIn, addClaim } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    art: '',
    datum: '',
    ort: '',
    beschreibung: '',
    policeNummer: '',
  });
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});

  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const validate = () => {
    const e = {};
    if (!form.art) e.art = 'Bitte wählen Sie eine Schadensart.';
    if (!form.datum) e.datum = 'Datum ist erforderlich.';
    if (!form.ort) e.ort = 'Schadenort ist erforderlich.';
    if (!form.beschreibung || form.beschreibung.length < 10) e.beschreibung = 'Beschreibung muss mindestens 10 Zeichen haben.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const newClaim = {
      id: `ALV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      art: form.art,
      datum: form.datum,
      ort: form.ort,
      beschreibung: form.beschreibung,
      status: 'eingegangen',
      dokumente: files.map(f => f.name),
    };

    addClaim(newClaim);
    navigate('/schaden/bestaetigung', { state: { claim: newClaim } });
  };

  return (
    <div className="page-container" style={{ maxWidth: '680px' }}>
      <h1 className="page-title">Neuen Schaden melden</h1>

      <div className="card">
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>Schadensart <span style={{ color: 'var(--danger)' }}>*</span></label>
            <select
              value={form.art}
              onChange={e => set('art', e.target.value)}
              className={errors.art ? 'error' : ''}
            >
              <option value="">Bitte wählen...</option>
              {schadensarten.map(art => (
                <option key={art} value={art}>{art}</option>
              ))}
            </select>
            {errors.art && <p className="error-msg">{errors.art}</p>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
            <div className="form-group">
              <label>Schadendatum <span style={{ color: 'var(--danger)' }}>*</span></label>
              <input
                type="date"
                value={form.datum}
                max={new Date().toISOString().split('T')[0]}
                onChange={e => set('datum', e.target.value)}
                className={errors.datum ? 'error' : ''}
              />
              {errors.datum && <p className="error-msg">{errors.datum}</p>}
            </div>
            <div className="form-group">
              <label>Schadenort <span style={{ color: 'var(--danger)' }}>*</span></label>
              <input
                type="text"
                value={form.ort}
                onChange={e => set('ort', e.target.value)}
                className={errors.ort ? 'error' : ''}
                placeholder="z.B. Zürich, Musterstrasse 5"
              />
              {errors.ort && <p className="error-msg">{errors.ort}</p>}
            </div>
          </div>

          <div className="form-group">
            <label>Versicherungspolice</label>
            <input
              type="text"
              value={form.policeNummer}
              onChange={e => set('policeNummer', e.target.value)}
              placeholder="z.B. POL-2024-00812"
            />
          </div>

          <div className="form-group">
            <label>Schadensbeschreibung <span style={{ color: 'var(--danger)' }}>*</span></label>
            <textarea
              value={form.beschreibung}
              onChange={e => set('beschreibung', e.target.value)}
              className={errors.beschreibung ? 'error' : ''}
              placeholder="Beschreiben Sie den Schaden so genau wie möglich..."
              rows={4}
              style={{ resize: 'vertical' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {errors.beschreibung
                ? <p className="error-msg">{errors.beschreibung}</p>
                : <span />}
              <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{form.beschreibung.length} Zeichen</span>
            </div>
          </div>

          <div className="form-group">
            <label>Dokumente & Fotos</label>
            <FileUpload files={files} onChange={setFiles} />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/dashboard')} style={{ flex: 1 }}>
              Abbrechen
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
              Schaden einreichen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
