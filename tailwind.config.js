/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ================================================================
        // SIGNROAD DESIGN SYSTEM v4.0 - ALIGNED WITH MASTER DOCUMENTATION
        // "Soft Mystical Minimalism" - Hybrid UI Approach
        // ================================================================

        // === PRIMARY BRAND COLORS ===
        // Transformative Teal Framework (12-15% usage)
        brand: {
          teal: '#0E9A91',            // Primary - Transformative Teal (CORRECT per master doc)
          'teal-soft': '#5FBFB8',     // Secondary Interactive
          'teal-light': '#17A7A2',    // Lighter teal for hover states
          'teal-dark': '#0C8880',     // Darker teal for pressed states
          'teal-muted': '#E6F4F4',    // Very light teal for subtle backgrounds
          twilight: '#1A4A4A',        // Dark teal transitions
        },

        // === REWARD/ACHIEVEMENT COLORS ===
        // Luminous Gold (5% maximum - scarcity = power)
        gold: {
          DEFAULT: '#E8B54A',         // Luminous Gold (CORRECT per master doc)
          50: '#FFFBF0',
          100: '#FEF7E0',
          200: '#FDEEC1',
          300: '#FBE5A2',
          400: '#F4D77A',
          500: '#E8B54A',             // Primary gold
          600: '#DBA940',
          700: '#C99A38',
          800: '#A07830',
          900: '#705820',
        },

        // === DEPTH/MYSTERY COLORS ===
        // Deep Cosmos (10-15% for immersive experiences)
        cosmos: {
          DEFAULT: '#1A2B4A',         // Deep Cosmos (CORRECT per master doc)
          dark: '#0F1A2E',
          light: '#2D3E5F',
        },

        // === WARM NEUTRAL PALETTE ===
        // Snow White, Warm Ivory, Mist Gray (70% usage)
        neutral: {
          white: '#FFFFFF',
          snow: '#FAFAF8',            // Primary background (warm undertone)
          ivory: '#FFFEF9',           // Card surfaces
          mist: '#E8E4DF',            // Borders/dividers
          stone: '#9A9590',           // Muted elements
          charcoal: '#2A2F33',        // Primary text
          slate: '#5A6169',           // Secondary text
          50: '#FAFAF8',
          100: '#F5F6F7',
          200: '#E8E4DF',
          300: '#D1D9E6',
          400: '#B2BEC3',
          500: '#9A9590',
          600: '#5A6169',
          700: '#2A2F33',
          800: '#1C2425',
          900: '#0D1117',
          950: '#000000',
        },

        // === NEUMORPHIC BASE COLORS (Soft UI elements) ===
        neumo: {
          bg: '#E0E5EC',              // Main background - soft gray
          surface: '#E5EAF2',         // Cards - slightly lighter for depth
          'surface-soft': '#EDF1F7',  // Inner blocks/inputs - even lighter
          text: '#2A2F33',            // Primary text (maps to charcoal)
          'text-secondary': '#5A6169', // Secondary text (maps to slate)
          'text-muted': '#9A9590',    // Muted text (maps to stone)
          border: '#D1D9E6',          // Subtle borders
          accent: '#0E9A91',          // Accent = brand teal
        },

        // === TEXT COLORS ===
        text: {
          primary: '#2A2F33',         // Charcoal
          secondary: '#5A6169',       // Slate
          muted: '#9A9590',           // Stone
          inverse: '#FAFAF8',         // Snow white for dark backgrounds
        },

        // === SEMANTIC COLORS (Accessibility compliant) ===
        success: {
          DEFAULT: '#34D399',
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        warning: {
          DEFAULT: '#F5B74A',
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        error: {
          DEFAULT: '#E85A5A',
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        info: {
          DEFAULT: '#5AADE8',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },

        // === BACKGROUNDS ===
        background: {
          DEFAULT: '#FAFAF8',         // Snow white
          primary: '#FAFAF8',
          secondary: '#E0E5EC',
          tertiary: '#D8DDE4',
          input: '#FFFFFF',
        },

        // === SURFACE TOKENS ===
        surface: {
          'page': '#FAFAF8',          // Snow white
          'card': '#FFFEF9',          // Warm ivory
          'card-dark': '#E0E5EC',
          'card-warm': '#FFFEF9',
          'border': '#E8E4DF',        // Mist
          'border-strong': '#D1D9E6',
          'border-dark': '#B2BEC3',
          'elevated': '#FFFFFF',
          'elevated-dark': '#E8ECF2',
          'footer': '#E0E5EC',
          'hover': '#F5F6F7',
          'active': '#EDF1F7',
        },

        // === BUTTON COLORS (Correct brand teal + gold) ===
        btn: {
          'primary': '#0E9A91',       // Transformative Teal
          'primary-hover': '#0C8880',
          'secondary': '#5FBFB8',     // Soft Teal
          'secondary-hover': '#17A7A2',
          'accent': '#E8B54A',        // Luminous Gold (use sparingly!)
          'accent-hover': '#DBA940',
          'ghost': 'transparent',
          'ghost-hover': 'rgba(14, 154, 145, 0.08)',
        },

        // === BADGE COLORS ===
        badge: {
          'new': '#0E9A91',           // Teal
          'popular': '#E8B54A',       // Gold
          'premium': '#1A2B4A',       // Cosmos
          'free': '#5A6169',          // Slate
        },

        // === PROGRESS COLORS ===
        progress: {
          'track': '#E8E4DF',         // Mist
          'fill': '#0E9A91',          // Transformative Teal
          'fill-gold': '#E8B54A',     // Gold for completion
        },

        // === LEGACY ALIASES (for backward compatibility) ===
        primary: {
          50: '#E6F4F4',
          100: '#CCEDED',
          200: '#99DBD9',
          300: '#66C9C5',
          400: '#33B7B1',
          500: '#0E9A91',            // Transformative Teal
          600: '#0C8880',
          700: '#0A7670',
          800: '#086460',
          900: '#065250',
          950: '#044040',
        },
        secondary: {
          50: '#F0F9F9',
          100: '#E1F3F2',
          200: '#C3E7E5',
          300: '#A5DBD8',
          400: '#87CFCB',
          500: '#5FBFB8',            // Soft Teal
          600: '#4C9993',
          700: '#39736E',
          800: '#264D4A',
          900: '#132625',
        },
        accent: {
          50: '#FFFBF0',
          100: '#FEF7E0',
          200: '#FDEEC1',
          300: '#FBE5A2',
          400: '#F4D77A',
          500: '#E8B54A',            // Luminous Gold
          600: '#DBA940',
          700: '#C99A38',
          800: '#A07830',
          900: '#705820',
        },

        // Teal scale (primary brand color)
        teal: {
          50: '#E6F4F4',
          100: '#CCEDED',
          200: '#99DBD9',
          300: '#66C9C5',
          400: '#33B7B1',
          500: '#0E9A91',            // Transformative Teal (PRIMARY)
          600: '#0C8880',
          700: '#0A7670',
          800: '#086460',
          900: '#065250',
        },

        // Emerald (can map to teal for consistency)
        emerald: {
          DEFAULT: '#0E9A91',
          50: '#E6F4F4',
          100: '#CCEDED',
          200: '#99DBD9',
          300: '#66C9C5',
          400: '#33B7B1',
          500: '#0E9A91',
          600: '#0C8880',
          700: '#0A7670',
          800: '#086460',
          900: '#065250',
        },

        // Lavender/Purple (map to soft neutrals for neumorphic consistency)
        lavender: {
          DEFAULT: '#B2BEC3',
          50: '#F5F6F7',
          100: '#E0E5EC',
          200: '#D1D9E6',
          300: '#B2BEC3',
          400: '#A0ADB2',
          500: '#8E9A9F',
          600: '#636E72',
          700: '#4A5568',
          800: '#2D3436',
          900: '#1A202C',
        },
        purple: {
          DEFAULT: '#B2BEC3',
          50: '#F5F6F7',
          100: '#E0E5EC',
          200: '#D1D9E6',
          300: '#B2BEC3',
          400: '#A0ADB2',
          500: '#8E9A9F',
          600: '#636E72',
          700: '#4A5568',
          800: '#2D3436',
          900: '#1A202C',
        },

        // Silver (neutral)
        silver: {
          DEFAULT: '#B2BEC3',
          50: '#F5F6F7',
          100: '#E0E5EC',
          200: '#D1D9E6',
          300: '#B2BEC3',
          400: '#8E9A9F',
          500: '#636E72',
          600: '#4A5568',
          700: '#2D3436',
          800: '#1A202C',
          900: '#0D1117',
        },

        // Glass colors (kept for component compatibility)
        glass: {
          'bg': '#E0E5EC',
          'border': '#D1D9E6',
          'border-hover': '#B2BEC3',
        },
      },

      // === TYPOGRAPHY (Inter font per master doc) ===
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },

      // === NEUMORPHIC SHADOWS (Refined - softer, more blur) ===
      boxShadow: {
        // Main raised cards - softer with more blur
        'neumo': '6px 6px 18px rgba(163, 177, 198, 0.5), -6px -6px 18px rgba(255, 255, 255, 0.9)',
        // Subtle raised (inner sections, small cards, buttons)
        'neumo-sm': '3px 3px 10px rgba(163, 177, 198, 0.35), -3px -3px 10px rgba(255, 255, 255, 0.85)',
        // Hero-level emphasis (top hero card only)
        'neumo-lg': '10px 10px 28px rgba(163, 177, 198, 0.55), -10px -10px 28px rgba(255, 255, 255, 0.95)',
        // Pressed/inset elements (inputs, active states)
        'neumo-inset': 'inset 4px 4px 12px rgba(163, 177, 198, 0.5), inset -4px -4px 12px rgba(255, 255, 255, 0.9)',
        'neumo-inset-sm': 'inset 2px 2px 6px rgba(163, 177, 198, 0.35), inset -2px -2px 6px rgba(255, 255, 255, 0.85)',
        // Flat (no shadow)
        'neumo-flat': 'none',
        // Stronger shadows for special cards
        'neumo-card': '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
        'neumo-card-sm': '12px 12px 36px #bebebe, -12px -12px 36px #ffffff',

        // === BRAND COLOR GLOWS (from master doc) ===
        // Teal glow for primary CTAs and highlights
        'teal-glow': '0 0 20px rgba(14, 154, 145, 0.25)',
        'teal-glow-sm': '0 0 12px rgba(14, 154, 145, 0.2)',
        'teal-glow-lg': '0 0 32px rgba(14, 154, 145, 0.4)',

        // Gold glow for rewards and achievements
        'gold-glow': '0 0 20px rgba(232, 181, 74, 0.35)',
        'gold-glow-sm': '0 0 12px rgba(232, 181, 74, 0.25)',
        'gold-glow-lg': '0 0 32px rgba(232, 181, 74, 0.5)',

        // Lantern-specific glows (from master doc Section 5.4)
        'lantern-bright': '0 0 30px rgba(232, 181, 74, 0.6)',
        'lantern-steady': '0 0 20px rgba(232, 181, 74, 0.4)',
        'lantern-dimming': '0 0 15px rgba(184, 146, 58, 0.3)',
        'lantern-fading': '0 0 8px rgba(136, 104, 40, 0.2)',

        // Legacy aliases
        'glow': '6px 6px 18px rgba(163, 177, 198, 0.5), -6px -6px 18px rgba(255, 255, 255, 0.9)',
        'glow-lg': '10px 10px 28px rgba(163, 177, 198, 0.55), -10px -10px 28px rgba(255, 255, 255, 0.95)',
        'glow-violet': '6px 6px 18px rgba(163, 177, 198, 0.5), -6px -6px 18px rgba(255, 255, 255, 0.9)',
        'glow-mint': '6px 6px 18px rgba(163, 177, 198, 0.5), -6px -6px 18px rgba(255, 255, 255, 0.9)',
        'glass': '6px 6px 18px rgba(163, 177, 198, 0.5), -6px -6px 18px rgba(255, 255, 255, 0.9)',
      },

      // === BORDER RADIUS ===
      borderRadius: {
        'neumo': '16px',
        'neumo-sm': '12px',
        'neumo-lg': '20px',
        'neumo-xl': '24px',
        'neumo-full': '9999px',
      },

      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },

      // === ANIMATIONS (from master doc) ===
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'blob-bounce': 'blobBounce 5s infinite ease',
        'dots-bounce': 'dotsBounce 0.5s alternate infinite ease',
        'spinner-orb': 'spinnerOrb 1.7s linear infinite',
        // Lantern animations
        'lantern-flicker': 'lanternFlicker 2s ease-in-out infinite',
        'lantern-pulse': 'lanternPulse 6s ease-in-out infinite',
        'lantern-rekindle': 'lanternRekindle 1.5s ease-out',
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
        blobBounce: {
          '0%': { transform: 'translate(-100%, -100%) translate3d(0, 0, 0)' },
          '25%': { transform: 'translate(-100%, -100%) translate3d(100%, 0, 0)' },
          '50%': { transform: 'translate(-100%, -100%) translate3d(100%, 100%, 0)' },
          '75%': { transform: 'translate(-100%, -100%) translate3d(0, 100%, 0)' },
          '100%': { transform: 'translate(-100%, -100%) translate3d(0, 0, 0)' },
        },
        dotsBounce: {
          '0%': { top: '60px', height: '5px', borderRadius: '50px 50px 25px 25px', transform: 'scaleX(1.7)' },
          '40%': { height: '20px', borderRadius: '50%', transform: 'scaleX(1)' },
          '100%': { top: '0%' },
        },
        spinnerOrb: {
          'to': { transform: 'rotate(360deg)' },
        },
        // Lantern animations (from master doc Section 5.4)
        lanternFlicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.9' },
        },
        lanternPulse: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '0.9' },
        },
        lanternRekindle: {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '30%': { transform: 'scale(1.05)', opacity: '0.9' },
          '60%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
