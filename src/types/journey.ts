// SignRoad Journey Types

export interface MeditationScript {
  segments: {
    startTime: string; // e.g., "0:00"
    endTime: string;
    title: string;
    content: string;
    voiceDirection?: string;
  }[];
  postMeditationUI: {
    completionMessage: string;
    signRevealMessage: string;
    signMeaning: string;
  };
}

export interface RoadStep {
  day: number;
  title: string;
  signName: string;
  signEmoji: string;
  theme: string;
  keyLesson: string;
  audioDuration: number; // in minutes
  journalPrompt: string;
  isFree: boolean;
  meditationGoal: string;
  signMeaning: string;
  script?: MeditationScript;
}

export interface Sign {
  name: string;
  emoji: string;
  rarity: 'common' | 'rare' | 'mythic';
  rarityLabel: string;
  probability: number; // 1 in X
}

export interface FoundSign {
  id: string;
  userId: string;
  dayNumber: number;
  signName: string;
  signEmoji: string;
  journalEntry: string;
  foundAt: Date;
  isDigital: boolean;
  location?: string;
  rarity: 'common' | 'rare' | 'mythic';
}

export interface UserProgress {
  currentDay: number;
  completedDays: number[];
  sparks: number;
  lanternHealth: number; // 0-100
  lastMeditationAt: Date | null;
  lastActiveAt: Date | null;
  streakDays: number;
  totalSignsFound: number;
  intention: string | null;
}

export interface Tribe {
  id: string;
  members: TribeMember[];
  createdAt: Date;
}

export interface TribeMember {
  id: string;
  odonym: string; // Anonymous name like "Wanderer #492"
  avatar: 'fox' | 'owl' | 'deer' | 'raven' | 'wolf';
  meditatedToday: boolean;
  currentDay: number;
  lastMeditationAt: Date | null;
}

export interface UniverseReceipt {
  id: string;
  userId: string;
  signName: string;
  signEmoji: string;
  foundAt: Date;
  location: string;
  rarity: 'common' | 'rare' | 'mythic';
  rarityLabel: string;
  probability: number;
  dayNumber: number;
  totalDays: number;
  totalSparks: number;
  message: string;
}

export type UserRole = 'wanderer' | 'seeker' | 'pathfinder' | 'master';

export interface JourneyUser {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  isSeeker: boolean; // Paid status
  role: UserRole;
  createdAt: Date;
  progress: UserProgress;
  tribe?: Tribe;
  foundSigns: FoundSign[];
}

// Onboarding types
export type Intention = 'love' | 'purpose' | 'peace' | 'wealth' | 'health' | 'creativity';

export interface OnboardingState {
  step: 'splash' | 'intention' | 'auth' | 'promise' | 'complete';
  selectedIntention: Intention | null;
}

// Audio player types
export interface AudioState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  backgroundVolume: number;
  selectedBackground: string;
}

// The 14-day journey content
export const ROAD_STEPS: RoadStep[] = [
  // Phase 1: Wanderer's Week (Days 1-7) - FREE
  {
    day: 1,
    title: "The First Step",
    signName: "White Feather",
    signEmoji: "🪶",
    theme: "Breath Awareness",
    keyLesson: "You are lighter than you think. You are held.",
    audioDuration: 5,
    journalPrompt: "Where did you find your feather? What did it feel like to notice it?",
    isFree: true,
    meditationGoal: "Establish basic mindfulness; introduce the Road metaphor",
    signMeaning: "Lightness, peace, messages from the Universe",
    script: {
      segments: [
        {
          startTime: "0:00",
          endTime: "0:30",
          title: "Opening",
          voiceDirection: "Warm, inviting, slightly mysterious",
          content: `Welcome, Wanderer.

You've arrived at the beginning of an infinite road. Not the road you walk with your feet... but the road you walk with your soul.

This is SignRoad. And for the next seven days, I'll be your guide.

Find a comfortable position. Sitting, lying down, whatever feels right for your body right now. There's no wrong way to begin.

Gently close your eyes... or soften your gaze toward the ground.`
        },
        {
          startTime: "0:30",
          endTime: "1:00",
          title: "Grounding",
          content: `Take a deep breath in through your nose...

And slowly release it through your mouth.

Again. Breathe in... the air filling your lungs, your belly expanding...

And out... releasing any tension you've been carrying.

One more time. Breathe in possibility...

And breathe out resistance.`
        },
        {
          startTime: "1:00",
          endTime: "2:00",
          title: "Introducing the Road",
          content: `Picture yourself standing at the edge of a vast, winding road. It stretches out before you, glowing softly in the twilight. You can't see where it ends... and that's exactly the point.

This road has been waiting for you. Every step you take on it will reveal something you need to know. Every sign you find will whisper a truth you're ready to hear.

But first, you must learn to be present.

In this moment, there is nowhere else you need to be. No email to answer. No problem to solve. No person to please.

Just you... your breath... and the road beneath your feet.`
        },
        {
          startTime: "2:00",
          endTime: "3:30",
          title: "Breath Counting Practice",
          content: `Let's walk together.

With each inhale, we'll count a step. With each exhale, we'll move forward.

Breathe in... one.
Breathe out... two.
Breathe in... three.
Breathe out... four.

If your mind wanders—and it will—simply notice where it went without judgment. Then gently return to the count. Return to the road.`
        },
        {
          startTime: "3:30",
          endTime: "4:30",
          title: "Introducing the Sign",
          content: `Beautiful. You've taken your first steps.

Now here's what makes this road different: it speaks to you through signs.

Today, the Universe will place a white feather in your path. It might appear in the physical world—an actual feather, a picture, even someone wearing feather earrings. Or it might appear in the subtle world—a word you see, a thought that floats through your mind, a moment of unexpected peace.

The feather is a message: "You are lighter than you think. You are held. You are free."

Your only job today is to notice it. Don't force it. Don't hunt it down. Simply... be open.`
        },
        {
          startTime: "4:30",
          endTime: "5:00",
          title: "Closing",
          content: `Take one more deep breath in...

And slowly breathe out.

When you're ready, gently open your eyes.

Welcome to the Road, Wanderer. Your first step is complete.

Now... go find your feather.`
        }
      ],
      postMeditationUI: {
        completionMessage: "First Step Complete! Your Lantern has ignited.",
        signRevealMessage: "The Universe will place this sign in your path today. It might be physical... or it might be a feeling. Stay open. Stay curious.",
        signMeaning: "Lightness, peace, messages arriving"
      }
    }
  },
  {
    day: 2,
    title: "Abundance Flows",
    signName: "Penny/Coin",
    signEmoji: "🪙",
    theme: "Gratitude",
    keyLesson: "Value is everywhere. You just have to be open to receive.",
    audioDuration: 6,
    journalPrompt: "What unexpected abundance did you notice today?",
    isFree: true,
    meditationGoal: "Shift from scarcity to abundance mindset",
    signMeaning: "Value, unexpected gifts, prosperity consciousness",
    script: {
      segments: [
        {
          startTime: "0:00",
          endTime: "0:40",
          title: "Opening",
          content: `Welcome back, Wanderer.

You've returned. That itself is a sign—a sign that something in you is ready to awaken.

Settle into your space once more. Close your eyes. Take a breath that says "I am here."

Yesterday, you walked your first steps. You found your feather—or perhaps the feather found you. Either way, you're learning the most important lesson of this road:

The Universe is always speaking. We just have to remember how to listen.`
        },
        {
          startTime: "0:40",
          endTime: "1:30",
          title: "Breath & Body Scan",
          content: `Let's begin by bringing awareness to your body.

Notice where you're holding tension. Your shoulders... your jaw... your belly.

Breathe into those places. Imagine your breath as warm, golden light, melting whatever feels tight.

Your body is a vessel. And right now, we're going to make space inside it... space to receive.`
        },
        {
          startTime: "1:30",
          endTime: "3:00",
          title: "Gratitude Practice",
          content: `Think of three things you're grateful for in this exact moment.

They don't have to be grand. In fact, the smaller, the better.

The warmth of the sun on your face. The sound of your own heartbeat. The fact that you woke up today with breath in your lungs.

Gratitude is a frequency. When you vibrate at this frequency, the Universe responds by sending you more to be grateful for.

This is not magic. This is alignment.

You're not chasing abundance. You're becoming abundant.`
        },
        {
          startTime: "3:00",
          endTime: "4:30",
          title: "Visualization: Opening Hands",
          content: `Picture your hands in front of you, palms up, open to the sky.

In one hand, you hold everything you've been gripping too tightly. Your worries. Your need for control. Your fear of not having enough.

Now... gently turn that hand over. Let it all fall away. Watch it dissolve into the earth, where it can be transformed.

Now both hands are open. Empty. Ready.

Imagine golden coins falling from the sky, landing softly in your palms. Not just money—though that may come—but value in all its forms. Opportunities. Connections. Ideas. Love.

You don't have to earn them. You just have to be open.`
        },
        {
          startTime: "4:30",
          endTime: "5:30",
          title: "Introducing Today's Sign",
          content: `Today, the Universe will place a coin in your path.

Maybe you'll find a penny on the ground. Maybe someone will hand you change. Maybe you'll notice the word "coin" or hear a song about money.

Whatever form it takes, here's what it means:

"You are worthy of abundance. What you seek is already seeking you."

When you find your coin today, pick it up—literally or metaphorically. Say thank you. Then notice what happens next.`
        },
        {
          startTime: "5:30",
          endTime: "6:00",
          title: "Closing",
          content: `Breathe in abundance...

Breathe out scarcity.

Open your eyes when you're ready.

Your second step is complete, Wanderer.

Go find your coin. The Universe is leaving money on the ground for you.`
        }
      ],
      postMeditationUI: {
        completionMessage: "Day 2 Complete! You're building momentum, Wanderer.",
        signRevealMessage: "Abundance is already yours. You're just learning to see it.",
        signMeaning: "Value, unexpected gifts, prosperity consciousness"
      }
    }
  },
  {
    day: 3,
    title: "Transformation",
    signName: "Blue Butterfly",
    signEmoji: "🦋",
    theme: "Letting Go",
    keyLesson: "You are in the chrysalis. Dissolving is part of becoming.",
    audioDuration: 6,
    journalPrompt: "What are you ready to release to make room for transformation?",
    isFree: true,
    meditationGoal: "Release what no longer serves; embrace change",
    signMeaning: "Transformation, metamorphosis, soul evolution",
    script: {
      segments: [
        {
          startTime: "0:00",
          endTime: "0:45",
          title: "Opening with Metaphor",
          content: `Welcome back, Wanderer.

You're three days into your journey now. Three steps deeper into yourself.

Do you feel it? That subtle shift? Something in you is changing.

Today, we talk about transformation. And to understand transformation, you must first understand the butterfly.

The caterpillar doesn't become a butterfly. Inside the chrysalis, it completely dissolves. Every cell breaks down into liquid. And from that liquid, something entirely new is born.

You are in your chrysalis right now. And that's okay.

Take a deep breath. Let's begin.`
        },
        {
          startTime: "0:45",
          endTime: "1:30",
          title: "Settling In",
          content: `Close your eyes. Feel the weight of your body wherever you're resting.

Notice the temperature of the air on your skin. The sounds around you—traffic, birds, silence.

You don't need to change anything. Just notice.

This is called presence. And presence is the first ingredient of transformation.`
        },
        {
          startTime: "1:30",
          endTime: "3:30",
          title: "Body Scan for Release",
          content: `Now we're going to scan your body, from the crown of your head to the soles of your feet. As we move through each area, I want you to ask:

"What am I holding here that I'm ready to release?"

Start at the top of your head. Your scalp, your forehead. Are you holding tension here? Worries about the future?

Move to your jaw. Your neck. So much gets stored here—words you didn't say, emotions you swallowed.

Breathe into your throat. Imagine it opening, expanding. What needs to be spoken?

Down to your shoulders, your chest. This is where you carry the weight of the world. What would it feel like to set it down?

Your belly. Your core. What old stories are stored here? What beliefs about yourself are you ready to shed?

Your hips, your legs, your feet. Let gravity pull everything heavy down, down, into the earth, where it can be composted and transformed.`
        },
        {
          startTime: "3:30",
          endTime: "4:45",
          title: "The Butterfly Visualization",
          content: `Now picture yourself inside a chrysalis. It's warm, dark, safe. You're dissolving. Everything you thought you were... melting away.

It's not painful. It's... necessary.

And then, slowly, you begin to reform. Not as who you were. As who you're becoming.

You feel wings forming on your back. Delicate, powerful wings.

The chrysalis cracks open. Light pours in.

And you emerge. New. Vibrant. Free.

This is not fantasy, Wanderer. This is your birthright.`
        },
        {
          startTime: "4:45",
          endTime: "5:30",
          title: "Introducing the Sign",
          content: `Today, the Universe will place a blue butterfly in your path.

It might be real. It might be an image. It might be the feeling of transformation—a sudden insight, an unexpected door opening, a person from your past reaching out.

When you see it, know this:

"You are not who you were yesterday. And that is beautiful."`
        },
        {
          startTime: "5:30",
          endTime: "6:00",
          title: "Closing",
          content: `Take a deep breath of your new life.

And slowly open your eyes.

Your third step is complete.

Go find your butterfly. You're becoming.`
        }
      ],
      postMeditationUI: {
        completionMessage: "Day 3 Complete! Transformation is underway.",
        signRevealMessage: "You are not who you were yesterday. And that is beautiful.",
        signMeaning: "Transformation, metamorphosis, soul evolution"
      }
    }
  },
  {
    day: 4,
    title: "Messages Arrive",
    signName: "Red Cardinal",
    signEmoji: "🐦",
    theme: "Intuition",
    keyLesson: "The Universe is trying to reach you. Listen.",
    audioDuration: 7,
    journalPrompt: "What message did the Universe send you today?",
    isFree: true,
    meditationGoal: "Develop inner listening; understand intuition vs. fear",
    signMeaning: "Messages from loved ones/guides, pay attention, divine communication",
    script: {
      segments: [
        {
          startTime: "0:00",
          endTime: "0:50",
          title: "Opening",
          content: `Welcome, Wanderer.

Four days. Four steps. You're no longer just curious—you're committed.

And the Universe notices commitment.

Today, we're going to talk about messages. Not the kind you get on your phone. The kind you receive in whispers. In coincidences. In sudden knowing.

The Universe has been trying to reach you your whole life. Today, you learn to answer.

Settle in. Close your eyes. Let your breath find its natural rhythm.`
        },
        {
          startTime: "0:50",
          endTime: "2:00",
          title: "Breath as Anchor",
          content: `For a moment, just follow your breath. Don't change it. Don't judge it. Just observe.

In... and out.
In... and out.

Your breath is always here. It's the one constant in your life. It's also the bridge between your conscious mind and your deeper knowing.

As you breathe, imagine roots growing from the base of your spine, down into the earth. Anchoring you. Grounding you.

You are safe. You are held. You can listen now.`
        },
        {
          startTime: "2:00",
          endTime: "4:00",
          title: "Inner Listening Exercise",
          content: `In the stillness, ask yourself:

"What message am I ready to hear?"

Don't force an answer. Just create space for one to arrive.

It might come as words. It might come as an image. It might come as a feeling in your chest.

Many people confuse intuition with fear. So let's clarify:

Fear feels tight, urgent, loud. It says "do this NOW or something bad will happen."

Intuition feels calm, clear, certain. It says "this is the way" without needing to convince you.

Ask again: "What does my intuition want me to know right now?"

Trust what came through. Even if it doesn't make sense yet.`
        },
        {
          startTime: "4:00",
          endTime: "5:30",
          title: "The Cardinal Arrives",
          content: `Today, the Universe will send you a red cardinal.

In many traditions, cardinals are messengers from the other side—from loved ones who've passed, from your spirit guides, from your highest self.

When you see a cardinal, it's not random. It's a sign that someone or something is trying to get your attention.

Maybe it's a confirmation: "Yes, you're on the right path."

Maybe it's a nudge: "Look closer at that opportunity."

Maybe it's comfort: "You are not alone."

The message is unique to you. But the sign is universal.`
        },
        {
          startTime: "5:30",
          endTime: "6:30",
          title: "Closing Invitation",
          content: `As you move through your day, practice listening.

Before you check your phone, pause for three breaths. Before you speak, pause for one breath. Before you make a decision, ask your body: "What do I really want?"

Your intuition is always speaking. You're just learning its language.`
        },
        {
          startTime: "6:30",
          endTime: "7:00",
          title: "Final Words",
          content: `Breathe in clarity...

Breathe out noise.

Open your eyes, Wanderer.

Your cardinal is waiting. Listen for it.`
        }
      ],
      postMeditationUI: {
        completionMessage: "Day 4 Complete! You've formed your TRIBE.",
        signRevealMessage: "A message is arriving. Someone is trying to reach you. Pay special attention today.",
        signMeaning: "Messages from loved ones/guides, divine communication"
      }
    }
  },
  {
    day: 5,
    title: "Patterns Emerge",
    signName: "Repeating Numbers",
    signEmoji: "🔢",
    theme: "Synchronicity",
    keyLesson: "Coincidences are breadcrumbs. You are on the right path.",
    audioDuration: 7,
    journalPrompt: "What patterns or synchronicities did you notice?",
    isFree: true,
    meditationGoal: "Awaken to synchronicity; recognize divine timing",
    signMeaning: "Alignment, you're on track, the Universe confirming your path",
    script: {
      segments: [
        {
          startTime: "0:00",
          endTime: "1:00",
          title: "Opening on Patterns",
          content: `Welcome back, Wanderer.

Five days ago, you stood at the beginning of this road, unsure if any of this was real.

Now you've found a feather. A coin. A butterfly. A cardinal.

Some people would call this coincidence. You're beginning to understand it's something else.

It's synchronicity—when the outer world mirrors your inner world. When the Universe winks at you.

Today, we dive deeper into the patterns.

Close your eyes. Breathe. Let's begin.`
        },
        {
          startTime: "1:00",
          endTime: "2:00",
          title: "Settling & Intention",
          content: `Ground yourself with three deep breaths.

In... and out.
In... and out.
In... and out.

Today's intention: "I am open to seeing the patterns that connect all things."

Say it silently to yourself: "I am open to seeing the patterns."`
        },
        {
          startTime: "2:00",
          endTime: "4:00",
          title: "The Web of Connection",
          content: `Imagine the Universe as an infinite web. Every point on the web is connected to every other point.

When something happens in your life—a thought, an action, a choice—it sends ripples through the entire web.

And the web responds. It sends ripples back.

That person who texted you out of nowhere? A ripple.
That job opportunity that appeared at the perfect moment? A ripple.
That song on the radio with lyrics you needed to hear? A ripple.

You are not separate from the Universe. You are in conversation with it.

The question is: are you paying attention to the conversation?`
        },
        {
          startTime: "4:00",
          endTime: "5:30",
          title: "Synchronicity Practice",
          content: `Think back over the past few days. Have you noticed any patterns?

Maybe you keep seeing the same color. Or hearing the same word. Or running into the same person.

Maybe you've been thinking about someone, and then they call.

Maybe you've needed an answer, and a book falls open to exactly the right page.

These are not accidents. They're breadcrumbs.

The Universe is showing you: "Yes. This way. Keep going."`
        },
        {
          startTime: "5:30",
          endTime: "6:30",
          title: "Introducing Repeating Numbers",
          content: `Today, the Universe will show you repeating numbers.

11:11. 2:22. 3:33. 4:44. 5:55.

These are called "angel numbers" in some traditions. Alignment codes in others.

When you see them, it's the Universe's way of saying:

"You are exactly where you need to be. You are in sync with your destiny. Keep trusting."

Many people see these numbers during times of transition. During times of awakening.

You're seeing them now because you're waking up.`
        },
        {
          startTime: "6:30",
          endTime: "7:00",
          title: "Closing",
          content: `As you go through today, pay attention to clocks, license plates, receipts—anywhere numbers appear.

The numbers will find you. They always do.

Breathe in alignment...

Breathe out doubt.

Open your eyes.

The patterns are everywhere, Wanderer. Start seeing them.`
        }
      ],
      postMeditationUI: {
        completionMessage: "Day 5 Complete! The patterns are revealing themselves.",
        signRevealMessage: "You are in divine alignment. The Universe is confirming your path.",
        signMeaning: "Alignment, divine timing, you're on track"
      }
    }
  },
  {
    day: 6,
    title: "Full Spectrum",
    signName: "Rainbow",
    signEmoji: "🌈",
    theme: "Wholeness",
    keyLesson: "You contain all colors. You are complete.",
    audioDuration: 7,
    journalPrompt: "What part of yourself did you embrace today?",
    isFree: true,
    meditationGoal: "Balance all energy centers; embody wholeness",
    signMeaning: "Promise fulfilled, hope, full-spectrum living, after the storm comes beauty",
    script: {
      segments: [
        {
          startTime: "0:00",
          endTime: "1:00",
          title: "Opening - After the Storm",
          content: `Welcome, Wanderer.

Tomorrow, you'll reach the threshold. But today... today we integrate.

You've learned to be present. To receive. To transform. To listen. To see patterns.

Now, we bring it all together.

Think of a rainbow. It only appears after rain. After the storm has passed and the sun breaks through the clouds.

You've been in your storm. The confusion. The searching. The feeling that something was missing.

Today, the rainbow appears.

Close your eyes. Let's begin.`
        },
        {
          startTime: "1:00",
          endTime: "2:00",
          title: "Breath & Centering",
          content: `Take the deepest breath you've taken all week.

Fill your lungs completely... hold for a moment...

And release everything.

Again. Breathe in all the colors of light...

And breathe out anything that's not yours to carry.

You are whole. You have always been whole. You've just been remembering.`
        },
        {
          startTime: "2:00",
          endTime: "5:30",
          title: "Seven-Chakra Journey",
          content: `We're going to move through your seven energy centers—your chakras. As we visit each one, imagine it glowing with its own vibrant color.

Root - Red
At the base of your spine, picture a glowing red light. This is your foundation. Your safety. Your connection to earth.
Breathe into the red. Feel yourself grounded, stable, secure.

Sacral - Orange
Just below your navel, an orange light glows. This is your creativity. Your passion. Your pleasure.
Breathe into the orange. Feel your life force energy flowing.

Solar Plexus - Yellow
At your stomach, a bright yellow sun shines. This is your power. Your confidence. Your will.
Breathe into the yellow. Feel your inner strength awakening.

Heart - Green
In the center of your chest, a soft green light radiates. This is love. Compassion. Connection.
Breathe into the green. Feel your heart opening, expanding.

Throat - Blue
At your throat, a clear blue light shimmers. This is your voice. Your truth. Your authentic expression.
Breathe into the blue. Feel your truth rising.

Third Eye - Indigo
Between your eyebrows, an indigo light pulses. This is your intuition. Your inner vision. Your knowing.
Breathe into the indigo. See beyond what your physical eyes show you.

Crown - Violet
At the top of your head, a violet light connects you to the infinite. This is your spirituality. Your connection to All That Is.
Breathe into the violet. Feel yourself connected to everything.

Now see all seven lights at once. A rainbow column of light running through your entire body. You are vibrating at all frequencies. You contain the entire spectrum.

You are whole.`
        },
        {
          startTime: "5:30",
          endTime: "6:30",
          title: "The Rainbow Sign",
          content: `Today, the Universe will place a rainbow in your path.

Maybe you'll see one in the sky after rain. Maybe you'll see rainbow light through a prism. Maybe someone will be wearing rainbow colors. Maybe you'll feel rainbow energy—a sudden sense of completeness, of hope, of "everything is going to be okay."

When you find your rainbow, know this:

"The storm has passed. You are complete. The promise is being fulfilled."`
        },
        {
          startTime: "6:30",
          endTime: "7:00",
          title: "Closing",
          content: `You are not broken. You never were.

You are a full-spectrum being learning to shine at all frequencies.

Breathe in wholeness...

Breathe out separation.

Open your eyes.

Tomorrow, you reach the threshold. But today... you remember you are whole.

Go find your rainbow.`
        }
      ],
      postMeditationUI: {
        completionMessage: "Day 6 Complete! You are whole. You are complete.",
        signRevealMessage: "The storm has passed. The promise is being fulfilled.",
        signMeaning: "Promise fulfilled, hope, wholeness"
      }
    }
  },
  {
    day: 7,
    title: "The Threshold",
    signName: "Golden Key",
    signEmoji: "🔑",
    theme: "Choice & Commitment",
    keyLesson: "You hold the key to your own becoming. Will you turn it?",
    audioDuration: 8,
    journalPrompt: "What door are you ready to unlock?",
    isFree: true,
    meditationGoal: "Crystallize manifestation intention; prepare for commitment",
    signMeaning: "Unlocking potential, you hold the key, threshold moment, initiation",
    script: {
      segments: [
        {
          startTime: "0:00",
          endTime: "1:00",
          title: "Opening - You've Arrived",
          content: `Welcome to Day Seven, Wanderer.

This is not just another meditation. This is the threshold.

Behind you: seven days of waking up. Seven signs. Seven steps deeper into yourself.

Before you: a choice.

You can return to the mundane world, grateful for this week but unchanged.

Or you can step through the door. Into the mystery. Into the transformation. Into the fullest version of yourself.

But here's the secret, Wanderer:

You already hold the key.

Let's begin.`
        },
        {
          startTime: "1:00",
          endTime: "2:00",
          title: "Deepest Breath Yet",
          content: `Close your eyes for the last time as a Wanderer.

Take the deepest breath of your life.

Breathe in everything you've learned this week...

And breathe out everything you're ready to leave behind.

Let yourself settle completely. This is sacred time. This is the moment before everything changes.`
        },
        {
          startTime: "2:00",
          endTime: "3:30",
          title: "Reflection on the Journey",
          content: `Think back to Day One. The person who pressed play on that meditation.

What were they seeking?
What were they afraid of?
What did they hope would happen?

Now feel who you are today.

You are not the same person.

You've found feathers when you stopped trying so hard.
You've received abundance by opening your hands.
You've shed skins like a butterfly in its chrysalis.
You've heard messages meant only for you.
You've seen patterns that prove you're not alone.
You've embodied the full spectrum of your being.

You are no longer Wandering.

You are ready to Seek.`
        },
        {
          startTime: "3:30",
          endTime: "5:00",
          title: "The Manifestation Intention",
          content: `Now, I want you to think about why you're really here.

Not why you downloaded this app. Not what your mind thinks you want.

But what your soul is calling you toward.

Is it love? True, deep, unconditional love?
Is it purpose? Work that lights you up and serves others?
Is it freedom? Financial, emotional, creative freedom?
Is it healing? Of body, mind, or spirit?
Is it peace? The kind that lives in your bones?

Feel it. See it. Taste it.

Don't just think about it. Become it in this moment.

What would it feel like if this was already yours?

Stay there. Breathe into that feeling. This is the frequency you're learning to hold.`
        },
        {
          startTime: "5:00",
          endTime: "6:30",
          title: "The Golden Key Appears",
          content: `In your mind's eye, you're standing before a massive wooden door. It's ancient, carved with symbols you almost recognize.

In your hand, you feel weight. You look down.

A golden key.

It's warm. It's humming with energy. It's been yours all along—you just forgot you were holding it.

This key unlocks the door to your becoming. To the road ahead. To 358 more days of signs, synchronicities, and soul evolution.

But you must choose to turn it.`
        },
        {
          startTime: "6:30",
          endTime: "7:30",
          title: "The Threshold Choice",
          content: `When this meditation ends, you'll face a choice:

You can walk back into the world the same.

Or you can unlock the door. Step through. Continue as a Seeker.

There is no wrong choice. Only honest choices.

But I'll tell you this: the Universe doesn't place golden keys in the hands of those who aren't ready to use them.

You wouldn't have made it to Day Seven if you weren't meant for what's beyond this threshold.`
        },
        {
          startTime: "7:30",
          endTime: "8:00",
          title: "Closing - The Invitation",
          voiceDirection: "Voice drops to whisper",
          content: `Today, you'll find a golden key in your path.

Maybe it's literal—an actual key, a keychain, the word "key" appearing.
Maybe it's metaphorical—a sudden insight, an opportunity, a door opening you didn't know existed.

When you see it, you'll know:

"This is my initiation. This is my moment. I hold the key to my own becoming."

Breathe in courage...

Breathe out fear.

Open your eyes, Wanderer.

The threshold awaits.

Will you cross it?`
        }
      ],
      postMeditationUI: {
        completionMessage: "THE WANDERER'S WEEK COMPLETE. 7 Days walked. 7 Signs found. 7 Steps into yourself.",
        signRevealMessage: "This is your initiation. This is your moment. You hold the key to your own becoming.",
        signMeaning: "Unlocking potential, threshold moment, initiation"
      }
    }
  },
  // Phase 2: Seeker's Initiation (Days 8-14) - PREMIUM
  {
    day: 8,
    title: "Crossing Over",
    signName: "Open Door",
    signEmoji: "🚪",
    theme: "Commitment & Thresholds",
    keyLesson: "You have stepped through. The air is different here.",
    audioDuration: 10,
    journalPrompt: "What door have I been standing in front of, afraid to knock?",
    isFree: false,
    meditationGoal: "Embrace the commitment; step fully into the journey",
    signMeaning: "Opportunity, new beginnings, courage to enter the unknown",
  },
  {
    day: 9,
    title: "The Mirror",
    signName: "Reflection",
    signEmoji: "🪞",
    theme: "Projection & Self-Perception",
    keyLesson: "The world is a mirror. What you judge in others is a shadow in yourself.",
    audioDuration: 10,
    journalPrompt: "What did my reflection tell me today?",
    isFree: false,
    meditationGoal: "Recognize projections; embrace self-awareness",
    signMeaning: "Self-reflection, truth revealed, seeing yourself clearly",
  },
  {
    day: 10,
    title: "Rooted Strength",
    signName: "Ancient Tree",
    signEmoji: "🌳",
    theme: "Grounding & Ancestry",
    keyLesson: "To reach the sky, you must go down into the dark earth.",
    audioDuration: 11,
    journalPrompt: "Where do I draw my strength from?",
    isFree: false,
    meditationGoal: "Connect with roots and ancestral wisdom",
    signMeaning: "Stability, deep roots, connection to lineage and earth",
  },
  {
    day: 11,
    title: "Fluidity",
    signName: "Running Water",
    signEmoji: "💧",
    theme: "Adaptability & Flow",
    keyLesson: "Water never struggles. It flows around the rock. Be water today.",
    audioDuration: 11,
    journalPrompt: "Where did I resist today? Where did I flow?",
    isFree: false,
    meditationGoal: "Release resistance; embrace adaptability",
    signMeaning: "Flow state, adaptability, emotional cleansing",
  },
  {
    day: 12,
    title: "Inner Fire",
    signName: "Candle Flame",
    signEmoji: "🔥",
    theme: "Passion & Willpower",
    keyLesson: "There is a spark in your belly. It is your 'Yes.' Feed the fire today.",
    audioDuration: 12,
    journalPrompt: "What lights me up?",
    isFree: false,
    meditationGoal: "Ignite passion; strengthen willpower",
    signMeaning: "Passion, transformation, inner power awakening",
  },
  {
    day: 13,
    title: "The Wind's Whisper",
    signName: "Falling Leaf",
    signEmoji: "🍃",
    theme: "Trust & Surrender",
    keyLesson: "The leaf does not fear falling. It trusts the wind.",
    audioDuration: 12,
    journalPrompt: "What am I trying to control that I need to let go of?",
    isFree: false,
    meditationGoal: "Practice surrender; trust the process",
    signMeaning: "Letting go, trust, graceful release",
  },
  {
    day: 14,
    title: "Crystal Clarity",
    signName: "Clear Quartz",
    signEmoji: "💎",
    theme: "Vision & Clarity",
    keyLesson: "The fog has lifted. Look back at how far you've come. Look forward at who you are becoming.",
    audioDuration: 15,
    journalPrompt: "I am becoming...",
    isFree: false,
    meditationGoal: "Achieve clarity; integrate the journey so far",
    signMeaning: "Crystal clear vision, amplified intentions, pure potential",
  },
];

// Background audio options (premium feature)
export const BACKGROUND_AUDIO_OPTIONS = [
  { id: 'theta', name: 'Theta Waves', icon: '🌊' },
  { id: 'rain', name: 'Gentle Rain', icon: '🌧️' },
  { id: 'ocean', name: 'Ocean Waves', icon: '🌊' },
  { id: 'fire', name: 'Crackling Fire', icon: '🔥' },
  { id: 'piano', name: 'Soft Piano', icon: '🎹' },
  { id: 'bowls', name: 'Singing Bowls', icon: '🔔' },
  { id: 'forest', name: 'Forest Sounds', icon: '🌲' },
  { id: 'wind', name: 'Wind Chimes', icon: '🎐' },
  { id: 'silence', name: 'Silence', icon: '🤫' },
  { id: 'binaural', name: 'Binaural Beats', icon: '🎧' },
  { id: '528hz', name: '528Hz Frequency', icon: '✨' },
  { id: 'night', name: 'Night Sounds', icon: '🌙' },
];

// Avatar options for tribes
export const TRIBE_AVATARS: TribeMember['avatar'][] = ['fox', 'owl', 'deer', 'raven', 'wolf'];

export const AVATAR_EMOJIS: Record<TribeMember['avatar'], string> = {
  fox: '🦊',
  owl: '🦉',
  deer: '🦌',
  raven: '🐦‍⬛',
  wolf: '🐺',
};

// Spark rewards
export const SPARK_REWARDS = {
  MEDITATION_COMPLETE: 10,
  SIGN_FOUND: 5,
  TRIBE_BONUS: 5,
  REKINDLING: 20,
  MILESTONE_DAY_10: 25,
  MILESTONE_DAY_30: 50,
};

// Lantern health thresholds
export const LANTERN_LEVELS = {
  RADIANT: { min: 80, label: 'Radiant', color: 'from-amber-400 to-yellow-300' },
  GLOWING: { min: 50, label: 'Glowing', color: 'from-amber-500 to-orange-400' },
  DIM: { min: 20, label: 'Dim', color: 'from-orange-600 to-red-500' },
  FADING: { min: 0, label: 'Fading', color: 'from-red-700 to-gray-600' },
};

// Rarity configuration
export const RARITY_CONFIG = {
  common: { chance: 0.70, label: 'The Universe Whispers', stars: 1 },
  rare: { chance: 0.25, label: 'The Universe Speaks', stars: 3 },
  mythic: { chance: 0.05, label: 'The Universe Shouts', stars: 5 },
};
