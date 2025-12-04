import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX, ChevronDown, Star } from 'lucide-react';
import { WellnessSession } from '../../../shared/types/wellness';
import { useWellnessStore } from '../store/wellnessStore';
import { useAuthStore } from '../../auth/store/authStore';
import { AMBIENT_SOUNDS, AmbientSound } from '../config/ambientSounds';
import { Button } from '../../../shared/ui/Button';

interface VoiceModePlayerProps {
  session: WellnessSession;
  onClose: () => void;
}

export const VoiceModePlayer: React.FC<VoiceModePlayerProps> = ({ session, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [rating, setRating] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [activeAmbience, setActiveAmbience] = useState<Set<string>>(new Set());
  const [ambienceMuted, setAmbienceMuted] = useState(false);
  const [showAmbiencePanel, setShowAmbiencePanel] = useState(false);

  const ambienceRefs = useRef<Map<string, HTMLAudioElement>>(new Map());
  const { completeSession } = useWellnessStore();
  const { updateStreak } = useAuthStore();
  const totalTime = session.duration * 60;
  const progress = (currentTime / totalTime) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTime < totalTime) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          if (newTime >= totalTime) { setIsPlaying(false); setShowRating(true); return totalTime; }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, totalTime]);

  const toggleAmbience = useCallback((sound: AmbientSound) => {
    setActiveAmbience(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sound.id)) {
        const audio = ambienceRefs.current.get(sound.id);
        if (audio) { audio.pause(); audio.currentTime = 0; }
        newSet.delete(sound.id);
      } else if (newSet.size < 4) {
        let audio = ambienceRefs.current.get(sound.id);
        if (!audio) {
          audio = new Audio(sound.audioUrl);
          audio.loop = true;
          audio.volume = sound.defaultVolume;
          ambienceRefs.current.set(sound.id, audio);
        }
        if (isPlaying && !ambienceMuted) audio.play().catch(() => {});
        newSet.add(sound.id);
      }
      return newSet;
    });
  }, [isPlaying, ambienceMuted]);

  useEffect(() => {
    activeAmbience.forEach(id => {
      const audio = ambienceRefs.current.get(id);
      if (audio) {
        if (isPlaying && !ambienceMuted) audio.play().catch(() => {});
        else audio.pause();
      }
    });
  }, [isPlaying, ambienceMuted, activeAmbience]);

  useEffect(() => {
    return () => {
      ambienceRefs.current.forEach(audio => { audio.pause(); audio.src = ''; });
      ambienceRefs.current.clear();
    };
  }, []);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleAmbienceMute = () => setAmbienceMuted(!ambienceMuted);
  const formatTime = (s: number) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;
  const handleComplete = () => { completeSession(rating); updateStreak(); onClose(); };
  const getStateText = () => !isPlaying && currentTime === 0 ? 'Tap to begin' : isPlaying ? 'Guidance in progress...' : 'Paused';

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-gradient-to-b from-[#0a0512] via-[#0d0618] to-[#05030a]">
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <button onClick={onClose} className="p-2 text-white/60 hover:text-white transition-colors" aria-label="Minimize"><ChevronDown className="w-6 h-6" /></button>
          <div className="text-center">
            <p className="text-white/40 text-xs uppercase tracking-wider">Today's Learning</p>
            <p className="text-white/80 text-sm font-medium">{session.title}</p>
          </div>
          <button onClick={onClose} className="p-2 text-white/60 hover:text-white transition-colors" aria-label="Close"><X className="w-6 h-6" /></button>
        </div>
        <div className="flex flex-col items-center justify-center h-full px-6">
          {!showRating ? (
            <>
              <div className="relative mb-8">
                <motion.div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)', width: '280px', height: '280px', left: '-40px', top: '-40px' }} animate={{ scale: isPlaying ? [1, 1.2, 1] : [1, 1.05, 1], opacity: isPlaying ? [0.5, 0.8, 0.5] : [0.3, 0.5, 0.3] }} transition={{ duration: isPlaying ? 1.5 : 3, repeat: Infinity, ease: 'easeInOut' }} />
                <motion.div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 60%)', width: '240px', height: '240px', left: '-20px', top: '-20px' }} animate={{ scale: isPlaying ? [1, 1.15, 1] : [1, 1.03, 1], opacity: isPlaying ? [0.6, 1, 0.6] : [0.4, 0.6, 0.4] }} transition={{ duration: isPlaying ? 1.2 : 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }} />
                <motion.button onClick={togglePlay} className="relative w-[200px] h-[200px] rounded-full flex items-center justify-center cursor-pointer" style={{ background: 'radial-gradient(circle at 30% 30%, #a855f7 0%, #6b21a8 40%, #3b0764 80%, #1e0533 100%)', boxShadow: isPlaying ? '0 0 60px rgba(168,85,247,0.6), 0 0 120px rgba(236,72,153,0.3), inset 0 0 30px rgba(255,255,255,0.1)' : '0 0 40px rgba(168,85,247,0.4), 0 0 80px rgba(236,72,153,0.2), inset 0 0 20px rgba(255,255,255,0.05)' }} animate={{ scale: isPlaying ? [1, 1.02, 1] : 1 }} transition={{ duration: 1, repeat: isPlaying ? Infinity : 0, ease: 'easeInOut' }} whileTap={{ scale: 0.95 }} aria-label={isPlaying ? 'Pause' : 'Play'}>
                  <div className="absolute w-16 h-16 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)', top: '25%', left: '25%' }} />
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                    <motion.circle cx="100" cy="100" r="96" fill="none" stroke="rgba(236,72,153,0.8)" strokeWidth="2" strokeLinecap="round" strokeDasharray={2 * Math.PI * 96} strokeDashoffset={2 * Math.PI * 96 * (1 - progress / 100)} style={{ filter: 'drop-shadow(0 0 6px rgba(236,72,153,0.8))' }} />
                  </svg>
                </motion.button>
              </div>
              <motion.p className="text-white/60 text-lg mb-2" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}>{getStateText()}</motion.p>
              <p className="text-white/40 text-sm mb-12">{formatTime(currentTime)} / {formatTime(totalTime)}</p>
              <div className="w-full max-w-md">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white/60 text-sm">Ambience</p>
                  <button onClick={toggleAmbienceMute} className="p-2 text-white/40 hover:text-white transition-colors" aria-label={ambienceMuted ? 'Unmute' : 'Mute'}>{ambienceMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}</button>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {AMBIENT_SOUNDS.slice(0, 6).map((sound) => (
                    <motion.button key={sound.id} onClick={() => toggleAmbience(sound)} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all ${activeAmbience.has(sound.id) ? 'bg-purple-500/30 text-white border border-purple-400/50' : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'}`} whileTap={{ scale: 0.95 }}><span className="mr-1">{sound.icon}</span>{sound.name}</motion.button>
                  ))}
                  <motion.button onClick={() => setShowAmbiencePanel(true)} className="flex-shrink-0 px-4 py-2 rounded-full text-sm bg-white/5 text-white/60 border border-white/10 hover:bg-white/10" whileTap={{ scale: 0.95 }}>More...</motion.button>
                </div>
                {activeAmbience.size > 0 && <p className="text-white/30 text-xs mt-2">{activeAmbience.size} sound{activeAmbience.size > 1 ? 's' : ''} selected</p>}
              </div>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6">
              <div className="text-6xl mb-4">&#10024;</div>
              <h3 className="text-2xl font-bold text-white">Session Complete!</h3>
              <p className="text-white/60">How would you rate this session?</p>
              <div className="flex items-center justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setRating(star)} className="p-1">
                    <Star className={`w-8 h-8 transition-colors duration-200 ${star <= rating ? 'text-purple-400 fill-current' : 'text-white/30 hover:text-purple-300'}`} />
                  </button>
                ))}
              </div>
              <div className="flex space-x-4 justify-center">
                <Button variant="outline" onClick={onClose} className="border-white/20 text-white hover:bg-white/10">Skip</Button>
                <Button onClick={handleComplete} disabled={rating === 0} className="bg-purple-600 hover:bg-purple-700">Complete</Button>
              </div>
            </motion.div>
          )}
        </div>
        <AnimatePresence>
          {showAmbiencePanel && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-[60]" onClick={() => setShowAmbiencePanel(false)}>
              <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="absolute bottom-0 left-0 right-0 bg-[#1a0f2e] rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6" />
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-lg font-semibold">Choose Ambience</h3>
                  <p className="text-white/40 text-sm">{activeAmbience.size}/4 selected</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {AMBIENT_SOUNDS.map((sound) => (
                    <motion.button key={sound.id} onClick={() => toggleAmbience(sound)} className={`p-4 rounded-xl text-center transition-all ${activeAmbience.has(sound.id) ? 'bg-purple-500/30 border-2 border-purple-400/50' : 'bg-white/5 border-2 border-transparent hover:bg-white/10'}`} whileTap={{ scale: 0.95 }} disabled={!activeAmbience.has(sound.id) && activeAmbience.size >= 4}>
                      <span className="text-2xl block mb-1">{sound.icon}</span>
                      <span className={`text-sm ${activeAmbience.has(sound.id) ? 'text-white' : 'text-white/60'}`}>{sound.name}</span>
                    </motion.button>
                  ))}
                </div>
                <Button onClick={() => setShowAmbiencePanel(false)} className="w-full mt-6 bg-purple-600 hover:bg-purple-700">Done</Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
