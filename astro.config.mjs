import { defineConfig } from "astro/config";

// HP単体スタータ — site-build トーナメントが3方向の派生をここから作る
export default defineConfig({
  site: "https://shiretoko-tourist-final.vercel.app",
  trailingSlash: "ignore",
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
});
