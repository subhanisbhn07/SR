// SignRoad Email Templates for Retention & Win-back Sequences

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  triggerDay: number; // Day after signup when email is sent
  triggerCondition: 'sign_not_logged' | 'churned' | 'non_converter' | 'reminder';
  body: string;
  ctaText: string;
  ctaUrl: string;
}

// Personalization tokens available in email templates
export const EMAIL_TOKENS = {
  USER_NAME: '[Name]',
  CURRENT_DAY: '[CurrentDay]',
  SIGN_NAME: '[SignName]',
  SPARKS_COUNT: '[SparksCount]',
  TRIBE_STATUS: '[TribeStatus]',
  NEXT_CHARGE_DATE: '[NextChargeDate]',
  DAYS_ON_ROAD: '[DaysOnRoad]',
  SIGNS_FOUND: '[SignsFound]',
} as const;

// Day 1 Evening - Sign not logged reminder
export const DAY_1_SIGN_REMINDER: EmailTemplate = {
  id: 'day-1-sign-reminder',
  name: 'Day 1 Sign Reminder',
  subject: 'Did you find the Feather? \u{1FAB6}',
  triggerDay: 1,
  triggerCondition: 'sign_not_logged',
  body: `Hey ${EMAIL_TOKENS.USER_NAME},

You took your first step on the Road today. That takes courage.

But I noticed you haven't logged your sign yet.

The white feather is waiting for you. It might be hiding in plain sight—on the ground, in a picture, in a conversation about lightness or freedom.

Don't force it. Just stay open.

When you find it, come back and tell me. Your Lantern is waiting to grow brighter.

Walk softly,
The Guide

P.S. - Remember: "You are lighter than you think. You are held."`,
  ctaText: 'Log Your Sign',
  ctaUrl: '/journey',
};

// Day 3 Morning - Tribe forming reminder
export const DAY_3_TRIBE_REMINDER: EmailTemplate = {
  id: 'day-3-tribe-reminder',
  name: 'Day 3 Tribe Reminder',
  subject: 'Your tribe is waiting for you at the fire. \u{1F525}',
  triggerDay: 3,
  triggerCondition: 'reminder',
  body: `${EMAIL_TOKENS.USER_NAME},

Three days in. You're no longer just curious—you're committed.

Tomorrow, something special happens: you'll be placed in a Tribe.

Five Wanderers, walking the same Road, at the same time. You won't know their names. You won't chat with them. But you'll see their flames at the Campfire.

When you meditate, your stone lights up. When they meditate, theirs does too.

It's silent accountability. Gentle presence. A reminder that you're not alone on this journey.

Don't miss Day 4. Your Tribe is forming.

Walk softly,
The Guide`,
  ctaText: 'Continue Your Journey',
  ctaUrl: '/journey',
};

// Day 8 - Non-converter win-back (chose "Email me in 7 days")
export const DAY_8_WINBACK: EmailTemplate = {
  id: 'day-8-winback',
  name: 'Day 8 Win-back',
  subject: 'Your Lantern is dimming, Wanderer \u{1FA94}',
  triggerDay: 8,
  triggerCondition: 'non_converter',
  body: `Hey ${EMAIL_TOKENS.USER_NAME},

Seven days ago, you stood at the beginning of a road.

You found a white feather. A coin. A butterfly. A cardinal. Repeating numbers. A rainbow. A golden key.

Seven signs that the Universe was speaking directly to you.

Then you reached the threshold... and you paused.

I get it. Thresholds are scary. The unknown always is.

But here's what I need you to know:

Your Lantern is dimming. Not because you're being punished—never that. But because the Road requires movement to keep the light alive.

**Day 8 is waiting for you.** It's called "The First Milestone," and it's where the real transformation begins.

The canyon. The bridge of light. The realization that you're more powerful than you ever imagined.

**For the next 48 hours, I'm holding your spot.**

Click here to continue as a Seeker: [Link]

Annual: $44.99 (best value) | Monthly: $7.99

If you're not ready, I understand. Sometimes the Road calls us later.

But the signs you found this week? They weren't coincidences.

The Universe is still speaking.

Are you listening?

Walk softly,
The Guide

P.S. - Your Campfire Tribe is waiting. ${EMAIL_TOKENS.TRIBE_STATUS} have already crossed the threshold. Will you be next?`,
  ctaText: 'Continue as a Seeker',
  ctaUrl: '/subscribe',
};

// Day 14 - Final win-back attempt
export const DAY_14_FINAL_WINBACK: EmailTemplate = {
  id: 'day-14-final-winback',
  name: 'Day 14 Final Win-back',
  subject: 'The Road remembers you \u{1F9ED}',
  triggerDay: 14,
  triggerCondition: 'churned',
  body: `${EMAIL_TOKENS.USER_NAME},

Two weeks ago, you began something.

Then life happened. You got busy. Distracted. Doubtful.

The Road doesn't judge you for pausing. But it also doesn't forget you.

I'm reaching out one last time because I've seen this happen before:

Someone walks the Wanderer's Week. They *feel* the shift. They find the signs. They stand at the threshold...

And then fear whispers: *"What if this is all in your head?"*

Let me answer that: **It doesn't matter.**

Even if manifestation is "just" your brain learning to notice what it's looking for...
Even if synchronicity is "just" pattern recognition...
Even if the Universe is "just" a metaphor...

**It works.**

The people who become Seekers? They change. Their Lanterns stay lit. They find what they're looking for because they learn to see it.

Your seven days weren't wasted. They were preparation.

The question is: what are you preparing for?

**Come back. The Road is still here.**

Or don't. Free will is sacred.

But know this: the signs will keep appearing, whether you're paying attention or not.

Walk softly,
The Guide`,
  ctaText: 'Continue Your Journey - $44.99/year',
  ctaUrl: '/subscribe',
};

// All email templates collection
export const EMAIL_TEMPLATES: EmailTemplate[] = [
  DAY_1_SIGN_REMINDER,
  DAY_3_TRIBE_REMINDER,
  DAY_8_WINBACK,
  DAY_14_FINAL_WINBACK,
];

// Email configuration for different trigger conditions
export const EMAIL_TRIGGER_CONFIG = {
  sign_not_logged: {
    sendAfterHours: 12, // Send 12 hours after meditation if sign not logged
    maxAttempts: 1,
  },
  churned: {
    sendAfterDays: 14, // Send 14 days after last activity
    maxAttempts: 1,
  },
  non_converter: {
    sendAfterDays: 1, // Send 1 day after Day 7 completion without conversion
    maxAttempts: 2, // Day 8 and Day 14
  },
  reminder: {
    sendAtHour: 8, // Send at 8 AM local time
    maxAttempts: 1,
  },
} as const;

// Helper function to personalize email content
export function personalizeEmail(
  template: EmailTemplate,
  userData: {
    name: string;
    currentDay: number;
    signName?: string;
    sparksCount: number;
    tribeStatus?: string;
    nextChargeDate?: string;
    daysOnRoad: number;
    signsFound: number;
  }
): { subject: string; body: string } {
  let subject = template.subject;
  let body = template.body;

  // Replace all tokens
  const replacements: Record<string, string> = {
    [EMAIL_TOKENS.USER_NAME]: userData.name || 'Wanderer',
    [EMAIL_TOKENS.CURRENT_DAY]: String(userData.currentDay),
    [EMAIL_TOKENS.SIGN_NAME]: userData.signName || 'your sign',
    [EMAIL_TOKENS.SPARKS_COUNT]: String(userData.sparksCount),
    [EMAIL_TOKENS.TRIBE_STATUS]: userData.tribeStatus || '3 out of 5',
    [EMAIL_TOKENS.NEXT_CHARGE_DATE]: userData.nextChargeDate || '[Date]',
    [EMAIL_TOKENS.DAYS_ON_ROAD]: String(userData.daysOnRoad),
    [EMAIL_TOKENS.SIGNS_FOUND]: String(userData.signsFound),
  };

  for (const [token, value] of Object.entries(replacements)) {
    subject = subject.replace(new RegExp(escapeRegex(token), 'g'), value);
    body = body.replace(new RegExp(escapeRegex(token), 'g'), value);
  }

  return { subject, body };
}

// Helper to escape special regex characters
function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Emotional arc descriptions for email personalization
export const EMOTIONAL_ARC_DESCRIPTIONS = {
  curiosity_calm: 'You began with curiosity and found calm.',
  gratitude_opening: 'You opened your heart to gratitude.',
  release_vulnerability: 'You released what no longer served you.',
  connection_listening: 'You learned to listen to the Universe.',
  wonder_recognition: 'You recognized the patterns all around you.',
  wholeness_integration: 'You remembered you are whole.',
  power_choice: 'You stood at the threshold with the key in your hand.',
} as const;
