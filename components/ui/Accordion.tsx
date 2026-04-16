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
  theme?: "dark" | "light";
}

interface AccordionEntryProps {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  theme: "dark" | "light";
}

function AccordionEntry({ item, isOpen, onToggle, theme }: AccordionEntryProps) {
  const isDark = theme === "dark";
  return (
    <div
      className={cn(
        "border-b",
        isDark ? "border-white/10" : "border-black/10"
      )}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          "flex w-full items-center justify-between gap-4 py-5 text-left font-bold transition-all duration-300 hover:opacity-70 group",
          isDark ? "text-white" : "text-black"
        )}
        style={{ fontSize: "clamp(15px, 1.8vw, 18px)", letterSpacing: "-0.01em" }}
      >
        <span style={{ lineHeight: 1.2 }}>{item.question}</span>
        <span
          className={cn(
            "shrink-0 text-xl transition-all duration-300",
            isOpen ? "rotate-45 scale-110" : "rotate-0 group-hover:scale-110"
          )}
          style={{ color: "var(--amber)", fontWeight: 300 }}
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
        <p
          className={isDark ? "opacity-80" : ""}
          style={{
            fontSize: "clamp(13px, 1.4vw, 15px)",
            lineHeight: 1.75,
            color: isDark ? "inherit" : "rgba(8,8,8,0.6)",
          }}
        >
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export function Accordion({ items, className, theme = "dark" }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("w-full", className)}>
      {items.map((item, i) => (
        <AccordionEntry
          key={i}
          item={item}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          theme={theme}
        />
      ))}
    </div>
  );
}
