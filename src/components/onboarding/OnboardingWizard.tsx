import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Eye, Headphones, ArrowRight, Check } from 'lucide-react';
import { useSignsGoalsStore } from '../../store/signsGoalsStore';

interface OnboardingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const intentions = [
  { id: 'peace', emoji: '🕊️', label: 'Inner Peace', description: 'Find calm and tranquility' },
  { id: 'abundance', emoji: '💰', label: 'Abundance', description: 'Attract prosperity and opportunities' },
  { id: 'love', emoji: '💝', label: 'Love & Relationships', description: 'Deepen connections' },
  { id: 'confidence', emoji: '💪', label: 'Confidence', description: 'Build self-belief' },
  { id: 'clarity', emoji: '🎯', label: 'Clarity & Focus', description: 'Find direction' },
  { id: 'healing', emoji: '🌱', label: 'Healing', description: 'Release and recover' },
];

const firstSigns = [
  { name: 'White Feather', emoji: '🪶', meaning: 'Angels are near, guiding your path' },
  { name: '11:11', emoji: '🕚', meaning: 'A portal of alignment is opening' },
  { name: 'Butterfly', emoji: '🦋', meaning: 'Transformation is coming' },
  { name: 'Rainbow', emoji: '🌈', meaning: 'Promise of good things ahead' },
  { name: 'Cardinal', emoji: '🐦', meaning: 'A loved one is watching over you' },
];

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [step, setStep] = useState(1);
  const [selectedIntention, setSelectedIntention] = useState<string | null>(null);
  const [revealedSign, setRevealedSign] = useState<typeof firstSigns[0] | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const { assignNewSign } = useSignsGoalsStore();

  const handleIntentionSelect = (intentionId: string) => {
    setSelectedIntention(intentionId);
  };

  const handleRevealSign = () => {
    setIsRevealing(true);
    // Simulate dramatic reveal
    setTimeout(() => {
      const randomSign = firstSigns[Math.floor(Math.random() * firstSigns.length)];
      setRevealedSign(randomSign);
      setIsRevealing(false);
      // Also assign the sign in the store
      assignNewSign();
    }, 2000);
  };

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  const totalSteps = 3;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neumo-text/50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-lg bg-neumo-bg rounded-neumo-lg shadow-neumo-lg overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neumo-border">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-neumo-accent" />
              <span className="font-semibold text-neumo-text">Welcome to SignRoad</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-neumo bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset transition-all"
            >
              <X className="w-4 h-4 text-neumo-text-secondary" />
            </button>
          </div>

          {/* Progress */}
          <div className="px-4 pt-4">
            <div className="flex items-center gap-2 mb-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`flex-1 h-1.5 rounded-full transition-colors ${
                    s <= step ? 'bg-neumo-accent' : 'bg-neumo-border'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-neumo-text-muted text-center">
              Step {step} of {totalSteps}
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {/* Step 1: Intention Selection */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-xl font-bold text-neumo-text mb-2 text-center">
                    What do you want to manifest?
                  </h2>
                  <p className="text-sm text-neumo-text-secondary mb-6 text-center">
                    Choose your primary intention for this journey
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {intentions.map((intention) => (
                      <button
                        key={intention.id}
                        onClick={() => handleIntentionSelect(intention.id)}
                        className={`p-4 rounded-neumo text-left transition-all ${
                          selectedIntention === intention.id
                            ? 'bg-neumo-bg shadow-neumo-inset border-2 border-neumo-accent'
                            : 'bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset'
                        }`}
                      >
                        <span className="text-2xl mb-2 block">{intention.emoji}</span>
                        <h3 className="font-semibold text-neumo-text text-sm">{intention.label}</h3>
                        <p className="text-xs text-neumo-text-muted">{intention.description}</p>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    disabled={!selectedIntention}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-neumo font-semibold transition-all ${
                      selectedIntention
                        ? 'bg-neumo-accent text-white shadow-neumo-sm hover:shadow-neumo-inset'
                        : 'bg-neumo-border text-neumo-text-muted cursor-not-allowed'
                    }`}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {/* Step 2: Sign Reveal */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neumo-bg shadow-neumo flex items-center justify-center">
                    <Eye className="w-8 h-8 text-neumo-accent" />
                  </div>
                  
                  <h2 className="text-xl font-bold text-neumo-text mb-2">
                    Your First Sign Awaits
                  </h2>
                  <p className="text-sm text-neumo-text-secondary mb-6">
                    The universe will send you signs. Your job is to notice them.
                  </p>

                  {!revealedSign && !isRevealing && (
                    <button
                      onClick={handleRevealSign}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-neumo bg-neumo-accent text-white font-semibold shadow-neumo-sm hover:shadow-neumo-inset transition-all mb-4"
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
                        className="w-16 h-16 mx-auto mb-4 rounded-full bg-neumo-bg shadow-neumo flex items-center justify-center"
                      >
                        <Sparkles className="w-8 h-8 text-neumo-accent" />
                      </motion.div>
                      <p className="text-neumo-text-secondary">The universe is choosing your sign...</p>
                    </div>
                  )}

                  {revealedSign && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-6 rounded-neumo bg-neumo-bg shadow-neumo-inset mb-6"
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

                  {revealedSign && (
                    <button
                      onClick={() => setStep(3)}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-neumo bg-neumo-accent text-white font-semibold shadow-neumo-sm hover:shadow-neumo-inset transition-all"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </motion.div>
              )}

              {/* Step 3: First Audio */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neumo-bg shadow-neumo flex items-center justify-center">
                    <Headphones className="w-8 h-8 text-neumo-accent" />
                  </div>
                  
                  <h2 className="text-xl font-bold text-neumo-text mb-2">
                    Your First Audio is Ready
                  </h2>
                  <p className="text-sm text-neumo-text-secondary mb-6">
                    10 minutes to start your manifestation journey
                  </p>

                  <div className="p-4 rounded-neumo bg-neumo-bg shadow-neumo-inset mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-neumo bg-neumo-bg shadow-neumo-sm flex items-center justify-center flex-shrink-0">
                        <Headphones className="w-6 h-6 text-neumo-accent" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-neumo-text">Day 1: Setting Your Intention</h3>
                        <p className="text-sm text-neumo-text-secondary">10 min guided session</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-neumo bg-neumo-bg shadow-neumo mb-6">
                    <h3 className="font-semibold text-neumo-text mb-3 flex items-center gap-2">
                      <Check className="w-4 h-4 text-neumo-accent" />
                      Your Day 1 Checklist
                    </h3>
                    <ul className="text-left text-sm space-y-2">
                      <li className="flex items-center gap-2 text-neumo-text-secondary">
                        <div className="w-5 h-5 rounded-full bg-neumo-accent/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-neumo-accent" />
                        </div>
                        Intention set: {intentions.find(i => i.id === selectedIntention)?.label}
                      </li>
                      <li className="flex items-center gap-2 text-neumo-text-secondary">
                        <div className="w-5 h-5 rounded-full bg-neumo-accent/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-neumo-accent" />
                        </div>
                        Sign revealed: {revealedSign?.name}
                      </li>
                      <li className="flex items-center gap-2 text-neumo-text-secondary">
                        <div className="w-5 h-5 rounded-full bg-neumo-border flex items-center justify-center">
                          <span className="text-xs text-neumo-text-muted">3</span>
                        </div>
                        Listen to your first audio
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={handleComplete}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-neumo bg-neumo-accent text-white font-semibold shadow-neumo-sm hover:shadow-neumo-inset transition-all"
                  >
                    Start My Journey
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  
                  <p className="text-xs text-neumo-text-muted mt-3">
                    You're on Step 1 of your 7-step free trial
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
