/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Metroll Design System
        'metroll': {
          primary: '#10B981',
          'primary-light': '#34D399',
          'primary-dark': '#059669',
          accent: '#6366F1',
          'accent-light': '#818CF8',
          warning: '#F59E0B',
          danger: '#EF4444',
        },
        // Background layers
        'surface': {
          base: '#09090B',
          elevated: '#18181B',
          DEFAULT: '#27272A',
          hover: '#3F3F46',
        },
        // Text colors
        'content': {
          primary: '#FAFAFA',
          secondary: '#A1A1AA',
          tertiary: '#71717A',
          muted: '#52525B',
        },
        // Trading colors
        'profit': {
          DEFAULT: '#10B981',
          bg: 'rgba(16, 185, 129, 0.12)',
          border: 'rgba(16, 185, 129, 0.3)',
        },
        'loss': {
          DEFAULT: '#EF4444',
          bg: 'rgba(239, 68, 68, 0.12)',
          border: 'rgba(239, 68, 68, 0.3)',
        },
        // Legacy compatibility
        'nofx-gold': {
          DEFAULT: '#10B981', // Map to new primary
          dim: 'rgba(16, 185, 129, 0.1)',
          glow: 'rgba(16, 185, 129, 0.5)',
          highlight: '#34D399',
        },
        'nofx-bg': {
          DEFAULT: '#09090B',
          deeper: '#050506',
          lighter: '#18181B',
        },
        'nofx-accent': '#6366F1',
        'nofx-text': {
          DEFAULT: '#FAFAFA',
          main: '#FAFAFA',
          muted: '#A1A1AA',
        },
        'nofx-success': '#10B981',
        'nofx-danger': '#EF4444',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui'],
        display: ['Space Grotesk', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh': 'radial-gradient(ellipse at 20% 0%, rgba(16, 185, 129, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(99, 102, 241, 0.06) 0%, transparent 50%)',
        'grid-subtle': 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '32px 32px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease forwards',
        'slide-up': 'slideUp 0.4s ease forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(16, 185, 129, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'glow': '0 0 40px rgba(16, 185, 129, 0.15)',
        'glow-accent': '0 0 40px rgba(99, 102, 241, 0.15)',
        'glow-sm': '0 0 20px rgba(16, 185, 129, 0.2)',
        'card': '0 4px 12px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.6)',
        // Legacy
        'neon': '0 0 5px #10B981, 0 0 20px rgba(16, 185, 129, 0.2)',
        'neon-blue': '0 0 5px #6366F1, 0 0 20px rgba(99, 102, 241, 0.2)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
