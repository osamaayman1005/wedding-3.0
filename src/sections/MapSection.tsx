import { SectionShell } from '../components/SectionShell'
import { Button } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { WEDDING } from '../config/event'
import { useI18n } from '../context/I18nContext'
import { t } from '../i18n/content'
import weddingPortraitStairs from '../assets/mosque/wedding-portrait-stairs.jpg'
import weddingPortraitInterior from '../assets/mosque/wedding-portrait-interior.jpg'
import weddingPortraitArch from '../assets/mosque/wedding-portrait-arch.jpg'
import weddingPortraitCourtyard from '../assets/mosque/wedding-portrait-courtyard.jpg'

function buildEmbedUrl(query: string) {
  const q = encodeURIComponent(query)
  return `https://www.google.com/maps?q=${q}&z=17&output=embed`
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
  const mosqueImages = [
    {
      src: weddingPortraitStairs,
      alt: lang === 'en' ? 'Bride and groom portrait on the mosque stairs' : 'العروس والعريس على درج المسجد',
      caption: lang === 'en' ? 'Stair portrait' : 'صورة على الدرج',
    },
    {
      src: weddingPortraitInterior,
      alt: lang === 'en' ? 'Bride and groom portrait inside the mosque' : 'العروس والعريس داخل المسجد',
      caption: lang === 'en' ? 'Interior portrait' : 'صورة داخلية',
    },
    {
      src: weddingPortraitArch,
      alt: lang === 'en' ? 'Bride and groom portrait under the mosque arch' : 'العروس والعريس تحت قوس المسجد',
      caption: lang === 'en' ? 'Arch portrait' : 'صورة تحت القوس',
    },
    {
      src: weddingPortraitCourtyard,
      alt: lang === 'en' ? 'Bride and groom portrait in the mosque courtyard' : 'العروس والعريس في ساحة المسجد',
      caption: lang === 'en' ? 'Courtyard portrait' : 'صورة في الساحة',
    },
  ]

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

          <div className="mt-8 rounded-[28px] bg-white/95 p-5 ring-1 ring-ink-200/70 shadow-soft noise-overlay">
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-[0.45em] text-ink-500/80">
                {t(lang, 'mapGalleryTitle')}
              </p>
              <h3 className="mt-3 text-2xl font-[500] tracking-[0.02em] text-ink-800 md:text-[2rem]">
                {t(lang, 'mapGallerySubtitle')}
              </h3>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {mosqueImages.map((image, index) => (
                <figure
                  key={image.caption}
                  className={`group relative overflow-hidden rounded-[24px] bg-ivory/70 ring-1 ring-ink-200/70 ${
                    index === 0 ? 'xl:col-span-2' : ''
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                    className={`block w-full object-cover transition duration-700 group-hover:scale-[1.03] ${
                      index === 0 ? 'aspect-[16/11]' : 'aspect-[4/3]'
                    }`}
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(43,42,38,0.7))] px-4 py-3 text-left text-xs tracking-[0.24em] text-white/90 rtl:text-right">
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  )
}
