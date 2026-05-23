import { NextResponse } from "next/server";
import { getTheme, saveTheme } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const theme = getTheme();
    return NextResponse.json(theme);
  } catch {
    return NextResponse.json({ error: "Failed to load theme" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    saveTheme(body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save theme" }, { status: 500 });
  }
}
