import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoginForm from '../../components/auth/LoginForm';
import Logo from '../../components/ui/Logo';

const AuthPage: React.FC = () => {
  const { user, loading, error } = useAuth();

  // Show error state if there's a configuration error
  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Logo />
            <h1 className="mt-6 text-3xl font-serif text-neutral-900">
              RE_CLAIM.D CMS
            </h1>
          </div>
          
          <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-600 text-xl">⚠</span>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-neutral-900">Setup Required</h2>
              <p className="text-neutral-600 mb-4">{error}</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                <h3 className="font-medium text-blue-800 mb-2">Quick Setup:</h3>
                <ol className="text-sm text-blue-700 space-y-1">
                  <li>1. Click "Connect to Supabase" button (top right)</li>
                  <li>2. Create/connect your Supabase project</li>
                  <li>3. Run the database migrations</li>
                  <li>4. Return here to sign in</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Logo />
          <h1 className="mt-6 text-3xl font-serif text-neutral-900">
            RE_CLAIM.D CMS
          </h1>
          <p className="mt-2 text-neutral-600">
            Content Management System
          </p>
        </div>
        
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;