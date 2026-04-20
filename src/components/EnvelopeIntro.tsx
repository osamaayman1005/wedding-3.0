import { useEffect, useState } from 'react'

type Props = {
  onOpen: () => void
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)

    update()
    media.addEventListener('change', update)

    return () => media.removeEventListener('change', update)
  }, [])

  return reducedMotion
}

export function EnvelopeIntro({ onOpen }: Props) {
  const [opening, setOpening] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previousBodyBackground = document.body.style.background
    const previousHtmlBackground = document.documentElement.style.background
    document.body.style.overflow = 'hidden'
    document.body.style.background = '#f0dfc2'
    document.documentElement.style.background = '#f0dfc2'

    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.background = previousBodyBackground
      document.documentElement.style.background = previousHtmlBackground
    }
  }, [])

  useEffect(() => {
    if (!opening) {
      return
    }

    const timeout = window.setTimeout(
      onOpen,
      reducedMotion ? 220 : 1250,
    )

    return () => window.clearTimeout(timeout)
  }, [opening, onOpen, reducedMotion])

  const openEnvelope = () => {
    if (!opening) {
      setOpening(true)
    }
  }

  const motion = reducedMotion
    ? 'duration-200 ease-out'
    : 'duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]'

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#efe8dc] text-[#4f4336]">
      <button
        type="button"
        onClick={openEnvelope}
        disabled={opening}
        className="absolute inset-0 block h-full w-full outline-none"
        aria-label="Open the wedding invitation"
      >
        <svg
          viewBox="0 0 1600 1000"
          className="h-full w-full"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="env-base" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#f8f5ef" />
              <stop offset="55%" stopColor="#ece5da" />
              <stop offset="100%" stopColor="#ded5c8" />
            </linearGradient>
            <linearGradient id="env-soft" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#fbfaf7" />
              <stop offset="100%" stopColor="#eee8de" />
            </linearGradient>
            <linearGradient id="env-lace" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#fefcf8" />
              <stop offset="100%" stopColor="#ebe2d0" />
            </linearGradient>
            <linearGradient id="env-paper" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#f7f0e7" />
              <stop offset="100%" stopColor="#e7ded2" />
            </linearGradient>
            <linearGradient id="env-seal" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#cfad78" />
              <stop offset="100%" stopColor="#9d7344" />
            </linearGradient>
            <filter id="grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer>
                <feFuncA type="table" tableValues="0 0.12" />
              </feComponentTransfer>
            </filter>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="160%">
              <feDropShadow dx="0" dy="28" stdDeviation="22" floodColor="#8b6a48" floodOpacity="0.18" />
            </filter>
            <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="160%">
              <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#b79a79" floodOpacity="0.24" />
            </filter>
          </defs>

          <rect width="1600" height="1000" fill="url(#env-base)" />
          <rect width="1600" height="1000" filter="url(#grain)" opacity="0.09" />

          <g
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'center',
              transform: opening ? 'translateY(-14px) scale(1.01)' : 'translateY(0px) scale(1)',
              transition: `transform ${reducedMotion ? '180ms' : '850ms'} cubic-bezier(0.22,1,0.36,1)`,
            }}
          >
            <rect x="64" y="66" width="1472" height="868" rx="38" fill="url(#env-soft)" filter="url(#shadow)" />
            <rect x="90" y="88" width="1420" height="824" rx="32" fill="none" stroke="#d8c7ad" strokeWidth="1.4" opacity="0.6" />

            <path d="M150 188H1450V744H150Z" fill="#f6f2eb" opacity="0.9" />
            <path d="M150 188L800 540L1450 188V744H150Z" fill="#f4ebdf" />
            <path d="M150 744H1450L800 540Z" fill="#e6d4be" />
            <path d="M150 188L800 540L150 744Z" fill="#f1e6d8" />
            <path d="M1450 188L800 540L1450 744Z" fill="#ead8c1" />
            <path d="M150 188H1450V234H150Z" fill="#ffffff" opacity="0.35" />

            <path d="M188 260C245 224 311 198 384 188H1216C1289 198 1355 224 1412 260" fill="none" stroke="#ffffff" strokeLinecap="round" strokeWidth="18" opacity="0.48" />
            <path d="M196 269C252 236 316 212 386 202H1214C1284 212 1348 236 1404 269" fill="none" stroke="#d8c3a9" strokeLinecap="round" strokeWidth="4" opacity="0.32" />
          </g>

          <g
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'center bottom',
              transform: opening ? 'translateY(-110px) scale(1.02)' : 'translateY(28px) scale(0.985)',
              opacity: opening ? 1 : 0.98,
              transition: `all ${reducedMotion ? '220ms' : '980ms'} cubic-bezier(0.22,1,0.36,1)`,
            }}
          >
            <path
              d="M320 684L800 536L1280 684V842H320Z"
              fill="url(#env-paper)"
              filter="url(#soft-shadow)"
            />
            <path d="M320 684L800 536L1280 684V842H320Z" fill="none" stroke="#d8c7b1" strokeWidth="1.5" opacity="0.72" />
            <path d="M320 684L800 536L1280 684" fill="none" stroke="#efe8de" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
            <path
              d="M360 720C470 654 579 622 800 560C1021 622 1130 654 1240 720"
              fill="none"
              stroke="#d9c8b4"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.38"
            />
            <path
              d="M360 756C470 700 585 672 800 620C1015 672 1130 700 1240 756"
              fill="none"
              stroke="#e8dfd3"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M372 786C480 742 592 720 800 676C1008 720 1120 742 1228 786"
              fill="none"
              stroke="#cdb8a2"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.48"
            />
          </g>

          <g
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'center top',
              transform: opening
                ? 'perspective(1600px) rotateX(-178deg) translateY(-28px)'
                : 'perspective(1200px) rotateX(0deg)',
              opacity: opening ? 0.98 : 1,
              transition: `transform ${reducedMotion ? '180ms' : '900ms'} cubic-bezier(0.22,1,0.36,1), opacity ${reducedMotion ? '180ms' : '700ms'} ease`,
            }}
          >
            <path d="M150 188L800 540L1450 188Z" fill="url(#env-lace)" filter="url(#soft-shadow)" />
            <path d="M150 188L800 540L1450 188Z" fill="none" stroke="#cdb898" strokeWidth="2.2" opacity="0.58" />

            <path
              d="M186 198L236 196L276 230L322 196L370 202L410 238L458 202L510 210L546 248L596 210L652 218L688 254L740 216L800 224L860 216L912 254L948 218L1004 210L1054 248L1090 210L1142 202L1190 238L1230 202L1278 196L1322 230L1364 196L1414 198"
              fill="none"
              stroke="#f6f2eb"
              strokeLinecap="round"
              strokeWidth="16"
              opacity="0.96"
            />
            <path
              d="M186 198L236 196L276 230L322 196L370 202L410 238L458 202L510 210L546 248L596 210L652 218L688 254L740 216L800 224L860 216L912 254L948 218L1004 210L1054 248L1090 210L1142 202L1190 238L1230 202L1278 196L1322 230L1364 196L1414 198"
              fill="none"
              stroke="#e1d5c1"
              strokeLinecap="round"
              strokeWidth="3"
              opacity="0.78"
            />
            <path
              d="M212 212L248 244L288 212L332 248L372 212L414 244L456 212L500 248L544 212L586 244L628 212L672 248L716 212L760 244L800 212L840 244L884 212L928 248L972 212L1014 244L1056 212L1100 248L1140 212L1182 244L1224 212L1268 248L1308 212L1352 244L1392 212"
              fill="none"
              stroke="#fffaf5"
              strokeLinecap="round"
              strokeWidth="6"
              opacity="0.85"
            />
          </g>

          <g
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'center center',
              transform: opening ? 'scale(1.1) translateY(-14px)' : 'scale(1)',
              transition: `transform ${reducedMotion ? '180ms' : '700ms'} cubic-bezier(0.22,1,0.36,1)`,
            }}
          >
            <circle cx="800" cy="536" r="56" fill="url(#env-seal)" />
            <circle cx="800" cy="536" r="44" fill="#f6ead3" opacity="0.92" />
            <circle cx="800" cy="536" r="30" fill="none" stroke="#b78a56" strokeWidth="4" opacity="0.85" />
            <path
              d="M800 512L811 530L833 534L818 548L822 570L800 560L778 570L782 548L767 534L789 530Z"
              fill="#c4975f"
            />
            <path
              d="M800 500C811 510 820 522 824 536C820 550 811 562 800 572C789 562 780 550 776 536C780 522 789 510 800 500Z"
              fill="none"
              stroke="#d8bf98"
              strokeWidth="2"
              opacity="0.7"
            />
          </g>
        </svg>
      </button>

      <div
        className={`pointer-events-none fixed inset-0 z-50 transition-all ${motion} ${
          opening ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[#f3eadf]/92 backdrop-blur-[8px]" />
        <div
          className={`absolute left-1/2 top-1/2 w-[min(92vw,860px)] -translate-x-1/2 -translate-y-1/2 transition-all ${motion} ${
            opening ? 'scale-100 opacity-100' : 'scale-[0.85] opacity-0'
          }`}
        >
          <div className="relative overflow-hidden rounded-[34px] border border-[#d9c3a6] bg-[linear-gradient(180deg,#fffdf8_0%,#f8f1e6_100%)] px-6 py-10 text-center shadow-[0_40px_100px_-44px_rgba(61,43,25,0.55)] sm:px-12 sm:py-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,160,107,0.12),transparent_58%)]" />
            <div className="absolute left-1/2 top-6 h-1.5 w-24 -translate-x-1/2 rounded-full bg-[#c39b6f]/35" />
            <div className="relative">
              <div className="text-[11px] uppercase tracking-[0.5em] text-[#9c7a54]">
                Wedding Invitation
              </div>
              <h1 className="mt-4 font-['Cormorant_Garamond',_serif] text-5xl leading-none text-[#594630] sm:text-7xl">
                A lovely celebration
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#7b6752] sm:text-lg">
                The seal opens, the paper unfolds, and the invitation softens
                into a warm, romantic reveal before the rest of the site appears.
              </p>

              <div className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
                {[
                  ['Ceremony', 'Sunset vows'],
                  ['Reception', 'Dinner and dancing'],
                  ['Dress code', 'Soft, elegant, and comfy'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[24px] border border-[#ead9c1] bg-white/70 px-4 py-5 shadow-[0_14px_30px_-24px_rgba(67,48,29,0.35)]"
                  >
                    <div className="text-[10px] uppercase tracking-[0.4em] text-[#a17d57]">
                      {label}
                    </div>
                    <div className="mt-2 font-['Cormorant_Garamond',_serif] text-2xl text-[#5f4a34]">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
