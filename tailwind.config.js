/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/emails/layouts/**/*.{hbs,html}',
    './src/emails/partials/**/*.{hbs,html}',
    './src/emails/templates/**/*.{hbs,html}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
