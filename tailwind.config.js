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
      backgroundImage: {
        'login-image': "url('assets/img/login-image.jpg')"
      },
      backgroundColor: {
        'blue-control-group': '#273492',
        'modal': 'rgba(0,0,0, 0.5)'
      }
    },
  },
  plugins: [],
}
