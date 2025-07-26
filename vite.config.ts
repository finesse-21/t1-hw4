import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@app": "/src/app",
      "@shared": "/src/shared",
      "@entities": "/src/entities",
      "@features": "/src/features",
      "@widgets": "/src/widgets",
      "@pages": "/src/pages",
    },
  },
  server: {
    allowedHosts: ["localhost"],
    port: 5173,
    proxy: {
      "/api": {
        changeOrigin: true,
        secure: false,
        target: "http://localhost:4000",
      },
    },
    strictPort: true,
  },
});
