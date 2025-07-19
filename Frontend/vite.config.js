import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  theme: {
    extend: {
      animation: {
        "bounce-slow": "bounce 2.5s infinite",
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://leaderboard-backend-5xvj.onrender.com", // Adjust this to your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
