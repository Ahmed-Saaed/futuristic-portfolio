import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#08090B',
        graphite: '#14171A',
        elevated: '#1C2024',
        gold: {
          DEFAULT: '#C4A45A',
          highlight: '#E5BE78',
          muted: 'rgba(196, 164, 90, 0.25)',
        },
        cyan: {
          DEFAULT: '#00D5E8',
          muted: 'rgba(0, 213, 232, 0.25)',
        },
        warmWhite: '#F2F0E9',
        mutedGrey: '#92949B',
        borderDark: '#30343A',
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'serif'],
      },
      maxWidth: {
        container: '1440px',
      },
      boxShadow: {
        'gold-glow': '0 0 28px -4px rgba(229, 190, 120, 0.55), 0 0 12px -2px rgba(196, 164, 90, 0.4)',
        'gold-glow-lg': '0 0 42px -4px rgba(229, 190, 120, 0.75), 0 0 18px 0px rgba(196, 164, 90, 0.5)',
        'cyan-glow': '0 0 26px -4px rgba(0, 213, 232, 0.45), inset 0 0 14px -6px rgba(0, 213, 232, 0.35)',
        'cyan-glow-lg': '0 0 38px -2px rgba(0, 213, 232, 0.65), inset 0 0 18px -4px rgba(0, 213, 232, 0.45)',
      },
    },
  },
  plugins: [],
};

export default config;

