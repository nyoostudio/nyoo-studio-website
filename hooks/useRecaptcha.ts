"use client";

import { useEffect, useCallback } from "react";

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        opts: { action: string }
      ) => Promise<string>;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

export function useRecaptcha() {
  useEffect(() => {
    if (document.querySelector(`script[src*="recaptcha/api.js"]`)) return;
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const executeRecaptcha = useCallback(
    (action: string): Promise<string> =>
      new Promise((resolve, reject) => {
        if (typeof window === "undefined" || !window.grecaptcha) {
          reject(new Error("reCAPTCHA not loaded"));
          return;
        }
        window.grecaptcha.ready(async () => {
          try {
            const token = await window.grecaptcha.execute(SITE_KEY, {
              action,
            });
            resolve(token);
          } catch (err) {
            reject(err);
          }
        });
      }),
    []
  );

  return { executeRecaptcha };
}
