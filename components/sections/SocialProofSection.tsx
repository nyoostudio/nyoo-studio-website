"use client";

import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { useParallax } from "@/lib/useParallax";

export function SocialProofSection() {
  const bgRef = useParallax<HTMLDivElement>({ speed: 0.2 });

  return (
    <section className="relative bg-red text-soft-black px-6 py-24 md:py-32 overflow-hidden">
      {/* Parallax gradient accent */}
      <div ref={bgRef} className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-red via-red to-red/80" />
      </div>
      <GrainOverlay opacity={0.08} />
      <div className="relative mx-auto max-w-[1200px]">
        {/* <figure className="max-w-3xl">
          <blockquote className="font-quote italic font-bold text-2xl md:text-4xl leading-snug">
            &ldquo;[CLIENT_QUOTE]&rdquo;
          </blockquote>
          <figcaption className="mt-8 text-sm opacity-60 tracking-wide">
            — Client name, Business name
          </figcaption>
        </figure> */}
      </div>
    </section>
  );
}
