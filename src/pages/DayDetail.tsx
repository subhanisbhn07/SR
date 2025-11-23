import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Pause, Volume2, CheckCircle, Music, Sparkles, AlertTriangle } from 'lucide-react';
import { useJourneyStore } from '../features/journey/store/journeyStore';
import { useManifestationStore } from '../features/manifestation/store/manifestationStore';
import { audioAmbienceData } from '../features/journey/data/audioAmbience';
import { useAuthStore } from '../store/authStore';
import { useViralStore } from '../features/viral/store/viralStore';
import { UniverseReceipt } from '../features/viral/components/UniverseReceipt';
import { SignalStrength } from '../features/viral/components/SignalStrength';
import { TwinFlameMatch } from '../features/viral/components/TwinFlameMatch';

interface DayDetailProps {
  stepNumber: number;
  onBack: () => void;
}

export const DayDetail = ({ stepNumber, onBack }: DayDetailProps) => {
  const { roadSteps, completeStep, userProgress } = useJourneyStore();
  const { logSign, addJournalEntry } = useManifestationStore();
  const { user } = useAuthStore();
  const { generateReceipt, generateSignalStrength, generateTwinFlameCode, matchTwinFlame } = useViralStore();
  
  const step = roadSteps.find(s => s.stepNumber === stepNumber);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(300); // 5 minutes default
  const [showSignLog, setShowSignLog] = useState(false);
  const [signNote, setSignNote] = useState('');
  const [journalText, setJournalText] = useState('');
  const [hasCompletedMeditation, setHasCompletedMeditation] = useState(false);
  const [hasLoggedSign, setHasLoggedSign] = useState(false);
  const [selectedAmbience, setSelectedAmbience] = useState(audioAmbienceData[0].id);
  const [showAmbienceSelector, setShowAmbienceSelector] = useState(false);
  const [showSpecialEvent, setShowSpecialEvent] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState<ReturnType<typeof generateReceipt> | null>(null);
  const [currentSignalStrength, setCurrentSignalStrength] = useState<ReturnType<typeof generateSignalStrength> | null>(null);
  const [currentTwinFlame, setCurrentTwinFlame] = useState<ReturnType<typeof generateTwinFlameCode> | null>(null);

  const isCompleted = userProgress.completedSteps.includes(stepNumber);
  const isSubscribed = user?.mode === 'enterprise';
  const availableAmbience = audioAmbienceData.filter(a => !a.isPremium || isSubscribed);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && progress < duration) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= duration) {
            setIsPlaying(false);
            setHasCompletedMeditation(true);
            return duration;
          }
          return newProgress;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress, duration]);

  useEffect(() => {
    if (step?.specialEvent && !isCompleted) {
      const timer = setTimeout(() => {
        setShowSpecialEvent(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step, isCompleted]);

  if (!step) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <p className="text-white">Step not found</p>
      </div>
    );
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLogSign = () => {
    if (!step) return;
    
    logSign({
      stepNumber: step.stepNumber,
      signName: step.signChallenge,
      found: true,
      note: signNote,
    });
    
    const receipt = generateReceipt(
      step.signChallenge,
      step.signDescription,
      step.stepNumber,
      'Your Location'
    );
    
    setCurrentReceipt(receipt);
    setHasLoggedSign(true);
    setShowSignLog(false);
    setSignNote('');
  };

  const handleSaveJournal = () => {
    if (!step || !journalText.trim()) return;
    
    addJournalEntry({
      stepNumber: step.stepNumber,
      content: journalText,
      prompt: `Day ${step.stepNumber}: ${step.title}`,
      isPublic: false,
    });
    
    setJournalText('');
  };

  const handleCompleteStep = () => {
    if (!hasCompletedMeditation) {
      alert('Please complete the meditation first!');
      return;
    }
    
    completeStep(stepNumber);
    onBack();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-neutral-900/80 backdrop-blur-sm border-b border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Road</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Step Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-block px-4 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm font-medium mb-4">
            Day {step.stepNumber}
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">{step.title}</h1>
          <p className="text-xl text-neutral-400">{step.description}</p>
        </motion.div>

        {/* Audio Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-8 border border-neutral-700"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Guided Meditation</h2>
          
          {/* Duration Selector */}
          <div className="flex gap-2 mb-6">
            {[
              { label: 'Micro', value: 180 },
              { label: 'Standard', value: 300 },
              { label: 'Deep', value: 600 },
            ].map(({ label, value }) => (
              <button
                key={label}
                onClick={() => {
                  setDuration(value);
                  setProgress(0);
                  setIsPlaying(false);
                }}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-colors
                  ${duration === value
                    ? 'bg-accent-500 text-white'
                    : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                  }
                `}
              >
                {label} ({Math.floor(value / 60)}m)
              </button>
            ))}
          </div>

          {/* Ambience Selector */}
          <div className="mb-4">
            <button
              onClick={() => setShowAmbienceSelector(!showAmbienceSelector)}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors"
            >
              <Music className="w-4 h-4 text-accent-500" />
              <span className="text-sm text-white">
                {audioAmbienceData.find(a => a.id === selectedAmbience)?.name || 'Select Background'}
              </span>
            </button>
            
            <AnimatePresence>
              {showAmbienceSelector && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 grid grid-cols-2 gap-2 overflow-hidden"
                >
                  {availableAmbience.map((ambience) => (
                    <button
                      key={ambience.id}
                      onClick={() => {
                        setSelectedAmbience(ambience.id);
                        setShowAmbienceSelector(false);
                      }}
                      className={`
                        p-3 rounded-lg text-left transition-colors text-sm
                        ${selectedAmbience === ambience.id
                          ? 'bg-accent-500 text-white'
                          : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                        }
                      `}
                    >
                      <div className="font-medium">{ambience.name}</div>
                      <div className="text-xs opacity-75">{ambience.description}</div>
                    </button>
                  ))}
                  {!isSubscribed && audioAmbienceData.some(a => a.isPremium) && (
                    <div className="col-span-2 p-3 bg-accent-500/10 border border-accent-500/30 rounded-lg text-center">
                      <p className="text-xs text-accent-400">
                        Unlock {audioAmbienceData.filter(a => a.isPremium).length} more tracks with Seeker subscription
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Play Button */}
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={handlePlayPause}
              className="w-16 h-16 rounded-full bg-accent-500 hover:bg-accent-600 flex items-center justify-center transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white ml-1" />
              )}
            </button>
            
            <div className="flex-1">
              <div className="flex justify-between text-sm text-neutral-400 mb-2">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(progress / duration) * 100}%` }}
                />
              </div>
            </div>

            <Volume2 className="w-6 h-6 text-neutral-400" />
          </div>

          {/* Meditation Script Preview */}
          <div className="mt-6 p-4 bg-neutral-900/50 rounded-lg">
            <p className="text-neutral-300 italic text-sm leading-relaxed">
              "{step.meditationScript}"
            </p>
          </div>

          {hasCompletedMeditation && !isCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-400 font-medium">Meditation completed! +{step.sparksReward} Sparks</span>
            </motion.div>
          )}
        </motion.div>

        {/* Sign of the Day */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-8 border border-neutral-700"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Sign of the Day</h2>
          <div className="mb-4">
            <div className="text-2xl font-bold text-accent-500 mb-2">{step.signChallenge}</div>
            <p className="text-neutral-300">{step.signDescription}</p>
          </div>

          {!hasLoggedSign && !isCompleted ? (
            <>
              {!showSignLog ? (
                <button
                  onClick={() => setShowSignLog(true)}
                  className="w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors"
                >
                  I Found the Sign!
                </button>
              ) : (
                <div className="space-y-4">
                  <textarea
                    value={signNote}
                    onChange={(e) => setSignNote(e.target.value)}
                    placeholder="Describe where and when you found the sign... (optional)"
                    className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-primary-500 resize-none"
                    rows={3}
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleLogSign}
                      className="flex-1 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors"
                    >
                      Log Sign (+5 Sparks)
                    </button>
                    <button
                      onClick={() => setShowSignLog(false)}
                      className="px-6 py-3 bg-neutral-700 hover:bg-neutral-600 text-white font-semibold rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-400 font-medium">Sign logged!</span>
            </div>
          )}
        </motion.div>

        {/* Journal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-8 border border-neutral-700"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Reflection</h2>
          <p className="text-neutral-400 mb-4 text-sm">
            What insights or experiences did you have today?
          </p>
          <textarea
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            placeholder="Write your thoughts here..."
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-primary-500 resize-none mb-4"
            rows={5}
          />
          <button
            onClick={handleSaveJournal}
            disabled={!journalText.trim()}
            className="px-6 py-2 bg-neutral-700 hover:bg-neutral-600 disabled:bg-neutral-800 disabled:text-neutral-600 text-white font-medium rounded-lg transition-colors"
          >
            Save to Journal
          </button>
        </motion.div>

        {/* Complete Step Button */}
        {!isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={handleCompleteStep}
              disabled={!hasCompletedMeditation}
              className="w-full px-8 py-4 bg-gradient-to-r from-accent-500 to-primary-500 hover:from-accent-600 hover:to-primary-600 disabled:from-neutral-700 disabled:to-neutral-700 disabled:text-neutral-500 text-white font-bold text-lg rounded-xl transition-all transform hover:scale-105 disabled:scale-100"
            >
              {hasCompletedMeditation ? 'Complete Day & Continue' : 'Complete Meditation First'}
            </button>
          </motion.div>
        )}

        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 bg-green-500/20 border border-green-500/30 rounded-xl text-center"
          >
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-xl font-semibold text-white mb-2">Day Completed!</h3>
            <p className="text-neutral-300">You earned {step.sparksReward} Sparks and {step.xpReward} XP</p>
          </motion.div>
        )}
      </div>

      {/* Universe Receipt Modal */}
      <AnimatePresence>
        {currentReceipt && (
          <UniverseReceipt
            receipt={currentReceipt}
            onClose={() => setCurrentReceipt(null)}
          />
        )}
      </AnimatePresence>

      {/* Signal Strength Modal */}
      <AnimatePresence>
        {currentSignalStrength && (
          <SignalStrength
            signalStrength={currentSignalStrength}
            onClose={() => setCurrentSignalStrength(null)}
            onUnlock={() => {
              alert('Clear audio unlocked! The interference has been cleared.');
            }}
          />
        )}
      </AnimatePresence>

      {/* Twin Flame Modal */}
      <AnimatePresence>
        {currentTwinFlame && (
          <TwinFlameMatch
            twinFlameCode={currentTwinFlame}
            onClose={() => setCurrentTwinFlame(null)}
            onMatch={(code) => {
              const matched = matchTwinFlame(code);
              if (matched) {
                alert('🔥 Twin Flame Match Found! You both earned 500 Sparks!');
              } else {
                alert('No match found. Keep sharing your code to find your Twin Flame!');
              }
            }}
          />
        )}
      </AnimatePresence>

      {/* Special Events Overlay */}
      <AnimatePresence>
        {showSpecialEvent && step?.specialEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSpecialEvent(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-md w-full bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 border-2 border-accent-500/50"
              onClick={(e) => e.stopPropagation()}
            >
              {step.specialEvent === 'glitch' && (
                <>
                  <AlertTriangle className="w-16 h-16 text-accent-500 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-2xl font-bold text-white text-center mb-4">
                    Signal Interference Detected
                  </h3>
                  <p className="text-neutral-300 text-center mb-6">
                    "They are looking for you..."
                  </p>
                  <p className="text-sm text-neutral-400 text-center mb-6">
                    Something is trying to reach you through the meditation. This is not a malfunction. 
                    Pay attention to the signs around you today.
                  </p>
                  <button
                    onClick={() => {
                      const signal = generateSignalStrength(stepNumber);
                      setCurrentSignalStrength(signal);
                      setShowSpecialEvent(false);
                    }}
                    className="w-full px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-lg transition-colors mb-3"
                  >
                    Check Signal Strength
                  </button>
                </>
              )}
              
              {step.specialEvent === 'be_the_sign' && (
                <>
                  <Sparkles className="w-16 h-16 text-accent-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white text-center mb-4">
                    You Are The Sign
                  </h3>
                  <p className="text-neutral-300 text-center mb-6">
                    Today, you do not look for a sign. You ARE the sign.
                  </p>
                  <p className="text-sm text-neutral-400 text-center mb-6">
                    Wear something RED today. If you see someone else wearing red, smile. 
                    You have just activated a synchronicity. Share your experience with #SignRoad
                  </p>
                </>
              )}
              
              {step.specialEvent === 'twin_flame' && (
                <>
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <Sparkles className="w-12 h-12 text-accent-500" />
                      <Sparkles className="w-12 h-12 text-primary-500 absolute top-0 left-6" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white text-center mb-4">
                    Twin Flame Connection
                  </h3>
                  <p className="text-neutral-300 text-center mb-6">
                    You have received your frequency code
                  </p>
                  <p className="text-sm text-neutral-400 text-center mb-6">
                    Somewhere in the world, another Seeker has the matching half of your code. 
                    Share yours to find your connection. When you match, you both receive 500 Sparks.
                  </p>
                  <button
                    onClick={() => {
                      const twinFlame = generateTwinFlameCode();
                      setCurrentTwinFlame(twinFlame);
                      setShowSpecialEvent(false);
                    }}
                    className="w-full px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-lg transition-colors mb-3"
                  >
                    Reveal My Code
                  </button>
                </>
              )}
              
              {step.specialEvent !== 'glitch' && step.specialEvent !== 'twin_flame' && (
                <button
                  onClick={() => setShowSpecialEvent(false)}
                  className="w-full px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Continue
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
