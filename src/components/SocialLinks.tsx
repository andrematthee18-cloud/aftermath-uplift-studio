import { Instagram, Facebook } from "lucide-react";

const links = [
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@aftermathstudio88",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/aftermathstudio88/",
    icon: <Instagram className="h-5 w-5" />,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61591374830237",
    icon: <Facebook className="h-5 w-5" />,
  },
];

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          className="text-muted-foreground transition-colors hover:text-accent"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
