import { NextResponse } from "next/server";
import {
  adminCookieName,
  adminCookieOptions,
  DASHBOARD_PASSWORD,
  signAdminToken,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  let body: { password?: string } = {};
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  if ((body.password ?? "") !== DASHBOARD_PASSWORD) {
    return NextResponse.json({ ok: false, error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieName(), signAdminToken(), adminCookieOptions(request));
  return response;
}
