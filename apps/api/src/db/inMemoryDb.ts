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
  SignRarity,
  SignCategory,
  TribeAvatarIcon,
  SubscriptionTier,
  SubscriptionStatus,
  LanternState,
  MessageCategory,
  FutureDropTrigger,
  JourneyPhase,
} from '@signroad/shared';

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
// SEED DATA - SIGNS (100 Signs as per PRD)
// ============================================================================

const signsSeedData: Omit<Sign, 'id'>[] = [
  // Nature Category (20 signs)
  { name: 'White Feather', emoji: '🪶', category: 'nature', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 1, meaning: 'Angels are near', description: 'A white feather appearing in your path', tipsForFinding: 'Look on sidewalks, parks, or near windows', isActive: true },
  { name: 'Rainbow', emoji: '🌈', category: 'nature', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 4, meaning: 'Promise of better times', description: 'A rainbow after rain or in unexpected places', tipsForFinding: 'Look to the sky after rain or near water sources', isActive: true },
  { name: 'Four-Leaf Clover', emoji: '🍀', category: 'nature', rarity: 'shouted', rarityProbability: 0.07, unlockDay: 7, meaning: 'Luck is on your side', description: 'Finding a rare four-leaf clover', tipsForFinding: 'Search in grassy areas, especially in spring', isActive: true },
  { name: 'Shooting Star', emoji: '🌠', category: 'nature', rarity: 'thundered', rarityProbability: 0.025, unlockDay: 10, meaning: 'Wishes being heard', description: 'Witnessing a shooting star', tipsForFinding: 'Look up at night, especially during meteor showers', isActive: true },
  { name: 'Sunrise', emoji: '🌅', category: 'nature', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 13, meaning: 'New beginnings', description: 'Witnessing a beautiful sunrise', tipsForFinding: 'Wake early and face east', isActive: true },
  { name: 'Full Moon', emoji: '🌕', category: 'nature', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 16, meaning: 'Completion and clarity', description: 'Seeing the full moon clearly', tipsForFinding: 'Check lunar calendar and look up at night', isActive: true },
  { name: 'Cloud Formation', emoji: '☁️', category: 'nature', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 19, meaning: 'Messages from above', description: 'Clouds forming meaningful shapes', tipsForFinding: 'Lie back and watch the sky', isActive: true },
  { name: 'Sunset', emoji: '🌇', category: 'nature', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 22, meaning: 'Peaceful endings', description: 'A particularly beautiful sunset', tipsForFinding: 'Face west in the evening', isActive: true },
  { name: 'Flower Bloom', emoji: '🌸', category: 'nature', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 25, meaning: 'Growth and beauty', description: 'Noticing a flower blooming', tipsForFinding: 'Visit gardens or notice plants around you', isActive: true },
  { name: 'Falling Leaf', emoji: '🍂', category: 'nature', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 28, meaning: 'Letting go', description: 'A leaf falling at the right moment', tipsForFinding: 'Walk under trees, especially in autumn', isActive: true },
  { name: 'Dewdrops', emoji: '💧', category: 'nature', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 31, meaning: 'Fresh start', description: 'Morning dewdrops on plants', tipsForFinding: 'Look at plants early in the morning', isActive: true },
  { name: 'Wind Gust', emoji: '💨', category: 'nature', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 34, meaning: 'Change is coming', description: 'A sudden gust of wind', tipsForFinding: 'Be aware of sudden weather changes', isActive: true },
  { name: 'Sunbeam', emoji: '☀️', category: 'nature', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 37, meaning: 'Divine spotlight', description: 'A beam of sunlight breaking through', tipsForFinding: 'Notice light through windows or clouds', isActive: true },
  { name: 'Rain on Window', emoji: '🌧️', category: 'nature', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 40, meaning: 'Cleansing', description: 'Rain patterns on your window', tipsForFinding: 'Watch windows during rain', isActive: true },
  { name: 'Snow', emoji: '❄️', category: 'nature', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 43, meaning: 'Purity and peace', description: 'First snowfall or unexpected snow', tipsForFinding: 'Watch weather forecasts in winter', isActive: true },
  { name: 'Thunder', emoji: '⛈️', category: 'nature', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 46, meaning: 'Powerful transformation', description: 'Hearing thunder at a meaningful moment', tipsForFinding: 'Be present during storms', isActive: true },
  { name: 'Fog', emoji: '🌫️', category: 'nature', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 49, meaning: 'Mystery unfolding', description: 'Walking through fog', tipsForFinding: 'Early mornings near water', isActive: true },
  { name: 'Star Cluster', emoji: '✨', category: 'nature', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 52, meaning: 'Infinite possibilities', description: 'Seeing a cluster of stars clearly', tipsForFinding: 'Find dark sky areas at night', isActive: true },
  { name: 'Double Rainbow', emoji: '🌈', category: 'nature', rarity: 'thundered', rarityProbability: 0.025, unlockDay: 55, meaning: 'Double blessings', description: 'Witnessing a double rainbow', tipsForFinding: 'Look carefully after rain with sun', isActive: true },
  { name: 'Northern Lights', emoji: '🌌', category: 'nature', rarity: 'cosmos_aligned', rarityProbability: 0.005, unlockDay: 58, meaning: 'Cosmic alignment', description: 'Seeing aurora borealis', tipsForFinding: 'Travel north or check aurora forecasts', isActive: true },

  // Animals Category (20 signs)
  { name: 'Butterfly', emoji: '🦋', category: 'animals', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 61, meaning: 'Transformation', description: 'A butterfly crossing your path', tipsForFinding: 'Visit gardens or parks', isActive: true },
  { name: 'Cardinal', emoji: '🐦', category: 'animals', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 64, meaning: 'Loved ones visiting', description: 'Seeing a red cardinal', tipsForFinding: 'Look in trees and bushes', isActive: true },
  { name: 'Owl', emoji: '🦉', category: 'animals', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 67, meaning: 'Wisdom incoming', description: 'Hearing or seeing an owl', tipsForFinding: 'Listen at dusk and dawn', isActive: true },
  { name: 'Dragonfly', emoji: '🪰', category: 'animals', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 70, meaning: 'Adaptability', description: 'A dragonfly near you', tipsForFinding: 'Near water in summer', isActive: true },
  { name: 'Ladybug', emoji: '🐞', category: 'animals', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 73, meaning: 'Good fortune', description: 'A ladybug landing on you', tipsForFinding: 'Gardens and plants', isActive: true },
  { name: 'Hummingbird', emoji: '🐦', category: 'animals', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 76, meaning: 'Joy and lightness', description: 'Seeing a hummingbird', tipsForFinding: 'Near flowers, especially red ones', isActive: true },
  { name: 'Deer', emoji: '🦌', category: 'animals', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 79, meaning: 'Gentleness', description: 'Encountering a deer', tipsForFinding: 'Early morning in wooded areas', isActive: true },
  { name: 'Hawk', emoji: '🦅', category: 'animals', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 82, meaning: 'Vision and focus', description: 'A hawk circling overhead', tipsForFinding: 'Open fields and highways', isActive: true },
  { name: 'Rabbit', emoji: '🐰', category: 'animals', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 85, meaning: 'Abundance coming', description: 'Seeing a rabbit', tipsForFinding: 'Early morning in grassy areas', isActive: true },
  { name: 'Spider Web', emoji: '🕸️', category: 'animals', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 88, meaning: 'Creativity', description: 'A perfect spider web', tipsForFinding: 'Morning dew reveals them', isActive: true },
  { name: 'Bee', emoji: '🐝', category: 'animals', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 91, meaning: 'Productivity', description: 'A bee visiting nearby', tipsForFinding: 'Near flowers in warm weather', isActive: true },
  { name: 'Crow', emoji: '🐦‍⬛', category: 'animals', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 94, meaning: 'Magic and mystery', description: 'A crow appearing', tipsForFinding: 'Urban and rural areas', isActive: true },
  { name: 'Fox', emoji: '🦊', category: 'animals', rarity: 'shouted', rarityProbability: 0.07, unlockDay: 97, meaning: 'Cleverness needed', description: 'Spotting a fox', tipsForFinding: 'Dawn and dusk in suburban areas', isActive: true },
  { name: 'Dolphin', emoji: '🐬', category: 'animals', rarity: 'shouted', rarityProbability: 0.07, unlockDay: 100, meaning: 'Playfulness', description: 'Seeing dolphins', tipsForFinding: 'Coastal areas and boat trips', isActive: true },
  { name: 'Whale', emoji: '🐋', category: 'animals', rarity: 'thundered', rarityProbability: 0.025, unlockDay: 103, meaning: 'Deep wisdom', description: 'Witnessing a whale', tipsForFinding: 'Whale watching tours', isActive: true },
  { name: 'Cat Crossing', emoji: '🐱', category: 'animals', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 106, meaning: 'Independence', description: 'A cat crossing your path', tipsForFinding: 'Neighborhoods and parks', isActive: true },
  { name: 'Dog Greeting', emoji: '🐕', category: 'animals', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 109, meaning: 'Loyalty and friendship', description: 'A friendly dog approaching', tipsForFinding: 'Parks and walking paths', isActive: true },
  { name: 'Frog', emoji: '🐸', category: 'animals', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 112, meaning: 'Transformation', description: 'Hearing or seeing a frog', tipsForFinding: 'Near water, especially at night', isActive: true },
  { name: 'Turtle', emoji: '🐢', category: 'animals', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 115, meaning: 'Patience', description: 'Encountering a turtle', tipsForFinding: 'Near ponds and slow waters', isActive: true },
  { name: 'Eagle', emoji: '🦅', category: 'animals', rarity: 'shouted', rarityProbability: 0.07, unlockDay: 118, meaning: 'Spiritual protection', description: 'Seeing an eagle soar', tipsForFinding: 'Mountains and large bodies of water', isActive: true },

  // Numbers Category (15 signs)
  { name: '11:11', emoji: '🕚', category: 'numbers', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 121, meaning: 'Alignment', description: 'Seeing 11:11 on a clock', tipsForFinding: 'Glance at clocks naturally', isActive: true },
  { name: '222', emoji: '2️⃣', category: 'numbers', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 124, meaning: 'Balance', description: 'Seeing 222 or 2:22', tipsForFinding: 'Receipts, clocks, addresses', isActive: true },
  { name: '333', emoji: '3️⃣', category: 'numbers', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 127, meaning: 'Ascended masters near', description: 'Seeing 333 or 3:33', tipsForFinding: 'Look for patterns in numbers', isActive: true },
  { name: '444', emoji: '4️⃣', category: 'numbers', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 130, meaning: 'Angels surrounding you', description: 'Seeing 444 or 4:44', tipsForFinding: 'Clocks, license plates, receipts', isActive: true },
  { name: '555', emoji: '5️⃣', category: 'numbers', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 133, meaning: 'Major change coming', description: 'Seeing 555 or 5:55', tipsForFinding: 'Be aware of number patterns', isActive: true },
  { name: '777', emoji: '7️⃣', category: 'numbers', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 136, meaning: 'Divine luck', description: 'Seeing 777 or 7:77', tipsForFinding: 'Slot machines, addresses, receipts', isActive: true },
  { name: '888', emoji: '8️⃣', category: 'numbers', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 139, meaning: 'Abundance flowing', description: 'Seeing 888 or 8:88', tipsForFinding: 'Financial documents, receipts', isActive: true },
  { name: '999', emoji: '9️⃣', category: 'numbers', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 142, meaning: 'Completion', description: 'Seeing 999 or 9:99', tipsForFinding: 'End of cycles, receipts', isActive: true },
  { name: '1234', emoji: '🔢', category: 'numbers', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 145, meaning: 'Steps in order', description: 'Seeing 1234 sequence', tipsForFinding: 'Clocks at 12:34', isActive: true },
  { name: 'Birthday Numbers', emoji: '🎂', category: 'numbers', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 148, meaning: 'Personal message', description: 'Seeing your birthday numbers', tipsForFinding: 'Everywhere - stay aware', isActive: true },
  { name: '000', emoji: '0️⃣', category: 'numbers', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 151, meaning: 'Infinite potential', description: 'Seeing 000 or :00', tipsForFinding: 'Digital clocks on the hour', isActive: true },
  { name: '1111', emoji: '1️⃣', category: 'numbers', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 154, meaning: 'Portal opening', description: 'Seeing 1111 anywhere', tipsForFinding: 'Addresses, receipts, timestamps', isActive: true },
  { name: '1212', emoji: '🔢', category: 'numbers', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 157, meaning: 'Stay positive', description: 'Seeing 12:12 or 1212', tipsForFinding: 'Noon time, addresses', isActive: true },
  { name: 'Lucky 7', emoji: '🎰', category: 'numbers', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 160, meaning: 'Fortune favors you', description: 'The number 7 appearing', tipsForFinding: 'Everywhere - stay aware', isActive: true },
  { name: 'Master 22', emoji: '✨', category: 'numbers', rarity: 'shouted', rarityProbability: 0.07, unlockDay: 163, meaning: 'Master builder energy', description: 'Seeing 22 repeatedly', tipsForFinding: 'Dates, times, addresses', isActive: true },

  // Symbols Category (15 signs)
  { name: 'Heart Shape', emoji: '❤️', category: 'symbols', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 166, meaning: 'Love surrounds you', description: 'Finding heart shapes in nature', tipsForFinding: 'Leaves, clouds, puddles', isActive: true },
  { name: 'Coin Found', emoji: '🪙', category: 'symbols', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 169, meaning: 'Abundance coming', description: 'Finding a coin on the ground', tipsForFinding: 'Sidewalks, parking lots', isActive: true },
  { name: 'Key', emoji: '🔑', category: 'symbols', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 172, meaning: 'Opportunity unlocking', description: 'Finding or receiving a key', tipsForFinding: 'Stay aware of keys appearing', isActive: true },
  { name: 'Circle', emoji: '⭕', category: 'symbols', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 175, meaning: 'Wholeness', description: 'Perfect circles appearing', tipsForFinding: 'Nature, architecture, art', isActive: true },
  { name: 'Star Symbol', emoji: '⭐', category: 'symbols', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 178, meaning: 'You are a star', description: 'Star symbols appearing', tipsForFinding: 'Decorations, signs, nature', isActive: true },
  { name: 'Spiral', emoji: '🌀', category: 'symbols', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 181, meaning: 'Evolution', description: 'Spiral patterns appearing', tipsForFinding: 'Shells, plants, art', isActive: true },
  { name: 'Arrow', emoji: '➡️', category: 'symbols', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 184, meaning: 'Direction shown', description: 'Arrows pointing your way', tipsForFinding: 'Signs, nature, random places', isActive: true },
  { name: 'Infinity Symbol', emoji: '♾️', category: 'symbols', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 187, meaning: 'Endless possibilities', description: 'Seeing infinity symbols', tipsForFinding: 'Jewelry, art, nature', isActive: true },
  { name: 'Cross', emoji: '✝️', category: 'symbols', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 190, meaning: 'Protection', description: 'Cross symbols appearing', tipsForFinding: 'Architecture, nature, shadows', isActive: true },
  { name: 'Triangle', emoji: '🔺', category: 'symbols', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 193, meaning: 'Mind-body-spirit alignment', description: 'Triangle shapes appearing', tipsForFinding: 'Architecture, nature, art', isActive: true },
  { name: 'Anchor', emoji: '⚓', category: 'symbols', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 196, meaning: 'Stay grounded', description: 'Anchor symbols appearing', tipsForFinding: 'Near water, decorations', isActive: true },
  { name: 'Butterfly Symbol', emoji: '🦋', category: 'symbols', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 199, meaning: 'Transformation reminder', description: 'Butterfly images or symbols', tipsForFinding: 'Art, clothing, decorations', isActive: true },
  { name: 'Sun Symbol', emoji: '☀️', category: 'symbols', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 202, meaning: 'Vitality', description: 'Sun symbols appearing', tipsForFinding: 'Art, decorations, nature', isActive: true },
  { name: 'Moon Symbol', emoji: '🌙', category: 'symbols', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 205, meaning: 'Intuition', description: 'Moon symbols appearing', tipsForFinding: 'Art, jewelry, decorations', isActive: true },
  { name: 'Tree of Life', emoji: '🌳', category: 'symbols', rarity: 'shouted', rarityProbability: 0.07, unlockDay: 208, meaning: 'Connection to all', description: 'Tree of life symbols', tipsForFinding: 'Art, jewelry, tattoos', isActive: true },

  // Colors Category (10 signs)
  { name: 'Red Object', emoji: '🔴', category: 'colors', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 211, meaning: 'Passion and energy', description: 'A red object catching your eye', tipsForFinding: 'Stay aware of red items', isActive: true },
  { name: 'Blue Moment', emoji: '🔵', category: 'colors', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 214, meaning: 'Peace and truth', description: 'Blue appearing meaningfully', tipsForFinding: 'Sky, water, objects', isActive: true },
  { name: 'Green Light', emoji: '🟢', category: 'colors', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 217, meaning: 'Go ahead', description: 'Green appearing as a sign', tipsForFinding: 'Traffic lights, nature', isActive: true },
  { name: 'Gold Shimmer', emoji: '🟡', category: 'colors', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 220, meaning: 'Wealth and success', description: 'Gold catching your attention', tipsForFinding: 'Sunlight, jewelry, decorations', isActive: true },
  { name: 'Purple Vision', emoji: '🟣', category: 'colors', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 223, meaning: 'Spiritual awakening', description: 'Purple appearing meaningfully', tipsForFinding: 'Flowers, sky, objects', isActive: true },
  { name: 'White Light', emoji: '⚪', category: 'colors', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 226, meaning: 'Purity and clarity', description: 'White light or objects', tipsForFinding: 'Sunbeams, clouds, objects', isActive: true },
  { name: 'Orange Glow', emoji: '🟠', category: 'colors', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 229, meaning: 'Creativity and joy', description: 'Orange appearing as a sign', tipsForFinding: 'Sunsets, fruits, decorations', isActive: true },
  { name: 'Pink Presence', emoji: '🩷', category: 'colors', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 232, meaning: 'Love and compassion', description: 'Pink catching your attention', tipsForFinding: 'Flowers, sky, objects', isActive: true },
  { name: 'Silver Gleam', emoji: '🩶', category: 'colors', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 235, meaning: 'Intuition and reflection', description: 'Silver appearing meaningfully', tipsForFinding: 'Moon, jewelry, reflections', isActive: true },
  { name: 'Rainbow Colors', emoji: '🏳️‍🌈', category: 'colors', rarity: 'shouted', rarityProbability: 0.07, unlockDay: 238, meaning: 'All possibilities open', description: 'Multiple colors together', tipsForFinding: 'Art, nature, decorations', isActive: true },

  // Sounds Category (10 signs)
  { name: 'Bird Song', emoji: '🎵', category: 'sounds', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 241, meaning: 'Message from above', description: 'A bird singing at the right moment', tipsForFinding: 'Morning and evening outdoors', isActive: true },
  { name: 'Wind Chimes', emoji: '🎐', category: 'sounds', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 244, meaning: 'Spirits communicating', description: 'Wind chimes ringing', tipsForFinding: 'Porches, gardens, shops', isActive: true },
  { name: 'Church Bells', emoji: '🔔', category: 'sounds', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 247, meaning: 'Divine timing', description: 'Hearing church bells', tipsForFinding: 'Near churches, on the hour', isActive: true },
  { name: 'Your Song', emoji: '🎶', category: 'sounds', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 250, meaning: 'Universe speaking through music', description: 'A meaningful song playing', tipsForFinding: 'Radio, stores, random places', isActive: true },
  { name: 'Thunder Clap', emoji: '⚡', category: 'sounds', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 253, meaning: 'Wake up call', description: 'Thunder at a meaningful moment', tipsForFinding: 'During storms', isActive: true },
  { name: 'Laughter', emoji: '😄', category: 'sounds', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 256, meaning: 'Joy is near', description: 'Hearing laughter at the right time', tipsForFinding: 'Public places, gatherings', isActive: true },
  { name: 'Name Called', emoji: '📢', category: 'sounds', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 259, meaning: 'You are being noticed', description: 'Hearing your name unexpectedly', tipsForFinding: 'Public places, media', isActive: true },
  { name: 'Water Sound', emoji: '💦', category: 'sounds', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 262, meaning: 'Emotional flow', description: 'Sound of water at the right moment', tipsForFinding: 'Fountains, rain, streams', isActive: true },
  { name: 'Silence', emoji: '🤫', category: 'sounds', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 265, meaning: 'Listen within', description: 'A moment of perfect silence', tipsForFinding: 'Meditation, nature, early morning', isActive: true },
  { name: 'Baby Cry', emoji: '👶', category: 'sounds', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 268, meaning: 'New beginnings', description: 'Hearing a baby at the right moment', tipsForFinding: 'Public places, family gatherings', isActive: true },

  // Synchronicity Category (10 signs)
  { name: 'Thinking of Someone', emoji: '💭', category: 'synchronicity', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 271, meaning: 'Connection confirmed', description: 'They contact you when you think of them', tipsForFinding: 'Notice when you think of people', isActive: true },
  { name: 'Perfect Timing', emoji: '⏰', category: 'synchronicity', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 274, meaning: 'You are in flow', description: 'Everything aligning perfectly', tipsForFinding: 'Notice when things flow easily', isActive: true },
  { name: 'Overheard Conversation', emoji: '👂', category: 'synchronicity', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 277, meaning: 'Message for you', description: 'Hearing exactly what you needed', tipsForFinding: 'Public places, stay aware', isActive: true },
  { name: 'Book Falls Open', emoji: '📖', category: 'synchronicity', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 280, meaning: 'Guidance given', description: 'A book opening to the right page', tipsForFinding: 'Libraries, bookstores, home', isActive: true },
  { name: 'Unexpected Help', emoji: '🤝', category: 'synchronicity', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 283, meaning: 'Angels in human form', description: 'Help arriving when needed', tipsForFinding: 'Stay open to receiving', isActive: true },
  { name: 'Deja Vu', emoji: '🔄', category: 'synchronicity', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 286, meaning: 'On the right path', description: 'Strong deja vu feeling', tipsForFinding: 'Notice familiar feelings', isActive: true },
  { name: 'Dream Message', emoji: '💤', category: 'synchronicity', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 289, meaning: 'Subconscious wisdom', description: 'A meaningful dream', tipsForFinding: 'Keep a dream journal', isActive: true },
  { name: 'Stranger Smile', emoji: '😊', category: 'synchronicity', rarity: 'whispered', rarityProbability: 0.70, unlockDay: 292, meaning: 'Kindness exists', description: 'A stranger smiling at you', tipsForFinding: 'Public places, be open', isActive: true },
  { name: 'Found Object', emoji: '🔍', category: 'synchronicity', rarity: 'spoken', rarityProbability: 0.20, unlockDay: 295, meaning: 'Gift from universe', description: 'Finding something meaningful', tipsForFinding: 'Stay aware while walking', isActive: true },
  { name: 'Cosmic Wink', emoji: '😉', category: 'synchronicity', rarity: 'shouted', rarityProbability: 0.07, unlockDay: 298, meaning: 'Universe acknowledging you', description: 'Multiple synchronicities at once', tipsForFinding: 'Notice patterns in your day', isActive: true },
];

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
];

// ============================================================================
// DAILY MESSAGE TEMPLATES
// ============================================================================

export const dailyMessageTemplates: { category: MessageCategory; templates: string[] }[] = [
  {
    category: 'transformation',
    templates: [
      "You've been feeling the pull of change lately, {name}. Something inside you knows it's time to evolve beyond who you've been. That restlessness? It's not anxiety—it's your soul making space for what's next.",
      "The person you were a year ago wouldn't recognize the strength you carry now, {name}. Growth often feels like breaking, but you're not falling apart—you're falling into place.",
      "Today marks Day {currentDay} of your journey, {name}. Every step forward, no matter how small, is rewriting your story. The universe sees your effort.",
      "Change doesn't announce itself with fanfare, {name}. It whispers in moments of quiet courage. You've been braver than you realize.",
      "The caterpillar doesn't know it will fly, {name}. Trust the process you're in. Your wings are forming in the darkness.",
      "Something shifted in you recently, {name}. You may not have words for it yet, but your energy is different. Others will notice soon.",
      "Day {currentDay} brings new possibilities, {name}. The old version of you served its purpose. Thank it and let it go.",
      "Your transformation isn't linear, {name}. Some days feel like setbacks, but spirals still move upward. You're exactly where you need to be.",
      "The discomfort you feel is growth in disguise, {name}. Comfort zones are beautiful places, but nothing ever grows there.",
      "You're not the same person who started this journey, {name}. {signsFound} signs later, you see the world differently now.",
    ],
  },
  {
    category: 'validation',
    templates: [
      "You've been doubting yourself lately, {name}. But here's what you might not see: you're handling things better than you think. Give yourself credit.",
      "The voice that says you're not enough is lying, {name}. Look at what you've accomplished—{currentDay} days of showing up for yourself. That takes real strength.",
      "Someone needs to tell you this today, {name}: You are worthy of good things. Not because of what you do, but because of who you are.",
      "Your feelings are valid, {name}. All of them. Even the messy ones. Especially the messy ones. They're part of being beautifully human.",
      "You've been carrying a lot, {name}. It's okay to set some of it down. You don't have to prove anything to anyone today.",
      "The path you're on is yours alone, {name}. Stop comparing your chapter {currentDay} to someone else's chapter 300. Your timing is perfect.",
      "You matter more than you know, {name}. Your presence affects people in ways you'll never fully see. Keep being you.",
      "It's okay to not have it all figured out, {name}. Nobody does. The ones who seem certain are just better at pretending.",
      "Your sensitivity isn't weakness, {name}. It's your superpower. The world needs people who feel deeply.",
      "You're doing better than you think, {name}. {streak} days of consistency proves you have what it takes.",
    ],
  },
  {
    category: 'timing',
    templates: [
      "You've been worried about timing lately, {name}. But consider this: everything that's meant for you is making its way to you. Patience isn't passive—it's powerful.",
      "The delay isn't denial, {name}. Sometimes the universe is protecting you from something you can't see yet. Trust the timing.",
      "Day {currentDay} arrived exactly when it should, {name}. Not a moment too soon, not a moment too late. Divine timing is real.",
      "Stop rushing, {name}. The flower doesn't bloom faster because you stare at it. Your manifestation is growing in its own perfect time.",
      "What's meant for you won't miss you, {name}. Relax into that truth today. The universe has impeccable timing.",
      "You're not behind, {name}. You're not late. You're not missing out. You're exactly on schedule for YOUR life.",
      "The waiting is part of the journey, {name}. Seeds don't sprout the day they're planted. Your harvest is coming.",
      "Sometimes 'not yet' is the most loving answer, {name}. The universe knows when you're truly ready.",
      "Your {currentDay}-day journey has its own rhythm, {name}. Honor it. Force nothing. Flow with everything.",
      "The right doors open at the right time, {name}. Keep knocking, but also keep trusting.",
    ],
  },
  {
    category: 'relationships',
    templates: [
      "Someone's been on your mind lately, {name}. There's a reason for that. Pay attention to what your heart is trying to tell you.",
      "The connections that matter will find their way back, {name}. Let go of what's meant to leave. Make room for what's meant to stay.",
      "You teach people how to treat you, {name}. Today, practice showing them your worth through your boundaries.",
      "Not everyone will understand your journey, {name}. That's okay. Your tribe is out there, and they'll recognize you when you meet.",
      "The relationship you have with yourself sets the tone for every other relationship, {name}. Be gentle with yourself today.",
      "Some people are in your life for a reason, some for a season, {name}. Both are valuable. Neither is a failure.",
      "You're allowed to outgrow people, {name}. Growth sometimes means growing apart. It doesn't mean the love wasn't real.",
      "The right people will love the real you, {name}. Stop dimming your light to make others comfortable.",
      "Connection is your birthright, {name}. You're not too much. You're not too little. You're exactly enough for the right people.",
      "Day {currentDay} reminds you: quality over quantity in relationships, {name}. One true friend outweighs a hundred acquaintances.",
    ],
  },
  {
    category: 'purpose',
    templates: [
      "You've been questioning your path lately, {name}. That questioning is itself a sign of growth. The unexamined life isn't worth living.",
      "Your purpose isn't a destination, {name}. It's how you show up each day. Today, show up with intention.",
      "The world needs what you have to offer, {name}. Don't let fear convince you otherwise. Your gifts matter.",
      "Day {currentDay} of your journey isn't random, {name}. Every step has been preparing you for something bigger.",
      "You're not lost, {name}. You're exploring. There's a difference. Explorers discover new territories.",
      "Your purpose might not look like anyone else's, {name}. That's the point. You're here to be original, not a copy.",
      "The things that light you up are clues, {name}. Follow the joy. It knows where it's going.",
      "You don't have to save the world, {name}. Sometimes purpose is simply being kind to the person in front of you.",
      "Your {signsFound} signs are breadcrumbs on your path, {name}. The universe is showing you the way.",
      "Purpose isn't found, it's created, {name}. What will you create with today?",
    ],
  },
  {
    category: 'abundance',
    templates: [
      "Abundance is your natural state, {name}. Scarcity is the illusion. Today, notice all the ways life is already supporting you.",
      "You have {sparks} Sparks because you've been showing up, {name}. That's abundance in action. More is on its way.",
      "The universe is infinitely abundant, {name}. There's enough for everyone, including you. Especially you.",
      "Gratitude is the fastest path to abundance, {name}. What are three things you're grateful for right now?",
      "Money is energy, {name}. When you align with your purpose, prosperity follows. Trust the process.",
      "Day {currentDay} brings new opportunities for abundance, {name}. Keep your eyes and heart open.",
      "You deserve good things, {name}. Not because you've earned them, but because abundance is your birthright.",
      "Lack is a mindset, not a reality, {name}. Today, practice seeing the fullness all around you.",
      "Your {streak}-day streak is proof of your abundance mindset, {name}. Consistency creates wealth in all forms.",
      "The more you appreciate what you have, {name}, the more you'll have to appreciate. It's universal law.",
    ],
  },
];

// ============================================================================
// INITIALIZATION FUNCTION
// ============================================================================

export function initializeDatabase(): void {
  // Seed signs
  signsSeedData.forEach((sign) => {
    const id = uuidv4();
    signs.set(id, { ...sign, id });
  });

  // Seed rewards
  rewardsSeedData.forEach((reward) => {
    const id = uuidv4();
    rewards.set(id, { ...reward, id });
  });

  console.log(`Database initialized with ${signs.size} signs and ${rewards.size} rewards`);
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
  // Select category based on day rotation
  const categories: MessageCategory[] = ['transformation', 'validation', 'timing', 'relationships', 'purpose', 'abundance'];
  const categoryIndex = user.currentDay % categories.length;
  const category = categories[categoryIndex];
  
  // Find templates for this category
  const categoryTemplates = dailyMessageTemplates.find(t => t.category === category);
  if (!categoryTemplates) return "Today is a new day full of possibilities.";
  
  // Select template based on user ID hash + day (ensures consistency)
  const hash = user.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const templateIndex = (hash + user.currentDay) % categoryTemplates.templates.length;
  let template = categoryTemplates.templates[templateIndex];
  
  // Replace variables
  template = template.replace(/{name}/g, user.fullName.split(' ')[0]);
  template = template.replace(/{currentDay}/g, user.currentDay.toString());
  template = template.replace(/{streak}/g, user.streakCount.toString());
  template = template.replace(/{sparks}/g, user.totalSparks.toString());
  template = template.replace(/{signsFound}/g, '0'); // Would need to calculate from logs
  
  return template;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Initialize on import
initializeDatabase();
