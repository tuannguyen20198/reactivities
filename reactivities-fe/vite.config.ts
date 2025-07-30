import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  base: "",
  plugins: [react()],
  server: {
    port: 4000,
    host: true,
  },

  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      "@": path.resolve(__dirname, "src"),
      'api': path.resolve(__dirname, './src/api'),
    },
  },
});
