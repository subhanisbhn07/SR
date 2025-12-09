/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // === SIGNROAD DESIGN SYSTEM v1 ===
        // "TRANSFORMATIVE TEAL FRAMEWORK"
        // 
        // COLOR USAGE RATIOS (Critical for Tier-1 Premium):
        // - 70% NEUTRAL: Backgrounds, cards, surfaces, body text
        // - 15% PRIMARY TEAL: Navigation, primary buttons, brand identity
        // - 10% SECONDARY TEAL: Icons, secondary buttons, highlights, hover states
        // - 5% GOLD: Rewards, achievements, premium CTAs, badges (SPARINGLY!)
        //
        // === PRIMARY BRAND COLOR - TRANSFORMATIVE TEAL ===
        // Psychology: Calm innovation, conscious decisions, bridges nature + technology
        // Use for: Navigation, primary buttons, brand identity, key UI chrome
        teal: {
          DEFAULT: '#0E7A77',
          50: '#E6F5F4',
          100: '#CCEBe9',
          200: '#99D7D3',
          300: '#66C3BD',
          400: '#33AFA7',
          500: '#0E7A77', // Transformative Teal - PRIMARY
          600: '#0C6966',
          700: '#0A5855',
          800: '#084744',
          900: '#063633',
          950: '#042522',
        },
        // === SECONDARY BRAND COLOR - TEAL SOFT ===
        // Psychology: Approachability, interaction signaling, gentle invitation
        // Use for: Icons, secondary buttons, highlights, hover states
        'teal-soft': {
          DEFAULT: '#17A7A2',
          50: '#E8F7F6',
          100: '#D1EFED',
          200: '#A3DFDB',
          300: '#75CFC9',
          400: '#47BFB7',
          500: '#17A7A2', // Teal Soft - SECONDARY
          600: '#148F8B',
          700: '#117774',
          800: '#0E5F5D',
          900: '#0B4746',
          950: '#082F2F',
        },
        // === ACCENT BRAND COLOR - GOLD ===
        // Psychology: Emotional uplift, reward wiring, premium association
        // Use for: Rewards, achievements, premium CTAs, badges (SPARINGLY - 5% max!)
        gold: {
          DEFAULT: '#EEC76A',
          50: '#FDF9EE',
          100: '#FBF3DD',
          200: '#F7E7BB',
          300: '#F3DB99',
          400: '#EFCF77',
          500: '#EEC76A', // Gold - ACCENT (use sparingly!)
          600: '#DDBB5E', // Hover state
          700: '#C9A84E',
          800: '#A68B3E',
          900: '#836E2E',
          950: '#60511E',
          // Dark mode variant (prevents harsh glare in Moon Mode)
          'dark': '#D6B35C',
        },
        // Legacy emerald alias (maps to teal for backward compatibility)
        emerald: {
          DEFAULT: '#0E7A77',
          50: '#E6F5F4',
          100: '#CCEBe9',
          200: '#99D7D3',
          300: '#66C3BD',
          400: '#33AFA7',
          500: '#0E7A77',
          600: '#0C6966',
          700: '#0A5855',
          800: '#084744',
          900: '#063633',
          950: '#042522',
        },
        // === NEUTRAL PALETTE (Design System v1) ===
        // Sun Mode (Light) and Moon Mode (Dark) specific values
        neutral: {
          white: '#FFFFFF',      // Pure white - card surfaces (light)
          50: '#F6F7F8',         // Page Background (Sun Mode) - EXACT from spec
          100: '#E5E9EB',        // Border/Divider (Sun Mode) - EXACT from spec
          200: '#E5E7EB',
          300: '#CFD8DC',        // Cool Gray - muted icons
          400: '#8A9A9A',        // Muted/Disabled (Sun Mode) - EXACT from spec
          500: '#5B6B6E',        // Text Secondary (Sun Mode) - EXACT from spec
          600: '#5B6B6E',        // Secondary text alias
          700: '#1C1F21',        // Text Primary (Sun Mode) - EXACT from spec
          800: '#1C1F21',        // Text Primary alias
          900: '#1C1F21',        // Primary text
          950: '#121E1D',        // Page Background (Moon Mode) - EXACT from spec
        },
        // === TEXT COLORS (Design System v1) ===
        text: {
          // Sun Mode (Light)
          primary: '#1C1F21',    // Text Primary (Sun Mode) - EXACT from spec
          secondary: '#5B6B6E',  // Text Secondary (Sun Mode) - EXACT from spec
          muted: '#8A9A9A',      // Muted/Disabled (Sun Mode) - EXACT from spec
          inverse: '#E0E4E3',    // Text on teal backgrounds
          // Moon Mode (Dark) - use dark: prefix in components
          'primary-dark': '#E0E4E3',    // Text Primary (Moon Mode) - EXACT from spec
          'secondary-dark': '#A3B0AE',  // Text Secondary (Moon Mode) - EXACT from spec
          'muted-dark': '#4A5856',      // Muted/Disabled (Moon Mode) - EXACT from spec
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
        // === SEMANTIC SURFACE TOKENS (Design System v1) ===
        // Sun Mode (Light) and Moon Mode (Dark) exact values from spec
        surface: {
          // Sun Mode (Light) - EXACT from spec
          'page': '#F6F7F8',              // Page Background (Sun Mode)
          'card': '#FFFFFF',              // Card Surface (Sun Mode)
          'border': '#E5E9EB',            // Border/Divider (Sun Mode) - subtle
          'border-strong': '#C8CED2',     // Stronger border for visible card edges (Sun Mode)
          // Moon Mode (Dark) - EXACT from spec
          'page-dark': '#121E1D',         // Page Background (Moon Mode)
          'card-dark': '#1A2D2B',         // Card Surface (Moon Mode)
          'border-dark': '#253333',       // Border/Divider (Moon Mode) - subtle
          'border-dark-strong': '#3A4A48', // Stronger border for visible card edges (Moon Mode)
          // Elevated surfaces
          'elevated': '#FFFFFF',          // Elevated surfaces (light)
          'elevated-dark': '#1A2D2B',     // Elevated surfaces (dark) - same as card-dark
          // Footer backgrounds
          'footer': '#F6F7F8',            // Footer (light) - same as page
          'footer-dark': '#121E1D',       // Footer (dark) - same as page-dark
          // Interactive states
          'hover': '#F0F1F2',             // Hover state (light)
          'hover-dark': '#223332',        // Hover state (dark)
          'active': '#E5E9EB',            // Active/pressed state (light)
          'active-dark': '#2A3B39',       // Active/pressed state (dark)
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
        // === SEMANTIC COMPONENT TOKENS (Design System v1) ===
        // Button colors - per spec
        btn: {
          'primary': '#0E7A77',        // Transformative Teal - primary CTA
          'primary-hover': '#0C6966',  // Teal darker - hover
          'secondary': '#17A7A2',      // Teal Soft - secondary actions
          'secondary-hover': '#148F8B', // Teal Soft darker - hover
          'accent': '#EEC76A',         // Gold - reward/premium CTAs (use sparingly!)
          'accent-hover': '#DDBB5E',   // Gold darker - hover
          'ghost': 'transparent',      // Ghost button
          'ghost-hover': 'rgba(14, 122, 119, 0.1)', // Ghost hover (teal tint)
        },
        // Badge colors - per Design System v1
        badge: {
          'new': '#17A7A2',            // Teal Soft - "NEW" badges
          'popular': '#EEC76A',        // Gold - "Popular" badges
          'premium': '#0E7A77',        // Transformative Teal - "Premium" badges
          'free': '#10B981',           // Success green - "Free" badges
        },
        // Progress colors - per Design System v1
        progress: {
          'track': '#E5E9EB',          // Light track (Sun Mode border)
          'track-dark': '#253333',     // Dark track (Moon Mode border)
          'fill': '#0E7A77',           // Transformative Teal fill
          'fill-gold': '#EEC76A',      // Gold fill for rewards
        },
        // Legacy aliases for backward compatibility (maps to Design System v1 colors)
        primary: {
          50: '#E6F5F4',
          100: '#CCEBe9',
          200: '#99D7D3',
          300: '#66C3BD',
          400: '#33AFA7',
          500: '#0E7A77', // Transformative Teal
          600: '#0C6966',
          700: '#0A5855',
          800: '#084744',
          900: '#063633',
          950: '#042522',
        },
        secondary: {
          50: '#E8F7F6',
          100: '#D1EFED',
          200: '#A3DFDB',
          300: '#75CFC9',
          400: '#47BFB7',
          500: '#17A7A2', // Teal Soft
          600: '#148F8B',
          700: '#117774',
          800: '#0E5F5D',
          900: '#0B4746',
          950: '#082F2F',
        },
        accent: {
          50: '#FDF9EE',
          100: '#FBF3DD',
          200: '#F7E7BB',
          300: '#F3DB99',
          400: '#EFCF77',
          500: '#EEC76A', // Gold
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
      // === NEUMORPHIC SHADOW SYSTEM ===
      // Premium soft UI shadows using Transformative Teal as accent
      boxShadow: {
        // Light mode neumorphic shadows (soft, premium feel)
        'neu-sm': '4px 4px 8px #d1d5db, -4px -4px 8px #ffffff',
        'neu': '6px 6px 12px #d1d5db, -6px -6px 12px #ffffff',
        'neu-md': '8px 8px 16px #d1d5db, -8px -8px 16px #ffffff',
        'neu-lg': '12px 12px 24px #d1d5db, -12px -12px 24px #ffffff',
        'neu-xl': '20px 20px 40px #c4c9cd, -20px -20px 40px #ffffff',
        // Inset shadows (pressed state)
        'neu-inset': 'inset 4px 4px 8px #d1d5db, inset -4px -4px 8px #ffffff',
        'neu-inset-sm': 'inset 2px 2px 4px #d1d5db, inset -2px -2px 4px #ffffff',
        // Teal-tinted shadows for accent elements
        'neu-teal': '6px 6px 12px rgba(14, 122, 119, 0.15), -6px -6px 12px #ffffff',
        'neu-teal-glow': '0 0 20px rgba(14, 122, 119, 0.2), 6px 6px 12px #d1d5db, -6px -6px 12px #ffffff',
        // Gold accent shadow
        'neu-gold': '6px 6px 12px rgba(238, 199, 106, 0.2), -6px -6px 12px #ffffff',
        // Dark mode neumorphic shadows
        'neu-dark-sm': '4px 4px 8px #0d1716, -4px -4px 8px #1f3532',
        'neu-dark': '6px 6px 12px #0d1716, -6px -6px 12px #1f3532',
        'neu-dark-md': '8px 8px 16px #0d1716, -8px -8px 16px #1f3532',
        'neu-dark-lg': '12px 12px 24px #0a1211, -12px -12px 24px #243936',
        'neu-dark-inset': 'inset 4px 4px 8px #0d1716, inset -4px -4px 8px #1f3532',
        // Teal glow for dark mode
        'neu-dark-teal': '0 0 20px rgba(14, 122, 119, 0.3), 6px 6px 12px #0d1716, -6px -6px 12px #1f3532',
        // Elevated card shadow (more dramatic)
        'elevated': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'elevated-dark': '0 10px 40px -10px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
        // Soft card shadow
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-dark': '0 2px 15px -3px rgba(0, 0, 0, 0.4), 0 10px 20px -2px rgba(0, 0, 0, 0.3)',
      },
      // Gradient backgrounds for premium feel
      backgroundImage: {
        'gradient-neu': 'linear-gradient(145deg, #f0f1f2, #e0e1e2)',
        'gradient-neu-dark': 'linear-gradient(145deg, #1e302e, #162422)',
        'gradient-teal': 'linear-gradient(145deg, #0f8581, #0d6d6a)',
        'gradient-teal-soft': 'linear-gradient(145deg, #19b3ad, #159b96)',
        'gradient-gold': 'linear-gradient(145deg, #f2ce72, #e9c062)',
        'gradient-card': 'linear-gradient(145deg, #ffffff, #f5f6f7)',
        'gradient-card-dark': 'linear-gradient(145deg, #1e302e, #172725)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
};
