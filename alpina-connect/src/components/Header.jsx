import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

export default function Header() {
  const { isLoggedIn, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-inner">
        <Link to={isLoggedIn ? '/dashboard' : '/'} className="header-logo">
          <span className="logo-icon">🏔️</span>
          <span className="logo-text">Alpina Connect</span>
        </Link>
        <nav className="header-nav">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard">Meine Schadensfälle</Link>
              <Link to="/claims/new" className="btn btn-primary btn-sm">Schaden melden</Link>
              <span className="header-user">👤 {currentUser?.vorname}</span>
              <button onClick={handleLogout} className="btn btn-secondary btn-sm">Abmelden</button>
            </>
          ) : (
            <>
              <Link to="/login">Anmelden</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Konto erstellen</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
