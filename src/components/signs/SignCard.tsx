import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Sparkles, MapPin } from 'lucide-react';
import { Sign, SignRarity, RARITY_SPARKS } from '../../store/signsStore';
import { useThemeStore } from '../../store/themeStore';

interface SignCardProps {
  sign: Sign;
  expiresAt?: Date;
  onLog?: () => void;
  isLogged?: boolean;
  compact?: boolean;
}

const rarityColors: Record<SignRarity, { bg: string; border: string; text: string; glow: string }> = {
  whispered: {
    bg: 'bg-neutral-100 dark:bg-neutral-800',
    border: 'border-neutral-300 dark:border-neutral-600',
    text: 'text-neutral-600 dark:text-neutral-400',
    glow: '',
  },
  spoken: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-300 dark:border-blue-700',
    text: 'text-blue-600 dark:text-blue-400',
    glow: '',
  },
  shouted: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-300 dark:border-purple-700',
    text: 'text-purple-600 dark:text-purple-400',
    glow: 'shadow-purple-500/20',
  },
  thundered: {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-300 dark:border-amber-700',
    text: 'text-amber-600 dark:text-amber-400',
    glow: 'shadow-amber-500/30',
  },
  cosmos_aligned: {
    bg: 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20',
    border: 'border-emerald-400 dark:border-emerald-600',
    text: 'text-emerald-600 dark:text-emerald-400',
    glow: 'shadow-emerald-500/40 shadow-lg',
  },
};

const rarityLabels: Record<SignRarity, string> = {
  whispered: 'Whispered',
  spoken: 'Spoken',
  shouted: 'Shouted',
  thundered: 'Thundered',
  cosmos_aligned: 'Cosmos Aligned',
};

export const SignCard: React.FC<SignCardProps> = ({
  sign,
  expiresAt,
  onLog,
  isLogged = false,
  compact = false,
}) => {
  const { theme } = useThemeStore();
  const colors = rarityColors[sign.rarity];
  const sparks = RARITY_SPARKS[sign.rarity];

  // Calculate time remaining
  const getTimeRemaining = () => {
    if (!expiresAt) return null;
    const now = new Date();
    const diff = expiresAt.getTime() - now.getTime();
    if (diff <= 0) return 'Expired';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const timeRemaining = getTimeRemaining();

  if (compact) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`p-3 rounded-xl border ${colors.bg} ${colors.border} ${colors.glow}`}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{sign.emoji}</span>
          <div className="flex-1 min-w-0">
            <h4 className={`font-medium truncate ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
              {sign.name}
            </h4>
            <p className={`text-xs ${colors.text}`}>{rarityLabels[sign.rarity]}</p>
          </div>
          <div className="flex items-center gap-1 text-gold-500">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">+{sparks}</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-2xl border ${colors.bg} ${colors.border} ${colors.glow} ${
        isLogged ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl">{sign.emoji}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
              {sign.name}
            </h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
              {rarityLabels[sign.rarity]}
            </span>
          </div>
          <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
            {sign.description}
          </p>
          <p className={`text-xs italic ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'}`}>
            "{sign.meaning}"
          </p>
        </div>
      </div>

      <div className={`mt-4 pt-3 border-t ${theme === 'dark' ? 'border-neutral-700' : 'border-neutral-200'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {timeRemaining && (
              <div className="flex items-center gap-1 text-sm">
                <Clock className={`w-4 h-4 ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`} />
                <span className={theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}>
                  {timeRemaining}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-gold-500" />
              <span className="text-sm font-medium text-gold-500">+{sparks} sparks</span>
            </div>
          </div>

          {onLog && !isLogged && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLog}
              className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition-colors"
            >
              I Found It!
            </motion.button>
          )}

          {isLogged && (
            <span className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl text-sm font-medium">
              Logged Today
            </span>
          )}
        </div>
      </div>

      {sign.tipsForFinding && (
        <div className={`mt-3 p-2 rounded-lg ${theme === 'dark' ? 'bg-neutral-700/50' : 'bg-neutral-100'}`}>
          <div className="flex items-start gap-2">
            <MapPin className={`w-4 h-4 mt-0.5 ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`} />
            <p className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <span className="font-medium">Tip:</span> {sign.tipsForFinding}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};
