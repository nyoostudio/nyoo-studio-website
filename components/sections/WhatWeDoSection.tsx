"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

const services = [
  {
    number: "01",
    name: "Lead-First Content Strategy",
    description:
      "We map your content to your sales cycle. Every post, caption, and video is built to attract prospects who are already looking for what you offer — and give them a clear next step.",
  },
  {
    number: "02",
    name: "Social Media That Converts",
    description:
      "Consistent, high-quality presence across the platforms where your customers already spend time. Content calendar, captions, scheduling, community management — all tied back to lead generation goals.",
  },
  {
    number: "03",
    name: "Lead Qualification & Pipeline",
    description:
      "Automated DM flows, intake workflows, lead scoring, and reporting that shows you exactly where your clients are coming from. Built once, running always.",
  },
];

export function WhatWeDoSection() {
  const rowsRef = useScrollReveal<HTMLDivElement>({
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
        borderTop: "1px solid var(--rule)",
      }}
    >
      {/* Two-column intro */}
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
            fontSize: "clamp(36px, 7.5vw, 110px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 0.92,
            color: "var(--cream, #F0EBE1)",
          }}
        >
          What we do. /{" "}
          <br />
          What moves /{" "}
          <br />
          <span style={{ color: "var(--red)" }}>the needle.</span>
        </h2>
        <p
          style={{
            fontSize: "clamp(14px, 1.5vw, 16px)",
            lineHeight: 1.7,
            color: "var(--muted)",
            maxWidth: "480px",
          }}
        >
          Everything we build is designed around one outcome: turning your social
          media presence into a reliable source of qualified leads. We don&apos;t
          post for the sake of posting.
        </p>
      </div>

      {/* Service rows */}
      <div ref={rowsRef} style={{ borderTop: "1px solid var(--rule)" }}>
        {services.map(({ number, name, description }) => (
          <div
            key={number}
            className="grid items-start"
            style={{
              gridTemplateColumns: "clamp(32px, 5vw, 64px) 1fr",
              gap: "clamp(16px, 3vw, 40px)",
              padding: "clamp(24px, 4vw, 48px) 0",
              borderBottom: "1px solid var(--rule)",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "var(--amber)",
                letterSpacing: "0.1em",
                paddingTop: "6px",
              }}
            >
              {number}
            </span>
            <div
              className="grid"
              style={{
                gridTemplateColumns: "1fr",
                gap: "clamp(8px, 2vw, 24px)",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(22px, 3.5vw, 44px)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.0,
                  color: "var(--cream, #F0EBE1)",
                }}
              >
                {name}
              </p>
              <p
                style={{
                  fontSize: "clamp(13px, 1.4vw, 15px)",
                  lineHeight: 1.75,
                  color: "var(--muted)",
                }}
              >
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
