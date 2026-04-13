"use client";

import Link from "next/link";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

export function HeroHome() {
  return (
    <section
      className="relative overflow-hidden flex flex-col"
      style={{
        minHeight: "100svh",
        background: "var(--black)",
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* Red top stripe */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "var(--red)",
          zIndex: 3,
        }}
      />

      {/* Film grain */}
      <GrainOverlay opacity={0.4} />

      {/* Meta bar */}
      <div
        className="hero-meta-bar relative flex justify-between items-center"
        style={{
          paddingTop: "80px",
          paddingLeft: "var(--px)",
          paddingRight: "var(--px)",
          zIndex: 2,
          opacity: 0,
          animation: "fadein 0.6s ease forwards 0.3s",
          animationFillMode: "both",
        }}
      >
        <span
          style={{
            fontSize: "clamp(10px, 1.2vw, 13px)",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          Washington, DC Metro
        </span>
        <span style={{ fontSize: "11px", letterSpacing: "0.1em", color: "var(--muted)" }}>
          Est. 2024
        </span>
      </div>

      {/* Viewport-filling headline */}
      <div
        className="relative flex flex-col justify-center flex-1"
        style={{
          padding: `clamp(16px, 3vw, 40px) var(--px) 0`,
          zIndex: 2,
        }}
      >
        {(["YOUR SOCIAL", "MEDIA SHOULD", "BE CLOSING", "DEALS."] as const).map(
          (line, i) => (
            <span
              key={line}
              className="block"
              style={{ overflow: "hidden", lineHeight: "0.88", marginBottom: "clamp(4px, 0.5vw, 8px)" }}
            >
              <span
                className="block"
                style={{
                  fontSize: "clamp(52px, 13.5vw, 200px)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  color: i === 3 ? "var(--red)" : "var(--cream, #F0EBE1)",
                  transform: "translateY(105%)",
                  animation: "slideup 0.85s cubic-bezier(0.16,1,0.3,1) forwards",
                  animationFillMode: "both",
                  animationDelay: `${0.5 + i * 0.18}s`,
                }}
              >
                {line}
              </span>
            </span>
          )
        )}
      </div>

      {/* Footer row */}
      <div
        className="hero-foot relative grid gap-5"
        style={{
          gridTemplateColumns: "1fr",
          padding: `clamp(24px, 4vw, 48px) var(--px) clamp(28px, 5vw, 56px)`,
          borderTop: "1px solid var(--rule)",
          marginTop: "clamp(20px, 3vw, 40px)",
          zIndex: 2,
          opacity: 0,
          animation: "fadein 0.7s ease forwards 1.4s",
          animationFillMode: "both",
        }}
      >
        <p
          style={{
            fontSize: "clamp(14px, 1.8vw, 18px)",
            lineHeight: 1.7,
            color: "var(--muted)",
            maxWidth: "560px",
          }}
        >
          Nyoo Studio builds social media systems that generate qualified leads for
          established small businesses in DC Metro. Not vanity metrics. Leads.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <Link
            href="/book"
            className="inline-flex items-center gap-3 font-bold whitespace-nowrap transition-opacity hover:opacity-80"
            style={{
              fontSize: "clamp(12px, 1.3vw, 14px)",
              letterSpacing: "0.07em",
              background: "var(--red)",
              color: "white",
              padding: "clamp(12px, 1.5vw, 16px) clamp(18px, 2.5vw, 28px)",
            }}
          >
            Book Your Strategy Call →
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
            style={{ fontSize: "12px", color: "var(--muted)", letterSpacing: "0.08em" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream, #F0EBE1)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            See how it works →
          </Link>
        </div>
      </div>
    </section>
  );
}
