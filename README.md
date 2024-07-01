-------------------------------------------------------
Gaming Web App
-------------------------------------------------------
Technology Used
---------------
React
npx create-react-app gamezone

Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init

create .postcssrc file in root

Configure Tailwind Config File
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

Configure PostCSS config file
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

