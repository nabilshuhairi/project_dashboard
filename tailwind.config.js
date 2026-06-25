/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#cc785c',
        'primary-active': '#dbdbdb33',
        'primary-disabled': '#e6dfd8',
        'accent-teal': '#5db8a6',
        'accent-amber': '#e8a55a',
        canvas: '#faf9f5',
        'surface-card': '#ffffff',
        'surface-cream-strong': '#e8e0d2',
        'surface-dark': '#C7C7C7',
        'surface-dark-elevated': '#252320',
        'surface-dark-soft': '#1f1e1b',
        hairline: '#e6dfd8',
        'hairline-soft': '#ebe6df',
        ink: '#141413',
        'body-strong': '#252523',
        body: '#3d3d3a',
        muted: '#6c6a64',
        'muted-soft': '#8e8b82',
        'on-primary': '#ffffff',
        'on-dark': '#faf9f5',
        success: '#5db872',
        warning: '#d4a017',
        error: '#c64545',
      },
      borderRadius: {
        md: '8px',
        lg: '12px',
        xl: '16px',
        pill: '9999px',
      },
      spacing: {
        section: '96px',
        xl: '32px',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        code: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace'],
      },
    },
  },
  plugins: [],
}
