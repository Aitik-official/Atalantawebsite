import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { deleteEnquiry, updateEnquiryStatus } from "@/lib/enquiries";
import type { EnquiryStatus } from "@/lib/catalog-types";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ id: string }> };

const statuses: EnquiryStatus[] = ["new", "read", "closed"];

export async function PATCH(request: Request, context: Context) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: "Sign in required." }, { status: 401 });
  }

  const { id } = await context.params;
  try {
    const body = (await request.json()) as { status?: EnquiryStatus };
    if (!body.status || !statuses.includes(body.status)) {
      return NextResponse.json({ ok: false, error: "Invalid status." }, { status: 400 });
    }

    const enquiry = await updateEnquiryStatus(decodeURIComponent(id), body.status);
    if (!enquiry) {
      return NextResponse.json({ ok: false, error: "Enquiry not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, enquiry });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not update enquiry.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: Context) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: "Sign in required." }, { status: 401 });
  }

  const { id } = await context.params;
  try {
    const removed = await deleteEnquiry(decodeURIComponent(id));
    if (!removed) {
      return NextResponse.json({ ok: false, error: "Enquiry not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not delete enquiry.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
