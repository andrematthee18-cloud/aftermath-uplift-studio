// Pure SVG re-creation of the Aftermath Studio "AM" monogram.
// Used both for 2D contexts (nav, footer) and as the silhouette extruded in 3D.
export const LOGO_PATH =
  "M 50 250 L 150 30 L 175 90 L 130 90 L 100 160 L 200 160 L 175 215 L 80 215 Z M 200 60 L 260 60 L 260 250 L 215 250 L 215 110 L 175 215 L 200 250 Z";

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 280" className={className} aria-label="Aftermath Studio">
      <defs>
        <linearGradient id="am-steel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.92 0.01 240)" />
          <stop offset="100%" stopColor="oklch(0.45 0.01 240)" />
        </linearGradient>
      </defs>
      {/* A */}
      <path
        d="M 30 250 L 130 20 L 230 250 L 190 250 L 165 195 L 95 195 L 70 250 Z M 110 160 L 150 160 L 130 110 Z"
        fill="url(#am-steel)"
        fillRule="evenodd"
      />
      {/* M overlay stroke */}
      <path
        d="M 95 250 L 130 130 L 165 195 L 200 130 L 235 250"
        fill="none"
        stroke="url(#am-steel)"
        strokeWidth="14"
        strokeLinejoin="miter"
        strokeLinecap="square"
        opacity="0.95"
      />
    </svg>
  );
}
