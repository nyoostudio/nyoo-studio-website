"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export function CTASectionHome() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const spacer = document.getElementById("cta-spacer");
    if (!spacer) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      section.classList.add("cta-active");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add("cta-active");
          } else {
            section.classList.remove("cta-active");
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(spacer);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .cta-inner {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cta-active .cta-inner {
          opacity: 1;
          transform: translateY(0);
        }
        .cta-foot-row {
          display: flex;
          flex-direction: column;
          gap: 20px;
          border-top: 1px solid var(--rule);
          padding-top: clamp(28px, 4vw, 48px);
        }
        @media (min-width: 640px) {
          .cta-foot-row { flex-direction: row; justify-content: space-between; align-items: center; }
        }
      `}</style>

      <section
        ref={sectionRef}
        aria-label="Get started with Nyoo Studio"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          minHeight: "100svh",
          zIndex: 1,
          background: "var(--black)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: `clamp(80px, 12vw, 160px) var(--px)`,
        }}
      >
        {/* Subtle red atmospheric glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "70%",
            height: "320px",
            background: "radial-gradient(ellipse, rgba(196,18,48,0.13) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Content — animates in when cta-active class is added */}
        <div className="cta-inner relative">
          {/* Headline with dim/bright contrast */}
          <h2
            style={{
              fontSize: "clamp(48px, 11vw, 160px)",
              fontWeight: 700,
              letterSpacing: "-0.05em",
              lineHeight: 0.9,
              marginBottom: "clamp(36px, 5vw, 64px)",
            }}
          >
            <span style={{ color: "var(--muted)" }}>READY TO KNOW</span>
            <br />
            <span style={{ color: "var(--muted)" }}>WHERE YOUR</span>
            <br />
            <span style={{ color: "var(--cream, #F0EBE1)" }}>NEXT CLIENT</span>
            <br />
            <span style={{ color: "var(--red)" }}>COMES FROM?</span>
          </h2>

          <div className="cta-foot-row">
            <p
              style={{
                fontSize: "clamp(14px, 1.5vw, 16px)",
                lineHeight: 1.65,
                color: "var(--muted)",
                maxWidth: "400px",
              }}
            >
              Book a free 30-minute strategy call. No pitch, no pressure — just an
              honest conversation about your marketing.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-3 font-bold whitespace-nowrap flex-shrink-0 transition-opacity hover:opacity-80"
              style={{
                fontSize: "clamp(13px, 1.4vw, 15px)",
                letterSpacing: "0.07em",
                background: "var(--red)",
                color: "white",
                padding: "clamp(14px, 2vw, 18px) clamp(22px, 3vw, 32px)",
              }}
            >
              Book Your Strategy Call →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
