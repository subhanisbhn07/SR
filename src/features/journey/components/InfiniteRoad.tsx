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
    3: { icon: Zap, color: 'text-accent-400', label: 'The Glitch' },
    7: { icon: Heart, color: 'text-primary-400', label: 'Be The Sign' },
    12: { icon: Flame, color: 'text-accent-400', label: 'Twin Flame' },
    40: { icon: Star, color: 'text-primary-400', label: 'Invitation' },
    50: { icon: Sparkles, color: 'text-accent-400', label: 'Halfway' },
    60: { icon: Target, color: 'text-primary-400', label: 'Threshold' },
    70: { icon: Crown, color: 'text-accent-400', label: 'Self Celebration' },
    80: { icon: Zap, color: 'text-primary-400', label: 'Elevation' },
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
    <div className="relative min-h-screen py-12 px-4">
      {/* Watercolor background effects - already handled by body in index.css */}

      {/* The Road Path - Candy Crush Style */}
      <div className="relative max-w-6xl mx-auto">
        {/* Tribe Campfire Widget */}
        <div className="mb-12">
          <TribeCampfire />
        </div>

        {/* Mobile Layout: Simple Grid (sm and below) */}
        <div className="grid grid-cols-3 gap-4 md:hidden">
          {roadSteps.map((step) => {
            const status = getNodeStatus(step.stepNumber);
            const isClickable = status === 'current' || status === 'completed' || status === 'available';
            const isSpecialEvent = specialEvents[step.stepNumber];

            return (
              <motion.div
                key={step.stepNumber}
                id={`step-${step.stepNumber}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: step.stepNumber * 0.02 }}
                className="flex flex-col items-center"
              >
                <button
                  onClick={() => isClickable && onNodeClick(step.stepNumber)}
                  disabled={!isClickable}
                  className={`
                    relative group
                    ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}
                  `}
                >
                  {/* Crown decoration for special events */}
                  {isSpecialEvent && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                      {React.createElement(isSpecialEvent.icon, {
                        className: `w-6 h-6 ${isSpecialEvent.color} drop-shadow-lg`,
                      })}
                    </div>
                  )}

                  {/* Node Circle - Watercolor Style */}
                  <div className={`
                    relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300
                    ${status === 'current' ? 'bg-gradient-to-br from-[#ffd89b] to-[#f4c77e] shadow-xl shadow-[#ffd89b]/40 animate-pulse scale-110' : ''}
                    ${status === 'completed' ? 'bg-gradient-to-br from-[#7dd3c0] to-[#5fb8a6] shadow-lg shadow-[#7dd3c0]/30' : ''}
                    ${status === 'available' ? 'bg-gradient-to-br from-[#a8e6d7] to-[#7dd3c0] shadow-lg shadow-[#7dd3c0]/20 active:scale-95' : ''}
                    ${status === 'future' ? 'bg-gradient-to-br from-white/80 to-[#f0f9f6]/80 opacity-60 shadow-md' : ''}
                    ${status === 'locked' ? 'bg-gradient-to-br from-white/50 to-[#f0f9f6]/50 opacity-40 shadow-md' : ''}
                    border-3 ${status === 'current' ? 'border-[#f4c77e]' : status === 'completed' ? 'border-[#5fb8a6]' : 'border-[#a8e6d7]'} shadow-[0_3px_0_rgba(125,211,192,0.2)]
                  `}>
                    {status === 'locked' ? (
                      <Lock className="w-6 h-6 text-[#718096]" />
                    ) : (
                      <span className="font-black text-2xl drop-shadow-md" style={{ color: '#2d3748' }}>
                        {step.stepNumber}
                      </span>
                    )}
                    
                    {status === 'completed' && (
                      <div className="absolute top-0 right-0 w-6 h-6 bg-[#ffd89b] rounded-full border-2 border-white flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-[#2d3748]" />
                      </div>
                    )}
                  </div>

                  {/* Day Label Below Node */}
                  <div className="mt-2 text-center w-full">
                    <div className="text-xs font-bold px-2 py-0.5 rounded-full mb-1 shadow-sm" style={{ color: '#5fb8a6', backgroundColor: 'rgba(125, 211, 192, 0.15)', border: '1px solid rgba(125, 211, 192, 0.3)' }}>
                      Sign {step.stepNumber}
                    </div>
                    <div className="text-xs font-semibold truncate" style={{ color: '#4a5568' }}>{step.title}</div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Desktop Layout: Winding Path (md and above) */}
        <div className="hidden md:block relative" style={{ minHeight: `${Math.ceil(roadSteps.length / 5) * 180}px` }}>
          {roadSteps.map((step, index) => {
            const status = getNodeStatus(step.stepNumber);
            const isClickable = status === 'current' || status === 'completed' || status === 'available';
            const position = getNodePosition(index);
            const isSpecialEvent = specialEvents[step.stepNumber];

            return (
              <div key={step.stepNumber}>
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

                    {/* Node Circle - Watercolor Style */}
                    <div className={`
                      relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300
                      ${status === 'current' ? 'bg-gradient-to-br from-[#ffd89b] to-[#f4c77e] shadow-xl shadow-[#ffd89b]/40 animate-pulse scale-110' : ''}
                      ${status === 'completed' ? 'bg-gradient-to-br from-[#7dd3c0] to-[#5fb8a6] shadow-lg shadow-[#7dd3c0]/30' : ''}
                      ${status === 'available' ? 'bg-gradient-to-br from-[#a8e6d7] to-[#7dd3c0] shadow-lg shadow-[#7dd3c0]/20 hover:scale-105 hover:shadow-[#7dd3c0]/30' : ''}
                      ${status === 'future' ? 'bg-gradient-to-br from-white/80 to-[#f0f9f6]/80 opacity-60 shadow-md' : ''}
                      ${status === 'locked' ? 'bg-gradient-to-br from-white/50 to-[#f0f9f6]/50 opacity-40 shadow-md' : ''}
                      border-4 ${status === 'current' ? 'border-[#f4c77e]' : status === 'completed' ? 'border-[#5fb8a6]' : 'border-[#a8e6d7]'} shadow-[0_4px_0_rgba(125,211,192,0.2)]
                    `}>
                      {/* Day Number - Large and Bold */}
                      {status === 'locked' ? (
                        <Lock className="w-8 h-8 text-[#718096]" />
                      ) : (
                        <span className="font-black text-3xl drop-shadow-md" style={{ color: '#2d3748' }}>
                          {step.stepNumber}
                        </span>
                      )}
                      
                      {/* Checkmark overlay for completed */}
                      {status === 'completed' && (
                        <div className="absolute top-0 right-0 w-8 h-8 bg-[#ffd89b] rounded-full border-2 border-white flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-[#2d3748]" />
                        </div>
                      )}
                    </div>

                    {/* Hover Card - Watercolor Style */}
                    <div className={`
                      absolute left-1/2 -translate-x-1/2 top-32 w-64 p-4 rounded-xl
                      card-watercolor border-2 ${isSpecialEvent ? 'border-[#ffd89b]' : 'border-[#7dd3c0]/30'}
                      opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20
                      shadow-xl
                      ${!isClickable ? 'hidden' : ''}
                    `}>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <span className="text-xs font-semibold" style={{ color: '#5fb8a6' }}>Day {step.stepNumber}</span>
                          {isSpecialEvent && (
                            <span className="px-2 py-0.5 text-xs font-bold rounded-full" style={{ backgroundColor: 'rgba(255, 216, 155, 0.2)', color: '#f4c77e' }}>
                              {isSpecialEvent.label}
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold mb-1" style={{ color: '#2d3748' }}>{step.title}</h4>
                        <p className="text-xs mb-2" style={{ color: '#4a5568' }}>{step.description}</p>
                        <div className="text-xs font-medium" style={{ color: '#5fb8a6' }}>
                          {step.signChallenge}
                        </div>
                      </div>
                    </div>

                    {/* Day Label Below Node */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-28 text-center w-40">
                      <div className="text-sm font-bold px-2 py-1 rounded-full mb-1 shadow-sm" style={{ color: '#5fb8a6', backgroundColor: 'rgba(125, 211, 192, 0.15)', border: '1px solid rgba(125, 211, 192, 0.3)' }}>
                        Sign {step.stepNumber}
                      </div>
                      <div className="text-xs font-semibold truncate" style={{ color: '#4a5568' }}>{step.title}</div>
                    </div>
                  </button>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* End of free content marker - Watercolor Style */}
        {!isSubscribed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 p-8 rounded-2xl card-watercolor text-center"
            style={{ border: '2px solid rgba(255, 216, 155, 0.3)' }}
          >
            <Lock className="w-12 h-12 mx-auto mb-4" style={{ color: '#f4c77e' }} />
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#2d3748' }}>
              Continue Your Journey
            </h3>
            <p className="mb-4" style={{ color: '#4a5568' }}>
              Unlock 986 more days of guided meditation and manifestation
            </p>
            <button className="btn-watercolor">
              Become a Seeker
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
