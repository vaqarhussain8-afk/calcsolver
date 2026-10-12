import type { Metadata } from "next";
import { Mail } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { pageMetadata } from "@/lib/seo";
import { SITE_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description: `Questions, feedback or found a mistake? Contact the ${SITE_NAME} team using our form or by email.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Contact Us", href: "/contact" },
        ]}
      />
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white">Contact Us</h1>
          <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">
            Have a question about the calculator, a suggestion for a new math solution, or spotted an error? We would
            love to hear from you.
          </p>
          <div className="mt-8 rounded-2xl border border-gray-200 p-6 dark:border-gray-800">
            <h2 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
              <Mail className="h-5 w-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
              Email
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Prefer email? Write to{" "}
              <a href={`mailto:${SITE_EMAIL}`} className="font-medium text-indigo-700 underline dark:text-indigo-300">
                {SITE_EMAIL}
              </a>
              .
            </p>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              We typically respond within two business days. Please don’t send personal or sensitive information.
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Send {SITE_NAME} a message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
