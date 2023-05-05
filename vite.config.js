import { defineConfig, loadEnv } from "vite";
import path from "path";
import Vue from "@vitejs/plugin-vue";
import ViteImages from "vite-plugin-vue-images";

// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      Vue(),

      ViteImages({
        dirs: ["src/assets/images"],
      }),
    ],
    server: {
      port: +env.VITE_PORT,
    },
    resolve: {
      extensions: [
        ".mjs",
        ".js",
        ".ts",
        ".jsx",
        ".tsx",
        ".json",
        ".vue",
        ".css",
      ],
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
