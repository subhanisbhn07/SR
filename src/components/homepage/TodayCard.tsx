import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Check, Sparkles, Eye, Clock, Flame, Search, Crown, Calendar } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useConfigStore } from '../../store/configStore';
import { useSignsGoalsStore } from '../../store/signsGoalsStore';
import { useGamificationStore } from '../../store/gamificationStore';
import { useSubscriptionStore, FREE_CONTENT_LIMIT } from '../../store/subscriptionStore';
import { useContentStore } from '../../store/contentStore';
import { LanternIcon } from '../ui/LanternIcon';
import { SignDiscoveryModal } from '../signs/SignDiscoveryModal';

interface TodayCardProps {
  onStartSession?: () => void;
}

export const TodayCard: React.FC<TodayCardProps> = ({ onStartSession }) => {
  const { user, selectedRoad } = useAuthStore();
  useConfigStore(); // Keep store connected for reactivity
  const { activeSigns, assignInitialSigns, markSignFound } = useSignsGoalsStore();
  const { lanternHealth, streakDays, sparks } = useGamificationStore();
  const { checkSubscriptionStatus, getDaysRemainingInTrial } = useSubscriptionStore();
  const { getRoadProgress, startRoad, getTotalCompletedDays } = useContentStore();
  const [signLogged, setSignLogged] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [showSignDiscovery, setShowSignDiscovery] = useState(false);

  // Subscription and content state
  const subscriptionStatus = checkSubscriptionStatus();
  const trialDaysRemaining = getDaysRemainingInTrial();
  const roadSlug = selectedRoad || 'manifest';
  const progress = getRoadProgress(roadSlug);
  const currentJourneyDay = progress?.currentDay || 1;
  const totalCompletedDays = getTotalCompletedDays();

  // Initialize signs and road on first load
  useEffect(() => {
    assignInitialSigns();
    if (selectedRoad && !progress) {
      startRoad(selectedRoad);
    }
  }, [assignInitialSigns, selectedRoad, progress, startRoad]);

  // Get the first active sign to display
  const todaySign = activeSigns.length > 0 
    ? { id: activeSigns[0].id, challenge: `Look for a ${activeSigns[0].label.toLowerCase()}`, emoji: activeSigns[0].emoji }
    : { id: 'default', challenge: 'Look for a white feather', emoji: '🪶' };
  // Use gamification store values (with fallbacks to user values for backward compatibility)
  const currentStreakDays = streakDays || user?.streakDays || 0;
  const currentLanternHealth = lanternHealth || user?.lanternHealth || 100;
  const currentSparks = sparks || user?.sparks || 0;

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-surface-card-dark rounded-2xl p-6 mb-6 border border-surface-border-strong dark:border-surface-border-dark-strong shadow-md dark:shadow-none relative overflow-hidden"
    >
      {/* Subtle gradient accent at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-gold-500" />
      
      {/* Phase 4-5 Demo Banner - Remove after demo */}
      <div className="mb-4 p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg">
        <p className="text-xs text-center text-purple-600 dark:text-purple-400 font-medium">
          Phase 4-5 Demo: Day {currentJourneyDay}/365 · Status: {subscriptionStatus === 'active' ? 'Premium' : subscriptionStatus === 'trial' ? 'Trial' : 'Free'} · Click premium courses to see Paywall
        </p>
      </div>
      
      {/* Header with Lantern and Progress - HERO styling */}
      <div className="flex items-center justify-between mb-5 pt-2">
        <div className="flex items-center gap-4">
            <LanternIcon 
              health={currentLanternHealth} 
              size="lg" 
              showTooltip={true}
              streakDays={currentStreakDays}
            />
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">Today</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Day {currentJourneyDay} of 365 on <span className="font-medium text-emerald-600 dark:text-emerald-400">"{getRoadName()}"</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Subscription Status Badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
            subscriptionStatus === 'active' 
              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700/40'
              : subscriptionStatus === 'trial'
                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-700/40'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700'
          }`}>
            {subscriptionStatus === 'active' && <Crown className="w-3.5 h-3.5" />}
            {subscriptionStatus === 'trial' && <Calendar className="w-3.5 h-3.5" />}
            <span>
              {subscriptionStatus === 'active' 
                ? 'Premium' 
                : subscriptionStatus === 'trial' 
                  ? `Trial: ${trialDaysRemaining}d left`
                  : `Free (Days 1-${FREE_CONTENT_LIMIT})`
              }
            </span>
          </div>
          <button
            onClick={() => setShowSignDiscovery(true)}
            className="flex items-center gap-2 px-3 py-2 bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 rounded-full border border-teal-500/30 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span className="text-sm font-medium">Find Signs</span>
          </button>
          <div className="flex items-center gap-2 bg-gold-50 dark:bg-gold-900/20 px-4 py-2 rounded-full border border-gold-200 dark:border-gold-700/40 shadow-sm">
            <Sparkles className="w-5 h-5 text-gold-600 dark:text-gold-400" />
            <span className="text-base font-bold text-gold-700 dark:text-gold-400">{currentSparks}</span>
            <span className="text-xl">{todaySign.emoji}</span>
          </div>
        </div>
      </div>

      {/* 365-Day Journey Progress */}
      <div className="mb-4 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200/50 dark:border-emerald-700/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">365-Day Journey</span>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            {totalCompletedDays} days completed
          </span>
        </div>
        <div className="h-2 bg-emerald-200/50 dark:bg-emerald-900/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(currentJourneyDay / 365) * 100}%` }}
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {currentJourneyDay <= FREE_CONTENT_LIMIT 
              ? `${FREE_CONTENT_LIMIT - currentJourneyDay + 1} free days remaining`
              : subscriptionStatus === 'active' || subscriptionStatus === 'trial'
                ? `${365 - currentJourneyDay} days to mastery`
                : 'Upgrade to continue your journey'
            }
          </span>
          <span className="text-xs text-emerald-600 dark:text-emerald-400">
            {Math.round((currentJourneyDay / 365) * 100)}% complete
          </span>
        </div>
      </div>

      {/* Forgiving nudge if lantern is dimming */}
      {currentLanternHealth < 50 && (
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
                <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center">
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

      {/* Sign Discovery Modal */}
      <SignDiscoveryModal
        isOpen={showSignDiscovery}
        onClose={() => setShowSignDiscovery(false)}
      />
    </motion.div>
  );
};
