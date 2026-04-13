"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

const services = [
  {
    number: "01",
    name: "Lead-First Content Strategy",
    description:
      "Content mapped to your sales cycle. Every post, caption, and video is built to attract prospects already looking for what you offer — and give them a clear next step.",
  },
  {
    number: "02",
    name: "Social Media That Converts",
    description:
      "Consistent, high-quality presence across the platforms where your customers spend time. Content calendar, captions, scheduling — all tied to lead generation goals, not vanity metrics.",
  },
  {
    number: "03",
    name: "Pipeline Infrastructure",
    description:
      "The backend systems that capture, qualify, and route leads from social. Built once, running always. You stay focused on running your business.",
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
        padding: `clamp(60px,10vw,140px) var(--px)`,
        borderTop: "1px solid var(--rule)",
        background: "var(--black)",
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* Two-column intro */}
      <div
        className="grid md:grid-cols-2"
        style={{
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
            color: "var(--cream)",
          }}
        >
          What we do.<br />
          <span style={{ color: "var(--red)" }}>What moves<br />the needle.</span>
        </h2>
        <p
          className="md:pt-2"
          style={{
            fontSize: "clamp(14px, 1.5vw, 16px)",
            lineHeight: 1.7,
            color: "var(--muted)",
          }}
        >
          Everything is built around one outcome — turning your social presence into a
          reliable source of qualified leads. We don&apos;t post for the sake of posting.
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
            <div className="grid md:grid-cols-2 md:items-start md:gap-6">
              <p
                style={{
                  fontSize: "clamp(22px, 3.5vw, 44px)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.0,
                  color: "var(--cream)",
                }}
              >
                {name}
              </p>
              <p
                className="md:pt-1.5"
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
