import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0066CC",
        secondary: "#00A896",
        success: "#2DBA4E",
        warning: "#FF9500",
        danger: "#E63946",
        neutral: "#F5F7FA",
        dark: "#2C3E50",
      },
      fontFamily: {
        sans: ["Inter var", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark"],
    darkTheme: false,
  },
};

export default config;
