import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

const teaserItems = [
  {
    question: "Who do you work with?",
    answer:
      "Established small businesses in the DC Metro area — typically 2–20 employees with consistent revenue and a need for professional marketing they don't have time to do themselves.",
  },
  {
    question: "What does a typical sprint look like?",
    answer:
      "We plan a month of content at a time. You review and approve everything in Planable before it goes out. No surprises, no last-minute changes.",
  },
  {
    question: "Are your contracts month-to-month?",
    answer:
      "Yes. All retainers are month-to-month. No long-term lock-in. We earn your business every month.",
  },
];

export function FAQTeaser() {
  return (
    <section className="relative bg-soft-black text-white px-6 py-24 md:py-32">
      <GrainOverlay />
      <div className="relative mx-auto max-w-[1200px]">
        <SectionLabel>Common questions</SectionLabel>
        <h2 className="mt-4 font-title text-4xl md:text-5xl font-bold leading-tight max-w-xl">
          A few things people usually ask.
        </h2>
        <div className="mt-12 max-w-2xl">
          <Accordion items={teaserItems} />
        </div>
        <Link
          href="/faq"
          className="mt-10 inline-flex items-center gap-2 font-bold text-base transition-opacity hover:opacity-60"
        >
          See all FAQs <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
