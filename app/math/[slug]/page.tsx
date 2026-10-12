import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calculator } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { ARTICLES, getArticle, getCategoryId, getRelatedArticles, type ArticleSection } from "@/lib/articles";
import { pageMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL, absoluteUrl, formatDate } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.description,
    path: `/math/${article.slug}`,
    type: "article",
    publishedTime: article.datePublished,
    modifiedTime: article.dateModified,
  });
}

function Section({ section }: { section: ArticleSection }) {
  return (
    <section>
      <h2>{section.heading}</h2>
      {section.steps ? (
        <ol>
          {section.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      ) : null}
      {section.list ? (
        <ul>
          {section.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {section.table ? (
        <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table>
            <thead>
              <tr>
                {section.table.headers.map((header) => (
                  <th key={header} scope="col">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row) => (
                <tr key={row.join("|")}>
                  {row.map((cell, index) => (
                    <td key={`${index}-${cell}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </section>
  );
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const url = absoluteUrl(`/math/${article.slug}`);
  const related = getRelatedArticles(article.slug, 3);
  const categoryId = getCategoryId(article.category);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    inLanguage: "en-US",
    articleSection: article.category,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    image: absoluteUrl("/opengraph-image"),
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Math Solutions", href: "/math" },
          { name: article.title, href: `/math/${article.slug}` },
        ]}
      />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article className="min-w-0">
          <header>
            <Link
              href={`/math#${categoryId}`}
              className="text-sm font-semibold uppercase tracking-wider text-indigo-600 hover:underline dark:text-indigo-400"
            >
              {article.category}
            </Link>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              {article.title}
            </h1>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Updated <time dateTime={article.dateModified}>{formatDate(article.dateModified)}</time> · By the {SITE_NAME}{" "}
              team
            </p>
          </header>

          <div className="mt-6 rounded-2xl border border-indigo-200 bg-indigo-50 p-5 dark:border-indigo-900 dark:bg-indigo-950/50">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">Quick answer</p>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{article.answer}</p>
          </div>

          <div className="content mt-6">
            {article.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {article.sections.map((section) => (
              <Section key={section.heading} section={section} />
            ))}
          </div>

          <aside
            aria-labelledby="try-it-title"
            className="mt-10 flex flex-col gap-4 rounded-2xl bg-gray-900 p-6 text-white sm:flex-row sm:items-center sm:justify-between dark:bg-gray-800"
          >
            <div>
              <h2 id="try-it-title" className="flex items-center gap-2 text-lg font-semibold">
                <Calculator className="h-5 w-5" aria-hidden="true" />
                Try it in the calculator
              </h2>
              <p className="mt-1 text-gray-300">
                Type <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono">{article.tryIt}</code> and press =.
              </p>
            </div>
            <Link
              href="/#calculator"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-indigo-500 px-5 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Open the solve calculator
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </aside>
        </article>

        <aside aria-labelledby="related-title" className="lg:sticky lg:top-24 lg:self-start">
          <h2 id="related-title" className="text-lg font-semibold text-gray-900 dark:text-white">
            Related solutions
          </h2>
          <ul className="mt-4 space-y-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/math/${item.slug}`}
                  className="block rounded-xl border border-gray-200 p-4 hover:border-indigo-300 hover:bg-indigo-50 dark:border-gray-800 dark:hover:border-indigo-800 dark:hover:bg-indigo-950/50"
                >
                  <span className="block text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {item.category}
                  </span>
                  <span className="mt-1 block font-medium text-gray-900 dark:text-white">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/math"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-700 hover:underline dark:text-indigo-300"
          >
            Browse all math solutions
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </aside>
      </div>

      <JsonLd data={articleJsonLd} />
    </div>
  );
}
