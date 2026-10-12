/** Shared contact-form validation used by both the client form and the API route. */

export type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Honeypot field: real visitors never see or fill it. */
  website: string;
};

export type ContactErrors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

export const CONTACT_LIMITS = {
  name: 100,
  email: 200,
  subject: 150,
  messageMin: 10,
  message: 5000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeContactInput(data: unknown): ContactInput {
  const source = (data && typeof data === "object" ? data : {}) as Record<string, unknown>;
  const text = (key: string) => (typeof source[key] === "string" ? (source[key] as string).trim() : "");
  return {
    name: text("name"),
    email: text("email"),
    subject: text("subject"),
    message: text("message"),
    website: text("website"),
  };
}

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};

  if (!input.name) errors.name = "Please enter your name.";
  else if (input.name.length > CONTACT_LIMITS.name) errors.name = `Name must be under ${CONTACT_LIMITS.name} characters.`;

  if (!input.email) errors.email = "Please enter your email address.";
  else if (input.email.length > CONTACT_LIMITS.email || !EMAIL_PATTERN.test(input.email))
    errors.email = "Please enter a valid email address.";

  if (!input.subject) errors.subject = "Please add a subject.";
  else if (input.subject.length > CONTACT_LIMITS.subject)
    errors.subject = `Subject must be under ${CONTACT_LIMITS.subject} characters.`;

  if (!input.message) errors.message = "Please write a message.";
  else if (input.message.length < CONTACT_LIMITS.messageMin)
    errors.message = `Message must be at least ${CONTACT_LIMITS.messageMin} characters.`;
  else if (input.message.length > CONTACT_LIMITS.message)
    errors.message = `Message must be under ${CONTACT_LIMITS.message} characters.`;

  return errors;
}
