import type { MetadataRoute } from "next";

// PWA / installability + Android icons. Served at /manifest.webmanifest.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Qualtron Sinclair",
    short_name: "Qualtron",
    description:
      "Qualtron Sinclair — a multi-vertical growth architect for MENA market entry: legal, capital, technology, talent, infrastructure and operations.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0e1f",
    theme_color: "#0a0e1f",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
