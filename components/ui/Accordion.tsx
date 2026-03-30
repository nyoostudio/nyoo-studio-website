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
    <div className="border-b border-current/20">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-5 text-left font-bold text-lg transition-colors hover:opacity-80"
      >
        <span>{item.question}</span>
        <span
          className={cn(
            "shrink-0 text-red transition-transform duration-200",
            isOpen ? "rotate-45" : "rotate-0"
          )}
          aria-hidden
        >
          +
        </span>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96 pb-5" : "max-h-0"
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
