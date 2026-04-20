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

    const timeout = window.setTimeout(onOpen, reducedMotion ? 60 : 120)
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
      <div className="absolute inset-0 opacity-[0.06] mix-blend-multiply bg-[radial-gradient(circle_at_20%_20%,rgba(191,160,110,0.16),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(191,160,110,0.1),transparent_28%),radial-gradient(circle_at_50%_80%,rgba(195,165,125,0.12),transparent_34%)]" />
      <div className="absolute left-[10%] top-[18%] h-40 w-40 rounded-full bg-[#d7b98a]/22 blur-3xl animate-[envelope-drift_18s_ease-in-out_infinite]" />
      <div className="absolute right-[10%] top-[24%] h-56 w-56 rounded-full bg-[#f0dcbc]/22 blur-3xl animate-[envelope-drift_22s_ease-in-out_infinite_reverse]" />
      <div className="absolute bottom-[10%] left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[#d9c1a2]/18 blur-3xl animate-[envelope-breathe_14s_ease-in-out_infinite]" />

      <div className="relative flex min-h-svh items-center justify-center px-4 py-8 sm:px-8">
        <button
          type="button"
          onClick={openEnvelope}
          disabled={opening}
          aria-label="Open the wedding invitation"
          className="group relative w-full max-w-[980px] outline-none"
        >
          <div
            className={`relative mx-auto w-full transition-[transform,opacity,filter] ${motion} ${
              opening ? 'scale-[1.12] opacity-0 blur-[2px]' : 'scale-100 opacity-100'
            }`}
          >
            <div className="absolute left-1/2 top-[73%] h-36 w-[74%] -translate-x-1/2 rounded-full bg-[#5b452d]/42 blur-[36px]" />
            <div className="absolute left-1/2 top-[76%] h-20 w-[58%] -translate-x-1/2 rounded-full bg-[#5b452d]/24 blur-[20px]" />
            <div className="absolute left-1/2 top-[79%] h-10 w-[42%] -translate-x-1/2 rounded-full bg-[#3c2b1d]/14 blur-[14px]" />

            <div className="relative overflow-hidden rounded-[34px] border border-white/50 bg-white/42 p-4 shadow-[0_34px_120px_-28px_rgba(70,52,30,0.34)] backdrop-blur-[2px] sm:rounded-[40px] sm:p-5">
              <img
                src={envelopeImage}
                alt=""
                className="block h-auto w-full rounded-[26px] object-cover shadow-[0_42px_110px_-24px_rgba(72,52,28,0.5)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.01]"
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
      </div>
      <style>{`
        @keyframes envelope-drift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(0, -10px, 0) scale(1.03); }
        }
        @keyframes envelope-breathe {
          0%, 100% { transform: translate3d(-50%, 0, 0) scale(1); opacity: .55; }
          50% { transform: translate3d(-50%, -8px, 0) scale(1.05); opacity: .82; }
        }
      `}</style>
    </div>
  )
}
