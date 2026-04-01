import { SectionLabel } from "@/components/ui/SectionLabel";

const discountBlocks = [
  {
    label: "Referral Discount",
    heading: "Send us someone. We'll thank you.",
    body: "Refer a business that signs on with Nyoo Studio and receive a one-month credit on your next invoice. No limits — refer as many as you want.",
    detail: "One month's retainer credited per successful referral.",
  },
  {
    label: "Multi-Client Discount",
    heading: "Own more than one business?",
    body: "If you're managing multiple businesses and want Nyoo's support across all of them, we offer custom pricing for multi-entity engagements. Talk to us.",
    detail: "Pricing determined per engagement — book a call to discuss.",
  },
];

export function ReferralDiscounts() {
  return (
    <section className="relative bg-soft-black text-white px-6 py-10 md:py-12">
      <div className="mx-auto max-w-[1200px]">
        <SectionLabel>More Ways to Save</SectionLabel>
        <div className="mt-12 grid md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {discountBlocks.map((block) => (
            <div key={block.label} className="bg-soft-black p-8 md:p-10">
              <p className="text-xs font-bold uppercase tracking-widest text-amber mb-4">
                {block.label}
              </p>
              <h3 className="font-title text-2xl font-bold leading-snug">
                {block.heading}
              </h3>
              <p className="mt-4 text-sm leading-relaxed opacity-60">{block.body}</p>
              <p className="mt-6 text-xs italic opacity-40">{block.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
