import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Briefcase, 
  Rocket, 
  Heart, 
  RefreshCw, 
  Sun,
  Brain,
  DollarSign,
  Moon,
  Users,
  Sparkles,
  Search,
  Clock,
  Headphones,
  BookOpen,
  UsersRound,
  Beaker,
  Stars,
  Scale,
  Leaf,
  TrendingUp,
  Target,
  Zap,
  Compass,
} from 'lucide-react';
import { useOnboardingStore, 
  LIFE_PATH_LABELS,
  PRIMARY_STRUGGLE_LABELS,
  TIME_AVAILABLE_LABELS,
  PREFERRED_MODE_LABELS,
  GENDER_IDENTITY_LABELS,
  CONTENT_TONE_LABELS,
  EXPERIENCE_LEVEL_LABELS,
  GOAL_TIMEFRAME_LABELS,
} from '../../../store/onboardingStore';
import { 
  LifePath, 
  PrimaryStruggle, 
  TimeAvailable, 
  PreferredMode,
  GenderIdentity,
  ContentTone,
  ExperienceLevel,
  GoalTimeframe,
} from '../../../types';

interface OptionCardProps {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  description?: string;
}

const OptionCard: React.FC<OptionCardProps> = ({ 
  selected, 
  onClick, 
  icon, 
  label,
  description,
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
      selected 
        ? 'border-accent-500 bg-accent-500/10' 
        : 'border-neutral-700 bg-neutral-800/50 hover:border-neutral-600'
    }`}
  >
    <div className="flex items-center space-x-4">
      <div className={`p-3 rounded-lg ${
        selected ? 'bg-accent-500/20 text-accent-400' : 'bg-neutral-700/50 text-neutral-400'
      }`}>
        {icon}
      </div>
      <div className="flex-1">
        <span className={`font-medium ${selected ? 'text-accent-300' : 'text-neutral-200'}`}>
          {label}
        </span>
        {description && (
          <p className="text-sm text-neutral-500 mt-1">{description}</p>
        )}
      </div>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-6 h-6 rounded-full bg-accent-500 flex items-center justify-center"
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}
    </div>
  </motion.button>
);

const LIFE_PATH_ICONS: Record<LifePath, React.ReactNode> = {
  student: <GraduationCap className="w-5 h-5" />,
  salaried: <Briefcase className="w-5 h-5" />,
  entrepreneur: <Rocket className="w-5 h-5" />,
  parent: <Heart className="w-5 h-5" />,
  career_transition: <RefreshCw className="w-5 h-5" />,
  retired: <Sun className="w-5 h-5" />,
};

const LIFE_PATH_DESCRIPTIONS: Record<LifePath, string> = {
  student: 'Studying or early in your career journey',
  salaried: 'Working a regular job with set hours',
  entrepreneur: 'Building your own business or venture',
  parent: 'Caring for children or family members',
  career_transition: 'Changing direction in your work life',
  retired: 'Enjoying more freedom with your time',
};

export const LifePathStep: React.FC = () => {
  const { answers, setAnswer } = useOnboardingStore();
  const options: LifePath[] = ['student', 'salaried', 'entrepreneur', 'parent', 'career_transition', 'retired'];

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <OptionCard
          key={option}
          selected={answers.lifePath === option}
          onClick={() => setAnswer('lifePath', option)}
          icon={LIFE_PATH_ICONS[option]}
          label={LIFE_PATH_LABELS[option]}
          description={LIFE_PATH_DESCRIPTIONS[option]}
        />
      ))}
    </div>
  );
};

const PRIMARY_STRUGGLE_ICONS: Record<PrimaryStruggle, React.ReactNode> = {
  work_stress: <Brain className="w-5 h-5" />,
  money_worries: <DollarSign className="w-5 h-5" />,
  sleep_issues: <Moon className="w-5 h-5" />,
  loneliness: <Users className="w-5 h-5" />,
  healing: <Sparkles className="w-5 h-5" />,
  seeking_meaning: <Search className="w-5 h-5" />,
};

const PRIMARY_STRUGGLE_DESCRIPTIONS: Record<PrimaryStruggle, string> = {
  work_stress: 'Feeling overwhelmed by work demands',
  money_worries: 'Anxious about finances or abundance',
  sleep_issues: 'Trouble falling or staying asleep',
  loneliness: 'Feeling disconnected from others',
  healing: 'Processing past experiences or trauma',
  seeking_meaning: 'Looking for purpose and direction',
};

export const PrimaryStruggleStep: React.FC = () => {
  const { answers, setAnswer } = useOnboardingStore();
  const options: PrimaryStruggle[] = ['work_stress', 'money_worries', 'sleep_issues', 'loneliness', 'healing', 'seeking_meaning'];

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <OptionCard
          key={option}
          selected={answers.primaryStruggle === option}
          onClick={() => setAnswer('primaryStruggle', option)}
          icon={PRIMARY_STRUGGLE_ICONS[option]}
          label={PRIMARY_STRUGGLE_LABELS[option]}
          description={PRIMARY_STRUGGLE_DESCRIPTIONS[option]}
        />
      ))}
    </div>
  );
};

const TIME_AVAILABLE_ICONS: Record<TimeAvailable, React.ReactNode> = {
  '2-5min': <Zap className="w-5 h-5" />,
  '10-15min': <Clock className="w-5 h-5" />,
  '20+min': <Compass className="w-5 h-5" />,
};

const TIME_AVAILABLE_DESCRIPTIONS: Record<TimeAvailable, string> = {
  '2-5min': 'Quick micro-moments between tasks',
  '10-15min': 'A focused break in your day',
  '20+min': 'Deep, immersive sessions',
};

export const TimeAvailableStep: React.FC = () => {
  const { answers, setAnswer } = useOnboardingStore();
  const options: TimeAvailable[] = ['2-5min', '10-15min', '20+min'];

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <OptionCard
          key={option}
          selected={answers.timeAvailable === option}
          onClick={() => setAnswer('timeAvailable', option)}
          icon={TIME_AVAILABLE_ICONS[option]}
          label={TIME_AVAILABLE_LABELS[option]}
          description={TIME_AVAILABLE_DESCRIPTIONS[option]}
        />
      ))}
    </div>
  );
};

const PREFERRED_MODE_ICONS: Record<PreferredMode, React.ReactNode> = {
  solo_audio: <Headphones className="w-5 h-5" />,
  journaling: <BookOpen className="w-5 h-5" />,
  group_support: <UsersRound className="w-5 h-5" />,
};

const PREFERRED_MODE_DESCRIPTIONS: Record<PreferredMode, string> = {
  solo_audio: 'Guided audio sessions you can do anywhere',
  journaling: 'Written prompts for self-reflection',
  group_support: 'Connect with a small tribe for accountability',
};

export const PreferredModeStep: React.FC = () => {
  const { answers, setAnswer } = useOnboardingStore();
  const options: PreferredMode[] = ['solo_audio', 'journaling', 'group_support'];

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <OptionCard
          key={option}
          selected={answers.preferredMode === option}
          onClick={() => setAnswer('preferredMode', option)}
          icon={PREFERRED_MODE_ICONS[option]}
          label={PREFERRED_MODE_LABELS[option]}
          description={PREFERRED_MODE_DESCRIPTIONS[option]}
        />
      ))}
    </div>
  );
};

export const GenderIdentityStep: React.FC = () => {
  const { answers, setAnswer } = useOnboardingStore();
  const options: GenderIdentity[] = ['male', 'female', 'non_binary', 'prefer_not_to_say'];

  return (
    <div className="space-y-3">
      <p className="text-sm text-neutral-500 mb-4">
        This helps us show imagery and examples that feel relevant to you. You can skip this question.
      </p>
      {options.map((option) => (
        <OptionCard
          key={option}
          selected={answers.genderIdentity === option}
          onClick={() => setAnswer('genderIdentity', option)}
          icon={<Users className="w-5 h-5" />}
          label={GENDER_IDENTITY_LABELS[option]}
        />
      ))}
    </div>
  );
};

const CONTENT_TONE_ICONS: Record<ContentTone, React.ReactNode> = {
  science_based: <Beaker className="w-5 h-5" />,
  mystical: <Stars className="w-5 h-5" />,
  balanced: <Scale className="w-5 h-5" />,
};

const CONTENT_TONE_DESCRIPTIONS: Record<ContentTone, string> = {
  science_based: 'Psychology, neuroscience, and evidence-based practices',
  mystical: 'Universe, energy, manifestation, and spiritual concepts',
  balanced: 'A blend of both approaches',
};

export const ContentToneStep: React.FC = () => {
  const { answers, setAnswer } = useOnboardingStore();
  const options: ContentTone[] = ['science_based', 'mystical', 'balanced'];

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <OptionCard
          key={option}
          selected={answers.contentTone === option}
          onClick={() => setAnswer('contentTone', option)}
          icon={CONTENT_TONE_ICONS[option]}
          label={CONTENT_TONE_LABELS[option]}
          description={CONTENT_TONE_DESCRIPTIONS[option]}
        />
      ))}
    </div>
  );
};

const EXPERIENCE_LEVEL_ICONS: Record<ExperienceLevel, React.ReactNode> = {
  new: <Leaf className="w-5 h-5" />,
  some_experience: <TrendingUp className="w-5 h-5" />,
  regular_practice: <Target className="w-5 h-5" />,
};

const EXPERIENCE_LEVEL_DESCRIPTIONS: Record<ExperienceLevel, string> = {
  new: "I'm just getting started with meditation or manifestation",
  some_experience: "I've tried it before but not consistently",
  regular_practice: 'I have an established practice',
};

export const ExperienceLevelStep: React.FC = () => {
  const { answers, setAnswer } = useOnboardingStore();
  const options: ExperienceLevel[] = ['new', 'some_experience', 'regular_practice'];

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <OptionCard
          key={option}
          selected={answers.experienceLevel === option}
          onClick={() => setAnswer('experienceLevel', option)}
          icon={EXPERIENCE_LEVEL_ICONS[option]}
          label={EXPERIENCE_LEVEL_LABELS[option]}
          description={EXPERIENCE_LEVEL_DESCRIPTIONS[option]}
        />
      ))}
    </div>
  );
};

const GOAL_TIMEFRAME_ICONS: Record<GoalTimeframe, React.ReactNode> = {
  quick_relief: <Zap className="w-5 h-5" />,
  building_habit: <RefreshCw className="w-5 h-5" />,
  long_term_transformation: <Sparkles className="w-5 h-5" />,
};

const GOAL_TIMEFRAME_DESCRIPTIONS: Record<GoalTimeframe, string> = {
  quick_relief: 'I need help right now with something specific',
  building_habit: 'I want to develop a consistent daily practice',
  long_term_transformation: 'I\'m committed to deep, lasting change',
};

export const GoalTimeframeStep: React.FC = () => {
  const { answers, setAnswer } = useOnboardingStore();
  const options: GoalTimeframe[] = ['quick_relief', 'building_habit', 'long_term_transformation'];

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <OptionCard
          key={option}
          selected={answers.goalTimeframe === option}
          onClick={() => setAnswer('goalTimeframe', option)}
          icon={GOAL_TIMEFRAME_ICONS[option]}
          label={GOAL_TIMEFRAME_LABELS[option]}
          description={GOAL_TIMEFRAME_DESCRIPTIONS[option]}
        />
      ))}
    </div>
  );
};
