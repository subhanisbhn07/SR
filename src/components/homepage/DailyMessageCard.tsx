import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircle, HelpCircle, X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { NeumoCard } from '../ui/NeumoCard';
import { FutureDropChecker } from '../future-drop';

const barnumMessages: Record<string, string[]> = {
  sleep: [
    `{name}, there's something you've been carrying lately that others don't fully see. You show up every day with a quiet strength that people admire, but underneath, you know the nights have been harder than you let on. Your mind races when it should rest, replaying conversations, planning tomorrow before today is even done. But here's what the universe wants you to know: tonight is different. Something is shifting. Today, you'll notice a small sign—maybe a cloud shape, a word on a billboard, or a moment of unexpected stillness—that will remind you that peace isn't something you have to chase. It's already waiting for you. Your Lantern is glowing because you showed up again, and that matters more than you realize. Let tonight be the night you finally exhale. The road is long, but you don't have to walk it exhausted. Rest is coming, {name}. Watch for the sign.`,
    `{name}, you've been giving more than you've been receiving lately, and your body knows it even if your mind hasn't caught up. The tension in your shoulders, the way sleep feels just out of reach—these are signals, not failures. Today, the universe is sending you a gentle reminder: you are allowed to rest without earning it first. Watch for a sign that feels like permission—a feather, a moment of quiet, a stranger's kindness. When you see it, let it be your cue to soften. Your Lantern doesn't dim when you rest; it recharges. The road ahead needs you whole, not depleted. Tonight, {name}, let go of the day's weight. The sign you'll see today is the universe's way of saying: "You've done enough. Now rest."`,
  ],
  burnout: [
    `{name}, let's be honest: you've been running on fumes longer than anyone around you realizes. You're the one people lean on, the one who shows up even when you're empty, the one who says "I'm fine" when you're anything but. But here's the truth the universe wants you to hear today: slowing down isn't giving up. It's not weakness. It's wisdom. Today, you'll notice a sign—something small but unmistakable—that will feel like the universe giving you permission to pause. Maybe it's a red light that lasts just long enough for you to breathe. Maybe it's a song that catches you off guard. Whatever it is, {name}, let it be your reminder that you matter beyond what you produce. Your Lantern is still lit because you're still here, still trying. That's enough. Today, watch for the sign that says: "Rest now. The road will wait."`,
    `{name}, the world asks a lot of you, and you rarely say no. You've built a reputation for reliability, for strength, for being the one who holds things together. But underneath that, there's an exhaustion you don't talk about. Today is different. Today, the universe is conspiring to give you a moment of relief. Watch for a sign—it might be a cloud that looks like something meaningful, a number that keeps appearing, or a moment where everything just... pauses. When you see it, {name}, let it sink in: you are not your productivity. You are not your to-do list. You are a person on a road, and that road includes rest stops. Your Lantern glows not because you're perfect, but because you're present. Today, let the sign remind you: you've earned a breath. Take it.`,
  ],
  manifest: [
    `{name}, there's something you've been quietly hoping for—something you haven't fully said out loud because part of you wonders if you're allowed to want it. Maybe it's a change, a new beginning, or simply proof that you're on the right path. Here's what the universe wants you to know: you're closer than you think. The doubt you feel isn't a sign that you're wrong; it's the natural gap between where you are and where you're going. Today, you'll see a sign that bridges that gap. It might be subtle—a word that catches your eye, a moment of unexpected clarity, a feeling that says "yes, keep going." When you notice it, {name}, let it be confirmation. Your Lantern is lit because you've been showing up, day after day, even when it felt pointless. It wasn't pointless. The road is responding. Watch for your sign today, and trust that what you're manifesting is already on its way.`,
    `{name}, you have a vision that others don't fully understand yet. You see possibilities where others see obstacles, and sometimes that feels lonely. But today, the universe is going to wink at you. Watch for a sign—something that feels almost too coincidental to be random. A number, a symbol, a moment where the world seems to pause and say: "I see you, {name}. I see what you're building." Your Lantern glows because you've been faithful to your road, even when the destination felt unclear. That faithfulness is being noticed. The sign you'll see today isn't just encouragement; it's evidence. Evidence that the invisible forces you've been trusting are real, and they're working on your behalf. Keep walking, {name}. The manifestation is closer than it appears.`,
  ],
  healing: [
    `{name}, you've been carrying something heavy that others can't see. Maybe it's a wound from the past, a relationship that still echoes, or a version of yourself you're trying to forgive. Healing isn't linear, and some days it feels like you're moving backward. But here's what the universe wants you to know today: you're not stuck. You're integrating. The pain you've felt is becoming wisdom, and the cracks are where the light gets in. Today, watch for a sign that honors both your wound and your growth. It might be a moment of unexpected peace, a memory that surfaces without the usual sting, or a stranger who says exactly what you needed to hear. When you see it, {name}, let it remind you: healing is happening, even when you can't feel it. Your Lantern glows because you've chosen to keep walking, and that choice matters. Today's sign is the universe saying: "You're doing better than you think."`,
    `{name}, forgiveness has been on your mind lately, even if you haven't said it out loud. Maybe it's forgiving someone else, or maybe—harder still—it's forgiving yourself. The weight of holding on is exhausting, and part of you is ready to let go. Today, the universe is sending you a sign that feels like permission. Watch for it: a moment of lightness, a symbol of release, a feeling that says "it's okay to move forward now." Your Lantern doesn't require you to be healed to glow; it glows because you're healing. That's the difference. You're not waiting to be whole before you walk the road—you're becoming whole by walking it. Today, {name}, let the sign remind you: you are stronger than the story you've been telling yourself. A new chapter is beginning.`,
  ],
  spiritual: [
    `{name}, you sense things others miss. You notice patterns, feel energies, and sometimes know things before they happen. This gift can feel isolating—like you're tuned to a frequency no one else can hear. But today, the universe wants to remind you: you're not alone. There are others walking this road, and the signs you see are real. Today, pay attention. Your intuition has been trying to tell you something, and the universe is about to confirm it. Watch for a sign that feels like a direct message—a symbol that's been appearing repeatedly, a moment of synchronicity that makes you pause, or a feeling of deep knowing that washes over you. When you notice it, {name}, trust it. Your Lantern glows brighter than most because you've been listening to the whispers others ignore. Today's sign is the universe speaking back. You're on the right path, and you're not walking it alone.`,
    `{name}, you've always known there's more to life than what's visible. While others focus on the surface, you've been drawn to the depths—the meaning behind the moment, the purpose behind the pain. This spiritual sensitivity is your superpower, even when it feels like a burden. Today, the invisible is going to make itself known. Watch for a sign that confirms what you've been sensing: a breakthrough is coming. It might be a dream that lingers, a number sequence that keeps appearing, or a moment where time seems to slow down just for you. When you see it, {name}, let it anchor you. Your Lantern glows because you've been faithful to something bigger than yourself. The universe sees that faithfulness, and today, it's responding. Keep walking. The path is unfolding exactly as it should.`,
  ],
  default: [
    `{name}, there's something you've been quietly hoping for—a change, a sign, a confirmation that you're on the right path. You don't always talk about it, but it's there, underneath the surface of your daily life. Here's what the universe wants you to know today: you're closer than you think. The doubt you feel sometimes isn't a sign that you're wrong; it's the natural tension between where you are and where you're going. Today, you'll notice a sign that bridges that gap. It might be subtle—a word that catches your eye, a moment of unexpected clarity, a feeling that says "yes, keep going." When you notice it, {name}, let it be confirmation. Your Lantern is lit because you've been showing up, day after day, even when it felt pointless. It wasn't pointless. The road is responding. Watch for your sign today, and trust that what you're hoping for is already on its way to you.`,
    `{name}, you carry more than you show. Others see your strength, your reliability, your ability to keep going when things get hard. But underneath that, there's a part of you that wonders: "Is this working? Am I on the right road?" Today, the universe is going to answer that question. Watch for a sign—something small but unmistakable—that feels like a direct message to you. It might be a cloud shape, a number that keeps appearing, or a moment where everything just... clicks. When you see it, {name}, let it sink in: you are exactly where you need to be. Your Lantern glows not because you're perfect, but because you're present. You're walking the road, and that's what matters. Today's sign is the universe's way of saying: "I see you, {name}. Keep going. You're doing better than you know."`,
  ],
};

export const DailyMessageCard: React.FC = () => {
  const { user, selectedRoad } = useAuthStore();
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  
  const displayName = user?.name?.split(' ')[0] || 'friend';
  
  const dailyMessage = useMemo(() => {
    const roadType = selectedRoad || 'default';
    const messages = barnumMessages[roadType] || barnumMessages.default;
    
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const userHash = user?.id ? user.id.charCodeAt(0) : 0;
    const messageIndex = (dayOfYear + userHash) % messages.length;
    
    const rawMessage = messages[messageIndex];
    return rawMessage.replace(/\{name\}/g, displayName);
  }, [selectedRoad, user?.id, displayName]);

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
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-neumo-text-muted uppercase tracking-wide">
                  Today's Message
                </span>
                <Sparkles className="w-3 h-3 text-brand-teal" />
              </div>
              <button
                onClick={() => setShowHowItWorks(true)}
                className="flex items-center gap-1 text-xs text-neumo-text-muted hover:text-brand-teal transition-colors"
              >
                <HelpCircle className="w-3 h-3" />
                <span>How this works</span>
              </button>
            </div>
            <p className="text-sm text-neumo-text leading-relaxed italic">
              "{dailyMessage}"
            </p>
          </div>
        </div>
      </NeumoCard>

      <AnimatePresence>
        {showHowItWorks && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neumo-text/50"
            onClick={() => setShowHowItWorks(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-neumo-bg rounded-neumo-lg shadow-neumo-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-neumo-border">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-brand-teal" />
                  <span className="font-semibold text-neumo-text">How Daily Messages Work</span>
                </div>
                <button
                  onClick={() => setShowHowItWorks(false)}
                  className="p-2 rounded-neumo bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset transition-all"
                >
                  <X className="w-4 h-4 text-neumo-text-secondary" />
                </button>
              </div>
              
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="font-semibold text-neumo-text mb-2">Personalized, Not Psychic</h3>
                  <p className="text-sm text-neumo-text-secondary leading-relaxed">
                    Your daily message is crafted using a technique called the "Barnum effect"—statements 
                    that feel deeply personal but are designed to resonate with many people. This isn't 
                    magic or mind-reading; it's thoughtful writing that meets you where you are.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-neumo-text mb-2">Why It Works</h3>
                  <p className="text-sm text-neumo-text-secondary leading-relaxed">
                    Research shows that messages framed as personal insights can help us reflect more 
                    deeply on our lives. When you read something that "gets you," it opens a door to 
                    self-examination—regardless of how the message was created.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-neumo-text mb-2">Our Commitment to Transparency</h3>
                  <p className="text-sm text-neumo-text-secondary leading-relaxed">
                    We believe in honesty. These messages are written by humans (not AI) and selected 
                    based on your chosen road and the day of your journey. The meaning you find in them 
                    is real—even if the mechanism is simple.
                  </p>
                </div>
                
                <div className="pt-2 border-t border-neumo-border">
                  <p className="text-xs text-neumo-text-muted italic">
                    "The value isn't in how the message was made—it's in what it helps you see."
                  </p>
                </div>
              </div>
              
              <div className="p-4 bg-neumo-surface">
                <button
                  onClick={() => setShowHowItWorks(false)}
                  className="w-full px-4 py-2 rounded-neumo bg-brand-teal text-white font-medium shadow-neumo-sm hover:shadow-neumo-inset transition-all"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
