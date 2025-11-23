import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Crown, Sparkles, Zap } from 'lucide-react';
import { useState } from 'react';
import { SubscriptionTier } from '../../../shared/types/subscription';
import { useAuthStore } from '../../../store/authStore';
import { useToast } from '../../../shared/hooks/useToast';
import { trackEvent } from '../../../shared/analytics/analytics';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: SubscriptionTier;
}

type PaymentMethod = 'card' | 'apple_pay' | 'google_pay';

export const SubscriptionModal = ({ isOpen, onClose, currentTier }: SubscriptionModalProps) => {
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier>(SubscriptionTier.SEEKER);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const { updateSubscriptionTier } = useAuthStore();
  const toast = useToast();

  const handleUpgrade = async () => {
    if (selectedTier === currentTier) {
      toast.info('You are already on this plan!');
      return;
    }

    trackEvent({ name: 'subscription_started', tier: 'SEEKER' });
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update subscription tier
    updateSubscriptionTier(selectedTier);
    
    trackEvent({ 
      name: 'subscription_completed', 
      tier: 'SEEKER', 
      paymentMethod: selectedPayment 
    });
    
    setIsProcessing(false);
    toast.success('🎉 Welcome to SignRoad Seeker! All premium content unlocked.');
    onClose();
  };

  const tiers = [
    {
      id: SubscriptionTier.WANDERER,
      name: 'Wanderer',
      price: 'Free',
      period: '',
      icon: Sparkles,
      color: 'from-neutral-600 to-neutral-700',
      features: [
        '14 days of journey content',
        'Basic meditation scripts',
        'Sign of the Day challenges',
        'Traveler\'s Log journal',
        'Community feed access',
      ],
      isCurrent: currentTier === SubscriptionTier.WANDERER,
    },
    {
      id: SubscriptionTier.SEEKER,
      name: 'Seeker',
      price: '$9.99',
      period: '/month',
      icon: Crown,
      color: 'from-accent-500 to-primary-500',
      features: [
        'Full 365-day journey access',
        'Premium audio ambience mixer',
        'All special events & viral mechanics',
        'Premium cosmetics shop items',
        'Universe Receipt generator',
        'Signal Strength tracking',
        'Twin Flame matching',
        'Priority support',
      ],
      isCurrent: currentTier === SubscriptionTier.SEEKER,
      isRecommended: true,
    },
    {
      id: SubscriptionTier.MASTER,
      name: 'Master',
      price: 'Earned',
      period: '',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      features: [
        'Complete 365-day journey',
        'Hall of Fame recognition',
        'Lifetime access to all content',
        'Exclusive Master badge',
        'Community leadership role',
      ],
      isCurrent: currentTier === SubscriptionTier.MASTER,
      isLocked: true,
    },
  ];

  const paymentMethods = [
    { id: 'card' as PaymentMethod, name: 'Credit / Debit Card', icon: '💳' },
    { id: 'apple_pay' as PaymentMethod, name: 'Apple Pay', icon: '' },
    { id: 'google_pay' as PaymentMethod, name: 'Google Pay', icon: 'G' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="max-w-4xl w-full bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 border-2 border-accent-500/30 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-neutral-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-neutral-400" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Choose Your Path</h2>
              <p className="text-neutral-400">Unlock your full manifestation potential</p>
            </div>

            {/* Tier Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {tiers.map((tier) => {
                const Icon = tier.icon;
                const isSelected = selectedTier === tier.id;
                
                return (
                  <motion.div
                    key={tier.id}
                    whileHover={!tier.isLocked ? { scale: 1.02 } : {}}
                    className={`relative rounded-xl p-6 border-2 transition-all ${
                      isSelected
                        ? 'border-accent-500 bg-accent-500/10'
                        : tier.isCurrent
                        ? 'border-primary-500 bg-primary-500/10'
                        : 'border-neutral-700 bg-neutral-800/50'
                    } ${tier.isLocked ? 'opacity-60' : 'cursor-pointer'}`}
                    onClick={() => !tier.isLocked && setSelectedTier(tier.id)}
                  >
                    {tier.isRecommended && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full text-xs font-bold text-white">
                        RECOMMENDED
                      </div>
                    )}

                    {tier.isCurrent && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary-500 rounded-full text-xs font-bold text-white">
                        CURRENT PLAN
                      </div>
                    )}

                    {tier.isLocked && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-500 rounded-full text-xs font-bold text-white">
                        COMPLETE 365 DAYS
                      </div>
                    )}

                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-white text-center mb-2">{tier.name}</h3>
                    
                    <div className="text-center mb-6">
                      <span className="text-3xl font-bold text-white">{tier.price}</span>
                      <span className="text-neutral-400 text-sm">{tier.period}</span>
                    </div>

                    <ul className="space-y-3">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-neutral-300">
                          <Check className="w-4 h-4 text-accent-500 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>

            {/* Payment Section (only show if Seeker is selected and not current) */}
            {selectedTier === SubscriptionTier.SEEKER && currentTier !== SubscriptionTier.SEEKER && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="border-t border-neutral-700 pt-8"
              >
                <h3 className="text-xl font-bold text-white mb-4">Payment Method</h3>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedPayment === method.id
                          ? 'border-accent-500 bg-accent-500/10'
                          : 'border-neutral-700 bg-neutral-800/50 hover:border-neutral-600'
                      }`}
                    >
                      <div className="text-2xl mb-2">{method.icon}</div>
                      <div className="text-sm text-neutral-300">{method.name}</div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleUpgrade}
                  disabled={isProcessing}
                  className="w-full px-6 py-4 bg-gradient-to-r from-accent-500 to-primary-500 hover:from-accent-600 hover:to-primary-600 disabled:from-neutral-700 disabled:to-neutral-700 text-white font-bold rounded-lg transition-all text-lg"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Processing Payment...
                    </span>
                  ) : (
                    `Upgrade to Seeker - $9.99/month`
                  )}
                </button>

                <p className="text-xs text-center text-neutral-500 mt-4">
                  By upgrading, you agree to our Terms of Service and Privacy Policy. Cancel anytime.
                </p>
              </motion.div>
            )}

            {/* Already on plan message */}
            {selectedTier === currentTier && currentTier !== SubscriptionTier.WANDERER && (
              <div className="border-t border-neutral-700 pt-8">
                <div className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-4 text-center">
                  <p className="text-primary-400 font-semibold">
                    You're already on the {selectedTier === SubscriptionTier.SEEKER ? 'Seeker' : 'Master'} plan!
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
