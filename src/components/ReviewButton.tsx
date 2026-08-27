import { Star } from "lucide-react";

const REVIEW_URL =
  "https://www.google.com/search?q=aftermath+studio&oq=aftermath+studio&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQABiABDIICAIQABgWGB4yCAgDEAAYFhgeMggIBBAAGBYYHjIGCAUQRRg9MgYIBhBFGDwyBggHEEUYPNIBCDQ2NzFqMGo3qAIAsAIA&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x1e94fffcb8da82db:0xc9fe34eff0552266,3,,,,";

export function ReviewButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={REVIEW_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group inline-flex items-center gap-2 rounded-full
        bg-accent px-4 py-2 text-sm font-medium text-accent-foreground
        transition-all duration-300
        hover:scale-[1.03] hover:shadow-[0_0_40px_-10px_oklch(0.7_0.18_35/0.5)]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background
        ${className}
      `}
      aria-label="Leave us a Google review"
    >
      <Star className="h-4 w-4 fill-current transition-transform duration-300 group-hover:rotate-12" />
      <span>Leave us a review</span>
    </a>
  );
}

