import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// base: "./" — относительные пути, работает на GitHub Pages при любом имени репозитория
export default defineConfig({
  base: "./",
  plugins: [react()],
});
