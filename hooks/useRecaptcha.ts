"use client";

import { useCallback, useEffect } from "react";

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

const SITE_KEY: string | undefined =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

let recaptchaReady: Promise<void>;

export function useRecaptcha() {
  useEffect(() => {
    if (!SITE_KEY) {
      console.error(
        "[useRecaptcha] NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set"
      );
      return;
    }
    if (document.querySelector(`script[src*="recaptcha/api.js"]`)) {
      if (!recaptchaReady) recaptchaReady = Promise.resolve();
      return;
    }
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
    async (action: string): Promise<string> => {
      if (!recaptchaReady) {
        throw new Error("reCAPTCHA not initialized");
      }
      await recaptchaReady;
      return new Promise<string>((resolve, reject) => {
        const g = window.grecaptcha;
        if (!g) {
          reject(new Error("grecaptcha unavailable after load"));
          return;
        }
        g.ready(async () => {
          try {
            resolve(await g.execute(SITE_KEY as string, { action }));
          } catch (err) {
            reject(err);
          }
        });
      });
    },
    []
  );

  return { executeRecaptcha };
}
