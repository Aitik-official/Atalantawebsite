import { Resend } from "resend";

export type EnquiryMailInput = {
  name: string;
  email: string;
  phone: string;
  category: string;
  quantity: string;
  organization: string;
  message: string;
  productTitle?: string;
};

export const ENQUIRY_TO_EMAIL =
  process.env.ENQUIRY_TO_EMAIL?.trim() || "atlantafurnitureworld@gmail.com";

export const RESEND_FROM =
  process.env.RESEND_FROM?.trim() || "Atlanta Furniture <noreply@atlantaworld.in>";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:8px 12px;color:#64748b;font-size:13px;width:160px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:8px 12px;color:#0f172a;font-size:14px;font-weight:600;">${escapeHtml(value || "—")}</td>
    </tr>
  `;
}

export async function sendEnquiryEmail(input: EnquiryMailInput) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set on the server.");
  }

  const resend = new Resend(apiKey);
  const productLine = input.productTitle
    ? row("Product", input.productTitle)
    : "";

  const { error } = await resend.emails.send({
    from: RESEND_FROM,
    to: [ENQUIRY_TO_EMAIL],
    replyTo: input.email,
    subject: `New enquiry: ${input.category} — ${input.name}`,
    html: `
      <div style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px;">
        <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
          <div style="background:#0090d0;color:#ffffff;padding:18px 24px;">
            <p style="margin:0;font-size:12px;letter-spacing:1px;text-transform:uppercase;opacity:.9;">Atlanta Furniture</p>
            <h1 style="margin:6px 0 0;font-size:20px;">New quotation / enquiry</h1>
          </div>
          <table style="width:100%;border-collapse:collapse;padding:8px 0;">
            ${row("Name", input.name)}
            ${row("Organization", input.organization)}
            ${row("Email", input.email)}
            ${row("Mobile", input.phone)}
            ${row("Category", input.category)}
            ${row("Quantity", input.quantity)}
            ${productLine}
          </table>
          <div style="padding:8px 24px 24px;">
            <p style="margin:0 0 8px;color:#64748b;font-size:13px;">Requirement details</p>
            <p style="margin:0;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px;color:#0f172a;white-space:pre-wrap;">${escapeHtml(input.message || "—")}</p>
          </div>
        </div>
      </div>
    `,
  });

  if (error) {
    throw new Error(error.message || "Could not send enquiry email.");
  }
}
