"use client";

import { useState } from "react";

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

const CALENDAR_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0ngBnhDlfdX_Gwc3eHb_lr9s_9VOlEWhJIFMSy92UYfKis_T2mOdQ6s8q0e-hNlMuAWlHkVlaS?gv=true";

const inputClass =
  "bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder:opacity-30 focus:outline-none focus:border-red transition-colors";

const selectClass =
  "bg-[#0D0A09] border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:border-red transition-colors appearance-none";

const labelClass = "text-xs font-bold uppercase tracking-widest opacity-50";

export function IntakeForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
        window.open(CALENDAR_URL, "_blank", "noopener,noreferrer");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col gap-5">
        <p className="text-amber font-bold text-lg">We&apos;ve got it.</p>
        <p className="text-sm leading-relaxed opacity-70">
          Your answers are in. The scheduling page should have opened in a new
          tab — pick whatever time works best for you.
        </p>
        <p className="text-sm leading-relaxed opacity-70">
          If the tab didn&apos;t open,{" "}
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-amber transition-colors"
          >
            click here to book your call
          </a>
          .
        </p>
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
        className="self-start bg-red text-white font-bold px-8 py-4 text-sm tracking-wide hover:bg-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending…" : "Book Your Strategy Call"}
      </button>

      <p className="text-xs opacity-30">
        We respond within one business day. No pitch, no pressure.
      </p>
    </form>
  );
}
