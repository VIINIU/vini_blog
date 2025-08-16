import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default{
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './app/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: 'var(--font-serif)',
        inter: 'var(--font-inter)',
        dos: 'var(--font-dos)',
        gothic: 'var(--font-gothic)'
      },
      animation: {
        'door-open': 'door-open 0.5s ease-in-out forwards',
        'door-close': 'door-close 0.5s ease-in-out forwards',
      },
      keyframes: {
        'door-open': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(-90deg)' },
        },
        'door-close': {
          '0%': { transform: 'rotateY(-90deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),

  ],
}  satisfies Config;