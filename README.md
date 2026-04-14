# Fortitude Leadership

Website for Fortitude Leadership — leadership coaching, personal development, and collective performance.

## Stack

- **[Nuxt 4](https://nuxt.com)** — Vue fullstack framework
- **[Prismic](https://prismic.io)** + **Slice Machine** — headless CMS with visual editor
- **[Resend](https://resend.com)** — transactional emails (contact form)
- **[Google reCAPTCHA v3](https://developers.google.com/recaptcha)** — spam protection
- **TypeScript** + **SCSS**

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/about` | About |
| `/services` | Services |
| `/blog` | Blog listing (pagination, category filters) |
| `/blog/[uid]` | Blog article |
| `/contact` | Contact form |
| `/legal/[uid]` | Legal pages (privacy policy, terms…) |
| `/event/[uid]` | Events |

## Prismic Slices

`Hero` · `Header` · `TextAndImage` · `ImageComparison` · `TeamMemberProfiles` · `ArticleBlock` · `CaseStudy` · `MissionsAndCta` · `QuoteAndButton` · `Service`

## Prerequisites

- Node.js ≥ 20
- A [Prismic](https://prismic.io) account with the `fortitude-leadership` repository
- A [Resend](https://resend.com) account with a verified domain
- A [Google reCAPTCHA](https://www.google.com/recaptcha/admin/create) account (v3) — optional

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file at the root:

```env
# Email — Resend
RESEND_API_KEY=re_...
CONTACT_EMAIL=contact@fortitude-leadership.com

# Spam protection — Google reCAPTCHA v3 (optional)
NUXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc...
RECAPTCHA_SECRET_KEY=6Lc...
```

> Without reCAPTCHA keys, the contact form still works with the honeypot field as a fallback.

## Development

```bash
npm run dev
```

Starts Nuxt (`localhost:3000`) and Slice Machine (`localhost:9999`) concurrently.

## Slice Machine

```bash
npm run slicemachine
```

After modifying a content type in Slice Machine, push changes to Prismic via the **Push to Prismic** button in the UI.

## Build

```bash
npm run build
npm run preview
```

## Deployment

The site is deployed on **Vercel**. Every push to `main` triggers an automatic deployment.

Add the environment variables in the Vercel project settings.

## SEO

- Meta tags via `useSeo` composable (title, description, og:*, twitter:*)
- JSON-LD structured data: `Organization`, `WebSite`, `BlogPosting`, `BreadcrumbList`, `LocalBusiness`, `ProfessionalService`
- Dynamic sitemap at `/sitemap.xml`
- RSS feed at `/rss.xml`
- Configured `robots.txt`

## GDPR Compliance

- Cookie consent banner (CNIL compliant)
- Consent stored for 13 months via `cookie-consent` cookie
- reCAPTCHA loaded only after user consent
- "Manage cookies" link in the footer
