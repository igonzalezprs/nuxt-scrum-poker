import { Config } from 'tailwindcss';

export default <Config>{
  content: [
    'app.vue'
    // Add all files that contain Tailwind classes
    // e.g. './modules/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          base: '#0077B6',
          hover: '#03506F',
          hoverDark: '#0096C7'
        },
        primaryDark: '#F94144',
        gray: {
          50: '#F8F8F8',
          100: '#EAEAEA',
          800: '#222222',
          850: '#333333'
        }
      }
    }
  },
  plugins: [],
}