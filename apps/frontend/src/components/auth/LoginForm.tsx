import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../store/authStore';
import { useConfigStore } from '../../store/configStore';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onBack?: () => void;
}

/**
 * LoginForm Component (Design System v6.0)
 * Apple-Style Modern Flat Design
 * 
 * This is a daily-use screen, so it uses 100% flat design.
 * Clean surfaces, high-contrast typography, predictable components.
 */
export const LoginForm: React.FC<LoginFormProps> = ({ onBack }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { login, signup, mode } = useAuthStore();
  const { freeTrialDays } = useConfigStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      if (isSignUp) {
        await signup(data.email, data.password);
      } else {
        await login(data.email, data.password);
      }
    } catch (error) {
      console.error('Auth failed:', error);
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
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto px-4"
    >
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to home</span>
        </button>
      )}
      
      {/* Logo and Header - Clean, Apple-style */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-[#0E9A91] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span className="text-white font-bold text-xl">SR</span>
        </div>
        <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight mb-1">
          Welcome to SignRoad
        </h1>
        <p className="text-neutral-500 text-sm">
          {mode === 'consumer' 
            ? 'Your 1,000-step manifestation journey awaits'
            : 'Elevate your team\'s wellness'
          }
        </p>
      </div>
      
      {/* Login Card - Flat design */}
      <Card variant="flat" padding="lg" className="mb-6">
        <h2 className="text-lg font-semibold text-neutral-900 mb-6 text-center">
          {isSignUp ? 'Create Account' : 'Sign In'}
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0E9A91] focus:border-transparent transition-all duration-200"
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
              <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>
            )}
          </div>
          
          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0E9A91] focus:border-transparent transition-all duration-200"
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1.5">{errors.password.message}</p>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="pt-2 space-y-3">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
              size="lg"
            >
              {isLoading ? (isSignUp ? 'Creating account...' : 'Signing in...') : (isSignUp ? 'Create Account' : 'Sign In')}
            </Button>
            
            <Button
              type="button"
              variant="secondary"
              fullWidth
              size="lg"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'Already have an account? Sign In' : 'Create new account'}
            </Button>
          </div>
          
          {!isSignUp && (
            <button 
              type="button" 
              className="w-full text-sm text-neutral-500 hover:text-[#0E9A91] transition-colors duration-200 py-2"
            >
              Forgot Password?
            </button>
          )}
        </form>
        
        {/* Social Login Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white text-neutral-400">or continue with</span>
          </div>
        </div>
        
        {/* Social Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-neutral-700 font-medium hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
          
          <button
            type="button"
            onClick={() => handleSocialLogin('facebook')}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-[#1877F2] rounded-xl text-white font-medium hover:bg-[#166FE5] transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continue with Facebook
          </button>
        </div>
      </Card>
      
      {/* Footer */}
      <div className="text-center">
        <p className="text-sm text-neutral-500">
          {mode === 'consumer' && (
            <>
              <span className="text-[#0E9A91] font-semibold">{freeTrialDays} free steps</span>
              <span> to prove it to yourself</span>
            </>
          )}
        </p>
        <p className="text-xs text-neutral-400 mt-3">
          By signing in, you agree to our{' '}
          <a href="#" className="text-neutral-500 hover:text-[#0E9A91] underline transition-colors">Terms</a>
          {' '}and{' '}
          <a href="#" className="text-neutral-500 hover:text-[#0E9A91] underline transition-colors">Privacy Policy</a>
        </p>
      </div>
    </motion.div>
  );
};
