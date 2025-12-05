import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, X, Copy, Check, Sparkles, Star, Trophy } from 'lucide-react';
import { useAuthStore } from '../../auth/store/authStore';

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
  const [hasManifestation, setHasManifestation] = useState(true);

  const manifestation = mockManifestation;

  const handleCopyReceipt = () => {
    const receiptText = `
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

    navigator.clipboard.writeText(receiptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!hasManifestation) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl p-5 mb-6 border border-yellow-500/20"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Universe Receipt</h2>
            <p className="text-sm text-neutral-400">Share your manifestation wins</p>
          </div>
        </div>

        <p className="text-sm text-neutral-300 mb-4">
          When you manifest something on your road, you'll get a Universe Receipt to share 
          with the world. It shows the odds you beat and your journey stats.
        </p>

        <button
          onClick={() => setHasManifestation(true)}
          className="w-full py-2.5 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 font-medium rounded-xl transition-colors"
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
        className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl p-5 mb-6 border border-yellow-500/20"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Latest Win</h2>
              <p className="text-sm text-neutral-400">You manifested something!</p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1.5 rounded-full">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">New</span>
          </div>
        </div>

        <div className="bg-neutral-800/50 rounded-xl p-4 mb-4">
          <p className="text-white font-medium mb-2">"{manifestation.title}"</p>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-neutral-400">{manifestation.daysToManifest} days</span>
            <span className="text-neutral-400">{manifestation.signsLogged} signs</span>
            <span className="text-yellow-400 font-medium">Beat {100 - manifestation.probability}% odds</span>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full py-2.5 bg-yellow-500 hover:bg-yellow-600 text-neutral-900 font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-sm bg-neutral-900 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">UNIVERSE RECEIPT</h2>
                <p className="text-white/80 text-sm">The cosmos has delivered</p>
              </div>

              <div className="p-6">
                <div className="text-center mb-6">
                  <p className="text-neutral-400 text-sm mb-2">{user?.name || 'A SignRoad Traveler'} manifested:</p>
                  <p className="text-xl font-bold text-white">"{manifestation.title}"</p>
                </div>

                <div className="bg-neutral-800/50 rounded-xl p-4 mb-6">
                  <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wide mb-3">Journey Stats</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Days on the road</span>
                      <span className="text-white font-medium">{manifestation.daysToManifest}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Signs logged</span>
                      <span className="text-white font-medium">{manifestation.signsLogged}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Sessions completed</span>
                      <span className="text-white font-medium">{manifestation.sessionsCompleted}</span>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-6 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                  <p className="text-sm text-neutral-400 mb-1">Probability of this happening by chance:</p>
                  <p className="text-3xl font-bold text-yellow-400">{manifestation.probability}%</p>
                  <p className="text-sm text-yellow-400 mt-1">You beat {100 - manifestation.probability}% odds</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleCopyReceipt}
                    className="flex-1 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5 text-neutral-400" />
                  </button>
                </div>

                <p className="text-xs text-neutral-500 text-center mt-4">
                  Share your receipt and inspire others on their journey
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
