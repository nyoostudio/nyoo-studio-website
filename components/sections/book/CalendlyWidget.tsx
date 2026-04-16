"use client";

import { useEffect, useRef, useState, useCallback } from "react";

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
  const initializedRef = useRef(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // The base URL for the scheduling page. Styling is handled via query params in the URL itself 
  // as per Calendly's standard embed format, or via the JS API if needed.
  const baseUrl = "https://calendly.com/jin-nyoostudio/30min?background_color=000000&text_color=ffffff";

  const initWidget = useCallback(() => {
    if (!window.Calendly || !containerRef.current || initializedRef.current) return;

    window.Calendly.initInlineWidget({
      url: baseUrl,
      parentElement: containerRef.current,
      prefill: { name, email },
    });
    
    initializedRef.current = true;
  }, [name, email, baseUrl]);

  useEffect(() => {
    // 1. Check if Calendly is already present in the global window
    if (window.Calendly) {
      setScriptLoaded(true);
      return;
    }

    // 2. Check if the script tag already exists in the document (from previous mount)
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${CALENDLY_SCRIPT_SRC}"]`
    );

    if (existingScript) {
      const handleLoad = () => setScriptLoaded(true);
      existingScript.addEventListener("load", handleLoad);
      // Ensure we check again in case it loaded between query and listener
      if (window.Calendly) setScriptLoaded(true);
      return () => existingScript.removeEventListener("load", handleLoad);
    }

    // 3. If no script exists, create and inject it
    const script = document.createElement("script");
    script.src = CALENDLY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.head.appendChild(script);
  }, []);

  // Initialize the widget once BOTH the script is loaded AND the container is ready
  useEffect(() => {
    if (scriptLoaded) {
      initWidget();
    }
  }, [scriptLoaded, initWidget]);

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
