import { create } from 'zustand';
import { RoadStep, UserProgress, Lantern } from '../types/journey';
import { roadStepsData } from '../data/roadSteps';

interface JourneyState {
  roadSteps: RoadStep[];
  userProgress: UserProgress;
  currentStep: RoadStep | null;
  completeStep: (stepNumber: number) => void;
  updateLanternHealth: () => void;
  addSparks: (amount: number) => void;
  updateStreak: () => void;
  setCurrentStep: (stepNumber: number) => void;
}

const initialLantern: Lantern = {
  health: 100,
  lastUpdated: new Date(),
};

const initialProgress: UserProgress = {
  currentStep: 1,
  completedSteps: [],
  lantern: initialLantern,
  sparks: 0,
  streak: 0,
  lastMeditationDate: null,
};

export const useJourneyStore = create<JourneyState>((set, get) => ({
  roadSteps: roadStepsData,
  userProgress: initialProgress,
  currentStep: null,

  setCurrentStep: (stepNumber: number) => {
    const step = get().roadSteps.find(s => s.stepNumber === stepNumber);
    set({ currentStep: step || null });
  },

  completeStep: (stepNumber: number) => {
    const { userProgress } = get();
    
    // Don't complete if already completed
    if (userProgress.completedSteps.includes(stepNumber)) {
      return;
    }

    const step = get().roadSteps.find(s => s.stepNumber === stepNumber);
    if (!step) return;

    // Add to completed steps
    const newCompletedSteps = [...userProgress.completedSteps, stepNumber];
    
    // Award sparks and XP
    const newSparks = userProgress.sparks + step.sparksReward;
    
    // Update streak
    const today = new Date();
    const lastMeditation = userProgress.lastMeditationDate;
    let newStreak = userProgress.streak;
    
    if (lastMeditation) {
      const daysSinceLastMeditation = Math.floor(
        (today.getTime() - lastMeditation.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      if (daysSinceLastMeditation === 1) {
        // Consecutive day - increment streak
        newStreak += 1;
      } else if (daysSinceLastMeditation === 0) {
        // Same day - keep streak
        newStreak = userProgress.streak;
      } else {
        // Missed days - streak stays frozen (doesn't reset to 0)
        newStreak = userProgress.streak;
      }
    } else {
      // First meditation
      newStreak = 1;
    }

    // Update lantern health to 100 when completing a step
    const newLantern: Lantern = {
      health: 100,
      lastUpdated: today,
    };

    // Move to next step
    const nextStep = stepNumber + 1;

    set({
      userProgress: {
        ...userProgress,
        currentStep: nextStep,
        completedSteps: newCompletedSteps,
        sparks: newSparks,
        streak: newStreak,
        lastMeditationDate: today,
        lantern: newLantern,
      },
    });
  },

  updateLanternHealth: () => {
    const { userProgress } = get();
    const today = new Date();
    const lastMeditation = userProgress.lastMeditationDate;

    if (!lastMeditation) return;

    const daysSinceLastMeditation = Math.floor(
      (today.getTime() - lastMeditation.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceLastMeditation > 0) {
      // Dim lantern by 15 points per missed day
      const healthLoss = daysSinceLastMeditation * 15;
      const newHealth = Math.max(0, userProgress.lantern.health - healthLoss);

      set({
        userProgress: {
          ...userProgress,
          lantern: {
            health: newHealth,
            lastUpdated: today,
          },
        },
      });
    }
  },

  addSparks: (amount: number) => {
    const { userProgress } = get();
    set({
      userProgress: {
        ...userProgress,
        sparks: userProgress.sparks + amount,
      },
    });
  },

  updateStreak: () => {
    const { userProgress } = get();
    const today = new Date();
    const lastMeditation = userProgress.lastMeditationDate;

    if (!lastMeditation) return;

    const daysSinceLastMeditation = Math.floor(
      (today.getTime() - lastMeditation.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceLastMeditation === 1) {
      // Consecutive day
      set({
        userProgress: {
          ...userProgress,
          streak: userProgress.streak + 1,
        },
      });
    }
    // If daysSinceLastMeditation > 1, streak stays frozen (doesn't reset)
  },
}));
