// SignRoad Shared Types and DTOs
// This package contains all shared types, interfaces, and DTOs used across frontend, admin, and API

// ============================================================================
// USER TYPES
// ============================================================================

export interface User {
  id: string;
  email: string;
  fullName: string;
  username?: string;
  avatar?: string;
  manifestationGoal?: string;
  timezone: string;
  currentDay: number;
  currentRoadStep: number;
  streakCount: number;
  lastMeditationDate?: string;
  lanternBrightness: number;
  totalSparks: number;
  tribeId?: string;
  tribeAvatarIcon?: TribeAvatarIcon;
  preferredMessageTime?: string;
  subscriptionTier: SubscriptionTier;
  subscriptionStatus: SubscriptionStatus;
  onboardingCompleted: boolean;
  selectedRoad?: RoadType;
  trialEndsAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type SubscriptionTier = 'free' | 'seeker_monthly' | 'seeker_annual' | 'master_lifetime' | 'student';
export type SubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'canceled' | 'expired';
export type RoadType = 'sleep' | 'burnout' | 'manifest' | 'healing' | 'spiritual';
export type TribeAvatarIcon = 'fox' | 'owl' | 'deer' | 'eagle' | 'wolf' | 'bear' | 'lion' | 'panda';

// ============================================================================
// AUTHENTICATION DTOs
// ============================================================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  expiresIn: number;
}

export interface SignUpRequest {
  email: string;
  password: string;
  fullName: string;
  timezone?: string;
}

export interface SignUpResponse {
  user: User;
  accessToken: string;
  expiresIn: number;
}

export interface RefreshTokenResponse {
  accessToken: string;
  expiresIn: number;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface UpdatePasswordRequest {
  token: string;
  newPassword: string;
}

// ============================================================================
// SIGNS TYPES
// ============================================================================

export type SignRarity = 'whispered' | 'spoken' | 'shouted' | 'thundered' | 'cosmos_aligned';
export type SignCategory = 'nature' | 'animals' | 'numbers' | 'symbols' | 'colors' | 'sounds' | 'synchronicity';

export interface Sign {
  id: string;
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

export interface UserSignLog {
  id: string;
  userId: string;
  signId: string;
  sign?: Sign;
  foundAt: string;
  locationNote?: string;
  receiptGenerated: boolean;
  receiptUrl?: string;
  sharedPlatforms?: string[];
  sparksEarned: number;
  createdAt: string;
}

export interface LogSignRequest {
  signId: string;
  locationNote?: string;
}

export interface LogSignResponse {
  signLog: UserSignLog;
  sparksEarned: number;
  receiptUrl?: string;
}

// ============================================================================
// LANTERN TYPES
// ============================================================================

export type LanternState = 'bright' | 'steady' | 'dimming' | 'fading' | 'ember';

export interface LanternStatus {
  brightness: number;
  state: LanternState;
  lastActivityDate?: string;
  consecutiveDaysActive: number;
  totalDaysActive: number;
  rekindleCount: number;
  lastRekindleDate?: string;
}

export interface RekindleLanternResponse {
  lanternStatus: LanternStatus;
  sparksEarned: number;
}

// ============================================================================
// SPARKS & REWARDS TYPES
// ============================================================================

export type RewardCategory = 'avatar' | 'ambience' | 'badge' | 'lantern_skin';

export interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: RewardCategory;
  emoji: string;
  imageUrl?: string;
  isActive: boolean;
}

export interface UserReward {
  id: string;
  userId: string;
  rewardId: string;
  reward?: Reward;
  unlockedAt: string;
  isEquipped: boolean;
}

export interface UnlockRewardRequest {
  rewardId: string;
}

export interface UnlockRewardResponse {
  userReward: UserReward;
  remainingSparks: number;
}

// ============================================================================
// TRIBES TYPES
// ============================================================================

export interface Tribe {
  id: string;
  name: string;
  memberCount: number;
  maxMembers: number;
  timezone: string;
  meditationsToday: number;
  collectiveLanternHealth: number;
  createdAt: string;
}

export interface TribeMember {
  id: string;
  oderId: string;
  tribeId: string;
  avatarIcon: TribeAvatarIcon;
  lanternHealth: number;
  showedUpToday: boolean;
  isLeader: boolean;
  joinedAt: string;
}

export interface TribeWithMembers extends Tribe {
  members: TribeMember[];
}

export interface JoinTribeResponse {
  tribe: TribeWithMembers;
  assignedAvatar: TribeAvatarIcon;
}

export interface TribeCheckInResponse {
  tribe: TribeWithMembers;
  sparksEarned: number;
}

// ============================================================================
// DAILY MESSAGE TYPES
// ============================================================================

export type MessageCategory = 'transformation' | 'validation' | 'timing' | 'relationships' | 'purpose' | 'abundance';

export interface DailyMessage {
  id: string;
  userId: string;
  messageDate: string;
  templateId: string;
  templateCategory: MessageCategory;
  renderedText: string;
  personalizationScore: number;
  opened: boolean;
  openedAt?: string;
  timeSpentSeconds?: number;
  createdAt: string;
}

export interface GetDailyMessageResponse {
  message: DailyMessage;
  isNew: boolean;
}

// ============================================================================
// FUTURE YOU DROP-IN TYPES
// ============================================================================

export type FutureDropTrigger = 'day_7' | 'day_14' | 'day_30' | 'rare_sign' | 'rekindle' | 'milestone';

export interface FutureDrop {
  id: string;
  userId: string;
  messageText: string;
  triggerContext: FutureDropTrigger;
  relatedSignId?: string;
  writtenAt: string;
  deliverAfter: string;
  delivered: boolean;
  deliveredAt?: string;
}

export interface CreateFutureDropRequest {
  messageText: string;
  triggerContext: FutureDropTrigger;
  relatedSignId?: string;
  deliverAfterDays?: number;
}

export interface CreateFutureDropResponse {
  futureDrop: FutureDrop;
}

export interface GetPendingDropsResponse {
  drops: FutureDrop[];
}

// ============================================================================
// AFFIRMATION TYPES
// ============================================================================

export interface UserAffirmation {
  id: string;
  userId: string;
  originalText: string;
  groundedText?: string;
  transformationRuleUsed?: string;
  isActive: boolean;
  shownCount: number;
  createdAt: string;
  archivedAt?: string;
}

export interface CreateAffirmationRequest {
  text: string;
}

export interface CreateAffirmationResponse {
  affirmation: UserAffirmation;
  suggestedGroundings?: string[];
}

export interface GroundAffirmationRequest {
  affirmationId: string;
  chosenGroundedText: string;
}

// ============================================================================
// MEDITATION & CONTENT TYPES
// ============================================================================

export type JourneyPhase = 'awakening' | 'deepening' | 'transformation' | 'mastery' | 'embodiment' | 'transcendence';

export interface DailyContent {
  dayNumber: number;
  title: string;
  phase: JourneyPhase;
  meditationScript?: string;
  meditationAudioUrl?: string;
  durationSeconds: number;
  primarySignId?: string;
  theme: string;
  unlockTier: SubscriptionTier;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MeditationSession {
  id: string;
  userId: string;
  dayNumber: number;
  startedAt: string;
  completedAt?: string;
  durationListened: number;
  completed: boolean;
  sparksEarned: number;
}

export interface CompleteMeditationRequest {
  dayNumber: number;
  durationListened: number;
}

export interface CompleteMeditationResponse {
  session: MeditationSession;
  sparksEarned: number;
  lanternStatus: LanternStatus;
  nextDayUnlocked: boolean;
}

// ============================================================================
// SUBSCRIPTION TYPES
// ============================================================================

export interface Subscription {
  id: string;
  userId: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  plan: SubscriptionTier;
  status: SubscriptionStatus;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCheckoutRequest {
  plan: SubscriptionTier;
  successUrl: string;
  cancelUrl: string;
}

export interface CreateCheckoutResponse {
  checkoutUrl: string;
  sessionId: string;
}

export interface SubscriptionStatusResponse {
  subscription: Subscription;
  daysRemaining?: number;
  isTrialing: boolean;
}

// ============================================================================
// UNIVERSE RECEIPT TYPES
// ============================================================================

export interface UniverseReceipt {
  id: string;
  userId: string;
  signLogId?: string;
  goalId?: string;
  type: 'sign' | 'goal';
  title: string;
  subtitle?: string;
  daysActive: number;
  signsLogged: number;
  sessionsCompleted: number;
  probabilityBeaten: number;
  imageUrl?: string;
  createdAt: string;
}

export interface GenerateReceiptRequest {
  signLogId?: string;
  goalId?: string;
}

export interface GenerateReceiptResponse {
  receipt: UniverseReceipt;
  imageUrl: string;
}

// ============================================================================
// ONBOARDING TYPES
// ============================================================================

export type IntentionType = 'peace' | 'abundance' | 'love' | 'confidence' | 'clarity' | 'healing';

export interface CompleteOnboardingRequest {
  fullName: string;
  manifestationGoal: string;
  selectedRoad: RoadType;
  intention: IntentionType;
  timezone: string;
}

export interface CompleteOnboardingResponse {
  user: User;
  firstSign: Sign;
  firstDayContent: DailyContent;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ============================================================================
// CONSTANTS
// ============================================================================

export const SIGN_RARITY_DISTRIBUTION: Record<SignRarity, number> = {
  whispered: 0.70,
  spoken: 0.20,
  shouted: 0.07,
  thundered: 0.025,
  cosmos_aligned: 0.005,
};

export const SPARKS_REWARDS = {
  MEDITATION_COMPLETION: 10,
  SIGN_LOGGED: 5,
  TRIBE_BONUS: 5,
  MILESTONE_7: 25,
  MILESTONE_30: 25,
  MILESTONE_60: 25,
  MILESTONE_90: 25,
  REKINDLING_RETURN: 20,
} as const;

export const LANTERN_STATES: Record<LanternState, { min: number; max: number }> = {
  bright: { min: 80, max: 100 },
  steady: { min: 60, max: 79 },
  dimming: { min: 40, max: 59 },
  fading: { min: 20, max: 39 },
  ember: { min: 0, max: 19 },
};

export const SUBSCRIPTION_PRICES = {
  free: 0,
  seeker_monthly: 11.11,
  seeker_annual: 88.88,
  master_lifetime: 149,
  student: 44.44,
} as const;

export const FREE_TRIAL_DAYS = 14;
export const FREE_TRIAL_STEPS = 7;
export const MAX_TRIBE_MEMBERS = 5;
export const MAX_ACTIVE_SIGNS = 3;
export const TOTAL_SIGNS = 100;
export const TOTAL_JOURNEY_DAYS = 365;
