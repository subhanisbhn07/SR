import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Subscription status types
export type SubscriptionStatus = 'free' | 'trial' | 'active' | 'cancelled' | 'expired';

// Subscription plan types
export type PlanType = 'monthly' | 'yearly';

// Pricing as per PRD
export const PRICING = {
  monthly: {
    price: 8.99,
    currency: 'USD',
    interval: 'month',
    stripePriceId: 'price_monthly', // Replace with actual Stripe price ID
  },
  yearly: {
    price: 54.99,
    currency: 'USD',
    interval: 'year',
    stripePriceId: 'price_yearly', // Replace with actual Stripe price ID
    savings: Math.round((8.99 * 12 - 54.99) / (8.99 * 12) * 100), // ~49% savings
  },
};

// Free trial duration (configurable via admin)
export const DEFAULT_FREE_TRIAL_DAYS = 14;

// Free content limit (first 7 days/steps are free)
export const FREE_CONTENT_LIMIT = 7;

// Stripe configuration (to be set via admin panel)
export interface StripeConfig {
  publishableKey: string;
  isConfigured: boolean;
}

// Subscription state
export interface Subscription {
  status: SubscriptionStatus;
  planType: PlanType | null;
  startedAt: string | null;
  expiresAt: string | null;
  trialEndsAt: string | null;
  cancelledAt: string | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
}

interface SubscriptionState {
  // Current subscription
  subscription: Subscription;
  
  // Stripe configuration (admin-configurable)
  stripeConfig: StripeConfig;
  
  // Free trial days (admin-configurable)
  freeTrialDays: number;
  
  // Actions
  startFreeTrial: () => void;
  activateSubscription: (planType: PlanType, stripeSubscriptionId: string, stripeCustomerId: string) => void;
  cancelSubscription: () => void;
  expireSubscription: () => void;
  checkSubscriptionStatus: () => SubscriptionStatus;
  canAccessContent: (dayNumber: number) => boolean;
  canAccessPremiumFeature: (featureName: string) => boolean;
  isTrialExpired: () => boolean;
  getDaysRemainingInTrial: () => number;
  setStripeConfig: (config: Partial<StripeConfig>) => void;
  setFreeTrialDays: (days: number) => void;
  
  // Stripe checkout helpers
  createCheckoutSession: (planType: PlanType) => Promise<{ sessionId: string } | null>;
  handlePaymentSuccess: (sessionId: string) => Promise<boolean>;
}

// Default subscription state
const defaultSubscription: Subscription = {
  status: 'free',
  planType: null,
  startedAt: null,
  expiresAt: null,
  trialEndsAt: null,
  cancelledAt: null,
  stripeCustomerId: null,
  stripeSubscriptionId: null,
};

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set, get) => ({
      subscription: defaultSubscription,
      stripeConfig: {
        publishableKey: '',
        isConfigured: false,
      },
      freeTrialDays: DEFAULT_FREE_TRIAL_DAYS,

      startFreeTrial: () => {
        const { freeTrialDays } = get();
        const now = new Date();
        const trialEndsAt = new Date(now.getTime() + freeTrialDays * 24 * 60 * 60 * 1000);

        set({
          subscription: {
            ...defaultSubscription,
            status: 'trial',
            startedAt: now.toISOString(),
            trialEndsAt: trialEndsAt.toISOString(),
          },
        });
      },

      activateSubscription: (planType: PlanType, stripeSubscriptionId: string, stripeCustomerId: string) => {
        const now = new Date();
        const expiresAt = new Date(now);
        
        if (planType === 'monthly') {
          expiresAt.setMonth(expiresAt.getMonth() + 1);
        } else {
          expiresAt.setFullYear(expiresAt.getFullYear() + 1);
        }

        set({
          subscription: {
            status: 'active',
            planType,
            startedAt: now.toISOString(),
            expiresAt: expiresAt.toISOString(),
            trialEndsAt: null,
            cancelledAt: null,
            stripeCustomerId,
            stripeSubscriptionId,
          },
        });
      },

      cancelSubscription: () => {
        set(state => ({
          subscription: {
            ...state.subscription,
            status: 'cancelled',
            cancelledAt: new Date().toISOString(),
          },
        }));
      },

      expireSubscription: () => {
        set(state => ({
          subscription: {
            ...state.subscription,
            status: 'expired',
          },
        }));
      },

      checkSubscriptionStatus: () => {
        const { subscription } = get();
        const now = new Date();

        // Check if trial has expired
        if (subscription.status === 'trial' && subscription.trialEndsAt) {
          if (new Date(subscription.trialEndsAt) < now) {
            get().expireSubscription();
            return 'expired';
          }
        }

        // Check if subscription has expired
        if (subscription.status === 'active' && subscription.expiresAt) {
          if (new Date(subscription.expiresAt) < now) {
            get().expireSubscription();
            return 'expired';
          }
        }

        // Check if cancelled subscription has reached end date
        if (subscription.status === 'cancelled' && subscription.expiresAt) {
          if (new Date(subscription.expiresAt) < now) {
            get().expireSubscription();
            return 'expired';
          }
        }

        return subscription.status;
      },

      canAccessContent: (dayNumber: number) => {
        const status = get().checkSubscriptionStatus();

        // Free content (days 1-7) is always accessible
        if (dayNumber <= FREE_CONTENT_LIMIT) {
          return true;
        }

        // Premium content requires active subscription or trial
        return status === 'active' || status === 'trial';
      },

      canAccessPremiumFeature: (featureName: string) => {
        const status = get().checkSubscriptionStatus();

        // Premium features require active subscription or trial
        const hasPremiumAccess = status === 'active' || status === 'trial';

        // Some features have additional requirements
        switch (featureName) {
          case 'background_sounds':
            // Background sounds unlock at Day 15 for premium users
            return hasPremiumAccess;
          case 'offline_download':
            // Offline download is premium only
            return hasPremiumAccess;
          case 'tribes':
            // Tribes require active subscription (not trial)
            return status === 'active';
          case 'universe_receipt':
            // Universe receipt sharing is available to all
            return true;
          default:
            return hasPremiumAccess;
        }
      },

      isTrialExpired: () => {
        const { subscription } = get();
        if (subscription.status !== 'trial' || !subscription.trialEndsAt) {
          return subscription.status === 'expired' || subscription.status === 'free';
        }
        return new Date(subscription.trialEndsAt) < new Date();
      },

      getDaysRemainingInTrial: () => {
        const { subscription } = get();
        if (subscription.status !== 'trial' || !subscription.trialEndsAt) {
          return 0;
        }
        const now = new Date();
        const trialEnd = new Date(subscription.trialEndsAt);
        const diffTime = trialEnd.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return Math.max(0, diffDays);
      },

      setStripeConfig: (config: Partial<StripeConfig>) => {
        set(state => ({
          stripeConfig: {
            ...state.stripeConfig,
            ...config,
            isConfigured: !!(config.publishableKey || state.stripeConfig.publishableKey),
          },
        }));
      },

      setFreeTrialDays: (days: number) => {
        set({ freeTrialDays: days });
      },

      // Create Stripe checkout session
      createCheckoutSession: async (planType: PlanType) => {
        const { stripeConfig } = get();
        
        if (!stripeConfig.isConfigured) {
          console.log('Stripe not configured. Using mock checkout.');
          // Return mock session for demo purposes
          return { sessionId: `mock_session_${Date.now()}` };
        }

        try {
          // In production, this would call your backend API to create a Stripe checkout session
          // For now, we'll simulate the API call
          const pricing = PRICING[planType];
          
          // Mock API call - replace with actual backend call
          console.log(`Creating checkout session for ${planType} plan: $${pricing.price}/${pricing.interval}`);
          
          // Simulated response
          return { sessionId: `cs_${Date.now()}_${planType}` };
        } catch (error) {
          console.error('Failed to create checkout session:', error);
          return null;
        }
      },

      // Handle successful payment
      handlePaymentSuccess: async (sessionId: string) => {
        try {
          // In production, verify the session with your backend
          // For now, we'll simulate success
          console.log(`Processing payment success for session: ${sessionId}`);
          
          // Determine plan type from session ID (mock logic)
          const planType: PlanType = sessionId.includes('yearly') ? 'yearly' : 'monthly';
          
          // Activate subscription
          get().activateSubscription(
            planType,
            `sub_${Date.now()}`,
            `cus_${Date.now()}`
          );
          
          return true;
        } catch (error) {
          console.error('Failed to process payment:', error);
          return false;
        }
      },
    }),
    {
      name: 'signroad-subscription',
    }
  )
);

// Helper to format price
export const formatPrice = (price: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price);
};

// Helper to get subscription status label
export const getStatusLabel = (status: SubscriptionStatus): string => {
  switch (status) {
    case 'free':
      return 'Free';
    case 'trial':
      return 'Free Trial';
    case 'active':
      return 'Premium';
    case 'cancelled':
      return 'Cancelled';
    case 'expired':
      return 'Expired';
    default:
      return 'Unknown';
  }
};

// Helper to check if user should see paywall
export const shouldShowPaywall = (
  status: SubscriptionStatus,
  dayNumber: number
): boolean => {
  // Show paywall if trying to access premium content without subscription
  if (dayNumber > FREE_CONTENT_LIMIT) {
    return status === 'free' || status === 'expired';
  }
  return false;
};
