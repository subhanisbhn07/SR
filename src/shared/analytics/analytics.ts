type AnalyticsEvent =
  | { name: 'day_completed'; day: number; sparks: number }
  | { name: 'sign_logged'; day: number; sign: string }
  | { name: 'journal_entry_saved'; day: number }
  | { name: 'universe_receipt_generated'; day: number; sign: string; probability: number }
  | { name: 'universe_receipt_shared'; day: number; platform: 'instagram' | 'twitter' | 'copy' }
  | { name: 'signal_strength_revealed'; day: number; strength: number }
  | { name: 'signal_strength_shared'; day: number; platform: 'instagram' | 'twitter' | 'copy' }
  | { name: 'twin_flame_code_revealed'; day: number; code: string }
  | { name: 'twin_flame_code_shared'; day: number; platform: 'instagram' | 'twitter' | 'copy' }
  | { name: 'twin_flame_match_attempted'; matched: boolean }
  | { name: 'subscription_modal_opened'; currentTier: string }
  | { name: 'subscription_started'; tier: 'SEEKER' }
  | { name: 'subscription_completed'; tier: 'SEEKER'; paymentMethod: string }
  | { name: 'cosmetic_purchased'; itemId: string; sparkCost: number }
  | { name: 'cosmetic_equipped'; itemId: string; category: string }
  | { name: 'feed_post_created'; day: number }
  | { name: 'feed_reaction_added'; postId: string; emoji: string }
  | { name: 'special_event_triggered'; day: number; eventType: string }
  | { name: 'audio_ambience_selected'; ambienceId: string; isPremium: boolean }
  | { name: 'meditation_started'; day: number; duration: number }
  | { name: 'meditation_completed'; day: number; duration: number };

export function trackEvent(event: AnalyticsEvent): void {
  // For now, log to console with timestamp
  const timestamp = new Date().toISOString();
  console.log(`[Analytics ${timestamp}]`, event);
  
  // In production, this would send to analytics service:
  // - Google Analytics
  // - Mixpanel
  // - Amplitude
  // - Segment
  // - Custom backend endpoint
  
  // Example future implementation:
  // if (typeof window !== 'undefined' && window.gtag) {
  //   window.gtag('event', event.name, event);
  // }
}

export function trackPageView(page: string): void {
  console.log(`[Analytics ${new Date().toISOString()}] Page View:`, page);
}

export function setUserProperties(userId: string, properties: Record<string, unknown>): void {
  console.log(`[Analytics ${new Date().toISOString()}] User Properties:`, { userId, ...properties });
}
