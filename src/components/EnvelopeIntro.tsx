import { useEffect, useState } from 'react'
import envelopeImage from '../assets/envelope.png'

type Props = {
  onOpen: () => void
  onDismiss: () => void
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

export function EnvelopeIntro({ onOpen, onDismiss }: Props) {
  const [opening, setOpening] = useState(false)
  const [fading, setFading] = useState(false)
  const reducedMotion = useReducedMotion()
  const openDurationMs = reducedMotion ? 1000 : 1800
  const fadeStartMs = Math.round(openDurationMs * 0.08)
  const fadeDurationMs = openDurationMs - fadeStartMs

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    if (!opening) return

    setFading(false)

    const fadeTimeout = window.setTimeout(() => setFading(true), fadeStartMs)
    const dismissTimeout = window.setTimeout(onDismiss, openDurationMs)

    return () => {
      window.clearTimeout(fadeTimeout)
      window.clearTimeout(dismissTimeout)
    }
  }, [opening, onDismiss, fadeStartMs, openDurationMs])

  const openEnvelope = () => {
    if (!opening) {
      setOpening(true)
      onOpen()
    }
  }

  const motionStyle = {
    transitionDuration: `${openDurationMs}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 0.9, 0.22, 1)',
  } as const
  const fadeStyle = {
    transitionDuration: `${fadeDurationMs}ms`,
    transitionTimingFunction: 'ease-out',
  } as const
  const envelopeMaskStyle = opening
    ? {
        WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 0 90%, rgba(0,0,0,0) 100%)',
        maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 0 90%, rgba(0,0,0,0) 100%)',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskSize: '100% 100%',
        maskSize: '100% 100%',
      }
    : undefined

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92),rgba(246,240,232,0.94)_48%,rgba(233,222,208,0.98)_100%)] text-[#4f4336] transition-opacity ${
        fading ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      style={fadeStyle}
    >
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
            className={`relative mx-auto origin-center w-full transform-gpu transition-[transform,opacity,filter] ${
              opening ? 'scale-[1.55] blur-0' : 'scale-100 opacity-100'
            }`}
            className={`relative mx-auto origin-center w-full transform-gpu transition-[transform,opacity,filter] ${
              opening ? 'scale-[1.55] blur-0' : 'scale-100'
            } ${fading ? 'opacity-0' : 'opacity-100'}`}
            style={motionStyle}
          >
            <div className="absolute left-1/2 top-[80%] h-44 w-[78%] -translate-x-1/2 rounded-full bg-[#3f2d1c]/46 blur-[52px] mix-blend-multiply" />
            <div className="absolute left-1/2 top-[84%] h-24 w-[62%] -translate-x-1/2 rounded-full bg-[#3f2d1c]/30 blur-[28px] mix-blend-multiply" />
            <div className="absolute left-1/2 top-[87%] h-12 w-[44%] -translate-x-1/2 rounded-full bg-[#24180f]/18 blur-[14px]" />

            <img
              src={envelopeImage}
              alt=""
              className="block h-auto w-full rounded-[34px] object-cover shadow-[0_34px_120px_-28px_rgba(70,52,30,0.34),0_52px_130px_-20px_rgba(72,52,28,0.56)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.01] sm:rounded-[40px]"
              style={{ filter: 'drop-shadow(0 36px 28px rgba(66, 46, 28, 0.26))', ...envelopeMaskStyle }}
            />
          </div>

          <div
            className="mx-auto mt-5 max-w-md text-center transition-all"
            style={fadeStyle}
          >
            <div
              className={`transition-all ${fading ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'}`}
              style={fadeStyle}
            >
              <div className="text-[11px] uppercase tracking-[0.5em] text-[#9b7955]">
                A little sealed envelope
              </div>
              <div className="mt-3 font-['Cormorant_Garamond',_serif] text-lg italic text-[#7c644a]">
                Tap the seal to open
              </div>
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
