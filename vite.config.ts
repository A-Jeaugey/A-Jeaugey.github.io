import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Client-side routes other than "/". GitHub Pages has no SPA fallback, so each
// route gets its own copy of index.html to survive direct visits and refreshes.
const spaRoutes = ["mentions-legales"];

const spaRouteFallback = (): Plugin => ({
  name: "spa-route-fallback",
  apply: "build",
  writeBundle({ dir }) {
    if (!dir) return;
    const html = fs.readFileSync(path.join(dir, "index.html"));
    for (const route of spaRoutes) {
      fs.mkdirSync(path.join(dir, route), { recursive: true });
      fs.writeFileSync(path.join(dir, route, "index.html"), html);
    }
  },
});

export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), spaRouteFallback(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));