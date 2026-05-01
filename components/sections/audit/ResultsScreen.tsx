"use client";

import Link from "next/link";
import type { ActionItem, ScoreBundle } from "@/lib/audit/types";
import { PILLAR_META } from "@/lib/audit/types";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { ScoreGauge } from "./ScoreGauge";
import { PillarBar } from "./PillarBar";
import { ActionItemCard } from "./ActionItemCard";

interface ResultsScreenProps {
  scores: ScoreBundle;
  actionItems: ActionItem[];
  firstName: string;
  submitFailed: boolean;
  onRestart: () => void;
}

export function ResultsScreen({
  scores,
  actionItems,
  firstName,
  submitFailed,
  onRestart,
}: ResultsScreenProps) {
  const gradeCopy: Record<string, string> = {
    A: "You're running a tight operation.",
    B: "You're doing most of it right: a few gaps are costing you.",
    C: "There's a real machine hiding here; it's not running yet.",
    D: "You're posting. You're not compounding. Fix the fundamentals.",
    F: "The good news: the biggest gains are the easiest to make.",
  };

  return (
    <section className="relative">
      <GrainOverlay opacity={0.08} />

      {/* Gauge zone */}
      <div
        className="relative section-px py-20 md:py-28"
        style={{ background: "var(--black)", zIndex: 2 }}
      >
        <div className="max-w-[920px] mx-auto w-full flex flex-col items-center text-center gap-8">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{ color: "var(--amber)" }}
          >
            {firstName ? `${firstName}'s audit` : "Your audit"} &middot; Ready
          </span>
          <h1
            id="audit-step-heading"
            tabIndex={-1}
            className="font-bold outline-none"
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--cream)",
            }}
          >
            Your social media score.
          </h1>

          <ScoreGauge score={scores.total} grade={scores.grade} />

          <p
            className="max-w-[520px] italic"
            style={{
              fontSize: "clamp(15px, 1.8vw, 18px)",
              lineHeight: 1.65,
              color: "var(--cream)",
              opacity: 0.72,
              fontFamily: "var(--font-subtitle)",
            }}
          >
            {gradeCopy[scores.grade]}
          </p>
        </div>
      </div>

      {/* Pillar bars zone */}
      <div
        className="relative section-px py-16"
        style={{ background: "var(--black)", borderTop: "1px solid var(--rule)", zIndex: 2 }}
      >
        <div className="max-w-[760px] mx-auto w-full">
          <h2
            className="font-bold mb-8"
            style={{
              fontSize: "clamp(22px, 3vw, 32px)",
              color: "var(--cream)",
              letterSpacing: "-0.015em",
            }}
          >
            Breakdown by pillar.
          </h2>
          <div style={{ borderTop: "1px solid var(--rule)" }}>
            <div style={{ borderBottom: "1px solid var(--rule)" }}>
              <PillarBar
                label="01 \u00b7 Content & Consistency"
                subtitle={PILLAR_META.content.subtitle}
                score={scores.pillarScores.content}
                delay={0}
              />
            </div>
            <div style={{ borderBottom: "1px solid var(--rule)" }}>
              <PillarBar
                label="02 \u00b7 Strategy & Goals"
                subtitle={PILLAR_META.strategy.subtitle}
                score={scores.pillarScores.strategy}
                delay={0.1}
              />
            </div>
            <div style={{ borderBottom: "1px solid var(--rule)" }}>
              <PillarBar
                label="03 \u00b7 Engagement & Community"
                subtitle={PILLAR_META.engagement.subtitle}
                score={scores.pillarScores.engagement}
                delay={0.2}
              />
            </div>
            <div>
              <PillarBar
                label="04 \u00b7 Analytics & Growth"
                subtitle={PILLAR_META.analytics.subtitle}
                score={scores.pillarScores.analytics}
                delay={0.3}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action items zone */}
      <div
        className="relative section-px py-20"
        style={{ background: "var(--black)", borderTop: "1px solid var(--rule)", zIndex: 2 }}
      >
        <div className="max-w-[760px] mx-auto w-full flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span
              className="text-[10px] font-bold uppercase tracking-[0.22em]"
              style={{ color: "var(--amber)" }}
            >
              Your priority list
            </span>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(22px, 3vw, 32px)",
                color: "var(--cream)",
                letterSpacing: "-0.015em",
              }}
            >
              {actionItems.length > 0
                ? "Fix these, in this order."
                : "You've covered the fundamentals. Keep going."}
            </h2>
          </div>

          {actionItems.length > 0 ? (
            <div className="flex flex-col gap-4">
              {actionItems.map((item, i) => (
                <ActionItemCard
                  key={item.id}
                  title={item.title}
                  body={item.body}
                  icon={item.icon}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <p
              className="italic"
              style={{ color: "var(--muted)", fontFamily: "var(--font-subtitle)", fontSize: "16px" }}
            >
              Your audit didn&apos;t flag any critical gaps. That&apos;s rare. The next move is
              scale: compounding what&apos;s already working.
            </p>
          )}
        </div>
      </div>

      {/* CTA zone */}
      <div
        className="relative section-px py-20"
        style={{ background: "var(--black)", borderTop: "1px solid var(--rule)", zIndex: 2 }}
      >
        <div className="max-w-[760px] mx-auto w-full flex flex-col items-center text-center gap-6">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{ color: "var(--amber)" }}
          >
            What's next
          </span>
          <h2
            className="font-bold"
            style={{
              fontSize: "clamp(28px, 4.5vw, 44px)",
              color: "var(--cream)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Want help with these?<br />
            <span style={{ color: "var(--red)" }}>Book a free strategy call.</span>
          </h2>
          <p
            className="max-w-[520px]"
            style={{
              fontSize: "16px",
              lineHeight: 1.65,
              color: "var(--muted)",
              fontFamily: "var(--font-subtitle)",
            }}
          >
            30 minutes. No pitch, no pressure. We&apos;ll talk through your top priorities and
            tell you honestly whether we&apos;re the right fit.
          </p>
          <div className="flex flex-col gap-3 items-center pt-2">
            <Link
              href="/book"
              className="inline-flex items-center gap-3 font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red/20"
              style={{
                background: "var(--red)",
                color: "white",
                padding: "16px 32px",
                fontSize: "14px",
                letterSpacing: "0.07em",
              }}
            >
              Book a free strategy call &rarr;
            </Link>
            <button
              type="button"
              onClick={onRestart}
              className="min-h-[44px] flex items-center text-xs font-bold uppercase tracking-[0.18em] transition-opacity hover:opacity-60 px-2"
              style={{ color: "var(--muted)" }}
            >
              Start another audit
            </button>
          </div>
          {submitFailed && (
            <p
              className="text-xs italic pt-4 max-w-[500px]"
              style={{ color: "var(--muted)", opacity: 0.6 }}
            >
              Note: we couldn&apos;t save a copy of your results to email. Your score is shown above
              &mdash; reach out at{" "}
              <a href="mailto:hello@nyoostudio.com" className="underline">
                hello@nyoostudio.com
              </a>{" "}
              if you&apos;d like a copy.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
