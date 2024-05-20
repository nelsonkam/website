import prose from "@tailwindcss/typography";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [".vitepress/**/*.vue", "./**/*.{md,vue}"],
  theme: {
    extend: {},
  },
  plugins: [prose],
};
