import { NextResponse } from "next/server";
import { createEnquiry } from "@/lib/enquiries";
import { ENQUIRY_TO_EMAIL, sendEnquiryEmail } from "@/lib/enquiry-mail";

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  category?: string;
  quantity?: string;
  organization?: string;
  message?: string;
  productTitle?: string;
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const category = body.category?.trim() || "General Inquiry";
    const quantity = body.quantity?.trim() || "N/A";
    const organization = body.organization?.trim() || "N/A";
    const message = body.message?.trim() ?? "";
    const productTitle = body.productTitle?.trim() || undefined;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { ok: false, error: "Please provide your name, email, and phone number." },
        { status: 400 },
      );
    }

    const payload = {
      name,
      email,
      phone,
      category,
      quantity,
      organization,
      message,
      productTitle,
    };

    let enquiryId: string | undefined;
    try {
      const enquiry = await createEnquiry(payload);
      enquiryId = enquiry.id;
    } catch (error) {
      console.error("[contact] Could not save enquiry to MongoDB:", error);
    }

    await sendEnquiryEmail(payload);

    return NextResponse.json({
      ok: true,
      id: enquiryId,
      deliveredTo: ENQUIRY_TO_EMAIL,
    });
  } catch (e) {
    const err = e instanceof Error ? e.message : "Could not send your enquiry.";
    return NextResponse.json({ ok: false, error: err }, { status: 500 });
  }
}
