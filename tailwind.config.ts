import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // THIS LINE IS CRITICAL FOR DARK MODE TO WORK
  darkMode: "class", 
  theme: {
    extend: {
      colors: {
        primary: "#CCFF00",
        secondary: "#FF9F0A",
        tertiary: "#00F0FF",
        background: "#0B192C",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'float-fast': 'float 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
export default config;