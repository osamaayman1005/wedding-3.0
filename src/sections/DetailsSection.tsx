import { SectionShell } from '../components/SectionShell'
import { useI18n } from '../context/I18nContext'
import { t } from '../i18n/content'
import { WEDDING } from '../config/event'
import { Divider } from '../components/Divider'
import { Reveal } from '../components/Reveal'

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-6 rounded-[20px] bg-white/95 px-5 py-4 ring-1 ring-ink-200/70 rtl:flex-row-reverse">
      <div className="text-xs tracking-wide text-ink-500">{label}</div>
      <div className="text-sm font-[500] text-ink-800">{value}</div>
    </div>
  )
}

export function DetailsSection() {
  const { lang } = useI18n()

  return (
    <SectionShell id="details" title={t(lang, 'detailsTitle')}>
      <div className="mx-auto max-w-[680px]">
        <Reveal>
          <div className="grid gap-3">
            <InfoRow label={t(lang, 'detailsDateLabel')} value={WEDDING.dateLabel[lang]} />
            <InfoRow label={t(lang, 'detailsTimeLabel')} value={WEDDING.timeLabel[lang]} />
            <InfoRow label={t(lang, 'detailsVenueLabel')} value={WEDDING.venue.name[lang]} />
            <InfoRow label={t(lang, 'detailsDressLabel')} value={WEDDING.dressCode[lang]} />
          </div>
        </Reveal>

        <Divider />

        <Reveal delayMs={120}>
          <p className="mx-auto max-w-[64ch] text-center text-sm leading-relaxed text-ink-600 md:text-base">
            {lang === 'en'
              ? 'We would be honored by your presence. A calm, nature-inspired design guides the evening with soft light and gentle florals.'
              : 'نتشرف بحضوركم. تصميم هادئ مستوحى من الطبيعة يقود الأمسية بإضاءة ناعمة وزهور رقيقة.'}
          </p>
        </Reveal>
      </div>
    </SectionShell>
  )
}
