"use client";

import { type FormEvent, useState } from "react";
import { parseEmail } from "./email";

type Result = { status: string; accepted: boolean };

export default function DemoForm() {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const input = event.currentTarget.elements.namedItem("email") as HTMLInputElement;
    const email = parseEmail(input.value);
    setResult(null);
    if (!email) {
      setEmailError(input.value.trim() ? "Enter a valid email address." : "Enter your email address.");
      input.focus();
      return;
    }

    setEmailError(null);
    setPending(true);
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const body = await response.json().catch(() => null);
      setResult({
        status: response.status === 200 ? "200 OK" : String(response.status),
        accepted: response.status === 200 && body?.ok === true,
      });
    } catch {
      setResult({ status: "Connection error", accepted: false });
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="demo-form" method="post" action="/api/submit" onSubmit={submit} noValidate>
      <label htmlFor="demo-email">Email address</label>
      <div className="form-fields">
        <input
          id="demo-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="demo@example.com"
          aria-invalid={emailError ? true : undefined}
          aria-describedby={emailError ? "demo-email-error demo-help" : "demo-help"}
          onChange={() => setEmailError(null)}
          required
        />
        <button className="button submit-button" type="submit" disabled={pending}>
          {pending ? "Sending…" : "Subscribe"}
        </button>
      </div>
      {emailError && <p className="form-error" id="demo-email-error" role="alert">{emailError}</p>}
      <p className="form-note" id="demo-help">Demo signup. Your email address is never stored or used to send mail.</p>
      <div className="form-response" role="status" aria-atomic="true">
        {pending && <p>Waiting for a response.</p>}
        {result && (
          <>
            <p>{result.accepted ? "Demo signup sent." : "We could not send your signup. Please try again."}</p>
            <code>POST /api/submit · {result.status}</code>
          </>
        )}
      </div>
    </form>
  );
}
