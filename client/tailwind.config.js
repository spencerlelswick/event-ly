/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
 
    extend: {
      
    },
  },
  daisyui: {
    themes: ["light",
    //fantasy
    //cmyk
    //autumn
    "winter",]
  },
  plugins: [require("daisyui")],

}

