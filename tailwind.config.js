/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // === SIGNROAD DESIGN SYSTEM v2.0 ===
        // Warm Gold/Lavender Palette - Spiritual & Modern
        // 
        // COLOR PHILOSOPHY:
        // - Warm gold feels abundant/manifestation-aligned
        // - Lavender adds spirituality without being too "woo"
        // - Sage green for wins feels celebratory but calm
        // - Warmer neutrals feel more human/approachable
        //
        // === BACKGROUNDS (Deep Indigo) ===
        background: {
          DEFAULT: '#1C1F2E',        // Main app background
          primary: '#1C1F2E',        // Main app background
          secondary: '#252A3C',      // Cards, modals, elevated surfaces
          tertiary: '#2E3447',       // Hover states, nested cards
          input: '#1A1D2A',          // Input fields, text areas
        },
        // === PRIMARY COLOR - WARM GOLD ===
        // Use for: Primary buttons, CTAs, brand identity, headings
        gold: {
          DEFAULT: '#E8B86D',
          50: '#FDF9F3',
          100: '#FDF4E3',
          200: '#F9E4C0',
          300: '#F5D799',
          400: '#ECCC7A',
          500: '#E8B86D',            // Primary accent, CTAs
          600: '#D4A45A',
          700: '#C9923D',            // Hover states, emphasis
          800: '#A67830',
          900: '#8B6320',            // Dark accents
          950: '#5C4115',
        },
        // Teal now maps to gold for backward compatibility
        teal: {
          DEFAULT: '#E8B86D',
          50: '#FDF9F3',
          100: '#FDF4E3',
          200: '#F9E4C0',
          300: '#F5D799',
          400: '#ECCC7A',
          500: '#E8B86D',            // Maps to gold primary
          600: '#D4A45A',
          700: '#C9923D',
          800: '#A67830',
          900: '#8B6320',
          950: '#5C4115',
        },
        // === SECONDARY COLOR - SOFT LAVENDER ===
        // Use for: Secondary accents, special features, mystical elements
        lavender: {
          DEFAULT: '#A78BFA',
          50: '#FAF8FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',            // Secondary accent
          500: '#A78BFA',
          600: '#8B5CF6',
          700: '#7C3AED',            // Active states
          800: '#6D28D9',
          900: '#5B21B6',
        },
        // Purple maps to lavender for backward compatibility
        purple: {
          DEFAULT: '#A78BFA',
          50: '#FAF8FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#A78BFA',
          600: '#8B5CF6',
          700: '#7C3AED',
          800: '#6D28D9',
          900: '#5B21B6',
        },
        // Legacy emerald alias (maps to gold for backward compatibility)
        emerald: {
          DEFAULT: '#E8B86D',
          50: '#FDF9F3',
          100: '#FDF4E3',
          200: '#F9E4C0',
          300: '#F5D799',
          400: '#ECCC7A',
          500: '#E8B86D',
          600: '#D4A45A',
          700: '#C9923D',
          800: '#A67830',
          900: '#8B6320',
          950: '#5C4115',
        },
        // === NEUTRAL PALETTE (Warm Indigo) ===
        neutral: {
          white: '#F5F3EF',          // Warm white - primary text
          50: '#F5F3EF',             // Warm white
          100: '#E5E3DF',
          200: '#D5D3CF',
          300: '#9CA3AF',            // Secondary text
          400: '#6B7280',            // Muted text
          500: '#4B5563',
          600: '#374151',
          700: '#2E3447',            // Tertiary background
          800: '#252A3C',            // Secondary background
          900: '#1C1F2E',            // Primary background
          950: '#14161F',
        },
        // === TEXT COLORS ===
        text: {
          primary: '#F5F3EF',        // Warm white - headings, important text
          secondary: '#9CA3AF',      // Body text, descriptions
          muted: '#6B7280',          // Placeholders, disabled
          inverse: '#1C1F2E',        // Text on light backgrounds
          // Dark Mode aliases
          'primary-dark': '#F5F3EF',
          'secondary-dark': '#9CA3AF',
          'muted-dark': '#6B7280',
        },
        // === SEMANTIC COLORS ===
        // Success - Sage Green
        success: {
          DEFAULT: '#7DD3A8',
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#7DD3A8',            // Wins, achievements, positive
          400: '#6EE7B7',
          500: '#7DD3A8',
          600: '#059669',            // Success emphasis
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        // Warning - Amber
        warning: {
          DEFAULT: '#FBBF24',
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',            // Alerts, caution
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // Error - Soft Red
        error: {
          DEFAULT: '#F87171',
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',            // Errors, destructive
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        // Info - Soft Blue
        info: {
          DEFAULT: '#60A5FA',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',            // Information, links
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        // === SURFACE TOKENS ===
        surface: {
          // Dark Mode (default)
          'page': '#1C1F2E',              // Deep indigo - main background
          'card': '#252A3C',              // Soft slate - cards
          'border': '#2E3447',            // Tertiary - borders
          'border-strong': '#3D4455',     // Stronger borders
          // Dark Mode aliases
          'page-dark': '#1C1F2E',
          'card-dark': '#252A3C',
          'border-dark': '#2E3447',
          'border-dark-strong': '#3D4455',
          // Elevated surfaces
          'elevated': '#2E3447',
          'elevated-dark': '#2E3447',
          // Footer backgrounds
          'footer': '#1C1F2E',
          'footer-dark': '#1C1F2E',
          // Interactive states
          'hover': '#2E3447',
          'hover-dark': '#2E3447',
          'active': '#3D4455',
          'active-dark': '#3D4455',
        },
        // === MUTED VARIANTS ===
        muted: {
          'gold': '#C9923D',              // Muted gold for dark mode
          'gold-surface': '#8B6320',      // Even more muted gold for backgrounds
          'lavender': '#7C3AED',          // Muted lavender
        },
        // === INTENTION TINTS ===
        intent: {
          'peace': '#252A3C',             // Inner Peace - soft slate
          'motivation': '#2E2A25',        // Motivation - warm dark
          'gratitude': '#252A3C',         // Gratitude - soft slate
          'abundance': '#2A2820',         // Abundance - warm gold tint
          'sleep': '#252535',             // Sleep - soft lavender tint
          'healing': '#202A25',           // Healing - soft green tint
        },
        // === BUTTON COLORS ===
        btn: {
          'primary': '#E8B86D',           // Warm Gold - primary CTA
          'primary-hover': '#C9923D',     // Gold darker - hover
          'secondary': '#252A3C',         // Slate - secondary actions
          'secondary-hover': '#2E3447',   // Slate darker - hover
          'accent': '#A78BFA',            // Lavender - special CTAs
          'accent-hover': '#7C3AED',      // Lavender darker - hover
          'ghost': 'transparent',
          'ghost-hover': 'rgba(232, 184, 109, 0.1)', // Ghost hover (gold tint)
        },
        // === BADGE COLORS ===
        badge: {
          'new': '#E8B86D',               // Warm Gold - "NEW" badges
          'popular': '#E8B86D',           // Warm Gold - "Popular" badges
          'premium': '#A78BFA',           // Lavender - "Premium" badges
          'free': '#7DD3A8',              // Sage Green - "Free" badges
        },
        // === PROGRESS COLORS ===
        progress: {
          'track': '#2E3447',             // Tertiary - track
          'track-dark': '#2E3447',
          'fill': '#E8B86D',              // Warm Gold fill
          'fill-gold': '#E8B86D',
        },
        // === LEGACY ALIASES (backward compatibility) ===
        primary: {
          50: '#FDF9F3',
          100: '#FDF4E3',
          200: '#F9E4C0',
          300: '#F5D799',
          400: '#ECCC7A',
          500: '#E8B86D',                 // Warm Gold - primary
          600: '#D4A45A',
          700: '#C9923D',
          800: '#A67830',
          900: '#8B6320',
          950: '#5C4115',
        },
        secondary: {
          50: '#FAF8FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',                 // Lavender - secondary
          500: '#A78BFA',
          600: '#8B5CF6',
          700: '#7C3AED',
          800: '#6D28D9',
          900: '#5B21B6',
          950: '#4C1D95',
        },
        accent: {
          50: '#FDF9F3',
          100: '#FDF4E3',
          200: '#F9E4C0',
          300: '#F5D799',
          400: '#ECCC7A',
          500: '#E8B86D',                 // Warm Gold - accent
          600: '#D4A45A',
          700: '#C9923D',
          800: '#A67830',
          900: '#8B6320',
          950: '#5C4115',
        },
        // Silver maps to neutral grays
        silver: {
          DEFAULT: '#9CA3AF',
          50: '#F5F3EF',
          100: '#E5E3DF',
          200: '#D5D3CF',
          300: '#9CA3AF',
          400: '#6B7280',
          500: '#4B5563',
          600: '#374151',
          700: '#2E3447',
          800: '#252A3C',
          900: '#1C1F2E',
        },
      },
      fontFamily: {
        sans: ['DM Sans', '-apple-system', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['DM Sans', '-apple-system', 'system-ui', 'sans-serif'],
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
