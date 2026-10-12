import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import { pageMetadata } from "@/lib/seo";
import { LAST_UPDATED, SITE_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Disclaimer",
  description: `Important information about the accuracy and intended use of ${SITE_NAME} calculator results and math articles.`,
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <ContentPage title="Disclaimer" path="/disclaimer" lastUpdated={LAST_UPDATED}>
      <h2>Educational purpose</h2>
      <p>
        {SITE_NAME} is an educational tool. The calculator and the math solutions are meant to help you learn,
        practice and check your work. They are not a substitute for your teacher’s instructions, your textbook or
        professional advice.
      </p>

      <h2>Accuracy of results</h2>
      <p>
        Results are calculated with standard floating-point arithmetic and rounded to 10 significant digits for
        display. Very large numbers, very small numbers and some operations can produce small rounding differences.
        Always double-check results that matter, especially for engineering, financial, medical or legal decisions.
      </p>

      <h2>No professional advice</h2>
      <p>
        Nothing on this site is financial, tax, engineering, medical or legal advice. Consult a qualified
        professional before acting on any calculation in those areas.
      </p>

      <h2>Academic integrity</h2>
      <p>
        Online calculators are usually not allowed in exams, and some assignments require you to show your own work.
        Follow your instructor’s rules about when and how to use calculators and online resources.
      </p>

      <h2>School and workplace networks</h2>
      <p>
        We describe the calculator as “unblocked” only because it is a lightweight web page with no downloads or
        logins. We do not provide any means of bypassing network filters, and you are responsible for following the
        technology policies of your school, library or employer.
      </p>

      <h2>External links and ads</h2>
      <p>
        Links to other websites and any advertisements are provided for convenience. We do not endorse and are not
        responsible for third-party content.
      </p>

      <h2>Report an error</h2>
      <p>
        Found something that looks wrong? Please <Link href="/contact">let us know</Link> or email{" "}
        <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>. See also our <Link href="/terms">Terms of Use</Link>.
      </p>
    </ContentPage>
  );
}
