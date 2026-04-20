import { Suspense, lazy } from 'react'
import { useI18n } from './context/I18nContext'
import { useLocalStorage } from './hooks/useLocalStorage'
import { ParticlesCanvas } from './components/ParticlesCanvas'
import { GlowOrbs } from './components/GlowOrbs'
import { Button } from './components/Button'
import { TopBar } from './components/TopBar'
import { EnvelopeIntro } from './components/EnvelopeIntro'
import { HeroSection } from './sections/HeroSection'
import { t } from './i18n/content'

const DetailsSection = lazy(() => import('./sections/DetailsSection').then((m) => ({ default: m.DetailsSection })))
const VenueSection = lazy(() => import('./sections/VenueSection').then((m) => ({ default: m.VenueSection })))
const MapSection = lazy(() => import('./sections/MapSection').then((m) => ({ default: m.MapSection })))
const CountdownSection = lazy(() => import('./sections/CountdownSection').then((m) => ({ default: m.CountdownSection })))
const GallerySection = lazy(() => import('./sections/GallerySection').then((m) => ({ default: m.GallerySection })))
const TimelineSection = lazy(() => import('./sections/TimelineSection').then((m) => ({ default: m.TimelineSection })))
const NotesSection = lazy(() => import('./sections/NotesSection').then((m) => ({ default: m.NotesSection })))
const RsvpSection = lazy(() => import('./sections/RsvpSection').then((m) => ({ default: m.RsvpSection })))

function LoadingBlock() {
  return (
    <div className="px-4 py-10 md:py-14">
      <div className="mx-auto max-w-[980px]">
        <div className="h-[220px] animate-pulse rounded-[28px] bg-white/80 ring-1 ring-ink-200/60" />
      </div>
    </div>
  )
}

export default function App() {
  const { lang } = useI18n()
  const [opened, setOpened] = useLocalStorage<boolean>('invite_opened', false)

  const returnToEnvelope = () => {
    setOpened(false)
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  return (
    <div className={`${lang === 'ar' ? 'font-ar' : 'font-en'} relative min-h-svh`}>
      <GlowOrbs />
      <ParticlesCanvas />
      {!opened ? <EnvelopeIntro onOpen={() => setOpened(true)} /> : null}

      <div className="relative z-10">
        <div className={opened ? 'opacity-100 transition duration-700' : 'pointer-events-none opacity-0'}>
          <TopBar />
          <main className="pb-16">
            <HeroSection />
            <Suspense fallback={<LoadingBlock />}>
              <DetailsSection />
              <VenueSection />
              <MapSection />
              <CountdownSection />
              <GallerySection />
              <TimelineSection />
              <NotesSection />
              <RsvpSection />
            </Suspense>

            <footer className="px-4 py-10 text-center text-xs text-ink-500">
              {lang === 'en'
                ? 'Made with love. You can personalize this page using a guest name: ?guest=Ahmed'
                : 'صُنع بمحبة. يمكنك إضافة اسم الضيف عبر الرابط: ?guest=Ahmed'}

              <div className="mt-5">
                <div className="mb-3 text-[11px] tracking-[0.35em] text-sage-800/65">
                  {t(lang, 'replayHint')}
                </div>
                <Button variant="ghost" className="text-xs" onClick={returnToEnvelope}>
                  {t(lang, 'replayEnvelope')}
                </Button>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}
