"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

const problems = [
  {
    number: "01",
    title: "You have engagement but no pipeline.",
    body: "Likes, comments, shares — none of it is connected to how people actually become your clients. The content looks good. It just doesn't lead anywhere.",
  },
  {
    number: "02",
    title: "You've invested in marketing that can't prove its value.",
    body: "You've tried agencies, freelancers, maybe even hired someone. They sent you reports full of impressions and reach. You still can't point to a single client that came from social media.",
  },
  {
    number: "03",
    title: "Referrals keep the lights on. They don't scale the business.",
    body: "Your best clients came from word of mouth. Great. But you can't control when the next one shows up. You need a system that generates leads on a schedule, not on luck.",
  },
];

export function ProblemSection() {
  const listRef = useScrollReveal<HTMLDivElement>({
    staggerChildren: true,
    stagger: 0.12,
    y: 20,
    duration: 0.55,
    start: "top 80%",
  });

  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: `clamp(60px, 10vw, 140px) var(--px)`,
        background: "var(--black)",
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* Amber eyebrow */}
      <p
        className="flex items-center gap-3"
        style={{
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--amber)",
          marginBottom: "clamp(20px, 3vw, 36px)",
        }}
      >
        <span style={{ display: "block", width: "28px", height: "1px", background: "var(--amber)" }} aria-hidden />
        The Problem
      </p>

      {/* Large statement headline */}
      <h2
        style={{
          fontSize: "clamp(36px, 9vw, 130px)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 0.92,
          color: "var(--cream, #F0EBE1)",
          marginBottom: "clamp(48px, 8vw, 100px)",
        }}
      >
        Posting. Getting likes.{" "}
        <span style={{ position: "relative", display: "inline-block" }}>
          Phone not{" "}
          <span
            style={{ position: "relative", display: "inline" }}
          >
            ringing.
            <span
              aria-hidden
              style={{
                position: "absolute",
                bottom: "8%",
                left: 0,
                right: 0,
                height: "clamp(2px, 0.4vw, 5px)",
                background: "var(--red)",
                display: "block",
              }}
            />
          </span>
        </span>
      </h2>

      {/* Numbered list */}
      <div
        ref={listRef}
        style={{ borderTop: "1px solid var(--rule)" }}
      >
        {problems.map(({ number, title, body }) => (
          <div
            key={number}
            className="grid items-start"
            style={{
              gridTemplateColumns: "clamp(32px, 5vw, 64px) 1fr",
              gap: "clamp(16px, 3vw, 40px)",
              padding: "clamp(20px, 3vw, 36px) 0",
              borderBottom: "1px solid var(--rule)",
            }}
          >
            <span
              style={{
                fontSize: "clamp(11px, 1.2vw, 13px)",
                fontWeight: 700,
                color: "var(--cobalt, #1B44D8)",
                letterSpacing: "0.1em",
                paddingTop: "4px",
              }}
            >
              {number}
            </span>
            <div>
              <p
                style={{
                  fontSize: "clamp(18px, 2.5vw, 28px)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "var(--cream, #F0EBE1)",
                  marginBottom: "clamp(6px, 1vw, 12px)",
                  lineHeight: 1.1,
                }}
              >
                {title}
              </p>
              <p
                style={{
                  fontSize: "clamp(13px, 1.4vw, 15px)",
                  lineHeight: 1.75,
                  color: "var(--muted)",
                }}
              >
                {body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
