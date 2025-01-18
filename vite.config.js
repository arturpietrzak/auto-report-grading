import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const manifest = {
  short_name: "SRLLM",
  name: "StudentReportLLM",
  description:
    "An application that uses advanced language models to automatically evaluate student reports. The system aims to analyze the quality of content and assess compliance with design guidelines, providing an objective and precise tool to support the educational process.",
  icons: [
    {
      src: "favicon.ico",
      type: "image/x-icon",
      sizes: "64x64 32x32 24x24 16x16",
      purpose: "any",
    },
    {
      src: "192.png",
      type: "image/png",
      sizes: "192x192",
      purpose: "any",
    },
    {
      src: "512.png",
      type: "image/png",
      sizes: "512x512",
      purpose: "any",
    },
  ],
  screenshots: [
    {
      src: "screenshot.png",
      sizes: "1280x900",
      type: "image/png",
      form_factor: "wide",
      label: "Application",
    },
    {
      src: "screenshot_mobile.png",
      sizes: "400x900",
      type: "image/png",
      form_factor: "narrow",
      label: "Application",
    },
  ],
  start_url: ".",
  display: "standalone",
  theme_color: "#64176b",
  background_color: "#f9fafb",
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({ manifest: manifest })],
});
