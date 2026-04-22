"use client";

import { useState } from "react";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import type { EmailGateData } from "@/lib/audit/types";

interface EmailGateProps {
  onSubmit: (data: EmailGateData, token: string | null) => void;
  onBack: () => void;
}

const inputClass =
  "glass-input bg-transparent px-4 py-3 text-sm text-white placeholder:opacity-30 focus:outline-none";
const labelClass = "text-xs font-bold uppercase tracking-widest opacity-60";

export function EmailGate({ onSubmit, onBack }: EmailGateProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [wantsNewsletter, setWantsNewsletter] = useState(false);
  const [privacyAcknowledged, setPrivacyAcknowledged] = useState(false);
  const [busy, setBusy] = useState(false);
  const { executeRecaptcha } = useRecaptcha();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);

    let token: string | null = null;
    try {
      token = await executeRecaptcha("audit_submit");
    } catch {
      token = null;
    }

    onSubmit({ firstName: firstName.trim(), email: email.trim(), wantsNewsletter }, token);
  }

  return (
    <section className="relative min-h-[calc(100svh-72px)] flex flex-col section-px py-20">
      <div className="max-w-[620px] mx-auto w-full flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{ color: "var(--amber)" }}
          >
            Your score is ready
          </span>
          <h2
            id="audit-step-heading"
            tabIndex={-1}
            className="font-bold outline-none"
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--cream)",
            }}
          >
            Where should we send <span style={{ color: "var(--red)" }}>your results</span>?
          </h2>
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.65,
              color: "var(--muted)",
              fontFamily: "var(--font-subtitle)",
            }}
          >
            One email. No list-bombing. We&apos;ll keep a copy of your score so you can track
            progress the next time you take the audit.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName" className={labelClass}>
              First name <span style={{ color: "var(--red)" }}>*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              autoComplete="given-name"
              placeholder="Jane"
              className={inputClass}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className={labelClass}>
              Email <span style={{ color: "var(--red)" }}>*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="jane@example.com"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label
            className="flex items-start gap-3 cursor-pointer py-2"
            style={{ color: "var(--cream)" }}
          >
            <input
              type="checkbox"
              checked={wantsNewsletter}
              onChange={(e) => setWantsNewsletter(e.target.checked)}
              className="mt-1 w-4 h-4 flex-shrink-0"
              style={{ accentColor: "var(--red)" }}
            />
            <span className="text-sm leading-relaxed opacity-85">
              Send me tips on fixing the gaps in my score.
            </span>
          </label>

          {/* Privacy acknowledgment */}
          <label
            className="flex items-start gap-3 cursor-pointer py-1"
            style={{ color: "var(--cream)" }}
          >
            <input
              type="checkbox"
              required
              checked={privacyAcknowledged}
              onChange={(e) => setPrivacyAcknowledged(e.target.checked)}
              className="mt-0.5 w-4 h-4 flex-shrink-0"
              style={{ accentColor: "var(--red)" }}
            />
            <span className="text-xs leading-relaxed opacity-60">
              I acknowledge that Nyoo Studio will use my name and email address
              to deliver my audit results and, if selected above, occasional
              marketing tips. I may unsubscribe at any time. My information
              will not be shared with third parties or sold.{" "}
              <span style={{ color: "var(--red)" }}>*</span>
            </span>
          </label>

          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={onBack}
              className="text-xs font-bold uppercase tracking-[0.18em] transition-opacity hover:opacity-60"
              style={{ color: "var(--muted)" }}
            >
              &larr; Back
            </button>
            <button
              type="submit"
              disabled={busy || !privacyAcknowledged}
              className="inline-flex items-center gap-3 font-bold transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "var(--red)",
                color: "white",
                padding: "14px 28px",
                fontSize: "13px",
                letterSpacing: "0.07em",
              }}
            >
              {busy ? "Generating\u2026" : "Get my results \u2192"}
            </button>
          </div>

          <p className="text-xs opacity-40 leading-relaxed">
            Protected by reCAPTCHA. We use your email to send results and, if you check the box
            above, occasional tips. No sharing, no selling.
          </p>
        </form>
      </div>
    </section>
  );
}
