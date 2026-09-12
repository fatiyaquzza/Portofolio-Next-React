export type ContactMessage = {
  fromName: string;
  fromEmail: string;
  subject: string;
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { fromName: 100, fromEmail: 254, subject: 160, message: 5000 };

export function parseContactMessage(value: unknown): ContactMessage | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const body = value as Record<string, unknown>;
  if (body.website) return null;

  const fields = {
    fromName: body.from_name,
    fromEmail: body.from_email,
    subject: body.subject,
    message: body.message,
  };
  if (Object.values(fields).some((field) => typeof field !== "string")) return null;

  const parsed = Object.fromEntries(
    Object.entries(fields).map(([key, field]) => [key, (field as string).trim()])
  ) as ContactMessage;

  if (
    !parsed.fromName ||
    !parsed.fromEmail ||
    !parsed.subject ||
    !parsed.message ||
    !EMAIL_PATTERN.test(parsed.fromEmail) ||
    /[\r\n]/.test(parsed.fromName) ||
    /[\r\n]/.test(parsed.fromEmail) ||
    /[\r\n]/.test(parsed.subject) ||
    Object.entries(LIMITS).some(([key, limit]) => parsed[key as keyof ContactMessage].length > limit)
  ) {
    return null;
  }
  return parsed;
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}
