"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

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

  if (status === "success") {
    return (
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
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
      <input
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
          outline: "none",
        }}
      />
      <input
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
          outline: "none",
        }}
      />
      {status === "error" && (
        <p style={{ color: "var(--red)", fontFamily: "var(--font-body)", fontSize: "13px" }}>
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
  );
}
