import { useEffect } from "react";
import type { ReactNode } from "react";
import { Button } from "../shared/Button";

export function Lightbox({
  open,
  src,
  alt,
  onClose,
  closeLabel,
  children,
}: {
  open: boolean;
  src?: string;
  alt?: string;
  onClose: () => void;
  closeLabel: string;
  children?: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center bg-ink-900/35 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-[980px] overflow-hidden rounded-[26px] bg-white/98 ring-1 ring-ink-200/70 shadow-soft noise-overlay">
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <div className="text-sm text-ink-600">{alt}</div>
          <Button variant="ghost" onClick={onClose}>
            {closeLabel}
          </Button>
        </div>
        <div className="px-5 pb-6">
          {children ? (
            children
          ) : src ? (
            <img
              src={src}
              alt={alt}
              className="h-auto w-full rounded-[22px] object-cover ring-1 ring-ink-200/70"
              decoding="async"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
