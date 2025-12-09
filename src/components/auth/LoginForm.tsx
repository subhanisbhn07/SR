import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../store/authStore';
import { useConfigStore } from '../../store/configStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

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
      className="w-full max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-neumo-bg rounded-neumo-lg flex items-center justify-center mx-auto mb-4 shadow-neumo">
          <span className="text-neumo-text font-bold text-xl">SR</span>
        </div>
        <h1 className="text-3xl font-bold text-neumo-text mb-2">
          Welcome to SignRoad
        </h1>
        <p className="text-neumo-text-secondary">
          {mode === 'consumer' 
            ? 'A 1,000-step manifestation road where the universe sends you signs back'
            : 'Elevate your team\'s wellness with guided manifestation journeys'
          }
        </p>
        <p className="text-sm text-neumo-text-secondary mt-2 font-medium">
          {mode === 'consumer' && `${freeTrialDays} free steps to prove it to yourself`}
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            <input type="checkbox" className="rounded border-neumo-border text-neumo-text-secondary focus:ring-neumo-accent bg-neumo-bg" />
            <span className="ml-2 text-sm text-neumo-text-secondary">Remember me</span>
          </label>
          <button type="button" className="text-sm text-neumo-text-secondary hover:text-neumo-text">
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
          <p className="text-sm text-neumo-text-secondary">
            Don't have an account?{' '}
            <button type="button" className="text-neumo-text hover:text-neumo-text-secondary font-medium">
              Sign up
            </button>
          </p>
        </div>
      </form>
      
      <div className="mt-8 pt-6 border-t border-neumo-border">
        <p className="text-xs text-center text-neumo-text-muted">
          By signing in, you agree to our{' '}
          <a href="#" className="text-neumo-text-secondary hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-neumo-text-secondary hover:underline">Privacy Policy</a>
        </p>
      </div>
    </motion.div>
  );
};
