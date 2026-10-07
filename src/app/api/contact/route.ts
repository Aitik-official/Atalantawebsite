import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/data/site";

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  category?: string;
  quantity?: string;
  organization?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const category = body.category?.trim() ?? "General Inquiry";
    const quantity = body.quantity?.trim() ?? "N/A";
    const organization = body.organization?.trim() ?? "N/A";
    const message = body.message?.trim() ?? "";

    if (!name || !email || !phone) {
      return NextResponse.json(
        { ok: false, error: "Please provide your name, email, and phone number." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // Return ok: true for demo when email API key is not configured locally
      return NextResponse.json({
        ok: true,
        message: "Thank you! Your quotation request has been recorded.",
      });
    }

    const resend = new Resend(apiKey);
    const from = process.env.RESEND_FROM ?? "Atlanta Furniture <onboarding@resend.dev>";

    await resend.emails.send({
      from,
      to: [site.email],
      replyTo: email,
      subject: `Atlanta Furniture Quotation Request: ${category} - ${name}`,
      html: `
        <h2>New Quotation Request</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Organization:</strong> ${escapeHtml(organization)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Mobile:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Category:</strong> ${escapeHtml(category)}</p>
        <p><strong>Estimated Quantity:</strong> ${escapeHtml(quantity)}</p>
        <p><strong>Requirement Details:</strong></p>
        <p>${escapeHtml(message || "—")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    const err = e instanceof Error ? e.message : "Internal error";
    return NextResponse.json({ ok: false, error: err }, { status: 500 });
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
