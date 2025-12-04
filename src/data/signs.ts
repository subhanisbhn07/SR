// SignRoad Complete 100 Signs Database
// Categories: natural_world, numbers, celestial, objects, nature_elements, mystical, colors, human_interactions, media_sync, technology, animals, weather, rare_phenomena

export type SignCategory = 
  | 'natural_world' 
  | 'numbers' 
  | 'celestial' 
  | 'objects' 
  | 'nature_elements' 
  | 'mystical' 
  | 'colors' 
  | 'human_interactions' 
  | 'media_sync' 
  | 'technology' 
  | 'animals' 
  | 'weather' 
  | 'rare_phenomena';

export type SignRarity = 'common' | 'rare' | 'mythic';

export interface SignData {
  id: number;
  name: string;
  emoji: string;
  meaning: string;
  rarity: SignRarity;
  unlockDay: number;
  category: SignCategory;
  description?: string;
  tipsForFinding?: string;
}

// Complete 100 Signs Database
export const COMPLETE_SIGNS: SignData[] = [
  // Days 1-14 (Free Tier - Wanderer's Fortnight)
  { id: 1, name: "White Feather", emoji: "🪶", meaning: "Lightness, peace, messages", rarity: "common", unlockDay: 1, category: "natural_world" },
  { id: 2, name: "Penny or Coin", emoji: "🪙", meaning: "Abundance arriving", rarity: "common", unlockDay: 2, category: "objects" },
  { id: 3, name: "Blue Butterfly", emoji: "🦋", meaning: "Transformation beginning", rarity: "rare", unlockDay: 3, category: "natural_world" },
  { id: 4, name: "Red Cardinal", emoji: "🐦", meaning: "Divine messages", rarity: "rare", unlockDay: 4, category: "natural_world" },
  { id: 5, name: "11:11", emoji: "🔢", meaning: "Alignment, awakening", rarity: "common", unlockDay: 5, category: "numbers" },
  { id: 6, name: "Rainbow", emoji: "🌈", meaning: "Promise fulfilled", rarity: "mythic", unlockDay: 6, category: "celestial" },
  { id: 7, name: "Golden Key", emoji: "🔑", meaning: "Unlocking potential", rarity: "rare", unlockDay: 7, category: "objects" },
  { id: 8, name: "Black Crow/Raven", emoji: "🐦‍⬛", meaning: "Magic, mystery", rarity: "rare", unlockDay: 8, category: "natural_world" },
  { id: 9, name: "Ladybug", emoji: "🐞", meaning: "Good luck", rarity: "common", unlockDay: 9, category: "natural_world" },
  { id: 10, name: "Owl", emoji: "🦉", meaning: "Wisdom, seeing in darkness", rarity: "rare", unlockDay: 10, category: "natural_world" },
  { id: 11, name: "4:44", emoji: "🔢", meaning: "Foundation, stability", rarity: "common", unlockDay: 11, category: "numbers" },
  { id: 12, name: "Deer", emoji: "🦌", meaning: "Gentleness, grace", rarity: "rare", unlockDay: 12, category: "natural_world" },
  { id: 13, name: "Red Umbrella", emoji: "☂️", meaning: "Protection, shelter", rarity: "common", unlockDay: 13, category: "objects" },
  { id: 14, name: "Shooting Star", emoji: "💫", meaning: "Wish manifestation", rarity: "mythic", unlockDay: 14, category: "celestial" },
  
  // Days 15-30 (Paid Tier - Phase 1 Awakening continues)
  { id: 15, name: "Fox", emoji: "🦊", meaning: "Cunning, adaptability", rarity: "rare", unlockDay: 15, category: "natural_world" },
  { id: 16, name: "5:55", emoji: "🔢", meaning: "Major change coming", rarity: "rare", unlockDay: 16, category: "numbers" },
  { id: 17, name: "Blue Door", emoji: "🚪", meaning: "New opportunity", rarity: "rare", unlockDay: 17, category: "objects" },
  { id: 18, name: "Hummingbird", emoji: "🐦", meaning: "Joy, resilience", rarity: "rare", unlockDay: 18, category: "natural_world" },
  { id: 19, name: "Full Moon", emoji: "🌕", meaning: "Completion, illumination", rarity: "rare", unlockDay: 19, category: "celestial" },
  { id: 20, name: "New Moon", emoji: "🌑", meaning: "New beginnings", rarity: "rare", unlockDay: 20, category: "celestial" },
  { id: 21, name: "777", emoji: "🎰", meaning: "Divine luck", rarity: "mythic", unlockDay: 21, category: "numbers" },
  { id: 22, name: "Swan", emoji: "🦢", meaning: "Grace, inner beauty", rarity: "rare", unlockDay: 22, category: "natural_world" },
  { id: 23, name: "Compass", emoji: "🧭", meaning: "Finding direction", rarity: "rare", unlockDay: 23, category: "objects" },
  { id: 24, name: "Lightning", emoji: "⚡", meaning: "Sudden insight", rarity: "rare", unlockDay: 24, category: "celestial" },
  { id: 25, name: "White Dove", emoji: "🕊️", meaning: "Peace, divine presence", rarity: "mythic", unlockDay: 25, category: "natural_world" },
  { id: 26, name: "Thunder", emoji: "🌩️", meaning: "Divine voice", rarity: "rare", unlockDay: 26, category: "celestial" },
  { id: 27, name: "Anchor", emoji: "⚓", meaning: "Stability, grounding", rarity: "common", unlockDay: 27, category: "objects" },
  { id: 28, name: "888", emoji: "♾️", meaning: "Infinite abundance", rarity: "mythic", unlockDay: 28, category: "numbers" },
  { id: 29, name: "Hourglass", emoji: "⏳", meaning: "Divine timing", rarity: "rare", unlockDay: 29, category: "objects" },
  { id: 30, name: "Eagle", emoji: "🦅", meaning: "Higher perspective", rarity: "mythic", unlockDay: 30, category: "natural_world" },
  
  // Days 31-60 (Phase 2 - Deepening)
  { id: 31, name: "Bell", emoji: "🔔", meaning: "Call to awakening", rarity: "common", unlockDay: 31, category: "objects" },
  { id: 32, name: "Four-Leaf Clover", emoji: "🍀", meaning: "Rare luck", rarity: "mythic", unlockDay: 32, category: "nature_elements" },
  { id: 33, name: "Candle", emoji: "🕯️", meaning: "Inner light", rarity: "common", unlockDay: 33, category: "objects" },
  { id: 34, name: "Sunflower", emoji: "🌻", meaning: "Following the light", rarity: "common", unlockDay: 34, category: "nature_elements" },
  { id: 35, name: "999", emoji: "🔢", meaning: "Completion, cycle ending", rarity: "rare", unlockDay: 35, category: "numbers" },
  { id: 36, name: "Crystal", emoji: "💎", meaning: "Clarity, healing", rarity: "rare", unlockDay: 36, category: "objects" },
  { id: 37, name: "Rose", emoji: "🌹", meaning: "Love blooming", rarity: "common", unlockDay: 37, category: "nature_elements" },
  { id: 38, name: "Mirror", emoji: "🪞", meaning: "Self-reflection", rarity: "common", unlockDay: 38, category: "objects" },
  { id: 39, name: "Dandelion Seeds", emoji: "🌾", meaning: "Wishes spreading", rarity: "common", unlockDay: 39, category: "nature_elements" },
  { id: 40, name: "Eclipse", emoji: "🌘", meaning: "Major transformation", rarity: "mythic", unlockDay: 40, category: "celestial" },
  { id: 41, name: "Bookmark", emoji: "🔖", meaning: "Remember this moment", rarity: "common", unlockDay: 41, category: "objects" },
  { id: 42, name: "Lotus", emoji: "🪷", meaning: "Spiritual awakening", rarity: "rare", unlockDay: 42, category: "nature_elements" },
  { id: 43, name: "Magnifying Glass", emoji: "🔍", meaning: "Look closer", rarity: "common", unlockDay: 43, category: "objects" },
  { id: 44, name: "Falling Leaf", emoji: "🍂", meaning: "Letting go", rarity: "common", unlockDay: 44, category: "nature_elements" },
  { id: 45, name: "Scales", emoji: "⚖️", meaning: "Balance, justice", rarity: "rare", unlockDay: 45, category: "objects" },
  { id: 46, name: "Third Eye Symbol", emoji: "👁️", meaning: "Intuition opening", rarity: "rare", unlockDay: 46, category: "mystical" },
  { id: 47, name: "Torch", emoji: "🔦", meaning: "Illuminating path", rarity: "common", unlockDay: 47, category: "objects" },
  { id: 48, name: "Pine Cone", emoji: "🌰", meaning: "Pineal activation", rarity: "rare", unlockDay: 48, category: "nature_elements" },
  { id: 49, name: "Ocean Wave", emoji: "🌊", meaning: "Emotional flow", rarity: "common", unlockDay: 49, category: "nature_elements" },
  { id: 50, name: "Aurora Borealis", emoji: "🌌", meaning: "Cosmic connection", rarity: "mythic", unlockDay: 50, category: "celestial" },
  
  // Days 51-70 (Phase 2 continues + Phase 3 begins)
  { id: 51, name: "Infinity Symbol", emoji: "♾️", meaning: "Eternal nature", rarity: "rare", unlockDay: 51, category: "mystical" },
  { id: 52, name: "Mountain Peak", emoji: "⛰️", meaning: "Reaching summit", rarity: "rare", unlockDay: 52, category: "nature_elements" },
  { id: 53, name: "Yin Yang", emoji: "☯️", meaning: "Perfect balance", rarity: "rare", unlockDay: 53, category: "mystical" },
  { id: 54, name: "Spiral", emoji: "🌀", meaning: "Evolution, growth", rarity: "common", unlockDay: 54, category: "mystical" },
  { id: 55, name: "Desert Oasis", emoji: "🏜️", meaning: "Finding sustenance", rarity: "mythic", unlockDay: 55, category: "nature_elements" },
  { id: 56, name: "Purple Light/Object", emoji: "🟣", meaning: "Spiritual connection", rarity: "common", unlockDay: 56, category: "colors" },
  { id: 57, name: "Gold Shimmer", emoji: "🟡", meaning: "Divine presence", rarity: "rare", unlockDay: 57, category: "colors" },
  { id: 58, name: "Pentacle", emoji: "⛤", meaning: "Protection, elements", rarity: "rare", unlockDay: 58, category: "mystical" },
  { id: 59, name: "Silver Glint", emoji: "⚪", meaning: "Feminine energy", rarity: "rare", unlockDay: 59, category: "colors" },
  { id: 60, name: "Om Symbol", emoji: "🕉️", meaning: "Divine vibration", rarity: "mythic", unlockDay: 60, category: "mystical" },
  { id: 61, name: "Green Abundance", emoji: "🟢", meaning: "Growth, prosperity", rarity: "common", unlockDay: 61, category: "colors" },
  { id: 62, name: "Sacred Geometry", emoji: "🔷", meaning: "Universal order", rarity: "rare", unlockDay: 62, category: "mystical" },
  { id: 63, name: "Stranger's Smile", emoji: "😊", meaning: "Universe smiling at you", rarity: "common", unlockDay: 63, category: "human_interactions" },
  { id: 64, name: "Unexpected Gift", emoji: "🎁", meaning: "Abundance flowing", rarity: "rare", unlockDay: 64, category: "human_interactions" },
  { id: 65, name: "Ankh", emoji: "☥", meaning: "Eternal life", rarity: "mythic", unlockDay: 65, category: "mystical" },
  { id: 66, name: "Old Friend Message", emoji: "💬", meaning: "Past returning", rarity: "rare", unlockDay: 66, category: "human_interactions" },
  { id: 67, name: "Overheard Conversation", emoji: "👂", meaning: "Message for you", rarity: "common", unlockDay: 67, category: "human_interactions" },
  { id: 68, name: "Child's Laughter", emoji: "👶", meaning: "Joy reminder", rarity: "common", unlockDay: 68, category: "human_interactions" },
  { id: 69, name: "Elder's Wisdom", emoji: "👴", meaning: "Ancestral guidance", rarity: "rare", unlockDay: 69, category: "human_interactions" },
  { id: 70, name: "Perfect Song on Radio", emoji: "🎵", meaning: "Universe DJing for you", rarity: "common", unlockDay: 70, category: "media_sync" },
  
  // Days 71-100 (Phase 3 - Transformation)
  { id: 71, name: "Billboard Message", emoji: "🪧", meaning: "Direct communication", rarity: "rare", unlockDay: 71, category: "media_sync" },
  { id: 72, name: "Book Falls Open", emoji: "📖", meaning: "Exact answer appearing", rarity: "rare", unlockDay: 72, category: "media_sync" },
  { id: 73, name: "Movie Scene Relevance", emoji: "🎬", meaning: "Reflecting your life", rarity: "common", unlockDay: 73, category: "media_sync" },
  { id: 74, name: "License Plate Message", emoji: "🚗", meaning: "Road signs", rarity: "common", unlockDay: 74, category: "media_sync" },
  { id: 75, name: "11% Battery", emoji: "🔋", meaning: "Pay attention now", rarity: "common", unlockDay: 75, category: "technology" },
  { id: 76, name: "Wifi Disconnects", emoji: "📡", meaning: "Go offline, within", rarity: "common", unlockDay: 76, category: "technology" },
  { id: 77, name: "Phone Rings Twice", emoji: "📞", meaning: "Someone thinking of you", rarity: "common", unlockDay: 77, category: "technology" },
  { id: 78, name: "Cat Crossing Path", emoji: "🐱", meaning: "Magic nearby", rarity: "common", unlockDay: 78, category: "animals" },
  { id: 79, name: "Dog Approaching", emoji: "🐕", meaning: "Loyalty, friendship", rarity: "common", unlockDay: 79, category: "animals" },
  { id: 80, name: "Snake Sighting", emoji: "🐍", meaning: "Transformation, healing", rarity: "rare", unlockDay: 80, category: "animals" },
  { id: 81, name: "Spider Web", emoji: "🕸️", meaning: "Weaving your reality", rarity: "common", unlockDay: 81, category: "animals" },
  { id: 82, name: "Bees Buzzing", emoji: "🐝", meaning: "Community, productivity", rarity: "common", unlockDay: 82, category: "animals" },
  { id: 83, name: "First Rain Drop", emoji: "💧", meaning: "Cleansing begins", rarity: "common", unlockDay: 83, category: "weather" },
  { id: 84, name: "Sudden Wind Gust", emoji: "💨", meaning: "Change is here", rarity: "common", unlockDay: 84, category: "weather" },
  { id: 85, name: "Fog Lifting", emoji: "🌫️", meaning: "Clarity arriving", rarity: "rare", unlockDay: 85, category: "weather" },
  { id: 86, name: "Snowflake", emoji: "❄️", meaning: "Unique beauty", rarity: "rare", unlockDay: 86, category: "weather" },
  { id: 87, name: "Double Rainbow", emoji: "🌈🌈", meaning: "Double blessing", rarity: "mythic", unlockDay: 87, category: "rare_phenomena" },
  { id: 88, name: "Cloud Shaped Message", emoji: "☁️", meaning: "Heaven writing to you", rarity: "rare", unlockDay: 88, category: "rare_phenomena" },
  { id: 89, name: "Perfect Sunset", emoji: "🌅", meaning: "Day completing beautifully", rarity: "common", unlockDay: 89, category: "rare_phenomena" },
  { id: 90, name: "Perfect Sunrise", emoji: "🌄", meaning: "New day blessing", rarity: "common", unlockDay: 90, category: "rare_phenomena" },
  { id: 91, name: "Red Cap/Hat", emoji: "🧢", meaning: "Recognition, identity", rarity: "common", unlockDay: 91, category: "objects" },
  { id: 92, name: "Heart-Shaped Object", emoji: "❤️", meaning: "Love surrounds you", rarity: "common", unlockDay: 92, category: "objects" },
  { id: 93, name: "Broken Chain", emoji: "⛓️‍💥", meaning: "Freedom achieved", rarity: "rare", unlockDay: 93, category: "objects" },
  { id: 94, name: "Burning Candle Flame", emoji: "🔥", meaning: "Passion ignited", rarity: "common", unlockDay: 94, category: "objects" },
  { id: 95, name: "Blank Page", emoji: "📄", meaning: "Fresh start", rarity: "common", unlockDay: 95, category: "objects" },
  { id: 96, name: "Bridge Crossing", emoji: "🌉", meaning: "Transition happening", rarity: "rare", unlockDay: 96, category: "objects" },
  { id: 97, name: "Tree of Life", emoji: "🌳", meaning: "Deep roots, high branches", rarity: "mythic", unlockDay: 97, category: "nature_elements" },
  { id: 98, name: "Doorway Light", emoji: "🚪💡", meaning: "Path illuminated", rarity: "rare", unlockDay: 98, category: "objects" },
  { id: 99, name: "Golden Thread", emoji: "🧵", meaning: "Divine connection", rarity: "mythic", unlockDay: 99, category: "mystical" },
  { id: 100, name: "Crown", emoji: "👑", meaning: "Your sovereignty", rarity: "mythic", unlockDay: 100, category: "objects" },
];

// Sign categories with descriptions
export const SIGN_CATEGORIES: Record<SignCategory, { name: string; description: string; emoji: string }> = {
  natural_world: { name: "Natural World", description: "Animals, birds, and creatures", emoji: "🦋" },
  numbers: { name: "Numbers & Sequences", description: "Angel numbers and repeating patterns", emoji: "🔢" },
  celestial: { name: "Celestial", description: "Sky, moon, stars, and cosmic events", emoji: "🌙" },
  objects: { name: "Objects", description: "Physical items with symbolic meaning", emoji: "🔑" },
  nature_elements: { name: "Nature Elements", description: "Plants, flowers, and natural phenomena", emoji: "🌿" },
  mystical: { name: "Mystical Symbols", description: "Sacred geometry and spiritual symbols", emoji: "✨" },
  colors: { name: "Colors", description: "Significant color appearances", emoji: "🎨" },
  human_interactions: { name: "Human Interactions", description: "Meaningful encounters with people", emoji: "👥" },
  media_sync: { name: "Media Synchronicity", description: "Messages through media and technology", emoji: "📺" },
  technology: { name: "Technology Signs", description: "Digital and tech-related signs", emoji: "📱" },
  animals: { name: "Animals", description: "Animal encounters and sightings", emoji: "🐾" },
  weather: { name: "Weather", description: "Weather-related signs", emoji: "🌤️" },
  rare_phenomena: { name: "Rare Phenomena", description: "Unusual and rare occurrences", emoji: "🌈" },
};

// Rarity configuration with probabilities
export const SIGN_RARITY_CONFIG: Record<SignRarity, { label: string; probability: string; color: string; stars: number }> = {
  common: { label: "The Universe Whispers", probability: "1 in 12 moments today", color: "text-gray-400", stars: 1 },
  rare: { label: "The Universe Speaks", probability: "1 in 847 moments today", color: "text-purple-400", stars: 3 },
  mythic: { label: "The Universe Shouts", probability: "1 in 10,000 moments today", color: "text-amber-400", stars: 5 },
};

// Get sign by ID
export function getSignById(id: number): SignData | undefined {
  return COMPLETE_SIGNS.find(sign => sign.id === id);
}

// Get sign by day
export function getSignByDay(day: number): SignData | undefined {
  return COMPLETE_SIGNS.find(sign => sign.unlockDay === day);
}

// Get signs by category
export function getSignsByCategory(category: SignCategory): SignData[] {
  return COMPLETE_SIGNS.filter(sign => sign.category === category);
}

// Get signs by rarity
export function getSignsByRarity(rarity: SignRarity): SignData[] {
  return COMPLETE_SIGNS.filter(sign => sign.rarity === rarity);
}

// Get unlocked signs for a user's current day
export function getUnlockedSigns(currentDay: number): SignData[] {
  return COMPLETE_SIGNS.filter(sign => sign.unlockDay <= currentDay);
}

// Get free tier signs (Days 1-14)
export function getFreeTierSigns(): SignData[] {
  return COMPLETE_SIGNS.filter(sign => sign.unlockDay <= 14);
}

// Get paid tier signs (Days 15-100)
export function getPaidTierSigns(): SignData[] {
  return COMPLETE_SIGNS.filter(sign => sign.unlockDay > 14);
}
