import { useState, useEffect, useCallback } from 'react';

const ADMIN_SESSION_KEY = 'qaisar_admin_session';
const ADMIN_PASSWORD = '@QaisarPortfolio24*';
const SESSION_DURATION_MS = 2 * 60 * 60 * 1000; // 2 hours

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  // Restore session from sessionStorage on mount
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(ADMIN_SESSION_KEY);
      if (raw) {
        const { expires } = JSON.parse(raw);
        if (Date.now() < expires) {
          setIsAuthenticated(true);
        } else {
          sessionStorage.removeItem(ADMIN_SESSION_KEY);
        }
      }
    } catch {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    }
  }, []);

  const login = useCallback((password) => {
    if (password === ADMIN_PASSWORD) {
      const session = { expires: Date.now() + SESSION_DURATION_MS };
      sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
      setIsAuthenticated(true);
      setError('');
      return true;
    }
    setError('Incorrect password. Please try again.');
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(false);
  }, []);

  const clearError = useCallback(() => setError(''), []);

  return { isAuthenticated, login, logout, error, clearError };
}
