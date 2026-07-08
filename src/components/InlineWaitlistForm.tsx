"use client";

import React, { useState } from "react";
import { Mail, User, Send, Loader2, CheckCircle2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { Input } from "@/components/ui/input";
import { joinWaitlist } from "@/lib/waitlist.functions";
import {
  defaultPhoneCountry,
  formatInternationalPhone,
  PhoneNumberField,
} from "@/components/PhoneNumberField";

export function InlineWaitlistForm({ product = "Recovery Plus" }: { product?: string }) {
  const joinWaitlistFn = useServerFn(joinWaitlist);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCountry, setPhoneCountry] = useState(defaultPhoneCountry);
  const [phoneLocal, setPhoneLocal] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const phone = formatInternationalPhone(phoneCountry, phoneLocal);
      if (!phone) {
        setStatus("error");
        setErrorMsg("Please enter your phone number.");
        return;
      }

      const result = await joinWaitlistFn({
        data: { fullName, email, phone, product },
      });

      if (result.duplicate) {
        setStatus("duplicate");
        return;
      }

      if (!result.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      setStatus("success");
      setFullName("");
      setEmail("");
      setPhoneLocal("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card/60 p-8 text-center backdrop-blur">
        <CheckCircle2 className="h-10 w-10 text-accent" />
        <p className="text-sm text-foreground">
          Thank you! You've successfully joined the {product} waitlist.
        </p>
      </div>
    );
  }

  if (status === "duplicate") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card/60 p-8 text-center backdrop-blur">
        <CheckCircle2 className="h-10 w-10 text-accent" />
        <p className="text-sm text-foreground">You're already on the {product} waitlist.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur"
    >
      <div>
        <h3 className="text-lg font-semibold text-foreground">Join the {product} waitlist</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Be first in line when we launch. We'll only email you about {product}.
        </p>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <User className="h-3.5 w-3.5" /> Full Name
        </label>
        <Input
          required
          placeholder="Your name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          maxLength={120}
          className="border-border bg-background/60"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <Mail className="h-3.5 w-3.5" /> Email
        </label>
        <Input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={255}
          className="border-border bg-background/60"
        />
      </div>

      <PhoneNumberField
        countryId={phoneCountry}
        localNumber={phoneLocal}
        onCountryChange={setPhoneCountry}
        onLocalNumberChange={setPhoneLocal}
      />

      {status === "error" && <p className="text-xs text-destructive">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Joining…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Join the Waitlist
          </>
        )}
      </button>
    </form>
  );
}
