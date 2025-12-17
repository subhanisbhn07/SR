// 30 Mock Meditation Audio Placeholders for SignRoad
// These are placeholder entries - actual audio files will be managed via admin panel

import type { JourneyPhase } from '@signroad/shared';

export interface MeditationSeedData {
  dayNumber: number;
  title: string;
  phase: JourneyPhase;
  description: string;
  durationSeconds: number;
  audioUrl: string; // Placeholder URL - will be replaced with actual CDN URLs
  script: string;
  theme: string;
  primarySignId?: string;
  isPublished: boolean;
}

export const meditationSeedData: MeditationSeedData[] = [
  // Day 1-10: AWAKENING Phase
  {
    dayNumber: 1,
    title: 'Welcome to Your Journey',
    phase: 'awakening',
    description: 'Your first step on the road. Today we plant the seed of awareness.',
    durationSeconds: 300, // 5 minutes
    audioUrl: '/audio/meditations/day-001.mp3',
    script: `Welcome, traveler. Today marks the beginning of something beautiful. Find a comfortable position, close your eyes, and take a deep breath. You've chosen to walk this path, and that choice alone sets you apart. In the next few minutes, we'll simply breathe together, grounding you in this present moment. There's nowhere else to be, nothing else to do. Just breathe. Notice the air filling your lungs, the gentle rise and fall of your chest. This is your time. This is your journey. And it begins right now, with this breath, in this moment.`,
    theme: 'grounding',
    isPublished: true,
  },
  {
    dayNumber: 2,
    title: 'The Art of Noticing',
    phase: 'awakening',
    description: 'Training your awareness to see what others miss.',
    durationSeconds: 330, // 5.5 minutes
    audioUrl: '/audio/meditations/day-002.mp3',
    script: `Today we practice the art of noticing. The universe speaks in whispers, in subtle signs that most people walk right past. But you're learning to see differently. Close your eyes and bring your attention to your breath. Now, without opening your eyes, notice what you can hear. The distant sounds, the close sounds, the sounds of your own body. This is awareness training. When you leave this meditation, carry this heightened attention with you. The signs are everywhere. You just need to notice them.`,
    theme: 'awareness',
    isPublished: true,
  },
  {
    dayNumber: 3,
    title: 'Breath as Anchor',
    phase: 'awakening',
    description: 'Using breath to stay present when life gets chaotic.',
    durationSeconds: 360, // 6 minutes
    audioUrl: '/audio/meditations/day-003.mp3',
    script: `Your breath is always with you. It's an anchor you can return to whenever life feels overwhelming. Today, we'll practice using breath as a tool for presence. Inhale for four counts, hold for four, exhale for four. This simple pattern activates your parasympathetic nervous system, telling your body it's safe to relax. Practice this throughout your day. When stress rises, return to this breath. When doubt creeps in, return to this breath. Your anchor is always available.`,
    theme: 'breathwork',
    isPublished: true,
  },
  {
    dayNumber: 4,
    title: 'Your Tribe Awaits',
    phase: 'awakening',
    description: 'Connecting with your accountability tribe.',
    durationSeconds: 300, // 5 minutes
    audioUrl: '/audio/meditations/day-004.mp3',
    script: `Today you join a tribe. Eight souls walking similar paths, supporting each other silently. You don't need to know their names or their stories. You just need to know they're there, showing up like you, doing the work like you. Visualize a campfire. See yourself sitting around it with seven others. Feel the warmth of community, the strength of shared purpose. You're not alone on this journey. You never were.`,
    theme: 'community',
    isPublished: true,
  },
  {
    dayNumber: 5,
    title: 'The Power of Intention',
    phase: 'awakening',
    description: 'Setting clear intentions for your manifestation journey.',
    durationSeconds: 360, // 6 minutes
    audioUrl: '/audio/meditations/day-005.mp3',
    script: `Intention is the seed of manifestation. Today, we plant that seed with clarity and purpose. Close your eyes and ask yourself: What am I truly calling into my life? Not what you think you should want. What you actually want. Feel it in your body. See it in your mind. Hold it in your heart. This intention will guide your journey. Speak it silently now. The universe is listening.`,
    theme: 'intention',
    isPublished: true,
  },
  {
    dayNumber: 6,
    title: 'Releasing Resistance',
    phase: 'awakening',
    description: 'Letting go of what blocks your path.',
    durationSeconds: 420, // 7 minutes
    audioUrl: '/audio/meditations/day-006.mp3',
    script: `What we resist persists. Today, we practice the art of release. Bring to mind something you've been holding onto—a grudge, a fear, a limiting belief. Feel where it lives in your body. Now, with each exhale, imagine releasing a little bit of it. You don't have to let go of everything at once. Just a little. Just enough to create space for something new. Release is not weakness. It's wisdom.`,
    theme: 'release',
    isPublished: true,
  },
  {
    dayNumber: 7,
    title: 'Week One Complete',
    phase: 'awakening',
    description: 'Celebrating your first week and looking ahead.',
    durationSeconds: 480, // 8 minutes
    audioUrl: '/audio/meditations/day-007.mp3',
    script: `Seven days. You've walked seven days on this path. Most people quit by day three. You didn't. Take a moment to honor that. Place your hand on your heart and feel its steady beat. This heart chose to keep going. This heart chose growth over comfort. Today's meditation is a celebration. Breathe in gratitude for how far you've come. Breathe out anticipation for where you're going. The road stretches before you, full of signs and wonders. Keep walking.`,
    theme: 'milestone',
    isPublished: true,
  },
  {
    dayNumber: 8,
    title: 'Body Scan Basics',
    phase: 'awakening',
    description: 'Learning to listen to your body\'s wisdom.',
    durationSeconds: 420, // 7 minutes
    audioUrl: '/audio/meditations/day-008.mp3',
    script: `Your body holds wisdom your mind often ignores. Today, we practice listening. Starting at the top of your head, slowly scan down through your body. Notice any tension, any sensation, any emotion stored in your physical form. Don't try to change anything. Just notice. Your body has been carrying messages for you. It's time to start receiving them.`,
    theme: 'body-awareness',
    isPublished: true,
  },
  {
    dayNumber: 9,
    title: 'Gratitude as Practice',
    phase: 'awakening',
    description: 'Cultivating appreciation as a daily habit.',
    durationSeconds: 360, // 6 minutes
    audioUrl: '/audio/meditations/day-009.mp3',
    script: `Gratitude isn't just a feeling—it's a practice. And like any practice, it gets stronger with repetition. Today, we'll find three things to be grateful for. Not the obvious things. The small things. The overlooked things. The things you usually take for granted. Feel genuine appreciation for each one. This practice rewires your brain to notice abundance instead of lack. Do this daily, and watch your world transform.`,
    theme: 'gratitude',
    isPublished: true,
  },
  {
    dayNumber: 10,
    title: 'The Observer Self',
    phase: 'awakening',
    description: 'Discovering the part of you that watches without judgment.',
    durationSeconds: 420, // 7 minutes
    audioUrl: '/audio/meditations/day-010.mp3',
    script: `There's a part of you that observes everything—your thoughts, your emotions, your experiences—without getting caught up in them. Today, we connect with this observer self. Notice a thought arising. Instead of following it, simply watch it pass like a cloud across the sky. You are not your thoughts. You are the awareness that notices them. This distinction changes everything.`,
    theme: 'awareness',
    isPublished: true,
  },

  // Day 11-20: DEEPENING Phase
  {
    dayNumber: 11,
    title: 'Entering the Depths',
    phase: 'deepening',
    description: 'Moving beyond surface-level practice.',
    durationSeconds: 480, // 8 minutes
    audioUrl: '/audio/meditations/day-011.mp3',
    script: `You've built a foundation. Now we go deeper. The surface practices have prepared you for this moment. Today, we dive beneath the waves of daily thought into the still waters below. Here, in the depths, you'll find truths that the busy mind can't access. Breathe slowly. Sink gently. Trust the process. The depths are safe. The depths are where transformation lives.`,
    theme: 'deepening',
    isPublished: true,
  },
  {
    dayNumber: 12,
    title: 'Visualization Foundations',
    phase: 'deepening',
    description: 'Learning to see with your inner eye.',
    durationSeconds: 480, // 8 minutes
    audioUrl: '/audio/meditations/day-012.mp3',
    script: `Your imagination is a powerful tool for manifestation. Today, we train it. Close your eyes and visualize a simple object—an apple. See its color, its shape, the way light reflects off its surface. Now make it more real. Imagine its weight in your hand, its smell, its texture. This is visualization practice. The clearer you can see in your mind, the clearer you can manifest in your life.`,
    theme: 'visualization',
    isPublished: true,
  },
  {
    dayNumber: 13,
    title: 'Emotional Alchemy',
    phase: 'deepening',
    description: 'Transforming difficult emotions into fuel for growth.',
    durationSeconds: 480, // 8 minutes
    audioUrl: '/audio/meditations/day-013.mp3',
    script: `Every emotion carries energy. Even the difficult ones. Today, we practice emotional alchemy—transforming heavy feelings into fuel for growth. Bring to mind a challenging emotion you've been experiencing. Instead of pushing it away, welcome it. Ask it what it's trying to tell you. Feel its energy. Now, imagine that energy transforming, shifting, becoming something useful. This is alchemy. This is power.`,
    theme: 'emotions',
    isPublished: true,
  },
  {
    dayNumber: 14,
    title: 'Trial\'s End, Journey\'s Beginning',
    phase: 'deepening',
    description: 'Reflecting on two weeks of growth.',
    durationSeconds: 540, // 9 minutes
    audioUrl: '/audio/meditations/day-014.mp3',
    script: `Fourteen days. Two full weeks of showing up for yourself. This is no small thing. Today, we reflect on how far you've come. Think back to day one. Who were you then? Who are you now? What has shifted? What has opened? The trial period may be ending, but the real journey is just beginning. You've proven you have what it takes. Now, let's see how far you can go.`,
    theme: 'milestone',
    isPublished: true,
  },
  {
    dayNumber: 15,
    title: 'The Seeker\'s Path',
    phase: 'deepening',
    description: 'Embracing your role as a conscious seeker.',
    durationSeconds: 480, // 8 minutes
    audioUrl: '/audio/meditations/day-015.mp3',
    script: `You are now a Seeker. Not just someone who meditates, but someone who actively seeks truth, growth, and alignment. This is a sacred role. Today, we honor it. Feel the weight of this commitment. Feel the lightness it brings. You're not wandering anymore. You're seeking with purpose. The signs will come more clearly now. The path will reveal itself more fully. Keep seeking.`,
    theme: 'commitment',
    isPublished: true,
  },
  {
    dayNumber: 16,
    title: 'Heart Center Activation',
    phase: 'deepening',
    description: 'Opening and strengthening your heart energy.',
    durationSeconds: 480, // 8 minutes
    audioUrl: '/audio/meditations/day-016.mp3',
    script: `Your heart is more than an organ—it's an energy center, a source of wisdom, a bridge between body and soul. Today, we activate it. Place your hand on your heart. Feel its rhythm. Now imagine a warm, green light glowing there, growing brighter with each breath. This is your heart center awakening. From this place, you can give and receive love more freely. From this place, you can trust your deepest knowing.`,
    theme: 'heart',
    isPublished: true,
  },
  {
    dayNumber: 17,
    title: 'Shadow Work Introduction',
    phase: 'deepening',
    description: 'Meeting the parts of yourself you\'ve hidden.',
    durationSeconds: 540, // 9 minutes
    audioUrl: '/audio/meditations/day-017.mp3',
    script: `We all have shadows—parts of ourselves we've rejected, hidden, or denied. Today, we begin the gentle work of meeting them. This isn't about fixing or changing. It's about acknowledging. What part of yourself have you been afraid to look at? Can you offer it compassion instead of judgment? Your shadows aren't enemies. They're lost parts of yourself waiting to come home.`,
    theme: 'shadow',
    isPublished: true,
  },
  {
    dayNumber: 18,
    title: 'Energy Boundaries',
    phase: 'deepening',
    description: 'Protecting your energy while staying open.',
    durationSeconds: 480, // 8 minutes
    audioUrl: '/audio/meditations/day-018.mp3',
    script: `As you become more sensitive to energy, you need to learn to protect yours. Today, we practice creating healthy boundaries. Visualize a sphere of light surrounding you. This sphere allows love and positive energy to flow in, while filtering out what doesn't serve you. You can be open and protected at the same time. You can be compassionate without being drained. This is energetic wisdom.`,
    theme: 'boundaries',
    isPublished: true,
  },
  {
    dayNumber: 19,
    title: 'Intuition Training',
    phase: 'deepening',
    description: 'Strengthening your inner guidance system.',
    durationSeconds: 480, // 8 minutes
    audioUrl: '/audio/meditations/day-019.mp3',
    script: `Your intuition is always speaking. The question is: are you listening? Today, we strengthen this inner guidance system. Think of a decision you're facing. Instead of analyzing it with your mind, drop into your body. What does your gut say? What does your heart say? This is intuition. It doesn't always make logical sense, but it's rarely wrong. Learn to trust it.`,
    theme: 'intuition',
    isPublished: true,
  },
  {
    dayNumber: 20,
    title: 'Manifestation Mechanics',
    phase: 'deepening',
    description: 'Understanding how thoughts become things.',
    durationSeconds: 540, // 9 minutes
    audioUrl: '/audio/meditations/day-020.mp3',
    script: `Manifestation isn't magic—it's mechanics. Thoughts create feelings. Feelings create actions. Actions create results. Today, we trace this chain from beginning to end. What thought are you holding about your intention? What feeling does it create? What actions does that feeling inspire? Align all three, and manifestation becomes inevitable. This is the science behind the magic.`,
    theme: 'manifestation',
    isPublished: true,
  },

  // Day 21-30: TRANSFORMATION Phase
  {
    dayNumber: 21,
    title: 'Three Weeks Strong',
    phase: 'transformation',
    description: 'Entering the transformation phase.',
    durationSeconds: 540, // 9 minutes
    audioUrl: '/audio/meditations/day-021.mp3',
    script: `Twenty-one days. Science says this is how long it takes to form a habit. But you're forming more than a habit—you're forming a new way of being. Today, we enter the transformation phase. The foundation is set. The depths have been explored. Now, real change begins. Feel the shift happening within you. You're not the same person who started this journey. And you're not yet the person you're becoming. You're in the beautiful middle. Keep going.`,
    theme: 'milestone',
    isPublished: true,
  },
  {
    dayNumber: 22,
    title: 'Advanced Visualization',
    phase: 'transformation',
    description: 'Creating detailed visions of your desired reality.',
    durationSeconds: 600, // 10 minutes
    audioUrl: '/audio/meditations/day-022.mp3',
    script: `Today, we take visualization to the next level. Close your eyes and step into your desired future. Not as an observer, but as a participant. Feel the ground beneath your feet in this future. Smell the air. Hear the sounds. Who is with you? What are you doing? How do you feel? Make it so real that your nervous system can't tell the difference between imagination and reality. This is advanced manifestation.`,
    theme: 'visualization',
    isPublished: true,
  },
  {
    dayNumber: 23,
    title: 'Releasing Old Stories',
    phase: 'transformation',
    description: 'Letting go of narratives that no longer serve you.',
    durationSeconds: 540, // 9 minutes
    audioUrl: '/audio/meditations/day-023.mp3',
    script: `We all carry stories about who we are. Some of these stories empower us. Others limit us. Today, we identify and release a limiting story. What have you been telling yourself that keeps you small? "I'm not good enough." "I don't deserve success." "People like me don't get lucky." These are just stories. And stories can be rewritten. What new story would you like to tell?`,
    theme: 'release',
    isPublished: true,
  },
  {
    dayNumber: 24,
    title: 'Embodied Presence',
    phase: 'transformation',
    description: 'Being fully present in your physical form.',
    durationSeconds: 540, // 9 minutes
    audioUrl: '/audio/meditations/day-024.mp3',
    script: `Spiritual growth isn't about escaping the body—it's about fully inhabiting it. Today, we practice embodied presence. Feel your feet on the ground. Feel your hands resting. Feel your breath moving through you. You are spirit having a human experience. Honor the human part. Your body is not a prison. It's a temple. It's a vehicle. It's a gift.`,
    theme: 'embodiment',
    isPublished: true,
  },
  {
    dayNumber: 25,
    title: 'Forgiveness Practice',
    phase: 'transformation',
    description: 'Releasing the weight of resentment.',
    durationSeconds: 600, // 10 minutes
    audioUrl: '/audio/meditations/day-025.mp3',
    script: `Forgiveness isn't about condoning what happened. It's about freeing yourself from carrying it. Today, we practice forgiveness—for others and for yourself. Bring to mind someone you've been holding resentment toward. Can you see them as a flawed human, doing their best with what they had? Can you release the grip of anger, not for them, but for you? Forgiveness is freedom. Choose it today.`,
    theme: 'forgiveness',
    isPublished: true,
  },
  {
    dayNumber: 26,
    title: 'Abundance Activation',
    phase: 'transformation',
    description: 'Opening to receive the universe\'s gifts.',
    durationSeconds: 540, // 9 minutes
    audioUrl: '/audio/meditations/day-026.mp3',
    script: `The universe is infinitely abundant. The question is: are you open to receive? Today, we activate your abundance receptors. Imagine yourself as a vessel, open at the top, ready to receive. See golden light pouring into you from above—representing all forms of abundance. Money, love, opportunity, joy. Let it fill you completely. You deserve this. You are worthy of this. Receive.`,
    theme: 'abundance',
    isPublished: true,
  },
  {
    dayNumber: 27,
    title: 'Future Self Connection',
    phase: 'transformation',
    description: 'Meeting the person you\'re becoming.',
    durationSeconds: 600, // 10 minutes
    audioUrl: '/audio/meditations/day-027.mp3',
    script: `Your future self already exists in potential. Today, we connect with them. Close your eyes and imagine walking down a path. At the end of the path, you see yourself—one year from now, having achieved your intention. What do they look like? How do they carry themselves? Walk up to them. Ask them for advice. Listen to what they say. They know the way. They've already walked it.`,
    theme: 'future-self',
    isPublished: true,
  },
  {
    dayNumber: 28,
    title: 'Gratitude Amplification',
    phase: 'transformation',
    description: 'Deepening your appreciation practice.',
    durationSeconds: 540, // 9 minutes
    audioUrl: '/audio/meditations/day-028.mp3',
    script: `You've practiced gratitude before. Today, we amplify it. Instead of just thinking grateful thoughts, feel them in every cell of your body. Let appreciation wash through you like a wave. Feel grateful for your breath, your heartbeat, your ability to grow and change. Feel grateful for the challenges that made you stronger. Feel grateful for this moment, right now, exactly as it is. This is gratitude amplified.`,
    theme: 'gratitude',
    isPublished: true,
  },
  {
    dayNumber: 29,
    title: 'Integration Practice',
    phase: 'transformation',
    description: 'Bringing together all you\'ve learned.',
    durationSeconds: 600, // 10 minutes
    audioUrl: '/audio/meditations/day-029.mp3',
    script: `Tomorrow marks thirty days. Today, we integrate. Bring to mind everything you've learned on this journey. The breath practices. The visualizations. The releases. The openings. Feel how they've woven together to create a new you. Integration isn't about remembering every technique. It's about embodying the transformation. You don't just know these things now. You are these things.`,
    theme: 'integration',
    isPublished: true,
  },
  {
    dayNumber: 30,
    title: 'The First Circle Complete',
    phase: 'transformation',
    description: 'Celebrating thirty days of transformation.',
    durationSeconds: 720, // 12 minutes
    audioUrl: '/audio/meditations/day-030.mp3',
    script: `Thirty days. One full moon cycle. One complete circle. You've done something remarkable, and I want you to really feel that. Most people never make it this far. Most people give up when it gets hard, when life gets busy, when doubt creeps in. But not you. You kept walking. You kept showing up. You kept believing. Today, we celebrate. Place your hand on your heart and say: "I am proud of myself." Mean it. Because you should be. The journey continues, but this milestone matters. You've proven who you are. Now let's see who you'll become.`,
    theme: 'milestone',
    isPublished: true,
  },
];

// Helper function to get meditation for a specific day
export function getMeditationForDay(dayNumber: number): MeditationSeedData | undefined {
  return meditationSeedData.find(m => m.dayNumber === dayNumber);
}

// Helper function to get all meditations for a phase
export function getMeditationsForPhase(phase: JourneyPhase): MeditationSeedData[] {
  return meditationSeedData.filter(m => m.phase === phase);
}
