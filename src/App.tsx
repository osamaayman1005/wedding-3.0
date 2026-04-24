import { useState } from 'react'
import { useI18n } from './context/I18nContext'
import { useLocalStorage } from './hooks/useLocalStorage'
import { ParticlesCanvas } from './components/shared/ParticlesCanvas'
import { GlowOrbs } from './components/shared/GlowOrbs'
import { TopBar } from './components/shared/TopBar'
import { EnvelopeIntro } from './components/pages/EnvelopeIntro'
import { ContentPage } from './components/pages/ContentPage'

export default function App() {
  const { lang } = useI18n()
  const [opened, setOpened] = useLocalStorage<boolean>('invite_opened', false)
  const [introVisible, setIntroVisible] = useState<boolean>(!opened)

  const returnToEnvelope = () => {
    setOpened(false)
    setIntroVisible(true)
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  return (
    <div className={`${lang === 'ar' ? 'font-ar' : 'font-en'} relative min-h-svh`}>
      <GlowOrbs />
      <ParticlesCanvas />
      {introVisible ? (
        <EnvelopeIntro onOpen={() => setOpened(true)} onDismiss={() => setIntroVisible(false)} />
      ) : null}

      <div className={opened ? 'relative z-10 opacity-100 transition duration-700' : 'pointer-events-none opacity-0'}>
        <TopBar />
        <ContentPage onReturnToEnvelope={returnToEnvelope} />
      </div>
    </div>
  )
}
