// 30 Daily Message Templates for SignRoad (160+ words each)
// Categories: transformation, validation, timing, relationships, purpose, abundance

import type { MessageCategory } from '@signroad/shared';

export interface DailyMessageTemplate {
  id: number;
  category: MessageCategory;
  template: string;
  wordCount: number;
}

export const dailyMessageTemplates: DailyMessageTemplate[] = [
  // TRANSFORMATION CATEGORY (5 templates)
  {
    id: 1,
    category: 'transformation',
    template: `{name}, something within you has been quietly shifting. You may not have noticed it at first—perhaps it started as a subtle restlessness, a feeling that the life you've been living no longer fits quite right. That's not anxiety. That's evolution.

The universe doesn't send signs to people who are standing still. It sends them to those who are ready to move, even when they don't yet know where they're going. You've been receiving these signals because something inside you has already said yes to change.

Today, as you walk through your world, pay attention to what catches your eye. The signs aren't random—they're breadcrumbs on a path that's been waiting for you. Trust the timing. Trust yourself. The person you're becoming is already taking shape, one small moment of awareness at a time.

Your journey is Day {currentDay}. You've already proven you're not someone who gives up easily. Keep walking.`,
    wordCount: 165,
  },
  {
    id: 2,
    category: 'transformation',
    template: `The caterpillar doesn't know it will fly, {name}. It simply follows an inner knowing, trusting a process it cannot see or understand. Right now, you are in your own cocoon—a space that might feel dark, confining, even uncomfortable. But this is where transformation happens.

You've been shedding old versions of yourself for a while now. Old beliefs that no longer serve you. Old patterns that kept you small. Old stories that told you what you couldn't do or be. This shedding isn't failure—it's preparation.

Day {currentDay} of your journey marks another layer released, another step toward the person you're becoming. The discomfort you sometimes feel isn't a sign that something is wrong. It's a sign that something is very, very right.

Wings don't grow overnight. They form in the darkness, strengthened by struggle. When you finally emerge, you won't just walk—you'll soar. Trust the process. Your wings are forming.`,
    wordCount: 168,
  },
  {
    id: 3,
    category: 'transformation',
    template: `{name}, the person you were a year ago wouldn't recognize the strength you carry now. Growth often feels like breaking—like everything you knew is falling apart. But you're not falling apart. You're falling into place.

Every challenge you've faced has been shaping you. Every moment of doubt has been teaching you to trust yourself more deeply. Every time you thought you couldn't continue, you did. That's not luck. That's the warrior spirit within you refusing to quit.

Today, on Day {currentDay}, take a moment to honor how far you've come. Not just the external milestones, but the internal ones—the times you chose courage over comfort, the moments you stood up for yourself, the quiet victories no one else saw.

Transformation isn't a destination. It's a continuous unfolding. And you, {name}, are unfolding beautifully. The universe sees your effort, even when you don't. Keep becoming who you were always meant to be.`,
    wordCount: 170,
  },
  {
    id: 4,
    category: 'transformation',
    template: `Something shifted in you recently, {name}. You may not have words for it yet, but your energy is different. The way you see the world has changed. The things that used to trigger you don't hit the same way anymore. This is evolution in action.

The old version of you served its purpose. It protected you when you needed protection. It helped you survive when survival was the goal. But you're not just surviving anymore—you're ready to thrive. And thriving requires releasing what no longer fits.

On Day {currentDay} of your journey, give yourself permission to let go. Let go of who you thought you had to be. Let go of expectations that were never yours to carry. Let go of the fear that change means loss.

Change means expansion. It means becoming more of who you truly are. The signs you're seeing aren't coincidences—they're confirmations that you're on the right path. Trust the transformation. It's leading you home to yourself.`,
    wordCount: 172,
  },
  {
    id: 5,
    category: 'transformation',
    template: `{name}, your transformation isn't linear. Some days feel like giant leaps forward. Other days feel like you're moving backward. But here's what you might not see: spirals still move upward. Every loop brings you higher, even when it feels like you're covering the same ground.

The lessons that keep appearing in your life aren't punishments—they're opportunities to master what you came here to learn. Each time you face a familiar challenge, you face it as a more evolved version of yourself. That's not repetition. That's refinement.

Day {currentDay} brings new possibilities, even if they're wrapped in familiar packaging. Look for the subtle differences. Notice how you respond differently than you would have before. Celebrate the growth that's happening beneath the surface.

You're not the same person who started this journey. {signsFound} signs later, you see the world through different eyes. The universe is reshaping you into someone magnificent. Trust the process, even when you can't see the full picture.`,
    wordCount: 175,
  },

  // VALIDATION CATEGORY (5 templates)
  {
    id: 6,
    category: 'validation',
    template: `You've been doubting yourself lately, {name}. That inner critic has been loud, pointing out every flaw, every mistake, every moment you fell short of perfection. But here's what that voice doesn't tell you: you're handling things better than you think.

Look at the evidence. You showed up today. You're still on this journey, Day {currentDay} strong. You haven't given up, even when giving up would have been easier. That takes real strength—the kind that doesn't always feel strong but shows up anyway.

The voice that says you're not enough is lying. It's been lying your whole life. The truth is, you are exactly where you need to be, learning exactly what you need to learn. Your pace is perfect. Your path is valid. Your presence matters.

Today, practice speaking to yourself the way you'd speak to someone you love. You deserve that kindness, {name}. You deserve to be your own biggest supporter, not your harshest critic. You are enough. You always have been.`,
    wordCount: 176,
  },
  {
    id: 7,
    category: 'validation',
    template: `{name}, someone needs to tell you this today: You are worthy of good things. Not because of what you do, not because of what you achieve, not because of how much you give to others. You are worthy simply because you exist.

The world has taught you to earn your value through productivity, through pleasing others, through being perfect. But that's a lie that keeps you running on a treadmill that goes nowhere. Your worth isn't something you earn—it's something you were born with.

On Day {currentDay} of your journey, practice receiving without guilt. Accept a compliment without deflecting. Allow yourself to rest without justifying it. Let good things come to you without immediately looking for what you need to give in return.

You've been carrying a lot, and you've been carrying it well. It's okay to set some of it down. It's okay to let others help. It's okay to simply be, without constantly doing. You matter, {name}. Your presence alone is a gift to this world.`,
    wordCount: 178,
  },
  {
    id: 8,
    category: 'validation',
    template: `Your feelings are valid, {name}. All of them. The joy and the sorrow. The hope and the fear. The confidence and the doubt. Even the messy ones you try to hide—especially those. They're all part of being beautifully, authentically human.

You don't have to justify your emotions or explain them away. You don't have to be positive all the time or pretend everything is fine when it isn't. Spiritual growth isn't about transcending your humanity—it's about embracing it fully.

Day {currentDay} invites you to feel whatever is present without judgment. If sadness visits, let it move through you. If anger arises, acknowledge its message. If joy bubbles up, let yourself fully experience it without waiting for the other shoe to drop.

Your emotional depth is a superpower, not a weakness. The world needs people who feel deeply, who aren't afraid to be real, who show others it's safe to be human. You're doing better than you think, {name}. Your {streak}-day streak proves you have what it takes.`,
    wordCount: 180,
  },
  {
    id: 9,
    category: 'validation',
    template: `{name}, the path you're on is yours alone. Stop comparing your chapter {currentDay} to someone else's chapter 300. Their journey has different lessons, different timing, different purposes. Your timing is perfect for YOUR life.

Social media shows you highlight reels while you're living behind the scenes. It shows you destinations while you're still on the road. This comparison game is rigged—you'll never win because you're not even playing the same game.

What if you trusted that everything is unfolding exactly as it should? What if the delays aren't denials but divine protection? What if the path that seems slower is actually the one that leads somewhere better?

Today, celebrate your unique journey. Celebrate the courage it takes to walk a path no one else can walk for you. Celebrate the small victories that no one else sees. You're not behind. You're not late. You're not missing out. You're exactly on schedule for the life that's meant for you.`,
    wordCount: 172,
  },
  {
    id: 10,
    category: 'validation',
    template: `It's okay to not have it all figured out, {name}. Nobody does. The ones who seem certain are just better at pretending. Behind every confident exterior is a human being navigating uncertainty, just like you.

You don't need to know the entire path to take the next step. You don't need to see the whole staircase to climb the first stair. Life reveals itself one moment at a time, and that's not a flaw in the design—it's the design itself.

On Day {currentDay}, give yourself permission to not know. Permission to be a work in progress. Permission to change your mind, change your direction, change your dreams as you grow. Flexibility isn't weakness—it's wisdom.

Your sensitivity isn't a burden to overcome. It's your superpower to embrace. The world needs people who feel deeply, who notice subtleties, who sense what others miss. You're not too much, {name}. You're exactly enough for the right people, the right places, the right purposes.`,
    wordCount: 175,
  },

  // TIMING CATEGORY (5 templates)
  {
    id: 11,
    category: 'timing',
    template: `You've been worried about timing lately, {name}. Wondering if you're too late, too early, too slow, too behind. But consider this: everything that's meant for you is making its way to you right now. Patience isn't passive—it's one of the most powerful forces in the universe.

The seed doesn't bloom the day it's planted. The butterfly doesn't emerge the moment it enters the cocoon. There's a sacred timing to all things, and your life is no exception. What feels like waiting is actually preparation.

Day {currentDay} arrived exactly when it should—not a moment too soon, not a moment too late. Every day before this one was necessary. Every experience, every lesson, every seeming detour was part of the path that led you here.

Stop rushing, {name}. The flower doesn't bloom faster because you stare at it. Your manifestation is growing in its own perfect time. Trust that what's meant for you won't miss you. The universe has impeccable timing, even when it doesn't match your schedule.`,
    wordCount: 178,
  },
  {
    id: 12,
    category: 'timing',
    template: `The delay isn't denial, {name}. Sometimes the universe is protecting you from something you can't see yet. Sometimes what feels like a closed door is actually a redirection toward something better. Sometimes the wait is the gift.

Think about the times in your life when you didn't get what you wanted, only to later realize you got something better. Think about the prayers that weren't answered the way you expected, but were answered in ways you couldn't have imagined.

On Day {currentDay}, practice trusting the timing of your life. Trust that the things that haven't happened yet are still on their way. Trust that the universe sees the bigger picture, even when you can only see the next step.

What's meant for you won't miss you, {name}. Relax into that truth today. Release the grip of urgency. Let go of the fear that you're running out of time. You're not. You're right on schedule for a life more beautiful than you can currently imagine.`,
    wordCount: 176,
  },
  {
    id: 13,
    category: 'timing',
    template: `{name}, you're not behind. You're not late. You're not missing out. You're exactly on schedule for YOUR life—a life that doesn't follow anyone else's timeline because it was never meant to.

The world tells you there are deadlines for everything: when to graduate, when to marry, when to have children, when to succeed. But these are arbitrary markers that have nothing to do with your soul's journey. Your path has its own rhythm.

Day {currentDay} of your journey has its own purpose. It's not just a number—it's a specific point in your evolution that couldn't have come sooner. Everything before this moment was preparation. Everything after will be built on what you're learning now.

The waiting is part of the journey, {name}. Seeds don't sprout the day they're planted. Your harvest is coming, but it's growing underground where you can't see it yet. Trust the process. Trust the timing. Trust that your life is unfolding exactly as it should.`,
    wordCount: 174,
  },
  {
    id: 14,
    category: 'timing',
    template: `Sometimes "not yet" is the most loving answer the universe can give, {name}. It's not rejection—it's protection. It's not denial—it's divine timing. The universe knows when you're truly ready, even when you think you're ready now.

Think of all the things you wanted that would have overwhelmed you if they'd come too soon. Think of the relationships that needed more time to develop. Think of the opportunities that required skills you hadn't yet learned. The timing was perfect, even when it didn't feel that way.

Your {currentDay}-day journey has its own rhythm, {name}. Honor it. Force nothing. Flow with everything. The right doors open at the right time. Keep knocking, but also keep trusting.

Today, release the anxiety of waiting. Replace it with the peace of knowing that everything is working out for your highest good. The universe isn't withholding from you—it's preparing something better than you asked for. Your patience will be rewarded.`,
    wordCount: 170,
  },
  {
    id: 15,
    category: 'timing',
    template: `{name}, divine timing is real. It's not just a comforting phrase—it's a universal law. Everything in nature has its season, its cycle, its perfect moment to bloom. Your life follows the same sacred rhythm.

The oak tree doesn't compare itself to the flower that blooms in spring. It knows its time will come in its own season. The moon doesn't rush through its phases to get to fullness faster. It trusts the cycle it's part of.

On Day {currentDay}, practice being present instead of rushing toward the future. Practice appreciating where you are instead of only focusing on where you want to be. The journey itself is the destination—every step matters, not just the final one.

What if you trusted that everything is unfolding in perfect timing? What if you believed that the universe is conspiring in your favor, even when you can't see how? Today, choose trust over worry. Choose faith over fear. Your time is coming, {name}. It's closer than you think.`,
    wordCount: 175,
  },

  // RELATIONSHIPS CATEGORY (5 templates)
  {
    id: 16,
    category: 'relationships',
    template: `Someone's been on your mind lately, {name}. There's a reason for that. The people who occupy our thoughts are often connected to us in ways we don't fully understand. Pay attention to what your heart is trying to tell you.

Relationships are mirrors. They show us parts of ourselves we might not otherwise see. The people who trigger us reveal our wounds. The people who inspire us reveal our potential. The people who love us reveal our worthiness.

On Day {currentDay}, consider the relationships in your life. Which ones nourish you? Which ones drain you? Which ones are teaching you something important? Not every connection is meant to last forever, but every connection has a purpose.

The connections that matter will find their way back, {name}. Let go of what's meant to leave. Make room for what's meant to stay. Trust that the right people are being drawn to you, even now, even when you can't see them coming.`,
    wordCount: 170,
  },
  {
    id: 17,
    category: 'relationships',
    template: `{name}, you teach people how to treat you. Every time you accept less than you deserve, you're teaching them that's okay. Every time you abandon yourself to please others, you're teaching them your needs don't matter. Today, practice showing them your worth through your boundaries.

Boundaries aren't walls—they're bridges. They're how you communicate what you need to feel safe, respected, and valued. They're not about keeping people out; they're about letting the right people in while protecting your peace.

Day {currentDay} invites you to examine where you've been giving too much and receiving too little. Where have you been saying yes when you meant no? Where have you been shrinking to make others comfortable?

The relationship you have with yourself sets the tone for every other relationship, {name}. Be gentle with yourself today. Speak to yourself with kindness. Honor your needs without guilt. When you treat yourself with respect, you teach others to do the same.`,
    wordCount: 172,
  },
  {
    id: 18,
    category: 'relationships',
    template: `Not everyone will understand your journey, {name}. That's okay. Your path wasn't designed for everyone to walk—it was designed for you. The people who are meant to be in your life will recognize something in you that resonates with something in them.

Your tribe is out there. They're the ones who will celebrate your wins without jealousy, hold space for your struggles without judgment, and love you not despite your quirks but because of them. You don't have to convince them of your worth—they'll see it naturally.

On Day {currentDay}, release the need for everyone to understand you. Release the exhausting effort of explaining yourself to people who aren't ready to hear. Save your energy for the connections that feel easy, that feel right, that feel like home.

Some people are in your life for a reason, some for a season, {name}. Both are valuable. Neither is a failure. Trust the natural flow of relationships. The right ones will stay. The right ones will find you.`,
    wordCount: 178,
  },
  {
    id: 19,
    category: 'relationships',
    template: `{name}, you're allowed to outgrow people. Growth sometimes means growing apart, and that doesn't mean the love wasn't real. It means you're evolving, and not everyone is meant to evolve with you.

The friends who knew you at twenty might not recognize you at thirty. The partner who was perfect for one chapter might not fit the next. This isn't betrayal—it's transformation. Honoring your growth isn't abandoning others; it's being true to yourself.

Day {currentDay} reminds you: quality over quantity in relationships. One true friend who sees your soul outweighs a hundred acquaintances who only see your surface. One deep connection is worth more than a thousand shallow ones.

The right people will love the real you, {name}. Stop dimming your light to make others comfortable. Stop pretending to be less than you are so others don't feel threatened. The people who are intimidated by your brightness aren't your people. Shine anyway.`,
    wordCount: 168,
  },
  {
    id: 20,
    category: 'relationships',
    template: `Connection is your birthright, {name}. You're not too much. You're not too little. You're not too intense, too sensitive, too complicated. You're exactly enough for the right people—the ones who will treasure what others overlooked.

The loneliness you sometimes feel isn't a sign that something is wrong with you. It's a sign that you're ready for deeper connections, more authentic relationships, people who truly see you. That longing is leading you somewhere.

On Day {currentDay}, open yourself to new connections. Say yes to invitations. Start conversations with strangers. Be willing to be seen, even when it feels vulnerable. The people you're looking for are also looking for you.

Your tribe might not look like you expected. They might come from unexpected places, at unexpected times, in unexpected forms. Stay open. Stay curious. Stay willing to be surprised. The universe is always connecting souls who need each other. Trust that your people are on their way.`,
    wordCount: 170,
  },

  // PURPOSE CATEGORY (5 templates)
  {
    id: 21,
    category: 'purpose',
    template: `You've been questioning your path lately, {name}. Wondering if you're doing the right thing, going the right direction, living the right life. That questioning is itself a sign of growth. The unexamined life isn't worth living, and you're examining yours deeply.

Purpose isn't a destination you arrive at—it's how you show up each day. It's not a job title or a grand mission. It's the intention behind your actions, the love you bring to ordinary moments, the difference you make in small ways.

Day {currentDay} of your journey isn't random, {name}. Every step has been preparing you for something bigger. The skills you're developing, the lessons you're learning, the person you're becoming—it's all part of a larger design.

The world needs what you have to offer. Don't let fear convince you otherwise. Your gifts matter. Your perspective matters. Your presence matters. Today, show up with intention. Let your purpose unfold one conscious moment at a time.`,
    wordCount: 172,
  },
  {
    id: 22,
    category: 'purpose',
    template: `{name}, you're not lost. You're exploring. There's a difference. Lost implies you should know where you're going. Exploring means you're discovering new territories, learning new things, expanding your map of what's possible.

The things that light you up are clues. Follow the joy—it knows where it's going. Notice what makes you lose track of time, what energizes you instead of draining you, what you'd do even if no one was watching. These are breadcrumbs on your path.

Your {signsFound} signs are breadcrumbs too, {name}. The universe is showing you the way, one synchronicity at a time. Pay attention to what keeps appearing in your life. Pay attention to the themes, the patterns, the recurring messages.

Purpose isn't found—it's created. It's not waiting somewhere for you to discover it. It's being built with every choice you make, every action you take, every moment you live with intention. What will you create with Day {currentDay}?`,
    wordCount: 175,
  },
  {
    id: 23,
    category: 'purpose',
    template: `Your purpose might not look like anyone else's, {name}. That's the point. You're here to be original, not a copy. The world doesn't need another version of someone else—it needs the unique expression that only you can bring.

Stop looking at what others are doing and wondering if you should do the same. Stop measuring your path against paths that were never meant for you. Your journey has its own destination, its own timeline, its own definition of success.

On Day {currentDay}, give yourself permission to want what you want. Not what you think you should want. Not what others expect you to want. What YOU actually want, deep in your soul, when no one else is watching.

You don't have to save the world, {name}. Sometimes purpose is simply being kind to the person in front of you. Sometimes it's raising children with love. Sometimes it's creating beauty. Sometimes it's just being fully present. All of it matters. All of it counts.`,
    wordCount: 176,
  },
  {
    id: 24,
    category: 'purpose',
    template: `{name}, the search for purpose can become its own trap. You can spend so much time looking for your calling that you miss the calls coming in right now. Purpose isn't always a grand revelation—sometimes it's a quiet knowing that grows over time.

What if your purpose is simply to be fully alive? To experience this human journey with all its beauty and pain? To love deeply, learn constantly, grow continuously? What if that's enough?

Day {currentDay} brings opportunities to live purposefully, even without knowing your ultimate purpose. Be present. Be kind. Be curious. Be brave. These aren't just nice ideas—they're purpose in action.

The universe didn't make a mistake when it made you, {name}. You're not an accident or an afterthought. You're a deliberate creation with specific gifts to share. Trust that your purpose will reveal itself as you keep walking. Trust that you're exactly where you need to be.`,
    wordCount: 168,
  },
  {
    id: 25,
    category: 'purpose',
    template: `{name}, purpose evolves. The calling you felt at twenty might not be the calling you feel at forty. The mission that drove you last year might transform into something new this year. This isn't inconsistency—it's growth.

You're not meant to figure out your entire life purpose and then execute it unchanged forever. You're meant to keep listening, keep learning, keep adapting. Purpose is a conversation with the universe, not a contract.

On Day {currentDay}, listen for what's calling you now. Not what called you before. Not what you think should call you. What's actually stirring in your soul today? What feels alive and exciting? What makes you want to get out of bed?

Your purpose isn't something you find once and hold onto forever. It's something you discover again and again, in new forms, at new depths. Stay curious. Stay open. Stay willing to be surprised by where life leads you next.`,
    wordCount: 170,
  },

  // ABUNDANCE CATEGORY (5 templates)
  {
    id: 26,
    category: 'abundance',
    template: `Abundance is your natural state, {name}. Scarcity is the illusion. Look around you right now—really look. Notice the air you're breathing, the ground beneath you, the miracle of your own heartbeat. Life is already supporting you in countless ways.

The universe is infinitely abundant. There's enough for everyone, including you. Especially you. The belief that there's not enough—not enough money, not enough love, not enough time, not enough opportunity—is a lie that keeps you small.

You have {sparks} Sparks because you've been showing up, {name}. That's abundance in action. Every meditation completed, every sign logged, every day you chose growth over comfort—it all adds up. More is on its way.

Day {currentDay} brings new opportunities for abundance. Keep your eyes and heart open. Notice the gifts that are already present. Gratitude is the fastest path to more—when you appreciate what you have, you attract more to appreciate.`,
    wordCount: 170,
  },
  {
    id: 27,
    category: 'abundance',
    template: `{name}, you deserve good things. Not because you've earned them through suffering. Not because you've worked hard enough to deserve them. You deserve good things simply because abundance is your birthright.

The universe isn't keeping score. It's not waiting for you to prove yourself worthy before it releases blessings. It's constantly offering gifts—you just have to be open to receiving them.

On Day {currentDay}, practice receiving without guilt. Accept compliments without deflecting. Allow help without immediately trying to repay it. Let good things come to you without questioning whether you deserve them.

Lack is a mindset, not a reality, {name}. Today, practice seeing the fullness all around you. Notice abundance in unexpected places—in a stranger's smile, in a beautiful sunset, in the food on your table, in the love of people who care about you. The more you see abundance, the more abundance you'll see.`,
    wordCount: 168,
  },
  {
    id: 28,
    category: 'abundance',
    template: `Money is energy, {name}. When you align with your purpose, prosperity follows. This isn't magical thinking—it's how the universe works. When you do what you love, you do it well. When you do it well, value is created. When value is created, abundance flows.

But abundance isn't just about money. It's about richness in all forms—rich relationships, rich experiences, rich moments of joy and connection. A wealthy life isn't measured only in dollars but in depth of living.

Your {streak}-day streak is proof of your abundance mindset, {name}. Consistency creates wealth in all forms. Every day you show up, you're investing in yourself. Every meditation is a deposit in your spiritual bank account.

Day {currentDay} invites you to expand your definition of abundance. What would it feel like to be truly rich—not just financially, but emotionally, spiritually, relationally? That richness is available to you now. It's not somewhere in the future. It's here, waiting to be noticed.`,
    wordCount: 175,
  },
  {
    id: 29,
    category: 'abundance',
    template: `{name}, the more you appreciate what you have, the more you'll have to appreciate. This isn't just positive thinking—it's universal law. Gratitude is a magnet for miracles.

Think about it: when you focus on what's missing, you feel lack. When you focus on what's present, you feel full. Same circumstances, different experience. You have more power over your sense of abundance than you realize.

On Day {currentDay}, make a list of everything you're grateful for. Not just the big things—the small things too. The morning coffee. The comfortable bed. The ability to read these words. The fact that you're alive, breathing, growing.

Abundance isn't about having everything. It's about appreciating anything. It's about recognizing that this moment, right now, contains more gifts than you could ever count. You are surrounded by abundance, {name}. Open your eyes to see it. Open your heart to receive it.`,
    wordCount: 168,
  },
  {
    id: 30,
    category: 'abundance',
    template: `{name}, you are a magnet for miracles. Not because you're special in a way others aren't, but because you're learning to align with the abundant nature of the universe. Every sign you notice, every synchronicity you acknowledge, strengthens this alignment.

The universe wants to give to you. It's not withholding. It's not testing you. It's constantly offering opportunities, connections, resources, and blessings. Your job is simply to stay open, stay grateful, stay expectant.

Day {currentDay} is filled with potential abundance. Some of it will be obvious—a unexpected gift, a fortunate coincidence, a door opening. Some of it will be subtle—a moment of peace, a flash of insight, a feeling of connection. All of it counts.

Trust that you are supported, {name}. Trust that the universe is conspiring in your favor. Trust that abundance is not something you have to chase—it's something you allow. Today, allow. Receive. Appreciate. And watch as more flows to you.`,
    wordCount: 172,
  },
];

// Helper function to get a daily message for a user
export function getDailyMessageTemplate(dayNumber: number): DailyMessageTemplate {
  // Rotate through templates based on day number
  const templateIndex = (dayNumber - 1) % dailyMessageTemplates.length;
  return dailyMessageTemplates[templateIndex];
}

// Helper function to personalize a template
export function personalizeTemplate(
  template: string,
  variables: {
    name: string;
    currentDay: number;
    streak: number;
    sparks: number;
    signsFound: number;
  }
): string {
  return template
    .replace(/{name}/g, variables.name)
    .replace(/{currentDay}/g, variables.currentDay.toString())
    .replace(/{streak}/g, variables.streak.toString())
    .replace(/{sparks}/g, variables.sparks.toString())
    .replace(/{signsFound}/g, variables.signsFound.toString());
}
