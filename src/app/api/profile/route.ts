import { NextResponse } from "next/server";
import { getProfile, saveProfile, Profile } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const profile = await getProfile();
    return NextResponse.json(profile);
  } catch {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const profile: Profile = await request.json();
    await saveProfile(profile);
    return NextResponse.json(profile);
  } catch {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}