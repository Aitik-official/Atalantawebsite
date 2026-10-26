import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { deleteCategory, updateCategory } from "@/lib/catalog";
import type { CategoryInput } from "@/lib/catalog-types";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: Context) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: "Sign in required." }, { status: 401 });
  }

  const { id } = await context.params;
  try {
    const body = (await request.json()) as CategoryInput;
    if (!body.name?.trim()) {
      return NextResponse.json({ ok: false, error: "Category name is required." }, { status: 400 });
    }
    const category = await updateCategory(decodeURIComponent(id), body);
    if (!category) {
      return NextResponse.json({ ok: false, error: "Category not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, category });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not update category.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}

export async function DELETE(request: Request, context: Context) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: "Sign in required." }, { status: 401 });
  }

  const { id } = await context.params;
  try {
    const result = await deleteCategory(decodeURIComponent(id));
    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not delete category.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
