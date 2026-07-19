import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { LogoMark } from "@/components/LogoMark";
import { Logo3D } from "@/components/Logo3D";
import { SocialLinks } from "@/components/SocialLinks";

export interface LegalSection {
  heading: string;
  body: ReactNode;
}

interface LegalPageLayoutProps {
  title: string;
  subtitle?: string;
  effectiveDate?: string;
  lastUpdated?: string;
  intro?: ReactNode;
  sections: LegalSection[];
  closer?: ReactNode;
}

export function LegalPageLayout({
  title,
  subtitle,
  effectiveDate = "20/07/2026",
  lastUpdated = "18/07/2026",
  intro,
  sections,
  closer,
}: LegalPageLayoutProps) {
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
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Aftermath</span>
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
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Recovery Plus · Legal
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
            {subtitle && <p className="mt-3 text-lg text-accent">{subtitle}</p>}

            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-1 text-xs font-mono uppercase tracking-wider text-muted-foreground">
              <span>Effective Date: {effectiveDate}</span>
              <span>Last Updated: {lastUpdated}</span>
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-card/50 p-4 text-sm text-muted-foreground backdrop-blur">
              Recovery Plus is owned and operated by <span className="text-foreground">Aftermath Studio</span>.
              <br />
              Website: <span className="text-foreground">aftermathstudio.co.za</span> · Email:{" "}
              <a href="mailto:contact@aftermathstudio.co.za" className="text-accent hover:underline">
                contact@aftermathstudio.co.za
              </a>
            </div>

            {intro && (
              <div className="mt-10 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                {intro}
              </div>
            )}

            <div className="mt-10 space-y-10">
              {sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-xl font-semibold text-foreground md:text-2xl">{section.heading}</h2>
                  <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
                    {section.body}
                  </div>
                </section>
              ))}
            </div>

            {closer && (
              <div className="mt-12 space-y-4 text-base leading-relaxed text-muted-foreground">
                {closer}
              </div>
            )}

            <div className="mt-14 border-t border-border pt-8">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">
                Related Policies
              </h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {[
                  { to: "/recovery-plus/privacy-policy", label: "Privacy Policy" },
                  { to: "/recovery-plus/terms", label: "Terms & Conditions" },
                  { to: "/recovery-plus/data-retention", label: "Data Retention & Account Deletion" },
                  { to: "/recovery-plus/community-guidelines", label: "User Agreement & Community Guidelines" },
                  { to: "/recovery-plus/ai-disclaimer", label: "AI & Medical Disclaimer" },
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

            <div className="mt-10 flex flex-wrap items-center gap-4">
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
