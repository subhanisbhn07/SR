import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Check, Sparkles, Eye, Clock, Flame } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useConfigStore } from '../../store/configStore';
import { useSignsGoalsStore } from '../../store/signsGoalsStore';
import { LanternIcon } from '../ui/LanternIcon';
import { NeumoCard } from '../ui/NeumoCard';

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
      className="mb-6"
    >
      <NeumoCard size="lg" showBlob={true} blobColor="teal">
        <div className="relative">
          {/* Subtle gradient accent at top */}
          <div className="absolute -top-6 -left-6 -right-6 h-1 bg-gradient-to-r from-brand-teal via-brand-teal-light to-brand-teal-soft rounded-t-lg" />
      
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
            <h2 className="text-2xl font-bold text-neumo-text tracking-tight">Today</h2>
            <p className="text-sm text-neumo-text-secondary">
              Step {roadStep} of {freeTrialDays} on <span className="font-medium text-neumo-text">"{getRoadName()}"</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-neumo-surface-soft px-4 py-2 rounded-full shadow-neumo-inset-sm">
          <Sparkles className="w-5 h-5 text-neumo-text-secondary" />
          <span className="text-base font-bold text-neumo-text">{user?.sparks || 0}</span>
          <span className="text-xl">{todaySign.emoji}</span>
        </div>
      </div>

      {/* Free Trial Progress Bar */}
      {isFreeTrialDay && (
        <div className="mb-4 p-3 bg-neumo-surface-soft rounded-neumo shadow-neumo-inset-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-neumo-text-muted">Free Trial Progress</span>
            <span className="text-xs text-neumo-text-secondary font-medium">
              {daysUntilUnlock > 0 ? `${daysUntilUnlock} days until unlock` : 'Last free day!'}
            </span>
          </div>
          <div className="h-2 bg-neumo-border rounded-full overflow-hidden shadow-neumo-inset-sm">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(roadStep / freeTrialDays) * 100}%` }}
              className="h-full bg-brand-teal rounded-full"
            />
          </div>
        </div>
      )}

      {/* Forgiving nudge if lantern is dimming */}
      {lanternHealth < 50 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-4 p-3 bg-neumo-surface-soft rounded-neumo shadow-neumo-inset-sm"
        >
          <div className="flex items-start gap-2">
            <Flame className="w-4 h-4 text-neumo-text-secondary mt-0.5" />
            <div>
              <p className="text-sm text-neumo-text">
                Your Lantern dimmed a little while you rested.
              </p>
              <p className="text-xs text-neumo-text-muted mt-1">
                Want to rekindle it in 3 minutes? Just complete today's ritual below.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="space-y-3">
        {/* Sign Challenge */}
        <motion.div
          className={`p-4 rounded-neumo transition-all bg-neumo-surface-soft ${
            signLogged 
              ? 'shadow-neumo-inset-sm' 
              : 'shadow-neumo-sm hover:shadow-neumo-inset-sm'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-neumo flex items-center justify-center text-xl bg-neumo-surface">
              {signLogged ? <Check className="w-5 h-5 text-neumo-text" /> : todaySign.emoji}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Eye className="w-4 h-4 text-neumo-text-muted" />
                <span className="text-xs font-medium text-neumo-text-muted uppercase tracking-wide">
                  Today's Sign
                </span>
              </div>
              <p className={`font-medium ${signLogged ? 'text-neumo-text-secondary' : 'text-neumo-text'}`}>
                {signLogged ? 'Sign logged! +5 Sparks, +3 Lantern' : todaySign.challenge}
              </p>
              {!signLogged && (
                <p className="text-xs text-neumo-text-muted mt-1">
                  When you see it, tap to log
                </p>
              )}
            </div>
            {!signLogged && (
              <button
                onClick={handleLogSign}
                className="px-3 py-1.5 bg-brand-teal shadow-teal-glow hover:bg-brand-teal-dark text-white text-sm font-medium rounded-neumo transition-all"
              >
                Log It
              </button>
            )}
          </div>
        </motion.div>

        {/* Micro-Session */}
        <motion.div
          className={`p-4 rounded-neumo transition-all bg-neumo-surface-soft ${
            sessionCompleted 
              ? 'shadow-neumo-inset-sm' 
              : 'shadow-neumo-sm hover:shadow-neumo-inset-sm'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-neumo flex items-center justify-center bg-neumo-surface">
              {sessionCompleted ? (
                <Check className="w-5 h-5 text-neumo-text" />
              ) : (
                <Play className="w-5 h-5 text-neumo-text-secondary" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-neumo-text-muted" />
                <span className="text-xs font-medium text-neumo-text-muted uppercase tracking-wide">
                  Today's Micro-Session
                </span>
              </div>
              <p className={`font-medium ${sessionCompleted ? 'text-neumo-text-secondary' : 'text-neumo-text'}`}>
                {sessionCompleted ? 'Session complete! +10 Sparks, +5 Lantern' : '5-min Evening Wind Down'}
              </p>
              {!sessionCompleted && (
                <p className="text-xs text-neumo-text-muted mt-1">
                  Queued for you based on your road
                </p>
              )}
            </div>
            {!sessionCompleted && (
              <button
                onClick={handleStartSession}
                className="px-3 py-1.5 bg-brand-teal shadow-teal-glow hover:bg-brand-teal-dark text-white text-sm font-medium rounded-neumo transition-all flex items-center gap-1"
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
          className="mt-4 pt-4 border-t border-neumo-border"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neumo-text-secondary animate-pulse" />
              <span className="text-sm text-neumo-text-secondary">
                {signLogged && sessionCompleted 
                  ? 'All done! Your Lantern is shining bright.' 
                  : signLogged 
                    ? 'Great start! Complete your session for full rewards.' 
                    : 'Nice! Now watch for your sign today.'}
              </span>
            </div>
            {signLogged && sessionCompleted && (
              <div className="flex items-center gap-1 text-xs text-neumo-text font-medium">
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
            <div className="bg-neumo-bg rounded-neumo-lg p-6 shadow-neumo-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-teal shadow-teal-glow flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-neumo-text">Reward Earned!</p>
                  <p className="text-sm text-brand-teal">+5 Sparks, +3 Lantern Health</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
        </div>
      </NeumoCard>
    </motion.div>
  );
};
