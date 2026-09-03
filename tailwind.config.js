/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        "ink-muted": "rgb(var(--color-ink-muted) / <alpha-value>)",
        border: "var(--color-border)",
        circuit: "rgb(var(--color-circuit) / <alpha-value>)",
        flow: "rgb(var(--color-flow) / <alpha-value>)",
        "flow-soft": "rgb(var(--color-flow-soft) / <alpha-value>)",
        volt: "rgb(var(--color-volt) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "accent-ink": "#080A0F",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "Helvetica", "sans-serif"],
        display: ["var(--font-space-grotesk)", "Arial", "Helvetica", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        dashflow: {
          "0%": { strokeDashoffset: "24" },
          "100%": { strokeDashoffset: "0" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(12px, -10px)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.35)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.06)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "marquee-reverse": "marquee-reverse 32s linear infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        dashflow: "dashflow 1.2s linear infinite",
        drift: "drift 7s ease-in-out infinite",
        "pulse-dot": "pulse-dot 2.4s ease-in-out infinite",
        "glow-pulse": "glow-pulse 4.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
