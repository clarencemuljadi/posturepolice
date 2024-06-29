/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "button-color": "#3da9fc",
        bground: "#fffffe",
        "second-bground": "#bae8e8",
        "third-bground": "#66aaff",
        "head-color": "#094067",
        "text-color": "#5f6c7b",
        "button-text-color": "#fffffe",
        "border-color": "#094067",
        "second-b-color": "#90b4ce",
      },
      fontFamily: {
        'metal': ['Metal Mania', 'cursive'],
      },
    },
  },
  plugins: [],
};
