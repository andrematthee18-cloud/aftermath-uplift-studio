import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { LogoMark } from "@/components/LogoMark";
import { Logo3D } from "@/components/Logo3D";
import { WaitlistForm } from "@/components/WaitlistForm";

interface AppPageLayoutProps {
  name: string;
  tagline: string;
  status: string;
  accent: string;
  icon: ReactNode;
  intro: ReactNode;
  sections: { heading: string; body: ReactNode }[];
  features: string[];
  closer: ReactNode;
  waitlistProduct?: string;
  waitlistLabel?: string;
  comingSoon?: boolean;
}

export function AppPageLayout({
  name,
  tagline,
  status,
  accent,
  icon,
  intro,
  sections,
  features,
  closer,
  waitlistProduct,
  waitlistLabel = "Join The Waitlist",
  comingSoon = false,
}: AppPageLayoutProps) {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-radial" />
        <div className="absolute inset-0 opacity-50">
          <Logo3D />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/70" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link to="/" className="flex items-center gap-3">
            <LogoMark className="h-9 w-9" />
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Aftermath</span>
              <span className="text-sm font-semibold tracking-wide">Studio</span>
            </div>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowLeft className="h-3 w-3" /> Back
          </Link>
        </div>
      </header>

      <section className="relative z-10 px-6 pb-20 pt-36">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-8 flex items-center gap-4">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-secondary text-foreground"
                style={{ boxShadow: `0 0 60px -20px ${accent}` }}
              >
                {icon}
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{status}</p>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{name}</h1>
              </div>
            </div>
            <p className="text-2xl font-semibold text-accent md:text-3xl">{tagline}</p>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              {intro}
            </div>

            {sections.map((section) => (
              <div key={section.heading} className="mt-12">
                <h2 className="text-2xl font-semibold text-foreground md:text-3xl">{section.heading}</h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {section.body}
                </div>
              </div>
            ))}

            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-foreground md:text-3xl">Key Features</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground backdrop-blur">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {closer}
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-border pt-10">
              {comingSoon ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Coming Soon
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setWaitlistOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
                >
                  {waitlistLabel}
                </button>
              )}
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <ArrowLeft className="h-4 w-4" /> Back to all projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {waitlistProduct && (
        <WaitlistForm open={waitlistOpen} onOpenChange={setWaitlistOpen} product={waitlistProduct} />
      )}
    </main>
  );
}
