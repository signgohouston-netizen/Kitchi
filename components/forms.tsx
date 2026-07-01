"use client";

import { useState } from "react";
import { FORM_ENDPOINT } from "@/lib/data";

type Status = "idle" | "sending" | "ok" | "error";

async function submit(form: HTMLFormElement): Promise<boolean> {
  if (!FORM_ENDPOINT) return true; // demo mode
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function useFormSubmit(okMsg: string) {
  const [status, setStatus] = useState<Status>("idle");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    const ok = await submit(form);
    setStatus(ok ? "ok" : "error");
    if (ok) form.reset();
    setTimeout(() => setStatus("idle"), 5000);
  }
  const note =
    status === "ok" ? okMsg : status === "error" ? "Something went wrong — please try again or email us." : "";
  return { status, onSubmit, note };
}

export function NewsletterForm({ okMsg, button = "Subscribe" }: { okMsg: string; button?: string }) {
  const { status, onSubmit, note } = useFormSubmit(okMsg);
  return (
    <>
      <form className="newsletter-form" onSubmit={onSubmit}>
        <input type="email" name="email" placeholder="Enter your email" required aria-label="Email" />
        <button type="submit" className="btn btn-orange" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : button}
        </button>
      </form>
      <p className={"form-note" + (note ? " show" : "")}>{note}</p>
    </>
  );
}

export function ContactForm() {
  const { status, onSubmit, note } = useFormSubmit("✅ Thanks! Your message is on its way — we'll reply within 24 hours.");
  return (
    <form onSubmit={onSubmit}>
      <div className="field-row">
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" type="text" placeholder="Jane Doe" required />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="jane@email.com" required />
        </div>
      </div>
      <div className="field">
        <label htmlFor="topic">I&apos;m reaching out about</label>
        <select id="topic" name="topic">
          <option>Ordering &amp; meal plans</option>
          <option>Becoming a home cook</option>
          <option>Riding / delivery</option>
          <option>Press &amp; partnerships</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" placeholder="How can we help?" required></textarea>
      </div>
      <button type="submit" className="btn btn-primary btn-block" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      <p className={"form-note" + (note ? " show" : "")}>{note}</p>
    </form>
  );
}
