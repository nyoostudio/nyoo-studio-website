"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxOptions {
  /** Speed multiplier (0–1). Lower = slower movement = more depth. Default: 0.3 */
  speed?: number;
  /** Direction of parallax. Default: "y" */
  direction?: "y" | "x";
}

/**
 * Hook that applies a parallax scrolling effect to an element.
 * The element moves slower than scroll to create depth.
 * Auto-disabled when prefers-reduced-motion is set.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: ParallaxOptions = {}
) {
  const ref = useRef<T>(null);
  const { speed = 0.3, direction = "y" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const prop = direction === "y" ? "yPercent" : "xPercent";

    gsap.to(el, {
      [prop]: -20 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === el) {
          trigger.kill();
        }
      });
    };
  }, [speed, direction]);

  return ref;
}
