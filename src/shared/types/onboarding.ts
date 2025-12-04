export type LifePath = 
  | 'student'
  | 'salaried'
  | 'entrepreneur'
  | 'parent'
  | 'career_transition'
  | 'retired';

export type PrimaryStruggle = 
  | 'work_stress'
  | 'money_worries'
  | 'sleep_issues'
  | 'loneliness'
  | 'healing'
  | 'seeking_meaning';

export type TimeAvailable = '2-5min' | '10-15min' | '20+min';

export type PreferredMode = 'solo_audio' | 'journaling' | 'group_support';

export type GenderIdentity = 'male' | 'female' | 'non_binary' | 'prefer_not_to_say';

export type ContentTone = 'science_based' | 'mystical' | 'balanced';

export type ExperienceLevel = 'new' | 'some_experience' | 'regular_practice';

export type GoalTimeframe = 'quick_relief' | 'building_habit' | 'long_term_transformation';

export interface OnboardingAnswers {
  lifePath: LifePath;
  primaryStruggle: PrimaryStruggle;
  timeAvailable: TimeAvailable;
  preferredMode: PreferredMode;
  genderIdentity?: GenderIdentity;
  contentTone: ContentTone;
  experienceLevel: ExperienceLevel;
  goalTimeframe: GoalTimeframe;
}

export interface UserProfile extends OnboardingAnswers {
  hasCompletedOnboarding: boolean;
  onboardingCompletedAt?: Date;
}
