"use client";

import Link from "next/link";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { useParallax } from "@/lib/useParallax";

interface CTASectionProps {
  headline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  variant?: "flat" | "gradient" | "transparent";
}

export function CTASection({
  headline = "Ready for a Nyoo standard?",
  ctaLabel = "Book Your Free Call",
  ctaHref = "/book",
  variant = "flat",
}: CTASectionProps) {
  const isGradient = variant === "gradient";
  const ref = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.8 });
  const orbsParallax = useParallax<HTMLDivElement>({ speed: 0.35 });

  return (
    <section
      className="relative text-white px-6 py-24 md:py-32 overflow-hidden"
      style={
        isGradient
          ? {
              background: "radial-gradient(ellipse at 80% 50%, rgba(27,68,216,0.22) 0%, transparent 60%), #0D0A09",
            }
          : undefined
      }
    >
      {!isGradient && variant !== "transparent" && (
        <div className="absolute inset-0 bg-soft-black" />
      )}

      {/* Floating ambient orbs */}
      <div ref={orbsParallax} className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="orb orb-cobalt w-[350px] h-[350px] -top-20 right-1/4"
          style={{ animation: "float-slow 12s ease-in-out infinite" }}
        />
        <div
          className="orb orb-red w-[250px] h-[250px] bottom-0 left-1/6"
          style={{ animation: "float-medium 10s ease-in-out infinite" }}
        />
      </div>

      <GrainOverlay />
      <div
        ref={ref}
        className="relative mx-auto max-w-[1200px] flex flex-col md:flex-row md:items-center md:justify-between gap-8"
      >
        <h2 className="font-title text-4xl md:text-6xl font-bold leading-tight max-w-xl">
          {headline}
        </h2>
        <Link
          href={ctaHref}
          className="inline-flex shrink-0 items-center justify-center bg-red text-white px-8 py-4 text-base font-bold tracking-wide transition-all duration-300 hover:bg-red/90 hover:-translate-y-1 hover:shadow-xl hover:shadow-red/25"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
