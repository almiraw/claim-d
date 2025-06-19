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
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="w-6 h-6 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Setting up your profile...</p>
        </div>
      </div>
    );
  }

  // Check role-based permissions
  if (requireAdmin && profile.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2 text-neutral-900">Access Denied</h2>
          <p className="text-neutral-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  if (requireEditor && !['admin', 'editor'].includes(profile.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2 text-neutral-900">Access Denied</h2>
          <p className="text-neutral-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  if (requireAuthor && !['admin', 'editor', 'author'].includes(profile.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2 text-neutral-900">Access Denied</h2>
          <p className="text-neutral-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;