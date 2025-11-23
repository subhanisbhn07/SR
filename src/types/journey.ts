export interface RoadStep {
  stepNumber: number;
  title: string;
  description: string;
  theme: string;
  isFree: boolean;
  signChallenge: string;
  signDescription: string;
  meditationScript: string;
  xpReward: number;
  sparksReward: number;
  audioUrl?: string;
  specialEvent?: string;
}

export interface Lantern {
  health: number; // 0-100
  lastUpdated: Date;
}

export interface UserProgress {
  currentStep: number;
  completedSteps: number[];
  lantern: Lantern;
  sparks: number;
  streak: number;
  lastMeditationDate: Date | null;
}
