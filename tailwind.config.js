module.exports = {
  darkMode: 'class',
  content: [
    './*.html',
    './js/*.js',
    './content/**/*.json',
    './assets/**/*.svg'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: 'rgba(233, 84, 32, 0.05)',
          100: 'rgba(233, 84, 32, 0.1)',
          500: '#E95420',
          600: '#C34113',
          700: '#A6390F',
        },
        ink: '#1A1A2E',
        inkLight: '#374151',
        inkMuted: '#6B7280',
        charcoal: '#0F1115',
        accentBlue: '#5DA9FF',
        accentGreen: '#57D38C',
        accentOrange: '#FFB454',
        accentPurple: '#B38CFF',
        accentRed: '#FF6B6B',
        textLight: '#E8E8E8',
        textMuted: '#A0A0A0',
      },
      fontFamily: {
        sans: ["Ubuntu", "-apple-system", "BlinkMacSystemFont", "\"Segoe UI\"", "\"Noto Sans\"", "Helvetica", "Arial", "sans-serif", "\"Apple Color Emoji\"", "\"Segoe UI Emoji\""],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};
