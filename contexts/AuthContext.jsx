import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/services/auth';

import { handleAuthError, handleLogoutError, handleLoginSuccess } from './auth.utils';
import { AuthContext } from './auth.context';

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const DEMO_USERNAME = 'demo';

  // Lắng nghe event clearAuthData để đồng bộ context user
  useEffect(() => {
    function handleAuthCleared() {
      setUser(null);
    }
    window.addEventListener('auth:cleared', handleAuthCleared);
    return () => {
      window.removeEventListener('auth:cleared', handleAuthCleared);
    };
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const response = await authApi.me();
      if (!response.success || !response.data) {
        console.error('Auth check failed: No user data or success false', response);
        setUser(null);
        return;
      }
      setUser(response.data);
    } catch (err) {
      console.error('Auth check error:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Run auth check once on mount
  useEffect(() => {
    const initAuth = async () => {
      const accessToken = localStorage.getItem('access_token');
      
      // Always check token first, regardless of mode
      if (!accessToken) {
        setUser(null);
        setLoading(false);
        return;
      }

      // Try to validate token
      await checkAuth();
    };

    initAuth();
  }, [checkAuth]);

  const login = async (email, password) => {
    // Demo mode: if user enters demo account, skip API auth
    if (email === DEMO_USERNAME) {
      setUser({
        full_name: 'Demo User',
        email: 'demo@example.com',
        avatar: '',
        username: 'demo'
      });
      navigate('/');
      return true;
    }

    try {
      const response = await authApi.login(email, password);
      if (!response.success) throw new Error(response.error);
      setUser(response.data);
      handleLoginSuccess();
      navigate('/');
      return true;
    } catch (error) {
      handleAuthError(error);
      return false;
    }
  };

  const logout = async () => {
    try {
      if (import.meta.env.MODE !== 'development') {
        await authApi.logout();
      }
      setUser(null);
      navigate('/login');
    } catch (error) {
      handleLogoutError(error);
    }
  };

  // Always render the AuthContext.Provider regardless of loading state
  // This ensures consistent hook usage across renders
  const loadingComponent = loading ? (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand" />
      <span style={{ marginLeft: 16, color: 'hsl(var(--brand))', fontWeight: 500 }}>Đang kiểm tra đăng nhập...</span>
    </div>
  ) : null;

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {loading ? loadingComponent : children}
    </AuthContext.Provider>
  );
} 