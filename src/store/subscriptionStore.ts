import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// PRD: Subscription tiers and pricing
// Seeker Monthly: $8.99/month
// Seeker Annual: $44.99/year (save 58%)
// Master Lifetime: $149 one-time
// Student: 50% discount with verification

export type SubscriptionTier = 'free' | 'seeker_monthly' | 'seeker_annual' | 'master_lifetime' | 'student';
export type SubscriptionStatus = 'trial' | 'active' | 'cancelled' | 'expired' | 'free';

export interface SubscriptionPlan {
  id: string;
  tier: SubscriptionTier;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'month' | 'year' | 'lifetime';
  features: string[];
  stripePriceId?: string; // Stripe Price ID for checkout
  popular?: boolean;
}

export interface UserSubscription {
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  startDate: string | null;
  endDate: string | null;
  trialEndsAt: string | null;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  cancelAtPeriodEnd: boolean;
}

// PRD: Subscription plans
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    tier: 'free',
    name: 'Free Trial',
    description: '14 days of full access, no credit card required',
    price: 0,
    currency: 'USD',
    interval: 'month',
    features: [
      '14-day free trial',
      'First 7 road steps',
      'Basic meditation sessions',
      'Daily sign challenges',
      'Limited Sparks earning',
    ],
  },
  {
    id: 'seeker_monthly',
    tier: 'seeker_monthly',
    name: 'Seeker Monthly',
    description: 'Full access to your manifestation journey',
    price: 8.99,
    currency: 'USD',
    interval: 'month',
    stripePriceId: 'price_seeker_monthly', // Replace with actual Stripe Price ID
    features: [
      'Unlimited road steps',
      'All meditation sessions',
      'Full sign library (100 signs)',
      'Tribe membership',
      'Background audio library',
      'Priority support',
    ],
  },
  {
    id: 'seeker_annual',
    tier: 'seeker_annual',
    name: 'Seeker Annual',
    description: 'Best value - save 58%',
    price: 44.99,
    currency: 'USD',
    interval: 'year',
    stripePriceId: 'price_seeker_annual', // Replace with actual Stripe Price ID
    popular: true,
    features: [
      'Everything in Monthly',
      'Save 58% vs monthly',
      'Exclusive annual member badge',
      'Early access to new features',
      'Annual manifestation review',
    ],
  },
  {
    id: 'master_lifetime',
    tier: 'master_lifetime',
    name: 'Master Lifetime',
    description: 'One-time payment, forever access',
    price: 149,
    currency: 'USD',
    interval: 'lifetime',
    stripePriceId: 'price_master_lifetime', // Replace with actual Stripe Price ID
    features: [
      'Everything in Annual',
      'Lifetime access',
      'Master badge & avatar items',
      'Founding member recognition',
      'All future features included',
      'Direct founder access',
    ],
  },
  {
    id: 'student',
    tier: 'student',
    name: 'Student',
    description: '50% off with valid student email',
    price: 4.49,
    currency: 'USD',
    interval: 'month',
    stripePriceId: 'price_student', // Replace with actual Stripe Price ID
    features: [
      'Everything in Monthly',
      '50% student discount',
      'Valid .edu email required',
    ],
  },
];

interface SubscriptionState {
  subscription: UserSubscription;
  plans: SubscriptionPlan[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  getSubscription: () => UserSubscription;
  isTrialActive: () => boolean;
  isSubscribed: () => boolean;
  canAccessPremium: () => boolean;
  getTrialDaysRemaining: () => number;
  
  // Stripe integration stubs
  startTrial: () => void;
  createCheckoutSession: (planId: string) => Promise<{ url: string } | null>;
  cancelSubscription: () => Promise<boolean>;
  updateSubscription: (tier: SubscriptionTier, status: SubscriptionStatus) => void;
  
  // Utility
  clearError: () => void;
}

const getTrialEndDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 14); // PRD: 14-day free trial
  return date.toISOString();
};

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set, get) => ({
      subscription: {
        tier: 'free',
        status: 'free',
        startDate: null,
        endDate: null,
        trialEndsAt: null,
        cancelAtPeriodEnd: false,
      },
      plans: SUBSCRIPTION_PLANS,
      isLoading: false,
      error: null,
      
      getSubscription: () => get().subscription,
      
      isTrialActive: () => {
        const { subscription } = get();
        if (subscription.status !== 'trial' || !subscription.trialEndsAt) {
          return false;
        }
        return new Date(subscription.trialEndsAt) > new Date();
      },
      
      isSubscribed: () => {
        const { subscription } = get();
        return subscription.status === 'active' || get().isTrialActive();
      },
      
      canAccessPremium: () => {
        const { subscription } = get();
        // Can access premium if subscribed or in active trial
        if (subscription.status === 'active') return true;
        if (subscription.status === 'trial' && get().isTrialActive()) return true;
        return false;
      },
      
      getTrialDaysRemaining: () => {
        const { subscription } = get();
        if (!subscription.trialEndsAt) return 0;
        
        const now = new Date();
        const trialEnd = new Date(subscription.trialEndsAt);
        const diffTime = trialEnd.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return Math.max(0, diffDays);
      },
      
      startTrial: () => {
        const trialEndsAt = getTrialEndDate();
        set({
          subscription: {
            tier: 'free',
            status: 'trial',
            startDate: new Date().toISOString(),
            endDate: null,
            trialEndsAt,
            cancelAtPeriodEnd: false,
          },
        });
      },
      
      // Stripe checkout session stub
      // In production, this would call your backend API to create a Stripe Checkout Session
      createCheckoutSession: async (planId: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // STUB: In production, call your backend API
          // const response = await fetch('/api/stripe/create-checkout-session', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ planId }),
          // });
          // const data = await response.json();
          // return { url: data.url };
          
          console.log(`[Stripe Stub] Creating checkout session for plan: ${planId}`);
          
          // For demo purposes, simulate a successful response
          set({ isLoading: false });
          return { url: `https://checkout.stripe.com/demo/${planId}` };
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to create checkout session' 
          });
          return null;
        }
      },
      
      // Cancel subscription stub
      cancelSubscription: async () => {
        set({ isLoading: true, error: null });
        
        try {
          // STUB: In production, call your backend API
          // const response = await fetch('/api/stripe/cancel-subscription', {
          //   method: 'POST',
          // });
          
          console.log('[Stripe Stub] Cancelling subscription');
          
          set(state => ({
            isLoading: false,
            subscription: {
              ...state.subscription,
              cancelAtPeriodEnd: true,
            },
          }));
          
          return true;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to cancel subscription' 
          });
          return false;
        }
      },
      
      updateSubscription: (tier: SubscriptionTier, status: SubscriptionStatus) => {
        set(state => ({
          subscription: {
            ...state.subscription,
            tier,
            status,
            startDate: new Date().toISOString(),
            endDate: null,
          },
        }));
      },
      
      clearError: () => set({ error: null }),
    }),
    {
      name: 'signroad-subscription',
      partialize: (state) => ({
        subscription: state.subscription,
      }),
    }
  )
);

// Stripe webhook event types for reference
export type StripeWebhookEvent = 
  | 'checkout.session.completed'
  | 'customer.subscription.created'
  | 'customer.subscription.updated'
  | 'customer.subscription.deleted'
  | 'invoice.paid'
  | 'invoice.payment_failed';

// Helper function to handle Stripe webhooks (stub for backend implementation)
export const handleStripeWebhook = async (event: StripeWebhookEvent, data: unknown) => {
  console.log(`[Stripe Webhook Stub] Received event: ${event}`, data);
  
  // In production, this would be handled by your backend
  // switch (event) {
  //   case 'checkout.session.completed':
  //     // Update user subscription status
  //     break;
  //   case 'customer.subscription.deleted':
  //     // Handle subscription cancellation
  //     break;
  //   case 'invoice.payment_failed':
  //     // Handle failed payment
  //     break;
  // }
};
