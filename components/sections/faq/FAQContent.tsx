"use client";

import { Accordion } from "@/components/ui/Accordion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useScrollReveal } from "@/lib/useScrollReveal";

interface FAQCategory {
  category: string;
  items: { question: string; answer: string }[];
}

interface FAQContentProps {
  categories: FAQCategory[];
}

export function FAQContent({ categories }: FAQContentProps) {
  const contentRef = useScrollReveal<HTMLDivElement>({
    staggerChildren: true,
    stagger: 0.15,
    y: 30,
    duration: 0.7,
  });

  return (
    <section className="relative bg-soft-black text-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] grid md:grid-cols-[280px_1fr] gap-16 md:gap-24 items-start">
        {/* Sticky category nav — desktop only */}
        <nav className="hidden md:flex flex-col gap-3 sticky top-[96px] glass-card-static p-6 rounded-lg">
          {categories.map((cat) => (
            <a
              key={cat.category}
              href={`#${cat.category.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-")}`}
              className="text-sm font-bold tracking-widest uppercase opacity-40 hover:opacity-100 hover:text-red focus-visible:opacity-100 focus-visible:text-red focus-visible:outline-none focus-visible:underline transition-all duration-300"
            >
              {cat.category}
            </a>
          ))}
        </nav>

        {/* FAQ accordion sections */}
        <div ref={contentRef} className="flex flex-col gap-16">
          {categories.map((cat) => (
            <div
              key={cat.category}
              id={cat.category.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-")}
            >
              <SectionLabel>{cat.category}</SectionLabel>
              <Accordion items={cat.items} className="mt-6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
