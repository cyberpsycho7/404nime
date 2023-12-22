/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      animation: {
        "fadeInAnimate": "faduIn 300ms linear 300ms"
      },
      keyframes: {
        faduIn: {
          "0%": {opacity: "0"},
          "100%": {opacity: "1"}
        }
      },
      colors: {
        "def-black-gray": "#242424",
        "def-gray": "#212121",
        "def-black": "#121212",
        "silver": "#E8E8E8",
        "white": "#ffffff",
        'text-gray': "#7c7c7c"
      },
      boxShadow: {
        'vignette': "inset 0 0 100px #000000"
      }
  
    },
    screens: {
      '850res': {'raw': '(max-height: 850px)'},
      '1650res': {'raw': '(max-width: 1650px)'},
      '1320res': {'raw': '(max-width: 1320px)'},
      '1480res': {'raw': '(max-width: 1480px)'},
      '1200res': {'raw': '(max-width: 1200px)'},
      '1100res': {'raw': '(max-width: 1100px)'},
      '1000res': {'raw': '(max-width: 1000px)'},
      '900res': {'raw': '(max-width: 900px)'},
      '850resW': {'raw': '(max-width: 850px)'},
      '800res': {'raw': '(max-width: 800px)'},
      '700res': {'raw': '(max-width: 700px)'},
      '650res': {'raw': '(max-width: 650px)'},
      '600res': {'raw': '(max-width: 600px)'},
      '540res': {'raw': '(max-width: 540px)'},
      '500res': {'raw': '(max-width: 500px)'},
      '450res': {'raw': '(max-width: 450px)'},
      '400res': {'raw': '(max-width: 400px)'},
      '370res': {'raw': '(max-width: 370px)'},
      '330res': {'raw': '(max-width: 330px)'},
      '300res': {'raw': '(max-width: 300px)'},

    },

  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true }),],
}

