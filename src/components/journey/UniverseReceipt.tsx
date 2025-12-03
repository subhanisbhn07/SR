import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Download, Share2, Star } from 'lucide-react';
import { UniverseReceipt as UniverseReceiptType, RARITY_CONFIG } from '../../types/journey';

interface UniverseReceiptProps {
  receipt: UniverseReceiptType;
  onClose: () => void;
}

export const UniverseReceipt: React.FC<UniverseReceiptProps> = ({ receipt, onClose }) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const getRarityStars = () => {
    const stars = RARITY_CONFIG[receipt.rarity].stars;
    return Array.from({ length: stars }).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
    ));
  };

  const getRarityGradient = () => {
    switch (receipt.rarity) {
      case 'mythic':
        return 'from-purple-600 via-pink-500 to-amber-500';
      case 'rare':
        return 'from-blue-500 via-purple-500 to-pink-500';
      default:
        return 'from-indigo-600 via-purple-600 to-pink-600';
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Universe Receipt - SignRoad',
      text: `I found a ${receipt.rarity} ${receipt.signName} ${receipt.signEmoji} on Day ${receipt.dayNumber} of my SignRoad journey! The probability was 1 in ${receipt.probability}. ${receipt.message}`,
      url: 'https://signroad.com',
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareData.text + ' ' + shareData.url);
      alert('Copied to clipboard!');
    }
  };

  const handleDownload = () => {
    // In a real app, this would use html2canvas or similar to generate an image
    alert('Download feature coming soon! For now, take a screenshot.');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>

      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="w-full max-w-sm"
      >
        {/* Receipt card */}
        <div
          ref={receiptRef}
          className={`relative bg-gradient-to-br ${getRarityGradient()} p-1 rounded-3xl shadow-2xl`}
          style={{
            boxShadow:
              receipt.rarity === 'mythic'
                ? '0 0 60px rgba(168, 85, 247, 0.5), 0 0 120px rgba(236, 72, 153, 0.3)'
                : receipt.rarity === 'rare'
                ? '0 0 40px rgba(139, 92, 246, 0.4)'
                : '0 0 30px rgba(99, 102, 241, 0.3)',
          }}
        >
          {/* Holographic effect for mythic */}
          {receipt.rarity === 'mythic' && (
            <motion.div
              animate={{
                background: [
                  'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
                  'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                  'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-3xl pointer-events-none"
            />
          )}

          <div className="bg-gray-900 rounded-3xl p-6 relative overflow-hidden">
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white/20 rounded-tl-3xl" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-white/20 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-white/20 rounded-bl-3xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white/20 rounded-br-3xl" />

            {/* Header */}
            <div className="text-center mb-6">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-3xl mb-2"
              >
                🌌
              </motion.div>
              <h2 className="text-xl font-bold text-white tracking-wider">UNIVERSE RECEIPT</h2>
            </div>

            {/* Divider */}
            <div className="border-t border-dashed border-white/20 my-4" />

            {/* Sign info */}
            <div className="text-center mb-6">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-3"
              >
                {receipt.signEmoji}
              </motion.div>
              <h3 className="text-2xl font-bold text-white">{receipt.signName}</h3>
              <p className="text-purple-300 text-sm mt-1">{formatDate(receipt.foundAt)}</p>
              {receipt.location && (
                <p className="text-purple-400 text-sm">{receipt.location}</p>
              )}
            </div>

            {/* Rarity */}
            <div className="bg-white/5 rounded-xl p-4 mb-4">
              <p className="text-purple-300 text-sm mb-2">Synchronicity Level</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">{getRarityStars()}</div>
                <span
                  className={`font-bold ${
                    receipt.rarity === 'mythic'
                      ? 'text-amber-400'
                      : receipt.rarity === 'rare'
                      ? 'text-purple-400'
                      : 'text-blue-400'
                  }`}
                >
                  {receipt.rarity.toUpperCase()}
                </span>
              </div>
              <p className="text-white font-semibold mt-2">{receipt.rarityLabel}</p>
            </div>

            {/* Probability */}
            <div className="bg-white/5 rounded-xl p-4 mb-4">
              <p className="text-purple-300 text-sm mb-1">Probability of Finding</p>
              <p className="text-2xl font-bold text-white">
                1 in {receipt.probability.toLocaleString()}
              </p>
              <p className="text-purple-400 text-xs mt-1">moments today</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-purple-300 text-xs">Day</p>
                <p className="text-xl font-bold text-white">{receipt.dayNumber}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-purple-300 text-xs">Sparks</p>
                <p className="text-xl font-bold text-amber-400">{receipt.totalSparks}</p>
              </div>
            </div>

            {/* Message */}
            <div className="text-center mb-4">
              <p className="text-white/80 italic">"{receipt.message}"</p>
            </div>

            {/* Divider */}
            <div className="border-t border-dashed border-white/20 my-4" />

            {/* Footer */}
            <div className="text-center">
              <p className="text-purple-300 text-sm">🧭 SignRoad.com</p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleShare}
            className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share to Stories
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownload}
            className="py-3 px-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
          >
            <Download className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
