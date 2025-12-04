// SignRoad 100-Day Journey Data
// Phase 1: Awakening (Days 1-30)
// Phase 2: Deepening (Days 31-60)
// Phase 3: Transformation (Days 61-100)

export type JourneyPhase = 
  | 'awakening'      // Days 1-30
  | 'deepening'      // Days 31-60
  | 'transformation'; // Days 61-100

export interface DayContent {
  day: number;
  title: string;
  phase: JourneyPhase;
  signId: number; // References COMPLETE_SIGNS
  theme: string;
  audioDuration: number; // minutes
  isFree: boolean; // Days 1-14 are free
  journalPrompt: string;
  keyLesson: string;
}

// Phase configuration
export const JOURNEY_PHASES: Record<JourneyPhase, { name: string; days: string; theme: string; description: string }> = {
  awakening: {
    name: "Awakening",
    days: "1-30",
    theme: "First Steps into Consciousness",
    description: "Begin your journey with foundational practices. Learn to notice signs, build your daily meditation habit, and awaken to the Universe's messages."
  },
  deepening: {
    name: "Deepening",
    days: "31-60",
    theme: "Roots Growing Deeper",
    description: "Deepen your practice with more advanced techniques. Explore elemental energies, dream work, and timeline shifting."
  },
  transformation: {
    name: "Transformation",
    days: "61-100",
    theme: "Becoming Who You Are",
    description: "Transform into your highest self. Release old identities, claim your sovereignty, and step into your power."
  }
};

// Complete 100-Day Journey Content
export const JOURNEY_100_DAYS: DayContent[] = [
  // Phase 1: Awakening (Days 1-30)
  { day: 1, title: "The First Breath", phase: "awakening", signId: 1, theme: "Breath Awareness", audioDuration: 5, isFree: true, journalPrompt: "Where did you find your feather? What did it feel like to notice it?", keyLesson: "You are lighter than you think. You are held." },
  { day: 2, title: "Opening Hands", phase: "awakening", signId: 2, theme: "Gratitude", audioDuration: 6, isFree: true, journalPrompt: "What unexpected abundance did you notice today?", keyLesson: "Value is everywhere. You just have to be open to receive." },
  { day: 3, title: "Metamorphosis Begins", phase: "awakening", signId: 3, theme: "Letting Go", audioDuration: 6, isFree: true, journalPrompt: "What are you ready to release to make room for transformation?", keyLesson: "You are in the chrysalis. Dissolving is part of becoming." },
  { day: 4, title: "Divine Messages", phase: "awakening", signId: 4, theme: "Intuition", audioDuration: 7, isFree: true, journalPrompt: "What message did the Universe send you today?", keyLesson: "The Universe is trying to reach you. Listen." },
  { day: 5, title: "Pattern Recognition", phase: "awakening", signId: 5, theme: "Synchronicity", audioDuration: 7, isFree: true, journalPrompt: "What patterns or synchronicities did you notice?", keyLesson: "Coincidences are breadcrumbs. You are on the right path." },
  { day: 6, title: "Full Spectrum Living", phase: "awakening", signId: 6, theme: "Wholeness", audioDuration: 7, isFree: true, journalPrompt: "What part of yourself did you embrace today?", keyLesson: "You contain all colors. You are complete." },
  { day: 7, title: "The Golden Threshold", phase: "awakening", signId: 7, theme: "Choice & Commitment", audioDuration: 8, isFree: true, journalPrompt: "What door are you ready to unlock?", keyLesson: "You hold the key to your own becoming. Will you turn it?" },
  { day: 8, title: "Canyon Crossing", phase: "awakening", signId: 8, theme: "Courage", audioDuration: 8, isFree: true, journalPrompt: "What fear did you face today?", keyLesson: "The bridge appears when you take the first step." },
  { day: 9, title: "Echoes of Intention", phase: "awakening", signId: 9, theme: "Manifestation", audioDuration: 7, isFree: true, journalPrompt: "What intention echoed back to you today?", keyLesson: "Your thoughts are seeds. Plant wisely." },
  { day: 10, title: "Mirror of Truth", phase: "awakening", signId: 10, theme: "Self-Reflection", audioDuration: 8, isFree: true, journalPrompt: "What truth did you see in your reflection?", keyLesson: "The world mirrors your inner state." },
  { day: 11, title: "Sacred Pause", phase: "awakening", signId: 11, theme: "Stillness", audioDuration: 7, isFree: true, journalPrompt: "What did you discover in the pause?", keyLesson: "In stillness, everything becomes clear." },
  { day: 12, title: "River of Flow", phase: "awakening", signId: 12, theme: "Surrender", audioDuration: 8, isFree: true, journalPrompt: "Where did you flow today? Where did you resist?", keyLesson: "Water never struggles. It flows around the rock." },
  { day: 13, title: "Mountain's Wisdom", phase: "awakening", signId: 13, theme: "Grounding", audioDuration: 8, isFree: true, journalPrompt: "What grounded you today?", keyLesson: "Be like the mountain. Unshakeable. Present." },
  { day: 14, title: "Fortress of Choice", phase: "awakening", signId: 14, theme: "Boundaries", audioDuration: 9, isFree: true, journalPrompt: "What boundary did you honor today?", keyLesson: "Your 'no' creates space for your 'yes'." },
  
  // Days 15-30 (Paid - Phase 1 continues)
  { day: 15, title: "Beyond the Veil", phase: "awakening", signId: 15, theme: "Perception", audioDuration: 9, isFree: false, journalPrompt: "What did you see beyond the surface today?", keyLesson: "Reality has layers. You're learning to see them all." },
  { day: 16, title: "Celestial Compass", phase: "awakening", signId: 16, theme: "Direction", audioDuration: 8, isFree: false, journalPrompt: "What direction is your soul pointing?", keyLesson: "Your inner compass never lies." },
  { day: 17, title: "Frequency Shift", phase: "awakening", signId: 17, theme: "Vibration", audioDuration: 9, isFree: false, journalPrompt: "How did your frequency shift today?", keyLesson: "You attract what you vibrate." },
  { day: 18, title: "Inner Alchemy", phase: "awakening", signId: 18, theme: "Transformation", audioDuration: 9, isFree: false, journalPrompt: "What did you transform within yourself?", keyLesson: "Lead becomes gold through inner fire." },
  { day: 19, title: "Shadow Integration", phase: "awakening", signId: 19, theme: "Shadow Work", audioDuration: 10, isFree: false, journalPrompt: "What shadow did you embrace today?", keyLesson: "Your shadow holds your greatest gifts." },
  { day: 20, title: "Phoenix Rising", phase: "awakening", signId: 20, theme: "Rebirth", audioDuration: 9, isFree: false, journalPrompt: "What is rising from the ashes?", keyLesson: "Every ending is a beginning in disguise." },
  { day: 21, title: "Crystal Clarity", phase: "awakening", signId: 21, theme: "Clarity", audioDuration: 10, isFree: false, journalPrompt: "What became crystal clear today?", keyLesson: "Clarity comes to the still mind." },
  { day: 22, title: "Spiral Ascent", phase: "awakening", signId: 22, theme: "Growth", audioDuration: 9, isFree: false, journalPrompt: "How did you spiral upward today?", keyLesson: "Growth is not linear. It spirals." },
  { day: 23, title: "Quantum Leap", phase: "awakening", signId: 23, theme: "Breakthrough", audioDuration: 10, isFree: false, journalPrompt: "What quantum leap did you take?", keyLesson: "Sometimes growth happens in an instant." },
  { day: 24, title: "Ancestral Wisdom", phase: "awakening", signId: 24, theme: "Heritage", audioDuration: 10, isFree: false, journalPrompt: "What wisdom did your ancestors share?", keyLesson: "You carry the wisdom of a thousand generations." },
  { day: 25, title: "Future Self Meeting", phase: "awakening", signId: 25, theme: "Vision", audioDuration: 11, isFree: false, journalPrompt: "What did your future self tell you?", keyLesson: "Your future self is already guiding you." },
  { day: 26, title: "Heart Expansion", phase: "awakening", signId: 26, theme: "Love", audioDuration: 10, isFree: false, journalPrompt: "How did your heart expand today?", keyLesson: "Love is the highest frequency." },
  { day: 27, title: "Voice Activation", phase: "awakening", signId: 27, theme: "Expression", audioDuration: 10, isFree: false, journalPrompt: "What truth did you speak today?", keyLesson: "Your voice carries the power of creation." },
  { day: 28, title: "Third Eye Awakening", phase: "awakening", signId: 28, theme: "Intuition", audioDuration: 11, isFree: false, journalPrompt: "What did your third eye reveal?", keyLesson: "You see more than you know." },
  { day: 29, title: "Crown Connection", phase: "awakening", signId: 29, theme: "Divine Connection", audioDuration: 11, isFree: false, journalPrompt: "How did you connect to the divine today?", keyLesson: "You are a channel for divine light." },
  { day: 30, title: "First Milestone Celebration", phase: "awakening", signId: 30, theme: "Achievement", audioDuration: 12, isFree: false, journalPrompt: "How have you transformed in 30 days?", keyLesson: "You have walked 30 steps. Look how far you've come." },
  
  // Phase 2: Deepening (Days 31-60)
  { day: 31, title: "Sacred Ground", phase: "deepening", signId: 31, theme: "Foundation", audioDuration: 10, isFree: false, journalPrompt: "What sacred ground are you standing on?", keyLesson: "Every step is on sacred ground." },
  { day: 32, title: "Ocean of Emotion", phase: "deepening", signId: 32, theme: "Emotional Depth", audioDuration: 11, isFree: false, journalPrompt: "What emotions surfaced from the deep?", keyLesson: "Your emotions are messengers. Listen to them." },
  { day: 33, title: "Fire Within", phase: "deepening", signId: 33, theme: "Passion", audioDuration: 10, isFree: false, journalPrompt: "What ignites your inner fire?", keyLesson: "Your passion is your purpose calling." },
  { day: 34, title: "Wind of Change", phase: "deepening", signId: 34, theme: "Adaptability", audioDuration: 10, isFree: false, journalPrompt: "What change is the wind bringing?", keyLesson: "Change is the only constant. Embrace it." },
  { day: 35, title: "Earth Medicine", phase: "deepening", signId: 35, theme: "Healing", audioDuration: 11, isFree: false, journalPrompt: "What healing did the earth offer you?", keyLesson: "The earth holds medicine for every wound." },
  { day: 36, title: "Water Healing", phase: "deepening", signId: 36, theme: "Purification", audioDuration: 11, isFree: false, journalPrompt: "What did water wash away today?", keyLesson: "Water cleanses what fire cannot." },
  { day: 37, title: "Thunder Awakening", phase: "deepening", signId: 37, theme: "Power", audioDuration: 10, isFree: false, journalPrompt: "What power awakened within you?", keyLesson: "You contain the power of storms." },
  { day: 38, title: "Lightning Clarity", phase: "deepening", signId: 38, theme: "Insight", audioDuration: 10, isFree: false, journalPrompt: "What insight struck like lightning?", keyLesson: "Truth arrives in a flash." },
  { day: 39, title: "Moonlit Path", phase: "deepening", signId: 39, theme: "Intuition", audioDuration: 11, isFree: false, journalPrompt: "What did the moonlight reveal?", keyLesson: "The moon illuminates what the sun cannot see." },
  { day: 40, title: "Solar Power", phase: "deepening", signId: 40, theme: "Vitality", audioDuration: 12, isFree: false, journalPrompt: "How did you harness solar power today?", keyLesson: "You are a being of light." },
  { day: 41, title: "Star Navigation", phase: "deepening", signId: 41, theme: "Guidance", audioDuration: 10, isFree: false, journalPrompt: "What stars are guiding your journey?", keyLesson: "The stars have always been your map." },
  { day: 42, title: "Cosmic Dance", phase: "deepening", signId: 42, theme: "Flow", audioDuration: 11, isFree: false, journalPrompt: "How did you dance with the cosmos today?", keyLesson: "Life is a dance. Move with it." },
  { day: 43, title: "Gravity Release", phase: "deepening", signId: 43, theme: "Freedom", audioDuration: 10, isFree: false, journalPrompt: "What gravity did you release?", keyLesson: "You are not bound by what weighs you down." },
  { day: 44, title: "Weightless Being", phase: "deepening", signId: 44, theme: "Lightness", audioDuration: 10, isFree: false, journalPrompt: "How did you experience weightlessness?", keyLesson: "Your true nature is light." },
  { day: 45, title: "Dream Weaving", phase: "deepening", signId: 45, theme: "Creation", audioDuration: 11, isFree: false, journalPrompt: "What dream are you weaving?", keyLesson: "You are the weaver of your reality." },
  { day: 46, title: "Vision Quest", phase: "deepening", signId: 46, theme: "Purpose", audioDuration: 12, isFree: false, journalPrompt: "What vision called to you?", keyLesson: "Your vision is your mission." },
  { day: 47, title: "Oracle Speaking", phase: "deepening", signId: 47, theme: "Prophecy", audioDuration: 11, isFree: false, journalPrompt: "What did the oracle speak to you?", keyLesson: "You have the gift of prophecy." },
  { day: 48, title: "Prophecy Received", phase: "deepening", signId: 48, theme: "Destiny", audioDuration: 11, isFree: false, journalPrompt: "What prophecy did you receive?", keyLesson: "Your destiny is written in the stars." },
  { day: 49, title: "Timeline Shifting", phase: "deepening", signId: 49, theme: "Possibility", audioDuration: 12, isFree: false, journalPrompt: "What timeline did you shift to?", keyLesson: "Every moment is a choice point." },
  { day: 50, title: "Parallel Worlds", phase: "deepening", signId: 50, theme: "Multidimensionality", audioDuration: 13, isFree: false, journalPrompt: "What parallel world did you glimpse?", keyLesson: "You exist in infinite versions." },
  { day: 51, title: "Dimension Crossing", phase: "deepening", signId: 51, theme: "Expansion", audioDuration: 11, isFree: false, journalPrompt: "What dimension did you cross into?", keyLesson: "Reality is more vast than you know." },
  { day: 52, title: "Portal Opening", phase: "deepening", signId: 52, theme: "Opportunity", audioDuration: 11, isFree: false, journalPrompt: "What portal opened for you?", keyLesson: "Portals appear when you're ready." },
  { day: 53, title: "Gateway Guardian", phase: "deepening", signId: 53, theme: "Protection", audioDuration: 11, isFree: false, journalPrompt: "What gateway are you guarding?", keyLesson: "You are the guardian of your own gates." },
  { day: 54, title: "Key Master", phase: "deepening", signId: 54, theme: "Access", audioDuration: 10, isFree: false, journalPrompt: "What key did you master today?", keyLesson: "You hold the keys to all doors." },
  { day: 55, title: "Lock Breaker", phase: "deepening", signId: 55, theme: "Liberation", audioDuration: 12, isFree: false, journalPrompt: "What lock did you break?", keyLesson: "No lock can hold your spirit." },
  { day: 56, title: "Chain Release", phase: "deepening", signId: 56, theme: "Freedom", audioDuration: 11, isFree: false, journalPrompt: "What chains did you release?", keyLesson: "You were never truly bound." },
  { day: 57, title: "Freedom Song", phase: "deepening", signId: 57, theme: "Expression", audioDuration: 11, isFree: false, journalPrompt: "What freedom song did you sing?", keyLesson: "Your voice is the sound of freedom." },
  { day: 58, title: "Liberation Dance", phase: "deepening", signId: 58, theme: "Joy", audioDuration: 11, isFree: false, journalPrompt: "How did you dance in liberation?", keyLesson: "Dance like no one is watching." },
  { day: 59, title: "Joy Overflow", phase: "deepening", signId: 59, theme: "Abundance", audioDuration: 11, isFree: false, journalPrompt: "How did joy overflow in your life?", keyLesson: "Joy is your natural state." },
  { day: 60, title: "Second Milestone Unity", phase: "deepening", signId: 60, theme: "Integration", audioDuration: 13, isFree: false, journalPrompt: "How have you unified in 60 days?", keyLesson: "You have walked 60 steps. You are becoming whole." },
  
  // Phase 3: Transformation (Days 61-100)
  { day: 61, title: "Death of the Old", phase: "transformation", signId: 61, theme: "Release", audioDuration: 12, isFree: false, journalPrompt: "What old self is dying?", keyLesson: "Death is the doorway to rebirth." },
  { day: 62, title: "Birth of the New", phase: "transformation", signId: 62, theme: "Creation", audioDuration: 12, isFree: false, journalPrompt: "What new self is being born?", keyLesson: "You are being born anew." },
  { day: 63, title: "Rebirth Ceremony", phase: "transformation", signId: 63, theme: "Ritual", audioDuration: 13, isFree: false, journalPrompt: "How did you celebrate your rebirth?", keyLesson: "Every day is a rebirth ceremony." },
  { day: 64, title: "Identity Shift", phase: "transformation", signId: 64, theme: "Self-Concept", audioDuration: 12, isFree: false, journalPrompt: "How has your identity shifted?", keyLesson: "You are not who you were." },
  { day: 65, title: "Mask Removal", phase: "transformation", signId: 65, theme: "Authenticity", audioDuration: 13, isFree: false, journalPrompt: "What mask did you remove?", keyLesson: "Your true face is beautiful." },
  { day: 66, title: "True Face", phase: "transformation", signId: 66, theme: "Truth", audioDuration: 12, isFree: false, journalPrompt: "What is your true face?", keyLesson: "You are finally seeing yourself." },
  { day: 67, title: "Authentic Voice", phase: "transformation", signId: 67, theme: "Expression", audioDuration: 12, isFree: false, journalPrompt: "What did your authentic voice say?", keyLesson: "Your voice matters." },
  { day: 68, title: "Sovereign Self", phase: "transformation", signId: 68, theme: "Power", audioDuration: 12, isFree: false, journalPrompt: "How did you claim your sovereignty?", keyLesson: "You are the ruler of your kingdom." },
  { day: 69, title: "Power Reclamation", phase: "transformation", signId: 69, theme: "Empowerment", audioDuration: 13, isFree: false, journalPrompt: "What power did you reclaim?", keyLesson: "Your power was never lost, only forgotten." },
  { day: 70, title: "Throne Ascending", phase: "transformation", signId: 70, theme: "Leadership", audioDuration: 12, isFree: false, journalPrompt: "What throne are you ascending?", keyLesson: "You were born to lead." },
  { day: 71, title: "Crown Wearing", phase: "transformation", signId: 71, theme: "Royalty", audioDuration: 12, isFree: false, journalPrompt: "How does it feel to wear your crown?", keyLesson: "You are royalty." },
  { day: 72, title: "Scepter Holding", phase: "transformation", signId: 72, theme: "Authority", audioDuration: 12, isFree: false, journalPrompt: "What authority are you claiming?", keyLesson: "You have the authority to create your life." },
  { day: 73, title: "Kingdom Building", phase: "transformation", signId: 73, theme: "Creation", audioDuration: 13, isFree: false, journalPrompt: "What kingdom are you building?", keyLesson: "Build your kingdom with intention." },
  { day: 74, title: "Empire Rising", phase: "transformation", signId: 74, theme: "Expansion", audioDuration: 12, isFree: false, journalPrompt: "How is your empire rising?", keyLesson: "Your influence is expanding." },
  { day: 75, title: "Legacy Creating", phase: "transformation", signId: 75, theme: "Impact", audioDuration: 13, isFree: false, journalPrompt: "What legacy are you creating?", keyLesson: "Your legacy begins today." },
  { day: 76, title: "Monument Standing", phase: "transformation", signId: 76, theme: "Permanence", audioDuration: 12, isFree: false, journalPrompt: "What monument are you building?", keyLesson: "Build something that lasts." },
  { day: 77, title: "Eternal Flame", phase: "transformation", signId: 77, theme: "Passion", audioDuration: 12, isFree: false, journalPrompt: "What eternal flame burns within you?", keyLesson: "Your flame never dies." },
  { day: 78, title: "Infinite Loop", phase: "transformation", signId: 78, theme: "Continuity", audioDuration: 12, isFree: false, journalPrompt: "What infinite loop are you part of?", keyLesson: "You are part of an infinite cycle." },
  { day: 79, title: "Möbius Strip", phase: "transformation", signId: 79, theme: "Unity", audioDuration: 12, isFree: false, journalPrompt: "How are inside and outside one?", keyLesson: "There is no separation." },
  { day: 80, title: "Paradox Embracing", phase: "transformation", signId: 80, theme: "Acceptance", audioDuration: 13, isFree: false, journalPrompt: "What paradox did you embrace?", keyLesson: "Truth lives in paradox." },
  { day: 81, title: "Duality Dancing", phase: "transformation", signId: 81, theme: "Balance", audioDuration: 12, isFree: false, journalPrompt: "How did you dance with duality?", keyLesson: "Light and dark are partners." },
  { day: 82, title: "Unity Consciousness", phase: "transformation", signId: 82, theme: "Oneness", audioDuration: 13, isFree: false, journalPrompt: "How did you experience unity?", keyLesson: "We are all one." },
  { day: 83, title: "Oneness Experiencing", phase: "transformation", signId: 83, theme: "Connection", audioDuration: 12, isFree: false, journalPrompt: "What oneness did you experience?", keyLesson: "Separation is an illusion." },
  { day: 84, title: "All That Is", phase: "transformation", signId: 84, theme: "Totality", audioDuration: 13, isFree: false, journalPrompt: "How did you connect to All That Is?", keyLesson: "You are All That Is." },
  { day: 85, title: "Void Sitting", phase: "transformation", signId: 85, theme: "Emptiness", audioDuration: 14, isFree: false, journalPrompt: "What did you find in the void?", keyLesson: "The void is full of potential." },
  { day: 86, title: "Silence Speaking", phase: "transformation", signId: 86, theme: "Stillness", audioDuration: 13, isFree: false, journalPrompt: "What did silence speak to you?", keyLesson: "Silence speaks the loudest truths." },
  { day: 87, title: "Stillness Moving", phase: "transformation", signId: 87, theme: "Paradox", audioDuration: 14, isFree: false, journalPrompt: "How did stillness move you?", keyLesson: "In stillness, everything moves." },
  { day: 88, title: "Nothingness Everything", phase: "transformation", signId: 88, theme: "Emptiness", audioDuration: 13, isFree: false, journalPrompt: "How is nothingness everything?", keyLesson: "Nothing contains everything." },
  { day: 89, title: "Zero Point", phase: "transformation", signId: 89, theme: "Origin", audioDuration: 13, isFree: false, journalPrompt: "What did you find at zero point?", keyLesson: "Zero is where creation begins." },
  { day: 90, title: "Infinity Gate", phase: "transformation", signId: 90, theme: "Limitlessness", audioDuration: 14, isFree: false, journalPrompt: "What infinity gate did you pass through?", keyLesson: "You are infinite." },
  { day: 91, title: "Beyond Beyond", phase: "transformation", signId: 91, theme: "Transcendence", audioDuration: 13, isFree: false, journalPrompt: "What lies beyond beyond?", keyLesson: "There is always more." },
  { day: 92, title: "Eternal Now", phase: "transformation", signId: 92, theme: "Presence", audioDuration: 13, isFree: false, journalPrompt: "How did you experience the eternal now?", keyLesson: "Now is all there is." },
  { day: 93, title: "Timeless Moment", phase: "transformation", signId: 93, theme: "Eternity", audioDuration: 14, isFree: false, journalPrompt: "What timeless moment did you experience?", keyLesson: "You exist outside of time." },
  { day: 94, title: "Ageless Being", phase: "transformation", signId: 94, theme: "Immortality", audioDuration: 13, isFree: false, journalPrompt: "How are you ageless?", keyLesson: "Your spirit is ageless." },
  { day: 95, title: "Deathless Life", phase: "transformation", signId: 95, theme: "Eternity", audioDuration: 14, isFree: false, journalPrompt: "What is deathless within you?", keyLesson: "Your essence never dies." },
  { day: 96, title: "Boundless Love", phase: "transformation", signId: 96, theme: "Love", audioDuration: 14, isFree: false, journalPrompt: "How did you experience boundless love?", keyLesson: "Love has no limits." },
  { day: 97, title: "Limitless Light", phase: "transformation", signId: 97, theme: "Illumination", audioDuration: 15, isFree: false, journalPrompt: "How did you experience limitless light?", keyLesson: "You are made of light." },
  { day: 98, title: "Endless Road", phase: "transformation", signId: 98, theme: "Journey", audioDuration: 14, isFree: false, journalPrompt: "What does the endless road show you?", keyLesson: "The journey never ends." },
  { day: 99, title: "Forever Journey", phase: "transformation", signId: 99, theme: "Eternity", audioDuration: 15, isFree: false, journalPrompt: "What is your forever journey?", keyLesson: "You are on an eternal path." },
  { day: 100, title: "The Centennial Crown", phase: "transformation", signId: 100, theme: "Mastery", audioDuration: 20, isFree: false, journalPrompt: "How have you transformed in 100 days?", keyLesson: "You have walked 100 steps. You are transformed. You are sovereign. You are home." },
];

// Get day content by day number
export function getDayContent(day: number): DayContent | undefined {
  return JOURNEY_100_DAYS.find(d => d.day === day);
}

// Get days by phase
export function getDaysByPhase(phase: JourneyPhase): DayContent[] {
  return JOURNEY_100_DAYS.filter(d => d.phase === phase);
}

// Get free days (1-14)
export function getFreeDays(): DayContent[] {
  return JOURNEY_100_DAYS.filter(d => d.isFree);
}

// Get paid days (15-100)
export function getPaidDays(): DayContent[] {
  return JOURNEY_100_DAYS.filter(d => !d.isFree);
}

// Get total journey stats
export function getJourneyStats() {
  return {
    totalDays: JOURNEY_100_DAYS.length,
    freeDays: JOURNEY_100_DAYS.filter(d => d.isFree).length,
    paidDays: JOURNEY_100_DAYS.filter(d => !d.isFree).length,
    totalAudioMinutes: JOURNEY_100_DAYS.reduce((sum, d) => sum + d.audioDuration, 0),
    phases: Object.keys(JOURNEY_PHASES).length,
  };
}
