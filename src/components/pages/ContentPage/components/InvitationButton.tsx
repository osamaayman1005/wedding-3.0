import type { ReactNode, MouseEvent } from "react";

export function InvitationButton({
  children,
  href,
  variant = "ghost",
  onClick,
  type = "button",
  className = "",
  disabled = false,
  target,
  rel,
}: {
  children: ReactNode;
  href?: string;
  variant?: "ghost" | "solid";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  target?: string;
  rel?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-xs uppercase tracking-[0.28em] transition duration-500 hover:-translate-y-0.5";
  const styles =
    variant === "solid"
      ? "border border-ink-800 bg-ink-800 text-ivory shadow-[0_18px_40px_-24px_rgba(43,42,38,0.55)] hover:bg-ink-700 btn-primary-color"
      : "border border-[#d7cabd]/80 bg-white/72 text-ink-700 hover:bg-white/96 hover:shadow-soft btn-secondary-color";

  const classes = `${base} ${styles} ${className}`.trim();

  if (href) {
    return (
      <a className={classes} href={href} target={target} rel={rel} aria-disabled={disabled}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
