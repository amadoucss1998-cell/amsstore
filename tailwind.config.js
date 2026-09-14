export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      colors: {
        navy:   '#0f172a',
        card:   '#1e293b',
        border: '#334155',
        muted:  '#64748b',
        dim:    '#94a3b8',
      },
    },
  },
  plugins: [],
};
