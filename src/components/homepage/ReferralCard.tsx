import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Gift, Copy, Check, X, Share2 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { NeumoCard } from '../ui/NeumoCard';

export const ReferralCard: React.FC = () => {
  const { user } = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Only show referral card after user has logged some signs (engagement threshold)
  const hasEngaged = (user?.streakDays || 0) >= 3;
  const isPaidUser = user?.subscriptionStatus === 'active';
  
  // Generate referral link (in real app, this would be unique per user)
  const referralLink = `https://signroad.com/join/${user?.id || 'demo'}`;
  const referralCode = user?.id?.slice(0, 8).toUpperCase() || 'SIGNROAD';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Walk the road with me on SignRoad',
      text: 'I\'ve been on this manifestation journey and it\'s different from anything I\'ve tried. The universe actually sends you signs back. Join me for 14 days free.',
      url: referralLink
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        handleCopyLink();
      }
    } catch {
      handleCopyLink();
    }
  };

  if (!hasEngaged) {
    return null;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <NeumoCard showBlob={true} blobColor="teal">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-neumo bg-brand-teal flex items-center justify-center shadow-teal-glow">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-neumo-text">Walk Together</h2>
                <p className="text-sm text-neumo-text-secondary">This road isn't meant to be walked alone</p>
              </div>
            </div>
            {isPaidUser && (
              <div className="flex items-center gap-1 bg-neumo-surface-soft px-3 py-1.5 rounded-full shadow-neumo-inset-sm">
                <Gift className="w-4 h-4 text-brand-teal" />
                <span className="text-xs font-medium text-neumo-text">10% bonus</span>
              </div>
            )}
          </div>

          <p className="text-sm text-neumo-text-secondary mb-4">
            Invite one person you care about to join your 14-day road. When they walk with you, both of your Lanterns grow brighter.
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="w-full py-2.5 bg-brand-teal shadow-teal-glow hover:bg-brand-teal-dark text-white font-semibold rounded-neumo transition-all flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Invite a Traveler
          </button>
        </NeumoCard>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-neumo-text/30"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-neumo-bg rounded-t-neumo-xl p-6 max-h-[80vh] overflow-y-auto shadow-neumo-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-neumo-text">Invite a Traveler</h2>
                  <p className="text-sm text-neumo-text-secondary">Share the road with someone you care about</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset-sm transition-all"
                >
                  <X className="w-5 h-5 text-neumo-text-secondary" />
                </button>
              </div>

              <div className="bg-neumo-surface-soft rounded-neumo p-4 mb-6 shadow-neumo-inset-sm">
                <p className="text-sm text-neumo-text mb-4">
                  "If SignRoad is helping you, help one person you care about find their road too. The journey is better together."
                </p>
                <p className="text-xs text-neumo-text-muted italic">
                  — The SignRoad Team
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-xs font-medium text-neumo-text-muted mb-2 block">YOUR REFERRAL LINK</label>
                  <div className="flex gap-2">
                    <div className="flex-1 px-4 py-3 bg-neumo-bg rounded-neumo shadow-neumo-inset-sm text-sm text-neumo-text truncate">
                      {referralLink}
                    </div>
                    <button
                      onClick={handleCopyLink}
                      className="px-4 py-3 bg-neumo-bg rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset-sm transition-all"
                    >
                      {copied ? (
                        <Check className="w-5 h-5 text-brand-teal" />
                      ) : (
                        <Copy className="w-5 h-5 text-neumo-text-secondary" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-neumo-text-muted mb-2 block">YOUR CODE</label>
                  <div className="px-4 py-3 bg-neumo-bg rounded-neumo shadow-neumo-inset-sm text-center">
                    <span className="text-lg font-bold text-neumo-text tracking-widest">{referralCode}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleShare}
                className="w-full py-3 bg-brand-teal shadow-teal-glow hover:bg-brand-teal-dark text-white font-semibold rounded-neumo transition-all flex items-center justify-center gap-2 mb-4"
              >
                <Share2 className="w-5 h-5" />
                Share Invitation
              </button>

              {isPaidUser ? (
                <div className="p-4 bg-neumo-bg rounded-neumo shadow-neumo-inset-sm">
                  <div className="flex items-start gap-3">
                    <Gift className="w-5 h-5 text-brand-teal mt-0.5" />
                    <div>
                      <p className="text-sm text-neumo-text font-medium">Thank you for being a paid traveler</p>
                      <p className="text-xs text-neumo-text-secondary mt-1">
                        You'll receive a 10% referral bonus for every paying traveler you bring to the road.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-neumo-bg rounded-neumo shadow-neumo-inset-sm">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-neumo-text-secondary mt-0.5" />
                    <div>
                      <p className="text-sm text-neumo-text font-medium">Spread the light</p>
                      <p className="text-xs text-neumo-text-secondary mt-1">
                        Your invitations will start earning you rewards once you become a paid traveler.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
