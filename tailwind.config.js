module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      theme: {
        transitionProperty: {
          width: "width",
          height: "height",
          display: "display",
        },
      },
      colors: {
        light: {
          backdrop: "#ffffff",
          topnav: "#188318",
          background: "#E5E7EB",
          alt: "#626C83",
          button: "#47A247",
        },

        blue: {
          backdrop: "#1D2027",
          topnav: "#283149",
          background: "#3A4253",
          alt: "#626C83",
          button: "#4A5984",
        },

        black: {
          DEFAULT: "#000000",
          backdrop: "#303841",
          topnav: "#000000",
          background: "#1F242B",
          alt: "#626C83",
          button: "#47A247",
        },
        misc: {
          high: "#F23A3A",
          mid: "#F27C3A",
          low: "#DFC84F",
        },
        tangerine: "#F2A83A",
      },
      fontFamily: {
        incidents: ["'Incidents'"],
        operation: ["'Operation'"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("tailwind-scrollbar"), require("daisyui")],
  variants: {
    scrollbar: ["rounded"],
  },
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "light",
  },
}
