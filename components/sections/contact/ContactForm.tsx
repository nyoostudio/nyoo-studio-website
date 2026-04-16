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
