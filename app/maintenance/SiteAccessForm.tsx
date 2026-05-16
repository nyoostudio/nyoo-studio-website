"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "error";

const srOnly: React.CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
};

function getRedirectTarget() {
  const params = new URLSearchParams(window.location.search);
  const next = params.get("next");

  if (next && next.startsWith("/") && !next.startsWith("//")) {
    return next;
  }

  return "/";
}

export function SiteAccessForm() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/site-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      window.location.assign(getRedirectTarget());
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginTop: "28px",
        paddingTop: "24px",
        borderTop: "1px solid rgba(242, 237, 228, 0.12)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "12px",
          lineHeight: 1.5,
          color: "var(--cream)",
          opacity: 0.62,
          margin: 0,
        }}
      >
        Have the site password?
      </p>

      <div style={{ display: "flex", gap: "8px", width: "100%" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <label htmlFor="site-access-password" style={srOnly}>
            Site password
          </label>
          <input
            id="site-access-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (status === "error") {
                setStatus("idle");
              }
            }}
            autoComplete="current-password"
            required
            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
            style={{
              width: "100%",
              minWidth: 0,
              padding: "12px 14px",
              background: "rgba(242, 237, 228, 0.05)",
              border: "1px solid rgba(242, 237, 228, 0.15)",
              color: "var(--cream)",
              fontFamily: "var(--font-body)",
              fontSize: "14px",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            flex: "0 0 auto",
            background: "var(--cream)",
            color: "var(--black)",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "13px",
            letterSpacing: "0.04em",
            padding: "12px 16px",
            border: "none",
            cursor: status === "loading" ? "not-allowed" : "pointer",
            opacity: status === "loading" ? 0.7 : 1,
            whiteSpace: "nowrap",
          }}
        >
          {status === "loading" ? "Checking" : "Enter"}
        </button>
      </div>

      {status === "error" && (
        <p
          role="alert"
          style={{
            color: "var(--red)",
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            margin: 0,
            textAlign: "left",
          }}
        >
          Incorrect password.
        </p>
      )}
    </form>
  );
}
