import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, Sparkles, AlertTriangle, Camera, Upload, X } from 'lucide-react';
import { useJourneyStore } from '../features/journey/store/journeyStore';
import { useManifestationStore } from '../features/manifestation/store/manifestationStore';
import { useAuthStore } from '../store/authStore';
import { useViralStore } from '../features/viral/store/viralStore';
import { UniverseReceipt } from '../features/viral/components/UniverseReceipt';
import { SignalStrength } from '../features/viral/components/SignalStrength';
import { TwinFlameMatch } from '../features/viral/components/TwinFlameMatch';
import { useToast } from '../shared/hooks/useToast';
import { trackEvent } from '../shared/analytics/analytics';
import { AudioPlayer } from '../features/audio/components/AudioPlayer';
import { AmbiencePlayer } from '../features/audio/components/AmbiencePlayer';
import { useAudioStore } from '../features/audio/store/audioStore';
import { useSoundEffects } from '../features/audio/hooks/useSoundEffects';
import { meditationTracks } from '../features/audio/data/audioTracks';

interface DayDetailProps {
  stepNumber: number;
  onBack: () => void;
}

export const DayDetail = ({ stepNumber, onBack }: DayDetailProps) => {
  const { roadSteps, completeStep, userProgress } = useJourneyStore();
  const { logSign, addJournalEntry } = useManifestationStore();
  const { user } = useAuthStore();
  const { generateReceipt, generateSignalStrength, generateTwinFlameCode, matchTwinFlame } = useViralStore();
  const toast = useToast();
  const { playSound } = useSoundEffects();
  const { setTrack, pause, isPlaying, currentTime } = useAudioStore();
  
  const step = roadSteps.find(s => s.stepNumber === stepNumber);
  const [duration, setDuration] = useState(300); // 5 minutes default
  const [showSignLog, setShowSignLog] = useState(false);
  const [signNote, setSignNote] = useState('');
  const [signPhoto, setSignPhoto] = useState<string | null>(null);
  const [journalText, setJournalText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hasCompletedMeditation, setHasCompletedMeditation] = useState(false);
  const [hasLoggedSign, setHasLoggedSign] = useState(false);
  const [showSpecialEvent, setShowSpecialEvent] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState<ReturnType<typeof generateReceipt> | null>(null);
  const [currentSignalStrength, setCurrentSignalStrength] = useState<ReturnType<typeof generateSignalStrength> | null>(null);
  const [currentTwinFlame, setCurrentTwinFlame] = useState<ReturnType<typeof generateTwinFlameCode> | null>(null);

  const isCompleted = userProgress.completedSteps.includes(stepNumber);
  const isSubscribed = user?.mode === 'enterprise';

  // Initialize meditation audio track
  useEffect(() => {
    if (step && meditationTracks.length > 0) {
      // Use first meditation track by default
      setTrack(meditationTracks[0]);
    }
  }, [step, setTrack]);

  // Monitor audio playback completion
  useEffect(() => {
    if (isPlaying && currentTime >= duration && !hasCompletedMeditation) {
      pause();
      setHasCompletedMeditation(true);
      playSound('complete');
      toast.success('Meditation completed! +' + (step?.sparksReward || 0) + ' Sparks');
    }
  }, [isPlaying, currentTime, duration, hasCompletedMeditation, pause, playSound, toast, step]);

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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setSignPhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleLogSign = () => {
    if (!step) return;
    
    logSign({
      stepNumber: step.stepNumber,
      signName: step.signChallenge,
      found: true,
      note: signNote,
      photo: signPhoto || undefined,
    });
    
    const receipt = generateReceipt(
      step.signChallenge,
      step.signDescription,
      step.stepNumber,
      'Your Location'
    );
    
    trackEvent({ 
      name: 'sign_logged', 
      day: step.stepNumber, 
      sign: step.signChallenge 
    });
    
    trackEvent({ 
      name: 'universe_receipt_generated', 
      day: step.stepNumber, 
      sign: step.signChallenge,
      probability: receipt.probability 
    });
    
    playSound('success');
    setCurrentReceipt(receipt);
    setHasLoggedSign(true);
    setShowSignLog(false);
    setSignNote('');
    setSignPhoto(null);
  };

  const handleSaveJournal = () => {
    if (!step || !journalText.trim()) return;
    
    addJournalEntry({
      stepNumber: step.stepNumber,
      content: journalText,
      prompt: `Day ${step.stepNumber}: ${step.title}`,
      isPublic: false,
    });
    
    trackEvent({ name: 'journal_entry_saved', day: step.stepNumber });
    playSound('success');
    toast.success('Journal entry saved!');
    
    setJournalText('');
  };

  const handleCompleteStep = () => {
    if (!hasCompletedMeditation) {
      toast.warning('Please complete the meditation first!');
      playSound('error');
      return;
    }
    
    if (step) {
      completeStep(step.stepNumber);
      playSound('unlock');
      toast.success(`Day ${step.stepNumber} completed! +${step.sparksReward} Sparks`);
      
      trackEvent({ 
        name: 'meditation_completed', 
        day: step.stepNumber, 
        duration 
      });
      
      trackEvent({ 
        name: 'day_completed', 
        day: step.stepNumber, 
        sparks: step.sparksReward 
      });
      
      if (step.specialEvent) {
        trackEvent({ 
          name: 'special_event_triggered', 
          day: step.stepNumber, 
          eventType: step.specialEvent 
        });
      }
      
      onBack();
    }
  };


  return (
    <div className="min-h-screen">
      {/* Header - Watercolor Style */}
      <div className="sticky top-0 z-10 backdrop-blur-sm border-b" style={{ backgroundColor: 'rgba(232, 245, 241, 0.9)', borderColor: 'rgba(125, 211, 192, 0.3)' }}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 transition-colors"
            style={{ color: '#4a5568' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#2d3748')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#4a5568')}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Road</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Step Header - Watercolor Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: 'rgba(125, 211, 192, 0.2)', color: '#5fb8a6' }}>
            Day {step.stepNumber}
          </div>
          <h1 className="text-4xl font-bold mb-2 text-watercolor" style={{ color: '#2d3748' }}>{step.title}</h1>
          <p className="text-xl" style={{ color: '#4a5568' }}>{step.description}</p>
        </motion.div>

        {/* Audio Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="card-watercolor rounded-2xl p-8">
            <h2 className="text-lg font-semibold mb-4" style={{ color: '#2d3748' }}>Guided Meditation</h2>
            
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
                    pause();
                  }}
                  className={`
                    px-4 py-2 rounded-lg font-medium transition-colors
                    ${duration === value
                      ? 'btn-watercolor'
                      : 'bg-white/60 hover:bg-white/80 border border-[#a8e6d7]'
                    }
                  `}
                  style={duration !== value ? { color: '#4a5568' } : {}}
                >
                  {label} ({Math.floor(value / 60)}m)
                </button>
              ))}
            </div>

            {/* Ambience Player */}
            <AmbiencePlayer isSubscribed={isSubscribed} className="mb-6" />

            {/* Audio Player Component */}
            <AudioPlayer showControls={true} compact={false} />

            {/* Meditation Script Preview */}
            <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(168, 230, 215, 0.15)' }}>
              <p className="italic text-sm leading-relaxed" style={{ color: '#4a5568' }}>
                "{step.meditationScript}"
              </p>
            </div>

            {hasCompletedMeditation && !isCompleted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-4 rounded-lg flex items-center gap-3"
                style={{ backgroundColor: 'rgba(125, 211, 192, 0.2)', border: '1px solid rgba(125, 211, 192, 0.3)' }}
              >
                <CheckCircle className="w-5 h-5" style={{ color: '#5fb8a6' }} />
                <span className="font-medium" style={{ color: '#5fb8a6' }}>Meditation completed! +{step.sparksReward} Sparks</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Sign of the Day - Watercolor Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-watercolor rounded-2xl p-8"
        >
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#2d3748' }}>Sign of the Day</h2>
          <div className="mb-4">
            <div className="text-2xl font-bold mb-2" style={{ color: '#f4c77e' }}>{step.signChallenge}</div>
            <p style={{ color: '#4a5568' }}>{step.signDescription}</p>
          </div>

          {!hasLoggedSign && !isCompleted ? (
            <>
              {!showSignLog ? (
                <button
                  onClick={() => setShowSignLog(true)}
                  className="w-full btn-watercolor"
                >
                  I Found the Sign!
                </button>
              ) : (
                <div className="space-y-4">
                  <textarea
                    value={signNote}
                    onChange={(e) => setSignNote(e.target.value)}
                    placeholder="Describe where and when you found the sign... (optional)"
                    className="w-full px-4 py-3 rounded-lg resize-none focus:outline-none"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                      border: '2px solid rgba(125, 211, 192, 0.3)',
                      color: '#2d3748',
                      
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(125, 211, 192, 0.6)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(125, 211, 192, 0.3)'}
                    rows={3}
                  />
                  
                  {/* Photo Upload */}
                  <div className="space-y-2">
                    <p className="text-sm" style={{ color: '#718096' }}>Add a photo (optional)</p>
                    
                    {signPhoto ? (
                      <div className="relative">
                        <img 
                          src={signPhoto} 
                          alt="Sign" 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          onClick={handleRemovePhoto}
                          className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors"
                          style={{ backgroundColor: 'rgba(168, 230, 215, 0.3)', border: '2px solid rgba(125, 211, 192, 0.3)', color: '#2d3748' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168, 230, 215, 0.5)'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(168, 230, 215, 0.3)'}
                        >
                          <Upload className="w-4 h-4" />
                          <span>Upload Photo</span>
                        </button>
                        <button
                          onClick={() => {
                            if (fileInputRef.current) {
                              fileInputRef.current.setAttribute('capture', 'environment');
                              fileInputRef.current.click();
                            }
                          }}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors"
                          style={{ backgroundColor: 'rgba(168, 230, 215, 0.3)', border: '2px solid rgba(125, 211, 192, 0.3)', color: '#2d3748' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168, 230, 215, 0.5)'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(168, 230, 215, 0.3)'}
                        >
                          <Camera className="w-4 h-4" />
                          <span>Take Photo</span>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={handleLogSign}
                      className="flex-1 btn-watercolor"
                    >
                      Log Sign (+5 Sparks)
                    </button>
                    <button
                      onClick={() => {
                        setShowSignLog(false);
                        setSignPhoto(null);
                      }}
                      className="px-6 py-3 font-semibold rounded-lg transition-colors"
                      style={{ backgroundColor: 'rgba(168, 230, 215, 0.3)', border: '2px solid rgba(125, 211, 192, 0.3)', color: '#2d3748' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168, 230, 215, 0.5)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(168, 230, 215, 0.3)'}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="p-4 rounded-lg flex items-center gap-3" style={{ backgroundColor: 'rgba(125, 211, 192, 0.2)', border: '1px solid rgba(125, 211, 192, 0.3)' }}>
              <CheckCircle className="w-5 h-5" style={{ color: '#5fb8a6' }} />
              <span className="font-medium" style={{ color: '#5fb8a6' }}>Sign logged!</span>
            </div>
          )}
        </motion.div>

        {/* Journal - Watercolor Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-watercolor rounded-2xl p-8"
        >
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#2d3748' }}>Reflection</h2>
          <p className="mb-4 text-sm" style={{ color: '#4a5568' }}>
            What insights or experiences did you have today?
          </p>
          <textarea
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            placeholder="Write your thoughts here..."
            className="w-full px-4 py-3 rounded-lg resize-none mb-4 focus:outline-none"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.8)', 
              border: '2px solid rgba(125, 211, 192, 0.3)',
              color: '#2d3748',
              
            }}
            onFocus={(e) => e.target.style.borderColor = 'rgba(125, 211, 192, 0.6)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(125, 211, 192, 0.3)'}
            rows={5}
          />
          <button
            onClick={handleSaveJournal}
            disabled={!journalText.trim()}
            className="px-6 py-2 font-medium rounded-lg transition-colors"
            style={{ 
              backgroundColor: !journalText.trim() ? 'rgba(168, 230, 215, 0.2)' : 'rgba(168, 230, 215, 0.4)',
              border: '2px solid rgba(125, 211, 192, 0.3)',
              color: !journalText.trim() ? '#718096' : '#2d3748',
              cursor: !journalText.trim() ? 'not-allowed' : 'pointer'
            }}
            onMouseEnter={(e) => {
              if (journalText.trim()) e.currentTarget.style.backgroundColor = 'rgba(168, 230, 215, 0.6)';
            }}
            onMouseLeave={(e) => {
              if (journalText.trim()) e.currentTarget.style.backgroundColor = 'rgba(168, 230, 215, 0.4)';
            }}
          >
            Save to Journal
          </button>
        </motion.div>

        {/* Complete Step Button - Watercolor Style */}
        {!isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={handleCompleteStep}
              disabled={!hasCompletedMeditation}
              className="w-full px-8 py-4 font-bold text-lg rounded-xl transition-all transform disabled:scale-100"
              style={{
                background: hasCompletedMeditation ? 'linear-gradient(135deg, #7dd3c0 0%, #a8e6d7 100%)' : 'rgba(168, 230, 215, 0.2)',
                boxShadow: hasCompletedMeditation ? '0 4px 6px rgba(125, 211, 192, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)' : 'none',
                border: '2px solid rgba(95, 184, 166, 0.5)',
                color: hasCompletedMeditation ? '#2d3748' : '#718096',
                ,
                cursor: hasCompletedMeditation ? 'pointer' : 'not-allowed'
              }}
              onMouseEnter={(e) => {
                if (hasCompletedMeditation) {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(125, 211, 192, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (hasCompletedMeditation) {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(125, 211, 192, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                }
              }}
            >
              {hasCompletedMeditation ? 'Complete Day & Continue' : 'Complete Meditation First'}
            </button>
          </motion.div>
        )}

        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-xl text-center card-watercolor"
            style={{ border: '2px solid rgba(125, 211, 192, 0.3)' }}
          >
            <CheckCircle className="w-12 h-12 mx-auto mb-3" style={{ color: '#5fb8a6' }} />
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#2d3748' }}>Day Completed!</h3>
            <p style={{ color: '#4a5568' }}>You earned {step.sparksReward} Sparks and {step.xpReward} XP</p>
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
              toast.success('Clear audio unlocked! The interference has been cleared.');
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
                toast.success('🔥 Twin Flame Match Found! You both earned 500 Sparks!');
              } else {
                toast.info('No match found. Keep sharing your code to find your Twin Flame!');
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
              
              {step.specialEvent === 'invitation_ritual' && (
                <>
                  <Sparkles className="w-16 h-16 text-accent-500 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-2xl font-bold text-white text-center mb-4">
                    The Invitation Ritual
                  </h3>
                  <p className="text-neutral-300 text-center mb-6">
                    You have opened the door. The universe has heard your call.
                  </p>
                  <p className="text-sm text-neutral-400 text-center mb-6">
                    Today marks a turning point. You are no longer just observing - you are actively inviting your manifestation. 
                    Stand before an open door or window and say: "I am ready."
                  </p>
                </>
              )}
              
              {step.specialEvent === 'halfway_celebration' && (
                <>
                  <CheckCircle className="w-16 h-16 text-accent-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white text-center mb-4">
                    🎉 Halfway to Mastery! 🎉
                  </h3>
                  <p className="text-neutral-300 text-center mb-6">
                    50 days. 50 meditations. 50 signs.
                  </p>
                  <p className="text-sm text-neutral-400 text-center mb-6">
                    You have walked half the road. Take a moment to honor how far you have come. 
                    The second half will be different - you are different. You carry wisdom, strength, and clarity.
                  </p>
                  <div className="bg-accent-500/20 border border-accent-500/30 rounded-lg p-4 mb-4">
                    <p className="text-accent-300 text-center font-semibold">Bonus: +50 Sparks!</p>
                  </div>
                </>
              )}
              
              {step.specialEvent === 'threshold_crossing' && (
                <>
                  <AlertTriangle className="w-16 h-16 text-accent-500 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-2xl font-bold text-white text-center mb-4">
                    The Threshold of Mastery
                  </h3>
                  <p className="text-neutral-300 text-center mb-6">
                    You stand at the edge of transformation
                  </p>
                  <p className="text-sm text-neutral-400 text-center mb-6">
                    60 days. You have walked through fire. You have faced your shadows. You have learned the laws of manifestation. 
                    The final 30 days will test everything you have learned. Are you ready to cross into mastery?
                  </p>
                </>
              )}
              
              {step.specialEvent === 'self_celebration' && (
                <>
                  <Sparkles className="w-16 h-16 text-accent-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white text-center mb-4">
                    Celebration of Self
                  </h3>
                  <p className="text-neutral-300 text-center mb-6">
                    70 days. You have shown up every single day.
                  </p>
                  <p className="text-sm text-neutral-400 text-center mb-6">
                    Today, we celebrate YOU. Not what you have achieved, but who you have become. 
                    When you see or hear your name today, pause and say: "I am proud of you." You have earned this.
                  </p>
                  <div className="bg-primary-500/20 border border-primary-500/30 rounded-lg p-4 mb-4">
                    <p className="text-primary-300 text-center font-semibold">You are worthy of your own love.</p>
                  </div>
                </>
              )}
              
              {step.specialEvent === 'elevation_ceremony' && (
                <>
                  <CheckCircle className="w-16 h-16 text-accent-500 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-2xl font-bold text-white text-center mb-4">
                    The Elevation Ceremony
                  </h3>
                  <p className="text-neutral-300 text-center mb-6">
                    80 days. You have climbed so high.
                  </p>
                  <p className="text-sm text-neutral-400 text-center mb-6">
                    You are not who you were. You see further. You understand deeper. You are ascending. 
                    Only 10 days remain until you reach mastery. The summit is in sight.
                  </p>
                  <div className="bg-accent-500/20 border border-accent-500/30 rounded-lg p-4 mb-4">
                    <p className="text-accent-300 text-center font-semibold">The final ascent begins now.</p>
                  </div>
                </>
              )}
              
              {step.specialEvent === 'master_completion' && (
                <>
                  <div className="flex justify-center mb-4">
                    <CheckCircle className="w-20 h-20 text-accent-500 animate-pulse" />
                  </div>
                  <h3 className="text-3xl font-bold text-white text-center mb-4">
                    🏆 Master Achieved 🏆
                  </h3>
                  <p className="text-neutral-300 text-center mb-6">
                    90 days. 90 meditations. 90 signs.
                  </p>
                  <p className="text-sm text-neutral-400 text-center mb-6">
                    You have walked the entire road. You are no longer a wanderer. You are no longer a seeker. 
                    You are a MASTER. The road does not end here - it transforms. You now walk as a conscious creator.
                  </p>
                  <div className="bg-gradient-to-r from-accent-500/20 to-primary-500/20 border border-accent-500/30 rounded-lg p-6 mb-4">
                    <p className="text-accent-300 text-center font-bold text-lg mb-2">Welcome home, Master.</p>
                    <p className="text-neutral-300 text-center text-sm">You have earned your place in the Hall of Fame.</p>
                  </div>
                  <div className="bg-accent-500/20 border border-accent-500/30 rounded-lg p-4 mb-4">
                    <p className="text-accent-300 text-center font-semibold">Bonus: +100 Sparks!</p>
                  </div>
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
