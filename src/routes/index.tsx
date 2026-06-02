import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Activity, Heart, Skull, Mail, ArrowUpRight, MapPin } from "lucide-react";
import { Logo3D } from "@/components/Logo3D";
import { LogoMark } from "@/components/LogoMark";
import { AppCard } from "@/components/AppCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aftermath Studio — Independent App & Game Studio, South Africa" },
      {
        name: "description",
        content:
          "Aftermath Studio is a South African app and game studio building Recovery Plus, Zizie, and the survival game Ubuntu: The Fall.",
      },
      { property: "og:title", content: "Aftermath Studio" },
      { property: "og:description", content: "We build apps that matter. From recovery tools to survival worlds." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      {/* Persistent 3D backdrop — visible behind every section for depth */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute inset-0 bg-radial" />
        <div className="absolute inset-0 opacity-90">
          <Logo3D />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/40" />
      </div>

      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#top" className="flex items-center gap-3">
            <LogoMark className="h-9 w-9" />
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Aftermath</span>
              <span className="text-sm font-semibold tracking-wide">Studio</span>
            </div>
          </a>
          <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
            <a href="#apps" className="transition-colors hover:text-foreground">Apps</a>
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          </nav>
          <a
            href="mailto:contact@aftermathstudio.co.za"
            className="hidden items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-accent hover:text-accent md:inline-flex"
          >
            Get in touch <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative z-10 min-h-screen overflow-hidden">
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-24 pt-32">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              Independent Studio · Est. South Africa
            </div>
            <h1 className="text-5xl font-bold leading-[0.95] sm:text-7xl md:text-8xl">
              <span className="text-gradient-steel">After the noise,</span>
              <br />
              <span className="text-foreground">we build.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Aftermath Studio is a small South African team crafting apps and games with intent —
              from quiet tools that hold people accountable, to expansive worlds you can get lost in.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#apps"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
              >
                See what we're building
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="mailto:contact@aftermathstudio.co.za"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <Mail className="h-4 w-4" />
                <span>contact@aftermathstudio.co.za</span>
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          ↓ Scroll
        </div>
      </section>

      {/* APPS */}
      <section id="apps" className="relative z-10 px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 flex flex-wrap items-end justify-between gap-6"
          >
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">— Our Slate</p>
              <Heading3D text="SLATE" height={160} size={1.6} depth={0.45} emissive="#e85d3a" />
              <h2 className="sr-only">Three projects, one philosophy.</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Each release is shaped to outlast the moment it launches. No shortcuts, no filler.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AppCard
              index={0}
              name="Recovery Plus"
              tagline="Tracker · Accountability"
              status="launching"
              accent="oklch(0.7 0.18 35 / 0.6)"
              icon={<Heart className="h-6 w-6" />}
              description="A daily tracker built with recovering addicts in mind — sobriety streaks, accountability partners, and quiet check-ins that show up when willpower runs low."
            />
            <AppCard
              index={1}
              name="Zizie"
              tagline="Coming Soon"
              status="in-development"
              accent="oklch(0.65 0.18 200 / 0.5)"
              icon={<Activity className="h-6 w-6" />}
              description="Our next companion app, currently taking shape in the studio. Something quietly useful is on the way — details revealed closer to release."
            />
            <AppCard
              index={2}
              name="Ubuntu: The Fall"
              tagline="Survival Game"
              status="concept"
              accent="oklch(0.55 0.2 25 / 0.5)"
              icon={<Skull className="h-6 w-6" />}
              description="A survival game rooted in African landscape and lore. Scarcity, community, and the choices that decide who makes it through the night."
            />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative z-10 border-t border-border px-6 py-32">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">— About</p>
            <Heading3D text="ABOUT" height={160} size={1.6} depth={0.45} emissive="#4cc9f0" />
            <h2 className="sr-only">Built in the aftermath of comfortable software.</h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:col-span-7 md:text-lg">
            <p>
              We're a small studio operating from South Africa, making things we'd actually use.
              Our work spans the practical — accountability tools, daily companions — and the
              ambitious — open-world survival rooted in our continent's stories.
            </p>
            <p>
              Every project we ship is treated like our last one. Slow when it needs to be,
              relentless when it doesn't.
            </p>
            <div className="flex items-center gap-2 pt-4 font-mono text-xs uppercase tracking-[0.25em] text-foreground">
              <MapPin className="h-3.5 w-3.5 text-accent" /> South Africa
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative z-10 border-t border-border px-6 py-32">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <LogoMark className="mx-auto mb-8 h-16 w-16" />
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">— Contact</p>
            <Heading3D text="TALK" height={180} size={1.8} depth={0.5} emissive="#9b5de5" />
            <h2 className="sr-only">Let's talk.</h2>
            <p className="mx-auto mt-6 max-w-md text-muted-foreground">
              Press, partnership, or just want to say hello? We read every email.
            </p>
            <a
              href="mailto:contact@aftermathstudio.co.za"
              className="group mt-10 inline-flex items-center gap-3 rounded-full border border-border bg-card px-8 py-4 text-lg font-medium text-foreground transition-all hover:border-accent hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_60px_-10px_oklch(0.7_0.18_35/0.6)]"
            >
              <Mail className="h-5 w-5" />
              contact@aftermathstudio.co.za
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-border bg-background/40 px-6 py-10 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <LogoMark className="h-6 w-6" />
            <span className="font-mono uppercase tracking-[0.25em]">© {new Date().getFullYear()} Aftermath Studio</span>
          </div>
          <span className="font-mono uppercase tracking-[0.25em]">Made in South Africa 🇿🇦</span>
        </div>
      </footer>
    </main>
  );
}
