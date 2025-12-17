import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Check, Sparkles, Eye, Clock, Flame } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useConfigStore } from '../../store/configStore';
import { useSignsGoalsStore } from '../../store/signsGoalsStore';
import { LanternIcon } from '../ui/LanternIcon';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface TodayCardProps {
  onStartSession?: () => void;
}

/**
 * TodayCard Component (Design System v6.0)
 * Apple-Style Modern Flat Design
 * 
 * This is a daily-use screen (80-85% of interaction), so it uses flat design.
 * Only the Lantern container uses softDepth for subtle tactile feeling.
 */
export const TodayCard: React.FC<TodayCardProps> = ({ onStartSession }) => {
  const { user, selectedRoad } = useAuthStore();
  const { freeTrialDays } = useConfigStore();
  const { activeSigns, assignInitialSigns, markSignFound } = useSignsGoalsStore();
  const [signLogged, setSignLogged] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [showReward, setShowReward] = useState(false);

  useEffect(() => {
    assignInitialSigns();
  }, [assignInitialSigns]);

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
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="mb-6"
    >
      <Card variant="flat" padding="lg">
        {/* Header with Lantern and Progress */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Lantern container uses softDepth for subtle tactile feeling */}
            <div className="p-2 bg-neutral-50 rounded-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)]">
              <LanternIcon 
                health={lanternHealth} 
                size="lg" 
                showTooltip={true}
                streakDays={streakDays}
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-neutral-900 tracking-tight">Today</h2>
              <p className="text-sm text-neutral-500">
                Step {roadStep} of {freeTrialDays} on <span className="font-medium text-neutral-700">"{getRoadName()}"</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-neutral-50 rounded-full border border-neutral-200">
            <Sparkles className="w-4 h-4 text-[#E8B54A]" />
            <span className="text-base font-semibold text-neutral-900">{user?.sparks || 0}</span>
            <span className="text-xl">{todaySign.emoji}</span>
          </div>
        </div>

        {/* Free Trial Progress Bar */}
        {isFreeTrialDay && (
          <div className="mb-5 p-4 bg-neutral-50 rounded-xl border border-neutral-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-neutral-500">Your {freeTrialDays}-Day Road</span>
              <span className="text-xs text-neutral-600 font-medium">
                {daysUntilUnlock > 0 ? `${daysUntilUnlock} days where your Lantern grows free` : 'Last free day - your flame is yours to keep!'}
              </span>
            </div>
            <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(roadStep / freeTrialDays) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-[#0E9A91] rounded-full"
              />
            </div>
          </div>
        )}

        {/* Forgiving nudge if lantern is dimming */}
        {lanternHealth < 50 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-5 p-4 bg-amber-50 rounded-xl border border-amber-100"
          >
            <div className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-amber-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-neutral-800">
                  Your Lantern dimmed a little while you rested.
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  Want to rekindle it in 3 minutes? Just complete today's ritual below.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="space-y-3">
          {/* Sign Challenge - Flat card style */}
          <div className={`p-4 rounded-xl border transition-all duration-200 ${
            signLogged 
              ? 'bg-emerald-50 border-emerald-200' 
              : 'bg-white border-neutral-200 hover:border-neutral-300 hover:shadow-sm'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
                signLogged ? 'bg-emerald-100' : 'bg-neutral-100'
              }`}>
                {signLogged ? <Check className="w-5 h-5 text-emerald-600" /> : todaySign.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Eye className="w-4 h-4 text-neutral-400" />
                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">
                    Today's Sign
                  </span>
                </div>
                <p className={`font-medium ${signLogged ? 'text-emerald-700' : 'text-neutral-900'}`}>
                  {signLogged ? 'Sign logged! +5 Sparks, +3 Lantern' : todaySign.challenge}
                </p>
                {!signLogged && (
                  <p className="text-xs text-neutral-500 mt-1">
                    When you see it, tap to log
                  </p>
                )}
              </div>
              {!signLogged && (
                <Button
                  onClick={handleLogSign}
                  variant="primary"
                  size="sm"
                >
                  Log It
                </Button>
              )}
            </div>
          </div>

          {/* Micro-Session - Flat card style */}
          <div className={`p-4 rounded-xl border transition-all duration-200 ${
            sessionCompleted 
              ? 'bg-emerald-50 border-emerald-200' 
              : 'bg-white border-neutral-200 hover:border-neutral-300 hover:shadow-sm'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                sessionCompleted ? 'bg-emerald-100' : 'bg-neutral-100'
              }`}>
                {sessionCompleted ? (
                  <Check className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Play className="w-5 h-5 text-neutral-500" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-neutral-400" />
                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">
                    Today's Micro-Session
                  </span>
                </div>
                <p className={`font-medium ${sessionCompleted ? 'text-emerald-700' : 'text-neutral-900'}`}>
                  {sessionCompleted ? 'Session complete! +10 Sparks, +5 Lantern' : '5-min Evening Wind Down'}
                </p>
                {!sessionCompleted && (
                  <p className="text-xs text-neutral-500 mt-1">
                    Queued for you based on your road
                  </p>
                )}
              </div>
              {!sessionCompleted && (
                <Button
                  onClick={handleStartSession}
                  variant="primary"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Play className="w-3 h-3" />
                  Play
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Completion Feedback */}
        {(signLogged || sessionCompleted) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-5 pt-4 border-t border-neutral-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm text-neutral-600">
                  {signLogged && sessionCompleted 
                    ? 'All done! Your Lantern is shining bright.' 
                    : signLogged 
                      ? 'Great start! Complete your session for full rewards.' 
                      : 'Nice! Now watch for your sign today.'}
                </span>
              </div>
              {signLogged && sessionCompleted && (
                <div className="flex items-center gap-1 text-xs text-[#E8B54A] font-semibold">
                  <Sparkles className="w-3 h-3" />
                  +15 Sparks
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Reward Animation - Uses glass variant for ceremonial moment */}
        <AnimatePresence>
          {showReward && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
              {/* Glass card for ceremonial reward moment */}
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#0E9A91] shadow-lg flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 text-lg">Reward Earned!</p>
                    <p className="text-sm text-[#0E9A91] font-medium">+5 Sparks, +3 Lantern Health</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};
