import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { createProduct, getProducts } from "@/lib/catalog";
import type { ProductInput } from "@/lib/catalog-types";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: "Sign in required." }, { status: 401 });
  }
  const products = await getProducts();
  return NextResponse.json({ ok: true, products });
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: "Sign in required." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as ProductInput;
    if (!body.title?.trim() || !body.category?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Title and category are required." },
        { status: 400 },
      );
    }
    const product = await createProduct(body);
    return NextResponse.json({ ok: true, product });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save product.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
