/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      'dark-primary': '#001314',
      'shadow-green': '#001a1a',
      'shadow-green-offset': '#003333',
      'white': '#ffffff',
      'black': '#000000',
      'light-blue': '#99c2ff',
      'blue': '#0066ff',
      'red': '#b91c1c',
      'green': '#22c55e',
      'instagram-pink': '#e1306c',
      'gold': '#e6b800',
      'shadow-red': '#1a0000',
      'shadow-red-offset': '#330000',
      'shadow': '#808080'
    },
    screens: {
      'xsm': '100px',
      'sm': '550px',
      'md': '950px',
      'lg': '1310px'
    },
    extend: {
      keyframes: {
        fade_in_out: {
          to: { opacity: '1' }
        }
      },
      animation: {
        'text-fade': 'fade_in_out 5s linear'
      }, 
    },
  },
  plugins: [],
}

