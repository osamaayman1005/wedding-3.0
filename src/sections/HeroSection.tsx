import { useI18n } from '../context/I18nContext'
import { t } from '../i18n/content'
import { useGuestName } from '../hooks/useGuestName'
import { WEDDING } from '../config/event'
import { Chip } from '../components/Chip'
import { Reveal } from '../components/Reveal'
import { FloralCorner } from '../components/FloralArtwork'
import { InvitationPath } from '../components/InvitationPath'

export function HeroSection() {
  const { lang } = useI18n()
  const guest = useGuestName()

  return (
    <section className="relative z-10 px-4 pt-10 md:pt-14">
      <div className="mx-auto w-full max-w-[980px]">
        <div className="relative overflow-hidden rounded-[34px] bg-white/94 ring-1 ring-ink-200/70 shadow-soft noise-overlay">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              background:
                'radial-gradient(900px 520px at 30% 20%, rgba(176,192,168,0.08), transparent 60%), radial-gradient(720px 440px at 80% 40%, rgba(216,208,200,0.15), transparent 60%)',
            }}
          />

          <FloralCorner className="left-[-24px] top-[-24px] h-44 w-44 opacity-35" />
          <FloralCorner mirrored className="right-[-24px] top-[-24px] h-44 w-44 opacity-35" />
          <FloralCorner mirrored className="left-[-24px] bottom-[-24px] h-44 w-44 opacity-28" />
          <FloralCorner className="right-[-24px] bottom-[-24px] h-44 w-44 opacity-28" />

          <div className="relative px-6 py-12 text-center md:px-12 md:py-16">
            <div className="mx-auto max-w-[700px]">
              <div className="flex justify-center">
                <Chip>{t(lang, 'brandTagline')}</Chip>
              </div>

              <Reveal className="mt-7" delayMs={80}>
                <p className="text-[11px] uppercase tracking-[0.55em] text-ink-500/75">
                  {t(lang, 'heroArabicLine')}
                </p>
              </Reveal>

              <Reveal className="mt-5" delayMs={160}>
                <h1 className="font-en text-5xl font-[400] italic tracking-[0.02em] text-ink-800 md:text-7xl">
                  {t(lang, 'heroTitle')}
                </h1>
              </Reveal>

              <Reveal className="mt-4" delayMs={240}>
                <p className="mx-auto max-w-[36ch] text-sm leading-relaxed text-ink-600 md:text-lg">
                  {t(lang, 'heroIntro')}
                </p>
              </Reveal>

              <Reveal className="mt-4" delayMs={280}>
                <p className="mx-auto max-w-[48ch] text-xs leading-relaxed text-ink-500 md:text-sm">
                  {WEDDING.venue.shortNote[lang]}
                </p>
              </Reveal>

              <Reveal className="mt-5" delayMs={320}>
                <p className="text-sm text-ink-500 md:text-base">
                  {t(lang, 'heroDate')} • {t(lang, 'heroVenue')}
                </p>
              </Reveal>

              <Reveal className="mt-6" delayMs={420}>
                <p className="text-sm tracking-wide text-ink-600 md:text-base">
                  {guest
                    ? t(lang, 'heroWelcomeWithGuest', { guest })
                    : t(lang, 'heroWelcome')}
                </p>
              </Reveal>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#details"
                  className="rounded-full bg-white/90 px-5 py-3 text-xs tracking-wide text-ink-800 ring-1 ring-sage-700/15 transition hover:bg-white"
                >
                  {WEDDING.timeLabel[lang]} • {WEDDING.dateLabel[lang]}
                </a>
                <a
                  href="#notes"
                  className="rounded-full bg-white/90 px-5 py-3 text-xs tracking-wide text-ink-800 ring-1 ring-ink-200/70 transition hover:bg-white"
                >
                  {t(lang, 'navNotes')}
                </a>
                <a
                  href="#rsvp"
                  className="rounded-full bg-white/90 px-5 py-3 text-xs tracking-wide text-ink-800 ring-1 ring-ink-200/70 transition hover:bg-white"
                >
                  {t(lang, 'navRsvp')}
                </a>
              </div>

              <InvitationPath />

              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-3 text-xs tracking-wide text-ink-500">
                  <span className="h-[6px] w-[6px] rounded-full bg-sage-700/70" />
                  <span>{t(lang, 'heroScrollHint')}</span>
                  <span className="h-[6px] w-[6px] rounded-full bg-sage-700/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
