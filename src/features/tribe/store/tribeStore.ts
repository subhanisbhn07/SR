import { create } from 'zustand';
import { Tribe, TribeMember } from '../../../shared/types/tribe';

interface TribeState {
  tribe: Tribe | null;
  lastNudgeTime: number | null;
  setTribe: (tribe: Tribe) => void;
  updateMemberMeditationStatus: (memberId: string, meditated: boolean) => void;
  nudgeTribe: () => void;
  canNudge: () => boolean;
}

const generateMockTribe = (): Tribe => {
  const memberNames = [
    'Alex Chen',
    'Jordan Smith', 
    'Taylor Kim',
    'Morgan Lee',
    'Casey Park'
  ];
  
  const members: TribeMember[] = memberNames.map((name, index) => ({
    id: `member-${index + 1}`,
    name,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    meditatedToday: Math.random() > 0.5,
    currentStep: Math.floor(Math.random() * 14) + 1,
  }));

  return {
    id: 'tribe-1',
    name: 'The Seekers of Day 1',
    focus: 'Personal Growth',
    members,
    tribeScore: members.reduce((sum, m) => sum + m.currentStep, 0),
  };
};

export const useTribeStore = create<TribeState>((set, get) => ({
  tribe: generateMockTribe(),
  lastNudgeTime: null,

  setTribe: (tribe) => set({ tribe }),

  updateMemberMeditationStatus: (memberId, meditated) =>
    set((state) => {
      if (!state.tribe) return state;
      
      const updatedMembers = state.tribe.members.map((member) =>
        member.id === memberId ? { ...member, meditatedToday: meditated } : member
      );

      return {
        tribe: {
          ...state.tribe,
          members: updatedMembers,
        },
      };
    }),

  nudgeTribe: () => {
    const now = Date.now();
    set({ lastNudgeTime: now });
  },

  canNudge: () => {
    const { lastNudgeTime } = get();
    if (!lastNudgeTime) return true;
    
    const hoursSinceLastNudge = (Date.now() - lastNudgeTime) / (1000 * 60 * 60);
    return hoursSinceLastNudge >= 24;
  },
}));
