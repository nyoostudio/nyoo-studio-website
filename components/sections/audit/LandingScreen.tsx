"use client";

import { GrainOverlay } from "@/components/ui/GrainOverlay";

interface LandingScreenProps {
  onStart: () => void;
}

export function LandingScreen({ onStart }: LandingScreenProps) {
  return (
    <section className="relative overflow-hidden min-h-[calc(100svh-72px)] flex flex-col">
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
      <GrainOverlay opacity={0.12} />

      <div
        className="relative flex flex-col flex-1 justify-center section-px"
        style={{ paddingTop: "80px", paddingBottom: "80px", zIndex: 2 }}
      >
        <div className="max-w-[1200px] mx-auto w-full">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.22em] mb-6 block"
            style={{ color: "var(--amber)" }}
          >
            15-minute self-audit
          </span>
          <h1
            id="audit-step-heading"
            tabIndex={-1}
            className="font-bold outline-none"
            style={{
              fontSize: "clamp(44px, 9vw, 104px)",
              lineHeight: 0.95,
              letterSpacing: "-0.035em",
              color: "var(--cream)",
              marginBottom: "clamp(24px, 4vw, 40px)",
            }}
          >
            Score your social media<br />
            <span style={{ color: "var(--red)" }}>in 15 minutes.</span>
          </h1>

          <p
            className="max-w-[620px] mb-10"
            style={{
              fontSize: "clamp(16px, 1.8vw, 19px)",
              lineHeight: 1.65,
              color: "var(--muted)",
              fontFamily: "var(--font-subtitle)",
            }}
          >
            Twenty questions across four pillars. Answer honestly and we&apos;ll show you exactly
            where your social is costing you leads &mdash; plus a prioritized action list to fix it.
            Free. No pitch.
          </p>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
            <button
              type="button"
              onClick={onStart}
              className="inline-flex items-center gap-3 font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red/20"
              style={{
                background: "var(--red)",
                color: "white",
                padding: "clamp(14px, 1.8vw, 18px) clamp(24px, 3vw, 36px)",
                fontSize: "clamp(13px, 1.3vw, 15px)",
                letterSpacing: "0.07em",
              }}
            >
              Start the audit &rarr;
            </button>
            <span className="text-xs" style={{ color: "var(--muted)", letterSpacing: "0.08em" }}>
              20 questions &middot; ~15 min &middot; Free
            </span>
          </div>

          <div
            className="mt-16 grid gap-6 sm:grid-cols-4"
            style={{ borderTop: "1px solid var(--rule)", paddingTop: "32px" }}
          >
            {[
              { n: "01", t: "Content", d: "Cadence, variety, brand." },
              { n: "02", t: "Strategy", d: "Goals, audience, voice." },
              { n: "03", t: "Engagement", d: "Replies, community, UGC." },
              { n: "04", t: "Analytics", d: "Data, tracking, pruning." },
            ].map((p) => (
              <div key={p.n} className="flex flex-col gap-1">
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.22em]"
                  style={{ color: "var(--amber)" }}
                >
                  {p.n} &middot; {p.t}
                </span>
                <span
                  className="text-sm italic"
                  style={{ color: "var(--muted)", fontFamily: "var(--font-subtitle)" }}
                >
                  {p.d}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
