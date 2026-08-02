/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            DEFAULT: 'var(--color-brand-green)',
            hover: 'var(--color-brand-green-hover)',
            dark: 'var(--color-brand-green-dark)',
            light: 'var(--color-brand-green-light)',
          },
          gold: {
            DEFAULT: 'var(--color-brand-gold)',
            hover: 'var(--color-brand-gold-hover)',
            highlight: 'var(--color-brand-gold-highlight)',
            light: 'var(--color-brand-gold-light)',
          },
        },
        surface: {
          bg: 'var(--color-bg-primary)',
          card: 'var(--color-bg-card)',
          dark: 'var(--color-bg-dark)',
          muted: 'var(--color-bg-muted)',
          border: 'var(--color-border)',
        },
        content: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          inverse: 'var(--color-text-inverse)',
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      borderRadius: {
        'card': 'var(--radius-card)',
        'button': 'var(--radius-button)',
        'pill': '9999px',
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(10, 77, 60, 0.05)',
        'card-hover': '0 12px 32px -4px rgba(10, 77, 60, 0.08)',
        'gold-glow': '0 0 24px -4px rgba(245, 166, 35, 0.35)',
      },
    },
  },
  plugins: [],
};
