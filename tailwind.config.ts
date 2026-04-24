import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FAF7F2',
        surface: '#F2EDE7',
        surface2: '#EAE5DF',
        border: '#D8D2CA',
        accent: '#C8291A',
        'accent-dark': '#9E1E10',
        'accent-light': '#E04B38',
        text: '#1C1916',
        dim: '#7A746E',
        muted: '#C0B8B0',
      },
      fontFamily: {
        display: ['var(--font-unbounded)', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
