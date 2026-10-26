import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { getEnquiries } from "@/lib/enquiries";
import { describeMongoError } from "@/lib/mongodb";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: "Sign in required." }, { status: 401 });
  }
  try {
    const enquiries = await getEnquiries();
    return NextResponse.json({ ok: true, enquiries });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: describeMongoError(error) || "Could not load enquiries." },
      { status: 500 },
    );
  }
}
