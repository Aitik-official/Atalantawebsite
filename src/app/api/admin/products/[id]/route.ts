import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { deleteProduct, updateProduct } from "@/lib/catalog";
import type { ProductInput } from "@/lib/catalog-types";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: Context) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: "Sign in required." }, { status: 401 });
  }

  const { id } = await context.params;
  try {
    const body = (await request.json()) as ProductInput;
    if (!body.title?.trim() || !body.category?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Title and category are required." },
        { status: 400 },
      );
    }
    const product = await updateProduct(decodeURIComponent(id), body);
    if (!product) {
      return NextResponse.json({ ok: false, error: "Product not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, product });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not update product.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}

export async function DELETE(request: Request, context: Context) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: "Sign in required." }, { status: 401 });
  }

  const { id } = await context.params;
  const removed = await deleteProduct(decodeURIComponent(id));
  if (!removed) {
    return NextResponse.json({ ok: false, error: "Product not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
