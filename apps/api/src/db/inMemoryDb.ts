// In-Memory Database for SignRoad API
// Note: Data will be lost when the server restarts. This is a proof of concept.
// For production, use PostgreSQL with Prisma or similar ORM.

import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import type {
  User,
  Sign,
  UserSignLog,
  Tribe,
  TribeMember,
  DailyMessage,
  FutureDrop,
  UserAffirmation,
  MeditationSession,
  Reward,
  UserReward,
  UniverseReceipt,
  LanternState,
} from '@signroad/shared';

// Import seed data from separate files
import { signsSeedData } from './signsSeedData';
import { dailyMessageTemplates, personalizeTemplate, getDailyMessageTemplate } from './dailyMessageTemplates';
import { meditationSeedData, getMeditationForDay } from './meditationSeedData';

// Re-export for use in other modules
export { getDailyMessageTemplate, personalizeTemplate, getMeditationForDay, meditationSeedData };

// ============================================================================
// IN-MEMORY DATA STORES
// ============================================================================

export const users: Map<string, User & { passwordHash: string }> = new Map();
export const refreshTokens: Map<string, { userId: string; expiresAt: Date }> = new Map();
export const signs: Map<string, Sign> = new Map();
export const userSignLogs: Map<string, UserSignLog> = new Map();
export const tribes: Map<string, Tribe> = new Map();
export const tribeMembers: Map<string, TribeMember> = new Map();
export const dailyMessages: Map<string, DailyMessage> = new Map();
export const futureDrops: Map<string, FutureDrop> = new Map();
export const userAffirmations: Map<string, UserAffirmation> = new Map();
export const meditationSessions: Map<string, MeditationSession> = new Map();
export const rewards: Map<string, Reward> = new Map();
export const userRewards: Map<string, UserReward> = new Map();
export const universeReceipts: Map<string, UniverseReceipt> = new Map();

// ============================================================================
// SEED DATA - REWARDS
// ============================================================================

const rewardsSeedData: Omit<Reward, 'id'>[] = [
  { name: 'Golden Aura', description: 'A shimmering golden glow around your avatar', cost: 100, category: 'avatar', emoji: '✨', isActive: true },
  { name: 'Cosmic Crown', description: 'A crown of stars for your profile', cost: 250, category: 'avatar', emoji: '👑', isActive: true },
  { name: 'Ocean Waves', description: 'Calming ocean wave sounds', cost: 150, category: 'ambience', emoji: '🌊', isActive: true },
  { name: 'Forest Rain', description: 'Gentle rain in a forest setting', cost: 200, category: 'ambience', emoji: '🌲', isActive: true },
  { name: 'Early Riser', description: 'Badge for morning meditation streaks', cost: 300, category: 'badge', emoji: '🌅', isActive: true },
  { name: 'Night Owl', description: 'Badge for evening meditation streaks', cost: 300, category: 'badge', emoji: '🦉', isActive: true },
  { name: 'Ember Lantern', description: 'A warm ember-colored lantern skin', cost: 400, category: 'lantern_skin', emoji: '🔥', isActive: true },
  { name: 'Crystal Lantern', description: 'A crystalline lantern skin', cost: 500, category: 'lantern_skin', emoji: '💎', isActive: true },
  { name: 'Celestial Lantern', description: 'A starry night lantern skin', cost: 600, category: 'lantern_skin', emoji: '🌌', isActive: true },
  { name: 'Week One Wanderer', description: 'Completed first week', cost: 0, category: 'badge', emoji: '🚶', isActive: true },
  { name: 'Sign Seeker', description: 'Logged 10 signs', cost: 0, category: 'badge', emoji: '🔮', isActive: true },
  { name: 'Tribe Leader', description: 'Led a tribe to full completion', cost: 0, category: 'badge', emoji: '👑', isActive: true },
  { name: 'Month Master', description: 'Completed 30 days', cost: 0, category: 'badge', emoji: '🏆', isActive: true },
  { name: 'Cosmic Traveler', description: 'Found a Cosmos-Aligned sign', cost: 0, category: 'badge', emoji: '🌌', isActive: true },
  { name: 'Rekindler', description: 'Returned after a break', cost: 0, category: 'badge', emoji: '🔥', isActive: true },
];

// ============================================================================
// INITIALIZATION FUNCTION
// ============================================================================

export function initializeDatabase(): void {
  // Seed signs from the 1000 signs database
  signsSeedData.forEach((sign) => {
    const id = uuidv4();
    signs.set(id, { ...sign, id });
  });

  // Seed rewards
  rewardsSeedData.forEach((reward) => {
    const id = uuidv4();
    rewards.set(id, { ...reward, id });
  });

  console.log(`Database initialized with ${signs.size} signs, ${rewards.size} rewards, ${meditationSeedData.length} meditations, and ${dailyMessageTemplates.length} daily message templates`);
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getLanternState(brightness: number): LanternState {
  if (brightness >= 80) return 'bright';
  if (brightness >= 60) return 'steady';
  if (brightness >= 40) return 'dimming';
  if (brightness >= 20) return 'fading';
  return 'ember';
}

export function generateDailyMessage(user: User): string {
  // Get template for the user's current day
  const template = getDailyMessageTemplate(user.currentDay);
  
  // Calculate signs found (would need to query userSignLogs in real implementation)
  const signsFound = 0; // Placeholder - would calculate from user's sign logs
  
  // Personalize the template
  return personalizeTemplate(template.template, {
    name: user.fullName.split(' ')[0],
    currentDay: user.currentDay,
    streak: user.streakCount,
    sparks: user.totalSparks,
    signsFound,
  });
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ============================================================================
// SIGN HELPERS
// ============================================================================

export function getSignsByRarity(rarity: string): Sign[] {
  return Array.from(signs.values()).filter(sign => sign.rarity === rarity);
}

export function getSignsByCategory(category: string): Sign[] {
  return Array.from(signs.values()).filter(sign => sign.category === category);
}

export function getUnlockedSigns(currentDay: number): Sign[] {
  return Array.from(signs.values()).filter(sign => sign.unlockDay <= currentDay);
}

export function getActiveSignsForUser(currentDay: number, count: number = 3): Sign[] {
  const unlockedSigns = getUnlockedSigns(currentDay);
  // Shuffle and return requested count
  const shuffled = unlockedSigns.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// ============================================================================
// MEDITATION HELPERS
// ============================================================================

export function getMeditationForUserDay(dayNumber: number) {
  return getMeditationForDay(dayNumber);
}

// Initialize on import
initializeDatabase();
