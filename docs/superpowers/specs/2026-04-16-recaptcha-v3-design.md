# reCAPTCHA v3 — Contact & Intake Forms

**Date:** 2026-04-16  
**Status:** Approved

---

## Overview

Add Google reCAPTCHA v3 (invisible, score-based) to both form pages:
- `/contact` → `ContactForm.tsx`
- `/book` → `IntakeForm.tsx`

Token verification happens in Next.js API routes (Vercel serverless). Secret key never reaches the browser.

---

## Architecture

```
Client                        Vercel Serverless            External
──────────────────────────    ─────────────────────────    ──────────────────────
1. User submits form
2. executeRecaptcha(action)
   → token from Google JS    
3. POST {formData, token}  →  /api/submit-contact          Google reCAPTCHA verify
                               or /api/submit-intake    →  Formspree
                                                        →  n8n (intake only)
4. 200 / 4xx response      ←  
```

---

## Components

### `hooks/useRecaptcha.ts`
- Loads `https://www.google.com/recaptcha/api.js?render=SITE_KEY` once (checks if already loaded)
- Exposes `executeRecaptcha(action: string): Promise<string>`
- Used by both forms

### `app/api/submit-contact/route.ts`
- Accepts `POST` with JSON body: `{ formData: {...}, token: string }`
- Verifies token against Google (`https://www.google.com/recaptcha/api/siteverify`)
- Rejects if score < 0.5 → 400
- Forwards form data to Formspree on success → 200

### `app/api/submit-intake/route.ts`
- Same verification logic
- On pass: forwards to Formspree + n8n in parallel (n8n failure non-blocking, same as current behavior)

### Updated `ContactForm.tsx`
- Uses `useRecaptcha` hook
- On submit: get token, POST to `/api/submit-contact`
- Remove direct Formspree fetch

### Updated `IntakeForm.tsx`
- Uses `useRecaptcha` hook
- On submit: get token, POST to `/api/submit-intake`
- Remove direct Formspree + n8n fetches (moved to API route)

---

## Environment Variables

| Variable | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Client + Server | Load reCAPTCHA script, execute token |
| `RECAPTCHA_SECRET_KEY` | Server only | Verify token with Google |

Both must be set in Vercel dashboard (Production + Preview environments).

---

## reCAPTCHA Actions

| Form | Action name |
|---|---|
| Contact | `contact_submit` |
| Intake | `intake_submit` |

Named distinctly for per-action analytics in Google reCAPTCHA admin dashboard.

---

## Score Threshold

**0.5** — Google's recommended default. Requests below this score return 400 to client. Forms show existing error state ("Something went wrong...").

---

## Error Handling

- reCAPTCHA script load failure → form submit blocked, user sees error
- Score < 0.5 → API returns 400 → form shows existing error message
- Google verify API unreachable → API returns 500 → form shows existing error message
- Formspree failure → unchanged from current behavior
- n8n failure → unchanged (non-blocking)

---

## What Does NOT Change

- Form field structure and validation
- Visual design / styling
- Formspree form IDs
- n8n webhook URL
- Success/error UI states
- Form submission UX (no visible checkbox, no friction)
