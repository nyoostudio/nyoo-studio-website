"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

const problems = [
  {
    number: "01",
    title: "Engagement with no pipeline",
    body: "Likes and comments don't pay rent. None of it connects to how people actually become your clients. The content looks good. It just doesn't lead anywhere.",
  },
  {
    number: "02",
    title: "Marketing spend you can't trace",
    body: "You've paid agencies and freelancers. They sent reports full of impressions. You still can't name a single client who came from social media.",
  },
  {
    number: "03",
    title: "Referrals don't scale",
    body: "Word of mouth keeps the lights on. It won't build a business. You need a system that generates leads on a schedule, not on luck.",
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
        The gap
      </p>

      {/* Large statement headline */}
      <h2
        style={{
          fontSize: "clamp(36px, 9vw, 130px)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 0.92,
          color: "var(--cream)",
          marginBottom: "clamp(48px, 8vw, 100px)",
        }}
      >
        Posting.<br />
        Getting likes.<br />
        Phone not{" "}
        <span style={{ position: "relative", display: "inline" }}>
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
                color: "var(--cobalt)",
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
                  color: "var(--cream)",
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
