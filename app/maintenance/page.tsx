import type { Metadata } from "next";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { MaintenanceForm } from "./MaintenanceForm";

export const metadata: Metadata = {
  title: "Nyoo Studio — Coming Soon",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "var(--black)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <GrainOverlay opacity={0.10} />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 24px",
          maxWidth: "440px",
          width: "100%",
        }}
      >
        {/* Logo mark + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "40px" }}>
          <svg
            viewBox="0 0 110 95"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ height: "32px", width: "auto" }}
            aria-hidden="true"
          >
            <path
              d="M16 14 L16 64 Q16 80 31 80 Q46 80 46 64 L46 30"
              stroke="#F2EDE4"
              strokeWidth="9.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <line x1="62" y1="14" x2="62" y2="80" stroke="#F2EDE4" strokeWidth="9.5" strokeLinecap="round" />
            <line x1="80" y1="30" x2="80" y2="80" stroke="#F2EDE4" strokeWidth="9.5" strokeLinecap="round" />
          </svg>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "23px",
              letterSpacing: "0.22em",
              color: "var(--cream)",
            }}
          >
            nyoo<span style={{ color: "var(--red)", fontWeight: 700 }}>.</span>studio
          </span>
        </div>

        {/* Section label */}
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.22em",
            color: "var(--amber)",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "20px",
          }}
        >
          Under Renovation
        </span>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-title)",
            fontWeight: 600,
            fontSize: "clamp(30px, 5vw, 54px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.12,
            color: "var(--cream)",
            marginBottom: "16px",
          }}
        >
          Something new is coming.
        </h1>

        {/* Body */}
        <p
          style={{
            fontFamily: "var(--font-subtitle)",
            fontSize: "15px",
            lineHeight: 1.85,
            color: "var(--cream)",
            opacity: 0.72,
            marginBottom: "32px",
          }}
        >
          Leave your email and we&apos;ll let you know when we&apos;re back.
        </p>

        <MaintenanceForm />
      </div>
    </div>
  );
}
