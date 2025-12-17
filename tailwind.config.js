/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // SignRoad Design System v5.0 - "Soft Mystical Minimalism"
  theme: {
    extend: {
      colors: {
        // === SIGNROAD DESIGN SYSTEM v5.0 ===
        // "Soft Mystical Minimalism" Framework
        //
        // PHILOSOPHY:
        // - Luminous depth without transparency
        // - Warmth without texture
        // - Mystical without woo-woo
        // - Premium without pretension
        //
        // === PRIMARY PALETTE ===

        // Transformative Teal (Primary Brand - 12-15% coverage)
        brand: {
          teal: '#0E9A91',            // Primary brand color
          'teal-soft': '#5FBFB8',     // Soft teal for secondary interactive
          'teal-dark': '#0C8880',     // Hover state
          'teal-darker': '#0A7670',   // Active state
          'teal-twilight': '#1A4A4A', // Dark teal for transitions
        },
        // Luminous Gold (Reward/Achievement - 5% maximum)
        gold: {
          DEFAULT: '#E8B54A',         // Primary gold
          dark: '#DBA940',            // Hover state
          darker: '#C99A38',          // Active state
          50: '#FEF9EC',
          100: '#FCF2D9',
          200: '#F9E5B3',
          300: '#F5D88D',
          400: '#F2CC67',
          500: '#E8B54A',
          600: '#DBA940',
          700: '#C99A38',
          800: '#A07830',
          900: '#886828',
        },

        // Deep Cosmos (Depth/Mystery - 10-15% in specific contexts)
        cosmos: {
          DEFAULT: '#1A2B4A',         // Deep cosmos
          dark: '#0F1A2E',            // Darker variant
          50: '#F0F2F6',
          100: '#E0E5EC',
          200: '#B8C5DB',
          300: '#8FA5CA',
          400: '#6785B9',
          500: '#3E65A8',
          600: '#2A4874',
          700: '#1A2B4A',
          800: '#0F1A2E',
          900: '#0A1120',
        },

        // === NEUTRAL PALETTE (WARM BIAS) ===
        neutral: {
          snow: '#FAFAF8',            // Primary background (warm undertone)
          ivory: '#FFFEF9',           // Card surfaces
          mist: '#E8E4DF',            // Borders/dividers
          stone: '#9A9590',           // Muted elements
          charcoal: '#2A2F33',        // Primary text
          slate: '#5A6169',           // Secondary text
          white: '#FFFFFF',
          50: '#FAFAF8',
          100: '#F5F5F3',
          200: '#E8E4DF',
          300: '#D1CCC7',
          400: '#BAB5B0',
          500: '#9A9590',
          600: '#7A7570',
          700: '#5A6169',
          800: '#2A2F33',
          900: '#1A1F23',
        },
        // Teal alias for backwards compatibility
        teal: {
          DEFAULT: '#0E9A91',
          light: '#5FBFB8',
          dark: '#0C8880',
          50: '#E6F7F6',
          100: '#CCEFED',
          200: '#99DFDB',
          300: '#66CFC9',
          400: '#33BFB7',
          500: '#0E9A91',
          600: '#0C8880',
          700: '#0A7670',
          800: '#086460',
          900: '#065250',
        },
        // === TEXT COLORS ===
        text: {
          primary: '#2A2F33',         // Charcoal
          secondary: '#5A6169',       // Slate
          muted: '#9A9590',           // Stone
          inverse: '#FAFAF8',         // Soft white
          accent: '#0E9A91',          // Teal for links/interactive
        },

        // === SEMANTIC COLORS (WCAG AA Compliant) ===
        success: {
          DEFAULT: '#34D399',
          light: '#6EE7B7',
          dark: '#10B981',
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
          light: '#FCD34D',
          dark: '#F59E0B',
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F5B74A',
          600: '#F59E0B',
          700: '#D97706',
          800: '#B45309',
          900: '#92400E',
        },
        error: {
          DEFAULT: '#E85A5A',
          light: '#F87171',
          dark: '#DC2626',
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#E85A5A',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        info: {
          DEFAULT: '#5AADE8',
          light: '#7DD3FC',
          dark: '#0284C7',
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#5AADE8',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        // === BACKGROUND TOKENS ===
        background: {
          DEFAULT: '#FAFAF8',         // Snow white (warm)
          primary: '#FAFAF8',
          card: '#FFFEF9',            // Warm ivory
          elevated: '#FFFFFF',
          cosmos: '#1A2B4A',          // Deep cosmos background
        },

        // === SURFACE TOKENS ===
        surface: {
          'page': '#FAFAF8',          // Snow white
          'card': '#FFFEF9',          // Warm ivory
          'elevated': '#FFFFFF',
          'border': '#E8E4DF',        // Mist gray
          'border-strong': '#D1CCC7',
          'hover': '#F5F5F3',
          'active': '#E8E4DF',
        },

        // === BUTTON COLORS ===
        btn: {
          'primary': '#0E9A91',       // Transformative teal
          'primary-hover': '#0C8880',
          'primary-active': '#0A7670',
          'secondary': 'transparent',
          'secondary-border': '#0E9A91',
          'secondary-hover': 'rgba(14, 154, 145, 0.08)',
          'gold': '#E8B54A',          // Gold CTA
          'gold-hover': '#DBA940',
          'gold-active': '#C99A38',
          'ghost': 'transparent',
          'ghost-hover': '#5A6169',
        },

        // === PROGRESS COLORS ===
        progress: {
          'track': '#E8E4DF',
          'fill': '#0E9A91',
          'fill-gold': '#E8B54A',
        },

        // === LEGACY ALIASES (for backwards compatibility) ===
        primary: {
          DEFAULT: '#0E9A91',
          50: '#E6F7F6',
          100: '#CCEFED',
          200: '#99DFDB',
          300: '#66CFC9',
          400: '#33BFB7',
          500: '#0E9A91',
          600: '#0C8880',
          700: '#0A7670',
          800: '#086460',
          900: '#065250',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      },
      // === SHADOWS (Soft Mystical Minimalism) ===
      boxShadow: {
        // Standard card shadows (soft, minimal)
        'sm': '0 2px 8px rgba(42, 47, 51, 0.04)',
        'DEFAULT': '0 2px 8px rgba(42, 47, 51, 0.04)',
        'md': '0 4px 16px rgba(42, 47, 51, 0.08)',
        'lg': '0 8px 24px rgba(42, 47, 51, 0.12)',
        'xl': '0 12px 32px rgba(42, 47, 51, 0.16)',

        // Glow effects (luminous without transparency)
        'glow-gold': '0 0 20px rgba(232, 181, 74, 0.35)',
        'glow-gold-lg': '0 0 30px rgba(232, 181, 74, 0.5)',
        'glow-teal': '0 0 20px rgba(14, 154, 145, 0.25)',
        'glow-teal-lg': '0 0 30px rgba(14, 154, 145, 0.35)',

        // Button shadows
        'btn': '0 2px 8px rgba(14, 154, 145, 0.25)',
        'btn-hover': '0 4px 12px rgba(14, 154, 145, 0.3)',
        'btn-gold': '0 4px 12px rgba(232, 181, 74, 0.35)',
        'btn-gold-hover': '0 6px 16px rgba(232, 181, 74, 0.4)',

        // Input focus shadows
        'input-focus': '0 0 0 3px rgba(14, 154, 145, 0.15)',
        'input-error': '0 0 0 3px rgba(232, 90, 90, 0.15)',

        // Legacy neumorphic (for backwards compatibility)
        'neumo': '0 4px 16px rgba(42, 47, 51, 0.08)',
        'neumo-sm': '0 2px 8px rgba(42, 47, 51, 0.04)',
        'neumo-lg': '0 8px 24px rgba(42, 47, 51, 0.12)',
        'neumo-inset': 'none',
        'neumo-inset-sm': 'none',
      },
      // === BORDER RADIUS ===
      borderRadius: {
        'sm': '8px',
        'DEFAULT': '12px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        'full': '9999px',
        // Legacy neumorphic radii
        'neumo': '16px',
        'neumo-lg': '20px',
        'neumo-xl': '24px',
        'neumo-full': '9999px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      // === ANIMATIONS (Design Guide Standards) ===
      animation: {
        // Entrance animations
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',

        // Interactive animations
        'shake': 'shake 0.4s linear',
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 6s ease-in-out infinite',

        // Loading animations
        'spin': 'spin 0.8s linear infinite',
        'spinner-orb': 'spinnerOrb 1.7s linear infinite',
        'dots-bounce': 'dotsBounce 0.5s alternate infinite ease',

        // Celebration animations
        'bounce-gentle': 'bounceGentle 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',

        // Lantern animations
        'lantern-flicker': 'lanternFlicker 2s ease-in-out infinite',
        'lantern-pulse': 'lanternPulse 6s ease-in-out infinite',
        'lantern-rekindle': 'lanternRekindle 1.5s ease-out',

        // Sparks animation
        'sparks-increment': 'sparksIncrement 0.6s ease-out',

        // Legacy blob animation
        'blob-bounce': 'blobBounce 5s infinite ease',
      },
      keyframes: {
        // Entrance animations
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },

        // Error shake
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-8px)' },
          '50%': { transform: 'translateX(8px)' },
          '75%': { transform: 'translateX(-4px)' },
        },

        // Float animation
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },

        // Celebration bounce
        bounceGentle: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },

        // Lantern animations
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

        // Sparks increment
        sparksIncrement: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },

        // Loading spinner
        spin: {
          'to': { transform: 'rotate(360deg)' },
        },

        // Legacy animations
        spinnerOrb: {
          'to': { transform: 'rotate(360deg)' },
        },
        dotsBounce: {
          '0%': { top: '60px', height: '5px', borderRadius: '50px 50px 25px 25px', transform: 'scaleX(1.7)' },
          '40%': { height: '20px', borderRadius: '50%', transform: 'scaleX(1)' },
          '100%': { top: '0%' },
        },
        blobBounce: {
          '0%': { transform: 'translate(-100%, -100%) translate3d(0, 0, 0)' },
          '25%': { transform: 'translate(-100%, -100%) translate3d(100%, 0, 0)' },
          '50%': { transform: 'translate(-100%, -100%) translate3d(100%, 100%, 0)' },
          '75%': { transform: 'translate(-100%, -100%) translate3d(0, 100%, 0)' },
          '100%': { transform: 'translate(-100%, -100%) translate3d(0, 0, 0)' },
        },
      },
      // === TRANSITIONS ===
      transitionDuration: {
        'fast': '120ms',
        'base': '200ms',
        'slow': '300ms',
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};
