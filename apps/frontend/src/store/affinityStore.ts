import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Affinity types based on landing page funnels
export type AffinityType = 
  | 'universe-receipts'  // Proof-seekers
  | 'daily-message'      // Guidance-seekers
  | 'daily-audio'        // Simplicity-seekers
  | 'sleep-orb'          // Sleep-seekers
  | 'platform'           // Brand-aware / organic
  | null;

interface AffinityState {
  // User's affinity type based on which landing page they came from
  affinityType: AffinityType;
  
  // UTM parameters for analytics
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  
  // Timestamp when affinity was set
  affinitySetAt: number | null;
  
  // Actions
  setAffinity: (type: AffinityType) => void;
  setUtmParams: (source: string | null, medium: string | null, campaign: string | null) => void;
  clearAffinity: () => void;
  
  // Getters for personalized content
  getWelcomeStrip: () => { title: string; subtitle: string } | null;
  getHeroContent: () => { h1: string; sub: string };
}

export const useAffinityStore = create<AffinityState>()(
  persist(
    (set, get) => ({
      affinityType: null,
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      affinitySetAt: null,

      setAffinity: (type) => set({ 
        affinityType: type,
        affinitySetAt: Date.now()
      }),

      setUtmParams: (source, medium, campaign) => set({
        utmSource: source,
        utmMedium: medium,
        utmCampaign: campaign
      }),

      clearAffinity: () => set({
        affinityType: null,
        utmSource: null,
        utmMedium: null,
        utmCampaign: null,
        affinitySetAt: null
      }),

      // Get personalized welcome strip based on affinity
      getWelcomeStrip: () => {
        const { affinityType } = get();
        
        switch (affinityType) {
          case 'universe-receipts':
            return {
              title: 'You came here for proof.',
              subtitle: "Here's today's step toward your next receipt."
            };
          case 'daily-message':
            return {
              title: 'You came here for guidance.',
              subtitle: "Here's today's message waiting for you."
            };
          case 'daily-audio':
            return {
              title: 'You came here for simplicity.',
              subtitle: 'One audio, already picked for today.'
            };
          case 'sleep-orb':
            return {
              title: 'You came here for better rest.',
              subtitle: 'Your Sleep Orb is ready.'
            };
          default:
            return null; // No welcome strip for organic/platform users
        }
      },

      // Get personalized hero content based on affinity
      getHeroContent: () => {
        const { affinityType } = get();
        
        switch (affinityType) {
          case 'universe-receipts':
            return {
              h1: 'Your road to the next Universe Receipt',
              sub: 'One sign to watch for, one ritual to complete. Every step gets logged.'
            };
          case 'daily-message':
            return {
              h1: "Today's message is ready",
              sub: 'A grounded thought for today, plus one sign to watch for and a short ritual.'
            };
          case 'daily-audio':
            return {
              h1: "Press play on today's session",
              sub: "No browsing, no choosing. Just 10 minutes that fit where you are on your road."
            };
          case 'sleep-orb':
            return {
              h1: "Tonight's wind-down is waiting",
              sub: 'Tap the orb, pick your soundscape, and let your mind unclench.'
            };
          default:
            return {
              h1: "Here's today's stretch of your road",
              sub: 'One sign to watch for, one short ritual to complete, and one step closer to your next Universe Receipt.'
            };
        }
      }
    }),
    {
      name: 'signroad-affinity',
    }
  )
);
