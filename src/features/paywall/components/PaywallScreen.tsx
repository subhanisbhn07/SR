import { motion } from 'framer-motion';
import { Crown, Check, X } from 'lucide-react';
import { useState } from 'react';
import { SubscriptionModal } from '../../subscription/components/SubscriptionModal';
import { useAuthStore } from '../../../store/authStore';

interface PaywallScreenProps {
  onClose: () => void;
  onSubscribe: () => void;
}

export const PaywallScreen = ({ onClose }: PaywallScreenProps) => {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const { subscriptionTier } = useAuthStore();

  const handleUpgradeClick = () => {
    setShowSubscriptionModal(true);
  };

  const handleModalClose = () => {
    setShowSubscriptionModal(false);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl w-full bg-gradient-to-b from-neutral-900 to-neutral-800 rounded-2xl border-2 border-accent-500/30 overflow-hidden"
      >
        {/* Header */}
        <div className="relative p-8 text-center bg-gradient-to-br from-accent-500/20 to-primary-500/20">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-accent-500 rounded-full mb-4"
          >
            <Crown className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-white mb-2">
            You've Completed the Initiation
          </h2>
          <p className="text-lg text-neutral-300">
            The road continues for those who are ready
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Wanderer (Free) */}
            <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700">
              <h3 className="text-xl font-semibold text-white mb-2">Wanderer</h3>
              <div className="text-3xl font-bold text-neutral-400 mb-4">Free</div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-neutral-300">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Days 1-14 access</span>
                </li>
                <li className="flex items-start gap-2 text-neutral-300">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Basic meditation features</span>
                </li>
                <li className="flex items-start gap-2 text-neutral-300">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Sign tracking</span>
                </li>
                <li className="flex items-start gap-2 text-neutral-500">
                  <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Audio mixer locked</span>
                </li>
                <li className="flex items-start gap-2 text-neutral-500">
                  <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Days 15-1000 locked</span>
                </li>
              </ul>
              <button
                onClick={onClose}
                className="w-full mt-6 px-6 py-3 bg-neutral-700 hover:bg-neutral-600 text-white font-semibold rounded-lg transition-colors"
              >
                Continue as Wanderer
              </button>
            </div>

            {/* Seeker (Paid) */}
            <div className="bg-gradient-to-br from-accent-500/20 to-primary-500/20 rounded-xl p-6 border-2 border-accent-500 relative">
              <div className="absolute top-4 right-4 px-3 py-1 bg-accent-500 text-white text-xs font-bold rounded-full">
                RECOMMENDED
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Seeker</h3>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold text-white">$9.99</span>
                <span className="text-neutral-400">/month</span>
              </div>
              <div className="text-sm text-neutral-400 mb-4">or $79.99/year (save 33%)</div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-white">
                  <Check className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
                  <span>All 1000 days unlocked</span>
                </li>
                <li className="flex items-start gap-2 text-white">
                  <Check className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
                  <span>12 ambient audio tracks</span>
                </li>
                <li className="flex items-start gap-2 text-white">
                  <Check className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
                  <span>Full tribe features</span>
                </li>
                <li className="flex items-start gap-2 text-white">
                  <Check className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start gap-2 text-white">
                  <Check className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
                  <span>Exclusive content</span>
                </li>
              </ul>
              <button
                onClick={handleUpgradeClick}
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-accent-500 to-primary-500 hover:from-accent-600 hover:to-primary-600 text-white font-bold rounded-lg transition-all transform hover:scale-105"
              >
                Become a Seeker
              </button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center text-sm text-neutral-400">
            <p className="mb-2">✨ Join 10,000+ seekers on their manifestation journey</p>
            <p>🔒 Cancel anytime • 💳 Secure payment • 🌟 30-day money-back guarantee</p>
          </div>
        </div>
      </motion.div>

      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={handleModalClose}
        currentTier={subscriptionTier}
      />
    </div>
  );
};
