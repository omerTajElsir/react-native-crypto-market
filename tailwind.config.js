/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          DEFAULT: "#CDFF00",
          light: "#DEFF4D",
          dark: "#A3CC00",
        },

        // Background colors
        background: {
          DEFAULT: "#0E0E0E",
          card: "#2B2B2B4D",
          elevated: "#1A1A1A",
        },

        // Text colors
        text: {
          primary: "#FFFFFF",
          secondary: "#FFFFFF80",
          disabled: "#FFFFFF40",
        },

        // Status colors
        status: {
          positive: "#00C853",
          negative: "#FF3440",
          warning: "#FFB300",
          info: "#2196F3",
        },

        // Border colors
        border: {
          DEFAULT: "#FFFFFF20",
          light: "#FFFFFF10",
          focus: "#CDFF00",
        },

        // Legacy colors (for backward compatibility)
        cardBackground: "#2B2B2B4D",
        textPrimary: "#FFFFFF",
        textSecondary: "#FFFFFF80",
        negative: "#FF3440",
      },

      fontFamily: {
        lufga: {
          regular: ["LufgaRegular", "sans-serif"],
          medium: ["LufgaMedium", "sans-serif"],
          bold: ["LufgaBold", "sans-serif"],
          semiBold: ["LufgaSemiBold", "sans-serif"],
          light: ["LufgaLight", "sans-serif"],
          extraLight: ["LufgaExtraLight", "sans-serif"],
          extraBold: ["LufgaExtraBold", "sans-serif"],
          black: ["LufgaBlack", "sans-serif"],
          thin: ["LufgaThin", "sans-serif"],
        },
        spaceMono: {
          regular: ["SpaceMono-Regular", "sans-serif"],
        },
      },

      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "30px",
        "4xl": "36px",
        "5xl": "48px",
      },

      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "40px",
        "3xl": "48px",
        "4xl": "56px",
        "5xl": "64px",
      },

      borderRadius: {
        none: "0",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        full: "9999px",
      },
    },
  },
  plugins: [],
}
