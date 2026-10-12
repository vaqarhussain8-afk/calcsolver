export const CONSENT_STORAGE_KEY = "cookie-consent";
export const OPEN_COOKIE_SETTINGS_EVENT = "open-cookie-settings";

export type CookieConsent = {
  essential: true;
  analytics: boolean;
  advertising: boolean;
  date: string;
};

export function readConsent(): CookieConsent | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === "object" &&
      typeof (parsed as CookieConsent).analytics === "boolean" &&
      typeof (parsed as CookieConsent).advertising === "boolean"
    ) {
      const value = parsed as CookieConsent;
      return {
        essential: true,
        analytics: value.analytics,
        advertising: value.advertising,
        date: typeof value.date === "string" ? value.date : new Date().toISOString(),
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function saveConsent(analytics: boolean, advertising: boolean): CookieConsent {
  const consent: CookieConsent = {
    essential: true,
    analytics,
    advertising,
    date: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // Storage can be unavailable (private mode, blocked site data). The choice still applies for this visit.
  }
  return consent;
}

export function openCookieSettings(): void {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
}
