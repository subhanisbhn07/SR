import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Eye, EyeOff, Trash2, X } from 'lucide-react';
import { useFutureDropStore } from '../../store/futureDropStore';
import { FutureDrop } from '../../types';

interface FutureDropDisplayProps {
  drop: FutureDrop;
  onDismiss: () => void;
}

export const FutureDropDisplay: React.FC<FutureDropDisplayProps> = ({
  drop,
  onDismiss,
}) => {
  const [showMessage, setShowMessage] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const { markDelivered, skipDrop, deleteDrop, getDaysAgo } = useFutureDropStore();
  
  const daysAgo = getDaysAgo(new Date(drop.writtenAt));
  
  const handleReveal = () => {
    setShowMessage(true);
    markDelivered(drop.id);
  };
  
  const handleSkip = () => {
    skipDrop(drop.id);
    onDismiss();
  };
  
  const handleDelete = () => {
    deleteDrop(drop.id);
    onDismiss();
  };

  // Preview state - ask before showing
  if (!showMessage) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 p-4 bg-neumo-surface-soft rounded-neumo shadow-neumo-sm border border-brand-teal/20"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-teal/10 flex items-center justify-center flex-shrink-0">
            <Clock className="w-4 h-4 text-brand-teal" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-neumo-text mb-2">
              <span className="font-medium">From you, {daysAgo} days ago</span>
            </p>
            <p className="text-xs text-neumo-text-secondary mb-3">
              You wrote this to your future self. Want to see it?
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleReveal}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-teal text-white text-xs font-medium rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset transition-all"
              >
                <Eye className="w-3 h-3" />
                Reveal Message
              </button>
              <button
                onClick={handleSkip}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-neumo-bg text-neumo-text-secondary text-xs font-medium rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset transition-all"
              >
                <EyeOff className="w-3 h-3" />
                Not Now
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Revealed message state
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 p-4 bg-neumo-surface-soft rounded-neumo shadow-neumo-sm border border-brand-teal/20"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-brand-teal/10 flex items-center justify-center">
            <Clock className="w-3 h-3 text-brand-teal" />
          </div>
          <span className="text-xs font-medium text-brand-teal">
            From you, {daysAgo} days ago
          </span>
        </div>
        <div className="flex items-center gap-1">
          {showDeleteConfirm ? (
            <>
              <button
                onClick={handleDelete}
                className="px-2 py-1 text-xs text-red-500 hover:bg-red-50 rounded transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-2 py-1 text-xs text-neumo-text-secondary hover:bg-neumo-surface rounded transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-1 text-neumo-text-muted hover:text-red-500 transition-colors"
                title="Delete message"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onDismiss}
                className="p-1 text-neumo-text-muted hover:text-neumo-text transition-colors"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>
      
      <blockquote className="pl-3 border-l-2 border-brand-teal/30">
        <p className="text-sm text-neumo-text italic leading-relaxed">
          "{drop.messageText}"
        </p>
      </blockquote>
      
      <p className="text-xs text-neumo-text-muted mt-3">
        Written on {new Date(drop.writtenAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </p>
    </motion.div>
  );
};

// Component to check and display any pending drops
interface FutureDropCheckerProps {
  onShowPrompt?: (trigger: string) => void;
}

export const FutureDropChecker: React.FC<FutureDropCheckerProps> = () => {
  const { getDeliverableDrops, pendingDelivery, setPendingDelivery } = useFutureDropStore();
  const [dismissed, setDismissed] = useState(false);
  
  // Check for deliverable drops on mount
  React.useEffect(() => {
    if (!pendingDelivery && !dismissed) {
      const deliverable = getDeliverableDrops();
      if (deliverable.length > 0) {
        setPendingDelivery(deliverable[0]);
      }
    }
  }, [getDeliverableDrops, pendingDelivery, setPendingDelivery, dismissed]);
  
  if (!pendingDelivery || dismissed) return null;
  
  return (
    <FutureDropDisplay
      drop={pendingDelivery}
      onDismiss={() => {
        setPendingDelivery(null);
        setDismissed(true);
      }}
    />
  );
};
