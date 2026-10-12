export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/**
 * Inline script for <head>: applies the saved theme (or the device preference) before the first
 * paint so there is no flash of the wrong theme. Kept tiny and dependency-free.
 */
export const THEME_INIT_SCRIPT = `(function(){var t=null;try{t=localStorage.getItem('${THEME_STORAGE_KEY}')}catch(e){}var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;r.classList.toggle('dark',d);r.style.colorScheme=d?'dark':'light';})();`;

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

export function getStoredTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

export function storeTheme(theme: Theme): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage unavailable (private mode, blocked site data): the theme still applies for this visit.
  }
}
