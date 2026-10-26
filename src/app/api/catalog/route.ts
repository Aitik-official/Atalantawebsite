import { NextResponse } from "next/server";
import { getCategories, getProducts } from "@/lib/catalog";
import { describeMongoError } from "@/lib/mongodb";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const [products, categories] = await Promise.all([getProducts(), getCategories()]);
    return NextResponse.json({ ok: true, products, categories });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: describeMongoError(error) || "Could not load catalog." },
      { status: 500 },
    );
  }
}
