import Link from "next/link";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

interface CTASectionProps {
  headline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  variant?: "flat" | "gradient" | "transparent";
}

export function CTASection({
  headline = "Ready for a Nyoo standard?",
  ctaLabel = "Book Your Free Call",
  ctaHref = "/contact",
  variant = "flat",
}: CTASectionProps) {
  const isGradient = variant === "gradient";

  return (
    <section
      className="relative text-white px-6 py-24 md:py-32"
      style={
        isGradient
          ? { background: "linear-gradient(135deg, #0D0A09 0%, #111a3a 55%, #1B44D8 100%)" }
          : undefined
      }
    >
      {!isGradient && variant !== "transparent" && <div className="absolute inset-0 bg-soft-black" />}
      <GrainOverlay />
      <div className="relative mx-auto max-w-[1200px] flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <h2 className="font-title text-4xl md:text-6xl font-bold leading-tight max-w-xl">
          {headline}
        </h2>
        <Link
          href={ctaHref}
          className="inline-flex shrink-0 items-center justify-center bg-red text-white px-8 py-4 text-base font-bold tracking-wide transition-colors hover:bg-red/90"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
