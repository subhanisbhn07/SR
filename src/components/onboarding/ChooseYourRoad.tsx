import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Moon, Briefcase, Sparkles, Heart, Compass } from 'lucide-react';
import { Button } from '../ui/Button';

interface RoadOption {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
  description: string;
}

const roadOptions: RoadOption[] = [
  {
    id: 'sleep',
    title: "I can't sleep",
    subtitle: 'Find peace at night',
    icon: <Moon className="w-6 h-6" />,
    gradient: 'from-indigo-500 to-purple-600',
    description: 'A 7-day journey to restore your natural sleep rhythm and quiet your racing mind.',
  },
  {
    id: 'burnout',
    title: 'Work stress is burning me out',
    subtitle: 'Reclaim your energy',
    icon: <Briefcase className="w-6 h-6" />,
    gradient: 'from-orange-500 to-red-500',
    description: 'Daily micro-sessions designed for busy professionals who need calm in the chaos.',
  },
  {
    id: 'manifest',
    title: "I'm manifesting something big",
    subtitle: 'Attract your dreams',
    icon: <Sparkles className="w-6 h-6" />,
    gradient: 'from-yellow-400 to-orange-500',
    description: 'Focused intention-setting and visualization to bring your goals into reality.',
  },
  {
    id: 'healing',
    title: "I'm healing a relationship",
    subtitle: 'Find forgiveness & peace',
    icon: <Heart className="w-6 h-6" />,
    gradient: 'from-pink-500 to-rose-500',
    description: 'Guided sessions to release resentment and open your heart to connection.',
  },
  {
    id: 'spiritual',
    title: 'I want daily spiritual discipline',
    subtitle: 'Deepen your practice',
    icon: <Compass className="w-6 h-6" />,
    gradient: 'from-teal-500 to-cyan-500',
    description: 'A structured path for those seeking consistent spiritual growth and mindfulness.',
  },
];

interface ChooseYourRoadProps {
  onComplete: (roadId: string) => void;
  userName?: string;
}

export const ChooseYourRoad: React.FC<ChooseYourRoadProps> = ({ onComplete, userName }) => {
  const [selectedRoad, setSelectedRoad] = useState<string | null>(null);
  const [step, setStep] = useState<'select' | 'preview'>('select');

  const selectedRoadData = roadOptions.find(r => r.id === selectedRoad);

  const handleContinue = () => {
    if (selectedRoad) {
      if (step === 'select') {
        setStep('preview');
      } else {
        onComplete(selectedRoad);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-neutral-900 overflow-y-auto"
    >
      <div className="min-h-screen flex flex-col px-4 py-8 max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {step === 'select' ? (
            <motion.div
              key="select"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-16 h-16 bg-gradient-to-br from-accent-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
                >
                  <Compass className="w-8 h-8 text-white" />
                </motion.div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  Choose Your Road{userName ? `, ${userName}` : ''}
                </h1>
                <p className="text-neutral-400">
                  What brings you to SignRoad today?
                </p>
              </div>

              <div className="space-y-3 mb-8">
                {roadOptions.map((road, index) => (
                  <motion.button
                    key={road.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => setSelectedRoad(road.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      selectedRoad === road.id
                        ? 'border-accent-500 bg-accent-500/10'
                        : 'border-neutral-700 bg-neutral-800/50 hover:border-neutral-600'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${road.gradient} flex items-center justify-center text-white`}>
                        {road.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{road.title}</h3>
                        <p className="text-sm text-neutral-400">{road.subtitle}</p>
                      </div>
                      {selectedRoad === road.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 rounded-full bg-accent-500 flex items-center justify-center"
                        >
                          <ChevronRight className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="sticky bottom-4">
                <Button
                  onClick={handleContinue}
                  disabled={!selectedRoad}
                  className="w-full"
                  size="lg"
                >
                  Continue
                </Button>
                <p className="text-center text-xs text-neutral-500 mt-3">
                  You can change your road anytime in settings
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex-1 flex flex-col"
            >
              {selectedRoadData && (
                <>
                  <button
                    onClick={() => setStep('select')}
                    className="flex items-center gap-2 text-neutral-400 hover:text-white mb-6 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    <span>Back</span>
                  </button>

                  <div className="flex-1">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedRoadData.gradient} flex items-center justify-center text-white mb-6`}>
                      {selectedRoadData.icon}
                    </div>

                    <h1 className="text-2xl font-bold text-white mb-2">
                      {selectedRoadData.title}
                    </h1>
                    <p className="text-neutral-300 mb-6">
                      {selectedRoadData.description}
                    </p>

                    <div className="bg-neutral-800/50 rounded-xl p-4 mb-6">
                      <h3 className="font-semibold text-white mb-3">Your 7-Day Free Preview</h3>
                      <div className="space-y-2">
                        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                          <div key={day} className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              day === 1 ? 'bg-accent-500 text-white' : 'bg-neutral-700 text-neutral-400'
                            }`}>
                              {day}
                            </div>
                            <span className={day === 1 ? 'text-white' : 'text-neutral-500'}>
                              {day === 1 ? 'Start here today' : `Day ${day}`}
                            </span>
                            {day === 7 && (
                              <span className="ml-auto text-xs text-accent-400">Free trial ends</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-accent-500/20 to-purple-500/20 rounded-xl p-4 border border-accent-500/30">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-accent-400 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-white">Today's Sign Challenge</h4>
                          <p className="text-sm text-neutral-300">
                            Look for a white feather today. When you see it, log it in the app.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sticky bottom-4 mt-6">
                    <Button
                      onClick={handleContinue}
                      className="w-full"
                      size="lg"
                    >
                      Begin My Road
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
