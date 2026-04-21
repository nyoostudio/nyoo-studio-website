"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import type { Grade } from "@/lib/audit/types";

interface ScoreGaugeProps {
  score: number;
  grade: Grade;
}

const SIZE = 280;
const STROKE = 10;
const RADIUS = (SIZE - STROKE) / 2;
const CENTER = SIZE / 2;
const SWEEP = 270;
const START_ANGLE = 135;

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function arcPath(r: number, startAngle: number, sweep: number) {
  const start = polar(CENTER, CENTER, r, startAngle);
  const end = polar(CENTER, CENTER, r, startAngle + sweep);
  const largeArc = sweep > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

export function ScoreGauge({ score, grade }: ScoreGaugeProps) {
  const [display, setDisplay] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    const targetOffset = length - (score / 100) * length;

    if (prefersReduced) {
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${targetOffset}`;
      setDisplay(score);
      return;
    }

    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(path, {
      strokeDashoffset: targetOffset,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.2,
    });

    const counter = { val: 0 };
    gsap.to(counter, {
      val: score,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.2,
      onUpdate: () => setDisplay(Math.round(counter.val)),
    });
  }, [score]);

  const path = arcPath(RADIUS, START_ANGLE, SWEEP);

  return (
    <div className="relative flex flex-col items-center" style={{ width: SIZE }}>
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label={`Overall score ${score} out of 100. Grade ${grade}.`}
      >
        <path
          d={path}
          fill="none"
          stroke="var(--cream)"
          strokeOpacity={0.08}
          strokeWidth={STROKE}
          strokeLinecap="round"
        />
        <path
          ref={pathRef}
          d={path}
          fill="none"
          stroke="var(--cobalt)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 12px rgba(27, 68, 216, 0.35))" }}
        />
      </svg>

      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        aria-hidden
      >
        <span
          className="font-bold text-cream"
          style={{
            fontSize: "clamp(72px, 12vw, 120px)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          {display}
        </span>
        <span
          className="text-xs font-bold uppercase tracking-[0.22em] mt-2"
          style={{ color: "var(--amber)" }}
        >
          Grade {grade}
        </span>
      </div>
    </div>
  );
}
