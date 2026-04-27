import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing">
      <section className="hero">
        <div className="hero-content">
          <h1>Schaden melden —<br />einfach, schnell, digital.</h1>
          <p>Mit Alpina Connect melden Sie Schadensfälle in wenigen Minuten — jederzeit und von überall.</p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary hero-btn">Jetzt starten</Link>
            <Link to="/login" className="btn btn-secondary hero-btn">Anmelden</Link>
          </div>
        </div>
        <div className="hero-visual">🏔️</div>
      </section>

      <section className="features page-container">
        <h2>So einfach geht's</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">📋</span>
            <h3>Schaden erfassen</h3>
            <p>Füllen Sie das strukturierte Formular aus — in unter 3 Minuten.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📎</span>
            <h3>Dokumente hochladen</h3>
            <p>Fotos und Belege direkt vom Smartphone — JPG, PNG oder PDF.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔔</span>
            <h3>Status verfolgen</h3>
            <p>Sehen Sie jederzeit, was mit Ihrem Schadensfall passiert.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
