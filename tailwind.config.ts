import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#1E88FF",
          secondary: "#0F6DFF",
          accent: "#42A5FF",
          50: "#EAF3FF",
          100: "#D6E8FF",
          200: "#ADD1FF",
          300: "#84BAFF",
          400: "#5BA4FF",
          500: "#42A5FF",
          600: "#1E88FF",
          700: "#0F6DFF",
          800: "#0B57D0",
          900: "#0A3FA0",
        },
        ink: "#111827",
        surface: "#F8FAFC",
        line: "#E5E7EB",
        success: "#16A34A",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        manrope: ["var(--font-manrope)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        heading: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(17,24,39,0.03), 0 4px 16px rgba(17,24,39,0.05)",
        lift: "0 2px 6px rgba(17,24,39,0.04), 0 14px 34px rgba(17,24,39,0.07)",
        "lift-lg": "0 4px 12px rgba(17,24,39,0.05), 0 30px 70px rgba(17,24,39,0.12)",
        glow: "0 0 0 1px rgba(30,136,255,0.08), 0 8px 28px rgba(30,136,255,0.16)",
        "glow-lg":
          "0 0 0 1px rgba(30,136,255,0.10), 0 18px 48px rgba(30,136,255,0.22)",
        "glow-xl":
          "0 0 0 1px rgba(30,136,255,0.14), 0 30px 80px rgba(30,136,255,0.28)",
        "inner-soft": "inset 0 1px 0 rgba(255,255,255,0.6)",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #42A5FF 0%, #1E88FF 45%, #0F6DFF 100%)",
        "brand-gradient-soft":
          "linear-gradient(135deg, rgba(66,165,255,0.14), rgba(15,109,255,0.10))",
        "hero-glow":
          "radial-gradient(60% 55% at 50% 0%, rgba(30,136,255,0.14) 0%, rgba(30,136,255,0.00) 70%)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "float-x": {
          "0%,100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(10px,-12px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(200%)" },
        },
        "gradient-x": {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        pulseSoft: {
          "0%,100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "shine-sweep": {
          "0%": { transform: "translateX(-100%)" },
          "60%,100%": { transform: "translateX(220%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        aurora: {
          "0%,100%": { transform: "translate(0,0) scale(1)", opacity: "0.6" },
          "50%": { transform: "translate(4%,-3%) scale(1.08)", opacity: "0.9" },
        },
        ring: {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        ticker: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
      },
      animation: {
        marquee: "marquee 34s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-x": "float-x 7s ease-in-out infinite",
        "gradient-x": "gradient-x 6s ease infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "shine-sweep": "shine-sweep 5.5s ease-in-out infinite",
        "spin-slow": "spin-slow 26s linear infinite",
        aurora: "aurora 14s ease-in-out infinite",
        ring: "ring 2.6s cubic-bezier(0.16,1,0.3,1) infinite",
        ticker: "ticker 18s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
