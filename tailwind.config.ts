import type {Config} from "tailwindcss";
// [key:value] 형태 배열
const createPxScale = (max: number) => Array.from({length: max + 1}, (_, i) => [`${i}`, `${i}px`]).reduce((acc, [key, value]) => ({...acc, [key]: value}), {});

export default {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      borderWidth: createPxScale(10),
      fontSize: createPxScale(100),
      lineHeight: createPxScale(100),
      minWidth: createPxScale(300),
      minHeight: createPxScale(300),
      spacing: createPxScale(200),
      margin: createPxScale(200),
      padding: createPxScale(200),
      borderRadius: createPxScale(100),
    },
  },
  plugins: [],
} satisfies Config;
