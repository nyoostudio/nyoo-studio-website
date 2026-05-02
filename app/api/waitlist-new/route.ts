import { NextRequest, NextResponse } from "next/server";

// Using dynamic import to handle Turbopack resolution issues on Windows
let NotionClient: any = null;
async function getNotionClient(apiKey: string) {
  if (!NotionClient) {
    const { Client } = await import("@notionhq/client");
    NotionClient = Client;
  }
  return new NotionClient({ auth: apiKey });
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY!;
const SCORE_THRESHOLD = 0.5;

async function verifyRecaptchaToken(token: string): Promise<boolean> {
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${RECAPTCHA_SECRET}&response=${token}`,
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

  const { name, email, agreement, token } = body;

  // Basic validation
  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }
  if (!agreement) {
    return NextResponse.json({ error: "Privacy agreement is required" }, { status: 400 });
  }
  if (typeof token !== "string" || !token) {
    return NextResponse.json({ error: "Security check missing" }, { status: 400 });
  }

  // Length checks
  if (name.trim().length > 200) {
    return NextResponse.json({ error: "Name is too long" }, { status: 400 });
  }
  if (email.trim().length > 254) {
    return NextResponse.json({ error: "Email is too long" }, { status: 400 });
  }

  // reCAPTCHA verification
  let valid: boolean;
  try {
    valid = await verifyRecaptchaToken(token);
  } catch (err) {
    console.error("reCAPTCHA verification failed:", err);
    return NextResponse.json({ error: "Security verification failed" }, { status: 500 });
  }

  if (!valid) {
    return NextResponse.json({ error: "Security check failed. Please try again." }, { status: 400 });
  }

  const apiKey = process.env.NOTION_API_KEY;
  const dbId = process.env.NOTION_WAITLIST_DB_ID;

  if (!apiKey || !dbId) {
    console.error("Missing NOTION_API_KEY or NOTION_WAITLIST_DB_ID");
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  try {
    const notion = await getNotionClient(apiKey);
    await notion.pages.create({
      parent: { database_id: dbId },
      properties: {
        Name: {
          title: [{ text: { content: name.trim() } }],
        },
        Email: {
          email: email.trim().toLowerCase(),
        },
        "Submitted At": {
          date: { start: new Date().toISOString() },
        },
      },
    });
  } catch (err: any) {
    console.error("Notion write failed:", err);
    return NextResponse.json({ 
      error: "Server error", 
      details: err?.message || "Unknown error",
      code: err?.code
    }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
