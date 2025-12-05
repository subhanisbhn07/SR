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
  | 'share_initiated';

interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

const isDevelopment = import.meta.env.DEV;

export const analytics = {
  track: (eventName: EventName, properties?: EventProperties) => {
    if (isDevelopment) {
      console.log(`[Analytics] ${eventName}`, properties);
    }
    
    if (typeof window !== 'undefined' && (window as { gtag?: Function }).gtag) {
      (window as { gtag?: Function }).gtag?.('event', eventName, properties);
    }
    
    if (typeof window !== 'undefined' && (window as { mixpanel?: { track: Function } }).mixpanel) {
      (window as { mixpanel?: { track: Function } }).mixpanel?.track(eventName, properties);
    }
  },

  identify: (userId: string, traits?: EventProperties) => {
    if (isDevelopment) {
      console.log(`[Analytics] Identify: ${userId}`, traits);
    }
    
    if (typeof window !== 'undefined' && (window as { mixpanel?: { identify: Function; people: { set: Function } } }).mixpanel) {
      const mp = (window as { mixpanel?: { identify: Function; people: { set: Function } } }).mixpanel;
      mp?.identify(userId);
      if (traits) {
        mp?.people.set(traits);
      }
    }
  },

  page: (pageName: string, properties?: EventProperties) => {
    analytics.track('page_view', { page: pageName, ...properties });
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
