"use client";

import { useState } from "react";
import type { Platform } from "@/lib/audit/types";
import { PLATFORM_META } from "@/lib/audit/types";

interface PlatformSelectorProps {
  selected: Platform[];
  onBack: () => void;
  onContinue: (platforms: Platform[]) => void;
}

const PLATFORMS: Platform[] = ["instagram", "tiktok", "linkedin", "facebook"];

function PlatformIcon({ platform }: { platform: Platform }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (platform) {
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...common}>
          <path d="M14 3v11.5a3.5 3.5 0 11-3.5-3.5" />
          <path d="M14 3c0 3 2 5 5 5" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 014 0v4M12 17v-7" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common}>
          <path d="M18 3h-3a4 4 0 00-4 4v3H8v4h3v7h4v-7h3l1-4h-4V7a1 1 0 011-1h3V3z" />
        </svg>
      );
  }
}

export function PlatformSelector({ selected, onBack, onContinue }: PlatformSelectorProps) {
  const [picked, setPicked] = useState<Platform[]>(selected);
  const [error, setError] = useState(false);

  function toggle(p: Platform) {
    setError(false);
    setPicked((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  }

  function handleContinue() {
    if (picked.length === 0) {
      setError(true);
      return;
    }
    onContinue(picked);
  }

  return (
    <section className="relative min-h-[calc(100svh-72px)] flex flex-col section-px py-20">
      <div className="max-w-[900px] mx-auto w-full flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{ color: "var(--amber)" }}
          >
            Step 1 of 5 &middot; Your platforms
          </span>
          <h2
            id="audit-step-heading"
            tabIndex={-1}
            className="font-bold outline-none"
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--cream)",
            }}
          >
            Which platforms are you actively using?
          </h2>
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.65,
              color: "var(--muted)",
              fontFamily: "var(--font-subtitle)",
            }}
          >
            Pick every one you&apos;re posting to regularly. We&apos;ll tailor your action plan to those platforms.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {PLATFORMS.map((p) => {
            const isSelected = picked.includes(p);
            return (
              <label
                key={p}
                className="glass-card-static relative flex items-center gap-4 p-5 cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  borderColor: isSelected ? "var(--red)" : undefined,
                  background: isSelected ? "rgba(196, 18, 48, 0.06)" : undefined,
                }}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isSelected}
                  onChange={() => toggle(p)}
                  aria-label={PLATFORM_META[p].label}
                />
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-full"
                  style={{
                    background: isSelected
                      ? "rgba(196, 18, 48, 0.12)"
                      : "rgba(240, 235, 225, 0.04)",
                    color: isSelected ? "var(--red)" : "var(--cream)",
                  }}
                >
                  <PlatformIcon platform={p} />
                </div>
                <span className="font-bold text-cream text-base">
                  {PLATFORM_META[p].label}
                </span>
                <span
                  className="ml-auto w-5 h-5 flex items-center justify-center"
                  style={{
                    border: `1.5px solid ${isSelected ? "var(--red)" : "var(--rule)"}`,
                    background: isSelected ? "var(--red)" : "transparent",
                  }}
                  aria-hidden
                >
                  {isSelected && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6l3 3 5-6"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
              </label>
            );
          })}
        </div>

        {error && (
          <p className="text-sm" style={{ color: "var(--red)" }}>
            Pick at least one platform to continue.
          </p>
        )}

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
            onClick={handleContinue}
            disabled={picked.length === 0}
            className="inline-flex items-center gap-3 font-bold transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            style={{
              background: "var(--red)",
              color: "white",
              padding: "14px 28px",
              fontSize: "13px",
              letterSpacing: "0.07em",
            }}
          >
            Continue &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
