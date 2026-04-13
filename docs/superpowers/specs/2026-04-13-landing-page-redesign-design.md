# Landing Page Redesign — Design Spec
**Date:** 2026-04-13  
**Status:** Approved

---

## Overview

A full redesign of the Nyoo Studio homepage (`app/page.tsx` and its section components). The new design is inspired by [For the People agency](https://www.forthepeople.agency/) — viewport-filling typography as the primary design element, clean editorial structure, purposeful scroll-driven animation, and a fixed-underlay CTA reveal.

The approved mockup lives at:
`.superpowers/brainstorm/1205-1776062274/content/ftp-v2.html`

---

## Design Direction

**Name:** Editorial Underlay  
**Aesthetic:** Dark, confident, type-forward. Headlines fill the viewport. Decoration is minimal — grain texture and subtle atmospheric light are the only embellishments. No floating orbs. No glassmorphism cards.

**Key departures from the current design:**
- All purple orbs removed (purple is not in the brand palette)
- Glassmorphism `glass-card` pattern broken up — each section has its own visual language
- Headlines scale with `clamp()` to fill the viewport at any screen size
- All sections are mobile-first and fully responsive
- The CTA section is a fixed underlay revealed as you scroll — not a normal document-flow section

---

## Color & Typography

Colors stay on-brand but the emphasis shifts:

| Token | Hex | Usage |
|-------|-----|-------|
| `--black` | `#080808` | Primary background (slightly deeper than current `#0D0A09`) |
| `--cream` | `#F0EBE1` | Body text, headline type |
| `--red` | `#C41230` | CTAs, accents, final headline line, top stripe |
| `--amber` | `#C17F3A` | Section labels, service numbers, founder role labels |
| `--cobalt` | `#1B44D8` | Problem section item numbers only |
| `--muted` | `rgba(240,235,225,0.4)` | Body copy, dimmed headline words |

**Headline scale:** `clamp(52px, 13.5vw, 200px)` — lines fill the viewport width at desktop, scale gracefully to ~52px on mobile.

**Nav background:** `rgba(8,8,8,0.88)` with `backdrop-filter: blur(12px)` and a 1px bottom rule.

---

## Section-by-Section Spec

### 1. Nav
- Fixed, `z-index: 100`
- Logo left, links + CTA button right
- Links hidden below 768px (mobile: logo + CTA only)
- Background: `rgba(8,8,8,0.88)` + blur — **not transparent**

### 2. Hero
- `min-height: 100svh`, flex column, content pinned to bottom
- Top: thin 3px red stripe across full width
- Subtle film grain overlay
- **Meta bar** (location label + "Est. 2024") fades in first, separated from headline by a 1px rule
- **Headline:** 4 lines, each sliding up from below on load with staggered delays (GSAP or CSS `clip-path` / `translateY`):
  - Line 1: `YOUR SOCIAL` — `var(--cream)`
  - Line 2: `MEDIA SHOULD` — `var(--cream)`
  - Line 3: `BE CLOSING` — `var(--cream)`
  - Line 4: `DEALS.` — `var(--red)`
- **Footer row** (fades in after headline): subhead left, two CTAs right
  - Primary: `Book Your Strategy Call →` (red button)
  - Secondary: `See how it works →` (text link)
- No floating orbs, no gradient decoration

### 3. Problem
- Background: `var(--black)`, `z-index: 2`
- Amber eyebrow label with amber line prefix
- **Statement headline** at viewport-filling scale: `"Posting. Getting likes. Phone not ringing."` — the word `ringing.` has a red underline
- Numbered list below (not cards):
  - Cobalt number (`01`, `02`, `03`) + title + body copy
  - Items separated by 1px rules, each scroll-reveals with stagger

### 4. Services (What We Do)
- Background: `var(--black)`, `z-index: 2`
- Left: large headline `"What we do. / What moves / the needle."` — `the needle.` in red
- Right: intro paragraph
- Below: horizontal rows (not cards) — amber number / service name / description side by side at desktop, stacked on mobile
- Each row scroll-reveals with stagger

### 5. Stats (replaces empty Social Proof)
- Background: `var(--cream)`, `z-index: 2` — first contrast break
- Grain overlay (multiply blend)
- Red eyebrow label: `"Why Nyoo Studio"`
- 2×2 grid on mobile, 4×1 on desktop:
  - `27yr` — Combined experience in brand, content & systems
  - `DC` — Metro focused. We know this market.
  - `$0` — Lock-in. Month-to-month by default, always.
  - `2` — Founders. Every client gets both of us.
- Numbers: `clamp(56px, 9vw, 120px)`, bold, tight tracking
- Each cell scroll-reveals with stagger

### 6. Founders
- Background: `var(--black)`, `z-index: 2`
- Header row: large headline `"Not a / faceless / agency."` + "Read our story →" link (right-aligned, baseline-aligned)
- **Photos bleed edge-to-edge** — negative margin removes section padding, photos extend to viewport edges
- Two 3:4 photo blocks side by side, 2px gap
- On image load failure: gradient dark background fallback
- Each photo: name + role overlaid at bottom-left; ghost number (01/02) at bottom-right
- Hover: photo scales to 1.04, desaturation lifts

### 7. Process (How It Works)
- Background: **explicit** `var(--black)`, `z-index: 2`
- Header: large headline + intro paragraph (2-column at desktop)
- Three step columns separated by 1px vertical rules (at desktop) / stacked with bottom rules (mobile)
- Each step: a red bar (40px wide) draws in from the left border on scroll reveal
- Content: `STEP 01/02/03` label → title → description

### 8. FAQ
- Background: `var(--cream)`, `z-index: 2` — second contrast break
- 2-column layout: sticky left (title + intro + "See all FAQs" link) / questions right — stacks on mobile
- 4 questions with amber `+` toggles
- Bottom rule separators

### 9. Final CTA — Fixed Underlay
- `position: fixed; bottom: 0; left: 0; right: 0; z-index: 1` — sits **behind** all other sections
- `min-height: 100svh`
- Background: `var(--black)` with subtle red atmospheric glow at bottom
- A transparent `cta-spacer` div (100svh tall, `z-index: 2`) is placed at the very end of the scroll content — when this enters the viewport, the opaque sections above have scrolled away and the CTA is "revealed"
- **Headline:** dim/bright contrast — `"READY TO KNOW / WHERE YOUR"` in muted, `"NEXT CLIENT"` in cream, `"COMES FROM?"` in red
- **Content entrance:** when spacer first intersects, CTA inner content slides up from `translateY(32px)` to `0` (0.8s, spring easing)
- Footer row: body copy left / red CTA button right

---

## Animation Summary

| Element | Technique | Trigger |
|---------|-----------|---------|
| Hero headline lines | `translateY(105% → 0)`, staggered 180ms | Page load |
| Hero meta bar + footer | `opacity + translateY` fade-up | Page load (after headline) |
| Problem items | `opacity + translateY`, stagger | IntersectionObserver |
| Service rows | `opacity + translateY`, stagger | IntersectionObserver |
| Stat cells | `opacity + translateY`, stagger | IntersectionObserver |
| Founder photo blocks | `opacity + translateY`, stagger | IntersectionObserver |
| Process steps | `opacity + translateY` + red bar width draw | IntersectionObserver |
| CTA content | `opacity + translateY` slide-up | IntersectionObserver on spacer |
| `prefers-reduced-motion` | All animations disabled | Media query |

---

## Responsive Behavior

| Breakpoint | Key changes |
|-----------|-------------|
| < 640px | Hero CTAs stack vertically; nav hides links |
| < 768px | Services intro single column; FAQ stacks (no sticky left); Process steps stack vertically; Stats 2×2 grid |
| ≥ 768px | All two/three column layouts activate |

All font sizes, spacing, and padding use `clamp()` — no fixed pixel breakpoint hacks.

---

## Files to Change

| File | Change |
|------|--------|
| `components/sections/Hero.tsx` | Full rewrite — new layout, line-by-line reveal, meta bar, footer row |
| `components/sections/ProblemSection.tsx` | Replace glass cards with numbered list + large statement headline |
| `components/sections/WhatWeDoSection.tsx` | Replace glass cards with horizontal rows; new headline treatment |
| `components/sections/HowItWorksSection.tsx` | Replace grid cards with 3-column step layout + red bar draw |
| `components/sections/SocialProofSection.tsx` | Replace empty red block with Stats section (cream background, 4 numbers) |
| `components/sections/FoundersTeaser.tsx` | Edge-to-edge photos, overlay captions, new header layout |
| `components/sections/FAQTeaser.tsx` | 2-column sticky layout, cream background |
| `components/sections/CTASection.tsx` | Fixed underlay pattern, spacer div, content entrance animation |
| `app/page.tsx` | Update section composition; ensure section order and props |
| `app/globals.css` | Remove purple orb styles; update/add any new animation keyframes |
| `components/layout/Header.tsx` | Add opaque background + blur to nav |

---

## What Does NOT Change

- Copy (all text content stays the same)
- SEO metadata, JSON-LD, canonical tags
- Page routing and file structure
- The `/book` Calendly page
- Any page other than the homepage
- Font families (Helvetica World + IBM Plex Serif remain)
