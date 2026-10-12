"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { ArticleSummary } from "@/lib/articles";

/** Client-side filter over article titles and descriptions (used on the 404 page). */
export default function ArticleSearch({ articles, limit = 6 }: { articles: ArticleSummary[]; limit?: number }) {
  const [query, setQuery] = useState("");
  const inputId = useId();

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    const matches = words.length
      ? articles.filter((article) => {
          const haystack = `${article.title} ${article.description} ${article.category}`.toLowerCase();
          return words.every((word) => haystack.includes(word));
        })
      : articles;
    return matches.slice(0, limit);
  }, [articles, limit, query]);

  return (
    <div className="mx-auto w-full max-w-xl text-left">
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        Search math solutions
      </label>
      <div className="relative mt-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" aria-hidden="true" />
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try “percentage” or “equation”"
          className="block w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 shadow-sm focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />
      </div>
      <p className="sr-only" aria-live="polite">
        {results.length} {results.length === 1 ? "result" : "results"}
      </p>
      {results.length ? (
        <ul className="mt-4 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-900">
          {results.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/math/${article.slug}`}
                className="block px-4 py-3 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-indigo-600 dark:hover:bg-gray-800"
              >
                <span className="block font-medium text-gray-900 dark:text-white">{article.title}</span>
                <span className="block text-sm text-gray-500 dark:text-gray-400">{article.category}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">No articles match that search. Try a shorter word.</p>
      )}
    </div>
  );
}
