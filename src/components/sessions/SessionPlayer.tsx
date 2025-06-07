import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, X, Star } from 'lucide-react';
import { WellnessSession } from '../../types';
import { useWellnessStore } from '../../store/wellnessStore';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface SessionPlayerProps {
  session: WellnessSession;
  onClose: () => void;
}

export const SessionPlayer: React.FC<SessionPlayerProps> = ({ session, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [rating, setRating] = useState(0);
  const [showRating, setShowRating] = useState(false);
  
  const { completeSession } = useWellnessStore();
  const { updateStreak } = useAuthStore();
  
  const totalTime = session.duration * 60; // Convert to seconds
  const progress = (currentTime / totalTime) * 100;
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentTime < totalTime) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          if (newTime >= totalTime) {
            setIsPlaying(false);
            setShowRating(true);
            return totalTime;
          }
          return newTime;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, totalTime]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleComplete = () => {
    completeSession(rating);
    updateStreak();
    onClose();
  };
  
  const sessionContent = {
    mindfulness: {
      background: 'from-primary-400 to-primary-600',
      instructions: [
        'Find a comfortable position and close your eyes',
        'Take three deep breaths, inhaling slowly through your nose',
        'Focus on the sensation of your breath',
        'When your mind wanders, gently return to your breath',
        'Continue this practice with compassion for yourself',
      ],
    },
    productivity: {
      background: 'from-secondary-400 to-secondary-600',
      instructions: [
        'Set clear intentions for your work session',
        'Eliminate all distractions from your environment',
        'Break your tasks into manageable chunks',
        'Use the Pomodoro technique: 25 minutes focused work',
        'Take short breaks to maintain peak performance',
      ],
    },
    confidence: {
      background: 'from-accent-400 to-accent-600',
      instructions: [
        'Stand tall and take up space with your posture',
        'Recall three recent accomplishments you\'re proud of',
        'Visualize yourself succeeding in your next challenge',
        'Practice positive self-talk and affirmations',
        'Remember: confidence grows with action',
      ],
    },
    anxiety: {
      background: 'from-success-400 to-success-600',
      instructions: [
        'Acknowledge your anxiety without judgment',
        'Practice the 4-7-8 breathing technique',
        'Ground yourself using the 5-4-3-2-1 method',
        'Challenge anxious thoughts with evidence',
        'Remember: this feeling is temporary and will pass',
      ],
    },
    focus: {
      background: 'from-warning-400 to-warning-600',
      instructions: [
        'Clear your workspace of all distractions',
        'Set a specific goal for this focus session',
        'Use single-tasking: one thing at a time',
        'Practice mindful attention to your current task',
        'Celebrate small wins to maintain motivation',
      ],
    },
    leadership: {
      background: 'from-error-400 to-error-600',
      instructions: [
        'Embody the leader you want to become',
        'Practice active listening in all interactions',
        'Lead by example with your actions',
        'Communicate with clarity and empathy',
        'Inspire others through your authentic presence',
      ],
    },
  };
  
  const content = sessionContent[session.category];
  const currentInstruction = Math.floor((currentTime / totalTime) * content.instructions.length);
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-2xl"
        >
          <Card className="overflow-hidden">
            {/* Header */}
            <div className={`bg-gradient-to-r ${content.background} p-6 text-white`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{session.title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                <motion.div
                  className="bg-white h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(totalTime)}</span>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-8">
              {!showRating ? (
                <div className="text-center space-y-8">
                  <motion.div
                    key={currentInstruction}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold text-neutral-900">
                      Step {Math.min(currentInstruction + 1, content.instructions.length)}
                    </h3>
                    <p className="text-lg text-neutral-700 leading-relaxed">
                      {content.instructions[Math.min(currentInstruction, content.instructions.length - 1)]}
                    </p>
                  </motion.div>
                  
                  {/* Controls */}
                  <div className="flex items-center justify-center space-x-6">
                    <button
                      onClick={() => setCurrentTime(Math.max(0, currentTime - 30))}
                      className="p-3 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors duration-200"
                    >
                      <SkipBack className="w-6 h-6 text-neutral-600" />
                    </button>
                    
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-colors duration-200"
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8" />
                      ) : (
                        <Play className="w-8 h-8" />
                      )}
                    </button>
                    
                    <button
                      onClick={() => setCurrentTime(Math.min(totalTime, currentTime + 30))}
                      className="p-3 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors duration-200"
                    >
                      <SkipForward className="w-6 h-6 text-neutral-600" />
                    </button>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-neutral-900">Session Complete!</h3>
                  <p className="text-neutral-600">
                    How would you rate this session?
                  </p>
                  
                  <div className="flex items-center justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1"
                      >
                        <Star
                          className={`w-8 h-8 transition-colors duration-200 ${
                            star <= rating
                              ? 'text-warning-500 fill-current'
                              : 'text-neutral-300 hover:text-warning-400'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={onClose}>
                      Skip Rating
                    </Button>
                    <Button onClick={handleComplete} disabled={rating === 0}>
                      Complete Session
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};