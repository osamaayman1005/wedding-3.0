import { useI18n } from '../context/I18nContext'
import { t } from '../i18n/content'

export function LanguageToggle() {
  const { lang, toggleLang } = useI18n()

  return (
    <button
      type="button"
      onClick={toggleLang}
      className="inline-flex items-center rounded-full bg-ivory/75 px-3 py-2 text-xs tracking-wide text-ink-700 ring-1 ring-ink-200/70 backdrop-blur-sm transition hover:bg-ivory/95"
      aria-label="Toggle language"
    >
      <span className="min-w-[48px]">
        {lang === 'en' ? t(lang, 'langAR') : t(lang, 'langEN')}
      </span>
    </button>
  )
}

