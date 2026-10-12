import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import { pageMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description: `Learn about ${SITE_NAME}: a free online solve calculator and math solutions library built for students, teachers and professionals.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <ContentPage
      title="About Us"
      path="/about"
      intro={`${SITE_NAME} exists to make reliable math tools free, fast and easy to understand for everyone.`}
    >
      <h2>Our mission</h2>
      <p>
        Math is easier when you can check your work and see the reasoning behind an answer. We built {SITE_NAME} to
        give anyone with a web browser a capable scientific calculator and clear, step-by-step explanations—without
        paywalls, accounts or app downloads.
      </p>

      <h2>Who it’s for</h2>
      <ul>
        <li>
          <strong>Students</strong> from middle school through college who want to check homework and understand
          methods, not just copy answers.
        </li>
        <li>
          <strong>Teachers and tutors</strong> who need a clean calculator to project in class and trustworthy
          explanations to share.
        </li>
        <li>
          <strong>Professionals</strong>—engineers, accountants, nurses, tradespeople—who need a quick, accurate
          calculation during the workday.
        </li>
        <li>
          <strong>Lifelong learners</strong> brushing up on fractions, percentages and algebra.
        </li>
      </ul>

      <h2>What we offer</h2>
      <ul>
        <li>
          A free <Link href="/#calculator">online solve calculator</Link> with trigonometry, logarithms, powers,
          roots, factorials and a calculation history.
        </li>
        <li>
          A growing <Link href="/math">library of math solutions</Link> covering percentages, decimals, fractions and
          basic algebra.
        </li>
        <li>A lightweight site that works on Chromebooks, phones, tablets and desktops.</li>
      </ul>

      <h2>Our commitment to accuracy</h2>
      <p>
        Every calculation runs through a well-tested math library rather than hand-written shortcuts, and our
        calculator is covered by automated tests for operator precedence, trigonometry, factorials, roots and error
        handling. Each worked example in our articles is checked with the calculator before it is published.
      </p>
      <p>
        If you ever spot a mistake, please <Link href="/contact">contact us</Link>. We review every report and
        correct errors promptly, and we update the “last updated” date on any article we change.
      </p>

      <h2>Independent and privacy-minded</h2>
      <p>
        {SITE_NAME} does not require sign-up, and your calculations never leave your device. Read our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link> to learn exactly what information we do and do not collect.
      </p>
    </ContentPage>
  );
}
