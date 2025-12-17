// 1000 Signs Database for SignRoad
// Rarity Distribution: Whispered 70%, Spoken 20%, Shouted 7%, Thundered 2.5%, Cosmos-Aligned 0.5%

import type { SignRarity, SignCategory } from '@signroad/shared';

export interface SignSeedData {
  name: string;
  emoji: string;
  category: SignCategory;
  rarity: SignRarity;
  rarityProbability: number;
  unlockDay: number;
  meaning: string;
  description: string;
  tipsForFinding: string;
  isActive: boolean;
}

// Helper function to generate signs programmatically
function generateSigns(): SignSeedData[] {
  const signs: SignSeedData[] = [];
  
  // Base sign templates organized by category
  const signTemplates = {
    nature: [
      { name: 'White Feather', emoji: '🪶', meaning: 'Angels are near', description: 'A white feather appearing in your path', tips: 'Look on sidewalks, parks, or near windows' },
      { name: 'Sunrise', emoji: '🌅', meaning: 'New beginnings await', description: 'Witnessing a beautiful sunrise', tips: 'Wake early and face east' },
      { name: 'Full Moon', emoji: '🌕', meaning: 'Completion and clarity', description: 'Seeing the full moon clearly', tips: 'Check lunar calendar and look up at night' },
      { name: 'Cloud Formation', emoji: '☁️', meaning: 'Messages from above', description: 'Clouds forming meaningful shapes', tips: 'Lie back and watch the sky' },
      { name: 'Sunset', emoji: '🌇', meaning: 'Peaceful endings', description: 'A particularly beautiful sunset', tips: 'Face west in the evening' },
      { name: 'Flower Bloom', emoji: '🌸', meaning: 'Growth and beauty', description: 'Noticing a flower blooming', tips: 'Visit gardens or notice plants around you' },
      { name: 'Falling Leaf', emoji: '🍂', meaning: 'Letting go gracefully', description: 'A leaf falling at the right moment', tips: 'Walk under trees, especially in autumn' },
      { name: 'Dewdrops', emoji: '💧', meaning: 'Fresh start', description: 'Morning dewdrops on plants', tips: 'Look at plants early in the morning' },
      { name: 'Wind Gust', emoji: '💨', meaning: 'Change is coming', description: 'A sudden gust of wind', tips: 'Be aware of sudden weather changes' },
      { name: 'Sunbeam', emoji: '☀️', meaning: 'Divine spotlight', description: 'A beam of sunlight breaking through', tips: 'Notice light through windows or clouds' },
      { name: 'Rain on Window', emoji: '🌧️', meaning: 'Cleansing energy', description: 'Rain patterns on your window', tips: 'Watch windows during rain' },
      { name: 'Fog', emoji: '🌫️', meaning: 'Mystery unfolding', description: 'Walking through fog', tips: 'Early mornings near water' },
      { name: 'Crescent Moon', emoji: '🌙', meaning: 'New phase beginning', description: 'Seeing a crescent moon', tips: 'Look up at night during new moon phase' },
      { name: 'Morning Mist', emoji: '🌁', meaning: 'Clarity coming', description: 'Mist lifting in the morning', tips: 'Early morning walks' },
      { name: 'Gentle Breeze', emoji: '🍃', meaning: 'Spirit touching you', description: 'A gentle breeze at a meaningful moment', tips: 'Be still and feel the air' },
      { name: 'Puddle Reflection', emoji: '💦', meaning: 'Self-reflection needed', description: 'Seeing your reflection in a puddle', tips: 'After rain, look down' },
      { name: 'Tree Shadow', emoji: '🌳', meaning: 'Protection surrounds you', description: 'A tree shadow falling on you', tips: 'Walk near trees on sunny days' },
      { name: 'Grass Sparkle', emoji: '✨', meaning: 'Magic in the ordinary', description: 'Sunlight sparkling on grass', tips: 'Morning dew with sunlight' },
      { name: 'Petal Fall', emoji: '🌺', meaning: 'Beauty in release', description: 'A flower petal falling near you', tips: 'Near flowering trees and plants' },
      { name: 'Stone Path', emoji: '🪨', meaning: 'Your path is solid', description: 'Noticing stones forming a path', tips: 'Gardens, parks, nature trails' },
      { name: 'Water Ripple', emoji: '🌊', meaning: 'Your actions create waves', description: 'Ripples spreading on water', tips: 'Near ponds, lakes, fountains' },
      { name: 'Moss Growth', emoji: '🌿', meaning: 'Patience brings growth', description: 'Noticing moss on rocks or trees', tips: 'Shaded, moist areas' },
      { name: 'Pine Cone', emoji: '🌲', meaning: 'Seeds of potential', description: 'Finding a pine cone', tips: 'Under pine trees' },
      { name: 'Acorn', emoji: '🌰', meaning: 'Great things from small beginnings', description: 'Finding an acorn', tips: 'Under oak trees' },
      { name: 'Dandelion Puff', emoji: '🌬️', meaning: 'Wishes taking flight', description: 'A dandelion ready to blow', tips: 'Meadows and lawns' },
      { name: 'Clover Patch', emoji: '☘️', meaning: 'Luck surrounds you', description: 'Finding a patch of clovers', tips: 'Grassy areas, lawns' },
      { name: 'Mushroom', emoji: '🍄', meaning: 'Hidden growth', description: 'Spotting a mushroom', tips: 'Shaded, damp areas after rain' },
      { name: 'Seashell', emoji: '🐚', meaning: 'Ocean wisdom', description: 'Finding a seashell', tips: 'Beaches, near water' },
      { name: 'Smooth Stone', emoji: '🪨', meaning: 'Time smooths all', description: 'Finding a smooth stone', tips: 'Rivers, beaches, paths' },
      { name: 'Wildflower', emoji: '🌼', meaning: 'Beauty grows wild', description: 'Spotting a wildflower', tips: 'Roadsides, meadows, untended areas' },
      { name: 'Rainbow', emoji: '🌈', meaning: 'Promise of better times', description: 'A rainbow after rain', tips: 'Look to the sky after rain with sun' },
      { name: 'Snow', emoji: '❄️', meaning: 'Purity and peace', description: 'First snowfall or unexpected snow', tips: 'Watch weather forecasts in winter' },
      { name: 'Thunder', emoji: '⛈️', meaning: 'Powerful transformation', description: 'Hearing thunder at a meaningful moment', tips: 'Be present during storms' },
      { name: 'Star Cluster', emoji: '✨', meaning: 'Infinite possibilities', description: 'Seeing a cluster of stars clearly', tips: 'Find dark sky areas at night' },
      { name: 'Four-Leaf Clover', emoji: '🍀', meaning: 'Luck is on your side', description: 'Finding a rare four-leaf clover', tips: 'Search in grassy areas, especially in spring' },
      { name: 'Shooting Star', emoji: '🌠', meaning: 'Wishes being heard', description: 'Witnessing a shooting star', tips: 'Look up at night, especially during meteor showers' },
      { name: 'Double Rainbow', emoji: '🌈', meaning: 'Double blessings', description: 'Witnessing a double rainbow', tips: 'Look carefully after rain with sun' },
      { name: 'Northern Lights', emoji: '🌌', meaning: 'Cosmic alignment', description: 'Seeing aurora borealis', tips: 'Travel north or check aurora forecasts' },
      { name: 'Eclipse', emoji: '🌑', meaning: 'Major transformation', description: 'Witnessing a solar or lunar eclipse', tips: 'Check astronomical calendars' },
      { name: 'Meteor Shower', emoji: '☄️', meaning: 'Abundance of wishes', description: 'Seeing multiple meteors', tips: 'Peak meteor shower dates' },
      { name: 'Bioluminescence', emoji: '💫', meaning: 'Inner light revealed', description: 'Seeing glowing water or creatures', tips: 'Coastal areas at night' },
      { name: 'Perfect Snowflake', emoji: '❄️', meaning: 'Unique perfection', description: 'Catching a perfect snowflake', tips: 'During gentle snowfall' },
      { name: 'Lightning Strike', emoji: '⚡', meaning: 'Sudden illumination', description: 'Witnessing lightning nearby', tips: 'During thunderstorms, safely indoors' },
      { name: 'Halo Around Moon', emoji: '🌙', meaning: 'Protection from above', description: 'Seeing a halo around the moon', tips: 'Clear nights with thin clouds' },
      { name: 'Sun Dogs', emoji: '☀️', meaning: 'Celestial guardians', description: 'Seeing sun dogs (parhelia)', tips: 'Cold days with ice crystals in air' },
      { name: 'Morning Glory', emoji: '🌺', meaning: 'New day, new chance', description: 'Morning glory flowers opening', tips: 'Gardens in early morning' },
      { name: 'Autumn Colors', emoji: '🍁', meaning: 'Beautiful transitions', description: 'Peak fall foliage', tips: 'Forests in autumn' },
      { name: 'First Spring Flower', emoji: '🌷', meaning: 'Hope returns', description: 'First flower of spring', tips: 'Gardens in late winter/early spring' },
      { name: 'Frost Patterns', emoji: '❄️', meaning: 'Nature\'s art', description: 'Intricate frost on windows', tips: 'Cold mornings, look at windows' },
      { name: 'Tide Pool', emoji: '🦀', meaning: 'Hidden worlds', description: 'Discovering a tide pool', tips: 'Rocky beaches at low tide' },
    ],
    animals: [
      { name: 'Butterfly', emoji: '🦋', meaning: 'Transformation', description: 'A butterfly crossing your path', tips: 'Visit gardens or parks' },
      { name: 'Cardinal', emoji: '🐦', meaning: 'Loved ones visiting', description: 'Seeing a red cardinal', tips: 'Look in trees and bushes' },
      { name: 'Owl', emoji: '🦉', meaning: 'Wisdom incoming', description: 'Hearing or seeing an owl', tips: 'Listen at dusk and dawn' },
      { name: 'Dragonfly', emoji: '🪰', meaning: 'Adaptability', description: 'A dragonfly near you', tips: 'Near water in summer' },
      { name: 'Ladybug', emoji: '🐞', meaning: 'Good fortune', description: 'A ladybug landing on you', tips: 'Gardens and plants' },
      { name: 'Hummingbird', emoji: '🐦', meaning: 'Joy and lightness', description: 'Seeing a hummingbird', tips: 'Near flowers, especially red ones' },
      { name: 'Deer', emoji: '🦌', meaning: 'Gentleness', description: 'Encountering a deer', tips: 'Early morning in wooded areas' },
      { name: 'Hawk', emoji: '🦅', meaning: 'Vision and focus', description: 'A hawk circling overhead', tips: 'Open fields and highways' },
      { name: 'Rabbit', emoji: '🐰', meaning: 'Abundance coming', description: 'Seeing a rabbit', tips: 'Early morning in grassy areas' },
      { name: 'Spider Web', emoji: '🕸️', meaning: 'Creativity', description: 'A perfect spider web', tips: 'Morning dew reveals them' },
      { name: 'Bee', emoji: '🐝', meaning: 'Productivity', description: 'A bee visiting nearby', tips: 'Near flowers in warm weather' },
      { name: 'Crow', emoji: '🐦‍⬛', meaning: 'Magic and mystery', description: 'A crow appearing', tips: 'Urban and rural areas' },
      { name: 'Fox', emoji: '🦊', meaning: 'Cleverness needed', description: 'Spotting a fox', tips: 'Dawn and dusk in suburban areas' },
      { name: 'Dolphin', emoji: '🐬', meaning: 'Playfulness', description: 'Seeing dolphins', tips: 'Coastal areas and boat trips' },
      { name: 'Whale', emoji: '🐋', meaning: 'Deep wisdom', description: 'Witnessing a whale', tips: 'Whale watching tours' },
      { name: 'Cat Crossing', emoji: '🐱', meaning: 'Independence', description: 'A cat crossing your path', tips: 'Neighborhoods and parks' },
      { name: 'Dog Greeting', emoji: '🐕', meaning: 'Loyalty and friendship', description: 'A friendly dog approaching', tips: 'Parks and walking paths' },
      { name: 'Frog', emoji: '🐸', meaning: 'Transformation', description: 'Hearing or seeing a frog', tips: 'Near water, especially at night' },
      { name: 'Turtle', emoji: '🐢', meaning: 'Patience', description: 'Encountering a turtle', tips: 'Near ponds and slow waters' },
      { name: 'Eagle', emoji: '🦅', meaning: 'Spiritual protection', description: 'Seeing an eagle soar', tips: 'Mountains and large bodies of water' },
      { name: 'Firefly', emoji: '✨', meaning: 'Inner light', description: 'Seeing fireflies', tips: 'Summer evenings in humid areas' },
      { name: 'Heron', emoji: '🦢', meaning: 'Self-reliance', description: 'A heron standing still', tips: 'Near water, marshes' },
      { name: 'Squirrel', emoji: '🐿️', meaning: 'Preparation', description: 'A squirrel gathering', tips: 'Parks and wooded areas' },
      { name: 'Peacock', emoji: '🦚', meaning: 'Show your true colors', description: 'Seeing a peacock', tips: 'Zoos, gardens, estates' },
      { name: 'Swan', emoji: '🦢', meaning: 'Grace and beauty', description: 'Encountering a swan', tips: 'Lakes and ponds' },
      { name: 'Hummingbird Moth', emoji: '🦋', meaning: 'Illusion and truth', description: 'Seeing a hummingbird moth', tips: 'Gardens at dusk' },
      { name: 'Praying Mantis', emoji: '🦗', meaning: 'Stillness and patience', description: 'Finding a praying mantis', tips: 'Gardens and meadows' },
      { name: 'Caterpillar', emoji: '🐛', meaning: 'Potential within', description: 'Spotting a caterpillar', tips: 'On plants and leaves' },
      { name: 'Snail', emoji: '🐌', meaning: 'Slow and steady', description: 'Finding a snail', tips: 'After rain, in gardens' },
      { name: 'Bluebird', emoji: '🐦', meaning: 'Happiness coming', description: 'Seeing a bluebird', tips: 'Open areas with scattered trees' },
      { name: 'Raven', emoji: '🐦‍⬛', meaning: 'Transformation magic', description: 'A raven appearing', tips: 'Forests and open areas' },
      { name: 'Moth', emoji: '🦋', meaning: 'Following the light', description: 'A moth appearing', tips: 'Near lights at night' },
      { name: 'Ant Trail', emoji: '🐜', meaning: 'Community strength', description: 'Watching ants work together', tips: 'Sidewalks, gardens' },
      { name: 'Songbird', emoji: '🐦', meaning: 'Express yourself', description: 'A bird singing just for you', tips: 'Morning hours outdoors' },
      { name: 'Chipmunk', emoji: '🐿️', meaning: 'Playful energy', description: 'Spotting a chipmunk', tips: 'Wooded areas, parks' },
      { name: 'Seal', emoji: '🦭', meaning: 'Imagination', description: 'Seeing a seal', tips: 'Coastal areas' },
      { name: 'Pelican', emoji: '🦅', meaning: 'Abundance', description: 'Watching pelicans', tips: 'Coastal waters' },
      { name: 'Crane', emoji: '🦢', meaning: 'Longevity', description: 'Seeing a crane', tips: 'Wetlands, marshes' },
      { name: 'Woodpecker', emoji: '🐦', meaning: 'Opportunity knocking', description: 'Hearing a woodpecker', tips: 'Wooded areas' },
      { name: 'Kingfisher', emoji: '🐦', meaning: 'Prosperity', description: 'Spotting a kingfisher', tips: 'Near streams and rivers' },
      { name: 'Salamander', emoji: '🦎', meaning: 'Regeneration', description: 'Finding a salamander', tips: 'Moist, shaded areas' },
      { name: 'Gecko', emoji: '🦎', meaning: 'Dreams and visions', description: 'Seeing a gecko', tips: 'Warm climates, near buildings' },
      { name: 'Starfish', emoji: '⭐', meaning: 'Regeneration', description: 'Finding a starfish', tips: 'Tide pools, beaches' },
      { name: 'Jellyfish', emoji: '🪼', meaning: 'Go with the flow', description: 'Seeing jellyfish', tips: 'Beaches, aquariums' },
      { name: 'Octopus', emoji: '🐙', meaning: 'Flexibility', description: 'Encountering an octopus', tips: 'Tide pools, diving' },
      { name: 'Seahorse', emoji: '🐴', meaning: 'Patience and persistence', description: 'Seeing a seahorse', tips: 'Aquariums, diving' },
      { name: 'Panda', emoji: '🐼', meaning: 'Peace and balance', description: 'Seeing a panda', tips: 'Zoos, wildlife reserves' },
      { name: 'Koala', emoji: '🐨', meaning: 'Rest and relaxation', description: 'Seeing a koala', tips: 'Zoos, Australia' },
      { name: 'Elephant', emoji: '🐘', meaning: 'Memory and wisdom', description: 'Encountering an elephant', tips: 'Zoos, wildlife reserves' },
      { name: 'Giraffe', emoji: '🦒', meaning: 'See the bigger picture', description: 'Seeing a giraffe', tips: 'Zoos, safari' },
    ],
    numbers: [
      { name: '11:11', emoji: '🕚', meaning: 'Alignment', description: 'Seeing 11:11 on a clock', tips: 'Glance at clocks naturally' },
      { name: '222', emoji: '2️⃣', meaning: 'Balance', description: 'Seeing 222 or 2:22', tips: 'Receipts, clocks, addresses' },
      { name: '333', emoji: '3️⃣', meaning: 'Ascended masters near', description: 'Seeing 333 or 3:33', tips: 'Look for patterns in numbers' },
      { name: '444', emoji: '4️⃣', meaning: 'Angels surrounding you', description: 'Seeing 444 or 4:44', tips: 'Clocks, license plates, receipts' },
      { name: '555', emoji: '5️⃣', meaning: 'Major change coming', description: 'Seeing 555 or 5:55', tips: 'Be aware of number patterns' },
      { name: '666', emoji: '6️⃣', meaning: 'Balance material and spiritual', description: 'Seeing 666', tips: 'Receipts, addresses' },
      { name: '777', emoji: '7️⃣', meaning: 'Divine luck', description: 'Seeing 777', tips: 'Slot machines, addresses, receipts' },
      { name: '888', emoji: '8️⃣', meaning: 'Abundance flowing', description: 'Seeing 888', tips: 'Financial documents, receipts' },
      { name: '999', emoji: '9️⃣', meaning: 'Completion', description: 'Seeing 999', tips: 'End of cycles, receipts' },
      { name: '000', emoji: '0️⃣', meaning: 'Infinite potential', description: 'Seeing 000 or :00', tips: 'Digital clocks on the hour' },
      { name: '1234', emoji: '🔢', meaning: 'Steps in order', description: 'Seeing 1234 sequence', tips: 'Clocks at 12:34' },
      { name: 'Birthday Numbers', emoji: '🎂', meaning: 'Personal message', description: 'Seeing your birthday numbers', tips: 'Everywhere - stay aware' },
      { name: '1111', emoji: '1️⃣', meaning: 'Portal opening', description: 'Seeing 1111 anywhere', tips: 'Addresses, receipts, timestamps' },
      { name: '1212', emoji: '🔢', meaning: 'Stay positive', description: 'Seeing 12:12 or 1212', tips: 'Noon time, addresses' },
      { name: 'Lucky 7', emoji: '🎰', meaning: 'Fortune favors you', description: 'The number 7 appearing', tips: 'Everywhere - stay aware' },
      { name: 'Master 11', emoji: '✨', meaning: 'Spiritual awakening', description: 'Seeing 11 repeatedly', tips: 'Dates, times, addresses' },
      { name: 'Master 22', emoji: '✨', meaning: 'Master builder energy', description: 'Seeing 22 repeatedly', tips: 'Dates, times, addresses' },
      { name: 'Master 33', emoji: '✨', meaning: 'Master teacher', description: 'Seeing 33 repeatedly', tips: 'Dates, times, addresses' },
      { name: '1010', emoji: '🔢', meaning: 'New beginnings', description: 'Seeing 10:10 or 1010', tips: 'Clocks, addresses' },
      { name: '1313', emoji: '🔢', meaning: 'Ascended masters helping', description: 'Seeing 1313', tips: 'Addresses, receipts' },
      { name: '2020', emoji: '🔢', meaning: 'Clear vision', description: 'Seeing 2020', tips: 'Addresses, dates' },
      { name: '2121', emoji: '🔢', meaning: 'Trust the process', description: 'Seeing 2121', tips: 'Clocks, addresses' },
      { name: '1221', emoji: '🔢', meaning: 'Mirror reflection', description: 'Seeing 1221', tips: 'Clocks at 12:21' },
      { name: '1414', emoji: '🔢', meaning: 'Angels guiding', description: 'Seeing 1414', tips: 'Addresses, receipts' },
      { name: '1515', emoji: '🔢', meaning: 'Positive changes', description: 'Seeing 1515', tips: 'Clocks at 3:15 PM' },
      { name: '1717', emoji: '🔢', meaning: 'Good fortune coming', description: 'Seeing 1717', tips: 'Addresses, timestamps' },
      { name: '1818', emoji: '🔢', meaning: 'Abundance manifesting', description: 'Seeing 1818', tips: 'Receipts, addresses' },
      { name: '1919', emoji: '🔢', meaning: 'New chapter', description: 'Seeing 1919', tips: 'Addresses, dates' },
      { name: '2323', emoji: '🔢', meaning: 'Creative expression', description: 'Seeing 2323', tips: 'Clocks, addresses' },
      { name: '3434', emoji: '🔢', meaning: 'Angels and masters united', description: 'Seeing 3434', tips: 'Addresses, receipts' },
    ],
    symbols: [
      { name: 'Heart Shape', emoji: '❤️', meaning: 'Love surrounds you', description: 'Finding heart shapes in nature', tips: 'Leaves, clouds, puddles' },
      { name: 'Coin Found', emoji: '🪙', meaning: 'Abundance coming', description: 'Finding a coin on the ground', tips: 'Sidewalks, parking lots' },
      { name: 'Key', emoji: '🔑', meaning: 'Opportunity unlocking', description: 'Finding or receiving a key', tips: 'Stay aware of keys appearing' },
      { name: 'Circle', emoji: '⭕', meaning: 'Wholeness', description: 'Perfect circles appearing', tips: 'Nature, architecture, art' },
      { name: 'Star Symbol', emoji: '⭐', meaning: 'You are a star', description: 'Star symbols appearing', tips: 'Decorations, signs, nature' },
      { name: 'Spiral', emoji: '🌀', meaning: 'Evolution', description: 'Spiral patterns appearing', tips: 'Shells, plants, art' },
      { name: 'Arrow', emoji: '➡️', meaning: 'Direction shown', description: 'Arrows pointing your way', tips: 'Signs, nature, random places' },
      { name: 'Infinity Symbol', emoji: '♾️', meaning: 'Endless possibilities', description: 'Seeing infinity symbols', tips: 'Jewelry, art, nature' },
      { name: 'Cross', emoji: '✝️', meaning: 'Protection', description: 'Cross symbols appearing', tips: 'Architecture, nature, shadows' },
      { name: 'Triangle', emoji: '🔺', meaning: 'Mind-body-spirit alignment', description: 'Triangle shapes appearing', tips: 'Architecture, nature, art' },
      { name: 'Anchor', emoji: '⚓', meaning: 'Stay grounded', description: 'Anchor symbols appearing', tips: 'Near water, decorations' },
      { name: 'Butterfly Symbol', emoji: '🦋', meaning: 'Transformation reminder', description: 'Butterfly images or symbols', tips: 'Art, clothing, decorations' },
      { name: 'Sun Symbol', emoji: '☀️', meaning: 'Vitality', description: 'Sun symbols appearing', tips: 'Art, decorations, nature' },
      { name: 'Moon Symbol', emoji: '🌙', meaning: 'Intuition', description: 'Moon symbols appearing', tips: 'Art, jewelry, decorations' },
      { name: 'Tree of Life', emoji: '🌳', meaning: 'Connection to all', description: 'Tree of life symbols', tips: 'Art, jewelry, tattoos' },
      { name: 'Yin Yang', emoji: '☯️', meaning: 'Balance of opposites', description: 'Yin yang symbols', tips: 'Art, jewelry, decorations' },
      { name: 'Om Symbol', emoji: '🕉️', meaning: 'Universal consciousness', description: 'Om symbols appearing', tips: 'Yoga studios, spiritual shops' },
      { name: 'Lotus', emoji: '🪷', meaning: 'Rising above', description: 'Lotus symbols or flowers', tips: 'Art, ponds, spiritual spaces' },
      { name: 'Eye Symbol', emoji: '👁️', meaning: 'Awareness', description: 'Eye symbols appearing', tips: 'Art, jewelry, architecture' },
      { name: 'Feather Symbol', emoji: '🪶', meaning: 'Lightness of being', description: 'Feather images or symbols', tips: 'Art, decorations, jewelry' },
      { name: 'Wave Symbol', emoji: '🌊', meaning: 'Go with the flow', description: 'Wave patterns appearing', tips: 'Art, nature, decorations' },
      { name: 'Mountain Symbol', emoji: '⛰️', meaning: 'Overcome obstacles', description: 'Mountain images appearing', tips: 'Art, logos, nature' },
      { name: 'Compass', emoji: '🧭', meaning: 'Find your direction', description: 'Compass symbols appearing', tips: 'Decorations, jewelry, maps' },
      { name: 'Crown', emoji: '👑', meaning: 'Your sovereignty', description: 'Crown symbols appearing', tips: 'Art, logos, decorations' },
      { name: 'Wings', emoji: '🪽', meaning: 'Freedom awaits', description: 'Wing symbols appearing', tips: 'Art, jewelry, tattoos' },
      { name: 'Flame', emoji: '🔥', meaning: 'Passion ignited', description: 'Flame symbols appearing', tips: 'Art, logos, decorations' },
      { name: 'Diamond', emoji: '💎', meaning: 'Unbreakable spirit', description: 'Diamond shapes appearing', tips: 'Jewelry, art, patterns' },
      { name: 'Hourglass', emoji: '⏳', meaning: 'Time is precious', description: 'Hourglass symbols', tips: 'Decorations, art' },
      { name: 'Scales', emoji: '⚖️', meaning: 'Justice and balance', description: 'Scale symbols appearing', tips: 'Legal buildings, art' },
      { name: 'Phoenix', emoji: '🔥', meaning: 'Rise from ashes', description: 'Phoenix images appearing', tips: 'Art, tattoos, logos' },
    ],
    colors: [
      { name: 'Red Object', emoji: '🔴', meaning: 'Passion and energy', description: 'A red object catching your eye', tips: 'Stay aware of red items' },
      { name: 'Blue Moment', emoji: '🔵', meaning: 'Peace and truth', description: 'Blue appearing meaningfully', tips: 'Sky, water, objects' },
      { name: 'Green Light', emoji: '🟢', meaning: 'Go ahead', description: 'Green appearing as a sign', tips: 'Traffic lights, nature' },
      { name: 'Gold Shimmer', emoji: '🟡', meaning: 'Wealth and success', description: 'Gold catching your attention', tips: 'Sunlight, jewelry, decorations' },
      { name: 'Purple Vision', emoji: '🟣', meaning: 'Spiritual awakening', description: 'Purple appearing meaningfully', tips: 'Flowers, sky, objects' },
      { name: 'White Light', emoji: '⚪', meaning: 'Purity and clarity', description: 'White light or objects', tips: 'Sunbeams, clouds, objects' },
      { name: 'Orange Glow', emoji: '🟠', meaning: 'Creativity and joy', description: 'Orange appearing as a sign', tips: 'Sunsets, fruits, decorations' },
      { name: 'Pink Presence', emoji: '🩷', meaning: 'Love and compassion', description: 'Pink catching your attention', tips: 'Flowers, sky, objects' },
      { name: 'Silver Gleam', emoji: '🩶', meaning: 'Intuition and reflection', description: 'Silver appearing meaningfully', tips: 'Moon, jewelry, reflections' },
      { name: 'Rainbow Colors', emoji: '🏳️‍🌈', meaning: 'All possibilities open', description: 'Multiple colors together', tips: 'Art, nature, decorations' },
      { name: 'Black and White', emoji: '⬛', meaning: 'Clarity in contrast', description: 'Black and white together', tips: 'Art, nature, patterns' },
      { name: 'Turquoise', emoji: '🩵', meaning: 'Healing energy', description: 'Turquoise appearing', tips: 'Jewelry, water, art' },
      { name: 'Indigo', emoji: '🔵', meaning: 'Third eye opening', description: 'Deep indigo appearing', tips: 'Sky at dusk, art' },
      { name: 'Coral', emoji: '🪸', meaning: 'Emotional healing', description: 'Coral color appearing', tips: 'Sunsets, flowers, art' },
      { name: 'Lavender', emoji: '💜', meaning: 'Calm and serenity', description: 'Lavender color appearing', tips: 'Flowers, sky, decorations' },
      { name: 'Copper', emoji: '🟤', meaning: 'Grounding energy', description: 'Copper color appearing', tips: 'Metals, autumn leaves' },
      { name: 'Emerald', emoji: '💚', meaning: 'Heart healing', description: 'Emerald green appearing', tips: 'Nature, jewelry, art' },
      { name: 'Rose Gold', emoji: '🩷', meaning: 'Self-love', description: 'Rose gold appearing', tips: 'Jewelry, sunsets, art' },
      { name: 'Midnight Blue', emoji: '🔵', meaning: 'Deep wisdom', description: 'Midnight blue appearing', tips: 'Night sky, art, fabrics' },
      { name: 'Sunset Orange', emoji: '🟠', meaning: 'Endings bring beauty', description: 'Sunset orange appearing', tips: 'Evening sky, art' },
    ],
    sounds: [
      { name: 'Bird Song', emoji: '🎵', meaning: 'Message from above', description: 'A bird singing at the right moment', tips: 'Morning and evening outdoors' },
      { name: 'Wind Chimes', emoji: '🎐', meaning: 'Spirits communicating', description: 'Wind chimes ringing', tips: 'Porches, gardens, shops' },
      { name: 'Church Bells', emoji: '🔔', meaning: 'Divine timing', description: 'Hearing church bells', tips: 'Near churches, on the hour' },
      { name: 'Your Song', emoji: '🎶', meaning: 'Universe speaking through music', description: 'A meaningful song playing', tips: 'Radio, stores, random places' },
      { name: 'Thunder Clap', emoji: '⚡', meaning: 'Wake up call', description: 'Thunder at a meaningful moment', tips: 'During storms' },
      { name: 'Laughter', emoji: '😄', meaning: 'Joy is near', description: 'Hearing laughter at the right time', tips: 'Public places, gatherings' },
      { name: 'Name Called', emoji: '📢', meaning: 'You are being noticed', description: 'Hearing your name unexpectedly', tips: 'Public places, media' },
      { name: 'Water Sound', emoji: '💦', meaning: 'Emotional flow', description: 'Sound of water at the right moment', tips: 'Fountains, rain, streams' },
      { name: 'Silence', emoji: '🤫', meaning: 'Listen within', description: 'A moment of perfect silence', tips: 'Meditation, nature, early morning' },
      { name: 'Baby Cry', emoji: '👶', meaning: 'New beginnings', description: 'Hearing a baby at the right moment', tips: 'Public places, family gatherings' },
      { name: 'Clock Chime', emoji: '🕰️', meaning: 'Time is right', description: 'A clock chiming meaningfully', tips: 'Near clocks, on the hour' },
      { name: 'Dog Bark', emoji: '🐕', meaning: 'Alert to something', description: 'A dog barking at the right moment', tips: 'Neighborhoods, parks' },
      { name: 'Cat Purr', emoji: '🐱', meaning: 'Contentment', description: 'Hearing a cat purr', tips: 'Near cats, homes' },
      { name: 'Rain Sound', emoji: '🌧️', meaning: 'Cleansing', description: 'Rain falling at the right moment', tips: 'During rain' },
      { name: 'Wind Whisper', emoji: '💨', meaning: 'Spirit speaking', description: 'Wind making sounds', tips: 'Outdoors, near trees' },
      { name: 'Owl Hoot', emoji: '🦉', meaning: 'Wisdom calling', description: 'Hearing an owl', tips: 'Night time, wooded areas' },
      { name: 'Cricket Song', emoji: '🦗', meaning: 'Good luck', description: 'Hearing crickets', tips: 'Summer evenings' },
      { name: 'Frog Chorus', emoji: '🐸', meaning: 'Transformation time', description: 'Hearing frogs', tips: 'Near water at night' },
      { name: 'Heartbeat', emoji: '💓', meaning: 'Life force', description: 'Noticing your heartbeat', tips: 'Quiet moments, exercise' },
      { name: 'Applause', emoji: '👏', meaning: 'Recognition coming', description: 'Hearing applause', tips: 'Events, media, gatherings' },
      { name: 'Doorbell', emoji: '🔔', meaning: 'Opportunity knocking', description: 'Doorbell at meaningful time', tips: 'At home' },
      { name: 'Phone Ring', emoji: '📱', meaning: 'Connection incoming', description: 'Phone ringing meaningfully', tips: 'When thinking of someone' },
      { name: 'Music Box', emoji: '🎵', meaning: 'Childhood memories', description: 'Hearing a music box', tips: 'Antique shops, homes' },
      { name: 'Singing Bowl', emoji: '🔔', meaning: 'Vibration alignment', description: 'Hearing a singing bowl', tips: 'Meditation spaces, yoga' },
      { name: 'Drum Beat', emoji: '🥁', meaning: 'Heart of the earth', description: 'Hearing drums', tips: 'Events, music, ceremonies' },
    ],
    synchronicity: [
      { name: 'Thinking of Someone', emoji: '💭', meaning: 'Connection confirmed', description: 'They contact you when you think of them', tips: 'Notice when you think of people' },
      { name: 'Perfect Timing', emoji: '⏰', meaning: 'You are in flow', description: 'Everything aligning perfectly', tips: 'Notice when things flow easily' },
      { name: 'Overheard Conversation', emoji: '👂', meaning: 'Message for you', description: 'Hearing exactly what you needed', tips: 'Public places, stay aware' },
      { name: 'Book Falls Open', emoji: '📖', meaning: 'Guidance given', description: 'A book opening to the right page', tips: 'Libraries, bookstores, home' },
      { name: 'Unexpected Help', emoji: '🤝', meaning: 'Angels in human form', description: 'Help arriving when needed', tips: 'Stay open to receiving' },
      { name: 'Deja Vu', emoji: '🔄', meaning: 'On the right path', description: 'Strong deja vu feeling', tips: 'Notice familiar feelings' },
      { name: 'Dream Message', emoji: '💤', meaning: 'Subconscious wisdom', description: 'A meaningful dream', tips: 'Keep a dream journal' },
      { name: 'Stranger Smile', emoji: '😊', meaning: 'Kindness exists', description: 'A stranger smiling at you', tips: 'Public places, be open' },
      { name: 'Found Object', emoji: '🔍', meaning: 'Gift from universe', description: 'Finding something meaningful', tips: 'Stay aware while walking' },
      { name: 'Cosmic Wink', emoji: '😉', meaning: 'Universe acknowledging you', description: 'Multiple synchronicities at once', tips: 'Notice patterns in your day' },
      { name: 'Right Place Right Time', emoji: '📍', meaning: 'Divine orchestration', description: 'Being exactly where needed', tips: 'Trust your impulses' },
      { name: 'Answered Prayer', emoji: '🙏', meaning: 'You are heard', description: 'Prayer answered unexpectedly', tips: 'Notice subtle answers' },
      { name: 'Chance Meeting', emoji: '🤝', meaning: 'Meant to connect', description: 'Running into someone meaningful', tips: 'Public places, events' },
      { name: 'Lost and Found', emoji: '🔎', meaning: 'What was lost returns', description: 'Finding something you lost', tips: 'Stay hopeful' },
      { name: 'Parallel Thinking', emoji: '🧠', meaning: 'Minds connected', description: 'Someone says what you were thinking', tips: 'Conversations with others' },
      { name: 'Serendipity', emoji: '✨', meaning: 'Happy accident', description: 'Fortunate discovery by chance', tips: 'Stay open to surprises' },
      { name: 'Sign Confirmation', emoji: '✅', meaning: 'You asked, universe answered', description: 'Getting confirmation you requested', tips: 'Ask for specific signs' },
      { name: 'Recurring Theme', emoji: '🔁', meaning: 'Pay attention', description: 'Same theme appearing repeatedly', tips: 'Notice patterns over days' },
      { name: 'Intuition Hit', emoji: '💡', meaning: 'Trust yourself', description: 'Strong intuitive knowing', tips: 'Honor your gut feelings' },
      { name: 'Meaningful Coincidence', emoji: '🎯', meaning: 'Not random', description: 'Coincidence too perfect to ignore', tips: 'Notice unlikely events' },
      { name: 'Time Loop', emoji: '⏱️', meaning: 'Lesson repeating', description: 'Same situation recurring', tips: 'Look for the lesson' },
      { name: 'Energy Match', emoji: '⚡', meaning: 'Vibration alignment', description: 'Meeting someone on your wavelength', tips: 'Notice instant connections' },
      { name: 'Path Crossing', emoji: '🛤️', meaning: 'Meant to meet', description: 'Paths crossing meaningfully', tips: 'Notice who you encounter' },
      { name: 'Message in Media', emoji: '📺', meaning: 'Universe uses all channels', description: 'TV/movie saying what you needed', tips: 'Pay attention to media' },
      { name: 'Billboard Message', emoji: '📋', meaning: 'Sign literally shown', description: 'A billboard speaking to you', tips: 'Notice signs while traveling' },
    ],
  };

  // Rarity distribution for 1000 signs:
  // Whispered: 700 (70%)
  // Spoken: 200 (20%)
  // Shouted: 70 (7%)
  // Thundered: 25 (2.5%)
  // Cosmos-Aligned: 5 (0.5%)

  const rarityDistribution: { rarity: SignRarity; count: number; probability: number }[] = [
    { rarity: 'whispered', count: 700, probability: 0.70 },
    { rarity: 'spoken', count: 200, probability: 0.20 },
    { rarity: 'shouted', count: 70, probability: 0.07 },
    { rarity: 'thundered', count: 25, probability: 0.025 },
    { rarity: 'cosmos_aligned', count: 5, probability: 0.005 },
  ];

  const categories: SignCategory[] = ['nature', 'animals', 'numbers', 'symbols', 'colors', 'sounds', 'synchronicity'];
  let signId = 0;
  let unlockDay = 1;

  // Generate signs for each rarity level
  for (const { rarity, count, probability } of rarityDistribution) {
    for (let i = 0; i < count; i++) {
      const categoryIndex = signId % categories.length;
      const category = categories[categoryIndex];
      const templates = signTemplates[category];
      const templateIndex = signId % templates.length;
      const template = templates[templateIndex];
      
      // Create variation for duplicate templates
      const variation = Math.floor(signId / templates.length);
      const suffix = variation > 0 ? ` ${['II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][variation - 1] || (variation + 1)}` : '';
      
      signs.push({
        name: template.name + suffix,
        emoji: template.emoji,
        category,
        rarity,
        rarityProbability: probability,
        unlockDay: unlockDay,
        meaning: template.meaning,
        description: template.description,
        tipsForFinding: template.tips,
        isActive: true,
      });
      
      signId++;
      // Unlock a new sign every 3 days on average, but vary it
      if (signId % 3 === 0) {
        unlockDay++;
      }
    }
  }

  return signs;
}

export const signsSeedData = generateSigns();
