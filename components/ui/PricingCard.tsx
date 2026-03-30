import { cn } from "@/lib/utils";

interface PricingCardProps {
  name: string;
  price: string;
  priceSuffix?: string;
  description: string;
  features: string[];
  badge?: string;
  className?: string;
}

export function PricingCard({
  name,
  price,
  priceSuffix = "/mo",
  description,
  features,
  badge,
  className,
}: PricingCardProps) {
  const isFeatured = !!badge;

  return (
    <div
      className={cn(
        "relative flex flex-col border p-8",
        isFeatured
          ? "border-red bg-soft-black text-white"
          : "border-current/20 bg-transparent",
        className
      )}
    >
      {badge && (
        <span className="absolute -top-3 left-8 bg-red px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
          {badge}
        </span>
      )}

      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-widest opacity-60 mb-2">
          {name}
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-sm opacity-60">{priceSuffix}</span>
        </div>
        <p className="mt-3 text-sm leading-relaxed opacity-70">{description}</p>
      </div>

      <ul className="flex flex-col gap-3 mt-auto">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <span className="text-red font-bold mt-0.5" aria-hidden>
              →
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
