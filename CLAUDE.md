# Nyoo Studio — Website

## Project Overview
Marketing website for Nyoo Studio, a DC Metro creative marketing agency. 5-page static site built with Next.js (App Router). Deployed on Vercel.

**Site:** nyoostudio.com
**Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, shadcn/ui

---

## Site Architecture

| Route | File | Page |
|-------|------|------|
| `/` | `app/page.tsx` | Homepage |
| `/about` | `app/about/page.tsx` | About the Founders |
| `/services` | `app/services/page.tsx` | Packages & Pricing |
| `/faq` | `app/faq/page.tsx` | FAQs |
| `/contact` | `app/contact/page.tsx` | Contact / Book a Call |

**Nav order:** Work (future/hidden) → About → Services → FAQ → [Book a Call — red button]

---

## Brand

### Positioning
"We don't bet on everyone. But when we do, we don't lose."
A creative marketing agency powering growth for small businesses — giving them access to the strategic firepower they thought was out of reach.

### Personality
Primary traits: Sharp-eyed, All-in, Relentless
Secondary traits: Cinematic, After-hours cool, Selective, Dangerous competence

---

## Design System

### Colors

Use these as CSS custom properties in `globals.css`:

```css
:root {
  --midnight: #0D0A09;   /* Primary background — "the room" */
  --red:      #C41230;   /* Energy / CTAs / accent — "the neon sign outside" */
  --amber:    #C17F3A;   /* Warmth / labels / section tags — "the tungsten lamp" */
  --cobalt:   #1B44D8;   /* Data / shock / rare accent — "cold light under the door" */
  --cream:    #F2EDE4;   /* Text / space / light surfaces — "what the lights land on" */

  /* Utility */
  --divider:  rgba(242, 237, 228, 0.09);
  --card-bg:  rgba(242, 237, 228, 0.035);
}
```

**Color philosophy — "Color is light, not paint."**
Every color behaves like a light source: it emanates, bleeds, and occupies its own space. Colors don't compete because they don't share the same surface.

- **Emit, don't fill.** Color should feel like it's coming from somewhere. Never a flat wash — even solid fields carry depth through grain and gradient.
- **Colors occupy zones, not layers.** Keep colors spatially separated — one anchors an edge, another anchors another. They bleed toward the center but never meet.
- **Darkness makes color powerful.** The palette only works against midnight. On white or light backgrounds these colors lose their charge. Always return to dark grounds.
- **Grain softens the edge.** Where colors meet or bleed into darkness, film grain dissolves the hard line. Texture makes the glow feel earned, not applied.

**Cobalt — specific usage rules:**
- **Primary role: data & illustration.** Charts, graphs, statistics, data points. Cobalt handles proof; red and amber handle emotion.
- **Gradients: felt, not seen.** In background gradients, cobalt anchors one edge and fades into midnight — reads as atmosphere, not a dominant color field.
- **Never at full strength in large fills.** Reserve full-saturation cobalt for small contained elements (a data bar, a line, a callout number). Large cobalt fills overpower everything.
- **Keep it away from red.** Red + cobalt side by side reads patriotic. Separate them spatially — different sections, different zones. They can coexist at opposite edges, never side by side.
- **Type sits on the midnight end of any gradient, never over the cobalt bleed.**

---

### Typography

Import from Google Fonts:
```
DM Sans — weights: 300, 400, 500, 600
Playfair Display — weights: 400, 700, 900 (including italic)
```

| Role | Font | Size | Weight | Notes |
|------|------|------|--------|-------|
| Headline | DM Sans | clamp(30px, 5vw, 54px) | 600 (SemiBold) | letter-spacing: -0.02em, line-height: 1.12 |
| Display Light | DM Sans | 38px | 300 (Light) | letter-spacing: 0.01em, used in color (red) |
| Body | Playfair Display | 15px | 400 | line-height: 1.85, opacity 0.72 on dark bg |
| Label | DM Sans | 10px | 600 | letter-spacing: 0.22em, ALL CAPS, color: amber |
| Wordmark | DM Sans | 23px | 300 | letter-spacing: 0.22em, lowercase, period in red |

---

### Texture — Film Grain

Apply a film grain SVG overlay on all solid color fields and hero images:
- Opacity: **8–15%** (`mix-blend-mode: overlay`)
- **Never** on body text
- **Never** on the logo mark — keep it clean
- Grain lives in backgrounds, not on the brand mark

```css
/* Reusable grain overlay pattern */
.grain::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.055; /* adjust per surface: 0.08–0.15 */
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  background-size: 300px 300px;
}
```

---

### Logo Mark

The logo is an SVG mark. Use this path in Header and Footer:

```svg
<svg viewBox="0 0 110 95" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 14 L16 64 Q16 80 31 80 Q46 80 46 64 L46 30"
        stroke="#F2EDE4" stroke-width="9.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <line x1="62" y1="14" x2="62" y2="80" stroke="#F2EDE4" stroke-width="9.5" stroke-linecap="round"/>
  <line x1="80" y1="30" x2="80" y2="80" stroke="#F2EDE4" stroke-width="9.5" stroke-linecap="round"/>
</svg>
```

Wordmark: `nyoo<span style="color: var(--red); font-weight: 700;">.</span>studio` — lowercase, DM Sans 300, letter-spacing 0.22em.
On dark backgrounds use cream stroke. On light backgrounds swap stroke to midnight.

---

### Visual Style
- Moody, editorial feel — not corporate, not stock photography
- Red/amber light photography, slightly grainy, candid
- Minimal UI — whitespace is a design element
- Red used sparingly for CTAs and key word emphasis only
- Cobalt used for data elements and as gradient atmosphere (not as a dominant section color)

### Layout Principles
- Site lives on **midnight (#0D0A09)** — this is the default background
- Cream (#F2EDE4) sections used for contrast breaks, not as the primary ground
- Full-width sections with generous padding (py-24 or more)
- Max content width ~1200px, centered
- Mobile-first — all layouts responsive

### Voice & Tone (from brand guidelines)
1. **Short sentences. No throat-clearing.** Lead with the point. Every word should earn its place.
2. **Speak to potential, never to fear.** Don't sell by making clients feel small — show them what's possible.
3. **Say "we" like you mean it.** nyoo is a partner, not a vendor. Language should feel like a room you're both in.

---

## Component Structure

```
components/
├── layout/
│   ├── Header.tsx        # Nav with "Book a Call" red button
│   ├── Footer.tsx        # Minimal footer
│   └── Nav.tsx           # Navigation links
├── sections/             # One file per reusable section type
│   ├── Hero.tsx
│   ├── SectionLabel.tsx  # Small label above headlines (italic, muted)
│   ├── CTASection.tsx    # Full-width cobalt final CTA
│   ├── FAQAccordion.tsx  # Accordion FAQ component
│   └── PricingCard.tsx   # Tier pricing cards
└── ui/                   # Primitives (buttons, cards, etc.)
    ├── Button.tsx        # Variants: primary (red), ghost, outline
    └── Accordion.tsx
```

---

## SEO Requirements

Every page MUST have:
- Unique `<title>` tag and meta description (see per-page specs below)
- H1 with primary keyword + location where relevant
- Open Graph image tags (for social sharing)
- Canonical URL

### Schema Markup
- All pages: `LocalBusiness` JSON-LD
- FAQ page: `FAQPage` JSON-LD (highest-priority AEO action)
- Services page: `Service` JSON-LD

### Per-Page SEO

**Homepage**
- Title: `Nyoo Studio | Social Media & Content Marketing for Small Businesses | DC Metro`
- Meta: `Nyoo Studio is a DC Metro creative marketing agency helping established small businesses grow through social media management and content strategy built for lead generation.`

**About**
- Title: `About Nyoo Studio | Jin & Jo Yoo | DC Metro Creative Marketing Agency`
- Meta: `Meet Jin and Jo Yoo, the founders of Nyoo Studio — a DC-area creative marketing agency built for small businesses that deserve better than small thinking.`

**Services**
- Title: `Marketing Packages & Pricing | Nyoo Studio | DC Metro Small Business Marketing`
- Meta: `Nyoo Studio offers social media management and content strategy packages for established small businesses in DC, Virginia, and Maryland. See what's included and book a free call.`

**FAQ**
- Title: `FAQs | Nyoo Studio | Small Business Marketing Agency DC Metro`
- Meta: `Answers to the most common questions about working with Nyoo Studio — services, pricing, process, and what to expect.`

**Contact**
- Title: `Book a Free Strategy Call | Nyoo Studio | DC Metro Marketing Agency`
- Meta: `Schedule a free 30-minute strategy call with Nyoo Studio. No pitch, no pressure — just an honest conversation about your marketing.`

---

## Page Content Specs

### Homepage (`/`)

**Sections (in order):**
1. **Hero** — H1: "Your business has been running for years. / Your marketing hasn't caught up." | Subhead defines entity (Nyoo Studio + DC + service + audience) | CTA: Book a Free Strategy Call (red) + See How We Work (ghost)
2. **The Problem** — Label: "The gap" | Headline: "Most small businesses don't have a marketing problem. They have a visibility problem."
3. **What We Do** — Label: "Our work" | Headline: "Two things, done well." | Two cards: Social Media Management + Content Strategy for Lead Gen
4. **How It Works** — Label: "The process" | Headline: "No onboarding decks. No 12-week discovery phases." | 3 steps: Strategy Call → Custom Plan → We Get to Work
5. **Social Proof** — Placeholder quote (replace when real quote available)
6. **Meet the Founders (Teaser)** — "Not a faceless agency." | Short bios | CTA: Read our story → /about
7. **FAQ Teaser** — 3 questions, accordion, link to full FAQ
8. **Final CTA** — Full-width Cobalt (#1B44D8) | Headline: "Ready for a Nyoo standard?" | CTA: Book Your Free Call

### About (`/about`)
1. Hero — H1: "Small businesses deserve better than small thinking."
2. Jo's Story — "She's spent 12 years supporting brand growth..."
3. Jin's Story — "He's launched products for the federal government..."
4. Why They Built It — Combined 27 years story
5. Values (no "Values" heading) — 3 statements, clean

### Services (`/services`)
1. Hero — H1: "What we do. What it costs. No surprises."
2. Three pricing tiers: Foundation ($1,299/mo), Growth Engine ($2,499/mo ⭐), Scale (from $3,499/mo)
3. Commit Discounts (3-mo: 10%, 6-mo: 15%)
4. Add-Ons table
5. Referral + Multi-Client discounts

**Growth Engine** is "Most Popular" — badge it.
**Performance guarantee:** If contracted piece count missed, shortfall carries to next sprint.

### FAQ (`/faq`)
Use accordion. Group by category:
- About Nyoo Studio
- Services
- Pricing & Contracts
- Working Together

All Q&As must be wrapped in FAQPage JSON-LD schema.

### Contact (`/contact`)
1. Left column: copy ("The strategy call is 30 minutes...")
2. Right column: Form with fields: Name*, Business Name*, Email*, Phone, Website URL, "How did you hear about us?" (dropdown: Google / Social Media / Referral / Other), "What's your biggest marketing challenge?" (textarea)
3. Submit: "Request a Call" (red button)
4. Below form: "We respond within one business day." | hello@nyoostudio.com

---

## CTA Strategy

| Page | Primary CTA | Secondary CTA |
|------|-------------|---------------|
| Homepage | Book a Free Strategy Call | See Our Services |
| About | Book a Free Strategy Call | See Our Services |
| Services | Book a Free Strategy Call | See FAQs |
| FAQ | Book a Free Strategy Call | — (sticky on mobile) |
| Contact | Form submit | Email directly |

"Book a Call" = red button in nav on every page.

---

## Copy & Tone Rules

Apply these to ALL copy written for this site:

- Treat the reader like an adult — no hand-holding
- Cut every sentence to its shortest useful form
- **Never use:** "innovative," "passionate," "results-driven," "full-service"
- Don't over-explain what the reader already understands
- Warmth should live underneath directness — never on top of it
- Write as one person, not a committee
- Specific and verifiable > general and vague

---

## Content Placeholders (to fill in later)

These are intentional gaps — do not fabricate content for these:
- `[CLIENT_QUOTE]` — real client testimonial
- `[JIN_HEADSHOT]` — editorial photo
- `[JO_HEADSHOT]` — editorial photo
- `[CALENDLY_LINK]` — Calendly URL (or contact form only — TBD)

---

## Development Notes

- All retainers month-to-month — emphasize in Services page
- "Work" nav item is a future placeholder — do NOT add as a dead link at launch
- Contact form: build as static form pointing to a form endpoint (Formspree, Netlify Forms, or similar) — no backend needed
- Site speed target: under 3 seconds on mobile
- SSL required (handled by Vercel)
- Sitemap + robots.txt to be generated and submitted to Google Search Console post-launch
- **Turbopack disabled** — `next dev` only, never `--turbopack`. Turbopack writes a persistence DB and crashes on Windows paths with spaces. Already removed from `package.json`.
- **Favicon** — `app/icon.svg` is auto-served by Next.js App Router as the site favicon. Do NOT add an `icons` field to `metadata` in `layout.tsx` — it points to `/public/` and breaks it.
- **Grid flush-edge spacing** — For multi-column grids, use `px-8` on all columns + `md:pl-0` on the first + `md:pr-0` on the last. This gives equal visual weight without bleeding past the content boundary.

---

## Claude Code Automation

- **Lint hook** — ESLint runs automatically after every file edit (configured in `.claude/settings.json`)
- **`.env` files** — blocked from edit/write at the permissions level
- **`/pre-deploy`** — checklist skill: runs before any Vercel push, checks placeholders, OG image, metadata, JSON-LD, form endpoint
- **`/new-section`** — scaffolds a new section component with the correct Nyoo Studio boilerplate
- **`pre-deploy-reviewer` agent** — parallel reviewer for accessibility, SEO, and brand consistency
- **context7 MCP** — installed; add `use context7` to any prompt for live Next.js 16 / Tailwind v4 docs