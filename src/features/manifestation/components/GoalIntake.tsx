import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, ArrowRight } from 'lucide-react';
import { useManifestationStore } from '../store/manifestationStore';
import { Goal } from '../types/manifestation';

interface GoalIntakeProps {
  onComplete: () => void;
}

export const GoalIntake = ({ onComplete }: GoalIntakeProps) => {
  const { setGoal } = useManifestationStore();
  const [goalText, setGoalText] = useState('');
  const [category, setCategory] = useState<Goal['category']>('personal');

  const categories: { value: Goal['category']; label: string; emoji: string }[] = [
    { value: 'wealth', label: 'Wealth & Abundance', emoji: '💰' },
    { value: 'love', label: 'Love & Relationships', emoji: '❤️' },
    { value: 'health', label: 'Health & Wellness', emoji: '🌱' },
    { value: 'career', label: 'Career & Success', emoji: '🚀' },
    { value: 'personal', label: 'Personal Growth', emoji: '✨' },
    { value: 'other', label: 'Other', emoji: '🎯' },
  ];

  const handleSubmit = () => {
    if (!goalText.trim()) return;

    const goal: Goal = {
      id: Date.now().toString(),
      text: goalText,
      category,
      createdAt: new Date(),
    };

    setGoal(goal);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-accent-500/20 rounded-full mb-6"
          >
            <Target className="w-10 h-10 text-accent-500" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-4">Set Your Intention</h1>
          <p className="text-xl text-neutral-400">
            What do you want to manifest on this journey?
          </p>
        </div>

        <div className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-8 border border-neutral-700 space-y-6">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-3">
              Choose your focus area
            </label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={`
                    p-4 rounded-lg border-2 transition-all text-left
                    ${category === cat.value
                      ? 'border-accent-500 bg-accent-500/10'
                      : 'border-neutral-700 bg-neutral-900/50 hover:border-neutral-600'
                    }
                  `}
                >
                  <div className="text-2xl mb-2">{cat.emoji}</div>
                  <div className="text-sm font-medium text-white">{cat.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Goal Input */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-3">
              Describe your goal in the present tense
            </label>
            <p className="text-xs text-neutral-500 mb-3">
              Example: "I am confidently presenting to my team and receiving positive feedback"
            </p>
            <textarea
              value={goalText}
              onChange={(e) => setGoalText(e.target.value)}
              placeholder="I am..."
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-accent-500 resize-none"
              rows={4}
            />
          </div>

          {/* Tips */}
          <div className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-primary-400 mb-2">💡 Tips for a powerful intention:</h3>
            <ul className="text-xs text-neutral-300 space-y-1">
              <li>• Write in present tense, as if it's already happening</li>
              <li>• Be specific about what you want to experience</li>
              <li>• Include how it feels, not just what it looks like</li>
              <li>• Focus on what you want, not what you don't want</li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!goalText.trim()}
            className="w-full px-8 py-4 bg-gradient-to-r from-accent-500 to-primary-500 hover:from-accent-600 hover:to-primary-600 disabled:from-neutral-700 disabled:to-neutral-700 disabled:text-neutral-500 text-white font-bold text-lg rounded-xl transition-all transform hover:scale-105 disabled:scale-100 flex items-center justify-center gap-2"
          >
            Begin Your Journey
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
