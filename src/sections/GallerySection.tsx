import { useMemo, useState } from 'react'
import { SectionShell } from '../components/SectionShell'
import { Reveal } from '../components/Reveal'
import { Lightbox } from '../components/Lightbox'
import { useI18n } from '../context/I18nContext'
import { t } from '../i18n/content'
import { galleryItems } from '../data/gallery'
import { FloralTile, FloralCorner } from '../components/FloralArtwork'

export function GallerySection() {
  const { lang } = useI18n()
  const [openId, setOpenId] = useState<string | null>(null)
  const active = useMemo(() => galleryItems.find((g) => g.id === openId) || null, [openId])

  return (
    <SectionShell
      id="gallery"
      title={t(lang, 'galleryTitle')}
      subtitle={t(lang, 'gallerySubtitle')}
    >
      <Reveal>
        <div className="mx-auto max-w-[920px]">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {galleryItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setOpenId(item.id)}
                className="group text-start transition duration-700 hover:-translate-y-0.5"
                aria-label={t(lang, 'galleryOpen')}
              >
                <FloralTile tone={item.tone} title={item.title} subtitle={item.subtitle} />
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <Lightbox
        open={!!active}
        alt={active ? `${active.title} / ${active.subtitle}` : ''}
        onClose={() => setOpenId(null)}
        closeLabel={t(lang, 'galleryClose')}
      >
        {active ? (
          <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-white via-ivory to-champagne/55 p-6 ring-1 ring-ink-200/70">
            <FloralCorner className="left-0 top-0 h-32 w-32" />
            <FloralCorner mirrored className="right-0 bottom-0 h-32 w-32" />
            <div className="relative mx-auto max-w-[520px]">
              <FloralTile tone={active.tone} title={active.title} subtitle={active.subtitle} />
              <p className="mt-5 text-center text-sm leading-relaxed text-ink-600">
                {lang === 'en'
                  ? 'A softer botanical composition, echoing the floral bar styling with ivory blooms and muted sage light.'
                  : 'تركيبة نباتية هادئة تعكس أسلوب البار الزهري مع أزهار عاجية وضوء مائل إلى السجّي.'}
              </p>
            </div>
          </div>
        ) : null}
      </Lightbox>
    </SectionShell>
  )
}
