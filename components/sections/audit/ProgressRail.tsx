import { PILLAR_META, PILLARS } from "@/lib/audit/types";

interface ProgressRailProps {
  currentPillar: 0 | 1 | 2 | 3;
  currentQ: 0 | 1 | 2 | 3 | 4;
}

export function ProgressRail({ currentPillar, currentQ }: ProgressRailProps) {
  const pillar = PILLARS[currentPillar];
  const meta = PILLAR_META[pillar];
  const totalQs = 20;
  const currentTotal = currentPillar * 5 + currentQ + 1;
  const pct = (currentTotal / totalQs) * 100;

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between gap-4 mb-3 flex-wrap">
        <div className="flex flex-col gap-1">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{ color: "var(--amber)" }}
          >
            Pillar {currentPillar + 1} of 4 &middot; {meta.title}
          </span>
          <span
            className="text-sm italic"
            style={{ color: "var(--muted)", fontFamily: "var(--font-subtitle)" }}
          >
            {meta.subtitle}
          </span>
        </div>
        <span className="text-xs font-bold tabular-nums" style={{ color: "var(--muted)" }}>
          {currentTotal} / {totalQs}
        </span>
      </div>

      <div className="h-[3px] w-full" style={{ background: "rgba(240, 235, 225, 0.08)" }}>
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%`, background: "var(--red)" }}
        />
      </div>

      <span className="sr-only" aria-live="polite">
        Question {currentTotal} of {totalQs}. Pillar {currentPillar + 1} of 4: {meta.title}.
      </span>
    </div>
  );
}
