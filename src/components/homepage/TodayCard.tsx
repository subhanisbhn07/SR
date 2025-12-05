import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Check, Sparkles, Eye, Clock, Flame } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useConfigStore } from '../../store/configStore';
import { useSignsGoalsStore } from '../../store/signsGoalsStore';
import { LanternIcon } from '../ui/LanternIcon';

interface TodayCardProps {
  onStartSession?: () => void;
}

export const TodayCard: React.FC<TodayCardProps> = ({ onStartSession }) => {
  const { user, selectedRoad } = useAuthStore();
  const { freeTrialDays } = useConfigStore();
  const { activeSigns, assignInitialSigns, markSignFound } = useSignsGoalsStore();
  const [signLogged, setSignLogged] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [showReward, setShowReward] = useState(false);

  // Initialize signs on first load
  useEffect(() => {
    assignInitialSigns();
  }, [assignInitialSigns]);

  // Get the first active sign to display
  const todaySign = activeSigns.length > 0 
    ? { id: activeSigns[0].id, challenge: `Look for a ${activeSigns[0].label.toLowerCase()}`, emoji: activeSigns[0].emoji }
    : { id: 'default', challenge: 'Look for a white feather', emoji: '🪶' };
  const roadStep = user?.currentRoadStep || 1;
  const streakDays = user?.streakDays || 7;
  const lanternHealth = user?.lanternHealth || 82;

  const getRoadName = () => {
    switch (selectedRoad) {
      case 'sleep': return 'Sleep Like a Baby';
      case 'burnout': return 'Reclaim Your Energy';
      case 'manifest': return 'Manifest Your Dreams';
      case 'healing': return 'Heal & Forgive';
      case 'spiritual': return 'Daily Discipline';
      default: return 'Your Journey';
    }
  };

  const handleLogSign = () => {
    // Mark the sign as found in the store (this will also assign a new sign)
    if (activeSigns.length > 0) {
      markSignFound(activeSigns[0].id);
    }
    setSignLogged(true);
    setShowReward(true);
    setTimeout(() => setShowReward(false), 2000);
  };

  const handleStartSession = () => {
    if (onStartSession) {
      onStartSession();
    }
    setSessionCompleted(true);
    setShowReward(true);
    setTimeout(() => setShowReward(false), 2000);
  };

  const isFreeTrialDay = roadStep <= freeTrialDays;
  const daysUntilUnlock = freeTrialDays - roadStep;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gradient-to-br dark:from-emerald-900/20 dark:via-neutral-800/80 dark:to-neutral-900/80 rounded-3xl p-6 mb-6 border-2 border-emerald-200 dark:border-emerald-700/50 shadow-lg dark:shadow-emerald-900/20 relative overflow-hidden"
    >
      {/* Subtle gradient accent at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-gold-500" />
      
      {/* Header with Lantern and Progress - HERO styling */}
      <div className="flex items-center justify-between mb-5 pt-2">
        <div className="flex items-center gap-4">
          <LanternIcon 
            health={lanternHealth} 
            size="lg" 
            showTooltip={true}
            streakDays={streakDays}
          />
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">Today</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Step {roadStep} of {freeTrialDays} on <span className="font-medium text-emerald-600 dark:text-emerald-400">"{getRoadName()}"</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-gold-100 to-gold-200 dark:from-gold-500/20 dark:to-gold-600/20 px-4 py-2 rounded-full border border-gold-300 dark:border-gold-500/30 shadow-sm">
          <Sparkles className="w-5 h-5 text-gold-600 dark:text-gold-400" />
          <span className="text-base font-bold text-gold-700 dark:text-gold-400">{user?.sparks || 0}</span>
          <span className="text-xl">{todaySign.emoji}</span>
        </div>
      </div>

      {/* Free Trial Progress Bar */}
      {isFreeTrialDay && (
        <div className="mb-4 p-3 bg-neutral-100 dark:bg-neutral-900/50 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-neutral-500 dark:text-neutral-400">Free Trial Progress</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              {daysUntilUnlock > 0 ? `${daysUntilUnlock} days until unlock` : 'Last free day!'}
            </span>
          </div>
          <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(roadStep / freeTrialDays) * 100}%` }}
              className="h-full bg-gradient-to-r from-emerald-500 to-gold-500 rounded-full"
            />
          </div>
        </div>
      )}

      {/* Forgiving nudge if lantern is dimming */}
      {lanternHealth < 50 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl"
        >
          <div className="flex items-start gap-2">
            <Flame className="w-4 h-4 text-orange-400 mt-0.5" />
            <div>
              <p className="text-sm text-orange-300">
                Your Lantern dimmed a little while you rested.
              </p>
              <p className="text-xs text-orange-400/70 mt-1">
                Want to rekindle it in 3 minutes? Just complete today's ritual below.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="space-y-3">
        {/* Sign Challenge */}
        <motion.div
          className={`p-4 rounded-xl border transition-all ${
            signLogged 
              ? 'bg-success-50 dark:bg-success-500/10 border-success-200 dark:border-success-500/30' 
              : 'bg-neutral-50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700/50 hover:border-teal-300 dark:hover:border-teal-500/50'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
              signLogged ? 'bg-success-500/20' : 'bg-teal-500/20'
            }`}>
              {signLogged ? <Check className="w-5 h-5 text-success-400" /> : todaySign.emoji}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Eye className="w-4 h-4 text-neutral-400" />
                <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
                  Today's Sign
                </span>
              </div>
              <p className={`font-medium ${signLogged ? 'text-green-600 dark:text-green-400' : 'text-neutral-900 dark:text-white'}`}>
                {signLogged ? 'Sign logged! +5 Sparks, +3 Lantern' : todaySign.challenge}
              </p>
              {!signLogged && (
                <p className="text-xs text-neutral-500 mt-1">
                  When you see it, tap to log
                </p>
              )}
            </div>
            {!signLogged && (
              <button
                onClick={handleLogSign}
                className="px-3 py-1.5 bg-teal-500/20 hover:bg-teal-500/30 text-teal-600 dark:text-teal-400 text-sm font-medium rounded-lg transition-colors"
              >
                Log It
              </button>
            )}
          </div>
        </motion.div>

        {/* Micro-Session */}
        <motion.div
          className={`p-4 rounded-xl border transition-all ${
            sessionCompleted 
              ? 'bg-success-50 dark:bg-success-500/10 border-success-200 dark:border-success-500/30' 
              : 'bg-neutral-50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700/50 hover:border-emerald-300 dark:hover:border-emerald-500/50'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              sessionCompleted ? 'bg-success-500/20' : 'bg-emerald-500/20'
            }`}>
              {sessionCompleted ? (
                <Check className="w-5 h-5 text-success-400" />
              ) : (
                <Play className="w-5 h-5 text-emerald-400" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-neutral-400" />
                <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
                  Today's Micro-Session
                </span>
              </div>
              <p className={`font-medium ${sessionCompleted ? 'text-green-600 dark:text-green-400' : 'text-neutral-900 dark:text-white'}`}>
                {sessionCompleted ? 'Session complete! +10 Sparks, +5 Lantern' : '5-min Evening Wind Down'}
              </p>
              {!sessionCompleted && (
                <p className="text-xs text-neutral-500 mt-1">
                  Queued for you based on your road
                </p>
              )}
            </div>
            {!sessionCompleted && (
              <button
                onClick={handleStartSession}
                className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1 shadow-sm"
              >
                <Play className="w-3 h-3" />
                Play
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Completion Feedback */}
      {(signLogged || sessionCompleted) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700/50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {signLogged && sessionCompleted 
                  ? 'All done! Your Lantern is shining bright.' 
                  : signLogged 
                    ? 'Great start! Complete your session for full rewards.' 
                    : 'Nice! Now watch for your sign today.'}
              </span>
            </div>
            {signLogged && sessionCompleted && (
              <div className="flex items-center gap-1 text-xs text-gold-600 dark:text-gold-400 font-medium">
                <Sparkles className="w-3 h-3" />
                +15 Sparks
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Reward Animation */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-white dark:bg-neutral-800/95 border border-gold-500/50 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-neutral-900" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 dark:text-white">Reward Earned!</p>
                  <p className="text-sm text-gold-600 dark:text-gold-400">+5 Sparks, +3 Lantern Health</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
