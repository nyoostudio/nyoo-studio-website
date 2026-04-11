"use client";

import { useEffect, useRef } from "react";
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

  const initCalendly = () => {
    if (window.Calendly && containerRef.current) {
      // Clear container before initializing to avoid duplicate widgets if re-rendered
      containerRef.current.innerHTML = "";
      
      window.Calendly.initInlineWidget({
        url: baseUrl,
        parentElement: containerRef.current,
        prefill: {
          name,
          email,
        },
      });
    }
  };

  useEffect(() => {
    // If Calendly is already loaded (e.g. from previous navigation)
    if (window.Calendly) {
      initCalendly();
    }
  }, [name, email]);

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
