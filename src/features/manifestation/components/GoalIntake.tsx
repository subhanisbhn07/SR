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
    <div className="min-h-screen bg-gradient-to-br from-onboarding-bg to-onboarding-bg-light flex items-center justify-center px-4 py-12">
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
            className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 shadow-lg"
          >
            <Target className="w-10 h-10 text-onboarding-bg" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-4">Set Your Intention</h1>
          <p className="text-xl text-white/80">
            What do you want to manifest on this journey?
          </p>
        </div>

        <div className="bg-onboarding-surface rounded-card p-8 shadow-onboarding space-y-6">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-onboarding-text mb-3">
              Choose your focus area
            </label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={`
                    p-4 rounded-container border-2 transition-all text-left
                    ${category === cat.value
                      ? 'border-onboarding-bg bg-onboarding-bg/10 shadow-md'
                      : 'border-onboarding-bg/20 bg-white hover:border-onboarding-bg/40'
                    }
                  `}
                >
                  <div className="text-2xl mb-2">{cat.emoji}</div>
                  <div className="text-sm font-medium text-onboarding-text">{cat.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Goal Input */}
          <div>
            <label className="block text-sm font-medium text-onboarding-text mb-3">
              Describe your goal in the present tense
            </label>
            <p className="text-xs text-onboarding-text-secondary mb-3">
              Example: "I am confidently presenting to my team and receiving positive feedback"
            </p>
            <textarea
              value={goalText}
              onChange={(e) => setGoalText(e.target.value)}
              placeholder="I am..."
              className="w-full px-4 py-3 bg-white border-2 border-onboarding-bg/20 rounded-container text-onboarding-text placeholder-onboarding-text-secondary/50 focus:outline-none focus:border-onboarding-bg resize-none"
              rows={4}
            />
          </div>

          {/* Tips */}
          <div className="bg-primary-500/10 border-2 border-primary-500/30 rounded-container p-4">
            <h3 className="text-sm font-semibold text-primary-600 mb-2">💡 Tips for a powerful intention:</h3>
            <ul className="text-xs text-onboarding-text-secondary space-y-1">
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
            className="group w-full px-8 py-4 bg-onboarding-bg hover:bg-onboarding-bg-light disabled:bg-onboarding-text-secondary/30 disabled:text-onboarding-text-secondary text-white font-bold text-lg rounded-button transition-all transform hover:scale-105 disabled:scale-100 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            Begin Your Journey
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
