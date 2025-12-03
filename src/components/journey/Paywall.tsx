import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Sparkles, Lock, Shield, Clock } from 'lucide-react';
import { useJourneyStore } from '../../store/journeyStore';

interface PaywallProps {
  onClose: () => void;
}

export const Paywall: React.FC<PaywallProps> = ({ onClose }) => {
  const { becomeSeeker, user } = useJourneyStore();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual' | 'lifetime'>('annual');
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = {
    monthly: {
      price: '$7.99',
      period: '/month',
      description: 'Flexible monthly access',
      savings: null,
    },
    annual: {
      price: '$44.99',
      period: '/year',
      description: 'Best value - Save 53%',
      savings: '53% OFF',
    },
    lifetime: {
      price: '$199.99',
      period: 'one-time',
      description: 'Forever access',
      savings: 'BEST DEAL',
    },
  };

  const features = [
    'Unlock Days 8-365 of the Road',
    'Advanced meditation techniques',
    'Audio Mixer with 12 soundscapes',
    'Universe Receipts for all signs',
    'Tribe challenges & bonuses',
    'Exclusive cosmetic unlocks',
    'Priority support',
  ];

  const handleSubscribe = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    becomeSeeker();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Mystical fog background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-purple-950 to-black">
        {/* Animated fog layers */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10"
        />
        <motion.div
          animate={{
            x: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-l from-amber-500/10 via-transparent to-purple-500/10"
        />
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white/50 hover:text-white transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Content */}
      <div className="relative h-full overflow-y-auto">
        <div className="min-h-full flex flex-col items-center justify-center p-6 py-20">
          {/* Golden gate icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 100 }}
            className="relative mb-8"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 30px rgba(251, 191, 36, 0.3)',
                  '0 0 60px rgba(251, 191, 36, 0.5)',
                  '0 0 30px rgba(251, 191, 36, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center"
            >
              <Lock className="w-12 h-12 text-white" />
            </motion.div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400/30"
              style={{ margin: '-8px' }}
            />
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-3">The Threshold</h1>
            <p className="text-purple-200 max-w-sm mx-auto">
              You've walked the path of the Wanderer. But the road goes on forever. To see what lies
              beyond, you must become a <span className="text-amber-400 font-semibold">Seeker</span>.
            </p>
          </motion.div>

          {/* Plan selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-sm space-y-3 mb-6"
          >
            {(Object.keys(plans) as Array<keyof typeof plans>).map((planKey) => {
              const plan = plans[planKey];
              const isSelected = selectedPlan === planKey;

              return (
                <motion.button
                  key={planKey}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPlan(planKey)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all relative ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500/10'
                      : 'border-white/20 bg-white/5 hover:border-white/40'
                  }`}
                >
                  {plan.savings && (
                    <span
                      className={`absolute -top-2 right-4 px-2 py-0.5 text-xs font-bold rounded-full ${
                        planKey === 'annual'
                          ? 'bg-green-500 text-white'
                          : 'bg-amber-500 text-black'
                      }`}
                    >
                      {plan.savings}
                    </span>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-white font-semibold capitalize">{planKey}</p>
                      <p className="text-purple-300 text-sm">{plan.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold text-xl">{plan.price}</p>
                      <p className="text-purple-300 text-xs">{plan.period}</p>
                    </div>
                  </div>

                  {isSelected && (
                    <motion.div
                      layoutId="selected-plan"
                      className="absolute inset-0 rounded-2xl border-2 border-amber-500"
                      initial={false}
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-sm mb-6"
          >
            <div className="bg-white/5 rounded-2xl p-4">
              <p className="text-white font-semibold mb-3">What you'll unlock:</p>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-purple-200">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Subscribe button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubscribe}
            disabled={isProcessing}
            className="w-full max-w-sm py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-2xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isProcessing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Become a Seeker
              </>
            )}
          </motion.button>

          {/* Guarantees */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-6 mt-6 text-xs text-purple-300"
          >
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              <span>48-hour refund</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Cancel anytime</span>
            </div>
          </motion.div>

          {/* Skip option */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            onClick={onClose}
            className="mt-6 text-purple-400 text-sm hover:text-purple-300 transition-colors"
          >
            Maybe later - Repeat Wanderer's Week
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
