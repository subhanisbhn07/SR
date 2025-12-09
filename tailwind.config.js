/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // Light mode only - Neumorphism design
  theme: {
    extend: {
      colors: {
        // === SIGNROAD DESIGN SYSTEM v4.0 ===
        // Neumorphism (Soft UI) - Light Mode Only, Grayscale
        // 
        // COLOR PHILOSOPHY:
        // - Soft, embossed/debossed elements
        // - Light gray background with dual shadows
        // - Minimal color - grayscale only
        // - Generous rounded corners
        //
        // === NEUMORPHIC BASE COLORS ===
        neumo: {
          bg: '#E0E5EC',              // Main background - soft gray
          surface: '#E5EAF2',         // Cards - slightly lighter for depth
          'surface-soft': '#EDF1F7',  // Inner blocks/inputs - even lighter
          text: '#2D3436',            // Primary text - dark gray
          'text-secondary': '#636E72', // Secondary text - medium gray
          'text-muted': '#B2BEC3',    // Muted text - light gray
          border: '#D1D9E6',          // Subtle borders
          accent: '#636E72',          // Accent (neutral gray)
        },
        // === BACKGROUNDS ===
        background: {
          DEFAULT: '#E0E5EC',
          primary: '#E0E5EC',
          secondary: '#E0E5EC',
          tertiary: '#D8DDE4',
          input: '#E0E5EC',
        },
        // === PRIMARY (Grayscale) ===
        gold: {
          DEFAULT: '#636E72',
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
          950: '#000000',
        },
        teal: {
          DEFAULT: '#636E72',
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
          950: '#000000',
        },
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
        emerald: {
          DEFAULT: '#636E72',
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
          950: '#000000',
        },
        // === NEUTRAL PALETTE ===
        neutral: {
          white: '#FFFFFF',
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
          950: '#000000',
        },
        // === TEXT COLORS ===
        text: {
          primary: '#2D3436',
          secondary: '#636E72',
          muted: '#B2BEC3',
          inverse: '#FFFFFF',
        },
        // === SEMANTIC COLORS (Grayscale) ===
        success: {
          DEFAULT: '#636E72',
          50: '#F5F6F7',
          100: '#E0E5EC',
          200: '#D1D9E6',
          300: '#B2BEC3',
          400: '#636E72',
          500: '#636E72',
          600: '#4A5568',
          700: '#2D3436',
          800: '#1A202C',
          900: '#0D1117',
        },
        warning: {
          DEFAULT: '#636E72',
          50: '#F5F6F7',
          100: '#E0E5EC',
          200: '#D1D9E6',
          300: '#B2BEC3',
          400: '#636E72',
          500: '#636E72',
          600: '#4A5568',
          700: '#2D3436',
          800: '#1A202C',
          900: '#0D1117',
        },
        error: {
          DEFAULT: '#4A5568',
          50: '#F5F6F7',
          100: '#E0E5EC',
          200: '#D1D9E6',
          300: '#B2BEC3',
          400: '#636E72',
          500: '#4A5568',
          600: '#2D3436',
          700: '#1A202C',
          800: '#0D1117',
          900: '#000000',
        },
        info: {
          DEFAULT: '#636E72',
          50: '#F5F6F7',
          100: '#E0E5EC',
          200: '#D1D9E6',
          300: '#B2BEC3',
          400: '#636E72',
          500: '#636E72',
          600: '#4A5568',
          700: '#2D3436',
          800: '#1A202C',
          900: '#0D1117',
        },
        // === SURFACE TOKENS ===
        surface: {
          'page': '#E0E5EC',
          'card': '#E0E5EC',
          'card-dark': '#E0E5EC',
          'card-warm': '#E0E5EC',
          'border': '#D1D9E6',
          'border-strong': '#B2BEC3',
          'border-dark': '#D1D9E6',
          'border-dark-strong': '#B2BEC3',
          'elevated': '#E8ECF2',
          'elevated-dark': '#E8ECF2',
          'footer': '#D1D9E6',
          'footer-dark': '#D1D9E6',
          'hover': '#D8DDE4',
          'hover-dark': '#D8DDE4',
          'active': '#CDD4DC',
          'active-dark': '#CDD4DC',
        },
        // === BUTTON COLORS ===
        btn: {
          'primary': '#636E72',
          'primary-hover': '#4A5568',
          'secondary': '#E0E5EC',
          'secondary-hover': '#D1D9E6',
          'accent': '#636E72',
          'accent-hover': '#4A5568',
          'ghost': 'transparent',
          'ghost-hover': '#D1D9E6',
        },
        // === BADGE COLORS ===
        badge: {
          'new': '#636E72',
          'popular': '#636E72',
          'premium': '#4A5568',
          'free': '#636E72',
        },
        // === PROGRESS COLORS ===
        progress: {
          'track': '#D1D9E6',
          'track-dark': '#D1D9E6',
          'fill': '#636E72',
          'fill-gold': '#636E72',
        },
        // === LEGACY ALIASES ===
        primary: {
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
          950: '#000000',
        },
        secondary: {
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
          950: '#0D1117',
        },
        accent: {
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
          950: '#000000',
        },
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
        // Glass colors (mapped to neumorphic)
        glass: {
          'bg': '#E0E5EC',
          'border': '#D1D9E6',
          'border-hover': '#B2BEC3',
        },
      },
      fontFamily: {
        sans: ['DM Sans', '-apple-system', 'system-ui', 'sans-serif'],
        display: ['DM Sans', '-apple-system', 'system-ui', 'sans-serif'],
        body: ['DM Sans', '-apple-system', 'system-ui', 'sans-serif'],
      },
      // === NEUMORPHIC SHADOWS (Refined - softer, more blur, less harsh) ===
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
        // Legacy shadows mapped to neumorphic
        'glow': '6px 6px 18px rgba(163, 177, 198, 0.5), -6px -6px 18px rgba(255, 255, 255, 0.9)',
        'glow-lg': '10px 10px 28px rgba(163, 177, 198, 0.55), -10px -10px 28px rgba(255, 255, 255, 0.95)',
        'glow-violet': '6px 6px 18px rgba(163, 177, 198, 0.5), -6px -6px 18px rgba(255, 255, 255, 0.9)',
        'glow-mint': '6px 6px 18px rgba(163, 177, 198, 0.5), -6px -6px 18px rgba(255, 255, 255, 0.9)',
        'glass': '6px 6px 18px rgba(163, 177, 198, 0.5), -6px -6px 18px rgba(255, 255, 255, 0.9)',
      },
      // === BORDER RADIUS ===
      borderRadius: {
        'neumo': '16px',
        'neumo-lg': '22px',
        'neumo-xl': '28px',
        'neumo-full': '9999px',
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
    },
  },
  plugins: [],
};
