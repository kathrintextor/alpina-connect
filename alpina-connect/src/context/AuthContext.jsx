import { createContext, useContext, useState } from 'react';
import { mockUser } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [claims, setClaims] = useState([]);

  const login = (email) => {
    setCurrentUser({ ...mockUser, email });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addClaim = (claim) => {
    setClaims((prev) => [claim, ...prev]);
  };

  return (
    <AuthContext.Provider value={{ currentUser, isLoggedIn: !!currentUser, login, logout, claims, addClaim }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
