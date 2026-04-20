import { useId } from 'react'

type CornerProps = {
  className?: string
  mirrored?: boolean
}

export function FloralCorner({ className = '', mirrored = false }: CornerProps) {
  const uid = useId()
  const leafId = `${uid}-leaf`
  const petalId = `${uid}-petal`
  return (
    <svg
      viewBox="0 0 220 220"
      aria-hidden="true"
      className={`pointer-events-none absolute h-36 w-36 opacity-45 md:h-48 md:w-48 ${className} ${
        mirrored ? 'scale-x-[-1]' : ''
      }`}
    >
      <defs>
        <linearGradient id={leafId} x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#D7DED4" />
          <stop offset="100%" stopColor="#8A9385" />
        </linearGradient>
        <linearGradient id={petalId} x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F2EFE8" />
        </linearGradient>
      </defs>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M28 176c36-32 56-63 70-116" stroke={`url(#${leafId})`} strokeWidth="4" />
        <path d="M46 158c12-15 25-24 42-29" stroke={`url(#${leafId})`} strokeWidth="3" />
        <path d="M70 132c9-13 21-21 36-25" stroke={`url(#${leafId})`} strokeWidth="3" />
        <path d="M84 106c8-10 18-15 30-18" stroke={`url(#${leafId})`} strokeWidth="3" />
        <ellipse cx="84" cy="120" rx="14" ry="8" fill={`url(#${leafId})`} opacity="0.95" transform="rotate(-25 84 120)" />
        <ellipse cx="106" cy="102" rx="16" ry="9" fill={`url(#${leafId})`} opacity="0.9" transform="rotate(30 106 102)" />
        <ellipse cx="126" cy="88" rx="12" ry="7" fill={`url(#${leafId})`} opacity="0.85" transform="rotate(18 126 88)" />
        <ellipse cx="60" cy="164" rx="12" ry="7" fill={`url(#${leafId})`} opacity="0.75" transform="rotate(-40 60 164)" />
        <g fill={`url(#${petalId})`} opacity="0.96">
          <path d="M138 136c10-16 24-18 32-8-9 7-14 17-14 28-12-1-23-7-18-20Z" />
          <path d="M154 132c16-4 28 4 30 18-11 0-20 5-26 14-8-9-11-21-4-32Z" />
          <path d="M165 149c8-10 19-14 30-10-2 13-9 22-21 27-7-6-10-11-9-17Z" />
        </g>
        <circle cx="161" cy="143" r="4.5" fill="#E2DAD2" />
        <circle cx="147" cy="152" r="3.5" fill="#CBD4CA" />
        <circle cx="171" cy="160" r="3.25" fill="#AAB3A4" />
      </g>
    </svg>
  )
}

export function FloralSeal({ title, subtitle }: { title: string; subtitle: string }) {
  const uid = useId()
  const stemId = `${uid}-stem`
  return (
    <div className="relative mx-auto aspect-square w-[160px] md:w-[190px]">
      <div className="absolute inset-0 rounded-full bg-white/94 ring-1 ring-sage-700/15 shadow-glow" />
      <div className="absolute inset-3 rounded-full border border-sage-700/15" />
      <div className="absolute inset-[10px] rounded-full bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.97),rgba(250,248,243,0.96)_60%,rgba(241,237,230,0.92)_100%)]" />

      <svg viewBox="0 0 200 200" aria-hidden="true" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={stemId} x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#E7E0D8" />
            <stop offset="100%" stopColor="#A2A9A0" />
          </linearGradient>
        </defs>
        <path d="M56 136c20-27 47-35 88-25" fill="none" stroke={`url(#${stemId})`} strokeWidth="3" strokeLinecap="round" />
        <g fill="#FFFFFF" opacity="0.98">
          <path d="M132 121c8-9 17-10 23-4-6 4-9 10-9 17-8 0-14-4-14-13Z" />
          <path d="M144 123c10-2 17 3 19 11-7 0-12 4-16 9-5-5-7-12-3-20Z" />
        </g>
        <circle cx="148" cy="129" r="2.8" fill="#E2DAD2" />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <div className="text-[11px] tracking-[0.45em] text-ink-500/80">{subtitle}</div>
        <div className="mt-2 text-3xl font-[500] leading-none text-sage-900 md:text-4xl">
          {title}
        </div>
      </div>
    </div>
  )
}

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
