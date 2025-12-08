import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, CheckCircle, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../store/authStore';
import { useConfigStore } from '../../store/configStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ThemeToggle } from '../ui/ThemeToggle';
import { isSupabaseConfigured } from '../../lib/supabase';

interface AuthFormData {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
}

type AuthMode = 'login' | 'signup' | 'forgot-password';

export const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { signIn, signUp, resetPassword, mode, error, clearError } = useAuthStore();
  const { freeTrialDays } = useConfigStore();
  const supabaseConfigured = isSupabaseConfigured();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<AuthFormData>();

  const password = watch('password');

  const switchAuthMode = (newMode: AuthMode) => {
    setAuthMode(newMode);
    setSuccessMessage(null);
    setErrorMessage(null);
    clearError();
    reset();
  };
  
  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    clearError();

    try {
      if (authMode === 'login') {
        const result = await signIn(data.email, data.password);
        if (!result.success) {
          setErrorMessage(result.error || 'Login failed');
        }
      } else if (authMode === 'signup') {
        if (data.password !== data.confirmPassword) {
          setErrorMessage('Passwords do not match');
          setIsLoading(false);
          return;
        }
        const result = await signUp(data.email, data.password, data.name);
        if (result.success) {
          if (result.needsVerification) {
            setSuccessMessage('Check your email for a verification link to complete signup.');
            switchAuthMode('login');
          }
        } else {
          setErrorMessage(result.error || 'Signup failed');
        }
      } else if (authMode === 'forgot-password') {
        const result = await resetPassword(data.email);
        if (result.success) {
          setSuccessMessage('Password reset email sent. Check your inbox.');
          switchAuthMode('login');
        } else {
          setErrorMessage(result.error || 'Failed to send reset email');
        }
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      {/* Theme toggle in top right corner */}
      <div className="flex justify-end mb-4">
        <ThemeToggle />
      </div>
      
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span className="text-white font-bold text-xl">SR</span>
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
          {authMode === 'login' && 'Welcome Back'}
          {authMode === 'signup' && 'Create Account'}
          {authMode === 'forgot-password' && 'Reset Password'}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300">
          {authMode === 'login' && (mode === 'consumer' 
            ? 'A 1,000-step manifestation road where the universe sends you signs back'
            : 'Elevate your team\'s wellness with guided manifestation journeys'
          )}
          {authMode === 'signup' && 'Start your manifestation journey today'}
          {authMode === 'forgot-password' && 'Enter your email to receive a reset link'}
        </p>
        {authMode === 'login' && mode === 'consumer' && (
          <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
            {freeTrialDays} free steps to prove it to yourself
          </p>
        )}
      </div>

      {!supabaseConfigured && (
        <div className="mb-6 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20">
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            <strong>Demo Mode:</strong> Backend not configured. Login will use mock data. Configure Supabase in{' '}
            <a href="/admin/settings" className="underline">Admin Settings</a> for real authentication.
          </p>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-700 dark:text-emerald-300">{successMessage}</p>
        </div>
      )}

      {(errorMessage || error) && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 dark:text-red-300">{errorMessage || error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {authMode === 'signup' && (
          <Input
            label="Name"
            type="text"
            placeholder="Enter your name"
            icon={<User className="w-5 h-5 text-neutral-400" />}
            error={errors.name?.message}
            {...register('name', {
              required: authMode === 'signup' ? 'Name is required' : false,
            })}
          />
        )}

        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          icon={<Mail className="w-5 h-5 text-neutral-400" />}
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        
        {authMode !== 'forgot-password' && (
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              icon={<Lock className="w-5 h-5 text-neutral-400" />}
              error={errors.password?.message}
              {...register('password', {
                required: authMode !== 'forgot-password' ? 'Password is required' : false,
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-neutral-400 hover:text-neutral-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        )}

        {authMode === 'signup' && (
          <div className="relative">
            <Input
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              icon={<Lock className="w-5 h-5 text-neutral-400" />}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: authMode === 'signup' ? 'Please confirm your password' : false,
                validate: (value) => 
                  authMode !== 'signup' || value === password || 'Passwords do not match',
              })}
            />
          </div>
        )}
        
        {authMode === 'login' && (
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-neutral-300 dark:border-neutral-600 text-emerald-600 focus:ring-emerald-500 bg-white dark:bg-neutral-800" />
              <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">Remember me</span>
            </label>
            <button 
              type="button" 
              onClick={() => switchAuthMode('forgot-password')}
              className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
            >
              Forgot password?
            </button>
          </div>
        )}
        
        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
          size="lg"
        >
          {authMode === 'login' && 'Sign In'}
          {authMode === 'signup' && 'Create Account'}
          {authMode === 'forgot-password' && 'Send Reset Link'}
        </Button>
        
        <div className="text-center">
          {authMode === 'login' && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Don't have an account?{' '}
              <button 
                type="button" 
                onClick={() => switchAuthMode('signup')}
                className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium"
              >
                Sign up
              </button>
            </p>
          )}
          {authMode === 'signup' && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Already have an account?{' '}
              <button 
                type="button" 
                onClick={() => switchAuthMode('login')}
                className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium"
              >
                Sign in
              </button>
            </p>
          )}
          {authMode === 'forgot-password' && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Remember your password?{' '}
              <button 
                type="button" 
                onClick={() => switchAuthMode('login')}
                className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </form>
      
      <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
        <p className="text-xs text-center text-neutral-500 dark:text-neutral-400">
          By signing in, you agree to our{' '}
          <a href="#" className="text-emerald-600 dark:text-emerald-400 hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-emerald-600 dark:text-emerald-400 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </motion.div>
  );
};
