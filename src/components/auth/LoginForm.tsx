import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, X, ArrowLeft, CheckCircle, User } from 'lucide-react';
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

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type ModalType = 'forgot-password' | 'sign-up' | 'terms' | 'privacy' | null;

const legalContent = {
  terms: {
    title: 'Terms of Service',
    content: `Welcome to SignRoad. By using our service, you agree to these terms.

**Acceptance of Terms**
By accessing SignRoad, you agree to be bound by these Terms of Service and our Privacy Policy.

**Use of Service**
- You must be 13 years or older to use SignRoad
- You are responsible for maintaining the security of your account
- You agree not to misuse our services

**Intellectual Property**
All content is owned by SignRoad and protected by copyright.

**Disclaimer**
SignRoad provides wellness tools but is not a substitute for professional medical advice.`
  },
  privacy: {
    title: 'Privacy Policy',
    content: `SignRoad is committed to protecting your privacy.

**Information We Collect**
- Account information (email, name)
- Usage data (courses completed, mood entries)
- Device information for app optimization

**How We Use Your Information**
- To provide and improve our services
- To personalize your wellness journey
- To send relevant notifications (with your consent)

**Data Security**
We use industry-standard encryption to protect your data.

**Your Rights**
You can request to view, export, or delete your data at any time.`
  }
};

export const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const { login, mode } = useAuthStore();
  const { freeTrialDays } = useConfigStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: signUpErrors },
    watch,
    reset: resetSignUp,
  } = useForm<SignUpFormData>();

  const signUpPassword = watch('password');

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

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotPasswordEmail) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setForgotPasswordSent(true);
  };

  const handleSignUp = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSignUpSuccess(true);
      setTimeout(async () => {
        await login(data.email, data.password);
        setActiveModal(null);
      }, 2000);
    } catch (error) {
      console.error('Sign up failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setForgotPasswordEmail('');
    setForgotPasswordSent(false);
    setSignUpSuccess(false);
    resetSignUp();
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <p key={index} className="font-semibold text-neutral-900 dark:text-white mt-4 mb-2">
            {line.replace(/\*\*/g, '')}
          </p>
        );
      }
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="ml-4 text-neutral-600 dark:text-neutral-300 text-sm">
            {line.substring(2)}
          </li>
        );
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return (
        <p key={index} className="text-neutral-600 dark:text-neutral-300 text-sm">
          {line}
        </p>
      );
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-bold text-xl">SR</span>
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
            Welcome to SignRoad
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300">
            {mode === 'consumer'
              ? 'A 1,000-step manifestation road where the universe sends you signs back'
              : "Elevate your team's wellness with guided manifestation journeys"
            }
          </p>
          <p className="text-sm text-teal-600 dark:text-teal-400 mt-2 font-medium">
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
              className="absolute right-3 top-9 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-neutral-300 dark:border-neutral-600 text-teal-600 focus:ring-teal-500 bg-white dark:bg-neutral-800"
              />
              <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => setActiveModal('forgot-password')}
              className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
            >
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
              <button
                type="button"
                onClick={() => setActiveModal('sign-up')}
                className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors"
              >
                Sign up
              </button>
            </p>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
          <p className="text-xs text-center text-neutral-500 dark:text-neutral-400">
            By signing in, you agree to our{' '}
            <button
              onClick={() => setActiveModal('terms')}
              className="text-teal-600 dark:text-teal-400 hover:underline"
            >
              Terms of Service
            </button>
            {' '}and{' '}
            <button
              onClick={() => setActiveModal('privacy')}
              className="text-teal-600 dark:text-teal-400 hover:underline"
            >
              Privacy Policy
            </button>
          </p>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Forgot Password Modal */}
              {activeModal === 'forgot-password' && (
                <>
                  <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={closeModal}
                        className="p-2 -ml-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5 text-neutral-500" />
                      </button>
                      <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Reset Password</h2>
                    </div>
                  </div>
                  <div className="p-6">
                    {forgotPasswordSent ? (
                      <div className="text-center py-4">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Check your email</h3>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                          We've sent a password reset link to <strong>{forgotPasswordEmail}</strong>
                        </p>
                        <button
                          onClick={closeModal}
                          className="w-full py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-xl transition-colors"
                        >
                          Back to Sign In
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleForgotPassword}>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                          Enter your email address and we'll send you a link to reset your password.
                        </p>
                        <Input
                          label="Email"
                          type="email"
                          placeholder="Enter your email"
                          icon={<Mail className="w-5 h-5 text-neutral-400" />}
                          value={forgotPasswordEmail}
                          onChange={(e) => setForgotPasswordEmail(e.target.value)}
                        />
                        <button
                          type="submit"
                          disabled={!forgotPasswordEmail || isLoading}
                          className="w-full mt-4 py-2.5 bg-teal-500 hover:bg-teal-600 disabled:bg-neutral-300 dark:disabled:bg-neutral-700 text-white font-medium rounded-xl transition-colors disabled:cursor-not-allowed"
                        >
                          {isLoading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                      </form>
                    )}
                  </div>
                </>
              )}

              {/* Sign Up Modal */}
              {activeModal === 'sign-up' && (
                <>
                  <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Create Account</h2>
                      <button
                        onClick={closeModal}
                        className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <X className="w-5 h-5 text-neutral-500" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6 max-h-[60vh] overflow-y-auto">
                    {signUpSuccess ? (
                      <div className="text-center py-4">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Welcome to SignRoad!</h3>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                          Your account has been created. Signing you in...
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmitSignUp(handleSignUp)} className="space-y-4">
                        <Input
                          label="Full Name"
                          type="text"
                          placeholder="Enter your name"
                          icon={<User className="w-5 h-5 text-neutral-400" />}
                          error={signUpErrors.name?.message}
                          {...registerSignUp('name', {
                            required: 'Name is required',
                          })}
                        />
                        <Input
                          label="Email"
                          type="email"
                          placeholder="Enter your email"
                          icon={<Mail className="w-5 h-5 text-neutral-400" />}
                          error={signUpErrors.email?.message}
                          {...registerSignUp('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address',
                            },
                          })}
                        />
                        <Input
                          label="Password"
                          type="password"
                          placeholder="Create a password"
                          icon={<Lock className="w-5 h-5 text-neutral-400" />}
                          error={signUpErrors.password?.message}
                          {...registerSignUp('password', {
                            required: 'Password is required',
                            minLength: {
                              value: 8,
                              message: 'Password must be at least 8 characters',
                            },
                          })}
                        />
                        <Input
                          label="Confirm Password"
                          type="password"
                          placeholder="Confirm your password"
                          icon={<Lock className="w-5 h-5 text-neutral-400" />}
                          error={signUpErrors.confirmPassword?.message}
                          {...registerSignUp('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: (value) =>
                              value === signUpPassword || 'Passwords do not match',
                          })}
                        />
                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2.5 bg-teal-500 hover:bg-teal-600 disabled:bg-neutral-300 dark:disabled:bg-neutral-700 text-white font-medium rounded-xl transition-colors disabled:cursor-not-allowed"
                          >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                          </button>
                        </div>
                        <p className="text-xs text-center text-neutral-500 dark:text-neutral-400 pt-2">
                          By signing up, you agree to our{' '}
                          <button
                            type="button"
                            onClick={() => setActiveModal('terms')}
                            className="text-teal-600 dark:text-teal-400 hover:underline"
                          >
                            Terms
                          </button>
                          {' '}and{' '}
                          <button
                            type="button"
                            onClick={() => setActiveModal('privacy')}
                            className="text-teal-600 dark:text-teal-400 hover:underline"
                          >
                            Privacy Policy
                          </button>
                        </p>
                      </form>
                    )}
                  </div>
                </>
              )}

              {/* Terms/Privacy Modal */}
              {(activeModal === 'terms' || activeModal === 'privacy') && (
                <>
                  <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                        {legalContent[activeModal].title}
                      </h2>
                      <button
                        onClick={closeModal}
                        className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <X className="w-5 h-5 text-neutral-500" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6 max-h-[50vh] overflow-y-auto">
                    {formatContent(legalContent[activeModal].content)}
                  </div>
                  <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
                    <button
                      onClick={closeModal}
                      className="w-full py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-xl transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
