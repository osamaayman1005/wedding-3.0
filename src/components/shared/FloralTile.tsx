import { FloralCorner } from './FloralCorner'

export function FloralTile({
  tone = 'sage',
  title,
  subtitle,
}: {
  tone?: 'sage' | 'beige' | 'green'
  title: string
  subtitle: string
}) {
  const tones = {
    sage: 'from-white/96 via-ivory/94 to-champagne/60',
    beige: 'from-white/96 via-white/94 to-champagne/58',
    green: 'from-white/95 via-sage-50/88 to-ivory/82',
  }[tone]

  return (
    <div className={`relative overflow-hidden rounded-[24px] bg-gradient-to-br ${tones} ring-1 ring-ink-200/70 shadow-soft`}>
      <div className="absolute inset-0 opacity-50">
        <FloralCorner className="left-[-18px] top-[-18px] h-28 w-28" />
        <FloralCorner mirrored className="right-[-18px] bottom-[-18px] h-28 w-28" />
      </div>
      <div className="relative px-5 py-6">
        <div className="rounded-[18px] bg-white/92 p-4 ring-1 ring-ink-200/60">
          <div className="text-xs uppercase tracking-[0.35em] text-ink-500">{subtitle}</div>
          <div className="mt-2 text-xl font-[500] text-ink-800">{title}</div>
        </div>
      </div>
    </div>
  )
}
