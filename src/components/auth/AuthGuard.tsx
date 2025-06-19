import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireEditor?: boolean;
  requireAuthor?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requireAdmin = false,
  requireEditor = false,
  requireAuthor = false,
}) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Setting up your profile...</h2>
          <div className="w-6 h-6 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  // Check role-based permissions
  if (requireAdmin && profile.role !== 'admin') {
    return <Navigate to="/admin" replace />;
  }

  if (requireEditor && !['admin', 'editor'].includes(profile.role)) {
    return <Navigate to="/admin" replace />;
  }

  if (requireAuthor && !['admin', 'editor', 'author'].includes(profile.role)) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;