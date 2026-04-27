import { useState } from 'react';
import './FileUpload.css';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const MAX_SIZE_MB = 10;

export default function FileUpload({ onFilesChange }) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const selected = Array.from(e.target.files);
    const errors = [];
    const valid = [];

    selected.forEach((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        errors.push(`"${file.name}": Ungültiges Format. Erlaubt: JPG, PNG, PDF.`);
      } else if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        errors.push(`"${file.name}": Maximale Dateigrösse: ${MAX_SIZE_MB} MB. Bitte lade ein Foto statt eines Videos hoch.`);
      } else {
        valid.push(file);
      }
    });

    if (errors.length > 0) {
      setError(errors[0]);
    } else {
      setError('');
    }

    const updated = [...files, ...valid];
    setFiles(updated);
    if (onFilesChange) onFilesChange(updated);
    e.target.value = '';
  };

  const removeFile = (index) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    if (onFilesChange) onFilesChange(updated);
  };

  return (
    <div className="file-upload">
      <label className="file-upload-label">
        <span>📎 Dokumente hinzufügen</span>
        <input type="file" accept=".jpg,.jpeg,.png,.pdf" multiple onChange={handleChange} />
      </label>
      <p className="file-hint">Erlaubte Formate: JPG, PNG, PDF — max. 10 MB pro Datei</p>
      {error && <p className="error-msg">{error}</p>}
      {files.length > 0 && (
        <ul className="file-list">
          {files.map((f, i) => (
            <li key={i}>
              <span>📄 {f.name}</span>
              <button type="button" onClick={() => removeFile(i)} className="remove-btn">✕</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
