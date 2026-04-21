"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PillarBarProps {
  label: string;
  subtitle: string;
  score: number;
  maxScore?: number;
  delay?: number;
}

export function PillarBar({ label, subtitle, score, maxScore = 25, delay = 0 }: PillarBarProps) {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = fillRef.current;
    if (!el) return;

    const pct = Math.max(0, Math.min(100, (score / maxScore) * 100));

    if (prefersReduced) {
      el.style.width = `${pct}%`;
      return;
    }

    gsap.fromTo(
      el,
      { width: "0%" },
      { width: `${pct}%`, duration: 0.9, ease: "power3.out", delay: 1.4 + delay }
    );
  }, [score, maxScore, delay]);

  return (
    <div className="grid grid-cols-[1fr_auto] items-baseline gap-4 py-5">
      <div className="flex flex-col gap-1">
        <span
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ color: "var(--amber)" }}
        >
          {label}
        </span>
        <span className="text-sm italic" style={{ color: "var(--muted)", fontFamily: "var(--font-subtitle)" }}>
          {subtitle}
        </span>
      </div>
      <div className="text-right">
        <span className="font-bold text-cream text-2xl tabular-nums">{score}</span>
        <span className="text-xs opacity-40 ml-1">/ {maxScore}</span>
      </div>
      <div
        className="col-span-2 h-[6px] w-full mt-2"
        style={{ background: "rgba(240, 235, 225, 0.06)" }}
      >
        <div
          ref={fillRef}
          className="h-full"
          style={{
            width: 0,
            background: "var(--cobalt)",
            boxShadow: "0 0 12px rgba(27, 68, 216, 0.4)",
          }}
        />
      </div>
    </div>
  );
}
