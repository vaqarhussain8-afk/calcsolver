import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { ARTICLES, CATEGORIES, getArticlesByCategory } from "@/lib/articles";
import { pageMetadata } from "@/lib/seo";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Math Solutions: Algebra, Percentages & Fractions",
  description:
    "Step-by-step math solutions for fractions, percentages, decimals and basic algebra. Clear worked examples you can check with our free calculator.",
  path: "/math",
});

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: `${SITE_NAME} Math Solutions`,
  url: absoluteUrl("/math"),
  inLanguage: "en-US",
  hasPart: ARTICLES.map((article) => ({
    "@type": "Article",
    headline: article.title,
    url: absoluteUrl(`/math/${article.slug}`),
  })),
};

export default function MathIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Math Solutions", href: "/math" },
        ]}
      />
      <header className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white">Math Solutions</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Worked, step-by-step explanations for {ARTICLES.length} common math questions. Every answer can be checked
          with the free{" "}
          <Link href="/#calculator" className="font-medium text-indigo-700 underline dark:text-indigo-300">
            solve calculator
          </Link>
          .
        </p>
        <nav aria-label="Categories" className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="inline-flex min-h-10 items-center rounded-full bg-indigo-50 px-4 text-sm font-medium text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300 dark:hover:bg-indigo-900"
            >
              {category.name}
            </a>
          ))}
        </nav>
      </header>

      {CATEGORIES.map((category) => (
        <section key={category.id} id={category.id} aria-labelledby={`${category.id}-title`} className="mt-14 scroll-mt-24">
          <h2 id={`${category.id}-title`} className="text-2xl font-bold text-gray-900 dark:text-white">
            {category.name}
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-300">{category.description}</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {getArticlesByCategory(category.name).map((article) => (
              <article
                key={article.slug}
                className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  <Link href={`/math/${article.slug}`} className="hover:text-indigo-700 dark:hover:text-indigo-300">
                    {article.title}
                  </Link>
                </h3>
                <p className="mt-2 flex-1 text-sm text-gray-600 dark:text-gray-300">{article.description}</p>
                <Link
                  href={`/math/${article.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-700 hover:underline dark:text-indigo-300"
                  aria-label={`Read: ${article.title}`}
                >
                  Read solution
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      ))}

      <JsonLd data={collectionJsonLd} />
    </div>
  );
}
