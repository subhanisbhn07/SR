import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Sparkles, Star, Calendar, MapPin } from 'lucide-react';
import { Sign, SignRarity, RARITY_SPARKS, SignLog } from '../../store/signsStore';
import { useThemeStore } from '../../store/themeStore';

interface UniverseReceiptProps {
  isOpen: boolean;
  onClose: () => void;
  sign: Sign;
  log: SignLog;
  userName?: string;
}

// Probability calculations based on rarity
const rarityProbabilities: Record<SignRarity, { base: number; label: string }> = {
  whispered: { base: 0.15, label: '15%' },
  spoken: { base: 0.08, label: '8%' },
  shouted: { base: 0.03, label: '3%' },
  thundered: { base: 0.008, label: '0.8%' },
  cosmos_aligned: { base: 0.001, label: '0.1%' },
};

const rarityLabels: Record<SignRarity, string> = {
  whispered: 'Whispered',
  spoken: 'Spoken',
  shouted: 'Shouted',
  thundered: 'Thundered',
  cosmos_aligned: 'Cosmos Aligned',
};

const rarityColors: Record<SignRarity, string> = {
  whispered: 'from-neutral-400 to-neutral-600',
  spoken: 'from-blue-400 to-blue-600',
  shouted: 'from-purple-400 to-purple-600',
  thundered: 'from-amber-400 to-amber-600',
  cosmos_aligned: 'from-emerald-400 to-teal-500',
};

export const UniverseReceipt: React.FC<UniverseReceiptProps> = ({
  isOpen,
  onClose,
  sign,
  log,
  userName = 'Traveler',
}) => {
  const { theme } = useThemeStore();
  const [isSharing, setIsSharing] = useState(false);

  const probability = rarityProbabilities[sign.rarity];
  const sparks = RARITY_SPARKS[sign.rarity];
  const foundDate = new Date(log.foundAt);

  // Calculate "cosmic odds" - a fun probability calculation
  const calculateCosmicOdds = () => {
    const dayOfYear = Math.floor((foundDate.getTime() - new Date(foundDate.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const hourOfDay = foundDate.getHours();
    const baseOdds = probability.base;
    
    // Add some mystical factors
    const lunarFactor = 1 + (Math.sin(dayOfYear * 0.1) * 0.2);
    const timeFactor = 1 + (Math.cos(hourOfDay * 0.26) * 0.1);
    
    const finalOdds = baseOdds * lunarFactor * timeFactor;
    return (finalOdds * 100).toFixed(4);
  };

  const cosmicOdds = calculateCosmicOdds();

  const handleShare = async () => {
    setIsSharing(true);
    
    const shareText = `I just received a sign from the universe! ${sign.emoji} ${sign.name}\n\n"${sign.meaning}"\n\nThe odds of this happening today: ${cosmicOdds}%\n\n#SignRoad #UniverseReceipt`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Universe Receipt',
          text: shareText,
          url: 'https://signroad.com',
        });
      } catch {
        // User cancelled or error
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareText);
      alert('Receipt copied to clipboard!');
    }
    
    setIsSharing(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
          transition={{ type: 'spring', damping: 20 }}
          onClick={e => e.stopPropagation()}
          className="w-full max-w-sm"
        >
          {/* Receipt Card */}
          <div className={`relative overflow-hidden rounded-3xl ${
            theme === 'dark' ? 'bg-neutral-900' : 'bg-white'
          }`}>
            {/* Decorative top border */}
            <div className={`h-2 bg-gradient-to-r ${rarityColors[sign.rarity]}`} />
            
            {/* Close button */}
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 p-2 rounded-full z-10 ${
                theme === 'dark' ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-neutral-100 hover:bg-neutral-200'
              }`}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="p-6 text-center">
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.ceil(RARITY_SPARKS[sign.rarity] / 25)
                        ? 'text-gold-500 fill-gold-500'
                        : theme === 'dark' ? 'text-neutral-700' : 'text-neutral-300'
                    }`}
                  />
                ))}
              </div>
              <h2 className={`text-sm font-medium uppercase tracking-wider ${
                theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                Universe Receipt
              </h2>
              <p className={`text-xs mt-1 ${
                theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'
              }`}>
                #{log.id.slice(-8).toUpperCase()}
              </p>
            </div>

            {/* Sign Display */}
            <div className="px-6 pb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="text-center mb-6"
              >
                <span className="text-7xl">{sign.emoji}</span>
              </motion.div>

              <div className="text-center mb-6">
                <h3 className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-neutral-900'
                }`}>
                  {sign.name}
                </h3>
                <p className={`text-sm mt-1 bg-gradient-to-r ${rarityColors[sign.rarity]} bg-clip-text text-transparent font-medium`}>
                  {rarityLabels[sign.rarity]} Sign
                </p>
              </div>

              {/* Meaning */}
              <div className={`p-4 rounded-2xl mb-6 ${
                theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-50'
              }`}>
                <p className={`text-center italic ${
                  theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                }`}>
                  "{sign.meaning}"
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className={`p-3 rounded-xl text-center ${
                  theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-50'
                }`}>
                  <Sparkles className="w-5 h-5 mx-auto mb-1 text-gold-500" />
                  <p className="text-lg font-bold text-gold-500">+{sparks}</p>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'
                  }`}>
                    Sparks Earned
                  </p>
                </div>
                <div className={`p-3 rounded-xl text-center ${
                  theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-50'
                }`}>
                  <Star className="w-5 h-5 mx-auto mb-1 text-purple-500" />
                  <p className={`text-lg font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-neutral-900'
                  }`}>
                    {cosmicOdds}%
                  </p>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'
                  }`}>
                    Cosmic Odds
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className={`space-y-2 text-sm ${
                theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
              }`}>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{foundDate.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 text-center">🕐</span>
                  <span>{foundDate.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}</span>
                </div>
                {log.locationNote && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{log.locationNote}</span>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className={`my-6 border-t border-dashed ${
                theme === 'dark' ? 'border-neutral-700' : 'border-neutral-200'
              }`} />

              {/* Footer */}
              <div className="text-center mb-6">
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                }`}>
                  Received by <span className="font-medium">{userName}</span>
                </p>
                <p className={`text-xs mt-1 ${
                  theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'
                }`}>
                  The universe is always speaking. Are you listening?
                </p>
              </div>

              {/* Share Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                disabled={isSharing}
                className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${
                  isSharing
                    ? 'bg-neutral-400 cursor-not-allowed'
                    : `bg-gradient-to-r ${rarityColors[sign.rarity]} text-white`
                }`}
              >
                <Share2 className="w-4 h-4" />
                {isSharing ? 'Sharing...' : 'Share My Receipt'}
              </motion.button>
            </div>

            {/* Decorative bottom */}
            <div className={`h-8 ${
              theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-50'
            }`}>
              <svg viewBox="0 0 400 20" className="w-full h-full" preserveAspectRatio="none">
                <path
                  d={`M0,0 ${[...Array(20)].map((_, i) => `L${i * 20 + 10},10 L${i * 20 + 20},0`).join(' ')} L400,0 L400,20 L0,20 Z`}
                  fill={theme === 'dark' ? '#171717' : '#ffffff'}
                />
              </svg>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
