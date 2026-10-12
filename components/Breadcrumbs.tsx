import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "./JsonLd";
import { breadcrumbJsonLd, type BreadcrumbItem } from "@/lib/seo";

/** Visible breadcrumb trail plus matching BreadcrumbList JSON-LD. The last item is the current page. */
export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1">
                {isLast ? (
                  <span aria-current="page" className="font-medium text-gray-700 dark:text-gray-200">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.href} className="rounded hover:text-indigo-600 hover:underline dark:hover:text-indigo-400">
                      {item.name}
                    </Link>
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(items)} />
    </>
  );
}
