export enum SubscriptionTier {
  WANDERER = 'wanderer',
  SEEKER = 'seeker',
  MASTER = 'master',
}

export interface SubscriptionStatus {
  tier: SubscriptionTier;
  isActive: boolean;
  startDate: Date;
  endDate?: Date;
  autoRenew: boolean;
}

export interface Entitlements {
  canAccessPremiumDays: boolean;
  canUseAudioMixer: boolean;
  canAccessPremiumCosmetics: boolean;
  maxDaysAccess: number;
  canAccessHallOfFame: boolean;
}

export const getEntitlements = (tier: SubscriptionTier): Entitlements => {
  switch (tier) {
    case SubscriptionTier.WANDERER:
      return {
        canAccessPremiumDays: false,
        canUseAudioMixer: false,
        canAccessPremiumCosmetics: false,
        maxDaysAccess: 14,
        canAccessHallOfFame: false,
      };
    case SubscriptionTier.SEEKER:
      return {
        canAccessPremiumDays: true,
        canUseAudioMixer: true,
        canAccessPremiumCosmetics: true,
        maxDaysAccess: 365,
        canAccessHallOfFame: false,
      };
    case SubscriptionTier.MASTER:
      return {
        canAccessPremiumDays: true,
        canUseAudioMixer: true,
        canAccessPremiumCosmetics: true,
        maxDaysAccess: Infinity,
        canAccessHallOfFame: true,
      };
  }
};
