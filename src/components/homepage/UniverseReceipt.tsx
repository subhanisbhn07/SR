import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Copy, Check, Trophy, Download, Star } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import html2canvas from 'html2canvas';

interface ManifestationData {
  id: string;
  title: string;
  category: string;
  daysToManifest: number;
  signsLogged: number;
  sessionsCompleted: number;
  probability: number;
  manifestedAt: Date;
}

const mockManifestation: ManifestationData = {
  id: '1',
  title: 'New job at dream company',
  category: 'Career',
  daysToManifest: 21,
  signsLogged: 18,
  sessionsCompleted: 24,
  probability: 8.3,
  manifestedAt: new Date(),
};

export const UniverseReceipt: React.FC = () => {
  const { user } = useAuthStore(); 
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasManifestation, setHasManifestation] = useState(true);
  const receiptRef = useRef<HTMLDivElement>(null);

  const manifestation = mockManifestation;

  const getReceiptText = () => {
    return `
UNIVERSE RECEIPT
================
${user?.name || 'A SignRoad Traveler'} manifested:
"${manifestation.title}"

Journey Stats:
- Days on the road: ${manifestation.daysToManifest}
- Signs logged: ${manifestation.signsLogged}
- Sessions completed: ${manifestation.sessionsCompleted}

You beat ${100 - manifestation.probability}% odds.
The universe delivered.

Start your road: signroad.com
    `.trim();
  };

  const handleCopyReceipt = () => {
    navigator.clipboard.writeText(getReceiptText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTextFallback = async () => {
    const shareData = {
      title: 'Universe Receipt - SignRoad',
      text: getReceiptText(),
      url: 'https://signroad.com'
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        handleCopyReceipt();
      }
    } catch {
      handleCopyReceipt();
    }
  };

  const handleShareReceipt = async () => {
    if (!receiptRef.current) {
      return shareTextFallback();
    }

    setIsGenerating(true);

    try {
      const canvas = await html2canvas(receiptRef.current, {
        backgroundColor: '#fdfaf4',
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const dataUrl = canvas.toDataURL('image/png');
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], 'signroad-universe-receipt.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Universe Receipt - SignRoad',
          text: 'I manifested something amazing with SignRoad!',
        });
      } else {
        // Fallback: download image
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'signroad-universe-receipt.png';
        link.click();
      }
    } catch {
      shareTextFallback();
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadReceipt = async () => {
    if (!receiptRef.current) return;

    setIsGenerating(true);

    try {
      const canvas = await html2canvas(receiptRef.current, {
        backgroundColor: '#fdfaf4',
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'signroad-universe-receipt.png';
      link.click();
    } catch {
      handleCopyReceipt();
    } finally {
      setIsGenerating(false);
    }
  };

  if (!hasManifestation) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-neumo-bg rounded-neumo-lg p-5 mb-6 shadow-neumo"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-neumo bg-neumo-bg flex items-center justify-center shadow-neumo-sm">
            <Trophy className="w-6 h-6 text-neumo-text-secondary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-neumo-text">Universe Receipt</h2>
            <p className="text-sm text-neumo-text-secondary">Share your manifestation wins</p>
          </div>
        </div>

        <p className="text-sm text-neumo-text-secondary mb-4">
          When you manifest something on your road, you'll get a Universe Receipt to share 
          with the world. It shows the odds you beat and your journey stats.
        </p>

        <button
          onClick={() => setHasManifestation(true)}
          className="w-full py-2.5 bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset text-neumo-text font-medium rounded-neumo transition-all"
        >
          Log a Manifestation
        </button>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-neumo-bg rounded-neumo-lg p-5 mb-6 shadow-neumo"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-neumo bg-neumo-bg flex items-center justify-center shadow-neumo-sm">
              <Trophy className="w-6 h-6 text-neumo-text-secondary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-neumo-text">Latest Win</h2>
              <p className="text-sm text-neumo-text-secondary">You manifested something!</p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-neumo-bg px-3 py-1.5 rounded-full shadow-neumo-sm">
            <Star className="w-4 h-4 text-neumo-text-secondary fill-neumo-text-secondary" />
            <span className="text-sm font-medium text-neumo-text">New</span>
          </div>
        </div>

        <div className="bg-neumo-bg rounded-neumo p-4 mb-4 shadow-neumo-inset-sm">
          <p className="text-neumo-text font-medium mb-2">"{manifestation.title}"</p>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-neumo-text-secondary">{manifestation.daysToManifest} days</span>
            <span className="text-neumo-text-secondary">{manifestation.signsLogged} signs</span>
            <span className="text-neumo-text font-medium">Beat {100 - manifestation.probability}% odds</span>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full py-2.5 bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset text-neumo-text font-medium rounded-neumo transition-all flex items-center justify-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          Share Universe Receipt
        </button>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-neumo-text/30 p-4 overflow-y-auto"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-sm bg-neumo-bg rounded-neumo-lg overflow-hidden my-4 shadow-neumo-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Old-school Receipt Design - 9:18 ratio */}
              <div 
                ref={receiptRef}
                className="relative overflow-hidden"
                style={{ 
                  width: '100%',
                  aspectRatio: '9 / 18',
                  maxHeight: '70vh',
                  background: '#fdfaf4',
                  fontFamily: 'monospace'
                }}
              >
                {/* Tear-off edge at top */}
                <div 
                  className="absolute top-0 left-0 right-0 h-4"
                  style={{
                    background: 'repeating-linear-gradient(90deg, transparent, transparent 8px, #fdfaf4 8px, #fdfaf4 16px)',
                    borderBottom: '2px dashed #d4c5a9'
                  }}
                />

                {/* Receipt content */}
                <div className="pt-8 px-6 pb-6" style={{ color: '#1f2937' }}>
                  {/* Header */}
                  <div className="text-center mb-6">
                    <h2 className="text-lg font-bold tracking-widest mb-1" style={{ color: '#1f2937' }}>UNIVERSE RECEIPT</h2>
                    <div className="text-xs" style={{ color: '#6b7280' }}>================================</div>
                    <p className="text-xs mt-2" style={{ color: '#4b5563' }}>The cosmos has delivered</p>
                  </div>

                  {/* User info */}
                  <div className="text-center mb-6">
                    <p className="text-xs mb-1" style={{ color: '#6b7280' }}>{user?.name || 'A SignRoad Traveler'}</p>
                    <p className="text-xs mb-2" style={{ color: '#6b7280' }}>manifested:</p>
                    <p className="text-sm font-bold leading-tight" style={{ color: '#111827' }}>"{manifestation.title}"</p>
                  </div>

                  {/* Divider */}
                  <div className="text-xs text-center mb-4" style={{ color: '#9ca3af' }}>- - - - - - - - - - - - - - -</div>

                  {/* Journey Stats */}
                  <div className="mb-6">
                    <p className="text-xs font-bold mb-3 tracking-wide" style={{ color: '#4b5563' }}>JOURNEY STATS:</p>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span style={{ color: '#4b5563' }}>Days on the road</span>
                        <span className="font-bold" style={{ color: '#111827' }}>{manifestation.daysToManifest}</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: '#4b5563' }}>Signs logged</span>
                        <span className="font-bold" style={{ color: '#111827' }}>{manifestation.signsLogged}</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: '#4b5563' }}>Sessions completed</span>
                        <span className="font-bold" style={{ color: '#111827' }}>{manifestation.sessionsCompleted}</span>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="text-xs text-center mb-4" style={{ color: '#9ca3af' }}>- - - - - - - - - - - - - - -</div>

                  {/* Odds */}
                  <div className="text-center mb-6">
                    <p className="text-xs mb-1" style={{ color: '#6b7280' }}>Probability beaten:</p>
                    <p className="text-2xl font-bold" style={{ color: '#111827' }}>{(100 - manifestation.probability).toFixed(1)}%</p>
                    <p className="text-xs mt-1" style={{ color: '#4b5563' }}>The universe delivered.</p>
                  </div>

                  {/* Footer */}
                  <div className="text-center text-xs mb-8" style={{ color: '#6b7280' }}>
                    <p>Start your road:</p>
                    <p className="font-bold">signroad.com</p>
                  </div>

                  {/* SignRoad Stamp - Round, Blue Ink */}
                  <div 
                    className="absolute bottom-8 right-6 flex items-center justify-center"
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      border: '3px solid #2563eb',
                      transform: 'rotate(-15deg)',
                      opacity: 0.85
                    }}
                  >
                    <div className="text-center">
                      <div 
                        className="text-xs font-bold"
                        style={{ color: '#2563eb', letterSpacing: '0.05em' }}
                      >
                        SIGNROAD
                      </div>
                      <div 
                        className="text-[8px]"
                        style={{ color: '#2563eb' }}
                      >
                        VERIFIED
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tear-off edge at bottom */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-4"
                  style={{
                    background: 'repeating-linear-gradient(90deg, transparent, transparent 8px, #fdfaf4 8px, #fdfaf4 16px)',
                    borderTop: '2px dashed #d4c5a9'
                  }}
                />
              </div>

              {/* Action buttons */}
              <div className="p-4 bg-neumo-bg">
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleShareReceipt}
                    disabled={isGenerating}
                    className="w-full py-3 bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset disabled:opacity-50 text-neumo-text font-medium rounded-neumo transition-all flex items-center justify-center gap-2"
                  >
                    {isGenerating ? (
                      <span>Generating...</span>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4" />
                        Share as Image
                      </>
                    )}
                  </button>
                  <div className="flex gap-3">
                    <button
                      onClick={handleDownloadReceipt}
                      disabled={isGenerating}
                      className="flex-1 py-3 bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset text-neumo-text font-medium rounded-neumo transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button
                      onClick={handleCopyReceipt}
                      className="flex-1 py-3 bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset text-neumo-text font-medium rounded-neumo transition-all flex items-center justify-center gap-2"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-neumo-text" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Text
                        </>
                      )}
                    </button>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full py-2 text-neumo-text-secondary text-sm hover:text-neumo-text transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
