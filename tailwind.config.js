/** @type {import('tailwindcss').Config} */
const catppuccin = require('@catppuccin/ui/tailwind');
// module.exports = {
//     content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require('@catppuccin/tailwindcss')({
//       // prefix to use, e.g. `text-pink` becomes `text-ctp-pink`.
//       // default is `false`, which means no prefix
//       prefix: 'ctp',
//       // which flavour of colours to use by default, in the `:root`
//       defaultFlavour: 'latte'
//     }),
//       require('@catppuccin/ui')({
//
//       }),
//   ],
// }

module.exports = {
  content: [
    './src/**/*.{html,js,jsx}',
    './node_modules/@catppuccin/ui/**/*.{html,js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ["Inter", "ui-sans-serif"],
      },
    },
  },
  plugins: [
    require('@catppuccin/tailwindcss')({
      prefix: false,
      defaultFlavour: "latte",
    }),
  ],
};

