import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useOnboardingStore, 
  LIFE_PATH_LABELS, 
  PRIMARY_STRUGGLE_LABELS,
  TIME_AVAILABLE_LABELS,
  PREFERRED_MODE_LABELS,
  GENDER_IDENTITY_LABELS,
  CONTENT_TONE_LABELS,
  EXPERIENCE_LEVEL_LABELS,
  GOAL_TIMEFRAME_LABELS,
} from '../../store/onboardingStore';
import { 
  LifePath, 
  PrimaryStruggle, 
  TimeAvailable, 
  PreferredMode,
  GenderIdentity,
  ContentTone,
  ExperienceLevel,
  GoalTimeframe,
} from '../../../../shared/types/onboarding';

interface OptionCardProps {
  selected: boolean;
  onClick: () => void;
  icon?: string;
  label: string;
  description?: string;
}

const OptionCard: React.FC<OptionCardProps> = ({ selected, onClick, icon, label, description }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`w-full p-4 rounded-xl border text-left transition-all ${
      selected 
        ? 'border-amber-500 bg-amber-500/10' 
        : 'border-neutral-700 bg-neutral-800/50 hover:border-neutral-600'
    }`}
  >
    <div className="flex items-center gap-3">
      {icon && <span className="text-2xl">{icon}</span>}
      <div className="flex-1">
        <p className={`font-medium ${selected ? 'text-amber-400' : 'text-neutral-200'}`}>
          {label}
        </p>
        {description && (
          <p className="text-sm text-neutral-400 mt-1">{description}</p>
        )}
      </div>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center"
        >
          <Check className="w-4 h-4 text-white" />
        </motion.div>
      )}
    </div>
  </motion.button>
);

export const LifePathStep: React.FC = () => {
  const { answers, setAnswer } = useOnboardingStore();
  
  const options: { value: LifePath; icon: string }[] = [
    { value: 'student', icon: '📚' },
    { value: 'salaried', icon: '💼' },
    { value: 'entrepreneur', icon: '🚀' },
    { value: 'parent', icon: '👨‍👩‍👧' },
    { value: 'career_transition', icon: '🔄' },
    { value: 'retired', icon: '🌅' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        What season of life are you in?
      </h2>
      <div className="space-y-3">
        {options.map(({ value, icon }) => (
          <OptionCard
            key={value}
            selected={answers.lifePath === value}
            onClick={() => setAnswer('lifePath', value)}
            icon={icon}
            label={LIFE_PATH_LABELS[value]}
          />
        ))}
      </div>
    </div>
  );
};

export const PrimaryStruggleStep: React.FC = () => {
  const { answers, setAnswer } = useOnboardingStore();
  
  const options: { value: PrimaryStruggle; icon: string }[] = [
    { value: 'work_stress', icon: '😰' },
    { value: 'money_worries', icon: '💰' },
    { value: 'sleep_issues', icon: '😴' },
    { value: 'loneliness', icon: '💔' },
    { value: 'healing', icon: '🩹' },
    { value: 'seeking_meaning', icon: '✨' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        What's weighing on you most right now?
      </h2>
      <div className="space-y-3">
        {options.map(({ value, icon }) => (
          <OptionCard
            key={value}
            selected={answers.primaryStruggle === value}
            onClick={() => setAnswer('primaryStruggle', value)}
            icon={icon}
            label={PRIMARY_STRUGGLE_LABELS[value]}
          />
        ))}
      </div>
    </div>
  );
};

export const TimeAvailableStep: React.FC = () => {
  const { answers, setAnswer } = useOnboardingStore();
  
  const options: { value: TimeAvailable; icon: string; description: string }[] = [
    { value: '2-5min', icon: '⚡', description: 'Quick micro-doses for busy days' },
    { value: '10-15min', icon: '☕', description: 'A mindful break in your day' },
    { value: '20+min', icon: '🧘', description: 'Deep dives for transformation' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        How much time do you realistically have?
      </h2>
      <div className="space-y-3">
        {options.map(({ value, icon, description }) => (
          <OptionCard
            key={value}
            selected={answers.timeAvailable === value}
            onClick={() => setAnswer('timeAvailable', value)}
            icon={icon}
            label={TIME_AVAILABLE_LABELS[value]}
            description={description}
          />
        ))}
      </div>
    </div>
  );
};

export const PreferredModeStep: React.FC = () => {
  const { answers, setAnswer } = useOnboardingStore();
  
  const options: { value: PreferredMode; icon: string; description: string }[] = [
    { value: 'solo_audio', icon: '🎧', description: 'Guided audio sessions you can do anywhere' },
    { value: 'journaling', icon: '📝', description: 'Reflective prompts for self-discovery' },
    { value: 'group_support', icon: '👥', description: 'Connect with a small tribe for accountability' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        How do you prefer to reflect?
      </h2>
      <div className="space-y-3">
        {options.map(({ value, icon, description }) => (
          <OptionCard
            key={value}
            selected={answers.preferredMode === value}
            onClick={() => setAnswer('preferredMode', value)}
            icon={icon}
            label={PREFERRED_MODE_LABELS[value]}
            description={description}
          />
        ))}
      </div>
    </div>
  );
};

export const GenderIdentityStep: React.FC = () => {
  const { answers, setAnswer } = useOnboardingStore();
  
  const options: GenderIdentity[] = ['male', 'female', 'non_binary', 'prefer_not_to_say'];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white text-center mb-2">
        How do you identify?
      </h2>
      <p className="text-neutral-400 text-center text-sm mb-6">
        This helps us personalize imagery and language (optional)
      </p>
      <div className="space-y-3">
        {options.map((value) => (
          <OptionCard
            key={value}
            selected={answers.genderIdentity === value}
            onClick={() => setAnswer('genderIdentity', value)}
            label={GENDER_IDENTITY_LABELS[value]}
          />
        ))}
      </div>
    </div>
  );
};

export const ContentToneStep: React.FC = () => {
  const { answers, setAnswer } = useOnboardingStore();
  
  const options: { value: ContentTone; icon: string; description: string }[] = [
    { value: 'science_based', icon: '🧠', description: 'Evidence-based psychology and neuroscience' },
    { value: 'mystical', icon: '🔮', description: 'Spiritual practices and manifestation' },
    { value: 'balanced', icon: '⚖️', description: 'A blend of both approaches' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        How do you like things explained?
      </h2>
      <div className="space-y-3">
        {options.map(({ value, icon, description }) => (
          <OptionCard
            key={value}
            selected={answers.contentTone === value}
            onClick={() => setAnswer('contentTone', value)}
            icon={icon}
            label={CONTENT_TONE_LABELS[value]}
            description={description}
          />
        ))}
      </div>
    </div>
  );
};

export const ExperienceLevelStep: React.FC = () => {
  const { answers, setAnswer } = useOnboardingStore();
  
  const options: { value: ExperienceLevel; icon: string; description: string }[] = [
    { value: 'new', icon: '🌱', description: 'Just starting my journey' },
    { value: 'some_experience', icon: '🌿', description: 'I\'ve tried meditation or journaling before' },
    { value: 'regular_practice', icon: '🌳', description: 'I have an established practice' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        What's your experience level?
      </h2>
      <div className="space-y-3">
        {options.map(({ value, icon, description }) => (
          <OptionCard
            key={value}
            selected={answers.experienceLevel === value}
            onClick={() => setAnswer('experienceLevel', value)}
            icon={icon}
            label={EXPERIENCE_LEVEL_LABELS[value]}
            description={description}
          />
        ))}
      </div>
    </div>
  );
};

export const GoalTimeframeStep: React.FC = () => {
  const { answers, setAnswer } = useOnboardingStore();
  
  const options: { value: GoalTimeframe; icon: string; description: string }[] = [
    { value: 'quick_relief', icon: '🆘', description: 'I need help right now' },
    { value: 'building_habit', icon: '📅', description: 'I want to build a consistent practice' },
    { value: 'long_term_transformation', icon: '🦋', description: 'I\'m committed to deep change' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        What's your primary goal?
      </h2>
      <div className="space-y-3">
        {options.map(({ value, icon, description }) => (
          <OptionCard
            key={value}
            selected={answers.goalTimeframe === value}
            onClick={() => setAnswer('goalTimeframe', value)}
            icon={icon}
            label={GOAL_TIMEFRAME_LABELS[value]}
            description={description}
          />
        ))}
      </div>
    </div>
  );
};
