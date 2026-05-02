"use client";

import { useState } from "react";
import { useRecaptcha } from "@/hooks/useRecaptcha";

type Status = "idle" | "loading" | "success" | "error";

const srOnly: React.CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
};

export function MaintenanceForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const { executeRecaptcha } = useRecaptcha();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreement) {
      setErrorMsg("You must agree to the Privacy Act Statement.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    let token: string;
    try {
      token = await executeRecaptcha("waitlist_submit");
    } catch (err) {
      console.error("reCAPTCHA error:", err);
      setErrorMsg("Security check failed. Please try again.");
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/waitlist-new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, agreement, token }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = (await res.json()) as { error?: string };
        setErrorMsg(data.error ?? "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Something went wrong. Try again.");
      setStatus("error");
    }
  }

  return (
    <div aria-live="polite">
      {status === "success" ? (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "15px",
            color: "var(--cream)",
            opacity: 0.72,
          }}
        >
          You&apos;re on the list.
        </p>
      ) : (
        <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ position: "relative" }}>
            <label htmlFor="maintenance-name" style={srOnly}>Your name</label>
            <input
              id="maintenance-name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "rgba(242, 237, 228, 0.05)",
                border: "1px solid rgba(242, 237, 228, 0.15)",
                color: "var(--cream)",
                fontFamily: "var(--font-body)",
                fontSize: "14px",
              }}
            />
          </div>
          <div style={{ position: "relative" }}>
            <label htmlFor="maintenance-email" style={srOnly}>Your email</label>
            <input
              id="maintenance-email"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "rgba(242, 237, 228, 0.05)",
                border: "1px solid rgba(242, 237, 228, 0.15)",
                color: "var(--cream)",
                fontFamily: "var(--font-body)",
                fontSize: "14px",
              }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", textAlign: "left" }}>
            <input
              id="privacy-agreement"
              type="checkbox"
              checked={agreement}
              onChange={(e) => setAgreement(e.target.checked)}
              required
              style={{ marginTop: "4px", cursor: "pointer" }}
            />
            <label 
              htmlFor="privacy-agreement" 
              style={{ 
                fontFamily: "var(--font-body)", 
                fontSize: "12px", 
                color: "var(--cream)", 
                opacity: 0.7,
                cursor: "pointer",
                lineHeight: "1.4"
              }}
            >
              I agree to the Privacy Act Statement and consent to receive updates about Nyoo Studio.
            </label>
          </div>

          {status === "error" && (
            <p role="alert" style={{ color: "var(--red)", fontFamily: "var(--font-body)", fontSize: "13px" }}>
              {errorMsg}
            </p>
          )}
          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              background: "var(--red)",
              color: "var(--cream)",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "14px",
              letterSpacing: "0.05em",
              padding: "12px 24px",
              border: "none",
              cursor: status === "loading" ? "not-allowed" : "pointer",
              opacity: status === "loading" ? 0.7 : 1,
              width: "100%",
            }}
          >
            {status === "loading" ? "Sending…" : "Notify Me"}
          </button>
        </form>
      )}
    </div>
  );
}
