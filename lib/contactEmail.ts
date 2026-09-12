import { escapeHtml } from "./contact.ts";
import type { ContactMessage } from "./contact.ts";

type MailOptions = {
  from: string;
  replyTo: string;
  to: string;
  subject: string;
  text: string;
  html: string;
};

export type MailTransport = {
  sendMail(options: MailOptions): Promise<unknown>;
};

export function createContactMailOptions(
  contact: ContactMessage,
  emailUser: string,
  emailReceiver: string
): MailOptions {
  const safe = {
    name: escapeHtml(contact.fromName),
    email: escapeHtml(contact.fromEmail),
    subject: escapeHtml(contact.subject),
    message: escapeHtml(contact.message).replace(/\n/g, "<br>"),
  };

  return {
    from: `Fatiya Portfolio <${emailUser}>`,
    replyTo: contact.fromEmail,
    to: emailReceiver,
    subject: `Fatiya's Portfolio: ${contact.subject}`,
    text: `Nama: ${contact.fromName}\nEmail: ${contact.fromEmail}\nSubjek: ${contact.subject}\n\n${contact.message}`,
    html: `<h2>Pesan baru dari portfolio</h2><p><strong>Nama:</strong> ${safe.name}</p><p><strong>Email:</strong> ${safe.email}</p><p><strong>Subjek:</strong> ${safe.subject}</p><p><strong>Pesan:</strong></p><p>${safe.message}</p>`,
  };
}

export async function sendContactMail(
  transport: MailTransport,
  contact: ContactMessage,
  emailUser: string,
  emailReceiver: string
) {
  return transport.sendMail(createContactMailOptions(contact, emailUser, emailReceiver));
}
