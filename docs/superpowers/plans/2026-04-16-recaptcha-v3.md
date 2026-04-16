# reCAPTCHA v3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Google reCAPTCHA v3 (invisible, score-based) to the contact and intake forms, with server-side token verification in Next.js API routes.

**Architecture:** A shared `useRecaptcha` hook injects the reCAPTCHA script and exposes `executeRecaptcha(action)`. On form submit, the client gets a token and POSTs `{formData, token}` to a Next.js API route. The API route verifies the token with Google (server-side, using the secret key), then forwards the form data to Formspree/n8n on success.

**Tech Stack:** Next.js 16.2 App Router, TypeScript, Google reCAPTCHA v3, Vercel Serverless Functions, Formspree, n8n

---

## File Map

| Action | Path | Purpose |
|--------|------|---------|
| Create | `hooks/useRecaptcha.ts` | Load reCAPTCHA script, expose `executeRecaptcha(action)` |
| Create | `app/api/submit-contact/route.ts` | Verify token, proxy to Formspree |
| Create | `app/api/submit-intake/route.ts` | Verify token, proxy to Formspree + n8n |
| Modify | `components/sections/contact/ContactForm.tsx` | Use hook, POST to API route |
| Modify | `components/sections/book/IntakeForm.tsx` | Use hook, POST to API route |

---

## Task 1: Create `useRecaptcha` hook

**Files:**
- Create: `hooks/useRecaptcha.ts`

- [ ] **Step 1: Create the hook file**

```typescript
// hooks/useRecaptcha.ts
"use client";

import { useEffect, useCallback } from "react";

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        opts: { action: string }
      ) => Promise<string>;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

export function useRecaptcha() {
  useEffect(() => {
    if (document.querySelector(`script[src*="recaptcha/api.js"]`)) return;
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const executeRecaptcha = useCallback(
    (action: string): Promise<string> =>
      new Promise((resolve, reject) => {
        if (typeof window === "undefined" || !window.grecaptcha) {
          reject(new Error("reCAPTCHA not loaded"));
          return;
        }
        window.grecaptcha.ready(async () => {
          try {
            const token = await window.grecaptcha.execute(SITE_KEY, {
              action,
            });
            resolve(token);
          } catch (err) {
            reject(err);
          }
        });
      }),
    []
  );

  return { executeRecaptcha };
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add hooks/useRecaptcha.ts
git commit -m "feat: add useRecaptcha hook for reCAPTCHA v3"
```

---

## Task 2: Create `/api/submit-contact` route

**Files:**
- Create: `app/api/submit-contact/route.ts`

- [ ] **Step 1: Create the API route**

```typescript
// app/api/submit-contact/route.ts
import { NextRequest, NextResponse } from "next/server";

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY!;
const SCORE_THRESHOLD = 0.5;
// NOTE: Replace YOUR_FORM_ID with the real Formspree ID once the contact form is created at formspree.io
const FORMSPREE_URL = "https://formspree.io/f/YOUR_FORM_ID";

async function verifyRecaptchaToken(token: string): Promise<boolean> {
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${RECAPTCHA_SECRET}&response=${token}`,
  });
  const data = (await res.json()) as { success: boolean; score: number };
  return data.success && data.score >= SCORE_THRESHOLD;
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { token, ...formData } = body;

  if (typeof token !== "string" || !token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  let valid: boolean;
  try {
    valid = await verifyRecaptchaToken(token);
  } catch {
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }

  if (!valid) {
    return NextResponse.json({ error: "reCAPTCHA failed" }, { status: 400 });
  }

  const formspreeRes = await fetch(FORMSPREE_URL, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!formspreeRes.ok) {
    return NextResponse.json(
      { error: "Submission failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/api/submit-contact/route.ts
git commit -m "feat: add /api/submit-contact route with reCAPTCHA v3 verification"
```

---

## Task 3: Create `/api/submit-intake` route

**Files:**
- Create: `app/api/submit-intake/route.ts`

- [ ] **Step 1: Create the API route**

```typescript
// app/api/submit-intake/route.ts
import { NextRequest, NextResponse } from "next/server";

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY!;
const SCORE_THRESHOLD = 0.5;
const FORMSPREE_URL = "https://formspree.io/f/xaqlbrap";
const N8N_URL = "https://nyoostudio.app.n8n.cloud/webhook/inquiry";

async function verifyRecaptchaToken(token: string): Promise<boolean> {
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${RECAPTCHA_SECRET}&response=${token}`,
  });
  const data = (await res.json()) as { success: boolean; score: number };
  return data.success && data.score >= SCORE_THRESHOLD;
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { token, ...formData } = body;

  if (typeof token !== "string" || !token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  let valid: boolean;
  try {
    valid = await verifyRecaptchaToken(token);
  } catch {
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }

  if (!valid) {
    return NextResponse.json({ error: "reCAPTCHA failed" }, { status: 400 });
  }

  const [formspreeRes] = await Promise.all([
    fetch(FORMSPREE_URL, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }),
    fetch(N8N_URL, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    }).catch(() => null), // n8n failure is non-blocking
  ]);

  if (!formspreeRes.ok) {
    return NextResponse.json(
      { error: "Submission failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/api/submit-intake/route.ts
git commit -m "feat: add /api/submit-intake route with reCAPTCHA v3 verification"
```

---

## Task 4: Update `ContactForm.tsx`

**Files:**
- Modify: `components/sections/contact/ContactForm.tsx`

- [ ] **Step 1: Replace file contents**

Replace the entire file with:

```typescript
// components/sections/contact/ContactForm.tsx
"use client";

import { useState } from "react";
import { useRecaptcha } from "@/hooks/useRecaptcha";

const HOW_HEARD_OPTIONS = [
  "Google",
  "Social Media",
  "Referral",
  "Other",
];

const inputClass =
  "glass-input bg-transparent px-4 py-3 text-sm text-white placeholder:opacity-30 focus:outline-none";

const labelClass = "text-xs font-bold uppercase tracking-widest opacity-50";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const { executeRecaptcha } = useRecaptcha();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);
    const formData = Object.fromEntries(data);

    let token: string;
    try {
      token = await executeRecaptcha("contact_submit");
    } catch {
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/submit-contact", {
        method: "POST",
        body: JSON.stringify({ ...formData, token }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClass}>
            Your Name <span className="text-red">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jane Smith"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="business" className={labelClass}>
            Business Name <span className="text-red">*</span>
          </label>
          <input
            id="business"
            name="business"
            type="text"
            required
            placeholder="Smith & Co."
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-red">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@smithco.com"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className={labelClass}>
            Phone{" "}
            <span className="opacity-40 normal-case tracking-normal font-normal">
              (optional)
            </span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(202) 555-0100"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="website" className={labelClass}>
          Website URL{" "}
          <span className="opacity-40 normal-case tracking-normal font-normal">
            (optional)
          </span>
        </label>
        <input
          id="website"
          name="website"
          type="url"
          placeholder="https://yoursite.com"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="how_heard" className={labelClass}>
          How did you hear about us?
        </label>
        <select
          id="how_heard"
          name="how_heard"
          className={`${inputClass} appearance-none bg-[#0D0A09]`}
        >
          <option value="" disabled selected>
            Select one
          </option>
          {HOW_HEARD_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="challenge" className={labelClass}>
          What&apos;s this about? <span className="text-red">*</span>
        </label>
        <textarea
          id="challenge"
          name="challenge"
          required
          rows={5}
          placeholder="Tell us what you have in mind."
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "success" && (
        <p className="text-sm text-amber font-bold">
          Got it. We&apos;ll be in touch within one business day.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red opacity-80">
          Something went wrong. Try emailing us directly at{" "}
          <a href="mailto:hello@nyoostudio.com" className="underline">
            hello@nyoostudio.com
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="self-start bg-red text-white font-bold px-8 py-4 text-sm tracking-wide transition-all duration-300 hover:bg-red/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/contact/ContactForm.tsx
git commit -m "feat: wire ContactForm to reCAPTCHA v3 via /api/submit-contact"
```

---

## Task 5: Update `IntakeForm.tsx`

**Files:**
- Modify: `components/sections/book/IntakeForm.tsx`

- [ ] **Step 1: Replace file contents**

```typescript
// components/sections/book/IntakeForm.tsx
"use client";

import { useState } from "react";
import { CalendlyWidget } from "./CalendlyWidget";
import { useRecaptcha } from "@/hooks/useRecaptcha";

const REVENUE_OPTIONS = [
  "Under $10K/mo",
  "$10K–$25K/mo",
  "$25K–$50K/mo",
  "$50K–$100K/mo",
  "$100K+/mo",
  "Prefer not to say",
];

const URGENCY_OPTIONS = [
  "I needed this yesterday",
  "Within the next 30 days",
  "In the next 1–3 months",
  "Just exploring options",
];

const CURRENT_MARKETING_OPTIONS = [
  "Nothing consistent right now",
  "Posting occasionally on our own",
  "Working with a freelancer",
  "Working with another agency",
  "Running paid ads only",
];

const HOW_HEARD_OPTIONS = ["Google", "Social Media", "Referral", "Other"];

const inputClass =
  "glass-input bg-transparent px-4 py-3 text-sm text-white placeholder:opacity-30 focus:outline-none";

const selectClass =
  "glass-input bg-[#0D0A09] px-4 py-3 text-sm text-white focus:outline-none appearance-none";

const labelClass = "text-xs font-bold uppercase tracking-widest opacity-50";

export function IntakeForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [userData, setUserData] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });
  const { executeRecaptcha } = useRecaptcha();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);
    const formData = Object.fromEntries(data);

    let token: string;
    try {
      token = await executeRecaptcha("intake_submit");
    } catch {
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/submit-intake", {
        method: "POST",
        body: JSON.stringify({ ...formData, token }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setUserData({
          name: formData.name as string,
          email: formData.email as string,
        });
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-amber font-bold text-lg">We&apos;ve got it.</p>
          <p className="text-sm leading-relaxed opacity-70">
            Your answers are in. Pick a time below that works best for your strategy call.
          </p>
        </div>
        <CalendlyWidget name={userData.name} email={userData.email} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {/* Name + Business */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClass}>
            Your Name <span className="text-red">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jane Smith"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="business" className={labelClass}>
            Business Name <span className="text-red">*</span>
          </label>
          <input
            id="business"
            name="business"
            type="text"
            required
            placeholder="Smith & Co."
            className={inputClass}
          />
        </div>
      </div>

      {/* Email + Phone */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-red">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@smithco.com"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className={labelClass}>
            Phone{" "}
            <span className="opacity-40 normal-case tracking-normal font-normal">
              (optional)
            </span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(202) 555-0100"
            className={inputClass}
          />
        </div>
      </div>

      {/* Website */}
      <div className="flex flex-col gap-2">
        <label htmlFor="website" className={labelClass}>
          Website URL <span className="text-red">*</span>
        </label>
        <input
          id="website"
          name="website"
          type="url"
          required
          placeholder="https://yoursite.com"
          className={inputClass}
        />
      </div>

      {/* Monthly Revenue */}
      <div className="flex flex-col gap-2">
        <label htmlFor="revenue" className={labelClass}>
          Monthly Revenue Range <span className="text-red">*</span>
        </label>
        <select
          id="revenue"
          name="revenue"
          required
          defaultValue=""
          className={selectClass}
        >
          <option value="" disabled>
            Select a range
          </option>
          {REVENUE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Urgency */}
      <div className="flex flex-col gap-2">
        <label htmlFor="urgency" className={labelClass}>
          How soon do you need marketing help? <span className="text-red">*</span>
        </label>
        <select
          id="urgency"
          name="urgency"
          required
          defaultValue=""
          className={selectClass}
        >
          <option value="" disabled>
            Select one
          </option>
          {URGENCY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Current marketing situation */}
      <div className="flex flex-col gap-2">
        <label htmlFor="current_marketing" className={labelClass}>
          Where are you with marketing right now?
        </label>
        <select
          id="current_marketing"
          name="current_marketing"
          defaultValue=""
          className={selectClass}
        >
          <option value="" disabled>
            Select one
          </option>
          {CURRENT_MARKETING_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Challenge */}
      <div className="flex flex-col gap-2">
        <label htmlFor="challenge" className={labelClass}>
          What&apos;s your biggest marketing challenge?{" "}
          <span className="text-red">*</span>
        </label>
        <textarea
          id="challenge"
          name="challenge"
          required
          rows={4}
          placeholder="Tell us what's not working — or what you need to work better."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* How heard */}
      <div className="flex flex-col gap-2">
        <label htmlFor="how_heard" className={labelClass}>
          How did you hear about us?
        </label>
        <select
          id="how_heard"
          name="how_heard"
          defaultValue=""
          className={selectClass}
        >
          <option value="" disabled>
            Select one
          </option>
          {HOW_HEARD_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {status === "error" && (
        <p className="text-sm opacity-80" style={{ color: "var(--red)" }}>
          Something went wrong. Try emailing us directly at{" "}
          <a href="mailto:hello@nyoostudio.com" className="underline">
            hello@nyoostudio.com
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="self-start bg-red text-white font-bold px-8 py-4 text-sm tracking-wide transition-all duration-300 hover:bg-red/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending…" : "Book Your Strategy Call"}
      </button>

      <p className="text-xs opacity-30">
        We respond within one business day. No pitch, no pressure.
      </p>
    </form>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/book/IntakeForm.tsx
git commit -m "feat: wire IntakeForm to reCAPTCHA v3 via /api/submit-intake"
```

---

## Task 6: Set environment variables and verify

**Files:** None — Vercel dashboard + local `.env.local`

- [ ] **Step 1: Add env vars to `.env.local` for local dev**

Create or edit `.env.local` in the project root (this file is gitignored):

```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

Replace values with actual keys from [Google reCAPTCHA admin](https://www.google.com/recaptcha/admin).

- [ ] **Step 2: Start dev server and verify reCAPTCHA loads**

```bash
npm run dev
```

1. Open `http://localhost:3000/contact`
2. Open browser DevTools → Network tab
3. Confirm request to `google.com/recaptcha/api.js?render=YOUR_SITE_KEY` appears
4. Open `http://localhost:3000/book` and confirm same

- [ ] **Step 3: Submit contact form and verify full flow**

1. Fill out contact form at `http://localhost:3000/contact`
2. Submit — should show success message "Got it. We'll be in touch..."
3. In Network tab, confirm:
   - POST to `/api/submit-contact` returns 200
   - No direct request to `formspree.io` from browser
4. If 400 returned, check console for reCAPTCHA token error

- [ ] **Step 4: Submit intake form and verify full flow**

1. Fill out intake form at `http://localhost:3000/book`
2. Submit — should show Calendly widget on success
3. In Network tab, confirm:
   - POST to `/api/submit-intake` returns 200
   - No direct requests to `formspree.io` or `n8n.cloud` from browser

- [ ] **Step 5: Add env vars to Vercel dashboard**

In Vercel → Project Settings → Environment Variables, add:
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` → Production + Preview + Development
- `RECAPTCHA_SECRET_KEY` → Production + Preview + Development (mark as sensitive)

- [ ] **Step 6: Final build check**

```bash
npm run build
```

Expected: build completes with no errors.

- [ ] **Step 7: Commit**

```bash
git add .env.local
```

> **Note:** `.env.local` should already be in `.gitignore`. Verify before committing. If listed in `git status`, do NOT commit it — add it to `.gitignore` first.

No commit needed for env vars (they live in Vercel and local `.env.local`, both gitignored).
