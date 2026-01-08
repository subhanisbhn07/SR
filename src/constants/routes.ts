/**
 * Centralized route constants for the SignRoad application
 * This eliminates duplication and ensures consistency across the app
 */

export interface LandingRoute {
  path: string;
  label: string;
  description: string;
}

// Landing page routes for feature-specific funnels
export const LANDING_PAGE_ROUTES: LandingRoute[] = [
  {
    path: '/universe-receipts',
    label: 'Universe Receipts',
    description: 'Proof when it manifests'
  },
  {
    path: '/daily-message',
    label: 'Daily Message',
    description: 'Grounded daily guidance'
  },
  {
    path: '/daily-audio',
    label: 'Daily Audio',
    description: '10-minute sessions'
  },
  {
    path: '/sleep-orb',
    label: 'Sleep Orb',
    description: '12 soundscapes for rest'
  }
];

// Main application routes
export const APP_ROUTES = {
  HOME: '/',
  ADMIN_SETTINGS: '/admin/settings',
  PLATFORM: '/platform',
} as const;

// External links
export const EXTERNAL_LINKS = {
  TERMS: '#',
  PRIVACY: '#',
  CONTACT: 'mailto:hello@signroad.com',
} as const;
