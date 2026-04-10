"use client";

import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { useScrollReveal } from "@/lib/useScrollReveal";

const values = [
  {
    statement: "We don't bet on everyone. But when we do, we don't lose.",
    body: "Selectivity isn't arrogance — it's how we protect the quality of what we do. We'd rather work with fewer clients and do it right than spread thin and do it okay.",
  },
  {
    statement: "Social media is a lead generation channel. We treat it like one.",
    body: "Most agencies measure success in engagement. We measure it in qualified leads. Your content should do more than get noticed — it should start conversations that end in revenue.",
  },
  {
    statement: "Small businesses deserve the same firepower as big ones.",
    body: "Strategy, systems, craft — none of that should be gatekept behind a $50k retainer. We built Nyoo Studio to close that gap.",
  },
];

export function Values() {
  const cardsRef = useScrollReveal<HTMLDivElement>({
    staggerChildren: true,
    stagger: 0.15,
    y: 40,
    duration: 0.7,
  });

  return (
    <section className="relative bg-soft-black text-white px-6 py-24 md:py-32">
      <GrainOverlay />
      <div className="relative mx-auto max-w-[1200px]">
        <div ref={cardsRef} className="grid gap-6">
          {values.map((value, i) => (
            <div key={i} className="glass-card p-10 md:p-16 grid md:grid-cols-2 gap-8 md:gap-24">
              <h3 className="font-title text-2xl md:text-3xl font-bold leading-snug">
                {value.statement}
              </h3>
              <p className="text-base leading-relaxed opacity-70 self-center">
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
