import { NextResponse } from "next/server";
import { normalizeContactInput, validateContact, type ContactInput } from "@/lib/contact";
import { SITE_NAME } from "@/lib/site";

export const runtime = "nodejs";

/**
 * Sends the message with Resend when RESEND_API_KEY and CONTACT_TO_EMAIL are configured.
 * Returns false when no email service is configured.
 *
 * TODO: Plug in your email provider here. Options:
 *   - Resend (implemented below): set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.
 *   - Nodemailer: `npm i nodemailer`, create a SMTP transport from env vars and call transporter.sendMail().
 *   - Formspree: POST the same JSON to https://formspree.io/f/<FORM_ID> with an "Accept: application/json" header.
 */
async function deliver(input: ContactInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? `${SITE_NAME} <onboarding@resend.dev>`,
      to: [to],
      reply_to: input.email,
      subject: `[${SITE_NAME} contact] ${input.subject}`,
      text: `Name: ${input.name}\nEmail: ${input.email}\n\n${input.message}`,
    }),
  });

  if (!response.ok) {
    throw new Error(`Email provider responded with ${response.status}`);
  }
  return true;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const input = normalizeContactInput(body);

  // Honeypot filled in: pretend success so bots get no signal.
  if (input.website) {
    return NextResponse.json({ ok: true });
  }

  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "Please fix the highlighted fields.", errors }, { status: 400 });
  }

  try {
    const sent = await deliver(input);
    if (!sent && process.env.NODE_ENV !== "production") {
      console.info("[contact] No email service configured. Message received:", {
        name: input.name,
        email: input.email,
        subject: input.subject,
      });
    }
  } catch (error) {
    console.error("[contact] Failed to send message", error);
    return NextResponse.json(
      { ok: false, error: "Your message could not be sent right now. Please try again later or email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
