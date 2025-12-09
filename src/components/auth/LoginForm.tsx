import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../store/authStore';
import { useConfigStore } from '../../store/configStore';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, mode } = useAuthStore();
  const { freeTrialDays } = useConfigStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: 'facebook' | 'google') => {
    console.log(`${provider} login - Coming soon`);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-brand-teal rounded-full flex items-center justify-center mx-auto mb-4 shadow-teal-glow">
          <span className="text-white font-bold text-xl">SR</span>
        </div>
        <h1 className="text-2xl font-bold text-neumo-text mb-1">
          Welcome to SignRoad
        </h1>
        <p className="text-neumo-text-secondary text-sm">
          {mode === 'consumer' 
            ? 'Your 1,000-step manifestation journey awaits'
            : 'Elevate your team\'s wellness'
          }
        </p>
      </div>
      
      <div className="sr-login-form mx-auto">
        <h2 className="sr-login-heading">Sign In</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="sr-login-field">
            <Mail className="sr-login-icon" />
            <input
              type="email"
              placeholder="Email"
              className="sr-login-input"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="text-red-400 text-xs px-2">{errors.email.message}</p>
          )}
          
          <div className="sr-login-field">
            <Lock className="sr-login-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="sr-login-input"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-brand-teal-light transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-400 text-xs px-2">{errors.password.message}</p>
          )}
          
          <div className="sr-login-btn-group">
            <button
              type="submit"
              className="sr-login-btn-primary flex-1"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Login'}
            </button>
            <button
              type="button"
              className="sr-login-btn-secondary flex-1"
            >
              Sign Up
            </button>
          </div>
          
          <button type="button" className="sr-login-btn-forgot w-full">
            Forgot Password?
          </button>
        </form>
        
        <div className="sr-login-social-group">
          <p className="sr-login-social-divider">or continue with</p>
          
          <button
            type="button"
            onClick={() => handleSocialLogin('facebook')}
            className="sr-login-btn-facebook"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continue with Facebook
          </button>
          
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            className="sr-login-btn-google"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-xs text-neumo-text-muted">
          {mode === 'consumer' && (
            <span className="text-brand-teal font-medium">{freeTrialDays} free steps</span>
          )}
          {mode === 'consumer' && ' to prove it to yourself'}
        </p>
        <p className="text-xs text-neumo-text-muted mt-2">
          By signing in, you agree to our{' '}
          <a href="#" className="text-neumo-text-secondary hover:underline">Terms</a>
          {' '}and{' '}
          <a href="#" className="text-neumo-text-secondary hover:underline">Privacy Policy</a>
        </p>
      </div>
    </motion.div>
  );
};
