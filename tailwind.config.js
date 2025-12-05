/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // === SIGNROAD BRAND COLOR SYSTEM ===
        // Distribution: 60% Neutral | 30% Emerald/Teal | 10% Gold
        // 
        // USAGE GUIDE:
        // - 60% NEUTRAL: Backgrounds, cards, surfaces, body text
        // - 30% EMERALD + TEAL: Headers, icons, navigation, secondary buttons
        // - 10% GOLD: CTAs, rewards, badges, success indicators, premium elements
        //
        // === PRIMARY BRAND COLOR - EMERALD ===
        // Use for: Brand identity, logo, key header stripes, navigation, growth/progress
        emerald: {
          DEFAULT: '#0F6F55',
          50: '#E6F5F1',
          100: '#CCEBe3',
          200: '#99D7C7',
          300: '#66C3AB',
          400: '#33AF8F',
          500: '#0F6F55', // Deep Emerald - Primary
          600: '#0D5F49',
          700: '#0A4F3D',
          800: '#083F31',
          900: '#052F25',
          950: '#031F19',
        },
        // Secondary Brand Color - TEAL (Trust, clarity, stability)
        teal: {
          DEFAULT: '#11A39E',
          50: '#E7F8F7',
          100: '#CFF1F0',
          200: '#9FE3E1',
          300: '#6FD5D2',
          400: '#3FC7C3',
          500: '#11A39E', // Modern Teal - Secondary
          600: '#0E8A86',
          700: '#0B716E',
          800: '#085856',
          900: '#053F3E',
          950: '#032626',
        },
        // Accent Brand Color - GOLD (Reward, dopamine, premium)
        gold: {
          DEFAULT: '#EEC76A',
          50: '#FDF9EE',
          100: '#FBF3DD',
          200: '#F7E7BB',
          300: '#F3DB99',
          400: '#EFCF77',
          500: '#EEC76A', // Soft Champagne Gold - Accent
          600: '#DDBB5E', // Hover state
          700: '#C9A84E',
          800: '#A68B3E',
          900: '#836E2E',
          950: '#60511E',
        },
        // === NEUTRAL PALETTE (Tier-1 Premium Standard) ===
        neutral: {
          white: '#FFFFFF',      // Pure white - surfaces, cards
          50: '#FAFAFA',         // Soft Gray - background
          100: '#ECEFF1',        // Cool Gray - separators, card outlines
          200: '#E5E7EB',
          300: '#CFD8DC',        // Cool Gray - muted icons, disabled states
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#5F6A6D',        // Secondary text
          700: '#394244',        // Charcoal - text primary (light mode)
          800: '#1C2425',        // Dark Slate - text primary (dark mode bg)
          900: '#1E1E1E',        // Primary text dark
          950: '#0F0F0F',
        },
        // === TEXT COLORS ===
        text: {
          primary: '#1E1E1E',    // Dark - light mode body text
          secondary: '#5F6A6D',  // Descriptions, sublabels
          muted: '#8A999C',      // Hints, placeholders
          inverse: '#F2F5F7',    // Text on emerald or teal backgrounds
        },
        // === STATE COLORS ===
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',        // Success - green-mint
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',        // Warning - amber
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',        // Error - modern red
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        info: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',        // Info - cyan-blue
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        // === SEMANTIC SURFACE TOKENS (TIER-1 PREMIUM) ===
        // Use these for consistent component styling across the app
        surface: {
          // Backgrounds - Premium off-white for warmth
          'page': '#FAF8F3',              // Off-white - premium warm background (light)
          'page-dark': '#0F1210',         // Soft charcoal - premium dark background
          'card': '#FFFFFF',              // Crisp white - card surfaces (light)
          'card-warm': '#FFFEFB',         // Warm white - elevated cards (light)
          'card-dark': '#151817',         // Charcoal - card surfaces (dark)
          'elevated': '#FFFFFF',          // Elevated surfaces (light)
          'elevated-dark': '#1A1D1C',     // Elevated surfaces (dark)
          // Footer backgrounds
          'footer': '#F1F4F2',            // Soft neutral footer (light)
          'footer-dark': '#111614',       // Dark footer
          // Interactive
          'hover': '#F5F5F5',             // Hover state (light)
          'hover-dark': '#1E2220',        // Hover state (dark)
          'active': '#E5E5E5',            // Active/pressed state (light)
          'active-dark': '#252928',       // Active/pressed state (dark)
        },
        // === MUTED VARIANTS FOR DARK MODE (Premium, less neon) ===
        // Use these for dark mode surfaces to avoid crypto/game vibes
        muted: {
          'teal': '#0F8F87',              // Teal -20% saturation for dark mode
          'gold': '#D6B15A',              // Gold -15% brightness for dark mode surfaces
          'gold-surface': '#C9A84E',      // Even more muted gold for backgrounds
        },
        // === INTENTION TINTS (Tinted neutrals, not pastels) ===
        // Use for Explore by Intention cards instead of pastels
        intent: {
          'peace': '#F3F7F6',             // Inner Peace - soft mint neutral
          'motivation': '#F7F4EF',        // Motivation - warm sand neutral
          'gratitude': '#F4F6FB',         // Gratitude - soft blue neutral
          'abundance': '#F6F5F0',         // Abundance - cream neutral
          'sleep': '#F2F4F7',             // Sleep - cool gray neutral
          'healing': '#F5F3F6',           // Healing - soft lavender neutral
        },
        // === SEMANTIC COMPONENT TOKENS ===
        // Button colors
        btn: {
          'primary': '#0F6F55',        // Emerald - primary CTA
          'primary-hover': '#0D5F49',  // Emerald darker - hover
          'secondary': '#11A39E',      // Teal - secondary actions
          'secondary-hover': '#0E8A86', // Teal darker - hover
          'accent': '#EEC76A',         // Gold - reward/premium CTAs
          'accent-hover': '#DDBB5E',   // Gold darker - hover
          'ghost': 'transparent',      // Ghost button
          'ghost-hover': 'rgba(15, 111, 85, 0.1)', // Ghost hover
        },
        // Badge colors
        badge: {
          'new': '#11A39E',            // Teal - "NEW" badges
          'popular': '#EEC76A',        // Gold - "Popular" badges
          'premium': '#0F6F55',        // Emerald - "Premium" badges
          'free': '#10B981',           // Success green - "Free" badges
        },
        // Progress colors
        progress: {
          'track': '#E5E7EB',          // Light track
          'track-dark': '#333333',     // Dark track
          'fill': '#0F6F55',           // Emerald fill
          'fill-gold': '#EEC76A',      // Gold fill for rewards
        },
        // Legacy aliases for backward compatibility
        primary: {
          50: '#E6F5F1',
          100: '#CCEBe3',
          200: '#99D7C7',
          300: '#66C3AB',
          400: '#33AF8F',
          500: '#0F6F55',
          600: '#0D5F49',
          700: '#0A4F3D',
          800: '#083F31',
          900: '#052F25',
          950: '#031F19',
        },
        secondary: {
          50: '#E7F8F7',
          100: '#CFF1F0',
          200: '#9FE3E1',
          300: '#6FD5D2',
          400: '#3FC7C3',
          500: '#11A39E',
          600: '#0E8A86',
          700: '#0B716E',
          800: '#085856',
          900: '#053F3E',
          950: '#032626',
        },
        accent: {
          50: '#FDF9EE',
          100: '#FBF3DD',
          200: '#F7E7BB',
          300: '#F3DB99',
          400: '#EFCF77',
          500: '#EEC76A',
          600: '#DDBB5E',
          700: '#C9A84E',
          800: '#A68B3E',
          900: '#836E2E',
          950: '#60511E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
