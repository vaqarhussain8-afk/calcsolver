"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { OPEN_COOKIE_SETTINGS_EVENT, readConsent, saveConsent, type CookieConsent } from "@/lib/consent";
import { GA_MEASUREMENT_ID } from "@/lib/site";

const GA_ID = GA_MEASUREMENT_ID;

export default function CookieBanner() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [open, setOpen] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  // Read the stored choice once on mount; show the banner only if no choice exists yet.
  useEffect(() => {
    const stored = readConsent();
    if (stored) {
      setConsent(stored);
      setAnalytics(stored.analytics);
      setAdvertising(stored.advertising);
    } else {
      setOpen(true);
    }

    function onOpenSettings() {
      setCustomize(true);
      setOpen(true);
    }
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpenSettings);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpenSettings);
  }, []);

  useEffect(() => {
    if (open) firstButtonRef.current?.focus({ preventScroll: true });
  }, [open]);

  function commit(nextAnalytics: boolean, nextAdvertising: boolean) {
    const hadAnalytics = consent?.analytics ?? false;
    const saved = saveConsent(nextAnalytics, nextAdvertising);
    setConsent(saved);
    setAnalytics(saved.analytics);
    setAdvertising(saved.advertising);
    setOpen(false);
    setCustomize(false);
    // Analytics scripts cannot be unloaded once running, so reload after consent is withdrawn.
    if (hadAnalytics && !saved.analytics) window.location.reload();
  }

  const loadAnalytics = Boolean(GA_ID) && consent?.analytics === true;

  return (
    <>
      {loadAnalytics ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}

      {open ? (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-description"
          className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4"
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
            <h2 id="cookie-banner-title" className="text-base font-semibold text-gray-900 dark:text-white">
              Your cookie choices
            </h2>
            <p id="cookie-banner-description" className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              We use essential storage to remember your preferences. With your permission we also use analytics and
              advertising cookies to understand usage and keep the site free. Read our{" "}
              <Link href="/cookie-policy" className="font-medium text-indigo-600 underline dark:text-indigo-400">
                Cookie Policy
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy" className="font-medium text-indigo-600 underline dark:text-indigo-400">
                Privacy Policy
              </Link>
              .
            </p>

            {customize ? (
              <fieldset className="mt-4 space-y-3 rounded-xl bg-gray-50 p-4 dark:bg-gray-950">
                <legend className="sr-only">Cookie categories</legend>
                <Toggle
                  id="consent-essential"
                  label="Essential"
                  description="Required for the site to work, such as remembering this choice."
                  checked
                  disabled
                />
                <Toggle
                  id="consent-analytics"
                  label="Analytics"
                  description="Helps us understand which pages are useful (Google Analytics)."
                  checked={analytics}
                  onChange={setAnalytics}
                />
                <Toggle
                  id="consent-advertising"
                  label="Advertising"
                  description="Allows ads that help keep the calculator free."
                  checked={advertising}
                  onChange={setAdvertising}
                />
              </fieldset>
            ) : null}

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
              <button
                ref={firstButtonRef}
                type="button"
                onClick={() => commit(true, true)}
                className="min-h-11 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={() => commit(false, false)}
                className="min-h-11 rounded-xl border border-gray-300 px-5 text-sm font-semibold text-gray-800 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800"
              >
                Reject Non-Essential
              </button>
              {customize ? (
                <button
                  type="button"
                  onClick={() => commit(analytics, advertising)}
                  className="min-h-11 rounded-xl border border-indigo-600 px-5 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-indigo-300 dark:hover:bg-indigo-950"
                >
                  Save Preferences
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCustomize(true)}
                  aria-expanded={customize}
                  className="min-h-11 rounded-xl px-5 text-sm font-semibold text-gray-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-gray-200"
                >
                  Customize
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

type ToggleProps = {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
};

function Toggle({ id, label, description, checked, disabled = false, onChange }: ToggleProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <label htmlFor={id} className="text-sm">
        <span className="font-medium text-gray-900 dark:text-white">
          {label}
          {disabled ? <span className="ml-1 text-xs font-normal text-gray-500">(always on)</span> : null}
        </span>
        <span className="block text-gray-600 dark:text-gray-400">{description}</span>
      </label>
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.checked)}
        className="mt-1 h-5 w-9 shrink-0 cursor-pointer appearance-none rounded-full bg-gray-300 transition before:block before:h-4 before:w-4 before:translate-x-0.5 before:translate-y-0.5 before:rounded-full before:bg-white before:shadow before:transition checked:bg-indigo-600 checked:before:translate-x-[18px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gray-700 dark:checked:bg-indigo-500"
      />
    </div>
  );
}
