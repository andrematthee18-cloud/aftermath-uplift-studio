import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { LogoMark } from "@/components/LogoMark";
import { Logo3D } from "@/components/Logo3D";
import { SocialLinks } from "@/components/SocialLinks";

export const Route = createFileRoute("/recovery-plus/delete-account")({
  head: () => ({
    meta: [
      { title: "Delete Account — Recovery Plus | Aftermath Studio" },
      {
        name: "description",
        content: "Request permanent deletion of your Recovery Plus account.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DeleteAccountPage,
});

function DeleteAccountPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/public/account-deletion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          reason: reason.trim(),
          product: "Recovery Plus",
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Something went wrong");
      }
      setStatus("success");
      setFullName("");
      setEmail("");
      setReason("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-radial" />
        <div className="absolute inset-0 opacity-40">
          <Logo3D />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background/80" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link to="/" className="flex items-center gap-3">
            <LogoMark className="h-9 w-9" />
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
                Aftermath
              </span>
              <span className="text-sm font-semibold tracking-wide">Studio</span>
            </div>
          </Link>
          <Link
            to="/recovery-plus"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowLeft className="h-3 w-3" /> Recovery Plus
          </Link>
        </div>
      </header>

      <section className="relative z-10 px-6 pb-20 pt-36">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Recovery Plus · Account
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Request Account Deletion
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              We're sorry to see you go. Fill out the form below to request permanent deletion of
              your Recovery Plus account. Deletion can take up to 24 hours to complete, and a
              confirmation email will be sent to you once the process is finalised.
            </p>

            {status === "success" ? (
              <div className="mt-10 rounded-2xl border border-accent/40 bg-card/60 p-6 backdrop-blur">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-foreground">Request received</h2>
                    <p className="text-sm text-muted-foreground">
                      Thank you. Your account deletion request has been submitted. Please allow up
                      to 24 hours for the deletion to be fully processed. A confirmation email will
                      be sent to the address you provided once the deletion is complete.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      If you did not receive an acknowledgement email within a few minutes, please
                      check your spam folder or contact{" "}
                      <a
                        href="mailto:contact@aftermathstudio.co.za"
                        className="text-accent hover:underline"
                      >
                        contact@aftermathstudio.co.za
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-10 space-y-5">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    maxLength={120}
                    className="mt-2 w-full rounded-lg border border-border bg-card/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none backdrop-blur transition-colors focus:border-accent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={255}
                    className="mt-2 w-full rounded-lg border border-border bg-card/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none backdrop-blur transition-colors focus:border-accent"
                    placeholder="you@example.com"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Use the email address associated with your Recovery Plus account.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="reason"
                    className="block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground"
                  >
                    Reason for Leaving
                  </label>
                  <textarea
                    id="reason"
                    required
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    maxLength={2000}
                    rows={5}
                    className="mt-2 w-full rounded-lg border border-border bg-card/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none backdrop-blur transition-colors focus:border-accent"
                    placeholder="Tell us why you're leaving — your feedback helps us improve."
                  />
                </div>

                {status === "error" && errorMsg && (
                  <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {errorMsg}
                  </div>
                )}

                <div className="rounded-xl border border-border bg-card/40 p-4 text-xs text-muted-foreground backdrop-blur">
                  By submitting this form, you confirm that you are the owner of the account and
                  understand that deletion is permanent. Deletion can take up to 24 hours, and a
                  confirmation email will be sent once complete.
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-accent bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                    </>
                  ) : (
                    "Submit Deletion Request"
                  )}
                </button>
              </form>
            )}

            <div className="mt-14 border-t border-border pt-8">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">
                Related Policies
              </h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {[
                  { to: "/recovery-plus/privacy-policy", label: "Privacy Policy" },
                  { to: "/recovery-plus/data-retention", label: "Data Retention & Account Deletion" },
                  { to: "/recovery-plus/terms", label: "Terms & Conditions" },
                  { to: "/recovery-plus/community-guidelines", label: "Community Guidelines" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="inline-flex text-sm text-muted-foreground transition-colors hover:text-accent"
                    >
                      → {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <Link
                to="/recovery-plus"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Recovery Plus
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border bg-background/40 px-6 py-10 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <LogoMark className="h-6 w-6" />
            <span className="font-mono uppercase tracking-[0.25em]">
              © {new Date().getFullYear()} Aftermath Studio
            </span>
          </div>
          <SocialLinks />
        </div>
      </footer>
    </main>
  );
}
