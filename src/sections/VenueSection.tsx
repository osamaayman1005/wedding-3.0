import { useMemo, useState } from 'react'
import { SectionShell } from '../components/SectionShell'
import { Reveal } from '../components/Reveal'
import { useI18n } from '../context/I18nContext'
import { t } from '../i18n/content'
import { WEDDING } from '../config/event'
import { Button } from '../components/Button'

const pathSteps = ['arrival', 'prayer', 'celebration'] as const

export function VenueSection() {
  const { lang } = useI18n()
  const [opened, setOpened] = useState<Record<(typeof pathSteps)[number], boolean>>({
    arrival: false,
    prayer: false,
    celebration: false,
  })

  const doneCount = Object.values(opened).filter(Boolean).length
  const complete = doneCount === pathSteps.length

  const facts = useMemo(
    () => [
      t(lang, 'venueFact1'),
      t(lang, 'venueFact2'),
      t(lang, 'venueFact3'),
      t(lang, 'venueFact4'),
    ],
    [lang],
  )

  return (
    <SectionShell id="venue" title={t(lang, 'venueTitle')} subtitle={t(lang, 'venueSubtitle')}>
      <div className="mx-auto max-w-[940px]">
        <Reveal>
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[28px] bg-white/95 p-6 ring-1 ring-ink-200/70">
              <p className="text-sm leading-relaxed text-ink-600 md:text-base">
                {t(lang, 'venueLead')}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {facts.map((fact) => (
                  <span
                    key={fact}
                    className="rounded-full bg-white/95 px-4 py-2 text-xs tracking-wide text-ink-700 ring-1 ring-ink-200/70"
                  >
                    {fact}
                  </span>
                ))}
              </div>

              <div className="mt-6 rounded-[24px] bg-white/95 p-5 ring-1 ring-ink-200/70">
                <div className="text-xs uppercase tracking-[0.35em] text-ink-500">
                  {t(lang, 'venueStoryTitle')}
                </div>
                <div className="mt-3 text-base leading-relaxed text-ink-700">
                  {t(lang, 'venueStoryBody')}
                </div>
              </div>
            </div>

            <div className="rounded-[28px] bg-white/95 p-6 ring-1 ring-ink-200/70">
              <div className="text-xs uppercase tracking-[0.35em] text-sage-800/75">
                {t(lang, 'venuePathTitle')}
              </div>
              <div className="mt-2 text-sm text-ink-600">{t(lang, 'venuePathSubtitle')}</div>

              <div className="mt-5 grid gap-3">
                {pathSteps.map((step) => {
                  const labels = {
                    arrival: t(lang, 'pathArrival'),
                    prayer: t(lang, 'pathPrayer'),
                    celebration: t(lang, 'pathCelebration'),
                  }
                  return (
                    <button
                      key={step}
                      type="button"
                      onClick={() =>
                        setOpened((prev) => ({
                          ...prev,
                          [step]: !prev[step],
                        }))
                      }
                      className={`rounded-[20px] px-4 py-4 text-start ring-1 transition duration-500 ${
                        opened[step]
                          ? 'bg-white/96 ring-sage-700/12'
                          : 'bg-white/96 ring-ink-200/70 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-sm font-[500] text-ink-800">{labels[step]}</div>
                          <div className="mt-1 text-xs tracking-wide text-ink-500">
                            {step === 'arrival'
                              ? (lang === 'en'
                                  ? "A quiet welcome beneath the mosque's calm geometry."
                                  : 'استقبال هادئ تحت هندسة المكان الهادئة.')
                              : step === 'prayer'
                                ? (lang === 'en'
                                    ? 'A moment of reflection before the celebration begins.'
                                    : 'لحظة سكينة قبل بداية الاحتفال.')
                                : (lang === 'en'
                                    ? 'The evening opens into joy, conversation, and light.'
                                    : 'تنفتح الأمسية على الفرح والحديث والضوء.')}
                          </div>
                        </div>
                        <div
                          className={`h-3 w-3 rounded-full transition ${
                            opened[step] ? 'bg-sage-500' : 'bg-ink-300'
                          }`}
                        />
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-xs tracking-wide text-ink-500">
                  <span>{lang === 'en' ? 'Progress' : 'التقدم'}</span>
                  <span>
                    {doneCount}/{pathSteps.length}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-ink-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sage-500 to-sage-300 transition-all duration-700"
                    style={{ width: `${(doneCount / pathSteps.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mt-5 rounded-[22px] bg-white/95 px-4 py-4 ring-1 ring-ink-200/70">
                <div className="text-xs uppercase tracking-[0.35em] text-ink-500">
                  {complete ? t(lang, 'pathUnlocked') : WEDDING.venue.name[lang]}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-ink-600">
                  {complete
                    ? (lang === 'en'
                        ? 'Your gentle journey through the evening is ready.'
                        : 'رحلتكم الهادئة خلال الأمسية أصبحت جاهزة.')
                    : WEDDING.venue.shortNote[lang]}
                </div>
              </div>

              <div className="mt-5">
                <a href={WEDDING.venue.mapUrl} target="_blank" rel="noreferrer">
                  <Button className="w-full">{t(lang, 'mapDirections')}</Button>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  )
}
