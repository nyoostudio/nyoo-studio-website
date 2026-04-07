"use client";

import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { useScrollReveal } from "@/lib/useScrollReveal";

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
      "Yes. All packages are month-to-month by default — no lock-in. If you want to commit to a 3- or 6-month term upfront, you get a discount (10% and 15% respectively). Either way, you're never stuck in a contract you didn't choose.",
  },
];

export function FAQTeaser() {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.8 });
  const contentRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.7, delay: 0.2 });

  return (
    <section className="relative bg-soft-black text-white px-6 py-24 md:py-32">
      <GrainOverlay />
      <div className="relative mx-auto max-w-[1200px]">
        <div ref={headingRef}>
          <SectionLabel>Common questions</SectionLabel>
          <h2 className="mt-4 font-title text-4xl md:text-5xl font-bold leading-tight max-w-xl">
            A few things people usually ask.
          </h2>
        </div>
        <div ref={contentRef} className="mt-12 max-w-2xl">
          <Accordion items={teaserItems} />
        </div>
        <Link
          href="/faq"
          className="mt-10 inline-flex items-center gap-2 font-bold text-base transition-all duration-300 hover:opacity-60 hover:gap-3 group"
        >
          See all FAQs <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}
