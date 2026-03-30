"use client";

import { Accordion } from "@/components/ui/Accordion";
import { SectionLabel } from "@/components/ui/SectionLabel";

interface FAQCategory {
  category: string;
  items: { question: string; answer: string }[];
}

interface FAQContentProps {
  categories: FAQCategory[];
}

export function FAQContent({ categories }: FAQContentProps) {
  return (
    <section className="relative bg-soft-black text-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] grid md:grid-cols-[280px_1fr] gap-16 md:gap-24 items-start">
        {/* Sticky category nav — desktop only */}
        <nav className="hidden md:flex flex-col gap-3 sticky top-8">
          {categories.map((cat) => (
            <a
              key={cat.category}
              href={`#${cat.category.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-")}`}
              className="text-sm font-bold tracking-widest uppercase opacity-40 hover:opacity-100 hover:text-amber transition-all duration-200"
            >
              {cat.category}
            </a>
          ))}
        </nav>

        {/* FAQ accordion sections */}
        <div className="flex flex-col gap-16">
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
