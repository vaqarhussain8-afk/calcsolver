import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { pageMetadata } from "@/lib/seo";
import { LAST_UPDATED, SITE_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy",
  description: `Learn which cookies ${SITE_NAME} uses—essential, analytics and advertising—and how to change or withdraw your consent at any time.`,
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <ContentPage
      title="Cookie Policy"
      path="/cookie-policy"
      lastUpdated={LAST_UPDATED}
      intro="This page explains what cookies and similar technologies are, which ones we use, and how you stay in control."
    >
      <h2>What are cookies?</h2>
      <p>
        Cookies are small text files that a website saves in your browser. Similar technologies, such as local
        storage, work the same way. They let a site remember information between page views—like your preferences.
      </p>

      <h2>Types of cookies we use</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
        <table>
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Purpose</th>
              <th scope="col">Default</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Essential</strong>
              </td>
              <td>
                Remembers your cookie choice (stored in local storage under the key <code>cookie-consent</code>) and
                keeps the site working securely.
              </td>
              <td>Always on</td>
            </tr>
            <tr>
              <td>
                <strong>Analytics</strong>
              </td>
              <td>
                Google Analytics measures visits and popular pages so we can improve content. Loaded only after you
                opt in.
              </td>
              <td>Off</td>
            </tr>
            <tr>
              <td>
                <strong>Advertising</strong>
              </td>
              <td>
                Ad partners (for example Google AdSense) may show and measure ads that keep {SITE_NAME} free. Used only
                after you opt in.
              </td>
              <td>Off</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>How to manage or withdraw consent</h2>
      <p>
        You can change your choice at any time. Open the cookie settings, adjust the Analytics and Advertising
        toggles, and save. If you withdraw analytics consent, the page reloads so no further analytics data is
        collected.
      </p>
      <p>
        <CookieSettingsButton className="inline-flex min-h-11 cursor-pointer items-center rounded-xl bg-indigo-600 px-5 font-semibold text-white hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" />
      </p>
      <p>
        The same “Cookie Settings” button is available in the footer of every page. You can also delete cookies and
        site data in your browser settings; the banner will then appear again on your next visit.
      </p>

      <h2>Browser controls</h2>
      <ul>
        <li>Most browsers let you block third-party cookies or all cookies.</li>
        <li>Private or incognito windows clear cookies when you close them.</li>
        <li>Blocking essential storage means we cannot remember your choice, so the banner may reappear.</li>
      </ul>

      <h2>More information</h2>
      <p>
        For details on how we handle personal information, see our <Link href="/privacy-policy">Privacy Policy</Link>.
        Questions? Email <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
      </p>
    </ContentPage>
  );
}
