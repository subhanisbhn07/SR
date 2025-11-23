import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useJourneyStore } from '../store/journeyStore';
import { useAuthStore } from '../../../store/authStore';
import { Lock, CheckCircle, Sparkles, Flame, Heart, Star, Zap, Crown, Trophy, Target, LucideIcon } from 'lucide-react';
import { TribeCampfire } from '../../tribe/components/TribeCampfire';
import React from 'react';

interface InfiniteRoadProps {
  onNodeClick: (stepNumber: number) => void;
}

export const InfiniteRoad = ({ onNodeClick }: InfiniteRoadProps) => {
  const { roadSteps, userProgress } = useJourneyStore();
  const { user } = useAuthStore();
  
  const subscriptionStatus = user?.mode || 'consumer';
  const isSubscribed = subscriptionStatus === 'enterprise'; // Using enterprise as "Seeker" for now

  useEffect(() => {
    // Scroll to current step on mount
    const currentNode = document.getElementById(`step-${userProgress.currentStep}`);
    if (currentNode) {
      currentNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [userProgress.currentStep]);

  const getNodeStatus = (stepNumber: number) => {
    if (userProgress.completedSteps.includes(stepNumber)) {
      return 'completed';
    }
    if (stepNumber === userProgress.currentStep) {
      return 'current';
    }
    if (stepNumber < userProgress.currentStep) {
      return 'available';
    }
    if (stepNumber > 14 && !isSubscribed) {
      return 'locked';
    }
    return 'future';
  };

  // Special event days with milestone icons
  const specialEvents: Record<number, { icon: LucideIcon; color: string; label: string }> = {
    3: { icon: Zap, color: 'text-purple-400', label: 'The Glitch' },
    7: { icon: Heart, color: 'text-pink-400', label: 'Be The Sign' },
    12: { icon: Flame, color: 'text-orange-400', label: 'Twin Flame' },
    40: { icon: Star, color: 'text-yellow-400', label: 'Invitation' },
    50: { icon: Sparkles, color: 'text-cyan-400', label: 'Halfway' },
    60: { icon: Target, color: 'text-blue-400', label: 'Threshold' },
    70: { icon: Crown, color: 'text-purple-400', label: 'Self Celebration' },
    80: { icon: Zap, color: 'text-green-400', label: 'Elevation' },
    90: { icon: Trophy, color: 'text-accent-500', label: 'Master' },
  };

  // Calculate winding path positions (Candy Crush style)
  const getNodePosition = (index: number) => {
    const row = Math.floor(index / 5);
    const col = index % 5;
    
    // Alternate direction each row (zigzag pattern)
    const isEvenRow = row % 2 === 0;
    const xPosition = isEvenRow ? col : (4 - col);
    
    return {
      x: xPosition * 25, // 25% spacing
      y: row * 180, // Vertical spacing in pixels
      isEvenRow,
    };
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-yellow-100 via-orange-50 to-pink-100 py-12 px-4">
      {/* Playful background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Scattered coins */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`coin-${i}`}
            className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
        {/* Decorative shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-pink-300/20 rounded-full blur-2xl" />
        <div className="absolute bottom-40 left-1/4 w-36 h-36 bg-orange-300/20 rounded-full blur-2xl" />
      </div>

      {/* The Road Path - Candy Crush Style */}
      <div className="relative max-w-6xl mx-auto">
        {/* Tribe Campfire Widget */}
        <div className="mb-12">
          <TribeCampfire />
        </div>

        {/* Winding Path Container */}
        <div className="relative" style={{ minHeight: `${Math.ceil(roadSteps.length / 5) * 180}px` }}>
          {roadSteps.map((step, index) => {
            const status = getNodeStatus(step.stepNumber);
            const isClickable = status === 'current' || status === 'completed' || status === 'available';
            const position = getNodePosition(index);
            const isSpecialEvent = specialEvents[step.stepNumber];
            const prevPosition = index > 0 ? getNodePosition(index - 1) : null;

            return (
              <div key={step.stepNumber}>
                {/* Connecting Path Line - Candy Striped */}
                {prevPosition && (
                  <svg
                    className="absolute pointer-events-none"
                    style={{
                      left: `${prevPosition.x}%`,
                      top: `${prevPosition.y + 40}px`,
                      width: `${Math.abs(position.x - prevPosition.x)}%`,
                      height: `${position.y - prevPosition.y}px`,
                      zIndex: 0,
                    }}
                  >
                    {/* Base pink path */}
                    <path
                      d={`M ${prevPosition.isEvenRow ? '50%' : '50%'} 0 Q ${position.x > prevPosition.x ? '100%' : '0%'} 50% ${position.x > prevPosition.x ? '100%' : '0%'} 100%`}
                      stroke="#ec4899"
                      strokeWidth="16"
                      fill="none"
                      opacity={status === 'future' || status === 'locked' ? '0.2' : '0.8'}
                    />
                    {/* White stripes overlay */}
                    <path
                      d={`M ${prevPosition.isEvenRow ? '50%' : '50%'} 0 Q ${position.x > prevPosition.x ? '100%' : '0%'} 50% ${position.x > prevPosition.x ? '100%' : '0%'} 100%`}
                      stroke="white"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray="20,20"
                      opacity={status === 'future' || status === 'locked' ? '0.2' : '0.6'}
                    />
                  </svg>
                )}

                {/* Node */}
                <motion.div
                  id={`step-${step.stepNumber}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.02 }}
                  className="absolute"
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}px`,
                    transform: 'translateX(-50%)',
                  }}
                >
                  <button
                    onClick={() => isClickable && onNodeClick(step.stepNumber)}
                    disabled={!isClickable}
                    className={`
                      relative group
                      ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}
                    `}
                    style={{ zIndex: 10 }}
                  >
                    {/* Crown decoration for special events */}
                    {isSpecialEvent && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                        {React.createElement(isSpecialEvent.icon, {
                          className: `w-8 h-8 ${isSpecialEvent.color} drop-shadow-lg`,
                        })}
                      </div>
                    )}

                    {/* Node Circle - Bright Candy Colors */}
                    <div className={`
                      relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300
                      ${status === 'current' ? 'bg-gradient-to-br from-orange-400 to-orange-600 shadow-xl shadow-orange-500/60 animate-pulse scale-110' : ''}
                      ${status === 'completed' ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/40' : ''}
                      ${status === 'available' ? 'bg-gradient-to-br from-pink-400 to-pink-600 shadow-lg shadow-pink-500/40 hover:scale-105' : ''}
                      ${status === 'future' ? 'bg-gradient-to-br from-purple-300 to-purple-500 opacity-50 shadow-md' : ''}
                      ${status === 'locked' ? 'bg-gradient-to-br from-gray-400 to-gray-600 opacity-40 shadow-md' : ''}
                      border-4 border-white shadow-[0_4px_0_rgba(0,0,0,0.2)]
                    `}>
                      {/* Day Number - Large and Bold */}
                      {status === 'locked' ? (
                        <Lock className="w-8 h-8 text-white" />
                      ) : (
                        <span className="text-white font-black text-3xl drop-shadow-md">
                          {step.stepNumber}
                        </span>
                      )}
                      
                      {/* Checkmark overlay for completed */}
                      {status === 'completed' && (
                        <div className="absolute top-0 right-0 w-8 h-8 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-700" />
                        </div>
                      )}
                    </div>

                    {/* Hover Card */}
                    <div className={`
                      absolute left-1/2 -translate-x-1/2 top-32 w-64 p-4 rounded-xl
                      bg-white border-2 ${isSpecialEvent ? 'border-pink-400' : 'border-gray-300'}
                      opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20
                      shadow-xl
                      ${!isClickable ? 'hidden' : ''}
                    `}>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <span className="text-xs font-semibold text-pink-600">Day {step.stepNumber}</span>
                          {isSpecialEvent && (
                            <span className="px-2 py-0.5 text-xs font-bold bg-pink-100 text-pink-600 rounded-full">
                              {isSpecialEvent.label}
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-gray-800 mb-1">{step.title}</h4>
                        <p className="text-xs text-gray-600 mb-2">{step.description}</p>
                        <div className="text-xs text-pink-600 font-medium">
                          {step.signChallenge}
                        </div>
                      </div>
                    </div>

                    {/* Day Label Below Node */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-28 text-center w-40">
                      <div className="text-sm font-bold text-pink-600 bg-white/80 px-2 py-1 rounded-full mb-1 shadow-sm">
                        Sign {step.stepNumber}
                      </div>
                      <div className="text-xs font-semibold text-gray-700 truncate">{step.title}</div>
                    </div>
                  </button>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* End of free content marker */}
        {!isSubscribed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 p-8 rounded-2xl border-2 border-accent-500/30 bg-gradient-to-br from-accent-500/10 to-primary-500/10 text-center"
          >
            <Lock className="w-12 h-12 text-accent-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Continue Your Journey
            </h3>
            <p className="text-neutral-300 mb-4">
              Unlock 986 more days of guided meditation and manifestation
            </p>
            <button className="px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-lg transition-colors">
              Become a Seeker
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
