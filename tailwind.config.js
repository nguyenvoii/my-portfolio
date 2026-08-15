/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core palette
        'midnight': '#0a1628',     // deep midnight blue
        'sky-blue': '#4a90e2',     // secondary sky blue
        'aurora': '#00f5ff',       // aurora cyan
        'aurora-soft': '#7b68ee',  // soft violet
        'amber-warm': '#ffd700',   // warm golden yellow
        'soft-white': '#f8f9fa',   // text primary
        'muted-blue': '#8fa3bf',   // text secondary

        // Extended palette
        'deep-space': '#050b14',
        'aurora-glow': '#00d4ff',
        'snow': '#e8f4f8',
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 10vw, 8rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'subtitle': ['clamp(1.5rem, 4vw, 3rem)', { lineHeight: '1.2' }],
        'body-large': ['1.25rem', { lineHeight: '1.6' }],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'snow-fall': 'snow-fall linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'snow-fall': {
          '0%': { transform: 'translateY(-10vh) translateX(0)' },
          '100%': { transform: 'translateY(110vh) translateX(20px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
