import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './store/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#7c3aed',
          600: '#6d28d9'
        }
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.2)'
      },
      backgroundImage: {
        'radial-study':
          'radial-gradient(circle at top left, rgba(124,58,237,0.35), transparent 35%), radial-gradient(circle at bottom right, rgba(59,130,246,0.3), transparent 35%)'
      }
    }
  },
  plugins: []
};

export default config;
