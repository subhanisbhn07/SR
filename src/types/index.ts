// === SIGNROAD PRD TYPES ===
// Based on SignRoad PRD v1.0 (December 8, 2024)

// === USER TYPES ===
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  mode: 'consumer' | 'enterprise';
  streak: number;
  totalSessions: number;
  joinedAt: Date;
  preferences: UserPreferences;
  lanternHealth: number;
  sparks: number;
  currentRoadStep: number;
  currentDay: number;
  tribeId?: string;
  tribeAvatarIcon?: string;
  subscriptionTier: SubscriptionTier;
  subscriptionStatus: SubscriptionStatus;
  trialEndsAt?: Date;
  manifestationGoal?: string;
  timezone: string;
  lastMeditationDate?: Date;
  onboardingCompleted: boolean;
}

export interface UserPreferences {
  notifications: boolean;
  reminderTime: string;
  focusAreas: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  preferredMessageTime: string;
}

export type SubscriptionTier = 'free' | 'seeker_monthly' | 'seeker_annual' | 'master_lifetime' | 'student';
export type SubscriptionStatus = 'trial' | 'active' | 'cancelled' | 'expired' | 'free';

// === SIGN TYPES (PRD: 100 signs database) ===
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

export type SignCategory = 
  | 'nature' 
  | 'numbers' 
  | 'animals' 
  | 'symbols' 
  | 'colors' 
  | 'sounds' 
  | 'encounters' 
  | 'dreams' 
  | 'synchronicity';

export type SignRarity = 'whispered' | 'spoken' | 'shouted' | 'thundered' | 'cosmos_aligned';

export interface UserSignLog {
  id: string;
  odId: string;
  signId: string;
  sign?: Sign;
  foundAt: Date;
  locationNote?: string;
  personalNote?: string;
  receiptGenerated: boolean;
  receiptUrl?: string;
  sharedPlatforms: string[];
  sparksEarned: number;
}

export interface UserActiveSign {
  id: string;
  odId: string;
  signId: string;
  sign?: Sign;
  assignedAt: Date;
  expiresAt: Date;
  isFound: boolean;
  foundAt?: Date;
}

// === DAILY CONTENT TYPES ===
export interface DailyContent {
  dayNumber: number;
  title: string;
  phase: 'foundation' | 'growth' | 'mastery' | 'transcendence';
  meditationScript: string;
  meditationAudioUrl?: string;
  durationSeconds: number;
  primarySignId?: string;
  theme: string;
  unlockTier: SubscriptionTier;
  isPublished: boolean;
}

// === TRIBE TYPES (PRD: 8-member tribes) ===
export interface Tribe {
  id: string;
  name: string;
  createdAt: Date;
  memberCount: number;
  maxMembers: number;
  timezone: string;
  meditationsToday: number;
  members: TribeMember[];
}

export interface TribeMember {
  id: string;
  odId: string;
  tribeId: string;
  avatarIcon: string;
  joinedAt: Date;
  meditatedToday: boolean;
  streakDays: number;
  isAnonymous: boolean;
}

// === DAILY MESSAGE TYPES (PRD: 60 Barnum templates) ===
export interface DailyMessage {
  id: string;
  odId: string;
  messageDate: Date;
  templateId: string;
  templateCategory: MessageCategory;
  renderedText: string;
  personalizationScore: number;
  opened: boolean;
  openedAt?: Date;
  timeSpentSeconds: number;
}

export type MessageCategory = 
  | 'motivation' 
  | 'reflection' 
  | 'gratitude' 
  | 'manifestation' 
  | 'synchronicity' 
  | 'encouragement';

export interface MessageTemplate {
  id: string;
  category: MessageCategory;
  template: string;
  variables: string[];
  isActive: boolean;
}

// === SUBSCRIPTION TYPES (PRD Pricing) ===
export interface Subscription {
  id: string;
  odId: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  plan: SubscriptionTier;
  status: SubscriptionStatus;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// === MEDITATION SESSION TYPES ===
export interface MeditationSession {
  id: string;
  odId: string;
  roadStep: number;
  dayNumber: number;
  startedAt: Date;
  completedAt?: Date;
  durationSeconds: number;
  completionPercentage: number;
  backgroundAudioId?: string;
  sparksEarned: number;
  lanternHealthChange: number;
}

// === SPARKS TRANSACTION TYPES ===
export interface SparksTransaction {
  id: string;
  odId: string;
  amount: number;
  source: SparksSource;
  sourceId?: string;
  balanceAfter: number;
  createdAt: Date;
}

export type SparksSource = 
  | 'meditation'
  | 'sign_found'
  | 'tribe_bonus'
  | 'milestone'
  | 'streak_bonus'
  | 'referral'
  | 'admin';

// === LANTERN TYPES ===
export interface LanternState {
  health: number;
  brightness: LanternBrightness;
  lastUpdated: Date;
  streakDays: number;
  needsRekindling: boolean;
}

export type LanternBrightness = 'bright' | 'warm' | 'dim' | 'flickering' | 'extinguished';

// === UNIVERSE RECEIPT TYPES (PRD: 1080x1920px) ===
export interface UniverseReceipt {
  id: string;
  odId: string;
  signLogId: string;
  signName: string;
  signEmoji: string;
  rarity: SignRarity;
  probability: string;
  timestamp: Date;
  locationCity?: string;
  locationState?: string;
  imageUrl?: string;
  sharedTo: string[];
}

// === MANIFESTATION TYPES ===
export interface Manifestation {
  id: string;
  odId: string;
  title: string;
  description?: string;
  category: ManifestationCategory;
  createdAt: Date;
  manifestedAt?: Date;
  isManifested: boolean;
  daysToManifest?: number;
  signsLogged: number;
  sessionsCompleted: number;
  probability?: number;
  isPublic: boolean;
}

export type ManifestationCategory = 
  | 'career' 
  | 'relationships' 
  | 'health' 
  | 'wealth' 
  | 'personal_growth' 
  | 'creativity' 
  | 'spirituality' 
  | 'other';

// === ROAD TYPES ===
export interface Road {
  id: string;
  name: string;
  description: string;
  emoji: string;
  totalSteps: number;
  freeSteps: number;
  theme: string;
  isActive: boolean;
}

export interface RoadStep {
  id: string;
  roadId: string;
  stepNumber: number;
  dayNumber: number;
  title: string;
  description: string;
  meditationId?: string;
  signIds: string[];
  isFree: boolean;
  isCompleted?: boolean;
}

// === AUDIO TYPES (PRD: 12 background options) ===
export interface AudioBackground {
  id: string;
  name: string;
  description: string;
  audioUrl: string;
  thumbnailUrl?: string;
  category: AudioCategory;
  unlockDay: number;
  isDownloadable: boolean;
  durationSeconds: number;
}

export type AudioCategory = 
  | 'nature' 
  | 'ambient' 
  | 'binaural' 
  | 'music' 
  | 'silence';

// === ENTERPRISE TYPES ===
export interface EnterpriseTeam {
  id: string;
  name: string;
  members: User[];
  wellnessScore: number;
  activePrograms: string[];
  analytics: TeamAnalytics;
}

export interface TeamAnalytics {
  engagement: number;
  productivity: number;
  satisfaction: number;
  retention: number;
  trends: {
    period: string;
    value: number;
  }[];
}

// === API RESPONSE TYPES ===
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
