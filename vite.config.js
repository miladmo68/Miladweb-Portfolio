import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          mui: ["@mui/material", "@mui/icons-material"],
          icons: ["react-icons", "@fortawesome/react-fontawesome"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
