import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export type Lang = 'en' | 'ar'

type I18nState = {
  lang: Lang
  dir: 'ltr' | 'rtl'
  setLang: (lang: Lang) => void
  toggleLang: () => void
}

const I18nContext = createContext<I18nState | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [storedLang, setStoredLang] = useLocalStorage<Lang>('invite_lang', 'en')
  const [lang, setLangState] = useState<Lang>(storedLang)

  useEffect(() => {
    setStoredLang(lang)
  }, [lang, setStoredLang])

  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [lang, dir])

  const value = useMemo<I18nState>(() => {
    return {
      lang,
      dir,
      setLang: setLangState,
      toggleLang: () => setLangState((prev) => (prev === 'en' ? 'ar' : 'en')),
    }
  }, [lang, dir])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}

