import { SectionShell } from '../components/SectionShell'
import { Button } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { WEDDING } from '../config/event'
import { useI18n } from '../context/I18nContext'
import { t } from '../i18n/content'

function buildEmbedUrl(query: string) {
  const q = encodeURIComponent(query)
  return `https://www.google.com/maps?q=${q}&output=embed`
}

function buildDirectionsUrl(query: string) {
  const dest = encodeURIComponent(query)
  return `https://www.google.com/maps/dir/?api=1&destination=${dest}`
}

export function MapSection() {
  const { lang } = useI18n()
  const query = import.meta.env.VITE_MAP_QUERY || WEDDING.venue.mapQuery
  const embedUrl = import.meta.env.VITE_MAP_EMBED_URL || buildEmbedUrl(query)
  const directionsUrl = WEDDING.venue.mapUrl || buildDirectionsUrl(query)

  return (
    <SectionShell id="map" title={t(lang, 'mapTitle')} subtitle={t(lang, 'mapSubtitle')}>
      <Reveal>
        <div className="mx-auto max-w-[860px]">
          <div className="overflow-hidden rounded-[26px] bg-white/95 ring-1 ring-ink-200/70 shadow-soft">
            <iframe
              title={WEDDING.venue.name[lang]}
              src={embedUrl}
              className="h-[340px] w-full md:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="mt-5 flex justify-center">
            <a href={directionsUrl} target="_blank" rel="noreferrer">
              <Button>{t(lang, 'mapDirections')}</Button>
            </a>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  )
}
