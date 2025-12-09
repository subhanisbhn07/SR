import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// PRD: Tribes - 8-member groups for accountability (D&D party style)
// Auto-assign on Day 4 of user journey
// Anonymous avatars for privacy

export type TribeRole = 'seeker' | 'guide' | 'guardian' | 'healer' | 'sage' | 'warrior' | 'mystic' | 'wanderer';

export interface TribeMember {
  id: string;
  avatarIcon: string;
  avatarColor: string;
  role: TribeRole;
  displayName: string; // Anonymous name like "Wandering Star"
  joinedAt: string;
  currentDay: number;
  lanternBrightness: number;
  isCurrentUser: boolean;
}

export interface Tribe {
  id: string;
  name: string;
  createdAt: string;
  members: TribeMember[];
  totalSparksEarned: number;
  collectiveStreak: number;
  motto: string;
}

// Anonymous avatar icons (mystical/nature themed)
const AVATAR_ICONS = ['🌟', '🌙', '🔮', '🦋', '🌸', '🍀', '🌊', '🔥', '💫', '🌈', '🦉', '🐺', '🦊', '🐉', '🌺', '🍃'];

// Anonymous avatar colors
const AVATAR_COLORS = [
  '#00CED1', // Teal
  '#FFD700', // Gold
  '#9B59B6', // Purple
  '#3498DB', // Blue
  '#E74C3C', // Red
  '#2ECC71', // Green
  '#F39C12', // Orange
  '#1ABC9C', // Turquoise
];

// Anonymous display names
const DISPLAY_NAMES = [
  'Wandering Star', 'Moonlit Path', 'Crystal Seeker', 'Dawn Walker',
  'Mystic Flame', 'Silent River', 'Golden Light', 'Shadow Dancer',
  'Storm Chaser', 'Dream Weaver', 'Spirit Guide', 'Earth Walker',
  'Sky Watcher', 'Heart Seeker', 'Soul Traveler', 'Light Bearer',
  'Mist Walker', 'Star Gazer', 'Wind Whisper', 'Fire Keeper',
  'Ocean Soul', 'Mountain Spirit', 'Forest Heart', 'Desert Rose',
];

// Tribe name generators
const TRIBE_PREFIXES = ['The', 'Order of', 'Circle of', 'Guild of', 'Fellowship of'];
const TRIBE_NOUNS = [
  'Rising Stars', 'Golden Dawn', 'Mystic Seekers', 'Luminous Path',
  'Sacred Journey', 'Eternal Light', 'Cosmic Wanderers', 'Spirit Guides',
  'Dream Weavers', 'Soul Travelers', 'Light Bearers', 'Star Walkers',
];

const TRIBE_MOTTOS = [
  'Together we rise, together we shine.',
  'One journey, many paths, shared light.',
  'In unity, we find our strength.',
  'The universe conspires for those who seek.',
  'Every step forward is a step toward light.',
  'We are the architects of our destiny.',
  'Through darkness, we find our brightest stars.',
  'Connected by purpose, guided by light.',
];

interface TribesState {
  currentTribe: Tribe | null;
  userMember: TribeMember | null;
  isEligibleForTribe: boolean;
  
  // Actions
  checkEligibility: (userDay: number) => boolean;
  joinTribe: (userDay: number) => void;
  leaveTribe: () => void;
  updateMemberProgress: (lanternBrightness: number, currentDay: number) => void;
  
  // Getters
  getTribeMembers: () => TribeMember[];
  getTribeName: () => string;
  getTribeMotto: () => string;
  getCollectiveStreak: () => number;
  
  // Mock data generation for demo
  generateMockTribe: () => Tribe;
  generateMockMember: (isCurrentUser: boolean) => TribeMember;
}

export const useTribesStore = create<TribesState>()(
  persist(
    (set, get) => ({
      currentTribe: null,
      userMember: null,
      isEligibleForTribe: false,
      
      checkEligibility: (userDay: number) => {
        // PRD: Auto-assign on Day 4
        const eligible = userDay >= 4;
        set({ isEligibleForTribe: eligible });
        return eligible;
      },
      
      joinTribe: (userDay: number) => {
        if (userDay < 4) return;
        
        const tribe = get().generateMockTribe();
        const userMember = get().generateMockMember(true);
        
        // Add user to tribe
        tribe.members = [userMember, ...tribe.members.slice(0, 7)];
        
        set({
          currentTribe: tribe,
          userMember,
          isEligibleForTribe: true,
        });
      },
      
      leaveTribe: () => {
        set({
          currentTribe: null,
          userMember: null,
        });
      },
      
      updateMemberProgress: (lanternBrightness: number, currentDay: number) => {
        const { userMember, currentTribe } = get();
        if (!userMember || !currentTribe) return;
        
        const updatedMember = {
          ...userMember,
          lanternBrightness,
          currentDay,
        };
        
        const updatedMembers = currentTribe.members.map(m =>
          m.isCurrentUser ? updatedMember : m
        );
        
        set({
          userMember: updatedMember,
          currentTribe: {
            ...currentTribe,
            members: updatedMembers,
          },
        });
      },
      
      getTribeMembers: () => {
        return get().currentTribe?.members || [];
      },
      
      getTribeName: () => {
        return get().currentTribe?.name || 'No Tribe';
      },
      
      getTribeMotto: () => {
        return get().currentTribe?.motto || '';
      },
      
      getCollectiveStreak: () => {
        return get().currentTribe?.collectiveStreak || 0;
      },
      
      generateMockTribe: () => {
        const prefix = TRIBE_PREFIXES[Math.floor(Math.random() * TRIBE_PREFIXES.length)];
        const noun = TRIBE_NOUNS[Math.floor(Math.random() * TRIBE_NOUNS.length)];
        const motto = TRIBE_MOTTOS[Math.floor(Math.random() * TRIBE_MOTTOS.length)];
        
        // Generate 7 mock members (user will be 8th)
        const mockMembers: TribeMember[] = [];
        const usedNames = new Set<string>();
        
        for (let i = 0; i < 7; i++) {
          let name = DISPLAY_NAMES[Math.floor(Math.random() * DISPLAY_NAMES.length)];
          while (usedNames.has(name)) {
            name = DISPLAY_NAMES[Math.floor(Math.random() * DISPLAY_NAMES.length)];
          }
          usedNames.add(name);
          
          mockMembers.push({
            id: `member-${i}-${Date.now()}`,
            avatarIcon: AVATAR_ICONS[Math.floor(Math.random() * AVATAR_ICONS.length)],
            avatarColor: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
            role: ['seeker', 'guide', 'guardian', 'healer', 'sage', 'warrior', 'mystic', 'wanderer'][i % 8] as TribeRole,
            displayName: name,
            joinedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            currentDay: Math.floor(Math.random() * 30) + 4,
            lanternBrightness: Math.floor(Math.random() * 60) + 40,
            isCurrentUser: false,
          });
        }
        
        return {
          id: `tribe-${Date.now()}`,
          name: `${prefix} ${noun}`,
          createdAt: new Date().toISOString(),
          members: mockMembers,
          totalSparksEarned: Math.floor(Math.random() * 5000) + 1000,
          collectiveStreak: Math.floor(Math.random() * 14) + 3,
          motto,
        };
      },
      
      generateMockMember: (isCurrentUser: boolean) => {
        const roles: TribeRole[] = ['seeker', 'guide', 'guardian', 'healer', 'sage', 'warrior', 'mystic', 'wanderer'];
        
        return {
          id: `user-${Date.now()}`,
          avatarIcon: AVATAR_ICONS[Math.floor(Math.random() * AVATAR_ICONS.length)],
          avatarColor: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
          role: roles[Math.floor(Math.random() * roles.length)],
          displayName: isCurrentUser ? 'You' : DISPLAY_NAMES[Math.floor(Math.random() * DISPLAY_NAMES.length)],
          joinedAt: new Date().toISOString(),
          currentDay: 4,
          lanternBrightness: 50,
          isCurrentUser,
        };
      },
    }),
    {
      name: 'signroad-tribes',
    }
  )
);
