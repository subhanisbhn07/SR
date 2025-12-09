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
      <div className="p-8 rounded-neumo-lg bg-neumo-bg shadow-neumo text-center relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-neumo-text-secondary mr-2" />
            <h2 className="text-2xl font-bold text-neumo-text">Subscribe to The Inner Signal</h2>
          </div>
          
          <p className="text-neumo-text-secondary mb-6">
            Get weekly clarity, in 60 seconds or less
          </p>
          
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neumo-text-muted" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-neumo-bg shadow-neumo-inset-sm rounded-neumo text-neumo-text placeholder-neumo-text-muted focus:outline-none transition-all duration-200"
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
              <p className="text-neumo-text-secondary font-medium">Thank you for subscribing!</p>
              <p className="text-neumo-text-secondary text-sm">Check your inbox for a welcome message.</p>
            </motion.div>
          )}
          
          <p className="text-neumo-text-muted text-sm mt-4 italic">
            "The only email I actually look forward to." - Sarah M.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
