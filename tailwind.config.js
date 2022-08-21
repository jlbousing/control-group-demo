/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
      },
      fontSize: {
        'subtitle': '28px',
        'label': '17px',
        'custom-button': '18px'
      },
      backgroundImage: {
        'login-image': "url('assets/img/login-image.jpg')"
      },
      backgroundColor: {
        'blue-control-group': '#273492',
        'modal': 'rgba(0,0,0, 0.5)',
        'grey-control-group': '#eeeeee',
        'green-button': '#2d8b26'
      }
    },
  },
  plugins: [],
}
