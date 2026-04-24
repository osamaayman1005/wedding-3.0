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
