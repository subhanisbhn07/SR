import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Sparkles, Archive, Trash2, RotateCcw, ChevronDown, ChevronUp, Wand2 } from 'lucide-react';
import { useAffirmationsStore } from '../../store/affirmationsStore';
import { AffirmationInput } from './AffirmationInput';
import { NeumoCard } from '../ui/NeumoCard';
import { UserAffirmation } from '../../types';

const improveAffirmationText = (text: string): { groundedText: string; ruleName: string } => {
  let improved = text.trim();
  let ruleName = 'grounded';
  
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
  
  const hasBodyLanguage = /\b(feel|body|heart|breath|hands|chest|calm|warm|strong|grounded|centered)\b/i.test(improved);
  if (!hasBodyLanguage && improved.length < 80) {
    const bodyPhrases = ['I feel it in my body.', 'I feel this deeply.', 'My body knows this.'];
    const randomPhrase = bodyPhrases[Math.floor(Math.random() * bodyPhrases.length)];
    improved = `${improved} ${randomPhrase}`;
    ruleName = 'body_anchored';
  }
  
  if (!improved.toLowerCase().startsWith('i ') && !improved.toLowerCase().startsWith('i\'')) {
    improved = `I ${improved.charAt(0).toLowerCase()}${improved.slice(1)}`;
    ruleName = 'first_person';
  }
  
  improved = improved.replace(/\s+/g, ' ').trim();
  
  if (!improved.endsWith('.') && !improved.endsWith('!')) {
    improved = `${improved}.`;
  }
  
  improved = improved.charAt(0).toUpperCase() + improved.slice(1);
  
  return { groundedText: improved, ruleName };
};

export const YourWordsSection: React.FC = () => {
  const [showInput, setShowInput] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  
    const {
      getActiveAffirmations,
      getArchivedAffirmations,
      archiveAffirmation,
      toggleActive,
      deleteAffirmation,
      updateAffirmation,
    } = useAffirmationsStore();
  
  const activeAffirmations = getActiveAffirmations();
  const archivedAffirmations = getArchivedAffirmations();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <NeumoCard showBlob={false}>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-neumo bg-neumo-surface-soft flex items-center justify-center shadow-neumo-inset-sm">
                <Sparkles className="w-5 h-5 text-brand-teal" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-neumo-text">Your Words</h2>
                <p className="text-xs text-neumo-text-secondary">
                  {activeAffirmations.length} active affirmation{activeAffirmations.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowInput(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-brand-teal text-white text-sm font-medium rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset transition-all"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
          
          {/* Active Affirmations */}
          {activeAffirmations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-neumo-text-secondary mb-3">
                No affirmations yet. Add your first one!
              </p>
              <button
                onClick={() => setShowInput(true)}
                className="text-sm text-brand-teal font-medium hover:underline"
              >
                Write an affirmation
              </button>
            </div>
          ) : (
            <div className="space-y-3">
                            {activeAffirmations.map((affirmation) => (
                              <AffirmationCard
                                key={affirmation.id}
                                affirmation={affirmation}
                                onArchive={() => archiveAffirmation(affirmation.id)}
                                onDelete={() => deleteAffirmation(affirmation.id)}
                                onImprove={() => {
                                  if (!affirmation.groundedText) {
                                    const { groundedText, ruleName } = improveAffirmationText(affirmation.originalText);
                                    updateAffirmation(affirmation.id, { groundedText, transformationRuleUsed: ruleName });
                                  }
                                }}
                              />
                            ))}
            </div>
          )}
          
          {/* Archived Section */}
          {archivedAffirmations.length > 0 && (
            <div className="mt-6 pt-4 border-t border-neumo-border">
              <button
                onClick={() => setShowArchived(!showArchived)}
                className="flex items-center gap-2 text-sm text-neumo-text-secondary hover:text-neumo-text transition-colors"
              >
                <Archive className="w-4 h-4" />
                Archived ({archivedAffirmations.length})
                {showArchived ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              
              <AnimatePresence>
                {showArchived && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2 mt-3">
                      {archivedAffirmations.map((affirmation) => (
                        <ArchivedAffirmationCard
                          key={affirmation.id}
                          affirmation={affirmation}
                          onRestore={() => toggleActive(affirmation.id)}
                          onDelete={() => deleteAffirmation(affirmation.id)}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </NeumoCard>
      </motion.div>
      
      {/* Input Modal */}
      <AffirmationInput isOpen={showInput} onClose={() => setShowInput(false)} />
    </>
  );
};

// Individual affirmation card
interface AffirmationCardProps {
  affirmation: UserAffirmation;
  onArchive: () => void;
  onDelete: () => void;
  onImprove: () => void;
}

const AffirmationCard: React.FC<AffirmationCardProps> = ({
  affirmation,
  onArchive,
  onDelete,
  onImprove,
}) => {
  const [showActions, setShowActions] = useState(false);
  
  const displayText = affirmation.groundedText || affirmation.originalText;
  const canImprove = !affirmation.groundedText;
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-3 bg-neumo-surface-soft rounded-neumo relative group"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <p className="text-sm text-neumo-text pr-20">"{displayText}"</p>
      
      {/* Show evolution if grounded text differs */}
      {affirmation.groundedText && affirmation.groundedText !== affirmation.originalText && (
        <p className="text-xs text-neumo-text-muted mt-1 line-through">
          Original: "{affirmation.originalText}"
        </p>
      )}
      
      <div className="flex items-center gap-2 mt-2">
        <span className="text-xs text-neumo-text-muted">
          Shown {affirmation.shownCount} time{affirmation.shownCount !== 1 ? 's' : ''}
        </span>
        {canImprove && (
          <button
            onClick={onImprove}
            className="flex items-center gap-1 text-xs text-brand-teal hover:underline"
          >
            <Wand2 className="w-3 h-3" />
            Improve
          </button>
        )}
      </div>
      
      {/* Action buttons */}
      <AnimatePresence>
        {showActions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-2 right-2 flex gap-1"
          >
            {canImprove && (
              <button
                onClick={onImprove}
                className="p-1.5 bg-neumo-bg rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset transition-all"
                title="Improve this affirmation"
              >
                <Wand2 className="w-3.5 h-3.5 text-brand-teal" />
              </button>
            )}
            <button
              onClick={onArchive}
              className="p-1.5 bg-neumo-bg rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset transition-all"
              title="Archive"
            >
              <Archive className="w-3.5 h-3.5 text-neumo-text-secondary" />
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 bg-neumo-bg rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset transition-all"
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-400" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Archived affirmation card
interface ArchivedAffirmationCardProps {
  affirmation: UserAffirmation;
  onRestore: () => void;
  onDelete: () => void;
}

const ArchivedAffirmationCard: React.FC<ArchivedAffirmationCardProps> = ({
  affirmation,
  onRestore,
  onDelete,
}) => {
  const displayText = affirmation.groundedText || affirmation.originalText;
  
  return (
    <div className="p-2 bg-neumo-bg/50 rounded-neumo flex items-center justify-between">
      <p className="text-xs text-neumo-text-muted italic flex-1 truncate">
        "{displayText}"
      </p>
      <div className="flex gap-1 ml-2">
        <button
          onClick={onRestore}
          className="p-1 text-neumo-text-muted hover:text-brand-teal transition-colors"
          title="Restore"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onDelete}
          className="p-1 text-neumo-text-muted hover:text-red-400 transition-colors"
          title="Delete permanently"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
