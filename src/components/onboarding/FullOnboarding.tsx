import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Eye, 
  Flame, 
  Headphones,
  User,
  Target,
  ArrowRight
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useSignsGoalsStore } from '../../store/signsGoalsStore';
import { useLanternStore } from '../../store/lanternStore';
import { NeumoCard } from '../ui/NeumoCard';

interface FullOnboardingProps {
  onComplete: () => void;
}

const TOTAL_STEPS = 6;

const firstSigns = [
  { name: 'White Feather', emoji: '🪶', meaning: 'Angels are near, guiding your path' },
  { name: '11:11', emoji: '🕚', meaning: 'A portal of alignment is opening' },
  { name: 'Butterfly', emoji: '🦋', meaning: 'Transformation is coming' },
  { name: 'Rainbow', emoji: '🌈', meaning: 'Promise of good things ahead' },
  { name: 'Cardinal', emoji: '🐦', meaning: 'A loved one is watching over you' },
];

export const FullOnboarding: React.FC<FullOnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [intention, setIntention] = useState('');
  const [revealedSign, setRevealedSign] = useState<typeof firstSigns[0] | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isPlayingMeditation, setIsPlayingMeditation] = useState(false);
  
  const { updateUser } = useAuthStore();
  const { assignNewSign } = useSignsGoalsStore();
  const { addBrightness } = useLanternStore();

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleRevealSign = () => {
    setIsRevealing(true);
    setTimeout(() => {
      const randomSign = firstSigns[Math.floor(Math.random() * firstSigns.length)];
      setRevealedSign(randomSign);
      setIsRevealing(false);
      assignNewSign();
    }, 2000);
  };

  const handleStartMeditation = () => {
    setIsPlayingMeditation(true);
    setTimeout(() => {
      addBrightness(20);
      onComplete();
    }, 3000);
  };

  const handleComplete = () => {
    if (name) {
      updateUser({ name });
    }
    onComplete();
  };

  const canProceed = () => {
    switch (step) {
      case 1: return true;
      case 2: return name.length >= 1 && name.length <= 50;
      case 3: return intention.length >= 1 && intention.length <= 140;
      case 4: return revealedSign !== null;
      case 5: return true;
      case 6: return true;
      default: return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-neumo bg-brand-teal/20 flex items-center justify-center shadow-neumo">
              <Sparkles className="w-10 h-10 text-brand-teal" />
            </div>
            
            <h1 className="text-2xl font-bold text-neumo-text mb-3">
              Welcome to SignRoad
            </h1>
            <p className="text-neumo-text-secondary mb-6 leading-relaxed">
              The road begins. You'll meditate daily, find signs in your world, 
              and track the magic as it unfolds.
            </p>
            
            <div className="space-y-3 text-left mb-8">
              <div className="flex items-start gap-3 p-3 rounded-neumo bg-neumo-surface shadow-neumo-inset-sm">
                <div className="w-8 h-8 rounded-full bg-brand-teal/20 flex items-center justify-center flex-shrink-0">
                  <Headphones className="w-4 h-4 text-brand-teal" />
                </div>
                <div>
                  <p className="font-medium text-neumo-text text-sm">Daily Meditations</p>
                  <p className="text-xs text-neumo-text-muted">5-9 minute guided sessions</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-neumo bg-neumo-surface shadow-neumo-inset-sm">
                <div className="w-8 h-8 rounded-full bg-brand-teal/20 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-4 h-4 text-brand-teal" />
                </div>
                <div>
                  <p className="font-medium text-neumo-text text-sm">Signs from the Universe</p>
                  <p className="text-xs text-neumo-text-muted">Find and log meaningful synchronicities</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-neumo bg-neumo-surface shadow-neumo-inset-sm">
                <div className="w-8 h-8 rounded-full bg-brand-teal/20 flex items-center justify-center flex-shrink-0">
                  <Flame className="w-4 h-4 text-brand-teal" />
                </div>
                <div>
                  <p className="font-medium text-neumo-text text-sm">Your Living Lantern</p>
                  <p className="text-xs text-neumo-text-muted">Watch your light grow with each practice</p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-neumo bg-brand-teal/20 flex items-center justify-center shadow-neumo">
              <User className="w-8 h-8 text-brand-teal" />
            </div>
            
            <h2 className="text-xl font-bold text-neumo-text mb-2">
              What should we call you?
            </h2>
            <p className="text-sm text-neumo-text-secondary mb-6">
              Your name will appear in your daily messages
            </p>
            
            <div className="mb-6">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 50))}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-neumo bg-neumo-surface shadow-neumo-inset text-neumo-text placeholder-neumo-text-muted focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                autoFocus
              />
              <p className="text-xs text-neumo-text-muted mt-2 text-right">
                {name.length}/50 characters
              </p>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-neumo bg-brand-teal/20 flex items-center justify-center shadow-neumo">
              <Target className="w-8 h-8 text-brand-teal" />
            </div>
            
            <h2 className="text-xl font-bold text-neumo-text mb-2">
              What are you manifesting?
            </h2>
            <p className="text-sm text-neumo-text-secondary mb-6">
              Set your intention for this journey
            </p>
            
            <div className="mb-6">
              <textarea
                value={intention}
                onChange={(e) => setIntention(e.target.value.slice(0, 140))}
                placeholder="I am manifesting..."
                rows={3}
                className="w-full px-4 py-3 rounded-neumo bg-neumo-surface shadow-neumo-inset text-neumo-text placeholder-neumo-text-muted focus:outline-none focus:ring-2 focus:ring-brand-teal/50 resize-none"
                autoFocus
              />
              <p className="text-xs text-neumo-text-muted mt-2 text-right">
                {intention.length}/140 characters
              </p>
            </div>
            
            <div className="text-left p-3 rounded-neumo bg-neumo-surface shadow-neumo-inset-sm">
              <p className="text-xs text-neumo-text-muted">
                <span className="font-medium text-neumo-text">Tip:</span> Be specific. 
                "I am manifesting a promotion at work" is more powerful than "I want success."
              </p>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-neumo bg-brand-teal/20 flex items-center justify-center shadow-neumo">
              <Eye className="w-8 h-8 text-brand-teal" />
            </div>
            
            <h2 className="text-xl font-bold text-neumo-text mb-2">
              Your First Sign Awaits
            </h2>
            <p className="text-sm text-neumo-text-secondary mb-6">
              Every 3 days, a new sign unlocks. The universe will send you signs. 
              Your job is to notice them.
            </p>

            {!revealedSign && !isRevealing && (
              <button
                onClick={handleRevealSign}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-neumo bg-brand-teal text-white font-semibold shadow-neumo-sm hover:shadow-neumo-inset transition-all mb-4"
              >
                <Sparkles className="w-5 h-5" />
                Reveal My Sign
              </button>
            )}

            {isRevealing && (
              <div className="py-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 mx-auto mb-4 rounded-neumo bg-neumo-surface shadow-neumo flex items-center justify-center"
                >
                  <Sparkles className="w-8 h-8 text-brand-teal" />
                </motion.div>
                <p className="text-neumo-text-secondary">The universe is choosing your sign...</p>
              </div>
            )}

            {revealedSign && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-6 rounded-neumo bg-neumo-surface shadow-neumo-inset"
              >
                <span className="text-5xl mb-3 block">{revealedSign.emoji}</span>
                <h3 className="text-lg font-bold text-neumo-text mb-1">
                  Look for: {revealedSign.name}
                </h3>
                <p className="text-sm text-neumo-text-secondary">
                  {revealedSign.meaning}
                </p>
              </motion.div>
            )}
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(234, 179, 8, 0.3)',
                    '0 0 40px rgba(234, 179, 8, 0.5)',
                    '0 0 20px rgba(234, 179, 8, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center"
              >
                <Flame className="w-10 h-10 text-white" />
              </motion.div>
            </div>
            
            <h2 className="text-xl font-bold text-neumo-text mb-2">
              Your Lantern Ignites
            </h2>
            <p className="text-sm text-neumo-text-secondary mb-6">
              Your Lantern represents your spiritual journey. It glows brighter when you 
              meditate and find signs. It dims gently when you rest—but never goes out.
            </p>
            
            <div className="space-y-3 text-left mb-6">
              <div className="flex items-center gap-3 p-3 rounded-neumo bg-neumo-surface shadow-neumo-inset-sm">
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="text-sm text-neumo-text">Meditate daily to keep it bright</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-neumo bg-neumo-surface shadow-neumo-inset-sm">
                <div className="w-3 h-3 rounded-full bg-orange-400" />
                <span className="text-sm text-neumo-text">Log signs to add extra glow</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-neumo bg-neumo-surface shadow-neumo-inset-sm">
                <div className="w-3 h-3 rounded-full bg-amber-600" />
                <span className="text-sm text-neumo-text">Miss a day? No problem—rekindle anytime</span>
              </div>
            </div>
            
            <p className="text-xs text-neumo-text-muted">
              Unlike harsh streak counters, your Lantern is forgiving. 
              It dims but never punishes.
            </p>
          </motion.div>
        );

      case 6:
        return (
          <motion.div
            key="step6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-neumo bg-brand-teal/20 flex items-center justify-center shadow-neumo">
              <Headphones className="w-8 h-8 text-brand-teal" />
            </div>
            
            <h2 className="text-xl font-bold text-neumo-text mb-2">
              Your First Meditation
            </h2>
            <p className="text-sm text-neumo-text-secondary mb-6">
              5 minutes to set your intention and begin your journey
            </p>

            <NeumoCard showBlob={false}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-neumo bg-brand-teal/10 shadow-neumo-sm flex items-center justify-center flex-shrink-0">
                  <Headphones className="w-7 h-7 text-brand-teal" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-neumo-text">Day 1: Setting Your Intention</h3>
                  <p className="text-sm text-neumo-text-secondary">5 min guided session</p>
                </div>
              </div>
              
              {!isPlayingMeditation ? (
                <button
                  onClick={handleStartMeditation}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-neumo bg-brand-teal text-white font-semibold shadow-neumo-sm hover:shadow-neumo-inset transition-all"
                >
                  <Headphones className="w-5 h-5" />
                  Begin Meditation
                </button>
              ) : (
                <div className="py-4">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-12 h-12 mx-auto mb-3 rounded-full bg-brand-teal/20 flex items-center justify-center"
                  >
                    <Headphones className="w-6 h-6 text-brand-teal" />
                  </motion.div>
                  <p className="text-sm text-neumo-text-secondary">Starting your meditation...</p>
                </div>
              )}
            </NeumoCard>

            <div className="mt-6 p-4 rounded-neumo bg-neumo-surface shadow-neumo-inset-sm">
              <h3 className="font-semibold text-neumo-text mb-2 text-sm">Your Day 1 Checklist</h3>
              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 rounded-full bg-brand-teal/20 flex items-center justify-center">
                    <span className="text-xs text-brand-teal">✓</span>
                  </div>
                  <span className="text-neumo-text-secondary">Name set: {name || 'You'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 rounded-full bg-brand-teal/20 flex items-center justify-center">
                    <span className="text-xs text-brand-teal">✓</span>
                  </div>
                  <span className="text-neumo-text-secondary">Intention set</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 rounded-full bg-brand-teal/20 flex items-center justify-center">
                    <span className="text-xs text-brand-teal">✓</span>
                  </div>
                  <span className="text-neumo-text-secondary">Sign revealed: {revealedSign?.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 rounded-full bg-neumo-border flex items-center justify-center">
                    <span className="text-xs text-neumo-text-muted">4</span>
                  </div>
                  <span className="text-neumo-text-muted">Complete first meditation</span>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-neumo-bg overflow-y-auto">
      <div className="min-h-screen flex flex-col px-4 py-6 max-w-md mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => (
              <div
                key={i}
                className={`flex-1 h-1.5 rounded-full transition-colors ${
                  i + 1 <= step ? 'bg-brand-teal' : 'bg-neumo-border'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-neumo-text-muted text-center">
            Step {step} of {TOTAL_STEPS}
          </p>
        </div>

        <div className="flex-1">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>

        <div className="mt-6 space-y-3">
          {step < 6 && (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-neumo font-semibold transition-all ${
                canProceed()
                  ? 'bg-brand-teal text-white shadow-neumo-sm hover:shadow-neumo-inset'
                  : 'bg-neumo-border text-neumo-text-muted cursor-not-allowed'
              }`}
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
          
          {step === 6 && !isPlayingMeditation && (
            <button
              onClick={handleComplete}
              className="w-full text-center text-sm text-neumo-text-muted hover:text-neumo-text transition-colors"
            >
              Skip for now
            </button>
          )}
          
          {step > 1 && step < 6 && (
            <button
              onClick={handleBack}
              className="w-full text-center text-sm text-neumo-text-muted hover:text-neumo-text transition-colors"
            >
              Back
            </button>
          )}
        </div>
        
        <p className="text-xs text-neumo-text-muted text-center mt-4">
          14-day free trial • No credit card required
        </p>
      </div>
    </div>
  );
};
