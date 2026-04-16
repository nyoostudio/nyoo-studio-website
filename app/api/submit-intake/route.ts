import { NextRequest, NextResponse } from "next/server";

const SCORE_THRESHOLD = 0.5;
const FORMSPREE_URL = "https://formspree.io/f/xaqlbrap";
const N8N_URL = "https://nyoostudio.app.n8n.cloud/webhook/inquiry";

async function verifyRecaptchaToken(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    throw new Error("RECAPTCHA_SECRET_KEY is not configured");
  }
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }).toString(),
  });
  const data = (await res.json()) as { success: boolean; score: number };
  return data.success && data.score >= SCORE_THRESHOLD;
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { token, ...formData } = body;

  if (typeof token !== "string" || !token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  let valid: boolean;
  try {
    valid = await verifyRecaptchaToken(token);
  } catch {
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }

  if (!valid) {
    return NextResponse.json({ error: "reCAPTCHA failed" }, { status: 400 });
  }

  const [formspreeRes] = await Promise.all([
    fetch(FORMSPREE_URL, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }),
    fetch(N8N_URL, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    }).catch(() => null), // n8n failure is non-blocking
  ]);

  if (!formspreeRes.ok) {
    return NextResponse.json(
      { error: "Submission failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
