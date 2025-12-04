import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Share, Plus } from 'lucide-react';
import { useInstallPrompt } from '../hooks/useInstallPrompt';

export const InstallPromptBanner: React.FC = () => {
  const { 
    isInstallable, 
    isStandalone, 
    promptInstall, 
    dismissPrompt,
    showIOSInstructions,
    setShowIOSInstructions
  } = useInstallPrompt();

  const dismissed = localStorage.getItem('signroad_install_dismissed') === 'true';

  if (isStandalone || dismissed || !isInstallable) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 shadow-lg"
        >
          <div className="max-w-lg md:max-w-3xl lg:max-w-5xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Download className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm truncate">Install SignRoad</p>
                <p className="text-white/80 text-xs truncate">Add to home screen for the best experience</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={promptInstall}
                className="bg-white text-purple-600 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-white/90 transition-colors"
              >
                Install
              </motion.button>
              <button
                onClick={dismissPrompt}
                className="p-2 text-white/80 hover:text-white transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showIOSInstructions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 flex items-end justify-center p-4"
            onClick={() => setShowIOSInstructions(false)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="bg-neutral-800 rounded-2xl p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">Install SignRoad</h3>
              <p className="text-neutral-300 mb-6">
                To install SignRoad on your iPhone or iPad:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Share className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">1. Tap the Share button</p>
                    <p className="text-neutral-400 text-sm">At the bottom of Safari</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-pink-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Plus className="w-5 h-5 text-pink-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">2. Tap "Add to Home Screen"</p>
                    <p className="text-neutral-400 text-sm">Scroll down in the share menu</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowIOSInstructions(false)}
                className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-xl"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
