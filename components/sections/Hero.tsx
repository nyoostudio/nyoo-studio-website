import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

interface HeroProps {
  headline: string | ReactNode;
  subhead?: string;
  cta?: ReactNode;
  gradient?: boolean;
  className?: string;
}

export function Hero({ headline, subhead, cta, gradient = false, className }: HeroProps) {
  return (
    <section
      className={cn(
        "relative text-white px-6 py-24 md:py-36",
        !gradient && "bg-soft-black",
        className
      )}
      style={
        gradient
          ? {
              background:
                "radial-gradient(circle at 0% 100%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 100% 0%, rgba(27, 68, 216, 0.15) 0%, transparent 50%), #0D0A09",
            }
          : undefined
      }
    >
      <GrainOverlay />
      <div className="relative mx-auto max-w-[1200px]">
        <h1 className="font-title text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight max-w-4xl">
          {headline}
        </h1>
        {subhead && (
          <p className="mt-6 text-lg md:text-xl leading-relaxed opacity-70 max-w-2xl">
            {subhead}
          </p>
        )}
        {cta && <div className="mt-10 flex flex-wrap gap-4">{cta}</div>}
      </div>
    </section>
  );
}
