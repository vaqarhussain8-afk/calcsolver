import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";
import { formatDate } from "@/lib/site";

type ContentPageProps = {
  title: string;
  path: string;
  intro?: string;
  lastUpdated?: string;
  children: ReactNode;
};

/** Shared layout for About and legal pages: breadcrumbs, H1, optional "Last updated" and prose content. */
export default function ContentPage({ title, path, intro, lastUpdated, children }: ContentPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: title, href: path },
        ]}
      />
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white">{title}</h1>
      {lastUpdated ? (
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Last updated: <time dateTime={lastUpdated}>{formatDate(lastUpdated)}</time>
        </p>
      ) : null}
      {intro ? <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">{intro}</p> : null}
      <div className="content mt-4">{children}</div>
    </div>
  );
}
