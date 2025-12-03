import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  JourneyUser,
  UserProgress,
  FoundSign,
  Tribe,
  TribeMember,
  OnboardingState,
  Intention,
  ROAD_STEPS,
  SPARK_REWARDS,
  RARITY_CONFIG,
  TRIBE_AVATARS,
  UniverseReceipt,
} from '../types/journey';

interface JourneyState {
  // User state
  user: JourneyUser | null;
  isAuthenticated: boolean;
  
  // Onboarding
  onboarding: OnboardingState;
  
  // Audio state
  audioState: {
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    volume: number;
    backgroundVolume: number;
    selectedBackground: string;
  };
  
  // UI state
  showSignReveal: boolean;
  showPaywall: boolean;
  showUniverseReceipt: boolean;
  currentReceipt: UniverseReceipt | null;
  signRevealed: boolean;
  meditationComplete: boolean;
  
  // Actions
  setOnboardingStep: (step: OnboardingState['step']) => void;
  setIntention: (intention: Intention) => void;
  completeOnboarding: (email: string, name: string) => void;
  
  // Journey actions
  startMeditation: (day: number) => void;
  completeMeditation: () => void;
  revealSign: () => void;
  logSign: (journalEntry: string, isDigital: boolean, location?: string) => void;
  skipSign: () => void;
  
  // Gamification
  addSparks: (amount: number, reason: string) => void;
  updateLanternHealth: () => void;
  rekindleLantern: () => void;
  
  // Tribe
  joinTribe: () => void;
  sendSpark: (memberId: string) => void;
  
  // Paywall
  becomeSeeker: () => void;
  dismissPaywall: () => void;
  
  // Universe Receipt
  generateReceipt: (sign: FoundSign) => UniverseReceipt;
  showReceipt: (receipt: UniverseReceipt) => void;
  hideReceipt: () => void;
  
  // Audio controls
  setAudioPlaying: (playing: boolean) => void;
  setAudioTime: (time: number) => void;
  setAudioVolume: (volume: number) => void;
  setBackgroundVolume: (volume: number) => void;
  setSelectedBackground: (background: string) => void;
  
  // Utility
  canAccessDay: (day: number) => boolean;
  getDayStatus: (day: number) => 'locked' | 'available' | 'completed' | 'current';
  logout: () => void;
}

// Generate anonymous name
const generateOdonym = () => {
  const adjectives = ['Wandering', 'Seeking', 'Dreaming', 'Rising', 'Flowing'];
  const nouns = ['Star', 'Moon', 'River', 'Mountain', 'Wind'];
  const number = Math.floor(Math.random() * 999) + 1;
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]} #${number}`;
};

// Generate mock tribe members
const generateMockTribe = (userId: string): Tribe => {
  const members: TribeMember[] = [
    {
      id: userId,
      odonym: generateOdonym(),
      avatar: TRIBE_AVATARS[Math.floor(Math.random() * TRIBE_AVATARS.length)],
      meditatedToday: false,
      currentDay: 1,
      lastMeditationAt: null,
    },
    ...Array.from({ length: 4 }, (_, i) => ({
      id: `member-${i + 1}`,
      odonym: generateOdonym(),
      avatar: TRIBE_AVATARS[i % TRIBE_AVATARS.length],
      meditatedToday: Math.random() > 0.4,
      currentDay: Math.floor(Math.random() * 7) + 1,
      lastMeditationAt: Math.random() > 0.5 ? new Date() : null,
    })),
  ];
  
  return {
    id: `tribe-${Date.now()}`,
    members,
    createdAt: new Date(),
  };
};

// Calculate rarity
const calculateRarity = (): { rarity: 'common' | 'rare' | 'mythic'; probability: number } => {
  const roll = Math.random();
  if (roll < RARITY_CONFIG.mythic.chance) {
    return { rarity: 'mythic', probability: Math.floor(Math.random() * 500) + 500 };
  } else if (roll < RARITY_CONFIG.mythic.chance + RARITY_CONFIG.rare.chance) {
    return { rarity: 'rare', probability: Math.floor(Math.random() * 300) + 200 };
  }
  return { rarity: 'common', probability: Math.floor(Math.random() * 100) + 50 };
};

// Calculate lantern dimming based on days missed
const calculateLanternDim = (lastActiveAt: Date | null): number => {
  if (!lastActiveAt) return 100;
  
  const now = new Date();
  const diffMs = now.getTime() - new Date(lastActiveAt).getTime();
  const daysMissed = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (daysMissed === 0) return 0;
  if (daysMissed === 1) return 20;
  if (daysMissed === 2) return 40;
  if (daysMissed === 3) return 60;
  return 80; // 7+ days
};

export const useJourneyStore = create<JourneyState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      onboarding: {
        step: 'splash',
        selectedIntention: null,
      },
      
      audioState: {
        isPlaying: false,
        currentTime: 0,
        duration: 0,
        volume: 1,
        backgroundVolume: 0.5,
        selectedBackground: 'theta',
      },
      
      showSignReveal: false,
      showPaywall: false,
      showUniverseReceipt: false,
      currentReceipt: null,
      signRevealed: false,
      meditationComplete: false,
      
      setOnboardingStep: (step) => {
        set((state) => ({
          onboarding: { ...state.onboarding, step },
        }));
      },
      
      setIntention: (intention) => {
        set((state) => ({
          onboarding: { ...state.onboarding, selectedIntention: intention },
        }));
      },
      
      completeOnboarding: (email, name) => {
        const userId = `user-${Date.now()}`;
        const newUser: JourneyUser = {
          id: userId,
          email,
          fullName: name,
          isSeeker: false,
          role: 'wanderer',
          createdAt: new Date(),
          progress: {
            currentDay: 1,
            completedDays: [],
            sparks: 0,
            lanternHealth: 100,
            lastMeditationAt: null,
            lastActiveAt: new Date(),
            streakDays: 0,
            totalSignsFound: 0,
            intention: get().onboarding.selectedIntention,
          },
          foundSigns: [],
        };
        
        set({
          user: newUser,
          isAuthenticated: true,
          onboarding: { step: 'complete', selectedIntention: get().onboarding.selectedIntention },
        });
      },
      
      startMeditation: (day) => {
        set({
          meditationComplete: false,
          signRevealed: false,
          audioState: {
            ...get().audioState,
            isPlaying: true,
            currentTime: 0,
          },
        });
      },
      
      completeMeditation: () => {
        const { user } = get();
        if (!user) return;
        
        const currentStep = ROAD_STEPS[user.progress.currentDay - 1];
        const now = new Date();
        
        // Update lantern health (restore if dimmed)
        const dimAmount = calculateLanternDim(user.progress.lastActiveAt);
        const newLanternHealth = Math.min(100, user.progress.lanternHealth + (100 - user.progress.lanternHealth));
        
        set((state) => ({
          meditationComplete: true,
          user: state.user ? {
            ...state.user,
            progress: {
              ...state.user.progress,
              sparks: state.user.progress.sparks + SPARK_REWARDS.MEDITATION_COMPLETE,
              lanternHealth: newLanternHealth,
              lastMeditationAt: now,
              lastActiveAt: now,
              streakDays: state.user.progress.streakDays + 1,
            },
          } : null,
        }));
        
        // Check if Day 7 completed - show paywall
        if (user.progress.currentDay === 7 && !user.isSeeker) {
          setTimeout(() => {
            set({ showPaywall: true });
          }, 2000);
        }
      },
      
      revealSign: () => {
        set({ showSignReveal: true, signRevealed: true });
      },
      
      logSign: (journalEntry, isDigital, location) => {
        const { user } = get();
        if (!user) return;
        
        const currentStep = ROAD_STEPS[user.progress.currentDay - 1];
        const { rarity, probability } = calculateRarity();
        
        const foundSign: FoundSign = {
          id: `sign-${Date.now()}`,
          userId: user.id,
          dayNumber: user.progress.currentDay,
          signName: currentStep.signName,
          signEmoji: currentStep.signEmoji,
          journalEntry,
          foundAt: new Date(),
          isDigital,
          location,
          rarity,
        };
        
        // Check tribe bonus
        const tribeBonus = user.tribe?.members.every(m => m.meditatedToday) ? SPARK_REWARDS.TRIBE_BONUS : 0;
        
        set((state) => ({
          showSignReveal: false,
          user: state.user ? {
            ...state.user,
            progress: {
              ...state.user.progress,
              sparks: state.user.progress.sparks + SPARK_REWARDS.SIGN_FOUND + tribeBonus,
              completedDays: [...state.user.progress.completedDays, state.user.progress.currentDay],
              currentDay: state.user.progress.currentDay + 1,
              totalSignsFound: state.user.progress.totalSignsFound + 1,
            },
            foundSigns: [...state.user.foundSigns, foundSign],
          } : null,
        }));
        
        // Generate and show Universe Receipt for milestone days
        const milestones = [7, 10, 14, 30, 60, 90];
        if (milestones.includes(user.progress.currentDay)) {
          const receipt = get().generateReceipt(foundSign);
          get().showReceipt(receipt);
        }
      },
      
      skipSign: () => {
        const { user } = get();
        if (!user) return;
        
        set((state) => ({
          showSignReveal: false,
          user: state.user ? {
            ...state.user,
            progress: {
              ...state.user.progress,
              completedDays: [...state.user.progress.completedDays, state.user.progress.currentDay],
              currentDay: state.user.progress.currentDay + 1,
            },
          } : null,
        }));
      },
      
      addSparks: (amount, reason) => {
        set((state) => ({
          user: state.user ? {
            ...state.user,
            progress: {
              ...state.user.progress,
              sparks: state.user.progress.sparks + amount,
            },
          } : null,
        }));
      },
      
      updateLanternHealth: () => {
        const { user } = get();
        if (!user) return;
        
        const dimAmount = calculateLanternDim(user.progress.lastActiveAt);
        const newHealth = Math.max(0, user.progress.lanternHealth - dimAmount);
        
        set((state) => ({
          user: state.user ? {
            ...state.user,
            progress: {
              ...state.user.progress,
              lanternHealth: newHealth,
            },
          } : null,
        }));
      },
      
      rekindleLantern: () => {
        set((state) => ({
          user: state.user ? {
            ...state.user,
            progress: {
              ...state.user.progress,
              lanternHealth: 100,
              sparks: state.user.progress.sparks + SPARK_REWARDS.REKINDLING,
              lastActiveAt: new Date(),
            },
          } : null,
        }));
      },
      
      joinTribe: () => {
        const { user } = get();
        if (!user || user.tribe) return;
        
        const tribe = generateMockTribe(user.id);
        
        set((state) => ({
          user: state.user ? {
            ...state.user,
            tribe,
          } : null,
        }));
      },
      
      sendSpark: (memberId) => {
        // In a real app, this would send a push notification
        console.log(`Sending spark to ${memberId}`);
      },
      
      becomeSeeker: () => {
        set((state) => ({
          showPaywall: false,
          user: state.user ? {
            ...state.user,
            isSeeker: true,
            role: 'seeker',
          } : null,
        }));
      },
      
      dismissPaywall: () => {
        set({ showPaywall: false });
      },
      
      generateReceipt: (sign) => {
        const { user } = get();
        if (!user) throw new Error('No user');
        
        const messages = {
          common: 'The Universe whispers to those who listen.',
          rare: 'The Universe speaks clearly to you today.',
          mythic: 'The Universe SHOUTS your name across the cosmos!',
        };
        
        return {
          id: `receipt-${Date.now()}`,
          userId: user.id,
          signName: sign.signName,
          signEmoji: sign.signEmoji,
          foundAt: sign.foundAt,
          location: sign.location || 'Unknown',
          rarity: sign.rarity,
          rarityLabel: RARITY_CONFIG[sign.rarity].label,
          probability: Math.floor(Math.random() * 500) + 100,
          dayNumber: sign.dayNumber,
          totalDays: user.progress.completedDays.length,
          totalSparks: user.progress.sparks,
          message: messages[sign.rarity],
        };
      },
      
      showReceipt: (receipt) => {
        set({
          showUniverseReceipt: true,
          currentReceipt: receipt,
        });
      },
      
      hideReceipt: () => {
        set({
          showUniverseReceipt: false,
          currentReceipt: null,
        });
      },
      
      setAudioPlaying: (playing) => {
        set((state) => ({
          audioState: { ...state.audioState, isPlaying: playing },
        }));
      },
      
      setAudioTime: (time) => {
        set((state) => ({
          audioState: { ...state.audioState, currentTime: time },
        }));
      },
      
      setAudioVolume: (volume) => {
        set((state) => ({
          audioState: { ...state.audioState, volume },
        }));
      },
      
      setBackgroundVolume: (volume) => {
        set((state) => ({
          audioState: { ...state.audioState, backgroundVolume: volume },
        }));
      },
      
      setSelectedBackground: (background) => {
        set((state) => ({
          audioState: { ...state.audioState, selectedBackground: background },
        }));
      },
      
      canAccessDay: (day) => {
        const { user } = get();
        if (!user) return false;
        
        const step = ROAD_STEPS[day - 1];
        if (!step) return false;
        
        // Free days are always accessible
        if (step.isFree) {
          return day <= user.progress.currentDay;
        }
        
        // Premium days require Seeker status
        return user.isSeeker && day <= user.progress.currentDay;
      },
      
      getDayStatus: (day) => {
        const { user } = get();
        if (!user) return 'locked';
        
        if (user.progress.completedDays.includes(day)) return 'completed';
        if (day === user.progress.currentDay) return 'current';
        if (day < user.progress.currentDay) return 'completed';
        return 'locked';
      },
      
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          onboarding: { step: 'splash', selectedIntention: null },
        });
      },
    }),
    {
      name: 'signroad-journey',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        onboarding: state.onboarding,
      }),
    }
  )
);
