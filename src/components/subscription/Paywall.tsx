import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Sparkles, Lock, Crown } from 'lucide-react';
import { useSubscriptionStore, PRICING, formatPrice, FREE_CONTENT_LIMIT } from '../../store/subscriptionStore';

interface PaywallProps {
  isOpen: boolean;
  onClose: () => void;
  dayNumber?: number;
  featureName?: string;
}

export const Paywall: React.FC<PaywallProps> = ({
  isOpen,
  onClose,
  dayNumber,
  featureName,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    subscription,
    startFreeTrial,
    createCheckoutSession,
    handlePaymentSuccess,
    getDaysRemainingInTrial,
    freeTrialDays,
  } = useSubscriptionStore();

  const isTrialAvailable = subscription.status === 'free';
  const trialDaysRemaining = getDaysRemainingInTrial();

  const handleStartTrial = () => {
    startFreeTrial();
    onClose();
  };

  const handleSubscribe = async () => {
    setIsProcessing(true);
    try {
      const result = await createCheckoutSession(selectedPlan);
      if (result) {
        // In production, redirect to Stripe checkout
        // For demo, simulate successful payment
        await handlePaymentSuccess(result.sessionId);
        onClose();
      }
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const features = [
    'Full 365-day meditation journey',
    'All 5 transformation roads',
    '12 premium background sounds',
    'Offline meditation downloads',
    'Tribe accountability groups',
    'Priority support',
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
          >
            <X className="w-5 h-5 text-neutral-400" />
          </button>

          {/* Header */}
          <div className="relative px-6 pt-8 pb-6 text-center bg-gradient-to-b from-emerald-900/30 to-transparent">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 mb-4">
              {dayNumber ? (
                <Lock className="w-8 h-8 text-white" />
              ) : (
                <Crown className="w-8 h-8 text-white" />
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">
              {dayNumber 
                ? `Day ${dayNumber} is Premium Content`
                : featureName 
                  ? `${featureName} is a Premium Feature`
                  : 'Unlock Your Full Journey'
              }
            </h2>
            
            <p className="text-neutral-400 text-sm">
              {dayNumber 
                ? `Days 1-${FREE_CONTENT_LIMIT} are free. Upgrade to continue your transformation.`
                : 'Get unlimited access to all meditations and premium features.'
              }
            </p>
          </div>

          {/* Content */}
          <div className="px-6 pb-6">
            {/* Trial option (if available) */}
            {isTrialAvailable && (
              <div className="mb-6">
                <button
                  onClick={handleStartTrial}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 hover:border-emerald-400/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-white font-semibold">Start {freeTrialDays}-Day Free Trial</p>
                      <p className="text-emerald-400 text-sm">No credit card required</p>
                    </div>
                    <Sparkles className="w-6 h-6 text-emerald-400" />
                  </div>
                </button>
                
                <div className="flex items-center gap-4 my-4">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-neutral-500 text-xs">or subscribe now</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>
              </div>
            )}

            {/* Trial remaining notice */}
            {subscription.status === 'trial' && trialDaysRemaining > 0 && (
              <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <p className="text-amber-400 text-sm text-center">
                  {trialDaysRemaining} days remaining in your free trial
                </p>
              </div>
            )}

            {/* Plan selection */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {/* Monthly plan */}
              <button
                onClick={() => setSelectedPlan('monthly')}
                className={`relative p-4 rounded-xl border transition-all ${
                  selectedPlan === 'monthly'
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <p className="text-white font-semibold">{formatPrice(PRICING.monthly.price)}</p>
                <p className="text-neutral-400 text-xs">per month</p>
                {selectedPlan === 'monthly' && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>

              {/* Yearly plan */}
              <button
                onClick={() => setSelectedPlan('yearly')}
                className={`relative p-4 rounded-xl border transition-all ${
                  selectedPlan === 'yearly'
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gold-500 rounded-full">
                  <span className="text-xs font-bold text-neutral-900">SAVE {PRICING.yearly.savings}%</span>
                </div>
                <p className="text-white font-semibold">{formatPrice(PRICING.yearly.price)}</p>
                <p className="text-neutral-400 text-xs">per year</p>
                {selectedPlan === 'yearly' && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            </div>

            {/* Features list */}
            <div className="mb-6 space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span className="text-neutral-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* Subscribe button */}
            <button
              onClick={handleSubscribe}
              disabled={isProcessing}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:from-emerald-400 hover:to-teal-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : `Subscribe for ${formatPrice(PRICING[selectedPlan].price)}/${selectedPlan === 'yearly' ? 'year' : 'month'}`}
            </button>

            {/* Terms */}
            <p className="mt-4 text-center text-neutral-500 text-xs">
              Cancel anytime. By subscribing, you agree to our Terms of Service.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Paywall;
