/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
        bottom: 'bottom',
      },
      width: {
        "device-width": "360px",
      },
      height: {
        "device-height": "640px",
      },
      backgroundColor: {
        'green': '#1A5D1A', 
        'red': '#CC3636'
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

