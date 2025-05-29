/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#e0f2fe",
          main: "#0ea5e9",
          dark: "#0369a1",
        },
        secondary: {
          light: "#dcfce7",
          main: "#22c55e",
          dark: "#15803d",
        },
        accent: {
          light: "#ffe4e6",
          main: "#f43f5e",
          dark: "#be123c",
        },

        // Status colors
        success: {
          light: "#d1fae5",
          main: "#10b981",
          dark: "#047857",
        },
        warning: {
          light: "#fef3c7",
          main: "#f59e0b",
          dark: "#b45309",
        },
        danger: {
          light: "#fee2e2",
          main: "#ef4444",
          dark: "#b91c1c",
        },

        // Special medical colors
        stethoscope: "#3b82f6",
        prescription: "#8b5cf6",
        emergency: "#dc2626",
        diagnostic: "#f59e0b",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },

      boxShadow: {
        card: "0 4px 12px rgba(0, 0, 0, 0.08)",
        dropdown: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
