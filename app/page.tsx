import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Check,
  Feather,
  Gamepad2,
  GraduationCap,
  Laptop,
  Lightbulb,
  Percent,
  ShieldCheck,
  Shuffle,
  Sigma,
  Smartphone,
  Superscript,
  TrendingUp,
  Triangle,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Calculator from "@/components/Calculator";
import FAQ, { type FAQItem } from "@/components/FAQ";
import FeatureCard from "@/components/FeatureCard";
import JsonLd from "@/components/JsonLd";
import SectionHeading from "@/components/SectionHeading";
import { ARTICLES, CATEGORIES, getArticlesByCategory } from "@/lib/articles";
import { SCHEMA_IDS, pageMetadata } from "@/lib/seo";
import { LAST_UPDATED, OG_IMAGE_PATH, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";


const FUNCTIONS: { key: string; description: string; example: string }[] = [
  { key: "sin", description: "Sine of an angle (DEG or RAD)", example: "sin(30) = 0.5 in DEG" },
  { key: "cos", description: "Cosine of an angle", example: "cos(60) = 0.5 in DEG" },
  { key: "tan", description: "Tangent of an angle", example: "tan(45) = 1 in DEG" },
  { key: "log", description: "Logarithm base 10", example: "log(1000) = 3" },
  { key: "ln", description: "Natural logarithm (base e)", example: "ln(e) = 1" },
  { key: "√", description: "Square root", example: "√(16) = 4" },
  { key: "x²", description: "Square the previous value", example: "7² = 49" },
  { key: "x³", description: "Cube the previous value", example: "3³ = 27" },
  { key: "xʸ", description: "Raise to any power", example: "2^10 = 1024" },
  { key: "n!", description: "Factorial of a whole number", example: "5! = 120" },
  { key: "1/x", description: "Reciprocal (one divided by the value)", example: "8, then 1/x = 0.125" },
  { key: "%", description: "Percent (divides by 100)", example: "25% × 80 = 20" },
  { key: "π", description: "Pi, about 3.141592654", example: "2π ≈ 6.283185307" },
  { key: "e", description: "Euler’s number, about 2.718281828", example: "e² ≈ 7.389056099" },
  { key: "( )", description: "Group parts of an expression", example: "(2 + 3) × 4 = 20" },
];

const QUICK_ANSWERS = [
  {
    question: "What is 11/17 as a percentage?",
    working: "11 ÷ 17 = 0.6470588…",
    detail: "0.6470588 × 100 = 64.70588…",
    answer: "64.71%",
    href: "/math/11-17-as-a-percentage",
    linkText: "See the full 11/17 percentage solution",
  },
  {
    question: "What is 3/5 as a percentage?",
    working: "3 ÷ 5 = 0.6",
    detail: "0.6 × 100 = 60",
    answer: "60%",
    href: "/math/3-5-as-a-percentage",
    linkText: "Learn two ways to convert 3/5",
  },
  {
    question: "What is 2/9 as a decimal and percentage?",
    working: "2 ÷ 9 = 0.2222… (0.2̅)",
    detail: "0.2222… × 100 = 22.22…",
    answer: "22.22%",
    href: "/math/2-9-as-a-decimal",
    linkText: "Read why 2/9 is a repeating decimal",
  },
];

const FAQS: FAQItem[] = [
  {
    question: "Is this solve calculator free?",
    answer: `Yes. The ${SITE_NAME} solve calculator is 100% free to use, with no account, no trial period and no download. Every scientific function and every math solution article is available to everyone.`,
  },
  {
    question: "Is the calculator unblocked at school?",
    answer:
      "Our unblocked calculator is a single lightweight web page with no downloads, extensions or logins, so it usually loads wherever ordinary educational websites are allowed, including school Chromebooks. We do not bypass network filters—if your school blocks the site, please follow your school’s rules and ask your teacher or IT team.",
  },
  {
    question: "What is a calculator unblocker?",
    answer:
      "People use the phrase “calculator unblocker” when they are looking for a calculator that opens in a normal browser without installing anything. That is what this site is: a plain web calculator. It is not a proxy or a tool for getting around school or workplace restrictions.",
  },
  {
    question: "Can I play calculator games unblocked?",
    answer:
      "You can try the number challenges on this page—like making 24 from four numbers or a factorial race—right in the calculator. They are simple math puzzles, not downloaded games, so any calculator game unblocked here is just you, a friend and some numbers.",
  },
  {
    question: "How do I convert 3/5 to a percentage?",
    answer:
      "Divide 3 by 5 to get 0.6, then multiply by 100. So 3/5 = 60%. You can also scale the fraction: 3/5 = 60/100, which is 60%.",
  },
  {
    question: "What is 11/17 as a percentage?",
    answer:
      "11 ÷ 17 = 0.6470588…, and multiplying by 100 gives about 64.71% when rounded to two decimal places (64.7% to one decimal place).",
  },
  {
    question: "Does the calc work on mobile?",
    answer:
      "Yes. The calc is fully responsive with large touch-friendly keys, so it works on phones, tablets, Chromebooks, laptops and desktop computers in any modern browser.",
  },
  {
    question: "Can the solver calculator solve equations for x?",
    answer:
      "The solver calculator evaluates expressions, so you can work through each step of an equation and check your answer by substituting it back in. For full step-by-step methods, read our guides to solving linear equations and solve-for-x basics in the Math Solutions library.",
  },
  {
    question: "Does the unblocked calculator work offline?",
    answer:
      "Once the page is open and you have used the calculator once, every calculation runs on your own device, so a dropped Wi-Fi connection will not interrupt you. Reloading the page needs an internet connection.",
  },
  {
    question: `What makes ${SITE_NAME} different from other online calculators?`,
    answer: `${SITE_NAME} pairs a full scientific solver calculator with step-by-step math solutions, free number games and keyboard shortcuts. There is no sign-up, no download and no tracking of your calculations.`,
  },
  {
    question: "Do you store my calculations?",
    answer:
      "No. Every calculation runs inside your own browser. Your history of the last five results lives only in the open page and disappears when you close or refresh it. Nothing is sent to our servers.",
  },
];

const HOW_TO_STEPS: [string, string][] = [
  ["Choose DEG or RAD", "Pick degrees for everyday angles or radians for calculus and physics problems."],
  ["Enter your expression", "Tap the keys or type on your keyboard. Use parentheses to group terms."],
  ["Press equals", "Press = or Enter. The answer appears in large text, rounded to 10 significant digits."],
  ["Reuse your answer", "Tap Ans or an item in the history list to keep working with a previous result."],
];

/** Every result below was checked against the calculator (10 significant digits). */
const SOLVE_EXAMPLES: { problem: string; input: string; result: string; useCase: string }[] = [
  { problem: "Sine of 45°", input: "sin(45)", result: "0.7071067812", useCase: "Trigonometry homework" },
  { problem: "Tangent of 60°", input: "tan(60)", result: "1.732050808", useCase: "Heights of right triangles" },
  { problem: "Log base 10 of 250", input: "log(250)", result: "2.397940009", useCase: "pH and decibel problems" },
  { problem: "Natural log of 10", input: "ln(10)", result: "2.302585093", useCase: "Growth and decay models" },
  { problem: "Square root of 2", input: "√(2)", result: "1.414213562", useCase: "Diagonals and geometry" },
  { problem: "e cubed", input: "e^3", result: "20.08553692", useCase: "Calculus and statistics" },
  { problem: "15% of 240", input: "15% × 240", result: "36", useCase: "Discounts and tips" },
  { problem: "Area of a circle, r = 5", input: "π × 5²", result: "78.53981634", useCase: "Geometry formulas" },
  { problem: "12 factorial", input: "12!", result: "479001600", useCase: "Probability and arrangements" },
  { problem: "Order of operations", input: "(3 + 4)² ÷ 7", result: "7", useCase: "Checking PEMDAS steps" },
  { problem: "$5,000 at 8% for 5 years", input: "5000 × 1.08^5", result: "7346.640384", useCase: "Compound interest" },
  { problem: "One seventh as a decimal", input: "1 ÷ 7", result: "0.1428571429", useCase: "Fractions to decimals" },
];

const SOLVE_TOPICS: { icon: LucideIcon; title: string; text: string; href?: string; linkText?: string }[] = [
  {
    icon: Sigma,
    title: "Algebra & Order of Operations",
    text: "Enter long expressions with nested parentheses and the solver calculator applies PEMDAS for you.",
    href: "/math/order-of-operations-pemdas",
    linkText: "Review PEMDAS",
  },
  {
    icon: Triangle,
    title: "Trigonometry",
    text: "Sine, cosine and tangent in degrees or radians, with exact results for common angles such as sin(30) = 0.5.",
  },
  {
    icon: TrendingUp,
    title: "Logarithms & Exponentials",
    text: "Base-10 log, natural log and e^x for science, finance and growth problems.",
  },
  {
    icon: Superscript,
    title: "Powers & Roots",
    text: "Squares, cubes, any power with xʸ, reciprocals and square roots in one tap.",
  },
  {
    icon: Percent,
    title: "Percentages & Fractions",
    text: "Turn any fraction into a decimal or percentage, then see the method in our worked guides.",
    href: "/math/how-to-convert-fraction-to-percentage",
    linkText: "Convert fractions to percentages",
  },
  {
    icon: Shuffle,
    title: "Factorials & Probability",
    text: "Use n! to count arrangements and combinations for probability and statistics homework.",
  },
];

const GAMES: { title: string; level: "Easy" | "Medium" | "Hard"; players: string; howTo: string; solution: string }[] = [
  {
    title: "Make 24",
    level: "Medium",
    players: "1+ players",
    howTo: "Use the numbers 1, 3, 4 and 6 exactly once with +, −, ×, ÷ and parentheses to make exactly 24.",
    solution: "6 ÷ (1 − 3 ÷ 4) = 24. Ready for harder? Try 3, 3, 8, 8: 8 ÷ (3 − 8 ÷ 3) = 24.",
  },
  {
    title: "Target 100",
    level: "Easy",
    players: "1+ players",
    howTo: "Use the digits 1 to 9 in order, each one once, with only + and × to reach exactly 100.",
    solution: "1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 × 9 = 100.",
  },
  {
    title: "Upside-Down Words",
    level: "Easy",
    players: "1+ players",
    howTo: "Type a number, then turn your screen upside down to read it as a word. Which number spells hELLO?",
    solution: "0.7734 reads hELLO upside down (ignore the decimal point), and 317 spells LIE.",
  },
  {
    title: "Estimation Sprint",
    level: "Easy",
    players: "2+ players",
    howTo: "One player calls out a problem such as 17 × 23. Everyone writes a guess, then the calculator reveals the winner.",
    solution: "17 × 23 = 391. Swap roles and try 3-digit numbers for a tougher round.",
  },
  {
    title: "Doubling Ladder",
    level: "Medium",
    players: "1+ players",
    howTo: "Start at 1 and keep pressing × 2 then =. Predict how many doublings it takes to pass one million.",
    solution: "20 doublings: 2²⁰ = 1,048,576, while 2¹⁹ = 524,288 is still below a million.",
  },
  {
    title: "Factorial Race",
    level: "Hard",
    players: "2+ players",
    howTo: "Race to find the smallest whole number n where n! is greater than one million using the n! key.",
    solution: "n = 10, because 10! = 3,628,800 and 9! = 362,880.",
  },
];

const LEVEL_CLASSES: Record<(typeof GAMES)[number]["level"], string> = {
  Easy: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  Medium: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  Hard: "bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300",
};

const SHORTCUTS: [string, string][] = [
  ["0 – 9  and  .", "Enter numbers and decimals"],
  ["+  −  *  /", "Add, subtract, multiply and divide"],
  ["^", "Raise to a power (xʸ)"],
  ["(  )", "Open and close parentheses"],
  ["%", "Percent"],
  ["!", "Factorial"],
  ["Enter  or  =", "Calculate the answer"],
  ["Backspace", "Delete the last entry"],
  ["Esc  or  Delete", "Clear everything (AC)"],
];

const PAGE_TITLE = `Solve Calculator – Free Scientific Solver | ${SITE_NAME}`;
const PAGE_DESCRIPTION =
  "Free solve calculator with sin, cos, log, roots and factorials. An unblocked calculator that runs in any browser—no download, no sign-up.";

const ids = {
  webpage: `${SITE_URL}/#webpage`,
  app: `${SITE_URL}/#calculator-app`,
  faq: `${SITE_URL}/#faq`,
  howTo: `${SITE_URL}/#how-to-use`,
  library: `${SITE_URL}/#math-solutions`,
  games: `${SITE_URL}/#calculator-games`,
  image: `${SITE_URL}/#primaryimage`,
};

/**
 * One connected JSON-LD graph for the homepage. Organization and WebSite are emitted site-wide by
 * app/layout.tsx and referenced here by @id. No ratings or reviews are included: Google treats
 * self-made ratings as spam, so add aggregateRating only from genuine, visible user reviews.
 */
const homepageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": ids.webpage,
      url: SITE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      inLanguage: "en-US",
      isPartOf: { "@id": SCHEMA_IDS.website },
      about: { "@id": ids.app },
      mainEntity: { "@id": ids.app },
      primaryImageOfPage: { "@id": ids.image },
      dateModified: LAST_UPDATED,
      publisher: { "@id": SCHEMA_IDS.organization },
      hasPart: [{ "@id": ids.howTo }, { "@id": ids.faq }, { "@id": ids.library }, { "@id": ids.games }],
    },
    {
      "@type": "ImageObject",
      "@id": ids.image,
      url: absoluteUrl(OG_IMAGE_PATH),
      contentUrl: absoluteUrl(OG_IMAGE_PATH),
      width: 1200,
      height: 630,
      caption: `${SITE_NAME} – Free Online Solve Calculator`,
    },
    {
      "@type": "WebApplication",
      "@id": ids.app,
      name: `${SITE_NAME} Solve Calculator`,
      alternateName: ["Solver Calculator", "Unblocked Calculator", "Online Scientific Calculator"],
      url: SITE_URL,
      description: PAGE_DESCRIPTION,
      applicationCategory: "EducationalApplication",
      applicationSubCategory: "Scientific Calculator",
      operatingSystem: "Any (web browser)",
      browserRequirements: "Requires JavaScript and a modern web browser",
      inLanguage: "en-US",
      isAccessibleForFree: true,
      image: { "@id": ids.image },
      screenshot: { "@id": ids.image },
      featureList: FUNCTIONS.map((fn) => `${fn.key}: ${fn.description}`),
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "student",
        audienceType: "Students, teachers and professionals",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        category: "free",
      },
      publisher: { "@id": SCHEMA_IDS.organization },
    },
    {
      "@type": "HowTo",
      "@id": ids.howTo,
      name: "How to Use the Solve Calculator",
      description: "Solve any expression with the free online scientific calculator in four steps.",
      totalTime: "PT1M",
      tool: { "@type": "HowToTool", name: `${SITE_NAME} Solve Calculator` },
      step: HOW_TO_STEPS.map(([name, text], index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name,
        text,
        url: `${SITE_URL}/#how-to-use`,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": ids.faq,
      isPartOf: { "@id": ids.webpage },
      mainEntity: FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@type": "ItemList",
      "@id": ids.library,
      name: "Math Solutions Library",
      numberOfItems: ARTICLES.length,
      itemListElement: ARTICLES.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/math/${article.slug}`),
        name: article.title,
      })),
    },
    {
      "@type": "ItemList",
      "@id": ids.games,
      name: "Calculator Games You Can Play Unblocked",
      numberOfItems: GAMES.length,
      itemListElement: GAMES.map((game, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: game.title,
        description: game.howTo,
        url: `${SITE_URL}/#calculator-games`,
      })),
    },
  ],
};

export const metadata: Metadata = {
  ...pageMetadata({ title: PAGE_TITLE, description: PAGE_DESCRIPTION, path: "/", absoluteTitle: true }),
  keywords: [
    "solve calculator",
    "solver calculator",
    "calculator unblocked",
    "unblocked calculator",
    "scientific calculator online",
    "free online calc",
    "calculator unblocked games",
    "solvercalc",
  ],
};

const sectionClass = "scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20";
const containerClass = "mx-auto max-w-6xl";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <section id="hero" aria-labelledby="hero-title" className="bg-gradient-to-b from-indigo-50 to-white px-4 pb-16 pt-10 sm:px-6 sm:pt-16 dark:from-indigo-950/40 dark:to-gray-950">
        <div className={`${containerClass} grid items-center gap-10 lg:grid-cols-2`}>
          <div>
            <h1 id="hero-title" className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
              Free Online <span className="text-indigo-600 dark:text-indigo-400">Solve Calculator</span>
            </h1>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">
              {SITE_NAME} is a free solve calculator that handles everything from simple arithmetic to trigonometry,
              logarithms, powers and factorials. Type an expression or tap the keys, and get an accurate answer
              instantly—right in your browser.
            </p>
            <ul className="mt-6 flex flex-wrap gap-3" aria-label="Highlights">
              {["100% Free", "No Download", "Works on Chromebook"].map((badge) => (
                <li
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:text-gray-200 dark:ring-gray-800"
                >
                  <Check className="h-4 w-4 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                  {badge}
                </li>
              ))}
            </ul>
            <div className="mt-8 hidden gap-3 lg:flex">
              <a
                href="#how-to-use"
                className="inline-flex min-h-11 items-center rounded-xl bg-indigo-600 px-5 font-semibold text-white hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                How to use it
              </a>
              <Link
                href="/math"
                className="inline-flex min-h-11 items-center rounded-xl px-5 font-semibold text-indigo-700 ring-1 ring-indigo-200 hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-indigo-300 dark:ring-indigo-800 dark:hover:bg-indigo-950"
              >
                Browse math solutions
              </Link>
            </div>
          </div>
          <div id="calculator" className="flex scroll-mt-24 justify-center lg:justify-end">
            <Calculator />
          </div>
        </div>
      </section>

      {/* 2. What is a solver calculator */}
      <section id="what-is-solver-calculator" aria-labelledby="what-is-title" className={sectionClass}>
        <div className={`${containerClass} grid items-center gap-10 lg:grid-cols-2`}>
          <div>
            <SectionHeading id="what-is-title" title="What Is a Solver Calculator?" align="left" />
            <div className="-mt-4 space-y-4 text-lg text-gray-600 dark:text-gray-300">
              <p>
                A solver calculator is a scientific calculator that understands full expressions, not just one
                operation at a time. You can type <strong className="text-gray-900 dark:text-white">8 + 2 × (6 − 1)²</strong>{" "}
                and it follows the correct order of operations automatically, the same way your math teacher
                would.
              </p>
              <p>
                Our solver calculator runs entirely in your web browser. There is nothing to install, it works the
                same on Windows, macOS, Chromebooks, iPhone and Android, and it pairs with step-by-step articles so
                you can see <em>why</em> an answer is right, not just what it is.
              </p>
            </div>
          </div>
          <Image
            src="/images/solver-calculator.svg"
            alt="Solver calculator illustration showing an equation being solved step by step"
            width={560}
            height={400}
            unoptimized
            className="mx-auto h-auto w-full max-w-md"
          />
        </div>
      </section>

      {/* 3. Features */}
      <section id="features" aria-labelledby="features-title" className={`${sectionClass} bg-gray-50 dark:bg-gray-900/40`}>
        <div className={containerClass}>
          <SectionHeading
            id="features-title"
            eyebrow="Features"
            title={`Why Choose ${SITE_NAME}`}
            subtitle="Everything you need from a scientific calculator, without the clutter."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard icon={Sigma} title="Advanced Functions">
              Trigonometry in degrees or radians, logarithms, roots, powers, factorials, π, e and a reusable Ans key.
            </FeatureCard>
            <FeatureCard icon={Zap} title="Lightning Fast">
              Answers appear as you type. The whole page is small, so it opens quickly even on slow connections.
            </FeatureCard>
            <FeatureCard icon={GraduationCap} title="Educational">
              A growing library of worked solutions explains fractions, percentages and algebra one step at a time.
            </FeatureCard>
            <FeatureCard icon={Feather} title="Lightweight & Offline-Friendly">
              Once the page has loaded, every calculation happens on your device—no server round-trips needed.
            </FeatureCard>
            <FeatureCard icon={Smartphone} title="Mobile Friendly">
              Large, touch-friendly keys and a responsive layout that fits any screen from phones to desktops.
            </FeatureCard>
            <FeatureCard icon={ShieldCheck} title="Privacy First">
              No sign-up, no account and no stored calculations. Your math stays in your browser.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* 4. How to use */}
      <section id="how-to-use" aria-labelledby="how-to-title" className={sectionClass}>
        <div className={containerClass}>
          <SectionHeading
            id="how-to-title"
            title="How to Use the Solve Calculator"
            subtitle="Four quick steps, plus a reference for every key."
          />
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_TO_STEPS.map(([title, text], index) => (
              <li key={title} className="rounded-2xl border border-gray-200 p-6 dark:border-gray-800">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">{title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{text}</p>
              </li>
            ))}
          </ol>

          <h3 className="mt-14 text-xl font-semibold text-gray-900 dark:text-white">Calculator functions reference</h3>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
            <table className="w-full min-w-[540px] text-left text-sm">
              <caption className="sr-only">Every function key on the solve calculator with a description and example</caption>
              <thead className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Key</th>
                  <th scope="col" className="px-4 py-3 font-semibold">What it does</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {FUNCTIONS.map((fn) => (
                  <tr key={fn.key}>
                    <th scope="row" className="px-4 py-3 font-mono font-semibold text-indigo-700 dark:text-indigo-300">
                      {fn.key}
                    </th>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{fn.description}</td>
                    <td className="px-4 py-3 font-mono text-gray-700 dark:text-gray-300">{fn.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Solve calculator examples */}
      <section id="solve-calculator-examples" aria-labelledby="examples-title" className={`${sectionClass} bg-gray-50 dark:bg-gray-900/40`}>
        <div className={containerClass}>
          <SectionHeading
            id="examples-title"
            eyebrow="Examples"
            title="Solve Calculator Examples"
            subtitle="Real problems you can solve right now. Type the input exactly as shown and press = to get the same answer."
          />
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">Example problems, what to type into the solve calculator, and the result</caption>
              <thead className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Problem</th>
                  <th scope="col" className="px-4 py-3 font-semibold">What to type</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Result</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Useful for</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700 dark:divide-gray-800 dark:text-gray-300">
                {SOLVE_EXAMPLES.map((example) => (
                  <tr key={example.problem}>
                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 dark:text-white">{example.problem}</th>
                    <td className="px-4 py-3">
                      <code className="rounded-md bg-gray-100 px-2 py-1 font-mono text-indigo-700 dark:bg-gray-800 dark:text-indigo-300">
                        {example.input}
                      </code>
                    </td>
                    <td className="px-4 py-3 font-mono font-semibold tabular-nums text-gray-900 dark:text-white">{example.result}</td>
                    <td className="px-4 py-3">{example.useCase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            Results are rounded to 10 significant digits. Trig examples use DEG mode.
          </p>
        </div>
      </section>

      {/* 6. What the solver calculator can solve */}
      <section id="what-it-solves" aria-labelledby="solves-title" className={sectionClass}>
        <div className={containerClass}>
          <SectionHeading
            id="solves-title"
            title="What Can the Solver Calculator Solve?"
            subtitle="One free solver calculator covers the math you meet from middle school to college and on the job."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SOLVE_TOPICS.map((topic) => (
              <FeatureCard key={topic.title} icon={topic.icon} title={topic.title}>
                {topic.text}
                {topic.href ? (
                  <>
                    {" "}
                    <Link href={topic.href} className="font-medium text-indigo-700 hover:underline dark:text-indigo-300">
                      {topic.linkText}
                    </Link>
                  </>
                ) : null}
              </FeatureCard>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Calculator unblocked */}
      <section id="calculator-unblocked" aria-labelledby="unblocked-title" className={`${sectionClass} bg-gray-50 dark:bg-gray-900/40`}>
        <div className={`${containerClass} grid gap-10 lg:grid-cols-2`}>
          <div>
            <SectionHeading id="unblocked-title" title="Calculator Unblocked – Use It Anywhere" align="left" />
            <div className="-mt-4 space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                Many students search for a calculator unblocked at school because heavy apps and browser extensions
                are often disabled on managed devices. {SITE_NAME} is an unblocked calculator in the simplest sense: it
                is one lightweight web page with no downloads, no extensions and no logins.
              </p>
              <p>
                That means it typically opens on school Chromebooks, library computers and work laptops anywhere
                regular educational websites are permitted. We don’t promise to get around network filters, and we
                ask every visitor to respect their school’s or employer’s technology policy.
              </p>
            </div>
            <h3 className="mt-8 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
              <Laptop className="h-5 w-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
              Add the unblocked calculator to your Chromebook
            </h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-gray-600 dark:text-gray-300">
              <li>Open {SITE_NAME} in Chrome.</li>
              <li>Select the three-dot menu (⋮) in the top-right corner.</li>
              <li>
                Choose <strong className="text-gray-900 dark:text-white">Cast, save and share → Install page as app</strong>{" "}
                (called <strong className="text-gray-900 dark:text-white">Create shortcut</strong> in older versions).
              </li>
              <li>Open it from your shelf or launcher like any other app.</li>
            </ol>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              If installing apps is turned off on your device, press Ctrl + D to bookmark the page instead.
            </p>
          </div>
          <div className="self-start rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
              <Lightbulb className="h-5 w-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
              Calculator Unblocked Games &amp; Number Puzzles
            </h3>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Looking for calculator unblocked games? Skip the downloads and turn the calculator itself into a
              challenge. Every calculator game unblocked on this page needs nothing but the keypad and a few minutes.
            </p>
            <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
              {GAMES.slice(0, 4).map((game) => (
                <li key={game.title} className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                  {game.title}
                </li>
              ))}
            </ul>
            <a
              href="#calculator-games"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-indigo-600 px-5 font-semibold text-white hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              See all {GAMES.length} calculator games
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* 8. Calculator games */}
      <section id="calculator-games" aria-labelledby="games-title" className={sectionClass}>
        <div className={containerClass}>
          <SectionHeading
            id="games-title"
            eyebrow="Play"
            title="Calculator Games You Can Play Unblocked"
            subtitle="Quick number challenges for class warm-ups, study breaks or a friendly race. Use the calculator above to check every answer."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {GAMES.map((game) => (
              <article
                key={game.title}
                className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                    <Gamepad2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                    {game.title}
                  </h3>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${LEVEL_CLASSES[game.level]}`}>
                    {game.level}
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">{game.players}</p>
                <p className="mt-3 flex-1 text-gray-600 dark:text-gray-300">{game.howTo}</p>
                <details className="group mt-4 rounded-xl bg-gray-50 px-4 py-2 dark:bg-gray-800/60">
                  <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between text-sm font-semibold text-indigo-700 focus-visible:outline-2 focus-visible:outline-indigo-600 dark:text-indigo-300 [&::-webkit-details-marker]:hidden">
                    Show a solution
                    <ArrowRight className="h-4 w-4 transition-transform group-open:rotate-90" aria-hidden="true" />
                  </summary>
                  <p className="pb-2 text-sm text-gray-700 dark:text-gray-300">{game.solution}</p>
                </details>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="#calculator"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl px-5 font-semibold text-indigo-700 ring-1 ring-indigo-200 hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-indigo-300 dark:ring-indigo-800 dark:hover:bg-indigo-950"
            >
              Open the calculator to play
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* 9. Quick answers */}
      <section id="quick-answers" aria-labelledby="quick-answers-title" className={`${sectionClass} bg-gray-50 dark:bg-gray-900/40`}>
        <div className={containerClass}>
          <SectionHeading
            id="quick-answers-title"
            title="Quick Answers: Fractions & Percentages"
            subtitle="Three of the most searched conversions, solved step by step."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {QUICK_ANSWERS.map((item) => (
              <article
                key={item.href}
                className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.question}</h3>
                <ol className="mt-4 space-y-1 font-mono text-sm text-gray-600 dark:text-gray-300">
                  <li>{item.working}</li>
                  <li>{item.detail}</li>
                </ol>
                <p className="mt-4 text-3xl font-bold text-indigo-600 dark:text-indigo-400">{item.answer}</p>
                <Link
                  href={item.href}
                  className="mt-auto inline-flex items-center gap-1 pt-6 font-medium text-indigo-700 hover:underline dark:text-indigo-300"
                >
                  {item.linkText}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Math solutions library */}
      <section id="math-solutions" aria-labelledby="library-title" className={sectionClass}>
        <div className={containerClass}>
          <SectionHeading
            id="library-title"
            title="Math Solutions Library"
            subtitle="Clear, worked explanations for the problems students ask about most."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {CATEGORIES.map((category) => (
              <div
                key={category.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{category.name}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{category.description}</p>
                <ul className="mt-4 space-y-2">
                  {getArticlesByCategory(category.name).map((article) => (
                    <li key={article.slug}>
                      <Link
                        href={`/math/${article.slug}`}
                        className="text-indigo-700 hover:underline dark:text-indigo-300"
                      >
                        {article.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/math"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-indigo-600 px-6 font-semibold text-white hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              View all math solutions
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 11. Audiences */}
      <section id="who-its-for" aria-labelledby="audience-title" className={`${sectionClass} bg-gray-50 dark:bg-gray-900/40`}>
        <div className={containerClass}>
          <SectionHeading id="audience-title" title="Perfect for Students and Professionals" />
          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard icon={GraduationCap} title="Students">
              Check homework, convert fractions to percentages and learn the method behind each answer with our free
              online calc and step-by-step guides.
            </FeatureCard>
            <FeatureCard icon={Users} title="Teachers">
              Project the calculator in class, share article links as homework help and use the number puzzles as
              quick warm-up activities.
            </FeatureCard>
            <FeatureCard icon={Briefcase} title="Professionals">
              Engineers, accountants and tradespeople can run quick trig, percentage and power calculations without
              opening a spreadsheet.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* 12. Keyboard shortcuts */}
      <section id="keyboard-shortcuts" aria-labelledby="shortcuts-title" className={sectionClass}>
        <div className={`${containerClass} grid items-start gap-10 lg:grid-cols-2`}>
          <div>
            <SectionHeading id="shortcuts-title" eyebrow="Tips" title="Calc Keyboard Shortcuts" align="left" />
            <div className="-mt-4 space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                Typing is the fastest way to use this free online calc on a laptop, desktop or Chromebook. Click
                anywhere on the page and start typing—no need to aim for buttons.
              </p>
              <p>
                On phones and tablets, the large touch keys do the same job. Use the history list to reuse any of
                your last five answers, or tap <strong className="text-gray-900 dark:text-white">Ans</strong> to
                continue from the previous result.
              </p>
            </div>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Keyboard shortcuts for the online calculator</caption>
              <thead className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Key</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {SHORTCUTS.map(([keys, action]) => (
                  <tr key={keys}>
                    <th scope="row" className="whitespace-pre px-4 py-3 font-mono font-semibold text-indigo-700 dark:text-indigo-300">
                      {keys}
                    </th>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 13. Comparison */}
      <section id="online-vs-physical" aria-labelledby="compare-title" className={`${sectionClass} bg-gray-50 dark:bg-gray-900/40`}>
        <div className={containerClass}>
          <SectionHeading
            id="compare-title"
            title="Online Calculator vs Physical Calculator"
            subtitle="A handheld calculator still has its place—especially in exams—but here is how they compare day to day."
          />
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <table className="w-full min-w-[560px] text-left text-sm sm:text-base">
              <caption className="sr-only">Comparison of an online solver calculator and a physical calculator</caption>
              <thead className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Feature</th>
                  <th scope="col" className="px-4 py-3 font-semibold">{SITE_NAME} (online)</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Physical calculator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700 dark:divide-gray-800 dark:text-gray-300">
                {[
                  ["Cost", "Free", "Typically $15–$150"],
                  ["Availability", "Any device with a browser", "Only when you carry it"],
                  ["Updates", "Improves automatically", "Fixed features; buy a new model"],
                  ["Sharing", "Send a link to a worked solution", "Show the screen in person"],
                  ["Accessibility", "Keyboard, screen reader and zoom support", "Small buttons and display"],
                  ["Exams", "Not allowed in most exams", "Often required or permitted"],
                ].map(([feature, online, physical]) => (
                  <tr key={feature}>
                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 dark:text-white">{feature}</th>
                    <td className="px-4 py-3">{online}</td>
                    <td className="px-4 py-3">{physical}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 14. FAQ */}
      <section id="faq" aria-labelledby="faq-title" className={sectionClass}>
        <div className={containerClass}>
          <SectionHeading
            id="faq-title"
            title="Frequently Asked Questions"
            subtitle="Answers about the solve calculator, unblocked access and common conversions."
          />
          <FAQ items={FAQS} />
        </div>
      </section>

      {/* 15. Final CTA */}
      <section id="get-started" aria-labelledby="cta-title" className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-2xl bg-indigo-600 px-6 py-12 text-center text-white shadow-lg sm:px-12">
          <h2 id="cta-title" className="text-2xl font-bold sm:text-3xl">
            Ready to solve your next problem?
          </h2>
          <p className="mt-3 text-indigo-100">The calculator is waiting at the top of the page—no sign-up required.</p>
          <a
            href="#calculator"
            className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-6 font-semibold text-indigo-700 hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Open the calculator
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      <JsonLd data={homepageJsonLd} />
    </>
  );
}
