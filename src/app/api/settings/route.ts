import { NextRequest, NextResponse } from "next/server";
import { getSettings, saveSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  const settings = getSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    saveSettings(body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
