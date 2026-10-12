"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Calculator, Menu, X } from "lucide-react";
import { NAV_LINKS, SITE_NAME } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape and return focus to the toggle button.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) => !href.includes("#") && href === pathname;

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/90 backdrop-blur dark:border-gray-800 dark:bg-gray-950/90">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg text-lg font-bold text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600 dark:text-white"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <Calculator className="h-5 w-5" aria-hidden="true" />
          </span>
          {SITE_NAME}
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-indigo-600 ${
                    isActive(link.href)
                      ? "text-indigo-700 dark:text-indigo-300"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-indigo-600 lg:hidden dark:text-gray-200 dark:hover:bg-gray-800"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-gray-200 bg-white lg:hidden dark:border-gray-800 dark:bg-gray-950"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className="flex min-h-11 items-center rounded-lg px-3 text-base font-medium text-gray-700 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-indigo-600 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
