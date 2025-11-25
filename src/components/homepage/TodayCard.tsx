import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Check, Sparkles, Eye, Clock } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { LanternIcon } from '../ui/LanternIcon';

interface TodayCardProps {
  onStartSession?: () => void;
}

const todaySigns = [
  { id: 1, challenge: 'Look for a white feather', emoji: '🪶' },
  { id: 2, challenge: 'Notice a red door', emoji: '🚪' },
  { id: 3, challenge: 'Spot a butterfly', emoji: '🦋' },
  { id: 4, challenge: 'Find a four-leaf clover', emoji: '🍀' },
  { id: 5, challenge: 'See a rainbow', emoji: '🌈' },
];

export const TodayCard: React.FC<TodayCardProps> = ({ onStartSession }) => {
  const { user, selectedRoad } = useAuthStore();
  const [signLogged, setSignLogged] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  const todaySign = todaySigns[Math.floor(Math.random() * todaySigns.length)];
  const roadStep = user?.currentRoadStep || 1;

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
    setSignLogged(true);
  };

  const handleStartSession = () => {
    if (onStartSession) {
      onStartSession();
    }
    setSessionCompleted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 rounded-2xl p-5 mb-6 border border-neutral-700/50"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <LanternIcon health={user?.lanternHealth || 50} size="md" />
          <div>
            <h2 className="text-lg font-semibold text-white">Today</h2>
            <p className="text-xs text-neutral-400">
              Step {roadStep} of 7 on "{getRoadName()}"
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-accent-500/20 px-3 py-1.5 rounded-full">
          <Sparkles className="w-4 h-4 text-accent-400" />
          <span className="text-sm font-medium text-accent-400">{user?.sparks || 0}</span>
        </div>
      </div>

      <div className="space-y-3">
        <motion.div
          className={`p-4 rounded-xl border transition-all ${
            signLogged 
              ? 'bg-green-500/10 border-green-500/30' 
              : 'bg-neutral-800/50 border-neutral-700/50 hover:border-accent-500/50'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
              signLogged ? 'bg-green-500/20' : 'bg-accent-500/20'
            }`}>
              {signLogged ? <Check className="w-5 h-5 text-green-400" /> : todaySign.emoji}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Eye className="w-4 h-4 text-neutral-400" />
                <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
                  Today's Sign
                </span>
              </div>
              <p className={`font-medium ${signLogged ? 'text-green-400' : 'text-white'}`}>
                {signLogged ? 'Sign logged!' : todaySign.challenge}
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
                className="px-3 py-1.5 bg-accent-500/20 hover:bg-accent-500/30 text-accent-400 text-sm font-medium rounded-lg transition-colors"
              >
                Log It
              </button>
            )}
          </div>
        </motion.div>

        <motion.div
          className={`p-4 rounded-xl border transition-all ${
            sessionCompleted 
              ? 'bg-green-500/10 border-green-500/30' 
              : 'bg-neutral-800/50 border-neutral-700/50 hover:border-accent-500/50'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              sessionCompleted ? 'bg-green-500/20' : 'bg-purple-500/20'
            }`}>
              {sessionCompleted ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <Play className="w-5 h-5 text-purple-400" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-neutral-400" />
                <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
                  Today's Micro-Session
                </span>
              </div>
              <p className={`font-medium ${sessionCompleted ? 'text-green-400' : 'text-white'}`}>
                {sessionCompleted ? 'Session complete!' : '5-min Evening Wind Down'}
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
                className="px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 text-sm font-medium rounded-lg transition-colors flex items-center gap-1"
              >
                <Play className="w-3 h-3" />
                Play
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {(signLogged || sessionCompleted) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-neutral-700/50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
              <span className="text-sm text-neutral-400">
                {signLogged && sessionCompleted 
                  ? 'All done! Your lantern is bright.' 
                  : signLogged 
                    ? 'Great! Now complete your session.' 
                    : 'Nice! Now watch for your sign.'}
              </span>
            </div>
            {signLogged && sessionCompleted && (
              <span className="text-xs text-accent-400 font-medium">+15 Sparks</span>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
