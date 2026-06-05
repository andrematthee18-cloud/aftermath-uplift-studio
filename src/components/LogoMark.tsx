export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <img
      src="/am-logo.png"
      alt="Aftermath Studio"
      className={className}
      draggable={false}
    />
  );
}
