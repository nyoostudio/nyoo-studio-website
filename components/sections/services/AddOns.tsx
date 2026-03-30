import { SectionLabel } from "@/components/ui/SectionLabel";

const addons = [
  { name: "Additional social platform", price: "$300/mo" },
  { name: "Extra short-form video scripts (4-pack)", price: "$400/mo" },
  { name: "Extra email newsletter send", price: "$200/ea" },
  { name: "Paid ad creative — additional set (2 ads)", price: "$350/mo" },
  { name: "Blog / long-form content (per piece)", price: "$250/ea" },
  { name: "Brand photography direction brief", price: "$500/project" },
  { name: "Social media audit + strategy report", price: "$750/project" },
];

export function AddOns() {
  return (
    <section className="relative bg-soft-black text-white px-6 py-20">
      <div className="mx-auto max-w-[1200px]">
        <SectionLabel>Add-Ons</SectionLabel>
        <h2 className="mt-4 font-title text-3xl md:text-4xl font-bold leading-tight">
          Build the package you actually need.
        </h2>
        <p className="mt-4 text-sm leading-relaxed opacity-60 max-w-xl">
          Add anything to any tier. No bundled fluff — just the pieces that move
          your business forward.
        </p>

        <div className="mt-12 border border-white/10">
          {addons.map((addon, i) => (
            <div
              key={addon.name}
              className={`flex items-center justify-between px-6 py-5 ${
                i !== addons.length - 1 ? "border-b border-white/10" : ""
              }`}
            >
              <span className="text-sm leading-snug opacity-80">{addon.name}</span>
              <span className="text-sm font-bold text-amber shrink-0 ml-8">
                {addon.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
