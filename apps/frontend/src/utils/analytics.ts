// PRD: Analytics integration - Mixpanel, GA4, Sentry
// This file provides stubs for third-party analytics services

type EventName =
  | 'page_view'
  | 'sign_logged'
  | 'session_completed'
  | 'reward_unlocked'
  | 'tribe_joined'
  | 'course_started'
  | 'course_completed'
  | 'cta_clicked'
  | 'section_expanded'
  | 'theme_toggled'
  | 'onboarding_step'
  | 'share_initiated'
  | 'meditation_started'
  | 'meditation_completed'
  | 'sparks_earned'
  | 'lantern_rekindled'
  | 'subscription_started'
  | 'subscription_cancelled'
  | 'trial_started'
  | 'trial_ended';

interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

// Type-safe window extensions
interface AnalyticsWindow extends Window {
  gtag?: (command: string, eventName: string, properties?: EventProperties) => void;
  mixpanel?: {
    track: (eventName: string, properties?: EventProperties) => void;
    identify: (userId: string) => void;
    people: {
      set: (traits: EventProperties) => void;
    };
  };
  Sentry?: {
    captureException: (error: Error, context?: Record<string, unknown>) => void;
    captureMessage: (message: string, level?: string) => void;
    setUser: (user: { id: string; email?: string; username?: string } | null) => void;
    setTag: (key: string, value: string) => void;
  };
}

const isDevelopment = import.meta.env.DEV;

// Get typed window object
const getWindow = (): AnalyticsWindow | undefined => {
  if (typeof window !== 'undefined') {
    return window as AnalyticsWindow;
  }
  return undefined;
};

export const analytics = {
  track: (eventName: EventName, properties?: EventProperties) => {
    if (isDevelopment) {
      console.log(`[Analytics] ${eventName}`, properties);
    }
    
    const win = getWindow();
    if (win?.gtag) {
      win.gtag('event', eventName, properties);
    }
    
    if (win?.mixpanel) {
      win.mixpanel.track(eventName, properties);
    }
  },

  identify: (userId: string, traits?: EventProperties) => {
    if (isDevelopment) {
      console.log(`[Analytics] Identify: ${userId}`, traits);
    }
    
    const win = getWindow();
    if (win?.mixpanel) {
      win.mixpanel.identify(userId);
      if (traits) {
        win.mixpanel.people.set(traits);
      }
    }
    
    // Sentry user identification
    if (win?.Sentry) {
      win.Sentry.setUser({ id: userId });
    }
  },

  page: (pageName: string, properties?: EventProperties) => {
    analytics.track('page_view', { page: pageName, ...properties });
  },
};

// Sentry error tracking integration
export const errorTracking = {
  captureException: (error: Error, context?: Record<string, unknown>) => {
    if (isDevelopment) {
      console.error('[Sentry] Exception:', error, context);
    }
    
    const win = getWindow();
    if (win?.Sentry) {
      win.Sentry.captureException(error, context);
    }
  },
  
  captureMessage: (message: string, level: 'info' | 'warning' | 'error' = 'info') => {
    if (isDevelopment) {
      console.log(`[Sentry] ${level}: ${message}`);
    }
    
    const win = getWindow();
    if (win?.Sentry) {
      win.Sentry.captureMessage(message, level);
    }
  },
  
  setUser: (user: { id: string; email?: string; username?: string } | null) => {
    const win = getWindow();
    if (win?.Sentry) {
      win.Sentry.setUser(user);
    }
  },
  
  setTag: (key: string, value: string) => {
    const win = getWindow();
    if (win?.Sentry) {
      win.Sentry.setTag(key, value);
    }
  },
};

export const trackCTA = (ctaName: string, location: string) => {
  analytics.track('cta_clicked', { cta_name: ctaName, location });
};

export const trackOnboarding = (step: number, roadType?: string) => {
  analytics.track('onboarding_step', { step, road_type: roadType });
};

export const trackEngagement = (action: string, details?: EventProperties) => {
  analytics.track(action as EventName, details);
};
