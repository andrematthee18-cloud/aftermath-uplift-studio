import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface AppCardProps {
  index: number;
  name: string;
  tagline: string;
  description: string;
  status: "launching" | "in-development" | "concept";
  accent: string;
  icon: React.ReactNode;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

const STATUS_LABEL: Record<AppCardProps["status"], string> = {
  launching: "Launching Soon",
  "in-development": "In Development",
  concept: "On the Horizon",
};

export function AppCard({ index, name, tagline, description, status, accent, icon, ctaLabel, onCtaClick }: AppCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-colors hover:border-accent/40"
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
        style={{ background: accent }}
      />
      <div className="relative flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-secondary text-steel">
            {icon}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            0{index + 1} / {STATUS_LABEL[status]}
          </span>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-foreground">{name}</h3>
          <p className="mt-1 text-sm uppercase tracking-wider text-accent">{tagline}</p>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </motion.article>
  );
}
