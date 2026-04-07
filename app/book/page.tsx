"use client";

import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { IntakeForm } from "@/components/sections/book/IntakeForm";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function BookPage() {
  const leftRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.8 });
  const rightRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.8, delay: 0.2 });

  return (
    <section className="relative bg-soft-black text-white px-6 py-24 md:py-36">
      <GrainOverlay />
      <div className="relative mx-auto max-w-[1200px] grid md:grid-cols-2 gap-16 md:gap-24 items-start">
        {/* Left column — copy */}
        <div ref={leftRef}>
          <p className="text-xs font-bold uppercase tracking-widest text-amber mb-4">
            Free Strategy Call
          </p>
          <h1 className="font-title text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            Tell us about your business.
          </h1>
          <div className="mt-8 flex flex-col gap-5 text-base leading-relaxed opacity-70 max-w-sm">
            <p>
              Takes about 2 minutes. We&apos;ll review your answers and reach
              out within one business day to schedule your call.
            </p>
            <p>
              The call is 30 minutes. No pitch, no deck. We&apos;ll be honest
              about whether we&apos;re the right fit — and if we&apos;re not,
              we&apos;ll tell you.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8">
            <p className="text-xs font-bold uppercase tracking-widest opacity-40">
              Prefer to email?
            </p>
            <a
              href="mailto:hello@nyoostudio.com"
              className="text-sm font-bold hover:text-amber transition-colors duration-300"
            >
              hello@nyoostudio.com
            </a>
          </div>
        </div>

        {/* Right column — form */}
        <div ref={rightRef}>
          <IntakeForm />
        </div>
      </div>
    </section>
  );
}
