import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Clock, Sparkles } from 'lucide-react';
import { useFutureDropStore, getPromptCopy } from '../../store/futureDropStore';
import { FutureDropTrigger } from '../../types';

interface FutureDropPromptProps {
  isOpen: boolean;
  onClose: () => void;
  trigger: FutureDropTrigger;
  relatedSignId?: string;
}

export const FutureDropPrompt: React.FC<FutureDropPromptProps> = ({
  isOpen,
  onClose,
  trigger,
  relatedSignId,
}) => {
  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { addDrop, setLastPromptDate } = useFutureDropStore();
  const { title, subtitle } = getPromptCopy(trigger);
  
  const handleSubmit = async () => {
    if (!message.trim()) return;
    
    setIsSaving(true);
    
    // Simulate a brief delay for UX
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    addDrop(message.trim(), trigger, relatedSignId);
    setLastPromptDate(new Date());
    
    setIsSaving(false);
    setShowSuccess(true);
    
    // Close after showing success
    setTimeout(() => {
      setShowSuccess(false);
      setMessage('');
      onClose();
    }, 2000);
  };
  
  const handleSkip = () => {
    setLastPromptDate(new Date());
    onClose();
  };
  
  const remainingChars = 140 - message.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-neumo-text/30 backdrop-blur-sm p-4"
          onClick={handleSkip}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-md bg-neumo-bg rounded-neumo-xl p-6 shadow-neumo-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {showSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-teal/10 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-brand-teal" />
                </div>
                <h3 className="text-lg font-semibold text-neumo-text mb-2">
                  Message Saved
                </h3>
                <p className="text-sm text-neumo-text-secondary">
                  Your future self will receive this when the time is right.
                </p>
              </motion.div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-neumo bg-neumo-surface-soft flex items-center justify-center shadow-neumo-inset-sm">
                      <Clock className="w-5 h-5 text-brand-teal" />
                    </div>
                    <div>
                      <h2 className="text-sm font-medium text-neumo-text-muted uppercase tracking-wide">
                        Future You Drop-In
                      </h2>
                    </div>
                  </div>
                  <button
                    onClick={handleSkip}
                    className="p-2 rounded-neumo bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset transition-all"
                  >
                    <X className="w-4 h-4 text-neumo-text-secondary" />
                  </button>
                </div>
                
                {/* Prompt */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-neumo-text mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-neumo-text-secondary">
                    {subtitle}
                  </p>
                </div>
                
                {/* Input */}
                <div className="mb-4">
                  <div className="relative">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value.slice(0, 140))}
                      placeholder="Write your message..."
                      rows={4}
                      className="w-full p-4 bg-neumo-bg rounded-neumo shadow-neumo-inset text-neumo-text placeholder-neumo-text-muted resize-none focus:outline-none focus:ring-2 focus:ring-brand-teal/30 transition-all"
                      disabled={isSaving}
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-neumo-text-muted">
                      {remainingChars}
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={handleSkip}
                    className="flex-1 py-3 px-4 bg-neumo-bg rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset text-neumo-text-secondary font-medium transition-all"
                  >
                    Skip for Now
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!message.trim() || isSaving}
                    className="flex-1 py-3 px-4 bg-brand-teal rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSaving ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Sparkles className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send to Future
                      </>
                    )}
                  </button>
                </div>
                
                {/* Privacy note */}
                <p className="text-xs text-neumo-text-muted text-center mt-4">
                  This message is private and will never be shared with your Tribe.
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
