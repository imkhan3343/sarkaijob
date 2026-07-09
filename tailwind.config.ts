import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#870000',
        'primary-container': '#b30000',
        tertiary: '#003f80',
        secondary: '#3557bc',
        error: '#ba1a1a',
        'success-green': '#1B5E20',
        background: '#fcf9f8',
        'background-alt': '#F4F7FA',
        'border-subtle': '#E0E0E0',
        'on-primary': '#ffffff',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'headline-lg': ['24px', { lineHeight: '1.3', fontWeight: '700' }],
        'headline-md': ['20px', { lineHeight: '1.3', fontWeight: '700' }],
        'headline-sm': ['16px', { lineHeight: '1.4', fontWeight: '700' }],
        'body-lg': ['16px', { lineHeight: '1.5' }],
        'body-md': ['14px', { lineHeight: '1.5' }],
        'body-sm': ['13px', { lineHeight: '1.5' }],
        'label-bold': ['12px', { lineHeight: '1.4', fontWeight: '700' }],
        'label-md': ['12px', { lineHeight: '1.4', fontWeight: '500' }],
      },
      borderRadius: {
        DEFAULT: '2px',
        lg: '4px',
        xl: '8px',
        '2xl': '12px',
      },
      maxWidth: {
        container: '1200px',
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
