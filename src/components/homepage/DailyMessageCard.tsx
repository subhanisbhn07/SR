import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { NeumoCard } from '../ui/NeumoCard';
import { FutureDropChecker } from '../future-drop';

// Barnum-style messages that feel personal but apply broadly
// Grouped by road type for more relevance
const barnumMessages: Record<string, string[]> = {
  sleep: [
    "You carry more than you show, yet tonight your mind is ready to rest. A small sign today will remind you that peace is closer than you think.",
    "You've been holding tension you didn't even notice. Today, something will catch your eye and remind you to let go.",
    "Others see your strength, but you know the nights have been hard. Today's sign will feel like permission to finally rest.",
    "You're the kind of person who gives more than you take. Tonight, the universe wants to give something back.",
    "There's a stillness waiting for you that you've been too busy to notice. Today, you'll see a sign that invites you in.",
  ],
  burnout: [
    "You've been running on empty longer than anyone knows. Today, a small sign will remind you that slowing down isn't giving up.",
    "You often carry more than you admit, yet others see you as strong. A simple ritual today will feel like a weight off your shoulders.",
    "The world asks a lot of you, and you rarely say no. Today's sign will feel like the universe saying 'you've done enough.'",
    "You're closer to a breakthrough than you realize. Watch for a sign that confirms you're on the right path.",
    "Rest isn't something you earn—it's something you deserve. Today, something will remind you of that.",
  ],
  manifest: [
    "You're the kind of person who feels deeply, but doesn't always show it. Today, a small sign will remind you you're on the right road.",
    "You've been thinking about a change for a while. Today, you'll notice a sign that nudges you one step closer.",
    "Something you've been hoping for is closer than it appears. Today's sign will feel like confirmation.",
    "You have a vision others don't fully understand yet. Today, the universe will wink at you.",
    "The doubt you feel sometimes is just the gap between where you are and where you're going. Today, a sign will bridge that gap.",
  ],
  healing: [
    "You've been carrying something heavy that others can't see. Today, a sign will remind you that healing isn't linear.",
    "Forgiveness has been on your mind, even if you haven't said it out loud. Today's sign will feel like permission.",
    "You're stronger than the story you've been telling yourself. Today, something will remind you of who you really are.",
    "The wound you're healing is also becoming your wisdom. Today, you'll see a sign that honors both.",
    "You've been waiting for the right moment to let go. Today might be that moment.",
  ],
  spiritual: [
    "You sense things others miss, and sometimes that feels lonely. Today, a sign will remind you that you're not alone.",
    "Your intuition has been trying to tell you something. Today, pay attention—the universe is speaking.",
    "You're being called to something bigger, even if you can't name it yet. Today's sign will feel like a breadcrumb on the path.",
    "The discipline you're building isn't just habit—it's transformation. Today, you'll see evidence of that.",
    "You've always known there's more to life than what's visible. Today, the invisible will make itself known.",
  ],
  default: [
    "You're the kind of person who feels deeply, but doesn't always show it. Today, a small sign will remind you you're on the right road.",
    "You often carry more than you admit, yet others see you as strong. A simple ritual today will feel like a weight off your shoulders.",
    "You've been thinking about a change for a while. Today, you'll notice a sign that nudges you one step closer.",
    "Something you've been hoping for is closer than it appears. Today's sign will feel like confirmation.",
    "The doubt you feel sometimes is just the gap between where you are and where you're going. Today, a sign will bridge that gap.",
  ],
};

export const DailyMessageCard: React.FC = () => {
  const { user, selectedRoad } = useAuthStore();
  
  // Select a message based on day of year and road type for consistency
  const dailyMessage = useMemo(() => {
    const roadType = selectedRoad || 'default';
    const messages = barnumMessages[roadType] || barnumMessages.default;
    
    // Use day of year + user id hash for consistent daily message
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const userHash = user?.id ? user.id.charCodeAt(0) : 0;
    const messageIndex = (dayOfYear + userHash) % messages.length;
    
    return messages[messageIndex];
  }, [selectedRoad, user?.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <NeumoCard showBlob={false}>
        {/* Future You Drop-In - shows messages from past self */}
        <FutureDropChecker />
        
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-neumo bg-neumo-surface-soft flex items-center justify-center shadow-neumo-inset-sm flex-shrink-0">
            <MessageCircle className="w-5 h-5 text-brand-teal" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-neumo-text-muted uppercase tracking-wide">
                Today's Message
              </span>
              <Sparkles className="w-3 h-3 text-brand-teal" />
            </div>
            <p className="text-sm text-neumo-text leading-relaxed italic">
              "{dailyMessage}"
            </p>
          </div>
        </div>
      </NeumoCard>
    </motion.div>
  );
};
