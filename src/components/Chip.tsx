import type { ReactNode } from 'react'

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/90 px-4 py-2 text-xs tracking-wide text-ink-700 ring-1 ring-ink-200/70 shadow-glow">
      {children}
    </span>
  )
}
