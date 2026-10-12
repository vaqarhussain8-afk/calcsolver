# CalcSolver – Free Online Solve Calculator

A Next.js 15 (App Router) website with a scientific solve calculator on the homepage, SEO-focused content
sections, 12 step-by-step math articles, and all standard legal and info pages.

**Stack:** Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · mathjs · lucide-react · Vitest

---

## Getting started

Requires **Node.js 18.18+** (Node 20 or 22 LTS recommended).

```bash
npm install        # install dependencies
npm run dev        # start the dev server at http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run lint       # ESLint (next/core-web-vitals + next/typescript)
npm test           # run the calculator unit tests with Vitest
```

Copy `.env.example` to `.env.local` and fill in values as needed. Every variable is optional for local development.

## Project structure

```
app/                     Routes (App Router)
  page.tsx               Homepage with the calculator and all keyword sections
  math/                  Article index and dynamic article pages (statically generated)
  api/contact/route.ts   Contact form handler
  sitemap.ts, robots.ts  SEO files
  opengraph-image.tsx    Generated Open Graph image
  icon.svg               Favicon / app icon
components/              UI components (Calculator, Header, Footer, CookieBanner, …)
lib/
  site.ts                Brand name, domain, email, navigation
  seo.ts                 Metadata and JSON-LD helpers
  articles.ts            Math article content
  expression.ts          Lightweight expression editing helpers (ships with the page)
  calculator.ts          Safe mathjs evaluation (loaded on first use of the calculator)
  calculator.test.ts     Unit tests
  consent.ts             Cookie consent storage helpers
  contact.ts             Shared contact form validation
public/images/           Illustration used on the homepage
```

## Changing the brand name, domain or email

Edit `lib/site.ts`:

```ts
export const SITE_NAME = "CalcSolver";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.calcsolver.com").replace(/\/$/, "");
export const SITE_EMAIL = "hello@calcsolver.com";
```

- `SITE_NAME` updates the header, footer, titles, Open Graph image, JSON-LD and legal pages.
- `SITE_URL` sets `metadataBase`, canonical URLs, the sitemap and robots.txt. You can also set
  `NEXT_PUBLIC_SITE_URL` in your environment instead of editing the file.
- `LAST_UPDATED` controls the "Last updated" date on legal pages and the sitemap date for static pages.

Keep the homepage title (in `app/page.tsx`) at 60 characters or fewer after changing the brand name.

### Favicon

`app/icon.svg` is used as the favicon by all modern browsers. If you also want a legacy `favicon.ico`,
export one (32×32 or 48×48) from the SVG with any icon tool and save it as `app/favicon.ico`. Next.js will
pick it up automatically.

## Connecting the contact form to an email service

The form posts to `app/api/contact/route.ts`, which validates input (shared rules in `lib/contact.ts`),
silently drops spam caught by the honeypot field and returns `{ ok: true }`.

**Resend (built in):**

1. Create an account at resend.com and verify your sending domain.
2. Set these environment variables (locally in `.env.local`, and in Vercel → Project → Settings → Environment Variables):
   ```
   RESEND_API_KEY=re_xxxxxxxx
   CONTACT_TO_EMAIL=you@yourdomain.com
   CONTACT_FROM_EMAIL=CalcSolver <noreply@yourdomain.com>
   ```
3. Redeploy. Messages are now emailed to `CONTACT_TO_EMAIL` with the visitor's address as reply-to.

Without these variables the route still returns success, and in development it logs the message to the console.

**Other providers:** replace the body of the `deliver()` function (see the `TODO` comment) with Nodemailer
(SMTP) or a `fetch` to Formspree.

## Analytics and cookie consent

Set `NEXT_PUBLIC_GA_ID=G-XXXXXXX` to enable Google Analytics. The script is loaded **only** after a visitor
accepts analytics cookies in the banner. The choice is stored in `localStorage` under `cookie-consent`.
The footer "Cookie Settings" button reopens the banner by dispatching an `open-cookie-settings` event.

## Calculator notes

- mathjs is downloaded only when a visitor first hovers, taps or types into the calculator, keeping the
  homepage light. Expressions are evaluated with a locked-down `mathjs` instance (no `eval` or `new Function`). Functions
  such as `import`, `evaluate` and `parse` are disabled inside expressions, and only known names are allowed.
- DEG/RAD mode switches the trig functions; degree mode returns exact values for angles such as sin(30) = 0.5.
- Results are rounded to 10 significant digits. Division by zero and invalid input show "Error".
- Keyboard: digits, `+ - * / ^ ( ) . % !`, Enter or `=` to evaluate, Backspace to delete, Escape to clear.

## Adding a math article

Add an object to the `ARTICLES` array in `lib/articles.ts` with a unique `slug`. The page, sitemap entry,
homepage library link, related links and JSON-LD are generated automatically.

## Deploying to Vercel

1. Push the project to a GitHub, GitLab or Bitbucket repository.
2. In Vercel, click **Add New → Project** and import the repository. The Next.js framework preset is detected
   automatically (build command `next build`).
3. Add environment variables (`NEXT_PUBLIC_SITE_URL`, and optionally `NEXT_PUBLIC_GA_ID`, `RESEND_API_KEY`,
   `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`).
4. Deploy, then add your custom domain under **Settings → Domains**.
5. Submit `https://your-domain.com/sitemap.xml` in Google Search Console.

## Light and dark theme

The sun/moon button in the header switches between light and dark themes. The choice is saved in
`localStorage` under `theme`; visitors who never choose follow their device setting. An inline script in
`app/layout.tsx` (from `lib/theme.ts`) applies the theme before the first paint to avoid a flash, and
Tailwind's `dark:` variant is bound to the `dark` class on `<html>` in `app/globals.css`.
