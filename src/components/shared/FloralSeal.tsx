import { useId } from 'react'

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
