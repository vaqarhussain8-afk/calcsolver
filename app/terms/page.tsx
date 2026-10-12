import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import { pageMetadata } from "@/lib/seo";
import { LAST_UPDATED, SITE_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description: `The plain-English terms for using ${SITE_NAME}, our free online calculator and math solutions library.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <ContentPage
      title="Terms of Use"
      path="/terms"
      lastUpdated={LAST_UPDATED}
      intro={`By using ${SITE_NAME}, you agree to these terms. They are written in plain English, but they are still a binding agreement—please read them.`}
    >
      <h2>1. Using the site</h2>
      <p>
        {SITE_NAME} provides a free online calculator and educational math content. You may use the site for
        personal, educational and professional purposes, free of charge. You must follow any rules set by your
        school, employer or network administrator when using the site.
      </p>

      <h2>2. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Attempt to disrupt, overload or gain unauthorized access to the site or its servers.</li>
        <li>Use automated tools to scrape or copy the site’s content in bulk.</li>
        <li>Send spam, malicious code or unlawful content through the contact form.</li>
        <li>Use the site in a way that breaks any applicable law or academic integrity policy.</li>
      </ul>

      <h2>3. Intellectual property</h2>
      <p>
        The site’s design, text, articles, graphics and code are owned by {SITE_NAME} or its licensors. You may link
        to any page and share short quotations with attribution. You may not republish whole articles or present
        our content as your own without written permission.
      </p>

      <h2>4. Accuracy and no warranty</h2>
      <p>
        We work hard to keep results and explanations correct, but the site is provided “as is” and “as available”
        without warranties of any kind. Please review our <Link href="/disclaimer">Disclaimer</Link> before relying on
        any result for important decisions.
      </p>

      <h2>5. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {SITE_NAME} is not liable for any indirect, incidental or
        consequential damages, or for any loss arising from your use of—or inability to use—the site.
      </p>

      <h2>6. Third-party links and services</h2>
      <p>
        The site may contain links to other websites or show content from third parties, such as ads. We are not
        responsible for their content, policies or practices.
      </p>

      <h2>7. Privacy</h2>
      <p>
        Your use of the site is also governed by our <Link href="/privacy-policy">Privacy Policy</Link> and{" "}
        <Link href="/cookie-policy">Cookie Policy</Link>.
      </p>

      <h2>8. Changes</h2>
      <p>
        We may update these terms or change the site at any time. The “Last updated” date shows the latest version.
        Continuing to use the site after changes means you accept the new terms.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These terms are governed by the laws of the United States and the state in which {SITE_NAME} operates,
        without regard to conflict-of-law rules.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about these terms? Email <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
      </p>
    </ContentPage>
  );
}
