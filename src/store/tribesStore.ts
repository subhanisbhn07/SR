import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Tribe member interface
export interface TribeMember {
  id: string;
  name: string;
  avatar?: string;
  lanternHealth: number;
  streakDays: number;
  showedUpToday: boolean;
  isLeader: boolean;
  isCurrentUser: boolean;
  joinedAt: Date;
  lastActiveAt: Date;
}

// Tribe interface
export interface Tribe {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  maxMembers: number; // Always 5 for D&D party style
  members: TribeMember[];
  tribeLanternHealth: number; // Average of all members
  tribeStreak: number; // Days where all members showed up
  inviteCode: string;
}

// Tribe activity for feed
export interface TribeActivity {
  id: string;
  tribeId: string;
  memberId: string;
  memberName: string;
  type: 'check_in' | 'meditation' | 'sign_found' | 'milestone' | 'joined' | 'streak';
  message: string;
  timestamp: Date;
  sparksEarned?: number;
}

// Generate invite code
const generateInviteCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

interface TribesState {
  // Current user's tribe
  currentTribe: Tribe | null;
  hasJoinedTribe: boolean;
  
  // Activity feed
  tribeActivities: TribeActivity[];
  
  // Actions
  createTribe: (name: string, description?: string) => Tribe;
  joinTribe: (inviteCode: string) => { success: boolean; error?: string };
  leaveTribe: () => void;
  checkIn: () => { success: boolean; sparksEarned: number };
  inviteMember: () => string; // Returns invite code
  removeMember: (memberId: string) => void;
  promoteMember: (memberId: string) => void;
  updateMemberStatus: (memberId: string, showedUp: boolean) => void;
  getTribeLanternHealth: () => number;
  getTribeStreak: () => number;
  getOpenSpots: () => number;
  addActivity: (type: TribeActivity['type'], message: string, sparksEarned?: number) => void;
}

// Mock tribe data for demo
const createMockTribe = (): Tribe => ({
  id: 'tribe-1',
  name: 'The Manifestors',
  description: 'Walking the road together',
  createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
  maxMembers: 5,
  members: [
    {
      id: 'user-1',
      name: 'You',
      lanternHealth: 82,
      streakDays: 7,
      showedUpToday: true,
      isLeader: false,
      isCurrentUser: true,
      joinedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      lastActiveAt: new Date(),
    },
    {
      id: 'user-2',
      name: 'Sarah',
      lanternHealth: 91,
      streakDays: 12,
      showedUpToday: true,
      isLeader: true,
      isCurrentUser: false,
      joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      lastActiveAt: new Date(),
    },
    {
      id: 'user-3',
      name: 'Marcus',
      lanternHealth: 67,
      streakDays: 5,
      showedUpToday: true,
      isLeader: false,
      isCurrentUser: false,
      joinedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
      lastActiveAt: new Date(),
    },
    {
      id: 'user-4',
      name: 'Elena',
      lanternHealth: 45,
      streakDays: 2,
      showedUpToday: false,
      isLeader: false,
      isCurrentUser: false,
      joinedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      lastActiveAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
  ],
  tribeLanternHealth: 71,
  tribeStreak: 3,
  inviteCode: generateInviteCode(),
});

const createMockActivities = (): TribeActivity[] => [
  {
    id: 'activity-1',
    tribeId: 'tribe-1',
    memberId: 'user-2',
    memberName: 'Sarah',
    type: 'meditation',
    message: 'Completed a 20-minute deep dive session',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    sparksEarned: 40,
  },
  {
    id: 'activity-2',
    tribeId: 'tribe-1',
    memberId: 'user-3',
    memberName: 'Marcus',
    type: 'sign_found',
    message: 'Found a Spoken sign: Rainbow After Rain',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    sparksEarned: 15,
  },
  {
    id: 'activity-3',
    tribeId: 'tribe-1',
    memberId: 'user-1',
    memberName: 'You',
    type: 'check_in',
    message: 'Checked in for the day',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
  {
    id: 'activity-4',
    tribeId: 'tribe-1',
    memberId: 'user-2',
    memberName: 'Sarah',
    type: 'streak',
    message: 'Reached a 12-day streak!',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
];

export const useTribesStore = create<TribesState>()(
  persist(
    (set, get) => ({
      currentTribe: createMockTribe(),
      hasJoinedTribe: true,
      tribeActivities: createMockActivities(),

      createTribe: (name: string, description?: string) => {
        const newTribe: Tribe = {
          id: `tribe-${Date.now()}`,
          name,
          description,
          createdAt: new Date(),
          maxMembers: 5,
          members: [
            {
              id: 'current-user',
              name: 'You',
              lanternHealth: 100,
              streakDays: 0,
              showedUpToday: true,
              isLeader: true,
              isCurrentUser: true,
              joinedAt: new Date(),
              lastActiveAt: new Date(),
            },
          ],
          tribeLanternHealth: 100,
          tribeStreak: 0,
          inviteCode: generateInviteCode(),
        };

        set({
          currentTribe: newTribe,
          hasJoinedTribe: true,
          tribeActivities: [],
        });

        return newTribe;
      },

      joinTribe: (inviteCode: string) => {
        // In a real app, this would validate the invite code against a backend
        if (inviteCode.length !== 6) {
          return { success: false, error: 'Invalid invite code' };
        }

        // For demo, create a mock tribe when joining
        const mockTribe = createMockTribe();
        mockTribe.inviteCode = inviteCode;

        set({
          currentTribe: mockTribe,
          hasJoinedTribe: true,
          tribeActivities: createMockActivities(),
        });

        return { success: true };
      },

      leaveTribe: () => {
        set({
          currentTribe: null,
          hasJoinedTribe: false,
          tribeActivities: [],
        });
      },

      checkIn: () => {
        const tribe = get().currentTribe;
        if (!tribe) return { success: false, sparksEarned: 0 };

        const updatedMembers = tribe.members.map(member =>
          member.isCurrentUser
            ? { ...member, showedUpToday: true, lastActiveAt: new Date() }
            : member
        );

        const sparksEarned = 5; // Base check-in reward

        set(state => ({
          currentTribe: state.currentTribe
            ? { ...state.currentTribe, members: updatedMembers }
            : null,
        }));

        // Add activity
        get().addActivity('check_in', 'Checked in for the day');

        return { success: true, sparksEarned };
      },

      inviteMember: () => {
        const tribe = get().currentTribe;
        return tribe?.inviteCode || generateInviteCode();
      },

      removeMember: (memberId: string) => {
        const tribe = get().currentTribe;
        if (!tribe) return;

        const currentUser = tribe.members.find(m => m.isCurrentUser);
        if (!currentUser?.isLeader) return; // Only leader can remove

        const updatedMembers = tribe.members.filter(m => m.id !== memberId);

        set(state => ({
          currentTribe: state.currentTribe
            ? { ...state.currentTribe, members: updatedMembers }
            : null,
        }));
      },

      promoteMember: (memberId: string) => {
        const tribe = get().currentTribe;
        if (!tribe) return;

        const currentUser = tribe.members.find(m => m.isCurrentUser);
        if (!currentUser?.isLeader) return; // Only leader can promote

        const updatedMembers = tribe.members.map(member => ({
          ...member,
          isLeader: member.id === memberId,
        }));

        set(state => ({
          currentTribe: state.currentTribe
            ? { ...state.currentTribe, members: updatedMembers }
            : null,
        }));
      },

      updateMemberStatus: (memberId: string, showedUp: boolean) => {
        const tribe = get().currentTribe;
        if (!tribe) return;

        const updatedMembers = tribe.members.map(member =>
          member.id === memberId
            ? { ...member, showedUpToday: showedUp, lastActiveAt: showedUp ? new Date() : member.lastActiveAt }
            : member
        );

        // Recalculate tribe lantern health
        const activeMemberHealth = updatedMembers.reduce((sum, m) => sum + m.lanternHealth, 0);
        const tribeLanternHealth = Math.round(activeMemberHealth / updatedMembers.length);

        set(state => ({
          currentTribe: state.currentTribe
            ? { ...state.currentTribe, members: updatedMembers, tribeLanternHealth }
            : null,
        }));
      },

      getTribeLanternHealth: () => {
        const tribe = get().currentTribe;
        if (!tribe || tribe.members.length === 0) return 0;
        return tribe.tribeLanternHealth;
      },

      getTribeStreak: () => {
        const tribe = get().currentTribe;
        return tribe?.tribeStreak || 0;
      },

      getOpenSpots: () => {
        const tribe = get().currentTribe;
        if (!tribe) return 5;
        return tribe.maxMembers - tribe.members.length;
      },

      addActivity: (type: TribeActivity['type'], message: string, sparksEarned?: number) => {
        const tribe = get().currentTribe;
        if (!tribe) return;

        const currentUser = tribe.members.find(m => m.isCurrentUser);
        if (!currentUser) return;

        const newActivity: TribeActivity = {
          id: `activity-${Date.now()}`,
          tribeId: tribe.id,
          memberId: currentUser.id,
          memberName: currentUser.name,
          type,
          message,
          timestamp: new Date(),
          sparksEarned,
        };

        set(state => ({
          tribeActivities: [newActivity, ...state.tribeActivities].slice(0, 50), // Keep last 50 activities
        }));
      },
    }),
    {
      name: 'signroad-tribes',
    }
  )
);
