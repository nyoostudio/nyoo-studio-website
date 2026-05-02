import type { Metadata } from "next";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { MaintenanceForm } from "./MaintenanceForm";
import Image from "next/image";

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
        <div style={{ marginBottom: "40px" }}>
          <Image
            src="/images/nyoo logo type horizontal white.png"
            alt="Nyoo Studio"
            width={200}
            height={60}
            priority
            style={{ width: "200px", height: "auto" }}
          />
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
          UNDER RENOVATION
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
