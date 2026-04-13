"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

const stats = [
  { number: "27", unit: "yr", label: "Combined experience in brand, content & systems" },
  { number: "DC", unit: "", label: "Metro focused. We know this market." },
  { number: "$0", unit: "", label: "Lock-in. Month-to-month by default, always." },
  { number: "2", unit: "", label: "Founders. Every client gets both of us." },
];

export function SocialProofSection() {
  const gridRef = useScrollReveal<HTMLDivElement>({
    staggerChildren: true,
    stagger: 0.1,
    y: 16,
    duration: 0.5,
    start: "top 80%",
  });

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "var(--cream, #F0EBE1)",
        padding: `clamp(60px, 10vw, 120px) var(--px)`,
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* Grain — multiply blend for cream bg */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.25,
          mixBlendMode: "multiply",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Eyebrow */}
      <p
        className="relative"
        style={{
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--red)",
          marginBottom: "clamp(36px, 6vw, 72px)",
        }}
      >
        Why Nyoo Studio
      </p>

      {/* Stats grid */}
      <div
        ref={gridRef}
        className="relative grid grid-cols-2 md:grid-cols-4"
        style={{
          borderTop: "1px solid rgba(8,8,8,0.1)",
        }}
      >
        {stats.map(({ number, unit, label }, i) => (
          <div
            key={number}
            className={`
              relative py-[clamp(24px,4vw,48px)] border-b border-black/10 last:border-b-0
              ${i % 2 === 0 ? "pr-[clamp(16px,3vw,40px)] border-r" : "pl-[clamp(16px,3vw,40px)] border-r-0"}
              md:border-b-0 md:border-r md:last:border-r-0
              md:first:pl-0 md:pl-[clamp(16px,3vw,40px)] md:pr-[clamp(16px,3vw,40px)]
              md:last:pr-0
            `}
          >
            <span
              className="block"
              style={{
                fontSize: "clamp(56px, 9vw, 120px)",
                fontWeight: 700,
                letterSpacing: "-0.05em",
                lineHeight: 1,
                color: "#080808",
              }}
            >
              {number}
              {unit && (
                <span style={{ fontSize: "0.45em" }}>{unit}</span>
              )}
            </span>
            <p
              style={{
                fontSize: "clamp(12px, 1.3vw, 14px)",
                lineHeight: 1.5,
                color: "rgba(8,8,8,0.5)",
                marginTop: "clamp(6px, 1vw, 12px)",
              }}
            >
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
