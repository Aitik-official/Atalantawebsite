import { NextResponse } from "next/server";
import { getCategories, getProducts } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  return NextResponse.json({ ok: true, products, categories });
}
