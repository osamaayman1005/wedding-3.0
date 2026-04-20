import type { ReactNode } from 'react'
import { OrnamentCorner } from './OrnamentCorner'
import { Reveal } from './Reveal'

export function SectionShell({
  id,
  title,
  subtitle,
  children,
  variant = 'card',
}: {
  id: string
  title: string
  subtitle?: string
  children: ReactNode
  variant?: 'card' | 'plain'
}) {
  const wrap =
    variant === 'card'
      ? 'relative overflow-hidden rounded-[28px] bg-white/94 ring-1 ring-ink-200/70 shadow-soft noise-overlay'
      : 'relative'

  return (
    <section id={id} className="section-wash scroll-mt-24 px-4 py-10 md:py-14">
      <div className="mx-auto w-full max-w-[980px]">
        <div className={wrap}>
          {variant === 'card' ? (
            <>
              <OrnamentCorner corner="tl" />
              <OrnamentCorner corner="tr" />
              <OrnamentCorner corner="bl" />
              <OrnamentCorner corner="br" />
            </>
          ) : null}

          <div className="relative px-6 py-10 md:px-10 md:py-12">
            <Reveal>
              <header className="text-center">
                <h2 className="text-3xl font-[500] tracking-[0.02em] text-ink-800 md:text-4xl">
                  {title}
                </h2>
                {subtitle ? (
                  <p className="mx-auto mt-3 max-w-[52ch] text-sm leading-relaxed text-ink-600 md:text-base">
                    {subtitle}
                  </p>
                ) : null}
              </header>
            </Reveal>

            <div className="mt-8">{children}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
