import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <div className="p-8 rounded-2xl bg-surface-card dark:bg-surface-card-dark border border-surface-border-strong dark:border-surface-border-dark-strong text-center relative overflow-hidden shadow-md">
        {/* Animated background orbs */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-teal-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-accent-500 dark:text-accent-400 mr-2" />
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Subscribe to The Inner Signal</h2>
          </div>
          
          <p className="text-neutral-600 dark:text-neutral-300 mb-6">
            Get weekly clarity, in 60 seconds or less
          </p>
          
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-neutral-800/50 border border-neutral-300 dark:border-neutral-600/50 rounded-xl text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <Button type="submit" className="px-6">
                  Subscribe
                </Button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <div className="text-4xl mb-2">✨</div>
              <p className="text-accent-500 dark:text-accent-400 font-medium">Thank you for subscribing!</p>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm">Check your inbox for a welcome message.</p>
            </motion.div>
          )}
          
          <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-4 italic">
            "The only email I actually look forward to." - Sarah M.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
