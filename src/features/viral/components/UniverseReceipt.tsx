import { motion } from 'framer-motion';
import { Share2, Download, X, Instagram, Twitter } from 'lucide-react';
import { UniverseReceipt as ReceiptType } from '../types/viral';
import { generateReceiptText } from '../utils/receiptGenerator';
import { useState } from 'react';
import { useToast } from '../../../shared/hooks/useToast';

interface UniverseReceiptProps {
  receipt: ReceiptType;
  onClose: () => void;
}

export const UniverseReceipt = ({ receipt, onClose }: UniverseReceiptProps) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const toast = useToast();
  const receiptText = generateReceiptText(receipt);

  const handleShare = (platform: string) => {
    const text = `I just found my sign "${receipt.signName}" on Day ${receipt.dayNumber}! The universe is speaking. 🌟 #SignRoad`;
    const url = 'https://signroad.com';

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'instagram':
        toast.info('Instagram sharing: Copy the text and share to your story!');
        navigator.clipboard.writeText(text);
        break;
      case 'copy':
        navigator.clipboard.writeText(text + '\n' + url);
        toast.success('Copied to clipboard!');
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
    gradient.addColorStop(1, '#0f0f1e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 600, 800);

    ctx.fillStyle = 'rgba(250, 165, 70, 0.1)';
    ctx.fillRect(50, 50, 500, 700);

    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#FAA546';
    ctx.textAlign = 'center';
    ctx.fillText('UNIVERSE TRANSACTION LOG', 300, 120);

    ctx.font = '18px monospace';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    
    const lines = [
      `ITEM: ${receipt.signName}`,
      `DAY:  ${receipt.dayNumber}`,
      `TIME: ${receipt.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
      `DATE: ${receipt.timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
      `LOC:  ${receipt.location}`,
      '',
      `PROBABILITY: ${(receipt.probability * 100).toFixed(3)}%`,
      `STATUS: ${receipt.status}`,
    ];

    let y = 200;
    lines.forEach((line) => {
      ctx.fillText(line, 100, y);
      y += 40;
    });

    ctx.font = 'italic 16px monospace';
    ctx.fillStyle = '#FAA546';
    ctx.textAlign = 'center';
    ctx.fillText('"The universe is speaking."', 300, 650);

    ctx.font = '14px monospace';
    ctx.fillStyle = '#666';
    ctx.fillText('signroad.com', 300, 720);

    const link = document.createElement('a');
    link.download = `universe-receipt-${receipt.id}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const getStatusColor = () => {
    switch (receipt.status) {
      case 'RARE EVENT': return 'text-accent-400 border-accent-500';
      case 'SYNCHRONICITY DETECTED': return 'text-purple-400 border-purple-500';
      default: return 'text-primary-400 border-primary-500';
    }
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
        className="max-w-md w-full bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 border-2 border-accent-500/30 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-neutral-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-neutral-400" />
        </button>

        {/* Receipt Header */}
        <div className="text-center mb-6">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center"
          >
            <span className="text-2xl">🌟</span>
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-2">Universe Receipt</h2>
          <p className="text-sm text-neutral-400">Your synchronicity has been confirmed</p>
        </div>

        {/* Receipt Content */}
        <div className="bg-neutral-950/50 rounded-lg p-6 mb-6 border border-neutral-700">
          <pre className="text-xs text-neutral-300 font-mono whitespace-pre overflow-x-auto">
            {receiptText}
          </pre>
        </div>

        {/* Status Badge */}
        <div className={`text-center mb-6 p-3 rounded-lg border-2 ${getStatusColor()} bg-opacity-10`}>
          <p className="font-bold">{receipt.status}</p>
          <p className="text-xs text-neutral-400 mt-1">
            Probability: {(receipt.probability * 100).toFixed(3)}%
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="w-full px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share Your Sign
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
            Download Receipt
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-center text-neutral-500 mt-6">
          Share your receipt to inspire others on their journey
        </p>
      </motion.div>
    </motion.div>
  );
};
