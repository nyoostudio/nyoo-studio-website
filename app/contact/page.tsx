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
            Get in touch.
          </h1>
          <div className="mt-8 flex flex-col gap-5 text-base leading-relaxed opacity-70 max-w-sm">
            <p>
              Partnerships, collaborations, press, or anything else — this is
              the right place.
            </p>
            <p>
              If you&apos;re looking to work with us as a client, use the{" "}
              <a href="/book" className="underline underline-offset-2 hover:text-amber transition-colors">
                Book a Call
              </a>{" "}
              page instead.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-widest opacity-40">
              Email us directly
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
