"use client";

import { useEffect, useCallback } from "react";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        opts: { action: string }
      ) => Promise<string>;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

let recaptchaReady: Promise<void>;

export function useRecaptcha() {
  useEffect(() => {
    if (!SITE_KEY) {
      console.error("[useRecaptcha] NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set");
      return;
    }
    if (document.querySelector(`script[src*="recaptcha/api.js"]`)) return;
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    recaptchaReady = new Promise<void>((res, rej) => {
      script.onload = () => res();
      script.onerror = () => rej(new Error("reCAPTCHA failed to load"));
    });
    document.head.appendChild(script);
  }, []);

  const executeRecaptcha = useCallback(
    (action: string): Promise<string> =>
      new Promise((resolve, reject) => {
        if (!recaptchaReady) {
          reject(new Error("reCAPTCHA not initialized"));
          return;
        }
        recaptchaReady
          .then(() => {
            window.grecaptcha!.ready(async () => {
              try {
                const token = await window.grecaptcha!.execute(SITE_KEY, {
                  action,
                });
                resolve(token);
              } catch (err) {
                reject(err);
              }
            });
          })
          .catch(reject);
      }),
    []
  );

  return { executeRecaptcha };
}
