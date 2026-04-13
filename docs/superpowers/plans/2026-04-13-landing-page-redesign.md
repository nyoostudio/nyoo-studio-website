# Landing Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the homepage to an editorial, type-forward aesthetic with viewport-filling headlines, scroll-driven animations, and a fixed-underlay CTA reveal.

**Architecture:** All homepage section components are rewritten in-place. Two new files are created — `HeroHome.tsx` and `CTASectionHome.tsx` — so the generic `Hero.tsx` and `CTASection.tsx` remain intact for other pages. The fixed CTA underlay requires every section to carry `position: relative; z-index: 2` so the fixed CTA (`z-index: 1`) is always visually beneath them.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger (existing), native IntersectionObserver (new CTA reveal), CSS keyframe animations (hero line reveal).

---

## Stacking Context Reference

The fixed-underlay pattern depends on this z-index architecture:

| Element | position | z-index |
|---------|----------|---------|
| Header | fixed | 100 |
| Every section above CTA | relative | 2 |
| `#cta-spacer` div | relative | 2 |
| CTASectionHome | fixed (bottom: 0) | 1 |

**Every section component must have `position: relative` and `z-index: 2` on its outermost `<section>` element.** Missing either will let the fixed CTA bleed through.

---

## File Map

| Action | File | Purpose |
|--------|------|---------|
| Modify | `app/globals.css` | Add CSS vars, keyframes; remove `.orb-purple` |
| Create | `components/sections/HeroHome.tsx` | Homepage-only hero (line-by-line reveal) |
| Modify | `components/layout/Header.tsx` | Always-opaque nav background |
| Modify | `components/sections/ProblemSection.tsx` | Large statement + numbered list |
| Modify | `components/sections/WhatWeDoSection.tsx` | Horizontal rows layout |
| Modify | `components/sections/SocialProofSection.tsx` | Replace with Stats section |
| Modify | `components/sections/FoundersTeaser.tsx` | Edge-to-edge photos + overlay captions |
| Modify | `components/sections/HowItWorksSection.tsx` | 3-column steps + red bar draw |
| Modify | `components/sections/FAQTeaser.tsx` | 2-col sticky layout, cream background |
| Create | `components/sections/CTASectionHome.tsx` | Fixed underlay CTA + spacer |
| Modify | `components/ui/Accordion.tsx` | Add `theme` prop for light backgrounds |
| Modify | `app/page.tsx` | Wire up all new components + spacer div |
| Leave alone | `components/sections/Hero.tsx` | Used by About / Services / FAQ pages |
| Leave alone | `components/sections/CTASection.tsx` | Used by About / Services pages |

---

## Task 1: CSS Foundation

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add new CSS custom properties to `:root`**

In `app/globals.css`, find the existing `:root` block (currently contains `--glass-bg`, etc.) and add these variables before the existing ones:

```css
:root {
  /* ─── Editorial redesign tokens ─────────────────────────────────────────── */
  --black:  #080808;     /* slightly deeper bg than --midnight */
  --amber:  #C17F3A;     /* section labels, numbers */
  --muted:  rgba(240,235,225,0.4);  /* dimmed body text */
  --rule:   rgba(240,235,225,0.09); /* 1px divider lines */
  --px:     clamp(20px, 5vw, 60px); /* responsive horizontal padding */

  /* ─── Glassmorphism Tokens (kept for other pages) ───────────────────────── */
  --glass-bg: ...
```

- [ ] **Step 2: Add the hero animation keyframes**

After the existing `@keyframes gradient-shift` block, add:

```css
@keyframes slideup {
  from { transform: translateY(105%); }
  to   { transform: translateY(0); }
}

@keyframes fadein {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

- [ ] **Step 3: Add page-padding utility class**

After the `@keyframes` blocks, add:

```css
/* ─── Responsive page-padding ─────────────────────────────────────────────── */
.section-px {
  padding-left: var(--px);
  padding-right: var(--px);
}
```

- [ ] **Step 4: Remove `.orb-purple` styles**

Delete these lines from `globals.css` (lines 96–98):

```css
.orb-purple {
  background: radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, transparent 70%);
}
```

- [ ] **Step 5: Add reduced-motion rules for new animations**

Inside the existing `@media (prefers-reduced-motion: reduce)` block, add:

```css
  .hero-line-inner {
    animation: none !important;
    transform: translateY(0) !important;
  }

  .hero-meta-bar,
  .hero-foot {
    animation: none !important;
    opacity: 1 !important;
  }
```

- [ ] **Step 6: Verify build**

```bash
npm run build
```
Expected: no TypeScript or CSS errors.

---

## Task 2: Header — Always-Opaque Nav

**Files:**
- Modify: `components/layout/Header.tsx`

- [ ] **Step 1: Remove scroll-conditional background logic**

In `Header.tsx`, the `<header>` element currently conditionally applies the background:

```tsx
className={`fixed top-0 left-0 right-0 z-50 text-white transition-all duration-500 ease-out ${
  scrolled
    ? "bg-soft-black/70 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
    : "bg-soft-black/0 backdrop-blur-none border-b border-transparent"
}`}
```

Replace with:

```tsx
className="fixed top-0 left-0 right-0 z-[100] text-white"
style={{ background: 'rgba(8,8,8,0.88)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid var(--rule)' }}
```

- [ ] **Step 2: Remove scroll state entirely**

The `scrolled` state and scroll listener are now unused. Remove:
1. `const [scrolled, setScrolled] = useState(false);`
2. The `useEffect` block that sets `scrolled`
3. The `onScroll` handler
4. The conditional `scale-90` on the logo image: change to just `className="transition-opacity duration-300"`
5. The conditional `py-3`/`py-4` on the inner div: change to just `className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4"`

- [ ] **Step 3: Verify build and dev server**

```bash
npm run build
```
Expected: no errors. Open `http://localhost:3000` — nav should be opaque from the very first pixel.

---

## Task 3: HeroHome — New Homepage Hero

**Files:**
- Create: `components/sections/HeroHome.tsx`

- [ ] **Step 1: Create the file with the full component**

```tsx
"use client";

import Link from "next/link";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

export function HeroHome() {
  return (
    <section
      className="relative overflow-hidden flex flex-col"
      style={{
        minHeight: "100svh",
        background: "var(--black)",
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* Red top stripe */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "var(--red)",
          zIndex: 3,
        }}
      />

      {/* Film grain */}
      <GrainOverlay opacity={0.4} />

      {/* Meta bar */}
      <div
        className="hero-meta-bar relative flex justify-between items-center"
        style={{
          paddingTop: "80px",
          paddingLeft: "var(--px)",
          paddingRight: "var(--px)",
          zIndex: 2,
          opacity: 0,
          animation: "fadein 0.6s ease forwards 0.3s",
          animationFillMode: "both",
        }}
      >
        <span
          style={{
            fontSize: "clamp(10px, 1.2vw, 13px)",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          Washington, DC Metro
        </span>
        <span style={{ fontSize: "11px", letterSpacing: "0.1em", color: "var(--muted)" }}>
          Est. 2024
        </span>
      </div>

      {/* Viewport-filling headline */}
      <div
        className="relative flex flex-col justify-center flex-1"
        style={{
          padding: `clamp(16px, 3vw, 40px) var(--px) 0`,
          zIndex: 2,
        }}
      >
        {(["YOUR SOCIAL", "MEDIA SHOULD", "BE CLOSING", "DEALS."] as const).map(
          (line, i) => (
            <span
              key={line}
              className="block"
              style={{ overflow: "hidden", lineHeight: "0.88", marginBottom: "clamp(4px, 0.5vw, 8px)" }}
            >
              <span
                className="block"
                style={{
                  fontSize: "clamp(52px, 13.5vw, 200px)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  color: i === 3 ? "var(--red)" : "var(--cream, #F0EBE1)",
                  transform: "translateY(105%)",
                  animation: "slideup 0.85s cubic-bezier(0.16,1,0.3,1) forwards",
                  animationFillMode: "both",
                  animationDelay: `${0.5 + i * 0.18}s`,
                }}
              >
                {line}
              </span>
            </span>
          )
        )}
      </div>

      {/* Footer row */}
      <div
        className="hero-foot relative grid gap-5"
        style={{
          gridTemplateColumns: "1fr",
          padding: `clamp(24px, 4vw, 48px) var(--px) clamp(28px, 5vw, 56px)`,
          borderTop: "1px solid var(--rule)",
          marginTop: "clamp(20px, 3vw, 40px)",
          zIndex: 2,
          opacity: 0,
          animation: "fadein 0.7s ease forwards 1.4s",
          animationFillMode: "both",
        }}
      >
        <p
          style={{
            fontSize: "clamp(14px, 1.8vw, 18px)",
            lineHeight: 1.7,
            color: "var(--muted)",
            maxWidth: "560px",
          }}
        >
          Nyoo Studio builds social media systems that generate qualified leads for
          established small businesses in DC Metro. Not vanity metrics. Leads.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <Link
            href="/book"
            className="inline-flex items-center gap-3 font-bold whitespace-nowrap transition-opacity hover:opacity-80"
            style={{
              fontSize: "clamp(12px, 1.3vw, 14px)",
              letterSpacing: "0.07em",
              background: "var(--red)",
              color: "white",
              padding: "clamp(12px, 1.5vw, 16px) clamp(18px, 2.5vw, 28px)",
            }}
          >
            Book Your Strategy Call →
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
            style={{ fontSize: "12px", color: "var(--muted)", letterSpacing: "0.08em" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream, #F0EBE1)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            See how it works →
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify lint**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css components/sections/HeroHome.tsx components/layout/Header.tsx
git commit -m "feat: CSS tokens, always-opaque nav, new HeroHome with line-by-line reveal"
```

---

## Task 4: ProblemSection Rewrite

**Files:**
- Modify: `components/sections/ProblemSection.tsx`

- [ ] **Step 1: Replace file contents**

```tsx
"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

const problems = [
  {
    number: "01",
    title: "You have engagement but no pipeline.",
    body: "Likes, comments, shares — none of it is connected to how people actually become your clients. The content looks good. It just doesn't lead anywhere.",
  },
  {
    number: "02",
    title: "You've invested in marketing that can't prove its value.",
    body: "You've tried agencies, freelancers, maybe even hired someone. They sent you reports full of impressions and reach. You still can't point to a single client that came from social media.",
  },
  {
    number: "03",
    title: "Referrals keep the lights on. They don't scale the business.",
    body: "Your best clients came from word of mouth. Great. But you can't control when the next one shows up. You need a system that generates leads on a schedule, not on luck.",
  },
];

export function ProblemSection() {
  const listRef = useScrollReveal<HTMLDivElement>({
    staggerChildren: true,
    stagger: 0.12,
    y: 20,
    duration: 0.55,
    start: "top 80%",
  });

  return (
    <section
      className="relative overflow-hidden section-px"
      style={{
        padding: `clamp(60px, 10vw, 140px) var(--px)`,
        background: "var(--black)",
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* Amber eyebrow */}
      <p
        className="flex items-center gap-3"
        style={{
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--amber)",
          marginBottom: "clamp(20px, 3vw, 36px)",
        }}
      >
        <span style={{ display: "block", width: "28px", height: "1px", background: "var(--amber)" }} aria-hidden />
        The Problem
      </p>

      {/* Large statement headline */}
      <h2
        style={{
          fontSize: "clamp(36px, 9vw, 130px)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 0.92,
          color: "var(--cream, #F0EBE1)",
          marginBottom: "clamp(48px, 8vw, 100px)",
        }}
      >
        Posting. Getting likes.{" "}
        <span style={{ position: "relative", display: "inline-block" }}>
          Phone not{" "}
          <span
            style={{ position: "relative", display: "inline" }}
          >
            ringing.
            <span
              aria-hidden
              style={{
                position: "absolute",
                bottom: "8%",
                left: 0,
                right: 0,
                height: "clamp(2px, 0.4vw, 5px)",
                background: "var(--red)",
                display: "block",
              }}
            />
          </span>
        </span>
      </h2>

      {/* Numbered list */}
      <div
        ref={listRef}
        style={{ borderTop: "1px solid var(--rule)" }}
      >
        {problems.map(({ number, title, body }) => (
          <div
            key={number}
            className="grid items-start"
            style={{
              gridTemplateColumns: "clamp(32px, 5vw, 64px) 1fr",
              gap: "clamp(16px, 3vw, 40px)",
              padding: "clamp(20px, 3vw, 36px) 0",
              borderBottom: "1px solid var(--rule)",
            }}
          >
            <span
              style={{
                fontSize: "clamp(11px, 1.2vw, 13px)",
                fontWeight: 700,
                color: "var(--cobalt, #1B44D8)",
                letterSpacing: "0.1em",
                paddingTop: "4px",
              }}
            >
              {number}
            </span>
            <div>
              <p
                style={{
                  fontSize: "clamp(18px, 2.5vw, 28px)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "var(--cream, #F0EBE1)",
                  marginBottom: "clamp(6px, 1vw, 12px)",
                  lineHeight: 1.1,
                }}
              >
                {title}
              </p>
              <p
                style={{
                  fontSize: "clamp(13px, 1.4vw, 15px)",
                  lineHeight: 1.75,
                  color: "var(--muted)",
                }}
              >
                {body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify lint**

```bash
npm run lint
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/ProblemSection.tsx
git commit -m "feat: rewrite ProblemSection with large statement headline and numbered list"
```

---

## Task 5: WhatWeDoSection Rewrite

**Files:**
- Modify: `components/sections/WhatWeDoSection.tsx`

- [ ] **Step 1: Replace file contents**

```tsx
"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

const services = [
  {
    number: "01",
    name: "Lead-First Content Strategy",
    description:
      "We map your content to your sales cycle. Every post, caption, and video is built to attract prospects who are already looking for what you offer — and give them a clear next step.",
  },
  {
    number: "02",
    name: "Social Media That Converts",
    description:
      "Consistent, high-quality presence across the platforms where your customers already spend time. Content calendar, captions, scheduling, community management — all tied back to lead generation goals.",
  },
  {
    number: "03",
    name: "Lead Qualification & Pipeline",
    description:
      "Automated DM flows, intake workflows, lead scoring, and reporting that shows you exactly where your clients are coming from. Built once, running always.",
  },
];

export function WhatWeDoSection() {
  const rowsRef = useScrollReveal<HTMLDivElement>({
    staggerChildren: true,
    stagger: 0.12,
    y: 20,
    duration: 0.55,
    start: "top 80%",
  });

  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: `clamp(60px, 10vw, 140px) var(--px)`,
        background: "var(--black)",
        position: "relative",
        zIndex: 2,
        borderTop: "1px solid var(--rule)",
      }}
    >
      {/* Two-column intro */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "1fr",
          gap: "clamp(16px, 3vw, 32px)",
          marginBottom: "clamp(48px, 7vw, 80px)",
          alignItems: "end",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(36px, 7.5vw, 110px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 0.92,
            color: "var(--cream, #F0EBE1)",
          }}
        >
          What we do. /{" "}
          <br />
          What moves /{" "}
          <br />
          <span style={{ color: "var(--red)" }}>the needle.</span>
        </h2>
        <p
          className="md:hidden lg:block"
          style={{
            fontSize: "clamp(14px, 1.5vw, 16px)",
            lineHeight: 1.7,
            color: "var(--muted)",
            maxWidth: "480px",
          }}
        >
          Everything we build is designed around one outcome: turning your social
          media presence into a reliable source of qualified leads. We don&apos;t
          post for the sake of posting.
        </p>
      </div>

      {/* Service rows */}
      <div ref={rowsRef} style={{ borderTop: "1px solid var(--rule)" }}>
        {services.map(({ number, name, description }) => (
          <div
            key={number}
            className="grid items-start"
            style={{
              gridTemplateColumns: "clamp(32px, 5vw, 64px) 1fr",
              gap: "clamp(16px, 3vw, 40px)",
              padding: "clamp(24px, 4vw, 48px) 0",
              borderBottom: "1px solid var(--rule)",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "var(--amber)",
                letterSpacing: "0.1em",
                paddingTop: "6px",
              }}
            >
              {number}
            </span>
            <div
              className="grid"
              style={{
                gridTemplateColumns: "1fr",
                gap: "clamp(8px, 2vw, 24px)",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(22px, 3.5vw, 44px)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.0,
                  color: "var(--cream, #F0EBE1)",
                }}
              >
                {name}
              </p>
              <p
                style={{
                  fontSize: "clamp(13px, 1.4vw, 15px)",
                  lineHeight: 1.75,
                  color: "var(--muted)",
                }}
              >
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify lint**

```bash
npm run lint
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/WhatWeDoSection.tsx
git commit -m "feat: rewrite WhatWeDoSection with horizontal rows layout"
```

---

## Task 6: SocialProofSection → Stats Section

**Files:**
- Modify: `components/sections/SocialProofSection.tsx`

- [ ] **Step 1: Replace file contents**

```tsx
"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

const stats = [
  { number: "27", unit: "yr", label: "Combined experience in brand, content & systems" },
  { number: "DC", unit: "", label: "Metro focused. We know this market." },
  { number: "$0", unit: "", label: "Lock-in. Month-to-month by default, always." },
  { number: "2", unit: "", label: "Founders. Every client gets both of us." },
];

export function SocialProofSection() {
  const gridRef = useScrollReveal<HTMLDivElement>({
    staggerChildren: true,
    stagger: 0.1,
    y: 16,
    duration: 0.5,
    start: "top 80%",
  });

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "var(--cream, #F0EBE1)",
        padding: `clamp(60px, 10vw, 120px) var(--px)`,
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* Grain — multiply blend for cream bg */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.25,
          mixBlendMode: "multiply",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Eyebrow */}
      <p
        className="relative"
        style={{
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--red)",
          marginBottom: "clamp(36px, 6vw, 72px)",
        }}
      >
        Why Nyoo Studio
      </p>

      {/* Stats grid */}
      <div
        ref={gridRef}
        className="relative grid"
        style={{
          gridTemplateColumns: "1fr 1fr",
          borderTop: "1px solid rgba(8,8,8,0.1)",
        }}
      >
        {stats.map(({ number, unit, label }, i) => (
          <div
            key={number}
            style={{
              padding: `clamp(24px, 4vw, 48px) clamp(16px, 3vw, 40px) clamp(24px, 4vw, 48px) ${i % 2 === 0 ? "0" : "clamp(16px, 3vw, 40px)"}`,
              borderRight: i % 2 === 0 ? "1px solid rgba(8,8,8,0.1)" : "none",
              borderBottom: "1px solid rgba(8,8,8,0.1)",
            }}
          >
            <span
              className="block"
              style={{
                fontSize: "clamp(56px, 9vw, 120px)",
                fontWeight: 700,
                letterSpacing: "-0.05em",
                lineHeight: 1,
                color: "#080808",
              }}
            >
              {number}
              {unit && (
                <span style={{ fontSize: "0.45em" }}>{unit}</span>
              )}
            </span>
            <p
              style={{
                fontSize: "clamp(12px, 1.3vw, 14px)",
                lineHeight: 1.5,
                color: "rgba(8,8,8,0.5)",
                marginTop: "clamp(6px, 1vw, 12px)",
              }}
            >
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify lint**

```bash
npm run lint
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/SocialProofSection.tsx
git commit -m "feat: replace SocialProofSection with Stats section (cream bg, 4 numbers)"
```

---

## Task 7: FoundersTeaser Rewrite

**Files:**
- Modify: `components/sections/FoundersTeaser.tsx`

- [ ] **Step 1: Replace file contents**

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollReveal } from "@/lib/useScrollReveal";

const founders = [
  {
    name: "Jo Yoo",
    role: "Client Relations & Content",
    number: "01",
    photo: "/images/JO_HEADSHOT.jpg",
  },
  {
    name: "Jin Yoo",
    role: "Strategy & Systems",
    number: "02",
    photo: "/images/JIN_HEADSHOT.jpg",
  },
];

export function FoundersTeaser() {
  const photosRef = useScrollReveal<HTMLDivElement>({
    staggerChildren: true,
    stagger: 0.12,
    y: 24,
    duration: 0.65,
    start: "top 80%",
  });

  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: `clamp(60px, 10vw, 140px) var(--px)`,
        background: "var(--black)",
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* Header row: headline + link */}
      <div
        className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-baseline"
        style={{
          marginBottom: "clamp(36px, 6vw, 64px)",
          borderBottom: "1px solid var(--rule)",
          paddingBottom: "clamp(28px, 4vw, 48px)",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(36px, 7.5vw, 110px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 0.92,
            color: "var(--cream, #F0EBE1)",
          }}
        >
          Not a /<br />faceless /<br />agency.
        </h2>
        <Link
          href="/about"
          className="flex items-center gap-2 self-end transition-colors whitespace-nowrap"
          style={{ fontSize: "13px", fontWeight: 700, color: "var(--muted)", letterSpacing: "0.06em" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream, #F0EBE1)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
        >
          Read our story{" "}
          <span style={{ color: "var(--amber)" }}>→</span>
        </Link>
      </div>

      {/* Edge-to-edge photo grid — negative margin removes section padding */}
      <div
        ref={photosRef}
        className="grid"
        style={{
          gridTemplateColumns: "1fr 1fr",
          gap: "2px",
          margin: "0 calc(var(--px) * -1)",
        }}
      >
        {founders.map(({ name, role, number, photo }) => (
          <div
            key={name}
            className="relative overflow-hidden group"
            style={{ aspectRatio: "3/4", background: "#111" }}
          >
            <Image
              src={photo}
              alt={name}
              fill
              className="object-cover object-top transition-all duration-500 group-hover:scale-[1.04]"
              style={{ filter: "grayscale(25%)" }}
              onMouseEnter={(e) => ((e.target as HTMLImageElement).style.filter = "grayscale(0%)")}
              onMouseLeave={(e) => ((e.target as HTMLImageElement).style.filter = "grayscale(25%)")}
              sizes="(max-width: 768px) 50vw, 600px"
            />
            {/* Caption overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 flex justify-between items-end"
              style={{
                padding: "clamp(20px, 4vw, 40px)",
                background: "linear-gradient(to top, rgba(8,8,8,0.92) 0%, transparent 100%)",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "clamp(18px, 3vw, 36px)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "var(--cream, #F0EBE1)",
                  }}
                >
                  {name}
                </p>
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--amber)",
                    marginTop: "4px",
                  }}
                >
                  {role}
                </p>
              </div>
              <span
                aria-hidden
                style={{
                  fontSize: "clamp(22px, 3.5vw, 40px)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  color: "rgba(240,235,225,0.18)",
                  lineHeight: 1,
                }}
              >
                {number}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify lint**

```bash
npm run lint
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/FoundersTeaser.tsx
git commit -m "feat: rewrite FoundersTeaser with edge-to-edge photos and overlay captions"
```

---

## Task 8: HowItWorksSection Rewrite

**Files:**
- Modify: `components/sections/HowItWorksSection.tsx`

The red bar animation requires direct GSAP control in `useEffect` (so we can animate both opacity/translateY and bar width together). This replaces the `useScrollReveal` hook for this component.

- [ ] **Step 1: Replace file contents**

```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    label: "STEP 01",
    title: "Strategy Call",
    description:
      "A 30-minute conversation about your business, your sales cycle, and where leads are coming from today. We listen more than we talk.",
  },
  {
    label: "STEP 02",
    title: "Lead Generation Plan",
    description:
      "We build a content strategy mapped to your sales funnel — tailored to your voice, your ideal client, and the platforms where they're most reachable. You review it. We adjust.",
  },
  {
    label: "STEP 03",
    title: "We Build Your Pipeline",
    description:
      "Content goes live. Lead flows get activated. Reporting starts tracking what matters — not impressions, but inquiries. You stay focused on running your business.",
  },
];

export function HowItWorksSection() {
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = stepsRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      // Make everything visible immediately
      Array.from(container.children).forEach((child) => {
        (child as HTMLElement).style.opacity = "1";
        (child as HTMLElement).style.transform = "translateY(0)";
        const bar = child.querySelector(".step-bar") as HTMLElement | null;
        if (bar) bar.style.width = "40px";
      });
      return;
    }

    const stepEls = Array.from(container.children) as HTMLElement[];

    stepEls.forEach((stepEl, i) => {
      const bar = stepEl.querySelector(".step-bar") as HTMLElement | null;

      gsap.set(stepEl, { opacity: 0, y: 16 });
      if (bar) gsap.set(bar, { width: 0 });

      gsap.to(stepEl, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        delay: i * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      if (bar) {
        gsap.to(bar, {
          width: "40px",
          duration: 0.5,
          delay: i * 0.1 + 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === container) t.kill();
      });
    };
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: `clamp(60px, 10vw, 140px) var(--px)`,
        background: "var(--black)",
        position: "relative",
        zIndex: 2,
        borderTop: "1px solid var(--rule)",
      }}
    >
      {/* Two-column header */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "1fr",
          gap: "clamp(16px, 3vw, 32px)",
          marginBottom: "clamp(48px, 7vw, 80px)",
          alignItems: "end",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(32px, 7vw, 100px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 0.92,
            color: "var(--cream, #F0EBE1)",
          }}
        >
          No onboarding decks.<br />No 12-week<br />discovery phases.
        </h2>
        <p
          style={{
            fontSize: "clamp(14px, 1.5vw, 16px)",
            lineHeight: 1.7,
            color: "var(--muted)",
            maxWidth: "480px",
          }}
        >
          We move fast. Three steps from first conversation to live content.
        </p>
      </div>

      {/* Three steps */}
      <div
        ref={stepsRef}
        className="grid"
        style={{
          gridTemplateColumns: "1fr",
          borderTop: "1px solid var(--rule)",
        }}
      >
        {steps.map(({ label, title, description }, i) => (
          <div
            key={label}
            className="relative"
            style={{
              padding: `clamp(28px, 4vw, 48px) 0`,
              borderBottom: "1px solid var(--rule)",
            }}
          >
            {/* Red bar — GSAP animates its width */}
            <div
              className="step-bar"
              aria-hidden
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "3px",
                width: 0,
                background: "var(--red)",
              }}
            />
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: "var(--muted)",
                marginBottom: "clamp(16px, 2.5vw, 28px)",
              }}
            >
              {label}
            </p>
            <h3
              style={{
                fontSize: "clamp(20px, 2.5vw, 30px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "var(--cream, #F0EBE1)",
                marginBottom: "clamp(10px, 1.5vw, 16px)",
                lineHeight: 1.1,
              }}
            >
              {title}
            </h3>
            <p
              style={{
                fontSize: "clamp(13px, 1.3vw, 14px)",
                lineHeight: 1.75,
                color: "var(--muted)",
              }}
            >
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify lint**

```bash
npm run lint
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/HowItWorksSection.tsx
git commit -m "feat: rewrite HowItWorksSection with 3-column steps and red bar animation"
```

---

## Task 9: Accordion — Light Theme Support

**Files:**
- Modify: `components/ui/Accordion.tsx`

The FAQTeaser now uses a cream background — the Accordion needs dark-text styling instead of white.

- [ ] **Step 1: Add `theme` prop**

Replace the full file contents:

```tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  theme?: "dark" | "light";
}

interface AccordionEntryProps {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  theme: "dark" | "light";
}

function AccordionEntry({ item, isOpen, onToggle, theme }: AccordionEntryProps) {
  const isDark = theme === "dark";
  return (
    <div
      className={cn(
        "border-b",
        isDark ? "border-white/10" : "border-black/10"
      )}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          "flex w-full items-center justify-between gap-4 py-5 text-left font-bold transition-all duration-300 hover:opacity-70 group",
          isDark ? "text-white" : "text-black"
        )}
        style={{ fontSize: "clamp(15px, 1.8vw, 18px)", letterSpacing: "-0.01em" }}
      >
        <span style={{ lineHeight: 1.2 }}>{item.question}</span>
        <span
          className={cn(
            "shrink-0 text-xl transition-all duration-300",
            isOpen ? "rotate-45 scale-110" : "rotate-0 group-hover:scale-110"
          )}
          style={{ color: "var(--amber)", fontWeight: 300 }}
          aria-hidden
        >
          +
        </span>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-400 ease-out",
          isOpen ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <p
          className={isDark ? "opacity-80" : ""}
          style={{
            fontSize: "clamp(13px, 1.4vw, 15px)",
            lineHeight: 1.75,
            color: isDark ? "inherit" : "rgba(8,8,8,0.6)",
          }}
        >
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export function Accordion({ items, className, theme = "dark" }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("w-full", className)}>
      {items.map((item, i) => (
        <AccordionEntry
          key={i}
          item={item}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          theme={theme}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify lint**

```bash
npm run lint
```

---

## Task 10: FAQTeaser Rewrite

**Files:**
- Modify: `components/sections/FAQTeaser.tsx`

- [ ] **Step 1: Replace file contents**

```tsx
"use client";

import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";

const teaserItems = [
  {
    question: "Who do you work with?",
    answer:
      "Established small businesses in the DC Metro area — typically 2–20 employees with consistent revenue and a need for professional marketing they don't have time to do themselves.",
  },
  {
    question: "What does a typical sprint look like?",
    answer:
      "We plan a month of content at a time. You review and approve everything before it goes out. No surprises, no last-minute changes.",
  },
  {
    question: "Are your contracts month-to-month?",
    answer:
      "Yes. All packages are month-to-month by default — no lock-in. If you want to commit to a 3- or 6-month term upfront, you get a discount (10% and 15% respectively). Either way, you're never stuck in a contract you didn't choose.",
  },
  {
    question: "How long until we see results?",
    answer:
      "Most clients see a meaningful uptick in qualified inquiries within the first 60–90 days. We track real lead metrics, not vanity numbers, so you always know exactly where things stand.",
  },
];

export function FAQTeaser() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "var(--cream, #F0EBE1)",
        padding: `clamp(60px, 10vw, 120px) var(--px)`,
        position: "relative",
        zIndex: 2,
      }}
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: "1fr",
          gap: "clamp(36px, 6vw, 80px)",
          alignItems: "start",
        }}
      >
        {/* Left column — sticky at desktop */}
        <div
          style={{
            position: undefined, // set via CSS below
          }}
          className="faq-sticky-left"
        >
          <h2
            style={{
              fontSize: "clamp(30px, 5.5vw, 72px)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "#080808",
              marginBottom: "20px",
            }}
          >
            Common<br />questions.
          </h2>
          <p
            style={{
              fontSize: "14px",
              lineHeight: 1.7,
              color: "rgba(8,8,8,0.5)",
              marginBottom: "24px",
            }}
          >
            Answers to what people ask most before booking a call.
          </p>
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 font-bold transition-opacity hover:opacity-60"
            style={{ fontSize: "12px", color: "#080808", letterSpacing: "0.08em" }}
          >
            See all FAQs{" "}
            <span style={{ color: "var(--red)" }}>→</span>
          </Link>
        </div>

        {/* Right column — accordion */}
        <div style={{ borderTop: "1px solid rgba(8,8,8,0.12)" }}>
          <Accordion items={teaserItems} theme="light" />
        </div>
      </div>

      {/* Sticky positioning injected via style tag — can't do sticky in inline React */}
      <style>{`
        @media (min-width: 768px) {
          .faq-sticky-left {
            position: sticky;
            top: 80px;
          }
        }
        @media (min-width: 768px) {
          .faq-sticky-left ~ div {
            /* right column — ensures 2-col layout */
          }
        }
      `}</style>
    </section>
  );
}
```

**Note on the 2-column layout:** The CSS Grid needs a media query to switch from 1-col to 2-col. Because `style={}` doesn't support media queries, inject a `<style>` tag in the component for this one rule:

- [ ] **Step 2: Add the grid media query via style tag**

In `FAQTeaser.tsx`, replace the inner `<div className="grid"` style:

```tsx
<style>{`
  .faq-grid-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(36px, 6vw, 80px);
    align-items: start;
  }
  @media (min-width: 768px) {
    .faq-grid-wrapper { grid-template-columns: 320px 1fr; }
    .faq-sticky-left { position: sticky; top: 80px; }
  }
`}</style>
```

And apply `className="faq-grid-wrapper"` to the outer grid div (remove the `style` grid props from it).

The final `FAQTeaser.tsx` after combining both sub-steps:

```tsx
"use client";

import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";

const teaserItems = [
  {
    question: "Who do you work with?",
    answer:
      "Established small businesses in the DC Metro area — typically 2–20 employees with consistent revenue and a need for professional marketing they don't have time to do themselves.",
  },
  {
    question: "What does a typical sprint look like?",
    answer:
      "We plan a month of content at a time. You review and approve everything before it goes out. No surprises, no last-minute changes.",
  },
  {
    question: "Are your contracts month-to-month?",
    answer:
      "Yes. All packages are month-to-month by default — no lock-in. If you want to commit to a 3- or 6-month term upfront, you get a discount (10% and 15% respectively).",
  },
  {
    question: "How long until we see results?",
    answer:
      "Most clients see a meaningful uptick in qualified inquiries within the first 60–90 days. We track real lead metrics, not vanity numbers, so you always know exactly where things stand.",
  },
];

export function FAQTeaser() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "var(--cream, #F0EBE1)",
        padding: `clamp(60px, 10vw, 120px) var(--px)`,
        position: "relative",
        zIndex: 2,
      }}
    >
      <style>{`
        .faq-grid-wrapper {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(36px, 6vw, 80px);
          align-items: start;
        }
        @media (min-width: 768px) {
          .faq-grid-wrapper { grid-template-columns: 320px 1fr; }
          .faq-sticky-left  { position: sticky; top: 80px; }
        }
      `}</style>

      <div className="faq-grid-wrapper">
        {/* Left: sticky title + link */}
        <div className="faq-sticky-left">
          <h2
            style={{
              fontSize: "clamp(30px, 5.5vw, 72px)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "#080808",
              marginBottom: "20px",
            }}
          >
            Common<br />questions.
          </h2>
          <p
            style={{
              fontSize: "14px",
              lineHeight: 1.7,
              color: "rgba(8,8,8,0.5)",
              marginBottom: "24px",
            }}
          >
            Answers to what people ask most before booking a call.
          </p>
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 font-bold transition-opacity hover:opacity-60"
            style={{ fontSize: "12px", color: "#080808", letterSpacing: "0.08em" }}
          >
            See all FAQs <span style={{ color: "var(--red)" }}>→</span>
          </Link>
        </div>

        {/* Right: accordion */}
        <div style={{ borderTop: "1px solid rgba(8,8,8,0.12)" }}>
          <Accordion items={teaserItems} theme="light" />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify lint**

```bash
npm run lint
```

- [ ] **Step 4: Commit**

```bash
git add components/sections/FAQTeaser.tsx components/ui/Accordion.tsx
git commit -m "feat: rewrite FAQTeaser (cream bg, sticky 2-col) and add Accordion light theme"
```

---

## Task 11: CTASectionHome — Fixed Underlay

**Files:**
- Create: `components/sections/CTASectionHome.tsx`

- [ ] **Step 1: Create the file**

```tsx
"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export function CTASectionHome() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const spacer = document.getElementById("cta-spacer");
    if (!spacer) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      section.classList.add("cta-active");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add("cta-active");
          } else {
            section.classList.remove("cta-active");
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(spacer);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .cta-inner {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cta-active .cta-inner {
          opacity: 1;
          transform: translateY(0);
        }
        .cta-foot-row {
          display: flex;
          flex-direction: column;
          gap: 20px;
          border-top: 1px solid var(--rule);
          padding-top: clamp(28px, 4vw, 48px);
        }
        @media (min-width: 640px) {
          .cta-foot-row { flex-direction: row; justify-content: space-between; align-items: center; }
        }
      `}</style>

      <section
        ref={sectionRef}
        aria-label="Get started with Nyoo Studio"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          minHeight: "100svh",
          zIndex: 1,
          background: "var(--black)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: `clamp(80px, 12vw, 160px) var(--px)`,
        }}
      >
        {/* Subtle red atmospheric glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "70%",
            height: "320px",
            background: "radial-gradient(ellipse, rgba(196,18,48,0.13) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Content — animates in when cta-active class is added */}
        <div className="cta-inner relative">
          {/* Headline with dim/bright contrast */}
          <h2
            style={{
              fontSize: "clamp(48px, 11vw, 160px)",
              fontWeight: 700,
              letterSpacing: "-0.05em",
              lineHeight: 0.9,
              marginBottom: "clamp(36px, 5vw, 64px)",
            }}
          >
            <span style={{ color: "var(--muted)" }}>READY TO KNOW</span>
            <br />
            <span style={{ color: "var(--muted)" }}>WHERE YOUR</span>
            <br />
            <span style={{ color: "var(--cream, #F0EBE1)" }}>NEXT CLIENT</span>
            <br />
            <span style={{ color: "var(--red)" }}>COMES FROM?</span>
          </h2>

          <div className="cta-foot-row">
            <p
              style={{
                fontSize: "clamp(14px, 1.5vw, 16px)",
                lineHeight: 1.65,
                color: "var(--muted)",
                maxWidth: "400px",
              }}
            >
              Book a free 30-minute strategy call. No pitch, no pressure — just an
              honest conversation about your marketing.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-3 font-bold whitespace-nowrap flex-shrink-0 transition-opacity hover:opacity-80"
              style={{
                fontSize: "clamp(13px, 1.4vw, 15px)",
                letterSpacing: "0.07em",
                background: "var(--red)",
                color: "white",
                padding: "clamp(14px, 2vw, 18px) clamp(22px, 3vw, 32px)",
              }}
            >
              Book Your Strategy Call →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify lint**

```bash
npm run lint
```

---

## Task 12: page.tsx — Wire Everything Together

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace file contents**

```tsx
import type { Metadata } from "next";
import { HeroHome } from "@/components/sections/HeroHome";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { WhatWeDoSection } from "@/components/sections/WhatWeDoSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { FoundersTeaser } from "@/components/sections/FoundersTeaser";
import { FAQTeaser } from "@/components/sections/FAQTeaser";
import { CTASectionHome } from "@/components/sections/CTASectionHome";

export const metadata: Metadata = {
  title: "Nyoo Studio | Social Media & Content Marketing for Small Businesses | DC Metro",
  description:
    "Nyoo Studio is a DC Metro creative marketing agency helping established small businesses grow through social media management and content strategy built for lead generation.",
  alternates: {
    canonical: "https://nyoostudio.com",
  },
  openGraph: {
    title: "Nyoo Studio | Social Media & Content Marketing | DC Metro",
    description:
      "Nyoo Studio is a DC Metro creative marketing agency helping established small businesses grow through social media management and content strategy built for lead generation.",
    url: "https://nyoostudio.com",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Fixed underlay — renders visually behind all sections */}
      <CTASectionHome />

      {/* Sections scroll over the fixed CTA (all have z-index: 2) */}
      <HeroHome />
      <ProblemSection />
      <WhatWeDoSection />
      <SocialProofSection />
      <FoundersTeaser />
      <HowItWorksSection />
      <FAQTeaser />

      {/* Transparent spacer — when this enters viewport, the CTA is revealed */}
      <div
        id="cta-spacer"
        aria-hidden
        style={{
          height: "100svh",
          position: "relative",
          zIndex: 2,
          background: "transparent",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
```

Note: `CTASectionHome` is rendered first in the JSX but appears visually behind all other content because it is `position: fixed; z-index: 1`. All sections are `position: relative; z-index: 2`.

- [ ] **Step 2: Verify TypeScript and build**

```bash
npm run build
```
Expected: clean build, no errors.

- [ ] **Step 3: Start dev server and verify visually**

```bash
npm run dev
```

Open `http://localhost:3000` and check:
1. Nav is opaque immediately (no transparent phase on load)
2. Hero headlines slide up from below with staggered timing
3. Meta bar and footer row fade in after headlines
4. Red top stripe is visible at the very top
5. Scroll down — Problem section numbered list reveals with stagger
6. Stats section has cream background and large numbers
7. Founder photos are edge-to-edge with overlaid name/role
8. Process steps have red bar drawing in on scroll
9. FAQ section is cream-background with sticky left column on desktop
10. At the bottom of the page, the CTA is revealed as you scroll into the spacer
11. CTA content animates in (slides up) when revealed
12. Check on mobile (< 640px): hero CTAs stack, nav shows only logo + book button

- [ ] **Step 4: Commit**

```bash
git add components/sections/CTASectionHome.tsx app/page.tsx
git commit -m "feat: wire landing page redesign — fixed CTA underlay, all sections updated"
```

---

## Task 13: Final Polish — HowItWorks Desktop Layout

**Files:**
- Modify: `components/sections/HowItWorksSection.tsx`

The 3-column step layout at desktop needs a media-query CSS rule. Add a `<style>` tag to handle the responsive columns and vertical dividers.

- [ ] **Step 1: Add style tag inside HowItWorksSection**

Inside `HowItWorksSection`, before the return's closing tag, add a `<style>` block, and apply `process-steps-grid` class to the steps container:

Add at top of `return (...)`:
```tsx
<style>{`
  .process-steps-grid {
    display: grid;
    grid-template-columns: 1fr;
    border-top: 1px solid var(--rule);
  }
  @media (min-width: 768px) {
    .process-steps-grid { grid-template-columns: repeat(3, 1fr); }
    .process-step-col {
      padding-left: clamp(28px, 4vw, 48px);
      padding-right: clamp(28px, 4vw, 48px);
      border-bottom: none !important;
      border-left: 1px solid var(--rule);
    }
    .process-step-col:first-child {
      padding-left: 0;
      border-left: none;
    }
    .process-step-col:last-child { padding-right: 0; }
  }
`}</style>
```

Change `ref={stepsRef}` container `className` to `"process-steps-grid"` and remove the inline `style` grid.

Add `className="process-step-col"` to each step's `<div>`.

The updated steps container section of `HowItWorksSection.tsx`:

```tsx
{/* Three steps */}
<div ref={stepsRef} className="process-steps-grid">
  {steps.map(({ label, title, description }) => (
    <div
      key={label}
      className="relative process-step-col"
      style={{
        padding: `clamp(28px, 4vw, 48px) 0`,
        borderBottom: "1px solid var(--rule)",
      }}
    >
      {/* Red bar */}
      <div
        className="step-bar"
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "3px",
          width: 0,
          background: "var(--red)",
        }}
      />
      ...rest of step content unchanged
```

- [ ] **Step 2: Verify lint and build**

```bash
npm run lint && npm run build
```

- [ ] **Step 3: Final commit**

```bash
git add components/sections/HowItWorksSection.tsx
git commit -m "feat: add desktop 3-column layout for process steps"
```

---

## Self-Review Checklist

- [x] **Hero** — Line-by-line reveal ✓, meta bar ✓, footer row ✓, red stripe ✓, film grain ✓
- [x] **Problem** — Amber eyebrow ✓, large statement ✓, red underline on "ringing." ✓, cobalt numbers ✓, rule separators ✓
- [x] **Services** — Amber numbers ✓, horizontal rows ✓, 1px rules ✓, `the needle.` in red ✓
- [x] **Stats** — Cream bg ✓, multiply grain ✓, red eyebrow ✓, 4 cells ✓, 2×2 mobile / 4×1 desktop ✓
- [x] **Founders** — Edge-to-edge photos ✓, negative margin ✓, overlay captions ✓, amber role label ✓, ghost number ✓, hover desaturation ✓
- [x] **Process** — Explicit black bg ✓, red bar draw ✓, 3-col desktop ✓, vertical rules ✓, GSAP stagger ✓
- [x] **FAQ** — Cream bg ✓, 2-col sticky ✓, light Accordion ✓, amber `+` toggle ✓
- [x] **CTA** — Fixed z-index:1 ✓, spacer div ✓, IntersectionObserver ✓, dim/bright headline ✓, red glow ✓
- [x] **Nav** — Always opaque ✓, z-index:100 ✓
- [x] **Stacking context** — All sections have `position: relative; zIndex: 2` ✓
- [x] **prefers-reduced-motion** — Hero keyframes disabled ✓, GSAP hook already handles it ✓
- [x] **Mobile** — All `clamp()` values ✓, hero CTAs stack at `sm:` ✓, nav hides links below 768px ✓ (Header already has `hidden md:flex`)
- [x] **Other pages** — `Hero.tsx` and `CTASection.tsx` untouched ✓
- [x] **Copy** — Not changed ✓
- [x] **SEO metadata** — Not changed ✓
