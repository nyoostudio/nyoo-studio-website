"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { useParallax } from "@/lib/useParallax";

const symptoms = [
  {
    heading: "You have engagement but no pipeline.",
    body: "Likes, comments, shares — none of it is connected to how people actually become your clients. The content looks good. It just doesn't lead anywhere.",
  },
  {
    heading: "You've invested in marketing that can't prove its value.",
    body: "You've tried agencies, freelancers, maybe even hired someone. They sent you reports full of impressions and reach. You still can't point to a single client that came from social media.",
  },
  {
    heading: "Referrals keep the lights on. They don't scale the business.",
    body: "Your best clients came from word of mouth. Great. But you can't control when the next one shows up. You need a system that generates leads on a schedule, not on luck.",
  },
];

export function ProblemSection() {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.8 });
  const bgParallax = useParallax<HTMLDivElement>({ speed: 0.2 });
  const cardsRef = useScrollReveal<HTMLDivElement>({
    staggerChildren: true,
    stagger: 0.15,
    y: 40,
    duration: 0.7,
  });

  return (
    <section className="relative bg-soft-black text-white px-6 py-24 md:py-32 overflow-hidden">
      {/* Parallax background orb */}
      <div ref={bgParallax} className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="orb orb-cobalt w-[500px] h-[500px] -top-40 -right-40 opacity-40" />
      </div>
      <GrainOverlay />
      <div className="relative mx-auto max-w-[1200px]">
        <div ref={headingRef}>
          <SectionLabel>The gap</SectionLabel>
          <h2 className="mt-4 font-title text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
            You&apos;re posting. You&apos;re getting likes. But your phone isn&apos;t ringing.
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {symptoms.map(({ heading, body }) => (
            <div key={heading} className="glass-card p-8 md:p-10">
              <p className="font-title text-2xl font-bold leading-snug">{heading}</p>
              <p className="mt-3 text-base leading-relaxed opacity-60">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
