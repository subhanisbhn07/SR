import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Moon, Briefcase, Sparkles, Heart, Compass } from 'lucide-react';
import { Button } from '../ui/Button';

interface RoadOption {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
}

const roadOptions: RoadOption[] = [
  {
    id: 'sleep',
    title: "I can't sleep",
    subtitle: 'Find peace at night',
    icon: <Moon className="w-6 h-6" />,
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    id: 'burnout',
    title: 'Work stress is burning me out',
    subtitle: 'Reclaim your energy',
    icon: <Briefcase className="w-6 h-6" />,
    gradient: 'from-orange-500 to-red-500',
  },
  {
    id: 'manifest',
    title: "I'm manifesting something big",
    subtitle: 'Attract your dreams',
    icon: <Sparkles className="w-6 h-6" />,
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    id: 'healing',
    title: "I'm healing a relationship",
    subtitle: 'Find forgiveness & peace',
    icon: <Heart className="w-6 h-6" />,
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    id: 'spiritual',
    title: 'I want daily spiritual discipline',
    subtitle: 'Deepen your practice',
    icon: <Compass className="w-6 h-6" />,
    gradient: 'from-teal-500 to-cyan-500',
  },
];

interface ChooseYourRoadProps {
  onComplete: (roadId: string) => void;
  userName?: string;
}

export const ChooseYourRoad: React.FC<ChooseYourRoadProps> = ({ onComplete, userName }) => {
  const [selectedRoad, setSelectedRoad] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedRoad) {
      onComplete(selectedRoad);
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
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
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
      </div>
    </motion.div>
  );
};
