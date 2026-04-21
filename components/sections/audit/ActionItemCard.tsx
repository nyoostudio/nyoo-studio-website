import type { IconName } from "@/lib/audit/types";

interface ActionItemCardProps {
  title: string;
  body: string;
  icon: IconName;
  index: number;
}

function Icon({ name }: { name: IconName }) {
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
  switch (name) {
    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" rx="1" />
          <path d="M3 9h18M8 3v4M16 3v4" />
        </svg>
      );
    case "trend-up":
      return (
        <svg {...common}>
          <path d="M3 17l6-6 4 4 8-8" />
          <path d="M14 7h7v7" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3.5" />
          <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M15 20c0-2 1.5-4 4-4s2 1 2 1" />
        </svg>
      );
    case "pen":
      return (
        <svg {...common}>
          <path d="M4 20l4-1 10-10-3-3L5 16l-1 4z" />
          <path d="M13.5 6.5l3 3" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z" />
        </svg>
      );
    case "eye":
      return (
        <svg {...common}>
          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" />
        </svg>
      );
    case "filter":
      return (
        <svg {...common}>
          <path d="M3 5h18M6 12h12M10 19h4" />
        </svg>
      );
    case "scissors":
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="6" cy="18" r="2.5" />
          <path d="M8 8l12 12M8 16L20 4" />
        </svg>
      );
  }
}

export function ActionItemCard({ title, body, icon, index }: ActionItemCardProps) {
  return (
    <article
      className="glass-card-static relative grid grid-cols-[auto_1fr] gap-5 p-6 md:p-7"
      style={{ borderLeft: "2px solid var(--red)" }}
    >
      <div
        className="flex items-center justify-center w-11 h-11 rounded-full"
        style={{ background: "rgba(193, 127, 58, 0.10)", color: "var(--amber)" }}
        aria-hidden
      >
        <Icon name={icon} />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{ color: "var(--amber)" }}
          >
            Priority {index + 1}
          </span>
        </div>
        <h3 className="font-bold text-cream text-lg leading-snug">{title}</h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--cream)", opacity: 0.72, fontFamily: "var(--font-subtitle)" }}
        >
          {body}
        </p>
      </div>
    </article>
  );
}
