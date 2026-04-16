"use client";

import { useEffect, useRef, useCallback } from "react";
import Script from "next/script";

// Extend Window interface for TypeScript
declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement | null;
        prefill?: {
          name?: string;
          email?: string;
        };
        utm?: Record<string, string>;
      }) => void;
    };
  }
}

export function CalendlyWidget({ name, email }: { name?: string; email?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const baseUrl = "https://calendly.com/jin-nyoostudio/30min?background_color=000000&text_color=ffffff";

  // Stable reference so both useEffect and Script callbacks always use
  // the latest name/email values without stale closures.
  const initCalendly = useCallback(() => {
    if (window.Calendly && containerRef.current) {
      containerRef.current.innerHTML = "";
      window.Calendly.initInlineWidget({
        url: baseUrl,
        parentElement: containerRef.current,
        prefill: { name, email },
      });
    }
  }, [name, email, baseUrl]);

  useEffect(() => {
    // Handles two cases:
    // 1. Script already loaded from a previous visit (cached) — onLoad won't fire again.
    // 2. Re-renders when name/email change after initial load.
    if (window.Calendly) {
      initCalendly();
    }
  }, [initCalendly]);

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="calendly-inline-widget"
        style={{ minWidth: "320px", height: "700px" }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={initCalendly}
      />
    </div>
  );
}
