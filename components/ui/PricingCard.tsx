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
        "relative flex flex-col p-8 transition-all duration-400 ease-out",
        isFeatured
          ? "glass-card border-red/40 bg-white/[0.06] hover:border-red/60 scale-[1.01]"
          : "glass-card",
        className
      )}
    >
      {badge && (
        <span className="absolute -top-3 left-8 bg-red px-3 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-red/20"
        >
          {badge}
        </span>
      )}

      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-widest opacity-60 mb-2">
          {name}
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-xs opacity-50 mr-1">starting at</span>
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
