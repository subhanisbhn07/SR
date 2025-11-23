import { motion } from 'framer-motion';
import { Share2, Download, X, Instagram, Twitter, Heart, Sparkles } from 'lucide-react';
import { TwinFlameCode } from '../types/viral';
import { useState } from 'react';

interface TwinFlameMatchProps {
  twinFlameCode: TwinFlameCode;
  onClose: () => void;
  onMatch?: (code: string) => void;
}

export const TwinFlameMatch = ({ twinFlameCode, onClose, onMatch }: TwinFlameMatchProps) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [matchCode, setMatchCode] = useState('');
  const [isMatching, setIsMatching] = useState(false);

  const handleShare = (platform: string) => {
    const text = `🔥 I just received my Twin Flame Code on Day 12!\n\nCode: ${twinFlameCode.code}\n\nAre you my match? #SignRoadTwinFlame`;
    const url = 'https://signroad.com';

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'instagram':
        alert('Instagram sharing: Copy the text and share to your story!\n\n' + text);
        break;
      case 'copy':
        navigator.clipboard.writeText(text + '\n' + url);
        alert('Copied to clipboard!');
        break;
    }
    
    setShowShareMenu(false);
  };

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 800;

    const gradient = ctx.createLinearGradient(0, 0, 600, 800);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#2d1b3d');
    gradient.addColorStop(1, '#1a1a2e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 600, 800);

    ctx.strokeStyle = '#FAA546';
    ctx.lineWidth = 4;
    ctx.setLineDash([10, 5]);
    ctx.strokeRect(100, 150, 400, 500);

    ctx.font = 'bold 28px sans-serif';
    ctx.fillStyle = '#FAA546';
    ctx.textAlign = 'center';
    ctx.fillText('🔥 TWIN FLAME CODE 🔥', 300, 120);

    ctx.font = 'bold 48px monospace';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(twinFlameCode.code, 300, 400);

    ctx.font = 'italic 20px sans-serif';
    ctx.fillStyle = '#999';
    ctx.fillText('Share to find your match', 300, 500);
    ctx.fillText('Reward: 500 Sparks each', 300, 540);

    ctx.font = '16px monospace';
    ctx.fillStyle = '#666';
    ctx.fillText('#SignRoadTwinFlame', 300, 720);

    const link = document.createElement('a');
    link.download = `twin-flame-${twinFlameCode.code}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleMatchAttempt = () => {
    if (!matchCode.trim() || !onMatch) return;
    
    setIsMatching(true);
    setTimeout(() => {
      onMatch(matchCode);
      setIsMatching(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="max-w-md w-full bg-gradient-to-br from-purple-900/50 to-neutral-900 rounded-2xl p-8 border-2 border-accent-500/50 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-neutral-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-neutral-400" />
        </button>

        {/* Header */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent-500 to-pink-500 flex items-center justify-center"
        >
          <Heart className="w-12 h-12 text-white fill-white" />
        </motion.div>

        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Twin Flame Code
        </h2>
        <p className="text-sm text-neutral-400 text-center mb-6">
          Day 12 - The Connection
        </p>

        {twinFlameCode.isMatched ? (
          /* Matched State */
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center"
            >
              <Sparkles className="w-16 h-16 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">Match Found!</h3>
            <p className="text-neutral-300 mb-4">
              You've connected with your Twin Flame
            </p>
            <div className="bg-accent-500/20 border border-accent-500/30 rounded-lg p-4">
              <p className="text-accent-400 font-bold text-lg">+500 Sparks</p>
              <p className="text-sm text-neutral-400">Reward for both travelers</p>
            </div>
          </div>
        ) : (
          /* Unmatched State */
          <>
            {/* Code Display */}
            <div className="bg-neutral-950/50 rounded-lg p-8 mb-6 border-2 border-dashed border-accent-500/50 text-center">
              <p className="text-sm text-neutral-400 mb-3">YOUR CODE</p>
              <motion.p
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-4xl font-bold text-white tracking-wider mb-4 font-mono"
              >
                {twinFlameCode.code}
              </motion.p>
              <p className="text-xs text-neutral-500">
                Share this code to find your match
              </p>
            </div>

            {/* Instructions */}
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-neutral-300 text-center mb-2">
                Somewhere in the world, another traveler has the matching code.
              </p>
              <p className="text-xs text-neutral-400 text-center">
                Share your code using #SignRoadTwinFlame to find them!
              </p>
            </div>

            {/* Match Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Found a matching code?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={matchCode}
                  onChange={(e) => setMatchCode(e.target.value.toUpperCase())}
                  placeholder="XXXX-XXXX"
                  maxLength={9}
                  className="flex-1 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-accent-500 font-mono"
                />
                <button
                  onClick={handleMatchAttempt}
                  disabled={!matchCode.trim() || isMatching}
                  className="px-6 py-2 bg-accent-500 hover:bg-accent-600 disabled:bg-neutral-700 disabled:text-neutral-500 text-white font-semibold rounded-lg transition-colors"
                >
                  {isMatching ? '...' : 'Match'}
                </button>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="w-full px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share Your Code
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

              <button
                onClick={handleDownload}
                className="w-full px-6 py-3 bg-neutral-700 hover:bg-neutral-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Code Image
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};
