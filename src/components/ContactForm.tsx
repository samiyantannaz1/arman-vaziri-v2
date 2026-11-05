"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { projectTypes } from "@/lib/content";

const ENDPOINT = "https://api.web3forms.com/submit";

const initial = {
  name: "",
  email: "",
  projectType: "",
  location: "",
  message: "",
};

type FormState = typeof initial;
type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "ok" }
  | { kind: "error"; text: string };

const inputClass =
  "w-full border-b border-white/15 bg-transparent px-0 py-4 text-sm font-light text-white outline-none transition-colors placeholder:text-white/30 focus:border-gold disabled:opacity-60";

const labelClass = "mb-1 block text-[10px] tracking-[0.2em] text-white/50";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const sending = status.kind === "sending";

  const bind =
    (key: keyof FormState) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((previous) => ({ ...previous, [key]: event.target.value }));

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const name = form.name.trim();
    const email = form.email.trim();
    const location = form.location.trim();
    const message = form.message.trim();

    if (!name || !email || !form.projectType || !location || !message) {
      setStatus({
        kind: "error",
        text: "Please complete all fields before continuing.",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ kind: "error", text: "Please enter a valid email address." });
      return;
    }

    // فیلد مخفی ضد اسپم: ربات‌ها پرش می‌کنند، آدم‌ها نه
    const trap = event.currentTarget.elements.namedItem(
      "botcheck"
    ) as HTMLInputElement | null;
    if (trap?.checked) {
      setStatus({ kind: "ok" });
      setForm(initial);
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setStatus({
        kind: "error",
        text: "The contact form is not configured yet. Please try again later.",
      });
      return;
    }

    setStatus({ kind: "sending" });

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Project Inquiry: ${form.projectType}`,
          from_name: "Arman Vaziri Website",
          name,
          email,
          project_type: form.projectType,
          project_location: location,
          message,
        }),
        signal: controller.signal,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to send your inquiry.");
      }

      setStatus({ kind: "ok" });
      setForm(initial);
    } catch (error) {
      const text =
        error instanceof DOMException && error.name === "AbortError"
          ? "The request took too long. Please try again."
          : error instanceof Error && error.message !== "Failed to fetch"
            ? error.message
            : "Something went wrong. Please check your connection and try again.";

      setStatus({ kind: "error", text });
    } finally {
      clearTimeout(timer);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 gap-x-12 gap-y-9 md:grid-cols-2"
    >
      <div>
        <label htmlFor="name" className={labelClass}>
          FULL NAME *
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          value={form.name}
          onChange={bind("name")}
          className={inputClass}
          placeholder="Your name"
          maxLength={100}
          required
          disabled={sending}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          EMAIL ADDRESS *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={bind("email")}
          className={inputClass}
          placeholder="you@example.com"
          maxLength={254}
          required
          disabled={sending}
        />
      </div>

      <div>
        <label htmlFor="projectType" className={labelClass}>
          PROJECT TYPE *
        </label>
        <select
          id="projectType"
          name="projectType"
          value={form.projectType}
          onChange={bind("projectType")}
          className={`${inputClass} [color-scheme:dark]`}
          required
          disabled={sending}
        >
          <option value="" disabled>
            Select project type
          </option>
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="location" className={labelClass}>
          PROJECT LOCATION *
        </label>
        <input
          id="location"
          name="location"
          value={form.location}
          onChange={bind("location")}
          className={inputClass}
          placeholder="City, Country"
          maxLength={150}
          required
          disabled={sending}
        />
      </div>

      <div className="md:col-span-2">
        <label htmlFor="message" className={labelClass}>
          TELL US ABOUT YOUR PROJECT *
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={bind("message")}
          className={`${inputClass} min-h-32 resize-y`}
          placeholder="Your ideas, requirements, or project details..."
          maxLength={5000}
          required
          disabled={sending}
        />
      </div>

      {/* ضد اسپم */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="botcheck">Leave this field empty</label>
        <input
          id="botcheck"
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="md:col-span-2" aria-live="polite">
        {status.kind === "error" && (
          <p role="alert" className="text-sm leading-6 text-red-400">
            {status.text}
          </p>
        )}
        {status.kind === "ok" && (
          <p role="status" className="text-sm leading-6 text-gold">
            Thank you! Your inquiry has been sent successfully. We will be in
            touch soon.
          </p>
        )}
      </div>

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex items-center gap-5 border border-gold/60 px-7 py-4 text-xs tracking-[0.18em] text-white transition-colors duration-300 hover:bg-gold hover:text-bg disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sending ? "SENDING..." : "SEND INQUIRY"}
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            {sending ? "…" : "↗"}
          </span>
        </button>
      </div>
    </form>
  );
}