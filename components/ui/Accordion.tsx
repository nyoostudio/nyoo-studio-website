"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

interface AccordionEntryProps {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionEntry({ item, isOpen, onToggle }: AccordionEntryProps) {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-5 text-left font-bold text-lg transition-all duration-300 hover:opacity-80 group"
      >
        <span>{item.question}</span>
        <span
          className={cn(
            "shrink-0 text-red text-xl transition-all duration-300",
            isOpen ? "rotate-45 scale-110" : "rotate-0 group-hover:scale-110"
          )}
          aria-hidden
        >
          +
        </span>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-400 ease-out",
          isOpen ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <p className="leading-relaxed opacity-80">{item.answer}</p>
      </div>
    </div>
  );
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("w-full", className)}>
      {items.map((item, i) => (
        <AccordionEntry
          key={i}
          item={item}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}
