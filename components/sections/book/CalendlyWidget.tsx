"use client";

import { useEffect, useRef, useCallback } from "react";

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

const CALENDLY_SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

export function CalendlyWidget({ name, email }: { name?: string; email?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const baseUrl = "https://calendly.com/jin-nyoostudio/30min?background_color=000000&text_color=ffffff";

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
    // Case 1: Calendly already loaded (returning visitor / already in memory)
    if (window.Calendly) {
      initCalendly();
      return;
    }

    // Case 2: Script tag already in DOM but still loading (e.g. concurrent renders)
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${CALENDLY_SCRIPT_SRC}"]`
    );
    if (existingScript) {
      existingScript.addEventListener("load", initCalendly);
      return () => existingScript.removeEventListener("load", initCalendly);
    }

    // Case 3: First load — inject the script manually
    const script = document.createElement("script");
    script.src = CALENDLY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => initCalendly();
    document.head.appendChild(script);
  }, [initCalendly]);

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="calendly-inline-widget"
        style={{ minWidth: "320px", height: "700px" }}
      />
    </div>
  );
}
