import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ITMC Solutions | IT & Management Consulting for Federal CIO Organizations",
    short_name: "ITMC Solutions",
    description:
      "Trusted by Federal CIO organizations for decades. Expert IT consulting for CPIC/portfolio management, TBM, data analytics, and program management.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0066cc",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icons/icon-192x192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512x512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/VPlus_logo.webp",
        sizes: "any",
        type: "image/webp",
      },
    ],
    categories: ["business", "productivity"],
    lang: "en-US",
    dir: "ltr",
  };
}
