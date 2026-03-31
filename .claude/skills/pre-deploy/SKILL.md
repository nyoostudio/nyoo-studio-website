---
name: pre-deploy
description: Run pre-deployment checklist for Nyoo Studio website before pushing to Vercel
---

Audit the Nyoo Studio website for deployment readiness. Check the following and report pass/fail for each:

1. **Placeholders removed** — Search all TSX files for [CLIENT_QUOTE], [JIN_HEADSHOT], [JO_HEADSHOT], [CALENDLY_LINK]. Flag any that remain.
2. **OG image exists** — Verify `public/og-image.png` exists and is not 0 bytes.
3. **Metadata complete** — Every page in `app/` must have a unique `metadata` export with title and description.
4. **JSON-LD present** — `LocalBusinessJsonLd` must be imported in layout.tsx. FAQ page must have FAQPage schema. Services page must have Service schema.
5. **Contact form endpoint** — Check `components/sections/ContactForm.tsx` for a real Formspree/Netlify endpoint (not a placeholder URL).
6. **Canonical URLs** — Confirm `metadataBase` is set to `https://nyoostudio.com` in layout.tsx.
7. **No console.log** — Search all component files for stray console.log statements.

Use context7 to verify any Next.js metadata or schema conventions if uncertain.

Return a clear checklist with ✅ PASS or ❌ FAIL and a one-line explanation for each item. End with a summary: "Ready to deploy" or "X issues to fix before deploying."
