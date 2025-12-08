import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { getSupabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

export const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { initializeAuth } = useAuthStore();
  const { theme } = useThemeStore();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const handleCallback = async () => {
      const supabase = getSupabase();
      
      if (!supabase) {
        setStatus('error');
        setMessage('Backend not configured. Please configure Supabase in Admin Settings.');
        return;
      }

      try {
        // Get the session from the URL hash
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          setStatus('error');
          setMessage(error.message);
          return;
        }

        if (session) {
          // Initialize auth state with the new session
          await initializeAuth();
          setStatus('success');
          setMessage('Email verified successfully! Redirecting...');
          
          // Redirect to home after a short delay
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          setStatus('error');
          setMessage('No session found. Please try logging in again.');
        }
      } catch (err) {
        setStatus('error');
        setMessage(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    handleCallback();
  }, [navigate, initializeAuth]);

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      theme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-50'
    }`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`max-w-md w-full mx-4 p-8 rounded-2xl text-center ${
          theme === 'dark' 
            ? 'bg-neutral-800 border border-neutral-700' 
            : 'bg-white border border-neutral-200 shadow-lg'
        }`}
      >
        {status === 'loading' && (
          <>
            <Loader2 className={`w-16 h-16 mx-auto mb-4 animate-spin ${
              theme === 'dark' ? 'text-emerald-400' : 'text-emerald-500'
            }`} />
            <h1 className={`text-xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}>
              Processing...
            </h1>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-emerald-500" />
            <h1 className={`text-xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}>
              Success!
            </h1>
          </>
        )}

        {status === 'error' && (
          <>
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
            <h1 className={`text-xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}>
              Verification Failed
            </h1>
          </>
        )}

        <p className={`${
          theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
        }`}>
          {message}
        </p>

        {status === 'error' && (
          <button
            onClick={() => navigate('/login')}
            className="mt-6 px-6 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors"
          >
            Back to Login
          </button>
        )}
      </motion.div>
    </div>
  );
};
