import { motion } from 'framer-motion';
import { Share2, Download, X, Instagram, Twitter, AlertTriangle } from 'lucide-react';
import { SignalStrength as SignalStrengthType } from '../types/viral';
import { useState } from 'react';
import { useToast } from '../../../shared/hooks/useToast';
import { trackEvent } from '../../../shared/analytics/analytics';

interface SignalStrengthProps {
  signalStrength: SignalStrengthType;
  onClose: () => void;
  onUnlock?: () => void;
}

export const SignalStrength = ({ signalStrength, onClose, onUnlock }: SignalStrengthProps) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [hasShared, setHasShared] = useState(false);
  const toast = useToast();

  const handleShare = (platform: string) => {
    const text = `⚠️ Signal Interference Detected on Day ${signalStrength.dayNumber}!\n\nSignal Strength: ${signalStrength.strength}%\n\nThey are looking for me... 👁️ #SignRoad`;
    const url = 'https://signroad.com';

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        trackEvent({ name: 'signal_strength_shared', day: signalStrength.dayNumber, platform: 'twitter' });
        break;
      case 'instagram':
        toast.info('Instagram sharing: Copy the text and share to your story!');
        navigator.clipboard.writeText(text);
        trackEvent({ name: 'signal_strength_shared', day: signalStrength.dayNumber, platform: 'instagram' });
        setHasShared(true);
        break;
      case 'copy':
        navigator.clipboard.writeText(text + '\n' + url);
        toast.success('Copied to clipboard!');
        trackEvent({ name: 'signal_strength_shared', day: signalStrength.dayNumber, platform: 'copy' });
        setHasShared(true);
        break;
    }
    
    setHasShared(true);
    setShowShareMenu(false);
  };

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 600;

    const gradient = ctx.createLinearGradient(0, 0, 600, 600);
    gradient.addColorStop(0, '#0f0f1e');
    gradient.addColorStop(1, '#1a1a2e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 600, 600);

    ctx.strokeStyle = '#FAA546';
    ctx.lineWidth = 3;
    ctx.strokeRect(50, 50, 500, 500);

    ctx.font = 'bold 32px monospace';
    ctx.fillStyle = '#FAA546';
    ctx.textAlign = 'center';
    ctx.fillText('⚠️ SIGNAL INTERFERENCE', 300, 150);

    ctx.font = 'bold 80px monospace';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${signalStrength.strength}%`, 300, 300);

    ctx.font = '24px monospace';
    ctx.fillStyle = '#FAA546';
    ctx.fillText('SIGNAL STRENGTH', 300, 350);

    ctx.font = 'italic 20px monospace';
    ctx.fillStyle = '#999';
    ctx.fillText('"They are looking for you..."', 300, 450);

    ctx.font = '16px monospace';
    ctx.fillStyle = '#666';
    ctx.fillText('signroad.com', 300, 520);

    const link = document.createElement('a');
    link.download = `signal-strength-day${signalStrength.dayNumber}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleUnlock = () => {
    if (hasShared && onUnlock) {
      onUnlock();
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="max-w-md w-full bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 border-2 border-accent-500/50 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-neutral-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-neutral-400" />
        </button>

        {/* Warning Icon */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent-500/20 flex items-center justify-center border-2 border-accent-500"
        >
          <AlertTriangle className="w-12 h-12 text-accent-500" />
        </motion.div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Signal Interference Detected
        </h2>
        <p className="text-sm text-neutral-400 text-center mb-6">
          Day {signalStrength.dayNumber}
        </p>

        {/* Signal Strength Display */}
        <div className="bg-neutral-950/50 rounded-lg p-8 mb-6 border border-accent-500/30 text-center">
          <p className="text-sm text-neutral-400 mb-2">SIGNAL STRENGTH</p>
          <motion.p
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-6xl font-bold text-white mb-4"
          >
            {signalStrength.strength}%
          </motion.p>
          <p className="text-sm text-accent-400 italic">
            "They are looking for you..."
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-accent-500/10 border border-accent-500/30 rounded-lg p-4 mb-6">
          <p className="text-sm text-neutral-300 text-center">
            {hasShared 
              ? '✓ Signal shared! You can now unlock the clear audio.'
              : 'Share your Signal Strength to clear the interference and unlock the full meditation audio.'
            }
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {!hasShared ? (
            <>
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="w-full px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share Signal Strength
              </button>

              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="grid grid-cols-3 gap-2"
                >
                  <button
                    onClick={() => handleShare('instagram')}
                    className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-colors flex flex-col items-center gap-1"
                  >
                    <Instagram className="w-5 h-5" />
                    <span className="text-xs">Instagram</span>
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex flex-col items-center gap-1"
                  >
                    <Twitter className="w-5 h-5" />
                    <span className="text-xs">Twitter</span>
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="p-3 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors flex flex-col items-center gap-1"
                  >
                    <Share2 className="w-5 h-5" />
                    <span className="text-xs">Copy</span>
                  </button>
                </motion.div>
              )}
            </>
          ) : (
            <button
              onClick={handleUnlock}
              className="w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors"
            >
              Unlock Clear Audio
            </button>
          )}

          <button
            onClick={handleDownload}
            className="w-full px-6 py-3 bg-neutral-700 hover:bg-neutral-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Image
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
