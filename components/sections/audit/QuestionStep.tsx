"use client";

import type { Points, Question } from "@/lib/audit/types";
import { ProgressRail } from "./ProgressRail";

interface QuestionStepProps {
  question: Question;
  currentPillar: 0 | 1 | 2 | 3;
  currentQ: 0 | 1 | 2 | 3 | 4;
  selected?: Points;
  onAnswer: (points: Points) => void;
  onBack: () => void;
  onNext: () => void;
}

export function QuestionStep({
  question,
  currentPillar,
  currentQ,
  selected,
  onAnswer,
  onBack,
  onNext,
}: QuestionStepProps) {
  const canProceed = selected !== undefined;

  return (
    <section className="relative min-h-[calc(100svh-72px)] flex flex-col section-px py-16">
      <div className="max-w-[780px] mx-auto w-full flex flex-col gap-10">
        <ProgressRail currentPillar={currentPillar} currentQ={currentQ} />

        <fieldset className="flex flex-col gap-6 border-0 p-0 m-0">
          <legend
            id="audit-step-heading"
            tabIndex={-1}
            className="font-bold outline-none"
            style={{
              fontSize: "clamp(24px, 3.4vw, 36px)",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
              color: "var(--cream)",
            }}
          >
            {question.prompt}
          </legend>

          <div className="flex flex-col gap-3">
            {question.options.map((opt, i) => {
              const isSelected = selected === opt.points;
              return (
                <label
                  key={`${question.id}-${i}`}
                  className="glass-card-static flex items-start gap-4 p-5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    borderColor: isSelected ? "var(--red)" : undefined,
                    background: isSelected ? "rgba(196, 18, 48, 0.06)" : undefined,
                  }}
                >
                  <input
                    type="radio"
                    name={question.id}
                    checked={isSelected}
                    onChange={() => onAnswer(opt.points)}
                    className="sr-only"
                  />
                  <span
                    className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{
                      border: `1.5px solid ${isSelected ? "var(--red)" : "var(--rule)"}`,
                      background: "transparent",
                    }}
                    aria-hidden
                  >
                    {isSelected && (
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: "var(--red)" }}
                      />
                    )}
                  </span>
                  <span
                    className="text-base leading-relaxed"
                    style={{ color: "var(--cream)", opacity: isSelected ? 1 : 0.85 }}
                  >
                    {opt.label}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="flex items-center justify-between gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="min-h-[44px] flex items-center text-xs font-bold uppercase tracking-[0.18em] transition-opacity hover:opacity-60 px-2"
            style={{ color: "var(--muted)" }}
          >
            &larr; Back
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!canProceed}
            className="inline-flex items-center gap-3 font-bold transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            style={{
              background: "var(--red)",
              color: "white",
              padding: "14px 28px",
              fontSize: "13px",
              letterSpacing: "0.07em",
            }}
          >
            {currentPillar === 3 && currentQ === 4 ? "Finish \u2192" : "Next \u2192"}
          </button>
        </div>
      </div>
    </section>
  );
}
