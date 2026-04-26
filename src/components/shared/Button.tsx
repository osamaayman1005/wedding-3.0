import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm tracking-wide transition-all duration-500 focus-visible:outline-none";
  const styles =
    variant === "primary"
      ? "bg-white/92 text-ink-800 ring-1 ring-sage-700/18 shadow-glow hover:bg-white hover:shadow-[0_18px_36px_-22px_rgba(53,60,45,0.32)] active:translate-y-px"
      : "bg-white/76 text-ink-800 ring-1 ring-ink-200/70 hover:bg-white/96";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
