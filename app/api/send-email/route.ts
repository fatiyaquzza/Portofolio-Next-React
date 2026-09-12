import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { parseContactMessage } from "@/lib/contact";
import { sendContactMail } from "@/lib/contactEmail";
import { checkContactRateLimit } from "@/lib/rateLimit";

const MAX_BODY_BYTES = 8_000;

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ message: "Gunakan format JSON" }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ message: "Pesan terlalu besar" }, { status: 413 });
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return NextResponse.json({ message: "Pesan terlalu besar" }, { status: 413 });
    }
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ message: "Format permintaan tidak valid" }, { status: 400 });
  }

  const contact = parseContactMessage(body);
  if (!contact) {
    return NextResponse.json(
      { message: "Periksa kembali nama, email, subjek, dan pesan Anda" },
      { status: 400 }
    );
  }

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const emailReceiver = process.env.EMAIL_RECEIVER;
  if (!emailUser || !emailPass || !emailReceiver) {
    return NextResponse.json({ message: "Layanan email belum tersedia" }, { status: 503 });
  }

  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rateLimit = await checkContactRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { message: "Terlalu banyak percobaan. Silakan coba lagi nanti." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: emailUser, pass: emailPass },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });

    await sendContactMail(transporter, contact, emailUser, emailReceiver);

    return NextResponse.json({ message: "Email berhasil dikirim" });
  } catch (error) {
    console.error("Contact email failed", error instanceof Error ? error.name : "UnknownError");
    return NextResponse.json(
      { message: "Pesan belum dapat dikirim. Silakan coba lagi." },
      { status: 500 }
    );
  }
}
