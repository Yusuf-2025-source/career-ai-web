import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // relative asset paths: the built site works from any folder / sub-path / static host
  server: { host: "localhost", port: 5173 },
  preview: { host: "localhost", port: 4173 },
});
