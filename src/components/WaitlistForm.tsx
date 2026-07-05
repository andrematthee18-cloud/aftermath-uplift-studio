"use client";

import React, { useState } from "react";
import { Mail, Phone, User, Send, Loader2, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function WaitlistForm({
  open,
  onOpenChange,
  product = "Recovery Plus",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: string;
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/public/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phone, product }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 409) {
        setStatus("duplicate");
        return;
      }
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      setStatus("success");
      setFullName("");
      setEmail("");
      setPhone("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      setStatus("idle");
      setErrorMsg("");
    }
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md border-border bg-card/95 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Join the {product} waitlist</DialogTitle>
          <DialogDescription>
            Be first in line when we launch. We’ll only email you about {product}.
          </DialogDescription>
        </DialogHeader>

        {status === "success" ? (
          <div className="mt-4 flex flex-col items-center gap-3 py-6 text-center">
            <CheckCircle2 className="h-10 w-10 text-accent" />
            <p className="text-sm text-foreground">
              Thank you! You've successfully joined the Recovery+ waitlist.
            </p>
          </div>
        ) : status === "duplicate" ? (
          <div className="mt-4 flex flex-col items-center gap-3 py-6 text-center">
            <CheckCircle2 className="h-10 w-10 text-accent" />
            <p className="text-sm text-foreground">
              You're already on the Recovery+ waitlist.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
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

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <Phone className="h-3.5 w-3.5" /> Phone Number
              </label>
              <Input
                type="tel"
                required
                placeholder="+27 12 345 6789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={40}
                className="border-border bg-background/60"
              />
            </div>

            {status === "error" && (
              <p className="text-xs text-destructive">{errorMsg}</p>
            )}

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
        )}
      </DialogContent>
    </Dialog>
  );
}
