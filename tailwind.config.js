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
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
        sans: [
          'ui-monospace',
          'SFMono-Regular',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      fontSize: {
        base: '16px',
        sm: '14px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
      },
      fontWeight: {
        normal: '500',
        medium: '600',
        bold: '800',
      },
      colors: {
        text: {
          DEFAULT: '#000000',
          alt: '#666666',
        },
        bg: {
          DEFAULT: '#ffffff',
          alt: '#eeeeee',
        },
        accent: {
          DEFAULT: '#0891b2', // cyan-600
          hover: '#0e7490', // cyan-700
        },
      },
      spacing: {
        line: '1.20rem',
      },
      lineHeight: {
        base: '1.20rem',
      },
      borderWidth: {
        DEFAULT: '2px',
        thick: '3px',
      },
      maxWidth: {
        email: '600px',
      },
    },
  },
  plugins: [],
};
