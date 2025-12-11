import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../store/authStore';
import { useConfigStore } from '../../store/configStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ThemeToggle } from '../ui/ThemeToggle';

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
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto bg-white dark:bg-neutral-900 rounded-2xl shadow-lg shadow-neutral-200/50 dark:shadow-neutral-900/50 p-6 sm:p-8 border border-neutral-100 dark:border-neutral-800"
    >
      {/* Header with logo and theme toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">SR</span>
          </div>
          <span className="text-lg font-semibold text-teal-600 dark:text-teal-400">SignRoad</span>
        </div>
        <ThemeToggle />
      </div>
      
      {/* Welcome text - more compact */}
      <div className="text-center mb-5">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">
          Welcome Back
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          {mode === 'consumer' 
            ? 'Your 1,000-step manifestation journey awaits'
            : 'Elevate your team\'s wellness journey'
          }
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            icon={<Lock className="w-5 h-5 text-neutral-400" />}
            error={errors.password?.message}
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
            className="absolute right-3 top-9 text-neutral-400 hover:text-neutral-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-neutral-300 dark:border-neutral-600 text-emerald-600 focus:ring-emerald-500 bg-white dark:bg-neutral-800" />
            <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">Remember me</span>
          </label>
          <button type="button" className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300">
            Forgot password?
          </button>
        </div>
        
        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
          size="lg"
        >
          Sign In
        </Button>
        
        <div className="text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Don't have an account?{' '}
            <button type="button" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium">
              Sign up
            </button>
          </p>
        </div>
      </form>
      
      {/* Trial info badge */}
      {mode === 'consumer' && (
        <div className="mt-4 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-sm font-medium rounded-full">
            <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" />
            {freeTrialDays} free steps to prove it to yourself
          </span>
        </div>
      )}
      
      <div className="mt-5 pt-4 border-t border-neutral-200 dark:border-neutral-700">
        <p className="text-xs text-center text-neutral-500 dark:text-neutral-400">
          By signing in, you agree to our{' '}
          <a href="#" className="text-teal-600 dark:text-teal-400 hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-teal-600 dark:text-teal-400 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </motion.div>
  );
};
