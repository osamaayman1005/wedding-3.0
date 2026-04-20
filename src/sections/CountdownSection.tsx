import { SectionShell } from '../components/SectionShell'
import { useI18n } from '../context/I18nContext'
import { t } from '../i18n/content'
import { useCountdown } from '../hooks/useCountdown'
import { WEDDING } from '../config/event'
import { Reveal } from '../components/Reveal'

function Tile({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-[24px] bg-white/95 px-5 py-5 text-center ring-1 ring-ink-200/70 shadow-glow">
      <div className="text-3xl font-[600] tracking-[0.04em] text-ink-800 md:text-4xl">
        {value}
      </div>
      <div className="mt-2 text-xs tracking-wide text-ink-500">{label}</div>
    </div>
  )
}

export function CountdownSection() {
  const { lang } = useI18n()
  const cd = useCountdown(WEDDING.startISO)

  return (
    <SectionShell
      id="countdown"
      title={t(lang, 'countdownTitle')}
      subtitle={t(lang, 'countdownSubtitle')}
    >
      <Reveal>
        <div className="mx-auto max-w-[760px]">
          {cd.isPast ? (
            <div className="rounded-[24px] bg-white/95 px-6 py-8 text-center ring-1 ring-ink-200/70">
              <div className="text-2xl font-[500] tracking-[0.03em] text-ink-800">
                {t(lang, 'cdItsTime')}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <Tile label={t(lang, 'cdDays')} value={cd.days} />
              <Tile label={t(lang, 'cdHours')} value={cd.hours} />
              <Tile label={t(lang, 'cdMinutes')} value={cd.minutes} />
              <Tile label={t(lang, 'cdSeconds')} value={cd.seconds} />
            </div>
          )}
        </div>
      </Reveal>
    </SectionShell>
  )
}
