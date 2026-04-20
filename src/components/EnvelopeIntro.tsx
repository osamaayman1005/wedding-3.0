import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useI18n } from '../context/I18nContext'
import { t } from '../i18n/content'

export function EnvelopeIntro({ onOpen }: { onOpen: () => void }) {
  const { lang } = useI18n()
  const reducedMotion = usePrefersReducedMotion()
  const [opening, setOpening] = useState(false)

  useEffect(() => {
    if (!opening) return

    const delay = reducedMotion ? 160 : 1200
    const timer = window.setTimeout(onOpen, delay)
    return () => window.clearTimeout(timer)
  }, [opening, onOpen, reducedMotion])

  const startOpen = () => {
    if (!opening) setOpening(true)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.99),rgba(250,249,243,0.98)_42%,rgba(243,247,241,0.98)_100%)] px-4">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[7%] top-[13%] h-24 w-24 rounded-full bg-white/45 blur-3xl motion-safe:animate-shimmer" />
        <div className="absolute right-[12%] top-[24%] h-28 w-28 rounded-full bg-champagne/18 blur-3xl motion-safe:animate-shimmer" />
        <div className="absolute bottom-[13%] left-[16%] h-32 w-32 rounded-full bg-sage-100/12 blur-3xl motion-safe:animate-shimmer" />
        <div className="absolute right-[22%] bottom-[18%] h-20 w-20 rounded-full bg-rose-100/20 blur-3xl motion-safe:animate-shimmer" />
      </div>

      <div className="relative mx-auto flex min-h-svh max-w-7xl items-center justify-center py-8">
        <button
          type="button"
          onClick={startOpen}
          disabled={opening}
          aria-label={t(lang, 'openInvitation')}
          className={`relative w-full overflow-hidden bg-white/90 ring-1 ring-ink-200/70 shadow-soft noise-overlay transition-all duration-1000 ease-out ${
            opening
              ? 'fixed inset-0 z-50 rounded-none bg-transparent p-0 ring-0 shadow-none'
              : 'max-w-[720px] rounded-[42px] p-5 motion-safe:animate-floaty'
          }`}
        >
          <div
            className={`relative h-full overflow-hidden bg-gradient-to-br from-[#fffdfd] via-[#fbf1e8] to-[#efdccf] transition-[border-radius,transform,opacity] duration-1000 ease-out ${
              opening ? 'min-h-svh rounded-none' : 'rounded-[34px]'
            }`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.74),transparent_56%)]" />
            <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-sage-700/10 to-transparent" />
            <div className="absolute inset-[7%] rounded-[34px] border border-white/50 bg-white/5 opacity-80" />

            <div
              className={`absolute inset-0 flex items-center justify-center p-5 transition-all duration-1000 ease-out ${
                opening ? 'opacity-0 scale-[1.02]' : 'opacity-100'
              }`}
            >
              <div className="w-full max-w-[520px]">
                <div className="mb-4 flex items-center justify-between text-[10px] tracking-[0.28em] text-ink-500/70">
                  <span>05.06.2026</span>
                  <span>{lang === 'en' ? 'With love' : 'بِحُب'}</span>
                </div>

                <div className="relative mx-auto aspect-[1.62] w-full max-w-[460px]">
                  <div className="absolute inset-x-[5%] bottom-[11%] top-[18%] rounded-[30px] bg-[#f5e8dd] shadow-[0_32px_70px_-40px_rgba(43,42,38,0.34)] ring-1 ring-ink-300/20" />
                  <div
                    className="absolute inset-x-[5%] bottom-[11%] top-[18%] rounded-[30px] border border-ink-300/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.25),rgba(255,255,255,0.02))]"
                    style={{
                      clipPath: 'polygon(0% 0%, 50% 54%, 100% 0%, 100% 100%, 0% 100%)',
                    }}
                  />

                  <div
                    className={`absolute left-1/2 top-[20%] w-[82%] -translate-x-1/2 rounded-[22px] bg-white/96 shadow-soft ring-1 ring-white/70 transition-all duration-1000 ease-out ${
                      opening ? '-translate-y-[22%] opacity-0' : 'translate-y-[12%] opacity-100'
                    }`}
                    style={{ transformOrigin: 'center bottom' }}
                  >
                    <div className="px-5 py-6 text-center">
                      <div className="text-[10px] uppercase tracking-[0.25em] text-sage-800/70">
                        {t(lang, 'journeyTitle')}
                      </div>
                      <div className="mt-2 text-lg font-[500] tracking-[0.01em] text-ink-800">
                        Osama & Farah
                      </div>
                      <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-sage-700/25 to-transparent" />
                      <div className="mt-3 text-xs leading-relaxed text-ink-500">
                        {lang === 'en'
                          ? 'A little love note is waiting beneath the fold.'
                          : 'رسالة حب صغيرة تنتظر تحت الطيّة.'}
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute inset-x-[7%] bottom-[11%] top-[31%] rounded-[28px] bg-gradient-to-br from-[#f2e2d6] via-[#e8d7c7] to-[#f8f2ec] transition-transform duration-1000 ease-out"
                    style={{
                      clipPath: 'polygon(0% 0%, 50% 58%, 100% 0%, 100% 100%, 0% 100%)',
                      transform: opening ? 'translateY(7%) scaleX(1.01)' : 'translateY(0)',
                    }}
                  />

                  <div
                    className="absolute inset-x-[7%] bottom-[11%] top-[31%] rounded-[28px] bg-[#f0e3d9] transition-transform duration-1000 ease-out"
                    style={{
                      clipPath: 'polygon(0% 100%, 50% 42%, 100% 100%)',
                      transform: opening ? 'translateY(6%)' : 'translateY(0)',
                    }}
                  />

                  <div
                    className="absolute inset-x-[7%] top-[11%] h-[58%] rounded-[28px] bg-[#f4ece5] shadow-[0_2px_20px_rgba(0,0,0,0.05)] transition-all duration-1000 ease-out"
                    style={{
                      clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                      transformOrigin: 'bottom center',
                      transformStyle: 'preserve-3d',
                      transform: opening ? 'rotateX(172deg) translateY(-18%)' : 'rotateX(0deg)',
                    }}
                  />

                  <div
                    className={`absolute left-[50%] top-[34%] h-[42%] w-[74%] -translate-x-1/2 rounded-[18px] bg-[linear-gradient(180deg,#fffefc,rgba(255,255,255,0.97))] shadow-[0_10px_30px_-18px_rgba(43,42,38,0.25)] ring-1 ring-ink-200/50 transition-all duration-1000 ease-out ${
                      opening ? 'translate-y-[1%] scale-[1.01] opacity-100' : 'translate-y-[4%] opacity-100'
                    }`}
                  >
                    <div className="px-6 py-5 text-left">
                      <div className="h-1.5 w-20 rounded-full bg-sage-100/80" />
                      <div className="mt-3 h-1.5 w-28 rounded-full bg-ink-100" />
                      <div className="mt-2 h-1.5 w-24 rounded-full bg-ink-100" />
                      <div className="mt-2 h-1.5 w-16 rounded-full bg-ink-100" />
                    </div>
                  </div>

                  <div
                    className={`absolute right-[11%] bottom-[19%] h-20 w-20 rounded-full bg-white/96 shadow-soft ring-1 ring-ink-200/70 transition-all duration-700 ease-out ${
                      opening ? 'scale-110 rotate-6' : 'scale-100'
                    }`}
                  >
                    <svg viewBox="0 0 80 80" aria-hidden="true" className="h-full w-full p-2">
                      <defs>
                        <linearGradient id="sealLeaf" x1="0%" x2="100%" y1="0%" y2="100%">
                          <stop offset="0%" stopColor="#D7DED4" />
                          <stop offset="100%" stopColor="#8A9385" />
                        </linearGradient>
                        <linearGradient id="sealPetal" x1="0%" x2="100%" y1="0%" y2="100%">
                          <stop offset="0%" stopColor="#FFFFFF" />
                          <stop offset="100%" stopColor="#F3EEE8" />
                        </linearGradient>
                      </defs>
                      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 56c12-10 21-18 24-33" stroke="url(#sealLeaf)" strokeWidth="2.6" />
                        <path d="M26 49c4-5 9-8 14-9" stroke="url(#sealLeaf)" strokeWidth="2.2" />
                        <path d="M31 39c3-4 7-6 12-8" stroke="url(#sealLeaf)" strokeWidth="2.2" />
                        <ellipse cx="28" cy="47" rx="6" ry="3.4" fill="url(#sealLeaf)" transform="rotate(-28 28 47)" />
                        <ellipse cx="40" cy="36" rx="7" ry="4" fill="url(#sealLeaf)" transform="rotate(26 40 36)" />
                        <g fill="url(#sealPetal)">
                          <path d="M46 44c4-7 10-8 14-4-4 3-6 8-6 12-5 0-9-3-8-8Z" />
                          <path d="M53 43c6-2 10 2 11 7-4 0-7 3-9 6-3-4-4-9-2-13Z" />
                        </g>
                        <circle cx="49" cy="46" r="2.1" fill="#E2DAD2" />
                      </g>
                    </svg>
                  </div>

                  <div
                    className={`absolute left-[10%] top-[14%] h-3 w-3 rounded-full bg-white/80 shadow-[0_0_18px_rgba(255,255,255,0.9)] transition-all duration-700 ${
                      opening ? '-translate-y-3 opacity-100' : 'opacity-70'
                    }`}
                  />
                  <div
                    className={`absolute right-[18%] top-[22%] h-2.5 w-2.5 rounded-full bg-white/75 shadow-[0_0_18px_rgba(255,255,255,0.8)] transition-all duration-700 ${
                      opening ? '-translate-y-4 opacity-100' : 'opacity-65'
                    }`}
                  />
                  <div
                    className={`absolute left-[18%] bottom-[22%] h-2 w-2 rounded-full bg-sage-100/70 shadow-[0_0_14px_rgba(255,255,255,0.8)] transition-all duration-700 ${
                      opening ? '-translate-y-5 opacity-100' : 'opacity-60'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div
              className={`absolute inset-0 flex items-center justify-center px-6 text-center transition-all duration-1000 ease-out ${
                opening ? 'opacity-100 delay-150' : 'pointer-events-none opacity-0'
              }`}
            >
              <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center rounded-[34px] border border-white/55 bg-white/55 px-6 py-10 shadow-[0_24px_70px_-45px_rgba(53,60,45,0.35)] backdrop-blur-md md:px-10 md:py-12">
                <div className="text-[10px] uppercase tracking-[0.32em] text-sage-800/70">
                  {lang === 'en' ? 'You are invited' : 'أنت مدعو'}
                </div>
                <h1 className="mt-4 text-4xl font-[500] italic tracking-[0.01em] text-ink-800 md:text-6xl">
                  Osama & Farah
                </h1>
                <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-sage-700/25 to-transparent" />
                <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-ink-600 md:text-base">
                  {lang === 'en'
                    ? 'Save the date, bring your smile, and step into a day made with love.'
                    : 'احفظ/ي الموعد، واحمل/ي ابتسامتك، وادخل/ي في يوم صُنع بالحب.'}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs tracking-[0.28em] text-ink-500">
                  <span className="rounded-full bg-white/70 px-4 py-2 ring-1 ring-ink-200/70">05.06.2026</span>
                  <span className="rounded-full bg-white/70 px-4 py-2 ring-1 ring-ink-200/70">
                    {lang === 'en' ? 'Evening celebration' : 'احتفال مسائي'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`absolute inset-x-0 bottom-6 text-center transition-opacity duration-700 ${
              opening ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="text-[11px] uppercase tracking-[0.28em] text-ink-500">
              {lang === 'en' ? 'Tap to open' : 'اضغط لفتح'}
            </div>
            <div className="mt-2 text-sm text-ink-600">
              {lang === 'en'
                ? 'A soft little envelope before the invitation unfolds.'
                : 'مظروف صغير ناعم قبل أن تنكشف الدعوة.'}
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}
