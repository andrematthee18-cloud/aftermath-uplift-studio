"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";

const FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLScMO7KHh4TCNL1UvJXU2nqCg5ogJH4rFS0pf7h8R2uhCRC_nQ/formResponse";
const EMAIL_ENTRY = "entry.691570271";

export function RecoveryPlusWaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");

    const body = new FormData();
    body.append(EMAIL_ENTRY, email);

    try {
      // Google Forms doesn't return CORS headers; no-cors gives an opaque
      // response but the submission still records successfully.
      await fetch(FORM_ACTION, { method: "POST", mode: "no-cors", body });
    } catch {
      // Network failures are rare here; still show success to avoid blocking
      // the user (the submission usually goes through anyway).
    }
    setStatus("done");
    setEmail("");
  };

  if (status === "done") {
    return (
      <div
        className="w-full rounded-2xl p-8 text-center"
        style={{ backgroundColor: "#1A1A1A" }}
      >
        <p className="text-base text-white sm:text-lg">
          Application received. We&apos;ll email you with Android testing access details.
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-full rounded-2xl p-6 sm:p-8"
      style={{ backgroundColor: "#1A1A1A" }}
    >
      <h3 className="text-xl font-semibold text-white">
        Apply for the Recovery Plus Testing Phase
      </h3>
      <p className="mt-1 text-sm text-white/70">
        Recovery Plus is currently in testing on Android and is free to use. Enter your email to request early access.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="rp-waitlist-email"
            className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/80"
          >
            Email
          </label>
          <input
            id="rp-waitlist-email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            className="w-full rounded-lg border-2 border-transparent px-4 py-3 text-white placeholder-white/40 outline-none transition-colors focus:border-[#3B82F6] disabled:opacity-60"
            style={{ backgroundColor: "#2A2A2A" }}
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01] disabled:opacity-70 disabled:hover:scale-100"
          style={{ backgroundColor: "#3B82F6" }}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Applying…
            </>
          ) : (
            "Apply for Testing Phase"
          )}
        </button>
      </form>
    </div>
  );
}
