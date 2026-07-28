import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cinema-marquee palette: near-black charcoal stage, velvet crimson accent,
        // brass-gold highlight for "now showing" marquee lights.
        stage: {
          950: "#08080B",
          900: "#0D0E13",
          800: "#15161D",
          700: "#1E202B",
          600: "#2A2D3A",
        },
        velvet: {
          400: "#F4536B",
          500: "#E63950",
          600: "#C22641",
          700: "#9C1B33",
        },
        brass: {
          300: "#F2D399",
          400: "#E8BD6E",
          500: "#D4AF37",
          600: "#B08A22",
        },
        mist: {
          100: "#F5F5F7",
          300: "#C9CAD3",
          400: "#9C9EAD",
          500: "#71738A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "marquee-glow":
          "radial-gradient(60% 60% at 50% 0%, rgba(230,57,80,0.18) 0%, rgba(8,8,11,0) 70%)",
        "film-grain":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        marquee: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "-200px 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        shimmer: "shimmer 1.6s ease-in-out infinite",
      },
      boxShadow: {
        marquee: "0 0 40px -8px rgba(230,57,80,0.45)",
        card: "0 12px 30px -12px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};
export default config;
