"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { useScrollReveal } from "@/lib/useScrollReveal";

const addons = [
  {
    name: "Video shoot day ★",
    price: "$499–$799",
    note: "Half-day on-site (3–4 hrs) at $499; full-day at $799.",
  },
  {
    name: "ManyChat automation",
    price: "$299–$449/mo",
    note: "Up to 3 active flows · keyword triggers · DM sequences · monthly review.",
  },
  {
    name: "Community engagement",
    price: "$399–$549/mo",
    note: "30 min/day M–F · comment replies · proactive outreach · DM triage.",
  },
  {
    name: "Paid social ad management",
    price: "$499–$799/mo",
    note: "Campaign setup, creative, targeting, and reporting. Ad spend billed separately.",
  },
  {
    name: "Google Business Profile",
    price: "$199/mo",
    note: "Posts, Q&A, photos, review responses — monthly.",
  },
  {
    name: "Email newsletter",
    price: "$249/mo",
    note: "1× monthly email coordinated with social content calendar.",
  },
  {
    name: "Influencer outreach",
    price: "$349–$499/mo",
    note: "Identify, pitch, and manage local micro-influencers.",
  },
  {
    name: "Extra platform (Foundation only)",
    price: "$500/mo",
    note: "Add a second channel without upgrading to Growth Engine.",
  },
  {
    name: "Analytics deep-dive",
    price: "$350 one-time",
    note: "UTM audit, post performance, and funnel drop-off — delivered as a PDF report.",
  },
];

export function AddOns() {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.8 });
  const tableRef = useScrollReveal<HTMLDivElement>({
    staggerChildren: true,
    stagger: 0.08,
    y: 20,
    duration: 0.5,
  });

  return (
    <section className="relative bg-soft-black text-white px-6 py-10 md:py-12">
      <div className="mx-auto max-w-[1200px]">
        <div ref={headingRef}>
          <SectionLabel>Add-Ons</SectionLabel>
          <h2 className="mt-4 font-title text-3xl md:text-4xl font-bold leading-tight">
            Build the package you actually need.
          </h2>
          <p className="mt-4 text-sm leading-relaxed opacity-60 max-w-xl">
            Add anything to any tier. No bundled fluff — just the pieces that move
            your business forward.
          </p>
        </div>

        <div ref={tableRef} className="mt-12 glass-card-static overflow-hidden">
          {addons.map((addon, i) => (
            <div
              key={addon.name}
              className={`flex items-start justify-between px-6 py-5 gap-8 transition-all duration-300 hover:bg-white/[0.04] ${
                i !== addons.length - 1 ? "border-b border-white/10" : ""
              }`}
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm leading-snug opacity-80">{addon.name}</span>
                {addon.note && (
                  <span className="text-xs opacity-40 leading-relaxed">{addon.note}</span>
                )}
              </div>
              <span className="text-sm font-bold text-amber shrink-0 text-right">
                {addon.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
