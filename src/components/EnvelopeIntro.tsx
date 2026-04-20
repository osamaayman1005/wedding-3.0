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
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
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
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#f5efe6] text-[#4f4336]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.96),rgba(249,243,235,0.94)_40%,rgba(239,230,217,0.92)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.26),rgba(255,255,255,0.05))]" />
      <div
        className="absolute inset-0 opacity-[0.09] mix-blend-multiply"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'180\' height=\'180\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.9\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'180\' height=\'180\' filter=\'url(%23n)\' opacity=\'.4\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="absolute left-1/2 top-[10%] h-56 w-56 -translate-x-1/2 rounded-full bg-[#c7a46c]/24 blur-3xl" />
      <div className="absolute bottom-[10%] right-[10%] h-60 w-60 rounded-full bg-[#d8b58a]/18 blur-3xl" />

      <div className="relative flex min-h-svh items-center justify-center px-4 py-8 sm:px-8">
        <div className="w-full max-w-[980px]">
          <button
            type="button"
            onClick={openEnvelope}
            disabled={opening}
            className="group relative mx-auto block w-full max-w-[980px] rounded-[48px] outline-none"
            aria-label="Open the wedding invitation"
          >
            <div
              className={`relative mx-auto aspect-[5/3] w-full max-w-[980px] transition-[transform,opacity,filter] ${motion} ${
                opening ? 'scale-[1.08] opacity-0 blur-[1px]' : 'scale-100 opacity-100'
              }`}
            >
              <div className="absolute inset-x-[12%] bottom-[10%] h-6 rounded-full bg-[#7c6042]/20 blur-2xl" />

              <div className="absolute inset-x-[6%] top-[14%] h-[74%] rounded-[42px] bg-[#f8ebd8] shadow-[0_36px_100px_-46px_rgba(93,66,42,0.58)] ring-1 ring-[#c69c6c]/35" />

              <svg
                viewBox="0 0 1200 780"
                className="absolute inset-0 h-full w-full drop-shadow-[0_22px_36px_rgba(75,52,30,0.18)]"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="env-body" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#f9ead3" />
                    <stop offset="54%" stopColor="#efd7b8" />
                    <stop offset="100%" stopColor="#e4c39b" />
                  </linearGradient>
                  <linearGradient id="env-shadow" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#d7b589" />
                    <stop offset="100%" stopColor="#c59a6b" />
                  </linearGradient>
                  <linearGradient id="paper-grad" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#fffaf3" />
                    <stop offset="100%" stopColor="#f2e7d6" />
                  </linearGradient>
                </defs>

                <ellipse cx="600" cy="642" rx="306" ry="50" fill="#72543a" opacity="0.12" />

                <g
                  style={{
                    transformBox: 'fill-box',
                    transformOrigin: 'center',
                    transform: opening ? 'translateY(-18px) scale(1.02)' : 'translateY(0px) scale(1)',
                    transition: `transform ${reducedMotion ? '180ms' : '850ms'} cubic-bezier(0.22,1,0.36,1)`,
                  }}
                >
                  <rect x="214" y="188" width="772" height="452" rx="38" fill="url(#env-body)" />

                  <path
                    d="M260 272L600 486L940 272L940 592H260Z"
                    fill="url(#env-shadow)"
                    opacity="0.28"
                  />

                  <path d="M214 188L600 486L986 188H214Z" fill="#f8ead5" opacity="0.42" />
                  <path d="M214 640H986L600 486Z" fill="#e3bf91" opacity="0.95" />
                  <path d="M214 188L600 486L214 640Z" fill="#f8e6cb" opacity="0.88" />
                  <path d="M986 188L600 486L986 640Z" fill="#efd7b8" opacity="0.9" />

                  <path d="M214 188H986V244H214Z" fill="#fff7ec" opacity="0.74" />
                  <path d="M214 640H986V652H214Z" fill="#b98c5e" opacity="0.2" />
                </g>

                <g
                  style={{
                    transformBox: 'fill-box',
                    transformOrigin: 'center bottom',
                    transform: opening ? 'translateY(-112px) scale(1.04)' : 'translateY(38px) scale(0.96)',
                    opacity: opening ? 1 : 0,
                    transition: `all ${reducedMotion ? '220ms' : '980ms'} cubic-bezier(0.22,1,0.36,1)`,
                  }}
                >
                  <rect x="298" y="142" width="604" height="348" rx="30" fill="url(#paper-grad)" />
                  <rect x="320" y="164" width="560" height="304" rx="24" fill="none" stroke="#d7c2a2" strokeWidth="2" />

                  <path
                    d="M344 238H856"
                    stroke="#d6c0a0"
                    strokeLinecap="round"
                    strokeWidth="3"
                    opacity="0.9"
                  />
                  <path
                    d="M368 278H832"
                    stroke="#e0d2bf"
                    strokeLinecap="round"
                    strokeWidth="2"
                  />
                  <path
                    d="M368 322H792"
                    stroke="#e0d2bf"
                    strokeLinecap="round"
                    strokeWidth="2"
                  />

                  <text
                    x="600"
                    y="332"
                    textAnchor="middle"
                    fontFamily="'Cormorant Garamond', 'Times New Roman', serif"
                    fontSize="44"
                    fill="#8d6a43"
                    letterSpacing="0.18em"
                  >
                    YOU'RE INVITED
                  </text>
                  <text
                    x="600"
                    y="380"
                    textAnchor="middle"
                    fontFamily="'Cormorant Garamond', 'Times New Roman', serif"
                    fontSize="24"
                    fill="#8d7353"
                    letterSpacing="0.12em"
                  >
                    a day made for love
                  </text>
                </g>

                <g
                  style={{
                    transformBox: 'fill-box',
                    transformOrigin: 'center top',
                    transform: opening
                      ? 'perspective(1400px) rotateX(-168deg) translateY(-30px)'
                      : 'perspective(1200px) rotateX(0deg)',
                    opacity: opening ? 0.98 : 1,
                    transition: `transform ${reducedMotion ? '180ms' : '900ms'} cubic-bezier(0.22,1,0.36,1), opacity ${reducedMotion ? '180ms' : '700ms'} ease`,
                  }}
                >
                  <path d="M214 188L600 486L986 188Z" fill="#f4dcc0" />
                  <path d="M214 188L600 486L986 188Z" fill="none" stroke="#d7b98e" strokeWidth="3" opacity="0.55" />
                  <path
                    d="M248 202L600 458L952 202"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.42"
                  />
                </g>

                <g
                  style={{
                    transformBox: 'fill-box',
                    transformOrigin: 'center center',
                    transform: opening ? 'scale(1.08) translateY(-20px)' : 'scale(1)',
                    transition: `transform ${reducedMotion ? '180ms' : '700ms'} cubic-bezier(0.22,1,0.36,1)`,
                  }}
                >
                  <circle cx="600" cy="486" r="58" fill="#c29a68" />
                  <circle cx="600" cy="486" r="42" fill="#e9d4b5" opacity="0.9" />
                  <path
                    d="M600 460L610 478L630 482L616 495L619 515L600 505L581 515L584 495L570 482L590 478Z"
                    fill="#c89d68"
                  />
                </g>
              </svg>

              <div
                className={`absolute inset-x-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-[44%] rounded-[28px] border border-[#ead7bc] bg-[linear-gradient(180deg,rgba(255,252,246,0.98),rgba(248,241,230,0.98))] px-6 py-7 text-center shadow-[0_28px_60px_-34px_rgba(80,60,34,0.55)] transition-all ${motion} ${
                  opening
                    ? 'scale-[1.02] opacity-100'
                    : 'scale-[0.96] opacity-0'
                }`}
              >
                <div className="text-[10px] uppercase tracking-[0.44em] text-[#a17c55]">
                  With love
                </div>
                <div className="mt-3 font-['Cormorant_Garamond',_serif] text-4xl leading-none text-[#6f5539] sm:text-5xl">
                  Invitation
                </div>
                <div className="mt-3 text-sm leading-6 text-[#85705a]">
                  A soft, romantic reveal with a little sparkle, a little warmth,
                  and a lot of love.
                </div>
              </div>
            </div>
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
      </div>
    </div>
  )
}
