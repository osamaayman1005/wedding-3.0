import type { ReactNode } from "react";
import { useInView } from "../../hooks/useInView";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

export function Reveal({
  children,
  className = "",
  delayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();

  const style = reduced
    ? undefined
    : ({
        transitionDelay: `${delayMs}ms`,
      } as const);

  return (
    <div
      ref={ref}
      style={style}
      className={`${className} transition-all duration-[1400ms] ease-out ${
        inView || reduced
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      }`}
    >
      {children}
    </div>
  );
}
