import { NextResponse } from "next/server";
import { getUpload, uploadBytes } from "@/lib/uploads";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ID_RE = /^[0-9a-f-]{36}$/i;

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Context) {
  const { id } = await context.params;
  const clean = decodeURIComponent(id).replace(/\.(png|jpe?g|webp)$/i, "");
  if (!ID_RE.test(clean)) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const doc = await getUpload(clean);
    if (!doc) {
      return new NextResponse("Not found", { status: 404 });
    }

    const bytes = uploadBytes(doc);
    return new NextResponse(new Blob([bytes], { type: doc.contentType }), {
      status: 200,
      headers: {
        "Content-Type": doc.contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
