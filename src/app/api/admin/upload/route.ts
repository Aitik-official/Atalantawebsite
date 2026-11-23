import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { describeMongoError } from "@/lib/mongodb";
import { saveUpload } from "@/lib/uploads";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const types: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function POST(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: "Sign in required." }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("image");
    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: "Choose an image file." }, { status: 400 });
    }

    if (!types[file.type]) {
      return NextResponse.json(
        { ok: false, error: "Use a JPG, PNG, or WebP image." },
        { status: 400 },
      );
    }

    if (file.size > 4 * 1024 * 1024) {
      return NextResponse.json({ ok: false, error: "Image must be under 4 MB." }, { status: 400 });
    }

    const saved = await saveUpload(file);
    return NextResponse.json({ ok: true, image: saved.url, id: saved.id });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: describeMongoError(error) || "Could not upload image." },
      { status: 500 },
    );
  }
}
