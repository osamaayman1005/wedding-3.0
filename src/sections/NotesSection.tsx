import { SectionShell } from '../components/SectionShell'
import { Reveal } from '../components/Reveal'
import { useI18n } from '../context/I18nContext'
import { t } from '../i18n/content'
import { FloralTile } from '../components/FloralArtwork'

export function NotesSection() {
  const { lang } = useI18n()

  const notes = [
    { title: t(lang, 'note1Title'), body: t(lang, 'note1Body'), tone: 'sage' as const },
    { title: t(lang, 'note2Title'), body: t(lang, 'note2Body'), tone: 'beige' as const },
    { title: t(lang, 'note3Title'), body: t(lang, 'note3Body'), tone: 'green' as const },
  ]

  return (
    <SectionShell id="notes" title={t(lang, 'notesTitle')} subtitle={t(lang, 'notesSubtitle')}>
      <div className="mx-auto max-w-[920px]">
        <Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {notes.map((note) => (
              <div key={note.title} className="space-y-3">
                <FloralTile tone={note.tone} title={note.title} subtitle={lang === 'en' ? 'note' : 'ملاحظة'} />
                <div className="rounded-[22px] bg-white/95 px-5 py-4 text-sm leading-relaxed text-ink-600 ring-1 ring-ink-200/70">
                  {note.body}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delayMs={150}>
          <div className="mt-6 rounded-[26px] bg-white/95 px-6 py-6 text-center ring-1 ring-ink-200/70">
            <div className="text-xs uppercase tracking-[0.4em] text-sage-800/70">
              {lang === 'en' ? 'Quiet luxury' : 'فخامة هادئة'}
            </div>
            <div className="mt-2 text-lg font-[500] text-ink-800">
              {lang === 'en'
                ? 'A gentle evening designed to feel warm, intimate, and beautifully composed.'
                : 'أمسية هادئة صُممت لتكون دافئة، حميمة، ومُنسقة بجمال.'}
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  )
}
