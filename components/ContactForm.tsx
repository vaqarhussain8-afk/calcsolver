"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Send } from "lucide-react";
import { CONTACT_LIMITS, normalizeContactInput, validateContact, type ContactErrors } from "@/lib/contact";

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_ORDER = ["name", "email", "subject", "message"] as const;

const inputClass =
  "mt-1 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 dark:border-gray-700 dark:bg-gray-900 dark:text-white aria-[invalid=true]:border-rose-500";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [serverMessage, setServerMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const input = normalizeContactInput(Object.fromEntries(new FormData(form)));
    const validation = validateContact(input);
    setErrors(validation);
    const firstInvalid = FIELD_ORDER.find((field) => validation[field]);
    if (firstInvalid) {
      const element = form.elements.namedItem(firstInvalid);
      if (element instanceof HTMLElement) element.focus();
      return;
    }

    setStatus("submitting");
    setServerMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: ContactErrors };
      if (response.ok && data.ok) {
        setStatus("success");
        form.reset();
        return;
      }
      if (data.errors) setErrors(data.errors);
      setServerMessage(data.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setServerMessage("We could not reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900 dark:bg-emerald-950/50">
        <h2 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300">Thanks — your message was sent.</h2>
        <p className="mt-2 text-emerald-800 dark:text-emerald-300">We usually reply within two business days.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 min-h-11 rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-describedby="contact-form-note">
      <p id="contact-form-note" className="text-sm text-gray-500 dark:text-gray-400">
        All fields are required.
      </p>

      <Field id="name" label="Name" error={errors.name}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={CONTACT_LIMITS.name}
          required
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={inputClass}
        />
      </Field>

      <Field id="email" label="Email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={CONTACT_LIMITS.email}
          required
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClass}
        />
      </Field>

      <Field id="subject" label="Subject" error={errors.subject}>
        <input
          id="subject"
          name="subject"
          type="text"
          maxLength={CONTACT_LIMITS.subject}
          required
          aria-invalid={errors.subject ? true : undefined}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className={inputClass}
        />
      </Field>

      <Field id="message" label="Message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          maxLength={CONTACT_LIMITS.message}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={inputClass}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech, but bots tend to fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && serverMessage ? (
        <p role="alert" className="rounded-xl bg-rose-50 p-4 text-sm text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">
          {serverMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-indigo-600 px-6 font-semibold text-white hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-wait disabled:opacity-70"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-800 dark:text-gray-200">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-rose-600 dark:text-rose-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}
