import logo from "@/assets/am-logo.png.asset.json";

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <img
      src={logo.url}
      alt="Aftermath Studio"
      className={className}
      draggable={false}
    />
  );
}
