"use client";

import { cn } from "@/lib/utils";

interface GrainOverlayProps {
  opacity?: number; // 0–1, default 0.10
  className?: string;
}

export function GrainOverlay({ opacity = 0.10, className }: GrainOverlayProps) {
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{ opacity, mixBlendMode: "overlay" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        className="h-full w-full"
      >
        <rect width="100%" height="100%" filter="url(#grain-global)" />
      </svg>
    </span>
  );
}
