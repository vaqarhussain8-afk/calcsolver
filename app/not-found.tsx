import type { Metadata } from "next";
import Link from "next/link";
import ArticleSearch from "@/components/ArticleSearch";
import { getArticleSummaries } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you were looking for could not be found.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24">
      <p className="text-6xl font-extrabold text-indigo-600 dark:text-indigo-400">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
        This page doesn’t add up
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
        We couldn’t find the page you were looking for. It may have moved, or the link may be mistyped.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-xl bg-indigo-600 px-5 font-semibold text-white hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Back to the calculator
        </Link>
        <Link
          href="/math"
          className="inline-flex min-h-11 items-center rounded-xl px-5 font-semibold text-indigo-700 ring-1 ring-indigo-200 hover:bg-indigo-50 dark:text-indigo-300 dark:ring-indigo-800 dark:hover:bg-indigo-950"
        >
          Browse math solutions
        </Link>
      </div>
      <div className="mt-12">
        <ArticleSearch articles={getArticleSummaries()} />
      </div>
    </div>
  );
}
