/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      animation: {
        shimmer: 'shimmer 2s linear infinite',
        'meteor': 'meteor 5s linear infinite',
        'meteor-reverse': 'meteor-reverse 5s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        meteor: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '10%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { transform: 'translateX(100%)', opacity: 0 },
        },
        'meteor-reverse': {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '10%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { transform: 'translateX(-100%)', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}
