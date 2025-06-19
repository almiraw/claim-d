import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSuccess?: () => void;
  onToggleMode?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onToggleMode }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, loading } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    const result = await signIn(data.email, data.password);
    if (result.success && onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif mb-2">Welcome Back</h2>
        <p className="text-neutral-600">Sign in to access your admin panel</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              className="w-full px-4 py-3 pr-12 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={loading}
          className="flex items-center justify-center"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <LogIn size={20} className="mr-2" />
              Sign In
            </>
          )}
        </Button>
      </form>

      {onToggleMode && (
        <div className="mt-6 text-center">
          <p className="text-neutral-600">
            Don't have an account?{' '}
            <button
              onClick={onToggleMode}
              className="text-neutral-900 hover:text-neutral-700 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginForm;