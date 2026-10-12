import type { MetadataRoute } from "next";
import { BRAND_COLOR, LOGO_PATH, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} – Free Online Solve Calculator`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: BRAND_COLOR,
    categories: ["education", "utilities"],
    lang: "en-US",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: LOGO_PATH, sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
