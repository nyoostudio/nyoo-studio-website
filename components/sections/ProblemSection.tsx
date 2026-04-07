"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { useParallax } from "@/lib/useParallax";

const symptoms = [
  {
    heading: "You post when there's time.",
    body: "There's never time. So nothing builds, nothing compounds, and the algorithm moves on without you.",
  },
  {
    heading: "You've tried things.",
    body: "A boosted post. A rebrand. A content push that lasted two weeks. Nothing wrong with the effort — the problem was the system.",
  },
  {
    heading: "Your customers know you're good.",
    body: "Strangers don't. And strangers are the ones you need to reach. Referrals keep the lights on. They don't grow the business.",
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
            Most small businesses don't have a marketing problem. They have a visibility problem.
          </h2>
          <p className="mt-8 text-lg leading-relaxed opacity-90 max-w-2xl">
            The businesses outranking you aren&apos;t better. They&apos;re just more visible.
          </p>
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
