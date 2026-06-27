import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Poppins", "HarmonyOS Sans SC", "system-ui", "sans-serif"],
        body: ["Inter", "HarmonyOS Sans SC", "system-ui", "sans-serif"],
        cn: ["HarmonyOS Sans SC", "HarmonyOS Sans", "PingFang SC", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
