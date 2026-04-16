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
        pageSettings?: {
          backgroundColor?: string;
          hideEventTypeDetails?: boolean;
          hideLandingPageDetails?: boolean;
          primaryColor?: string;
          textColor?: string;
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

  // Clean URL without query params — styles are passed via pageSettings instead
  const baseUrl = "https://calendly.com/jin-nyoostudio/30min";

  const initWidget = useCallback(() => {
    if (!window.Calendly || !containerRef.current || initializedRef.current) return;

    window.Calendly.initInlineWidget({
      url: baseUrl,
      parentElement: containerRef.current,
      prefill: {
        name: name || undefined,
        email: email || undefined,
      },
      pageSettings: {
        backgroundColor: "000000",
        textColor: "ffffff",
        primaryColor: "c41230",
      },
    });
    
    initializedRef.current = true;
  }, [name, email, baseUrl]);

  useEffect(() => {
    // 1. Check if Calendly is already present in the global window
    if (window.Calendly) {
      setScriptLoaded(true);
      return;
    }

    // 2. Check if the script tag already exists in the document
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${CALENDLY_SCRIPT_SRC}"]`
    );

    if (existingScript) {
      const handleLoad = () => setScriptLoaded(true);
      existingScript.addEventListener("load", handleLoad);
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
        id="calendly-widget-container"
        ref={containerRef}
        className="calendly-inline-widget"
        style={{ minWidth: "320px", height: "700px" }}
      />
    </div>
  );
}
