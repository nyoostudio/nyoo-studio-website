"use client";

import { useState } from "react";

const HOW_HEARD_OPTIONS = [
  "Google",
  "Social Media",
  "Referral",
  "Other",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      // Replace YOUR_FORM_ID with the Formspree form ID once created
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
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
          <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest opacity-50">
            Your Name <span className="text-red">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jane Smith"
            className="bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder:opacity-30 focus:outline-none focus:border-red transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="business" className="text-xs font-bold uppercase tracking-widest opacity-50">
            Business Name <span className="text-red">*</span>
          </label>
          <input
            id="business"
            name="business"
            type="text"
            required
            placeholder="Smith & Co."
            className="bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder:opacity-30 focus:outline-none focus:border-red transition-colors"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest opacity-50">
            Email <span className="text-red">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@smithco.com"
            className="bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder:opacity-30 focus:outline-none focus:border-red transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest opacity-50">
            Phone <span className="opacity-40 normal-case tracking-normal font-normal">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(202) 555-0100"
            className="bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder:opacity-30 focus:outline-none focus:border-red transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="website" className="text-xs font-bold uppercase tracking-widest opacity-50">
          Website URL <span className="opacity-40 normal-case tracking-normal font-normal">(optional)</span>
        </label>
        <input
          id="website"
          name="website"
          type="url"
          placeholder="https://yoursite.com"
          className="bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder:opacity-30 focus:outline-none focus:border-red transition-colors"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="how_heard" className="text-xs font-bold uppercase tracking-widest opacity-50">
          How did you hear about us?
        </label>
        <select
          id="how_heard"
          name="how_heard"
          className="bg-soft-black border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:border-red transition-colors appearance-none"
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
        <label htmlFor="challenge" className="text-xs font-bold uppercase tracking-widest opacity-50">
          What&apos;s your biggest marketing challenge? <span className="text-red">*</span>
        </label>
        <textarea
          id="challenge"
          name="challenge"
          required
          rows={5}
          placeholder="Tell us what's not working — or what you need to work better."
          className="bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder:opacity-30 focus:outline-none focus:border-red transition-colors resize-none"
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
        className="self-start bg-red text-white font-bold px-8 py-4 text-sm tracking-wide hover:bg-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending…" : "Request a Call"}
      </button>
    </form>
  );
}
