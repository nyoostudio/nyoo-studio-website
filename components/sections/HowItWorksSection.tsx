"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { useParallax } from "@/lib/useParallax";

const steps = [
  {
    number: "01",
    title: "Strategy Call",
    description:
      "A 30-minute conversation about your business, your sales cycle, and where leads are coming from today. We listen more than we talk.",
  },
  {
    number: "02",
    title: "Lead Generation Plan",
    description:
      "We build a content strategy mapped to your sales funnel — tailored to your voice, your ideal client, and the platforms where they're most reachable. You review it. We adjust.",
  },
  {
    number: "03",
    title: "We Build Your Pipeline",
    description:
      "Content goes live. Lead flows get activated. Reporting starts tracking what matters — not impressions, but inquiries. You stay focused on running your business.",
  },
];

export function HowItWorksSection() {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.8 });
  const bgParallax = useParallax<HTMLDivElement>({ speed: 0.2 });
  const stepsRef = useScrollReveal<HTMLDivElement>({
    staggerChildren: true,
    stagger: 0.2,
    y: 40,
    duration: 0.7,
  });

  return (
    <section className="relative bg-soft-black text-white px-6 py-24 md:py-32 overflow-hidden">
      {/* Parallax background orb */}
      <div ref={bgParallax} className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="orb orb-red w-[400px] h-[400px] -bottom-32 -left-32 opacity-30" />
      </div>
      <GrainOverlay />
      <div className="relative mx-auto max-w-[1200px]">
        <div ref={headingRef}>
          <SectionLabel>The process</SectionLabel>
          <h2 className="mt-4 font-title text-4xl md:text-6xl font-bold leading-tight max-w-2xl">
            No onboarding decks. No 12-week discovery phases.
          </h2>
        </div>
        <div ref={stepsRef} className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="glass-card p-8 md:p-10 group"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-red/40 text-red font-bold text-sm tracking-widest transition-all duration-300 group-hover:bg-red group-hover:text-white group-hover:border-red">
                {step.number}
              </span>
              <h3 className="mt-5 font-title text-2xl font-bold">
                {step.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed opacity-70">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
