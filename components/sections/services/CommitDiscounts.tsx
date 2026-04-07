"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { useScrollReveal } from "@/lib/useScrollReveal";

const discounts = [
  {
    term: "3-Month Commit",
    savings: "10% off",
    detail: "Pay month-to-month, commit to a quarter.",
  },
  {
    term: "6-Month Commit",
    savings: "15% off",
    detail: "Our best rate. Built for businesses ready to go deep.",
  },
];

export function CommitDiscounts() {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.8 });
  const cardsRef = useScrollReveal<HTMLDivElement>({
    staggerChildren: true,
    stagger: 0.15,
    y: 40,
    duration: 0.7,
  });

  return (
    <section className="relative bg-soft-black text-white px-6 py-10 md:py-12">
      <div className="mx-auto max-w-[1200px]">
        <div ref={headingRef}>
          <SectionLabel>Commit Discounts</SectionLabel>
          <h2 className="mt-4 font-title text-3xl md:text-4xl font-bold leading-tight">
            Stay longer. Pay less.
          </h2>
          <p className="mt-4 text-sm leading-relaxed opacity-60 max-w-xl">
            All packages are month-to-month by default. If you commit to a term
            upfront, you get a discount — no contracts, just a handshake on the
            timeline.
          </p>
        </div>

        <div ref={cardsRef} className="mt-12 grid md:grid-cols-2 gap-6">
          {discounts.map((d) => (
            <div key={d.term} className="glass-card p-8 md:p-10">
              <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-3">
                {d.term}
              </p>
              <p className="font-title text-5xl font-bold text-red">{d.savings}</p>
              <p className="mt-3 text-sm leading-relaxed opacity-60">{d.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
