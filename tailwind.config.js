/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // === SIGNROAD DESIGN SYSTEM v3.0 ===
        // Ultra-Modern Minimalist - Linear/Raycast/Vercel aesthetic
        // 
        // COLOR PHILOSOPHY:
        // - True black for depth and premium feel
        // - Dark glass cards with subtle glow borders
        // - Electric amber for sharp, modern CTAs
        // - Cool violet for mystical secondary accents
        // - Mint neon for celebratory success states
        //
        // === BACKGROUNDS (True Black) ===
        background: {
          DEFAULT: '#0A0A0B',        // True black - main app background
          primary: '#0A0A0B',        // True black
          secondary: '#141416',      // Dark glass - cards
          tertiary: '#1A1A1C',       // Hover states, nested cards
          input: '#0F0F10',          // Input fields, text areas
        },
        // === PRIMARY COLOR - ELECTRIC AMBER ===
        // Use for: Primary buttons, CTAs, brand identity, active states
        gold: {
          DEFAULT: '#FF9F1C',
          50: '#FFF8ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#FF9F1C',            // Electric amber - primary
          600: '#EA580C',
          700: '#C2410C',            // Hover states
          800: '#9A3412',
          900: '#7C2D12',
          950: '#431407',
        },
        // Teal maps to electric amber for backward compatibility
        teal: {
          DEFAULT: '#FF9F1C',
          50: '#FFF8ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#FF9F1C',            // Maps to electric amber
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
          950: '#431407',
        },
        // === SECONDARY COLOR - COOL VIOLET ===
        // Use for: Secondary accents, premium features, mystical elements
        lavender: {
          DEFAULT: '#8B5CF6',
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#8B5CF6',            // Cool violet - secondary
          600: '#7C3AED',
          700: '#6D28D9',            // Active states
          800: '#5B21B6',
          900: '#4C1D95',
        },
        // Purple maps to cool violet for backward compatibility
        purple: {
          DEFAULT: '#8B5CF6',
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        // Legacy emerald alias (maps to electric amber)
        emerald: {
          DEFAULT: '#FF9F1C',
          50: '#FFF8ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#FF9F1C',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
          950: '#431407',
        },
        // === NEUTRAL PALETTE (Cool Gray) ===
        neutral: {
          white: '#FAFAFA',          // Pure white - primary text
          50: '#FAFAFA',             // Pure white
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#A1A1AA',
          400: '#71717A',            // Cool gray - muted text
          500: '#52525B',
          600: '#3F3F46',
          700: '#27272A',
          800: '#18181B',            // Dark glass
          900: '#0A0A0B',            // True black
          950: '#050505',
        },
        // === TEXT COLORS ===
        text: {
          primary: '#FAFAFA',        // Pure white - headings, important text
          secondary: '#A1A1AA',      // Cool gray - body text
          muted: '#71717A',          // Cool gray - placeholders, disabled
          inverse: '#0A0A0B',        // Text on light backgrounds
          // Dark Mode aliases
          'primary-dark': '#FAFAFA',
          'secondary-dark': '#A1A1AA',
          'muted-dark': '#71717A',
        },
        // === SEMANTIC COLORS ===
        // Success - Mint Neon
        success: {
          DEFAULT: '#10B981',
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',            // Mint neon - wins, achievements
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        // Warning - Amber
        warning: {
          DEFAULT: '#F59E0B',
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',            // Amber warning
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // Error - Soft Red
        error: {
          DEFAULT: '#EF4444',
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',            // Error red
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        // Info - Cool Blue
        info: {
          DEFAULT: '#3B82F6',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',            // Info blue
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        // === SURFACE TOKENS ===
        surface: {
          // Dark Mode (default) - Glass morphism
          'page': '#0A0A0B',              // True black - main background
          'card': '#141416',              // Dark glass - cards
          'border': 'rgba(255,255,255,0.03)', // Subtle glow border
          'border-strong': 'rgba(255,255,255,0.08)', // Stronger glow border
          // Dark Mode aliases
          'page-dark': '#0A0A0B',
          'card-dark': '#141416',
          'border-dark': 'rgba(255,255,255,0.03)',
          'border-dark-strong': 'rgba(255,255,255,0.08)',
          // Elevated surfaces
          'elevated': '#1A1A1C',
          'elevated-dark': '#1A1A1C',
          // Footer backgrounds
          'footer': '#0A0A0B',
          'footer-dark': '#0A0A0B',
          // Interactive states
          'hover': '#1A1A1C',
          'hover-dark': '#1A1A1C',
          'active': '#27272A',
          'active-dark': '#27272A',
        },
        // === MUTED VARIANTS ===
        muted: {
          'gold': '#C2410C',              // Muted amber
          'gold-surface': '#7C2D12',      // Even more muted amber
          'lavender': '#6D28D9',          // Muted violet
        },
        // === INTENTION TINTS (Dark glass variants) ===
        intent: {
          'peace': '#141416',             // Inner Peace - dark glass
          'motivation': '#1A1410',        // Motivation - warm dark
          'gratitude': '#141416',         // Gratitude - dark glass
          'abundance': '#1A1814',         // Abundance - amber tint
          'sleep': '#14141A',             // Sleep - violet tint
          'healing': '#101A14',           // Healing - mint tint
        },
        // === BUTTON COLORS ===
        btn: {
          'primary': '#FF9F1C',           // Electric amber - primary CTA
          'primary-hover': '#EA580C',     // Amber darker - hover
          'secondary': '#141416',         // Dark glass - secondary
          'secondary-hover': '#1A1A1C',   // Glass darker - hover
          'accent': '#8B5CF6',            // Cool violet - special CTAs
          'accent-hover': '#7C3AED',      // Violet darker - hover
          'ghost': 'transparent',
          'ghost-hover': 'rgba(255, 159, 28, 0.1)', // Ghost hover (amber tint)
        },
        // === BADGE COLORS ===
        badge: {
          'new': '#FF9F1C',               // Electric amber - "NEW" badges
          'popular': '#FF9F1C',           // Electric amber - "Popular" badges
          'premium': '#8B5CF6',           // Cool violet - "Premium" badges
          'free': '#10B981',              // Mint neon - "Free" badges
        },
        // === PROGRESS COLORS ===
        progress: {
          'track': '#1A1A1C',             // Dark glass - track
          'track-dark': '#1A1A1C',
          'fill': '#FF9F1C',              // Electric amber fill
          'fill-gold': '#FF9F1C',
        },
        // === LEGACY ALIASES (backward compatibility) ===
        primary: {
          50: '#FFF8ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#FF9F1C',                 // Electric amber - primary
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
          950: '#431407',
        },
        secondary: {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#8B5CF6',                 // Cool violet - secondary
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
          950: '#2E1065',
        },
        accent: {
          50: '#FFF8ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#FF9F1C',                 // Electric amber - accent
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
          950: '#431407',
        },
        // Silver maps to cool grays
        silver: {
          DEFAULT: '#A1A1AA',
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#A1A1AA',
          400: '#71717A',
          500: '#52525B',
          600: '#3F3F46',
          700: '#27272A',
          800: '#18181B',
          900: '#0A0A0B',
        },
        // Glass morphism colors
        glass: {
          'bg': 'rgba(20, 20, 22, 0.8)',
          'border': 'rgba(255, 255, 255, 0.03)',
          'border-hover': 'rgba(255, 255, 255, 0.08)',
          'glow': 'rgba(255, 159, 28, 0.1)',
          'glow-violet': 'rgba(139, 92, 246, 0.1)',
          'glow-mint': 'rgba(16, 185, 129, 0.1)',
        },
      },
      fontFamily: {
        sans: ['DM Sans', '-apple-system', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['DM Sans', '-apple-system', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 159, 28, 0.1)',
        'glow-lg': '0 0 40px rgba(255, 159, 28, 0.15)',
        'glow-violet': '0 0 20px rgba(139, 92, 246, 0.1)',
        'glow-mint': '0 0 20px rgba(16, 185, 129, 0.1)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        'glass': '10px',
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
