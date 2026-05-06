import type { ReactNode } from "react";
import { Reveal } from "../../../shared/Reveal";
import { SectionDivider } from "./SectionDivider";

export function SectionFrame({
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
  id,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-28 px-4 py-6 md:py-8 ${className}`}
      aria-label={title}
    >
      <div className="mx-auto max-w-[1120px]">
        <div className=" relative overflow-hidden">
          <div className="absolute inset-0 " />

          <div className="relative px-5 py-10 md:px-10 md:py-12">
            <Reveal>
              <header className="mx-auto max-w-2xl text-center">
                <p className="section-eyebrow text-[10px] uppercase tracking-[0.30em] text-[#40382b]">
                  {eyebrow}
                </p>
                <h2 className="mt-4 text-5xl font-[400] tracking-[0.01em] text-ink-800 md:text-4xl">
                  {title}
                </h2>
                <div className="mt-5">
                  <SectionDivider />
                </div>
                {subtitle ? (
                  <p className="mx-auto mt-5 max-w-[58ch] text-md leading-relaxed text-ink-600 md:text-base italic">
                    {subtitle}
                  </p>
                ) : null}
              </header>
            </Reveal>

            <div className="relative mt-8 md:mt-10">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
