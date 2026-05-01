"use client";

import { useState } from "react";

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
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
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
        <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ position: "relative" }}>
            <label htmlFor="maintenance-name" style={srOnly}>Your name</label>
            <input
              id="maintenance-name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "rgba(242, 237, 228, 0.05)",
                border: "1px solid rgba(242, 237, 228, 0.15)",
                color: "var(--cream)",
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                outline: "2px solid var(--amber)",
                outlineOffset: "2px",
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
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "rgba(242, 237, 228, 0.05)",
                border: "1px solid rgba(242, 237, 228, 0.15)",
                color: "var(--cream)",
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                outline: "2px solid var(--amber)",
                outlineOffset: "2px",
              }}
            />
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
