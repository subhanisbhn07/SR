import { create } from 'zustand';
import { 
  LifePath, 
  PrimaryStruggle, 
  TimeAvailable, 
  PreferredMode,
  GenderIdentity,
  ContentTone,
  ExperienceLevel,
  GoalTimeframe,
  OnboardingAnswers,
  UserProfile 
} from '../types';

const STORAGE_KEY = 'signroad_user_profile';

interface OnboardingState {
  currentStep: number;
  totalSteps: number;
  answers: Partial<OnboardingAnswers>;
  userProfile: UserProfile | null;
  isOnboardingComplete: boolean;
  
  setAnswer: <K extends keyof OnboardingAnswers>(key: K, value: OnboardingAnswers[K]) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  loadProfileFromStorage: () => void;
}

const loadFromStorage = (): UserProfile | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as UserProfile;
    }
  } catch (error) {
    console.warn('Failed to load user profile from storage:', error);
  }
  return null;
};

const saveToStorage = (profile: UserProfile): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.error('Failed to save user profile to storage:', error);
  }
};

export const useOnboardingStore = create<OnboardingState>((set, get) => {
  const storedProfile = loadFromStorage();
  
  return {
    currentStep: 1,
    totalSteps: 8,
    answers: storedProfile ? {
      lifePath: storedProfile.lifePath,
      primaryStruggle: storedProfile.primaryStruggle,
      timeAvailable: storedProfile.timeAvailable,
      preferredMode: storedProfile.preferredMode,
      genderIdentity: storedProfile.genderIdentity,
      contentTone: storedProfile.contentTone,
      experienceLevel: storedProfile.experienceLevel,
      goalTimeframe: storedProfile.goalTimeframe,
    } : {},
    userProfile: storedProfile,
    isOnboardingComplete: storedProfile?.hasCompletedOnboarding ?? false,
    
    setAnswer: (key, value) => {
      set(state => ({
        answers: { ...state.answers, [key]: value }
      }));
    },
    
    nextStep: () => {
      const { currentStep, totalSteps } = get();
      if (currentStep < totalSteps) {
        set({ currentStep: currentStep + 1 });
      }
    },
    
    prevStep: () => {
      const { currentStep } = get();
      if (currentStep > 1) {
        set({ currentStep: currentStep - 1 });
      }
    },
    
    goToStep: (step) => {
      const { totalSteps } = get();
      if (step >= 1 && step <= totalSteps) {
        set({ currentStep: step });
      }
    },
    
    completeOnboarding: () => {
      const { answers } = get();
      
      if (!answers.lifePath || !answers.primaryStruggle || !answers.timeAvailable || 
          !answers.preferredMode || !answers.contentTone || !answers.experienceLevel || 
          !answers.goalTimeframe) {
        console.warn('Cannot complete onboarding: missing required answers');
        return;
      }
      
      const profile: UserProfile = {
        lifePath: answers.lifePath,
        primaryStruggle: answers.primaryStruggle,
        timeAvailable: answers.timeAvailable,
        preferredMode: answers.preferredMode,
        genderIdentity: answers.genderIdentity,
        contentTone: answers.contentTone,
        experienceLevel: answers.experienceLevel,
        goalTimeframe: answers.goalTimeframe,
        hasCompletedOnboarding: true,
        onboardingCompletedAt: new Date(),
      };
      
      saveToStorage(profile);
      set({ 
        userProfile: profile, 
        isOnboardingComplete: true,
        currentStep: 1,
      });
    },
    
    resetOnboarding: () => {
      localStorage.removeItem(STORAGE_KEY);
      set({
        currentStep: 1,
        answers: {},
        userProfile: null,
        isOnboardingComplete: false,
      });
    },
    
    loadProfileFromStorage: () => {
      const profile = loadFromStorage();
      if (profile) {
        set({
          userProfile: profile,
          isOnboardingComplete: profile.hasCompletedOnboarding,
          answers: {
            lifePath: profile.lifePath,
            primaryStruggle: profile.primaryStruggle,
            timeAvailable: profile.timeAvailable,
            preferredMode: profile.preferredMode,
            genderIdentity: profile.genderIdentity,
            contentTone: profile.contentTone,
            experienceLevel: profile.experienceLevel,
            goalTimeframe: profile.goalTimeframe,
          },
        });
      }
    },
  };
});

export const LIFE_PATH_LABELS: Record<LifePath, string> = {
  student: 'Student / Early Career',
  salaried: 'Salaried Professional',
  entrepreneur: 'Entrepreneur / Founder',
  parent: 'Parent / Caregiver',
  career_transition: 'Career Transition',
  retired: 'Retired / Semi-Retired',
};

export const PRIMARY_STRUGGLE_LABELS: Record<PrimaryStruggle, string> = {
  work_stress: 'Work Stress',
  money_worries: 'Money Worries',
  sleep_issues: 'Sleep Issues',
  loneliness: 'Loneliness',
  healing: 'Healing from Something',
  seeking_meaning: 'Seeking More Meaning',
};

export const TIME_AVAILABLE_LABELS: Record<TimeAvailable, string> = {
  '2-5min': '2-5 minutes',
  '10-15min': '10-15 minutes',
  '20+min': '20+ minutes',
};

export const PREFERRED_MODE_LABELS: Record<PreferredMode, string> = {
  solo_audio: 'Solo Audio Sessions',
  journaling: 'Journaling Prompts',
  group_support: 'Small Group Support',
};

export const GENDER_IDENTITY_LABELS: Record<GenderIdentity, string> = {
  male: 'Male',
  female: 'Female',
  non_binary: 'Non-binary',
  prefer_not_to_say: 'Prefer not to say',
};

export const CONTENT_TONE_LABELS: Record<ContentTone, string> = {
  science_based: 'More Science & Psychology',
  mystical: 'More Spiritual & Mystical',
  balanced: 'A Mix of Both',
};

export const EXPERIENCE_LEVEL_LABELS: Record<ExperienceLevel, string> = {
  new: 'New to This',
  some_experience: 'Some Experience',
  regular_practice: 'Regular Practice',
};

export const GOAL_TIMEFRAME_LABELS: Record<GoalTimeframe, string> = {
  quick_relief: 'Quick Relief Today',
  building_habit: 'Building a Habit',
  long_term_transformation: 'Long-term Transformation',
};
