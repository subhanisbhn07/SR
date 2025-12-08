import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Meditation content for each day of the 365-day journey
export interface DailyMeditation {
  day: number;
  title: string;
  description: string;
  theme: string;
  durationSeconds: number;
  audioUrl?: string; // Will be populated when real audio is added
  transcript?: string;
  isFree: boolean; // First 7 days are free
  roadSlug: string;
}

// Background sound with audio URL
export interface BackgroundSound {
  id: string;
  name: string;
  description: string;
  category: 'nature' | 'ambient' | 'music' | 'binaural';
  audioUrl?: string;
  unlockDay: number;
  isPremium: boolean;
}

// User's progress on a specific road
export interface RoadProgress {
  roadSlug: string;
  currentDay: number;
  completedDays: number[];
  lastCompletedAt: string | null;
  startedAt: string;
}

// Meditation completion record
export interface MeditationCompletion {
  day: number;
  roadSlug: string;
  completedAt: string;
  completionPercentage: number;
  sparksEarned: number;
  durationListened: number;
}

// Generate 365 days of meditation content for a road
const generateRoadContent = (roadSlug: string, roadName: string): DailyMeditation[] => {
  const themes = {
    sleep: [
      'Releasing the Day', 'Body Scan Relaxation', 'Breath of Peace', 'Floating on Clouds',
      'Starlight Meditation', 'Ocean of Calm', 'Forest at Dusk', 'Moonlit Path',
      'Dream Preparation', 'Deep Rest', 'Night Sky Journey', 'Gentle Waves',
      'Twilight Serenity', 'Cozy Cocoon', 'Midnight Garden'
    ],
    burnout: [
      'Reclaiming Your Energy', 'Boundary Setting', 'Self-Compassion', 'Letting Go of Pressure',
      'Finding Your Center', 'Sustainable Pace', 'Joy Rediscovery', 'Inner Strength',
      'Peaceful Productivity', 'Balance Restoration', 'Mindful Breaks', 'Energy Protection',
      'Renewal Practice', 'Gentle Recovery', 'Resilience Building'
    ],
    manifest: [
      'Intention Setting', 'Visualization Power', 'Abundance Mindset', 'Gratitude Amplification',
      'Universe Connection', 'Belief Strengthening', 'Receiving Mode', 'Signs Recognition',
      'Alignment Practice', 'Manifestation Acceleration', 'Trust Building', 'Clarity Focus',
      'Desire Clarification', 'Energy Raising', 'Co-creation Flow'
    ],
    healing: [
      'Heart Opening', 'Emotional Release', 'Inner Child Work', 'Forgiveness Practice',
      'Grief Processing', 'Self-Love Cultivation', 'Trauma Release', 'Peace Finding',
      'Acceptance Journey', 'Wholeness Restoration', 'Gentle Healing', 'Light Infusion',
      'Wound Tending', 'Compassion Flow', 'Integration Practice'
    ],
    spiritual: [
      'Divine Connection', 'Higher Self Meeting', 'Soul Purpose', 'Universal Love',
      'Spiritual Awakening', 'Inner Wisdom', 'Sacred Space', 'Light Body Activation',
      'Consciousness Expansion', 'Oneness Experience', 'Intuition Development', 'Spirit Guides',
      'Energy Clearing', 'Chakra Balancing', 'Transcendence Practice'
    ]
  };

  const roadThemes = themes[roadSlug as keyof typeof themes] || themes.manifest;
  const meditations: DailyMeditation[] = [];

  for (let day = 1; day <= 365; day++) {
    const themeIndex = (day - 1) % roadThemes.length;
    const weekNumber = Math.ceil(day / 7);
    const phase = day <= 30 ? 'Foundation' : day <= 90 ? 'Building' : day <= 180 ? 'Deepening' : 'Mastery';
    
    // Duration increases as user progresses (5-9 minutes as per PRD)
    const baseDuration = 300; // 5 minutes
    const maxDuration = 540; // 9 minutes
    const progressFactor = Math.min(day / 180, 1);
    const durationSeconds = Math.round(baseDuration + (maxDuration - baseDuration) * progressFactor);

    meditations.push({
      day,
      title: `Day ${day}: ${roadThemes[themeIndex]}`,
      description: `${phase} Phase - Week ${weekNumber}. ${roadName} journey continues with ${roadThemes[themeIndex].toLowerCase()}.`,
      theme: roadThemes[themeIndex],
      durationSeconds,
      isFree: day <= 7, // First 7 days free
      roadSlug,
    });
  }

  return meditations;
};

// Pre-generate content for all roads
const ROAD_CONTENT: Record<string, DailyMeditation[]> = {
  sleep: generateRoadContent('sleep', 'Sleep & Rest'),
  burnout: generateRoadContent('burnout', 'Burnout Recovery'),
  manifest: generateRoadContent('manifest', 'Manifestation'),
  healing: generateRoadContent('healing', 'Healing Journey'),
  spiritual: generateRoadContent('spiritual', 'Spiritual Growth'),
};

// Background sounds library (12 options as per PRD)
export const BACKGROUND_SOUNDS: BackgroundSound[] = [
  // Free options (always available)
  { id: 'silence', name: 'Silence', description: 'Pure focus without background', category: 'ambient', unlockDay: 0, isPremium: false },
  { id: 'rain', name: 'Gentle Rain', description: 'Soft rainfall on leaves', category: 'nature', unlockDay: 0, isPremium: false, audioUrl: '/audio/rain.mp3' },
  { id: 'ocean', name: 'Ocean Waves', description: 'Rhythmic waves on shore', category: 'nature', unlockDay: 0, isPremium: false, audioUrl: '/audio/ocean.mp3' },
  
  // Premium options (unlock at Day 15)
  { id: 'forest', name: 'Forest Morning', description: 'Birds and rustling leaves', category: 'nature', unlockDay: 15, isPremium: true, audioUrl: '/audio/forest.mp3' },
  { id: 'thunderstorm', name: 'Distant Thunder', description: 'Rolling thunder and rain', category: 'nature', unlockDay: 15, isPremium: true, audioUrl: '/audio/thunder.mp3' },
  { id: 'fireplace', name: 'Crackling Fire', description: 'Warm fireplace ambience', category: 'ambient', unlockDay: 15, isPremium: true, audioUrl: '/audio/fire.mp3' },
  { id: 'wind', name: 'Mountain Wind', description: 'Gentle breeze through peaks', category: 'nature', unlockDay: 15, isPremium: true, audioUrl: '/audio/wind.mp3' },
  { id: 'stream', name: 'Flowing Stream', description: 'Babbling brook in forest', category: 'nature', unlockDay: 15, isPremium: true, audioUrl: '/audio/stream.mp3' },
  { id: 'singing_bowls', name: 'Singing Bowls', description: 'Tibetan healing tones', category: 'music', unlockDay: 15, isPremium: true, audioUrl: '/audio/bowls.mp3' },
  { id: 'alpha_waves', name: 'Alpha Waves', description: '10Hz relaxation frequency', category: 'binaural', unlockDay: 15, isPremium: true, audioUrl: '/audio/alpha.mp3' },
  { id: 'theta_waves', name: 'Theta Waves', description: '6Hz deep meditation', category: 'binaural', unlockDay: 15, isPremium: true, audioUrl: '/audio/theta.mp3' },
  { id: 'cosmic', name: 'Cosmic Drift', description: 'Space ambient soundscape', category: 'ambient', unlockDay: 15, isPremium: true, audioUrl: '/audio/cosmic.mp3' },
];

// Completion threshold for day progression (90% as per PRD)
export const COMPLETION_THRESHOLD = 0.9;

interface ContentState {
  // Road progress for each road the user has started
  roadProgress: Record<string, RoadProgress>;
  
  // Meditation completion history
  completionHistory: MeditationCompletion[];
  
  // Downloaded meditations for offline use (max 3 as per PRD)
  downloadedMeditations: Array<{ day: number; roadSlug: string; downloadedAt: string }>;
  
  // Current playback state
  currentPlayback: {
    day: number;
    roadSlug: string;
    startedAt: string;
    currentPosition: number;
    totalDuration: number;
  } | null;

  // Actions
  startRoad: (roadSlug: string) => void;
  getMeditationForDay: (roadSlug: string, day: number) => DailyMeditation | null;
  getCurrentDayMeditation: (roadSlug: string) => DailyMeditation | null;
  startMeditation: (roadSlug: string, day: number) => void;
  updatePlaybackPosition: (position: number) => void;
  completeMeditation: (completionPercentage: number) => { sparksEarned: number; dayAdvanced: boolean };
  canAccessDay: (roadSlug: string, day: number, isPremiumUser: boolean) => boolean;
  downloadMeditation: (roadSlug: string, day: number) => boolean;
  removeDownload: (roadSlug: string, day: number) => void;
  getAvailableBackgroundSounds: (currentDay: number, isPremiumUser: boolean) => BackgroundSound[];
  getRoadProgress: (roadSlug: string) => RoadProgress | null;
  getTotalCompletedDays: () => number;
}

export const useContentStore = create<ContentState>()(
  persist(
    (set, get) => ({
      roadProgress: {},
      completionHistory: [],
      downloadedMeditations: [],
      currentPlayback: null,

      startRoad: (roadSlug: string) => {
        const existing = get().roadProgress[roadSlug];
        if (existing) return; // Already started

        set(state => ({
          roadProgress: {
            ...state.roadProgress,
            [roadSlug]: {
              roadSlug,
              currentDay: 1,
              completedDays: [],
              lastCompletedAt: null,
              startedAt: new Date().toISOString(),
            },
          },
        }));
      },

      getMeditationForDay: (roadSlug: string, day: number) => {
        const roadContent = ROAD_CONTENT[roadSlug];
        if (!roadContent) return null;
        return roadContent.find(m => m.day === day) || null;
      },

      getCurrentDayMeditation: (roadSlug: string) => {
        const progress = get().roadProgress[roadSlug];
        if (!progress) return null;
        return get().getMeditationForDay(roadSlug, progress.currentDay);
      },

      startMeditation: (roadSlug: string, day: number) => {
        const meditation = get().getMeditationForDay(roadSlug, day);
        if (!meditation) return;

        set({
          currentPlayback: {
            day,
            roadSlug,
            startedAt: new Date().toISOString(),
            currentPosition: 0,
            totalDuration: meditation.durationSeconds,
          },
        });
      },

      updatePlaybackPosition: (position: number) => {
        set(state => ({
          currentPlayback: state.currentPlayback
            ? { ...state.currentPlayback, currentPosition: position }
            : null,
        }));
      },

      completeMeditation: (completionPercentage: number) => {
        const { currentPlayback, roadProgress } = get();
        if (!currentPlayback) return { sparksEarned: 0, dayAdvanced: false };

        const { day, roadSlug } = currentPlayback;
        const progress = roadProgress[roadSlug];
        
        // Calculate sparks based on completion
        let sparksEarned = 0;
        let dayAdvanced = false;

        if (completionPercentage >= COMPLETION_THRESHOLD) {
          // Full completion: +10 sparks
          sparksEarned = 10;
          
          // Check if this advances the day
          if (progress && !progress.completedDays.includes(day)) {
            dayAdvanced = day === progress.currentDay;
          }
        } else if (completionPercentage >= 0.5) {
          // Partial completion: +5 sparks
          sparksEarned = 5;
        }

        // Record completion
        const completion: MeditationCompletion = {
          day,
          roadSlug,
          completedAt: new Date().toISOString(),
          completionPercentage,
          sparksEarned,
          durationListened: currentPlayback.currentPosition,
        };

        set(state => {
          const newCompletedDays = completionPercentage >= COMPLETION_THRESHOLD
            ? [...(state.roadProgress[roadSlug]?.completedDays || []), day].filter((v, i, a) => a.indexOf(v) === i)
            : state.roadProgress[roadSlug]?.completedDays || [];

          const newCurrentDay = dayAdvanced && state.roadProgress[roadSlug]
            ? Math.min(state.roadProgress[roadSlug].currentDay + 1, 365)
            : state.roadProgress[roadSlug]?.currentDay || 1;

          return {
            completionHistory: [...state.completionHistory, completion],
            currentPlayback: null,
            roadProgress: {
              ...state.roadProgress,
              [roadSlug]: state.roadProgress[roadSlug]
                ? {
                    ...state.roadProgress[roadSlug],
                    completedDays: newCompletedDays,
                    currentDay: newCurrentDay,
                    lastCompletedAt: completionPercentage >= COMPLETION_THRESHOLD
                      ? new Date().toISOString()
                      : state.roadProgress[roadSlug].lastCompletedAt,
                  }
                : state.roadProgress[roadSlug],
            },
          };
        });

        return { sparksEarned, dayAdvanced };
      },

      canAccessDay: (roadSlug: string, day: number, isPremiumUser: boolean) => {
        const progress = get().roadProgress[roadSlug];
        if (!progress) return day === 1; // Can only access day 1 if not started

        // Free users can only access days 1-7
        if (!isPremiumUser && day > 7) return false;

        // Can access any completed day or current day
        return progress.completedDays.includes(day) || day <= progress.currentDay;
      },

      downloadMeditation: (roadSlug: string, day: number) => {
        const { downloadedMeditations } = get();
        
        // Max 3 downloads as per PRD
        if (downloadedMeditations.length >= 3) return false;

        // Check if already downloaded
        if (downloadedMeditations.some(d => d.roadSlug === roadSlug && d.day === day)) {
          return true; // Already downloaded
        }

        set(state => ({
          downloadedMeditations: [
            ...state.downloadedMeditations,
            { day, roadSlug, downloadedAt: new Date().toISOString() },
          ],
        }));

        return true;
      },

      removeDownload: (roadSlug: string, day: number) => {
        set(state => ({
          downloadedMeditations: state.downloadedMeditations.filter(
            d => !(d.roadSlug === roadSlug && d.day === day)
          ),
        }));
      },

      getAvailableBackgroundSounds: (currentDay: number, isPremiumUser: boolean) => {
        return BACKGROUND_SOUNDS.filter(sound => {
          if (sound.isPremium && !isPremiumUser) return false;
          if (sound.unlockDay > currentDay) return false;
          return true;
        });
      },

      getRoadProgress: (roadSlug: string) => {
        return get().roadProgress[roadSlug] || null;
      },

      getTotalCompletedDays: () => {
        const { roadProgress } = get();
        return Object.values(roadProgress).reduce(
          (total, progress) => total + progress.completedDays.length,
          0
        );
      },
    }),
    {
      name: 'signroad-content',
    }
  )
);

// Helper to get all content for a road
export const getRoadContent = (roadSlug: string): DailyMeditation[] => {
  return ROAD_CONTENT[roadSlug] || [];
};

// Helper to check if meditation is available offline
export const isMeditationDownloaded = (
  downloadedMeditations: Array<{ day: number; roadSlug: string }>,
  roadSlug: string,
  day: number
): boolean => {
  return downloadedMeditations.some(d => d.roadSlug === roadSlug && d.day === day);
};
