import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { useCountdown } from "../hooks/useCountdown";
import { useGuestName } from "../hooks/useGuestName";
import { useI18n } from "../context/I18nContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Reveal } from "../components/Reveal";
import { Lightbox } from "../components/Lightbox";
import { WEDDING } from "../config/event";
import floralCorner from "../assets/content/floral-corner.png";
import floralDivider from "../assets/content/floral-divider.png";
import paperTexture from "../assets/content/paper-texture.jpg";
import weddingLogo from "../assets/content/wedding-logo.jpeg";
import weddingPortraitArch from "../assets/mosque/wedding-portrait-arch.jpg";
import weddingPortraitCourtyard from "../assets/mosque/wedding-portrait-courtyard.jpg";
import weddingPortraitInterior from "../assets/mosque/wedding-portrait-interior.jpg";
import weddingPortraitStairs from "../assets/mosque/wedding-portrait-stairs.jpg";

type RSVPState = {
  name: string;
  attending: "yes" | "no";
  guests: number;
  savedAtISO: string;
};

type Lang = "en" | "ar";

const copy = {
  en: {
    welcome: "Welcome, dear guest",
    celebration: "In celebration of love",
    couple: "Osama & Farah",
    tagline: "An elegant ivory evening of vows, florals, and quiet joy.",
    scroll: "Scroll to discover",
    saveTheDate: "Save the Date",
    countdownTitle: "Counting the moments",
    countdownLead: "A gentle countdown to a graceful evening.",
    detailsEyebrow: "Event Details",
    detailsTitle: "Ceremony & Celebration",
    detailsLead:
      "We would be honored by your presence. The evening is styled in soft ivory, sage, and champagne tones.",
    scheduleEyebrow: "Order of Eventssss",
    scheduleTitle: "Order of Eventsas",
    scheduleLead:
      "A calm sequence for the evening, from arrival to celebration.",
    locationEyebrow: "Location",
    locationTitle: "Masged Al Aly Al Azeem",
    locationLead:
      "A contemporary mosque with ceremonial halls and a serene, community-focused atmosphere.",
    galleryEyebrow: "Our Story in Frames",
    galleryTitle: "Our Story in Frames",
    galleryLead:
      "A few portraits and moments that echo the same soft, floral mood as the invitation card.",
    rsvpEyebrow: "Kindly Respond",
    rsvpTitle: "Kindly Respond",
    rsvpLead: "Your presence is the greatest gift. Please confirm by May 20th.",
    fullName: "Full Name",
    willYouAttend: "Will you attend?",
    numberGuests: "Number of Guests",
    yes: "Yes, joyfully",
    no: "Regretfully declines",
    sendResponse: "Send Response",
    saved: "Thank you. Your response is saved on this device.",
    savedAt: "Last saved",
    directions: "Get Directions",
    backToEnvelope: "Return to envelope",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    arrival: "Arrival",
    ceremony: "Ceremony",
    congratulations: "Congratulations",
    refreshments: "Refreshments",
    arrivalNote: "Guests are welcomed in a soft, unhurried flow.",
    ceremonyNote: "The vows begin beneath a calm and elegant setting.",
    congratulationsNote: "A brief pause for blessings and portraits.",
    refreshmentsNote: "The evening settles into warm conversation.",
    dateLabel: "Friday, June 5, 2026",
    locationLabel: "Almaza, Cairo",
    timeLabel: "7:30 PM",
    dressLabel: "Elegant, soft tones",
    ceremonyNoteLabel: "Doors open at 7:00 PM",
    receptionLabel: "A quiet beginning",
    heroJumpDetails: "Details",
    heroJumpLocation: "Location",
    heroJumpRsvp: "RSVP",
    footerLove: "With love, Osama & Farah",
    footerDate: "05 · 06 · 2026",
    frameOne: "Stair portrait",
    frameTwo: "Courtyard light",
    frameThree: "Interior glow",
    frameFour: "Arch portrait",
    frameFive: "Evening walk",
    frameSix: "Quiet moment",
  },
  ar: {
    welcome: "أهلاً وسهلاً، يا ضيفنا العزيز",
    celebration: "احتفال بالحب",
    couple: "أسامة وفرح",
    tagline: "أمسية عاجية هادئة من الوعود والزهور والفرح الهادئ.",
    scroll: "مرر لتكتشف التفاصيل",
    saveTheDate: "احفظوا الموعد",
    countdownTitle: "نعدّ اللحظات",
    countdownLead: "عدٌّ هادئ حتى أمسيـة أنيقة ومريحة.",
    detailsEyebrow: "تفاصيل الحفل",
    detailsTitle: "الاحتفال والموعد",
    detailsLead:
      "يسعدنا حضوركم. صُممت الأمسية بدرجات العاجي والمريمي والشمبانيا لتبقى هادئة ومتناسقة.",
    scheduleEyebrow: "ترتيب الأمسية",
    scheduleTitle: "ترتيب الأمسية",
    scheduleLead: "تسلسل هادئ للأمسية من الوصول حتى الاحتفال.",
    locationEyebrow: "المكان",
    locationTitle: "مسجد العلي العظيم",
    locationLead: "مسجد معاصر بقاعة احتفال وأجواء مجتمعية هادئة ومريحة.",
    galleryEyebrow: "ذكريات في إطارات",
    galleryTitle: "ذكريات في إطارات",
    galleryLead:
      "بعض اللقطات واللحظات التي تعكس نفس روح البطاقة: هادئة، زهرية، ومضيئة.",
    rsvpEyebrow: "تأكيد الحضور",
    rsvpTitle: "تأكيد الحضور",
    rsvpLead: "وجودك هو أجمل هدية. يرجى التأكيد قبل 20 مايو.",
    fullName: "الاسم بالكامل",
    willYouAttend: "هل ستحضر؟",
    numberGuests: "عدد المرافقين",
    yes: "نعم، بكل سرور",
    no: "لن أتمكن من الحضور",
    sendResponse: "إرسال الرد",
    saved: "شكراً لك. تم حفظ ردك على هذا الجهاز.",
    savedAt: "آخر حفظ",
    directions: "الحصول على الاتجاهات",
    backToEnvelope: "العودة إلى الظرف",
    days: "أيام",
    hours: "ساعات",
    minutes: "دقائق",
    seconds: "ثوانٍ",
    arrival: "الوصول",
    ceremony: "العقد",
    congratulations: "التهاني",
    refreshments: "الضيافة",
    arrivalNote: "يستقبل الضيوف بهدوء ومن دون استعجال.",
    ceremonyNote: "تبدأ المراسم في أجواء هادئة وأنيقة.",
    congratulationsNote: "لحظة قصيرة للتهاني والصور.",
    refreshmentsNote: "تتواصل الأمسية بأحاديث دافئة ومريحة.",
    dateLabel: "الجمعة، 5 يونيو 2026",
    locationLabel: "المعادي، القاهرة",
    timeLabel: "7:30 مساءً",
    dressLabel: "أنـيق بدرجات هادئة",
    ceremonyNoteLabel: "يفتح الباب الساعة 7:00 مساءً",
    receptionLabel: "بداية هادئة",
    heroJumpDetails: "التفاصيل",
    heroJumpLocation: "المكان",
    heroJumpRsvp: "تأكيد الحضور",
    footerLove: "بكل الحب، أسامة وفرح",
    footerDate: "05 · 06 · 2026",
    frameOne: "على الدرج",
    frameTwo: "ضوء الساحة",
    frameThree: "توهج داخلي",
    frameFour: "تحت القوس",
    frameFive: "مساء هادئ",
    frameSix: "لحظة رقيقة",
  },
} as const;

const scheduleByLang: Record<
  Lang,
  Array<{ time: string; title: string; note: string }>
> = {
  en: [
    { time: "7:00 PM", title: copy.en.arrival, note: copy.en.arrivalNote },
    { time: "7:30 PM", title: copy.en.ceremony, note: copy.en.ceremonyNote },
    {
      time: "8:15 PM",
      title: copy.en.congratulations,
      note: copy.en.congratulationsNote,
    },
    {
      time: "9:00 PM",
      title: copy.en.refreshments,
      note: copy.en.refreshmentsNote,
    },
  ],
  ar: [
    { time: "7:00 مساءً", title: copy.ar.arrival, note: copy.ar.arrivalNote },
    { time: "7:30 مساءً", title: copy.ar.ceremony, note: copy.ar.ceremonyNote },
    {
      time: "8:15 مساءً",
      title: copy.ar.congratulations,
      note: copy.ar.congratulationsNote,
    },
    {
      time: "9:00 مساءً",
      title: copy.ar.refreshments,
      note: copy.ar.refreshmentsNote,
    },
  ],
};

const galleryFramesByLang: Record<
  Lang,
  Array<{
    src: string;
    alt: string;
    caption: string;
    objectPosition?: string;
    span?: string;
  }>
> = {
  en: [
    {
      src: weddingPortraitStairs,
      alt: "Bride and groom portrait on the mosque stairs",
      caption: copy.en.frameOne,
      objectPosition: "center 40%",
    },
    {
      src: weddingPortraitCourtyard,
      alt: "Bride and groom portrait in the mosque courtyard",
      caption: copy.en.frameTwo,
      objectPosition: "center 35%",
    },
    {
      src: weddingPortraitInterior,
      alt: "Bride and groom portrait inside the mosque",
      caption: copy.en.frameThree,
      objectPosition: "center 32%",
    },
    {
      src: weddingPortraitArch,
      alt: "Bride and groom portrait under the mosque arch",
      caption: copy.en.frameFour,
      objectPosition: "center 38%",
    },
    {
      src: weddingPortraitCourtyard,
      alt: "Bride and groom portrait in the mosque courtyard",
      caption: copy.en.frameFive,
      objectPosition: "center 18%",
    },
    {
      src: weddingPortraitStairs,
      alt: "Bride and groom portrait on the mosque stairs",
      caption: copy.en.frameSix,
      objectPosition: "center 58%",
    },
  ],
  ar: [
    {
      src: weddingPortraitStairs,
      alt: "صورة للعروسين على الدرج",
      caption: copy.ar.frameOne,
      objectPosition: "center 40%",
    },
    {
      src: weddingPortraitCourtyard,
      alt: "صورة للعروسين في الساحة",
      caption: copy.ar.frameTwo,
      objectPosition: "center 35%",
    },
    {
      src: weddingPortraitInterior,
      alt: "صورة للعروسين داخل المسجد",
      caption: copy.ar.frameThree,
      objectPosition: "center 32%",
    },
    {
      src: weddingPortraitArch,
      alt: "صورة للعروسين تحت القوس",
      caption: copy.ar.frameFour,
      objectPosition: "center 38%",
    },
    {
      src: weddingPortraitCourtyard,
      alt: "صورة للعروسين في الساحة",
      caption: copy.ar.frameFive,
      objectPosition: "center 18%",
    },
    {
      src: weddingPortraitStairs,
      alt: "صورة للعروسين على الدرج",
      caption: copy.ar.frameSix,
      objectPosition: "center 58%",
    },
  ],
};

function formatCounter(value: number) {
  return String(value).padStart(2, "0");
}

function CornerFlower({
  className = "",
  mirrored = false,
}: {
  className?: string;
  mirrored?: boolean;
}) {
  return (
    <img
      src={floralCorner}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none absolute select-none object-contain ${className} ${
        mirrored ? "scale-x-[-1]" : ""
      }`}
    />
  );
}

function SectionDivider() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center gap-4">
      <span className="h-px w-12 bg-gradient-to-r from-transparent via-[#cdbfae] to-transparent md:w-20" />
      <img
        src={floralDivider}
        alt=""
        aria-hidden="true"
        className="h-6 w-auto opacity-85 md:h-7"
      />
      <span className="h-px w-12 bg-gradient-to-r from-transparent via-[#cdbfae] to-transparent md:w-20" />
    </div>
  );
}

function FullWidthDivider() {
  return (
    <div className="px-4 py-6 md:py-8">
      <div className="mx-auto max-w-[1120px] flex items-center justify-center">
        <img
          src={floralDivider}
          alt=""
          aria-hidden="true"
          className="w-full max-w-md opacity-80 select-none pointer-events-none"
        />
      </div>
    </div>
  );
}

function SectionFrame({
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`scroll-mt-28 px-4 py-6 md:py-8 ${className}`}
      aria-label={title}
    >
      <div className="mx-auto max-w-[1120px]">
        <div className=" relative overflow-hidden">
          <CornerFlower className="-left-6 -top-6 h-32 w-32 opacity-35 md:-left-8 md:-top-8 md:h-40 md:w-40" />
          <CornerFlower
            mirrored
            className="-right-6 -bottom-6 h-32 w-32 opacity-28 md:-right-8 md:-bottom-8 md:h-40 md:w-40"
          />
          <div className="absolute inset-0 " />

          <div className="relative px-5 py-10 md:px-10 md:py-12">
            <Reveal>
              <header className="mx-auto max-w-2xl text-center">
                <p className="text-[10px] uppercase tracking-[0.55em] text-[#8d7d67]">
                  {eyebrow}
                </p>
                <h2 className="mt-4 text-5xl font-[400] tracking-[0.01em] text-ink-800 md:text-4xl font-script">
                  {title}
                </h2>
                <div className="mt-5">
                  <SectionDivider />
                </div>
                {subtitle ? (
                  <p className="mx-auto mt-5 max-w-[58ch] text-md leading-relaxed text-ink-600 md:text-base italic">
                    {subtitle}
                  </p>
                ) : null}
              </header>
            </Reveal>

            <div className="relative mt-8 md:mt-10">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}


function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="group flex aspect-square w-full max-w-[180px] items-center justify-center 
                    rounded-full border border-[#ddd2c4]/0 bg-white/40 p-1.5 
                    transition duration-500 hover:-translate-y-0.5">
            <div className="flex h-full w-full flex-col items-center justify-center 
                      rounded-full border border-[#ddd2c4]/40
                      transition-colors duration-500">
        
        <div className="text-5xl font-[400] leading-none tracking-[0.02em] text-ink-800 md:text-5xl">
          {value}
        </div>
        
        <div className="mt-2 text-[7px] uppercase tracking-[0.2em] text-[#8d7d67] md:text-[9px] md:tracking-[0.3em]">
          {label}
        </div>
      </div>
    </div>
  );
}

function PhotoFrame({
  src,
  alt,
  caption,
  onClick,
  objectPosition = "center",
}: {
  src: string;
  alt: string;
  caption: string;
  onClick?: () => void;
  objectPosition?: string;
}) {
  const content = (
    <div className="group relative aspect-[4/5] overflow-hidden rounded-[24px] border border-[#ddd2c4]/70 bg-white/90 shadow-soft transition duration-700 hover:-translate-y-0.5">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition duration-1000 group-hover:scale-[1.04]"
        style={{ objectPosition }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(49,41,33,0.24))] opacity-0 transition duration-700 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 px-4 py-3">
        <div className="inline-flex rounded-full bg-white/86 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-ink-700 shadow-soft">
          {caption}
        </div>
      </div>
    </div>
  );

  if (!onClick) return content;

  return (
    <button
      type="button"
      onClick={onClick}
      className="text-start transition duration-700 hover:-translate-y-0.5"
      aria-label={caption}
    >
      {content}
    </button>
  );
}

function InvitationButton({
  children,
  href,
  variant = "ghost",
}: {
  children: ReactNode;
  href: string;
  variant?: "ghost" | "solid";
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-xs uppercase tracking-[0.28em] transition duration-500 hover:-translate-y-0.5";
  const styles =
    variant === "solid"
      ? "border border-ink-800 bg-ink-800 text-ivory shadow-[0_18px_40px_-24px_rgba(43,42,38,0.55)] hover:bg-ink-700"
      : "border border-[#d7cabd]/80 bg-white/72 text-ink-700 hover:bg-white/96 hover:shadow-soft";

  return (
    <a className={`${base} ${styles}`} href={href}>
      {children}
    </a>
  );
}

function CopyButton({
  children,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-full border border-[#d7cabd]/80 bg-white/82 px-5 py-3 text-xs uppercase tracking-[0.28em] text-ink-700 transition duration-500 hover:-translate-y-0.5 hover:bg-white/96 hover:shadow-soft"
    >
      {children}
    </button>
  );
}

export function ContentPage({
  onReturnToEnvelope,
}: {
  onReturnToEnvelope: () => void;
}) {
  const { lang, dir } = useI18n();
  const page = copy[lang as Lang];
  const guestName = useGuestName();
  const countdown = useCountdown(WEDDING.startISO);
  const [openFrame, setOpenFrame] = useState<{
    src: string;
    caption: string;
  } | null>(null);
  const [storedRsvp, setStoredRsvp] = useLocalStorage<RSVPState | null>(
    "invite_rsvp",
    null,
  );

  const [name, setName] = useState(storedRsvp?.name || guestName || "");
  const [attending, setAttending] = useState<"yes" | "no">(
    storedRsvp?.attending || "yes",
  );
  const [guests, setGuests] = useState<number>(storedRsvp?.guests || 1);
  const [savedMessage, setSavedMessage] = useState<string | null>(
    storedRsvp ? page.saved : null,
  );
  const heroMessage = page.welcome;

  useEffect(() => {
    if (storedRsvp) {
      setSavedMessage(page.saved);
    }
  }, [page.saved, storedRsvp]);

  const galleryFrames = galleryFramesByLang[lang as Lang];
  const schedule = scheduleByLang[lang as Lang];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: RSVPState = {
      name: name.trim(),
      attending,
      guests: attending === "yes" ? guests : 0,
      savedAtISO: new Date().toISOString(),
    };
    setStoredRsvp(payload);
    setSavedMessage(page.saved);
  };

  return (
    <div
      id="top"
      dir={dir}
      className="relative isolate overflow-x-hidden text-ink-800"
      style={{
    backgroundImage: `
      radial-gradient(at 20% 10%, color-mix(in oklab, var(--sage, #e2e8e4) 8%, transparent) 0, transparent 50%),
      radial-gradient(at 80% 90%, color-mix(in oklab, var(--champagne, #f3ede2) 15%, transparent) 0, transparent 50%),
      url(${paperTexture})
    `,   
         backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.78),rgba(249,244,236,0.18)_36%,rgba(239,232,223,0.22)_70%,rgba(232,223,213,0.35)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),transparent)]" />

      <main className="relative z-10 pb-20">
        <section className="px-4 pb-6 pt-20 md:pb-10 md:pt-24">
          <div className="mx-auto max-w-[1120px]">
            <div className="">
              <CornerFlower className="-left-8 -top-8 h-36 w-36 opacity-45 md:-left-10 md:-top-10 md:h-44 md:w-44" />
              <CornerFlower
                mirrored
                className="-right-8 -top-8 h-36 w-36 opacity-45 md:-right-10 md:-top-10 md:h-44 md:w-44"
              />
              <CornerFlower className="-left-8 -bottom-8 h-36 w-36 opacity-28 md:-left-10 md:-bottom-10 md:h-44 md:w-44" />
              <CornerFlower
                mirrored
                className="-right-8 -bottom-8 h-36 w-36 opacity-28 md:-right-10 md:-bottom-10 md:h-44 md:w-44"
              />

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.92),rgba(250,244,236,0.72)_42%,transparent_78%)]" />

              <div className="relative px-5 py-10 md:px-10 md:py-14">
                <Reveal>
                  <div className="mx-auto max-w-4xl text-center">
                    <p className="text-[10px] uppercase tracking-[0.55em] text-[#8d7d67]">
                      {heroMessage}
                    </p>
                      <div className="mt-6 flex justify-center">
                        <div className="rounded-full border border-[#d8cdbf]/80 bg-white/76 p-4 shadow-[0_24px_60px_-30px_rgba(92,74,55,0.42)] overflow-hidden">
                          <img
                            src={weddingLogo}
                            alt="Wedding Logo"
                            className="w-52 md:w-64 aspect-square object-cover rounded-full select-none"
                          />
                        </div>
                      </div>

                    <p className="mt-6 text-xs uppercase tracking-[0.45em] text-[#8d7d67]">
                      {page.celebration}
                    </p>
                    <h1 className="mt-4 font-script text-5xl leading-none text-ink-800 md:text-7xl">
                      {page.couple}
                    </h1>

                    <div className="mt-5 flex items-center justify-center gap-3">
                      <span className="h-px w-14 bg-gradient-to-r from-transparent via-[#c9bbab] to-transparent md:w-20" />
                      <span className="text-xs uppercase tracking-[0.35em] text-ink-500 md:text-sm">
                        {page.dateLabel}
                      </span>
                      <span className="h-px w-14 bg-gradient-to-r from-transparent via-[#c9bbab] to-transparent md:w-20" />
                    </div>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-ink-600 md:text-base">
                      {page.tagline}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                      <InvitationButton href="#details">
                        {page.heroJumpDetails}
                      </InvitationButton>
                      <InvitationButton href="#venue">
                        {page.heroJumpLocation}
                      </InvitationButton>
                      <InvitationButton href="#rsvp" variant="solid">
                        {page.heroJumpRsvp}
                      </InvitationButton>
                    </div>

                    <div className="mt-8 flex justify-center">
                      <SectionDivider />
                    </div>
                    <p className="mt-4 text-[11px] uppercase tracking-[0.42em] text-[#9c8d79]">
                      {page.scroll}
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <FullWidthDivider />

        <SectionFrame
          eyebrow={page.saveTheDate}
          title={page.countdownTitle}
          subtitle={page.countdownLead}
        >
          {countdown.isPast ? (
            <Reveal>
              <div className="mx-auto max-w-xl rounded-[28px] border border-[#ddd2c4]/80 bg-white/92 px-6 py-8 text-center">
                <div className="text-2xl font-[400] tracking-[0.03em] text-ink-800">
                  {lang === "en" ? "It's time" : "حان الموعد"}
                </div>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                <StatCard
                  value={formatCounter(countdown.days)}
                  label={page.days}
                />
                <StatCard
                  value={formatCounter(countdown.hours)}
                  label={page.hours}
                />
                <StatCard
                  value={formatCounter(countdown.minutes)}
                  label={page.minutes}
                />
                <StatCard
                  value={formatCounter(countdown.seconds)}
                  label={page.seconds}
                />
              </div>
            </Reveal>
          )}
        </SectionFrame>

        <FullWidthDivider />

        <SectionFrame eyebrow={page.detailsEyebrow} title={page.detailsTitle}>
          <Reveal>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[22px] border border-[#ddd2c4]/70 bg-white/88 px-4 py-4">
                <div className="text-xs uppercase tracking-[0.32em] text-[#8d7d67]">
                  {lang === "en" ? "Venue" : "المكان"}
                </div>
                <div className="mt-2 text-sm font-[400] text-ink-800">
                  {WEDDING.venue.name[lang]}
                </div>
              </div>
              <div className="rounded-[22px] border border-[#ddd2c4]/70 bg-white/88 px-4 py-4">
                <div className="text-xs uppercase tracking-[0.32em] text-[#8d7d67]">
                  {lang === "en" ? "Time" : "الوقت"}
                </div>
                <div className="mt-2 text-sm font-[400] text-ink-800">
                  {WEDDING.timeLabel[lang]}
                </div>
              </div>
              <div className="rounded-[22px] border border-[#ddd2c4]/70 bg-white/88 px-4 py-4">
                <div className="text-xs uppercase tracking-[0.32em] text-[#8d7d67]">
                  {lang === "en" ? "Dress" : "الزي"}
                </div>
                <div className="mt-2 text-sm font-[400] text-ink-800">
                  {WEDDING.dressCode[lang]}
                </div>
              </div>
              <div className="rounded-[22px] border border-[#ddd2c4]/70 bg-white/88 px-4 py-4">
                <div className="text-xs uppercase tracking-[0.32em] text-[#8d7d67]">
                  {lang === "en" ? "Date" : "التاريخ"}
                </div>
                <div className="mt-2 text-sm font-[400] text-ink-800">
                  {WEDDING.dateLabel[lang]}
                </div>
              </div>
            </div>
          </Reveal>
        </SectionFrame>

        <FullWidthDivider />

        <SectionFrame
          eyebrow={page.locationEyebrow}
          title={page.locationTitle}
          subtitle={page.locationLead}
        >
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="overflow-hidden rounded-[30px] border border-[#ddd2c4]/80 bg-white/90 shadow-soft">
                <iframe
                  title={WEDDING.venue.name[lang]}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(WEDDING.venue.mapQuery)}&z=17&output=embed`}
                  className="h-[320px] w-full md:h-[460px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="rounded-[30px] border border-[#ddd2c4]/80 p-6 shadow-soft ">
                <div className="text-[10px] uppercase tracking-[0.45em] text-[#8d7d67]">
                  {page.locationTitle}
                </div>
                <div className="mt-3 text-3xl font-[400] tracking-[0.01em] text-ink-800">
                  {WEDDING.venue.name[lang]}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-600 md:text-base">
                  {WEDDING.venue.shortNote[lang]}
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[22px] border border-[#ddd2c4]/70 bg-[#faf7f1] px-4 py-4">
                    <div className="text-xs uppercase tracking-[0.32em] text-[#8d7d67]">
                      {lang === "en" ? "Access" : "الوصول"}
                    </div>
                    <div className="mt-2 text-sm font-[400] text-ink-800">
                      {lang === "en"
                        ? "Easy arrival via Almaza"
                        : "وصول سهل عبر ألماظة"}
                    </div>
                  </div>
                  <div className="rounded-[22px] border border-[#ddd2c4]/70 bg-[#faf7f1] px-4 py-4">
                    <div className="text-xs uppercase tracking-[0.32em] text-[#8d7d67]">
                      {lang === "en" ? "Parking" : "المواقف"}
                    </div>
                    <div className="mt-2 text-sm font-[400] text-ink-800">
                      {lang === "en" ? "Available on site" : "متوفرة بالمكان"}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href={WEDDING.venue.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-full border border-ink-800 bg-ink-800 px-5 py-3 text-xs uppercase tracking-[0.28em] text-ivory transition duration-500 hover:-translate-y-0.5 hover:bg-ink-700"
                  >
                    {page.directions}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </SectionFrame>

        <FullWidthDivider />

        <SectionFrame
          eyebrow={page.galleryEyebrow}
          title={page.galleryTitle}
          subtitle={page.galleryLead}
        >
          <Reveal>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {galleryFrames.map((frame) => (
                <PhotoFrame
                  key={frame.caption}
                  src={frame.src}
                  alt={frame.alt}
                  caption={frame.caption}
                  onClick={() =>
                    setOpenFrame({ src: frame.src, caption: frame.caption })
                  }
                  objectPosition={frame.objectPosition}
                />
              ))}
            </div>
          </Reveal>
        </SectionFrame>

        <FullWidthDivider />

        <SectionFrame
          eyebrow={page.rsvpEyebrow}
          title={page.rsvpTitle}
          subtitle={page.rsvpLead}
        >
          <Reveal>
            <div className="mx-auto max-w-2xl">
              <form
                onSubmit={handleSubmit}
                className="space-y-4 rounded-[30px] border border-[#ddd2c4]/80 bg-white/92 p-6 shadow-soft md:p-8"
              >
                <div className="grid gap-2 text-start">
                  <label className="text-xs uppercase tracking-[0.32em] text-[#8d7d67]">
                    {page.fullName}
                  </label>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    dir={dir}
                    placeholder={page.fullName}
                    className="w-full rounded-[18px] border border-[#ddd2c4]/80 bg-[#faf7f1] px-4 py-3 text-sm text-ink-800 outline-none transition focus:border-[#b9ab98] focus:ring-2 focus:ring-[#b9ab98]/20"
                  />
                </div>

                <div className="grid gap-2 text-start">
                  <div className="text-xs uppercase tracking-[0.32em] text-[#8d7d67]">
                    {page.willYouAttend}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAttending("yes")}
                      className={`rounded-[18px] border px-4 py-3 text-sm transition duration-500 ${
                        attending === "yes"
                          ? "border-ink-800 bg-ink-800 text-ivory shadow-soft"
                          : "border-[#ddd2c4]/80 bg-[#faf7f1] text-ink-700 hover:bg-white"
                      }`}
                    >
                      {page.yes}
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttending("no")}
                      className={`rounded-[18px] border px-4 py-3 text-sm transition duration-500 ${
                        attending === "no"
                          ? "border-ink-800 bg-ink-800 text-ivory shadow-soft"
                          : "border-[#ddd2c4]/80 bg-[#faf7f1] text-ink-700 hover:bg-white"
                      }`}
                    >
                      {page.no}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <CopyButton type="submit">{page.sendResponse}</CopyButton>
                </div>

                {savedMessage ? (
                  <div className="rounded-[22px] border border-[#ddd2c4]/70 bg-[#faf7f1] px-4 py-3 text-sm text-ink-700">
                    {savedMessage}
                  </div>
                ) : null}

                {storedRsvp ? (
                  <div className="text-xs tracking-wide text-ink-400">
                    {page.savedAt}:{" "}
                    {lang === "en"
                      ? new Date(storedRsvp.savedAtISO).toLocaleString()
                      : new Date(storedRsvp.savedAtISO).toLocaleString("ar-EG")}
                  </div>
                ) : null}
              </form>
            </div>
          </Reveal>
        </SectionFrame>

        <footer className="px-4 pt-6">
          <div className="mx-auto max-w-[1120px]">
            <div className="rounded-[36px] border border-[#ddd2c4]/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(249,244,236,0.9))] px-5 py-8 text-center shadow-soft">
              <SectionDivider />
              <p className="mt-5 text-lg font-[400] text-ink-800">
                {page.footerLove}
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.45em] text-[#8d7d67]">
                {page.footerDate}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <CopyButton onClick={onReturnToEnvelope}>
                  {lang === "en" ? "Close the Envelope" : "أغلق الظرف"}
                </CopyButton>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <Lightbox
        open={!!openFrame}
        src={openFrame?.src}
        alt={openFrame?.caption || ""}
        onClose={() => setOpenFrame(null)}
        closeLabel={lang === "en" ? "Close" : "إغلاق"}
      />
    </div>
  );
}
