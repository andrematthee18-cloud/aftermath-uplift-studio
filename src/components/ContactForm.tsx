"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, User, MessageSquare, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Contact from Aftermath Studio website");
    const body = encodeURIComponent(
      `Email: ${email}\nPhone: ${phone || "Not provided"}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:contact@aftermathstudio.co.za?subject=${subject}&body=${body}`;
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-border bg-card/95 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Get in touch</DialogTitle>
          <DialogDescription>
            Send us a message and we’ll get back to you.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
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
              className="border-border bg-background/60"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <Phone className="h-3.5 w-3.5" /> Contact Number
            </label>
            <Input
              type="tel"
              placeholder="+27 12 345 6789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border-border bg-background/60"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <MessageSquare className="h-3.5 w-3.5" /> Message
            </label>
            <Textarea
              required
              placeholder="What would you like to discuss?"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border-border bg-background/60"
            />
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
          >
            <Send className="h-4 w-4" />
            Open Email Client
          </button>

          <p className="text-center text-[11px] text-muted-foreground">
            This will open your default email app with a pre-filled message.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
