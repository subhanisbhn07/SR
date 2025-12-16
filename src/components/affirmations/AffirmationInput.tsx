import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Sparkles, Check } from 'lucide-react';
import { useAffirmationsStore } from '../../store/affirmationsStore';

interface AffirmationInputProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AffirmationInput: React.FC<AffirmationInputProps> = ({
  isOpen,
  onClose,
}) => {
  const [text, setText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { addAffirmation } = useAffirmationsStore();
  
  const handleSubmit = async () => {
    if (!text.trim()) return;
    
    setIsSaving(true);
    
    // Simulate a brief delay for UX
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    // Phase 1: Just save the original text (no grounding yet)
    addAffirmation(text.trim());
    
    setIsSaving(false);
    setShowSuccess(true);
    
    // Close after showing success
    setTimeout(() => {
      setShowSuccess(false);
      setText('');
      onClose();
    }, 1500);
  };
  
  const remainingChars = 100 - text.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-neumo-text/30 backdrop-blur-sm p-4"
          onClick={onClose}
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
                  <Check className="w-8 h-8 text-brand-teal" />
                </div>
                <h3 className="text-lg font-semibold text-neumo-text mb-2">
                  Affirmation Added
                </h3>
                <p className="text-sm text-neumo-text-secondary">
                  Your words will guide your journey.
                </p>
              </motion.div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-neumo bg-neumo-surface-soft flex items-center justify-center shadow-neumo-inset-sm">
                      <Sparkles className="w-5 h-5 text-brand-teal" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-neumo-text">
                        Add Affirmation
                      </h2>
                      <p className="text-xs text-neumo-text-secondary">
                        Write your intention for today
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-neumo bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset transition-all"
                  >
                    <X className="w-4 h-4 text-neumo-text-secondary" />
                  </button>
                </div>
                
                {/* Tips */}
                <div className="mb-4 p-3 bg-neumo-surface-soft rounded-neumo">
                  <p className="text-xs text-neumo-text-secondary">
                    <span className="font-medium text-neumo-text">Tip:</span> Write in present tense. 
                    Instead of "I will be confident", try "I act with confidence".
                  </p>
                </div>
                
                {/* Input */}
                <div className="mb-4">
                  <div className="relative">
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value.slice(0, 100))}
                      placeholder="I am..."
                      rows={3}
                      className="w-full p-4 bg-neumo-bg rounded-neumo shadow-neumo-inset text-neumo-text placeholder-neumo-text-muted resize-none focus:outline-none focus:ring-2 focus:ring-brand-teal/30 transition-all"
                      disabled={isSaving}
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-neumo-text-muted">
                      {remainingChars}
                    </div>
                  </div>
                </div>
                
                {/* Example affirmations */}
                <div className="mb-4">
                  <p className="text-xs text-neumo-text-muted mb-2">Examples:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'I trust my journey',
                      'I am worthy of good things',
                      'I act even when uncertain',
                    ].map((example) => (
                      <button
                        key={example}
                        onClick={() => setText(example)}
                        className="px-2 py-1 text-xs bg-neumo-surface-soft text-neumo-text-secondary rounded-neumo hover:bg-neumo-surface transition-colors"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 px-4 bg-neumo-bg rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset text-neumo-text-secondary font-medium transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!text.trim() || isSaving}
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
                        <Plus className="w-4 h-4" />
                        Add
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
