import { useI18n } from '../context/I18nContext'
import { t } from '../i18n/content'

const steps = [
  { id: 'envelope', href: null, key: 'journey1', completed: true },
  { id: 'venue', href: '#venue', key: 'journey2', completed: false },
  { id: 'details', href: '#details', key: 'journey3', completed: false },
  { id: 'rsvp', href: '#rsvp', key: 'journey4', completed: false },
] as const

export function InvitationPath() {
  const { lang } = useI18n()

  return (
    <div className="mt-10 rounded-[28px] bg-white/94 p-4 ring-1 ring-ink-200/70 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.5em] text-sage-800/70">
            {t(lang, 'journeyTitle')}
          </div>
          <div className="mt-1 text-sm text-ink-600">{t(lang, 'journeySubtitle')}</div>
        </div>
        <div className="rounded-full bg-ivory/90 px-3 py-1 text-[11px] tracking-[0.35em] text-ink-700">
          1/4
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
        {steps.map((step, index) => {
          const content = (
            <div
              className={`flex h-full flex-col items-start justify-between rounded-[20px] px-4 py-4 text-start ring-1 transition duration-500 ${
                step.completed
                  ? 'bg-white/96 ring-sage-700/12'
                  : 'bg-white/98 ring-ink-200/70 hover:bg-white'
              }`}
            >
              <div className="flex w-full items-center justify-between gap-3">
                <div className="text-xs tracking-[0.4em] text-ink-500">
                  0{index + 1}
                </div>
                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    step.completed ? 'bg-sage-500' : 'bg-ink-300'
                  }`}
                />
              </div>
              <div className="mt-6 text-sm font-[500] text-ink-800">
                {t(lang, step.key)}
              </div>
              <div className="mt-2 text-xs leading-relaxed text-ink-500">
                {step.id === 'envelope'
                  ? (lang === 'en'
                      ? 'Opened and glowing softly.'
                      : 'مفتوح ويتوهج بهدوء.')
                  : step.id === 'venue'
                    ? (lang === 'en'
                        ? 'Jump to the venue story.'
                        : 'انتقل إلى قصة المكان.')
                    : step.id === 'details'
                      ? (lang === 'en'
                          ? 'Read the ceremony details.'
                          : 'اقرأ تفاصيل الحفل.')
                      : (lang === 'en'
                          ? 'Finish the journey with RSVP.'
                          : 'أنهِ الرحلة بتأكيد الحضور.')}
              </div>
            </div>
          )

          return step.href ? (
            <a key={step.id} href={step.href} aria-label={t(lang, step.key)}>
              {content}
            </a>
          ) : (
            <div key={step.id}>{content}</div>
          )
        })}
      </div>

      <div className="mt-3 text-xs text-ink-500">{t(lang, 'journeyHint')}</div>
    </div>
  )
}
