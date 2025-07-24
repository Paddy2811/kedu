import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/auth.hooks';

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading while checking auth
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand" />
        <span style={{ marginLeft: 16, color: 'hsl(var(--brand))', fontWeight: 500 }}>Đang kiểm tra đăng nhập...</span>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render children
  return children;
}

export function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  // Show loading while checking auth
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand" />
        <span style={{ marginLeft: 16, color: 'hsl(var(--brand))', fontWeight: 500 }}>Đang kiểm tra đăng nhập...</span>
      </div>
    );
  }

  // If authenticated, redirect to home
  if (user) {
    return <Navigate to="/" replace />;
  }

  // If not authenticated, render children
  return children;
} 