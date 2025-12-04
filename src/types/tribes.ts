// SignRoad Tribe System Types
// 8-member tribes with auto-allocation and events

export const TRIBE_SIZE = 8;

export type TribeEventType = 'meditation_together' | 'sign_hunt' | 'reflection_circle';
export type TribeEventStatus = 'upcoming' | 'active' | 'completed' | 'cancelled';

export interface TribeMemberData {
  id: string;
  odonym: string; // Anonymous name like "Wanderer #492"
  avatar: TribeAvatar;
  currentDay: number;
  meditatedToday: boolean;
  lastMeditationAt: Date | null;
  joinedAt: Date;
  timezone?: string;
}

export type TribeAvatar = 'fox' | 'owl' | 'deer' | 'raven' | 'wolf' | 'bear' | 'eagle' | 'butterfly';

export const TRIBE_AVATARS: Record<TribeAvatar, { emoji: string; name: string }> = {
  fox: { emoji: '🦊', name: 'Fox' },
  owl: { emoji: '🦉', name: 'Owl' },
  deer: { emoji: '🦌', name: 'Deer' },
  raven: { emoji: '🐦‍⬛', name: 'Raven' },
  wolf: { emoji: '🐺', name: 'Wolf' },
  bear: { emoji: '🐻', name: 'Bear' },
  eagle: { emoji: '🦅', name: 'Eagle' },
  butterfly: { emoji: '🦋', name: 'Butterfly' },
};

export interface TribeData {
  id: string;
  name: string;
  members: TribeMemberData[];
  createdAt: Date;
  timezone: string;
  campfireCompletionRate: number; // 0-100
  totalMeditationsToday: number;
}

export interface TribeEvent {
  id: string;
  tribeId: string;
  createdByUserId: string;
  eventType: TribeEventType;
  title: string;
  description: string;
  scheduledDate: Date;
  durationMinutes: number;
  participants: string[]; // User IDs
  status: TribeEventStatus;
  createdAt: Date;
}

export const TRIBE_EVENT_TYPES: Record<TribeEventType, { name: string; description: string; emoji: string; defaultDuration: number }> = {
  meditation_together: {
    name: 'Meditation Together',
    description: 'Meditate at the same time with your tribe',
    emoji: '🧘',
    defaultDuration: 15,
  },
  sign_hunt: {
    name: 'Sign Hunt',
    description: 'Go on a collective sign hunt with your tribe',
    emoji: '🔍',
    defaultDuration: 60,
  },
  reflection_circle: {
    name: 'Reflection Circle',
    description: 'Share reflections and insights with your tribe',
    emoji: '🔮',
    defaultDuration: 30,
  },
};

// Auto-allocation logic
export function generateTribeName(): string {
  const adjectives = ['Mystic', 'Sacred', 'Wandering', 'Luminous', 'Ancient', 'Celestial', 'Ethereal', 'Radiant'];
  const nouns = ['Seekers', 'Wanderers', 'Pathfinders', 'Dreamers', 'Lightbearers', 'Stargazers', 'Wayfarers', 'Pilgrims'];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 9000) + 1000;
  return `${adj} ${noun} #${number}`;
}

export function generateOdonym(): string {
  const titles = ['Wanderer', 'Seeker', 'Pathfinder', 'Dreamer', 'Lightbearer', 'Stargazer', 'Wayfarer', 'Pilgrim'];
  const title = titles[Math.floor(Math.random() * titles.length)];
  const number = Math.floor(Math.random() * 9000) + 1000;
  return `${title} #${number}`;
}

export function getRandomAvatar(): TribeAvatar {
  const avatars: TribeAvatar[] = ['fox', 'owl', 'deer', 'raven', 'wolf', 'bear', 'eagle', 'butterfly'];
  return avatars[Math.floor(Math.random() * avatars.length)];
}

// Generate mock tribe members for demo
export function generateMockTribeMembers(count: number = TRIBE_SIZE): TribeMemberData[] {
  const members: TribeMemberData[] = [];
  const usedAvatars: TribeAvatar[] = [];
  
  for (let i = 0; i < count; i++) {
    // Get unique avatar if possible
    let avatar = getRandomAvatar();
    while (usedAvatars.includes(avatar) && usedAvatars.length < 8) {
      avatar = getRandomAvatar();
    }
    usedAvatars.push(avatar);
    
    const meditatedToday = Math.random() > 0.3; // 70% chance meditated today
    const currentDay = Math.floor(Math.random() * 50) + 1;
    
    members.push({
      id: `member-${i + 1}`,
      odonym: generateOdonym(),
      avatar,
      currentDay,
      meditatedToday,
      lastMeditationAt: meditatedToday ? new Date() : null,
      joinedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date in last 30 days
    });
  }
  
  return members;
}

// Generate mock tribe
export function generateMockTribe(): TribeData {
  const members = generateMockTribeMembers();
  const meditatedCount = members.filter(m => m.meditatedToday).length;
  
  return {
    id: `tribe-${Math.random().toString(36).substr(2, 9)}`,
    name: generateTribeName(),
    members,
    createdAt: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000), // Random date in last 60 days
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    campfireCompletionRate: Math.round((meditatedCount / members.length) * 100),
    totalMeditationsToday: meditatedCount,
  };
}

// Generate mock tribe events
export function generateMockTribeEvents(tribeId: string, count: number = 3): TribeEvent[] {
  const events: TribeEvent[] = [];
  const eventTypes: TribeEventType[] = ['meditation_together', 'sign_hunt', 'reflection_circle'];
  
  for (let i = 0; i < count; i++) {
    const eventType = eventTypes[i % eventTypes.length];
    const config = TRIBE_EVENT_TYPES[eventType];
    const isUpcoming = Math.random() > 0.5;
    
    events.push({
      id: `event-${i + 1}`,
      tribeId,
      createdByUserId: `member-${Math.floor(Math.random() * 8) + 1}`,
      eventType,
      title: `${config.name} Session`,
      description: config.description,
      scheduledDate: isUpcoming 
        ? new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000) // Next 7 days
        : new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Past 7 days
      durationMinutes: config.defaultDuration,
      participants: Array.from({ length: Math.floor(Math.random() * 6) + 2 }, (_, j) => `member-${j + 1}`),
      status: isUpcoming ? 'upcoming' : 'completed',
      createdAt: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000),
    });
  }
  
  return events.sort((a, b) => b.scheduledDate.getTime() - a.scheduledDate.getTime());
}
