import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Sign, SignRarity } from '../types';
import { api } from '../services/api';

// SignCategory type for reference (exported from types)
export type SignCategory = 'nature' | 'numbers' | 'animals' | 'symbols' | 'colors' | 'sounds' | 'synchronicity';

// PRD Sign Rarity Distribution:
// Whispered: 70% - Everyday occurrences, reliably findable
// Spoken: 20% - Requires moderate awareness
// Shouted: 7% - Noticeable synchronicities
// Thundered: 2.5% - Rare moments users remember
// Cosmos-Aligned: 0.5% - Mythic events, screenshot-worthy

export const RARITY_PROBABILITIES: Record<SignRarity, number> = {
  whispered: 0.70,
  spoken: 0.20,
  shouted: 0.07,
  thundered: 0.025,
  cosmos_aligned: 0.005,
};

// PRD: 100 signs database - comprehensive set across all categories
export const SIGNS_DATABASE: Sign[] = [
  // NATURE (20)
  { id: 'sign-1', name: 'White Feather', emoji: '🪶', category: 'nature', rarity: 'whispered', rarityProbability: 70, unlockDay: 1, meaning: 'Angels are near', description: 'A white feather appearing in your path', tipsForFinding: 'Look on sidewalks, near trees', isActive: true },
  { id: 'sign-2', name: 'Rainbow', emoji: '🌈', category: 'nature', rarity: 'spoken', rarityProbability: 20, unlockDay: 1, meaning: 'Promise of good things', description: 'A rainbow appearing after rain', tipsForFinding: 'Look to the sky after rain', isActive: true },
  { id: 'sign-3', name: 'Four-Leaf Clover', emoji: '🍀', category: 'nature', rarity: 'thundered', rarityProbability: 2.5, unlockDay: 7, meaning: 'Exceptional luck coming', description: 'Finding a four-leaf clover', tipsForFinding: 'Search in clover patches', isActive: true },
  { id: 'sign-4', name: 'Shooting Star', emoji: '🌠', category: 'nature', rarity: 'cosmos_aligned', rarityProbability: 0.5, unlockDay: 14, meaning: 'Wishes being granted', description: 'Witnessing a shooting star', tipsForFinding: 'Look up at night', isActive: true },
  { id: 'sign-5', name: 'Sunrise', emoji: '🌅', category: 'nature', rarity: 'whispered', rarityProbability: 70, unlockDay: 1, meaning: 'New beginnings', description: 'Witnessing a beautiful sunrise', tipsForFinding: 'Wake early and face east', isActive: true },
  { id: 'sign-6', name: 'Full Moon', emoji: '🌕', category: 'nature', rarity: 'spoken', rarityProbability: 20, unlockDay: 3, meaning: 'Completion and clarity', description: 'Seeing the full moon clearly', tipsForFinding: 'Check lunar calendar', isActive: true },
  { id: 'sign-7', name: 'Blooming Flower', emoji: '🌸', category: 'nature', rarity: 'whispered', rarityProbability: 70, unlockDay: 1, meaning: 'Growth and beauty', description: 'Noticing a flower blooming', tipsForFinding: 'Pay attention to gardens', isActive: true },
  { id: 'sign-8', name: 'Falling Leaf', emoji: '🍂', category: 'nature', rarity: 'whispered', rarityProbability: 70, unlockDay: 1, meaning: 'Letting go', description: 'A leaf falling in front of you', tipsForFinding: 'Walk under trees', isActive: true },
  { id: 'sign-9', name: 'Cloud Shape', emoji: '☁️', category: 'nature', rarity: 'spoken', rarityProbability: 20, unlockDay: 2, meaning: 'Messages from above', description: 'Seeing a meaningful shape in clouds', tipsForFinding: 'Watch the sky', isActive: true },
  { id: 'sign-10', name: 'Double Rainbow', emoji: '🌈', category: 'nature', rarity: 'shouted', rarityProbability: 7, unlockDay: 10, meaning: 'Transformation complete', description: 'Witnessing a double rainbow', tipsForFinding: 'Look after storms', isActive: true },
  { id: 'sign-11', name: 'Dewdrops', emoji: '💧', category: 'nature', rarity: 'whispered', rarityProbability: 70, unlockDay: 1, meaning: 'Fresh start', description: 'Morning dewdrops on plants', tipsForFinding: 'Walk outside early', isActive: true },
  { id: 'sign-12', name: 'Lightning', emoji: '⚡', category: 'nature', rarity: 'spoken', rarityProbability: 20, unlockDay: 5, meaning: 'Sudden insight', description: 'Seeing lightning', tipsForFinding: 'Watch storms safely', isActive: true },
  { id: 'sign-13', name: 'Ocean Wave', emoji: '🌊', category: 'nature', rarity: 'whispered', rarityProbability: 70, unlockDay: 1, meaning: 'Emotional release', description: 'A powerful wave', tipsForFinding: 'Visit the beach', isActive: true },
  { id: 'sign-14', name: 'Mountain Peak', emoji: '🏔️', category: 'nature', rarity: 'spoken', rarityProbability: 20, unlockDay: 4, meaning: 'Achievement ahead', description: 'Seeing a mountain peak', tipsForFinding: 'Look toward mountains', isActive: true },
  { id: 'sign-15', name: 'Northern Lights', emoji: '🌌', category: 'nature', rarity: 'cosmos_aligned', rarityProbability: 0.5, unlockDay: 21, meaning: 'Cosmic alignment', description: 'Witnessing aurora', tipsForFinding: 'Travel north', isActive: true },
  { id: 'sign-16', name: 'Sunset', emoji: '🌇', category: 'nature', rarity: 'whispered', rarityProbability: 70, unlockDay: 1, meaning: 'Peaceful endings', description: 'A beautiful sunset', tipsForFinding: 'Face west evening', isActive: true },
  { id: 'sign-17', name: 'Starry Night', emoji: '✨', category: 'nature', rarity: 'whispered', rarityProbability: 70, unlockDay: 2, meaning: 'Infinite possibilities', description: 'Clear view of stars', tipsForFinding: 'Low light pollution', isActive: true },
  { id: 'sign-18', name: 'Fog', emoji: '🌫️', category: 'nature', rarity: 'spoken', rarityProbability: 20, unlockDay: 6, meaning: 'Mystery unfolding', description: 'Walking through fog', tipsForFinding: 'Misty mornings', isActive: true },
  { id: 'sign-19', name: 'Waterfall', emoji: '💦', category: 'nature', rarity: 'shouted', rarityProbability: 7, unlockDay: 8, meaning: 'Abundance flowing', description: 'Encountering a waterfall', tipsForFinding: 'Hike to waterfalls', isActive: true },
  { id: 'sign-20', name: 'Eclipse', emoji: '🌑', category: 'nature', rarity: 'cosmos_aligned', rarityProbability: 0.5, unlockDay: 30, meaning: 'Major life shift', description: 'Witnessing an eclipse', tipsForFinding: 'Check calendars', isActive: true },
  // ANIMALS (20)
  { id: 'sign-21', name: 'Butterfly', emoji: '🦋', category: 'animals', rarity: 'whispered', rarityProbability: 70, unlockDay: 1, meaning: 'Transformation', description: 'A butterfly crossing your path', tipsForFinding: 'Visit gardens', isActive: true },
  { id: 'sign-22', name: 'Cardinal', emoji: '🐦', category: 'animals', rarity: 'spoken', rarityProbability: 20, unlockDay: 3, meaning: 'Loved ones watching', description: 'Seeing a red cardinal', tipsForFinding: 'Near bird feeders', isActive: true },
  { id: 'sign-23', name: 'Owl', emoji: '🦉', category: 'animals', rarity: 'shouted', rarityProbability: 7, unlockDay: 7, meaning: 'Wisdom incoming', description: 'Hearing or seeing an owl', tipsForFinding: 'Listen at dusk', isActive: true },
  { id: 'sign-24', name: 'Dragonfly', emoji: '🪰', category: 'animals', rarity: 'spoken', rarityProbability: 20, unlockDay: 4, meaning: 'Change and adaptability', description: 'A dragonfly landing near', tipsForFinding: 'Visit ponds', isActive: true },
  { id: 'sign-25', name: 'Ladybug', emoji: '🐞', category: 'animals', rarity: 'whispered', rarityProbability: 70, unlockDay: 1, meaning: 'Good luck', description: 'A ladybug landing on you', tipsForFinding: 'Spend time in gardens', isActive: true },
  { id: 'sign-26', name: 'Hummingbird', emoji: '🐦', category: 'animals', rarity: 'shouted', rarityProbability: 7, unlockDay: 9, meaning: 'Joy and lightness', description: 'Seeing a hummingbird', tipsForFinding: 'Plant flowers', isActive: true },
  { id: 'sign-27', name: 'Deer', emoji: '🦌', category: 'animals', rarity: 'spoken', rarityProbability: 20, unlockDay: 5, meaning: 'Gentleness and grace', description: 'Encountering a deer', tipsForFinding: 'Wooded areas at dawn', isActive: true },
  { id: 'sign-28', name: 'Hawk', emoji: '🦅', category: 'animals', rarity: 'spoken', rarityProbability: 20, unlockDay: 6, meaning: 'Vision and focus', description: 'A hawk circling overhead', tipsForFinding: 'Look up in open areas', isActive: true },
  { id: 'sign-29', name: 'Cat Crossing', emoji: '🐱', category: 'animals', rarity: 'whispered', rarityProbability: 70, unlockDay: 1, meaning: 'Independence', description: 'A cat crossing your path', tipsForFinding: 'Walk neighborhoods', isActive: true },
  { id: 'sign-30', name: 'Dog Greeting', emoji: '🐕', category: 'animals', rarity: 'whispered', rarityProbability: 70, unlockDay: 1, meaning: 'Loyalty and friendship', description: 'A friendly dog approaching', tipsForFinding: 'Visit dog parks', isActive: true },
  { id: 'sign-31', name: 'Spider Web', emoji: '🕸️', category: 'animals', rarity: 'whispered', rarityProbability: 70, unlockDay: 2, meaning: 'Creativity weaving', description: 'Noticing a spider web', tipsForFinding: 'Look in corners', isActive: true },
  { id: 'sign-32', name: 'Bee', emoji: '🐝', category: 'animals', rarity: 'whispered', rarityProbability: 70, unlockDay: 1, meaning: 'Productivity', description: 'A bee buzzing near', tipsForFinding: 'Visit flowers', isActive: true },
  { id: 'sign-33', name: 'Crow', emoji: '🐦‍⬛', category: 'animals', rarity: 'spoken', rarityProbability: 20, unlockDay: 4, meaning: 'Magic and mystery', description: 'A crow cawing at you', tipsForFinding: 'Pay attention to black birds', isActive: true },
  { id: 'sign-34', name: 'Rabbit', emoji: '🐰', category: 'animals', rarity: 'spoken', rarityProbability: 20, unlockDay: 3, meaning: 'Fertility and abundance', description: 'Spotting a rabbit', tipsForFinding: 'Parks at dawn', isActive: true },
  { id: 'sign-35', name: 'Fox', emoji: '🦊', category: 'animals', rarity: 'shouted', rarityProbability: 7, unlockDay: 12, meaning: 'Cleverness needed', description: 'Seeing a fox', tipsForFinding: 'Nature at twilight', isActive: true },
  { id: 'sign-36', name: 'Dolphin', emoji: '🐬', category: 'animals', rarity: 'thundered', rarityProbability: 2.5, unlockDay: 15, meaning: 'Playfulness and joy', description: 'Seeing dolphins', tipsForFinding: 'Coastal areas', isActive: true },
  { id: 'sign-37', name: 'Eagle', emoji: '🦅', category: 'animals', rarity: 'shouted', rarityProbability: 7, unlockDay: 11, meaning: 'Spiritual protection', description: 'An eagle soaring', tipsForFinding: 'Near mountains', isActive: true },
  { id: 'sign-38', name: 'Firefly', emoji: '✨', category: 'animals', rarity: 'spoken', rarityProbability: 20, unlockDay: 7, meaning: 'Inner light', description: 'Seeing fireflies', tipsForFinding: 'Summer nights', isActive: true },
  { id: 'sign-39', name: 'Whale', emoji: '🐋', category: 'animals', rarity: 'cosmos_aligned', rarityProbability: 0.5, unlockDay: 25, meaning: 'Deep wisdom', description: 'Witnessing a whale', tipsForFinding: 'Whale watching', isActive: true },
  { id: 'sign-40', name: 'Peacock', emoji: '🦚', category: 'animals', rarity: 'thundered', rarityProbability: 2.5, unlockDay: 18, meaning: 'Beauty and confidence', description: 'Seeing a peacock', tipsForFinding: 'Visit zoos', isActive: true },
  // NUMBERS (15)
  { id: 'sign-41', name: '11:11', emoji: '🕚', category: 'numbers', rarity: 'whispered', rarityProbability: 70, unlockDay: 1, meaning: 'Alignment', description: 'Seeing 11:11 on a clock', tipsForFinding: 'Glance at clocks', isActive: true },
  { id: 'sign-42', name: '222', emoji: '2️⃣', category: 'numbers', rarity: 'whispered', rarityProbability: 70, unlockDay: 2, meaning: 'Balance and harmony', description: 'Seeing 222 repeatedly', tipsForFinding: 'Notice numbers', isActive: true },
  { id: 'sign-43', name: '333', emoji: '3️⃣', category: 'numbers', rarity: 'whispered', rarityProbability: 70, unlockDay: 3, meaning: 'Ascended masters near', description: 'Seeing 333 repeatedly', tipsForFinding: 'Pay attention to receipts', isActive: true },
  { id: 'sign-44', name: '444', emoji: '4️⃣', category: 'numbers', rarity: 'spoken', rarityProbability: 20, unlockDay: 4, meaning: 'Angels protecting', description: 'Seeing 444 repeatedly', tipsForFinding: 'Notice license plates', isActive: true },
  { id: 'sign-45', name: '555', emoji: '5️⃣', category: 'numbers', rarity: 'spoken', rarityProbability: 20, unlockDay: 5, meaning: 'Major change coming', description: 'Seeing 555 repeatedly', tipsForFinding: 'Be aware of numbers', isActive: true },
  { id: 'sign-46', name: '777', emoji: '7️⃣', category: 'numbers', rarity: 'shouted', rarityProbability: 7, unlockDay: 7, meaning: 'Divine luck', description: 'Seeing 777 repeatedly', tipsForFinding: 'Notice patterns', isActive: true },
  { id: 'sign-47', name: '888', emoji: '8️⃣', category: 'numbers', rarity: 'shouted', rarityProbability: 7, unlockDay: 8, meaning: 'Abundance flowing', description: 'Seeing 888 repeatedly', tipsForFinding: 'Watch for patterns', isActive: true },
  { id: 'sign-48', name: '999', emoji: '9️⃣', category: 'numbers', rarity: 'spoken', rarityProbability: 20, unlockDay: 9, meaning: 'Completion', description: 'Seeing 999 repeatedly', tipsForFinding: 'Notice endings', isActive: true },
  { id: 'sign-49', name: '1234', emoji: '🔢', category: 'numbers', rarity: 'shouted', rarityProbability: 7, unlockDay: 10, meaning: 'Steps aligning', description: 'Seeing 1234 in sequence', tipsForFinding: 'Watch clocks', isActive: true },
  { id: 'sign-50', name: 'Birthday Numbers', emoji: '🎂', category: 'numbers', rarity: 'spoken', rarityProbability: 20, unlockDay: 6, meaning: 'Personal message', description: 'Seeing your birthday numbers', tipsForFinding: 'Notice birth date', isActive: true },
  { id: 'sign-51', name: '000', emoji: '0️⃣', category: 'numbers', rarity: 'spoken', rarityProbability: 20, unlockDay: 5, meaning: 'Infinite potential', description: 'Seeing 000 repeatedly', tipsForFinding: 'Notice zeros', isActive: true },
  { id: 'sign-52', name: '1111', emoji: '1️⃣', category: 'numbers', rarity: 'shouted', rarityProbability: 7, unlockDay: 11, meaning: 'Manifestation portal', description: 'Seeing 1111', tipsForFinding: 'Be present', isActive: true },
  { id: 'sign-53', name: '666', emoji: '6️⃣', category: 'numbers', rarity: 'spoken', rarityProbability: 20, unlockDay: 6, meaning: 'Balance material/spiritual', description: 'Seeing 666', tipsForFinding: 'Notice without fear', isActive: true },
  { id: 'sign-54', name: 'Lucky 7', emoji: '🎰', category: 'numbers', rarity: 'whispered', rarityProbability: 70, unlockDay: 1, meaning: 'Good fortune', description: 'The number 7 appearing', tipsForFinding: 'Notice sevens', isActive: true },
  { id: 'sign-55', name: '1212', emoji: '🕛', category: 'numbers', rarity: 'shouted', rarityProbability: 7, unlockDay: 12, meaning: 'Stay positive', description: 'Seeing 12:12', tipsForFinding: 'Check time at noon', isActive: true },
  // SYMBOLS (15)
  { id: 'sign-56', name: 'Heart Shape', emoji: '❤️', category: 'symbols', rarity: 'whispered', rarityProbability: 70, unlockDay: 1, meaning: 'Love surrounds you', description: 'Finding a heart shape', tipsForFinding: 'Look at leaves, rocks', isActive: true },
  { id: 'sign-57', name: 'Infinity Symbol', emoji: '♾️', category: 'symbols', rarity: 'spoken', rarityProbability: 20, unlockDay: 8, meaning: 'Endless possibilities', description: 'Seeing infinity symbol', tipsForFinding: 'Notice jewelry, logos', isActive: true },
  { id: 'sign-58', name: 'Star Shape', emoji: '⭐', category: 'symbols', rarity: 'whispered', rarityProbability: 70, unlockDay: 2, meaning: 'You are special', description: 'Finding a star shape', tipsForFinding: 'Look at decorations', isActive: true },
  { id: 'sign-59', name: 'Circle', emoji: '⭕', category: 'symbols', rarity: 'whispered', rarityProbability: 70, unlockDay: 1, meaning: 'Wholeness', description: 'A perfect circle', tipsForFinding: 'Notice circular objects', isActive: true },
  { id: 'sign-60', name: 'Triangle', emoji: '🔺', category: 'symbols', rarity: 'spoken', rarityProbability: 20, unlockDay: 3, meaning: 'Mind-body-spirit alignment', description: 'Noticing triangles', tipsForFinding: 'Look at architecture', isActive: true },
  { id: 'sign-61', name: 'Spiral', emoji: '🌀', category: 'symbols', rarity: 'spoken', rarityProbability: 20, unlockDay: 5, meaning: 'Evolution and growth', description: 'Seeing spiral patterns', tipsForFinding: 'Notice shells, plants', isActive: true },
  { id: 'sign-62', name: 'Cross', emoji: '✝️', category: 'symbols', rarity: 'whispered', rarityProbability: 70, unlockDay: 1, meaning: 'Faith and protection', description: 'A cross appearing', tipsForFinding: 'Notice intersections', isActive: true },
  { id: 'sign-63', name: 'Yin Yang', emoji: '☯️', category: 'symbols', rarity: 'shouted', rarityProbability: 7, unlockDay: 10, meaning: 'Perfect balance', description: 'Seeing yin yang', tipsForFinding: 'Notice in art', isActive: true },
  { id: 'sign-64', name: 'Ankh', emoji: '☥', category: 'symbols', rarity: 'thundered', rarityProbability: 2.5, unlockDay: 15, meaning: 'Eternal life', description: 'Encountering an ankh', tipsForFinding: 'Visit museums', isActive: true },
  { id: 'sign-65', name: 'Om Symbol', emoji: '🕉️', category: 'symbols', rarity: 'spoken', rarityProbability: 20, unlockDay: 7, meaning: 'Universal consciousness', description: 'Seeing Om symbol', tipsForFinding: 'Yoga studios', isActive: true },
  { id: 'sign-66', name: 'Arrow', emoji: '➡️', category: 'symbols', rarity: 'whispered', rarityProbability: 70, unlockDay: 1, meaning: 'Direction given', description: 'An arrow pointing', tipsForFinding: 'Notice signs', isActive: true },
  { id: 'sign-67', name: 'Key', emoji: '🔑', category: 'symbols', rarity: 'spoken', rarityProbability: 20, unlockDay: 4, meaning: 'Solution coming', description: 'Finding or seeing a key', tipsForFinding: 'Notice keys', isActive: true },
  { id: 'sign-68', name: 'Door', emoji: '🚪', category: 'symbols', rarity: 'whispered', rarityProbability: 70, unlockDay: 2, meaning: 'New opportunity', description: 'A door catching attention', tipsForFinding: 'Notice doors', isActive: true },
  { id: 'sign-69', name: 'Bridge', emoji: '🌉', category: 'symbols', rarity: 'spoken', rarityProbability: 20, unlockDay: 6, meaning: 'Transition ahead', description: 'Crossing a bridge', tipsForFinding: 'Notice bridges', isActive: true },
  { id: 'sign-70', name: 'Lotus', emoji: '🪷', category: 'symbols', rarity: 'shouted', rarityProbability: 7, unlockDay: 14, meaning: 'Spiritual awakening', description: 'Seeing a lotus', tipsForFinding: 'Visit ponds', isActive: true },
  // SYNCHRONICITY (15)
  { id: 'sign-71', name: 'Song Message', emoji: '🎵', category: 'synchronicity', rarity: 'whispered', rarityProbability: 70, unlockDay: 1, meaning: 'Universe speaking through music', description: 'A meaningful song playing', tipsForFinding: 'Pay attention to songs', isActive: true },
  { id: 'sign-72', name: 'Name Repetition', emoji: '📛', category: 'synchronicity', rarity: 'spoken', rarityProbability: 20, unlockDay: 3, meaning: 'Pay attention to this person', description: 'Hearing a name repeatedly', tipsForFinding: 'Notice name patterns', isActive: true },
  { id: 'sign-73', name: 'Book Message', emoji: '📖', category: 'synchronicity', rarity: 'spoken', rarityProbability: 20, unlockDay: 4, meaning: 'Wisdom for you', description: 'Opening to meaningful page', tipsForFinding: 'Open books randomly', isActive: true },
  { id: 'sign-74', name: 'Overheard Conversation', emoji: '👂', category: 'synchronicity', rarity: 'whispered', rarityProbability: 70, unlockDay: 2, meaning: 'Message meant for you', description: 'Hearing relevant words', tipsForFinding: 'Listen around you', isActive: true },
  { id: 'sign-75', name: 'Thinking of Someone', emoji: '💭', category: 'synchronicity', rarity: 'whispered', rarityProbability: 70, unlockDay: 1, meaning: 'Telepathic connection', description: 'Someone contacts when you think of them', tipsForFinding: 'Notice when this happens', isActive: true },
  { id: 'sign-76', name: 'Perfect Timing', emoji: '⏰', category: 'synchronicity', rarity: 'spoken', rarityProbability: 20, unlockDay: 5, meaning: 'Divine timing', description: 'Arriving at perfect moment', tipsForFinding: 'Notice perfect timing', isActive: true },
  { id: 'sign-77', name: 'Found Money', emoji: '💰', category: 'synchronicity', rarity: 'spoken', rarityProbability: 20, unlockDay: 7, meaning: 'Abundance sign', description: 'Finding money unexpectedly', tipsForFinding: 'Look down occasionally', isActive: true },
  { id: 'sign-78', name: 'Deja Vu', emoji: '🔄', category: 'synchronicity', rarity: 'spoken', rarityProbability: 20, unlockDay: 6, meaning: 'On the right path', description: 'Experiencing deja vu', tipsForFinding: 'Notice familiar moments', isActive: true },
  { id: 'sign-79', name: 'Billboard Message', emoji: '🪧', category: 'synchronicity', rarity: 'whispered', rarityProbability: 70, unlockDay: 1, meaning: 'Direct message', description: 'A billboard with personal message', tipsForFinding: 'Read signs', isActive: true },
  { id: 'sign-80', name: 'License Plate Message', emoji: '🚗', category: 'synchronicity', rarity: 'spoken', rarityProbability: 20, unlockDay: 4, meaning: 'Mobile message', description: 'A meaningful license plate', tipsForFinding: 'Notice plates', isActive: true },
  { id: 'sign-81', name: 'Dream Message', emoji: '💤', category: 'synchronicity', rarity: 'shouted', rarityProbability: 7, unlockDay: 10, meaning: 'Subconscious wisdom', description: 'A vivid meaningful dream', tipsForFinding: 'Keep dream journal', isActive: true },
  { id: 'sign-82', name: 'Chance Meeting', emoji: '🤝', category: 'synchronicity', rarity: 'shouted', rarityProbability: 7, unlockDay: 9, meaning: 'Destined connection', description: 'Running into someone', tipsForFinding: 'Be open to encounters', isActive: true },
  { id: 'sign-83', name: 'Repeated Word', emoji: '🔤', category: 'synchronicity', rarity: 'whispered', rarityProbability: 70, unlockDay: 2, meaning: 'Focus on this', description: 'Hearing same word repeatedly', tipsForFinding: 'Notice word patterns', isActive: true },
  { id: 'sign-84', name: 'Technology Glitch', emoji: '📱', category: 'synchronicity', rarity: 'spoken', rarityProbability: 20, unlockDay: 8, meaning: 'Pay attention now', description: 'A meaningful tech glitch', tipsForFinding: 'Notice strange tech', isActive: true },
  { id: 'sign-85', name: 'Lost Item Returns', emoji: '🔍', category: 'synchronicity', rarity: 'shouted', rarityProbability: 7, unlockDay: 12, meaning: 'What was lost is found', description: 'A lost item reappearing', tipsForFinding: 'Trust items return', isActive: true },
  // COLORS (10)
  { id: 'sign-86', name: 'Red Object', emoji: '🔴', category: 'colors', rarity: 'whispered', rarityProbability: 70, unlockDay: 1, meaning: 'Passion and energy', description: 'A red object catching eye', tipsForFinding: 'Notice red things', isActive: true },
  { id: 'sign-87', name: 'Blue Light', emoji: '🔵', category: 'colors', rarity: 'whispered', rarityProbability: 70, unlockDay: 1, meaning: 'Peace and truth', description: 'Blue light standing out', tipsForFinding: 'Notice blue', isActive: true },
  { id: 'sign-88', name: 'Green Growth', emoji: '🟢', category: 'colors', rarity: 'whispered', rarityProbability: 70, unlockDay: 1, meaning: 'Growth and healing', description: 'Vibrant green catching attention', tipsForFinding: 'Notice green in nature', isActive: true },
  { id: 'sign-89', name: 'Gold Shimmer', emoji: '🟡', category: 'colors', rarity: 'spoken', rarityProbability: 20, unlockDay: 5, meaning: 'Wealth and success', description: 'Golden light or object', tipsForFinding: 'Notice gold', isActive: true },
  { id: 'sign-90', name: 'Purple Presence', emoji: '🟣', category: 'colors', rarity: 'spoken', rarityProbability: 20, unlockDay: 6, meaning: 'Spiritual connection', description: 'Purple standing out', tipsForFinding: 'Notice purple', isActive: true },
  { id: 'sign-91', name: 'White Light', emoji: '⚪', category: 'colors', rarity: 'spoken', rarityProbability: 20, unlockDay: 3, meaning: 'Purity and clarity', description: 'Bright white light', tipsForFinding: 'Notice pure white', isActive: true },
  { id: 'sign-92', name: 'Orange Glow', emoji: '🟠', category: 'colors', rarity: 'whispered', rarityProbability: 70, unlockDay: 2, meaning: 'Creativity and joy', description: 'Orange catching attention', tipsForFinding: 'Notice orange', isActive: true },
  { id: 'sign-93', name: 'Pink Moment', emoji: '🩷', category: 'colors', rarity: 'whispered', rarityProbability: 70, unlockDay: 2, meaning: 'Love and compassion', description: 'Pink standing out', tipsForFinding: 'Notice pink', isActive: true },
  { id: 'sign-94', name: 'Silver Gleam', emoji: '🩶', category: 'colors', rarity: 'spoken', rarityProbability: 20, unlockDay: 7, meaning: 'Intuition heightened', description: 'Silver catching eye', tipsForFinding: 'Notice silver', isActive: true },
  { id: 'sign-95', name: 'Rainbow Colors', emoji: '🏳️‍🌈', category: 'colors', rarity: 'shouted', rarityProbability: 7, unlockDay: 14, meaning: 'All possibilities open', description: 'Multiple colors together', tipsForFinding: 'Notice colorful displays', isActive: true },
  // SOUNDS (5)
  { id: 'sign-96', name: 'Bells Ringing', emoji: '🔔', category: 'sounds', rarity: 'spoken', rarityProbability: 20, unlockDay: 4, meaning: 'Attention needed', description: 'Hearing bells unexpectedly', tipsForFinding: 'Listen for bells', isActive: true },
  { id: 'sign-97', name: 'Bird Song', emoji: '🎶', category: 'sounds', rarity: 'whispered', rarityProbability: 70, unlockDay: 1, meaning: 'Joy and freedom', description: 'Beautiful bird song', tipsForFinding: 'Listen to birds', isActive: true },
  { id: 'sign-98', name: 'Wind Whisper', emoji: '💨', category: 'sounds', rarity: 'whispered', rarityProbability: 70, unlockDay: 2, meaning: 'Spirit communication', description: 'Wind seeming to speak', tipsForFinding: 'Listen to wind', isActive: true },
  { id: 'sign-99', name: 'Thunder', emoji: '⛈️', category: 'sounds', rarity: 'spoken', rarityProbability: 20, unlockDay: 8, meaning: 'Powerful change', description: 'Thunder at meaningful moment', tipsForFinding: 'Notice thunder timing', isActive: true },
  { id: 'sign-100', name: 'Silence', emoji: '🤫', category: 'sounds', rarity: 'shouted', rarityProbability: 7, unlockDay: 15, meaning: 'Listen within', description: 'Sudden profound silence', tipsForFinding: 'Notice when quiet', isActive: true },
];

// Legacy sign catalog for backward compatibility
const SIGN_CATALOG = SIGNS_DATABASE.map(s => ({ id: s.id, label: s.name, emoji: s.emoji }));

export interface SignDefinition {
  id: string;
  label: string;
  emoji: string;
}

export interface ActiveSign {
  id: string;
  definitionId: string;
  label: string;
  emoji: string;
  assignedAt: string;
  foundAt?: string;
}

export interface Goal {
  id: string;
  title: string;
  createdAt: string;
  achievedAt?: string;
}

interface SignsGoalsState {
  activeSigns: ActiveSign[];
  foundSigns: ActiveSign[];
  goals: Goal[];
  isLoading: boolean;
  
  // Sign actions
  assignInitialSigns: () => void;
  markSignFound: (signId: string, locationNote?: string) => Promise<void>;
  maybeAssignNewSign: () => void;
  getRandomSign: () => SignDefinition;
  fetchActiveSigns: () => Promise<void>;
  fetchSignLogs: () => Promise<void>;
  
  // Goal actions
  addGoal: (title: string) => void;
  markGoalAchieved: (goalId: string) => void;
  removeGoal: (goalId: string) => void;
  
  // Stats
  getTotalSignsFound: () => number;
  getActiveGoalsCount: () => number;
  getAchievedGoalsCount: () => number;
}

export const useSignsGoalsStore = create<SignsGoalsState>()(
  persist(
    (set, get) => ({
      activeSigns: [],
      foundSigns: [],
      goals: [],
      isLoading: false,
      
      fetchActiveSigns: async () => {
        set({ isLoading: true });
        try {
          const response = await api.getActiveSigns();
          if (response.success && response.data) {
            const activeSigns = response.data.signs.map((sign: any) => ({
              id: sign.id,
              definitionId: sign.id,
              label: sign.name,
              emoji: sign.emoji,
              assignedAt: new Date().toISOString(),
            }));
            set({ activeSigns, isLoading: false });
          } else {
            set({ isLoading: false });
          }
        } catch (error) {
          console.error('Failed to fetch active signs:', error);
          set({ isLoading: false });
        }
      },
      
      fetchSignLogs: async () => {
        set({ isLoading: true });
        try {
          const response = await api.getUserSignLogs();
          if (response.success && response.data) {
            const foundSigns = response.data.logs.map((log: any) => ({
              id: log.id,
              definitionId: log.signId,
              label: log.sign?.name || 'Unknown Sign',
              emoji: log.sign?.emoji || '✨',
              assignedAt: log.createdAt,
              foundAt: log.foundAt,
            }));
            set({ foundSigns, isLoading: false });
          } else {
            set({ isLoading: false });
          }
        } catch (error) {
          console.error('Failed to fetch sign logs:', error);
          set({ isLoading: false });
        }
      },
      
      getRandomSign: () => {
        const { activeSigns, foundSigns } = get();
        const usedIds = [...activeSigns, ...foundSigns].map(s => s.definitionId);
        const available = SIGN_CATALOG.filter(s => !usedIds.includes(s.id));
        
        if (available.length === 0) {
          // If all signs have been used, reset and pick from full catalog
          return SIGN_CATALOG[Math.floor(Math.random() * SIGN_CATALOG.length)];
        }
        
        return available[Math.floor(Math.random() * available.length)];
      },
      
      assignInitialSigns: () => {
        const { activeSigns, getRandomSign } = get();
        
        // Only assign if no active signs
        if (activeSigns.length > 0) return;
        
        // Assign 1 initial sign
        const sign = getRandomSign();
        const newSign: ActiveSign = {
          id: `sign-${Date.now()}`,
          definitionId: sign.id,
          label: sign.label,
          emoji: sign.emoji,
          assignedAt: new Date().toISOString(),
        };
        
        set({ activeSigns: [newSign] });
      },
      
      markSignFound: async (signId: string, locationNote?: string) => {
        const { activeSigns, foundSigns } = get();
        const signIndex = activeSigns.findIndex(s => s.id === signId);
        
        if (signIndex === -1) return;
        
        const foundSign = {
          ...activeSigns[signIndex],
          foundAt: new Date().toISOString(),
        };
        
        // Update local state immediately for responsive UI
        const newActiveSigns = activeSigns.filter(s => s.id !== signId);
        const newFoundSigns = [foundSign, ...foundSigns];
        set({ activeSigns: newActiveSigns, foundSigns: newFoundSigns });
        
        // Log to API in background
        try {
          await api.logSign(foundSign.definitionId, locationNote);
        } catch (error) {
          console.error('Failed to log sign to API:', error);
          // Keep local state even if API fails
        }
        
        // Automatically assign a new sign after finding one
        get().maybeAssignNewSign();
      },
      
      maybeAssignNewSign: () => {
        const { activeSigns, getRandomSign } = get();
        
        // Max 3 active signs at a time
        if (activeSigns.length >= 3) return;
        
        const sign = getRandomSign();
        const newSign: ActiveSign = {
          id: `sign-${Date.now()}`,
          definitionId: sign.id,
          label: sign.label,
          emoji: sign.emoji,
          assignedAt: new Date().toISOString(),
        };
        
        set({ activeSigns: [...activeSigns, newSign] });
      },
      
      addGoal: (title: string) => {
        const { goals } = get();
        const newGoal: Goal = {
          id: `goal-${Date.now()}`,
          title,
          createdAt: new Date().toISOString(),
        };
        
        set({ goals: [newGoal, ...goals] });
      },
      
      markGoalAchieved: (goalId: string) => {
        const { goals } = get();
        const updatedGoals = goals.map(g => 
          g.id === goalId 
            ? { ...g, achievedAt: new Date().toISOString() }
            : g
        );
        
        set({ goals: updatedGoals });
      },
      
      removeGoal: (goalId: string) => {
        const { goals } = get();
        set({ goals: goals.filter(g => g.id !== goalId) });
      },
      
      getTotalSignsFound: () => {
        return get().foundSigns.length;
      },
      
      getActiveGoalsCount: () => {
        return get().goals.filter(g => !g.achievedAt).length;
      },
      
      getAchievedGoalsCount: () => {
        return get().goals.filter(g => g.achievedAt).length;
      },
    }),
    {
      name: 'signroad-signs-goals',
    }
  )
);
