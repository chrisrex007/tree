import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      host: "0.0.0.0", // or use '0.0.0.0' for network access
      port: 24678, // Use any open port for HMR
    },
    watch: {
      usePolling: true, // Needed for some Docker environments
    },
    host: "0.0.0.0",
    port: 5173,
  },
});
