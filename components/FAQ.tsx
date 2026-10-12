import { ChevronDown } from "lucide-react";

export type FAQItem = { question: string; answer: string };

export function faqJsonLd(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Accessible accordion built on native details/summary (keyboard and screen-reader friendly, no JS). */
export default function FAQ({ items }: { items: FAQItem[] }) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-900">
      {items.map((item) => (
        <details key={item.question} className="group px-5 py-1 sm:px-6">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-3 text-left font-medium text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-white [&::-webkit-details-marker]:hidden">
            <h3 className="text-base sm:text-lg">{item.question}</h3>
            <ChevronDown
              className="h-5 w-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="pb-5 text-gray-600 dark:text-gray-300">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
