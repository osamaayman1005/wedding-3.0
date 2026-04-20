import { SectionShell } from '../components/SectionShell'
import { Reveal } from '../components/Reveal'
import { timeline } from '../data/timeline'
import { useI18n } from '../context/I18nContext'
import { t } from '../i18n/content'

export function TimelineSection() {
  const { lang } = useI18n()

  return (
    <SectionShell
      id="timeline"
      title={t(lang, 'timelineTitle')}
      subtitle={t(lang, 'timelineSubtitle')}
    >
      <div className="mx-auto max-w-[760px]">
        <Reveal>
          <div className="relative rounded-[26px] bg-white/95 px-6 py-6 ring-1 ring-ink-200/70">
            <div className="absolute inset-y-8 left-6 w-px bg-sage-700/12 rtl:left-auto rtl:right-6" />
            <div className="space-y-5">
              {timeline.map((item, idx) => (
                <div key={idx} className="relative pl-10 rtl:pl-0 rtl:pr-10">
                  <div className="absolute left-[18px] top-2 h-3 w-3 rounded-full bg-sage-500 ring-4 ring-white/85 rtl:left-auto rtl:right-[18px]" />
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="text-sm font-[600] text-ink-800">
                      {lang === 'en' ? item.titleEn : item.titleAr}
                    </div>
                    <div className="text-xs tracking-wide text-ink-500">
                      {lang === 'en' ? item.timeEn : item.timeAr}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  )
}
