# Nyoo Studio Website — Build Order

Use this as your prompt checklist with Claude Code. One item = one prompt session.
Check off each item as it's completed.

---

## Phase 1 — Project Setup

- [x] 1. Initialize Next.js: `npx create-next-app@latest . --typescript --tailwind --eslint --app`
- [ ] 2. Configure `tailwind.config.ts` — add all five brand colors (Midnight #0D0A09, Blood Red #C41230, Amber #C17F3A, Cobalt #1B44D8, Cream #F2EDE4) and register DM Sans + Playfair Display font families
- [x] 3. Set up `styles/globals.css` — CSS custom properties, base resets, font imports
- [x] 4. Create `app/layout.tsx` — root layout wrapping all pages (fonts, metadata defaults, Header/Footer)

---

## Phase 2 — UI Primitives

- [x] 5. `components/ui/Button.tsx` — three variants: primary (red fill), ghost (transparent + border), nav (red, smaller)
- [x] 6. `components/ui/Accordion.tsx` — for FAQ sections (used on homepage teaser and full FAQ page)
- [x] 7. `components/ui/SectionLabel.tsx` — small italic label above headlines ("The gap", "Our work", etc.)
- [x] 8. `components/ui/PricingCard.tsx` — for the three service tiers on the Services page

---

## Phase 3 — Layout Components

- [x] 9. `components/layout/Header.tsx` — logo left, nav links, red "Book a Call" button, mobile hamburger
- [x] 10. `components/layout/Nav.tsx` — links: About, Services, FAQ (no "Work" link at launch)
- [x] 11. `components/layout/Footer.tsx` — minimal: logo, nav links, email, copyright

---

## Phase 4 — Shared Section Components

- [x] 12. `components/sections/Hero.tsx` — reusable hero with H1, subhead, and CTA slots (used on every page)
- [x] 13. `components/sections/CTASection.tsx` — full-width CTA block (reused at bottom of most pages)
  - ⚠️ **Revisit if built as a flat cobalt fill.** Per brand guidelines, cobalt must not be used at full strength in large fills. The correct treatment is a midnight-to-cobalt gradient (`#0D0A09 → #111a3a → #1B44D8`) with film grain overlay at ~10% opacity. Type stays anchored on the midnight (left/dark) side of the gradient.

---

## Phase 4b — Grain Utility

- [x] 14. `components/ui/GrainOverlay.tsx` — reusable film grain overlay component. SVG fractal noise at 8–15% opacity, `mix-blend-mode: overlay`. Apply to all hero sections, solid color fields, and card backgrounds. Never on body text or the logo mark.

---

## Phase 5 — Homepage Sections

- [x] 15. Homepage Hero — oversized stacked H1, subhead, two CTAs
- [x] 16. The Problem section — "The gap" label + body copy
- [x] 17. What We Do — two cards (Social Media Management, Content Strategy)
- [x] 18. How It Works — three-step process
- [x] 19. Social Proof — placeholder quote block (styled for a real quote later)
- [x] 20. Meet the Founders teaser — short bios + "Read our story" CTA
- [x] 21. FAQ Teaser — 3 accordion items + link to full FAQ page
- [x] 22. Final CTA section — midnight-to-cobalt gradient background, "Ready for a Nyoo standard?" — use CTASection with gradient treatment (not flat cobalt), grain overlay, type on dark side
- [x] 23. Wire into `app/page.tsx` with correct metadata

---

## Phase 6 — About Page

- [x] 24. About Hero — "Small businesses deserve better than small thinking."
- [x] 25. Jo's Story section
- [x] 26. Jin's Story section
- [x] 27. Why They Built It section
- [x] 28. Values section (no heading — three clean statements)
- [x] 29. CTA block at bottom
- [x] 30. Wire into `app/about/page.tsx` with metadata

---

## Phase 7 — Services Page

- [x] 31. Services Hero — "What we do. What it costs. No surprises."
- [x] 32. Three pricing tier cards (Foundation, Growth Engine ⭐, Scale) with performance guarantee note
- [x] 33. Commit Discounts block
- [x] 34. Add-Ons table
- [x] 35. Referral + Multi-Client discounts block
- [x] 36. CTA block at bottom
- [x] 37. Wire into `app/services/page.tsx` with metadata + `Service` JSON-LD schema

---

## Phase 8 — FAQ Page

- [x] 38. FAQ page hero (minimal — just H1)
- [x] 39. Four accordion sections: About Nyoo Studio / Services / Pricing & Contracts / Working Together
- [x] 40. Sticky "Book a Call" CTA on mobile
- [x] 41. Wire into `app/faq/page.tsx` with metadata + `FAQPage` JSON-LD schema ← highest SEO priority

---

## Phase 9 — Contact Page

- [x] 42. Contact Hero — "Let's talk." with left-column copy
- [x] 43. Contact form — all fields per spec, red submit button
- [x] 44. Wire form to Formspree or Netlify Forms (no backend needed)
- [x] 45. Wire into `app/contact/page.tsx` with metadata

---

## Phase 10 — SEO & Technical

- [x] 46. `LocalBusiness` JSON-LD schema component (shared across all pages)
- [x] 47. Open Graph image setup (one default OG image to start)
- [x] 48. `public/sitemap.xml` — generate with `next-sitemap`
- [x] 49. `public/robots.txt`
- [x] 50. Final metadata audit — confirm each page has unique title + meta description

---

## Phase 11 — Asset Swap (once files are ready)

- [x] 51. Export logo SVG as PNG for favicon and OG image — SVG mark is already in `CLAUDE.md` and can be used inline immediately, but PNG versions are needed for `public/favicon.ico` and Open Graph
- [ ] 52. Replace `[JIN_HEADSHOT]` and `[JO_HEADSHOT]` placeholders with real photos
- [ ] 53. Replace `[CLIENT_QUOTE]` with first real testimonial
- [ ] 54. Add `[CALENDLY_LINK]` to Contact page (or keep form-only — TBD)

---

## Assets Still Needed

Before Phase 11 can be completed, collect the following:

- [ ] Logo PNG export — SVG mark is already defined in `CLAUDE.md`; need PNG renders for favicon and OG image (recommended: 512×512 and 1200×630)
- [ ] Jin's photo — editorial style, moody, not a corporate headshot
- [ ] Jo's photo — editorial style, moody, not a corporate headshot
- [ ] First client testimonial — specific result, specific situation (not vague praise)
- [ ] Calendly link — or confirm contact form is the only scheduling CTA

---

*Last updated: March 2026*
