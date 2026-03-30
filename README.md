# Nyoo Studio — Website

Marketing website for [Nyoo Studio](https://nyoostudio.com), a DC Metro creative marketing agency.

**Live site:** nyoostudio.com
**Deployed on:** Vercel

---

## Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- React 19

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** Turbopack is disabled. Use `npm run dev` only — never `next dev --turbopack`. Turbopack writes a persistence DB that crashes on Windows paths with spaces.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
app/
├── layout.tsx          # Root layout (fonts, metadata, Header/Footer)
├── page.tsx            # Homepage (/)
├── about/page.tsx      # About the founders (/about)
├── services/page.tsx   # Packages & pricing (/services)
├── faq/page.tsx        # FAQs (/faq)
├── contact/page.tsx    # Contact / book a call (/contact)
├── icon.svg            # Site favicon (auto-served by Next.js App Router)
└── opengraph-image.tsx # Default OG image

components/
├── layout/
│   ├── Header.tsx      # Nav + Book a Call button
│   ├── Nav.tsx         # Navigation links
│   └── Footer.tsx      # Minimal footer
├── sections/           # Page section components
│   ├── Hero.tsx
│   ├── CTASection.tsx
│   └── FAQAccordion.tsx
├── seo/                # Structured data / JSON-LD components
└── ui/                 # Primitives (Button, Accordion, PricingCard, etc.)

content/                # Static content / copy
styles/
└── globals.css         # CSS custom properties, base resets, font imports
public/
├── sitemap.xml
└── robots.txt
```

---

## Pages

| Route | Page |
|-------|------|
| `/` | Homepage |
| `/about` | About the founders |
| `/services` | Packages & pricing |
| `/faq` | FAQs |
| `/contact` | Contact / book a call |

---

## Deployment

Deployed automatically via Vercel on push to `main`.

**Pre-deploy checklist:** run `/pre-deploy` in Claude Code before pushing — checks placeholders, OG image, metadata, JSON-LD, and form endpoint.

---

## Content Placeholders

These are intentional gaps pending real assets:

| Placeholder | What's needed |
|-------------|---------------|
| `[JIN_HEADSHOT]` | Editorial photo of Jin |
| `[JO_HEADSHOT]` | Editorial photo of Jo |
| `[CLIENT_QUOTE]` | First real client testimonial |
| `[CALENDLY_LINK]` | Calendly URL (or keep contact form only — TBD) |

---

## Contact Form

Built as a static form — no backend. Points to Formspree or Netlify Forms. No server-side code required.
