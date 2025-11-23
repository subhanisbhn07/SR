import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useJourneyStore } from '../../store/journeyStore';
import { useAuthStore } from '../../store/authStore';
import { Lock, CheckCircle, Circle } from 'lucide-react';

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

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 py-12 px-4">
      {/* Mystical background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
      </div>

      {/* The Road Path */}
      <div className="relative max-w-2xl mx-auto">
        <div className="flex flex-col items-center space-y-8">
          {roadSteps.map((step, index) => {
            const status = getNodeStatus(step.stepNumber);
            const isClickable = status === 'current' || status === 'completed' || status === 'available';

            return (
              <motion.div
                key={step.stepNumber}
                id={`step-${step.stepNumber}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative w-full"
              >
                {/* Connecting line */}
                {index > 0 && (
                  <div className="absolute left-1/2 -top-8 w-0.5 h-8 bg-gradient-to-b from-primary-500/50 to-transparent transform -translate-x-1/2" />
                )}

                {/* Node */}
                <button
                  onClick={() => isClickable && onNodeClick(step.stepNumber)}
                  disabled={!isClickable}
                  className={`
                    relative w-full p-6 rounded-2xl border-2 transition-all duration-300
                    ${status === 'current' ? 'border-accent-500 bg-accent-500/10 shadow-lg shadow-accent-500/20' : ''}
                    ${status === 'completed' ? 'border-primary-500 bg-primary-500/5' : ''}
                    ${status === 'available' ? 'border-neutral-600 bg-neutral-800/50 hover:border-primary-500/50' : ''}
                    ${status === 'future' ? 'border-neutral-700 bg-neutral-800/30 opacity-50' : ''}
                    ${status === 'locked' ? 'border-neutral-700 bg-neutral-800/30 opacity-40' : ''}
                    ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}
                  `}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`
                      flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                      ${status === 'current' ? 'bg-accent-500 animate-pulse' : ''}
                      ${status === 'completed' ? 'bg-primary-500' : ''}
                      ${status === 'available' ? 'bg-neutral-700' : ''}
                      ${status === 'future' ? 'bg-neutral-800' : ''}
                      ${status === 'locked' ? 'bg-neutral-800' : ''}
                    `}>
                      {status === 'completed' && <CheckCircle className="w-6 h-6 text-white" />}
                      {status === 'current' && <Circle className="w-6 h-6 text-white fill-white" />}
                      {status === 'locked' && <Lock className="w-6 h-6 text-neutral-500" />}
                      {(status === 'available' || status === 'future') && (
                        <span className="text-white font-semibold">{step.stepNumber}</span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-white">
                          Day {step.stepNumber}: {step.title}
                        </h3>
                        {!step.isFree && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-accent-500/20 text-accent-400 rounded-full">
                            Premium
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-neutral-400">{step.description}</p>
                      
                      {status === 'current' && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-3 text-sm text-accent-400 font-medium"
                        >
                          → Tap to begin today's journey
                        </motion.div>
                      )}
                    </div>
                  </div>
                </button>
              </motion.div>
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
