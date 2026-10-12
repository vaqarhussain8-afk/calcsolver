import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles";
import { LAST_UPDATED, STATIC_ROUTES, absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(LAST_UPDATED),
    changeFrequency: route === "/" || route === "/math" ? "weekly" : "yearly",
    priority: route === "/" ? 1 : route === "/math" ? 0.8 : 0.3,
  }));

  const articlePages: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: absoluteUrl(`/math/${article.slug}`),
    lastModified: new Date(article.dateModified),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages];
}
