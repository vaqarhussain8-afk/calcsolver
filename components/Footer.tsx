import Link from "next/link";
import { Calculator } from "lucide-react";
import type { ReactNode } from "react";
import CookieSettingsButton from "./CookieSettingsButton";
import {
  FOOTER_CALCULATOR_LINKS,
  FOOTER_COMPANY_LINKS,
  FOOTER_LEGAL_LINKS,
  SITE_NAME,
  SITE_TAGLINE,
  type NavLink,
} from "@/lib/site";

const linkClass =
  "rounded text-gray-600 hover:text-indigo-600 hover:underline focus-visible:outline-2 focus-visible:outline-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400";

function FooterColumn({ title, links, children }: { title: string; links: NavLink[]; children?: ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">{title}</h2>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={linkClass}>
              {link.label}
            </Link>
          </li>
        ))}
        {children}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Calculator className="h-5 w-5" aria-hidden="true" />
            </span>
            {SITE_NAME}
          </Link>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{SITE_TAGLINE}</p>
        </div>
        <FooterColumn title="Calculators & Math" links={FOOTER_CALCULATOR_LINKS} />
        <FooterColumn title="Company" links={FOOTER_COMPANY_LINKS} />
        <FooterColumn title="Legal" links={FOOTER_LEGAL_LINKS}>
          <li>
            <CookieSettingsButton className={`${linkClass} cursor-pointer text-left`} />
          </li>
        </FooterColumn>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-800">
        <p className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-gray-500 sm:px-6 dark:text-gray-400">
          © {year} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
