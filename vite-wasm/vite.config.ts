import { defineConfig } from "vite";
import topLevelAwait from 'vite-plugin-top-level-await'
export default defineConfig({
  plugins: [topLevelAwait()],
  base:'/wasm-game-of-life',
  optimizeDeps: {
    exclude: ["wasm-game-of-life"],
  },
  build: {
    outDir: "../docs",
  }
});
