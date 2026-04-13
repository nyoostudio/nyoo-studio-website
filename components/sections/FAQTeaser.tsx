"use client";

import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";

const teaserItems = [
  {
    question: "Who do you work with?",
    answer:
      "Established small businesses in the DC Metro area — typically 2–20 employees with consistent revenue and a need for professional marketing they don't have time to do themselves.",
  },
  {
    question: "What does a typical sprint look like?",
    answer:
      "We plan a month of content at a time. You review and approve everything before it goes out. No surprises, no last-minute changes.",
  },
  {
    question: "Are your contracts month-to-month?",
    answer:
      "Yes. All packages are month-to-month by default — no lock-in. If you want to commit to a 3- or 6-month term upfront, you get a discount (10% and 15% respectively).",
  },
  {
    question: "How long until we see results?",
    answer:
      "Most clients see a meaningful uptick in qualified inquiries within the first 60–90 days. We track real lead metrics, not vanity numbers, so you always know exactly where things stand.",
  },
];

export function FAQTeaser() {
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
      <style>{`
        .faq-grid-wrapper {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(36px, 6vw, 80px);
          align-items: start;
        }
        @media (min-width: 768px) {
          .faq-grid-wrapper { grid-template-columns: 320px 1fr; }
          .faq-sticky-left  { position: sticky; top: 80px; }
        }
      `}</style>

      <div className="faq-grid-wrapper">
        {/* Left: sticky title + link */}
        <div className="faq-sticky-left pb-10">
          <h2
            style={{
              fontSize: "clamp(30px, 5.5vw, 76px)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "#080808",
              marginBottom: "20px",
            }}
          >
            Frequently<br />Asked<br />Questions.
          </h2>
          <p
            style={{
              fontSize: "14px",
              lineHeight: 1.7,
              color: "rgba(8,8,8,0.5)",
              marginBottom: "24px",
              maxWidth: "280px",
            }}
          >
            Jin or Jo. You&apos;ll work with both of us. No account managers or interns doing the heavy lifting.
          </p>
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 font-bold transition-opacity hover:opacity-60"
            style={{ fontSize: "12px", color: "#080808", letterSpacing: "0.08em" }}
          >
            See all FAQs <span style={{ color: "var(--red)" }}>→</span>
          </Link>
        </div>

        {/* Right: accordion */}
        <div style={{ borderTop: "1px solid rgba(8,8,8,0.12)" }}>
          <Accordion items={teaserItems} theme="light" />
        </div>
      </div>
    </section>
  );
}
