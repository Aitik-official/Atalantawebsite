import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { createCategory, getCategories } from "@/lib/catalog";
import type { CategoryInput } from "@/lib/catalog-types";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: "Sign in required." }, { status: 401 });
  }
  const categories = await getCategories();
  return NextResponse.json({ ok: true, categories });
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: "Sign in required." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as CategoryInput;
    if (!body.name?.trim()) {
      return NextResponse.json({ ok: false, error: "Category name is required." }, { status: 400 });
    }
    const category = await createCategory(body);
    return NextResponse.json({ ok: true, category });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save category.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
