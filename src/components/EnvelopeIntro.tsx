import { useEffect, useState } from 'react'
import envelopeImage from '../assets/envelope.png'

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
    if (!opening) return

    const timeout = window.setTimeout(onOpen, reducedMotion ? 220 : 1200)
    return () => window.clearTimeout(timeout)
  }, [opening, onOpen, reducedMotion])

  const openEnvelope = () => {
    if (!opening) setOpening(true)
  }

  const motion = reducedMotion
    ? 'duration-200 ease-out'
    : 'duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]'

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92),rgba(246,240,232,0.94)_48%,rgba(233,222,208,0.98)_100%)] text-[#4f4336]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.05))]" />
      <div className="absolute inset-0 opacity-[0.05] mix-blend-multiply bg-[radial-gradient(circle_at_20%_20%,rgba(191,160,110,0.18),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(191,160,110,0.1),transparent_28%)]" />

      <div className="relative flex min-h-svh items-center justify-center px-4 py-8 sm:px-8">
        <button
          type="button"
          onClick={openEnvelope}
          disabled={opening}
          aria-label="Open the wedding invitation"
          className="group relative w-full max-w-[920px] outline-none"
        >
          <div
            className={`relative mx-auto w-full transition-[transform,opacity,filter] ${motion} ${
              opening ? 'scale-[1.04] opacity-0 blur-[1px]' : 'scale-100 opacity-100'
            }`}
          >
            <div className="absolute inset-x-[9%] bottom-[10%] h-8 rounded-full bg-[#7f684c]/14 blur-2xl" />

            <div className="relative overflow-hidden rounded-[34px] border border-white/50 bg-white/38 p-4 shadow-[0_26px_90px_-34px_rgba(70,52,30,0.28)] backdrop-blur-[2px] sm:rounded-[40px] sm:p-5">
              <img
                src={envelopeImage}
                alt=""
                className="block h-auto w-full rounded-[26px] object-cover shadow-[0_20px_60px_-36px_rgba(72,52,28,0.35)]"
              />

              <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_40%)]" />
            </div>
          </div>

          <div
            className={`mx-auto mt-5 max-w-md text-center transition-all ${motion} ${
              opening ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
            }`}
          >
            <div className="text-[11px] uppercase tracking-[0.5em] text-[#9b7955]">
              A little sealed envelope
            </div>
            <div className="mt-3 font-['Cormorant_Garamond',_serif] text-lg italic text-[#7c644a]">
              Tap the seal to open
            </div>
          </div>
        </button>

        <div
          className={`pointer-events-none fixed inset-0 z-50 transition-all ${motion} ${
            opening ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[#f4ebe0]/90 backdrop-blur-[8px]" />
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
  )
}
