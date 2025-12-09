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
      className="bg-gradient-card dark:bg-gradient-card-dark rounded-3xl p-6 md:p-8 mb-6 shadow-neu dark:shadow-neu-dark relative overflow-hidden"
    >
      {/* Premium teal accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-600 via-teal-500 to-teal-soft-500 rounded-t-3xl" />

      {/* Header with Lantern and Progress - HERO styling */}
      <div className="flex items-center justify-between mb-6 pt-2">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-gradient-neu dark:bg-gradient-neu-dark shadow-neu-sm dark:shadow-neu-dark-sm">
            <LanternIcon
              health={lanternHealth}
              size="lg"
              showTooltip={true}
              streakDays={streakDays}
            />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white tracking-tight">Today</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Step {roadStep} of {freeTrialDays} on <span className="font-semibold text-teal-600 dark:text-teal-400">"{getRoadName()}"</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-neu dark:bg-gradient-neu-dark shadow-neu-sm dark:shadow-neu-dark-sm">
          <Sparkles className="w-5 h-5 text-gold-600 dark:text-gold-400" />
          <span className="text-lg font-bold text-gold-700 dark:text-gold-400">{user?.sparks || 0}</span>
          <span className="text-xl ml-1">{todaySign.emoji}</span>
        </div>
      </div>

      {/* Free Trial Progress Bar - Neumorphic */}
      {isFreeTrialDay && (
        <div className="mb-5 p-4 rounded-2xl bg-gradient-neu dark:bg-gradient-neu-dark shadow-neu-inset-sm dark:shadow-neu-dark-inset">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Free Trial Progress</span>
            <span className="text-xs text-teal-600 dark:text-teal-400 font-semibold">
              {daysUntilUnlock > 0 ? `${daysUntilUnlock} days until unlock` : 'Last free day!'}
            </span>
          </div>
          <div className="h-3 bg-neutral-200/50 dark:bg-neutral-800/50 rounded-full overflow-hidden shadow-neu-inset-sm dark:shadow-neu-dark-inset">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(roadStep / freeTrialDays) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-teal rounded-full shadow-sm"
            />
          </div>
        </div>
      )}

      {/* Forgiving nudge if lantern is dimming */}
      {lanternHealth < 50 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-5 p-4 rounded-2xl bg-orange-50 dark:bg-orange-900/20 shadow-neu-sm dark:shadow-neu-dark-sm border-l-4 border-orange-400"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-800/30">
              <Flame className="w-5 h-5 text-orange-500 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-orange-700 dark:text-orange-300">
                Your Lantern dimmed a little while you rested.
              </p>
              <p className="text-xs text-orange-600/80 dark:text-orange-400/70 mt-1">
                Want to rekindle it in 3 minutes? Just complete today's ritual below.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="space-y-4">
        {/* Sign Challenge - Neumorphic Card */}
        <motion.div
          whileHover={{ scale: signLogged ? 1 : 1.01 }}
          className={`p-5 rounded-2xl transition-all duration-300 ${
            signLogged
              ? 'bg-success-50 dark:bg-success-900/20 shadow-neu-sm dark:shadow-neu-dark-sm border-l-4 border-success-500'
              : 'bg-gradient-neu dark:bg-gradient-neu-dark shadow-neu dark:shadow-neu-dark hover:shadow-neu-teal dark:hover:shadow-neu-dark-teal'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-neu-sm dark:shadow-neu-dark-sm ${
              signLogged
                ? 'bg-success-100 dark:bg-success-800/30'
                : 'bg-teal-100 dark:bg-teal-900/30'
            }`}>
              {signLogged ? <Check className="w-6 h-6 text-success-500" /> : todaySign.emoji}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <Eye className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                  Today's Sign
                </span>
              </div>
              <p className={`font-semibold text-base ${signLogged ? 'text-success-600 dark:text-success-400' : 'text-neutral-800 dark:text-white'}`}>
                {signLogged ? 'Sign logged! +5 Sparks, +3 Lantern' : todaySign.challenge}
              </p>
              {!signLogged && (
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  When you see it, tap to log
                </p>
              )}
            </div>
            {!signLogged && (
              <button
                onClick={handleLogSign}
                className="px-4 py-2 bg-gradient-teal-soft text-white text-sm font-semibold rounded-xl shadow-neu-sm dark:shadow-neu-dark-sm hover:shadow-neu-teal transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                Log It
              </button>
            )}
          </div>
        </motion.div>

        {/* Micro-Session - Neumorphic Card */}
        <motion.div
          whileHover={{ scale: sessionCompleted ? 1 : 1.01 }}
          className={`p-5 rounded-2xl transition-all duration-300 ${
            sessionCompleted
              ? 'bg-success-50 dark:bg-success-900/20 shadow-neu-sm dark:shadow-neu-dark-sm border-l-4 border-success-500'
              : 'bg-gradient-neu dark:bg-gradient-neu-dark shadow-neu dark:shadow-neu-dark hover:shadow-neu-teal dark:hover:shadow-neu-dark-teal'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-neu-sm dark:shadow-neu-dark-sm ${
              sessionCompleted
                ? 'bg-success-100 dark:bg-success-800/30'
                : 'bg-teal-100 dark:bg-teal-900/30'
            }`}>
              {sessionCompleted ? (
                <Check className="w-6 h-6 text-success-500" />
              ) : (
                <Play className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <Clock className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                  Today's Micro-Session
                </span>
              </div>
              <p className={`font-semibold text-base ${sessionCompleted ? 'text-success-600 dark:text-success-400' : 'text-neutral-800 dark:text-white'}`}>
                {sessionCompleted ? 'Session complete! +10 Sparks, +5 Lantern' : '5-min Evening Wind Down'}
              </p>
              {!sessionCompleted && (
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Queued for you based on your road
                </p>
              )}
            </div>
            {!sessionCompleted && (
              <button
                onClick={handleStartSession}
                className="px-4 py-2 bg-gradient-teal text-white text-sm font-semibold rounded-xl shadow-neu-sm dark:shadow-neu-dark-sm hover:shadow-neu-teal-glow transition-all duration-200 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                <Play className="w-4 h-4" />
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
          className="mt-5 pt-5 border-t border-neutral-200/50 dark:border-neutral-700/30"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-gold animate-pulse shadow-sm" />
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
                {signLogged && sessionCompleted
                  ? 'All done! Your Lantern is shining bright.'
                  : signLogged
                    ? 'Great start! Complete your session for full rewards.'
                    : 'Nice! Now watch for your sign today.'}
              </span>
            </div>
            {signLogged && sessionCompleted && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gold-100 dark:bg-gold-900/30 text-sm text-gold-700 dark:text-gold-400 font-semibold">
                <Sparkles className="w-4 h-4" />
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
            <div className="bg-gradient-card dark:bg-gradient-card-dark rounded-3xl p-8 shadow-neu-xl dark:shadow-neu-dark-lg">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-neu-gold">
                  <Sparkles className="w-8 h-8 text-neutral-900" />
                </div>
                <div>
                  <p className="text-xl font-bold text-neutral-800 dark:text-white">Reward Earned!</p>
                  <p className="text-base text-gold-600 dark:text-gold-400 font-medium">+5 Sparks, +3 Lantern Health</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
