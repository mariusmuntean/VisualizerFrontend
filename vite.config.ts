import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {}, //Fixes "Uncaught ReferenceError: process is not defined" from 'react-tweet-embed' - Recommended here https://github.com/vitejs/vite/issues/1973#issuecomment-787571499
  },
});
