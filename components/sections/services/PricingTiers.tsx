"use client";

import { PricingCard } from "@/components/ui/PricingCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import Link from "next/link";
import { useScrollReveal } from "@/lib/useScrollReveal";

const tiers = [
  {
    name: "Foundation",
    price: "$1,299",
    description:
      "Built for businesses ready to show up consistently. A real presence, handled properly.",
    features: [
      "8 social posts/month (2 platforms)",
      "Monthly content strategy session",
      "Caption writing + hashtag research",
      "Community management (comments + DMs)",
      "Monthly performance report",
    ],
    badge: undefined,
  },
  {
    name: "Growth Engine",
    price: "$2,499",
    description:
      "For businesses ready to move from presence to pipeline. More output, more reach, more results.",
    features: [
      "16 social posts/month (3 platforms)",
      "2× content strategy sessions/month",
      "Short-form video scripts (4/month)",
      "Email newsletter (2/month)",
      "Paid social ad creative (2 ads/month)",
      "Community management (comments + DMs)",
      "Bi-weekly performance report",
    ],
    badge: "Most Popular",
  },
  {
    name: "Scale",
    price: "$3,499",
    priceSuffix: "/mo",
    description:
      "Full-output mode for businesses ready to dominate their market segment.",
    features: [
      "24+ social posts/month (4 platforms)",
      "Weekly content strategy sessions",
      "Short-form video scripts (8/month)",
      "Email newsletter (4/month)",
      "Paid social ad creative (4 ads/month)",
      "Blog / long-form content (2/month)",
      "Community management (comments + DMs)",
      "Weekly performance report",
      "Dedicated account strategist",
    ],
    badge: undefined,
  },
];

export function PricingTiers() {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.8 });
  const cardsRef = useScrollReveal<HTMLDivElement>({
    staggerChildren: true,
    stagger: 0.15,
    y: 50,
    duration: 0.7,
  });
  const guaranteeRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.6, delay: 0.3 });

  return (
    <section className="relative bg-soft-black text-white px-6 py-14 md:py-16">
      <div className="relative mx-auto max-w-[1200px]">
        <div ref={headingRef}>
          <SectionLabel>Packages</SectionLabel>
          <h2 className="mt-4 font-title text-4xl md:text-5xl font-bold leading-tight max-w-2xl">
            Pick the one that fits where you are. Switch when you grow.
          </h2>
        </div>

        <div ref={cardsRef} className="mt-16 grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <PricingCard
              key={tier.name}
              name={tier.name}
              price={tier.price}
              priceSuffix={tier.priceSuffix}
              description={tier.description}
              features={tier.features}
              badge={tier.badge}
            />
          ))}
        </div>

        {/* Performance guarantee */}
        <div ref={guaranteeRef} className="mt-8 glass-card-static p-6 md:p-8 flex flex-col md:flex-row gap-4 md:items-center">
          <span className="text-amber font-bold uppercase tracking-widest text-xs shrink-0">
            Performance Guarantee
          </span>
          <p className="text-sm leading-relaxed opacity-60">
            If we miss a contracted deliverable count in any sprint, the
            shortfall carries to the next sprint at no additional cost. We don't
            short-change you and call it a month.
          </p>
        </div>

        {/* All retainers note */}
        <p className="mt-6 text-xs opacity-40 tracking-wide">
          All retainers are month-to-month. No lock-in contracts unless you
          choose a commit discount.{" "}
          <Link href="/faq" className="underline underline-offset-2 hover:opacity-70 transition-opacity">
            See FAQs →
          </Link>
        </p>
      </div>
    </section>
  );
}
