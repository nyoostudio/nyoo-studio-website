"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Crunching your answers\u2026",
  "Weighing your pillars\u2026",
  "Drafting your action plan\u2026",
];

export function GeneratingScreen() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % MESSAGES.length), 500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-[calc(100svh-72px)] flex flex-col items-center justify-center section-px py-20">
      <div className="flex flex-col items-center gap-8">
        <div
          className="relative w-16 h-16"
          style={{
            border: "2px solid rgba(240, 235, 225, 0.08)",
            borderTopColor: "var(--red)",
            borderRadius: "50%",
            animation: "spin 0.9s linear infinite",
          }}
        />
        <p
          id="audit-step-heading"
          tabIndex={-1}
          className="text-sm italic outline-none"
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-subtitle)",
            letterSpacing: "0.02em",
          }}
        >
          {MESSAGES[idx]}
        </p>
      </div>
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
