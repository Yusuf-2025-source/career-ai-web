import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // relative asset paths: the built site works from any folder / sub-path / static host
  // host:true => reachable from phones & tablets on the same Wi-Fi (http://<your-computer-ip>:5173)
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
});
