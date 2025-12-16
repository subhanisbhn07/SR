import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Sparkles, Check, Wand2 } from 'lucide-react';
import { useAffirmationsStore } from '../../store/affirmationsStore';

interface ImprovedAffirmation {
  groundedText: string;
  ruleName: string;
}

const improveAffirmation = (text: string): ImprovedAffirmation => {
  let improved = text.trim();
  let ruleName = 'grounded';
  
    // Rule 1: Convert future tense to present tense
    const futurePatterns = [
      { pattern: /\bI will be\b/gi, replacement: 'I am' },
      { pattern: /\bI will\b/gi, replacement: 'I' },
      { pattern: /\bI'm going to be\b/gi, replacement: 'I am' },
      { pattern: /\bI'm going to\b/gi, replacement: 'I' },
      { pattern: /\bI am going to be\b/gi, replacement: 'I am' },
      { pattern: /\bI am going to\b/gi, replacement: 'I' },
      { pattern: /\bI want to be\b/gi, replacement: 'I am' },
      { pattern: /\bI want to\b/gi, replacement: 'I' },
      { pattern: /\bI hope to be\b/gi, replacement: 'I am' },
      { pattern: /\bI hope to\b/gi, replacement: 'I' },
      { pattern: /\bI wish to be\b/gi, replacement: 'I am' },
      { pattern: /\bI wish to\b/gi, replacement: 'I' },
    ];
  
    for (const { pattern, replacement } of futurePatterns) {
      if (pattern.test(improved)) {
        improved = improved.replace(pattern, replacement);
        ruleName = 'present_tense';
      }
    }
  
  // Rule 2: Remove negatives and flip to positive
  const negativePatterns = [
    { pattern: /\bI am not\b/gi, replacement: 'I am' },
    { pattern: /\bI don't\b/gi, replacement: 'I' },
    { pattern: /\bI won't\b/gi, replacement: 'I' },
    { pattern: /\bI can't\b/gi, replacement: 'I can' },
    { pattern: /\bnot\b/gi, replacement: '' },
    { pattern: /\bnever\b/gi, replacement: 'always' },
  ];
  
  for (const { pattern, replacement } of negativePatterns) {
    if (pattern.test(improved)) {
      improved = improved.replace(pattern, replacement);
      ruleName = 'positive_framing';
    }
  }
  
  // Rule 3: Add body/sensory language if missing
  const hasBodyLanguage = /\b(feel|body|heart|breath|hands|chest|calm|warm|strong|grounded|centered)\b/i.test(improved);
  if (!hasBodyLanguage && improved.length < 80) {
    const bodyPhrases = [
      'I feel it in my body.',
      'I feel this deeply.',
      'My body knows this.',
    ];
    const randomPhrase = bodyPhrases[Math.floor(Math.random() * bodyPhrases.length)];
    improved = `${improved} ${randomPhrase}`;
    ruleName = 'body_anchored';
  }
  
  // Rule 4: Ensure it starts with "I" if it doesn't
  if (!improved.toLowerCase().startsWith('i ') && !improved.toLowerCase().startsWith('i\'')) {
    improved = `I ${improved.charAt(0).toLowerCase()}${improved.slice(1)}`;
    ruleName = 'first_person';
  }
  
  // Rule 5: Clean up double spaces and trim
  improved = improved.replace(/\s+/g, ' ').trim();
  
  // Rule 6: Ensure it ends with a period
  if (!improved.endsWith('.') && !improved.endsWith('!')) {
    improved = `${improved}.`;
  }
  
  // Capitalize first letter
  improved = improved.charAt(0).toUpperCase() + improved.slice(1);
  
  return { groundedText: improved, ruleName };
};

interface AffirmationInputProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AffirmationInput: React.FC<AffirmationInputProps> = ({
  isOpen,
  onClose,
}) => {
  const [text, setText] = useState('');
  const [improvedText, setImprovedText] = useState<string | null>(null);
  const [ruleName, setRuleName] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { addAffirmation } = useAffirmationsStore();
  
  const handleImprove = () => {
    if (!text.trim()) return;
    const { groundedText, ruleName: rule } = improveAffirmation(text);
    setImprovedText(groundedText);
    setRuleName(rule);
  };
  
  const handleSubmit = async () => {
    if (!text.trim()) return;
    
    setIsSaving(true);
    
    // Simulate a brief delay for UX
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    // Save with improved text if available
    if (improvedText) {
      addAffirmation(text.trim(), improvedText, ruleName || undefined);
    } else {
      addAffirmation(text.trim());
    }
    
    setIsSaving(false);
    setShowSuccess(true);
    
    // Close after showing success
    setTimeout(() => {
      setShowSuccess(false);
      setText('');
      setImprovedText(null);
      setRuleName(null);
      onClose();
    }, 1500);
  };
  
  const handleClose = () => {
    setText('');
    setImprovedText(null);
    setRuleName(null);
    onClose();
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
                    onClick={handleClose}
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
                                    onClick={handleClose}
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
                                  <p className="text-xs text-neumo-text-muted mb-1">What you want to say:</p>
                                  <div className="relative">
                                    <textarea
                                      value={text}
                                      onChange={(e) => {
                                        setText(e.target.value.slice(0, 100));
                                        setImprovedText(null);
                                        setRuleName(null);
                                      }}
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
                
                                {/* Improve Button */}
                                {text.trim() && !improvedText && (
                                  <button
                                    onClick={handleImprove}
                                    className="w-full mb-4 py-2.5 px-4 bg-neumo-surface-soft rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset text-neumo-text font-medium transition-all flex items-center justify-center gap-2"
                                  >
                                    <Wand2 className="w-4 h-4 text-brand-teal" />
                                    Improve this affirmation
                                  </button>
                                )}
                
                                {/* Improved Text Display */}
                                {improvedText && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-4 p-4 bg-brand-teal/5 border border-brand-teal/20 rounded-neumo"
                                  >
                                    <div className="flex items-center gap-2 mb-2">
                                      <Wand2 className="w-4 h-4 text-brand-teal" />
                                      <span className="text-xs font-medium text-brand-teal">Improved version:</span>
                                    </div>
                                    <p className="text-sm text-neumo-text font-medium">"{improvedText}"</p>
                                    <p className="text-xs text-neumo-text-muted mt-2 line-through">Original: "{text}"</p>
                                  </motion.div>
                                )}
                
                                {/* Example affirmations */}
                                {!improvedText && (
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
                                )}
                
                                {/* Actions */}
                                <div className="flex gap-3">
                                  <button
                                    onClick={handleClose}
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
                                        {improvedText ? 'Save Improved' : 'Add'}
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
