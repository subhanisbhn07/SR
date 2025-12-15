import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Trophy, AlertCircle, Heart } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface DayBasedNudgeProps {
  onAction?: () => void;
}

// Nudge configurations based on user's current step
const getNudgeConfig = (currentStep: number, hasLoggedSignToday: boolean, hasListenedToday: boolean) => {
  // Step 1-2: Encouragement and guidance
  if (currentStep <= 2) {
    if (!hasLoggedSignToday) {
      return {
        type: 'encouragement',
        icon: Sparkles,
        title: 'Your sign is waiting',
        message: "The universe works in timing. Keep your eyes open today - your sign will appear when you're ready to see it.",
        actionLabel: 'Learn About Signs',
        color: 'neumo-accent',
      };
    }
    return {
      type: 'celebration',
      icon: Heart,
      title: 'Great start!',
      message: "You're building awareness. Each sign you notice strengthens your connection to the universe.",
      actionLabel: null,
      color: 'neumo-accent',
    };
  }

  // Step 3-4: Building momentum
  if (currentStep <= 4) {
    if (!hasLoggedSignToday && !hasListenedToday) {
      return {
        type: 'gentle-reminder',
        icon: Clock,
        title: 'Your daily ritual awaits',
        message: "10 minutes today keeps your manifestation energy flowing. The universe notices consistency.",
        actionLabel: 'Start Today\'s Audio',
        color: 'neumo-accent',
      };
    }
    return {
      type: 'progress',
      icon: Sparkles,
      title: 'Momentum building',
      message: `You're on Step ${currentStep}. Most people who reach this point complete their first manifestation within 2 weeks.`,
      actionLabel: null,
      color: 'neumo-accent',
    };
  }

  // Step 5-6: Urgency and value reinforcement
  if (currentStep <= 6) {
    return {
      type: 'urgency',
      icon: Trophy,
      title: 'Almost there',
      message: `Step ${currentStep} of 7 in your free trial. You're ${7 - currentStep} step${7 - currentStep === 1 ? '' : 's'} away from unlocking your full manifestation journey.`,
      actionLabel: 'Continue Your Road',
      color: 'neumo-accent',
    };
  }

  // Step 7: Conversion point
  if (currentStep === 7) {
    return {
      type: 'conversion',
      icon: AlertCircle,
      title: 'Your free trial is complete',
      message: "You've experienced 7 steps of your manifestation road. Ready to continue your 1,000-step journey?",
      actionLabel: 'Unlock Full Access - $11.11/mo',
      color: 'neumo-accent',
    };
  }

  // Beyond step 7 (subscribed users)
  return {
    type: 'subscribed',
    icon: Sparkles,
    title: 'Keep manifesting',
    message: "Your journey continues. Every step brings you closer to your goals.",
    actionLabel: null,
    color: 'neumo-accent',
  };
};

export const DayBasedNudge: React.FC<DayBasedNudgeProps> = ({ onAction }) => {
  const { user } = useAuthStore();
  
  // Get user's current step (default to 1 if not set)
  const currentStep = user?.currentRoadStep || 1;
  
  // Mock values for demo - in production these would come from user activity tracking
  const hasLoggedSignToday = false;
  const hasListenedToday = false;

  const nudge = getNudgeConfig(currentStep, hasLoggedSignToday, hasListenedToday);
  const Icon = nudge.icon;

  // Don't show nudge for subscribed users who are doing well
  if (nudge.type === 'subscribed' && currentStep > 7) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 p-4 rounded-neumo bg-neumo-bg shadow-neumo"
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-full bg-neumo-bg shadow-neumo-sm flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-5 h-5 text-${nudge.color}`} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-neumo-text text-sm mb-1">
            {nudge.title}
          </h3>
          <p className="text-sm text-neumo-text-secondary mb-2">
            {nudge.message}
          </p>
          {nudge.actionLabel && (
            <button
              onClick={onAction}
              className="text-sm font-medium text-neumo-accent hover:underline"
            >
              {nudge.actionLabel} →
            </button>
          )}
        </div>
      </div>
      
      {/* Progress indicator for trial users */}
      {currentStep <= 7 && (
        <div className="mt-3 pt-3 border-t border-neumo-border">
          <div className="flex items-center justify-between text-xs text-neumo-text-muted mb-1">
            <span>Free Trial Progress</span>
            <span>Step {Math.min(currentStep, 7)} of 7</span>
          </div>
          <div className="h-1.5 bg-neumo-border rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(Math.min(currentStep, 7) / 7) * 100}%` }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-full bg-neumo-accent rounded-full"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};
