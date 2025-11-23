import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Pause, Volume2, CheckCircle } from 'lucide-react';
import { useJourneyStore } from '../store/journeyStore';
import { useManifestationStore } from '../store/manifestationStore';

interface DayDetailProps {
  stepNumber: number;
  onBack: () => void;
}

export const DayDetail = ({ stepNumber, onBack }: DayDetailProps) => {
  const { roadSteps, completeStep, userProgress } = useJourneyStore();
  const { logSign, addJournalEntry } = useManifestationStore();
  
  const step = roadSteps.find(s => s.stepNumber === stepNumber);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(300); // 5 minutes default
  const [showSignLog, setShowSignLog] = useState(false);
  const [signNote, setSignNote] = useState('');
  const [journalText, setJournalText] = useState('');
  const [hasCompletedMeditation, setHasCompletedMeditation] = useState(false);
  const [hasLoggedSign, setHasLoggedSign] = useState(false);

  const isCompleted = userProgress.completedSteps.includes(stepNumber);

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
    </div>
  );
};
