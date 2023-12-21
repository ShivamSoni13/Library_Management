/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        khaki: "#FAEED1",
        navy: "#192655",
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
        Raleway: ["Raleway", "sans-serif"],
        Roboto: ["Roboto", "sans-serif"],
        Ubuntu: ["Ubuntu", "sans-serif"],
      },
      backgroundImage: {
        img: "url('../login.jpg')",
      },
    },
  },
  plugins: [],
};
