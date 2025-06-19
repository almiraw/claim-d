import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoginForm from '../../components/auth/LoginForm';
import SignUpForm from '../../components/auth/SignUpForm';
import Logo from '../../components/ui/Logo';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
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
            Content Management System
          </h1>
        </div>
        
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          {isLogin ? (
            <LoginForm onToggleMode={() => setIsLogin(false)} />
          ) : (
            <SignUpForm onToggleMode={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;