"use client";

import Link from "next/link";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

export function HeroHome() {
  return (
    <section
      className="relative overflow-hidden flex flex-col"
      style={{
        background: "var(--black)",
        position: "relative",
        zIndex: 2,
        height: "calc(100svh - 72px)",
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
      <GrainOverlay opacity={0.12} />

      {/* Meta bar */}
      <div
        className="hero-meta-bar relative flex justify-between items-center"
        style={{
          padding: "80px var(--px) 0",
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
        </span>
        <span style={{ fontSize: "11px", letterSpacing: "0.1em", color: "var(--muted)" }}>
          Est. 2026
        </span>
      </div>

      {/* Viewport-filling headline */}
      <h1
        className="relative flex flex-col justify-center flex-1"
        style={{
          padding: `clamp(16px, 3vw, 40px) var(--px) 0`,
          zIndex: 2,
          fontFamily: "inherit",
        }}
      >
        {(["YOUR SOCIAL", "MEDIA SHOULD", "BE CLOSING", "DEALS."] as const).map(
          (line, i) => (
            <span
              key={line}
              className={`block hl${i + 1}`}
              style={{ overflow: "hidden", lineHeight: "0.88", marginBottom: "clamp(4px, 0.5vw, 8px)" }}
            >
              <span
                className="block"
                style={{
                  fontSize: "clamp(42px, min(13.5vw, 11.5vh), 200px)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  color: i === 3 ? "var(--red)" : "var(--cream)",
                  transform: "translateY(105%)",
                  animation: "slideup 0.85s cubic-bezier(0.16,1,0.3,1) forwards",
                  animationFillMode: "both",
                  animationDelay: `${0.5 + (i === 0 ? 0 : i === 1 ? 0.18 : i === 2 ? 0.36 : 0.54)}s`,
                }}
              >
                {line}
              </span>
            </span>
          )
        )}
      </h1>

      {/* Footer row */}
      <div
        className="hero-foot relative grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-10"
        style={{
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
          established small businesses in DC Metro. Not vanity metrics. Not vague brand awareness. Clients.
        </p>
        <div className="flex flex-col gap-2 items-start sm:items-end">
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
            className="flex items-center gap-1.5 transition-colors whitespace-nowrap"
            style={{ fontSize: "12px", color: "var(--muted)", letterSpacing: "0.08em" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            See how it works →
          </Link>
        </div>
      </div>
    </section>
  );
}
