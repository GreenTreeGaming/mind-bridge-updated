/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#10b981",
          soft: "rgba(16,185,129,0.15)",
          surface: "rgba(6,78,59,0.35)",
        },
        surface: {
          glass: "rgba(6,78,59,0.25)",
          border: "rgba(16,185,129,0.25)",
        },
        crisis: {
          DEFAULT: "#ef4444",
          surface: "rgba(239,68,68,0.15)",
        },
        // subtle secondary accent (optional, used only in gradients)
        accent: {
          DEFAULT: "#2dd4bf", // teal-400 vibe
          soft: "rgba(45,212,191,0.18)",
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        floaty2: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(12px)" },
        }
      },
      animation: {
        floaty: "floaty 4.5s ease-in-out infinite",
        floaty2: "floaty2 5.5s ease-in-out infinite",
      }
    },
  },
  plugins: [],
}