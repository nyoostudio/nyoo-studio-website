"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  /** Y offset to animate from (default: 50) */
  y?: number;
  /** Slight rotateX tilt in degrees (default: 3) */
  rotateX?: number;
  /** Duration in seconds (default: 0.8) */
  duration?: number;
  /** Stagger delay between child elements (default: 0) */
  stagger?: number;
  /** ScrollTrigger start position (default: "top 85%") */
  start?: string;
  /** Whether to target direct children for stagger (default: false) */
  staggerChildren?: boolean;
  /** Delay before animation starts in seconds (default: 0) */
  delay?: number;
}

/**
 * Hook that reveals an element (or staggers its children) when scrolled into view.
 * Auto-disabled when prefers-reduced-motion is set.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    y = 50,
    rotateX = 3,
    duration = 0.8,
    stagger = 0,
    start = "top 85%",
    staggerChildren = false,
    delay = 0,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const targets = staggerChildren
      ? Array.from(el.children)
      : [el];

    // Set initial state
    gsap.set(targets, {
      opacity: 0,
      y,
      rotateX,
      transformOrigin: "center bottom",
    });

    // Animate on scroll
    gsap.to(targets, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration,
      delay,
      stagger: stagger || 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === el) {
          trigger.kill();
        }
      });
    };
  }, [y, rotateX, duration, stagger, start, staggerChildren, delay]);

  return ref;
}
