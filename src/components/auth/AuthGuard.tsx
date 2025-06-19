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
  const { user, profile, loading, error } = useAuth();
  const location = useLocation();

  // Show error state if there's a configuration error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-xl">⚠</span>
          </div>
          <h2 className="text-xl font-semibold mb-2 text-neutral-900">Configuration Error</h2>
          <p className="text-neutral-600 mb-4">{error}</p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left">
            <h3 className="font-medium text-yellow-800 mb-2">Setup Required:</h3>
            <ol className="text-sm text-yellow-700 space-y-1">
              <li>1. Click "Connect to Supabase" in the top right</li>
              <li>2. Set up your Supabase project</li>
              <li>3. Run the database migrations</li>
              <li>4. Refresh this page</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

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