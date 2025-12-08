import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getSupabase } from '../lib/supabase';

// Sign rarity levels with their spark rewards
export const RARITY_SPARKS: Record<SignRarity, number> = {
  whispered: 5,
  spoken: 10,
  shouted: 25,
  thundered: 50,
  cosmos_aligned: 100,
};

export type SignRarity = 'whispered' | 'spoken' | 'shouted' | 'thundered' | 'cosmos_aligned';

export interface Sign {
  id: string;
  name: string;
  emoji: string;
  category: string;
  rarity: SignRarity;
  unlockDay: number;
  description: string;
  meaning: string;
  tipsForFinding: string;
}

export interface SignLog {
  id: string;
  signId: string;
  foundAt: Date;
  locationNote?: string;
  sparksEarned: number;
  receiptGenerated: boolean;
  receiptUrl?: string;
}

export interface ActiveSign {
  signId: string;
  assignedAt: Date;
  expiresAt: Date;
}

// The complete 100-sign database
export const SIGNS_DATABASE: Sign[] = [
  // WHISPERED (Common) - 40 signs, unlock from Day 1
  { id: 'sign-001', name: 'White Feather', emoji: '🪶', category: 'nature', rarity: 'whispered', unlockDay: 1, description: 'A white feather appearing in your path', meaning: 'Angels are near, protection and guidance', tipsForFinding: 'Look on sidewalks, parks, or near windows' },
  { id: 'sign-002', name: 'Lucky Coin', emoji: '🪙', category: 'objects', rarity: 'whispered', unlockDay: 1, description: 'Finding a coin heads-up', meaning: 'Abundance is flowing to you', tipsForFinding: 'Check the ground when walking, especially near stores' },
  { id: 'sign-003', name: 'Butterfly', emoji: '🦋', category: 'nature', rarity: 'whispered', unlockDay: 1, description: 'A butterfly crossing your path', meaning: 'Transformation and new beginnings', tipsForFinding: 'Gardens, parks, or sunny areas' },
  { id: 'sign-004', name: 'Ladybug', emoji: '🐞', category: 'nature', rarity: 'whispered', unlockDay: 1, description: 'A ladybug landing near you', meaning: 'Good luck and wishes coming true', tipsForFinding: 'Gardens, plants, or sunny windowsills' },
  { id: 'sign-005', name: 'Sunflower', emoji: '🌻', category: 'nature', rarity: 'whispered', unlockDay: 1, description: 'Seeing a sunflower', meaning: 'Positivity and warmth', tipsForFinding: 'Gardens, flower shops, or fields' },
  { id: 'sign-006', name: 'Double Numbers', emoji: '🔢', category: 'numbers', rarity: 'whispered', unlockDay: 1, description: 'Seeing 11:11, 22:22, etc.', meaning: 'Alignment with the universe', tipsForFinding: 'Clocks, receipts, or license plates' },
  { id: 'sign-007', name: 'Umbrella', emoji: '☂️', category: 'objects', rarity: 'whispered', unlockDay: 1, description: 'Seeing an umbrella when not raining', meaning: 'Protection is available to you', tipsForFinding: 'Cafes, stores, or on the street' },
  { id: 'sign-008', name: 'Yellow Car', emoji: '🚗', category: 'objects', rarity: 'whispered', unlockDay: 1, description: 'Spotting a yellow car', meaning: 'Joy and optimism ahead', tipsForFinding: 'Roads, parking lots, or traffic' },
  { id: 'sign-009', name: 'Dandelion', emoji: '🌼', category: 'nature', rarity: 'whispered', unlockDay: 1, description: 'Finding a dandelion to wish on', meaning: 'Your wishes are being heard', tipsForFinding: 'Lawns, fields, or sidewalk cracks' },
  { id: 'sign-010', name: 'Cloud Shape', emoji: '☁️', category: 'sky', rarity: 'whispered', unlockDay: 1, description: 'Seeing a meaningful shape in clouds', meaning: 'Messages from above', tipsForFinding: 'Look up on partly cloudy days' },
  { id: 'sign-011', name: 'Penny', emoji: '🪙', category: 'objects', rarity: 'whispered', unlockDay: 1, description: 'Finding a penny', meaning: 'Small blessings accumulate', tipsForFinding: 'Sidewalks, parking lots, or stores' },
  { id: 'sign-012', name: 'Bee', emoji: '🐝', category: 'nature', rarity: 'whispered', unlockDay: 1, description: 'A bee buzzing near you', meaning: 'Productivity and community', tipsForFinding: 'Gardens, flowers, or outdoor cafes' },
  { id: 'sign-013', name: 'Acorn', emoji: '🌰', category: 'nature', rarity: 'whispered', unlockDay: 1, description: 'Finding an acorn', meaning: 'Great things from small beginnings', tipsForFinding: 'Under oak trees, parks' },
  { id: 'sign-014', name: 'Seashell', emoji: '🐚', category: 'nature', rarity: 'whispered', unlockDay: 1, description: 'Finding a seashell', meaning: 'Listen to your inner voice', tipsForFinding: 'Beaches, decorations, or gift shops' },
  { id: 'sign-015', name: 'Pinecone', emoji: '🌲', category: 'nature', rarity: 'whispered', unlockDay: 1, description: 'Finding a pinecone', meaning: 'Enlightenment and regeneration', tipsForFinding: 'Under pine trees, parks' },
  { id: 'sign-016', name: 'Leaf', emoji: '🍃', category: 'nature', rarity: 'whispered', unlockDay: 1, description: 'A leaf falling near you', meaning: 'Let go of what no longer serves you', tipsForFinding: 'Under trees, especially in autumn' },
  { id: 'sign-017', name: 'Sparrow', emoji: '🐦', category: 'nature', rarity: 'whispered', unlockDay: 1, description: 'Seeing a sparrow', meaning: 'Joy in simple things', tipsForFinding: 'Parks, gardens, or near buildings' },
  { id: 'sign-018', name: 'Clover', emoji: '☘️', category: 'nature', rarity: 'whispered', unlockDay: 1, description: 'Finding a three-leaf clover', meaning: 'Faith, hope, and love', tipsForFinding: 'Grass areas, lawns' },
  { id: 'sign-019', name: 'Balloon', emoji: '🎈', category: 'objects', rarity: 'whispered', unlockDay: 1, description: 'Seeing a balloon', meaning: 'Lighten up and have fun', tipsForFinding: 'Parties, stores, or floating in sky' },
  { id: 'sign-020', name: 'Daisy', emoji: '🌼', category: 'nature', rarity: 'whispered', unlockDay: 1, description: 'Seeing a daisy', meaning: 'Innocence and new beginnings', tipsForFinding: 'Gardens, fields, or flower shops' },
  { id: 'sign-021', name: 'Snail', emoji: '🐌', category: 'nature', rarity: 'whispered', unlockDay: 2, description: 'Spotting a snail', meaning: 'Patience brings rewards', tipsForFinding: 'Gardens after rain, shady areas' },
  { id: 'sign-022', name: 'Puddle Reflection', emoji: '💧', category: 'nature', rarity: 'whispered', unlockDay: 2, description: 'Seeing your reflection in a puddle', meaning: 'Self-reflection is needed', tipsForFinding: 'After rain, near water' },
  { id: 'sign-023', name: 'Wind Chime', emoji: '🎐', category: 'objects', rarity: 'whispered', unlockDay: 2, description: 'Hearing wind chimes', meaning: 'Spirit is communicating', tipsForFinding: 'Porches, gardens, or shops' },
  { id: 'sign-024', name: 'Candle', emoji: '🕯️', category: 'objects', rarity: 'whispered', unlockDay: 2, description: 'Noticing a lit candle', meaning: 'Hope and guidance', tipsForFinding: 'Restaurants, homes, or stores' },
  { id: 'sign-025', name: 'Key', emoji: '🔑', category: 'objects', rarity: 'whispered', unlockDay: 2, description: 'Finding or seeing a key', meaning: 'New opportunities unlocking', tipsForFinding: 'Ground, decorations, or jewelry' },
  { id: 'sign-026', name: 'Butterfly Bush', emoji: '🌸', category: 'nature', rarity: 'whispered', unlockDay: 2, description: 'Seeing a flowering bush', meaning: 'Growth and attraction', tipsForFinding: 'Gardens, parks, or yards' },
  { id: 'sign-027', name: 'Squirrel', emoji: '🐿️', category: 'nature', rarity: 'whispered', unlockDay: 2, description: 'Watching a squirrel', meaning: 'Prepare for the future', tipsForFinding: 'Parks, trees, or backyards' },
  { id: 'sign-028', name: 'Mushroom', emoji: '🍄', category: 'nature', rarity: 'whispered', unlockDay: 2, description: 'Finding a mushroom', meaning: 'Hidden growth happening', tipsForFinding: 'Forests, lawns after rain' },
  { id: 'sign-029', name: 'Spider Web', emoji: '🕸️', category: 'nature', rarity: 'whispered', unlockDay: 2, description: 'Seeing an intact spider web', meaning: 'Creativity and patience', tipsForFinding: 'Corners, gardens, or bushes' },
  { id: 'sign-030', name: 'Smooth Stone', emoji: '🪨', category: 'nature', rarity: 'whispered', unlockDay: 2, description: 'Finding a smooth stone', meaning: 'Stability and grounding', tipsForFinding: 'Rivers, beaches, or paths' },
  { id: 'sign-031', name: 'Bird Song', emoji: '🎵', category: 'nature', rarity: 'whispered', unlockDay: 3, description: 'Hearing beautiful bird song', meaning: 'Joy is coming', tipsForFinding: 'Morning, parks, or gardens' },
  { id: 'sign-032', name: 'Flower Petal', emoji: '🌸', category: 'nature', rarity: 'whispered', unlockDay: 3, description: 'Finding a fallen flower petal', meaning: 'Beauty in impermanence', tipsForFinding: 'Under flowering trees or bushes' },
  { id: 'sign-033', name: 'Caterpillar', emoji: '🐛', category: 'nature', rarity: 'whispered', unlockDay: 3, description: 'Spotting a caterpillar', meaning: 'Transformation is coming', tipsForFinding: 'Leaves, plants, or gardens' },
  { id: 'sign-034', name: 'Dewdrop', emoji: '💧', category: 'nature', rarity: 'whispered', unlockDay: 3, description: 'Seeing dewdrops on plants', meaning: 'Fresh start and clarity', tipsForFinding: 'Early morning on grass or leaves' },
  { id: 'sign-035', name: 'Frog', emoji: '🐸', category: 'nature', rarity: 'whispered', unlockDay: 3, description: 'Seeing or hearing a frog', meaning: 'Cleansing and renewal', tipsForFinding: 'Near water, ponds, or after rain' },
  { id: 'sign-036', name: 'Moss', emoji: '🌿', category: 'nature', rarity: 'whispered', unlockDay: 3, description: 'Finding soft moss', meaning: 'Nurturing and patience', tipsForFinding: 'Rocks, trees, or shady areas' },
  { id: 'sign-037', name: 'Wishing Well', emoji: '⛲', category: 'objects', rarity: 'whispered', unlockDay: 3, description: 'Seeing a fountain or well', meaning: 'Make a wish', tipsForFinding: 'Parks, malls, or town centers' },
  { id: 'sign-038', name: 'Bookmark', emoji: '📑', category: 'objects', rarity: 'whispered', unlockDay: 3, description: 'Finding a bookmark', meaning: 'Remember where you are', tipsForFinding: 'Books, libraries, or stores' },
  { id: 'sign-039', name: 'Ribbon', emoji: '🎀', category: 'objects', rarity: 'whispered', unlockDay: 3, description: 'Finding a ribbon', meaning: 'Gifts are coming', tipsForFinding: 'Ground, decorations, or stores' },
  { id: 'sign-040', name: 'Seed', emoji: '🌱', category: 'nature', rarity: 'whispered', unlockDay: 3, description: 'Finding a seed', meaning: 'Plant intentions now', tipsForFinding: 'Ground, plants, or bird feeders' },

  // SPOKEN (Uncommon) - 30 signs, unlock from Day 4
  { id: 'sign-041', name: 'Rainbow', emoji: '🌈', category: 'sky', rarity: 'spoken', unlockDay: 4, description: 'Seeing a rainbow after rain', meaning: 'Promise of good things to come', tipsForFinding: 'Look to the sky after rain when sun appears' },
  { id: 'sign-042', name: 'Red Door', emoji: '🚪', category: 'objects', rarity: 'spoken', unlockDay: 4, description: 'Noticing a red door', meaning: 'New opportunities opening', tipsForFinding: 'Walk through neighborhoods mindfully' },
  { id: 'sign-043', name: 'Blue Bird', emoji: '🐦', category: 'nature', rarity: 'spoken', unlockDay: 4, description: 'Spotting a blue bird', meaning: 'Happiness and joy approaching', tipsForFinding: 'Parks, gardens, or near trees' },
  { id: 'sign-044', name: 'Heart Shape', emoji: '💚', category: 'patterns', rarity: 'spoken', unlockDay: 4, description: 'Finding a heart shape in nature', meaning: 'Love surrounds you', tipsForFinding: 'Leaves, clouds, puddles, or stones' },
  { id: 'sign-045', name: 'Dragonfly', emoji: '🪰', category: 'nature', rarity: 'spoken', unlockDay: 4, description: 'A dragonfly appearing', meaning: 'Change and self-realization', tipsForFinding: 'Near water, gardens, or meadows' },
  { id: 'sign-046', name: 'Cardinal', emoji: '🐦', category: 'nature', rarity: 'spoken', unlockDay: 4, description: 'Spotting a red cardinal', meaning: 'Loved ones watching over you', tipsForFinding: 'Backyards, parks, or forests' },
  { id: 'sign-047', name: 'Full Moon', emoji: '🌕', category: 'sky', rarity: 'spoken', unlockDay: 4, description: 'Witnessing a full moon', meaning: 'Completion and manifestation', tipsForFinding: 'Clear night skies' },
  { id: 'sign-048', name: 'Horseshoe', emoji: '🧲', category: 'objects', rarity: 'spoken', unlockDay: 4, description: 'Seeing a horseshoe', meaning: 'Luck is on your side', tipsForFinding: 'Farms, decorations, or antique shops' },
  { id: 'sign-049', name: 'Turtle', emoji: '🐢', category: 'nature', rarity: 'spoken', unlockDay: 5, description: 'Seeing a turtle', meaning: 'Slow and steady wins', tipsForFinding: 'Ponds, beaches, or pet stores' },
  { id: 'sign-050', name: 'Prism Light', emoji: '🌈', category: 'patterns', rarity: 'spoken', unlockDay: 5, description: 'Seeing rainbow light through glass', meaning: 'Magic in the ordinary', tipsForFinding: 'Windows, crystals, or water' },
  { id: 'sign-051', name: 'Rabbit', emoji: '🐰', category: 'nature', rarity: 'spoken', unlockDay: 5, description: 'Spotting a rabbit', meaning: 'Fertility and abundance', tipsForFinding: 'Parks, fields, or gardens at dawn/dusk' },
  { id: 'sign-052', name: 'Crescent Moon', emoji: '🌙', category: 'sky', rarity: 'spoken', unlockDay: 5, description: 'Seeing a crescent moon', meaning: 'New beginnings', tipsForFinding: 'Evening or early morning sky' },
  { id: 'sign-053', name: 'Kite', emoji: '🪁', category: 'objects', rarity: 'spoken', unlockDay: 5, description: 'Seeing a kite flying', meaning: 'Freedom and aspiration', tipsForFinding: 'Parks, beaches, or windy days' },
  { id: 'sign-054', name: 'Heron', emoji: '🦢', category: 'nature', rarity: 'spoken', unlockDay: 5, description: 'Seeing a heron', meaning: 'Self-reliance and determination', tipsForFinding: 'Near water, marshes, or lakes' },
  { id: 'sign-055', name: 'Sunrise', emoji: '🌅', category: 'sky', rarity: 'spoken', unlockDay: 5, description: 'Witnessing a sunrise', meaning: 'New day, new possibilities', tipsForFinding: 'East-facing views, early morning' },
  { id: 'sign-056', name: 'Sunset', emoji: '🌇', category: 'sky', rarity: 'spoken', unlockDay: 5, description: 'Witnessing a sunset', meaning: 'Completion and gratitude', tipsForFinding: 'West-facing views, evening' },
  { id: 'sign-057', name: 'Owl Feather', emoji: '🪶', category: 'nature', rarity: 'spoken', unlockDay: 6, description: 'Finding an owl feather', meaning: 'Wisdom is coming', tipsForFinding: 'Forests, parks, or wooded areas' },
  { id: 'sign-058', name: 'Compass', emoji: '🧭', category: 'objects', rarity: 'spoken', unlockDay: 6, description: 'Seeing a compass', meaning: 'Trust your direction', tipsForFinding: 'Stores, decorations, or outdoors' },
  { id: 'sign-059', name: 'Lighthouse', emoji: '🏠', category: 'objects', rarity: 'spoken', unlockDay: 6, description: 'Seeing a lighthouse image', meaning: 'Guidance through darkness', tipsForFinding: 'Art, decorations, or coastal areas' },
  { id: 'sign-060', name: 'Swan', emoji: '🦢', category: 'nature', rarity: 'spoken', unlockDay: 6, description: 'Seeing a swan', meaning: 'Grace and transformation', tipsForFinding: 'Lakes, ponds, or parks' },
  { id: 'sign-061', name: 'Peacock', emoji: '🦚', category: 'nature', rarity: 'spoken', unlockDay: 6, description: 'Seeing a peacock or its feather', meaning: 'Beauty and confidence', tipsForFinding: 'Zoos, gardens, or decorations' },
  { id: 'sign-062', name: 'Anchor', emoji: '⚓', category: 'objects', rarity: 'spoken', unlockDay: 6, description: 'Seeing an anchor symbol', meaning: 'Stay grounded and hopeful', tipsForFinding: 'Jewelry, decorations, or coastal areas' },
  { id: 'sign-063', name: 'Infinity Symbol', emoji: '♾️', category: 'patterns', rarity: 'spoken', unlockDay: 6, description: 'Seeing an infinity symbol', meaning: 'Endless possibilities', tipsForFinding: 'Jewelry, art, or decorations' },
  { id: 'sign-064', name: 'Lotus', emoji: '🪷', category: 'nature', rarity: 'spoken', unlockDay: 7, description: 'Seeing a lotus flower', meaning: 'Rising above challenges', tipsForFinding: 'Ponds, art, or spiritual shops' },
  { id: 'sign-065', name: 'Dove', emoji: '🕊️', category: 'nature', rarity: 'spoken', unlockDay: 7, description: 'Seeing a white dove', meaning: 'Peace and divine blessing', tipsForFinding: 'Parks, churches, or open areas' },
  { id: 'sign-066', name: 'Crystal', emoji: '💎', category: 'objects', rarity: 'spoken', unlockDay: 7, description: 'Finding or seeing a crystal', meaning: 'Clarity and healing', tipsForFinding: 'Shops, decorations, or nature' },
  { id: 'sign-067', name: 'Spiral', emoji: '🌀', category: 'patterns', rarity: 'spoken', unlockDay: 7, description: 'Seeing a spiral pattern', meaning: 'Evolution and growth', tipsForFinding: 'Shells, plants, or art' },
  { id: 'sign-068', name: 'Star Pattern', emoji: '⭐', category: 'patterns', rarity: 'spoken', unlockDay: 7, description: 'Seeing a star pattern', meaning: 'You are guided', tipsForFinding: 'Decorations, nature, or sky' },
  { id: 'sign-069', name: 'Butterfly Pair', emoji: '🦋', category: 'nature', rarity: 'spoken', unlockDay: 7, description: 'Seeing two butterflies together', meaning: 'Partnership and harmony', tipsForFinding: 'Gardens, parks, or sunny areas' },
  { id: 'sign-070', name: 'Golden Light', emoji: '✨', category: 'patterns', rarity: 'spoken', unlockDay: 7, description: 'Seeing golden sunlight', meaning: 'Divine presence', tipsForFinding: 'Golden hour, through windows' },

  // SHOUTED (Rare) - 20 signs, unlock from Day 7
  { id: 'sign-071', name: 'Shooting Star', emoji: '⭐', category: 'sky', rarity: 'shouted', unlockDay: 7, description: 'Witnessing a shooting star', meaning: 'Your wish is being heard', tipsForFinding: 'Clear night skies, away from city lights' },
  { id: 'sign-072', name: 'Owl', emoji: '🦉', category: 'nature', rarity: 'shouted', unlockDay: 7, description: 'Seeing or hearing an owl', meaning: 'Wisdom and intuition', tipsForFinding: 'Evening walks, wooded areas' },
  { id: 'sign-073', name: 'Hawk', emoji: '🦅', category: 'nature', rarity: 'shouted', unlockDay: 7, description: 'A hawk circling overhead', meaning: 'Vision and perspective', tipsForFinding: 'Open fields, highways, or hilltops' },
  { id: 'sign-074', name: 'Deer', emoji: '🦌', category: 'nature', rarity: 'shouted', unlockDay: 7, description: 'Encountering a deer', meaning: 'Gentleness and new adventures', tipsForFinding: 'Wooded areas, parks, or rural roads' },
  { id: 'sign-075', name: 'Double Rainbow', emoji: '🌈', category: 'sky', rarity: 'shouted', unlockDay: 10, description: 'Seeing a double rainbow', meaning: 'Transformation complete', tipsForFinding: 'After storms, facing away from sun' },
  { id: 'sign-076', name: 'Eagle', emoji: '🦅', category: 'nature', rarity: 'shouted', unlockDay: 10, description: 'Seeing an eagle', meaning: 'Divine connection and freedom', tipsForFinding: 'Mountains, large bodies of water' },
  { id: 'sign-077', name: 'Fox', emoji: '🦊', category: 'nature', rarity: 'shouted', unlockDay: 10, description: 'Spotting a fox', meaning: 'Cleverness and adaptability', tipsForFinding: 'Dawn/dusk, wooded areas' },
  { id: 'sign-078', name: 'Northern Lights', emoji: '🌌', category: 'sky', rarity: 'shouted', unlockDay: 14, description: 'Seeing aurora borealis', meaning: 'Magic is real', tipsForFinding: 'Northern latitudes, clear nights' },
  { id: 'sign-079', name: 'Whale', emoji: '🐋', category: 'nature', rarity: 'shouted', unlockDay: 14, description: 'Seeing a whale', meaning: 'Deep wisdom and emotion', tipsForFinding: 'Ocean, whale watching tours' },
  { id: 'sign-080', name: 'Dolphin', emoji: '🐬', category: 'nature', rarity: 'shouted', unlockDay: 14, description: 'Seeing dolphins', meaning: 'Joy and playfulness', tipsForFinding: 'Ocean, coastal areas' },
  { id: 'sign-081', name: 'Meteor Shower', emoji: '☄️', category: 'sky', rarity: 'shouted', unlockDay: 14, description: 'Witnessing a meteor shower', meaning: 'Wishes multiplied', tipsForFinding: 'Check astronomy calendars, dark skies' },
  { id: 'sign-082', name: 'Bald Eagle', emoji: '🦅', category: 'nature', rarity: 'shouted', unlockDay: 21, description: 'Seeing a bald eagle', meaning: 'Spiritual protection', tipsForFinding: 'Near large bodies of water' },
  { id: 'sign-083', name: 'Wolf', emoji: '🐺', category: 'nature', rarity: 'shouted', unlockDay: 21, description: 'Seeing or hearing a wolf', meaning: 'Trust your instincts', tipsForFinding: 'Wildlife areas, sanctuaries' },
  { id: 'sign-084', name: 'Lunar Eclipse', emoji: '🌑', category: 'sky', rarity: 'shouted', unlockDay: 21, description: 'Witnessing a lunar eclipse', meaning: 'Major transformation', tipsForFinding: 'Check astronomy calendars' },
  { id: 'sign-085', name: 'Solar Eclipse', emoji: '🌘', category: 'sky', rarity: 'shouted', unlockDay: 21, description: 'Witnessing a solar eclipse', meaning: 'New chapter beginning', tipsForFinding: 'Check astronomy calendars, proper eye protection' },
  { id: 'sign-086', name: 'Firefly Swarm', emoji: '✨', category: 'nature', rarity: 'shouted', unlockDay: 28, description: 'Seeing many fireflies', meaning: 'Magic surrounds you', tipsForFinding: 'Summer evenings, near water' },
  { id: 'sign-087', name: 'Rare Bird', emoji: '🦜', category: 'nature', rarity: 'shouted', unlockDay: 28, description: 'Seeing an unusual bird species', meaning: 'Unique message for you', tipsForFinding: 'Nature reserves, migration seasons' },
  { id: 'sign-088', name: 'Perfect Circle', emoji: '⭕', category: 'patterns', rarity: 'shouted', unlockDay: 28, description: 'Finding a perfect circle in nature', meaning: 'Completion and wholeness', tipsForFinding: 'Tree rings, stones, or ripples' },
  { id: 'sign-089', name: 'Lightning', emoji: '⚡', category: 'sky', rarity: 'shouted', unlockDay: 28, description: 'Seeing lightning strike', meaning: 'Sudden inspiration', tipsForFinding: 'During storms, from safe distance' },
  { id: 'sign-090', name: 'Comet', emoji: '☄️', category: 'sky', rarity: 'shouted', unlockDay: 30, description: 'Seeing a comet', meaning: 'Once-in-a-lifetime opportunity', tipsForFinding: 'Check astronomy news, dark skies' },

  // THUNDERED (Epic) - 8 signs, unlock from Day 10+
  { id: 'sign-091', name: 'Four-Leaf Clover', emoji: '🍀', category: 'nature', rarity: 'thundered', unlockDay: 10, description: 'Finding a four-leaf clover', meaning: 'Exceptional luck and rare blessings', tipsForFinding: 'Clover patches in grass areas' },
  { id: 'sign-092', name: 'Hummingbird', emoji: '🐦', category: 'nature', rarity: 'thundered', unlockDay: 10, description: 'Seeing a hummingbird', meaning: 'Joy and lightness of being', tipsForFinding: 'Gardens with flowers, feeders' },
  { id: 'sign-093', name: 'Bioluminescence', emoji: '💫', category: 'nature', rarity: 'thundered', unlockDay: 30, description: 'Seeing bioluminescent water', meaning: 'Magic exists in nature', tipsForFinding: 'Certain beaches at night' },
  { id: 'sign-094', name: 'Perfect Snowflake', emoji: '❄️', category: 'nature', rarity: 'thundered', unlockDay: 30, description: 'Catching a perfect snowflake', meaning: 'You are unique and perfect', tipsForFinding: 'During gentle snowfall' },
  { id: 'sign-095', name: 'Monarch Migration', emoji: '🦋', category: 'nature', rarity: 'thundered', unlockDay: 60, description: 'Witnessing monarch butterfly migration', meaning: 'Trust the journey', tipsForFinding: 'Migration routes, fall season' },
  { id: 'sign-096', name: 'Wild Horse', emoji: '🐴', category: 'nature', rarity: 'thundered', unlockDay: 60, description: 'Seeing wild horses', meaning: 'Freedom and power', tipsForFinding: 'Wild horse territories' },
  { id: 'sign-097', name: 'Aurora', emoji: '🌌', category: 'sky', rarity: 'thundered', unlockDay: 90, description: 'Seeing aurora in unexpected place', meaning: 'Universe is speaking directly', tipsForFinding: 'During solar storms, check alerts' },
  { id: 'sign-098', name: 'Supermoon', emoji: '🌕', category: 'sky', rarity: 'thundered', unlockDay: 90, description: 'Witnessing a supermoon', meaning: 'Amplified manifestation power', tipsForFinding: 'Check lunar calendars' },

  // COSMOS ALIGNED (Legendary) - 2 signs, unlock from Day 100+
  { id: 'sign-099', name: 'Planetary Alignment', emoji: '🪐', category: 'sky', rarity: 'cosmos_aligned', unlockDay: 100, description: 'Seeing multiple planets aligned', meaning: 'Cosmic forces supporting you', tipsForFinding: 'Check astronomy calendars, clear nights' },
  { id: 'sign-100', name: 'Total Eclipse', emoji: '🌑', category: 'sky', rarity: 'cosmos_aligned', unlockDay: 100, description: 'Witnessing a total solar eclipse', meaning: 'Complete transformation and rebirth', tipsForFinding: 'Eclipse paths, proper eye protection' },
];

interface SignsState {
  // Active signs (currently assigned to user)
  activeSigns: ActiveSign[];
  // Sign logs (history of found signs)
  signLogs: SignLog[];
  // Loading state
  isLoading: boolean;
  error: string | null;

  // Actions
  assignDailySigns: (userDay: number) => void;
  logSign: (signId: string, locationNote?: string) => Promise<{ success: boolean; sparksEarned: number; error?: string }>;
  getAvailableSigns: (userDay: number) => Sign[];
  getActiveSignDetails: () => (Sign & { assignedAt: Date; expiresAt: Date })[];
  getSignById: (signId: string) => Sign | undefined;
  getSignLogs: () => SignLog[];
  hasLoggedSignToday: (signId: string) => boolean;
  generateUniverseReceipt: (signLogId: string) => Promise<{ success: boolean; receiptUrl?: string; error?: string }>;
  clearError: () => void;
}

export const useSignsStore = create<SignsState>()(
  persist(
    (set, get) => ({
      activeSigns: [],
      signLogs: [],
      isLoading: false,
      error: null,

      // Assign daily signs based on user's current day
      assignDailySigns: (userDay: number) => {
        const availableSigns = get().getAvailableSigns(userDay);
        const activeSigns = get().activeSigns;

        // Filter out signs that are still active (not expired)
        const now = new Date();
        const stillActive = activeSigns.filter(as => new Date(as.expiresAt) > now);

        // If user already has 3 active signs, don't assign more
        if (stillActive.length >= 3) {
          set({ activeSigns: stillActive });
          return;
        }

        // Get signs that aren't already active
        const activeSignIds = new Set(stillActive.map(as => as.signId));
        const eligibleSigns = availableSigns.filter(s => !activeSignIds.has(s.id));

        // Randomly select signs to fill up to 3
        const numToAssign = 3 - stillActive.length;
        const shuffled = [...eligibleSigns].sort(() => Math.random() - 0.5);
        const newSigns = shuffled.slice(0, numToAssign);

        // Create active sign entries with 24-hour expiry
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24);

        const newActiveSigns: ActiveSign[] = newSigns.map(sign => ({
          signId: sign.id,
          assignedAt: now,
          expiresAt,
        }));

        set({ activeSigns: [...stillActive, ...newActiveSigns] });
      },

      // Log a found sign
      logSign: async (signId: string, locationNote?: string) => {
        const sign = get().getSignById(signId);
        if (!sign) {
          return { success: false, sparksEarned: 0, error: 'Sign not found' };
        }

        // Check if already logged today
        if (get().hasLoggedSignToday(signId)) {
          return { success: false, sparksEarned: 0, error: 'You already logged this sign today' };
        }

        const sparksEarned = RARITY_SPARKS[sign.rarity];
        const newLog: SignLog = {
          id: `log-${Date.now()}`,
          signId,
          foundAt: new Date(),
          locationNote,
          sparksEarned,
          receiptGenerated: false,
        };

        // Try to save to Supabase if configured
        const supabase = getSupabase();
        if (supabase) {
          try {
            set({ isLoading: true });
            // Note: This would need the user ID from auth store
            // For now, we just save locally
          } catch (err) {
            console.error('Failed to save sign log to Supabase:', err);
          } finally {
            set({ isLoading: false });
          }
        }

        // Update local state
        set(state => ({
          signLogs: [...state.signLogs, newLog],
          // Remove from active signs if it was active
          activeSigns: state.activeSigns.filter(as => as.signId !== signId),
        }));

        return { success: true, sparksEarned };
      },

      // Get signs available for the user's current day
      getAvailableSigns: (userDay: number) => {
        return SIGNS_DATABASE.filter(sign => sign.unlockDay <= userDay);
      },

      // Get details of active signs
      getActiveSignDetails: () => {
        const activeSigns = get().activeSigns;
        return activeSigns
          .map(as => {
            const sign = get().getSignById(as.signId);
            if (!sign) return null;
            return {
              ...sign,
              assignedAt: new Date(as.assignedAt),
              expiresAt: new Date(as.expiresAt),
            };
          })
          .filter((s): s is Sign & { assignedAt: Date; expiresAt: Date } => s !== null);
      },

      // Get sign by ID
      getSignById: (signId: string) => {
        return SIGNS_DATABASE.find(s => s.id === signId);
      },

      // Get all sign logs
      getSignLogs: () => {
        return get().signLogs;
      },

      // Check if sign was logged today
      hasLoggedSignToday: (signId: string) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return get().signLogs.some(log => {
          const logDate = new Date(log.foundAt);
          logDate.setHours(0, 0, 0, 0);
          return log.signId === signId && logDate.getTime() === today.getTime();
        });
      },

      // Generate Universe Receipt for a sign log
      generateUniverseReceipt: async (signLogId: string) => {
        const log = get().signLogs.find(l => l.id === signLogId);
        if (!log) {
          return { success: false, error: 'Sign log not found' };
        }

        const sign = get().getSignById(log.signId);
        if (!sign) {
          return { success: false, error: 'Sign not found' };
        }

        const receiptUrl = `receipt-${signLogId}`;

        // Update the log with receipt info
        set(state => ({
          signLogs: state.signLogs.map(l =>
            l.id === signLogId
              ? { ...l, receiptGenerated: true, receiptUrl }
              : l
          ),
        }));

        return { success: true, receiptUrl };
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'signroad-signs-storage',
      partialize: (state) => ({
        activeSigns: state.activeSigns,
        signLogs: state.signLogs,
      }),
    }
  )
);
