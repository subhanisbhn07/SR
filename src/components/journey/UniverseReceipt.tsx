import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, Star, Instagram, Twitter, Facebook, MessageCircle } from 'lucide-react';
import { UniverseReceipt as UniverseReceiptType, RARITY_CONFIG } from '../../types/journey';

// Social sharing platforms
type SharePlatform = 'instagram' | 'twitter' | 'facebook' | 'whatsapp' | 'tiktok' | 'native';

interface UniverseReceiptProps {
  receipt: UniverseReceiptType;
  onClose: () => void;
}

// SignRoad branding for shares
const SIGNROAD_BRANDING = {
  watermark: 'SignRoad.com',
  hashtags: ['#SignRoad', '#UniverseSpeaking', '#Manifestation', '#Synchronicity'],
  cta: 'Start your journey at SignRoad.com',
  handle: '@signroad',
};

export const UniverseReceipt: React.FC<UniverseReceiptProps> = ({ receipt, onClose }) => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [shareSuccess, setShareSuccess] = useState<string | null>(null);

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

  // Generate share text with SignRoad branding
  const getShareText = () => {
    const hashtags = SIGNROAD_BRANDING.hashtags.join(' ');
    return `I found a ${receipt.rarity.toUpperCase()} ${receipt.signName} ${receipt.signEmoji} on Day ${receipt.dayNumber} of my SignRoad journey!

The probability was 1 in ${receipt.probability.toLocaleString()} moments today.

"${receipt.message}"

${hashtags}
${SIGNROAD_BRANDING.cta}`;
  };

  // Platform-specific share URLs
  const getShareUrl = (platform: SharePlatform): string => {
    const text = encodeURIComponent(getShareText());
    const url = encodeURIComponent('https://signroad.com');
    const hashtags = SIGNROAD_BRANDING.hashtags.map(h => h.replace('#', '')).join(',');

    switch (platform) {
      case 'twitter':
        return `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtags}`;
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
      case 'whatsapp':
        return `https://wa.me/?text=${text}%20${url}`;
      case 'instagram':
        // Instagram doesn't have a direct share URL, so we copy to clipboard
        return '';
      case 'tiktok':
        // TikTok doesn't have a direct share URL either
        return '';
      default:
        return '';
    }
  };

  const handlePlatformShare = async (platform: SharePlatform) => {
    if (platform === 'native') {
      // Use native share API
      const shareData = {
        title: 'Universe Receipt - SignRoad',
        text: getShareText(),
        url: 'https://signroad.com',
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
          setShareSuccess('Shared successfully!');
        } catch (err) {
          console.log('Share cancelled');
        }
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(getShareText() + '\n\nhttps://signroad.com');
        setShareSuccess('Copied to clipboard!');
      }
    } else if (platform === 'instagram' || platform === 'tiktok') {
      // For Instagram/TikTok, copy to clipboard and show instructions
      await navigator.clipboard.writeText(getShareText() + '\n\nhttps://signroad.com');
      setShareSuccess(`Caption copied! Open ${platform === 'instagram' ? 'Instagram' : 'TikTok'} and paste.`);
    } else {
      // Open share URL in new window
      const shareUrl = getShareUrl(platform);
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
        setShareSuccess(`Opening ${platform}...`);
      }
    }

    // Clear success message after 3 seconds
    setTimeout(() => setShareSuccess(null), 3000);
    setShowShareMenu(false);
  };

  const handleShare = () => {
    setShowShareMenu(true);
  };

  const handleDownload = () => {
    // In a real app, this would use html2canvas or similar to generate an image
    alert('Download feature coming soon! For now, take a screenshot and share with #SignRoad');
  };

  // Share platform options
  const sharePlatforms: { id: SharePlatform; name: string; icon: React.ReactNode; color: string }[] = [
    { id: 'native', name: 'Share', icon: <Share2 className="w-5 h-5" />, color: 'bg-purple-600' },
    { id: 'instagram', name: 'Instagram', icon: <Instagram className="w-5 h-5" />, color: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400' },
    { id: 'twitter', name: 'X / Twitter', icon: <Twitter className="w-5 h-5" />, color: 'bg-black' },
    { id: 'facebook', name: 'Facebook', icon: <Facebook className="w-5 h-5" />, color: 'bg-blue-600' },
    { id: 'whatsapp', name: 'WhatsApp', icon: <MessageCircle className="w-5 h-5" />, color: 'bg-green-500' },
    { id: 'tiktok', name: 'TikTok', icon: <span className="text-lg">🎵</span>, color: 'bg-black' },
  ];

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

        {/* Success message */}
        <AnimatePresence>
          {shareSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-xl text-center text-green-300 text-sm"
            >
              {shareSuccess}
            </motion.div>
          )}
        </AnimatePresence>

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

        {/* Share platform menu */}
        <AnimatePresence>
          {showShareMenu && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-4 bg-gray-800 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-semibold">Share to</h4>
                <button
                  onClick={() => setShowShareMenu(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {sharePlatforms.map((platform) => (
                  <motion.button
                    key={platform.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePlatformShare(platform.id)}
                    className={`${platform.color} p-3 rounded-xl flex flex-col items-center gap-2 text-white`}
                  >
                    {platform.icon}
                    <span className="text-xs">{platform.name}</span>
                  </motion.button>
                ))}
              </div>
              <p className="text-xs text-gray-400 text-center mt-4">
                Tag {SIGNROAD_BRANDING.handle} when you share!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
