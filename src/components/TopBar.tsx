import { LanguageToggle } from './LanguageToggle'
import { MusicToggle } from './MusicToggle'
import { useI18n } from '../context/I18nContext'
import { t } from '../i18n/content'

const nav = [
  { id: 'details', key: 'navDetails' },
  { id: 'venue', key: 'navVenue' },
  { id: 'map', key: 'navMap' },
  { id: 'countdown', key: 'navCountdown' },
  { id: 'gallery', key: 'navGallery' },
  { id: 'timeline', key: 'navTimeline' },
  { id: 'notes', key: 'navNotes' },
  { id: 'rsvp', key: 'navRsvp' },
] as const

export function TopBar() {
  const { lang } = useI18n()
  return (
    <div className="sticky top-0 z-40 w-full px-4 pt-4">
      <div className="mx-auto flex w-full max-w-[980px] items-center justify-between gap-3 rounded-full bg-white/72 px-3 py-3 ring-1 ring-ink-200/70 backdrop-blur-md shadow-glow rtl:flex-row-reverse">
        <nav className="hidden items-center gap-2 md:flex">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="rounded-full px-3 py-2 text-xs tracking-wide text-ink-600 transition hover:bg-sage-700/10 hover:text-ink-800"
            >
              {t(lang, n.key as any)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 rtl:flex-row-reverse">
          <MusicToggle />
          <LanguageToggle />
        </div>
      </div>
    </div>
  )
}
