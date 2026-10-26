import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { getEnquiries } from "@/lib/enquiries";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: "Sign in required." }, { status: 401 });
  }
  const enquiries = await getEnquiries();
  return NextResponse.json({ ok: true, enquiries });
}
