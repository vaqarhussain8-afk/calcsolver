import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import { pageMetadata } from "@/lib/seo";
import { LAST_UPDATED, SITE_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${SITE_NAME} handles your information: no data from calculations, limited contact form data, optional cookies, and your GDPR and CCPA rights.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <ContentPage
      title="Privacy Policy"
      path="/privacy-policy"
      lastUpdated={LAST_UPDATED}
      intro={`This policy explains what information ${SITE_NAME} (“we”, “us”) collects when you use ${SITE_URL}, why, and the choices you have.`}
    >
      <h2>1. Summary</h2>
      <ul>
        <li>Your calculations are processed in your browser and are never sent to us.</li>
        <li>We only receive personal information if you choose to contact us.</li>
        <li>Analytics and advertising cookies are used only if you allow them.</li>
        <li>We do not sell your personal information.</li>
      </ul>

      <h2>2. Information we collect</h2>
      <h3>Calculator use</h3>
      <p>
        The calculator runs entirely on your device. The expressions you enter, your results and your calculation
        history stay in the open browser tab and are discarded when you close or refresh the page. We do not collect
        or store them.
      </p>
      <h3>Contact form</h3>
      <p>
        When you submit the contact form we receive your name, email address, subject and message. We use this
        information only to reply to you and to improve the site, and we keep it no longer than needed for that
        purpose (generally up to 12 months).
      </p>
      <h3>Cookies and similar technologies</h3>
      <p>
        We store your cookie choice in your browser’s local storage so we don’t have to ask on every visit. If you
        accept analytics or advertising cookies, our partners may set cookies or collect device information such as
        your IP address, browser type, pages visited and approximate location. See our{" "}
        <Link href="/cookie-policy">Cookie Policy</Link> for details.
      </p>
      <h3>Server logs</h3>
      <p>
        Our hosting provider may automatically record technical information such as IP address, request time and
        browser type to keep the service secure and reliable. These logs are retained for a limited time.
      </p>

      <h2>3. Third-party services</h2>
      <ul>
        <li>
          <strong>Google Analytics</strong> (if enabled and only with your consent) helps us understand how visitors
          use the site. Google’s use of data is described in Google’s own privacy policy.
        </li>
        <li>
          <strong>Google AdSense or similar ad networks</strong> (if enabled and only with your consent) may show ads
          and use cookies to measure and personalize them.
        </li>
        <li>
          <strong>Email delivery provider</strong> (such as Resend) processes contact form messages so they can reach
          our inbox.
        </li>
        <li>
          <strong>Hosting provider</strong> (such as Vercel) serves the website and processes server logs.
        </li>
      </ul>

      <h2>4. Legal bases (GDPR)</h2>
      <p>
        If you are in the European Economic Area or the United Kingdom, we process personal data on these bases: your
        consent (analytics and advertising cookies), our legitimate interests (operating and securing the site,
        responding to messages) and compliance with legal obligations.
      </p>

      <h2>5. Your rights</h2>
      <h3>GDPR / UK GDPR</h3>
      <p>
        You may request access to, correction of, or deletion of your personal data; restrict or object to
        processing; request data portability; and withdraw consent at any time. You also have the right to complain
        to your local data protection authority.
      </p>
      <h3>California (CCPA / CPRA)</h3>
      <p>
        California residents may request to know what personal information we have collected, request deletion or
        correction, and opt out of the “sale” or “sharing” of personal information. We do not sell personal
        information. Choosing “Reject Non-Essential” in our cookie settings opts you out of advertising cookies that
        could be considered sharing. We will not discriminate against you for exercising these rights.
      </p>
      <p>To exercise any right, email us. We may need to verify your identity before responding.</p>

      <h2>6. Children’s privacy</h2>
      <p>
        The site is suitable for students, but it is not directed at children under 13 and we do not knowingly
        collect personal information from them. If you believe a child has sent us personal information, contact us
        and we will delete it.
      </p>

      <h2>7. Security</h2>
      <p>
        We use HTTPS and reputable service providers to protect information. No method of transmission over the
        internet is completely secure, but we work to protect any data we hold.
      </p>

      <h2>8. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The “Last updated” date at the top shows when it was last
        changed.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about privacy? Email <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a> or use our{" "}
        <Link href="/contact">contact form</Link>.
      </p>
    </ContentPage>
  );
}
