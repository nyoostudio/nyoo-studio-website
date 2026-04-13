"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    label: "STEP 01",
    title: "Strategy Call",
    description:
      "A 30-minute conversation about your business, your sales cycle, and where leads are coming from today. We listen more than we talk.",
  },
  {
    label: "STEP 02",
    title: "Lead Generation Plan",
    description:
      "We build a content strategy mapped to your sales funnel — tailored to your voice, your ideal client, and the platforms where they're most reachable. You review it. We adjust.",
  },
  {
    label: "STEP 03",
    title: "We Build Your Pipeline",
    description:
      "Content goes live. Lead flows get activated. Reporting starts tracking what matters — not impressions, but inquiries. You stay focused on running your business.",
  },
];

export function HowItWorksSection() {
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = stepsRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      Array.from(container.children).forEach((child) => {
        (child as HTMLElement).style.opacity = "1";
        (child as HTMLElement).style.transform = "translateY(0)";
        const bar = child.querySelector(".step-bar") as HTMLElement | null;
        if (bar) bar.style.width = "40px";
      });
      return;
    }

    const stepEls = Array.from(container.children) as HTMLElement[];

    stepEls.forEach((stepEl, i) => {
      const bar = stepEl.querySelector(".step-bar") as HTMLElement | null;

      gsap.set(stepEl, { opacity: 0, y: 16 });
      if (bar) gsap.set(bar, { width: 0 });

      gsap.to(stepEl, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        delay: i * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      if (bar) {
        gsap.to(bar, {
          width: "40px",
          duration: 0.5,
          delay: i * 0.1 + 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === container) t.kill();
      });
    };
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: `clamp(60px, 10vw, 140px) var(--px)`,
        background: "var(--black)",
        position: "relative",
        zIndex: 2,
        borderTop: "1px solid var(--rule)",
      }}
    >
      <style>{`
        .process-steps-grid {
          display: grid;
          grid-template-columns: 1fr;
          border-top: 1px solid var(--rule);
        }
        @media (min-width: 768px) {
          .process-steps-grid { grid-template-columns: repeat(3, 1fr); }
          .process-step-col {
            padding-left: clamp(28px, 4vw, 48px);
            padding-right: clamp(28px, 4vw, 48px);
            border-bottom: none !important;
            border-left: 1px solid var(--rule);
          }
          .process-step-col:first-child {
            padding-left: 0;
            border-left: none;
          }
          .process-step-col:last-child { padding-right: 0; }
        }
      `}</style>

      {/* Two-column header */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "1fr",
          gap: "clamp(16px, 3vw, 32px)",
          marginBottom: "clamp(48px, 7vw, 80px)",
          alignItems: "end",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(32px, 7vw, 100px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 0.92,
            color: "var(--cream, #F0EBE1)",
          }}
        >
          No onboarding decks.<br />No 12-week<br />discovery phases.
        </h2>
        <p
          style={{
            fontSize: "clamp(14px, 1.5vw, 16px)",
            lineHeight: 1.7,
            color: "var(--muted)",
            maxWidth: "480px",
          }}
        >
          We move fast. Three steps from first conversation to live content.
        </p>
      </div>

      {/* Three steps */}
      <div ref={stepsRef} className="process-steps-grid">
        {steps.map(({ label, title, description }) => (
          <div
            key={label}
            className="relative process-step-col"
            style={{
              padding: `clamp(28px, 4vw, 48px) 0`,
              borderBottom: "1px solid var(--rule)",
            }}
          >
            {/* Red bar — GSAP animates its width */}
            <div
              className="step-bar"
              aria-hidden
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "3px",
                width: 0,
                background: "var(--red)",
              }}
            />
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: "var(--muted)",
                marginBottom: "clamp(16px, 2.5vw, 28px)",
              }}
            >
              {label}
            </p>
            <h3
              style={{
                fontSize: "clamp(20px, 2.5vw, 30px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "var(--cream, #F0EBE1)",
                marginBottom: "clamp(10px, 1.5vw, 16px)",
                lineHeight: 1.1,
              }}
            >
              {title}
            </h3>
            <p
              style={{
                fontSize: "clamp(13px, 1.3vw, 14px)",
                lineHeight: 1.75,
                color: "var(--muted)",
              }}
            >
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
