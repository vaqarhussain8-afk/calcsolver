import type { Metadata } from "next";
import {
  LOGO_PATH,
  OG_IMAGE_PATH,
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
  absoluteUrl,
} from "./site";

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
  const images = [{ url: OG_IMAGE_PATH, width: 1200, height: 630, alt: `${SITE_NAME} – Free Online Solve Calculator` }];
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

/** Stable @id values so JSON-LD nodes on different pages and scripts reference each other. */
export const SCHEMA_IDS = {
  organization: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
  logo: `${SITE_URL}/#logo`,
} as const;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": SCHEMA_IDS.organization,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  email: SITE_EMAIL,
  logo: {
    "@type": "ImageObject",
    "@id": SCHEMA_IDS.logo,
    url: absoluteUrl(LOGO_PATH),
    contentUrl: absoluteUrl(LOGO_PATH),
    width: 512,
    height: 512,
    caption: SITE_NAME,
  },
  image: { "@id": SCHEMA_IDS.logo },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: SITE_EMAIL,
    url: absoluteUrl("/contact"),
    availableLanguage: ["English"],
  },
  ...(SOCIAL_PROFILES.length > 0 ? { sameAs: SOCIAL_PROFILES } : {}),
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": SCHEMA_IDS.website,
  name: SITE_NAME,
  alternateName: `${SITE_NAME} Solve Calculator`,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "en-US",
  publisher: { "@id": SCHEMA_IDS.organization },
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
