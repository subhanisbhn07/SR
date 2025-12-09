import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// PRD: Living Lantern - Visual representation of user's spiritual journey
// Brightness: 100 = bright, <50 = dim, 0 = needs rekindling
// Dims rather than resets to zero on missed days (forgiving streak)

export type LanternState = 'bright' | 'glowing' | 'dim' | 'flickering' | 'extinguished';

export interface LanternData {
  brightness: number; // 0-100
  state: LanternState;
  lastActivityDate: string | null;
  consecutiveDaysActive: number;
  totalDaysActive: number;
  rekindleCount: number;
  lastRekindleDate: string | null;
}

interface LanternStore {
  lantern: LanternData;
  
  // Actions
  getBrightness: () => number;
  getState: () => LanternState;
  addBrightness: (amount: number) => void;
  dimLantern: (amount: number) => void;
  rekindleLantern: () => void;
  checkAndUpdateDaily: () => void;
  completeMeditation: () => void;
  logSign: () => void;
  
  // Computed
  getBrightnessPercentage: () => string;
  getStateDescription: () => string;
  needsRekindle: () => boolean;
}

const calculateState = (brightness: number): LanternState => {
  if (brightness >= 80) return 'bright';
  if (brightness >= 50) return 'glowing';
  if (brightness >= 25) return 'dim';
  if (brightness > 0) return 'flickering';
  return 'extinguished';
};

const getToday = () => new Date().toISOString().split('T')[0];

export const useLanternStore = create<LanternStore>()(
  persist(
    (set, get) => ({
      lantern: {
        brightness: 50, // Start at 50% for new users
        state: 'glowing',
        lastActivityDate: null,
        consecutiveDaysActive: 0,
        totalDaysActive: 0,
        rekindleCount: 0,
        lastRekindleDate: null,
      },
      
      getBrightness: () => get().lantern.brightness,
      
      getState: () => get().lantern.state,
      
      addBrightness: (amount: number) => {
        set(state => {
          const newBrightness = Math.min(100, state.lantern.brightness + amount);
          return {
            lantern: {
              ...state.lantern,
              brightness: newBrightness,
              state: calculateState(newBrightness),
            },
          };
        });
      },
      
      dimLantern: (amount: number) => {
        set(state => {
          const newBrightness = Math.max(0, state.lantern.brightness - amount);
          return {
            lantern: {
              ...state.lantern,
              brightness: newBrightness,
              state: calculateState(newBrightness),
            },
          };
        });
      },
      
      rekindleLantern: () => {
        const today = getToday();
        set(state => ({
          lantern: {
            ...state.lantern,
            brightness: 25, // Rekindle starts at 25%
            state: 'dim',
            rekindleCount: state.lantern.rekindleCount + 1,
            lastRekindleDate: today,
          },
        }));
      },
      
      checkAndUpdateDaily: () => {
        const today = getToday();
        const { lantern } = get();
        
        if (lantern.lastActivityDate === today) {
          return; // Already updated today
        }
        
        if (!lantern.lastActivityDate) {
          // First time user
          set(state => ({
            lantern: {
              ...state.lantern,
              lastActivityDate: today,
            },
          }));
          return;
        }
        
        // Calculate days since last activity
        const lastDate = new Date(lantern.lastActivityDate);
        const todayDate = new Date(today);
        const daysDiff = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 1) {
          // Consecutive day - no dimming
          set(state => ({
            lantern: {
              ...state.lantern,
              consecutiveDaysActive: state.lantern.consecutiveDaysActive + 1,
              lastActivityDate: today,
            },
          }));
        } else if (daysDiff > 1) {
          // Missed days - dim the lantern (PRD: dims rather than resets)
          // Dim by 10% per missed day, max 50% total dimming
          const dimAmount = Math.min(50, (daysDiff - 1) * 10);
          set(state => {
            const newBrightness = Math.max(0, state.lantern.brightness - dimAmount);
            return {
              lantern: {
                ...state.lantern,
                brightness: newBrightness,
                state: calculateState(newBrightness),
                consecutiveDaysActive: 0, // Reset streak
                lastActivityDate: today,
              },
            };
          });
        }
      },
      
      completeMeditation: () => {
        const today = getToday();
        
        // PRD: +5 brightness per meditation (capped at 100)
        const brightnessGain = 5;
        
        set(state => {
          const newBrightness = Math.min(100, state.lantern.brightness + brightnessGain);
          const isNewDay = state.lantern.lastActivityDate !== today;
          
          return {
            lantern: {
              ...state.lantern,
              brightness: newBrightness,
              state: calculateState(newBrightness),
              lastActivityDate: today,
              totalDaysActive: isNewDay ? state.lantern.totalDaysActive + 1 : state.lantern.totalDaysActive,
              consecutiveDaysActive: isNewDay 
                ? state.lantern.consecutiveDaysActive + 1 
                : state.lantern.consecutiveDaysActive,
            },
          };
        });
      },
      
      logSign: () => {
        // PRD: +2 brightness per sign logged
        const brightnessGain = 2;
        
        set(state => {
          const newBrightness = Math.min(100, state.lantern.brightness + brightnessGain);
          return {
            lantern: {
              ...state.lantern,
              brightness: newBrightness,
              state: calculateState(newBrightness),
            },
          };
        });
      },
      
      getBrightnessPercentage: () => {
        return `${get().lantern.brightness}%`;
      },
      
      getStateDescription: () => {
        const state = get().lantern.state;
        switch (state) {
          case 'bright':
            return 'Your lantern shines brilliantly! Keep up the amazing work.';
          case 'glowing':
            return 'Your lantern glows warmly. You\'re on a great path.';
          case 'dim':
            return 'Your lantern is dimming. A meditation session would help.';
          case 'flickering':
            return 'Your lantern flickers weakly. It needs your attention.';
          case 'extinguished':
            return 'Your lantern has gone out. Tap to rekindle your journey.';
          default:
            return 'Your lantern awaits your journey.';
        }
      },
      
      needsRekindle: () => {
        return get().lantern.brightness === 0;
      },
    }),
    {
      name: 'signroad-lantern',
    }
  )
);
