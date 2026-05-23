import { NextResponse } from "next/server";
import { getSkills, saveSkills, Skill } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const skills = await getSkills();
    return NextResponse.json(skills);
  } catch {
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const skills: Skill[] = await request.json();
    await saveSkills(skills);
    return NextResponse.json(skills);
  } catch {
    return NextResponse.json({ error: "Failed to update skills" }, { status: 500 });
  }
}