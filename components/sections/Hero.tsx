"use client";

import { ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { gsap } from "gsap";
import { useParallax } from "@/lib/useParallax";

interface HeroProps {
  headline: string | ReactNode;
  subhead?: string;
  cta?: ReactNode;
  gradient?: boolean;
  className?: string;
}

export function Hero({ headline, subhead, cta, gradient = false, className }: HeroProps) {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const orbsParallax = useParallax<HTMLDivElement>({ speed: 0.4 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (headlineRef.current) {
      gsap.set(headlineRef.current, { opacity: 0, y: 40 });
      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.9 });
    }

    if (subheadRef.current) {
      gsap.set(subheadRef.current, { opacity: 0, y: 30 });
      tl.to(subheadRef.current, { opacity: 0.9, y: 0, duration: 0.7 }, "-=0.4");
    }

    if (ctaRef.current) {
      const buttons = ctaRef.current.children;
      gsap.set(buttons, { opacity: 0, y: 20 });
      tl.to(buttons, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 }, "-=0.3");
    }

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      className={cn(
        "relative text-white px-6 py-24 md:py-36 overflow-hidden",
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
      {/* Floating ambient orbs */}
      {gradient && (
        <div ref={orbsParallax} aria-hidden className="absolute inset-0 pointer-events-none">
          <div
            className="orb orb-cobalt w-[500px] h-[500px] -top-32 -right-32"
            style={{ animation: "float-slow 12s ease-in-out infinite" }}
          />
          <div
            className="orb orb-purple w-[400px] h-[400px] bottom-0 -left-20"
            style={{ animation: "float-medium 10s ease-in-out infinite" }}
          />
          <div
            className="orb orb-red w-[300px] h-[300px] top-1/2 left-1/3"
            style={{ animation: "float-slow 14s ease-in-out infinite reverse" }}
          />
        </div>
      )}

      <GrainOverlay />
      <div className="relative mx-auto max-w-[1200px]">
        <h1
          ref={headlineRef}
          className="font-title text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight max-w-4xl"
        >
          {headline}
        </h1>
        {subhead && (
          <p
            ref={subheadRef}
            className="mt-6 text-lg md:text-xl leading-relaxed opacity-90 max-w-2xl"
          >
            {subhead}
          </p>
        )}
        {cta && (
          <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4">
            {cta}
          </div>
        )}
      </div>
    </section>
  );
}
