import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const templateId = searchParams.get("templateId");

    const wishes = await db.wish.findMany({
      where: templateId ? { templateId } : undefined,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(wishes);
  } catch {
    return NextResponse.json({ error: "Failed to fetch wishes" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, attendance, message, templateId } = body;

    if (!name || !attendance) {
      return NextResponse.json(
        { error: "Name and attendance are required" },
        { status: 400 }
      );
    }

    const wish = await db.wish.create({
      data: { name, attendance, message: message || null, templateId: templateId || null },
    });

    return NextResponse.json(wish, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create wish" }, { status: 500 });
  }
}