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
        'door-open': 'door-open 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'door-close': 'door-close 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        'door-open': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(-110deg)' }, /* 문이 완전히 젖혀져 내부가 잘 보이도록 각도를 -110도로 개선 */
        },
        'door-close': {
          '0%': { transform: 'rotateY(-110deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),

  ],
}  satisfies Config;