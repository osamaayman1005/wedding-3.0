import { useEffect, useRef } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useI18n } from '../../context/I18nContext'
import { t } from '../../i18n/content'

const AUDIO_SRC = `${import.meta.env.BASE_URL}audio/ambient.wav`

export function MusicToggle() {
  const { lang } = useI18n()
  const reducedMotion = usePrefersReducedMotion()
  const [enabled, setEnabled] = useLocalStorage<boolean>('invite_music', false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0.32
    audioRef.current = audio
    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (enabled) {
      // Browsers require user gesture; if playback fails, we keep the toggle on
      // and allow retry on next interaction.
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }, [enabled])

  // Reduced motion preference often correlates with reduced audio desire;
  // we still allow manual override via the toggle.
  const label = enabled ? t(lang, 'musicOn') : t(lang, 'musicOff')

  return (
    <button
      type="button"
      onClick={() => setEnabled((v) => !v)}
      className="inline-flex items-center rounded-full bg-ivory/75 px-3 py-2 text-xs tracking-wide text-ink-700 ring-1 ring-ink-200/70 backdrop-blur-sm transition hover:bg-ivory/95"
      aria-pressed={enabled}
      aria-label={label}
      title={reducedMotion ? `${label}` : label}
    >
      {label}
    </button>
  )
}
