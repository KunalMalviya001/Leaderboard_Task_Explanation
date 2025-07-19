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
        target: "http://localhost:5000", // Adjust this to your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
