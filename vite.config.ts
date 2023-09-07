import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import path from "path";
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver({ importStyle: "sass" })],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
    preprocessorOptions: {
      scss: {
        // additionalData: `@use "@/styles/element/index.scss" as *;`,
      },
    },
  }
});
