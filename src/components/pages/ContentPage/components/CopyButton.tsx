import type { ReactNode } from "react";

export function CopyButton({
  children,
  onClick,
  type = "button",
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={`inline-flex items-center justify-center rounded-full border border-[#d7cabd]/80 bg-white/82 px-5 py-3 text-xs uppercase tracking-[0.28em] text-ink-700 transition duration-500 hover:-translate-y-0.5 hover:bg-white/96 hover:shadow-soft z-50 btn-primary-color ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
}
