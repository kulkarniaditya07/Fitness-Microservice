import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#715A5A',
        secondary: '#44444E',
        success: '#D3DAD9',
        warning: '#715A5A',
        danger: '#715A5A',
      },
      boxShadow: {
        glow: '0 16px 35px rgba(55, 53, 62, 0.45)',
      },
      backgroundImage: {
        dots: 'radial-gradient(circle, rgba(68, 68, 78, 0.2) 1px, transparent 1px)',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        'fitness-dark': {
          primary: '#715A5A',
          secondary: '#44444E',
          accent: '#37353E',
          neutral: '#D3DAD9',
          'base-100': '#37353E',
          info: '#44444E',
          success: '#D3DAD9',
          warning: '#715A5A',
          error: '#715A5A',
        },
      },
    ],
    darkTheme: 'fitness-dark',
  },
};

export default config;
