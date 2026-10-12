import type { Metadata } from "next";
import { SITE_EMAIL, SITE_LOCALE, SITE_NAME, SITE_URL, absoluteUrl } from "./site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  /** Use the title as-is instead of applying the "%s | Brand" template. */
  absoluteTitle?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
};

/**
 * Builds a complete metadata object for a page. Open Graph and Twitter objects are
 * replaced (not merged) by Next.js when a page defines them, so every field is set here.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  absoluteTitle = false,
  publishedTime,
  modifiedTime,
}: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  const images = [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${SITE_NAME} – Free Online Solve Calculator` }];
  const openGraphBase = {
    url: path,
    title: fullTitle,
    description,
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    images,
  };
  const openGraph: Metadata["openGraph"] =
    type === "article"
      ? { ...openGraphBase, type: "article", publishedTime, modifiedTime }
      : { ...openGraphBase, type: "website" };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images.map((image) => image.url),
    },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/icon.svg"),
  email: SITE_EMAIL,
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en-US",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export type BreadcrumbItem = { name: string; href: string };

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}
