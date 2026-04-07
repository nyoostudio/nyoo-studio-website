"use client";

import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { useParallax } from "@/lib/useParallax";

export function WhyTheyBuiltIt() {
  const contentRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.8 });
  const bgParallax = useParallax<HTMLDivElement>({ speed: 0.25 });

  return (
    <section
      className="relative text-soft-black px-6 py-24 md:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #C41230 0%, #d4243f 50%, #C41230 100%)",
        backgroundSize: "200% 200%",
        animation: "gradient-shift 6s ease infinite",
      }}
    >
      {/* Parallax background orbs */}
      <div ref={bgParallax} className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full bg-black/20 blur-[100px]" />
        <div className="absolute -bottom-32 -left-16 w-[350px] h-[350px] rounded-full bg-black/15 blur-[80px]" />
      </div>
      <GrainOverlay opacity={0.08} />
      <div ref={contentRef} className="relative mx-auto max-w-[1200px] grid md:grid-cols-2 gap-16 md:gap-24 items-start">
        <h2 className="font-title text-4xl md:text-6xl font-bold leading-tight">
          27 years of combined experience. One reason they started this.
        </h2>
        <div className="flex flex-col gap-6 text-base leading-relaxed opacity-80">
          <p>
            Between them, Jo and Jin have seen what it looks like when marketing is done right — and what it costs when it isn't. They've watched small businesses get handed generic strategies built for someone else's audience, pay for content that sounds like it came from a template, and wait months to see results that never come.
          </p>
          <p>
            Nyoo Studio exists because they knew it could be done differently. Faster. More honestly. With the kind of attention and craft that most agencies reserve for their biggest clients.
          </p>
          <p>
            They don't take every client. They take the ones they can actually move the needle for — and then they do exactly that.
          </p>
        </div>
      </div>
    </section>
  );
}
