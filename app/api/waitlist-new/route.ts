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

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, email } = body;

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }
  if (name.trim().length > 200) {
    return NextResponse.json({ error: "Name is too long" }, { status: 400 });
  }
  if (email.trim().length > 254) {
    return NextResponse.json({ error: "Email is too long" }, { status: 400 });
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
