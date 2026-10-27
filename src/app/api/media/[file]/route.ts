import { Buffer } from "node:buffer";
import { readFile } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FILE_RE = /^[A-Za-z0-9._-]+$/;
const ORIGIN_IP = process.env.ATLANTA_MEDIA_ORIGIN_IP || "162.241.148.33";
const ORIGIN_HOST = process.env.ATLANTA_MEDIA_ORIGIN_HOST || "atlantaworld.in";

type OriginImage = {
  status: number;
  contentType: string;
  body: Buffer;
};

function contentTypeFor(file: string, fallback = "application/octet-stream") {
  if (file.endsWith(".png")) return "image/png";
  if (file.endsWith(".jpg") || file.endsWith(".jpeg")) return "image/jpeg";
  if (file.endsWith(".webp")) return "image/webp";
  if (file.endsWith(".gif")) return "image/gif";
  return fallback;
}

function fetchOrigin(file: string) {
  return new Promise<OriginImage>((resolve, reject) => {
    const req = http.get(
      {
        hostname: ORIGIN_IP,
        port: 80,
        path: `/admin/products/${file}`,
        headers: {
          Host: ORIGIN_HOST,
          Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
          "User-Agent": "AtlantaFurnitureSite/1.0",
        },
        timeout: 12000,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
        res.on("end", () => {
          resolve({
            status: res.statusCode || 502,
            contentType: String(res.headers["content-type"] || contentTypeFor(file)),
            body: Buffer.concat(chunks),
          });
        });
      },
    );
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Image origin timed out"));
    });
    req.on("error", reject);
  });
}

function imageResponse(body: Buffer, contentType: string) {
  const bytes = Uint8Array.from(body);
  return new NextResponse(new Blob([bytes], { type: contentType }), {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ file: string }> },
) {
  const { file } = await context.params;
  const name = decodeURIComponent(file);
  if (!FILE_RE.test(name)) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const local = path.join(process.cwd(), "public", "admin", "products", name);
    const data = await readFile(local);
    return imageResponse(data, contentTypeFor(name));
  } catch {
    // Fall through to the original Atlanta Apache host.
  }

  try {
    const origin = await fetchOrigin(name);
    if (origin.status !== 200 || origin.body.length < 32) {
      return new NextResponse("Not found", { status: 404 });
    }
    if (!origin.contentType.startsWith("image/")) {
      return new NextResponse("Not found", { status: 404 });
    }
    return imageResponse(origin.body, origin.contentType);
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
