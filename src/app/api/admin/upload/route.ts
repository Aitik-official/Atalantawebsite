import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

const types: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function POST(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: "Sign in required." }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("image");
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "Choose an image file." }, { status: 400 });
  }

  const ext = types[file.type];
  if (!ext) {
    return NextResponse.json(
      { ok: false, error: "Use a JPG, PNG, or WebP image." },
      { status: 400 },
    );
  }

  if (file.size > 4 * 1024 * 1024) {
    return NextResponse.json({ ok: false, error: "Image must be under 4 MB." }, { status: 400 });
  }

  const dir = path.join(process.cwd(), "public", "uploads", "products");
  await mkdir(dir, { recursive: true });
  const name = `${randomUUID()}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, name), bytes);

  return NextResponse.json({ ok: true, image: `/uploads/products/${name}` });
}
