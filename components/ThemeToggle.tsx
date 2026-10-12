"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { applyTheme, getStoredTheme, storeTheme } from "@/lib/theme";

/**
 * Light/dark switch. The icon and label are chosen with CSS (dark: variant), so the server HTML
 * always matches whatever theme the head script applied — no hydration mismatch or flicker.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  // Follow device changes until the visitor picks a theme explicitly.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    function onChange(event: MediaQueryListEvent) {
      if (!getStoredTheme()) applyTheme(event.matches ? "dark" : "light");
    }
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
    applyTheme(next);
    storeTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-indigo-600 dark:text-gray-200 dark:hover:bg-gray-800 ${className}`}
    >
      <Moon className="h-5 w-5 dark:hidden" aria-hidden="true" />
      <Sun className="hidden h-5 w-5 dark:block" aria-hidden="true" />
      <span className="sr-only dark:hidden">Switch to dark theme</span>
      <span className="sr-only hidden dark:inline">Switch to light theme</span>
    </button>
  );
}
