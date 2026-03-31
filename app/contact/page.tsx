import type { Metadata } from "next";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { ContactForm } from "@/components/sections/contact/ContactForm";

export const metadata: Metadata = {
  title: "Book a Free Strategy Call | Nyoo Studio | DC Metro Marketing Agency",
  description:
    "Schedule a free 30-minute strategy call with Nyoo Studio. No pitch, no pressure — just an honest conversation about your marketing.",
  alternates: {
    canonical: "https://nyoostudio.com/contact",
  },
  openGraph: {
    title: "Book a Free Strategy Call | Nyoo Studio",
    description:
      "Schedule a free 30-minute strategy call with Nyoo Studio. No pitch, no pressure — just an honest conversation about your marketing.",
    url: "https://nyoostudio.com/contact",
  },
};

export default function ContactPage() {
  return (
    <section className="relative bg-soft-black text-white px-6 py-24 md:py-36">
      <GrainOverlay />
      <div className="relative mx-auto max-w-[1200px] grid md:grid-cols-2 gap-16 md:gap-24 items-start">
        {/* Left column — copy */}
        <div>
          <h1 className="font-title text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            Let&apos;s talk.
          </h1>
          <div className="mt-8 flex flex-col gap-5 text-base leading-relaxed opacity-70 max-w-sm">
            <p>
              The strategy call is 30 minutes. No pitch, no deck, no pressure.
              We&apos;ll ask about your business, tell you what we think, and
              let you decide if it&apos;s worth going further.
            </p>
            <p>
              If we&apos;re not the right fit, we&apos;ll tell you — and we
              might be able to point you toward someone who is.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-widest opacity-40">
              Prefer to email?
            </p>
            <a
              href="mailto:hello@nyoostudio.com"
              className="text-sm font-bold hover:text-amber transition-colors"
            >
              hello@nyoostudio.com
            </a>
            <p className="text-xs opacity-40 mt-1">
              We respond within one business day.
            </p>
          </div>
        </div>

        {/* Right column — form */}
        <ContactForm />
      </div>
    </section>
  );
}
