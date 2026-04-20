import { useMemo, useState } from 'react'
import { SectionShell } from '../components/SectionShell'
import { Reveal } from '../components/Reveal'
import { Button } from '../components/Button'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useI18n } from '../context/I18nContext'
import { t } from '../i18n/content'

type Attendance = 'yes' | 'no'

type Rsvp = {
  name: string
  attendance: Attendance
  guests: number
  savedAtISO: string
}

function Input({
  value,
  onChange,
  placeholder,
  dir,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  dir: 'ltr' | 'rtl'
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      dir={dir}
      className="w-full rounded-[18px] bg-white/95 px-4 py-3 text-sm text-ink-800 ring-1 ring-ink-200/70 placeholder:text-ink-400 focus:ring-2 focus:ring-sage-700/12"
    />
  )
}

function Select({
  value,
  onChange,
  children,
}: {
  value: string
  onChange: (v: string) => void
  children: React.ReactNode
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-[18px] bg-white/95 px-4 py-3 text-sm text-ink-800 ring-1 ring-ink-200/70 focus:ring-2 focus:ring-sage-700/12"
    >
      {children}
    </select>
  )
}

export function RsvpSection() {
  const { lang, dir } = useI18n()
  const [stored, setStored] = useLocalStorage<Rsvp | null>('invite_rsvp', null)

  const [name, setName] = useState(stored?.name || '')
  const [attendance, setAttendance] = useState<Attendance>(stored?.attendance || 'yes')
  const [guests, setGuests] = useState<number>(stored?.guests || 1)
  const [saved, setSaved] = useState(false)

  const disabled = useMemo(() => name.trim().length < 2, [name])

  return (
    <SectionShell id="rsvp" title={t(lang, 'rsvpTitle')} subtitle={t(lang, 'rsvpSubtitle')}>
      <div className="mx-auto max-w-[620px]">
        <Reveal>
          <form
            className="grid gap-4 rounded-[26px] bg-white/95 p-6 ring-1 ring-ink-200/70"
            onSubmit={(e) => {
              e.preventDefault()
              const payload: Rsvp = {
                name: name.trim(),
                attendance,
                guests: attendance === 'yes' ? guests : 0,
                savedAtISO: new Date().toISOString(),
              }
              setStored(payload)
              setSaved(true)
              window.setTimeout(() => setSaved(false), 4000)
            }}
          >
            <div className="grid gap-2 text-start rtl:text-right">
              <label className="text-xs tracking-wide text-ink-500">{t(lang, 'rsvpName')}</label>
              <Input value={name} onChange={setName} placeholder={t(lang, 'rsvpName')} dir={dir} />
            </div>

            <div className="grid gap-2 text-start rtl:text-right">
              <label className="text-xs tracking-wide text-ink-500">{t(lang, 'rsvpAttend')}</label>
              <Select value={attendance} onChange={(v) => setAttendance(v as Attendance)}>
                <option value="yes">{t(lang, 'rsvpYes')}</option>
                <option value="no">{t(lang, 'rsvpNo')}</option>
              </Select>
            </div>

            {attendance === 'yes' ? (
              <div className="grid gap-2 text-start rtl:text-right">
                <label className="text-xs tracking-wide text-ink-500">
                  {t(lang, 'rsvpGuests')}
                </label>
                <Select value={String(guests)} onChange={(v) => setGuests(Number(v))}>
                  {Array.from({ length: 6 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </Select>
              </div>
            ) : null}

            <div className="pt-2">
              <Button type="submit" disabled={disabled} className={disabled ? 'opacity-60' : ''}>
                {t(lang, 'rsvpSubmit')}
              </Button>
            </div>

            {saved ? (
              <div className="rounded-[18px] bg-white/95 px-4 py-3 text-sm text-ink-800 ring-1 ring-ink-200/70">
                {t(lang, 'rsvpThanks')}
              </div>
            ) : null}

            {stored ? (
              <div className="text-xs text-ink-400">
                {lang === 'en'
                  ? `Last saved: ${new Date(stored.savedAtISO).toLocaleString()}`
                  : `آخر حفظ: ${new Date(stored.savedAtISO).toLocaleString('ar-EG')}`}
              </div>
            ) : null}
          </form>
        </Reveal>
      </div>
    </SectionShell>
  )
}
