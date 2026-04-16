"use client";

import { useEffect, useState } from "react";

const CALENDLY_SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

export function CalendlyWidget({ name, email }: { name?: string; email?: string }) {
  const [isScriptInjected, setIsScriptInjected] = useState(false);

  // Construct the URL with prefill data directly in the query strings.
  // This is the most robust way to pass data when using the declarative embed.
  const queryParams = new URLSearchParams();
  if (name) queryParams.set("name", name);
  if (email) queryParams.set("email", email);
  
  // Custom styling params
  queryParams.set("background_color", "000000");
  queryParams.set("text_color", "ffffff");
  queryParams.set("primary_color", "c41230");

  const finalUrl = `https://calendly.com/jin-nyoostudio/30min?${queryParams.toString()}`;

  useEffect(() => {
    // 1. Check if the script is already in the document
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${CALENDLY_SCRIPT_SRC}"]`
    );

    if (existingScript) {
      setIsScriptInjected(true);
      // If window.Calendly is already here, it might have already processed the DOM.
      // We might need to tell it to look again if the div was just mounted.
      if (typeof window !== "undefined" && (window as any).Calendly?.initBadgeWidget) {
         // Some versions have a refresh/init function, but usually mounting the div
         // *before* the script loads or using a script that is already loaded works.
      }
      return;
    }

    // 2. Inject the script if not present
    const script = document.createElement("script");
    script.src = CALENDLY_SCRIPT_SRC;
    script.async = true;
    document.head.appendChild(script);
    setIsScriptInjected(true);
  }, []);

  return (
    <div className="w-full">
      {/* 
        Declarative Approach: 
        Calendly's widget.js automatically finds any element with 'calendly-inline-widget' 
        and initializes it using the 'data-url'. This avoids race conditions with 
        manual initInlineWidget calls that often cause the 'split' TypeError.
      */}
      <div
        className="calendly-inline-widget"
        data-url={finalUrl}
        style={{ minWidth: "320px", height: "700px" }}
      />
    </div>
  );
}
