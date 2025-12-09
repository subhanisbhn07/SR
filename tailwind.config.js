/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // === SIGNROAD PRD COLOR SYSTEM ===
        // Based on SignRoad PRD v1.0 (December 8, 2024)
        // 
        // COLOR USAGE RATIOS:
        // - 70% NEUTRAL: Backgrounds, cards, surfaces, body text
        // - 15% PRIMARY TEAL: Navigation, primary buttons, brand identity
        // - 10% SECONDARY: Icons, secondary buttons, highlights
        // - 5% GOLD: Rewards, achievements, premium CTAs (SPARINGLY!)
        //
        // === PRIMARY COLOR - TRANSFORMATIVE TEAL (PRD: #00CED1) ===
        // Use for: Primary buttons, interactive elements, brand identity, headings
        teal: {
          DEFAULT: '#00CED1',
          50: '#E0FAFA',
          100: '#B3F2F3',
          200: '#80EAEC',
          300: '#4DE2E5',
          400: '#26DBDE',
          500: '#00CED1', // Transformative Teal - PRD PRIMARY
          600: '#00B8BA',
          700: '#009A9C',
          800: '#007C7E',
          900: '#005E60',
          950: '#004042',
        },
        // === SECONDARY COLORS (PRD) ===
        // Moonlit Silver (#C0C0C0) - Subtle highlights, badge outlines, secondary icons
        silver: {
          DEFAULT: '#C0C0C0',
          50: '#F5F5F5',
          100: '#E8E8E8',
          200: '#D4D4D4',
          300: '#C0C0C0', // Moonlit Silver - PRD
          400: '#A8A8A8',
          500: '#909090',
          600: '#787878',
          700: '#606060',
          800: '#484848',
          900: '#303030',
        },
        // Nebula Purple (#9D7BE8) - Rare sign tiers, mystical moments, special features
        purple: {
          DEFAULT: '#9D7BE8',
          50: '#F3EFFE',
          100: '#E7DFFD',
          200: '#CFBFFB',
          300: '#B79FF9',
          400: '#9D7BE8', // Nebula Purple - PRD
          500: '#8B5CE6',
          600: '#7A3DE4',
          700: '#6A1EE2',
          800: '#5A00D0',
          900: '#4A00B0',
        },
        // === ACCENT COLOR - STARDUST GOLD (PRD: #FFD700) ===
        // Use for: Rewards, achievements, Sparks counter, celebration moments
        gold: {
          DEFAULT: '#FFD700',
          50: '#FFFDE7',
          100: '#FFF9C4',
          200: '#FFF59D',
          300: '#FFF176',
          400: '#FFEE58',
          500: '#FFD700', // Stardust Gold - PRD
          600: '#FFC400',
          700: '#FFB300',
          800: '#FFA000',
          900: '#FF8F00',
          950: '#FF6F00',
          'dark': '#E6C200',
        },
        // Legacy emerald alias (maps to teal for backward compatibility)
        emerald: {
          DEFAULT: '#00CED1',
          50: '#E0FAFA',
          100: '#B3F2F3',
          200: '#80EAEC',
          300: '#4DE2E5',
          400: '#26DBDE',
          500: '#00CED1',
          600: '#00B8BA',
          700: '#009A9C',
          800: '#007C7E',
          900: '#005E60',
          950: '#004042',
        },
        // === NEUTRAL PALETTE (PRD) ===
        // Snow White (#FFFAFA) - Light mode background, clean premium feel, cards
        // Mist (#E8E8E8) - Light mode dividers, card borders, subtle separators
        // Ash (#4A5568) - Dark mode text, secondary text, muted content
        // Charcoal (#2C3E50) - Dark mode background, footer, primary text in light mode
        neutral: {
          white: '#FFFAFA',      // Snow White - PRD page background (light)
          50: '#FFFAFA',         // Snow White - PRD
          100: '#E8E8E8',        // Mist - PRD dividers
          200: '#D4D4D4',
          300: '#C0C0C0',        // Moonlit Silver
          400: '#8A9A9A',        // Muted/Disabled
          500: '#4A5568',        // Ash - PRD secondary text
          600: '#4A5568',        // Ash alias
          700: '#2C3E50',        // Charcoal - PRD primary text (light)
          800: '#2C3E50',        // Charcoal alias
          900: '#2C3E50',        // Charcoal
          950: '#1A252F',        // Darker charcoal for dark mode
        },
        // === TEXT COLORS (PRD) ===
        text: {
          // Light Mode - Charcoal (#2C3E50) for primary text
          primary: '#2C3E50',    // Charcoal - PRD primary text (light)
          secondary: '#4A5568',  // Ash - PRD secondary text
          muted: '#8A9A9A',      // Muted/Disabled
          inverse: '#FFFAFA',    // Snow White - text on dark backgrounds
          // Dark Mode
          'primary-dark': '#FFFAFA',    // Snow White - PRD text (dark)
          'secondary-dark': '#C0C0C0',  // Moonlit Silver - secondary (dark)
          'muted-dark': '#4A5568',      // Ash - muted (dark)
        },
        // === FUNCTIONAL COLORS (PRD) ===
        // Sage Green (#8FBC8F) - Success states: "Meditation complete", "Sign logged"
        success: {
          50: '#F0F7F0',
          100: '#D8ECD8',
          200: '#B8DDB8',
          300: '#98CE98',
          400: '#8FBC8F',        // Sage Green - PRD success
          500: '#7CAC7C',
          600: '#699C69',
          700: '#568C56',
          800: '#437C43',
          900: '#306C30',
        },
        // Sunset Coral (#FF6F61) - Error states (gentle, not aggressive), warnings
        warning: {
          50: '#FFF5F4',
          100: '#FFE8E6',
          200: '#FFD1CC',
          300: '#FFB9B3',
          400: '#FFA199',
          500: '#FF8A80',
          600: '#FF6F61',        // Sunset Coral - PRD warning/error
          700: '#E65C4F',
          800: '#CC493D',
          900: '#B3362B',
        },
        error: {
          50: '#FFF5F4',
          100: '#FFE8E6',
          200: '#FFD1CC',
          300: '#FFB9B3',
          400: '#FFA199',
          500: '#FF6F61',        // Sunset Coral - PRD error (gentle)
          600: '#E65C4F',
          700: '#CC493D',
          800: '#B3362B',
          900: '#992919',
        },
        // Sky Blue (#87CEEB) - Informational content: tips, help text, hints
        info: {
          50: '#F0F9FF',
          100: '#E0F4FF',
          200: '#B8E6FA',
          300: '#87CEEB',        // Sky Blue - PRD info
          400: '#6BC1E8',
          500: '#4FB4E5',
          600: '#33A7E2',
          700: '#179ADF',
          800: '#0B8DD6',
          900: '#0080CD',
        },
        // === SEMANTIC SURFACE TOKENS (PRD) ===
        // Light Mode: Snow White (#FFFAFA) background
        // Dark Mode: Charcoal (#2C3E50) background
        surface: {
          // Light Mode - Snow White based
          'page': '#FFFAFA',              // Snow White - PRD page background (light)
          'card': '#FFFFFF',              // Pure white cards
          'border': '#E8E8E8',            // Mist - PRD dividers
          'border-strong': '#C0C0C0',     // Moonlit Silver - stronger borders
          // Dark Mode - Charcoal based
          'page-dark': '#2C3E50',         // Charcoal - PRD dark background
          'card-dark': '#34495E',         // Slightly lighter charcoal for cards
          'border-dark': '#4A5568',       // Ash - PRD dark dividers
          'border-dark-strong': '#5A6A7A', // Lighter ash for visible borders
          // Elevated surfaces
          'elevated': '#FFFFFF',          // Pure white elevated (light)
          'elevated-dark': '#3D566E',     // Elevated charcoal (dark)
          // Footer backgrounds
          'footer': '#FFFAFA',            // Snow White footer (light)
          'footer-dark': '#2C3E50',       // Charcoal footer (dark)
          // Interactive states
          'hover': '#F5F5F5',             // Subtle hover (light)
          'hover-dark': '#3D566E',        // Hover state (dark)
          'active': '#E8E8E8',            // Mist - active (light)
          'active-dark': '#4A5568',       // Ash - active (dark)
        },
        // === MUTED VARIANTS FOR DARK MODE ===
        muted: {
          'teal': '#00B8BA',              // Slightly muted teal for dark mode
          'gold': '#E6C200',              // Muted gold for dark mode
          'gold-surface': '#D4B000',      // Even more muted gold for backgrounds
        },
        // === INTENTION TINTS (Tinted neutrals) ===
        intent: {
          'peace': '#F0FAFA',             // Inner Peace - soft teal tint
          'motivation': '#FFFAF0',        // Motivation - warm cream
          'gratitude': '#F0F8FF',         // Gratitude - soft blue
          'abundance': '#FFFFF0',         // Abundance - ivory
          'sleep': '#F0F0FA',             // Sleep - soft lavender
          'healing': '#F5FFF5',           // Healing - soft mint
        },
        // === BUTTON COLORS (PRD) ===
        btn: {
          'primary': '#00CED1',        // Transformative Teal - PRD primary CTA
          'primary-hover': '#00B8BA',  // Teal darker - hover (darken 10%)
          'secondary': '#C0C0C0',      // Moonlit Silver - secondary actions
          'secondary-hover': '#A8A8A8', // Silver darker - hover
          'accent': '#FFD700',         // Stardust Gold - PRD reward CTAs
          'accent-hover': '#E6C200',   // Gold darker - hover
          'ghost': 'transparent',      // Ghost button
          'ghost-hover': 'rgba(0, 206, 209, 0.1)', // Ghost hover (teal tint)
        },
        // Badge colors (PRD)
        badge: {
          'new': '#00CED1',            // Transformative Teal - "NEW" badges
          'popular': '#FFD700',        // Stardust Gold - "Popular" badges
          'premium': '#9D7BE8',        // Nebula Purple - "Premium" badges
          'free': '#8FBC8F',           // Sage Green - "Free" badges
        },
        // Progress colors (PRD)
        progress: {
          'track': '#E8E8E8',          // Mist - light track
          'track-dark': '#4A5568',     // Ash - dark track
          'fill': '#00CED1',           // Transformative Teal fill
          'fill-gold': '#FFD700',      // Stardust Gold fill for rewards
        },
        // Legacy aliases for backward compatibility (maps to PRD colors)
        primary: {
          50: '#E0FAFA',
          100: '#B3F2F3',
          200: '#80EAEC',
          300: '#4DE2E5',
          400: '#26DBDE',
          500: '#00CED1', // Transformative Teal - PRD
          600: '#00B8BA',
          700: '#009A9C',
          800: '#007C7E',
          900: '#005E60',
          950: '#004042',
        },
        secondary: {
          50: '#F5F5F5',
          100: '#E8E8E8',
          200: '#D4D4D4',
          300: '#C0C0C0', // Moonlit Silver - PRD
          400: '#A8A8A8',
          500: '#909090',
          600: '#787878',
          700: '#606060',
          800: '#484848',
          900: '#303030',
          950: '#181818',
        },
        accent: {
          50: '#FFFDE7',
          100: '#FFF9C4',
          200: '#FFF59D',
          300: '#FFF176',
          400: '#FFEE58',
          500: '#FFD700', // Stardust Gold - PRD
          600: '#FFC400',
          700: '#FFB300',
          800: '#FFA000',
          900: '#FF8F00',
          950: '#FF6F00',
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
